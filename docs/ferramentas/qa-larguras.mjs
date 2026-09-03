/**
 * Varredura de estouro horizontal — todas as rotas, doze larguras.
 *
 * Existe porque a QA anterior media 390 e 1440, e um destaque que nao cabia
 * passou nas duas: estourava abaixo de 360px e de novo em 1024px, onde a
 * grade da barra de prova vira quatro colunas com o container ainda estreito.
 * Duas larguras nao sao uma amostra; sao dois pontos escolhidos por habito.
 *
 * Reporta duas coisas: pagina que rola na horizontal, e elemento de texto
 * cujo conteudo nao cabe na propria caixa.
 *
 * FALSO POSITIVO CONHECIDO: o "1995" decorativo do rodape (aria-hidden)
 * transborda a propria coluna de proposito, para a calha vazia ao lado, e
 * aparece uma vez por pagina a partir de 1024px. Nao e defeito.
 *
 * Uso: npm run build && npx next start -p 3000, depois node este-arquivo.
 */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const BASE = 'http://localhost:3000';
const larguras = [320, 360, 390, 412, 480, 640, 768, 900, 1024, 1180, 1280, 1440];

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p0 = await b.newPage();
await p0.goto(BASE + '/sitemap.xml', { waitUntil: 'domcontentloaded' });
const xml = await p0.content();
const rotas = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname);
await p0.close();

const problemas = [];
for (const w of larguras) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  for (const r of rotas) {
    await p.goto(BASE + r, { waitUntil: 'domcontentloaded' });
    await p.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise(res => setTimeout(res, 120));
      window.scrollTo(0, 0);
    });
    await p.waitForTimeout(80);
    const achados = await p.evaluate(() => {
      const out = [];
      if (document.documentElement.scrollWidth > innerWidth + 1)
        out.push({ tipo: 'pagina', txt: `doc ${document.documentElement.scrollWidth} > ${innerWidth}` });
      for (const el of document.querySelectorAll('p,h1,h2,h3,span,a,li,div,td')) {
        if (el.children.length) continue;
        const t = (el.textContent || '').trim();
        if (!t) continue;
        const cs = getComputedStyle(el);
        if (cs.overflow !== 'visible' || cs.position === 'absolute') continue;
        if (el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0)
          out.push({ tipo: 'texto', txt: t.slice(0, 28), need: el.scrollWidth, have: el.clientWidth });
      }
      return out;
    });
    for (const a of achados) problemas.push({ w, r, ...a });
  }
  await p.close();
  process.stderr.write(`${w} `);
}
console.log('');
const chave = x => `${x.r} | ${x.txt}`;
const porChave = new Map();
for (const x of problemas) {
  const k = chave(x);
  if (!porChave.has(k)) porChave.set(k, { ...x, larguras: [] });
  porChave.get(k).larguras.push(x.w);
}
console.log(`PROBLEMAS: ${porChave.size} (${problemas.length} ocorrências)\n`);
for (const v of [...porChave.values()].sort((a, b) => a.r.localeCompare(b.r)))
  console.log(`${v.r}\n   "${v.txt}" ${v.need ? `precisa ${v.need}px, tem ${v.have}px` : ''}\n   larguras: ${v.larguras.join(', ')}\n`);
await b.close();
