/**
 * Dados da ferramenta de cotação.
 *
 * As categorias que pedem grade de numeração são marcadas: calçado é a
 * única em que o tamanho muda o pedido item a item, e é justamente o dado
 * que mais falta quando um orçamento chega pelo WhatsApp.
 */
export type CategoriaCotacao = {
  valor: string
  rotulo: string
  numeracao: boolean
  unidade: string
  exemplo: string
}

export const CATEGORIAS_COTACAO: CategoriaCotacao[] = [
  {
    valor: 'Calçado de segurança (com biqueira)',
    rotulo: 'Calçado de segurança (com biqueira)',
    numeracao: true,
    unidade: 'pares',
    exemplo: 'Ex.: botina de elástico, couro, para obra',
  },
  {
    valor: 'Calçado ocupacional (sem biqueira)',
    rotulo: 'Calçado ocupacional (sem biqueira)',
    numeracao: true,
    unidade: 'pares',
    exemplo: 'Ex.: sapato antiderrapante e impermeável para cozinha',
  },
  {
    valor: 'Luvas',
    rotulo: 'Luvas',
    numeracao: false,
    unidade: 'pares',
    exemplo: 'Ex.: luva para produto químico — diga qual produto',
  },
  {
    valor: 'Proteção respiratória',
    rotulo: 'Proteção respiratória',
    numeracao: false,
    unidade: 'unidades',
    exemplo: 'Ex.: máscara para poeira de corte',
  },
  {
    valor: 'Proteção auditiva',
    rotulo: 'Proteção auditiva',
    numeracao: false,
    unidade: 'unidades',
    exemplo: 'Ex.: protetor de inserção para ruído contínuo',
  },
  {
    valor: 'Óculos e proteção facial',
    rotulo: 'Óculos e proteção facial',
    numeracao: false,
    unidade: 'unidades',
    exemplo: 'Ex.: óculos para projeção de partícula',
  },
  {
    valor: 'Capacete',
    rotulo: 'Capacete',
    numeracao: false,
    unidade: 'unidades',
    exemplo: 'Ex.: capacete com jugular para obra',
  },
  {
    valor: 'Vestimenta',
    rotulo: 'Vestimenta',
    numeracao: false,
    unidade: 'peças',
    exemplo: 'Ex.: avental ou colete de alta visibilidade',
  },
  {
    valor: 'Outro',
    rotulo: 'Outro',
    numeracao: false,
    unidade: 'unidades',
    exemplo: 'Descreva o que você precisa',
  },
]

/** Faixa usual de numeração de calçado profissional no Brasil. */
export const NUMERACOES = [
  '33', '34', '35', '36', '37', '38', '39', '40',
  '41', '42', '43', '44', '45', '46', '47', '48',
]

export const PRAZOS_COTACAO = [
  'É urgente, para esta semana',
  'Nas próximas duas semanas',
  'Este mês',
  'Estou levantando preço, sem pressa',
]

export const buscarCategoria = (valor: string) =>
  CATEGORIAS_COTACAO.find((c) => c.valor === valor)
