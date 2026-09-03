import type { ContextoWhatsApp } from '@/lib/whatsapp'

/**
 * Proteção por parte do corpo.
 *
 * Entrada pelo vocabulário natural ("mãos", "respiração") em vez do jargão
 * de catálogo. Conteúdo mantido no nível do que é possível afirmar com
 * responsabilidade: orienta a escolha, não substitui avaliação de riscos.
 */
export type Protecao = {
  slug: string
  parte: string
  nome: string
  resumoCurto: string
  titleSeo: string
  descricaoSeo: string
  h1: string
  resumo: string
  emUmaFrase: string
  oQueObservar: { titulo: string; texto: string }[]
  perguntas: { pergunta: string; resposta: string }[]
  contexto: ContextoWhatsApp
  ctaTitulo: string
  ctaTexto: string
  paraQuem: { href: string; titulo: string; texto: string }[]
}

export const PROTECOES: Protecao[] = [
  {
    slug: 'respiratoria',
    parte: 'Respiração',
    nome: 'Proteção respiratória',
    resumoCurto:
      'Poeira, névoa, vapor. O agente presente define o equipamento — e errar aqui é grave.',
    titleSeo: 'PFF1, PFF2 e PFF3: qual usar para cada risco',
    descricaoSeo:
      'O que decide não é o número da máscara, é o agente presente. Quando cada classe se aplica, e por que peça para poeira não protege contra vapor.',
    h1: 'Proteção respiratória',
    resumo:
      'É a categoria em que o erro custa mais caro, porque o dano é invisível e cumulativo. Foi também a categoria que deu origem à Tower: em 1995, o trabalho era convencer as empresas do Ceará a trocar o equipamento reutilizável pela proteção descartável adequada.',
    emUmaFrase:
      'Máscara para partícula protege contra poeira e névoa; vapor e gás exigem filtro químico específico. Usar o tipo errado dá sensação de proteção sem proteger.',
    oQueObservar: [
      {
        titulo: 'Qual é o agente presente',
        texto:
          'Esta é a primeira pergunta e não tem atalho. Material particulado, névoa, vapor orgânico e gás exigem equipamentos diferentes. A resposta vem da avaliação de riscos do ambiente, não da aparência do equipamento.',
      },
      {
        titulo: 'A classificação das peças filtrantes',
        texto:
          'No Brasil, as peças semifaciais filtrantes para partículas são classificadas em PFF1, PFF2 e PFF3, com eficiências mínimas de filtração crescentes. A classe adequada depende do agente e do nível de exposição — não é uma escolha de preferência.',
      },
      {
        titulo: 'Vedação no rosto',
        texto:
          'Equipamento que não veda não protege, independentemente da classe. Barba na região de vedação, tamanho inadequado e ajuste incorreto do clipe nasal comprometem o desempenho. É por isso que treinamento de uso importa tanto quanto o equipamento.',
      },
      {
        titulo: 'Descartável ou reutilizável',
        texto:
          'A peça semifacial filtrante é descartável. Respiradores reutilizáveis com filtro trocável fazem sentido em exposição contínua, mas exigem controle de troca de filtro e higienização.',
      },
      {
        titulo: 'Certificado de Aprovação',
        texto:
          'O CA indica para que aquele equipamento foi aprovado. É o documento que confirma se o modelo serve para o agente ao qual você está exposto. Vale conferir antes de comprar, não depois.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Qual a diferença entre PFF1, PFF2 e PFF3?',
        resposta:
          'A diferença está na eficiência mínima de filtração de partículas, que é crescente da PFF1 para a PFF3. A classe adequada depende do agente presente e do nível de exposição, definidos pela avaliação de riscos do ambiente de trabalho.',
      },
      {
        pergunta: 'Máscara PFF2 protege contra cheiro forte de produto químico?',
        resposta:
          'Não. A peça filtrante para partículas retém material particulado, como poeira e névoa. Vapor e gás atravessam esse tipo de filtro e exigem filtro químico específico para o agente. Sentir o cheiro através do equipamento é sinal de que ele não é o adequado para aquela exposição.',
      },
      {
        pergunta: 'Onde consulto o Certificado de Aprovação?',
        resposta:
          'A consulta é feita no portal do Governo Federal, no serviço do Ministério do Trabalho e Emprego destinado a Certificados de Aprovação de EPI. Lá é possível verificar validade e para que o equipamento foi aprovado.',
      },
    ],
    contexto: 'protecao-respiratoria',
    ctaTitulo: 'Conte a que você está exposto.',
    ctaTexto:
      'Poeira, névoa, vapor e fumaça exigem equipamentos diferentes. Diga qual é a atividade e, se tiver, o que consta na avaliação de riscos que a gente ajuda a verificar o que é adequado.',
    paraQuem: [
      { href: '/para-seu-trabalho/industria/', titulo: 'Indústria', texto: 'Particulado e vapor conforme o processo.' },
      { href: '/para-seu-trabalho/construcao/', titulo: 'Construção', texto: 'Poeira de corte, demolição e cimento.' },
      { href: '/para-seu-trabalho/enfermagem-e-saude/', titulo: 'Saúde', texto: 'Uso em ambiente assistencial.' },
    ],
  },
  {
    slug: 'maos',
    parte: 'Mãos',
    nome: 'Proteção das mãos',
    resumoCurto:
      'Corte, químico, calor, abrasão. Uma luva só quase nunca resolve tudo.',
    titleSeo: 'Luvas de proteção: como escolher pelo risco',
    descricaoSeo:
      'Corte, produto químico, calor e abrasão pedem luvas diferentes. Como ler o risco antes de escolher — e por que luva que escorrega ou aperta acaba fora da mão.',
    h1: 'Proteção das mãos',
    resumo:
      'A mão é a parte do corpo que mais se acidenta no trabalho, e a luva é o EPI em que mais se erra — porque parece que qualquer uma serve. Não serve: a luva se escolhe pelo risco específico da tarefa.',
    emUmaFrase:
      'A luva se escolhe pelo risco: corte, produto químico, calor e abrasão exigem materiais e construções diferentes, e uma luva boa para um risco pode ser inútil para outro.',
    oQueObservar: [
      {
        titulo: 'Qual é o risco principal',
        texto:
          'Corte, perfuração, abrasão, produto químico, calor, frio ou risco elétrico. Cada um leva a um tipo diferente de luva. Se a tarefa tem mais de um risco relevante, é preciso verificar se existe modelo que atenda a ambos.',
      },
      {
        titulo: 'Para químico, o produto exato importa',
        texto:
          'Resistência química não é genérica. Um material pode resistir bem a um produto e se degradar rapidamente em contato com outro, e o tempo de contato também conta. É preciso saber qual produto é usado e em que concentração, e conferir a informação no Certificado de Aprovação.',
      },
      {
        titulo: 'Pegada e sensibilidade',
        texto:
          'Luva que escorrega ou que tira a sensibilidade faz a pessoa tirá-la para executar a tarefa. Nesse momento a proteção deixa de existir. Pegada adequada é requisito de segurança, não conforto.',
      },
      {
        titulo: 'Comprimento do punho',
        texto:
          'Depende de até onde o braço entra em contato com o agente. Trabalho com imersão em líquido ou acima da linha do ombro pede punho mais longo.',
      },
      {
        titulo: 'Tamanho',
        texto:
          'Luva folgada engancha e reduz a precisão; luva apertada cansa a mão e rasga. Ambos os casos terminam em não uso.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Existe uma luva que serve para tudo?',
        resposta:
          'Não. Luvas de uso geral atendem manuseio comum, mas não substituem luva com resistência a corte, a produto químico ou a calor. Tentar cobrir todos os riscos com um modelo só costuma resultar em proteção insuficiente em pelo menos uma das tarefas.',
      },
      {
        pergunta: 'Luva de látex serve para produto de limpeza?',
        resposta:
          'Depende do produto e do tempo de contato. Alguns produtos degradam determinados materiais rapidamente. Para indicar com segurança é preciso saber quais produtos são usados — a informação sobre resistência consta no Certificado de Aprovação do modelo.',
      },
    ],
    contexto: 'protecao-maos',
    ctaTitulo: 'Diga qual é a tarefa que a gente indica a luva.',
    ctaTexto:
      'Conte o que a mão faz e a que ela fica exposta. Se for produto químico, diga qual — é o que permite verificar a resistência adequada.',
    paraQuem: [
      { href: '/para-seu-trabalho/limpeza-e-conservacao/', titulo: 'Limpeza', texto: 'Contato repetido com produto químico.' },
      { href: '/para-seu-trabalho/industria/', titulo: 'Indústria', texto: 'Corte, abrasão e calor conforme o processo.' },
      { href: '/para-seu-trabalho/logistica-e-estoque/', titulo: 'Logística', texto: 'Manuseio contínuo e risco de corte.' },
    ],
  },
  {
    slug: 'auditiva',
    parte: 'Audição',
    nome: 'Proteção auditiva',
    resumoCurto:
      'A perda é silenciosa e não volta. O que protege é o que a pessoa usa o turno inteiro.',
    titleSeo: 'Proteção auditiva: plug ou concha?',
    descricaoSeo:
      'Plug ou concha: depende de quanto tempo fica no ouvido e de como se combina com outros EPIs. O que a atenuação do CA diz, e o que ela não diz.',
    h1: 'Proteção auditiva',
    resumo:
      'A perda auditiva ocupacional é gradual, indolor e irreversível. Quando é percebida, já aconteceu. Por isso, nesta categoria, adesão ao uso é tão determinante quanto a especificação técnica.',
    emUmaFrase:
      'O protetor que mais atenua no papel não é necessariamente o que protege mais na prática — protege o que a pessoa consegue usar corretamente durante todo o tempo de exposição.',
    oQueObservar: [
      {
        titulo: 'O nível de ruído e o tempo de exposição',
        texto:
          'A escolha depende de quanto ruído existe e por quanto tempo a pessoa fica exposta. Essa informação vem da avaliação do ambiente, feita com medição — não de estimativa.',
      },
      {
        titulo: 'Inserção ou concha',
        texto:
          'O de inserção é discreto, leve e costuma ser melhor tolerado em ambiente quente. O tipo concha é mais fácil de colocar e retirar, o que ajuda em atividade intermitente, e é mais fácil de fiscalizar visualmente.',
      },
      {
        titulo: 'Atenuação declarada no Certificado de Aprovação',
        texto:
          'O CA traz a atenuação do equipamento. Esse valor é obtido em ensaio e depende de uso correto: protetor mal inserido ou concha mal vedada atenua muito menos do que o declarado.',
      },
      {
        titulo: 'Compatibilidade com os outros equipamentos',
        texto:
          'Protetor tipo concha usado com capacete ou com óculos pode ter a vedação comprometida pela haste. Vale testar o conjunto completo, e não cada item isolado.',
      },
      {
        titulo: 'Comunicação e percepção de alarme',
        texto:
          'Atenuar demais também é problema: a pessoa deixa de ouvir alarme e sinal de alerta, ou retira o protetor para conversar. O equilíbrio faz parte da escolha.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Quanto maior a atenuação, melhor?',
        resposta:
          'Nem sempre. Atenuação em excesso pode isolar a pessoa de sinais sonoros importantes, como alarmes e a aproximação de equipamento, e costuma levar à retirada do protetor para comunicação. O adequado é o que reduz a exposição ao nível seguro mantendo a percepção do ambiente.',
      },
      {
        pergunta: 'Protetor de inserção pode ser reutilizado?',
        resposta:
          'Depende do modelo. Existem versões descartáveis e versões reutilizáveis, que exigem higienização e substituição periódica. A informação de uso consta no Certificado de Aprovação e nas instruções do fabricante.',
      },
    ],
    contexto: 'protecao-auditiva',
    ctaTitulo: 'Conte como é o ruído no seu ambiente.',
    ctaTexto:
      'Tipo de máquina, tempo de exposição e se há necessidade de comunicação mudam a indicação. Se a empresa já tem medição de ruído, melhor ainda.',
    paraQuem: [
      { href: '/para-seu-trabalho/industria/', titulo: 'Indústria', texto: 'Ruído contínuo de máquina.' },
      { href: '/para-seu-trabalho/construcao/', titulo: 'Construção', texto: 'Ruído de equipamento e ferramenta.' },
      { href: '/para-seu-trabalho/manutencao/', titulo: 'Manutenção', texto: 'Exposição intermitente conforme a tarefa.' },
    ],
  },
  {
    slug: 'olhos-e-face',
    parte: 'Olhos e face',
    nome: 'Proteção para olhos e face',
    resumoCurto:
      'Partícula projetada e respingo químico. O acidente mais comum e mais evitável.',
    titleSeo: 'Óculos de proteção e protetor facial',
    descricaoSeo:
      'Óculos de segurança, protetor facial ou os dois: depende de partícula, respingo ou radiação. O que cada um cobre e quando um não substitui o outro.',
    h1: 'Proteção para olhos e face',
    resumo:
      'Lesão ocular no trabalho costuma acontecer em tarefas curtas — aquele corte rápido, aquela diluição de produto. É justamente quando o equipamento não está no rosto.',
    emUmaFrase:
      'A proteção se escolhe pelo tipo de agente: partícula projetada, respingo de líquido e radiação exigem construções e lentes diferentes.',
    oQueObservar: [
      {
        titulo: 'Partícula ou respingo',
        texto:
          'Óculos de segurança com hastes protegem bem contra projeção frontal de partícula. Para respingo de líquido, a proteção precisa de vedação ao redor dos olhos, ou de protetor facial, porque o líquido entra pelas laterais e por baixo.',
      },
      {
        titulo: 'Protetor facial não substitui o óculos',
        texto:
          'O protetor facial protege o rosto, mas não veda a região dos olhos. Em muitas atividades os dois são usados juntos.',
      },
      {
        titulo: 'Lente conforme a atividade',
        texto:
          'Existem lentes incolores, escurecidas e específicas para atividades com radiação, como solda. Usar lente escura sem necessidade prejudica a visão da tarefa; usar lente inadequada em solda não protege.',
      },
      {
        titulo: 'Antiembaçante e conforto',
        texto:
          'Óculos que embaça faz a pessoa levantá-lo para enxergar. Em calor e umidade, tratamento antiembaçante deixa de ser conforto e vira condição para o equipamento ser usado.',
      },
      {
        titulo: 'Uso sobre óculos de grau',
        texto:
          'Existem modelos projetados para uso sobre óculos de grau. Improvisar costuma resultar em desconforto e não uso.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Óculos de proteção serve para solda?',
        resposta:
          'Óculos de segurança comum não protege contra a radiação da solda. Atividades de soldagem exigem equipamento específico, com filtro adequado ao processo e à intensidade. Verifique sempre no Certificado de Aprovação para que o equipamento foi aprovado.',
      },
      {
        pergunta: 'Preciso de óculos para trabalhar com produto de limpeza?',
        resposta:
          'O risco maior está na diluição de produto concentrado e na limpeza acima da altura dos olhos. A obrigatoriedade é definida pela avaliação de riscos da empresa, mas em ambas as situações a proteção é recomendável.',
      },
    ],
    contexto: 'protecao-olhos',
    ctaTitulo: 'Conte qual é o risco na sua tarefa.',
    ctaTexto:
      'Partícula, respingo químico ou radiação levam a equipamentos diferentes. Diga o que você faz que a gente indica o que é adequado.',
    paraQuem: [
      { href: '/para-seu-trabalho/manutencao/', titulo: 'Manutenção', texto: 'Esmerilhamento, corte e projeção de partícula.' },
      { href: '/para-seu-trabalho/limpeza-e-conservacao/', titulo: 'Limpeza', texto: 'Respingo na diluição de produto.' },
      { href: '/para-seu-trabalho/construcao/', titulo: 'Construção', texto: 'Poeira e partícula de corte.' },
    ],
  },
  {
    slug: 'cabeca',
    parte: 'Cabeça',
    nome: 'Proteção da cabeça',
    resumoCurto: 'Capacete: classes diferentes para riscos diferentes.',
    titleSeo: 'Capacete de segurança: classes e uso',
    descricaoSeo:
      'Classes de capacete, o que a suspensão interna faz, e o que conferir no Certificado de Aprovação para trabalho em altura e proximidade elétrica.',
    h1: 'Proteção da cabeça',
    resumo:
      'Capacete não é item genérico. Existem classes com características diferentes, inclusive para atividade com risco elétrico, e a escolha errada dá proteção que não corresponde ao risco presente.',
    emUmaFrase:
      'A classe do capacete precisa corresponder ao risco da atividade — em especial quando há risco elétrico envolvido.',
    oQueObservar: [
      {
        titulo: 'A classe adequada ao risco',
        texto:
          'Existem classes distintas de capacete de segurança, incluindo modelos destinados a atividades com risco elétrico. A definição vem da avaliação de riscos da atividade e deve constar no Certificado de Aprovação do modelo.',
      },
      {
        titulo: 'Suspensão e ajuste',
        texto:
          'A suspensão interna é o que absorve o impacto. Capacete mal ajustado sai da cabeça no movimento e reduz a proteção. O ajuste precisa ser feito por quem vai usar.',
      },
      {
        titulo: 'Jugular',
        texto:
          'Em trabalho em altura e em atividades com movimentação, a jugular impede que o capacete caia. Em muitas situações ela é exigida.',
      },
      {
        titulo: 'Compatibilidade com outros equipamentos',
        texto:
          'Protetor auricular tipo concha, óculos e protetor facial precisam ser compatíveis com o capacete. Existem acessórios acopláveis pensados para isso.',
      },
      {
        titulo: 'Estado de conservação',
        texto:
          'Capacete que sofreu impacto, apresenta trinca ou está com o casco deformado deve ser substituído, mesmo que aparente estar íntegro.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Capacete tem validade?',
        resposta:
          'O Certificado de Aprovação traz o prazo de validade do equipamento, e o fabricante indica a vida útil recomendada. Independentemente disso, capacete que sofreu impacto ou apresenta dano deve ser substituído imediatamente.',
      },
      {
        pergunta: 'Posso usar capacete de obra em atividade elétrica?',
        resposta:
          'Não necessariamente. Atividades com risco elétrico exigem capacete com características específicas. Verifique no Certificado de Aprovação para que aquele modelo foi aprovado e confirme com o responsável pela segurança do trabalho.',
      },
    ],
    contexto: 'protecao-cabeca',
    ctaTitulo: 'Diga qual é a atividade.',
    ctaTexto:
      'Se houver risco elétrico envolvido, a escolha muda. Conte o que a equipe faz que a gente verifica qual classe é adequada.',
    paraQuem: [
      { href: '/para-seu-trabalho/construcao/', titulo: 'Construção', texto: 'Queda de material e trabalho em altura.' },
      { href: '/para-seu-trabalho/industria/', titulo: 'Indústria', texto: 'Circulação em área de produção.' },
      { href: '/para-seu-trabalho/manutencao/', titulo: 'Manutenção', texto: 'Risco variável conforme o chamado.' },
    ],
  },
  {
    slug: 'corpo',
    parte: 'Corpo',
    nome: 'Vestimentas de proteção',
    resumoCurto:
      'Avental, macacão, alta visibilidade e uniforme conforme a exposição.',
    titleSeo: 'Vestimentas de proteção e alta visibilidade',
    descricaoSeo:
      'Avental, macacão e alta visibilidade: o que muda com respingo, calor e circulação de empilhadeira. Como escolher sem sacrificar o conforto no clima quente.',
    h1: 'Vestimentas de proteção',
    resumo:
      'A vestimenta cobre a maior área do corpo e é o equipamento que mais afeta o conforto térmico. Em Fortaleza, isso não é detalhe: peça que dá calor demais é peça que sai do corpo.',
    emUmaFrase:
      'A vestimenta se escolhe pela exposição — respingo, partícula, calor, visibilidade — e o conforto térmico precisa entrar na conta, ou o equipamento não será usado.',
    oQueObservar: [
      {
        titulo: 'Que exposição a peça precisa cobrir',
        texto:
          'Respingo de líquido, partícula, calor ou necessidade de ser visto levam a peças diferentes. Avental, macacão e vestimenta de alta visibilidade resolvem problemas distintos.',
      },
      {
        titulo: 'Conforto térmico',
        texto:
          'Trabalho em clima quente com peça que não permite troca de calor gera fadiga e leva ao abandono do uso. Esse é um critério real de escolha, não uma preferência.',
      },
      {
        titulo: 'Alta visibilidade',
        texto:
          'Onde circula empilhadeira, veículo ou há trabalho em via, ser visto é a proteção principal. A faixa retrorrefletiva precisa estar íntegra — lavagem inadequada a degrada.',
      },
      {
        titulo: 'Manutenção e lavagem',
        texto:
          'A forma de lavar afeta o desempenho de algumas peças. Vale conferir a orientação do fabricante, principalmente em peças com tratamento específico.',
      },
      {
        titulo: 'Tamanho e mobilidade',
        texto:
          'Peça apertada limita o movimento e rasga; folgada demais engancha em equipamento. Ambos aumentam risco em vez de reduzir.',
      },
    ],
    perguntas: [
      {
        pergunta: 'Uniforme comum conta como EPI?',
        resposta:
          'Não necessariamente. Uniforme é vestimenta de trabalho; vestimenta de proteção é aquela destinada a proteger contra um risco específico e que, quando fornecida como EPI, precisa ter Certificado de Aprovação. São coisas diferentes, e a distinção importa em fiscalização.',
      },
      {
        pergunta: 'Vestimenta de alta visibilidade pode ser lavada normalmente?',
        resposta:
          'A lavagem inadequada pode degradar a faixa retrorrefletiva e reduzir a visibilidade. Vale seguir a orientação do fabricante e substituir a peça quando a faixa perder o desempenho.',
      },
    ],
    contexto: 'protecao-corpo',
    ctaTitulo: 'Conte a que a equipe fica exposta.',
    ctaTexto:
      'Respingo, calor, partícula ou necessidade de visibilidade mudam a peça. Diga a atividade que a gente mostra o que costuma ser usado.',
    paraQuem: [
      { href: '/para-seu-trabalho/logistica-e-estoque/', titulo: 'Logística', texto: 'Alta visibilidade em área de tráfego.' },
      { href: '/para-seu-trabalho/limpeza-e-conservacao/', titulo: 'Limpeza', texto: 'Avental contra respingo químico.' },
      { href: '/para-seu-trabalho/industria/', titulo: 'Indústria', texto: 'Vestimenta conforme o processo.' },
    ],
  },
]

export const buscarProtecao = (slug: string) => PROTECOES.find((p) => p.slug === slug)
