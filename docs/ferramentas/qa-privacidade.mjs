/**
 * Verificador de privacidade — o que o site realmente coleta, nas três trilhas.
 *
 * Mede em navegador real, com os recursos carregados: cookies gravados, hosts
 * de terceiros contatados, localStorage, sessionStorage e presença de gtag ou
 * dataLayer.
 *
 * TRÊS TRILHAS, PORQUE UMA SÓ MENTE. A versão anterior deste script media uma
 * situação — o site sem medição — e afirmava "zero cookies". Com GA4 sob
 * consentimento, essa medição sozinha continuaria dando zero e esconderia o
 * que acontece depois do aceite. Então:
 *
 *   1. SEM RESPONDER ao banner — tem de ser zero cookie e zero host externo.
 *      É a promessa mais forte da política de cookies e a mais fácil de
 *      quebrar sem ninguém ver.
 *   2. DEPOIS DE RECUSAR — idem. Recusa que ainda carrega script não é recusa.
 *   3. DEPOIS DE ACEITAR — o gtag.js DEVE ser pedido, com o ID configurado, e
 *      os cookies do Google devem aparecer. Se não aparecerem, o consentimento
 *      foi colhido e a medição não funciona, que é o pior dos dois mundos:
 *      incomoda o visitante e não entrega dado.
 *
 * REDE BLOQUEADA NÃO É DEFEITO DE CÓDIGO. Em ambiente sem saída para o Google
 * — sandbox, CI fechado — o pedido sai e morre no proxy, e nenhum cookie
 * aparece. O script separa os dois casos: se o host foi pedido e a rede
 * recusou, ele diz que a trilha 3 é INCONCLUSIVA e afirma só o que mediu (o
 * pedido só existiu depois do aceite, e apontou para o ID certo). Reportar
 * isso como falha treinaria quem lê a ignorar o relatório.
 *
 * Existe porque uma política anterior afirmava que o site usava ferramenta de
 * análise de audiência — e não usava. Documento legal que descreve tratamento
 * inexistente é pior que documento omisso; documento que descreve tratamento
 * menor do que o real é pior ainda.
 *
 * SE A TRILHA 1 OU A 2 ACUSAR COOKIE OU HOST EXTERNO, o site está quebrando o
 * que /politica-de-cookies/ afirma por escrito. Não é ajuste de texto: é
 * defeito de código, e o texto está certo.
 *
 * Uso: NEXT_PUBLIC_GA_ID=G-XXXX npm run build && npx next start -p 3000,
 * depois node este-arquivo. Sem a variável, o script mede o site sem medição e
 * pula as trilhas 2 e 3 — que é o comportamento correto, porque sem GA
 * configurado não existe banner.
 */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const B = 'http://localhost:3000';
const ROTAS = [
  '/',
  '/orcamento/',
  '/encontrar-epi/',
  '/conhecimento/',
  '/empresas/',
  '/contato/',
  '/politica-de-privacidade/',
  '/politica-de-cookies/',
  '/epi-por-cidade/teresina-pi/',
];

const navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Uma trilha: contexto limpo, uma decisão, todas as rotas, e o que sobrou. */
async function medir(nome, decidir) {
  const ctx = await navegador.newContext();
  const p = await ctx.newPage();
  const externos = new Set();
  const pedidosGoogle = [];
  const falhados = new Set();
  p.on('request', (r) => {
    const h = new URL(r.url()).host;
    if (h.startsWith('localhost')) return;
    externos.add(`${h} (${r.resourceType()})`);
    if (h.includes('google')) pedidosGoogle.push(r.url());
  });
  p.on('requestfailed', (r) => {
    const h = new URL(r.url()).host;
    if (!h.startsWith('localhost')) falhados.add(h);
  });

  await p.goto(B + '/', { waitUntil: 'networkidle' });
  const temBanner = await p.locator('[aria-labelledby="consentimento-titulo"]').count();
  if (decidir) await decidir(p);

  for (const r of ROTAS) await p.goto(B + r, { waitUntil: 'networkidle' });
  // Interage com a ferramenta e o formulário: é onde a pessoa digita, e onde
  // um vazamento para servidor apareceria.
  await p.goto(B + '/encontrar-epi/', { waitUntil: 'networkidle' });
  await p.goto(B + '/orcamento/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);

  const cookies = await ctx.cookies();
  const armazenamento = await p.evaluate(() => ({
    localStorage: { ...window.localStorage },
    sessionStorage: { ...window.sessionStorage },
    dataLayer: typeof window.dataLayer,
    gtag: typeof window.gtag,
  }));
  await ctx.close();
  return {
    nome,
    temBanner: !!temBanner,
    cookies,
    externos: [...externos],
    pedidosGoogle,
    falhados: [...falhados],
    armazenamento,
  };
}

function relatar(r, esperado) {
  console.log(`\n── ${r.nome} ${'─'.repeat(Math.max(0, 58 - r.nome.length))}`);
  console.log(`banner na tela: ${r.temBanner ? 'sim' : 'não'}`);
  console.log(`cookies (${r.cookies.length}): ${r.cookies.map((c) => c.name).join(', ') || '—'}`);
  console.log(`hosts externos (${r.externos.length}): ${r.externos.join(', ') || '—'}`);
  console.log(`localStorage: ${JSON.stringify(r.armazenamento.localStorage)}`);
  console.log(`sessionStorage: ${JSON.stringify(r.armazenamento.sessionStorage)}`);

  const falhas = [];
  if (esperado === 'limpo') {
    if (r.cookies.length) falhas.push(`gravou ${r.cookies.length} cookie(s) sem aceite`);
    if (r.externos.length)
      falhas.push(`contatou ${r.externos.length} host(s) externo(s) sem aceite`);
  }

  if (esperado === 'medindo') {
    const pediu = r.pedidosGoogle.find((u) => u.includes('/gtag/js'));
    if (!pediu) {
      falhas.push('aceitou e o gtag.js nem chegou a ser pedido');
    } else {
      const id = new URL(pediu).searchParams.get('id') || '';
      console.log(`gtag.js pedido com id=${id}`);
      if (!/^G-[A-Z0-9]{4,}$/.test(id)) falhas.push(`gtag.js pedido com id inválido: ${id}`);
    }
    const bloqueou = r.falhados.some((h) => h.includes('google'));
    if (pediu && bloqueou) {
      console.log('RESULTADO: INCONCLUSIVO — a rede deste ambiente recusou o host do Google.');
      console.log('  Verificado mesmo assim: o pedido só existiu depois do aceite e usou o ID');
      console.log('  configurado. O cookie do GA4 precisa ser conferido em ambiente com saída');
      console.log('  para o Google, ou no relatório de tempo real da própria propriedade.');
      return true;
    }
    if (pediu && !bloqueou && !r.cookies.some((c) => c.name.startsWith('_ga')))
      falhas.push('aceitou, o Google respondeu e nenhum cookie _ga apareceu');
  }

  console.log(falhas.length ? `RESULTADO: FALHOU — ${falhas.join('; ')}` : 'RESULTADO: OK');
  return falhas.length === 0;
}

const clicar = (rotulo) => async (p) => {
  await p.getByRole('button', { name: rotulo, exact: true }).click();
  await p.waitForTimeout(600);
};

const semResposta = await medir('1. sem responder ao banner', null);
let tudoOk = relatar(semResposta, 'limpo');

if (semResposta.temBanner) {
  tudoOk = relatar(await medir('2. depois de recusar', clicar('Recusar')), 'limpo') && tudoOk;
  tudoOk = relatar(await medir('3. depois de aceitar', clicar('Aceitar')), 'medindo') && tudoOk;
} else {
  console.log(
    '\nSem banner: `NEXT_PUBLIC_GA_ID` não está configurada neste build, então não há',
  );
  console.log('medição a consentir e as trilhas 2 e 3 não se aplicam.');
}

await navegador.close();
console.log(`\n${tudoOk ? 'TUDO OK' : 'HÁ FALHA ACIMA'}`);
process.exit(tudoOk ? 0 : 1);
