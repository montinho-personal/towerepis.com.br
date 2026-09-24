/**
 * QA da calculadora de tamanho de botina, em navegador real.
 *
 * Os cinco casos do briefing, mais os erros de digitação, em quatro larguras:
 *
 *   A  sabe só que o pé mede 26 cm
 *   B  mediu os dois pés e deram diferente (26,1 e 26,5)
 *   C  pé largo: refina a estimativa depois do resultado
 *   D  quer a tabela de um modelo — que ainda não existe, e a tela diz isso
 *   E  compra para uma equipe
 *   F  digita 5, depois 264, aceita a sugestão de 26,4 cm
 *   G  chega pelo teste de calçado (?calcado=seguranca)
 *
 * Em cada um: resultado certo, foco no título da etapa, título do resultado
 * na tela, mensagem do WhatsApp com a medida, recarregar reproduz, nenhum
 * erro de console, nenhum scroll horizontal, alvos de toque com 44 px.
 *
 * Uso: com o build de prévia no ar em :3000 (a página tem trava de
 * publicação; ver src/content/tabelas-numeracao.json),
 *   PREVIA_FERRAMENTAS=1 npm run build && npx next start -p 3000
 *   node docs/ferramentas/qa-tamanho-botina.mjs
 */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs'

const B = process.env.BASE ?? 'http://localhost:3000'
const ROTA = '/ferramentas/tamanho-de-botina/'
const navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const problemas = []
let percursos = 0

const CASOS = [
  { id: 'A', medida: '26', espera: '39' },
  { id: 'B', esq: '26,1', dir: '26.5', espera: '40', texto: /o direito, que é o maior/ },
  { id: 'C', medida: '26,4', espera: '39 ou 40', largura: 'Largo', texto: /forma mais larga/ },
  { id: 'D', medida: '27', espera: '40 ou 41', abrirRefino: true, texto: /ainda não publicamos a tabela oficial/ },
  { id: 'E', medida: '26.7', espera: '40', equipe: true, msg: /equipe/ },
  { id: 'F', erros: ['5', '264'], espera: '39 ou 40' },
  { id: 'G', query: '?calcado=seguranca', medida: '28', espera: '42', msg: /calçado de segurança/ },
]

async function focoNaEtapa(p) {
  return p.evaluate(() => document.activeElement?.id === 'etapa')
}

async function caso(c, vp) {
  const ctx = await navegador.newContext({ viewport: vp })
  const p = await ctx.newPage()
  const erros = []
  p.on('console', (m) => { if (m.type() === 'error') erros.push(m.text()) })
  p.on('pageerror', (e) => erros.push(String(e)))
  const nome = `${c.id} @${vp.width}px`
  await p.goto(B + ROTA + (c.query ?? ''), { waitUntil: 'networkidle' })
  // Build com GA4 de teste mostra o aviso de medição por cima da página.
  const recusar = p.getByRole('button', { name: 'Recusar', exact: true })
  if (await recusar.isVisible().catch(() => false)) await recusar.click()

  if (c.query && !(await p.getByText(/Você veio do teste de calçado/).count())) problemas.push(`${nome}: aviso de origem do teste ausente`)

  await p.getByRole('button', { name: /Começar/ }).click()
  await p.waitForFunction(() => document.querySelector('h2#etapa')?.textContent?.includes('Quanto mede'))
  await p.waitForTimeout(200)
  // Na etapa 2 o foco vai direto ao campo: quem usa teclado digita sem Tab.
  if (!(await p.evaluate(() => document.activeElement?.id === 'medida'))) problemas.push(`${nome}: foco não foi para o campo da medida`)

  if (c.esq) {
    await p.getByLabel(/Medi os dois pés/).check()
    await p.fill('#medida-esq', c.esq)
    await p.fill('#medida-dir', c.dir)
  } else if (c.erros) {
    for (const x of c.erros) {
      await p.fill('#medida', x)
      await p.getByRole('button', { name: 'Calcular meu tamanho' }).click()
      const alerta = p.locator('[role="alert"]')
      await alerta.waitFor({ timeout: 3000 }).catch(() => {})
      if (!(await alerta.count())) problemas.push(`${nome}: "${x}" não mostrou erro`)
    }
    await p.getByRole('button', { name: /Usar 26,4 cm/ }).click()
    if ((await p.inputValue('#medida')) !== '26,4') problemas.push(`${nome}: sugestão de mm não preencheu o campo`)
  } else {
    await p.fill('#medida', c.medida)
  }
  if (c.equipe) await p.getByText('Para uma equipe', { exact: true }).click()

  await p.getByRole('button', { name: 'Calcular meu tamanho' }).click()
  const res = p.locator('[data-resultado]')
  await res.waitFor({ timeout: 5000 }).catch(() => {})
  if ((await res.count()) !== 1) { problemas.push(`${nome}: resultado não apareceu`); await ctx.close(); return }
  await p.waitForTimeout(900)

  const numero = (await p.locator('[data-numero]').textContent())?.trim()
  if (numero !== c.espera) problemas.push(`${nome}: numeração ${numero}, esperada ${c.espera}`)
  if (!(await focoNaEtapa(p))) problemas.push(`${nome}: foco não foi para o resultado`)
  const topo = await p.evaluate(() => document.querySelector('h2#etapa')?.getBoundingClientRect().top ?? -1)
  if (topo < 0 || topo > vp.height * 0.5) problemas.push(`${nome}: título do resultado a ${Math.round(topo)}px`)

  if (c.largura || c.abrirRefino) {
    await p.getByText('Quero melhorar a estimativa').click()
    if (c.largura) await p.getByText(c.largura, { exact: true }).click()
    await p.waitForTimeout(200)
    if (c.largura && !p.url().includes('largura=largo')) problemas.push(`${nome}: largura não foi para a URL`)
  }
  if (c.texto && !(await p.getByText(c.texto).count())) problemas.push(`${nome}: texto esperado ausente (${c.texto})`)

  const href = await res.locator('a[href^="https://wa.me/"]').first().getAttribute('href')
  const msg = decodeURIComponent((href ?? '').split('text=')[1] ?? '')
  if (!/Meu maior pé mede: \d/.test(msg)) problemas.push(`${nome}: mensagem sem a medida`)
  if (!msg.includes(`Numeração estimada: ${c.espera}.`)) problemas.push(`${nome}: mensagem sem a numeração`)
  if (c.msg && !c.msg.test(msg)) problemas.push(`${nome}: mensagem sem ${c.msg}`)
  if (c.equipe && !(await p.getByRole('link', { name: 'Montar a grade da equipe' }).count())) problemas.push(`${nome}: CTA de grade ausente`)

  // alvos de toque dentro da ferramenta
  const pequenos = await p.evaluate(() =>
    [...document.querySelectorAll('[data-ferramenta] button, [data-ferramenta] a, [data-ferramenta] summary, [data-ferramenta] label')]
      .filter((el) => el.offsetParent && el.getBoundingClientRect().height < 44 && !el.closest('p'))
      .map((el) => `${el.tagName} "${el.textContent.trim().slice(0, 30)}" ${Math.round(el.getBoundingClientRect().height)}px`),
  )
  if (pequenos.length) problemas.push(`${nome}: alvos abaixo de 44 px: ${pequenos.slice(0, 3).join('; ')}`)

  const estourou = await p.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
  if (estourou) problemas.push(`${nome}: scroll horizontal`)

  // recarregar reproduz
  const url = p.url()
  await p.reload({ waitUntil: 'networkidle' })
  const depois = (await p.locator('[data-numero]').textContent().catch(() => null))?.trim()
  if (depois !== c.espera) problemas.push(`${nome}: recarregar deu ${depois}`)

  // medir novamente volta ao campo, limpo
  await p.getByRole('button', { name: 'Medir novamente' }).click()
  await p.waitForTimeout(300)
  if (!(await p.locator('#medida, #medida-esq').count())) problemas.push(`${nome}: "medir novamente" não voltou ao campo`)

  // Duplo clique no calcular: um resultado só, sem erro. (O foco não é
  // conferido aqui: o segundo clique cai no resultado e leva o foco junto,
  // como levaria para qualquer pessoa.)
  if (c.id === 'A') {
    await p.fill('#medida', '26')
    await p.getByRole('button', { name: 'Calcular meu tamanho' }).dblclick()
    await p.waitForTimeout(600)
    if ((await p.locator('[data-resultado]').count()) !== 1) problemas.push(`${nome}: duplo clique não deu um resultado único`)
  }

  if (erros.length) problemas.push(`${nome}: erro de console: ${erros[0].slice(0, 140)}`)
  percursos++
  console.log(`  ${c.id}  ${String(numero).padEnd(9)} msg ${String(msg.length).padStart(3)}c  ${url.replace(B, '')}`)
  await ctx.close()
}

console.log(`# QA — ${ROTA}\n`)
for (const vp of [{ width: 360, height: 740 }, { width: 390, height: 844 }, { width: 412, height: 915 }, { width: 1280, height: 800 }]) {
  console.log(`## ${vp.width}px`)
  for (const c of CASOS) await caso(c, vp)
}
console.log(`\npercursos: ${percursos}`)
if (problemas.length) {
  console.log(`\nPROBLEMAS: ${problemas.length}`)
  for (const x of problemas) console.log('  - ' + x)
} else console.log('\nTUDO OK')
await navegador.close()
process.exit(problemas.length ? 1 : 0)
