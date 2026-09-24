/**
 * Varredura da lógica de src/lib/tamanho-calcado.ts — sem navegador.
 *
 * Transpila o módulo com o TypeScript do projeto e confere:
 *
 *   - a leitura da medida: vírgula e ponto valem o mesmo, "cm" no fim é
 *     aceito, milímetro sem vírgula vira sugestão, 5 e 80 são recusados;
 *   - toda medida de 18,0 a 34,0 cm, de décimo em décimo: número único só
 *     perto do centro, faixa sempre de dois vizinhos, nada anda para trás
 *     quando o pé cresce;
 *   - que a tabela de referência da página e a calculadora não se
 *     contradizem: o comprimento publicado para cada número, digitado na
 *     calculadora, devolve esse mesmo número;
 *   - que o link compartilhado reproduz o estado, e que a URL adulterada
 *     não passa nada;
 *   - que a mensagem do WhatsApp cabe no limite em todas as combinações.
 *
 * Uso:  node docs/ferramentas/qa-tamanho-botina-logica.mjs   (não precisa do site no ar)
 */
import { createRequire } from 'module'
import { readFileSync, writeFileSync, mkdtempSync } from 'fs'
import { tmpdir } from 'os'
import { join, resolve } from 'path'
const require = createRequire(import.meta.url)
const ts = require(join(process.cwd(), 'node_modules/typescript'))
const dir = mkdtempSync(join(tmpdir(), 'tb-'))
const tr = (arq) => ts.transpileModule(readFileSync(arq, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText
writeFileSync(join(dir, 'cotacao.cjs'), tr('src/content/cotacao.ts'))
writeFileSync(
  join(dir, 'tb.cjs'),
  tr('src/lib/tamanho-calcado.ts')
    .replace('"@/content/tabelas-numeracao.json"', JSON.stringify(resolve('src/content/tabelas-numeracao.json')))
    .replace('"@/content/cotacao"', JSON.stringify(join(dir, 'cotacao.cjs'))),
)
const t = require(join(dir, 'tb.cjs'))

const falhas = []
const falha = (m) => falhas.push(m)
const igual = (a, b) => JSON.stringify(a) === JSON.stringify(b)

/* leitura */
const CASOS = [
  ['26', { ok: true, cm: 26 }], ['26,4', { ok: true, cm: 26.4 }], ['26.4', { ok: true, cm: 26.4 }],
  [' 26,4 cm ', { ok: true, cm: 26.4 }], ['26,45', { ok: true, cm: 26.5 }], ['18', { ok: true, cm: 18 }], ['34', { ok: true, cm: 34 }],
  ['264', { ok: false, erro: 'mm', sugestaoCm: 26.4 }], ['180', { ok: false, erro: 'mm', sugestaoCm: 18 }],
  ['5', { ok: false, erro: 'fora' }], ['80', { ok: false, erro: 'fora' }], ['0', { ok: false, erro: 'fora' }],
  ['17,9', { ok: false, erro: 'fora' }], ['34,1', { ok: false, erro: 'fora' }], ['', { ok: false, erro: 'vazio' }],
  ['   ', { ok: false, erro: 'vazio' }], ['abc', { ok: false, erro: 'formato' }], ['-26', { ok: false, erro: 'formato' }],
  ['26,,4', { ok: false, erro: 'formato' }], ['26,456', { ok: false, erro: 'formato' }], ['2640', { ok: false, erro: 'formato' }],
  ['26 4', { ok: false, erro: 'mm', sugestaoCm: 26.4 }],
]
for (const [entrada, esperado] of CASOS) {
  const r = t.lerMedida(entrada)
  if (!igual(r, esperado)) falha(`lerMedida(${JSON.stringify(entrada)}) = ${JSON.stringify(r)}, esperado ${JSON.stringify(esperado)}`)
}

/* estimativa, décimo a décimo */
let unicos = 0, faixas = 0, anterior = null
for (let d = 180; d <= 340; d++) {
  const cm = d / 10
  const e = t.estimar(cm)
  const n = Math.round(e.bruto)
  if (e.tipo === 'unico') {
    unicos++
    if (Math.abs(e.bruto - e.numero) > t.MEIO_NUMERO + 1e-9) falha(`${cm} cm: número único longe do centro`)
    if (e.numero !== n) falha(`${cm} cm: número único ${e.numero} não é o mais próximo (${n})`)
  } else {
    faixas++
    if (e.ate !== e.de + 1) falha(`${cm} cm: faixa que não é de vizinhos`)
    if (!(e.bruto > e.de && e.bruto < e.ate)) falha(`${cm} cm: faixa ${e.de}-${e.ate} não contém ${e.bruto.toFixed(2)}`)
  }
  const baixo = e.tipo === 'unico' ? e.numero : e.de
  if (anterior !== null && baixo < anterior) falha(`${cm} cm: estimativa andou para trás`)
  anterior = baixo
}

/* tabela da página × calculadora */
for (let n = 30; n <= 50; n++) {
  const cm = t.cmDoNumero(n)
  const e = t.estimar(cm)
  if (!(e.tipo === 'unico' && e.numero === n)) falha(`tabela diz ${n} = ${cm} cm, calculadora devolve ${t.textoEstimativa(e)}`)
}

/* estado na URL e mensagem */
let maior = 0, estados = 0
for (let d = 180; d <= 340; d++) for (const largura of [undefined, 'estreito', 'normal', 'largo', 'nao-sei'])
for (const para of [undefined, 'mim', 'equipe']) for (const calcado of [undefined, 'ocupacional', 'seguranca', 'bota-impermeavel', 'confirmar']) {
  const s = { cm: d / 10, largura, para, calcado }
  const volta = t.desserializar(t.serializar(s)).estado
  const limpo = Object.fromEntries(Object.entries(s).filter(([, v]) => v !== undefined))
  const voltaLimpa = volta && Object.fromEntries(Object.entries(volta).filter(([, v]) => v !== undefined))
  if (!igual(voltaLimpa, limpo)) falha(`link não reproduz ${JSON.stringify(s)} → ${JSON.stringify(volta)}`)
  const m = t.mensagemWhatsApp(s)
  maior = Math.max(maior, m.length)
  if (m.length > 1400) falha(`mensagem com ${m.length} caracteres`)
  if (!m.includes(t.formatarCm(s.cm) + ' cm')) falha(`mensagem sem a medida: ${JSON.stringify(s)}`)
  estados++
}
for (const qs of ['pe=abc', 'pe=5', 'pe=264', 'pe=26.4&largura=<b>', 'calcado=<script>', 'pe=26.4&para=admin', 'pe=', '']) {
  const r = t.desserializar(qs)
  const txt = JSON.stringify(r)
  if (/<|script|admin/.test(txt)) falha(`URL adulterada passou: ${qs} → ${txt}`)
  if (/^pe=(abc|5|264|)$/.test(qs) && r.estado) falha(`medida inválida na URL virou resultado: ${qs}`)
}

/* dois pés */
const p = t.maiorPe(26.1, 26.5)
if (!(p.maior === 26.5 && p.lado === 'direito' && p.diferenca === 0.4)) falha(`maiorPe(26,1; 26,5) = ${JSON.stringify(p)}`)
if (t.maiorPe(26, 26).lado !== 'iguais') falha('maiorPe com pés iguais')

console.log(`# Lógica — calculadora de tamanho de botina\n`)
console.log(`referência: ${t.REFERENCIA.nome}, passo ${t.REFERENCIA.passoMm} mm, verificada: ${t.REFERENCIA.verificada}`)
console.log(`leitura: ${CASOS.length} entradas`)
console.log(`medidas de 18,0 a 34,0 cm: ${unicos} com número único, ${faixas} com dois números`)
console.log(`estados de URL e mensagem: ${estados}; maior mensagem ${maior} caracteres`)
if (falhas.length) {
  console.log(`\nFALHAS: ${falhas.length}`)
  for (const f of falhas.slice(0, 30)) console.log('  - ' + f)
  process.exit(1)
}
console.log('\nTUDO OK')
