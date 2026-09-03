import type { ContextoWhatsApp } from '@/lib/whatsapp'

/**
 * Trilha B2B por setor.
 *
 * "EPI para restaurante" e "EPI para indústria" são compras, vocabulários e
 * riscos diferentes. Uma página só obrigaria o leitor a filtrar sozinho o que
 * não interessa — e não ranquearia para nenhum dos dois.
 *
 * O H1 sempre nomeia o PROBLEMA do comprador, não o produto.
 */
export type Setor = {
  slug: string
  nome: string
  resumoCurto: string
  titleSeo: string
  descricaoSeo: string
  h1: string
  resumo: string
  problemas: string[]
  oQueCostuma: { titulo: string; texto: string }[]
  perguntas: { pergunta: string; resposta: string }[]
  contexto: ContextoWhatsApp
  profissaoRelacionada: { href: string; rotulo: string } | null
}

export const SETORES: Setor[] = [
  {
    slug: 'alimentacao',
    nome: 'Alimentação',
    resumoCurto: 'Restaurantes, hotéis, cozinhas industriais e serviços de alimentação.',
    titleSeo: 'EPI para restaurantes e cozinhas em Fortaleza',
    descricaoSeo:
      'Calçado antiderrapante, luva e proteção para equipes de cozinha. Orçamento com o CA de cada item, grade de numeração e entrega em Fortaleza.',
    h1: 'EPI para equipes de cozinha e alimentação',
    resumo:
      'Cozinha tem rotatividade alta, numeração variada e um problema específico: o calçado que a equipe não usa. Padronizar aqui é menos sobre catálogo e mais sobre acertar o modelo que as pessoas aceitam calçar todo dia.',
    problemas: [
      'Equipe grande, com numeração variada e reposição constante.',
      'Rotatividade alta — a reposição precisa ser rápida e previsível.',
      'Piso permanentemente molhado e engordurado.',
      'Exigência sanitária de higienização frequente do calçado.',
      'O calçado que a equipe acha desconfortável simplesmente não é usado.',
    ],
    oQueCostuma: [
      {
        titulo: 'Calçado ocupacional antiderrapante',
        texto:
          'É o item central do setor. Fechado, impermeável, fácil de higienizar e com solado adequado a piso molhado com gordura. Na maior parte das cozinhas, biqueira de proteção não é necessária — e retirá-la reduz peso e aumenta a adesão ao uso.',
      },
      {
        titulo: 'Luvas conforme a tarefa',
        texto:
          'Manipulação, limpeza com produto químico e manuseio de material quente são tarefas diferentes e pedem luvas diferentes. Um modelo só raramente cobre bem as três.',
      },
      {
        titulo: 'Proteção para a área de limpeza',
        texto:
          'A equipe que faz a higienização pesada lida com produto concentrado. Luva com punho longo e óculos de proteção durante a diluição resolvem um acidente comum.',
      },
      {
        titulo: 'Numeração e prova',
        texto:
          'Numeração errada é a principal causa de calçado abandonado. Vale considerar que o pé incha ao longo do turno e organizar a prova pensando no fim do expediente, não no começo.',
      },
    ],
    perguntas: [
      {
        pergunta: 'A equipe de cozinha precisa de calçado com biqueira?',
        resposta:
          'Depende da atividade. Cozinha de restaurante geralmente não tem risco de queda de objeto pesado sobre o pé, e nesse caso o calçado ocupacional atende melhor. Já cozinha industrial com movimentação de panelões, caixas e carrinhos pode ter esse risco. A definição deve seguir a avaliação de riscos da empresa.',
      },
      {
        pergunta: 'Como funciona a reposição para equipe com rotatividade alta?',
        resposta:
          'O caminho mais prático é padronizar poucos modelos e manter a grade de numeração mapeada. Assim a reposição vira um pedido rápido, sem precisar recomeçar a escolha a cada contratação. Podemos ajudar a montar essa padronização.',
      },
      {
        pergunta: 'Vocês atendem pedido pequeno?',
        resposta:
          'Sim. Atendemos desde reposição pontual até equipes maiores. Conte quantas pessoas são que a gente indica o caminho mais eficiente.',
      },
    ],
    contexto: 'empresas-alimentacao',
    profissaoRelacionada: {
      href: '/para-seu-trabalho/cozinha/',
      rotulo: 'Ver o que observar num calçado para cozinha',
    },
  },
  {
    slug: 'saude',
    nome: 'Saúde',
    resumoCurto: 'Clínicas, hospitais, laboratórios e serviços de assistência.',
    titleSeo: 'EPI para clínicas e hospitais em Fortaleza',
    descricaoSeo:
      'Calçado ocupacional fechado, luva e proteção respiratória para equipes de saúde. Orçamento com o CA de cada item e entrega em Fortaleza e região.',
    h1: 'EPI para equipes da área da saúde',
    resumo:
      'Turno longo, piso liso, risco biológico e exigência de higienização. Na saúde, a especificação precisa ser precisa e a reposição precisa ser confiável — porque falta de EPI aqui interrompe atendimento.',
    problemas: [
      'Plantões longos exigem conforto real, não apenas conformidade.',
      'Piso liso e molhado durante boa parte do dia.',
      'Risco de respingo de material biológico.',
      'Consumo alto e contínuo de itens descartáveis.',
      'Especificação técnica precisa ser exata e rastreável.',
    ],
    oQueCostuma: [
      {
        titulo: 'Calçado ocupacional fechado e impermeável',
        texto:
          'Fechado no peito do pé, impermeável, antiderrapante e fácil de higienizar. O conforto pesa mais aqui do que na maioria dos setores, porque o turno é longo e quase todo em pé.',
      },
      {
        titulo: 'Proteção respiratória conforme o protocolo',
        texto:
          'A classe da peça filtrante depende do protocolo do serviço e da avaliação de riscos. Informamos disponibilidade e prazo por item antes de fechar.',
      },
      {
        titulo: 'Luvas por finalidade',
        texto:
          'Procedimento, limpeza e manuseio de produto químico exigem luvas diferentes. A padronização precisa considerar essa separação.',
      },
      {
        titulo: 'Previsibilidade de reposição',
        texto:
          'Item descartável tem consumo constante. Mapear o giro mensal evita a compra de emergência, que é sempre a mais cara.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Vocês fornecem para clínica pequena?',
        resposta:
          'Sim. Atendemos desde consultórios e clínicas pequenas até serviços maiores. Conte quantas pessoas são e quais itens vocês usam por mês que a gente monta o orçamento.',
      },
      {
        pergunta: 'Como saber qual classe de proteção respiratória usar?',
        resposta:
          'A definição vem do protocolo do serviço e da avaliação de riscos, considerando o agente e a exposição. Se vocês já têm essa definição, trabalhamos a partir dela. Se não, o caminho é envolver o responsável pela segurança do trabalho ou o setor de controle de infecção.',
      },
    ],
    contexto: 'empresas-saude',
    profissaoRelacionada: {
      href: '/para-seu-trabalho/enfermagem-e-saude/',
      rotulo: 'Ver o que observar no calçado para plantão',
    },
  },
  {
    slug: 'industria',
    nome: 'Indústria',
    resumoCurto: 'Produção, manutenção, logística e áreas de apoio.',
    titleSeo: 'Fornecedor de EPI para indústria em Fortaleza',
    descricaoSeo:
      'Proteção auditiva, respiratória, calçado e luva definidos por posto de trabalho. Orçamento com o CA de cada item, entrega no Ceará e reposição sem recomeçar.',
    h1: 'EPI para indústria, por posto de trabalho',
    resumo:
      'Na indústria a exposição é constante e o consumo é previsível — o que torna a padronização por posto de trabalho o maior ganho possível. É também onde a especificação errada tem consequência mais séria.',
    problemas: [
      'Postos de trabalho com riscos diferentes dentro da mesma planta.',
      'Equipamento usado o turno inteiro, todos os dias.',
      'Consumo contínuo que precisa de previsibilidade de reposição.',
      'Exigência de rastreabilidade de CA para auditoria e fiscalização.',
      'Itens incompatíveis entre si levam ao abandono do uso.',
    ],
    oQueCostuma: [
      {
        titulo: 'Padronização por posto, não por empresa',
        texto:
          'Postos diferentes têm exposições diferentes. Padronizar um kit único para toda a planta costuma gerar excesso em alguns postos e proteção insuficiente em outros.',
      },
      {
        titulo: 'Proteção auditiva com foco em adesão',
        texto:
          'Atenuação só existe com uso correto e contínuo. Vale considerar mais de uma opção — plug e concha — para que cada função use o que consegue manter durante todo o turno.',
      },
      {
        titulo: 'Proteção respiratória conforme o agente',
        texto:
          'Particulado e vapor exigem equipamentos distintos. A definição vem da avaliação de riscos, e a disponibilidade de cada item é confirmada no orçamento.',
      },
      {
        titulo: 'Calçado de segurança adequado ao piso e à carga',
        texto:
          'Biqueira conforme a norma, e proteção contra perfuração onde houver material perfurante. O peso importa em funções que caminham muito.',
      },
      {
        titulo: 'Teste do conjunto completo',
        texto:
          'Capacete, protetor auricular, óculos e respirador são usados juntos. Testar o conjunto antes de padronizar evita descobrir a incompatibilidade depois da compra.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Vocês ajudam a padronizar o EPI por função?',
        resposta:
          'Sim, a partir da avaliação de riscos da empresa. Ela é o documento que diz a que cada posto está exposto. Com ela em mãos, ajudamos a organizar o conjunto por função e a verificar se o que está em uso corresponde ao risco.',
      },
      {
        pergunta: 'Vocês fornecem a lista de CA dos itens?',
        resposta:
          'Sim. Os itens que fornecemos têm Certificado de Aprovação, e informamos o número para que a empresa registre na ficha de EPI e mantenha a rastreabilidade para auditoria.',
      },
    ],
    contexto: 'empresas-industria',
    profissaoRelacionada: {
      href: '/para-seu-trabalho/industria/',
      rotulo: 'Ver o que observar na indústria',
    },
  },
  {
    slug: 'construcao',
    nome: 'Construção',
    resumoCurto: 'Construtoras, empreiteiras e prestadores de serviço em obra.',
    titleSeo: 'Fornecedor de EPI para obras em Fortaleza',
    descricaoSeo:
      'Calçado com biqueira, capacete, luva e proteção respiratória para obra. Orçamento com o CA de cada item, entrega em Fortaleza e reposição sem recomeçar.',
    h1: 'EPI para equipes de obra',
    resumo:
      'Obra tem a maior variedade de risco simultâneo e a maior rotatividade de equipe. Isso torna a padronização e a velocidade de reposição mais importantes do que em qualquer outro setor.',
    problemas: [
      'Riscos variados e simultâneos numa mesma frente.',
      'Rotatividade alta e entrada constante de novos trabalhadores.',
      'Necessidade de reposição rápida para não parar a frente.',
      'Fiscalização frequente e exigência de ficha de EPI em dia.',
      'Frentes com necessidades diferentes na mesma obra.',
    ],
    oQueCostuma: [
      {
        titulo: 'Calçado de segurança com biqueira',
        texto:
          'É o padrão da obra. Onde há material perfurante no piso, vale verificar se o modelo tem proteção contra perfuração — nem todo calçado de segurança tem, e isso consta no Certificado de Aprovação.',
      },
      {
        titulo: 'Capacete conforme o risco da frente',
        texto:
          'Existem classes diferentes, inclusive para atividade com risco elétrico. A definição segue a avaliação de riscos.',
      },
      {
        titulo: 'Luvas por frente de trabalho',
        texto:
          'Ferragem, acabamento e manuseio de produto químico exigem luvas diferentes. Padronizar por frente funciona melhor que padronizar por obra.',
      },
      {
        titulo: 'Proteção respiratória para poeira',
        texto:
          'Corte, demolição e manuseio de cimento geram particulado fino. A classe adequada depende da exposição.',
      },
      {
        titulo: 'Trabalho em altura exige avaliação técnica',
        texto:
          'Cinto, talabarte e ancoragem envolvem norma específica, treinamento e avaliação do ponto de ancoragem no local. Não é escolha de catálogo — precisa de profissional habilitado.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Quanto tempo leva a reposição?',
        resposta:
          'Depende do item e da quantidade. Como atendemos Fortaleza e a região, a reposição de itens de linha costuma ser rápida. Diga o que você precisa e para quando que informamos o prazo real antes de fechar.',
      },
      {
        pergunta: 'Vocês fornecem equipamento para trabalho em altura?',
        resposta:
          'Trabalhamos com essa linha, mas fazemos questão de dizer o seguinte: a escolha do sistema depende de norma específica, treinamento e avaliação do ponto de ancoragem. Não indicamos por telefone. O caminho é envolver o profissional habilitado responsável pela obra.',
      },
    ],
    contexto: 'empresas-construcao',
    profissaoRelacionada: {
      href: '/para-seu-trabalho/construcao/',
      rotulo: 'Ver o que observar na obra',
    },
  },
  {
    slug: 'facilities-e-limpeza',
    nome: 'Facilities e limpeza',
    resumoCurto: 'Empresas de limpeza, conservação, portaria e serviços terceirizados.',
    titleSeo: 'EPI para empresas de limpeza em Fortaleza',
    descricaoSeo:
      'Luva adequada ao produto, calçado antiderrapante e proteção para os olhos. Orçamento com o CA de cada item e entrega para empresas de limpeza em Fortaleza.',
    h1: 'EPI para equipes de limpeza e conservação',
    resumo:
      'Empresa de limpeza atende postos diferentes com produtos diferentes — e a luva costuma ser padronizada por preço, não por risco. É o erro mais comum e mais fácil de corrigir do setor.',
    problemas: [
      'Postos diferentes, com produtos químicos diferentes.',
      'Equipe distribuída em vários endereços de clientes.',
      'Rotatividade alta e reposição constante.',
      'Luva padronizada pelo preço, não pela resistência química.',
      'Necessidade de comprovar fornecimento para o cliente contratante.',
    ],
    oQueCostuma: [
      {
        titulo: 'Luva escolhida pelo produto, não pelo preço',
        texto:
          'Este é o ponto que mais vale revisar. A resistência varia conforme o material da luva, o produto usado e o tempo de contato. Padronizar por preço costuma gerar troca frequente e proteção insuficiente — o que sai mais caro no fim.',
      },
      {
        titulo: 'Calçado antiderrapante',
        texto:
          'A equipe de limpeza é quem molha o piso e quem mais caminha sobre ele molhado. Aderência é a proteção principal da função.',
      },
      {
        titulo: 'Óculos para diluição de produto',
        texto:
          'O momento de maior risco de respingo nos olhos é a diluição do concentrado. É um acidente comum, grave e barato de evitar.',
      },
      {
        titulo: 'Mapeamento por posto',
        texto:
          'Cada contrato tem produtos e ambientes diferentes. Mapear o que se usa em cada posto permite padronizar o que dá para padronizar e separar o que precisa ser específico.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Como saber qual luva usar para cada produto?',
        resposta:
          'É preciso saber qual produto químico é usado e em que concentração. Com essa informação, verificamos a resistência indicada no Certificado de Aprovação dos modelos. Mande a lista de produtos que a equipe usa que a gente ajuda a cruzar.',
      },
      {
        pergunta: 'Vocês entregam em endereços diferentes?',
        resposta:
          'Atendemos Fortaleza e região. Conte como a equipe está distribuída que a gente combina a forma de entrega mais prática para o seu caso.',
      },
    ],
    contexto: 'empresas-facilities',
    profissaoRelacionada: {
      href: '/para-seu-trabalho/limpeza-e-conservacao/',
      rotulo: 'Ver o que observar na limpeza',
    },
  },
]

export const buscarSetor = (slug: string) => SETORES.find((s) => s.slug === slug)
