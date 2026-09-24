/**
 * QA da calculadora de grade de numeração, em navegador real.
 *
 *   A  30 pessoas, 1 par, sem reserva                 → 30 pares
 *   B  100 pessoas, 2 pares, 5% de reserva            → 210 pares, o 40 com +3
 *   C  equipe informada 50, grade 48                  → "Faltam 2 pessoas"; com 2 pendentes, fecha
 *   D  só 40—12, 41—8, 42—4, pelos botões + e campo   → 24 pares em dois cliques
 *   E  lista por pessoa: formulário + lista colada    → grade por setor, nenhum nome na mensagem
 *   F  grade vazia                                    → aviso, sem avançar
 *   G  recarregar a página                            → grade recuperada, sem nomes
 *   H  limpar, com confirmação                        → grade vazia
 *   I  copiar, baixar CSV, imprimir                   → texto e arquivo com o total, impressão só da grade
 *
 * Em cada um: console sem erro, sem scroll horizontal, foco no título da
 * etapa, alvos de 44 px dentro da ferramenta.
 *
 * Uso: com o site no ar em :3000,  node docs/ferramentas/qa-grade-equipe.mjs
 */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs'

const B = process.env.BASE ?? 'http://localhost:3000'
const ROTA = '/ferramentas/grade-de-numeracao/'
const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const problemas = []
let percursos = 0

async function abrir(vp) {
  const ctx = await nav.newContext({ viewport: vp, acceptDownloads: true, permissions: ['clipboard-read', 'clipboard-write'] })
  const p = await ctx.newPage()
  const erros = []
  p.on('console', (m) => { if (m.type() === 'error') erros.push(m.text()) })
  p.on('pageerror', (e) => erros.push(String(e)))
  await p.goto(B + ROTA, { waitUntil: 'networkidle' })
  const recusar = p.getByRole('button', { name: 'Recusar', exact: true })
  if (await recusar.isVisible().catch(() => false)) await recusar.click()
  return { ctx, p, erros }
}
const preencher = async (p, grade) => { for (const [n, q] of Object.entries(grade)) await p.fill(`#n-${n}`, String(q)) }
// Espera a rolagem suave da troca de etapa terminar, como uma pessoa espera.
// Clicar no meio da animação faz o Playwright rolar contra ela.
const continuar = async (p) => { await p.getByRole('button', { name: /^Continuar/ }).click(); await p.waitForTimeout(700) }
const parado = async (p) => {
  let antes = -1
  for (let i = 0; i < 30; i++) {
    const agora = await p.evaluate(() => scrollY)
    if (agora === antes) return
    antes = agora
    await p.waitForTimeout(150)
  }
}
const gerar = async (p) => { await p.getByRole('button', { name: /^Gerar grade/ }).click(); await p.locator('[data-resultado]').waitFor({ timeout: 5000 }); await p.waitForTimeout(200); await parado(p) }
const total = async (p) => (await p.locator('[data-total]').textContent())?.trim()
const msgZap = async (p) => decodeURIComponent(((await p.locator('[data-resultado] a[href^="https://wa.me/"]').getAttribute('href')) ?? '').split('text=')[1] ?? '')
const foco = (p) => p.evaluate(() => document.activeElement?.id === 'etapa')

async function comum(nome, p, erros, vp) {
  const estourou = await p.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
  if (estourou) problemas.push(`${nome}: scroll horizontal`)
  const pequenos = await p.evaluate(() =>
    [...document.querySelectorAll('[data-ferramenta] button, [data-ferramenta] a, [data-ferramenta] summary, [data-ferramenta] select, [data-ferramenta] input:not([type=radio]):not([type=file]):not(.sr-only)')]
      .filter((el) => el.offsetParent && el.getBoundingClientRect().height < 44 && !el.closest('p'))
      .map((el) => `${el.tagName} "${(el.textContent || el.id).trim().slice(0, 25)}" ${Math.round(el.getBoundingClientRect().height)}px`),
  )
  if (pequenos.length) problemas.push(`${nome}: alvos abaixo de 44 px: ${pequenos.slice(0, 3).join('; ')}`)
  if (erros.length) problemas.push(`${nome}: erro de console: ${erros[0].slice(0, 140)}`)
}

async function rodar(vp) {
  const w = `@${vp.width}px`

  // A
  { const { ctx, p, erros } = await abrir(vp); const n = `A ${w}`
    await preencher(p, { 36: 2, 38: 5, 39: 6, 40: 8, 41: 5, 42: 3, 43: 1 })
    await continuar(p); await p.waitForTimeout(300)
    if (!(await foco(p))) problemas.push(`${n}: foco não foi para a etapa 2`)
    await gerar(p)
    if ((await total(p)) !== '30 pares') problemas.push(`${n}: total ${await total(p)}`)
    if (!(await foco(p))) problemas.push(`${n}: foco não foi para o resultado`)
    const topo = await p.evaluate(() => document.querySelector('h2#etapa')?.getBoundingClientRect().top ?? -1)
    if (topo < 0 || topo > vp.height * 0.5) problemas.push(`${n}: título do resultado a ${Math.round(topo)}px`)
    const m = await msgZap(p)
    if (!m.includes('Total: 30 pares') || !m.includes('40 — 8')) problemas.push(`${n}: mensagem sem grade/total`)
    await comum(n, p, erros, vp); percursos++; await ctx.close() }

  // B
  { const { ctx, p, erros } = await abrir(vp); const n = `B ${w}`
    await preencher(p, { 36: 4, 37: 6, 38: 10, 39: 14, 40: 30, 41: 16, 42: 12, 43: 6, 44: 2 })
    await continuar(p)
    await p.getByText('2 pares', { exact: true }).click()
    await p.getByText('Percentual', { exact: true }).click()
    await p.getByText('5%', { exact: true }).click()
    await gerar(p)
    if ((await total(p)) !== '210 pares') problemas.push(`${n}: total ${await total(p)}`)
    const linha40 = vp.width >= 768
      ? await p.locator('table:visible tbody tr', { hasText: /^40/ }).first().innerText()
      : await p.locator('[data-resultado] ul li', { hasText: /^40/ }).first().innerText()
    if (!/\+3|\t3\t63|3\s+63/.test(linha40)) problemas.push(`${n}: linha do 40 sem reserva 3 (${linha40.replace(/\s+/g, ' ')})`)
    await comum(n, p, erros, vp); percursos++; await ctx.close() }

  // C
  { const { ctx, p, erros } = await abrir(vp); const n = `C ${w}`
    await preencher(p, { 39: 20, 40: 28 })
    await p.fill('#equipe-informada', '50')
    if (!(await p.getByText('Faltam 2 pessoas para fechar a quantidade informada.').count())) problemas.push(`${n}: sem aviso de faltam 2`)
    await p.fill('#pendentes', '2')
    if (!(await p.getByText(/A grade fecha com o total informado/).count())) problemas.push(`${n}: com pendentes não fechou`)
    await continuar(p); await gerar(p)
    if ((await total(p)) !== '48 pares') problemas.push(`${n}: pendentes entraram no pedido (${await total(p)})`)
    if (!(await p.getByText(/2 pessoas com numeração pendente/).count())) problemas.push(`${n}: resultado sem aviso de pendentes`)
    await comum(n, p, erros, vp); percursos++; await ctx.close() }

  // D
  { const { ctx, p, erros } = await abrir(vp); const n = `D ${w}`
    await p.fill('#n-40', '12')
    for (let i = 0; i < 8; i++) await p.getByRole('button', { name: 'Mais uma pessoa no 41' }).click()
    await p.fill('#n-42', '4')
    await continuar(p); await gerar(p)
    if ((await total(p)) !== '24 pares') problemas.push(`${n}: total ${await total(p)}`)
    await comum(n, p, erros, vp); percursos++; await ctx.close() }

  // E
  { const { ctx, p, erros } = await abrir(vp); const n = `E ${w}`
    await p.getByText('Quero montar a lista por pessoa').click()
    await p.fill('#p-nome', 'Carlos Souza'); await p.selectOption('#p-numero', '40'); await p.fill('#p-grupo', 'Expedição')
    await p.getByRole('button', { name: 'Adicionar' }).click()
    await p.fill('#p-nome', 'Maria Lima'); await p.selectOption('#p-numero', 'pendente'); await p.fill('#p-grupo', 'Limpeza')
    await p.keyboard.press('Enter')
    await p.getByText('Colar uma lista ou importar planilha').click()
    await p.fill('#colar', 'João Pereira, 42, Logística\nAna Dias; 36; Limpeza\nZé; 52\nCarlos Souza, 40, Expedição')
    await p.getByRole('button', { name: 'Interpretar lista' }).click()
    if (!(await p.getByText('3 pessoas adicionadas.').count())) problemas.push(`${n}: importação não disse 3 adicionadas`)
    if (!(await p.getByText(/fora da faixa/).count())) problemas.push(`${n}: linha fora da faixa sem aviso`)
    if (!(await p.getByText(/Nome repetido: Carlos Souza/).count())) problemas.push(`${n}: duplicado não avisado`)
    await continuar(p); await gerar(p)
    if ((await total(p)) !== '4 pares') problemas.push(`${n}: total ${await total(p)}`)
    if (!(await p.getByText('Grade por setor').count())) problemas.push(`${n}: sem grade por setor`)
    const m = await msgZap(p)
    for (const nome of ['Carlos', 'Maria', 'João', 'Ana']) if (m.includes(nome)) problemas.push(`${n}: nome "${nome}" na mensagem`)
    const salvo = await p.evaluate(() => localStorage.getItem('tower-grade-equipe') ?? '')
    for (const nome of ['Carlos', 'Maria', 'João', 'Ana']) if (salvo.includes(nome)) problemas.push(`${n}: nome "${nome}" salvo no navegador`)
    await comum(n, p, erros, vp); percursos++

    // G: recarregar recupera, sem nomes
    await p.reload({ waitUntil: 'networkidle' })
    if (!(await p.getByText(/Recuperamos a grade/).count())) problemas.push(`G ${w}: grade não recuperada`)
    const naTela = await p.locator('[data-ferramenta]').innerText()
    if (/Carlos|Maria/.test(naTela)) problemas.push(`G ${w}: nome voltou depois de recarregar`)
    if (!/Pessoa 1/.test(naTela)) problemas.push(`G ${w}: lista não voltou`)
    percursos++

    // H: limpar com confirmação
    await p.getByRole('button', { name: 'Limpar grade' }).click()
    await p.getByRole('button', { name: 'Apagar grade' }).click()
    await p.waitForTimeout(500)
    const depois = await p.evaluate(() => localStorage.getItem('tower-grade-equipe'))
    if (depois) problemas.push(`H ${w}: registro ficou no navegador`)
    if (/Pessoa 1/.test(await p.locator('[data-ferramenta]').innerText())) problemas.push(`H ${w}: lista não foi apagada`)
    percursos++
    await ctx.close() }

  // F: vazio
  { const { ctx, p, erros } = await abrir(vp); const n = `F ${w}`
    await continuar(p)
    if (!(await p.getByText('A grade está vazia. Informe pelo menos uma numeração.').count())) problemas.push(`${n}: grade vazia sem aviso`)
    if (await p.getByRole('heading', { name: 'Monte o pedido' }).count()) problemas.push(`${n}: avançou com grade vazia`)
    await p.fill('#n-40', 'abc')
    if (!(await p.getByText('Use só números inteiros, como 12.').count())) problemas.push(`${n}: texto no campo sem aviso`)
    await comum(n, p, erros, vp); percursos++; await ctx.close() }

  // I: saídas
  if (vp.width === 1280 || vp.width === 390) {
    const { ctx, p, erros } = await abrir(vp); const n = `I ${w}`
    await preencher(p, { 38: 3, 39: 4, 40: 5 })
    await continuar(p); await gerar(p)
    await p.getByRole('button', { name: 'Copiar grade' }).click()
    const copiado = await p.evaluate(() => navigator.clipboard.readText())
    if (!copiado.includes('GRADE DE CALÇADOS') || !copiado.includes('Total: 12 pares')) problemas.push(`${n}: texto copiado errado`)
    const [dl] = await Promise.all([p.waitForEvent('download'), p.getByRole('button', { name: 'Baixar CSV' }).click()])
    const csv = await (await dl.createReadStream()).toArray().then((b) => Buffer.concat(b).toString('utf8'))
    if (!/Total;12;1;12;0;12/.test(csv)) problemas.push(`${n}: CSV sem a linha de total (${csv.slice(0, 80)})`)
    await p.evaluate(() => { window.print = () => { window.__classe = document.body.className } })
    await p.getByRole('button', { name: 'Imprimir ou salvar em PDF' }).click()
    const classe = await p.evaluate(() => window.__classe ?? '')
    if (!classe.includes('imprimindo-grade')) problemas.push(`${n}: impressão sem a classe da grade`)
    await p.emulateMedia({ media: 'print' })
    await p.evaluate(() => document.body.classList.add('imprimindo-grade'))
    const visivel = await p.evaluate(() => {
      const bloco = document.querySelector('[data-imprimir]')
      const menu = document.querySelector('header')
      return { bloco: bloco && getComputedStyle(bloco).display !== 'none' && getComputedStyle(bloco).visibility === 'visible', menu: menu && getComputedStyle(menu).visibility === 'visible' }
    })
    if (!visivel.bloco || visivel.menu) problemas.push(`${n}: impressão mostra ${JSON.stringify(visivel)}`)
    await comum(n, p, erros, vp); percursos++; await ctx.close()
  }
}

console.log(`# QA — ${ROTA}\n`)
for (const vp of [{ width: 360, height: 740 }, { width: 390, height: 844 }, { width: 412, height: 915 }, { width: 1280, height: 800 }]) {
  await rodar(vp)
  console.log(`  ${vp.width}px ok`)
}
console.log(`\npercursos: ${percursos}`)
if (problemas.length) {
  console.log(`\nPROBLEMAS: ${problemas.length}`)
  for (const x of problemas) console.log('  - ' + x)
} else console.log('\nTUDO OK')
await nav.close()
process.exit(problemas.length ? 1 : 0)
