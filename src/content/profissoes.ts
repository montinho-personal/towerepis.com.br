import type { ContextoWhatsApp } from '@/lib/whatsapp'

/**
 * Páginas por profissão.
 *
 * É a maior alavanca de tráfego do site: a pessoa não busca "calçado
 * NBR ISO 20347", ela busca "sapato para trabalhar em cozinha".
 *
 * O bloco `oQueObservar` é o coração do modelo — entrega critério mesmo
 * para quem não vai comprar aqui. É literalmente o que a Tower faz desde 1995.
 */
export type Profissao = {
  slug: string
  nome: string
  resumoCurto: string
  titleSeo: string
  descricaoSeo: string
  h1: string
  resumo: string
  reconhecimento: string[]
  emUmaFrase: string
  oQueObservar: { titulo: string; texto: string }[]
  categorias: { href: string; titulo: string; texto: string }[]
  perguntas: { pergunta: string; resposta: string }[]
  contexto: ContextoWhatsApp
  ctaTitulo: string
  ctaTexto: string
  ponteEmpresas: { href: string; texto: string } | null
}

export const PROFISSOES: Profissao[] = [
  {
    slug: 'cozinha',
    nome: 'Cozinha e alimentação',
    resumoCurto:
      'Piso molhado, gordura, respingo quente e muitas horas em pé. O solado decide quase tudo.',
    titleSeo: 'Calçado para cozinha: como escolher o modelo certo',
    descricaoSeo:
      'Piso molhado, gordura e jornada em pé. Veja o que observar num calçado para trabalhar em cozinha e fale com quem entende. Tower EPI’s, Fortaleza, desde 1995.',
    h1: 'Calçado para quem trabalha em cozinha',
    resumo:
      'Cozinha profissional junta três coisas que quase nenhum outro ambiente junta: piso molhado com gordura, respingo quente e jornada longa em pé. Isso muda completamente o critério de escolha do calçado.',
    reconhecimento: [
      'O piso vive molhado e engordurado, e escorregar é o acidente mais comum.',
      'Cai água quente, óleo e resto de alimento sobre o pé.',
      'A jornada é longa e quase toda em pé, muitas vezes em dobra.',
      'O calçado precisa ser lavado com frequência e secar rápido.',
    ],
    emUmaFrase:
      'Na maioria das cozinhas, o que resolve é um calçado ocupacional fechado, impermeável e com solado antiderrapante — biqueira de proteção só entra se houver risco real de queda de objeto pesado sobre o pé.',
    oQueObservar: [
      {
        titulo: 'Solado antiderrapante, e para o piso certo',
        texto:
          'Antiderrapante não é uma coisa só. Os ensaios de resistência ao escorregamento usam superfícies diferentes: cerâmica com solução detergente e aço com glicerol. Em cozinha, o que importa é o desempenho em piso molhado e engordurado. Peça para ver a marcação do modelo e o Certificado de Aprovação antes de decidir.',
      },
      {
        titulo: 'Fechado em cima e impermeável',
        texto:
          'O pé precisa estar coberto contra respingo de líquido quente e de gordura. Calçado aberto, com furos de ventilação no peito do pé ou em tecido que absorve líquido não serve para linha de produção.',
      },
      {
        titulo: 'Facilidade de higienização',
        texto:
          'Cozinha exige limpeza diária. Materiais que não absorvem, sem costura que acumule resíduo e que secam rápido duram mais e atendem melhor à exigência sanitária.',
      },
      {
        titulo: 'Conforto para a jornada inteira',
        texto:
          'Esse é o item que faz o equipamento ser usado ou abandonado. Peso, amortecimento e a forma do calçado importam tanto quanto a proteção — porque calçado que machuca sai do pé no meio do turno.',
      },
      {
        titulo: 'Biqueira: só se houver risco mecânico',
        texto:
          'Cozinha comum não costuma ter queda de objeto pesado sobre os dedos. Já uma cozinha industrial com movimentação de caixas, panelões e carrinhos pode ter. Se houver esse risco na sua rotina, aí sim a conversa muda para calçado de segurança.',
      },
      {
        titulo: 'Numeração e forma do pé',
        texto:
          'Calçado apertado no fim do turno é calçado errado. O pé incha ao longo do dia, então a prova precisa considerar isso — e a largura da forma importa tanto quanto o número.',
      },
    ],
    categorias: [
      {
        href: '/calcados/ocupacionais/',
        titulo: 'Calçados ocupacionais',
        texto:
          'Sem biqueira de proteção, com foco em conforto, higiene e aderência. É o que atende a maior parte das cozinhas.',
      },
      {
        href: '/calcados/antiderrapantes/',
        titulo: 'Calçados antiderrapantes',
        texto: 'O que a marcação de resistência ao escorregamento significa na prática.',
      },
      {
        href: '/calcados/comparativo/',
        titulo: 'Ocupacional ou de segurança?',
        texto: 'A diferença entre as duas normas e como saber qual é o seu caso.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Calçado de cozinha precisa ter biqueira de aço?',
        resposta:
          'Não necessariamente. A biqueira protege contra impacto e compressão sobre os dedos. Se na sua rotina não há risco de queda de objeto pesado sobre o pé, um calçado ocupacional bem escolhido costuma atender melhor, porque é mais leve e mais confortável para a jornada em pé. Onde há movimentação de carga pesada, a avaliação muda.',
      },
      {
        pergunta: 'Posso usar tênis comum na cozinha?',
        resposta:
          'Tênis de uso comum não é feito para piso molhado com gordura, absorve líquido e não é fácil de higienizar. Além disso, não tem Certificado de Aprovação como EPI, o que costuma ser exigido em fiscalização quando o equipamento é obrigatório na atividade.',
      },
      {
        pergunta: 'Qual a diferença entre os modelos brancos e pretos?',
        resposta:
          'É principalmente uma questão de padrão do ambiente. O branco é comum em cozinhas de hospital, indústria de alimentos e áreas que seguem padrão sanitário mais rígido. O preto é mais usado em restaurantes e cozinhas de hotel porque disfarça marca de uso. A proteção não muda pela cor.',
      },
      {
        pergunta: 'Com que frequência devo trocar?',
        resposta:
          'Não existe prazo fixo por norma. O que determina a troca é o estado do equipamento: solado desgastado perde aderência, que é justamente a proteção principal em cozinha. Vale conferir o relevo do solado periodicamente e observar a validade indicada no Certificado de Aprovação.',
      },
    ],
    contexto: 'profissao-cozinha',
    ctaTitulo: 'Conte como é a sua cozinha que a gente indica o modelo.',
    ctaTexto:
      'Restaurante, hotel, cozinha industrial ou hospitalar mudam a escolha. Diga onde você trabalha e como é o piso que a gente mostra as opções e explica a diferença.',
    ponteEmpresas: {
      href: '/empresas/alimentacao/',
      texto: 'Ver como funciona o fornecimento para restaurantes e cozinhas',
    },
  },
  {
    slug: 'enfermagem-e-saude',
    nome: 'Enfermagem e saúde',
    resumoCurto:
      'Plantão longo, piso liso, risco biológico e a exigência de higienizar sempre.',
    titleSeo: 'Calçado e EPI para enfermagem e área da saúde',
    descricaoSeo:
      'Plantão longo, piso liso e risco de respingo. Veja o que observar no calçado e nos EPIs para a área da saúde. Tower EPI’s, Fortaleza, desde 1995.',
    h1: 'Proteção para quem trabalha na saúde',
    resumo:
      'Plantão de doze horas, piso liso recém-lavado, corrida para atender e risco de respingo de material biológico. O calçado da área da saúde precisa resolver conforto e proteção ao mesmo tempo.',
    reconhecimento: [
      'A jornada é longa e quase toda em pé ou caminhando.',
      'O piso é liso e frequentemente está molhado por limpeza.',
      'Existe risco de respingo de fluido e material biológico.',
      'O calçado precisa ser higienizado com frequência.',
    ],
    emUmaFrase:
      'Para a maior parte das funções assistenciais, o indicado é um calçado ocupacional fechado, impermeável, antiderrapante e fácil de higienizar — priorizando conforto, porque o turno é longo.',
    oQueObservar: [
      {
        titulo: 'Fechado no peito do pé',
        texto:
          'Modelos abertos em cima ou com perfuração deixam o pé exposto a respingo de fluido. Em área assistencial, o calçado precisa cobrir o peito do pé.',
      },
      {
        titulo: 'Impermeável e higienizável',
        texto:
          'O material precisa permitir limpeza e desinfecção frequentes sem se degradar. Materiais que absorvem líquido retêm contaminação e não secam entre plantões.',
      },
      {
        titulo: 'Solado antiderrapante',
        texto:
          'Piso hospitalar é liso por exigência de limpeza e passa boa parte do dia molhado. A aderência em piso úmido é o principal fator de segurança aqui.',
      },
      {
        titulo: 'Peso e amortecimento',
        texto:
          'Doze horas em pé cobram do corpo. Calçado leve, com amortecimento adequado e boa acomodação do pé, reduz a fadiga — e é o que faz a pessoa continuar usando.',
      },
      {
        titulo: 'Silêncio do solado',
        texto:
          'Em ambiente de internação e plantão noturno, solado que faz barulho incomoda paciente e equipe. É um detalhe pequeno que pesa muito no uso diário.',
      },
      {
        titulo: 'Numeração pensada para o fim do plantão',
        texto:
          'O pé incha ao longo do turno. Provar o calçado considerando isso evita o erro mais comum: comprar justo e abandonar na primeira semana.',
      },
    ],
    categorias: [
      {
        href: '/calcados/ocupacionais/',
        titulo: 'Calçados ocupacionais',
        texto: 'Sem biqueira, com foco em conforto, higiene e aderência.',
      },
      {
        href: '/protecao/maos/',
        titulo: 'Luvas',
        texto: 'Tipos de luva e o que muda entre procedimento, químico e limpeza.',
      },
      {
        href: '/protecao/respiratoria/',
        titulo: 'Proteção respiratória',
        texto: 'A diferença entre PFF1, PFF2 e PFF3 e quando cada uma se aplica.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Qual calçado é indicado para plantão de 12 horas?',
        resposta:
          'O critério principal passa a ser conforto somado a aderência: calçado leve, fechado, impermeável, com bom amortecimento e solado antiderrapante. Biqueira de proteção normalmente não se aplica à assistência, porque não há risco mecânico de queda de objeto pesado sobre o pé.',
      },
      {
        pergunta: 'Preciso de calçado com Certificado de Aprovação?',
        resposta:
          'Quando o calçado é fornecido como equipamento de proteção individual, ele precisa ter Certificado de Aprovação válido. Quem define se o EPI é obrigatório na função é a avaliação de riscos da instituição. Na dúvida, confirme com o SESMT ou com o responsável pela segurança do trabalho do seu serviço.',
      },
      {
        pergunta: 'Sapato branco é obrigatório?',
        resposta:
          'Não por norma de segurança. Costuma ser exigência de padrão interno da instituição ou do serviço. O que importa do ponto de vista de proteção é ser fechado, impermeável, antiderrapante e higienizável.',
      },
    ],
    contexto: 'profissao-enfermagem',
    ctaTitulo: 'Diga como é o seu plantão que a gente indica o modelo.',
    ctaTexto:
      'Hospital, clínica, laboratório ou home care mudam a rotina e o piso. Conte onde você trabalha que a gente mostra as opções e explica a diferença entre elas.',
    ponteEmpresas: {
      href: '/empresas/saude/',
      texto: 'Ver como funciona o fornecimento para clínicas e hospitais',
    },
  },
  {
    slug: 'limpeza-e-conservacao',
    nome: 'Limpeza e conservação',
    resumoCurto:
      'Produto químico nas mãos, piso molhado o tempo todo e trabalho em pé.',
    titleSeo: 'EPI para limpeza e conservação: o que observar',
    descricaoSeo:
      'Luva certa para o produto químico, calçado antiderrapante e proteção para os olhos. Veja o que observar. Tower EPI’s, Fortaleza, desde 1995.',
    h1: 'Proteção para quem trabalha com limpeza e conservação',
    resumo:
      'Quem limpa passa o dia com produto químico na mão e piso molhado sob o pé. São dois riscos diferentes que exigem duas decisões diferentes — e a luva é onde mais se erra.',
    reconhecimento: [
      'Contato repetido com produto químico de limpeza.',
      'Piso molhado durante boa parte do expediente.',
      'Risco de respingo de produto nos olhos e no rosto.',
      'Trabalho em pé, com movimentação constante.',
    ],
    emUmaFrase:
      'A luva precisa ser escolhida pelo produto químico que você usa, não pela aparência — e o calçado precisa de solado antiderrapante, porque o piso está molhado o tempo todo.',
    oQueObservar: [
      {
        titulo: 'A luva se escolhe pelo produto, não pelo preço',
        texto:
          'Materiais diferentes resistem a produtos diferentes. Uma luva adequada a um detergente pode se degradar rapidamente em contato com solvente ou desinfetante concentrado. Para definir com segurança é preciso saber qual produto químico é usado e em que concentração — e conferir isso no Certificado de Aprovação da luva.',
      },
      {
        titulo: 'Comprimento do punho',
        texto:
          'Se você mergulha a mão em balde ou lava superfície acima da linha do ombro, o produto escorre pelo braço. Punho curto deixa o antebraço exposto.',
      },
      {
        titulo: 'Solado antiderrapante',
        texto:
          'Você é a pessoa que molha o piso. É também quem mais caminha sobre ele molhado. Aderência em superfície úmida é a proteção mais importante da função.',
      },
      {
        titulo: 'Proteção para os olhos ao diluir produto',
        texto:
          'O momento de maior risco de respingo é a diluição do produto concentrado. Óculos de proteção com Certificado de Aprovação resolvem um acidente que é comum e evitável.',
      },
      {
        titulo: 'Proteção respiratória em ambiente fechado',
        texto:
          'Uso de produto com vapor irritante em banheiro ou ambiente sem ventilação exige avaliação específica. Nem toda máscara serve para vapor químico — máscara para partícula não protege contra vapor.',
      },
    ],
    categorias: [
      {
        href: '/protecao/maos/',
        titulo: 'Luvas de proteção',
        texto: 'Como escolher pelo risco: químico, corte, térmico ou uso geral.',
      },
      {
        href: '/calcados/antiderrapantes/',
        titulo: 'Calçados antiderrapantes',
        texto: 'O que a marcação de resistência ao escorregamento significa.',
      },
      {
        href: '/protecao/olhos-e-face/',
        titulo: 'Óculos de proteção',
        texto: 'Proteção contra respingo químico e partícula.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Qualquer luva serve para produto de limpeza?',
        resposta:
          'Não. A resistência química varia conforme o material da luva e o produto usado. Uma luva pode ser adequada a um produto e se degradar em contato com outro. Para indicar com segurança é preciso saber quais produtos você usa — e essa informação consta no Certificado de Aprovação da luva.',
      },
      {
        pergunta: 'Preciso de óculos de proteção para limpar?',
        resposta:
          'Depende da atividade. O risco maior costuma estar na diluição de produto concentrado e na limpeza de superfície acima da altura dos olhos, onde há respingo. Quem define a obrigatoriedade é a avaliação de riscos da empresa.',
      },
    ],
    contexto: 'profissao-limpeza',
    ctaTitulo: 'Diga quais produtos você usa que a gente indica a luva certa.',
    ctaTexto:
      'A escolha da luva depende do produto químico e do tempo de contato. Conte o que você usa no dia a dia que a gente verifica e mostra as opções adequadas.',
    ponteEmpresas: {
      href: '/empresas/facilities-e-limpeza/',
      texto: 'Ver como funciona o fornecimento para empresas de limpeza',
    },
  },
  {
    slug: 'construcao',
    nome: 'Construção',
    resumoCurto:
      'Risco mecânico, poeira, altura e sol. Aqui a biqueira deixa de ser opcional.',
    titleSeo: 'EPI para construção civil: o que a obra exige',
    descricaoSeo:
      'Calçado de segurança com biqueira, capacete, luva e proteção respiratória para poeira. Veja o que observar. Tower EPI’s, Fortaleza, desde 1995.',
    h1: 'Proteção para quem trabalha na construção',
    resumo:
      'Obra é o ambiente com maior variedade de risco simultâneo: queda de objeto, perfuração, poeira, ruído, sol e trabalho em altura. É onde o conjunto de EPI precisa ser mais completo — e onde a biqueira de proteção deixa de ser opcional.',
    reconhecimento: [
      'Queda de material e ferramenta sobre o pé.',
      'Prego, ferro e material perfurante no chão.',
      'Poeira de corte, demolição e cimento.',
      'Ruído de equipamento e exposição prolongada ao sol.',
    ],
    emUmaFrase:
      'Na obra, o calçado é de segurança — com biqueira de proteção contra impacto — e, onde há material perfurante no piso, a palmilha de proteção entra na conversa.',
    oQueObservar: [
      {
        titulo: 'Biqueira de proteção contra impacto',
        texto:
          'É o que define o calçado de segurança na ABNT NBR ISO 20345: a biqueira precisa resistir a impacto de 200 joules. Os materiais mais comuns são aço e composite. O composite é mais leve e não conduz temperatura; o aço costuma ser mais barato. A proteção contra impacto é equivalente quando ambos atendem à norma.',
      },
      {
        titulo: 'Proteção contra perfuração do solado',
        texto:
          'Prego e ferro no chão são o acidente clássico de obra. Existem modelos com palmilha de proteção contra perfuração. Confira se essa proteção consta no Certificado de Aprovação do modelo, porque nem todo calçado de segurança a possui.',
      },
      {
        titulo: 'Capacete adequado à atividade',
        texto:
          'Existem classes diferentes de capacete, inclusive para atividade com risco elétrico. A escolha depende do risco presente na obra e deve seguir a avaliação de riscos.',
      },
      {
        titulo: 'Proteção respiratória para poeira',
        texto:
          'Corte de material, demolição e manuseio de cimento geram poeira fina. Máscara para partícula tem classificações diferentes de eficiência de filtração — e não protege contra vapor químico.',
      },
      {
        titulo: 'Luva conforme a tarefa',
        texto:
          'Armação de ferragem, manuseio de material áspero e trabalho com produto químico pedem luvas diferentes. Uma luva só raramente atende bem a todas as frentes de uma obra.',
      },
      {
        titulo: 'Trabalho em altura exige avaliação técnica',
        texto:
          'Cinto, talabarte e sistema de ancoragem não se escolhem por catálogo. Envolvem norma específica, treinamento e avaliação do ponto de ancoragem. Aqui a orientação de um profissional habilitado não é opcional.',
      },
    ],
    categorias: [
      {
        href: '/calcados/seguranca/',
        titulo: 'Calçados de segurança',
        texto: 'Com biqueira de proteção, para atividade com risco mecânico.',
      },
      {
        href: '/protecao/cabeca/',
        titulo: 'Capacetes',
        texto: 'Classes, uso e o que confere no Certificado de Aprovação.',
      },
      {
        href: '/protecao/respiratoria/',
        titulo: 'Proteção respiratória',
        texto: 'Máscaras para poeira e o que muda entre as classes.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Biqueira de aço ou de composite: qual protege mais?',
        resposta:
          'Quando ambas atendem ao requisito da norma, a proteção contra impacto é equivalente. A diferença está em peso, condução de temperatura e detecção em detector de metal. O composite é mais leve e não conduz calor nem frio; o aço costuma custar menos.',
      },
      {
        pergunta: 'Todo calçado de segurança protege contra prego?',
        resposta:
          'Não. A biqueira protege os dedos contra impacto e compressão, mas não protege a sola. A proteção contra perfuração é um requisito adicional, presente apenas em modelos específicos. Confira essa informação no Certificado de Aprovação antes de comprar.',
      },
      {
        pergunta: 'Quem é responsável por fornecer o EPI na obra?',
        resposta:
          'A norma regulamentadora de EPI estabelece que o empregador deve fornecer o equipamento adequado ao risco, gratuitamente e em perfeito estado de conservação e funcionamento. O texto oficial e atualizado está disponível no portal do Ministério do Trabalho e Emprego, no gov.br.',
      },
    ],
    contexto: 'profissao-construcao',
    ctaTitulo: 'Conte qual é a sua frente de trabalho.',
    ctaTexto:
      'Alvenaria, acabamento, estrutura e instalação exigem conjuntos diferentes. Diga o que você faz na obra que a gente indica o que costuma ser necessário.',
    ponteEmpresas: {
      href: '/empresas/construcao/',
      texto: 'Ver como funciona o fornecimento para construtoras',
    },
  },
  {
    slug: 'industria',
    nome: 'Indústria',
    resumoCurto:
      'Ruído, particulado, risco mecânico e turnos longos no mesmo posto.',
    titleSeo: 'EPI para indústria: o que observar na escolha',
    descricaoSeo:
      'Proteção auditiva, respiratória, calçado de segurança e luva conforme o processo. Veja o que observar. Tower EPI’s, Fortaleza, desde 1995.',
    h1: 'Proteção para quem trabalha na indústria',
    resumo:
      'Na indústria o risco costuma ser constante e previsível — o que muda tudo: o equipamento fica no corpo o turno inteiro, todos os dias. Aqui, conforto não é luxo, é o que determina se a proteção será realmente usada.',
    reconhecimento: [
      'Ruído contínuo de máquina durante todo o turno.',
      'Particulado, névoa ou vapor conforme o processo.',
      'Movimentação de carga e risco mecânico sobre o pé.',
      'O mesmo equipamento no corpo por oito horas ou mais.',
    ],
    emUmaFrase:
      'Na indústria o conjunto se define pelo processo — e a escolha depende da avaliação de riscos do posto de trabalho, que é o documento que diz a que você está exposto.',
    oQueObservar: [
      {
        titulo: 'A avaliação de riscos vem antes do catálogo',
        texto:
          'Indicar proteção respiratória ou auditiva sem saber o agente e o nível de exposição é chute. O documento de avaliação de riscos da empresa é o que permite escolher com segurança. Se a sua empresa tem SESMT ou técnico de segurança, é com ele que a conversa começa.',
      },
      {
        titulo: 'Proteção auditiva: atenuação e uso contínuo',
        texto:
          'Protetor tipo plug e tipo concha têm características diferentes de atenuação e de conforto. O que atenua mais no papel nem sempre é o que a pessoa consegue usar oito horas seguidas — e protetor que fica no bolso não protege ninguém.',
      },
      {
        titulo: 'Proteção respiratória conforme o agente',
        texto:
          'Máscara para partícula não protege contra vapor químico, e vice-versa. A escolha depende de qual agente está presente e em que concentração. Essa informação vem da avaliação de riscos, não da aparência do equipamento.',
      },
      {
        titulo: 'Calçado de segurança com biqueira',
        texto:
          'Onde há movimentação de carga, o calçado é de segurança, com biqueira de proteção contra impacto conforme a ABNT NBR ISO 20345.',
      },
      {
        titulo: 'Luva pelo risco do processo',
        texto:
          'Corte, abrasão, calor e produto químico exigem luvas diferentes. Usar uma luva genérica para todos os postos é o erro mais comum de padronização.',
      },
      {
        titulo: 'Compatibilidade entre equipamentos',
        texto:
          'Capacete, protetor auricular, óculos e respirador são usados juntos. Combinação mal escolhida faz um atrapalhar o outro — e a pessoa acaba tirando um deles.',
      },
    ],
    categorias: [
      {
        href: '/protecao/auditiva/',
        titulo: 'Proteção auditiva',
        texto: 'Plug e concha: diferenças de atenuação e de conforto no uso contínuo.',
      },
      {
        href: '/protecao/respiratoria/',
        titulo: 'Proteção respiratória',
        texto: 'Classificações e o que muda conforme o agente presente.',
      },
      {
        href: '/calcados/seguranca/',
        titulo: 'Calçados de segurança',
        texto: 'Com biqueira, para atividade com risco mecânico.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Protetor auricular de inserção ou tipo concha?',
        resposta:
          'Depende do nível de ruído, do tempo de exposição, do ambiente e do conforto para a pessoa. O de inserção é discreto e funciona bem em calor; o tipo concha é mais fácil de colocar e retirar em atividade intermitente. Vale considerar qual deles a equipe consegue usar o turno inteiro, porque atenuação só existe com uso correto.',
      },
      {
        pergunta: 'Máscara PFF2 serve para vapor químico?',
        resposta:
          'Não. Peça semifacial filtrante para partícula protege contra material particulado, como poeira e névoa. Vapor e gás exigem filtro químico específico para o agente presente. Usar o equipamento errado dá sensação de proteção sem proteger.',
      },
    ],
    contexto: 'profissao-industria',
    ctaTitulo: 'Conte qual é o seu processo.',
    ctaTexto:
      'O agente presente muda completamente a indicação. Diga qual é a atividade e, se tiver, o que consta na avaliação de riscos que a gente ajuda a encontrar o equipamento adequado.',
    ponteEmpresas: {
      href: '/empresas/industria/',
      texto: 'Ver como funciona o fornecimento para indústrias',
    },
  },
  {
    slug: 'logistica-e-estoque',
    nome: 'Logística e estoque',
    resumoCurto:
      'Carga em movimento, empilhadeira e muitos quilômetros caminhados por dia.',
    titleSeo: 'EPI para logística e estoque: o que observar',
    descricaoSeo:
      'Calçado de segurança para movimentação de carga, luva de manuseio e sinalização. Veja o que observar. Tower EPI’s, Fortaleza, desde 1995.',
    h1: 'Proteção para quem trabalha com logística e estoque',
    resumo:
      'Armazém junta duas coisas: risco mecânico de carga em movimento e uma quilometragem diária que poucas funções têm. O calçado precisa proteger e aguentar caminhada.',
    reconhecimento: [
      'Movimentação de caixa, palete e carga pesada.',
      'Circulação de empilhadeira e transpaleteira.',
      'Muitos quilômetros caminhados por turno.',
      'Manuseio constante de material com quina e borda cortante.',
    ],
    emUmaFrase:
      'Onde há movimentação de carga, o calçado é de segurança, com biqueira — mas como se caminha muito, peso e conforto pesam tanto quanto a proteção.',
    oQueObservar: [
      {
        titulo: 'Biqueira de proteção',
        texto:
          'Queda de caixa e prensagem por equipamento de movimentação são os acidentes mais comuns do setor. Calçado de segurança conforme a ABNT NBR ISO 20345 é o ponto de partida.',
      },
      {
        titulo: 'Peso do calçado',
        texto:
          'Quem caminha muitos quilômetros por turno sente cada grama. Biqueira de composite costuma resolver bem essa equação, porque protege conforme a norma e pesa menos que o aço.',
      },
      {
        titulo: 'Aderência em piso liso',
        texto:
          'Piso de galpão costuma ser liso e pode ter poeira ou umidade. A resistência ao escorregamento continua importante mesmo sem líquido evidente.',
      },
      {
        titulo: 'Luva com pegada e proteção contra corte',
        texto:
          'Manuseio de caixa, fita e material com borda pede luva com boa pegada e resistência a corte. Luva escorregadia aumenta esforço e risco de queda de carga.',
      },
      {
        titulo: 'Sinalização e visibilidade',
        texto:
          'Onde circula empilhadeira, ser visto é proteção. Vestimenta de alta visibilidade é comum em armazém com tráfego de equipamento.',
      },
    ],
    categorias: [
      {
        href: '/calcados/seguranca/',
        titulo: 'Calçados de segurança',
        texto: 'Com biqueira de proteção contra impacto.',
      },
      {
        href: '/protecao/maos/',
        titulo: 'Luvas de proteção',
        texto: 'Pegada, resistência a corte e conforto para manuseio contínuo.',
      },
      {
        href: '/protecao/corpo/',
        titulo: 'Vestimentas',
        texto: 'Alta visibilidade e uniforme de trabalho.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Calçado de segurança precisa ser pesado?',
        resposta:
          'Não. A proteção vem da biqueira atender ao requisito da norma, não do peso do calçado. Modelos com biqueira de composite protegem conforme a norma e são mais leves, o que faz diferença real para quem caminha muito.',
      },
      {
        pergunta: 'Botina ou sapato para trabalho em armazém?',
        resposta:
          'A botina dá mais firmeza ao tornozelo e protege contra entrada de material pela parte de cima. O sapato costuma ser mais fresco e mais fácil de calçar. Onde há piso irregular ou movimentação de carga volumosa, a botina costuma ser preferida.',
      },
    ],
    contexto: 'profissao-logistica',
    ctaTitulo: 'Diga como é o seu galpão.',
    ctaTexto:
      'Tipo de piso, circulação de empilhadeira e quanto se caminha por turno mudam a indicação. Conte a sua rotina que a gente mostra as opções.',
    ponteEmpresas: {
      href: '/empresas/industria/',
      texto: 'Ver como funciona o fornecimento para empresas',
    },
  },
  {
    slug: 'manutencao',
    nome: 'Manutenção',
    resumoCurto:
      'Risco que muda a cada chamado: elétrico, mecânico, altura, químico.',
    titleSeo: 'EPI para manutenção: o que observar',
    descricaoSeo:
      'Manutenção enfrenta riscos diferentes a cada chamado. Veja o que observar na escolha do conjunto de EPI. Tower EPI’s, Fortaleza, desde 1995.',
    h1: 'Proteção para quem trabalha com manutenção',
    resumo:
      'Manutenção é a função em que o risco muda mais vezes por dia. De manhã pode ser elétrico, à tarde mecânico, e no meio disso aparece trabalho em altura ou contato com produto químico. O conjunto precisa ser pensado por tarefa, não por cargo.',
    reconhecimento: [
      'O risco muda conforme o chamado, várias vezes ao dia.',
      'Trabalho em espaço apertado e em posição desconfortável.',
      'Contato com ferramenta, superfície quente e óleo.',
      'Eventual trabalho em altura ou em painel elétrico.',
    ],
    emUmaFrase:
      'Em manutenção, o conjunto se monta por tarefa — e atividades com eletricidade e com altura têm norma própria, treinamento próprio e não se resolvem por catálogo.',
    oQueObservar: [
      {
        titulo: 'Risco elétrico exige equipamento específico',
        texto:
          'Atividade em instalação elétrica envolve norma regulamentadora própria, treinamento obrigatório e equipamentos com características específicas, inclusive quanto a isolamento. Não é um caso para escolha por conta própria: exige orientação de profissional habilitado.',
      },
      {
        titulo: 'Trabalho em altura tem regra própria',
        texto:
          'Cinto, talabarte e ancoragem envolvem norma específica e treinamento. A escolha depende do ponto de ancoragem disponível e do tipo de deslocamento, o que precisa de avaliação técnica no local.',
      },
      {
        titulo: 'Calçado que atende ao pior caso do dia',
        texto:
          'Como o risco varia, o calçado costuma ser escolhido pelo cenário mais crítico da rotina. Onde há movimentação de peça e ferramenta pesada, é calçado de segurança com biqueira.',
      },
      {
        titulo: 'Luva por tarefa, não por cargo',
        texto:
          'Manuseio de peça quente, corte, óleo e produto químico pedem luvas diferentes. Ter mais de um tipo disponível é mais eficiente do que tentar resolver tudo com uma.',
      },
      {
        titulo: 'Proteção dos olhos em esmerilhamento e corte',
        texto:
          'Projeção de partícula é o acidente mais comum e mais evitável da função. Óculos com Certificado de Aprovação e vedação adequada resolvem.',
      },
    ],
    categorias: [
      {
        href: '/calcados/seguranca/',
        titulo: 'Calçados de segurança',
        texto: 'Com biqueira, para atividade com risco mecânico.',
      },
      {
        href: '/protecao/olhos-e-face/',
        titulo: 'Proteção para olhos e face',
        texto: 'Óculos e protetor facial para projeção de partícula.',
      },
      {
        href: '/protecao/maos/',
        titulo: 'Luvas de proteção',
        texto: 'Como escolher pelo risco de cada tarefa.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Existe um calçado que serve para toda a manutenção?',
        resposta:
          'Costuma-se escolher o calçado pelo cenário mais crítico da rotina, normalmente um calçado de segurança com biqueira. Mas atividades com risco elétrico podem exigir características específicas — nesse caso, a definição precisa vir da avaliação técnica da atividade.',
      },
      {
        pergunta: 'Posso comprar cinto de segurança para altura sem orientação?',
        resposta:
          'Não recomendamos. Trabalho em altura envolve norma regulamentadora específica, treinamento obrigatório e definição do sistema de ancoragem no local. O equipamento é uma parte de um conjunto que precisa ser avaliado por profissional habilitado.',
      },
    ],
    contexto: 'profissao-manutencao',
    ctaTitulo: 'Conte que tipo de manutenção você faz.',
    ctaTexto:
      'Predial, industrial, elétrica ou mecânica mudam completamente o conjunto. Diga a sua rotina que a gente ajuda a montar o que faz sentido.',
    ponteEmpresas: {
      href: '/empresas/industria/',
      texto: 'Ver como funciona o fornecimento para empresas',
    },
  },
]

export const buscarProfissao = (slug: string) =>
  PROFISSOES.find((p) => p.slug === slug)
