/**
 * Calculadora de tamanho de botina — a lógica, sem nada de tela.
 *
 * O MÉTODO. A numeração brasileira é em ponto francês: cada número vale dois
 * terços de centímetro e, no Brasil, expressa o comprimento do pé sem folga
 * (a folga fica por conta da fôrma de cada fabricante). Então a estimativa
 * geral é uma divisão: comprimento do pé em mm ÷ 6,667. A fonte e o estado de
 * verificação estão em src/content/tabelas-numeracao.json, e nenhum número
 * de conversão mora neste arquivo.
 *
 * O QUE ELA NÃO FAZ, DE PROPÓSITO:
 *   - não soma folga ao pé. Somar 1 cm "de sobra" antes de converter é o erro
 *     mais repetido nas tabelas da internet, e conta a folga duas vezes;
 *   - não finge um número exato. Quando a medida cai entre dois números, o
 *     resultado é os dois. As tabelas publicadas no mercado divergem em meio
 *     número entre si, e um único número ali seria precisão de fachada;
 *   - não usa tabela de modelo que não seja de comprimento do pé. Tabela de
 *     palmilha mede outra coisa.
 *
 * Verificador: docs/ferramentas/qa-tamanho-botina-logica.mjs.
 */

import dados from '@/content/tabelas-numeracao.json'
import { NUMERACOES } from '@/content/cotacao'

/* ------------------------------------------------------------------ dados */

export type Fonte = { titulo: string; url: string }

export type ReferenciaGeral = {
  nome: string
  passoMm: number
  resumo: string
  fonte: Fonte
  fontesDeApoio: Fonte[]
  revisado: string
  verificada: boolean
  pendencia?: string
}

export type TabelaDeModelo = {
  fabricante: string
  modelo: string
  linha?: string
  /** 'pe' é a única que a calculadora usa para converter. */
  medida: 'pe' | 'palmilha' | 'forma'
  faixas: { minCm: number; maxCm: number; numero: number }[]
  fonte: Fonte
  revisado: string
  verificada: boolean
}

function validar(): { geral: ReferenciaGeral; modelos: TabelaDeModelo[] } {
  const geral = dados.referenciaGeral as ReferenciaGeral
  if (!(geral.passoMm > 6 && geral.passoMm < 7)) throw new Error('tabelas-numeracao: passoMm fora do ponto francês')
  if (!geral.fonte?.url || !/^\d{4}-\d{2}-\d{2}$/.test(geral.revisado)) throw new Error('tabelas-numeracao: referência geral sem fonte ou data')
  const modelos = (dados.tabelasDeModelo as TabelaDeModelo[]).filter((t) => {
    const completa =
      t.fabricante && t.modelo && t.fonte?.url && /^\d{4}-\d{2}-\d{2}$/.test(t.revisado) && t.faixas?.length > 0 &&
      t.faixas.every((f) => f.minCm < f.maxCm && Number.isInteger(f.numero))
    if (!completa) throw new Error(`tabelas-numeracao: tabela incompleta (${t.fabricante} ${t.modelo})`)
    return true
  })
  return { geral, modelos }
}

const { geral: REFERENCIA, modelos: TODOS_OS_MODELOS } = validar()
export { REFERENCIA }

/** Fontes do como medir e do como conferir na prova. */
export const FONTES_DA_PROVA: Fonte[] = dados.fontesDaProva.fontes

/** Só o que pode ir para a tela: verificado e medido no pé. */
export const MODELOS_UTILIZAVEIS = TODOS_OS_MODELOS.filter((t) => t.verificada && t.medida === 'pe')

/**
 * A página só existe em produção quando a referência geral foi conferida na
 * fonte. Em prévia local, `PREVIA_FERRAMENTAS=1` no build libera.
 */
export const PUBLICAVEL = REFERENCIA.verificada || process.env.PREVIA_FERRAMENTAS === '1'

/* ---------------------------------------------------------------- entrada */

export const LIMITE_CM = { min: 18, max: 34 } as const

export type Leitura =
  | { ok: true; cm: number }
  | { ok: false; erro: 'vazio' | 'formato' | 'fora' }
  | { ok: false; erro: 'mm'; sugestaoCm: number }

/**
 * Aceita "26", "26,4", "26.4", "26,4 cm". Vírgula e ponto valem o mesmo.
 * Número entre 180 e 340 é quase sempre milímetro digitado sem vírgula: a
 * tela oferece a correção em vez de recusar.
 */
export function lerMedida(texto: string): Leitura {
  const t = texto.trim().toLowerCase().replace(/\s*cm$/, '').replace(/\s/g, '')
  if (!t) return { ok: false, erro: 'vazio' }
  if (!/^\d{1,3}([.,]\d{1,2})?$/.test(t)) return { ok: false, erro: 'formato' }
  const v = Number(t.replace(',', '.'))
  if (v >= LIMITE_CM.min * 10 && v <= LIMITE_CM.max * 10 && Number.isInteger(v)) {
    return { ok: false, erro: 'mm', sugestaoCm: v / 10 }
  }
  if (v < LIMITE_CM.min || v > LIMITE_CM.max) return { ok: false, erro: 'fora' }
  return { ok: true, cm: Math.round(v * 10) / 10 }
}

/* --------------------------------------------------------------- cálculo */

/**
 * Até 0,3 de número (2 mm) do centro de um número, a estimativa é esse
 * número. Mais longe, a medida está entre dois, e o resultado diz os dois.
 */
export const MEIO_NUMERO = 0.3

export type Estimativa =
  | { tipo: 'unico'; numero: number; bruto: number }
  | { tipo: 'faixa'; de: number; ate: number; bruto: number }

export function estimar(cm: number): Estimativa {
  const bruto = (cm * 10) / REFERENCIA.passoMm
  const n = Math.round(bruto)
  if (Math.abs(bruto - n) <= MEIO_NUMERO) return { tipo: 'unico', numero: n, bruto }
  const de = Math.floor(bruto)
  return { tipo: 'faixa', de, ate: de + 1, bruto }
}

export const textoEstimativa = (e: Estimativa) => (e.tipo === 'unico' ? String(e.numero) : `${e.de} ou ${e.ate}`)

/** Comprimento de pé que corresponde ao centro de um número, em cm. */
export const cmDoNumero = (n: number) => Math.round(n * REFERENCIA.passoMm) / 10

/** O número está dentro da grade que o orçamento do site aceita? */
const GRADE = NUMERACOES.map(Number)
export const GRADE_MIN = Math.min(...GRADE)
export const GRADE_MAX = Math.max(...GRADE)
export function foraDaGrade(e: Estimativa) {
  const menor = e.tipo === 'unico' ? e.numero : e.de
  const maior = e.tipo === 'unico' ? e.numero : e.ate
  return maior < GRADE_MIN || menor > GRADE_MAX
}

/** Tabela do modelo, quando existir e for de comprimento do pé. */
export function numeroNoModelo(cm: number, t: TabelaDeModelo): number | null {
  const f = t.faixas.find((x) => cm >= x.minCm && cm <= x.maxCm)
  return f ? f.numero : null
}

/* ------------------------------------------------------------- dois pés */

export function maiorPe(esquerdo: number, direito: number) {
  const maior = Math.max(esquerdo, direito)
  const lado = esquerdo === direito ? 'iguais' : esquerdo > direito ? 'esquerdo' : 'direito'
  const diferenca = Math.round(Math.abs(esquerdo - direito) * 10) / 10
  return { maior, lado, diferenca } as const
}

/* ------------------------------------------------------------ respostas */

export type Largura = 'estreito' | 'normal' | 'largo' | 'nao-sei'
export type Para = 'mim' | 'equipe'
/** Família que veio do teste "Qual calçado", quando a pessoa chega por ele. */
export type FamiliaOrigem = 'ocupacional' | 'seguranca' | 'bota-impermeavel' | 'confirmar'

export const NOME_FAMILIA: Record<FamiliaOrigem, string> = {
  ocupacional: 'calçado ocupacional',
  seguranca: 'calçado de segurança',
  'bota-impermeavel': 'bota impermeável de cano alto',
  confirmar: 'calçado profissional (categoria a confirmar)',
}

export const ORIENTACAO_LARGURA: Record<Largura, string | null> = {
  estreito:
    'Com pé estreito, o risco é o calcanhar sair do lugar ao andar. Na prova, feche bem o cadarço e caminhe: se o calcanhar sobe e desce, a forma é larga demais para você, e trocar de número não resolve.',
  normal: null,
  largo:
    'Com pé largo, o aperto costuma aparecer nas laterais e na biqueira antes do comprimento. Subir um número para ganhar largura deixa o calçado comprido e o calcanhar solto. O caminho é procurar um modelo de forma mais larga, e é isso que vale perguntar.',
  'nao-sei':
    'Se não sabe, a prova responde: aperto nas laterais indica forma estreita para o seu pé, e calcanhar escapando indica forma larga.',
}

export type Estado = {
  cm: number
  esquerdo?: number
  direito?: number
  largura?: Largura
  para?: Para
  calcado?: FamiliaOrigem
}

/* -------------------------------------------------------------- mensagem */

const fmt = (cm: number) => cm.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
export { fmt as formatarCm }

export function mensagemWhatsApp(s: Estado): string {
  const e = estimar(s.cm)
  const linhas = [
    'Olá! Vim pelo site da Tower. Usei a calculadora de tamanho de botina.',
    '',
    `Meu maior pé mede: ${fmt(s.cm)} cm.`,
    `Numeração estimada: ${textoEstimativa(e)}.`,
  ]
  if (s.largura && s.largura !== 'normal' && s.largura !== 'nao-sei') linhas.push(`Meu pé é ${s.largura}.`)
  if (s.calcado) linhas.push(`Estou procurando: ${NOME_FAMILIA[s.calcado]} (resultado do teste do site).`)
  if (s.para === 'equipe') linhas.push('A compra é para uma equipe.')
  linhas.push('', 'Pode me ajudar a confirmar a numeração e o modelo?')
  return linhas.join('\n')
}

export function textoCompartilhar(s: Estado) {
  const e = estimar(s.cm)
  return `Meu pé mede ${fmt(s.cm)} cm e a calculadora da Tower estimou a numeração ${textoEstimativa(e)}.`
}

/* ------------------------------------------------------------ URL state */

const LARGURAS: Largura[] = ['estreito', 'normal', 'largo', 'nao-sei']
const FAMILIAS: FamiliaOrigem[] = ['ocupacional', 'seguranca', 'bota-impermeavel', 'confirmar']

export function serializar(s: Estado): string {
  const q = new URLSearchParams()
  q.set('pe', String(s.cm))
  if (s.largura) q.set('largura', s.largura)
  if (s.para) q.set('para', s.para)
  if (s.calcado) q.set('calcado', s.calcado)
  return q.toString()
}

/** Lê a URL e devolve só o que é válido. Nada de texto livre entra. */
export function desserializar(qs: string): { estado?: Estado; calcado?: FamiliaOrigem } {
  const q = new URLSearchParams(qs)
  const calcadoBruto = q.get('calcado')
  const calcado = FAMILIAS.includes(calcadoBruto as FamiliaOrigem) ? (calcadoBruto as FamiliaOrigem) : undefined
  const pe = q.get('pe')
  if (!pe) return { calcado }
  const l = lerMedida(pe)
  if (!l.ok) return { calcado }
  const largura = LARGURAS.includes(q.get('largura') as Largura) ? (q.get('largura') as Largura) : undefined
  const para = q.get('para') === 'equipe' ? 'equipe' : q.get('para') === 'mim' ? 'mim' : undefined
  return { estado: { cm: l.cm, largura, para, calcado }, calcado }
}
