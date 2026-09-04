/**
 * FONTE ÚNICA DE VERDADE sobre a empresa.
 *
 * Todo dado factual do site sai daqui. Nenhum componente ou página deve
 * escrever telefone, endereço, ano ou credencial "na mão".
 *
 * Itens marcados PENDENTE precisam de confirmação de Helano/Cristina.
 * Ver docs/03-fatos-verificados.md, seção 11.
 */

export const empresa = {
  nome: "Tower EPI's",
  nomeCompleto: "Tower EPI's — Equipamentos de Proteção Individual",

  /**
   * Identificação legal, informada por Helano em setembro de 2026.
   *
   * "Tower EPI's" é nome fantasia; a razão social é a de baixo. As páginas
   * legais precisam da razão social e do CNPJ para identificar o controlador
   * e a parte contratante — nome fantasia não identifica ninguém num pedido
   * de LGPD nem num termo de uso.
   *
   * O CNPJ foi conferido pelos dígitos verificadores antes de ser publicado
   * (4 e 0, batem). CNPJ errado em página legal é pior que CNPJ ausente.
   */
  razaoSocial: 'Helano G. De Alencar Araripe Com. ME',
  cnpj: '26.684.642/0001-40',

  assinatura: 'Proteção para o trabalho desde 1995.',
  descricaoCurta:
    'Distribuidora de equipamentos de proteção individual em Fortaleza, no Ceará, desde 1995.',

  fundacao: 1995,
  get anos() {
    return new Date().getFullYear() - this.fundacao
  },

  /**
   * PENDENTE — CRÍTICO. Número visto em post do Instagram: (85) 3491-9494.
   * Confirmar antes do lançamento:
   *  1. o número está certo;
   *  2. tem WhatsApp ativo;
   *  3. recebe mensagem com texto pré-preenchido (link wa.me).
   * Toda a conversão do site depende disto.
   */
  whatsapp: {
    numero: '558534919494',
    exibicao: '(85) 3491-9494',
    confirmado: false,
  },

  /**
   * E-mails dos dois sócios, no domínio `tower-ce.com.br` — que é anterior a
   * este site e não é o domínio da Vercel. Nada aqui exige mexer no DNS de
   * towerepis.com.br, que não recebe e-mail e não deve receber.
   *
   * Servem também como canal de privacidade: a empresa tem duas pessoas e o
   * pedido chega direto a uma delas, que é o que a política já dizia sobre o
   * WhatsApp. Agora existe também o caminho escrito, que é o que um titular
   * costuma querer quando o assunto é dado pessoal.
   */
  email: {
    helano: 'helano@tower-ce.com.br',
    cristina: 'cristina@tower-ce.com.br',
  },

  /**
   * A Tower não tem loja física desde 2018 (home office).
   * Decisão do cliente: NÃO publicar endereço.
   * Opera como service-area business — o sinal local vem da área atendida.
   */
  endereco: {
    publicar: false,
    cidade: 'Fortaleza',
    estado: 'CE',
    estadoExtenso: 'Ceará',
    pais: 'BR',
  },

  /**
   * Área atendida — confirmada pelo cliente em 3 de setembro de 2026.
   *
   * Alimenta o `areaServed` do schema em todas as páginas e as páginas de
   * /epi-por-cidade/. NÃO é lista de desejo: cada item aqui é cidade ou
   * estado onde a Tower atende de verdade. Acrescentar por otimismo faria
   * o site prometer no WhatsApp o que a operação não entrega.
   */
  areaAtendida: [
    'Fortaleza',
    'Região Metropolitana de Fortaleza',
    'Ceará',
    'Piauí',
    'Rio Grande do Norte',
  ],

  // PENDENTE: horário real de atendimento.
  horario: {
    texto: 'Segunda a sexta, em horário comercial',
    confirmado: false,
  },

  instagram: 'https://www.instagram.com/towerepis',
  site: 'https://towerepis.com.br',

  socios: {
    helano: {
      nome: 'Helano',
      // PENDENTE: nome completo e registro profissional de TST.
      nomeCompleto: null as string | null,
      registro: null as string | null,
      cargo: 'Sócio-proprietário',
      credencial: 'Técnico de Segurança do Trabalho',
      desde: 1995,
    },
    cristina: {
      nome: 'Cristina',
      nomeCompleto: null as string | null,
      cargo: 'Sócia-proprietária',
      credencial: 'Atendimento e vendas',
      desde: 1995,
    },
  },

  /**
   * Marcas trabalhadas.
   *
   * A ordem importa e não é histórica: reflete a operação de HOJE.
   * A Bompel é a principal parceria atual — o site precisa dizer isso.
   * A 3M é a origem da empresa. Hoje a disponibilidade de produto 3M é
   * limitada, e o site diz isso de frente — prometer 3M e não ter é pior
   * do que não prometer. A 3M aparece como HISTÓRIA (convite, prêmio),
   * nunca como promessa de estoque. Confundir as duas coisas faria o site
   * descrever a Tower de 1995 em vez da Tower de agora.
   */
  marcas: [
    { nome: 'Bompel', slug: 'bompel', site: 'https://www.bompel.com.br/', principal: true },
    { nome: '3M', slug: '3m', site: null, principal: false },
    { nome: 'Sticky Shoes', slug: null, site: null, principal: false },
  ],
} as const

/** Fatos publicáveis, usados como prova ao longo do site. */
export const provas = {
  desde: `Desde ${empresa.fundacao}`,
  anos: `${empresa.anos} anos`,
  origem3M:
    'Em 1995, a 3M procurava alguém para desenvolver o mercado de proteção no Ceará. Convidou o Helano.',
  premio3M: 'Distribuidor Regional 3M',
  clienteAntigo:
    'Uma indústria têxtil do Ceará compra com a gente desde os anos 1990.',
  atendimentoDireto:
    'Quem responde é um dos dois sócios. Não há intermediário.',
} as const
