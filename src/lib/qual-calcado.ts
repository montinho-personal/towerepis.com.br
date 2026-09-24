/**
 * "Qual calçado profissional é ideal para mim?" — a lógica, sem interface.
 *
 * Este arquivo é puro de propósito: recebe respostas, devolve um resultado,
 * e não sabe que existe navegador. Assim a regra pode ser lida, discutida e
 * conferida por alguém que nunca abra o componente — e testada por script
 * sem levantar o site.
 *
 * O QUE ELA É. Uma orientação inicial de seleção: "pelas características
 * informadas, este é o tipo de calçado que merece ser avaliado". Ela não
 * certifica, não substitui a avaliação de riscos da empresa, não escolhe o
 * modelo nem confere CA. Toda frase de resultado foi escrita para caber
 * nessa moldura, e o disclaimer da página repete isso para quem não leu.
 *
 * O QUE ELA NÃO INVENTA. O site não tem catálogo de produto (a decisão está
 * em docs/18-catalogo-consultivo.md), então o resultado não aponta modelo:
 * aponta características e as linhas reais que a Tower trabalha. Nenhum
 * número de norma, de ensaio ou de CA aparece aqui — onde a resposta depende
 * de um dado que a ferramenta não tem, ela diz de onde o dado vem.
 *
 * A REGRA CENTRAL vem do resto do site e não foi inventada para o quiz: a
 * categoria (ocupacional ou de segurança) é decidida por uma pergunta só —
 * existe risco de queda ou prensagem de objeto pesado sobre o pé? Todo o
 * resto (solado, cabedal, cano, conforto) é ajuste em cima dessa decisão.
 */

export type Atividade =
  | 'construcao'
  | 'industria'
  | 'logistica'
  | 'manutencao'
  | 'oficina'
  | 'cozinha'
  | 'limpeza'
  | 'saude'
  | 'servicos'
  | 'eletrica'
  | 'agricultura'
  | 'outro'

export type Para = 'mim' | 'equipe'
export type Equipe = '1-10' | '11-30' | '31-100' | '101-300' | '300+'
export type Tri = 'sim' | 'nao' | 'nao-sei'
export type Piso = 'seco' | 'as-vezes' | 'sempre' | 'submerso'
export type Oleo = 'frequente' | 'ocasional' | 'nao'
export type Quimico = 'nao' | 'limpeza' | 'oleo-solvente' | 'forte' | 'nao-sei'
export type Jornada = 'sentado' | 'pe-parado' | 'pe-caminha' | 'pe-intenso'
export type Calor = 'sim' | 'nao'
export type Incomodo =
  | 'peso'
  | 'calor'
  | 'cansaco'
  | 'dor'
  | 'duro'
  | 'escorregar'
  | 'molhar'
  | 'biqueira'
  | 'higiene'
  | 'nenhum'

export type Respostas = {
  atividade: Atividade
  atividadeOutro?: string
  para: Para
  equipe?: Equipe
  impacto: Tri
  perfuracao: Tri
  piso: Piso
  oleo: Oleo
  eletricidade: Tri
  quimico: Quimico
  jornada: Jornada
  calor: Calor
  incomodos: Incomodo[]
}

export type Familia = 'ocupacional' | 'seguranca' | 'bota-impermeavel' | 'confirmar'

export type Item = { nome: string; frase: string }
export type Link = { href: string; rotulo: string }

export type Resultado = {
  familia: { chave: Familia; nome: string; frase: string; href: string }
  formato: Item
  biqueira: Item
  solado: Item
  cabedal: Item
  agua: Item
  conforto: Item
  /** Frases derivadas das respostas — o "por que chegamos nisso". */
  porque: string[]
  /** O que a pessoa respondeu "não sei" e precisa confirmar antes de comprar. */
  confirmar: string[]
  /** Avisos que mudam a conversa: eletricidade, perfuração, imersão. */
  alertas: string[]
  /** Linhas reais que a Tower trabalha e que cabem nessa família. */
  linhas: { href: string; rotulo: string; frase: string }[]
  leituras: Link[]
  outrasProtecoes: Link[]
  paginaAtividade?: Link
  /** Quando as respostas não sustentam uma orientação — o caso do "falar com a Tower". */
  insuficiente: boolean
}

/* ------------------------------------------------------------------ rótulos */

export const ROTULO_ATIVIDADE: Record<Atividade, string> = {
  construcao: 'Construção civil',
  industria: 'Indústria',
  logistica: 'Logística e estoque',
  manutencao: 'Manutenção',
  oficina: 'Oficina mecânica',
  cozinha: 'Cozinha e alimentação',
  limpeza: 'Limpeza',
  saude: 'Hospital e saúde',
  servicos: 'Serviços gerais',
  eletrica: 'Área elétrica',
  agricultura: 'Agricultura',
  outro: 'Outra atividade',
}

export const ROTULO_EQUIPE: Record<Equipe, string> = {
  '1-10': '1 a 10 pessoas',
  '11-30': '11 a 30 pessoas',
  '31-100': '31 a 100 pessoas',
  '101-300': '101 a 300 pessoas',
  '300+': 'mais de 300 pessoas',
}

const ROTULO_TRI: Record<Tri, string> = { sim: 'sim', nao: 'não', 'nao-sei': 'não sei' }
const ROTULO_PISO: Record<Piso, string> = {
  seco: 'seco',
  'as-vezes': 'molhado às vezes',
  sempre: 'molhado o tempo todo',
  submerso: 'o pé fica dentro de líquido',
}
const ROTULO_OLEO: Record<Oleo, string> = { frequente: 'frequente', ocasional: 'ocasional', nao: 'não' }
const ROTULO_QUIMICO: Record<Quimico, string> = {
  nao: 'não',
  limpeza: 'produto de limpeza',
  'oleo-solvente': 'óleo ou solvente',
  forte: 'ácido, alcalino ou similar',
  'nao-sei': 'não sei qual',
}
const ROTULO_JORNADA: Record<Jornada, string> = {
  sentado: 'sentado boa parte do dia',
  'pe-parado': 'em pé, parado',
  'pe-caminha': 'em pé, caminhando bastante',
  'pe-intenso': 'em pé o dia todo e caminhando muito',
}
export const ROTULO_INCOMODO: Record<Incomodo, string> = {
  peso: 'peso',
  calor: 'calor',
  cansaco: 'pé cansado',
  dor: 'dor',
  duro: 'calçado duro',
  escorregar: 'escorregar',
  molhar: 'molhar o pé',
  biqueira: 'biqueira apertando',
  higiene: 'dificuldade de higienização',
  nenhum: 'nenhum desses',
}

/* --------------------------------------------------------------- páginas reais */

const PAGINA_ATIVIDADE: Partial<Record<Atividade, Link>> = {
  construcao: { href: '/para-seu-trabalho/construcao/', rotulo: 'EPI para construção' },
  industria: { href: '/para-seu-trabalho/industria/', rotulo: 'EPI para indústria' },
  logistica: { href: '/para-seu-trabalho/logistica-e-estoque/', rotulo: 'EPI para logística e estoque' },
  manutencao: { href: '/para-seu-trabalho/manutencao/', rotulo: 'EPI para manutenção' },
  oficina: { href: '/conhecimento/epi-para-mecanico-de-oficina/', rotulo: 'EPI para mecânico de oficina' },
  cozinha: { href: '/para-seu-trabalho/cozinha/', rotulo: 'EPI para cozinha' },
  limpeza: { href: '/para-seu-trabalho/limpeza-e-conservacao/', rotulo: 'EPI para limpeza' },
  saude: { href: '/para-seu-trabalho/enfermagem-e-saude/', rotulo: 'EPI para enfermagem e saúde' },
  eletrica: { href: '/conhecimento/epi-para-eletricista-o-que-muda/', rotulo: 'EPI para eletricista' },
  agricultura: { href: '/conhecimento/epi-para-aplicacao-de-defensivo-agricola/', rotulo: 'EPI para aplicação de defensivo' },
}

const MAOS: Link = { href: '/protecao/maos/', rotulo: 'Proteção das mãos' }
const OLHOS: Link = { href: '/protecao/olhos-e-face/', rotulo: 'Proteção para olhos e face' }
const RESP: Link = { href: '/protecao/respiratoria/', rotulo: 'Proteção respiratória' }
const AUDIT: Link = { href: '/protecao/auditiva/', rotulo: 'Proteção auditiva' }
const CABECA: Link = { href: '/protecao/cabeca/', rotulo: 'Proteção da cabeça' }

const OUTRAS_PROTECOES: Record<Atividade, Link[]> = {
  construcao: [CABECA, OLHOS, MAOS],
  industria: [AUDIT, MAOS, OLHOS],
  logistica: [MAOS],
  manutencao: [OLHOS, MAOS, AUDIT],
  oficina: [OLHOS, MAOS, RESP],
  cozinha: [MAOS],
  limpeza: [MAOS, OLHOS],
  saude: [MAOS, RESP],
  servicos: [MAOS],
  eletrica: [MAOS, OLHOS],
  agricultura: [RESP, MAOS],
  outro: [],
}

const LINHA_BOMPEL = {
  href: '/marcas/bompel/',
  rotulo: 'Bompel',
  frase: 'Calçado de segurança e ocupacional. É a linha que a Tower mais atende e conhece modelo a modelo.',
}
const LINHA_STICKY = {
  href: '/marcas/sticky-shoes/',
  rotulo: 'Sticky Shoes',
  frase: 'Calçado ocupacional impermeável, com linha branca, usado em cozinha, alimentação e saúde.',
}

/** Atividades em que, na dúvida, o risco de impacto costuma existir. */
const TENDE_IMPACTO = new Set<Atividade>(['construcao', 'industria', 'logistica', 'manutencao', 'oficina'])
/** Atividades em que, na dúvida, o risco de impacto costuma não existir. */
const TENDE_SEM_IMPACTO = new Set<Atividade>(['cozinha', 'saude', 'limpeza', 'servicos'])

/* ------------------------------------------------------------------- motor */

export function calcular(r: Respostas): Resultado {
  const porque: string[] = []
  const confirmar: string[] = []
  const alertas: string[] = []
  const leituras: Link[] = []
  const inc = new Set(r.incomodos)

  const molhado = r.piso === 'sempre' || r.piso === 'as-vezes'
  const temOleo = r.oleo !== 'nao'
  const emPe = r.jornada !== 'sentado'
  const jornadaPesada = r.jornada === 'pe-caminha' || r.jornada === 'pe-intenso'
  const quimico = r.quimico !== 'nao'

  /* ---- família: a decisão que manda em tudo */
  let familia: Resultado['familia']
  if (r.piso === 'submerso') {
    familia = {
      chave: 'bota-impermeavel',
      nome: 'Bota impermeável de cano alto',
      frase:
        'Quando o pé fica dentro de líquido, a barreira precisa ser total e sem entrada — nenhum calçado de cabedal costurado resolve isso.',
      href: '/conhecimento/bota-de-pvc-quando-e-a-resposta-certa/',
    }
    porque.push('O pé fica dentro de líquido, e isso muda a categoria inteira: o que decide é não ter por onde o líquido entrar.')
    if (r.impacto === 'nao-sei') {
      confirmar.push(
        TENDE_IMPACTO.has(r.atividade)
          ? 'Se existe risco de queda ou prensagem de objeto pesado sobre o pé. Na sua atividade ele costuma existir, e bota impermeável existe com e sem biqueira.'
          : 'Se existe risco de queda ou prensagem de objeto pesado sobre o pé. Bota impermeável existe com e sem biqueira, e é essa resposta que decide.',
      )
    }
    if (r.impacto === 'sim') {
      alertas.push(
        'Bota impermeável existe com e sem biqueira de proteção, e a aparência não mostra qual é qual. Como você informou risco de impacto, o modelo precisa ter biqueira, e isso se confirma no Certificado de Aprovação.',
      )
    }
  } else if (r.impacto === 'sim') {
    familia = {
      chave: 'seguranca',
      nome: 'Calçado de segurança',
      frase: 'Existe risco de queda ou prensagem de objeto pesado sobre o pé. A biqueira de proteção deixa de ser opcional.',
      href: '/calcados/seguranca/',
    }
    porque.push('Você informou risco de queda de objeto pesado sobre o pé. É a única resposta que define a categoria sozinha.')
  } else if (r.impacto === 'nao') {
    familia = {
      chave: 'ocupacional',
      nome: 'Calçado ocupacional',
      frase:
        'Sem risco de impacto sobre o pé, a biqueira só acrescenta peso. A proteção que importa aqui está no solado, no cabedal e no conforto.',
      href: '/calcados/ocupacionais/',
    }
    porque.push('Não há risco de queda de objeto pesado sobre o pé, então a categoria adequada é a ocupacional, mais leve.')
  } else {
    const tende = TENDE_IMPACTO.has(r.atividade) ? 'seguranca' : TENDE_SEM_IMPACTO.has(r.atividade) ? 'ocupacional' : null
    familia = {
      chave: 'confirmar',
      nome:
        tende === 'seguranca'
          ? 'Calçado de segurança, a confirmar'
          : tende === 'ocupacional'
            ? 'Calçado ocupacional, a confirmar'
            : 'Categoria a confirmar',
      frase:
        tende === 'seguranca'
          ? 'Na sua atividade o risco de impacto sobre o pé costuma existir. Mas essa é a pergunta que define a categoria, e vale confirmar antes de comprar.'
          : tende === 'ocupacional'
            ? 'Na sua atividade o risco de impacto sobre o pé costuma não existir. Mas essa é a pergunta que define a categoria, e vale confirmar antes de comprar.'
            : 'A categoria depende de existir ou não risco de queda de objeto pesado sobre o pé, e essa resposta ficou em aberto.',
      href: '/calcados/comparativo/',
    }
    confirmar.push('Se existe risco de queda ou prensagem de objeto pesado sobre o pé. É a resposta que define entre calçado ocupacional e de segurança.')
    porque.push('A pergunta sobre impacto ficou sem resposta, e ela é a que separa as duas categorias. O resto do perfil já dá para montar.')
  }

  const seguranca = familia.chave === 'seguranca' || (familia.chave === 'confirmar' && TENDE_IMPACTO.has(r.atividade))
  const ocupacional = familia.chave === 'ocupacional' || (familia.chave === 'confirmar' && TENDE_SEM_IMPACTO.has(r.atividade))

  /* ---- formato: o cano */
  let formato: Item
  if (r.piso === 'submerso') {
    formato = { nome: 'Cano alto', frase: 'Até onde o líquido chega, com a calça por fora para escorrer em vez de entrar.' }
  } else if (r.perfuracao === 'sim' || r.atividade === 'construcao' || r.atividade === 'agricultura') {
    formato = {
      nome: 'Botina (cano no tornozelo)',
      frase: 'Piso irregular e material solto pedem apoio do tornozelo e uma barreira contra o que entra pela boca do calçado.',
    }
  } else if (ocupacional || r.calor === 'sim') {
    formato = {
      nome: 'Sapato fechado',
      frase: 'Piso regular e interno, jornada longa e calor favorecem cano baixo. Fechado em cima, para segurar respingo.',
    }
  } else {
    formato = {
      nome: 'Botina ou sapato, conforme o piso',
      frase: 'Se algo pode entrar pela boca do calçado ou o piso é irregular, botina. Se não, o sapato cansa menos.',
    }
  }
  if (r.calor === 'sim') porque.push('O ambiente é quente, o que pesa contra cano alto e material que não respira.')

  /* ---- biqueira */
  let biqueira: Item
  if (r.piso === 'submerso' && r.impacto === 'nao-sei') {
    biqueira = {
      nome: 'A confirmar',
      frase: 'Depende de existir risco de impacto sobre o pé. Se existir, o modelo precisa ter biqueira, e isso se confirma no Certificado de Aprovação.',
    }
  } else if (r.piso === 'submerso' && r.impacto === 'nao') {
    biqueira = { nome: 'Sem biqueira', frase: 'Sem risco de impacto sobre o pé, a bota impermeável não precisa dela.' }
  } else if (ocupacional && familia.chave !== 'confirmar') {
    biqueira = { nome: 'Sem biqueira de proteção', frase: 'É o que torna o calçado mais leve. Onde não há impacto, ela só pesa.' }
  } else if (seguranca || r.impacto === 'sim') {
    const semMetal = r.eletricidade === 'sim'
    const leve = r.calor === 'sim' || r.jornada === 'pe-intenso' || inc.has('peso')
    if (semMetal) {
      biqueira = {
        nome: 'Composite, a avaliar',
        frase: 'Em atividade elétrica costuma-se preferir biqueira sem metal. A proteção contra impacto é equivalente à do aço quando o modelo atende ao requisito.',
      }
      porque.push('Você trabalha perto de eletricidade, e isso entra na escolha da biqueira e do calçado como um todo.')
    } else if (leve) {
      biqueira = {
        nome: 'Composite, a avaliar',
        frase: 'Protege igual ao aço quando atende ao requisito, e pesa menos. Em calor ou em muita caminhada, o peso decide.',
      }
      porque.push('Entre calor, jornada longa e peso como incômodo, a leveza da biqueira passa a valer.')
    } else {
      biqueira = {
        nome: 'Aço ou composite',
        frase: 'Protegem igual quando atendem ao requisito. O que muda é peso, comportamento no calor e detector de metal — decisão de modelo, não de categoria.',
      }
    }
  } else {
    biqueira = { nome: 'Depende da resposta sobre impacto', frase: 'Confirmada a categoria, a biqueira se decide em seguida.' }
  }

  /* ---- perfuração: requisito à parte */
  if (r.perfuracao === 'sim') {
    alertas.push(
      'Há material perfurante no chão. Proteção da sola contra perfuração é um requisito separado da biqueira, presente só em parte dos modelos, e precisa constar no Certificado de Aprovação.',
    )
    porque.push('Você informou prego, cavaco ou material pontiagudo no piso, o que acrescenta um requisito que a biqueira não cobre.')
  } else if (r.perfuracao === 'nao-sei') {
    confirmar.push('Se existe material perfurante no chão, como prego, cavaco ou ferragem. Isso acrescenta um requisito próprio da sola.')
  }

  /* ---- solado */
  let solado: Item
  if (temOleo && molhado) {
    solado = {
      nome: 'Resistência ao escorregamento para água e óleo',
      frase: 'Piso com água e gordura juntas é a pior combinação de aderência. O desempenho do solado é ensaiado por contaminante, e é esse ensaio que interessa.',
    }
    porque.push('O piso junta água e óleo ou gordura, e a aderência do solado passa a ser a proteção principal.')
  } else if (temOleo) {
    solado = {
      nome: 'Resistência ao escorregamento em piso com óleo',
      frase: 'Óleo e graxa no chão pedem solado ensaiado para esse contaminante, e resistência do material ao próprio óleo.',
    }
    porque.push('Há óleo ou graxa no piso, e o solado precisa ser adequado a esse contaminante.')
  } else if (molhado || r.piso === 'submerso') {
    solado = {
      nome: 'Resistência ao escorregamento em piso molhado',
      frase: 'Aderência ensaiada para superfície molhada. A palavra antiderrapante sozinha não diz em qual condição.',
    }
    porque.push('O piso fica molhado, e a resistência ao escorregamento vira critério principal.')
  } else {
    solado = {
      nome: 'Aderência adequada ao piso, com foco em conforto',
      frase: 'Sem líquido no chão, a aderência padrão costuma atender, e o que decide passa a ser amortecimento e peso.',
    }
  }
  if (inc.has('escorregar') && !molhado && !temOleo) {
    solado = {
      nome: 'Resistência ao escorregamento a conferir',
      frase: 'Você marcou escorregar como incômodo, mas informou piso seco. Vale observar o que há no chão antes de trocar o calçado: às vezes é o piso, às vezes é o par gasto.',
    }
    leituras.push({ href: '/conhecimento/botina-escorrega-o-que-fazer-antes-de-trocar/', rotulo: 'Botina escorrega: o que fazer antes de trocar' })
  }

  /* ---- cabedal */
  const cabedalPartes: string[] = []
  if (r.piso === 'submerso') cabedalPartes.push('material de peça única, sem costura, como PVC ou borracha')
  if (r.quimico === 'limpeza') cabedalPartes.push('material que não absorve e aguenta a limpeza frequente')
  if (r.quimico === 'oleo-solvente' || temOleo) cabedalPartes.push('resistência a óleo, graxa e solvente')
  if (r.quimico === 'forte') cabedalPartes.push('resistência ao produto específico, confirmada na tabela do fabricante — a compatibilidade varia de produto para produto')
  if (r.quimico === 'nao-sei') cabedalPartes.push('compatibilidade com o produto, a confirmar pela ficha de segurança dele')
  if (r.atividade === 'cozinha' || r.atividade === 'saude' || inc.has('higiene')) cabedalPartes.push('fácil higienização, sem costura que retenha resíduo')
  if (r.calor === 'sim' && r.piso !== 'submerso') cabedalPartes.push('respirabilidade, para não cozinhar o pé')
  if (cabedalPartes.length === 0) cabedalPartes.push('couro ou microfibra, conforme a preferência por durabilidade ou por leveza e limpeza')
  const cabedal: Item = {
    nome: cabedalPartes.length > 1 ? 'Material adequado ao ambiente' : 'Material',
    frase: cabedalPartes.join('; ') + '.',
  }
  if (quimico) {
    porque.push(
      r.quimico === 'nao-sei'
        ? 'Há produto químico na rotina, e você não sabe qual. A compatibilidade do material depende do produto exato.'
        : `Há contato com ${ROTULO_QUIMICO[r.quimico]}, e o material do calçado precisa ser compatível com ele.`,
    )
    if (r.quimico === 'nao-sei') confirmar.push('Qual produto químico é manuseado. A ficha de segurança dele é quem diz o que o material precisa resistir.')
  }

  /* ---- água */
  let agua: Item
  if (r.piso === 'submerso') {
    agua = { nome: 'Impermeável', frase: 'Barreira total. Não é resistência a respingo: é o pé dentro de líquido sem que ele entre.' }
  } else if (r.piso === 'sempre' || inc.has('molhar')) {
    agua = { nome: 'Impermeável ou resistente à água', frase: 'Piso molhado o tempo todo pede barreira contra líquido que vem de fora. Impermeável não é licença para lavar por dentro.' }
    if (inc.has('molhar')) porque.push('Molhar o pé está entre os seus incômodos, e isso sobe a prioridade da barreira contra água.')
  } else if (r.piso === 'as-vezes') {
    agua = { nome: 'Resistente à água', frase: 'Respingo ocasional pede cabedal que não absorva. Impermeabilidade total costuma custar respirabilidade sem necessidade.' }
  } else {
    agua = { nome: 'Não prioritário', frase: 'Piso seco não pede barreira contra água. Priorize conforto e respirabilidade.' }
  }

  /* ---- conforto */
  const confortoPartes: string[] = []
  if (jornadaPesada) confortoPartes.push('leveza e amortecimento, com palmilha removível para secar e repor')
  else if (emPe) confortoPartes.push('amortecimento com estabilidade')
  if (inc.has('peso')) confortoPartes.push('peso do par como critério de escolha')
  if (inc.has('biqueira') || inc.has('dor') || inc.has('duro')) confortoPartes.push('numeração e largura da forma provadas no fim do expediente')
  if (inc.has('cansaco')) confortoPartes.push('rodízio de dois pares onde o turno é molhado')
  if (inc.has('calor')) confortoPartes.push('cano baixo e material que respira')
  if (confortoPartes.length === 0) confortoPartes.push('numeração correta, provada no fim do dia')
  const conforto: Item = { nome: jornadaPesada ? 'Prioridade alta' : emPe ? 'Importante' : 'Padrão', frase: confortoPartes.join('; ') + '.' }
  if (jornadaPesada) porque.push(`Você passa o turno ${ROTULO_JORNADA[r.jornada]}. Peso, amortecimento e numeração passam a decidir se o calçado continua no pé.`)
  if (inc.has('biqueira')) {
    porque.push('Biqueira apertando quase sempre é numeração ou largura errada, e não defeito do modelo: biqueira de proteção não amacia.')
    leituras.push({ href: '/conhecimento/botina-que-machuca-calcado-ou-numeracao/', rotulo: 'Botina que machuca: é o calçado ou a numeração?' })
  }

  /* ---- eletricidade */
  if (r.eletricidade === 'sim') {
    alertas.push(
      'Atividade com eletricidade tem norma própria e a especificação vem do responsável técnico da empresa. O que esta orientação faz é lembrar que a escolha muda; ela não substitui essa especificação.',
    )
    leituras.push({ href: '/conhecimento/epi-para-eletricista-o-que-muda/', rotulo: 'EPI para eletricista: o que muda' })
  } else if (r.eletricidade === 'nao-sei') {
    confirmar.push('Se há trabalho próximo a eletricidade, porque isso muda a especificação do calçado e vem do responsável técnico.')
  }

  /* ---- leituras por família */
  if (familia.chave === 'confirmar') leituras.unshift({ href: '/calcados/comparativo/', rotulo: 'Ocupacional ou de segurança: qual é o seu caso' })
  if (familia.chave === 'seguranca') leituras.push({ href: '/conhecimento/biqueira-de-composite-ou-de-aco-qual-escolher/', rotulo: 'Biqueira de composite ou de aço' })
  if (molhado || temOleo) leituras.push({ href: '/conhecimento/solado-antiderrapante-o-que-significa/', rotulo: 'O que significa solado antiderrapante' })
  if (jornadaPesada) leituras.push({ href: '/conhecimento/calcado-para-quem-trabalha-em-pe-o-dia-todo/', rotulo: 'Calçado para quem trabalha em pé o dia todo' })
  if (familia.chave !== 'bota-impermeavel') leituras.push({ href: '/conhecimento/botina-bota-ou-sapato-de-seguranca/', rotulo: 'Botina, bota ou sapato: quando cada um' })

  /* ---- linhas reais */
  const linhas: Resultado['linhas'] = []
  if (familia.chave === 'bota-impermeavel') {
    // Não há linha de bota de PVC com página própria: o texto manda para a
    // conversa em vez de inventar uma.
  } else if (ocupacional && (molhado || r.atividade === 'cozinha' || r.atividade === 'saude' || quimico)) {
    linhas.push(LINHA_STICKY, LINHA_BOMPEL)
  } else {
    linhas.push(LINHA_BOMPEL)
    if (ocupacional) linhas.push(LINHA_STICKY)
  }

  /* ---- insuficiente: respostas que não sustentam orientação */
  const insuficiente =
    r.atividade === 'outro' && r.impacto === 'nao-sei' && r.perfuracao === 'nao-sei' && r.eletricidade === 'nao-sei'

  // sem duplicata de leitura
  const vistos = new Set<string>()
  const leiturasUnicas = leituras.filter((l) => (vistos.has(l.href) ? false : (vistos.add(l.href), true)))

  return {
    familia,
    formato,
    biqueira,
    solado,
    cabedal,
    agua,
    conforto,
    porque,
    confirmar,
    alertas,
    linhas,
    leituras: leiturasUnicas,
    outrasProtecoes: OUTRAS_PROTECOES[r.atividade],
    paginaAtividade: PAGINA_ATIVIDADE[r.atividade],
    insuficiente,
  }
}

/* --------------------------------------------------------- mensagem de zap */

/**
 * A mensagem chega com o perfil inteiro, em primeira pessoa, sem dado
 * pessoal. É o que transforma o resultado em pré-venda: a Tower responde
 * já sabendo atividade, riscos e o que o site sugeriu.
 */
export function mensagemWhatsApp(r: Respostas, res: Resultado): string {
  const linhas = [
    'Olá! Fiz o teste "Qual calçado profissional é ideal para mim?" no site da Tower.',
    '',
    'Meu perfil:',
    `Atividade: ${ROTULO_ATIVIDADE[r.atividade]}${r.atividade === 'outro' && r.atividadeOutro ? ` (${r.atividadeOutro.slice(0, 60)})` : ''}`,
    `Risco de impacto no pé: ${ROTULO_TRI[r.impacto]}`,
    `Material perfurante no piso: ${ROTULO_TRI[r.perfuracao]}`,
    `Piso: ${ROTULO_PISO[r.piso]}`,
    `Óleo ou graxa: ${ROTULO_OLEO[r.oleo]}`,
    `Eletricidade: ${ROTULO_TRI[r.eletricidade]}`,
    `Produto químico: ${ROTULO_QUIMICO[r.quimico]}`,
    `Jornada: ${ROTULO_JORNADA[r.jornada]}`,
    `Ambiente quente: ${r.calor === 'sim' ? 'sim' : 'não'}`,
  ]
  const incs = r.incomodos.filter((i) => i !== 'nenhum').map((i) => ROTULO_INCOMODO[i])
  if (incs.length) linhas.push(`O que mais incomoda: ${incs.join(', ')}`)
  if (r.para === 'equipe') linhas.push(`Compra para equipe: ${r.equipe ? ROTULO_EQUIPE[r.equipe] : 'sim'}`)
  if (res.insuficiente) {
    linhas.push('', 'O site indicou que o meu caso precisa de uma avaliação mais específica.', '', 'Pode me ajudar?')
    return linhas.join('\n')
  }
  linhas.push(
    '',
    'O site sugeriu avaliar:',
    `${res.familia.nome}`,
    `Formato: ${res.formato.nome}`,
    `Biqueira: ${res.biqueira.nome}`,
    `Solado: ${res.solado.nome}`,
    `Água: ${res.agua.nome}`,
    '',
    r.para === 'equipe'
      ? 'Gostaria de um orçamento para a equipe com esse perfil.'
      : 'Pode me ajudar a escolher um modelo?',
  )
  return linhas.join('\n')
}

/* -------------------------------------------------------------- estado na URL */

const CHAVES: (keyof Respostas)[] = [
  'atividade', 'para', 'equipe', 'impacto', 'perfuracao', 'piso', 'oleo',
  'eletricidade', 'quimico', 'jornada', 'calor', 'incomodos',
]

/** Serializa as respostas para o link de compartilhamento. Sem dado pessoal — o texto livre fica de fora. */
export function serializar(r: Respostas): string {
  const p = new URLSearchParams()
  for (const k of CHAVES) {
    const v = r[k]
    if (v === undefined) continue
    p.set(k, Array.isArray(v) ? v.join('.') : String(v))
  }
  return p.toString()
}

const VALIDOS: Record<string, readonly string[]> = {
  atividade: Object.keys(ROTULO_ATIVIDADE),
  para: ['mim', 'equipe'],
  equipe: Object.keys(ROTULO_EQUIPE),
  impacto: ['sim', 'nao', 'nao-sei'],
  perfuracao: ['sim', 'nao', 'nao-sei'],
  piso: Object.keys(ROTULO_PISO),
  oleo: Object.keys(ROTULO_OLEO),
  eletricidade: ['sim', 'nao', 'nao-sei'],
  quimico: Object.keys(ROTULO_QUIMICO),
  jornada: Object.keys(ROTULO_JORNADA),
  calor: ['sim', 'nao'],
}

/** Lê um estado compartilhado. Devolve null se faltar algo ou se houver valor fora da lista. */
export function desserializar(qs: string): Respostas | null {
  const p = new URLSearchParams(qs)
  const out: Record<string, unknown> = {}
  for (const k of CHAVES) {
    const v = p.get(k)
    if (k === 'incomodos') {
      const lista = (v ?? '').split('.').filter(Boolean)
      if (!lista.every((i) => i in ROTULO_INCOMODO)) return null
      out[k] = lista
      continue
    }
    if (k === 'equipe') {
      if (v !== null && !VALIDOS.equipe.includes(v)) return null
      if (v !== null) out[k] = v
      continue
    }
    if (v === null || !VALIDOS[k]?.includes(v)) return null
    out[k] = v
  }
  return out as Respostas
}
