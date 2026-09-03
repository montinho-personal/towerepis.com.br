import type { ContextoWhatsApp } from '@/lib/whatsapp'

/**
 * Atendimento por cidade.
 *
 * REGRA QUE DEFINE ESTE ARQUIVO: nenhum texto aqui pode servir para duas
 * cidades. Se a frase continuar verdadeira trocando o nome da cidade, ela é
 * enchimento e sai. É o teste que separa página local de doorway page — e o
 * motivo de este arquivo ser prosa escrita uma a uma, e não um molde com
 * [CIDADE] substituído.
 *
 * O QUE ESTE ARQUIVO NÃO PODE CONTER:
 *  - endereço, telefone local, unidade, loja ou estoque em qualquer cidade;
 *  - prazo de entrega ou valor de frete (o "como" da entrega ainda não foi
 *    confirmado — ver pendência 7 em docs/03-fatos-verificados.md);
 *  - número econômico que eu não consiga sustentar na fonte primária. Os
 *    perfis são qualitativos, com link para o IBGE e para órgãos estaduais,
 *    onde o leitor confere. Percentual de PIB visto em agregador de terceiros
 *    ficou de fora de propósito.
 *
 * A área atendida é confirmada e vive em src/config/empresa.ts.
 */
export type Cidade = {
  slug: string
  nome: string
  uf: 'CE' | 'PI' | 'RN'
  estado: string
  /** Como a Tower chama a região no dia a dia. Entra no texto, não é enfeite. */
  regiao: string
  titleSeo: string
  descricaoSeo: string
  h1: string
  resumo: string
  /** Resposta direta, autocontida — precisa fazer sentido arrancada da página. */
  emUmaFrase: string
  /** O perfil econômico real, com as fontes que o leitor pode conferir. */
  economia: string[]
  fontes: { titulo: string; url: string }[]
  /** O cruzamento que só existe nesta cidade: atividade local → EPI. */
  oQuePede: { titulo: string; texto: string }[]
  /** Setores do site que essa economia realmente aciona. */
  setores: { href: string; nome: string; porque: string }[]
  /** Guias técnicos que respondem a dúvida que nasce nesta cidade. */
  guias: { href: string; titulo: string; texto: string }[]
  /**
   * Como o pedido chega DESSA cidade.
   *
   * Existe porque a primeira versão tinha três parágrafos iguais em todas as
   * páginas explicando o atendimento — e a medição de sobreposição entre
   * Teresina e Parnaíba deu 0,77, a mesma faixa que eu tinha apontado como
   * problema nas páginas de setor. Texto igual em cinco páginas é a
   * assinatura da doorway page, mesmo quando o resto é diferente.
   */
  atendimento: string
  /** O que a Tower NÃO é a fornecedora certa para fazer, quando for o caso. */
  ondeNaoSomos: string | null
  perguntas: { pergunta: string; resposta: string }[]
  contexto: ContextoWhatsApp
  mensagemWhats: string
}

export type Estado = {
  slug: string
  nome: string
  uf: 'CE' | 'PI' | 'RN'
  titleSeo: string
  descricaoSeo: string
  h1: string
  resumo: string
  emUmaFrase: string
  /** O que liga as cidades desse estado entre si, do ponto de vista de EPI. */
  contexto: string[]
}

export const ESTADOS: Estado[] = [
  {
    slug: 'ceara',
    nome: 'Ceará',
    uf: 'CE',
    titleSeo: 'EPI no Ceará: atendimento da capital ao Cariri',
    descricaoSeo:
      'A Tower é de Fortaleza e atende o Ceará desde 1995. Veja o que muda entre a capital e o Cariri, e fale direto com quem é técnico de segurança do trabalho.',
    h1: 'EPI no Ceará: de Fortaleza ao Cariri',
    resumo:
      'O Ceará é a casa da Tower. A empresa nasceu em Fortaleza em 1995, a convite da 3M, para desenvolver o mercado de proteção no estado — e é aqui que estão os clientes mais antigos.',
    emUmaFrase:
      'A Tower EPI’s atende empresas em todo o Ceará, com base em Fortaleza, desde 1995. O pedido nasce no WhatsApp e quem responde é um dos dois sócios.',
    contexto: [
      'O estado tem duas realidades industriais que pedem coisas diferentes. Na Região Metropolitana de Fortaleza estão a indústria de transformação, a construção de grande porte, a rede hospitalar e a maior concentração de serviços de alimentação do estado.',
      'No Cariri, a quase 550 quilômetros da capital, o desenho é outro: um polo de calçado formado por muitas fábricas pequenas e médias, indústria química e de cimento, e uma economia que gira em torno de três cidades vizinhas.',
      'É por isso que a página de Fortaleza e a de Barbalha não dizem a mesma coisa. O EPI que resolve a rotina de uma cozinha industrial na capital não é o que resolve a linha de montagem de uma fábrica de calçado no interior.',
    ],
  },
  {
    slug: 'piaui',
    nome: 'Piauí',
    uf: 'PI',
    titleSeo: 'EPI no Piauí: Teresina e Parnaíba',
    descricaoSeo:
      'Atendimento a empresas de Teresina e Parnaíba: calçado de segurança e ocupacional, luvas e proteção, com orientação de quem é técnico de segurança.',
    h1: 'EPI no Piauí: Teresina e Parnaíba',
    resumo:
      'As duas maiores cidades do Piauí pedem EPI por motivos opostos — uma pela rede de saúde, a outra pelo litoral e pelo turismo. A Tower atende as duas.',
    emUmaFrase:
      'A Tower EPI’s atende empresas em Teresina e Parnaíba, no Piauí. O orçamento sai com o Certificado de Aprovação (CA) de cada item, e o pedido começa numa conversa de WhatsApp.',
    contexto: [
      'Teresina e Parnaíba são as duas maiores cidades do estado e quase não se parecem do ponto de vista de segurança do trabalho.',
      'Teresina é uma capital de serviços, e o serviço que a organiza é a saúde: uma rede hospitalar que atende gente de todo o Piauí e de estados vizinhos. O EPI que essa cidade consome é o da cadeia hospitalar inteira — inclusive o de quem limpa, lava e cozinha dentro do hospital, que é onde a compra costuma errar.',
      'Parnaíba é litoral, comércio e turismo. Ali o EPI que decide é o calçado de cozinha e de serviço, num ambiente que junta piso molhado, gordura e alta rotatividade de equipe na temporada.',
    ],
  },
  {
    slug: 'rio-grande-do-norte',
    nome: 'Rio Grande do Norte',
    uf: 'RN',
    titleSeo: 'EPI no Rio Grande do Norte: Natal e Assú',
    descricaoSeo:
      'Atendimento a empresas de Natal e do Vale do Açu. Calçado de segurança e ocupacional, luvas, proteção respiratória — com orientação técnica antes do orçamento.',
    h1: 'EPI no Rio Grande do Norte: Natal e Assú',
    resumo:
      'Do têxtil e da hotelaria da capital à fruticultura irrigada do Vale do Açu. São dois perfis de risco distintos, e nenhum deles se resolve com a mesma lista de itens.',
    emUmaFrase:
      'A Tower EPI’s atende empresas em Natal e em Assú, no Rio Grande do Norte, com calçado de segurança e ocupacional, luvas e proteção respiratória.',
    contexto: [
      'O Rio Grande do Norte que a Tower atende são duas economias com pouca coisa em comum.',
      'Natal é capital de turismo, comércio e indústria — com destaque para o têxtil, um dos setores mais fortes do estado, e para a construção civil. É um perfil que a Tower conhece de perto: o cliente mais antigo da casa é uma indústria têxtil, que compra desde os anos 1990.',
      'Assú é o centro do Vale do Açu, região de fruticultura irrigada e de petróleo e gás. O EPI de lá é o agrícola — o que a bula do defensivo exige, o da colheita e o do galpão de embalagem —, uma categoria que quase nenhum fornecedor escreve direito.',
    ],
  },
]

export const CIDADES: Cidade[] = [
  // ---------------------------------------------------------------- CEARÁ
  {
    slug: 'barbalha-ce',
    nome: 'Barbalha',
    uf: 'CE',
    estado: 'ceara',
    regiao: 'Cariri',
    titleSeo: 'EPI em Barbalha e no Cariri: calçados e proteção',
    descricaoSeo:
      'Atendimento a empresas de Barbalha, Crato e Juazeiro do Norte: calçado de segurança, luva para cola e solvente, proteção auditiva, com CA no orçamento.',
    h1: 'EPI em Barbalha: proteção para a indústria do Cariri',
    resumo:
      'Barbalha é uma das três cidades do Crajubar, e a indústria daqui não é uma só: fábrica de calçado, química e cimento pedem proteções diferentes, às vezes no mesmo galpão.',
    emUmaFrase:
      'A Tower EPI’s atende empresas de Barbalha e do Cariri cearense com calçado de segurança e ocupacional, luvas, proteção respiratória e auditiva. A empresa é de Fortaleza, atende o Ceará desde 1995, e o orçamento sai com o Certificado de Aprovação (CA) de cada item.',
    economia: [
      'A base econômica de Barbalha é comércio e agricultura, mas o que define o risco ocupacional da cidade é a indústria: a FARMACE, do ramo químico e farmacêutico, e a fábrica de cimento herdeira da antiga Indústria Barbalhense de Cimento Portland.',
      'Em volta, o Cariri concentra um polo calçadista formado por muitas micro, pequenas e médias fábricas, distribuídas entre Crato, Juazeiro do Norte e a própria Barbalha — o conjunto que a região chama de Crajubar.',
      'Há uma ironia útil nisso: a Tower é distribuidora de calçado de segurança para uma região que fabrica calçado. Quem monta sapato o dia inteiro também precisa de sapato — e o que a fábrica pede não é o que ela produz.',
    ],
    fontes: [
      { titulo: 'IBGE Cidades — Barbalha (CE)', url: 'https://cidades.ibge.gov.br/brasil/ce/barbalha/panorama' },
      {
        titulo: 'IPECE — Panorama da indústria cearense de calçados',
        url: 'https://www.ipece.ce.gov.br/wp-content/uploads/sites/45/2014/02/TD_101.pdf',
      },
    ],
    oQuePede: [
      {
        titulo: 'Fábrica de calçado',
        texto:
          'É o setor com mais risco escondido da região. Cola e solvente pedem luva com resistência química de verdade, não a luva de látex do almoxarifado — e pedem proteção respiratória para vapor orgânico, que é filtro, não máscara descartável. O corte pede luva anticorte. E a máquina de bater solado gera ruído contínuo, que é o dano que ninguém percebe acontecendo.',
      },
      {
        titulo: 'Cimento',
        texto:
          'Poeira fina o dia todo. Aqui a proteção respiratória contra particulado e a proteção ocular são o básico, e o erro comum é o respirador que não veda porque nunca foi ajustado ao rosto de quem usa.',
      },
      {
        titulo: 'Química e farmacêutica',
        texto:
          'Luva escolhida pelo produto manuseado, não pelo preço da caixa. É a categoria em que a troca de material — nitrílica, neoprene, PVC — muda tudo, e onde vale conversar antes de comprar.',
      },
      {
        titulo: 'Agricultura',
        texto:
          'A área rural em torno de Barbalha traz a demanda de aplicação de defensivo, que tem regra própria: o EPI indicado é o que a bula do produto manda, e ele muda de produto para produto.',
      },
    ],
    setores: [
      {
        href: '/empresas/industria/',
        nome: 'Indústria',
        porque: 'Fábrica de calçado, cimento e química — o desenho industrial do Cariri.',
      },
      {
        href: '/empresas/construcao/',
        nome: 'Construção',
        porque: 'Obra e manutenção industrial, que andam juntas na região.',
      },
    ],
    guias: [
      {
        href: '/protecao/maos/',
        titulo: 'Luva por tipo de risco',
        texto: 'Cola, solvente e corte pedem luvas diferentes. A escolha é pelo risco, não pelo preço.',
      },
      {
        href: '/protecao/auditiva/',
        titulo: 'Proteção auditiva',
        texto: 'O ruído da fábrica de calçado é contínuo, e o dano não dói na hora.',
      },
      {
        href: '/conhecimento/o-que-e-ca-certificado-de-aprovacao/',
        titulo: 'O que é o CA e como consultar',
        texto: 'Todo EPI vendido no Brasil precisa ter Certificado de Aprovação válido.',
      },
    ],
    atendimento:
      'Do Cariri, o pedido costuma vir de dentro da fábrica — encarregado de produção ou o próprio dono, que conhece a linha melhor que qualquer catálogo. Uma foto do posto de trabalho adianta mais que uma descrição: em fábrica de calçado, ver a bancada mostra na hora se o problema é a cola, o corte ou o ruído da máquina.',
    ondeNaoSomos: null,
    perguntas: [
      {
        pergunta: 'A Tower EPI’s atende empresas em Barbalha?',
        resposta:
          'Sim. A Tower EPI’s é de Fortaleza e atende empresas em todo o Ceará, incluindo Barbalha e as demais cidades do Cariri. O atendimento começa por WhatsApp, e quem responde é um dos dois sócios.',
      },
      {
        pergunta: 'Qual luva usar para manuseio de cola e solvente em fábrica de calçado?',
        resposta:
          'A escolha depende do produto químico específico. Luva de látex comum não protege contra solvente — para vapor e respingo de solvente, o caminho costuma ser luva nitrílica ou de neoprene, conforme o produto. O jeito certo é olhar a ficha do produto químico e escolher o material da luva a partir dela.',
      },
      {
        pergunta: 'Máscara descartável serve para vapor de solvente?',
        resposta:
          'Não. Máscara descartável do tipo PFF retém partícula, não vapor químico. Para vapor orgânico é preciso respirador com filtro químico apropriado. São equipamentos diferentes, com Certificados de Aprovação diferentes.',
      },
      {
        pergunta: 'Vocês atendem Crato e Juazeiro do Norte também?',
        resposta:
          'Sim. O atendimento cobre o Cariri como região, incluindo Crato e Juazeiro do Norte.',
      },
    ],
    contexto: 'cidade-barbalha',
    mensagemWhats:
      'Olá! Vim pelo site. Sou de Barbalha (ou do Cariri) e gostaria de um orçamento de EPI para a minha empresa.',
  },

  // ---------------------------------------------------------------- PIAUÍ
  {
    slug: 'teresina-pi',
    nome: 'Teresina',
    uf: 'PI',
    estado: 'piaui',
    regiao: 'Teresina',
    titleSeo: 'EPI em Teresina: calçados e proteção para empresas',
    descricaoSeo:
      'Atendimento a empresas de Teresina: calçado ocupacional antiderrapante, luvas e proteção, com o CA de cada item e orientação técnica no orçamento.',
    h1: 'EPI em Teresina: proteção para a rede de serviços e saúde',
    resumo:
      'Teresina é uma capital de serviços, e o serviço que organiza a cidade é a saúde. Isso muda o EPI que a cidade consome — e muda principalmente para quem trabalha no hospital sem ser da assistência.',
    emUmaFrase:
      'A Tower EPI’s atende empresas em Teresina, no Piauí, com calçado ocupacional e de segurança, luvas, proteção respiratória e proteção auditiva. A empresa é de Fortaleza, atua desde 1995, e o orçamento traz o Certificado de Aprovação (CA) de cada item.',
    economia: [
      'A economia de Teresina é de serviços, e o setor que a define é a saúde. A cidade é referência regional em atendimento de alta complexidade e recebe pacientes de todo o Piauí e de estados vizinhos — o que sustenta uma rede grande de hospitais, clínicas e serviços de apoio.',
      'Junto com a rede assistencial vem tudo o que a mantém de pé: higienização, lavanderia hospitalar, cozinha, manutenção predial e logística interna. É aí que mora a maior parte do EPI de uma cidade como Teresina, e é a parte que quase nenhum fornecedor descreve.',
    ],
    fontes: [
      { titulo: 'IBGE Cidades — Teresina (PI)', url: 'https://cidades.ibge.gov.br/brasil/pi/teresina/panorama' },
    ],
    oQuePede: [
      {
        titulo: 'A luva que erra de categoria',
        texto:
          'A compra hospitalar costuma tratar luva como item único. Só que a luva de procedimento, descartável, protege o paciente e o profissional do contato biológico — e não protege ninguém do saneante usado na limpeza. Quem higieniza precisa de luva de proteção química, mais espessa e reutilizável. É o erro mais comum e o mais barato de corrigir.',
      },
      {
        titulo: 'O calçado do plantão',
        texto:
          'Doze horas em pé, piso liso e recém-lavado, e circulação constante. O que resolve é calçado ocupacional fechado, com solado antiderrapante e cabedal que aguente higienização. Biqueira de aço não entra aqui: não há risco de impacto, e o peso extra só atrapalha quem passa o turno andando.',
      },
      {
        titulo: 'Lavanderia e nutrição hospitalar',
        texto:
          'A lavanderia de hospital trabalha com roupa contaminada na entrada e com calor, umidade e produto químico o tempo todo — a barreira aqui é tão importante quanto no centro cirúrgico, e costuma receber menos atenção. Na nutrição, o risco muda: carro térmico pesado, câmara fria e o transporte de dieta pelos corredores, que junta peso, frio e piso recém-higienizado.',
      },
      {
        titulo: 'Manutenção predial',
        texto:
          'A equipe que atende a estrutura do hospital trabalha com eletricidade, altura e ferramenta — e costuma ser a última a ser lembrada na hora de padronizar o EPI.',
      },
    ],
    setores: [
      {
        href: '/empresas/saude/',
        nome: 'Saúde',
        porque: 'Hospitais, clínicas e todo o serviço de apoio que os mantém funcionando.',
      },
      {
        href: '/empresas/facilities-e-limpeza/',
        nome: 'Limpeza e facilities',
        porque: 'Higienização hospitalar é o setor com mais risco químico mal protegido.',
      },
      {
        href: '/empresas/alimentacao/',
        nome: 'Alimentação',
        porque: 'Cozinha hospitalar e refeitório, com o mesmo problema de piso das cozinhas industriais.',
      },
    ],
    guias: [
      {
        href: '/calcados/antiderrapantes/',
        titulo: 'Calçado antiderrapante',
        texto: 'O que muda no solado, e por que nem todo calçado escorregadio parece escorregadio.',
      },
      {
        href: '/conhecimento/calcado-ocupacional-ou-de-seguranca/',
        titulo: 'Ocupacional ou de segurança?',
        texto: 'A diferença é a biqueira — e ela decide qual dos dois serve para o plantão.',
      },
      {
        href: '/protecao/maos/',
        titulo: 'Luva por tipo de risco',
        texto: 'Procedimento e proteção química são categorias diferentes, com CAs diferentes.',
      },
    ],
    atendimento:
      'Em compra hospitalar o pedido quase sempre chega do setor de compras, com uma lista pronta. Vale mandar a lista antes de fechar: boa parte das correções que a Tower faz é de categoria — luva de procedimento onde a função exige luva química, biqueira de segurança onde ninguém corre risco de impacto.',
    ondeNaoSomos: null,
    perguntas: [
      {
        pergunta: 'A Tower EPI’s atende empresas em Teresina?',
        resposta:
          'Sim. A Tower EPI’s é de Fortaleza e atende empresas em Teresina, no Piauí. O atendimento começa por WhatsApp e o orçamento sai com o Certificado de Aprovação (CA) de cada item.',
      },
      {
        pergunta: 'Qual calçado é indicado para plantão hospitalar?',
        resposta:
          'Calçado ocupacional fechado, com solado antiderrapante e material que suporte higienização frequente. Calçado de segurança com biqueira só é necessário quando existe risco de impacto ou queda de objeto sobre o pé, o que não é o caso da maior parte da assistência.',
      },
      {
        pergunta: 'Luva de procedimento serve para limpeza hospitalar?',
        resposta:
          'Não. A luva de procedimento é descartável e voltada ao contato biológico. Para higienização com saneante é preciso luva de proteção química, mais espessa e resistente ao produto usado. São EPIs de categorias diferentes.',
      },
      {
        pergunta: 'Como pedir um orçamento para uma equipe grande?',
        resposta:
          'Basta chamar no WhatsApp dizendo a atividade, a quantidade aproximada e a grade de numeração, quando for calçado. A Tower responde com as opções e o CA de cada item, sem cadastro e sem formulário.',
      },
    ],
    contexto: 'cidade-teresina',
    mensagemWhats:
      'Olá! Vim pelo site. Sou de Teresina e gostaria de um orçamento de EPI para a minha equipe.',
  },
  {
    slug: 'parnaiba-pi',
    nome: 'Parnaíba',
    uf: 'PI',
    estado: 'piaui',
    regiao: 'litoral do Piauí',
    titleSeo: 'EPI em Parnaíba: calçado de cozinha e proteção',
    descricaoSeo:
      'Atendimento a empresas de Parnaíba e do litoral piauiense. Calçado antiderrapante para cozinha, luvas e proteção, com orientação técnica antes do orçamento.',
    h1: 'EPI em Parnaíba: proteção para hotelaria, cozinha e serviços',
    resumo:
      'Segunda maior cidade do Piauí e a única com porto e litoral. Aqui o EPI que mais decide é o calçado — e o problema não é escolher o modelo, é escolher o modelo que a equipe aceita calçar.',
    emUmaFrase:
      'A Tower EPI’s atende empresas em Parnaíba, no litoral do Piauí, com calçado antiderrapante para cozinha, calçado ocupacional, luvas e proteção. O orçamento sai com o Certificado de Aprovação (CA) de cada item.',
    economia: [
      'Parnaíba é a segunda cidade mais populosa do Piauí e uma das quatro do litoral do estado. A economia é de comércio, serviços e turismo, com o porto e uma Zona de Processamento de Exportação no horizonte de investimento do estado.',
      'Turismo de litoral significa restaurante, pousada, hotel e todo o serviço que os sustenta. É uma economia sazonal, e a sazonalidade muda a lógica de compra de EPI: a equipe cresce na temporada, a rotatividade sobe, e a reposição precisa ser rápida e previsível.',
    ],
    fontes: [
      { titulo: 'IBGE Cidades — Parnaíba (PI)', url: 'https://cidades.ibge.gov.br/brasil/pi/parnaiba/panorama' },
      {
        titulo: 'Invest Piauí — perfil de negócios de Parnaíba',
        url: 'https://investepiaui.com/wp-content/uploads/2022/11/Folder_ZPE.pdf',
      },
    ],
    oQuePede: [
      {
        titulo: 'Cozinha à beira-mar',
        texto:
          'A areia é o detalhe que muda tudo aqui e que ninguém escreve: ela entra na cozinha nos pés de todo mundo e funciona como rolamento sob o solado, num piso que já é molhado e engordurado. Some a maresia, que ataca componente metálico e encurta a vida do calçado, e o cálculo de reposição do litoral deixa de ser o mesmo do interior.',
      },
      {
        titulo: 'Governança e camareira',
        texto:
          'Produto de limpeza o dia todo e muito tempo em pé. Luva de proteção química para o saneante e calçado ocupacional fechado, leve, com solado que segure em piso liso de quarto e corredor.',
      },
      {
        titulo: 'Manutenção predial e piscina',
        texto:
          'É a função de hotel com mais risco químico esquecido: quem trata piscina manuseia produto concentrado, e isso pede luva, proteção ocular e, dependendo do produto, respiratória.',
      },
      {
        titulo: 'Compra de temporada',
        texto:
          'A alta temporada dobra equipe em pouco tempo. Vale fechar a grade de numeração antes, para não descobrir na véspera que o número que falta é justamente o mais comum.',
      },
    ],
    setores: [
      {
        href: '/empresas/alimentacao/',
        nome: 'Alimentação',
        porque: 'Restaurante, hotel e cozinha industrial — o coração da economia local.',
      },
      {
        href: '/empresas/facilities-e-limpeza/',
        nome: 'Limpeza e facilities',
        porque: 'Governança, área comum e manutenção, com risco químico diário.',
      },
    ],
    guias: [
      {
        href: '/conhecimento/calcado-para-cozinha-como-escolher/',
        titulo: 'Calçado para cozinha: como escolher',
        texto: 'O guia que responde a dúvida mais comum de quem equipa restaurante.',
      },
      {
        href: '/conhecimento/solado-antiderrapante-o-que-significa/',
        titulo: 'Solado antiderrapante: o que significa',
        texto: 'Nem todo solado com desenho é antiderrapante. Existe ensaio, e existe marcação.',
      },
      {
        href: '/calcados/antiderrapantes/',
        titulo: 'Calçados antiderrapantes',
        texto: 'Os modelos que a Tower trabalha para piso molhado e engordurado.',
      },
    ],
    atendimento:
      'No litoral o pedido tem estação. Se a sua equipe cresce na temporada, o caminho mais tranquilo é definir modelo e grade de numeração antes do pico e deixar a reposição combinada — a pressa da alta temporada é o que faz cozinha trabalhar com o calçado errado.',
    ondeNaoSomos: null,
    perguntas: [
      {
        pergunta: 'A Tower EPI’s atende empresas em Parnaíba?',
        resposta:
          'Sim. A Tower EPI’s atende empresas em Parnaíba e no litoral do Piauí. O contato começa por WhatsApp, sem cadastro.',
      },
      {
        pergunta: 'Qual calçado é indicado para trabalhar em cozinha?',
        resposta:
          'Calçado fechado, impermeável, com solado antiderrapante ensaiado para piso molhado e com gordura. Na maior parte das cozinhas o calçado ocupacional resolve; a biqueira de segurança só entra quando há risco real de impacto, como em recebimento de carga.',
      },
      {
        pergunta: 'Como funciona a compra para a alta temporada?',
        resposta:
          'O caminho mais tranquilo é definir a grade de numeração e o modelo antes do pico, e combinar a reposição. Assim a entrada de gente nova não trava por falta de um número específico.',
      },
      {
        pergunta: 'Como saber se o calçado tem CA válido?',
        resposta:
          'Todo EPI vendido no Brasil precisa ter um Certificado de Aprovação (CA) emitido pelo Ministério do Trabalho e Emprego, e o número fica marcado no próprio produto. A Tower informa o CA de cada item no orçamento.',
      },
    ],
    contexto: 'cidade-parnaiba',
    mensagemWhats:
      'Olá! Vim pelo site. Sou de Parnaíba e gostaria de um orçamento de EPI para a minha equipe.',
  },

  // ------------------------------------------------- RIO GRANDE DO NORTE
  {
    slug: 'natal-rn',
    nome: 'Natal',
    uf: 'RN',
    estado: 'rio-grande-do-norte',
    regiao: 'Natal',
    titleSeo: 'EPI em Natal: calçados e proteção para empresas',
    descricaoSeo:
      'Atendimento a empresas de Natal: têxtil, hotelaria e construção. Calçado de segurança, proteção auditiva e respiratória, com o CA de cada item no orçamento.',
    h1: 'EPI em Natal: têxtil, hotelaria e construção',
    resumo:
      'Natal junta três economias que pedem EPI por motivos diferentes. Uma delas — a têxtil — é o setor que a Tower atende há mais tempo, desde os anos 1990.',
    emUmaFrase:
      'A Tower EPI’s atende empresas em Natal, no Rio Grande do Norte, com calçado de segurança e ocupacional, proteção auditiva, respiratória e luvas. A empresa é de Fortaleza e atua desde 1995.',
    economia: [
      'Natal é uma capital de turismo, comércio e indústria. Entre os setores industriais, o têxtil é um dos mais fortes do Rio Grande do Norte, e a construção civil responde por uma fatia grande da indústria do estado.',
      'É um perfil que a Tower conhece de dentro. O cliente mais antigo da casa é uma indústria têxtil, que compra desde os anos 1990 — o que significa três décadas vendo de perto o que dá certo e o que a fábrica devolve.',
    ],
    fontes: [
      { titulo: 'IBGE Cidades — Natal (RN)', url: 'https://cidades.ibge.gov.br/brasil/rn/natal/panorama' },
      {
        titulo: 'Sistema FIERN — indústria no Rio Grande do Norte',
        url: 'https://www.rn.sesi.org.br/dia-da-industria-amaro-sales-destaca-potenciais-do-setor-e-a-atuacao-do-sistema-fiern-para-o-desenvolvimento-potiguar/',
      },
    ],
    oQuePede: [
      {
        titulo: 'Indústria têxtil',
        texto:
          'Três riscos que andam juntos e costumam ser tratados como um só. Ruído contínuo de tear e máquina, que pede proteção auditiva com atenuação compatível — e não o protetor mais barato da caixa. Poeira e fibra em suspensão, que pedem proteção respiratória para particulado. E corte, na parte de acabamento e no manuseio de lâmina.',
      },
      {
        titulo: 'Hotelaria de grande porte',
        texto:
          'Cozinha, governança, manutenção e área de piscina, cada uma com um risco. O calçado antiderrapante resolve a maior parte, e o restante é luva escolhida pelo produto químico de cada função.',
      },
      {
        titulo: 'Construção civil',
        texto:
          'Capacete, calçado de segurança com biqueira, luva e proteção ocular são o básico que a obra já conhece. O que costuma faltar é o ajuste: capacete sem jugular em serviço de altura, e calçado de numeração errada que a equipe troca entre si.',
      },
    ],
    setores: [
      {
        href: '/empresas/industria/',
        nome: 'Indústria',
        porque: 'Têxtil e transformação — o setor que a Tower atende há mais tempo.',
      },
      {
        href: '/empresas/construcao/',
        nome: 'Construção',
        porque: 'Obra e reforma, com peso grande na indústria do estado.',
      },
      {
        href: '/empresas/alimentacao/',
        nome: 'Alimentação',
        porque: 'Cozinha de hotel e restaurante, na cidade que vive de turismo.',
      },
    ],
    guias: [
      {
        href: '/protecao/auditiva/',
        titulo: 'Proteção auditiva',
        texto: 'Ruído de tear é contínuo, e a perda auditiva não avisa antes de acontecer.',
      },
      {
        href: '/protecao/respiratoria/',
        titulo: 'PFF1, PFF2 e PFF3',
        texto: 'Qual classe usar para cada risco — e por que a escolha não é pelo preço.',
      },
      {
        href: '/calcados/seguranca/',
        titulo: 'Calçados de segurança',
        texto: 'Quando a biqueira é obrigatória, e quando ela só atrapalha.',
      },
    ],
    atendimento:
      'Em indústria têxtil o pedido costuma passar pelo SESMT ou pelo técnico de segurança, e aí a conversa fica objetiva: nível de ruído medido no posto, tipo de fibra em suspensão, e o EPI sai da avaliação de risco. Em hotel e obra o caminho é o oposto — começa pela função e pela quantidade.',
    ondeNaoSomos:
      'O Rio Grande do Norte tem um parque eólico grande, e a pergunta aparece. Vale ser direto: trabalho em altura e serviço em energia formam um mercado técnico próprio — linha de vida, talabarte, cinto tipo paraquedista, conjunto para arco elétrico —, com exigência de treinamento e inspeção periódica que vai além de fornecer o equipamento. Não é o que a Tower distribui hoje, e dizer isso agora é melhor do que descobrir depois do pedido.',
    perguntas: [
      {
        pergunta: 'A Tower EPI’s atende empresas em Natal?',
        resposta:
          'Sim. A Tower EPI’s é de Fortaleza e atende empresas em Natal, no Rio Grande do Norte. O atendimento começa por WhatsApp e quem responde é um dos dois sócios.',
      },
      {
        pergunta: 'Qual proteção auditiva usar em indústria têxtil?',
        resposta:
          'A escolha depende do nível de ruído medido no posto de trabalho e do tempo de exposição. O protetor precisa ter atenuação compatível com esse nível, informada no Certificado de Aprovação (CA). Protetor com atenuação alta demais também atrapalha, porque isola a pessoa da comunicação e do alarme.',
      },
      {
        pergunta: 'A Tower fornece equipamento para trabalho em altura e energia?',
        resposta:
          'Não. Cinto tipo paraquedista, talabarte, linha de vida e conjunto para arco elétrico formam um mercado técnico próprio, com exigência de treinamento e inspeção periódica. A Tower trabalha com calçado, proteção respiratória, auditiva, ocular, de mãos e de corpo.',
      },
      {
        pergunta: 'Empresas são obrigadas a fornecer EPI aos funcionários?',
        resposta:
          'Sim. A NR-6 estabelece que o empregador fornece o EPI adequado ao risco, gratuitamente, em perfeito estado, e é responsável por orientar sobre o uso, exigir o uso e substituir quando danificado ou extraviado.',
      },
    ],
    contexto: 'cidade-natal',
    mensagemWhats:
      'Olá! Vim pelo site. Sou de Natal e gostaria de um orçamento de EPI para a minha empresa.',
  },
  {
    slug: 'assu-rn',
    nome: 'Assú',
    uf: 'RN',
    estado: 'rio-grande-do-norte',
    regiao: 'Vale do Açu',
    titleSeo: 'EPI em Assú e no Vale do Açu: proteção para o agro',
    descricaoSeo:
      'Atendimento a empresas do Vale do Açu. EPI para aplicação de defensivo, colheita e galpão de embalagem, com o CA de cada item e orientação técnica.',
    h1: 'EPI em Assú: proteção para a fruticultura do Vale do Açu',
    resumo:
      'O Vale do Açu é uma das regiões mais irrigadas do Rio Grande do Norte. O EPI de lá é agrícola — e é a categoria em que a escolha errada tem consequência mais imediata.',
    emUmaFrase:
      'A Tower EPI’s atende empresas em Assú e no Vale do Açu, no Rio Grande do Norte, com EPI para aplicação de defensivo, colheita e galpão de embalagem, além de calçado de segurança e ocupacional.',
    economia: [
      'Assú é o centro do Vale do Açu, região de fruticultura irrigada — banana, manga, mamão e castanha — e uma das que mais concentram estabelecimentos agrícolas com irrigação no Rio Grande do Norte. Petróleo, gás e energia eólica também têm presença na região.',
      'Fruticultura de exportação é uma operação com três ambientes distintos: o campo, onde se aplica defensivo e se colhe; o galpão de embalagem, com piso molhado e câmara fria; e a logística que leva a fruta embora. Cada um pede um EPI diferente, e é comum a compra tratar os três como um.',
    ],
    fontes: [
      { titulo: 'IBGE Cidades — Assú (RN)', url: 'https://cidades.ibge.gov.br/brasil/rn/assu/panorama' },
      {
        titulo: 'CORECON-RN — fruticultura irrigada no Vale do Açu',
        url: 'https://www.corecon-rn.org.br/2018/06/04/a-modernizacao-da-fruticultura-irrigada-e-seus-impactos-socioeconomicos-e-ambientais-no-vale-do-acu/',
      },
    ],
    oQuePede: [
      {
        titulo: 'Aplicação de defensivo',
        texto:
          'É a única categoria de EPI em que a resposta não vem do catálogo: vem do rótulo e da bula do produto que vai ser aplicado. Cada defensivo indica o equipamento exigido, e ele muda de produto para produto. O conjunto costuma envolver vestimenta hidrorrepelente, luva resistente ao produto, proteção respiratória com filtro adequado, proteção ocular ou facial e calçado impermeável.',
      },
      {
        titulo: 'Colheita',
        texto:
          'Sol o dia inteiro, ferramenta de corte e contato com folha e seiva. Luva, proteção da pele e calçado firme — e a atenção real aqui é o conforto, porque EPI desconfortável em jornada de campo simplesmente para de ser usado depois das primeiras horas.',
      },
      {
        titulo: 'Galpão de embalagem',
        texto:
          'Piso permanentemente molhado, frio da câmara e ritmo de esteira. O calçado precisa ser impermeável e antiderrapante, e a luva precisa dar destreza suficiente para manusear fruta sem machucar o produto.',
      },
    ],
    setores: [
      {
        href: '/empresas/industria/',
        nome: 'Indústria e agroindústria',
        porque: 'Beneficiamento e embalagem, com risco de piso, frio e químico.',
      },
      {
        href: '/empresas/facilities-e-limpeza/',
        nome: 'Limpeza e higienização',
        porque: 'Sanitização de galpão e equipamento, com produto concentrado.',
      },
    ],
    guias: [
      {
        href: '/protecao/respiratoria/',
        titulo: 'Proteção respiratória',
        texto: 'PFF retém partícula; vapor químico pede filtro. Não é o mesmo equipamento.',
      },
      {
        href: '/protecao/maos/',
        titulo: 'Luva por tipo de risco',
        texto: 'Na aplicação de defensivo, o material da luva é definido pelo produto.',
      },
      {
        href: '/conhecimento/nr-6-o-que-a-empresa-precisa-saber/',
        titulo: 'NR-6: o que a empresa precisa saber',
        texto: 'Quem fornece, quem paga e o que precisa constar no registro.',
      },
    ],
    atendimento:
      'No agro o pedido começa pela bula. Se você disser qual defensivo é aplicado, a Tower parte da exigência do próprio produto, que é o que manda — e não de uma lista de catálogo. Para colheita e galpão de embalagem, o que resolve é dizer quantas pessoas e em que ambiente.',
    ondeNaoSomos: null,
    perguntas: [
      {
        pergunta: 'A Tower EPI’s atende empresas em Assú?',
        resposta:
          'Sim. A Tower EPI’s atende empresas em Assú e no Vale do Açu, no Rio Grande do Norte. O contato começa por WhatsApp, sem cadastro.',
      },
      {
        pergunta: 'Como saber qual EPI usar na aplicação de um defensivo?',
        resposta:
          'A indicação está no rótulo e na bula do próprio produto, que especificam o equipamento de proteção exigido para o manuseio e a aplicação. Como cada produto tem exigência própria, o caminho é partir da bula e escolher os itens a partir dela — e não o contrário.',
      },
      {
        pergunta: 'Qual calçado usar em galpão de embalagem?',
        resposta:
          'Calçado impermeável, com solado antiderrapante para piso molhado. Onde há movimentação de carga ou paleteira, entra a biqueira de segurança; nos postos sem risco de impacto, o calçado ocupacional é mais confortável para a jornada.',
      },
      {
        pergunta: 'A empresa precisa registrar a entrega do EPI ao trabalhador?',
        resposta:
          'Sim. A NR-6 responsabiliza o empregador por fornecer o EPI adequado ao risco, gratuitamente, e por exigir e orientar o uso. O registro da entrega é o que comprova esse fornecimento.',
      },
    ],
    contexto: 'cidade-assu',
    mensagemWhats:
      'Olá! Vim pelo site. Sou de Assú (Vale do Açu) e gostaria de um orçamento de EPI para a minha empresa.',
  },
]

export const buscarCidade = (slug: string) => CIDADES.find((c) => c.slug === slug)
export const buscarEstado = (slug: string) => ESTADOS.find((e) => e.slug === slug)
export const cidadesDoEstado = (estado: string) => CIDADES.filter((c) => c.estado === estado)
