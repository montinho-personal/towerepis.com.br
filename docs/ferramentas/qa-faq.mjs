/**
 * Verificador de FAQ — presença, visibilidade e duplicação entre páginas.
 *
 * POR QUE EXISTE. A regra do projeto é que todo artigo tem FAQ, e ela é
 * cobrada pelo compilador: `perguntas` é campo obrigatório do tipo `Artigo`,
 * então artigo sem FAQ não compila. Só que o compilador garante que o campo
 * EXISTE — não que o conteúdo preste. Este script cuida da outra metade.
 *
 * O DEFEITO QUE MOTIVOU ISTO. Na primeira leva de FAQ nos artigos, quatro
 * perguntas saíram idênticas a perguntas que já existiam em outras páginas do
 * site: "Quem paga o EPI?" no artigo de NR-6 e em /protecao/, "Calçado
 * ocupacional protege menos?" no artigo e em /calcados/comparativo/, e assim
 * por diante. Duas páginas do mesmo site disputando o mesmo resultado é o
 * pior uso possível de FAQPage — e passou despercebido porque cada página,
 * lida sozinha, estava correta.
 *
 * O QUE MEDE:
 *   1. todo artigo tem FAQ e emite FAQPage;
 *   2. a resposta está VISÍVEL no HTML — exigência do dado estruturado, e o
 *      motivo de o componente usar `<details>` com o texto já no documento;
 *   3. nenhuma pergunta se repete entre páginas diferentes.
 *
 * A semelhança é Jaccard sobre as palavras da pergunta, sem palavra de
 * ligação. 1,00 é pergunta igual; a partir de 0,60 já é a mesma pergunta com
 * outras palavras. Abaixo disso costuma ser vocabulário compartilhado do
 * assunto, que é esperado.
 *
 * EXCEÇÃO DECLARADA: as páginas de cidade perguntam "a Tower atende empresas
 * em X?", uma por cidade. São paralelas de propósito e cada uma nomeia um
 * lugar diferente — é a mesma FORMA de pergunta sobre entidades distintas,
 * não a mesma pergunta. Ficam de fora da acusação.
 *
 * Uso: npm run build && npx next start -p 3000, depois node este-arquivo.
 */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const BASE = 'http://localhost:3000';
const LIMITE = 0.6;

const PARAR = new Set(
  ('a o e de da do das dos para com que em no na um uma por se as os ao é são ser esta este isso ' +
   'qual quais quando onde ou seu sua pelo pela nao não sem sobre entre tem ter pode posso preciso ' +
   'devo mais meu minha vocês vocé').split(' '),
);
const palavras = (s) =>
  new Set(
    s
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2 && !PARAR.has(w)),
  );
const jaccard = (a, b) => {
  const inter = [...a].filter((w) => b.has(w)).length;
  const uniao = new Set([...a, ...b]).size;
  return uniao ? inter / uniao : 0;
};

const navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await navegador.newPage();
await p.goto(`${BASE}/sitemap.xml`, { waitUntil: 'domcontentloaded' });
const rotas = [...(await p.content()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => new URL(m[1]).pathname,
);

const tudo = [];
const artigos = [];
let falhas = 0;

for (const rota of rotas) {
  await p.goto(BASE + rota, { waitUntil: 'domcontentloaded' });
  const d = await p.evaluate(() => {
    const blocos = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .flatMap((s) => {
        try {
          const j = JSON.parse(s.textContent);
          return Array.isArray(j) ? j : [j];
        } catch {
          return [];
        }
      });
    const faq = blocos.find((b) => b['@type'] === 'FAQPage');
    return {
      temFaqPage: !!faq,
      doSchema: faq ? faq.mainEntity.map((q) => ({ q: q.name, a: q.acceptedAnswer.text })) : [],
      naTela: [...document.querySelectorAll('details.faq-item')].map((el) => ({
        q: el.querySelector('summary')?.innerText.trim() ?? '',
        a: el.querySelector('.faq-resposta')?.textContent?.trim() ?? '',
      })),
    };
  });

  const ehArtigo = /^\/conhecimento\/.+/.test(rota);
  if (ehArtigo) artigos.push({ rota, ...d });
  for (const { q } of d.doSchema) tudo.push({ rota, q, t: palavras(q) });

  // A resposta do schema tem de estar na tela, palavra por palavra.
  for (const { q, a } of d.doSchema) {
    const naTela = d.naTela.find((x) => x.q === q);
    if (!naTela || naTela.a !== a) {
      console.log(`FALHA  ${rota}\n       resposta do schema não confere com a da página: "${q}"`);
      falhas++;
    }
  }
}

console.log(`páginas: ${rotas.length}  |  artigos: ${artigos.length}  |  perguntas: ${tudo.length}`);

const semFaq = artigos.filter((a) => !a.temFaqPage);
console.log(
  `\nARTIGOS SEM FAQPage: ${semFaq.length ? semFaq.map((a) => a.rota).join(' ') : 'nenhum'}`,
);
falhas += semFaq.length;

const poucas = artigos.filter((a) => a.doSchema.length < 3);
console.log(
  `ARTIGOS COM MENOS DE 3 PERGUNTAS: ${poucas.length ? poucas.map((a) => a.rota).join(' ') : 'nenhum'}`,
);
falhas += poucas.length;

// Cidade x cidade: mesma forma, entidades diferentes. Não é duplicação.
const eCidade = (r) => /^\/epi-por-cidade\/.+/.test(r);
const pares = [];
for (let i = 0; i < tudo.length; i++) {
  for (let j = i + 1; j < tudo.length; j++) {
    const A = tudo[i];
    const B = tudo[j];
    if (A.rota === B.rota) continue;
    if (eCidade(A.rota) && eCidade(B.rota)) continue;
    const s = jaccard(A.t, B.t);
    if (s >= LIMITE) pares.push({ s, A, B });
  }
}
pares.sort((x, y) => y.s - x.s);
console.log(`\nPERGUNTAS REPETIDAS ENTRE PÁGINAS (>= ${LIMITE}): ${pares.length}`);
for (const { s, A, B } of pares) {
  console.log(`  ${s.toFixed(2)}  ${A.rota}\n          "${A.q}"`);
  console.log(`        ${B.rota}\n          "${B.q}"`);
}
falhas += pares.length;

await navegador.close();
console.log(`\n${falhas ? `HÁ ${falhas} PROBLEMA(S) ACIMA` : 'TUDO OK'}`);
process.exit(falhas ? 1 : 0);
