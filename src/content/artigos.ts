import type { ContextoWhatsApp } from '@/lib/whatsapp'
import { empresa } from '@/config/empresa'

/**
 * Central de conhecimento.
 *
 * Regra do projeto: nenhum artigo existe "para postar conteúdo". Cada um
 * resolve uma dúvida real, linka para UMA página comercial e tem um CTA que
 * nasce da intenção daquele texto — nunca um "entre em contato" genérico.
 *
 * Todo conteúdo normativo cita fonte oficial e traz data de revisão.
 *
 * Todo artigo tem FAQ — o campo `perguntas` é obrigatório de propósito, e a
 * explicação do que entra nele está na declaração do tipo, abaixo.
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
  /**
   * REGRA DO PROJETO: TODO ARTIGO TEM FAQ. Por isso este campo não é
   * opcional — artigo novo sem perguntas não compila, e a regra é cobrada
   * pelo compilador em vez de por lembrança.
   *
   * O QUE ENTRA AQUI: pergunta que o leitor faria em voz alta e que o corpo
   * do texto não responde de forma curta e destacável. A resposta precisa
   * ficar de pé sozinha, porque é ela que vai para o dado estruturado e é
   * ela que um resumo de IA cita — e precisa ser verdadeira sem o resto do
   * artigo em volta.
   *
   * O QUE NÃO ENTRA: resumo do que o texto já disse em três parágrafos, e
   * pergunta inventada para encher. Três boas valem mais que seis mornas.
   *
   * O schema FAQPage exige a resposta VISÍVEL na página. O componente
   * `Perguntas` usa `<details>` com o texto no HTML desde o primeiro
   * carregamento; acordeão que injeta a resposta só no clique quebraria
   * isso.
   */
  perguntas: { pergunta: string; resposta: string }[]
  /**
   * Capa do artigo. O arquivo deriva do slug — `/fotos/artigos/<slug>.webp`
   * e `-og.jpg` — para não existir a possibilidade de apontar para o arquivo
   * de outro texto. O `alt` descreve a imagem e carrega o texto que está
   * dentro dela, que um leitor de tela não alcança de outro jeito.
   *
   * Opcional: artigo sem capa simplesmente não mostra nenhuma, e continua
   * usando a imagem de compartilhamento padrão do site.
   */
  imagem?: { alt: string }
}

export const ARTIGOS: Artigo[] = [
  {
    slug: 'calcado-para-cozinha-como-escolher',
    titulo: 'Qual o melhor calçado para trabalhar em cozinha?',
    tituloSeo: 'Qual o melhor calçado para cozinha?',
    resumo:
      'Piso molhado com gordura, respingo quente e jornada em pé mudam completamente o critério. O que realmente importa na escolha.',
    descricaoSeo:
      'Piso molhado, gordura e horas em pé mudam o critério. O que observar no solado e na cobertura, e quando a biqueira entra — revisado por técnico de segurança.',
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
          'Vale saber que <a href="/calcados/antiderrapantes/">"antiderrapante"</a> não é uma característica única. Os ensaios de resistência ao escorregamento são feitos em superfícies e contaminantes diferentes, e o desempenho em piso cerâmico molhado não é o mesmo que em piso com resíduo oleoso. Como a cozinha combina água e gordura, é essa combinação que interessa. A marcação do modelo e o Certificado de Aprovação trazem essa informação.',
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
          'Ou seja: a pergunta não é "qual protege mais", e sim "existe risco de algo pesado cair sobre o pé na minha rotina?". Se existe, a conversa muda para <a href="/calcados/seguranca/">calçado de segurança</a>, e calçado de segurança. Se não existe, um calçado ocupacional bem escolhido tende a proteger melhor no que importa aqui — aderência — e a ser mais leve para a jornada em pé.',
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
    perguntas: [
      {
        pergunta: 'Calçado furado ou tipo babuche serve para cozinha?',
        resposta:
          'Não. A cobertura fechada existe para respingo quente e derramamento de líquido, e o furo no cabedal anula isso exatamente onde o risco está: em cima do pé. Em cozinha, calçado vazado é conforto comprado com a proteção que motivou a compra.',
      },
      {
        pergunta: 'Calçado de couro aguenta a rotina de cozinha?',
        resposta:
          'Aguenta menos do que se espera. O couro absorve gordura e sofre com a higienização frequente que a cozinha exige, e o par envelhece por dentro antes de parecer gasto por fora. Material que suporta lavagem costuma durar mais nesse ambiente.',
      },
      {
        pergunta: 'A área de lavagem pede calçado diferente do resto da cozinha?',
        resposta:
          'Pede o mesmo tipo, com critério mais rígido de solado. É o ponto mais molhado da operação e onde o escorregamento mais acontece. Se a pessoa passa a maior parte do turno ali, a aderência pesa mais que qualquer outro fator na escolha.',
      },
    ],
    ctaTitulo: 'Trabalha em cozinha e ainda está em dúvida?',
    ctaTexto:
      'Conte como é a sua rotina: tipo de cozinha, como fica o piso e quantas horas você passa em pé. A gente mostra as opções que fazem sentido e explica a diferença entre elas.',
    imagem: {
      alt:
        'Calçado de cozinha preto, fechado e sem cadarço, sobre fundo claro com blocos vermelho e preto, e o título: qual o melhor calçado para trabalhar em cozinha.',
    },
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
          'Um <a href="/protecao/respiratoria/">respirador aprovado para material particulado</a> não protege contra vapor orgânico. Uma luva aprovada para um tipo de risco pode não ter resistência ao produto químico que você usa. Um calçado de segurança pode ter biqueira e não ter proteção contra perfuração do solado. Todas essas informações constam no certificado.',
      },
      {
        tipo: 'h2',
        texto: 'Como consultar',
      },
      {
        tipo: 'p',
        texto:
          'A consulta é feita no sistema CAEPI do Ministério do Trabalho e Emprego — o caminho oficial está na <a href="https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca" target="_blank" rel="noopener noreferrer">página do serviço no gov.br</a>, citada nas fontes. Com o número do CA é possível verificar o equipamento, o fabricante ou importador, a validade e a descrição do que foi aprovado.',
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
          'A validade do CA está ligada à autorização daquele modelo no mercado, e por isso ela pesa mais na compra do que na prateleira. Item que ainda vai ser adquirido ou entregue precisa ter certificado vigente. Item que já está em uso é uma pergunta com resposta mais longa, e ela está em <a href="/conhecimento/ca-vencido-o-epi-pode-continuar-em-uso/">CA vencido: o EPI pode continuar em uso?</a>.',
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
    perguntas: [
      {
        pergunta: 'Onde consultar o número do CA de um EPI?',
        resposta:
          'No sistema do Ministério do Trabalho e Emprego, informando o número do CA. O caminho oficial está no link ao final deste texto. A consulta mostra o equipamento, o fabricante ou importador, a validade e a descrição do que foi aprovado.',
      },
      {
        pergunta: 'EPI sem CA pode ser usado?',
        resposta:
          'Não. A NR-6 condiciona o fornecimento de EPI à existência de Certificado de Aprovação. Equipamento sem CA não cumpre a exigência, mesmo que pareça adequado.',
      },
      {
        pergunta: 'O CA fica no produto ou só na nota fiscal?',
        resposta:
          'No próprio equipamento, marcado de forma legível e indelével. É por isso que dá para conferir o CA olhando o par que está no pé de alguém, sem depender do documento da compra.',
      },
    ],
    ctaTitulo: 'Precisa conferir o CA dos EPIs que a sua equipe usa?',
    ctaTexto:
      'Mande a lista do que vocês usam hoje. A gente ajuda a verificar se o que está em uso corresponde ao risco da atividade e o que vale substituir.',
    imagem: {
      alt:
        'Etiqueta de Certificado de Aprovação do Ministério do Trabalho ao lado de um calçado de segurança preto, com o título: o que é o CA do EPI e como consultar.',
    },
  },
  {
    slug: 'calcado-ocupacional-ou-de-seguranca',
    // H1 SEPARADO POR INTENÇÃO. Este artigo e /calcados/comparativo/ tinham o
    // mesmo H1 — "qual é o seu caso?" — e 0,74 de sobreposição na auditoria.
    // Duas páginas boas disputando a mesma consulta é uma página desperdiçada.
    // A decisão de compra ficou com a página comercial; aqui fica a norma, que
    // é o que este texto realmente explica.
    titulo: 'NBR ISO 20345 e 20347: o que muda no calçado profissional',
    tituloSeo: 'NBR ISO 20345 e 20347: o que muda no calçado',
    resumo:
      'As duas normas que separam o calçado de segurança do ocupacional, o que cada uma exige da biqueira e como ler isso na marcação do produto.',
    descricaoSeo:
      'As duas normas do calçado profissional, o que cada uma exige da biqueira, e a pergunta que resolve a dúvida na maioria dos casos.',
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
          'É a dúvida que mais chega até nós, e a confusão é compreensível: <a href="/calcados/ocupacionais/">calçado ocupacional</a> e <a href="/calcados/seguranca/">calçado de segurança</a> são ambos calçados profissionais, os dois podem ter solado antiderrapante e os dois podem ter Certificado de Aprovação. A diferença está em qual risco cada um foi feito para enfrentar.',
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
        texto: 'Como saber qual norma um calçado atende',
      },
      {
        tipo: 'p',
        texto:
          'A norma não se descobre pela aparência. Um calçado ocupacional e um de segurança podem ser visualmente parecidos, e a biqueira de proteção nem sempre aparece por fora — existe inclusive a chamada biqueira de conformação, que dá forma ao bico mas não é biqueira de proteção.',
      },
      {
        tipo: 'p',
        texto:
          'O que resolve é a informação que acompanha o produto: a marcação no próprio calçado e o Certificado de Aprovação. O CA é emitido para um modelo e um uso determinados, e é nele que se confirma a que o equipamento foi aprovado — <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">como consultar o CA está explicado aqui</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Na prática, ao pedir um orçamento, o caminho mais curto é pedir o CA de cada item junto com a proposta. Se o fornecedor não informa, é sinal de que a conversa vai ser difícil depois.',
      },
      {
        tipo: 'h2',
        texto: 'E qual dos dois comprar?',
      },
      {
        tipo: 'p',
        texto:
          'Essa é uma decisão de compra, e ela depende de existir ou não risco mecânico sobre os dedos na sua rotina. O site tem uma página só para isso, com a pergunta que resolve e os casos típicos de cada lado: <a href="/calcados/comparativo/">ocupacional ou de segurança, qual é o seu caso</a>.',
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
          'O composite é mais leve e não conduz calor nem frio, o que faz diferença em ambiente muito quente ou muito frio e para quem caminha muito. O aço costuma ter custo menor. Existe ainda a chamada biqueira de conformação, que dá forma ao calçado mas não é biqueira de proteção — atenção a essa diferença, porque o nome parecido gera confusão. A decisão atividade por atividade — frio, eletricidade, detector de metal, quilometragem — está em <a href="/conhecimento/biqueira-de-composite-ou-de-aco-qual-escolher/">biqueira de composite ou de aço</a>.',
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
    perguntas: [
      {
        pergunta: 'Como sei qual das duas normas o calçado atende?',
        resposta:
          'Pela descrição do Certificado de Aprovação do modelo, e não pela aparência. Um calçado ocupacional pode ser visualmente parecido com um de segurança; o que separa os dois é a biqueira de proteção, e é o CA que diz se ela existe.',
      },
      {
        pergunta: 'Na dúvida, qual dos dois é a escolha mais segura?',
        resposta:
          'Não existe escolha segura por padrão, e é isso que torna a pergunta armadilha. Biqueira onde não há risco de impacto é peso que faz o calçado sair do pé no meio do turno. Falta de biqueira onde há impacto é exposição. Quem decide é a avaliação de riscos da atividade, não o instinto de pegar o mais reforçado.',
      },
      {
        pergunta: 'Posso usar ocupacional na indústria?',
        resposta:
          'Depende da atividade, não do setor. Uma linha de montagem com movimentação de carga pede biqueira; uma sala de controle na mesma fábrica não. Quem decide é a avaliação de riscos da empresa.',
      },
    ],
    ctaTitulo: 'Ainda em dúvida sobre qual é o seu caso?',
    ctaTexto:
      'Descreva a sua rotina de trabalho: onde você fica, como é o piso e se há movimentação de carga. A gente diz qual dos dois faz sentido e por quê.',
    imagem: {
      alt:
        'Um sapato ocupacional e uma botina de segurança lado a lado sobre fundo claro, com o título: calçado ocupacional ou de segurança, qual é o seu caso.',
    },
  },
  {
    slug: 'nr-6-o-que-a-empresa-precisa-saber',
    titulo: 'NR-6: o que a empresa precisa saber sobre EPI',
    tituloSeo: 'NR-6: o que a empresa precisa saber sobre EPI',
    resumo:
      'Quem fornece, quem paga, o que precisa constar e o que costuma ser cobrado em fiscalização.',
    descricaoSeo:
      'Fornecimento gratuito, CA válido, ficha de entrega, treinamento e o erro mais comum de quem compra. Resumo prático da norma, com o texto oficial citado.',
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
          'O equipamento de proteção individual, nacional ou importado, só pode ser posto à venda ou utilizado com a indicação do <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">Certificado de Aprovação</a> expedido pelo órgão nacional competente em segurança e saúde no trabalho. Isso vale tanto para quem vende quanto para quem compra e fornece à equipe.',
      },
      {
        tipo: 'h2',
        texto: 'Obrigações que costumam ser cobradas na prática',
      },
      {
        tipo: 'lista',
        itens: [
          'Fornecer o equipamento adequado ao risco da atividade, e não um equipamento genérico.',
          '<a href="/conhecimento/empresa-pode-descontar-epi-do-salario/">Fornecer gratuitamente</a> — o custo não pode ser repassado ao trabalhador.',
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
          'Comprar pelo preço e descobrir depois que o equipamento não é adequado ao risco. Um <a href="/protecao/respiratoria/">respirador aprovado para poeira</a> não resolve exposição a vapor químico; uma luva aprovada para manuseio geral não substitui resistência química específica. O CA descreve para que o equipamento foi aprovado — é esse texto que precisa bater com a avaliação de riscos da empresa.',
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
    perguntas: [
      {
        pergunta: 'O que a NR-6 exige além de entregar o EPI?',
        resposta:
          'Entregar é uma das obrigações, não todas. A norma trata também da adequação ao risco, do Certificado de Aprovação válido, do estado de conservação e funcionamento, do treinamento sobre uso e guarda, da higienização e da substituição imediata quando o equipamento é danificado.',
      },
      {
        pergunta: 'O trabalhador é obrigado a usar o EPI?',
        resposta:
          'Sim. A norma coloca o uso para a finalidade a que se destina como obrigação do trabalhador, e cabe à empresa exigir esse uso. As duas obrigações existem ao mesmo tempo.',
      },
      {
        pergunta: 'A empresa precisa treinar quem usa EPI?',
        resposta:
          'Sim. Orientar e treinar sobre uso adequado, guarda e conservação faz parte das obrigações do empregador — não basta entregar o equipamento e registrar a entrega.',
      },
    ],
    ctaTitulo: 'Precisa organizar o EPI da sua equipe?',
    ctaTexto:
      'Conte quantas pessoas são e o que elas fazem. A gente ajuda a montar o conjunto por atividade e a verificar se o que vocês usam hoje corresponde ao risco.',
    imagem: {
      alt:
        'Capacete, óculos e luvas de proteção pretos sobre fundo claro, com o título: NR-6, o que a empresa precisa saber sobre EPI.',
    },
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
          'Na prática, isso significa incluir a conferência do solado na rotina — olhar o relevo, verificar se está liso nas áreas de maior apoio. Em ambientes onde o escorregamento é o risco principal, esse é o critério de troca mais importante, mais até do que a aparência geral do calçado. Os demais sinais estão reunidos em <a href="/conhecimento/quando-trocar-o-calcado-de-seguranca/">quando trocar o calçado de segurança</a>.',
      },
      {
        tipo: 'h2',
        texto: 'E o piso?',
      },
      {
        tipo: 'p',
        texto:
          'Vale lembrar — sobretudo em <a href="/para-seu-trabalho/cozinha/">cozinha</a> — que a aderência é uma relação entre duas superfícies, e é por isso que <a href="/conhecimento/botina-escorrega-o-que-fazer-antes-de-trocar/">nem toda queixa de escorregamento se resolve trocando o calçado</a>. O calçado responde por uma parte; o piso e a limpeza respondem pela outra. Piso muito liso, acúmulo de gordura e limpeza inadequada reduzem o desempenho de qualquer solado. O calçado é uma proteção individual — não substitui a correção do ambiente quando ela é possível.',
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
    perguntas: [
      {
        pergunta: 'Todo calçado antiderrapante serve para qualquer piso?',
        resposta:
          'Não. O desempenho é medido em superfícies e contaminantes específicos, e um calçado que vai bem em piso cerâmico molhado pode ir mal em piso com óleo. É por isso que a marcação importa mais que a palavra antiderrapante na embalagem.',
      },
      {
        pergunta: 'Como sei se o solado ainda está bom?',
        resposta:
          'Comparando o relevo da área de maior apoio com o de uma lateral que quase não toca o chão. Se a diferença é grande, o relevo já se foi — e é ele que garante a aderência.',
      },
      {
        pergunta: 'Calçado antiderrapante evita queda?',
        resposta:
          'Reduz o risco, não elimina. A aderência é uma relação entre duas superfícies: o calçado responde por uma parte, o piso e a rotina de limpeza respondem pela outra.',
      },
    ],
    ctaTitulo: 'Quer saber se o modelo serve para o seu piso?',
    ctaTexto:
      'Descreva como é o chão onde você trabalha e o que costuma cair nele. A gente verifica a marcação dos modelos e indica o que faz sentido.',
    imagem: {
      alt:
        'Solado de um calçado de segurança visto por baixo, com a marcação SRC slip resistant, e o título: solado antiderrapante, o que realmente significa.',
    },
  },
  {
    slug: 'ficha-de-entrega-de-epi-o-que-precisa-constar',
    titulo: 'Ficha de entrega de EPI: o que precisa constar',
    tituloSeo: 'Ficha de entrega de EPI: o que precisa constar',
    resumo:
      'O registro do fornecimento é o que comprova que a empresa entregou. Veja o que ele precisa trazer e os erros que aparecem em fiscalização.',
    descricaoSeo:
      'A NR-6 obriga a registrar a entrega do EPI. Veja o que a ficha precisa conter, os erros mais comuns no preenchimento e como organizar isso numa equipe grande.',
    publicado: '2026-09-03',
    atualizado: '2026-09-03',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Normas',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'A NR-6 estabelece que o empregador registre o fornecimento do EPI ao trabalhador, e admite que esse registro seja feito em livro, ficha ou sistema eletrônico. Na prática, a ficha de entrega é a prova de que a empresa cumpriu a obrigação — e é o primeiro documento pedido quando alguém pergunta.',
      },
      {
        tipo: 'p',
        texto:
          'A norma não publica um modelo oficial de ficha. O que ela exige é que o fornecimento fique registrado. Isso dá liberdade de formato e cria a dúvida que chega até nós com frequência: <em>o que precisa estar escrito ali?</em>',
      },
      {
        tipo: 'h2',
        texto: 'O que a ficha precisa trazer',
      },
      {
        tipo: 'p',
        texto:
          'Um registro serve para responder, meses depois, a quatro perguntas: quem recebeu, o que recebeu, quando, e se foi orientado. Tudo o mais é organização interna.',
      },
      {
        tipo: 'lista',
        itens: [
          'Identificação do trabalhador e da função — a função importa porque é ela que justifica o EPI escolhido.',
          'Descrição do equipamento entregue, com o número do Certificado de Aprovação (CA).',
          'Quantidade e data da entrega.',
          'Motivo, quando for substituição: desgaste, dano, extravio ou troca por outro modelo.',
          'Assinatura ou confirmação de recebimento do trabalhador.',
          'Registro de que houve orientação sobre uso, guarda e conservação.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'O CA é o campo que mais some das fichas, e é o que dá sentido ao resto: sem ele, o documento comprova que algo foi entregue, mas não que era o equipamento aprovado para aquele risco. <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">Como consultar o CA está explicado aqui</a>.',
      },
      {
        tipo: 'h2',
        texto: 'Os erros que a gente mais vê',
      },
      {
        tipo: 'lista',
        itens: [
          'Ficha assinada em branco no dia da admissão, para ser preenchida depois. Isso não registra entrega nenhuma.',
          'Uma única linha para "kit de EPI", sem discriminar os itens nem os CAs.',
          'CA anotado uma vez e repetido nas entregas seguintes, mesmo quando o modelo mudou.',
          'Substituição registrada sem motivo, o que apaga o histórico de desgaste da função.',
          'Ficha guardada só na pasta do RH, longe de quem entrega no dia a dia — o registro atrasa e depois ninguém lembra.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'Em equipe grande, o problema não é a ficha',
      },
      {
        tipo: 'p',
        texto:
          'É a rotina. Quando a entrega acontece no corredor, no meio do turno, o registro fica para depois — e depois vira nunca. O que costuma funcionar é amarrar a entrega a um momento que já existe: a troca programada, o início do mês, a reposição de numeração.',
      },
      {
        tipo: 'p',
        texto:
          'Ajuda também padronizar por função em vez de por pessoa. Quando a <a href="/para-seu-trabalho/">atividade define a lista</a>, quem entrega não precisa decidir nada na hora, e a ficha vira conferência em vez de redação.',
      },
      {
        tipo: 'h2',
        texto: 'A ficha não substitui a escolha certa',
      },
      {
        tipo: 'p',
        texto:
          'Vale dizer o óbvio, porque ele se perde: o registro comprova a entrega, não a adequação. Um EPI registrado com todas as assinaturas continua sendo o EPI errado se não protege do risco daquela atividade. A definição do que é adequado vem da avaliação de riscos da empresa, feita por profissional habilitado.',
      },
      {
        tipo: 'p',
        texto:
          'O resto das obrigações — quem fornece, quem paga, quem exige o uso — está reunido no texto sobre <a href="/conhecimento/nr-6-o-que-a-empresa-precisa-saber/">o que a empresa precisa saber sobre EPI</a>.',
      },
    ],
    fontes: [
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto atualizado)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
      {
        titulo: 'Equipamentos de Proteção Individual — Ministério do Trabalho e Emprego',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/equipamentos-de-protecao-individual',
      },
    ],
    paginaComercial: {
      href: '/empresas/',
      rotulo: 'Ver como a Tower atende empresas',
    },
    contexto: 'empresas',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Li o texto sobre ficha de entrega de EPI e gostaria de ajuda para organizar o fornecimento da nossa equipe.',
    perguntas: [
      {
        pergunta: 'A ficha de entrega de EPI pode ser digital?',
        resposta:
          'A norma não exige papel. O que a ficha precisa é identificar quem recebeu, o que recebeu e quando, e permitir comprovar a entrega. A forma de assinatura eletrônica aceitável deve ser confirmada com o responsável pela segurança do trabalho da empresa.',
      },
      {
        pergunta: 'Precisa anotar a numeração do calçado na ficha?',
        resposta:
          'Não é exigência da norma, e vale a pena mesmo assim: com a numeração registrada, a reposição sai sem ninguém precisar experimentar de novo.',
      },
      {
        pergunta: 'Por quanto tempo guardar as fichas?',
        resposta:
          'A norma de EPI não fixa um prazo para esta ficha. A prática é manter enquanto durar o vínculo e pelos prazos de guarda de documentos trabalhistas, que devem ser confirmados com o responsável pela área na empresa.',
      },
    ],
    ctaTitulo: 'Precisa do CA de cada item para preencher a ficha?',
    ctaTexto:
      'A Tower manda o Certificado de Aprovação junto com o orçamento, item por item. Conte qual é a atividade e a quantidade.',
  },
  {
    slug: 'botina-que-machuca-calcado-ou-numeracao',
    titulo: 'Botina que machuca: é o calçado ou é a numeração?',
    tituloSeo: 'Botina que machuca: o que fazer antes de trocar',
    resumo:
      'Quase sempre é numeração, forma ou modelo errado para a atividade — e não falta de tempo de uso. O que dá para resolver e o que não dá.',
    descricaoSeo:
      'Por que a biqueira não amacia, como saber se o problema é a numeração ou a forma do calçado, e quando insistir só piora. Sem truque caseiro.',
    publicado: '2026-09-03',
    atualizado: '2026-09-03',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Calçados',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Calçado de segurança que machuca raramente é falta de amaciar. Na maioria dos casos é numeração errada, forma incompatível com o pé ou modelo inadequado para a atividade — e nenhum dos três se resolve com uso.',
      },
      {
        tipo: 'p',
        texto:
          'É uma das reclamações que mais chegam, e quase sempre depois da compra de uma equipe inteira. Vale começar pela parte que mais surpreende quem procura no Google: <strong>a biqueira de proteção não amacia</strong>. Ela é uma peça rígida, de aço ou de material composto, e a função dela é justamente não ceder ao impacto. Se o dedo bate nela, vai continuar batendo no mês que vem.',
      },
      {
        tipo: 'h2',
        texto: 'Onde dói diz o que aconteceu',
      },
      {
        tipo: 'p',
        texto:
          'O ponto do incômodo é o melhor diagnóstico disponível sem tirar o calçado do pé.',
      },
      {
        tipo: 'tabela',
        cabecalho: ['Onde incomoda', 'Causa provável', 'Tem solução?'],
        linhas: [
          ['Ponta dos dedos, batendo', 'Numeração curta, ou biqueira começando cedo demais para o formato do pé', 'Não com uso. Troca de numeração ou de modelo'],
          ['Em cima dos dedos, pressionando', 'Calçado baixo no peito do pé, ou pé alto para aquela forma', 'Não. É forma do calçado'],
          ['Calcanhar, esfregando', 'Calçado folgado, que sobe e desce ao andar', 'Às vezes. Meia mais grossa ou palmilha podem resolver se a folga for pequena'],
          ['Laterais, apertando', 'Pé largo em forma estreita', 'Não. É forma do calçado'],
          ['Sola do pé, ardendo no fim do turno', 'Amortecimento insuficiente para a jornada, ou calçado pesado demais', 'Parcial. Palmilha ajuda; modelo mais leve resolve'],
        ],
      },
      {
        tipo: 'h2',
        texto: 'A numeração de calçado profissional não é a do tênis',
      },
      {
        tipo: 'p',
        texto:
          'Muita gente compra pelo número que usa no dia a dia e estranha. Calçado de segurança costuma calçar diferente por dois motivos: a forma é mais reta e o cabedal é mais firme, então ele acomoda menos que um calçado macio; e existe a meia de trabalho, geralmente mais grossa que a meia comum, que ocupa espaço real.',
      },
      {
        tipo: 'p',
        texto:
          'Por isso a prova vale mais que o número. Quando a compra é para uma equipe, o caminho que funciona é experimentar antes de fechar a grade — um par de amostra por faixa de numeração evita a troca de vinte pares depois. O método inteiro está em <a href="/conhecimento/grade-de-numeracao-como-definir-para-a-equipe/">como definir a grade de numeração de uma equipe</a>.',
      },
      {
        tipo: 'h2',
        texto: 'O que os truques da internet fazem com o calçado',
      },
      {
        tipo: 'p',
        texto:
          'Secador, jornal molhado, amaciante de roupa e congelador aparecem em toda busca sobre sapato apertado. São dicas de calçado social, e o efeito num calçado profissional é outro: calor concentrado resseca o couro e descola adesivo de solado; umidade dentro do calçado ataca costura e forro; produto químico em couro tratado mancha e enfraquece.',
      },
      {
        tipo: 'p',
        texto:
          'E nada disso muda a biqueira. No fim, o par volta a machucar com uma vida útil menor do que tinha.',
      },
      {
        tipo: 'h2',
        texto: 'Quando o problema é o modelo, não o tamanho',
      },
      {
        tipo: 'p',
        texto:
          'Existe um caso frequente e que ninguém considera: o calçado está certo, mas é do tipo errado para a atividade. Biqueira de proteção só faz sentido onde há risco de impacto sobre os dedos. Em cozinha, em serviço de limpeza, em atendimento de saúde e em boa parte do comércio, esse risco não existe — e o peso extra da biqueira, numa jornada de dez horas em pé, cobra caro.',
      },
      {
        tipo: 'p',
        texto:
          'Se for esse o caso, o problema não se resolve trocando de numeração: resolve-se trocando de categoria. A dúvida está respondida em <a href="/calcados/comparativo/">ocupacional ou de segurança, qual é o seu caso</a>.',
      },
      {
        tipo: 'h2',
        texto: 'O EPI que a pessoa tira não protege ninguém',
      },
      {
        tipo: 'p',
        texto:
          'Vale registrar por que isso importa além do desconforto. Calçado que machuca sai do pé — no almoço, no fim do turno, no dia em que ninguém está olhando. A norma trata o EPI como equipamento de uso obrigatório onde ele é necessário, e o uso depende de a pessoa conseguir usar. Conforto, aqui, é condição de proteção, não capricho.',
      },
      {
        tipo: 'p',
        texto:
          'Se o calçado já está danificado, com biqueira aparecendo ou solado descolando, o caso é de substituição — <a href="/conhecimento/nr-6-o-que-a-empresa-precisa-saber/">a NR-6 fala da conservação e da troca</a>, e a lista completa de sinais está em <a href="/conhecimento/quando-trocar-o-calcado-de-seguranca/">quando trocar o calçado de segurança</a>.',
      },
    ],
    fontes: [
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto atualizado)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
      {
        titulo: 'Requisitos para calçados de segurança e ocupacionais — Target Normas',
        url: 'https://www.normas.com.br/visualizar/artigo-tecnico/2532/os-requisitos-para-os-calcados-de-seguranca-e-ocupacionais',
      },
    ],
    paginaComercial: {
      href: '/calcados/',
      rotulo: 'Ver os calçados que a Tower trabalha',
    },
    contexto: 'calcados',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. O calçado que a gente usa está machucando e queria ajuda para descobrir se é numeração ou modelo.',
    perguntas: [
      {
        pergunta: 'Biqueira de proteção amacia com o uso?',
        resposta:
          'Não. Ela é uma peça rígida, e a função dela é justamente não ceder ao impacto. Se o dedo bate nela hoje, vai continuar batendo no mês que vem.',
      },
      {
        pergunta: 'Devo comprar um número maior para não apertar?',
        resposta:
          'Não como regra. O caminho é provar com a meia de trabalho, de preferência no fim de um turno. Calçado folgado sobe e desce ao andar e machuca o calcanhar, que é trocar um problema por outro.',
      },
      {
        pergunta: 'Quanto tempo leva para a botina assentar no pé?',
        resposta:
          'O cabedal cede um pouco nas primeiras semanas. A biqueira e a forma do calçado não cedem nunca — então incômodo na ponta dos dedos ou nas laterais não é questão de tempo.',
      },
    ],
    ctaTitulo: 'O calçado da sua equipe está machucando?',
    ctaTexto:
      'Conte onde incomoda e qual é a atividade. Dá para descobrir se o caso é numeração, forma ou categoria errada antes de trocar tudo.',
  },
  {
    slug: 'luva-de-procedimento-nao-e-luva-de-limpeza',
    titulo: 'Luva de procedimento não é luva de limpeza',
    tituloSeo: 'Luva de procedimento serve para limpeza? Não',
    resumo:
      'São categorias diferentes, com CAs diferentes e resistências diferentes. Trocar uma pela outra é o erro de compra mais comum em saúde e facilities.',
    descricaoSeo:
      'Por que a luva descartável não protege de saneante, como escolher a luva pelo produto químico manuseado e o que muda entre nitrílica, látex e PVC.',
    publicado: '2026-09-03',
    atualizado: '2026-09-03',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Luva de procedimento é descartável e foi feita para barreira biológica em contato breve. Luva de proteção química é mais espessa, reutilizável e escolhida pelo produto que vai ser manuseado. Usar a primeira para higienização não protege as mãos de quem limpa.',
      },
      {
        tipo: 'p',
        texto:
          'O erro é fácil de entender: as duas são luvas, as duas podem ser de nitrila, e a de procedimento é mais barata e já está no almoxarifado. Só que a espessura, o tempo de resistência e o uso previsto são outros — e é aí que a proteção acaba.',
      },
      {
        tipo: 'h2',
        texto: 'A diferença que importa',
      },
      {
        tipo: 'tabela',
        cabecalho: ['', 'Luva de procedimento', 'Luva de proteção química'],
        linhas: [
          ['Uso previsto', 'Barreira biológica em contato breve', 'Manuseio de produto químico'],
          ['Espessura', 'Fina, para manter a sensibilidade tátil', 'Maior, dimensionada para resistir ao produto'],
          ['Reutilização', 'Descartável', 'Reutilizável, com higienização e inspeção'],
          ['Como se escolhe', 'Pelo tamanho e pelo material', 'Pelo produto químico manuseado e pelo tempo de contato'],
          ['Punho', 'Curto', 'Longo, quando há risco de respingo no antebraço'],
        ],
      },
      {
        tipo: 'h2',
        texto: 'A luva se escolhe pelo produto, não pelo material',
      },
      {
        tipo: 'p',
        texto:
          'Esta é a parte que quase nenhum material sobre luvas diz com todas as letras. Não existe uma luva que resista a tudo. Cada material — nitrílica, látex, neoprene, PVC, butílica — tem comportamento diferente diante de cada substância, e a mesma luva pode ser adequada para um produto e inadequada para outro.',
      },
      {
        tipo: 'p',
        texto:
          'O caminho certo é começar pela ficha do produto químico que a equipe usa e pela indicação do fabricante da luva para aquele tipo de substância. Quem tem a ficha em mãos resolve a escolha em minutos; quem parte do catálogo erra com frequência. O passo a passo está em <a href="/conhecimento/luva-para-produto-quimico-como-escolher/">como escolher luva pelo produto químico</a>.',
      },
      {
        tipo: 'h2',
        texto: 'Onde a troca de categoria mais acontece',
      },
      {
        tipo: 'lista',
        itens: [
          'Higienização hospitalar: a equipe de limpeza recebe a mesma caixa de luva descartável da assistência, e manuseia saneante concentrado com ela.',
          'Cozinha industrial: luva de procedimento para lavar louça e para produto de limpeza pesada, quando o caso pede luva química de punho longo.',
          'Facilities e conservação: diluição de produto feita com a luva errada, que é exatamente o momento de maior concentração.',
          'Lavanderia: contato prolongado com produto e calor, dois fatores que a luva fina não aguenta.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Nesses quatro casos, o custo de corrigir é baixo: são funções específicas, não a equipe inteira. O que costuma faltar é alguém perceber que são duas compras diferentes.',
      },
      {
        tipo: 'h2',
        texto: 'Cada uma tem o seu CA',
      },
      {
        tipo: 'p',
        texto:
          'Todo EPI comercializado no Brasil precisa de Certificado de Aprovação, e o CA é emitido para um uso determinado. Uma luva aprovada como barreira biológica não passa a ser luva química porque foi usada assim. Conferir o CA é o jeito mais rápido de saber se o item corresponde ao que a função exige — <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">o texto sobre o CA explica como consultar</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Os critérios de escolha por tipo de risco estão reunidos na página de <a href="/protecao/maos/">proteção das mãos</a>.',
      },
    ],
    fontes: [
      {
        titulo: 'Equipamentos de Proteção Individual — Ministério do Trabalho e Emprego',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/equipamentos-de-protecao-individual',
      },
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
    ],
    paginaComercial: {
      href: '/protecao/maos/',
      rotulo: 'Ver proteção das mãos',
    },
    contexto: 'protecao-maos',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Li o texto sobre luva de procedimento e luva química e queria conferir se a luva que usamos hoje está certa.',
    perguntas: [
      {
        pergunta: 'Posso usar luva de procedimento para limpeza?',
        resposta:
          'Para limpeza com produto químico, não. A luva de procedimento é fina, descartável e feita para contato biológico de curta duração. Saneante concentrado atravessa ou degrada esse material antes do fim da tarefa.',
      },
      {
        pergunta: 'Luva descartável serve para produto químico?',
        resposta:
          'Depende do produto e do que consta no Certificado de Aprovação da luva. Existem descartáveis com resistência química declarada para situações específicas — o que não existe é descartável que sirva para qualquer produto.',
      },
      {
        pergunta: 'Qual luva usar na higienização hospitalar?',
        resposta:
          'Luva de proteção química, mais espessa, reutilizável e com punho compatível com o alcance do contato — escolhida a partir do produto que a equipe usa, e não da caixa que já está no almoxarifado.',
      },
    ],
    ctaTitulo: 'Quer conferir se a luva da sua equipe é a certa?',
    ctaTexto:
      'Diga qual produto químico é manuseado e por quanto tempo. Dá para verificar se o material da luva corresponde — e o CA vem junto no orçamento.',
  },
  {
    slug: 'mascara-descartavel-nao-protege-de-vapor-quimico',
    titulo: 'Máscara descartável não protege de vapor químico',
    tituloSeo: 'PFF2 serve para produto químico? Não, e o motivo',
    resumo:
      'A PFF retém partícula. Vapor e gás exigem respirador com filtro químico. São equipamentos diferentes, com CAs diferentes.',
    descricaoSeo:
      'Por que a máscara PFF não retém vapor químico, o que é preciso usar no lugar e como identificar se o respirador da sua equipe está correto.',
    publicado: '2026-09-03',
    atualizado: '2026-09-03',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'A peça facial filtrante (PFF) retém material particulado: poeira, névoa, fumo. Ela não retém vapor nem gás químico. Para isso é preciso respirador com filtro químico apropriado à substância — outro equipamento, com outro Certificado de Aprovação.',
      },
      {
        tipo: 'p',
        texto:
          'É o erro mais perigoso que aparece na nossa rotina, e o mais silencioso: a pessoa está usando máscara, a empresa entregou EPI, a ficha está assinada — e a proteção contra o risco que existe ali é zero. Como vapor químico nem sempre tem cheiro forte, a falha só aparece em exame ou em sintoma.',
      },
      {
        tipo: 'h2',
        texto: 'Partícula e vapor são coisas diferentes',
      },
      {
        tipo: 'p',
        texto:
          'A PFF funciona como uma peneira muito fina: o material do filtro segura partículas sólidas e líquidas suspensas no ar. Vapor químico não é partícula — são moléculas em fase gasosa, e elas atravessam esse material sem resistência.',
      },
      {
        tipo: 'p',
        texto:
          'Reter vapor exige outro princípio: um filtro químico, com material que adsorve aquele tipo de substância. É por isso que filtro químico tem indicação de uso e vida útil próprias, e não serve para qualquer produto.',
      },
      {
        tipo: 'h2',
        texto: 'Onde o erro mais aparece',
      },
      {
        tipo: 'lista',
        itens: [
          'Pintura e aplicação com solvente, inclusive em manutenção predial e funilaria.',
          'Manuseio de cola e solvente em fábrica de calçado e em marcenaria.',
          'Diluição e aplicação de produto de limpeza concentrado, sobretudo em ambiente fechado.',
          'Aplicação de defensivo agrícola, onde a exigência vem do próprio rótulo do produto.',
          'Serviços de desinfecção e sanitização com produto químico nebulizado.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Nesses casos, a PFF pode até ser necessária para a parte particulada da exposição — mas não substitui o filtro químico, e a combinação certa depende da substância.',
      },
      {
        tipo: 'h2',
        texto: 'Como saber se o respirador da equipe está certo',
      },
      {
        tipo: 'lista',
        itens: [
          'Identifique o produto: nome comercial e ficha de informações de segurança.',
          'Veja se a exposição é a partícula, a vapor ou a ambos — isso define a classe do equipamento.',
          'Confira o Certificado de Aprovação do respirador e do filtro, que são emitidos para usos determinados.',
          'Verifique a vedação: respirador que não sela no rosto não protege, por melhor que seja o filtro.',
          'Estabeleça a troca do filtro. Filtro químico tem saturação, e ela não se vê.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'A definição do equipamento adequado para exposição química depende da avaliação de riscos da empresa, com medição quando for o caso, feita por profissional habilitado. O que este texto resolve é a confusão de categoria — e ela sozinha já responde por boa parte dos casos que chegam até nós.',
      },
      {
        tipo: 'h2',
        texto: 'A classe da PFF não muda isso',
      },
      {
        tipo: 'p',
        texto:
          'Uma dúvida que aparece em seguida: "e se eu usar uma PFF3, que é mais protetora?". A classe da PFF indica eficiência de filtração de partículas — subir de classe aumenta a retenção de particulado, e não cria capacidade de reter vapor. É outra dimensão do problema.',
      },
      {
        tipo: 'p',
        texto:
          'As classes e o que cada uma resolve estão explicadas na página de <a href="/protecao/respiratoria/">proteção respiratória</a>.',
      },
    ],
    fontes: [
      {
        titulo: 'Equipamentos de Proteção Individual — Ministério do Trabalho e Emprego',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/equipamentos-de-protecao-individual',
      },
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
    ],
    paginaComercial: {
      href: '/protecao/respiratoria/',
      rotulo: 'Ver proteção respiratória',
    },
    contexto: 'protecao-respiratoria',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Li o texto sobre máscara e vapor químico e queria conferir se o respirador que usamos está correto.',
    perguntas: [
      {
        pergunta: 'Como sei se preciso de PFF ou de filtro químico?',
        resposta:
          'Pelo agente, não pelo produto. Poeira, névoa e fumo são partículas e pedem PFF. Vapor e gás atravessam a PFF e pedem filtro químico específico. Qual é o caso da sua atividade vem da ficha do produto e da avaliação de exposição da empresa.',
      },
      {
        pergunta: 'Uma PFF3 resolve vapor químico?',
        resposta:
          'Não. A classe da PFF indica eficiência de filtração de partículas: subir de classe aumenta a retenção de particulado e não cria capacidade de reter vapor. É outra dimensão do problema.',
      },
      {
        pergunta: 'O que usar contra vapor químico?',
        resposta:
          'Respirador com filtro químico adequado à substância, definido a partir da ficha do produto e da avaliação de exposição da empresa, com o uso indicado constando no Certificado de Aprovação.',
      },
    ],
    ctaTitulo: 'Quer conferir o respirador que a sua equipe usa?',
    ctaTexto:
      'Diga qual produto é manuseado e em que ambiente. Dá para verificar se a categoria está certa — e o CA vem junto no orçamento.',
  },
  {
    slug: 'biqueira-de-composite-ou-de-aco-qual-escolher',
    titulo: 'Biqueira de composite ou de aço: qual escolher?',
    tituloSeo: 'Biqueira de composite ou de aço: qual escolher',
    resumo:
      'As duas protegem igual quando atendem à norma. O que decide é a atividade: eletricidade, detector de metal, frio, quanto se caminha — e o que acontece depois de um impacto.',
    descricaoSeo:
      'Composite e aço protegem os dedos do mesmo jeito pela norma. A escolha é pela atividade: risco elétrico, detector de metal, frio, peso na jornada e custo.',
    publicado: '2026-09-04',
    atualizado: '2026-09-04',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Calçados',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Pela norma, biqueira de composite e biqueira de aço protegem os dedos do mesmo jeito: as duas precisam resistir ao mesmo impacto e à mesma compressão para o calçado ser de segurança. A pergunta certa não é qual protege mais — é o que mais acontece no ambiente onde a pessoa trabalha.',
      },
      {
        tipo: 'p',
        texto:
          'Quase tudo o que se lê sobre esse assunto compara material. É o jeito errado de decidir, porque a proteção contra impacto está garantida nos dois pelo <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">Certificado de Aprovação</a>. O que muda entre uma biqueira e outra é o resto: o que ela faz com eletricidade, com o frio, com um detector de metal, com o peso de quem caminha o dia inteiro — e o que sobra dela depois de uma pancada forte.',
      },
      {
        tipo: 'h2',
        texto: 'O que a norma exige das duas',
      },
      {
        tipo: 'p',
        texto:
          'A ABNT NBR ISO 20345 define o calçado de segurança pela biqueira de proteção, com requisito de resistência a impacto de 200 joules e a compressão. O requisito é o mesmo para qualquer material. Uma biqueira de composite aprovada não é uma versão mais fraca da de aço: ela passou no mesmo ensaio.',
      },
      {
        tipo: 'p',
        texto:
          'Isso significa que, se o Certificado de Aprovação do modelo é de calçado de segurança, a proteção dos dedos está resolvida — seja qual for o material. Tudo o que vem abaixo é sobre o que acontece <em>além</em> do impacto.',
      },
      {
        tipo: 'h2',
        texto: 'Onde cada uma se comporta diferente',
      },
      {
        tipo: 'tabela',
        cabecalho: ['Situação', 'Aço', 'Composite'],
        linhas: [
          ['Proteção contra impacto e compressão', 'Atende à norma', 'Atende à norma — o mesmo ensaio'],
          ['Peso do calçado', 'Mais pesado', 'Mais leve'],
          ['Frio e calor', 'Conduz: em câmara fria, o dedo sente', 'Não conduz'],
          ['Eletricidade', 'Conduz', 'Não conduz — mas isso não torna o calçado isolante'],
          ['Detector de metal', 'Acusa', 'Passa'],
          ['Volume da biqueira', 'Mais fina', 'Mais grossa: pode mudar como o calçado veste'],
          ['Depois de um impacto forte', 'Pode ficar deformada, pressionando os dedos', 'Pode perder resistência sem sinal visível'],
          ['Preço', 'Costuma custar menos', 'Costuma custar mais'],
        ],
      },
      {
        tipo: 'h2',
        texto: 'Decidindo pela atividade',
      },
      {
        tipo: 'h3',
        texto: 'Câmara fria, frigorífico, ambiente climatizado',
      },
      {
        tipo: 'p',
        texto:
          'O aço conduz temperatura. Em câmara fria, a biqueira esfria junto com o ambiente e os dedos ficam encostados em metal gelado durante o turno inteiro. É desconforto que vira reclamação e, com o tempo, calçado tirado do pé. Composite resolve isso sem abrir mão da norma.',
      },
      {
        tipo: 'h3',
        texto: 'Indústria de alimentos, farmacêutica, áreas com detector de metal',
      },
      {
        tipo: 'p',
        texto:
          'Onde a linha tem detector de metais, ou onde a entrada passa por portal, biqueira de aço acusa a cada passagem. Composite é a escolha por eliminação. O mesmo vale para quem trabalha em aeroporto e passa por controle várias vezes ao dia.',
      },
      {
        tipo: 'h3',
        texto: 'Trabalho perto de eletricidade',
      },
      {
        tipo: 'p',
        texto:
          'Aqui mora o erro mais perigoso deste assunto. A biqueira de composite não conduz eletricidade — <strong>e isso não transforma o calçado em calçado isolante</strong>. Isolamento elétrico é uma propriedade do calçado inteiro, ensaiada e declarada no Certificado de Aprovação como requisito próprio. Um calçado de segurança comum com biqueira de composite é um calçado de segurança comum. Se a atividade exige calçado isolante, é isso que tem de estar no CA, e a biqueira sozinha não resolve.',
      },
      {
        tipo: 'h3',
        texto: 'Logística, manutenção, quem caminha o dia inteiro',
      },
      {
        tipo: 'p',
        texto:
          'A diferença de peso entre as duas é pequena por passo e enorme por jornada. Quem percorre um galpão o dia todo sente o calçado mais pesado no fim do turno — e calçado pesado é o segundo motivo mais comum de a pessoa preferir o tênis. Para quem caminha muito, composite costuma ser a escolha certa mesmo custando mais, porque o calçado que fica no pé é o único que protege.',
      },
      {
        tipo: 'h3',
        texto: 'Obra, movimentação de carga pesada, oficina',
      },
      {
        tipo: 'p',
        texto:
          'Onde o risco é de impacto de verdade — material caindo, carga em movimento, peça pesada — as duas protegem igual, e o aço costuma ser a resposta mais econômica. Vale lembrar que biqueira não protege a sola: se há prego e ferro no chão, a proteção contra perfuração é outro requisito, presente só em modelos específicos, e também precisa constar no CA.',
      },
      {
        tipo: 'h2',
        texto: 'O que acontece depois da pancada',
      },
      {
        tipo: 'p',
        texto:
          'Ninguém pensa nisso na compra, e é onde as duas mais diferem. Uma biqueira de aço que recebeu um impacto forte pode ficar amassada — e amassada ela fica pressionando os dedos, o que a pessoa nota. Uma biqueira de composite pode trincar ou perder resistência sem nenhum sinal por fora.',
      },
      {
        tipo: 'p',
        texto:
          'A conclusão é a mesma para as duas: calçado que levou pancada forte na biqueira precisa ser substituído, mesmo que pareça inteiro. No composite, especialmente, "parece inteiro" não quer dizer nada.',
      },
      {
        tipo: 'h2',
        texto: 'A biqueira mais grossa muda a forma',
      },
      {
        tipo: 'p',
        texto:
          'Para chegar à mesma resistência do aço, o composite precisa de mais material. A biqueira fica mais volumosa, e isso pode mudar como o calçado veste na ponta — o mesmo número de um modelo com aço e de um com composite pode calçar diferente. Numa compra para equipe, é mais um motivo para provar antes de fechar a grade; o caminho está em <a href="/conhecimento/grade-de-numeracao-como-definir-para-a-equipe/">como definir a grade de numeração</a>.',
      },
      {
        tipo: 'h2',
        texto: 'Como conferir qual é a biqueira',
      },
      {
        tipo: 'p',
        texto:
          'O material da biqueira consta na descrição do Certificado de Aprovação do modelo. É ali que se confere, e não na embalagem. Se a atividade tem uma exigência específica — isolamento elétrico, proteção contra perfuração —, ela também precisa estar escrita no CA; a categoria "calçado de segurança" sozinha não garante nenhum dos dois.',
      },
    ],
    fontes: [
      {
        titulo: 'Requisitos para calçados de segurança e ocupacionais (ABNT NBR ISO 20345 e 20347) — Target Normas',
        url: 'https://www.normas.com.br/visualizar/artigo-tecnico/2532/os-requisitos-para-os-calcados-de-seguranca-e-ocupacionais',
      },
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto atualizado)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
    ],
    paginaComercial: {
      href: '/calcados/seguranca/',
      rotulo: 'Ver os calçados de segurança',
    },
    contexto: 'calcados-seguranca',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Li o texto sobre biqueira de composite e de aço e queria saber qual serve para a minha atividade.',
    perguntas: [
      {
        pergunta: 'Biqueira de composite pode trincar sem aparecer?',
        resposta:
          'Pode, e é a diferença que mais importa depois de um impacto forte. A biqueira de aço amassa e passa a pressionar os dedos, o que a pessoa percebe. A de composite pode perder resistência sem nenhum sinal por fora. Nos dois casos o par sai de uso.',
      },
      {
        pergunta: 'Biqueira de composite torna o calçado isolante elétrico?',
        resposta:
          'Não. O composite não conduz eletricidade, mas isolamento elétrico é propriedade do calçado inteiro, ensaiada e declarada no Certificado de Aprovação como requisito próprio. Se a atividade exige calçado isolante, é isso que precisa constar no CA.',
      },
      {
        pergunta: 'Qual biqueira passa no detector de metal?',
        resposta:
          'A de composite. Em linha de alimentos, farmacêutica ou qualquer entrada com portal detector, a de aço acusa a cada passagem.',
      },
    ],
    ctaTitulo: 'Em dúvida entre composite e aço para a sua atividade?',
    ctaTexto:
      'Diga onde a equipe trabalha, se há frio, eletricidade ou detector de metal, e quanto se caminha. A resposta vem com o modelo e o CA correspondente.',
  },
  {
    slug: 'grade-de-numeracao-como-definir-para-a-equipe',
    titulo: 'Como definir a grade de numeração de uma equipe',
    tituloSeo: 'Grade de numeração de calçado para equipe',
    resumo:
      'É o dado que mais falta num pedido de calçado para equipe, e o que mais gera troca depois. Como levantar número por número, provar antes e deixar uma reserva certa.',
    descricaoSeo:
      'Como levantar a numeração pessoa a pessoa, provar antes de fechar, montar a grade com reserva e registrar — para o pedido sair certo na primeira vez.',
    publicado: '2026-09-04',
    atualizado: '2026-09-04',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Calçados',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Grade de numeração é a lista de quantos pares de cada número a equipe precisa. É a primeira coisa que a gente pergunta em todo orçamento de calçado — e a que mais vem estimada, com "uns 40, uns 42". Grade estimada vira troca depois da entrega.',
      },
      {
        tipo: 'p',
        texto:
          'Num pedido de calçado para equipe, o item e a quantidade costumam vir certos. O que falta é o resto: doze pares, mas de que número? Sem a grade, o fornecedor não consegue responder preço e prazo — e, quando responde com uma grade chutada, a devolução chega junto com a entrega. Este texto é o método que usamos há trinta anos, para você fazer antes de pedir.',
      },
      {
        tipo: 'h2',
        texto: 'Por que estimar não funciona',
      },
      {
        tipo: 'p',
        texto:
          'Três coisas fazem a estimativa errar, e as três aparecem juntas. A numeração de calçado de segurança não é a do tênis — <a href="/conhecimento/botina-que-machuca-calcado-ou-numeracao/">a forma é mais reta e o cabedal mais firme</a>, então o número que a pessoa "sabe que usa" costuma não servir. A meia de trabalho é mais grossa que a comum e ocupa espaço real. E o pé de fim de turno, depois de horas em pé, não é o mesmo do começo da manhã.',
      },
      {
        tipo: 'p',
        texto:
          'O resultado de estimar é conhecido: parte da equipe recebe calçado que aperta, tira do pé no meio do turno, e o EPI que ficou no armário não protege ninguém.',
      },
      {
        tipo: 'h2',
        texto: 'O método, em cinco passos',
      },
      {
        tipo: 'h3',
        texto: '1. Levantar pessoa a pessoa, não por lembrança',
      },
      {
        tipo: 'p',
        texto:
          'Pergunte a cada pessoa o número — e, sempre que der, meça com a meia que ela vai usar no trabalho, de preferência no fim de um turno. Anote nome e número numa lista. Parece burocracia para uma equipe de oito; deixa de parecer no dia em que três pares voltam.',
      },
      {
        tipo: 'h3',
        texto: '2. Provar antes de fechar',
      },
      {
        tipo: 'p',
        texto:
          'Peça ao fornecedor um par de amostra do modelo escolhido por faixa de numeração e deixe a equipe experimentar. É o passo que ninguém quer fazer e o que mais evita troca: cada modelo tem uma forma, e o mesmo número pode calçar diferente de um modelo para outro — inclusive entre biqueira de aço e de composite, porque <a href="/conhecimento/biqueira-de-composite-ou-de-aco-qual-escolher/">a de composite é mais volumosa</a>.',
      },
      {
        tipo: 'h3',
        texto: '3. Separar forma feminina, quando houver',
      },
      {
        tipo: 'p',
        texto:
          'Calçado de segurança em forma feminina existe, com numeração e largura próprias. Quando a equipe tem mulheres, isso entra na grade como item separado — não como "o mesmo modelo no 35". Um modelo de forma masculina em numeração pequena costuma sobrar na largura e apertar no peito do pé.',
      },
      {
        tipo: 'h3',
        texto: '4. Somar por número: essa é a grade',
      },
      {
        tipo: 'p',
        texto:
          'Com a lista pronta, some quantas pessoas usam cada número. O resultado é a grade — e é ela que vai no pedido, não o total. Um exemplo, para ficar claro o formato:',
      },
      {
        tipo: 'tabela',
        cabecalho: ['Número', 'Pares', 'Quem'],
        linhas: [
          ['37', '1', 'Ana'],
          ['38', '2', 'Carlos, Denise'],
          ['39', '2', 'Eduardo, Fátima'],
          ['40', '3', 'Gustavo, Henrique, Ítalo'],
          ['41', '2', 'João, Kátia'],
          ['42', '1', 'Lucas'],
          ['43', '1', 'Marcos'],
          ['Total', '12', ''],
        ],
      },
      {
        tipo: 'p',
        texto:
          'Os nomes são de exemplo. A coluna "quem" não vai para o fornecedor — fica com você, porque é ela que resolve a entrega e a troca sem ninguém experimentar de novo.',
      },
      {
        tipo: 'h3',
        texto: '5. Deixar uma reserva certa, não uma reserva genérica',
      },
      {
        tipo: 'p',
        texto:
          'Reserva serve para admissão e para troca por dano. A regra que funciona é um par a mais nos números mais frequentes <em>da sua equipe</em> — os que a grade acima mostra —, e nenhum a mais nas pontas. Reserva "de um par de cada número" é a maneira mais cara de guardar calçado que ninguém vai usar.',
      },
      {
        tipo: 'h2',
        texto: 'Registrar junto com a entrega',
      },
      {
        tipo: 'p',
        texto:
          'A lista de nome e número é a mesma que alimenta a <a href="/conhecimento/ficha-de-entrega-de-epi-o-que-precisa-constar/">ficha de entrega de EPI</a>. Anotar a numeração ali evita o segundo levantamento na reposição: quando o par de alguém vencer ou estragar, o número já está registrado, e o pedido de troca sai sem perguntar de novo.',
      },
      {
        tipo: 'h2',
        texto: 'Revisar a cada reposição',
      },
      {
        tipo: 'p',
        texto:
          'Grade não é fixa. Gente entra, gente sai, e um modelo trocado pode calçar diferente do anterior. Essa mesma rotatividade é uma das três parcelas de <a href="/conhecimento/quantos-pares-por-ano-calcular-a-reposicao/">quantos pares comprar no ano</a>. A cada pedido de reposição, confira a lista contra a equipe de hoje — leva minutos e é o que mantém a grade certa depois da primeira compra.',
      },
      {
        tipo: 'h2',
        texto: 'Como mandar a grade',
      },
      {
        tipo: 'p',
        texto:
          'Número por número, com a quantidade de pares de cada um. O <a href="/orcamento/">construtor de orçamento</a> deste site pede exatamente isso, par a par, e monta a mensagem pronta para o WhatsApp — com a grade preenchida, a resposta já vem com preço e prazo na primeira mensagem.',
      },
    ],
    fontes: [
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto atualizado)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
      {
        titulo: 'Requisitos para calçados de segurança e ocupacionais — Target Normas',
        url: 'https://www.normas.com.br/visualizar/artigo-tecnico/2532/os-requisitos-para-os-calcados-de-seguranca-e-ocupacionais',
      },
    ],
    paginaComercial: {
      href: '/orcamento/',
      rotulo: 'Montar o orçamento com a sua grade',
    },
    contexto: 'calcados',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Li o texto sobre grade de numeração e já tenho a lista da minha equipe. Posso mandar a grade para orçamento?',
    perguntas: [
      {
        pergunta: 'O que é grade de numeração?',
        resposta:
          'É a lista de quantos pares de cada número a equipe precisa. Não é o total do pedido: doze pares sem a grade não dizem quantos são 38 e quantos são 42.',
      },
      {
        pergunta: 'Dá para pedir orçamento sem a grade?',
        resposta:
          'Dá, e a resposta sai estimada. Com a grade preenchida, o preço e o prazo vêm já na primeira mensagem; sem ela, a troca costuma chegar junto com a entrega.',
      },
      {
        pergunta: 'Preciso separar forma feminina na grade?',
        resposta:
          'Sim, quando a equipe tem mulheres. Calçado de segurança em forma feminina tem numeração e largura próprias — um modelo masculino em numeração pequena sobra na largura e aperta no peito do pé.',
      },
    ],
    ctaTitulo: 'Já tem a grade da sua equipe?',
    ctaTexto:
      'Mande os números par a par, pelo construtor ou direto aqui. Com a grade na mão a resposta vem com preço e prazo na primeira mensagem — e sem grade, é a primeira coisa que vamos perguntar.',
  },
  {
    slug: 'quando-trocar-o-calcado-de-seguranca',
    titulo: 'Quando trocar o calçado de segurança',
    tituloSeo: 'Quando trocar o calçado de segurança',
    resumo:
      'Não existe prazo em norma: a troca é por condição. Os sinais que pedem substituição, o que a validade do CA realmente significa e como montar a conferência.',
    descricaoSeo:
      'A norma não dá prazo — dá condição. Os sinais que pedem troca, por que a validade do CA não é a vida útil do par e como incluir a conferência na rotina.',
    publicado: '2026-09-04',
    atualizado: '2026-09-04',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Calçados',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Não existe prazo fixo em norma para trocar calçado de segurança. A substituição é por condição, não por calendário — e a data de validade que aparece no Certificado de Aprovação não é a vida útil do par que está no pé de alguém.',
      },
      {
        tipo: 'p',
        texto:
          'É a pergunta que chega dos dois lados: do gestor que precisa programar a reposição e da pessoa que desconfia que o par dela já era. As duas respostas que circulam por aí — "um ano" e "quando vencer o CA" — estão erradas, e a segunda mais do que a primeira.',
      },
      {
        tipo: 'h2',
        texto: 'A norma não dá prazo, dá condição',
      },
      {
        tipo: 'p',
        texto:
          'A <a href="/conhecimento/nr-6-o-que-a-empresa-precisa-saber/">NR-6</a> exige que o EPI seja fornecido em perfeito estado de conservação e funcionamento, e que seja substituído imediatamente quando danificado ou extraviado. Isso é um critério de estado, não de tempo. Um par que rodou seis meses numa obra pode estar vencido antes de um que rodou dois anos num escritório de manutenção.',
      },
      {
        tipo: 'p',
        texto:
          'Por isso a resposta útil não é um número de meses: é uma lista do que olhar, e a disciplina de olhar.',
      },
      {
        tipo: 'h2',
        texto: 'Validade do CA não é vida útil do calçado',
      },
      {
        tipo: 'p',
        texto:
          'Essa confusão é a mais comum e a mais cara. O <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">Certificado de Aprovação</a> tem prazo de validade, e esse prazo é da aprovação <em>daquele modelo</em> — é o período em que ele pode ser comercializado como EPI aprovado. Não é uma data de vencimento estampada no par que a pessoa calça.',
      },
      {
        tipo: 'p',
        texto:
          'Na prática, isso significa duas coisas ao mesmo tempo — e uma delas com menos margem do que costuma parecer. Um calçado com o CA em dia pode estar impróprio hoje, se o solado estiver liso ou o cabedal rasgado: aí não há dúvida nenhuma, e a troca é pelo estado. Na direção contrária, o vencimento do CA daquele modelo não funciona como ordem de recolher o par do pé de quem já o usa — mas também não é assunto encerrado, e <a href="/conhecimento/ca-vencido-o-epi-pode-continuar-em-uso/">merece uma leitura à parte</a>. O CA responde por "este modelo foi aprovado"; o estado do par responde por "este calçado ainda protege".',
      },
      {
        tipo: 'h2',
        texto: 'Os sinais que pedem troca',
      },
      {
        tipo: 'tabela',
        cabecalho: ['O que observar', 'Por que importa', 'Quando trocar'],
        linhas: [
          ['Relevo do solado liso nas áreas de apoio', 'É o relevo que garante a aderência. Liso, o calçado escorrega em piso que antes segurava', 'Imediato onde escorregamento é o risco principal'],
          ['Solado descolando do cabedal', 'Entra água e produto, e o descolamento progride rápido', 'Imediato'],
          ['Biqueira à mostra ou deformada', 'Perdeu o revestimento ou levou impacto. Deformada, ela passa a pressionar os dedos', 'Imediato'],
          ['Furo, rasgo ou costura aberta no cabedal', 'Deixa de proteger contra respingo, perfurante lateral e entrada de material', 'Imediato'],
          ['Amortecimento sem resposta, sola interna achatada', 'A fadiga cresce e a pessoa começa a evitar o calçado', 'Programar a troca'],
          ['Contrafortes e forro internos rompidos', 'Machucam o calcanhar e o pé passa a se deslocar dentro do calçado', 'Programar a troca'],
          ['Calçado que levou impacto forte na biqueira', 'A proteção pode ter sido consumida sem sinal visível', 'Imediato, mesmo parecendo inteiro'],
          ['Contato com produto químico agressivo', 'Couro e adesivo podem estar comprometidos por dentro', 'Avaliar; na dúvida, trocar'],
        ],
      },
      {
        tipo: 'h2',
        texto: 'O sinal mais importante é o que ninguém olha',
      },
      {
        tipo: 'p',
        texto:
          'O solado é o item que mais decide a troca e o que menos se confere, porque fica virado para baixo. O ensaio de resistência ao escorregamento é feito com o calçado novo: <a href="/conhecimento/solado-antiderrapante-o-que-significa/">o relevo é justamente o que desgasta com o uso</a>. Se a queixa é de escorregamento, vale <a href="/conhecimento/botina-escorrega-o-que-fazer-antes-de-trocar/">separar antes o que é desgaste do que é ambiente</a>. Em cozinha, em área da saúde e em limpeza, onde o escorregamento é o acidente mais provável, esse é o critério de troca mais importante — mais do que a aparência geral do par.',
      },
      {
        tipo: 'p',
        texto:
          'Vale o hábito simples: virar o calçado e comparar o relevo da área de maior apoio com o da lateral, que quase não toca o chão. Se a diferença é grande, o par já perdeu boa parte do que tinha.',
      },
      {
        tipo: 'h2',
        texto: 'Depois de uma pancada forte, troque',
      },
      {
        tipo: 'p',
        texto:
          'Calçado que recebeu impacto real na biqueira sai de circulação, mesmo aparentando estar inteiro. Uma biqueira de aço amassada passa a pressionar os dedos, o que a pessoa percebe. Uma de composite pode ter trincado por dentro sem nenhum sinal por fora — a diferença entre as duas está em <a href="/conhecimento/biqueira-de-composite-ou-de-aco-qual-escolher/">biqueira de composite ou de aço</a>. Nos dois casos, a proteção já foi usada uma vez e não se recupera.',
      },
      {
        tipo: 'h2',
        texto: 'O que encurta a vida do par',
      },
      {
        tipo: 'lista',
        itens: [
          'Secar no sol forte ou perto de fonte de calor: resseca o couro e descola o solado.',
          'Lavar por dentro com frequência e guardar úmido: ataca costura, forro e adesivo.',
          'Usar o mesmo par todos os dias sem intervalo de secagem, em atividade que molha ou faz suar muito.',
          'Guardar amassado ou empilhado, que deforma o cabedal.',
          'Produto químico de limpeza pesada aplicado no calçado sem indicação do fabricante.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Conservação não é detalhe doméstico: a NR-6 trata a higienização e a manutenção como parte da obrigação, e um par bem cuidado dura mais — o que muda o custo anual da equipe inteira.',
      },
      {
        tipo: 'h2',
        texto: 'Uma conferência que cabe na rotina',
      },
      {
        tipo: 'p',
        texto:
          'Não precisa de sistema. Precisa de periodicidade e de alguém responsável. Uma conferência visual por mês, feita junto com outra rotina que já existe, resolve: virar o calçado e olhar o solado, olhar biqueira e costuras, e perguntar à pessoa se está incomodando. Essa última pergunta encontra mais problema que as outras duas juntas — e quando a resposta é sim, <a href="/conhecimento/botina-que-machuca-calcado-ou-numeracao/">nem sempre o caso é troca por desgaste</a>.',
      },
      {
        tipo: 'h2',
        texto: 'Na hora de repor',
      },
      {
        tipo: 'p',
        texto:
          'A troca entra na <a href="/conhecimento/ficha-de-entrega-de-epi-o-que-precisa-constar/">ficha de entrega de EPI</a>, com data e motivo — é o registro que demonstra que a substituição aconteceu quando precisava, e é dele que sai <a href="/conhecimento/quantos-pares-por-ano-calcular-a-reposicao/">o número de pares do ano seguinte</a>. E se a numeração da pessoa já estiver anotada na <a href="/conhecimento/grade-de-numeracao-como-definir-para-a-equipe/">grade da equipe</a>, o pedido sai sem ninguém precisar experimentar de novo.',
      },
    ],
    fontes: [
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto atualizado)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
      {
        titulo: 'Requisitos para calçados de segurança e ocupacionais — Target Normas',
        url: 'https://www.normas.com.br/visualizar/artigo-tecnico/2532/os-requisitos-para-os-calcados-de-seguranca-e-ocupacionais',
      },
    ],
    paginaComercial: {
      href: '/calcados/',
      rotulo: 'Ver os calçados que a Tower trabalha',
    },
    contexto: 'calcados',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Li o texto sobre quando trocar o calçado de segurança e queria ajuda para avaliar os pares da minha equipe.',
    perguntas: [
      {
        pergunta: 'Calçado de segurança tem prazo de validade?',
        resposta:
          'Não existe prazo fixo em norma. A substituição é por condição: a norma exige o EPI em perfeito estado de conservação e funcionamento, e a troca imediata quando ele estiver danificado.',
      },
      {
        pergunta: 'Quem decide a hora da troca?',
        resposta:
          'Na prática, a segurança do trabalho ou a chefia direta, com a informação de quem calça. A pessoa percebe o solado escorregando e o desconforto antes de qualquer inspeção — e o par só chega ao ponto de acidente quando essa informação não tem para onde ir.',
      },
      {
        pergunta: 'Quanto tempo dura uma botina de segurança?',
        resposta:
          'Depende inteiramente da atividade. Um par de obra pode acabar em seis meses e um de manutenção leve durar dois anos. Por isso a resposta útil é a lista do que olhar, e não um número de meses.',
      },
    ],
    ctaTitulo: 'Na dúvida se o par já passou da hora?',
    ctaTexto:
      'Mande uma foto do solado e diga há quanto tempo está em uso e em que atividade. Dá para dizer se é caso de troca — e, se for, já sai com a reposição.',
  },
  {
    slug: 'luva-para-produto-quimico-como-escolher',
    titulo: 'Como escolher luva pelo produto químico que você manuseia',
    tituloSeo: 'Luva para produto químico: como escolher',
    resumo:
      'Não existe luva que resista a tudo. O método é partir da ficha do produto — e não do catálogo. Como ler, o que perguntar e onde a escolha costuma falhar.',
    descricaoSeo:
      'O método que parte da ficha do produto químico, não do material da luva: concentração, tempo de contato, permeação e o que conferir no CA antes de comprar.',
    publicado: '2026-09-04',
    atualizado: '2026-09-04',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Não existe luva que resista a todo produto químico. A escolha certa começa na ficha do produto que a equipe usa — com nome, concentração e tempo de contato — e não no catálogo da luva. Quem parte do catálogo erra com frequência, e o erro não aparece: luva química falha por dentro, sem furo e sem sinal.',
      },
      {
        tipo: 'p',
        texto:
          'A <a href="/protecao/maos/">página de proteção das mãos</a> diz que a luva se escolhe pelo risco, e o texto sobre <a href="/conhecimento/luva-de-procedimento-nao-e-luva-de-limpeza/">luva de procedimento e luva de limpeza</a> diz que ela se escolhe pelo produto. Este aqui é o método: como sair de "usamos um saneante concentrado" para "esta luva, deste material, com este punho".',
      },
      {
        tipo: 'h2',
        texto: 'Por que o material sozinho não responde',
      },
      {
        tipo: 'p',
        texto:
          'Nitrílica, látex, neoprene, PVC, butílica e outras se comportam de forma diferente diante de cada substância. Uma nitrílica que segura bem um solvente pode se degradar rápido em contato com outro. E existem dois fenômenos distintos, que muita gente trata como um só:',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Degradação</strong> — o material se altera visivelmente: incha, endurece, amolece, fica pegajoso ou muda de cor. Dá para ver.',
          '<strong>Permeação</strong> — a substância atravessa a luva em nível molecular, sem furo e sem alterar a aparência. Não dá para ver, e é a que mais machuca porque a pessoa continua confiando na luva.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Fabricantes de luva publicam tabelas de resistência química por produto, com o tempo estimado até a substância atravessar o material. É esse tempo que define por quanto tempo aquela luva serve para aquela tarefa — e é ele que ninguém consulta.',
      },
      {
        tipo: 'h2',
        texto: 'O método, em cinco passos',
      },
      {
        tipo: 'h3',
        texto: '1. Ter a ficha do produto em mãos',
      },
      {
        tipo: 'p',
        texto:
          'Todo produto químico usado no trabalho deve ter uma FISPQ — Ficha de Informações de Segurança de Produtos Químicos, fornecida pelo fabricante. Ela tem uma seção específica de controle de exposição e proteção individual, e é ali que estão as recomendações de EPI para aquele produto. Se a empresa não tem a FISPQ dos produtos que usa, esse é o primeiro problema a resolver — e é o fornecedor do produto que deve entregá-la.',
      },
      {
        tipo: 'h3',
        texto: '2. Anotar o que muda a resposta',
      },
      {
        tipo: 'p',
        texto:
          'Quatro informações mudam completamente a luva indicada, e nenhuma delas está no nome do produto:',
      },
      {
        tipo: 'tabela',
        cabecalho: ['Informação', 'Por que muda a escolha'],
        linhas: [
          ['Produto e concentração', 'O mesmo produto diluído e concentrado exige resistências diferentes'],
          ['Tipo de contato', 'Respingo eventual e imersão da mão são cenários distintos'],
          ['Tempo de contato por vez', 'É o que se compara com o tempo de resistência da luva'],
          ['Temperatura', 'Calor acelera a permeação e reduz o tempo útil'],
        ],
      },
      {
        tipo: 'p',
        texto:
          'Sem essas quatro, qualquer recomendação é chute — inclusive a nossa. É por isso que a primeira resposta da Tower a um pedido de luva química costuma ser uma pergunta.',
      },
      {
        tipo: 'h3',
        texto: '3. Cruzar com a tabela de resistência do fabricante da luva',
      },
      {
        tipo: 'p',
        texto:
          'Com produto e concentração na mão, consulta-se a tabela de resistência química do modelo. O que se procura é o comportamento daquele material diante daquela substância e o tempo estimado de resistência. Se o tempo é menor que a exposição real da tarefa, a luva está errada para o caso — mesmo sendo uma boa luva.',
      },
      {
        tipo: 'h3',
        texto: '4. Definir espessura e comprimento do punho',
      },
      {
        tipo: 'p',
        texto:
          'Espessura maior costuma dar mais tempo de resistência e menos sensibilidade — é uma troca, não uma melhoria pura. O punho se define pelo alcance do contato: respingo na palma pede uma coisa; imersão até o antebraço, ou trabalho acima da linha do ombro, pede punho longo. Luva curta em tarefa de imersão faz o produto entrar por cima, e aí a luva vira o recipiente.',
      },
      {
        tipo: 'h3',
        texto: '5. Conferir no Certificado de Aprovação',
      },
      {
        tipo: 'p',
        texto:
          'O <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">CA</a> descreve para que o equipamento foi aprovado. Luva aprovada para manuseio geral não é luva aprovada para proteção química — são aprovações diferentes, e a descrição do CA diz qual é qual. É a conferência que fecha a escolha, e a que mais evita surpresa numa fiscalização.',
      },
      {
        tipo: 'h2',
        texto: 'Onde a escolha costuma falhar',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>A diluição.</strong> É o momento de maior concentração do produto e o de menor cuidado: quase sempre feito com a luva do dia a dia, não com a luva do concentrado.',
          '<strong>A mistura.</strong> Luva adequada para dois produtos separadamente pode não ser adequada para a mistura dos dois.',
          '<strong>Reutilizar luva já exposta.</strong> Depois do tempo de resistência, a substância está dentro do material. Lavar por fora não devolve a proteção.',
          '<strong>Guardar molhada por dentro.</strong> Vira exposição contínua da pele no uso seguinte.',
          '<strong>Uma luva para a operação inteira.</strong> Tarefas diferentes, com produtos diferentes, quase nunca se resolvem com um modelo só.',
          '<strong>Trocar de marca sem reconferir.</strong> Mesmo material, fabricante diferente, tabela de resistência diferente.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'A luva que a pessoa tira não protege',
      },
      {
        tipo: 'p',
        texto:
          'Vale repetir aqui o que vale para todo EPI: luva que escorrega, que aperta ou que tira a sensibilidade sai da mão na hora da tarefa delicada — que costuma ser justamente a de maior contato. Tamanho e pegada não são conforto, são condição para a proteção existir. Peça amostra e deixe a equipe usar antes de fechar a compra.',
      },
      {
        tipo: 'h2',
        texto: 'O que mandar para o fornecedor',
      },
      {
        tipo: 'p',
        texto:
          'Com isto, a resposta vem certa na primeira mensagem: o nome do produto químico e a concentração, se o contato é respingo ou imersão, quanto tempo dura o contato de cada vez, se há calor envolvido e quantas pessoas fazem a tarefa. Se tiver a FISPQ, mande junto — ela responde metade das perguntas sozinha.',
      },
      {
        tipo: 'destaque',
        texto:
          'Este texto é o método de escolha, e não substitui a avaliação de riscos da sua operação nem a orientação do profissional de segurança do trabalho responsável. Exposição química é assunto em que a ficha do produto e o laudo da empresa mandam mais que qualquer texto geral — inclusive este.',
      },
    ],
    fontes: [
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto atualizado)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
      {
        titulo: 'Equipamentos de Proteção Individual — Ministério do Trabalho e Emprego',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/equipamentos-de-protecao-individual',
      },
    ],
    paginaComercial: {
      href: '/protecao/maos/',
      rotulo: 'Ver proteção para as mãos',
    },
    contexto: 'protecao-maos',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Preciso de luva para produto químico e queria ajuda para escolher a partir do produto que a gente usa.',
    perguntas: [
      {
        pergunta: 'Onde consigo a ficha do produto químico?',
        resposta:
          'Com o fornecedor do produto. A FISPQ é obrigação de quem fabrica ou importa, e a seção de controle de exposição e proteção individual é a que traz as recomendações de EPI.',
      },
      {
        pergunta: 'Como sei por quanto tempo a luva aguenta o produto?',
        resposta:
          'Na tabela de resistência química do fabricante, que informa o tempo estimado até a substância atravessar aquele material. Se esse tempo é menor que a exposição real da tarefa, a luva está errada para o caso — mesmo sendo uma boa luva.',
      },
      {
        pergunta: 'Posso reutilizar luva que já teve contato com produto químico?',
        resposta:
          'Depois de passado o tempo de resistência daquele material àquela substância, não. A substância já está dentro do material, e lavar por fora não devolve a proteção.',
      },
    ],
    ctaTitulo: 'Diga qual produto a sua equipe manuseia',
    ctaTexto:
      'Com o nome do produto, a concentração e o tipo de contato, dá para indicar o material e o punho certos — e conferir o CA junto. Se tiver a FISPQ, mande que ela adianta metade.',
  },
  {
    slug: 'quantos-pares-por-ano-calcular-a-reposicao',
    titulo: 'Quantos pares por ano: como calcular a reposição',
    tituloSeo: 'Quantos pares de calçado por ano para a equipe',
    resumo:
      'Não existe número universal, e quem promete um está chutando. O número sai da sua própria operação — e ele já está na ficha de entrega, se ela estiver preenchida.',
    descricaoSeo:
      'A conta tem três parcelas: reposição programada, troca eventual e entrada de pessoal. Como tirar o número do seu próprio histórico e o que fazer no primeiro ano.',
    publicado: '2026-09-04',
    atualizado: '2026-09-04',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Calçados',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Não existe "tantos pares por pessoa por ano". A vida útil depende da atividade, do piso, da jornada e da conservação, e varia mais entre duas funções da mesma empresa do que entre duas empresas do mesmo setor. O número certo é o da SUA operação — e, se a ficha de entrega estiver preenchida, ele já está lá.',
      },
      {
        tipo: 'p',
        texto:
          'A pergunta chega sempre na mesma hora: montando o orçamento do ano. E a resposta que circula — um par por pessoa por ano — erra nos dois sentidos ao mesmo tempo, o que é raro e caro.',
      },
      {
        tipo: 'h2',
        texto: 'Por que "um par por ano" erra dos dois lados',
      },
      {
        tipo: 'p',
        texto:
          'Numa equipe de obra ou de manutenção pesada, um par por ano costuma faltar: o calçado sai de uso antes, e quem não previu a segunda troca acaba deixando alguém trabalhando com o par vencido enquanto a compra não sai. Numa equipe administrativa com calçado ocupacional, um par por ano costuma sobrar: par novo entregue com o anterior ainda em condição de uso é dinheiro parado no armário.',
      },
      {
        tipo: 'p',
        texto:
          'O mesmo número, aplicado às duas, produz falta de um lado e desperdício do outro. E as duas equipes costumam estar na mesma empresa.',
      },
      {
        tipo: 'h2',
        texto: 'A conta tem três parcelas, não uma',
      },
      {
        tipo: 'p',
        texto:
          'A maioria dos orçamentos só considera a primeira, e é por isso que estoura no meio do ano.',
      },
      {
        tipo: 'tabela',
        cabecalho: ['Parcela', 'O que é', 'Como estimar'],
        linhas: [
          ['Reposição programada', 'A troca que acontece porque o par chegou ao fim da vida útil', 'Pelo histórico: quantas trocas por função aconteceram no último ano'],
          ['Troca eventual', 'Dano, perda, acidente, produto químico derramado', 'Também pelo histórico. Costuma ser a parcela mais esquecida'],
          ['Entrada de pessoal', 'Admissão e substituição ao longo do ano', 'Pela rotatividade da função, com a área de pessoal'],
        ],
      },
      {
        tipo: 'p',
        texto:
          'Somadas por função, e não pela empresa inteira, as três dão o número do ano. Somar pela empresa inteira devolve uma média que não descreve ninguém.',
      },
      {
        tipo: 'h2',
        texto: 'De onde tirar o número: o seu próprio histórico',
      },
      {
        tipo: 'p',
        texto:
          'Se a <a href="/conhecimento/ficha-de-entrega-de-epi-o-que-precisa-constar/">ficha de entrega de EPI</a> registra data e motivo de cada entrega, a resposta já existe. Basta contar, por função, quantas entregas de calçado aconteceram nos últimos doze meses e dividir pelo número de pessoas naquela função.',
      },
      {
        tipo: 'p',
        texto:
          'É o dado mais confiável que existe sobre a sua operação, porque foi medido nela. Nenhuma estimativa de fornecedor, inclusive a nossa, chega perto disso — e é por isso que a ficha bem preenchida vale muito além da fiscalização.',
      },
      {
        tipo: 'h2',
        texto: 'O que puxa a vida útil para cada lado',
      },
      {
        tipo: 'p',
        texto:
          'Sem números, porque número sem medição na sua operação seria invenção. O que segue é a direção de cada fator, para você saber o que olhar quando duas funções derem resultados diferentes.',
      },
      {
        tipo: 'tabela',
        cabecalho: ['Fator', 'Encurta a vida do par', 'Prolonga'],
        linhas: [
          ['Piso', 'Abrasivo, irregular, com material perfurante', 'Liso e íntegro'],
          ['Jornada', 'Muitas horas em pé e alta quilometragem diária', 'Deslocamento curto'],
          ['Umidade', 'Molha todo dia e não seca entre os turnos', 'Ambiente seco, ou dois pares em rodízio'],
          ['Produto químico', 'Contato frequente com solvente, óleo ou saneante', 'Sem contato'],
          ['Conservação', 'Secagem no sol, guarda amassado, limpeza agressiva', 'Rotina de limpeza e secagem adequada'],
          ['Adequação do modelo', 'Calçado errado para a atividade, que se desgasta fora do previsto', 'Modelo compatível com o uso real'],
        ],
      },
      {
        tipo: 'h2',
        texto: 'E no primeiro ano, sem histórico?',
      },
      {
        tipo: 'p',
        texto:
          'Aí a estimativa é inevitável — e o jeito de errar menos é começar pela função mais exigente e não pela média. Estime a reposição das funções de campo separadamente das administrativas, deixe a reserva calculada sobre as primeiras, e trate o primeiro ano como o ano de levantar o dado, não de acertar o número.',
      },
      {
        tipo: 'p',
        texto:
          'Isso significa registrar cada entrega com data e motivo desde o primeiro par. No ano seguinte, a conta deixa de ser estimativa.',
      },
      {
        tipo: 'h2',
        texto: 'Os dois erros que estouram o orçamento no meio do ano',
      },
      {
        tipo: 'p',
        texto:
          '<strong>Não contar a entrada de pessoal.</strong> Numa função com rotatividade alta, a admissão pode responder por uma parcela grande do consumo anual, e ela não aparece em nenhuma conta que parta só do quadro atual.',
      },
      {
        tipo: 'p',
        texto:
          '<strong>Reserva genérica.</strong> Guardar um par de cada número parece prudente e é a maneira mais cara de estocar calçado que ninguém vai usar. A reserva útil se concentra nos números mais frequentes da sua equipe, que a <a href="/conhecimento/grade-de-numeracao-como-definir-para-a-equipe/">grade de numeração</a> mostra de imediato.',
      },
      {
        tipo: 'h2',
        texto: 'Comprar o ano inteiro de uma vez?',
      },
      {
        tipo: 'p',
        texto:
          'Costuma não valer. Além de imobilizar capital, trava a grade num retrato da equipe que muda — quem entra e quem sai ao longo do ano muda a distribuição de numeração, e o estoque comprado em janeiro pode não servir a quem chegou em julho. Compra parcelada com a grade revisada a cada pedido acompanha a equipe real.',
      },
      {
        tipo: 'h2',
        texto: 'Antes de somar, confira se a troca era necessária',
      },
      {
        tipo: 'p',
        texto:
          'Uma parte do consumo anual costuma ser troca antecipada: par substituído por incômodo que era numeração errada, ou por escorregamento que era do piso e não do solado. Vale conferir os critérios em <a href="/conhecimento/quando-trocar-o-calcado-de-seguranca/">quando trocar o calçado de segurança</a> antes de fechar o número do ano — às vezes a reposição cai sem ninguém comprar nada.',
      },
    ],
    fontes: [
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto atualizado)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
      {
        titulo: 'Equipamentos de Proteção Individual — Ministério do Trabalho e Emprego',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/equipamentos-de-protecao-individual',
      },
    ],
    paginaComercial: {
      href: '/orcamento/',
      rotulo: 'Montar o pedido de reposição',
    },
    contexto: 'orcamento',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Li o texto sobre reposição e queria ajuda para dimensionar a compra de calçado do ano da minha equipe.',
    ctaTitulo: 'Precisa fechar o número do ano?',
    ctaTexto:
      'Diga as funções, quantas pessoas em cada uma e como é o ambiente. Dá para chegar a uma estimativa de reposição junto — e ela melhora muito se você tiver o histórico das entregas.',
    perguntas: [
      {
        pergunta: 'Quantos pares de calçado por funcionário por ano?',
        resposta:
          'Não existe número universal, e quem dá um está chutando. Depende da atividade, do piso, da jornada e da conservação. O número da sua operação sai do histórico de entregas dos últimos doze meses, contado por função e não pela empresa inteira.',
      },
      {
        pergunta: 'Vale comprar o ano inteiro de uma vez?',
        resposta:
          'Costuma não valer. Imobiliza capital e trava a grade num retrato da equipe que vai mudar: quem entra e quem sai ao longo do ano muda a distribuição de numeração, e o que foi comprado em janeiro pode não servir a quem chegou em julho.',
      },
      {
        pergunta: 'Como sei se a equipe está trocando cedo demais?',
        resposta:
          'Comparando o motivo registrado na ficha com os critérios de troca por condição. Boa parte da troca antecipada é par substituído por incômodo que era numeração errada, ou por escorregamento que vinha do piso e não do solado.',
      },
    ],
  },
  {
    slug: 'botina-escorrega-o-que-fazer-antes-de-trocar',
    titulo: 'Botina escorrega: o que fazer antes de trocar',
    tituloSeo: 'Botina escorregando: antes de trocar',
    resumo:
      'Escorregar quase nunca começa no calçado. Começa no piso, no produto de limpeza ou na gordura acumulada na própria sola — e dá para descobrir hoje, sem comprar nada.',
    descricaoSeo:
      'A ordem de investigação quando o calçado passa a escorregar: o que mudou, limpar a sola, o produto do piso, e só então o calçado. Com o que não resolve.',
    publicado: '2026-09-04',
    atualizado: '2026-09-04',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Calçados',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Quando um calçado que segurava passa a escorregar, alguma coisa mudou — e na maioria das vezes não foi o calçado. Antes de trocar, vale descobrir o quê: a investigação leva minutos, e a troca sem ela pode repetir o problema com um par novo.',
      },
      {
        tipo: 'p',
        texto:
          'Aderência é uma relação entre duas superfícies, com o que estiver entre elas. Isso significa três suspeitos, não um: o calçado, o piso e o que está no meio — água, gordura, poeira ou resíduo de produto de limpeza. Trocar o calçado resolve um terço dos casos possíveis, e é o mais caro dos três.',
      },
      {
        tipo: 'h2',
        texto: 'A pergunta que abre a investigação: o que mudou?',
      },
      {
        tipo: 'p',
        texto:
          'Se antes segurava e agora não segura, houve mudança em algum ponto. A resposta costuma estar nesta lista.',
      },
      {
        tipo: 'tabela',
        cabecalho: ['O que investigar', 'Sinal de que é isso', 'O que fazer'],
        linhas: [
          ['Sola suja ou engordurada', 'Escorrega em qualquer piso, inclusive fora do trabalho', 'Limpar a sola a fundo e testar de novo'],
          ['Produto de limpeza do piso', 'Começou depois que a empresa trocou de produto ou de fornecedor', 'Conferir diluição e enxágue com a equipe de limpeza'],
          ['Diluição errada do mesmo produto', 'Piso "brilhoso" ou pegajoso depois de seco', 'Rever a dosagem: excesso deixa película'],
          ['Piso novo ou reformado', 'Coincide com obra, troca de revestimento ou impermeabilização', 'O calçado pode não ser o certo para o piso novo'],
          ['Contaminante novo no processo', 'Passou a haver óleo, farinha, pó ou água onde não havia', 'Rever o modelo para o contaminante atual'],
          ['Desgaste do solado', 'O relevo está liso nas áreas de maior apoio', 'Aí sim é troca de calçado'],
          ['Modelo errado desde o início', 'Escorrega desde o primeiro dia, não "passou a escorregar"', 'Rever a classe contra o piso e o contaminante'],
        ],
      },
      {
        tipo: 'h2',
        texto: 'Limpe a sola antes de julgá-la',
      },
      {
        tipo: 'p',
        texto:
          'É o passo mais simples e o mais pulado. Gordura, resíduo de produto e poeira compactada preenchem o relevo do solado e anulam exatamente a parte que gera aderência — o desenho continua lá, mas está entupido. Em cozinha e em área de produção isso acontece em semanas.',
      },
      {
        tipo: 'p',
        texto:
          'Lave a sola com escova e detergente comum, enxágue e deixe secar. Se a aderência volta, o problema era esse, e a solução é rotina de limpeza da sola — não par novo.',
      },
      {
        tipo: 'h2',
        texto: 'O produto de limpeza do piso é suspeito frequente',
      },
      {
        tipo: 'p',
        texto:
          'Produto em excesso, ou aplicado sem enxágue, deixa uma película no piso que reduz a aderência de qualquer solado. É a causa que mais passa despercebida porque ninguém liga uma coisa à outra: a troca de fornecedor de saneante aconteceu no mês passado, e a queixa de escorregamento chegou esta semana.',
      },
      {
        tipo: 'p',
        texto:
          'Vale conversar com quem limpa antes de comprar calçado. Diluição correta e enxágue costumam devolver o piso ao que era, e saem de graça.',
      },
      {
        tipo: 'h2',
        texto: 'O teste que dá para fazer hoje',
      },
      {
        tipo: 'lista',
        itens: [
          'Vire o calçado e compare o relevo da área de maior apoio com o de uma lateral que quase não toca o chão. Diferença grande é desgaste, e desgaste é troca.',
          'Passe a mão no piso já seco depois da limpeza. Se ficar sensação de película ou de escorregadio, o suspeito é o produto, não o calçado.',
          'Teste o mesmo calçado num piso diferente. Se lá segura, o problema está no piso ou no que há sobre ele.',
          'Pergunte se a queixa é de uma pessoa ou da equipe. Uma pessoa aponta para o par dela; a equipe inteira aponta para o ambiente.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O que não resolve, e o que piora',
      },
      {
        tipo: 'p',
        texto:
          '<strong>Lixar a sola não melhora a aderência.</strong> O que segura é o desenho do relevo e o material da superfície de contato; lixar remove os dois e deixa uma superfície mais lisa do que a original. É a dica ruim mais repetida sobre o assunto.',
      },
      {
        tipo: 'p',
        texto:
          'Spray, fita e produtos aplicados no solado também não. Nenhum deles é ensaiado com o calçado, nenhum consta no Certificado de Aprovação e todos alteram a superfície que foi aprovada. Se o solado não serve mais, o caminho é o par novo — improviso em EPI é risco somado ao risco.',
      },
      {
        tipo: 'h2',
        texto: 'Quando é o calçado mesmo',
      },
      {
        tipo: 'p',
        texto:
          'Duas situações. A primeira é desgaste, que a comparação do relevo mostra. A segunda é modelo incompatível desde o começo — nesse caso o calçado nunca segurou, e a queixa não é "passou a escorregar", é "sempre escorregou". Aí a pergunta é qual ensaio o modelo atende contra o piso e o contaminante reais, e isso está explicado em <a href="/conhecimento/solado-antiderrapante-o-que-significa/">o que significa antiderrapante</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Se for troca por desgaste, os demais sinais que pedem substituição estão em <a href="/conhecimento/quando-trocar-o-calcado-de-seguranca/">quando trocar o calçado de segurança</a> — vale conferir o par inteiro de uma vez, e não só a sola.',
      },
    ],
    fontes: [
      {
        titulo: 'Requisitos para calçados de segurança e ocupacionais — Target Normas',
        url: 'https://www.normas.com.br/visualizar/artigo-tecnico/2532/os-requisitos-para-os-calcados-de-seguranca-e-ocupacionais',
      },
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto atualizado)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
    ],
    paginaComercial: {
      href: '/calcados/antiderrapantes/',
      rotulo: 'Ver os calçados antiderrapantes',
    },
    contexto: 'calcados-antiderrapantes',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. O calçado da equipe está escorregando e queria ajuda para descobrir se é desgaste, piso ou modelo errado.',
    ctaTitulo: 'A equipe está escorregando?',
    ctaTexto:
      'Diga como é o piso, o que cai nele e há quanto tempo o par está em uso. Dá para separar o que é desgaste do que é ambiente antes de trocar par nenhum.',
    perguntas: [
      {
        pergunta: 'Lixar a sola melhora a aderência?',
        resposta:
          'Não, piora. O que segura é o desenho do relevo e a superfície de contato do solado; lixar remove os dois e deixa o calçado mais liso do que era. É a dica ruim mais repetida sobre o assunto.',
      },
      {
        pergunta: 'Calçado novo pode escorregar?',
        resposta:
          'Pode, e nesse caso a queixa não é "passou a escorregar" e sim "sempre escorregou". Aponta para modelo incompatível com o piso ou com o contaminante do ambiente, e não para desgaste. A verificação é qual ensaio o modelo atende.',
      },
      {
        pergunta: 'Escorregar é sempre problema do calçado?',
        resposta:
          'Não. Aderência é uma relação entre o solado, o piso e o que estiver entre os dois. Sola engordurada, película de produto de limpeza mal enxaguado e contaminante novo no processo derrubam a aderência de qualquer calçado aprovado.',
      },
    ],
  },
  {
    slug: 'empresa-pode-descontar-epi-do-salario',
    titulo: 'A empresa pode descontar EPI do salário?',
    tituloSeo: 'Pode descontar EPI do salário?',
    resumo:
      'A parte que a NR-6 responde não tem margem: o EPI é fornecido gratuitamente. A discussão sobre desconto começa depois disso — e quase sempre onde falta registro.',
    descricaoSeo:
      'O que a NR-6 resolve sem margem, o que fica para o direito do trabalho e o que evita a discussão no dia a dia. Sem parecer jurídico, com a fonte oficial.',
    publicado: '2026-09-04',
    atualizado: '2026-09-04',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Normas',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'O EPI é fornecido gratuitamente, e isso não depende de acordo: o custo do equipamento adequado ao risco não é do trabalhador. A discussão sobre desconto começa fora da NR-6, tem regra própria e não suspende a obrigação de fornecer nem a de substituir.',
      },
      {
        tipo: 'p',
        texto:
          'A pergunta chega dos dois lados. Do gestor que viu o terceiro par sumir no mesmo semestre e quer saber até onde pode ir, e da pessoa que recebeu o contracheque com uma linha que não reconhece. As duas versões que circulam — "pode descontar" e "nunca pode descontar nada" — tratam como uma pergunta só o que são duas, com respostas de qualidade bem diferente.',
      },
      {
        tipo: 'h2',
        texto: 'A parte que a norma responde, e responde sem margem',
      },
      {
        tipo: 'p',
        texto:
          'A <a href="/conhecimento/nr-6-o-que-a-empresa-precisa-saber/">NR-6</a> obriga a empresa a fornecer ao empregado, gratuitamente, o EPI adequado ao risco da atividade e em perfeito estado de conservação e funcionamento. "Gratuitamente" está no texto da norma, e não é uma condição que se negocia: o custo do equipamento é da empresa porque a obrigação de proteger é da empresa.',
      },
      {
        tipo: 'p',
        texto:
          'O que decorre disso, e costuma ser esquecido, é que a gratuidade não termina na primeira entrega:',
      },
      {
        tipo: 'lista',
        itens: [
          'O equipamento adequado ao risco — não o mais barato que existe, o adequado.',
          'A substituição imediata quando o EPI é danificado ou extraviado.',
          'A higienização e a manutenção periódica.',
          'A orientação e o treinamento sobre uso, guarda e conservação.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Nenhum desses quatro é despesa do trabalhador, e nenhum deles fica suspenso enquanto a empresa decide o que fazer a respeito de um par perdido.',
      },
      {
        tipo: 'h2',
        texto: 'De onde nasce a dúvida',
      },
      {
        tipo: 'p',
        texto:
          'A mesma NR-6 atribui deveres a quem usa: usar o equipamento apenas para a finalidade a que se destina, responsabilizar-se pela guarda e pela conservação, comunicar qualquer alteração que o torne impróprio para uso. É daí que sai o raciocínio de que, se a guarda é do trabalhador, a perda também seria — e é aí que o salto acontece.',
      },
      {
        tipo: 'p',
        texto:
          'A NR-6 não trata de desconto em folha. Ela diz o que a empresa fornece e o que o trabalhador faz com o que recebeu. Se um valor pode ou não ser descontado, em que hipótese e com qual formalidade, é matéria de direito do trabalho — e a resposta depende do caso, do que está escrito no contrato e do que a convenção coletiva da categoria estabelece.',
      },
      {
        tipo: 'p',
        texto:
          '<strong>Este texto não é parecer jurídico e não substitui um.</strong> A Tower vende EPI e ajuda a especificar EPI; a decisão sobre desconto em folha é do advogado da empresa, com o caso concreto na mão.',
      },
      {
        tipo: 'h2',
        texto: 'O que não muda em nenhuma hipótese',
      },
      {
        tipo: 'p',
        texto:
          'Mesmo que a empresa entenda que tem base para cobrar, a obrigação de substituir imediatamente o EPI danificado ou extraviado continua de pé. São duas decisões separadas, e elas não têm a mesma urgência: repor é hoje, porque enquanto não houver reposição existe alguém trabalhando exposto ao risco que o equipamento cobria. Discutir o valor é depois.',
      },
      {
        tipo: 'p',
        texto:
          'Essa é também a leitura prática de quem fiscaliza. Um trabalhador sem o EPI da função é constatável na hora; o motivo pelo qual ele está sem, não.',
      },
      {
        tipo: 'h2',
        texto: 'O que resolve isso antes de virar discussão',
      },
      {
        tipo: 'p',
        texto:
          'Na operação, a conversa sobre desconto quase sempre aparece onde falta registro ou onde o item entregue não era o certo. Vale olhar a causa antes da cobrança — na maioria dos casos ela é barata de corrigir e não volta.',
      },
      {
        tipo: 'tabela',
        cabecalho: ['Onde a discussão nasce', 'O que costuma estar por trás', 'O que evita'],
        linhas: [
          ['"Ele perde um par por mês"', 'Numeração errada ou modelo desconfortável — o par não foi perdido, foi abandonado', 'Conferir a numeração e ouvir a queixa antes de repor o mesmo item'],
          ['"Sumiu e ninguém sabe"', 'Não existe registro de quem recebeu o quê, quando e com qual CA', 'Ficha de entrega assinada, com data e número do CA'],
          ['"Estragou em um mês"', 'Modelo incompatível com o ambiente, e não mau uso', 'Rever a especificação pelo risco real da atividade'],
          ['"Levou para casa e não trouxe"', 'A orientação sobre guarda nunca foi dada nem registrada', 'Registrar a orientação junto com a entrega'],
        ],
      },
      {
        tipo: 'p',
        texto:
          'Os quatro se resolvem no mesmo lugar. A <a href="/conhecimento/ficha-de-entrega-de-epi-o-que-precisa-constar/">ficha de entrega de EPI</a> é o documento que mostra o que foi entregue a quem e em que data, e é ele que transforma "sumiu" em um fato verificável. Quando a queixa é de par que machuca ou que dura pouco, o caminho costuma passar por <a href="/conhecimento/grade-de-numeracao-como-definir-para-a-equipe/">acertar a grade de numeração</a> antes de qualquer outra coisa.',
      },
      {
        tipo: 'h2',
        texto: 'Quando a pergunta é para o advogado',
      },
      {
        tipo: 'lista',
        itens: [
          'Quando existe intenção de descontar valor por dano, perda ou não devolução.',
          'Quando o desconto está previsto — ou proibido — em acordo individual, acordo coletivo ou convenção coletiva da categoria.',
          'Quando a discussão aparece na rescisão.',
          'Quando já existe reclamação, notificação ou processo em curso.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Em todos esses casos a resposta certa depende de documento, e o documento que mais pesa é o registro de entrega. Empresa que entrega EPI com ficha assinada, na numeração certa e com orientação registrada chega nessa conversa em outra posição — e, na prática, chega nela muito menos vezes.',
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
      href: '/empresas/como-atendemos/',
      rotulo: 'Ver como a Tower atende empresas',
    },
    contexto: 'empresas',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Queria organizar a entrega e a reposição de EPI da equipe para não ter discussão de perda e de desconto.',
    ctaTitulo: 'A reposição está virando discussão?',
    ctaTexto:
      'Conte como é a entrega hoje e quantas pessoas recebem EPI. Dá para ajustar especificação, numeração e periodicidade de reposição antes de o assunto chegar ao contracheque.',
    perguntas: [
      {
        pergunta: 'E se o funcionário perder ou danificar o EPI?',
        resposta:
          'A substituição continua sendo obrigação da empresa, e imediata — a NR-6 manda substituir quando o EPI é danificado ou extraviado, sem condicionar isso a apurar culpa antes. Se cabe alguma cobrança pelo valor é uma segunda pergunta, de direito do trabalho, e ela não adia a reposição.',
      },
      {
        pergunta: 'Descontar muda a obrigação de substituir o item?',
        resposta:
          'Não. São decisões separadas e com urgências diferentes. Enquanto não houver reposição existe uma pessoa trabalhando sem a proteção que a atividade exige, e é isso que uma fiscalização constata na hora.',
      },
      {
        pergunta: 'O que evita a discussão sobre desconto no dia a dia?',
        resposta:
          'Registro e especificação certa. Ficha de entrega assinada com data e número do CA, numeração conferida com cada pessoa e orientação de guarda registrada junto com a entrega. A maior parte dos casos de "sumiu" e "estragou rápido" tem uma dessas três causas.',
      },
    ],
  },
  {
    slug: 'ca-vencido-o-epi-pode-continuar-em-uso',
    titulo: 'CA vencido: o EPI pode continuar em uso?',
    tituloSeo: 'CA vencido: pode continuar usando?',
    resumo:
      'A resposta muda conforme o momento. Comprar com CA vencido está fora de questão; um item já entregue e íntegro é uma pergunta mais longa — e a resposta honesta não é um sim seco.',
    descricaoSeo:
      'O que o vencimento do CA significa na compra, na prateleira e no par que já está no pé de alguém. Com a consulta oficial e o que fazer em cada situação.',
    publicado: '2026-09-04',
    atualizado: '2026-09-04',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Normas',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Depende de onde o item está. Comprar ou entregar EPI com o CA vencido está fora de questão. Um par já entregue e em bom estado não vira impróprio na data em que o CA do modelo vence — mas essa data é o aviso de que a reposição daquele modelo precisa ser resolvida, e não um assunto encerrado.',
      },
      {
        tipo: 'p',
        texto:
          'Esta é uma pergunta que parece ter resposta de sim ou não e não tem. Boa parte do que se lê por aí escolhe um dos dois extremos: ou "vencido não pode, recolhe tudo hoje", ou "o CA é do modelo, então em uso não muda nada". O primeiro gera descarte de equipamento íntegro; o segundo trata como resolvido um ponto que a norma simplesmente não enfrenta.',
      },
      {
        tipo: 'h2',
        texto: 'Primeiro, o que o CA é',
      },
      {
        tipo: 'p',
        texto:
          'O <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">Certificado de Aprovação</a> é do modelo, não do par. Ele diz que aquele equipamento, daquele fabricante ou importador, foi aprovado para uma finalidade descrita — e tem um prazo. Esse prazo é da aprovação do modelo no mercado. Não é uma data de vencimento estampada no item que a pessoa calça, veste ou respira.',
      },
      {
        tipo: 'p',
        texto:
          'Confundir os dois prazos é o erro que faz a pergunta parecer difícil. Um item pode ter CA em dia e já não proteger; e o CA de um modelo pode vencer com um par inteiro dentro da caixa.',
      },
      {
        tipo: 'h2',
        texto: 'A parte da resposta que não tem dúvida',
      },
      {
        tipo: 'p',
        texto:
          'EPI só pode ser posto à venda ou utilizado com a indicação do Certificado de Aprovação. Isso vale para quem vende e para quem compra e fornece à equipe. Na prática: <strong>item que ainda vai ser adquirido, recebido ou entregue precisa ter certificado vigente</strong>. Aqui não há leitura alternativa, e é o ponto que mais aparece em fiscalização, porque é o mais fácil de verificar — basta a nota, a ficha e a consulta.',
      },
      {
        tipo: 'h2',
        texto: 'A parte que exige cuidado',
      },
      {
        tipo: 'p',
        texto:
          'O que a NR-6 exige do EPI em uso é outra coisa: que seja adequado ao risco, que esteja em perfeito estado de conservação e funcionamento e que seja substituído imediatamente quando danificado ou extraviado. São critérios de adequação e de estado, e o vencimento do CA do modelo não aparece entre eles.',
      },
      {
        tipo: 'p',
        texto:
          'Vale dizer com clareza o que isso é e o que não é. <strong>Não existe na norma um dispositivo que autorize expressamente seguir usando o que já foi entregue.</strong> O que existe é ausência de regra mandando recolher — e ausência de proibição não é a mesma coisa que permissão escrita. Por isso a resposta honesta é que o vencimento do CA não funciona como gatilho de recolhimento imediato, e não que "pode usar até acabar".',
      },
      {
        tipo: 'p',
        texto:
          'O que costuma decidir a questão, quando ela é levantada, é outro dado: se o certificado estava vigente no momento da compra e da entrega. É esse registro que mostra que a empresa forneceu equipamento aprovado — e é ele que a <a href="/conhecimento/ficha-de-entrega-de-epi-o-que-precisa-constar/">ficha de entrega</a> guarda, quando traz o número do CA e a data.',
      },
      {
        tipo: 'h2',
        texto: 'O que fazer quando o CA de um item em uso vence',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Consultar a situação atual no sistema oficial</strong>, pelo número do CA. É o primeiro passo e o mais pulado — a informação que circula internamente costuma estar velha.',
          '<strong>Confirmar com o fornecedor ou o fabricante</strong> qual é a situação daquele modelo e o que ele indica no lugar.',
          '<strong>Conferir o estado do par</strong>, que é uma verificação independente e pode tornar a discussão desnecessária: se ele já está gasto, a troca acontece por outro motivo.',
          '<strong>Programar a reposição por modelo com certificado vigente</strong>, em vez de improvisar. Reposição planejada evita tanto o descarte precoce quanto a compra às pressas do que estiver disponível.',
          '<strong>Registrar a decisão e a data</strong>, junto com a ficha. O que não está escrito não conta depois.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O erro na direção contrária',
      },
      {
        tipo: 'p',
        texto:
          'Tão comum quanto recolher item bom é o oposto: tratar o CA em dia como prova de que o equipamento ainda protege. Não é. O ensaio que aprovou o modelo foi feito com o produto novo, e <a href="/conhecimento/solado-antiderrapante-o-que-significa/">o relevo do solado é justamente o que desgasta com o uso</a>. Um calçado com CA vigente e sola lisa é um calçado que não protege, com certificado válido. Os sinais que pedem troca estão em <a href="/conhecimento/quando-trocar-o-calcado-de-seguranca/">quando trocar o calçado de segurança</a>.',
      },
      {
        tipo: 'tabela',
        cabecalho: ['Situação', 'O que ela diz', 'O que fazer'],
        linhas: [
          ['CA vigente, item íntegro', 'Modelo aprovado e equipamento em condições', 'Nada — é o estado esperado'],
          ['CA vigente, item gasto ou danificado', 'A aprovação é do modelo; este exemplar já não cumpre', 'Substituir pelo estado'],
          ['CA vencido, item ainda em estoque', 'Não pode ser fornecido nesse estado', 'Consultar a situação e falar com o fornecedor antes de entregar'],
          ['CA vencido, item em uso e íntegro', 'Não é gatilho de recolhimento, é aviso de reposição', 'Conferir se houve renovação e programar a substituição do modelo'],
          ['CA vencido e item gasto', 'As duas razões apontam para o mesmo lado', 'Substituir'],
        ],
      },
      {
        tipo: 'p',
        texto:
          'A leitura que atravessa a tabela inteira é sempre a mesma: o CA responde por "este modelo foi aprovado", e o estado do item responde por "isto ainda protege". As duas perguntas precisam de resposta, e nenhuma das duas responde pela outra.',
      },
    ],
    fontes: [
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto oficial, PDF)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
    ],
    paginaComercial: {
      href: '/empresas/',
      rotulo: 'Ver soluções para empresas',
    },
    contexto: 'empresas',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Encontrei EPI com o CA vencido aqui e queria ajuda para saber o que substituir e por qual modelo.',
    ctaTitulo: 'Encontrou um CA vencido no seu estoque?',
    ctaTexto:
      'Mande a lista dos itens e dos números de CA. A gente ajuda a separar o que precisa de reposição agora do que só precisa entrar no próximo pedido.',
    perguntas: [
      {
        pergunta: 'Dá para comprar EPI com o CA vencido?',
        resposta:
          'Não. A NR-6 condiciona a venda e o fornecimento de EPI à indicação de Certificado de Aprovação, então item sem certificado vigente não pode ser adquirido nem entregue à equipe — mesmo que seja o mesmo modelo que a empresa já usa há anos.',
      },
      {
        pergunta: 'Um certificado vencido pode voltar a ficar válido?',
        resposta:
          'A situação de cada certificado é um dado do sistema oficial do Ministério do Trabalho e Emprego, e é lá que ela precisa ser conferida — não na nota fiscal nem na memória de quem comprou. Consultar antes de concluir qualquer coisa evita tanto descartar equipamento bom quanto encomendar um modelo que já não pode ser fornecido.',
      },
      {
        pergunta: 'O número do CA precisa aparecer no registro de entrega?',
        resposta:
          'É o que torna o registro útil depois. Anotado com a data, ele mostra qual equipamento foi entregue e que o certificado estava vigente naquele momento — que é exatamente o dado pedido quando a pergunta sobre vencimento aparece meses ou anos mais tarde.',
      },
    ],
  },
]

/**
 * GUARDA DE BUILD: comprimento do title renderizado.
 *
 * Existe porque eu errei isto duas vezes, do mesmo jeito. O `tituloSeo` de
 * cada artigo é publicado com o sufixo do site somado — `%s · Tower EPI's`,
 * quatorze caracteres. Medindo o `tituloSeo` sozinho, ele cabia; o que o
 * buscador corta é o renderizado, e saíram títulos de 71 e de 62 caracteres.
 *
 * O laço abaixo roda na importação do módulo, que acontece na geração
 * estática: título longo demais derruba o build em vez de ir para produção e
 * esperar alguém medir depois.
 *
 * 60 é o limite prático usual antes do corte no resultado de busca. Não é
 * número de norma — é convenção de ofício, e por isso a mensagem de erro diz o
 * que fazer em vez de só recusar.
 *
 * A EXCEÇÃO, E POR QUE ELA EXPIRA SOZINHA. Dois títulos publicados antes desta
 * guarda estouram por um e por dois caracteres, e fazem parte da linha de base
 * congelada até a revisão de 1º de novembro de 2026
 * (`docs/10-regra-de-avaliacao.md`). Mexer neles agora sujaria a comparação que
 * a rotina agendada existe para fazer — então a guarda os tolera até lá.
 *
 * Depois dessa data a tolerância acaba por conta própria e o build passa a
 * recusá-los. É de propósito: exceção sem prazo vira permanente, e ninguém
 * lembra de remover a que já não se justifica.
 */
const SUFIXO_DO_TITLE = ` · ${empresa.nome}`.length

/** Congelados até a revisão. Ver o comentário acima. */
const TOLERADOS_ATE = new Date('2026-11-01T12:00:00Z')
const CONGELADOS = new Set([
  'botina-que-machuca-calcado-ou-numeracao',
  'mascara-descartavel-nao-protege-de-vapor-quimico',
])

for (const a of ARTIGOS) {
  const total = a.tituloSeo.length + SUFIXO_DO_TITLE
  if (CONGELADOS.has(a.slug) && Date.now() < TOLERADOS_ATE.getTime()) continue
  if (total > 60) {
    throw new Error(
      `Artigo "${a.slug}": tituloSeo tem ${a.tituloSeo.length} caracteres e ` +
        `renderiza com ${total} (o site soma ${SUFIXO_DO_TITLE} de sufixo). ` +
        `Encurte para no máximo ${60 - SUFIXO_DO_TITLE} caracteres.`,
    )
  }
}

export const buscarArtigo = (slug: string) => ARTIGOS.find((a) => a.slug === slug)
