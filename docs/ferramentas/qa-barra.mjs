/**
 * Matriz da barra contextual — o que cada página realmente mostra.
 *
 * Não lê `barra-contextual.ts`. Abre cada rota do sitemap em navegador real,
 * rola de 5% em 5% e registra em que ponto a barra aparece, qual frase ela
 * traz, qual rótulo o botão usa e que mensagem vai para o WhatsApp. O gatilho
 * da tabela é medido, não copiado da fonte — se a regra e o comportamento
 * divergirem, é o comportamento que aparece aqui.
 *
 * Reporta também os dois defeitos que a barra pode ter e ninguém vê olhando
 * uma página: frase repetida em páginas diferentes e página que devia estar
 * em silêncio e não está.
 *
 * A ESPERA DE 400ms POR PASSO NÃO É FOLGA. A barra entra com uma transição de
 * 300ms disparada por rAF. Uma versão anterior deste script esperava 60ms e
 * lia a barra no meio do caminho — reportou gatilho de 78% onde o real era
 * 30%, e "nunca apareceu" em dez páginas onde ela aparece. Medição rápida
 * demais mede o próprio atraso, não o comportamento.
 *
 * Uso: npm run build && npx next start -p 3000, depois node este-arquivo.
 */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const BASE = 'http://localhost:3000';

const tipo = (r) => {
  if (r === '/') return 'Home';
  if (/^\/conhecimento\/.+/.test(r)) return 'Artigo';
  if (r === '/conhecimento/') return 'Hub editorial';
  if (/^\/epi-por-cidade\/.+-(ce|pi|rn)\/$/.test(r)) return 'Cidade';
  if (/^\/epi-por-cidade\/.+/.test(r)) return 'Estado';
  if (r === '/epi-por-cidade/') return 'Hub local';
  if (/^\/para-seu-trabalho\/.+/.test(r)) return 'Profissão';
  if (/^\/empresas\/[a-z-]+\/$/.test(r) && r !== '/empresas/como-atendemos/') return 'Setor';
  if (/^\/empresas\//.test(r)) return 'Institucional B2B';
  if (/^\/calcados\/.+/.test(r)) return 'Categoria produto';
  if (/^\/protecao\/.+/.test(r)) return 'Categoria proteção';
  if (/^\/marcas\/.+/.test(r)) return 'Marca';
  if (/^\/a-tower\//.test(r)) return 'Institucional';
  return 'Hub';
};

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p0 = await b.newPage();
await p0.goto(BASE + '/sitemap.xml', { waitUntil: 'domcontentloaded' });
const rotas = [...(await p0.content()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname);
await p0.close();

const p = await b.newPage();
await p.setViewportSize({ width: 1280, height: 860 });
const linhas = [];

for (const rota of rotas) {
  await p.goto(BASE + rota, { waitUntil: 'domcontentloaded' });
  const barra = p.locator('[aria-label="Atendimento rápido"]');
  if (await barra.count() === 0) { linhas.push({ rota, tipo: tipo(rota), silencio: true }); continue; }

  // Antes de rolar, a barra tem de estar fora da tela.
  const antes = await barra.evaluate(el => el.getBoundingClientRect().top < window.innerHeight - 4);
  let gatilho = null;
  for (let passo = 0; passo <= 20; passo++) {
    const alvo = passo / 20;
    await p.evaluate(f => {
      const rolavel = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, Math.round(rolavel * f));
    }, alvo);
    await p.waitForTimeout(400);
    const dentro = await barra.evaluate(el => el.getBoundingClientRect().top < window.innerHeight - 4);
    if (dentro) { gatilho = alvo; break; }
  }

  const chamada = (await barra.locator('p').first().innerText()).trim();
  const link = barra.locator('a[href*="wa.me"]').first();
  const href = await link.getAttribute('href');
  const rotulo = (await link.innerText()).trim().split('\n').filter(Boolean).pop();
  const msg = decodeURIComponent((href.split('text=')[1] || '')).replace(/\s+/g, ' ');
  linhas.push({ rota, tipo: tipo(rota), chamada, rotulo, msg, gatilho, apareceuAntes: antes });
}
await b.close();

const ativas = linhas.filter(l => !l.silencio);
console.log('ROTAS: ' + linhas.length + '  |  COM BARRA: ' + ativas.length + '  |  EM SILÊNCIO: ' + (linhas.length - ativas.length));
console.log('\nSILÊNCIO: ' + linhas.filter(l => l.silencio).map(l => l.rota).join(' '));

const cedo = ativas.filter(l => l.apareceuAntes);
console.log('\nAPARECEU SEM ROLAGEM (defeito): ' + (cedo.length ? cedo.map(l => l.rota).join(' ') : 'nenhuma'));
const nunca = ativas.filter(l => l.gatilho === null);
console.log('NUNCA APARECEU (defeito): ' + (nunca.length ? nunca.map(l => l.rota).join(' ') : 'nenhuma'));

const frases = new Map();
for (const l of ativas) frases.set(l.chamada, [...(frases.get(l.chamada) || []), l.rota]);
console.log('FRASES DISTINTAS: ' + frases.size + ' em ' + ativas.length + ' páginas');
const repetidas = [...frases].filter(([, r]) => r.length > 1);
console.log('REPETIDAS: ' + (repetidas.length ? repetidas.map(([f, r]) => `\n  "${f}" → ${r.join(' ')}`).join('') : 'nenhuma'));

const msgs = new Set(ativas.map(l => l.msg));
console.log('MENSAGENS DE WHATSAPP DISTINTAS: ' + msgs.size);

console.log('\n| URL | Tipo | Frase | Botão | Gatilho medido | Mensagem do WhatsApp |');
console.log('| --- | --- | --- | --- | --- | --- |');
for (const l of linhas) {
  if (l.silencio) { console.log(`| ${l.rota} | ${l.tipo} | — sem barra — | — | — | — |`); continue; }
  console.log(`| ${l.rota} | ${l.tipo} | ${l.chamada} | ${l.rotulo} | ${Math.round(l.gatilho * 100)}% | ${l.msg} |`);
}
