/**
 * Sistema de CTA de WhatsApp.
 *
 * Regra do projeto: não existe botão de WhatsApp genérico. Todo CTA declara
 * de onde veio e monta uma mensagem com contexto, para que a Tower receba um
 * pedido pronto para responder — e não um "oi".
 *
 * Um contexto novo exige uma entrada nova aqui. É de propósito: impede que
 * alguém crie um botão sem pensar na mensagem que ele gera.
 */
import { empresa } from '@/config/empresa'

const ABERTURA = 'Olá! Vim pelo site da Tower.'

export type ContextoWhatsApp =
  | 'home'
  | 'header'
  | 'flutuante'
  | 'calcados'
  | 'calcados-comparativo'
  | 'calcados-seguranca'
  | 'calcados-ocupacionais'
  | 'calcados-antiderrapantes'
  | 'protecao-respiratoria'
  | 'protecao-maos'
  | 'protecao-auditiva'
  | 'protecao-olhos'
  | 'protecao-cabeca'
  | 'protecao-corpo'
  | 'profissao-cozinha'
  | 'profissao-enfermagem'
  | 'profissao-limpeza'
  | 'profissao-construcao'
  | 'profissao-industria'
  | 'profissao-logistica'
  | 'profissao-manutencao'
  | 'empresas'
  | 'empresas-alimentacao'
  | 'empresas-saude'
  | 'empresas-industria'
  | 'empresas-construcao'
  | 'empresas-facilities'
  | 'orcamento'
  | 'cotacao'
  | 'ferramenta'
  | 'marcas'
  | 'historia'
  | 'contato'
  | 'artigo'

/** Mensagem enviada por contexto. Escrita na voz do cliente, não da empresa. */
const MENSAGENS: Record<ContextoWhatsApp, string> = {
  home: `${ABERTURA} Gostaria de uma orientação sobre qual EPI é o mais indicado para o meu caso.`,
  header: `${ABERTURA} Gostaria de falar com vocês.`,
  flutuante: `${ABERTURA} Gostaria de falar com vocês.`,

  calcados: `${ABERTURA} Estou procurando um calçado profissional e gostaria de ajuda para escolher o modelo certo.`,
  'calcados-comparativo': `${ABERTURA} Estou em dúvida entre calçado ocupacional e calçado de segurança e gostaria de saber qual serve para o meu trabalho.`,
  'calcados-seguranca': `${ABERTURA} Preciso de um calçado de segurança com biqueira e gostaria de conhecer as opções.`,
  'calcados-ocupacionais': `${ABERTURA} Estou procurando um calçado ocupacional e gostaria de conhecer as opções.`,
  'calcados-antiderrapantes': `${ABERTURA} Preciso de um calçado antiderrapante e gostaria de ajuda para escolher.`,

  'protecao-respiratoria': `${ABERTURA} Preciso de proteção respiratória e gostaria de orientação sobre qual modelo usar.`,
  'protecao-maos': `${ABERTURA} Preciso de luvas de proteção e gostaria de ajuda para escolher o tipo certo.`,
  'protecao-auditiva': `${ABERTURA} Preciso de proteção auditiva e gostaria de orientação.`,
  'protecao-olhos': `${ABERTURA} Preciso de proteção para os olhos e gostaria de conhecer as opções.`,
  'protecao-cabeca': `${ABERTURA} Preciso de capacete ou proteção para a cabeça e gostaria de orientação.`,
  'protecao-corpo': `${ABERTURA} Preciso de vestimenta de proteção e gostaria de conhecer as opções.`,

  'profissao-cozinha': `${ABERTURA} Trabalho em cozinha e estou procurando um calçado antiderrapante. Pode me ajudar a escolher?`,
  'profissao-enfermagem': `${ABERTURA} Trabalho na área da saúde e estou procurando um calçado para o plantão. Pode me ajudar a escolher?`,
  'profissao-limpeza': `${ABERTURA} Trabalho com limpeza e conservação e preciso de EPI. Pode me orientar?`,
  'profissao-construcao': `${ABERTURA} Trabalho na construção e preciso de EPI. Pode me orientar sobre o que é indicado?`,
  'profissao-industria': `${ABERTURA} Trabalho na indústria e preciso de EPI. Pode me orientar?`,
  'profissao-logistica': `${ABERTURA} Trabalho com logística e estoque e preciso de EPI. Pode me orientar?`,
  'profissao-manutencao': `${ABERTURA} Trabalho com manutenção e preciso de EPI. Pode me orientar?`,

  empresas: `${ABERTURA} Vim pela área de empresas e gostaria de solicitar um orçamento de EPIs para nossa equipe.`,
  'empresas-alimentacao': `${ABERTURA} Tenho um negócio na área de alimentação e gostaria de um orçamento de EPIs para a equipe.`,
  'empresas-saude': `${ABERTURA} Trabalho em uma instituição de saúde e gostaria de um orçamento de EPIs para a equipe.`,
  'empresas-industria': `${ABERTURA} Sou responsável pela compra de EPIs em uma indústria e gostaria de um orçamento.`,
  'empresas-construcao': `${ABERTURA} Sou responsável pela compra de EPIs em uma construtora e gostaria de um orçamento.`,
  'empresas-facilities': `${ABERTURA} Sou responsável pela compra de EPIs em uma empresa de limpeza e gostaria de um orçamento.`,
  orcamento: `${ABERTURA} Gostaria de solicitar um orçamento de EPIs.`,
  cotacao: `${ABERTURA} Gostaria de montar uma cotação.`,

  ferramenta: `${ABERTURA} Usei a ferramenta de orientação do site e gostaria de ajuda para escolher.`,
  marcas: `${ABERTURA} Gostaria de saber quais marcas vocês trabalham e o que têm disponível.`,
  historia: `${ABERTURA} Gostaria de falar com vocês sobre proteção para o trabalho.`,
  contato: `${ABERTURA} Gostaria de falar com vocês.`,
  artigo: `${ABERTURA} Li um conteúdo no site e fiquei com uma dúvida. Pode me ajudar?`,
}

/** Monta o link do WhatsApp com a mensagem do contexto. */
export function linkWhatsApp(
  contexto: ContextoWhatsApp,
  mensagemCustomizada?: string,
): string {
  const texto = mensagemCustomizada ?? MENSAGENS[contexto]
  return `https://wa.me/${empresa.whatsapp.numero}?text=${encodeURIComponent(texto)}`
}

export function mensagemDoContexto(contexto: ContextoWhatsApp): string {
  return MENSAGENS[contexto]
}

/**
 * Limite prático para o texto de um link wa.me.
 *
 * A URL final leva o texto codificado, e navegador e WhatsApp truncam
 * URLs muito longas — silenciosamente, o que é o pior tipo de falha aqui.
 * Acima deste limite a interface oferece copiar o texto em vez de arriscar
 * mandar um pedido cortado pela metade.
 */
export const LIMITE_MENSAGEM = 1400

export type ItemCotacao = {
  id: string
  categoria: string
  descricao: string
  quantidade: string
  /** Só para calçado: numeração -> quantidade de pares. */
  numeracao: Record<string, string>
}

/**
 * Monta a mensagem da cotação.
 *
 * O formato é pensado para ser lido no WhatsApp, num celular, por quem está
 * atendendo: blocos curtos, sem tabela, sem markdown — que o WhatsApp não
 * renderiza — e com a grade de numeração resumida numa linha só.
 */
export function mensagemCotacao(dados: {
  itens: ItemCotacao[]
  cidade: string
  prazo: string
  nome: string
  empresa: string
  observacao: string
}): string {
  const linhas: string[] = [
    'Olá! Vim pelo site da Tower e gostaria de uma cotação.',
    '',
    'ITENS',
  ]

  dados.itens.forEach((item, i) => {
    linhas.push(`${i + 1}) ${item.categoria}`)
    if (item.descricao.trim()) linhas.push(`   ${item.descricao.trim()}`)

    const grade = Object.entries(item.numeracao)
      .filter(([, qtd]) => Number(qtd) > 0)
      .sort(([a], [b]) => Number(a) - Number(b))

    if (grade.length) {
      const total = grade.reduce((s, [, q]) => s + Number(q), 0)
      linhas.push(
        `   Numeração: ${grade.map(([n, q]) => `${n}x${q}`).join(', ')} (${total} pares)`,
      )
    } else if (item.quantidade.trim()) {
      linhas.push(`   Quantidade: ${item.quantidade.trim()}`)
    }
  })

  linhas.push('', 'ENTREGA')
  if (dados.cidade.trim()) linhas.push(`Cidade: ${dados.cidade.trim()}`)
  if (dados.prazo) linhas.push(`Prazo: ${dados.prazo}`)

  if (dados.nome.trim() || dados.empresa.trim()) {
    linhas.push('', 'QUEM ESTÁ PEDINDO')
    linhas.push([dados.nome.trim(), dados.empresa.trim()].filter(Boolean).join(' — '))
  }

  if (dados.observacao.trim()) {
    linhas.push('', 'OBSERVAÇÃO', dados.observacao.trim())
  }

  return linhas.join('\n')
}

/**
 * Monta a mensagem estruturada do formulário B2B.
 * Cada campo existe porque muda a resposta da Tower — nenhum é coletado "por coletar".
 */
export function mensagemOrcamento(dados: {
  segmento: string
  pessoas: string
  necessidade: string
  prazo: string
  cidade?: string
}): string {
  const linhas = [
    'Olá! Vim pela área de empresas do site da Tower e gostaria de um orçamento.',
    '',
    `Segmento: ${dados.segmento}`,
    `Nº de pessoas: ${dados.pessoas}`,
    `O que precisamos: ${dados.necessidade}`,
    `Prazo: ${dados.prazo}`,
  ]
  if (dados.cidade?.trim()) linhas.push(`Cidade: ${dados.cidade}`)
  return linhas.join('\n')
}
