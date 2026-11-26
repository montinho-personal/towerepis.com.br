/**
 * Teste de navegador — todas as rotas, no computador e no celular.
 *
 * Existe pela regra de 25/11/2026 do Renato (CLAUDE.md, "Toda mudança no
 * site"): abrir o site no navegador, testar botões e funcionalidades, ver a
 * versão mobile, rodar testes automáticos, corrigir e testar de novo.
 *
 * Para cada rota do sitemap, em 1280px e num celular emulado (Pixel 7):
 *   - a página responde 200 e tem exatamente um H1;
 *   - nenhum erro de JavaScript (pageerror) nem console.error;
 *   - nenhuma requisição do próprio site com status >= 400;
 *   - nenhuma imagem quebrada depois de rolar até o fim;
 *   - nenhum código HTML aparecendo como texto (link escrito na tela);
 *   - todo link de WhatsApp vai para wa.me com o número de empresa.ts;
 *   - no celular, o botão do menu abre o menu, o menu tem links e fecha.
 * Depois do percurso:
 *   - todo link interno encontrado responde < 400;
 *   - no /orcamento/, escolhe uma categoria, toca em "Enviar pelo WhatsApp"
 *     e confere o link que o botão abriria (window.open é interceptado).
 *
 * As ferramentas interativas têm testes próprios, mais fundos (qa-qual-calcado,
 * qa-tamanho-botina, qa-grade-equipe); este não os substitui.
 *
 * Uso: npm run build && npx next start -p 3000, depois node este-arquivo.
 * Sai com código 1 se encontrar qualquer problema.
 */
import { readFileSync } from 'node:fs'
import { chromium, devices } from '/opt/node22/lib/node_modules/playwright/index.mjs'

const BASE = process.env.BASE || 'http://localhost:3000'
const numero = readFileSync('src/config/empresa.ts', 'utf8').match(/numero:\s*'(\d+)'/)[1]
const waOk = new RegExp(`^https://wa\\.me/${numero}(\\?text=.*)?$`)

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const p0 = await b.newPage()
await p0.goto(BASE + '/sitemap.xml', { waitUntil: 'domcontentloaded' })
const rotas = [...(await p0.content()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
await p0.close()

const problemas = []
const links = new Set()
const falha = (modo, rota, msg) => problemas.push(`${modo.padEnd(8)} ${rota}  ${msg}`)

const modos = [
  { nome: 'desktop', ctx: { viewport: { width: 1280, height: 900 } } },
  { nome: 'celular', ctx: { ...devices['Pixel 7'] } },
]

for (const modo of modos) {
  const ctx = await b.newContext(modo.ctx)
  const p = await ctx.newPage()
  let rota = ''
  p.on('pageerror', (e) => falha(modo.nome, rota, `erro JS: ${e.message.slice(0, 120)}`))
  p.on('console', (m) => {
    if (m.type() === 'error') falha(modo.nome, rota, `console.error: ${m.text().slice(0, 120)}`)
  })
  p.on('response', (r) => {
    if (r.url().startsWith(BASE) && r.status() >= 400) falha(modo.nome, rota, `${r.status()} ${r.url().slice(BASE.length)}`)
  })

  for (rota of rotas) {
    const resp = await p.goto(BASE + rota, { waitUntil: 'load' })
    if (!resp || resp.status() !== 200) falha(modo.nome, rota, `status ${resp && resp.status()}`)
    await p.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 30))
      }
      window.scrollTo(0, 0)
    })
    await p.waitForTimeout(150)
    const dados = await p.evaluate(() => ({
      h1: document.querySelectorAll('h1').length,
      htmlCru: (document.querySelector('main') || document.body).innerText.match(/<\/?(a|strong|em|br|p)\b[^>]*>|&lt;|&gt;/i)?.[0] || '',
      imgs: [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.loading !== 'lazy').map((i) => i.currentSrc || i.src),
      wa: [...document.querySelectorAll('a[href]')]
        .filter((a) => /^(wa\.me|(api|web)\.whatsapp\.com)$/.test(a.hostname))
        .map((a) => a.href),
      internos: [...document.querySelectorAll('a[href]')]
        .map((a) => a.getAttribute('href'))
        .filter((h) => h.startsWith('/') && !h.startsWith('//')),
    }))
    if (dados.h1 !== 1) falha(modo.nome, rota, `${dados.h1} H1`)
    if (dados.htmlCru) falha(modo.nome, rota, `código HTML aparecendo como texto: ${dados.htmlCru}`)
    for (const s of dados.imgs) falha(modo.nome, rota, `imagem quebrada ${s}`)
    for (const h of dados.wa) if (!waOk.test(h)) falha(modo.nome, rota, `WhatsApp fora do padrão ${h.slice(0, 80)}`)
    for (const h of dados.internos) links.add(h.split('#')[0])

    if (modo.nome === 'celular') {
      const botao = p.locator('button[aria-controls="menu-mobile"]')
      if ((await botao.count()) !== 1) falha(modo.nome, rota, 'botão do menu não encontrado')
      else {
        await botao.click()
        const menu = p.locator('#menu-mobile')
        const visivel = await menu.isVisible().catch(() => false)
        const itens = visivel ? await menu.locator('a[href]').count() : 0
        if (!visivel || itens === 0) falha(modo.nome, rota, 'menu não abriu ou está vazio')
        if ((await botao.getAttribute('aria-expanded')) !== 'true') falha(modo.nome, rota, 'aria-expanded não virou true')
        await botao.click()
        if (await menu.isVisible().catch(() => false)) falha(modo.nome, rota, 'menu não fechou')
      }
    }
  }
  await ctx.close()
  process.stderr.write(`${modo.nome}: ${rotas.length} rotas\n`)
}

// Links internos: cada destino único, uma vez.
const req = await b.newContext()
for (const h of [...links].filter(Boolean)) {
  const r = await req.request.get(BASE + h, { maxRedirects: 3 })
  if (r.status() >= 400) falha('link', h, `status ${r.status()}`)
}
await req.close()

// Formulário de orçamento: escolhe categoria e confere o link do botão.
for (const modo of modos) {
  const ctx = await b.newContext(modo.ctx)
  const p = await ctx.newPage()
  await p.addInitScript(() => {
    window.__abriu = []
    window.open = (u) => { window.__abriu.push(String(u)); return null }
  })
  await p.goto(BASE + '/orcamento/', { waitUntil: 'load' })
  const sel = p.locator('select[id^="cat-"]').first()
  const opcao = await sel.locator('option').nth(1)
  const rotulo = (await opcao.textContent()).trim()
  await sel.selectOption({ index: 1 })
  await p.getByRole('button', { name: 'Enviar pelo WhatsApp' }).click()
  const abriu = await p.evaluate(() => window.__abriu)
  if (abriu.length !== 1) falha(modo.nome, '/orcamento/', `botão abriu ${abriu.length} links`)
  else if (!waOk.test(abriu[0])) falha(modo.nome, '/orcamento/', `link fora do padrão ${abriu[0].slice(0, 80)}`)
  else if (!decodeURIComponent(abriu[0]).includes(rotulo)) falha(modo.nome, '/orcamento/', `mensagem sem a categoria "${rotulo}"`)
  await ctx.close()
}

await b.close()
console.log(`rotas: ${rotas.length} x 2 modos | links internos únicos: ${links.size} | número do WhatsApp: ${numero}`)
if (problemas.length) {
  console.log(`PROBLEMAS: ${problemas.length}`)
  for (const x of problemas) console.log('  ' + x)
  process.exit(1)
}
console.log('TUDO OK')
