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
  // Sem rolagem suave: o foco rola a página, e a medição precisa do elemento
  // já no lugar, senão o ponto medido cai em outra coisa.
  await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' })
  await p.evaluate(() => document.body.focus())
  const vistos = new Set()
  for (let i = 0; i < 120; i++) {
    await p.keyboard.press('Tab')
    // Elemento dentro de barra fixa: não rolar (rolar esconde ou mostra a
    // barra) e esperar a transição de 300ms terminar antes de medir.
    const fixo = await p.evaluate(() => {
      for (let e = document.activeElement; e; e = e.parentElement) if (getComputedStyle(e).position === 'fixed') return true
      return false
    })
    if (fixo) await p.waitForTimeout(450)
    const r = await p.evaluate((fixo) => {
      let el = document.activeElement
      if (!el || el === document.body) return null
      const id = [el.tagName, el.id, el.getAttribute('href'), el.getAttribute('name'), el.value, (el.innerText || '').slice(0, 60), Math.round(el.getBoundingClientRect().top + scrollY)].join('|')
      const sr = (e) => { const s = getComputedStyle(e); return s.position === 'absolute' && parseFloat(s.width) <= 1 }
      if ((el.type === 'radio' || el.type === 'checkbox') && sr(el)) el = el.closest('label') || el
      const cs = getComputedStyle(el)
      const parse = (c) => (c.match(/[\d.]+/g) || []).map(Number)
      // O fundo que importa é o de onde o contorno é desenhado: um ponto logo
      // fora da caixa, no meio da largura do contorno. Degradê conta pela
      // primeira cor (o cabeçalho é um degradê vermelho).
      const corDe = (e) => {
        const s = getComputedStyle(e)
        const v = parse(s.backgroundColor)
        if (v.length >= 3 && (v.length === 3 || v[3] > 0.5) && !/oklab|oklch/.test(s.backgroundColor)) return v.slice(0, 3)
        const g = s.backgroundImage.match(/#([0-9a-f]{6})|rgba?\([^)]*\)/i)
        if (g) return g[1] ? [0, 2, 4].map((k) => parseInt(g[1].slice(k, k + 2), 16)) : parse(g[0]).slice(0, 3)
        return null
      }
      if (!fixo) el.scrollIntoView({ block: 'center', behavior: 'instant' })
      const rc = el.getBoundingClientRect()
      const off = parseFloat(cs.outlineOffset) || 0, larg = parseFloat(cs.outlineWidth) || 0
      const y = Math.min(Math.max(rc.top + rc.height / 2, 1), innerHeight - 1)
      const xs = [rc.left - off - larg / 2, rc.right + off + larg / 2].filter((x) => x > 0 && x < innerWidth)
      let bg = null
      for (const x of xs) {
        for (const e of document.elementsFromPoint(x, y)) {
          if (e === el || el.contains(e)) continue
          bg = corDe(e)
          if (bg) break
        }
        if (bg) break
      }
      if (!bg) for (let e = el.parentElement; e && !bg; e = e.parentElement) bg = corDe(e)
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
    }, fixo)
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
