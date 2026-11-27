/**
 * Mensagem do orçamento — lógica, sem navegador.
 *
 * Existe pela QA das ferramentas de 27/11/2026: o contador da tela somava
 * negativos e a mensagem não ("2 pares no total" × "34x5 (5 pares)"), e
 * "1e3", "1.5", "abc", "-10" e números enormes iam crus para o WhatsApp.
 * Agora quantidade é inteiro de 1 a 99.999 (`quantidadeValida`), e a mesma
 * regra vale para a tela e para a mensagem.
 *
 * Confere: o que é recusado, o que entra, que a soma da linha bate com as
 * quantidades e que 5.000 orçamentos sorteados (semente fixa) montam a
 * mensagem com todo item, todo número e o total certo.
 *
 * Uso: node docs/ferramentas/qa-orcamento-logica.mjs
 */
import { createRequire } from 'module'
import { readFileSync, writeFileSync, mkdtempSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
const require = createRequire(import.meta.url)
const ts = require(join(process.cwd(), 'node_modules/typescript'))
const dir = mkdtempSync(join(tmpdir(), 'orc-'))
const tr = (arq) => ts.transpileModule(readFileSync(arq, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText
writeFileSync(join(dir, 'empresa.cjs'), tr('src/config/empresa.ts'))
writeFileSync(join(dir, 'wa.cjs'), tr('src/lib/whatsapp.ts').replace('"@/config/empresa"', JSON.stringify(join(dir, 'empresa.cjs'))))
const w = require(join(dir, 'wa.cjs'))

const falhas = []
const f = (m) => falhas.push(m)

for (const [t, esp] of [['1', 1], ['30', 30], ['99999', 99999], ['007', 7], [' 12 ', 12], ['0', null], ['-3', null], ['1e3', null], ['1.5', null], ['1,5', null], ['abc', null], ['', null], ['100000', null], ['99999999999999999999999', null]]) {
  if (w.quantidadeValida(t) !== esp) f(`quantidadeValida("${t}") = ${w.quantidadeValida(t)}, esperado ${esp}`)
}

const base = { cidade: '', prazo: '', nome: '', empresa: '', observacao: '' }
const item = (x) => ({ id: 'i', categoria: 'Calçado de segurança', descricao: '', quantidade: '', numeracao: {}, ...x })

{
  const m = w.mensagemCotacao({ ...base, itens: [item({ numeracao: { 34: '5', 35: '-3', 36: '1e3', 37: '0', 38: '2' } })] })
  if (!m.includes('Numeração: 34x5, 38x2 (7 pares)')) f(`grade com inválidos: ${m}`)
  const q = w.mensagemCotacao({ ...base, itens: [item({ categoria: 'Luvas', quantidade: 'abc' })] })
  if (/Quantidade/.test(q)) f(`quantidade inválida foi para a mensagem: ${q}`)
  const um = w.mensagemCotacao({ ...base, itens: [item({ numeracao: { 40: '1' } })] })
  if (!um.includes('(1 par)')) f(`singular: ${um}`)
}

// Sorteio com semente fixa.
let s = 20261127
const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648)
let maior = 0
for (let k = 0; k < 5000; k++) {
  const itens = []
  const esperado = []
  const n = 1 + Math.floor(rnd() * 5)
  for (let i = 0; i < n; i++) {
    const calcado = rnd() < 0.5
    if (calcado) {
      const numeracao = {}
      let total = 0
      const pares = []
      for (let num = 33; num <= 48; num++) {
        if (rnd() < 0.3) {
          const q = Math.floor(rnd() * 300)
          numeracao[num] = String(q)
          if (q > 0) { total += q; pares.push(`${num}x${q}`) }
        }
      }
      itens.push(item({ id: `i${i}`, numeracao }))
      esperado.push(pares.length ? `Numeração: ${pares.join(', ')} (${total} ${total === 1 ? 'par' : 'pares'})` : null)
    } else {
      const q = Math.floor(rnd() * 500)
      itens.push(item({ id: `i${i}`, categoria: 'Luvas', quantidade: String(q) }))
      esperado.push(q > 0 ? `Quantidade: ${q}` : null)
    }
  }
  const m = w.mensagemCotacao({ ...base, itens })
  maior = Math.max(maior, m.length)
  itens.forEach((it, i) => {
    if (!m.includes(`${i + 1}) ${it.categoria}`)) f(`sorteio ${k}: item ${i + 1} sumiu`)
    if (esperado[i] && !m.includes(esperado[i])) f(`sorteio ${k}: item ${i + 1} sem "${esperado[i]}"`)
  })
  if (falhas.length > 20) break
}

console.log(`quantidades conferidas: 14 | orçamentos sorteados: 5.000 (semente 20261127) | maior mensagem: ${maior} caracteres`)
if (falhas.length) {
  console.log(`FALHAS: ${falhas.length}`)
  for (const x of falhas.slice(0, 20)) console.log('  - ' + x)
  process.exit(1)
}
console.log('TUDO OK')
