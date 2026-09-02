import type { ContextoWhatsApp } from '@/lib/whatsapp'

/** Subcategorias de calçado. Cluster-âncora do site. */
export type TipoCalcado = {
  slug: string
  nome: string
  titleSeo: string
  descricaoSeo: string
  h1: string
  resumo: string
  emUmaFrase: string
  oQueObservar: { titulo: string; texto: string }[]
  paraQuem: { href: string; titulo: string; texto: string }[]
  perguntas: { pergunta: string; resposta: string }[]
  contexto: ContextoWhatsApp
  ctaTitulo: string
  ctaTexto: string
}

export const CALCADOS: TipoCalcado[] = [
  {
    slug: 'ocupacionais',
    nome: 'Calçados ocupacionais',
    titleSeo: 'Calçados ocupacionais em Fortaleza',
    descricaoSeo:
      'Calçado ocupacional sem biqueira, para atividades sem risco mecânico: cozinha, saúde, limpeza e serviços. Veja o que observar. Tower EPI’s, Fortaleza.',
    h1: 'Calçados ocupacionais',
    resumo:
      'É o calçado profissional destinado a atividades sem risco de impacto sobre os dedos do pé. Atende à ABNT NBR ISO 20347 e é o mais usado em cozinha, saúde, limpeza, comércio e serviços — justamente onde o problema real é piso escorregadio e jornada longa em pé.',
    emUmaFrase:
      'Não tem biqueira de proteção contra impacto, e é exatamente por isso que costuma ser a escolha certa onde não existe esse risco: mais leve, mais confortável e com foco em aderência e higiene.',
    oQueObservar: [
      {
        titulo: 'Resistência ao escorregamento',
        texto:
          'Como esse calçado é usado em ambientes de piso liso e molhado, a aderência é a proteção principal. Verifique a marcação do modelo e o que consta no Certificado de Aprovação, porque o desempenho varia conforme a superfície e o contaminante.',
      },
      {
        titulo: 'Se é fechado e impermeável',
        texto:
          'Em cozinha e em área da saúde, o peito do pé precisa estar coberto contra respingo. Modelos com perfuração de ventilação em cima não servem para essas áreas.',
      },
      {
        titulo: 'Facilidade de higienização',
        texto:
          'Material que não absorve, sem costura que retenha resíduo e que seca rápido entre turnos. Em ambiente com exigência sanitária isso é requisito, não conforto.',
      },
      {
        titulo: 'Peso e amortecimento',
        texto:
          'É o item que decide se o calçado continuará no pé depois da segunda semana. Jornada longa em pé cobra do corpo, e calçado pesado é abandonado.',
      },
      {
        titulo: 'Numeração e largura',
        texto:
          'O pé incha ao longo do turno. Provar pensando no fim do expediente, e considerar a largura da forma além do número, evita o arrependimento mais comum.',
      },
      {
        titulo: 'Certificado de Aprovação',
        texto:
          'Quando o calçado é fornecido como EPI, precisa ter CA válido. Vale conferir também se a descrição corresponde ao uso pretendido.',
      },
    ],
    paraQuem: [
      { href: '/para-seu-trabalho/cozinha/', titulo: 'Cozinha', texto: 'Piso molhado com gordura e respingo quente.' },
      { href: '/para-seu-trabalho/enfermagem-e-saude/', titulo: 'Enfermagem e saúde', texto: 'Plantão longo e piso liso molhado.' },
      { href: '/para-seu-trabalho/limpeza-e-conservacao/', titulo: 'Limpeza', texto: 'Piso molhado e produto químico.' },
    ],
    perguntas: [
      {
        pergunta: 'Calçado ocupacional pode ser usado como EPI?',
        resposta:
          'Sim, quando é fornecido para proteger contra um risco presente na atividade e possui Certificado de Aprovação válido. O que ele não faz é proteger contra impacto sobre os dedos, porque não tem biqueira de proteção.',
      },
      {
        pergunta: 'Ele é menos resistente que o calçado de segurança?',
        resposta:
          'Não é uma questão de resistência geral, e sim de finalidade. Ele não é destinado a risco mecânico sobre os dedos, mas pode ter excelente desempenho em resistência ao escorregamento, durabilidade e conforto — que é o que importa nos ambientes onde é usado.',
      },
    ],
    contexto: 'calcados-ocupacionais',
    ctaTitulo: 'Diga onde você trabalha que a gente indica o modelo.',
    ctaTexto:
      'Tipo de piso, o que costuma cair nele e quantas horas você passa em pé mudam completamente a escolha. Conte a sua rotina que a gente mostra as opções.',
  },
  {
    slug: 'seguranca',
    nome: 'Calçados de segurança',
    titleSeo: 'Calçados de segurança em Fortaleza',
    descricaoSeo:
      'Calçado de segurança com biqueira de proteção contra impacto, para indústria, construção, logística e manutenção. Tower EPI’s, Fortaleza, desde 1995.',
    h1: 'Calçados de segurança',
    resumo:
      'É o calçado com biqueira de proteção contra impacto, destinado a atividades com risco mecânico sobre os dedos do pé. Atende à ABNT NBR ISO 20345 e é o padrão em indústria, construção, logística e manutenção.',
    emUmaFrase:
      'O que define esse calçado é a biqueira com resistência a impacto de 200 joules — e é importante saber que ela protege os dedos, mas não protege a sola contra perfuração.',
    oQueObservar: [
      {
        titulo: 'O material da biqueira',
        texto:
          'Aço e composite protegem de forma equivalente quando ambos atendem à norma. O composite é mais leve e não conduz calor nem frio; o aço costuma custar menos. A escolha depende do ambiente e de quanto a pessoa caminha.',
      },
      {
        titulo: 'Proteção contra perfuração, se necessária',
        texto:
          'Prego e ferro no chão são o acidente clássico da obra. A proteção da sola é um requisito adicional, presente apenas em modelos específicos. Confira no Certificado de Aprovação antes de comprar.',
      },
      {
        titulo: 'Resistência ao escorregamento',
        texto:
          'Continua importante mesmo com biqueira. Piso de galpão e de área industrial pode ter poeira, óleo ou umidade.',
      },
      {
        titulo: 'Botina ou sapato',
        texto:
          'A botina dá firmeza ao tornozelo e impede a entrada de material pela parte de cima. O sapato é mais fresco e mais fácil de calçar. Piso irregular e movimentação de carga volumosa costumam pedir botina.',
      },
      {
        titulo: 'Peso, para quem caminha muito',
        texto:
          'Em logística e manutenção, a quilometragem diária é alta. Biqueira de composite costuma resolver bem essa equação sem abrir mão da norma.',
      },
      {
        titulo: 'Proteções adicionais',
        texto:
          'Conforme a atividade, podem existir requisitos extras — resistência a hidrocarbonetos, propriedades antiestáticas, entre outros. O que o modelo atende consta no Certificado de Aprovação.',
      },
    ],
    paraQuem: [
      { href: '/para-seu-trabalho/construcao/', titulo: 'Construção', texto: 'Queda de material e piso com perfurante.' },
      { href: '/para-seu-trabalho/industria/', titulo: 'Indústria', texto: 'Movimentação de carga e risco mecânico.' },
      { href: '/para-seu-trabalho/logistica-e-estoque/', titulo: 'Logística', texto: 'Carga em movimento e muita caminhada.' },
    ],
    perguntas: [
      {
        pergunta: 'Calçado de segurança precisa ser pesado?',
        resposta:
          'Não. A proteção vem de a biqueira atender ao requisito da norma, não do peso do calçado. Modelos com biqueira de composite protegem conforme a norma e são mais leves, o que faz diferença real para quem caminha muito.',
      },
      {
        pergunta: 'A biqueira protege contra prego no chão?',
        resposta:
          'Não. A biqueira protege os dedos contra impacto e compressão. A proteção contra perfuração da sola é um requisito adicional, presente apenas em modelos específicos, e precisa constar no Certificado de Aprovação.',
      },
    ],
    contexto: 'calcados-seguranca',
    ctaTitulo: 'Conte qual é a sua atividade.',
    ctaTexto:
      'Se há material perfurante no chão, quanto você caminha e como é o piso, tudo isso muda o modelo indicado. Diga a sua rotina que a gente mostra as opções.',
  },
  {
    slug: 'antiderrapantes',
    nome: 'Calçados antiderrapantes',
    titleSeo: 'Sapato antiderrapante em Fortaleza',
    descricaoSeo:
      'O que significa solado antiderrapante, como o desempenho é medido e como escolher para piso molhado ou oleoso. Tower EPI’s, Fortaleza, desde 1995.',
    h1: 'Calçados antiderrapantes',
    resumo:
      'Escorregamento é o acidente mais comum em cozinha, área da saúde e limpeza. Mas "antiderrapante" não é uma característica única: o desempenho é medido em superfícies diferentes, e é isso que precisa bater com o seu piso.',
    emUmaFrase:
      'A resistência ao escorregamento é ensaiada em superfícies e contaminantes específicos — por isso um modelo pode ir bem em piso molhado e ter desempenho diferente em piso com resíduo oleoso.',
    oQueObservar: [
      {
        titulo: 'Qual é o contaminante do seu piso',
        texto:
          'Água, gordura, óleo, produto de limpeza ou poeira. Cozinha combina água e gordura; indústria pode ter óleo; hospital tem piso liso molhado por limpeza. São situações diferentes.',
      },
      {
        titulo: 'A marcação do modelo',
        texto:
          'Historicamente as marcações SRA, SRB e SRC indicavam desempenho em piso cerâmico com detergente, em aço com glicerol, ou em ambos. As normas passaram por revisões e a marcação pode variar. Confira o modelo específico e o Certificado de Aprovação, em vez de confiar apenas na palavra “antiderrapante” na descrição.',
      },
      {
        titulo: 'O desenho e a profundidade do relevo',
        texto:
          'O relevo é o que escoa o líquido e mantém o contato com o piso. Solado liso, ou com relevo raso, perde aderência muito antes.',
      },
      {
        titulo: 'O desgaste ao longo do uso',
        texto:
          'O ensaio é feito com o calçado novo. Solado desgastado perde justamente a proteção principal. Em ambiente onde escorregar é o risco maior, conferir o relevo periodicamente é o critério de troca mais importante.',
      },
      {
        titulo: 'O piso também responde pela aderência',
        texto:
          'Aderência é relação entre duas superfícies. Piso muito liso, acúmulo de gordura e limpeza inadequada reduzem o desempenho de qualquer solado. O calçado é proteção individual — não substitui a correção do ambiente quando ela é possível.',
      },
    ],
    paraQuem: [
      { href: '/para-seu-trabalho/cozinha/', titulo: 'Cozinha', texto: 'Água e gordura no piso o tempo todo.' },
      { href: '/para-seu-trabalho/limpeza-e-conservacao/', titulo: 'Limpeza', texto: 'Piso molhado com produto químico.' },
      { href: '/para-seu-trabalho/enfermagem-e-saude/', titulo: 'Saúde', texto: 'Piso liso molhado por limpeza frequente.' },
    ],
    perguntas: [
      {
        pergunta: 'Todo calçado profissional é antiderrapante?',
        resposta:
          'Não. E entre os que são, o desempenho varia conforme a superfície ensaiada. Por isso vale verificar a marcação do modelo específico e o que consta no Certificado de Aprovação, em vez de assumir que a descrição comercial cobre o seu caso.',
      },
      {
        pergunta: 'Quando devo trocar por causa do solado?',
        resposta:
          'Quando o relevo estiver gasto nas áreas de maior apoio, mesmo que o calçado ainda pareça inteiro. O relevo é o que garante a aderência — sem ele, a proteção principal deixou de existir.',
      },
    ],
    contexto: 'calcados-antiderrapantes',
    ctaTitulo: 'Descreva o chão onde você trabalha.',
    ctaTexto:
      'Como é o piso, o que costuma cair nele e se molha com frequência. A gente verifica a marcação dos modelos e indica o que faz sentido para o seu caso.',
  },
]

export const buscarCalcado = (slug: string) => CALCADOS.find((c) => c.slug === slug)
