/**
 * Foco visível pelo teclado — WCAG 2.4.7 e 1.4.11.
 *
 * Existe pela auditoria de acessibilidade de 26/11/2026, que achou duas
 * falhas que nenhum outro teste via: opção com rádio sr-only sem contorno
 * nenhum (o rádio de 1px recebia o foco, a label visível não) e contorno
 * vermelho sobre faixa grafite com 2,33:1.
 *
 * Em cada rota, aperta Tab até 120 vezes e, a cada parada, mede:
 *   - quem mostra o foco: o próprio elemento ou, se ele for um rádio ou
 *     checkbox sr-only, a label que o envolve;
 *   - se há contorno (outline) de pelo menos 2px;
 *   - o contraste da cor do contorno contra o fundo atrás dele (a primeira
 *     cor de fundo não transparente subindo a partir do pai), mínimo 3:1.
 *
 * Uso: npm run build && npx next start -p 3000, depois node este-arquivo
 * [rota ...]. Sem rotas, usa as ferramentas, o orçamento, a home e um
 * artigo. Sai com código 1 se achar problema.
 */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs'

const BASE = process.env.BASE || 'http://localhost:3000'
const rotas = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['/', '/ferramentas/tamanho-de-botina/', '/ferramentas/grade-de-numeracao/', '/ferramentas/qual-calcado-usar/', '/orcamento/', '/conhecimento/ficha-de-entrega-de-epi-o-que-precisa-constar/']

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const p = await b.newPage({ viewport: { width: 1280, height: 900 } })
const problemas = []
let paradas = 0

for (const rota of rotas) {
  await p.goto(BASE + rota, { waitUntil: 'load' })
  await p.evaluate(() => document.body.focus())
  const vistos = new Set()
  for (let i = 0; i < 120; i++) {
    await p.keyboard.press('Tab')
    const r = await p.evaluate(() => {
      let el = document.activeElement
      if (!el || el === document.body) return null
      const id = [el.tagName, el.id, el.getAttribute('href'), el.getAttribute('name'), el.value, (el.innerText || '').slice(0, 60), Math.round(el.getBoundingClientRect().top + scrollY)].join('|')
      const sr = (e) => { const s = getComputedStyle(e); return s.position === 'absolute' && parseFloat(s.width) <= 1 }
      if ((el.type === 'radio' || el.type === 'checkbox') && sr(el)) el = el.closest('label') || el
      const cs = getComputedStyle(el)
      const parse = (c) => (c.match(/[\d.]+/g) || []).map(Number)
      let bg = null
      for (let e = el.parentElement; e; e = e.parentElement) {
        const v = parse(getComputedStyle(e).backgroundColor)
        if (v.length >= 3 && (v.length === 3 || v[3] > 0.5)) { bg = v.slice(0, 3); break }
      }
      bg = bg || [255, 255, 255]
      const lum = ([r, g, b]) => {
        const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4 }
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
      }
      const oc = parse(cs.outlineColor).slice(0, 3)
      const a = lum(oc), z = lum(bg)
      const contraste = (Math.max(a, z) + 0.05) / (Math.min(a, z) + 0.05)
      const largura = cs.outlineStyle === 'none' ? 0 : parseFloat(cs.outlineWidth)
      const sombra = cs.boxShadow !== 'none'
      return { id, nome: (el.innerText || el.getAttribute('aria-label') || el.value || '').trim().slice(0, 40), largura, contraste: Math.round(contraste * 100) / 100, sombra }
    })
    if (!r) continue
    if (vistos.has(r.id)) break
    vistos.add(r.id)
    paradas++
    if (r.largura < 2 && !r.sombra) problemas.push(`${rota}  "${r.nome}"  sem contorno de foco`)
    else if (r.largura >= 2 && r.contraste < 3) problemas.push(`${rota}  "${r.nome}"  contorno com ${r.contraste}:1 contra o fundo`)
  }
}
await b.close()
console.log(`rotas: ${rotas.length} | paradas de foco medidas: ${paradas}`)
if (problemas.length) {
  console.log(`PROBLEMAS: ${problemas.length}`)
  for (const x of problemas) console.log('  ' + x)
  process.exit(1)
}
console.log('TUDO OK')
