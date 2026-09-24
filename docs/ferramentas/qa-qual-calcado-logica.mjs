/**
 * Varredura exaustiva da lógica de src/lib/qual-calcado.ts.
 *
 * Não abre navegador. Transpila o módulo com o TypeScript do projeto e
 * avalia todas as combinações de resposta — 1,7 milhão — conferindo as
 * regras que o resultado nunca pode quebrar: calçado ocupacional com
 * biqueira, "não sei" tratado como "não", perfuração sem aviso,
 * eletricidade sem aviso, imersão sem impermeável, mensagem acima do
 * limite do WhatsApp, link compartilhado que não reproduz o resultado.
 *
 * Nasceu de um defeito real: pé dentro de líquido com impacto "não sei"
 * devolvia "sem biqueira" e não pedia confirmação — 142.560 combinações,
 * entre elas a concretagem. Nenhum teste por amostra tinha passado por ela.
 *
 * Uso:  node docs/ferramentas/qa-qual-calcado-logica.mjs   (não precisa do site no ar)
 */
import { createRequire } from 'module'
import { readFileSync, writeFileSync, mkdtempSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
const require = createRequire(import.meta.url)
const ts = require(join(process.cwd(), 'node_modules/typescript'))
const dir = mkdtempSync(join(tmpdir(), 'qc-'))
writeFileSync(join(dir, 'qc.cjs'), ts.transpileModule(readFileSync('src/lib/qual-calcado.ts', 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText)
const q = require(join(dir, 'qc.cjs'))

const AT = Object.keys(q.ROTULO_ATIVIDADE), TRI = ['sim', 'nao', 'nao-sei']
const PISO = ['seco', 'as-vezes', 'sempre', 'submerso'], OLEO = ['frequente', 'ocasional', 'nao']
const QUI = ['nao', 'limpeza', 'oleo-solvente', 'forte', 'nao-sei'], JOR = ['sentado', 'pe-parado', 'pe-caminha', 'pe-intenso']
const INCS = [['nenhum'], ['peso'], ['calor'], ['cansaco'], ['dor'], ['duro'], ['escorregar'], ['molhar'], ['biqueira'], ['higiene'],
  ['peso', 'calor', 'escorregar', 'molhar', 'biqueira', 'higiene', 'dor', 'duro', 'cansaco']]
const viol = {}; let n = 0, maior = 0
const v = (k, ex) => { (viol[k] ??= { n: 0, ex }).n++ }
for (const atividade of AT) for (const impacto of TRI) for (const perfuracao of TRI) for (const piso of PISO)
for (const oleo of OLEO) for (const eletricidade of TRI) for (const quimico of QUI) for (const jornada of JOR)
for (const calor of ['sim', 'nao']) for (const incomodos of INCS) {
  const r = { atividade, para: 'mim', impacto, perfuracao, piso, oleo, eletricidade, quimico, jornada, calor, incomodos }
  const s = q.calcular(r); n++
  const f = s.familia.chave, bq = s.biqueira.nome, ex = JSON.stringify(r)
  if (f === 'ocupacional' && !/^Sem biqueira/.test(bq)) v('ocupacional com biqueira', ex)
  if (f === 'seguranca' && /^Sem biqueira/.test(bq)) v('segurança sem biqueira', ex)
  if (impacto !== 'nao' && /^Sem biqueira/.test(bq)) v('impacto sim/não sei mas "sem biqueira"', ex)
  if (impacto === 'nao-sei' && !s.confirmar.some(c => /pesado/i.test(c))) v('impacto não sei sem pedir confirmação', ex)
  if (perfuracao === 'sim' && !s.alertas.some(a => /perfura/i.test(a))) v('perfuração sem aviso', ex)
  if (perfuracao === 'nao-sei' && !s.confirmar.some(c => /perfurante/i.test(c))) v('perfuração não sei sem confirmação', ex)
  if (eletricidade === 'sim' && !s.alertas.some(a => /eletricidade/i.test(a))) v('eletricidade sem aviso', ex)
  if (eletricidade === 'sim' && f === 'seguranca' && /^Aço/.test(bq)) v('eletricidade com aço sugerido', ex)
  if (eletricidade === 'nao-sei' && !s.confirmar.some(c => /eletricidade/i.test(c))) v('eletricidade não sei sem confirmação', ex)
  if (quimico === 'nao-sei' && !s.confirmar.some(c => /ficha/i.test(c))) v('químico não sei sem confirmação', ex)
  if (piso === 'submerso' && (s.agua.nome !== 'Impermeável' || s.formato.nome !== 'Cano alto')) v('imersão sem impermeável de cano alto', ex)
  if (piso === 'seco' && !incomodos.includes('molhar') && s.agua.nome !== 'Não prioritário') v('piso seco com água prioritária', ex)
  if (oleo !== 'nao' && !/óleo/i.test(s.solado.nome) && !incomodos.includes('escorregar')) v('óleo sem solado para óleo', ex)
  if (s.formato.nome === 'Sapato fechado' && perfuracao === 'sim') v('sapato com perfuração', ex)
  if (!s.porque.length && !s.insuficiente) v('resultado sem "por que"', ex)
  for (const a of ['porque', 'alertas', 'confirmar']) if (new Set(s[a]).size !== s[a].length) v(`frase duplicada em ${a}`, ex)
  const m = q.mensagemWhatsApp({ ...r, para: 'equipe', equipe: '300+', atividadeOutro: 'x'.repeat(80) }, s)
  maior = Math.max(maior, m.length); if (m.length > 1400) v('mensagem acima de 1400', ex)
  if (JSON.stringify(q.desserializar(q.serializar(r))) !== JSON.stringify(r)) v('link compartilhado não reproduz', ex)
}
console.log(`combinações: ${n.toLocaleString('pt-BR')} | maior mensagem: ${maior} caracteres`)
const k = Object.keys(viol)
if (!k.length) { console.log('\nTUDO OK'); process.exit(0) }
console.log(`\nVIOLAÇÕES (${k.length}):`); for (const x of k) console.log(`  ${viol[x].n}  ${x}\n     ex: ${viol[x].ex}`)
process.exit(1)
