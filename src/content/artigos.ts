import type { ContextoWhatsApp } from '@/lib/whatsapp'

/**
 * Central de conhecimento.
 *
 * Regra do projeto: nenhum artigo existe "para postar conteúdo". Cada um
 * resolve uma dúvida real, linka para UMA página comercial e tem um CTA que
 * nasce da intenção daquele texto — nunca um "entre em contato" genérico.
 *
 * Todo conteúdo normativo cita fonte oficial e traz data de revisão.
 */
export type Bloco =
  | { tipo: 'p'; texto: string }
  | { tipo: 'h2'; texto: string }
  | { tipo: 'h3'; texto: string }
  | { tipo: 'lista'; itens: string[] }
  | { tipo: 'destaque'; texto: string }
  | { tipo: 'tabela'; cabecalho: string[]; linhas: string[][] }

export type Artigo = {
  slug: string
  titulo: string
  tituloSeo: string
  resumo: string
  descricaoSeo: string
  publicado: string
  atualizado: string
  atualizadoExibicao: string
  cluster: string
  blocos: Bloco[]
  fontes: { titulo: string; url: string }[]
  paginaComercial: { href: string; rotulo: string }
  contexto: ContextoWhatsApp
  /** Mensagem própria do artigo. Herdar a do contexto comercial faria o
   *  texto afirmar uma origem falsa — "vim pela área de empresas" para
   *  quem veio de um texto sobre a NR-6. */
  mensagemWhats: string
  ctaTitulo: string
  ctaTexto: string
}

export const ARTIGOS: Artigo[] = [
  {
    slug: 'calcado-para-cozinha-como-escolher',
    titulo: 'Qual o melhor calçado para trabalhar em cozinha?',
    tituloSeo: 'Qual o melhor calçado para cozinha?',
    resumo:
      'Piso molhado com gordura, respingo quente e jornada em pé mudam completamente o critério. O que realmente importa na escolha.',
    descricaoSeo:
      'Piso molhado, gordura e muitas horas em pé. Veja o que observar num calçado para cozinha e por que a biqueira nem sempre é necessária.',
    publicado: '2026-08-30',
    atualizado: '2026-08-30',
    atualizadoExibicao: 'agosto de 2026',
    cluster: 'Calçados',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Na maior parte das cozinhas, o que resolve é um calçado ocupacional fechado, impermeável e com solado antiderrapante. Biqueira de proteção só entra quando existe risco real de queda de objeto pesado sobre o pé.',
      },
      {
        tipo: 'p',
        texto:
          'Cozinha profissional reúne três condições que quase nenhum outro ambiente reúne ao mesmo tempo: piso permanentemente molhado e engordurado, risco de respingo de líquido quente e uma jornada longa passada quase inteiramente em pé. Cada uma dessas condições puxa a escolha do calçado para um lado diferente, e é por isso que a decisão costuma confundir.',
      },
      {
        tipo: 'h2',
        texto: 'O solado é a decisão mais importante',
      },
      {
        tipo: 'p',
        texto:
          'O acidente mais frequente em cozinha é a queda por escorregamento. Isso coloca a resistência ao escorregamento acima de qualquer outra característica — inclusive acima da biqueira, que muita gente considera sinônimo de proteção.',
      },
      {
        tipo: 'p',
        texto:
          'Vale saber que "antiderrapante" não é uma característica única. Os ensaios de resistência ao escorregamento são feitos em superfícies e contaminantes diferentes, e o desempenho em piso cerâmico molhado não é o mesmo que em piso com resíduo oleoso. Como a cozinha combina água e gordura, é essa combinação que interessa. A marcação do modelo e o Certificado de Aprovação trazem essa informação.',
      },
      {
        tipo: 'h2',
        texto: 'Fechado, impermeável e fácil de higienizar',
      },
      {
        tipo: 'lista',
        itens: [
          'O peito do pé precisa estar coberto: respingo de líquido quente e de gordura é rotina em linha de produção.',
          'Modelos com perfuração de ventilação na parte de cima deixam passar líquido — não servem para a área de produção.',
          'O material precisa suportar limpeza diária sem absorver resíduo, e secar antes do turno seguinte.',
          'Costuras e frisos que acumulam sujeira dificultam a higienização e são um problema em ambiente de manipulação de alimento.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'Conforto não é detalhe: é o que decide se o calçado será usado',
      },
      {
        tipo: 'p',
        texto:
          'Este é o ponto que a maioria das listas ignora. Um calçado que machuca no meio do turno é retirado, trocado por chinelo ou substituído por um tênis comum na primeira oportunidade. A partir daí, a proteção deixa de existir — independentemente de quanto ela custou.',
      },
      {
        tipo: 'p',
        texto:
          'Peso, amortecimento e a forma do calçado importam tanto quanto o solado. E há um detalhe prático que resolve boa parte dos arrependimentos: o pé incha ao longo do dia. Provar o calçado considerando o fim do turno, e não o começo, evita o erro mais comum de numeração.',
      },
      {
        tipo: 'h2',
        texto: 'Quando a biqueira entra na conversa',
      },
      {
        tipo: 'p',
        texto:
          'A biqueira de proteção é o que caracteriza o calçado de segurança e existe para proteger os dedos contra impacto e compressão. Uma cozinha de restaurante comum raramente tem esse risco. Já uma cozinha industrial, com movimentação de panelões, caixas e carrinhos de carga, pode ter.',
      },
      {
        tipo: 'p',
        texto:
          'Ou seja: a pergunta não é "qual protege mais", e sim "existe risco de algo pesado cair sobre o pé na minha rotina?". Se existe, a conversa muda para calçado de segurança. Se não existe, um calçado ocupacional bem escolhido tende a proteger melhor no que importa aqui — aderência — e a ser mais leve para a jornada em pé.',
      },
      {
        tipo: 'h2',
        texto: 'Resumo do que observar',
      },
      {
        tipo: 'tabela',
        cabecalho: ['Característica', 'Por que importa em cozinha'],
        linhas: [
          ['Solado antiderrapante', 'Escorregamento é o acidente mais comum do ambiente'],
          ['Fechado no peito do pé', 'Respingo de líquido quente e gordura'],
          ['Material impermeável', 'Piso molhado durante todo o expediente'],
          ['Fácil higienização', 'Exigência sanitária e limpeza diária'],
          ['Leve e confortável', 'Jornada longa em pé, muitas vezes em dobra'],
          ['Biqueira', 'Só se houver risco de queda de objeto pesado'],
        ],
      },
      {
        tipo: 'h2',
        texto: 'E o tênis comum?',
      },
      {
        tipo: 'p',
        texto:
          'Tênis de uso diário não é projetado para piso molhado com gordura, absorve líquido, é difícil de higienizar e não tem Certificado de Aprovação como equipamento de proteção individual. Quando o calçado é obrigatório na atividade, essa última parte deixa de ser detalhe e passa a ser exigência.',
      },
    ],
    fontes: [
      {
        titulo: 'Equipamentos de Proteção Individual — Ministério do Trabalho e Emprego',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/equipamentos-de-protecao-individual',
      },
      {
        titulo: 'Obter Certificado de Aprovação de EPI (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
    ],
    paginaComercial: {
      href: '/para-seu-trabalho/cozinha/',
      rotulo: 'Ver calçados para cozinha',
    },
    contexto: 'profissao-cozinha',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Li o texto sobre calçado para cozinha e queria ajuda para escolher o modelo certo para a minha rotina.',
    ctaTitulo: 'Trabalha em cozinha e ainda está em dúvida?',
    ctaTexto:
      'Conte como é a sua rotina: tipo de cozinha, como fica o piso e quantas horas você passa em pé. A gente mostra as opções que fazem sentido e explica a diferença entre elas.',
  },
  {
    slug: 'o-que-e-ca-certificado-de-aprovacao',
    titulo: 'O que é o CA do EPI e como consultar',
    tituloSeo: 'O que é o CA do EPI e como consultar',
    resumo:
      'O Certificado de Aprovação é o documento que autoriza a venda e o uso de um EPI no Brasil. Como ele funciona e por que conferir antes de comprar.',
    descricaoSeo:
      'Entenda o que é o Certificado de Aprovação (CA) de EPI, para que serve, como consultar no gov.br e o que fazer quando está vencido.',
    publicado: '2026-08-30',
    atualizado: '2026-08-30',
    atualizadoExibicao: 'agosto de 2026',
    cluster: 'Normas',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'O CA é o documento emitido pelo órgão nacional competente em segurança e saúde no trabalho que autoriza a comercialização e o uso de um EPI no território nacional. Sem ele, o equipamento não pode ser vendido nem usado como EPI.',
      },
      {
        tipo: 'p',
        texto:
          'O Certificado de Aprovação é a forma que o Brasil encontrou de garantir que um equipamento de proteção individual foi de fato ensaiado e que faz o que promete. Um laboratório credenciado avalia as características de desempenho do equipamento e as descreve em relatório; a partir disso, o órgão competente do Ministério do Trabalho e Emprego emite o certificado.',
      },
      {
        tipo: 'h2',
        texto: 'Por que isso importa para quem compra',
      },
      {
        tipo: 'p',
        texto:
          'O CA não diz apenas que o equipamento é aprovado. Ele diz <strong>para que</strong> ele é aprovado. É esse ponto que costuma passar despercebido e que causa a maior parte dos erros de compra.',
      },
      {
        tipo: 'p',
        texto:
          'Um respirador aprovado para material particulado não protege contra vapor orgânico. Uma luva aprovada para um tipo de risco pode não ter resistência ao produto químico que você usa. Um calçado de segurança pode ter biqueira e não ter proteção contra perfuração do solado. Todas essas informações constam no certificado.',
      },
      {
        tipo: 'h2',
        texto: 'Como consultar',
      },
      {
        tipo: 'p',
        texto:
          'A consulta é feita no portal do Governo Federal, no serviço do Ministério do Trabalho e Emprego destinado aos Certificados de Aprovação de EPI. Com o número do CA é possível verificar o equipamento, o fabricante ou importador, a validade e a descrição do que foi aprovado.',
      },
      {
        tipo: 'lista',
        itens: [
          'O número do CA costuma estar gravado no próprio equipamento ou na embalagem.',
          'Confira se a descrição do certificado corresponde ao risco da sua atividade.',
          'Verifique a validade — certificados têm prazo e precisam ser renovados pelo fabricante.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O que fazer quando o CA está vencido',
      },
      {
        tipo: 'p',
        texto:
          'A validade do CA está ligada à autorização do equipamento no mercado. Na prática, para quem gerencia EPI numa empresa, isso significa acompanhar os certificados dos itens em uso e verificar com o fornecedor a situação de cada modelo. Equipamento cujo certificado deixou de ser válido precisa ser tratado junto ao fabricante ou substituído por modelo com certificado vigente.',
      },
      {
        tipo: 'p',
        texto:
          'Vale separar duas coisas que costumam ser confundidas: a validade do certificado, que é um dado do modelo, e a vida útil do equipamento em uso, que depende do desgaste. Um calçado com CA válido pode estar com o solado gasto e já não proteger — e nesse caso a troca é necessária de qualquer forma.',
      },
    ],
    fontes: [
      {
        titulo: 'Obter Certificado de Aprovação de EPI (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
      {
        titulo: 'Equipamentos de Proteção Individual — Ministério do Trabalho e Emprego',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/equipamentos-de-protecao-individual',
      },
    ],
    paginaComercial: {
      href: '/empresas/',
      rotulo: 'Ver soluções para empresas',
    },
    contexto: 'empresas',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Li o texto sobre o CA e gostaria de ajuda para conferir se os EPIs que usamos hoje estão adequados.',
    ctaTitulo: 'Precisa conferir o CA dos EPIs que a sua equipe usa?',
    ctaTexto:
      'Mande a lista do que vocês usam hoje. A gente ajuda a verificar se o que está em uso corresponde ao risco da atividade e o que vale substituir.',
  },
  {
    slug: 'calcado-ocupacional-ou-de-seguranca',
    titulo: 'Calçado ocupacional ou de segurança: qual é o seu caso?',
    tituloSeo: 'Calçado ocupacional ou de segurança?',
    resumo:
      'A diferença está na biqueira e nas normas que cada um atende. Como saber qual serve para a sua atividade.',
    descricaoSeo:
      'A diferença entre calçado ocupacional (NBR ISO 20347) e calçado de segurança (NBR ISO 20345), e como saber qual é o indicado para o seu trabalho.',
    publicado: '2026-08-30',
    atualizado: '2026-08-30',
    atualizadoExibicao: 'agosto de 2026',
    cluster: 'Calçados',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'A diferença central é a biqueira de proteção contra impacto: o calçado de segurança tem, o ocupacional não. Cada um atende a uma norma diferente e se destina a um tipo diferente de risco.',
      },
      {
        tipo: 'p',
        texto:
          'É a dúvida que mais chega até nós, e a confusão é compreensível: os dois são calçados profissionais, os dois podem ter solado antiderrapante e os dois podem ter Certificado de Aprovação. A diferença está em qual risco cada um foi feito para enfrentar.',
      },
      {
        tipo: 'h2',
        texto: 'A distinção normativa',
      },
      {
        tipo: 'tabela',
        cabecalho: ['', 'Calçado ocupacional', 'Calçado de segurança'],
        linhas: [
          ['Norma', 'ABNT NBR ISO 20347', 'ABNT NBR ISO 20345'],
          ['Biqueira de proteção', 'Não possui', 'Possui, com resistência a impacto de 200 J'],
          ['Risco mecânico sobre os dedos', 'Não é destinado a esse risco', 'É destinado a esse risco'],
          ['Uso típico', 'Cozinha, saúde, limpeza, comércio, serviços', 'Indústria, construção, logística, manutenção'],
          ['Foco predominante', 'Conforto, higiene e aderência', 'Proteção mecânica somada à aderência'],
        ],
      },
      {
        tipo: 'h2',
        texto: 'A pergunta que resolve',
      },
      {
        tipo: 'p',
        texto:
          'Em vez de tentar decidir qual é "melhor", faça a pergunta certa: <strong>na minha rotina, existe risco de algo pesado cair ou prensar o meu pé?</strong>',
      },
      {
        tipo: 'lista',
        itens: [
          'Se existe — movimentação de carga, ferramenta pesada, peça, palete, empilhadeira — o caso é de calçado de segurança.',
          'Se não existe, e o problema real é piso escorregadio, líquido e jornada longa em pé, o calçado ocupacional tende a atender melhor.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Note que "melhor" aqui não significa "mais protegido em geral". Significa mais adequado ao risco que existe. Um calçado de segurança usado numa cozinha sem risco mecânico adiciona peso sem adicionar proteção onde ela é necessária — e peso, numa jornada de dez horas em pé, tem consequência.',
      },
      {
        tipo: 'h2',
        texto: 'Sobre a biqueira: aço ou composite',
      },
      {
        tipo: 'p',
        texto:
          'Quando o assunto é calçado de segurança, aparece a segunda dúvida. Existem biqueiras de aço, de composite e de outros materiais. Quando ambas atendem ao requisito da norma, a proteção contra impacto é equivalente — o que muda é peso, condução de temperatura e detecção em detector de metal.',
      },
      {
        tipo: 'p',
        texto:
          'O composite é mais leve e não conduz calor nem frio, o que faz diferença em ambiente muito quente ou muito frio e para quem caminha muito. O aço costuma ter custo menor. Existe ainda a chamada biqueira de conformação, que dá forma ao calçado mas não é biqueira de proteção — atenção a essa diferença, porque o nome parecido gera confusão.',
      },
      {
        tipo: 'h2',
        texto: 'O que a biqueira não faz',
      },
      {
        tipo: 'p',
        texto:
          'A biqueira protege os dedos contra impacto e compressão. Ela não protege a sola contra perfuração. Se na sua atividade há prego, ferro ou material perfurante no chão, a proteção contra perfuração é um requisito adicional, presente apenas em modelos específicos — e isso precisa ser conferido no Certificado de Aprovação.',
      },
    ],
    fontes: [
      {
        titulo: 'Equipamentos de Proteção Individual — Ministério do Trabalho e Emprego',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/equipamentos-de-protecao-individual',
      },
      {
        titulo: 'Requisitos para calçados de segurança e ocupacionais — Target Normas',
        url: 'https://www.normas.com.br/visualizar/artigo-tecnico/2532/os-requisitos-para-os-calcados-de-seguranca-e-ocupacionais',
      },
    ],
    paginaComercial: {
      href: '/calcados/comparativo/',
      rotulo: 'Ver a comparação completa',
    },
    contexto: 'calcados-comparativo',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Li o texto sobre calçado ocupacional e de segurança e continuo em dúvida sobre qual serve para o meu caso.',
    ctaTitulo: 'Ainda em dúvida sobre qual é o seu caso?',
    ctaTexto:
      'Descreva a sua rotina de trabalho: onde você fica, como é o piso e se há movimentação de carga. A gente diz qual dos dois faz sentido e por quê.',
  },
  {
    slug: 'nr-6-o-que-a-empresa-precisa-saber',
    titulo: 'NR-6: o que a empresa precisa saber sobre EPI',
    tituloSeo: 'NR-6: o que a empresa precisa saber sobre EPI',
    resumo:
      'Quem fornece, quem paga, o que precisa constar e o que costuma ser cobrado em fiscalização.',
    descricaoSeo:
      'Obrigações da empresa quanto ao fornecimento de EPI segundo a norma regulamentadora, com fonte oficial. Guia direto para quem compra e gerencia.',
    publicado: '2026-08-30',
    atualizado: '2026-08-30',
    atualizadoExibicao: 'agosto de 2026',
    cluster: 'Normas',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'A norma regulamentadora de EPI estabelece que o empregador deve fornecer ao trabalhador o equipamento adequado ao risco, gratuitamente, em perfeito estado de conservação e funcionamento, e com Certificado de Aprovação válido.',
      },
      {
        tipo: 'p',
        texto:
          'Este texto é um resumo prático para quem compra e gerencia EPI numa empresa. Ele não substitui a leitura da norma nem a orientação do profissional de segurança do trabalho responsável. O texto oficial e atualizado está disponível no portal do Ministério do Trabalho e Emprego, com link ao final.',
      },
      {
        tipo: 'h2',
        texto: 'O que é considerado EPI',
      },
      {
        tipo: 'p',
        texto:
          'É todo dispositivo ou produto de uso individual utilizado pelo trabalhador, destinado à proteção contra riscos capazes de ameaçar a sua segurança e a sua saúde no trabalho. É por isso que uniforme comum e EPI não são a mesma coisa — a distinção aparece justamente na finalidade de proteção contra um risco.',
      },
      {
        tipo: 'h2',
        texto: 'O Certificado de Aprovação é obrigatório',
      },
      {
        tipo: 'p',
        texto:
          'O equipamento de proteção individual, nacional ou importado, só pode ser posto à venda ou utilizado com a indicação do Certificado de Aprovação expedido pelo órgão nacional competente em segurança e saúde no trabalho. Isso vale tanto para quem vende quanto para quem compra e fornece à equipe.',
      },
      {
        tipo: 'h2',
        texto: 'Obrigações que costumam ser cobradas na prática',
      },
      {
        tipo: 'lista',
        itens: [
          'Fornecer o equipamento adequado ao risco da atividade, e não um equipamento genérico.',
          'Fornecer gratuitamente — o custo não pode ser repassado ao trabalhador.',
          'Fornecer em perfeito estado de conservação e funcionamento.',
          'Orientar e treinar sobre o uso adequado, a guarda e a conservação.',
          'Substituir imediatamente quando danificado ou extraviado.',
          'Responsabilizar-se pela higienização e manutenção periódica.',
          'Registrar o fornecimento, o que na prática é feito pela ficha de EPI.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'A ficha de EPI',
      },
      {
        tipo: 'p',
        texto:
          'A ficha é o registro de que o equipamento foi entregue àquela pessoa. Na prática, ela costuma trazer identificação do trabalhador, descrição do equipamento, número do CA, data de entrega e assinatura. É o documento mais pedido em fiscalização e o que mais gera problema quando está desatualizado.',
      },
      {
        tipo: 'h2',
        texto: 'O erro mais comum de quem compra',
      },
      {
        tipo: 'p',
        texto:
          'Comprar pelo preço e descobrir depois que o equipamento não é adequado ao risco. Um respirador aprovado para poeira não resolve exposição a vapor químico; uma luva aprovada para manuseio geral não substitui resistência química específica. O CA descreve para que o equipamento foi aprovado — é esse texto que precisa bater com a avaliação de riscos da empresa.',
      },
      {
        tipo: 'p',
        texto:
          'Há ainda um erro menos falado e mais caro: comprar equipamento adequado que a equipe não usa. Desconforto, tamanho errado e incompatibilidade entre itens levam ao abandono do uso. Do ponto de vista de proteção e de fiscalização, EPI que não é usado equivale a EPI que não foi fornecido.',
      },
    ],
    fontes: [
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto oficial, PDF)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
      {
        titulo: 'Equipamentos de Proteção Individual — Ministério do Trabalho e Emprego',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/equipamentos-de-protecao-individual',
      },
    ],
    paginaComercial: {
      href: '/empresas/',
      rotulo: 'Ver soluções para empresas',
    },
    contexto: 'empresas',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Li o texto sobre a NR-6 e gostaria de ajuda para organizar o EPI da nossa equipe.',
    ctaTitulo: 'Precisa organizar o EPI da sua equipe?',
    ctaTexto:
      'Conte quantas pessoas são e o que elas fazem. A gente ajuda a montar o conjunto por atividade e a verificar se o que vocês usam hoje corresponde ao risco.',
  },
  {
    slug: 'solado-antiderrapante-o-que-significa',
    titulo: 'Solado antiderrapante: o que realmente significa',
    tituloSeo: 'Solado antiderrapante: o que significa',
    resumo:
      'Não existe "antiderrapante" genérico. O desempenho é medido em superfícies diferentes — e isso muda a escolha.',
    descricaoSeo:
      'Entenda o que é medido no ensaio de resistência ao escorregamento, o que significam as marcações e como escolher para piso molhado ou oleoso.',
    publicado: '2026-08-30',
    atualizado: '2026-08-30',
    atualizadoExibicao: 'agosto de 2026',
    cluster: 'Calçados',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Resistência ao escorregamento é medida em ensaio, em superfícies e com contaminantes específicos. Por isso um calçado pode ter bom desempenho em piso cerâmico molhado e desempenho diferente em piso com resíduo oleoso.',
      },
      {
        tipo: 'p',
        texto:
          '"Antiderrapante" virou palavra de anúncio. Na prática, ela descreve uma característica que é ensaiada, medida e registrada — e que varia conforme a superfície. Entender isso é o que separa uma compra que resolve de uma compra que decepciona no primeiro dia de chuva ou no primeiro turno de fritura.',
      },
      {
        tipo: 'h2',
        texto: 'O que é medido',
      },
      {
        tipo: 'p',
        texto:
          'Os ensaios de resistência ao escorregamento avaliam o atrito entre o solado e o piso na presença de um contaminante. As combinações mais usadas envolvem piso cerâmico com solução detergente e piso de aço com glicerol — situações que representam, respectivamente, ambiente molhado e ambiente oleoso.',
      },
      {
        tipo: 'p',
        texto:
          'Historicamente, essas condições apareceram nas marcações conhecidas como SRA, SRB e SRC, esta última indicando desempenho nas duas situações. As normas de calçado passaram por revisões e a forma de marcação pode variar conforme a versão adotada e o modelo. Por isso a orientação prática é sempre a mesma: confira a marcação do modelo específico e o que consta no Certificado de Aprovação, em vez de confiar apenas na palavra "antiderrapante" na descrição.',
      },
      {
        tipo: 'h2',
        texto: 'Como isso se traduz na escolha',
      },
      {
        tipo: 'tabela',
        cabecalho: ['Ambiente', 'O que interessa'],
        linhas: [
          ['Cozinha e área de alimentação', 'Desempenho em piso molhado e com gordura'],
          ['Hospital e clínica', 'Desempenho em piso liso molhado por limpeza'],
          ['Limpeza e conservação', 'Desempenho em piso molhado com produto químico'],
          ['Indústria com óleo', 'Desempenho em superfície com contaminante oleoso'],
          ['Obra e área externa', 'Aderência em piso irregular, com poeira ou lama'],
        ],
      },
      {
        tipo: 'h2',
        texto: 'O fator que ninguém mede: o desgaste',
      },
      {
        tipo: 'p',
        texto:
          'O ensaio é feito com o calçado novo. O solado desgasta com o uso, e o relevo é justamente o que garante a aderência. Um calçado excelente há oito meses pode estar oferecendo pouca proteção hoje.',
      },
      {
        tipo: 'p',
        texto:
          'Na prática, isso significa incluir a conferência do solado na rotina — olhar o relevo, verificar se está liso nas áreas de maior apoio. Em ambientes onde o escorregamento é o risco principal, esse é o critério de troca mais importante, mais até do que a aparência geral do calçado.',
      },
      {
        tipo: 'h2',
        texto: 'E o piso?',
      },
      {
        tipo: 'p',
        texto:
          'Vale lembrar que a aderência é uma relação entre duas superfícies. O calçado responde por uma parte; o piso e a limpeza respondem pela outra. Piso muito liso, acúmulo de gordura e limpeza inadequada reduzem o desempenho de qualquer solado. O calçado é uma proteção individual — não substitui a correção do ambiente quando ela é possível.',
      },
    ],
    fontes: [
      {
        titulo: 'Requisitos para calçados de segurança e ocupacionais — Target Normas',
        url: 'https://www.normas.com.br/visualizar/artigo-tecnico/2532/os-requisitos-para-os-calcados-de-seguranca-e-ocupacionais',
      },
      {
        titulo: 'Equipamentos de Proteção Individual — Ministério do Trabalho e Emprego',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/equipamentos-de-protecao-individual',
      },
    ],
    paginaComercial: {
      href: '/calcados/antiderrapantes/',
      rotulo: 'Ver calçados antiderrapantes',
    },
    contexto: 'calcados-antiderrapantes',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Li o texto sobre solado antiderrapante e queria saber qual modelo serve para o piso onde eu trabalho.',
    ctaTitulo: 'Quer saber se o modelo serve para o seu piso?',
    ctaTexto:
      'Descreva como é o chão onde você trabalha e o que costuma cair nele. A gente verifica a marcação dos modelos e indica o que faz sentido.',
  },
]

export const buscarArtigo = (slug: string) => ARTIGOS.find((a) => a.slug === slug)
