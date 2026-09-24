/**
 * Testes da lógica de src/lib/grade-equipe.ts — sem navegador.
 *
 * Confere, com casos escritos à mão e 20 mil grades sorteadas:
 *
 *   - soma e multiplicação: pares-base = pessoas × pares por pessoa, número
 *     a número, e o total fecha;
 *   - reserva percentual: sobre pares (não pessoas), total arredondado para
 *     cima, soma distribuída igual ao total, cada número com a parte inteira
 *     ou a parte inteira + 1 da sua cota (método dos maiores restos);
 *   - pendentes fora do pedido e fora da reserva;
 *   - conferência contra a equipe informada (faltam / sobram);
 *   - importação de lista colada e CSV: separadores, cabeçalho, pendente,
 *     numeração fora da faixa, linha sem número;
 *   - exportação: texto, CSV e WhatsApp com o mesmo total, e nenhum nome
 *     de colaborador em nenhuma saída nem no que fica salvo no navegador;
 *   - os cinco casos de uso do briefing.
 *
 * Uso:  node docs/ferramentas/qa-grade-equipe-logica.mjs   (não precisa do site no ar)
 */
import { createRequire } from 'module'
import { readFileSync, writeFileSync, mkdtempSync } from 'fs'
import { tmpdir } from 'os'
import { join, resolve } from 'path'
const require = createRequire(import.meta.url)
const ts = require(join(process.cwd(), 'node_modules/typescript'))
const dir = mkdtempSync(join(tmpdir(), 'ge-'))
const tr = (arq) => ts.transpileModule(readFileSync(arq, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText
writeFileSync(join(dir, 'cotacao.cjs'), tr('src/content/cotacao.ts'))
writeFileSync(join(dir, 'tc.cjs'), tr('src/lib/tamanho-calcado.ts')
  .replace('"@/content/tabelas-numeracao.json"', JSON.stringify(resolve('src/content/tabelas-numeracao.json')))
  .replace('"@/content/cotacao"', JSON.stringify(join(dir, 'cotacao.cjs'))))
writeFileSync(join(dir, 'ge.cjs'), tr('src/lib/grade-equipe.ts')
  .replace('"@/content/cotacao"', JSON.stringify(join(dir, 'cotacao.cjs')))
  .replace('"@/lib/tamanho-calcado"', JSON.stringify(join(dir, 'tc.cjs'))))
const g = require(join(dir, 'ge.cjs'))

const falhas = []
const f = (m) => falhas.push(m)
const eq = (a, b, m) => { if (JSON.stringify(a) !== JSON.stringify(b)) f(`${m}: ${JSON.stringify(a)} ≠ ${JSON.stringify(b)}`) }
const estado = (x) => ({ ...g.ESTADO_INICIAL, ...x })
const grade = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [String(k), v]))

/* ---- casos do briefing ---- */
// 91: 30 pessoas, 1 par, sem reserva
{
  const e = estado({ contagem: grade({ 36: 2, 38: 5, 39: 6, 40: 8, 41: 5, 42: 3, 43: 1 }) })
  const r = g.calcular(e)
  eq([r.pessoas, r.base, r.reserva, r.pedido], [30, 30, 0, 30], 'caso 91')
  eq(r.linhas.map((l) => l.pedido), [2, 5, 6, 8, 5, 3, 1], 'caso 91 linhas')
}
// 92: 100 pessoas, 2 pares, 5% → base 200, reserva 10 (sobre pares)
{
  const e = estado({ contagem: grade({ 36: 4, 37: 6, 38: 10, 39: 14, 40: 30, 41: 16, 42: 12, 43: 6, 44: 2 }), paresPorPessoa: 2, reserva: { tipo: 'percentual', pct: 5 } })
  const r = g.calcular(e)
  eq([r.pessoas, r.base, r.reserva, r.pedido], [100, 200, 10, 210], 'caso 92')
  const r40 = r.linhas.find((l) => l.numero === 40)
  eq([r40.base, r40.reserva], [60, 3], 'caso 92: o 40 (30% da equipe) leva 3 dos 10')
  eq(r.linhas.find((l) => l.numero === 44).reserva, 0, 'caso 92: ponta sem reserva')
}
// 93: equipe 50, grade 48 → faltam 2
{
  const e = estado({ contagem: grade({ 39: 20, 40: 28 }), equipeInformada: 50 })
  eq(g.conferir(e, g.calcular(e)), { tipo: 'faltam', n: 2 }, 'caso 93')
  const e2 = estado({ contagem: grade({ 39: 20, 40: 28 }), pendentes: 2, equipeInformada: 50 })
  eq(g.conferir(e2, g.calcular(e2)), { tipo: 'ok' }, 'caso 93 com pendentes')
  const e3 = estado({ contagem: grade({ 39: 30, 40: 22 }), equipeInformada: 50 })
  eq(g.conferir(e3, g.calcular(e3)), { tipo: 'sobram', n: 2 }, 'caso 58: sobram')
}
// 94: sem total informado, só a grade
{
  const e = estado({ contagem: grade({ 38: 3, 39: 4 }) })
  eq(g.conferir(e, g.calcular(e)), { tipo: 'sem-referencia' }, 'caso 94')
  eq(g.calcular(e).pessoas, 7, 'caso 94 soma')
}
// 95: só 40—12, 41—8, 42—4
{
  const r = g.calcular(estado({ contagem: grade({ 40: 12, 41: 8, 42: 4 }) }))
  eq([r.pedido, r.faixa, r.maisFrequentes], [24, { min: 40, max: 42 }, [40]], 'caso 95')
}
// pendentes nunca entram no pedido nem na reserva
{
  const r = g.calcular(estado({ contagem: grade({ 40: 10 }), pendentes: 5, reserva: { tipo: 'percentual', pct: 10 } }))
  eq([r.pessoas, r.pendentes, r.base, r.reserva, r.pedido], [10, 5, 10, 1, 11], 'pendentes fora')
}

/* ---- arredondamento ---- */
eq(g.calcular(estado({ contagem: grade({ 40: 80 }), reserva: { tipo: 'percentual', pct: 5 } })).reservaDescricao, 'Você escolheu 5% de reserva sobre 80 pares: 4 pares, distribuídos conforme a equipe.', 'descrição sem arredondamento')
eq(g.calcular(estado({ contagem: grade({ 40: 74 }), reserva: { tipo: 'percentual', pct: 5 } })).reservaDescricao, 'Você escolheu 5% de reserva sobre 74 pares: 3,7, arredondados para cima, 4 pares, distribuídos conforme a equipe.', 'descrição com arredondamento')
eq(g.totalReservaPercentual(100, 5), 5, '5% de 100')
eq(g.totalReservaPercentual(74, 5), 4, '5% de 74 (3,7 → 4)')
eq(g.totalReservaPercentual(200, 10), 20, '10% de 200')
eq(g.totalReservaPercentual(3, 5), 1, '5% de 3 (0,15 → 1)')
eq(g.totalReservaPercentual(0, 10), 0, '10% de 0')
eq(g.totalReservaPercentual(100, 0), 0, '0% de 100')
for (let b = 1; b <= 3000; b++) for (const p of [1, 3, 5, 7, 10, 15, 20, 33, 50]) {
  const t = g.totalReservaPercentual(b, p)
  if (t < (b * p) / 100 - 1e-9 || t - (b * p) / 100 >= 1) f(`arredondamento ${p}% de ${b} = ${t}`)
}

/* ---- sugestão por numeração ---- */
eq(g.sugestaoPorNumeracao(new Map([[38, 10], [39, 14], [40, 18], [41, 13], [42, 9]])), { 40: 1, 39: 1 }, 'sugestão: números que somam metade')

/* ---- 20 mil grades sorteadas ---- */
let semente = 7
const rnd = () => ((semente = (semente * 1103515245 + 12345) % 2147483648) / 2147483648)
let maiorMsg = 0
for (let k = 0; k < 20000; k++) {
  const contagem = {}
  for (const n of g.NUMEROS) if (rnd() < 0.6) contagem[String(n)] = Math.floor(rnd() ** 3 * 400)
  const ppp = 1 + Math.floor(rnd() * 3)
  const tipo = rnd()
  const reserva = tipo < 0.3 ? { tipo: 'nenhuma' } : tipo < 0.8 ? { tipo: 'percentual', pct: [5, 10, 3, 7, 12, 25, 50][Math.floor(rnd() * 7)] } : { tipo: 'numeracao', porNumero: { 40: 2, 41: 1 } }
  const e = estado({ contagem, paresPorPessoa: ppp, reserva, pendentes: Math.floor(rnd() * 4) })
  const r = g.calcular(e)
  const pessoas = Object.values(contagem).reduce((a, b) => a + b, 0)
  if (r.pessoas !== pessoas) f(`#${k} soma de pessoas`)
  if (r.base !== pessoas * ppp) f(`#${k} pares-base`)
  if (r.pedido !== r.base + r.reserva) f(`#${k} pedido ≠ base + reserva`)
  if (r.linhas.reduce((a, l) => a + l.pedido, 0) !== r.pedido) f(`#${k} linhas não fecham o total`)
  for (const l of r.linhas) if (l.base !== l.pessoas * ppp || l.pedido !== l.base + l.reserva) f(`#${k} linha ${l.numero}`)
  if (reserva.tipo === 'percentual') {
    const total = g.totalReservaPercentual(r.base, reserva.pct)
    if (r.reserva !== total) f(`#${k} reserva distribuída ${r.reserva} ≠ total ${total}`)
    for (const l of r.linhas) {
      const cota = r.base ? (total * l.base) / r.base : 0
      if (l.reserva < Math.floor(cota) || l.reserva > Math.ceil(cota)) f(`#${k} número ${l.numero}: reserva ${l.reserva} fora da cota ${cota.toFixed(2)}`)
      if (l.base === 0 && l.reserva > 0) f(`#${k} reserva em número sem ninguém`)
    }
  }
  if (/(\d+) \1 pares?/.test(r.reservaDescricao) || /\d par(es)?, distribu/.test(r.reservaDescricao) === false && reserva.tipo === 'percentual' && r.reserva > 0) f(`#${k} descrição da reserva: "${r.reservaDescricao}"`)
  const m = g.mensagemWhatsApp(r, e)
  maiorMsg = Math.max(maiorMsg, m.length)
  if (m.length > 1400) f(`#${k} mensagem com ${m.length} caracteres`)
  if (r.pedido && !m.includes(`Total: ${r.pedido} `)) f(`#${k} mensagem sem o total`)
  const csv = g.csvGrade(r).trim().split('\r\n')
  const linhaTotal = csv.find((x) => x.startsWith('Total;'))
  if (!linhaTotal || !linhaTotal.endsWith(`;${r.pedido}`)) f(`#${k} CSV sem o total certo`)
  if (r.pedido && !g.textoGrade(r, e).includes(`Total: ${r.pedido} `)) f(`#${k} texto sem o total`)
}

/* ---- importação ---- */
const imp = g.interpretarLista([
  'nome;numeração;setor',
  'Carlos,40',
  'João — 42 — Logística',
  'Ana\t36\tLimpeza',
  'Paulo, ?',
  'Mariana 38 Cozinha',
  '40',
  'Pedro;1234;41;Manutenção',
  'Zé;52',
  'Beto;',
  '"Lúcia";"39";"Forma feminina"',
  '',
  'Rafa, pendente, Produção',
].join('\n'))
eq(imp.cabecalhos, 1, 'importação: cabeçalho pulado')
eq(imp.pessoas.map((p) => [p.nome ?? '', p.numero, p.grupo ?? '']), [
  ['Carlos', 40, ''], ['João', 42, 'Logística'], ['Ana', 36, 'Limpeza'], ['Paulo', null, ''],
  ['Mariana', 38, 'Cozinha'], ['', 40, ''], ['Pedro 1234', 41, 'Manutenção'], ['Lúcia', 39, 'Forma feminina'], ['Rafa', null, 'Produção'],
], 'importação: pessoas')
eq(imp.ignoradas.map((x) => x.linha), [9, 10], 'importação: ignoradas (52 fora da faixa; sem número)')
if (!/fora da faixa/.test(imp.ignoradas[0]?.motivo ?? '')) f('importação: motivo da faixa')

/* ---- grupos e privacidade ---- */
{
  const e = estado({ modo: 'lista', pessoas: imp.pessoas, reserva: { tipo: 'percentual', pct: 10 } })
  const r = g.calcular(e)
  eq([r.pessoas, r.pendentes], [7, 2], 'lista: confirmados e pendentes')
  if (!r.grupos.find((x) => x.nome === 'Produção' && x.pendentes === 1)) f('grupo só com pendente sumiu')
  const saidas = [g.mensagemWhatsApp(r, e), g.textoGrade(r, e), g.csvGrade(r), g.paraSalvar(e)]
  for (const nome of ['Carlos', 'João', 'Ana', 'Paulo', 'Mariana', 'Pedro', 'Lúcia', 'Rafa'])
    saidas.forEach((s, i) => { if (s.includes(nome)) f(`nome "${nome}" vazou na saída ${['whatsapp', 'texto', 'csv', 'salvo'][i]}`) })
  eq(g.duplicados([{ nome: 'João' }, { nome: 'joao ' }, { nome: 'Ana' }]), ['joao'], 'duplicados')
  const volta = g.lerSalvo(g.paraSalvar(e))
  eq(volta.pessoas.map((p) => [p.numero, p.grupo ?? '']), imp.pessoas.map((p) => [p.numero, p.grupo ?? '']), 'salvo: lista sem nomes volta igual')
  eq(g.calcular(volta).pedido, r.pedido, 'salvo: mesmo pedido')
}
for (const lixo of [null, '', '{', '[]', '{"versao":2}', '{"versao":1,"contagem":{"40":-3,"41":"x","99":5},"paresPorPessoa":999,"reserva":{"tipo":"percentual","pct":900}}']) {
  const v = g.lerSalvo(lixo)
  if (v && (v.contagem['40'] || v.contagem['99'] || v.paresPorPessoa > g.PARES_POR_PESSOA_MAX || (v.reserva.tipo === 'percentual' && v.reserva.pct > g.RESERVA_PCT_MAX))) f(`salvo adulterado passou: ${lixo}`)
}

/* ---- entradas ---- */
eq(['', '0', '12', '-1', '1.5', 'abc', '20001', ' 7 '].map((x) => g.lerQuantidade(x)), [0, 0, 12, null, null, null, null, 7], 'lerQuantidade')

console.log('# Lógica — calculadora de grade de numeração\n')
console.log(`faixa: ${g.NUMERO_MIN} a ${g.NUMERO_MAX}`)
console.log(`casos do briefing: 91–95, 58; 20.000 grades sorteadas; maior mensagem ${maiorMsg} caracteres`)
console.log(`importação: ${imp.pessoas.length} pessoas, ${imp.ignoradas.length} linhas ignoradas com motivo`)
if (falhas.length) {
  console.log(`\nFALHAS: ${falhas.length}`)
  for (const x of falhas.slice(0, 30)) console.log('  - ' + x)
  process.exit(1)
}
console.log('\nTUDO OK')
