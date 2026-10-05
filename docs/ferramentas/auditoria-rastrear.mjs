import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs'
import fs from 'fs'
const BASE = 'http://127.0.0.1:3122'
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const pg = await b.newPage({ viewport: { width: 1280, height: 900 } })

const sitemap = await (await fetch(BASE + '/sitemap.xml')).text()
const doSitemap = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)

// BFS a partir da home para medir profundidade de clique real
const prof = new Map([['/', 0]])
const fila = ['/']
const paginas = {}

async function coletar(rota) {
  const r = await pg.goto(BASE + rota, { waitUntil: 'networkidle' })
  const status = r.status()
  const d = await pg.evaluate(() => {
    const g = (s, a) => document.querySelector(s)?.getAttribute(a) ?? null
    const texto = (s) => document.querySelector(s)?.textContent?.trim() ?? null
    const main = document.querySelector('main') || document.body
    // conteúdo textual sem header/footer/nav
    const clone = main.cloneNode(true)
    clone.querySelectorAll('header,footer,nav,script,style').forEach((e) => e.remove())
    const corpo = (clone.textContent || '').replace(/\s+/g, ' ').trim()

    const headings = [...document.querySelectorAll('h1,h2,h3,h4')]
      .filter((h) => !h.closest('header') && !h.closest('body > footer'))
      .map((h) => ({ n: +h.tagName[1], t: h.textContent.trim().replace(/\s+/g, ' ').slice(0, 120) }))

    const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
      try { const j = JSON.parse(s.textContent); return (Array.isArray(j) ? j : [j]).map((o) => o['@type']).flat() }
      catch { return ['INVÁLIDO'] }
    }).flat()

    // links internos separados por região
    const link = (a) => ({
      href: a.getAttribute('href'),
      anchor: (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
      regiao: a.closest('header') ? 'header'
        : a.closest('body > footer') ? 'footer'
        : a.closest('nav[aria-label="Trilha de navegação"]') ? 'trilha'
        : 'corpo',
    })
    const internos = [...document.querySelectorAll('a[href^="/"]')].map(link)
    const externos = [...document.querySelectorAll('a[href^="http"]')]
      .filter((a) => !a.href.includes('127.0.0.1'))
      .map((a) => ({ href: a.href, anchor: (a.textContent||'').trim().slice(0,60), rel: a.getAttribute('rel') }))

    return {
      title: document.title,
      titleLen: document.title.length,
      desc: g('meta[name=description]', 'content'),
      canonical: g('link[rel=canonical]', 'href'),
      robots: g('meta[name=robots]', 'content'),
      ogImage: g('meta[property="og:image"]', 'content'),
      h1: [...document.querySelectorAll('h1')].map((h) => h.textContent.trim()),
      headings,
      palavras: corpo.split(/\s+/).filter(Boolean).length,
      texto: corpo.slice(0, 400),
      schemas: [...new Set(schemas)],
      internos, externos,
      imagens: [...document.images].map((i) => ({ src: i.currentSrc || i.src, alt: i.alt })),
      faqs: [...document.querySelectorAll('.faq-item summary span:first-child')].map((s) => s.textContent.trim()),
      whatsapp: document.querySelectorAll('a[href*="wa.me"]').length,
    }
  })
  paginas[rota] = { rota, status, profundidade: prof.get(rota), ...d }
  return d.internos.map((l) => l.href.split('#')[0]).filter(Boolean)
}

// Arquivo para baixar (PDF, planilha) não é página: abrir no navegador
// dispara download e derruba o rastreio. Ele é conferido por requisição
// direta, e o link quebrado para arquivo continua aparecendo no relatório.
const ehArquivo = (rota) => /\.[a-z0-9]{2,5}$/i.test(rota.split('/').pop())
const arquivos = {}
async function conferirArquivo(rota, origem) {
  if (arquivos[rota]) { arquivos[rota].origens.push(origem); return }
  const r = await fetch(BASE + rota, { method: 'HEAD' })
  arquivos[rota] = { rota, status: r.status, tipo: r.headers.get('content-type'), robots: r.headers.get('x-robots-tag'), origens: [origem] }
}

while (fila.length) {
  const rota = fila.shift()
  const saidas = await coletar(rota)
  for (const s of saidas) {
    if (ehArquivo(s)) { await conferirArquivo(s, rota); continue }
    const norm = s.endsWith('/') ? s : s + '/'
    if (!prof.has(norm)) { prof.set(norm, prof.get(rota) + 1); fila.push(norm) }
  }
}
// páginas do sitemap não alcançadas por link
for (const r of doSitemap) if (!paginas[r]) { prof.set(r, Infinity); await coletar(r) }

fs.writeFileSync('auditoria/paginas.json', JSON.stringify({ paginas, sitemap: doSitemap, arquivos }, null, 1))
console.log('rastreadas:', Object.keys(paginas).length, '| sitemap:', doSitemap.length)
for (const a of Object.values(arquivos)) console.log(`arquivo ${a.status} ${a.rota} (${a.tipo}${a.robots ? ', ' + a.robots : ''})`)
await b.close()
