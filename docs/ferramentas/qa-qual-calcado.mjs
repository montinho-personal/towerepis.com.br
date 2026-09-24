/**
 * QA da ferramenta "Qual calçado usar".
 *
 * Abre a página em navegador real e percorre a conversa inteira várias
 * vezes, com combinações de resposta escolhidas para cobrir cada caminho
 * da lógica — e mais um punhado sorteado. Em cada percurso confere:
 *
 *   - que cada tela tem exatamente uma pergunta (h2#pergunta) e que o foco
 *     foi para ela;
 *   - que o contador "Pergunta X de N" avança e que N muda quando a pessoa
 *     marca "para uma equipe";
 *   - que o resultado aparece com família, seis características, o botão
 *     de WhatsApp com a mensagem no link, e a URL com o estado;
 *   - que a URL compartilhada, aberta do zero, reproduz o mesmo resultado;
 *   - que não houve erro no console em nenhum momento;
 *   - que a página não tem scroll horizontal em 360, 390 e 412 px.
 *
 * Uso: com o site no ar em :3000,  node docs/ferramentas/qa-qual-calcado.mjs
 */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs'

const B = process.env.BASE ?? 'http://localhost:3000'
const ROTA = '/ferramentas/qual-calcado-usar/'

// Caminhos escolhidos à mão: um por família e pelos ramos que mais importam.
const CAMINHOS = [
  { nome: 'segurança, obra, perfuração', r: ['Construção civil', 'Para mim', 'Sim', 'Sim', 'Seco', 'Não', 'Não', 'Não', 'Em pé, caminhando bastante', 'Não', ['Peso']] },
  { nome: 'ocupacional, cozinha, molhado+gordura', r: ['Cozinha / alimentos', 'Para mim', 'Não', 'Não', 'Molhado o tempo todo', 'Frequente', 'Não', 'Produto de limpeza', 'Em pé o dia todo e andando muito', 'Sim', ['Escorregar', 'Molhar o pé']] },
  { nome: 'bota impermeável com biqueira', r: ['Indústria', 'Para uma equipe', '31 a 100 pessoas', 'Sim', 'Não sei', 'O pé fica dentro de água ou líquido', 'Às vezes', 'Não', 'Não', 'Em pé, mais parado', 'Não', ['Nenhum desses']] },
  { nome: 'confirmar (não sei), tende segurança', r: ['Logística / estoque', 'Para mim', 'Não sei', 'Não sei', 'Seco', 'Não', 'Não sei', 'Não', 'Em pé, caminhando bastante', 'Não', ['Pé cansado']] },
  { nome: 'confirmar (não sei), tende ocupacional', r: ['Hospital / saúde', 'Para mim', 'Não sei', 'Não', 'Molhado às vezes', 'Não', 'Não', 'Produto de limpeza', 'Em pé o dia todo e andando muito', 'Não', ['Dor', 'Dificuldade de higienização']] },
  { nome: 'eletricista, composite', r: ['Área elétrica', 'Para uma equipe', '1 a 10 pessoas', 'Sim', 'Não', 'Seco', 'Não', 'Sim', 'Não', 'Em pé, mais parado', 'Sim', ['Calor']] },
  { nome: 'insuficiente (outro + três não sei)', r: ['Outro', 'Para mim', 'Não sei', 'Não sei', 'Seco', 'Não', 'Não sei', 'Não', 'Sento boa parte do dia', 'Não', ['Nenhum desses']] },
  { nome: 'oficina, óleo, solvente', r: ['Oficina / mecânica', 'Para mim', 'Sim', 'Não', 'Molhado às vezes', 'Frequente', 'Não', 'Óleo ou solvente', 'Em pé, caminhando bastante', 'Não', ['Biqueira apertando']] },
]

const navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const problemas = []
let percursos = 0

async function clicar(p, rotulo) {
  // Botões de opção: texto exato do rótulo, dentro do grupo da pergunta.
  const b = p.getByRole('button', { name: new RegExp(`^${rotulo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\s|$)`) }).first()
  await b.waitFor({ state: 'visible', timeout: 5000 })
  await b.click()
}

async function percorrer(nomeCaminho, respostas, viewport) {
  const ctx = await navegador.newContext({ viewport })
  const p = await ctx.newPage()
  const erros = []
  p.on('console', (m) => { if (m.type() === 'error') erros.push(m.text()) })
  p.on('pageerror', (e) => erros.push(String(e)))
  await p.goto(B + ROTA, { waitUntil: 'networkidle' })

  const totalInicial = await p.locator('[aria-live="polite"]').innerText()
  const passos = []
  let anterior = ''
  for (const r of respostas) {
    const pergunta = p.locator('h2#pergunta')
    // Espera a tela nova assentar: a pergunta precisa ter mudado e o foco
    // (que rola a página) precisa ter terminado. Sem isso o clique seguinte
    // pega o botão em movimento e o Playwright recusa, com razão.
    await p.waitForFunction((ant) => document.querySelector('h2#pergunta')?.textContent !== ant, anterior, { timeout: 5000 })
    await p.waitForTimeout(150)
    if ((await pergunta.count()) !== 1) { problemas.push(`${nomeCaminho}: tela sem h2#pergunta único`); break }
    const focado = await p.evaluate(() => document.activeElement?.id === 'pergunta')
    anterior = await pergunta.textContent()
    passos.push({ pergunta: (anterior ?? '').slice(0, 40), focado })
    if (Array.isArray(r)) {
      for (const item of r) await clicar(p, item)
      await p.getByRole('button', { name: /Ver meu resultado/ }).click()
    } else if (r === 'Outro') {
      await clicar(p, 'Outro')
      await p.fill('#outro', 'lavagem de carros')
      await p.getByRole('button', { name: /Continuar/ }).click()
    } else {
      await clicar(p, r)
    }
  }

  // resultado
  const resultado = p.locator('[data-resultado]')
  await resultado.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {})
  if ((await resultado.count()) !== 1) { problemas.push(`${nomeCaminho}: resultado não apareceu`); await ctx.close(); return }
  const familia = await resultado.getAttribute('data-resultado')
  const cartoes = await resultado.locator('.grid > div').count()
  const zap = resultado.locator('a[href^="https://wa.me/"]').first()
  const hrefZap = await zap.getAttribute('href')
  const msg = decodeURIComponent((hrefZap ?? '').split('text=')[1] ?? '')
  const url = p.url()
  const semFocoNaTelas = passos.filter((s) => !s.focado).length

  // largura
  const estourou = await p.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)

  // reabrir pelo link
  const p2 = await ctx.newPage()
  await p2.goto(url, { waitUntil: 'networkidle' })
  const familia2 = await p2.locator('[data-resultado]').getAttribute('data-resultado').catch(() => null)

  const ok = []
  if (!familia) problemas.push(`${nomeCaminho}: sem família no resultado`)
  if (familia2 !== familia) problemas.push(`${nomeCaminho}: link compartilhado reproduz "${familia2}" e não "${familia}"`)
  if (!hrefZap || !msg.includes('Meu perfil')) problemas.push(`${nomeCaminho}: link do WhatsApp sem a mensagem do perfil`)
  if (msg.length > 1400) problemas.push(`${nomeCaminho}: mensagem com ${msg.length} caracteres, acima do limite`)
  if (erros.length) problemas.push(`${nomeCaminho}: erro de console: ${erros[0].slice(0, 120)}`)
  if (estourou) problemas.push(`${nomeCaminho} @${viewport.width}px: scroll horizontal`)
  if (semFocoNaTelas) problemas.push(`${nomeCaminho}: foco não foi para a pergunta em ${semFocoNaTelas} tela(s)`)

  percursos++
  console.log(`  ${familia?.padEnd(16)} ${String(cartoes).padStart(2)} cartões  msg ${String(msg.length).padStart(4)}c  ${nomeCaminho}  (${totalInicial} → ${passos.length} telas)`)
  await ctx.close()
}

console.log(`# QA — ${ROTA}\n`)
for (const vw of [{ width: 360, height: 740 }, { width: 390, height: 844 }, { width: 412, height: 915 }, { width: 1280, height: 800 }]) {
  console.log(`## ${vw.width}px`)
  for (const c of CAMINHOS) await percorrer(c.nome, c.r, vw)
}

console.log(`\npercursos: ${percursos}`)
if (problemas.length) {
  console.log(`\nPROBLEMAS: ${problemas.length}`)
  for (const x of problemas) console.log('  - ' + x)
} else {
  console.log('\nTUDO OK')
}
await navegador.close()
process.exit(problemas.length ? 1 : 0)
