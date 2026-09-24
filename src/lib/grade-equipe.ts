/**
 * Calculadora de grade de numeração da equipe — a lógica, sem nada de tela.
 *
 * A grade responde uma pergunta só: "que números comprar, e quantos de cada".
 * Reposição ao longo do ano e estoque mínimo são outras perguntas, e ficam
 * fora daqui de propósito.
 *
 * AS QUATRO CONTAS, NESTA ORDEM:
 *
 *   1. pessoas por número — digitadas direto, ou somadas de uma lista;
 *   2. pares-base = pessoas × pares por pessoa, número a número;
 *   3. reserva — nenhuma, percentual ou número a número, sempre em PARES e
 *      sempre escolhida por quem compra. A ferramenta não recomenda
 *      percentual: não há referência técnica que sustente um;
 *   4. pedido = pares-base + reserva.
 *
 * RESERVA PERCENTUAL. O percentual se aplica sobre os pares-base (não sobre
 * as pessoas), e o total é arredondado para cima: 5% de 74 pares são 3,7, e
 * não existe 0,7 par. Depois, o total é distribuído proporcionalmente aos
 * pares-base de cada número pelo método dos maiores restos — cada número
 * recebe a parte inteira da sua cota, e os pares que sobram vão para os
 * números com a maior fração. Na prática, a reserva se concentra onde a
 * equipe se concentra e as pontas ficam com zero, que é o que o artigo de
 * grade da Tower já recomendava em texto.
 *
 * PENDENTES. Quem ainda não sabe o número não entra no pedido e não é
 * "compensado" pela reserva. Aparece separado, com a contagem, até ser
 * resolvido.
 *
 * PRIVACIDADE. Nome, apelido ou matrícula existem só na tela, para quem
 * monta a lista conferir. Não vão para a mensagem, para o CSV, para o
 * analytics nem para o que fica salvo no navegador.
 *
 * ARQUITETURA PARA DEPOIS. `Estado` é JSON puro e versionado: é o mesmo
 * objeto que um dia pode ser salvo no servidor, duplicado, comparado entre
 * meses, ou montado por uma coleta com link e QR code, em que cada pessoa
 * preenche a própria linha. Nada disso existe nesta versão.
 *
 * Verificador: docs/ferramentas/qa-grade-equipe-logica.mjs.
 */

import { NUMERACOES } from '@/content/cotacao'
import { NOME_FAMILIA, type FamiliaOrigem } from '@/lib/tamanho-calcado'

/* ------------------------------------------------------------ numeração */

/** A faixa do orçamento do site, e a única fonte dela. */
export const NUMEROS: number[] = NUMERACOES.map(Number)
export const NUMERO_MIN = Math.min(...NUMEROS)
export const NUMERO_MAX = Math.max(...NUMEROS)

/** Acima disso num número só, a tela pede conferência (não bloqueia). */
export const LIMITE_ALERTA_POR_NUMERO = 1000
/** Acima disso o valor é recusado: é digitação errada. */
export const LIMITE_POR_NUMERO = 20000
export const PARES_POR_PESSOA_MAX = 10
export const RESERVA_PCT_MAX = 50

/* ---------------------------------------------------------------- estado */

export type Pessoa = {
  id: string
  /** Opcional. Só na tela; nunca sai do navegador nem fica salvo. */
  nome?: string
  /** null = numeração pendente. */
  numero: number | null
  /** Setor ou grupo, opcional: "Produção", "Cozinha", "Forma feminina". */
  grupo?: string
}

export type Reserva =
  | { tipo: 'nenhuma' }
  | { tipo: 'percentual'; pct: number }
  | { tipo: 'numeracao'; porNumero: Record<string, number> }

export type SabeModelo = 'sim' | 'nao' | 'avaliando'

export type Estado = {
  versao: 1
  modo: 'grade' | 'lista'
  /** Modo grade: pessoas por número. */
  contagem: Record<string, number>
  /** Modo grade: pessoas sem número definido. */
  pendentes: number
  /** Modo lista: uma linha por pessoa. */
  pessoas: Pessoa[]
  /** Opcional, só para conferir contra a soma. */
  equipeInformada?: number
  paresPorPessoa: number
  reserva: Reserva
  modelo?: { sabe: SabeModelo; nome?: string }
  /** Família vinda do teste "Qual calçado", quando a pessoa chega por ele. */
  calcado?: string
}

export const ESTADO_INICIAL: Estado = {
  versao: 1,
  modo: 'grade',
  contagem: {},
  pendentes: 0,
  pessoas: [],
  paresPorPessoa: 1,
  reserva: { tipo: 'nenhuma' },
}

/* ------------------------------------------------------------- entradas */

/** Inteiro não negativo a partir do que foi digitado; null se inválido. */
export function lerQuantidade(texto: string, max = LIMITE_POR_NUMERO): number | null {
  const t = texto.trim()
  if (t === '') return 0
  if (!/^\d+$/.test(t)) return null
  const n = Number(t)
  return n <= max ? n : null
}

/* ----------------------------------------------------------- consolidar */

export type Consolidado = {
  /** Pessoas por número, só números com alguém. */
  porNumero: Map<number, number>
  pendentes: number
  confirmados: number
  /** Modo lista, quando há grupo: grupo → número → pessoas. */
  grupos: Map<string, Map<number, number>>
  /** Pendentes por grupo, para a grade por setor não esconder ninguém. */
  pendentesPorGrupo: Map<string, number>
}

const SEM_GRUPO = 'Sem grupo'

export function consolidar(e: Estado): Consolidado {
  const porNumero = new Map<number, number>()
  const grupos = new Map<string, Map<number, number>>()
  const pendentesPorGrupo = new Map<string, number>()
  let pendentes = 0

  if (e.modo === 'grade') {
    for (const n of NUMEROS) {
      const q = e.contagem[String(n)] ?? 0
      if (q > 0) porNumero.set(n, q)
    }
    pendentes = e.pendentes
  } else {
    const temGrupo = e.pessoas.some((p) => p.grupo?.trim())
    for (const p of e.pessoas) {
      const g = p.grupo?.trim() || SEM_GRUPO
      if (p.numero === null) {
        pendentes++
        if (temGrupo) pendentesPorGrupo.set(g, (pendentesPorGrupo.get(g) ?? 0) + 1)
        continue
      }
      porNumero.set(p.numero, (porNumero.get(p.numero) ?? 0) + 1)
      if (temGrupo) {
        const m = grupos.get(g) ?? new Map<number, number>()
        m.set(p.numero, (m.get(p.numero) ?? 0) + 1)
        grupos.set(g, m)
      }
    }
  }
  const confirmados = [...porNumero.values()].reduce((a, b) => a + b, 0)
  return { porNumero, pendentes, confirmados, grupos, pendentesPorGrupo }
}

/* --------------------------------------------------------------- reserva */

/** Total da reserva percentual, sobre os pares-base, arredondado para cima. */
export function totalReservaPercentual(paresBase: number, pct: number): number {
  if (pct <= 0 || paresBase <= 0) return 0
  // O epsilon impede que 5% de 100 (5,000000001 em ponto flutuante) vire 6.
  return Math.ceil((paresBase * pct) / 100 - 1e-9)
}

/**
 * Distribui `total` pares entre os números, proporcionalmente aos pares-base,
 * pelo método dos maiores restos. Desempate: mais pares-base primeiro, depois
 * o número menor — determinístico, para a mesma grade dar sempre a mesma
 * resposta.
 */
export function distribuirReserva(bases: [number, number][], total: number): Map<number, number> {
  const soma = bases.reduce((a, [, b]) => a + b, 0)
  const r = new Map<number, number>()
  if (total <= 0 || soma <= 0) return r
  const cotas = bases.map(([n, b]) => {
    const exata = (total * b) / soma
    return { n, b, inteira: Math.floor(exata), resto: exata - Math.floor(exata) }
  })
  let sobra = total - cotas.reduce((a, c) => a + c.inteira, 0)
  const ordem = [...cotas].sort((x, y) => y.resto - x.resto || y.b - x.b || x.n - y.n)
  for (const c of ordem) {
    if (sobra <= 0) break
    c.inteira++
    sobra--
  }
  for (const c of cotas) if (c.inteira > 0) r.set(c.n, c.inteira)
  return r
}

/**
 * Sugestão para a reserva número a número: um par a mais nos números que,
 * juntos, somam pelo menos metade da equipe, do mais frequente para o
 * menos. É a regra do artigo de grade ("um par a mais nos números mais
 * frequentes, nenhum nas pontas") escrita de forma que dê para conferir.
 */
export function sugestaoPorNumeracao(porNumero: Map<number, number>): Record<string, number> {
  const total = [...porNumero.values()].reduce((a, b) => a + b, 0)
  const ordem = [...porNumero.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0])
  const r: Record<string, number> = {}
  let acumulado = 0
  for (const [n, q] of ordem) {
    if (acumulado * 2 >= total) break
    r[String(n)] = 1
    acumulado += q
  }
  return r
}

/* -------------------------------------------------------------- resultado */

export type Linha = { numero: number; pessoas: number; base: number; reserva: number; pedido: number }

export type Resultado = {
  linhas: Linha[]
  pessoas: number
  pendentes: number
  paresPorPessoa: number
  base: number
  reserva: number
  pedido: number
  /** Menor e maior número com pedido. */
  faixa: { min: number; max: number } | null
  /** Números com mais pessoas (empate traz mais de um). */
  maisFrequentes: number[]
  /** Até três números com mais pares no pedido. */
  ranking: Linha[]
  /** Descrição da reserva, na voz de quem escolheu. */
  reservaDescricao: string
  grupos: { nome: string; linhas: { numero: number; pessoas: number; pares: number }[]; pessoas: number; pendentes: number }[]
}

export function calcular(e: Estado): Resultado {
  const c = consolidar(e)
  const ppp = e.paresPorPessoa
  const bases: [number, number][] = [...c.porNumero.entries()].map(([n, q]) => [n, q * ppp])
  const base = bases.reduce((a, [, b]) => a + b, 0)

  let reservaPorNumero = new Map<number, number>()
  let reservaDescricao = 'Sem reserva.'
  if (e.reserva.tipo === 'percentual') {
    const total = totalReservaPercentual(base, e.reserva.pct)
    reservaPorNumero = distribuirReserva(bases, total)
    const exata = (base * e.reserva.pct) / 100
    reservaDescricao =
      total === 0
        ? `Reserva de ${e.reserva.pct}% escolhida, mas sem pares-base para aplicar.`
        : exata === total
          ? `Você escolheu ${e.reserva.pct}% de reserva sobre ${base} pares: ${pares(total)}, distribuídos conforme a equipe.`
          : `Você escolheu ${e.reserva.pct}% de reserva sobre ${base} pares: ${fmtDecimal(exata)}, arredondados para cima, ${pares(total)}, distribuídos conforme a equipe.`
  } else if (e.reserva.tipo === 'numeracao') {
    for (const n of NUMEROS) {
      const q = e.reserva.porNumero[String(n)] ?? 0
      if (q > 0) reservaPorNumero.set(n, q)
    }
    const total = [...reservaPorNumero.values()].reduce((a, b) => a + b, 0)
    reservaDescricao = total ? `Você definiu a reserva número a número: ${total} ${total === 1 ? 'par' : 'pares'}.` : 'Reserva por numeração sem nenhum par definido.'
  }

  const numeros = [...new Set([...c.porNumero.keys(), ...reservaPorNumero.keys()])].sort((a, b) => a - b)
  const linhas: Linha[] = numeros.map((n) => {
    const pessoas = c.porNumero.get(n) ?? 0
    const b = pessoas * ppp
    const r = reservaPorNumero.get(n) ?? 0
    return { numero: n, pessoas, base: b, reserva: r, pedido: b + r }
  })

  const reserva = linhas.reduce((a, l) => a + l.reserva, 0)
  const maxPessoas = Math.max(0, ...linhas.map((l) => l.pessoas))
  const maisFrequentes = maxPessoas > 0 ? linhas.filter((l) => l.pessoas === maxPessoas).map((l) => l.numero) : []
  const ranking = [...linhas].filter((l) => l.pedido > 0).sort((a, b) => b.pedido - a.pedido || a.numero - b.numero).slice(0, 3)
  const comPedido = linhas.filter((l) => l.pedido > 0)

  const grupos = [...c.grupos.entries()]
    .map(([nome, m]) => {
      const ls = [...m.entries()].sort((a, b) => a[0] - b[0]).map(([numero, pessoas]) => ({ numero, pessoas, pares: pessoas * ppp }))
      return { nome, linhas: ls, pessoas: ls.reduce((a, l) => a + l.pessoas, 0), pendentes: c.pendentesPorGrupo.get(nome) ?? 0 }
    })
    .concat(
      // Grupo que só tem pendentes também aparece, para não sumir ninguém.
      [...c.pendentesPorGrupo.entries()]
        .filter(([g]) => !c.grupos.has(g))
        .map(([nome, pendentes]) => ({ nome, linhas: [], pessoas: 0, pendentes })),
    )
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))

  return {
    linhas,
    pessoas: c.confirmados,
    pendentes: c.pendentes,
    paresPorPessoa: ppp,
    base,
    reserva,
    pedido: base + reserva,
    faixa: comPedido.length ? { min: comPedido[0].numero, max: comPedido[comPedido.length - 1].numero } : null,
    maisFrequentes,
    ranking,
    reservaDescricao,
    grupos,
  }
}

const pares = (n: number) => `${n} ${n === 1 ? 'par' : 'pares'}`
const fmtDecimal = (n: number) => n.toLocaleString('pt-BR', { maximumFractionDigits: 2 })

/* ------------------------------------------------------------ conferência */

export type Conferencia = { tipo: 'sem-referencia' } | { tipo: 'ok' } | { tipo: 'faltam'; n: number } | { tipo: 'sobram'; n: number }

/** Compara a equipe informada com quem está na grade (confirmados + pendentes). */
export function conferir(e: Estado, r: Pick<Resultado, 'pessoas' | 'pendentes'>): Conferencia {
  if (!e.equipeInformada) return { tipo: 'sem-referencia' }
  const naGrade = r.pessoas + r.pendentes
  if (naGrade === e.equipeInformada) return { tipo: 'ok' }
  return naGrade < e.equipeInformada ? { tipo: 'faltam', n: e.equipeInformada - naGrade } : { tipo: 'sobram', n: naGrade - e.equipeInformada }
}

/** Nomes repetidos na lista — provável pessoa lançada duas vezes. */
export function duplicados(pessoas: Pessoa[]): string[] {
  const vistos = new Map<string, number>()
  for (const p of pessoas) {
    const k = normalizar(p.nome ?? '')
    if (!k) continue
    vistos.set(k, (vistos.get(k) ?? 0) + 1)
  }
  const originais = new Map<string, string>()
  for (const p of pessoas) if (p.nome) originais.set(normalizar(p.nome), p.nome.trim())
  return [...vistos.entries()].filter(([, n]) => n > 1).map(([k]) => originais.get(k) ?? k)
}

const normalizar = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim()

/** Faixa de tamanho da equipe, para analytics e para o texto do CTA. */
export function faixaEquipe(n: number): '1-10' | '11-30' | '31-100' | '101-300' | '301+' {
  if (n <= 10) return '1-10'
  if (n <= 30) return '11-30'
  if (n <= 100) return '31-100'
  if (n <= 300) return '101-300'
  return '301+'
}

/* ------------------------------------------------------------- importar */

export type Importacao = {
  pessoas: Pessoa[]
  /** Linhas que não viraram pessoa, com o motivo — a tela mostra. */
  ignoradas: { linha: number; texto: string; motivo: string }[]
  /** Linhas de cabeçalho reconhecidas e puladas. */
  cabecalhos: number
}

const PENDENTE = /^(\?+|-+|pendente|n[aã]o sei|a confirmar|sem n[uú]mero|s\/n)$/i
const CABECALHO = /^(nome|colaborador|funcion[aá]rio|matr[ií]cula|n[uú]mero|numera[cç][aã]o|tamanho|setor|grupo|cal[cç]ado|n[ºo°]\.?)$/i

let seq = 0
export const novoId = () => `p${Date.now().toString(36)}${(seq++).toString(36)}`

/**
 * Interpreta uma lista colada ou um CSV simples. Cada linha é uma pessoa.
 * Aceita vírgula, ponto e vírgula, tabulação, travessão ou barra como
 * separador, em qualquer ordem de colunas:
 *
 *   Carlos,40            Carlos; 40; Expedição       40
 *   João — 42 — Logística  Ana<TAB>36<TAB>Limpeza      Paulo, ?
 *
 * A numeração é o único campo que é número inteiro dentro da faixa. O
 * primeiro texto antes dela é o nome; o primeiro texto depois, o grupo.
 * Número fora da faixa (uma matrícula, por exemplo) conta como texto. Linha
 * sem numeração válida não vira chute: vai para a lista de ignoradas, a não
 * ser que diga explicitamente que o número está pendente.
 */
export function interpretarLista(texto: string): Importacao {
  const pessoas: Pessoa[] = []
  const ignoradas: Importacao['ignoradas'] = []
  let cabecalhos = 0
  const linhas = texto.replace(/^﻿/, '').split(/\r?\n/)
  linhas.forEach((bruta, i) => {
    const linha = bruta.trim()
    if (!linha) return
    let partes = linha
      .split(/\s*[;,\t|]\s*|\s+[—–-]\s+/)
      .map((p) => p.trim().replace(/^"(.*)"$/, '$1').trim())
      .filter(Boolean)
    // Sem separador ("Carlos 40 Expedição"): as palavras viram colunas, e a
    // numeração separa o nome, antes, do grupo, depois.
    if (partes.length === 1) {
      const palavras = partes[0].split(/\s+/)
      const i = palavras.findIndex((w) => /^\d{2}$/.test(w) && NUMEROS.includes(Number(w)))
      if (i !== -1) partes = [palavras.slice(0, i).join(' '), palavras[i], palavras.slice(i + 1).join(' ')].filter(Boolean)
    }
    if (partes.every((p) => CABECALHO.test(p))) {
      cabecalhos++
      return
    }
    const idx = partes.findIndex((p) => /^\d{2}$/.test(p) && NUMEROS.includes(Number(p)))
    const idxPend = idx === -1 ? partes.findIndex((p) => PENDENTE.test(p)) : -1
    if (idx === -1 && idxPend === -1) {
      const numeroFora = partes.find((p) => /^\d{1,2}$/.test(p))
      ignoradas.push({
        linha: i + 1,
        texto: linha.slice(0, 60),
        motivo: numeroFora
          ? `numeração ${numeroFora} fora da faixa de ${NUMERO_MIN} a ${NUMERO_MAX}`
          : 'sem numeração reconhecida',
      })
      return
    }
    const pos = idx !== -1 ? idx : idxPend
    const antes = partes.slice(0, pos).filter((p) => !/^\d+$/.test(p) || !NUMEROS.includes(Number(p)))
    const depois = partes.slice(pos + 1)
    pessoas.push({
      id: novoId(),
      nome: antes.join(' ').slice(0, 60) || undefined,
      numero: idx !== -1 ? Number(partes[idx]) : null,
      grupo: depois.find((p) => !/^\d+$/.test(p))?.slice(0, 40) || undefined,
    })
  })
  return { pessoas, ignoradas, cabecalhos }
}

/* --------------------------------------------------------------- saídas */

/** Texto para copiar e colar — e-mail, planilha, mensagem interna. */
export function textoGrade(r: Resultado, e: Estado): string {
  const l = ['GRADE DE CALÇADOS', '']
  for (const x of r.linhas) if (x.pedido > 0) l.push(`${x.numero} — ${pares(x.pedido)}`)
  l.push('', `Total: ${pares(r.pedido)}`)
  l.push(`Pessoas com numeração: ${r.pessoas}`, `Pares por pessoa: ${r.paresPorPessoa}`)
  if (r.reserva) l.push(`Reserva incluída: ${pares(r.reserva)}`)
  if (r.pendentes) l.push(`Numeração pendente: ${r.pendentes} ${r.pendentes === 1 ? 'pessoa' : 'pessoas'} (fora do total)`)
  if (e.modelo?.nome?.trim()) l.push(`Modelo: ${e.modelo.nome.trim()}`)
  l.push('', 'Grade montada em towerepis.com.br/ferramentas/grade-de-numeracao/')
  return l.join('\n')
}

/** CSV para planilha. Ponto e vírgula e BOM: é o que o Excel em português abre certo. */
export function csvGrade(r: Resultado): string {
  const l = ['Numeração;Pessoas;Pares por pessoa;Pares-base;Reserva;Pedido']
  for (const x of r.linhas) l.push([x.numero, x.pessoas, r.paresPorPessoa, x.base, x.reserva, x.pedido].join(';'))
  l.push(['Total', r.pessoas, r.paresPorPessoa, r.base, r.reserva, r.pedido].join(';'))
  if (r.pendentes) l.push(`Pendentes (fora do total);${r.pendentes};;;;`)
  return '﻿' + l.join('\r\n') + '\r\n'
}

/** Modelo de planilha para quem prefere preencher fora e importar. */
export const CSV_MODELO = '﻿nome;numeração;setor\r\nCarlos;40;Expedição\r\nAna;36;Limpeza\r\nJoão;42;Logística\r\n'

/**
 * Mensagem do WhatsApp. Só números e quantidades: nome de colaborador não
 * entra, nem quando a lista tem nome. Setor entra, porque é do pedido e não
 * da pessoa — e só se couber no limite.
 */
export function mensagemWhatsApp(r: Resultado, e: Estado, limite = 1400): string {
  const topo = [
    'Olá! Vim pelo site da Tower. Montei uma grade de calçados pela ferramenta do site.',
    '',
    `Pessoas com numeração: ${r.pessoas}`,
    `Pares por pessoa: ${r.paresPorPessoa}`,
    `Reserva: ${r.reserva ? pares(r.reserva) : 'nenhuma'}`,
    `Total: ${pares(r.pedido)}`,
  ]
  if (r.pendentes) topo.push(`Numeração pendente: ${r.pendentes} ${r.pendentes === 1 ? 'pessoa' : 'pessoas'} (fora do total)`)
  const modelo = e.modelo?.nome?.trim()
  if (modelo) topo.push(`Modelo: ${modelo.slice(0, 80)}`)
  else if (e.calcado && e.calcado in NOME_FAMILIA) topo.push(`Tipo de calçado: ${NOME_FAMILIA[e.calcado as FamiliaOrigem]} (resultado do teste do site)`)
  else if (e.modelo?.sabe === 'nao' || e.modelo?.sabe === 'avaliando') topo.push('Ainda estou definindo o modelo.')

  const grade = ['', 'Grade:', ...r.linhas.filter((x) => x.pedido > 0).map((x) => `${x.numero} — ${x.pedido}`)]
  const fim = ['', 'Gostaria de receber uma cotação.']
  const base = [...topo, ...grade]

  if (r.grupos.length > 1) {
    const porGrupo = ['', 'Por setor (sem reserva):']
    for (const g of r.grupos) {
      const itens = g.linhas.map((x) => `${x.numero}×${x.pares}`).join(', ')
      porGrupo.push(`${g.nome.slice(0, 40)}: ${itens || '—'}${g.pendentes ? ` (+${g.pendentes} pendente${g.pendentes === 1 ? '' : 's'})` : ''}`)
    }
    const completa = [...base, ...porGrupo, ...fim].join('\n')
    if (completa.length <= limite) return completa
    return [...base, '', 'Tenho a grade separada por setor e posso enviar.', ...fim].join('\n')
  }
  return [...base, ...fim].join('\n')
}

/* ------------------------------------------------------- salvar no navegador */

export const CHAVE_LOCAL = 'tower-grade-equipe'

/** O que fica salvo: tudo, menos nome. */
export function paraSalvar(e: Estado): string {
  return JSON.stringify({ ...e, pessoas: e.pessoas.map(({ nome: _nome, ...resto }) => resto) })
}

/** Lê o que ficou salvo, validando campo a campo; qualquer coisa estranha vira estado inicial. */
export function lerSalvo(bruto: string | null): Estado | null {
  if (!bruto) return null
  try {
    const d = JSON.parse(bruto)
    if (d?.versao !== 1) return null
    const inteiro = (v: unknown, max: number) => (Number.isInteger(v) && (v as number) >= 0 && (v as number) <= max ? (v as number) : 0)
    const contagem: Record<string, number> = {}
    for (const n of NUMEROS) {
      const q = inteiro(d.contagem?.[String(n)], LIMITE_POR_NUMERO)
      if (q) contagem[String(n)] = q
    }
    const pessoas: Pessoa[] = Array.isArray(d.pessoas)
      ? d.pessoas.slice(0, 5000).map((p: { numero?: unknown; grupo?: unknown }) => ({
          id: novoId(),
          numero: NUMEROS.includes(p?.numero as number) ? (p.numero as number) : null,
          grupo: typeof p?.grupo === 'string' ? p.grupo.slice(0, 40) : undefined,
        }))
      : []
    let reserva: Reserva = { tipo: 'nenhuma' }
    if (d.reserva?.tipo === 'percentual') reserva = { tipo: 'percentual', pct: inteiro(d.reserva.pct, RESERVA_PCT_MAX) }
    if (d.reserva?.tipo === 'numeracao') {
      const porNumero: Record<string, number> = {}
      for (const n of NUMEROS) {
        const q = inteiro(d.reserva.porNumero?.[String(n)], LIMITE_POR_NUMERO)
        if (q) porNumero[String(n)] = q
      }
      reserva = { tipo: 'numeracao', porNumero }
    }
    const sabe = ['sim', 'nao', 'avaliando'].includes(d.modelo?.sabe) ? (d.modelo.sabe as SabeModelo) : undefined
    return {
      versao: 1,
      modo: d.modo === 'lista' ? 'lista' : 'grade',
      contagem,
      pendentes: inteiro(d.pendentes, LIMITE_POR_NUMERO),
      pessoas,
      equipeInformada: inteiro(d.equipeInformada, 100000) || undefined,
      paresPorPessoa: Math.max(1, inteiro(d.paresPorPessoa, PARES_POR_PESSOA_MAX)),
      reserva,
      modelo: sabe ? { sabe, nome: typeof d.modelo.nome === 'string' ? d.modelo.nome.slice(0, 80) : undefined } : undefined,
      calcado: typeof d.calcado === 'string' && d.calcado in NOME_FAMILIA ? d.calcado : undefined,
    }
  } catch {
    return null
  }
}

/** Há algo digitado? Decide se o botão "Limpar" e o aviso de salvo aparecem. */
export function temConteudo(e: Estado): boolean {
  return Object.values(e.contagem).some((q) => q > 0) || e.pendentes > 0 || e.pessoas.length > 0
}
