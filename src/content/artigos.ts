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
    atualizado: '2026-10-03',
    atualizadoExibicao: 'outubro de 2026',
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
          'Cozinha profissional junta três condições que quase nenhum outro ambiente junta ao mesmo tempo. Piso sempre molhado e engordurado. Risco de respingo quente. E uma jornada longa quase toda em pé. Cada uma puxa a escolha para um lado diferente, e é por isso que a decisão confunde.',
      },
      {
        tipo: 'h2',
        texto: 'O solado é a decisão mais importante',
      },
      {
        tipo: 'p',
        texto:
          'O acidente mais frequente em cozinha é a queda por escorregamento. Isso coloca a resistência ao escorregamento acima de qualquer outra característica. Inclusive acima da biqueira, que muita gente confunde com proteção.',
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
          'Modelos com perfuração de ventilação na parte de cima deixam passar líquido, não servem para a área de produção.',
          'O material precisa suportar limpeza diária sem absorver resíduo, e secar antes do turno seguinte.',
          'Costuras e frisos que acumulam sujeira dificultam a higienização e são um problema em ambiente de manipulação de alimento.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'Babuche, tamanco e calçado de EVA servem?',
      },
      {
        tipo: 'p',
        texto:
          'Servem quando cumprem as mesmas três condições de qualquer calçado de cozinha: fechados em cima do pé, sem furo de ventilação, e com solado ensaiado para piso molhado, com Certificado de Aprovação. Existem modelos profissionais de babuche e de EVA feitos assim, leves e fáceis de lavar, e por isso eles aparecem tanto nas recomendações.',
      },
      {
        tipo: 'p',
        texto:
          'O que derruba o modelo é o detalhe, e não o formato. Furo no cabedal deixa passar o líquido quente exatamente onde ele cai. E calçado que não prende o calcanhar tende a sair do pé ou torcer no piso molhado, justamente na hora de carregar panela ou desviar de alguém. Antes de comprar, vale conferir os três pontos — cobertura, solado e fixação no pé — e não só a aparência.',
      },
      {
        tipo: 'h2',
        texto: 'Conforto não é detalhe: é o que decide se o calçado será usado',
      },
      {
        tipo: 'p',
        texto:
          'Este é o ponto que a maioria das listas ignora. Um calçado que machuca no meio do turno é retirado, trocado por chinelo ou substituído por um tênis comum na primeira oportunidade. A partir daí, a proteção deixa de existir. Não importa quanto ela custou.',
      },
      {
        tipo: 'p',
        texto:
          'Peso, amortecimento e a forma do calçado importam tanto quanto o solado. E há um detalhe prático que resolve boa parte dos arrependimentos: o pé incha ao longo do dia. Provar o calçado considerando o fim do turno, e não o começo, evita o erro mais comum de numeração.',
      },
      {
        tipo: 'h2',
        texto: 'Existe sapato ortopédico para cozinha?',
      },
      {
        tipo: 'p',
        texto:
          '"Ortopédico" não é uma classificação do calçado profissional, e o Certificado de Aprovação não traz essa característica. Quem procura por isso quase sempre quer conforto para muitas horas em pé: amortecimento, palmilha que dá apoio ao arco do pé, peso baixo e uma forma que não aperta. Isso dá para conferir em qualquer modelo, e o que mais pesa está em <a href="/conhecimento/calcado-para-quem-trabalha-em-pe-o-dia-todo/">calçado para quem trabalha em pé o dia todo</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Quando existe indicação de palmilha ortopédica, feita por profissional de saúde, o ponto prático é outro: o calçado precisa ter palmilha removível e espaço para a palmilha indicada. Vale levá-la na hora de provar.',
      },
      {
        tipo: 'p',
        texto:
          'E macio não é o mesmo que confortável. Cabedal muito mole e solado que afunda agradam na loja, mas dão pouca estabilidade no piso molhado e cansam mais no fim do turno. O que sustenta uma jornada longa é amortecimento com firmeza.',
      },
      {
        tipo: 'h2',
        texto: 'Calçado de cozinha feminino',
      },
      {
        tipo: 'p',
        texto:
          'O critério é o mesmo: fechado, impermeável, solado antiderrapante e confortável. O que muda é a forma. Existem modelos com forma e numeração femininas, e eles costumam calçar melhor do que um modelo masculino em número pequeno, que sobra na largura e aperta no peito do pé. As opções sem biqueira estão em <a href="/calcados/ocupacionais/">calçados ocupacionais</a>.',
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
          'Ou seja: a pergunta não é "qual protege mais", e sim "existe risco de algo pesado cair sobre o pé na minha rotina?". Se existe, a conversa muda para <a href="/calcados/seguranca/">calçado de segurança</a>. Se não existe, um calçado ocupacional bem escolhido protege melhor no que importa aqui: aderência. E pesa menos na jornada em pé.',
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
          ['Fixação no calcanhar', 'Calçado que sai do pé torce no piso molhado'],
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
          'Tênis de uso diário não foi feito para piso molhado com gordura. Absorve líquido, é difícil de higienizar e não tem Certificado de Aprovação como EPI. Quando o calçado é obrigatório na atividade, essa última parte deixa de ser detalhe e vira exigência.',
      },
      {
        tipo: 'p',
        texto:
          'Para ver o perfil completo do calçado da sua cozinha — solado, água, higienização e conforto — a ferramenta <a href="/ferramentas/qual-calcado-usar/">qual calçado profissional é ideal para você</a> responde em onze toques.',
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
          'O furado, não: o furo no cabedal deixa passar respingo quente exatamente onde o risco está, em cima do pé. O babuche serve se for fechado em cima, sem furo, com solado ensaiado para piso molhado e Certificado de Aprovação — e se prender bem o pé, para não sair nem torcer no piso molhado.',
      },
      {
        pergunta: 'Calçado de couro aguenta a rotina de cozinha?',
        resposta:
          'Aguenta menos do que se espera. O couro absorve gordura e sofre com a higienização frequente que a cozinha exige, e o par envelhece por dentro antes de parecer gasto por fora. Material que suporta lavagem costuma durar mais nesse ambiente.',
      },
      {
        pergunta: 'Existe sapato ortopédico para cozinha?',
        resposta:
          'Não como classificação: o CA não traz essa característica. O que se procura com essa palavra é conforto para muitas horas em pé — amortecimento, apoio ao arco do pé, peso baixo e forma que não aperta. Quem tem indicação de palmilha ortopédica precisa de calçado com palmilha removível e espaço para ela.',
      },
      {
        pergunta: 'Calçado de cozinha feminino é diferente do masculino?',
        resposta:
          'Nas exigências, não: fechado, impermeável, antiderrapante e confortável. Na forma, sim. Modelos de forma feminina costumam calçar melhor do que um masculino em número pequeno, que sobra na largura e aperta no peito do pé.',
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
    atualizado: '2026-10-03',
    atualizadoExibicao: 'outubro de 2026',
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
        texto: 'Onde fica o número do CA no EPI',
      },
      {
        tipo: 'p',
        texto:
          'A NR-6 exige que todo EPI traga, em caracteres indeléveis e bem visíveis, o nome do fabricante (ou do importador, quando o produto é importado), o lote de fabricação e o número do CA. É por isso que dá para conferir o certificado olhando a peça que está em uso, sem depender da nota fiscal nem da palavra do vendedor.',
      },
      {
        tipo: 'p',
        texto:
          'O lugar da marcação varia de um modelo para outro. Em calçado, ela costuma estar na parte interna do cano ou na lingueta; em capacete, gravada no casco; em cinto de segurança, na etiqueta presa à fita. Quando a peça não comporta a gravação, a norma permite que o órgão competente autorize outra forma de marcação, proposta pelo fabricante, e essa forma passa a constar do próprio certificado. Se não encontrar o número, a consulta oficial diz onde procurar: o registro de cada CA tem um campo com o local da marcação.',
      },
      {
        tipo: 'h2',
        texto: 'Como consultar o CA no site do Ministério do Trabalho',
      },
      {
        tipo: 'p',
        texto:
          'A consulta é pública, no sistema CAEPI do Ministério do Trabalho e Emprego, em <a href="https://caepi.trabalho.gov.br/" target="_blank" rel="noopener noreferrer">caepi.trabalho.gov.br</a>. É o canal oficial. Listas e aplicativos de terceiros reproduzem esses dados e podem estar desatualizados, e o caminho do serviço também está na <a href="https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca" target="_blank" rel="noopener noreferrer">página do gov.br</a> citada nas fontes.',
      },
      {
        tipo: 'lista',
        itens: [
          'Encontre o número do CA na peça ou na embalagem.',
          'Abra a consulta no CAEPI e informe o número.',
          'No registro que aparece, leia quatro campos: a situação, a validade, para que o equipamento foi aprovado e o local da marcação.',
          'Compare o equipamento, o fabricante e a referência descritos com a peça que está na sua mão.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'A situação é o primeiro filtro. O certificado pode aparecer como válido, vencido, suspenso ou cancelado, e só o válido serve para uma compra ou uma entrega nova. Depois dela, o campo que mais importa é o <strong>aprovado para</strong>, porque é ele que diz contra o quê o equipamento foi ensaiado.',
      },
      {
        tipo: 'h3',
        texto: 'Consulta da validade do CA',
      },
      {
        tipo: 'p',
        texto:
          'A data de validade aparece no mesmo registro. Ela é da aprovação do modelo, não do par: é o prazo em que aquele equipamento pode ser vendido como EPI aprovado. Por isso a pergunta sobre CA vencido tem uma resposta para o que ainda vai ser comprado e outra para o que já está em uso, e as duas estão na seção abaixo.',
      },
      {
        tipo: 'h2',
        texto: 'O que conferir no CA de botina, capacete e cinto',
      },
      {
        tipo: 'p',
        texto:
          'O número do CA funciona do mesmo jeito em qualquer EPI. O que muda de um item para outro é o que procurar no campo aprovado para.',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Botina e bota de segurança:</strong> se o calçado tem biqueira de proteção, se tem proteção contra perfuração da sola e se foi aprovado para algum risco específico, como eletricidade. Biqueira e proteção da sola são requisitos separados, e um não vem junto com o outro. A diferença entre as categorias está em <a href="/conhecimento/calcado-ocupacional-ou-de-seguranca/">calçado ocupacional ou de segurança</a>.',
          '<strong>Capacete:</strong> se o modelo foi aprovado também para atividade com risco elétrico. Capacetes têm classes diferentes, e a certa depende da atividade, como explicado em <a href="/protecao/cabeca/">proteção da cabeça</a>.',
          '<strong>Cinto de segurança para trabalho em altura:</strong> que tipo de cinturão é e para que uso foi aprovado. Como o cinto fica exposto a sol e atrito, a etiqueta com o CA costuma ser a primeira coisa a apagar, e peça com marcação ilegível não tem como ser conferida.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O que fazer quando o CA está vencido',
      },
      {
        tipo: 'p',
        texto:
          'A validade do CA está ligada à autorização daquele modelo no mercado, e por isso ela pesa mais na compra do que na prateleira. Na hora de comprar, o número deve ser <a href="/conhecimento/como-escolher-fornecedor-de-epi/">pedido já na proposta</a>. Item que ainda vai ser adquirido ou entregue precisa ter certificado vigente. Item que já está em uso é uma pergunta com resposta mais longa, e ela está em <a href="/conhecimento/ca-vencido-o-epi-pode-continuar-em-uso/">CA vencido: o EPI pode continuar em uso?</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Vale separar duas coisas que costumam ser confundidas: a validade do certificado, que é um dado do modelo, e a vida útil do equipamento em uso, que depende do desgaste. Um calçado com CA válido pode estar com o solado gasto e já não proteger. E nesse caso a troca é necessária de qualquer forma.',
      },
    ],
    fontes: [
      {
        titulo: 'Consulta CA — Sistema CAEPI, Secretaria de Inspeção do Trabalho',
        url: 'https://caepi.trabalho.gov.br/',
      },
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto atualizado em 2022) — Ministério do Trabalho e Emprego',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
      {
        titulo: 'Dicionário de metadados do conjunto de dados de EPI (campos do CA) — Ministério do Trabalho e Emprego',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/equipamentos-de-protecao-individual-epi/dicionario-de-metadados-do-conjunto-de-dados-epi-1.pdf',
      },
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
        pergunta: 'Como consultar o CA de um EPI?',
        resposta:
          'No sistema CAEPI do Ministério do Trabalho e Emprego, em caepi.trabalho.gov.br, informando o número do CA marcado na peça. A consulta é pública e mostra a situação do certificado, a validade, o fabricante ou importador e a descrição do que foi aprovado.',
      },
      {
        pergunta: 'É obrigatório ter o CA no EPI?',
        resposta:
          'Sim. A NR-6 determina que o EPI, nacional ou importado, só pode ser posto à venda ou utilizado com a indicação do Certificado de Aprovação. Equipamento sem CA não cumpre a exigência, mesmo que pareça adequado.',
      },
      {
        pergunta: 'Onde fica o número do CA no EPI?',
        resposta:
          'Na própria peça, em marcação legível e indelével, junto com o nome do fabricante ou importador e o lote de fabricação. O lugar varia por modelo. Quando não estiver à vista, o registro do CA na consulta oficial informa onde a marcação foi feita.',
      },
      {
        pergunta: 'O que significa CA suspenso ou cancelado?',
        resposta:
          'É a situação do certificado na consulta oficial, que aparece como válido, vencido, suspenso ou cancelado. Para comprar ou entregar EPI, só serve o válido: nos outros casos, o modelo não está apto a ser fornecido como EPI aprovado naquele momento.',
      },
      {
        pergunta: 'O CA impresso no produto pode ser falso?',
        resposta:
          'O número pode ser copiado, mas a descrição não acompanha. Por isso a conferência não para no número: o equipamento, o fabricante e a referência que a consulta mostra precisam bater com a peça. Se não batem, aquele número não é daquele produto.',
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
    atualizado: '2026-10-03',
    atualizadoExibicao: 'outubro de 2026',
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
          ['Biqueira de proteção', 'Não possui', 'Possui, ensaiada a 200 J de impacto e 15 kN de compressão'],
          ['Risco mecânico sobre os dedos', 'Não é destinado a esse risco', 'É destinado a esse risco'],
          ['Uso típico', 'Cozinha, saúde, limpeza, comércio, serviços', 'Indústria, construção, logística, manutenção'],
          ['Foco predominante', 'Conforto, higiene e aderência', 'Proteção mecânica somada à aderência'],
        ],
      },
      {
        tipo: 'h2',
        texto: 'As quatro normas da família: 20344, 20345, 20346 e 20347',
      },
      {
        tipo: 'p',
        texto:
          'As duas normas do título têm duas irmãs, e a confusão entre as quatro aparece tanto nas buscas quanto nas propostas de fornecedor. Cada uma cobre uma coisa diferente:',
      },
      {
        tipo: 'tabela',
        cabecalho: ['Norma', 'O que define', 'Biqueira de proteção'],
        linhas: [
          ['ABNT NBR ISO 20344', 'Os métodos de ensaio. Não é um tipo de calçado: é como as outras três são testadas', 'Não se aplica'],
          ['ABNT NBR ISO 20345', 'Calçado de segurança', 'Obrigatória, ensaiada a 200 J de impacto e 15 kN de compressão'],
          ['ABNT NBR ISO 20346', 'Calçado de proteção', 'Obrigatória, ensaiada a 100 J de impacto e 10 kN de compressão'],
          ['ABNT NBR ISO 20347', 'Calçado ocupacional', 'Não possui'],
        ],
      },
      {
        tipo: 'p',
        texto:
          'O calçado de proteção da 20346 é o menos lembrado. Ele tem biqueira, mas ensaiada com metade da energia exigida na 20345, e por isso os dois não são intercambiáveis: onde a avaliação de riscos pede calçado de segurança, um calçado de proteção não cumpre o papel, mesmo sendo parecido por fora.',
      },
      {
        tipo: 'p',
        texto:
          'Fora dessa família há normas para riscos específicos. A que mais aparece junto nas buscas é a ABNT NBR 16603:2017, que trata do calçado isolante elétrico para trabalho em instalações de baixa tensão, até 500 V, em ambiente seco. Isolamento elétrico é um requisito à parte, e o assunto está em <a href="/conhecimento/epi-para-eletricista-o-que-muda/">EPI para eletricista</a>.',
      },
      {
        tipo: 'h2',
        texto: 'Edição de 2015 ou de 2025: qual vale?',
      },
      {
        tipo: 'p',
        texto:
          'Boa parte do que circula sobre essas normas, inclusive o que aparece primeiro nas buscas, ainda se refere às edições de 2015. Segundo o catálogo de normas técnicas, as três normas de calçado ganharam edição nova em 2025: a 20345 e a 20346 em julho, a 20347 em outubro. As revisões mexem em requisitos e em marcações, como aconteceu com a de resistência ao escorregamento, explicada em <a href="/conhecimento/solado-antiderrapante-o-que-significa/">solado antiderrapante</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Para quem compra, a consequência é prática: uma tabela de símbolos copiada de um texto antigo pode não descrever o calçado que está na sua mão. O que vale para um modelo específico é o que consta no Certificado de Aprovação dele.',
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
          'No próprio calçado, a marcação traz o número da norma e um código de categoria, que começa por S no calçado de segurança e por O no ocupacional, às vezes seguido de símbolos de requisitos adicionais. O significado exato de cada símbolo depende da edição da norma.',
      },
      {
        tipo: 'p',
        texto:
          'Na consulta do CA, a mesma informação vem em palavras. Frases como "proteção dos pés contra agentes cortantes e escoriantes" são textos de CA, não nomes de norma: dizem contra o quê aquele modelo foi aprovado, e é por elas que se confirma se existe biqueira de proteção.',
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
        texto: 'Onde encontrar o PDF da NBR ISO 20345 e da 20347',
      },
      {
        tipo: 'p',
        texto:
          'As normas ABNT são documentos pagos, vendidos pela própria ABNT e por distribuidores autorizados, e não existe versão oficial gratuita. O arquivo que costuma aparecer nas buscas em sites de compartilhamento é da edição de 2015, que já foi substituída.',
      },
      {
        tipo: 'p',
        texto:
          'Para escolher ou conferir um calçado, quase nunca é preciso ler a norma inteira. A consulta do CA do modelo é pública e diz qual proteção ele tem, e o que procurar nela está em <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">o que é o CA e como consultar</a>.',
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
          'A biqueira protege os dedos contra impacto e compressão. Ela não protege a sola contra perfuração. Se na sua atividade há prego, ferro ou material perfurante no chão, a proteção contra perfuração é um requisito adicional, presente apenas em modelos específicos. E isso precisa ser conferido no Certificado de Aprovação.',
      },
      {
        tipo: 'p',
        texto:
          'Se a dúvida é sobre o seu caso e não sobre a norma, a ferramenta <a href="/ferramentas/qual-calcado-usar/">qual calçado profissional é ideal para você</a> faz a pergunta que decide a categoria e ajusta o resto em onze toques.',
      },
    ],
    fontes: [
      {
        titulo: 'Equipamentos de Proteção Individual — Ministério do Trabalho e Emprego',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/equipamentos-de-protecao-individual',
      },
      {
        titulo: 'ABNT NBR ISO 20344 — Métodos de ensaio para calçados (catálogo Target Normas)',
        url: 'https://www.normas.com.br/visualizar/abnt-nbr-nm/27578/abnt-nbriso20344-equipamentos-de-protecao-individual-metodos-de-ensaio-para-calcados',
      },
      {
        titulo: 'ABNT NBR ISO 20345 — Calçado de segurança, edição 07/2025 (catálogo Target Normas)',
        url: 'https://www.normas.com.br/visualizar/abnt-nbr-nm/27580/abnt-nbriso20345-equipamento-de-protecao-individual-calcado-de-seguranca',
      },
      {
        titulo: 'ABNT NBR ISO 20346 — Calçado de proteção, edição 07/2025 (catálogo Target Normas)',
        url: 'https://www.normas.com.br/visualizar/abnt-nbr-nm/27582/abnt-nbriso20346-equipamento-de-protecao-individual-calcado-de-protecao',
      },
      {
        titulo: 'ABNT NBR ISO 20347 — Calçado ocupacional, edição 10/2025 (catálogo Target Normas)',
        url: 'https://www.normas.com.br/visualizar/abnt-nbr-nm/27584/abnt-nbriso20347-equipamento-de-protecao-individual-calcado-ocupacional',
      },
      {
        titulo: 'NBR 16603:2017 — Calçado isolante elétrico para baixa tensão (artigo técnico Target Normas)',
        url: 'https://www.normas.com.br/visualizar/artigo-tecnico/3044/nbr-16603-de-05-2017-os-requisitos-e-ensaios-em-calcados-isolantes-eletricos-para-trabalhos-em-instalacoes-eletricas',
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
        pergunta: 'Qual é a norma para calçados de segurança?',
        resposta:
          'No Brasil, a ABNT NBR ISO 20345, que exige biqueira de proteção ensaiada a 200 J de impacto. O calçado ocupacional, sem biqueira, segue a ABNT NBR ISO 20347, e o calçado de proteção, com biqueira ensaiada a 100 J, a ABNT NBR ISO 20346. Os métodos de ensaio das três estão na ABNT NBR ISO 20344.',
      },
      {
        pergunta: 'Onde encontrar o PDF da NBR ISO 20345?',
        resposta:
          'A norma é vendida pela ABNT e por distribuidores autorizados, e não há versão oficial gratuita. Para conferir um calçado específico, ela raramente é necessária: a consulta do Certificado de Aprovação do modelo, que é pública, mostra para que ele foi aprovado.',
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
    atualizado: '2026-10-03',
    atualizadoExibicao: 'outubro de 2026',
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
        texto: 'O que é a NR-6 e qual é o objetivo dela',
      },
      {
        tipo: 'p',
        texto:
          'A NR-6 é a Norma Regulamentadora nº 6 do Ministério do Trabalho e Emprego, e o nome oficial dela é Equipamento de Proteção Individual – EPI. O objetivo declarado no texto é estabelecer os requisitos para aprovação, comercialização, fornecimento e utilização de EPI. Por isso ela vale para quatro partes ao mesmo tempo: as organizações que adquirem EPI, os trabalhadores que o utilizam e os fabricantes e importadores.',
      },
      {
        tipo: 'p',
        texto:
          'O EPI não é a primeira medida de proteção. As normas colocam antes a proteção coletiva, os chamados EPC, como guarda-corpo, enclausuramento de máquina e exaustão, e as medidas de organização do trabalho, e o EPI entra quando a proteção coletiva é tecnicamente inviável ou insuficiente, enquanto ela está sendo implantada e em situações de emergência.',
      },
      {
        tipo: 'h2',
        texto: 'O que é considerado EPI',
      },
      {
        tipo: 'p',
        texto:
          'É todo dispositivo ou produto de uso individual utilizado pelo trabalhador, destinado à proteção contra riscos capazes de ameaçar a sua segurança e a sua saúde no trabalho. É por isso que uniforme comum e EPI não são a mesma coisa. O que separa os dois é a finalidade de proteger contra um risco.',
      },
      {
        tipo: 'p',
        texto:
          'A norma também reconhece o equipamento conjugado de proteção individual, composto por vários dispositivos que o fabricante associou contra um ou mais riscos. E o Anexo I da NR-6 traz a lista dos equipamentos considerados EPI, organizada pela parte do corpo protegida: cabeça, olhos e face, audição, respiração, tronco, membros superiores, membros inferiores, corpo inteiro e proteção contra quedas.',
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
          'A ficha é o registro de que o equipamento foi entregue àquela pessoa. Na prática, ela costuma trazer identificação do trabalhador, descrição do equipamento, número do CA, data de entrega e assinatura. É o documento mais pedido em fiscalização e o que mais gera problema quando está desatualizado. O que precisa constar nela está em <a href="/conhecimento/ficha-de-entrega-de-epi-o-que-precisa-constar/">ficha de entrega de EPI</a>.',
      },
      {
        tipo: 'h2',
        texto: 'Treinamento de NR-6: é obrigatório?',
      },
      {
        tipo: 'p',
        texto:
          'Sim. Orientar e treinar o trabalhador sobre o uso adequado, a guarda e a conservação do EPI é obrigação da empresa na NR-6. Na prática, o objetivo do treinamento é que a pessoa saiba usar e ajustar o equipamento, guardá-lo do jeito certo e reconhecer quando ele precisa ser trocado.',
      },
      {
        tipo: 'p',
        texto:
          'A norma não traz conteúdo programático pronto. Ele sai dos três verbos que ela usa, uso, guarda e conservação, aplicados aos equipamentos que a equipe usa de verdade, e costuma cobrir:',
      },
      {
        tipo: 'lista',
        itens: [
          'Para que serve cada equipamento e contra o quê ele não protege.',
          'Como vestir, ajustar e conferir o encaixe ou a vedação, quando é o caso.',
          'Como guardar, limpar e conservar.',
          'Como reconhecer desgaste e a quem pedir a troca.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'A NR-6 não fixa carga horária nem periodicidade para esse treinamento. As regras gerais de capacitação, como o registro do que foi feito, estão na NR-1. Faz sentido repetir a orientação quando muda o equipamento, o risco ou a função, e registrar cada vez.',
      },
      {
        tipo: 'h2',
        texto: 'NR-6 e as normas de cada setor',
      },
      {
        tipo: 'p',
        texto:
          'A NR-6 é a regra geral de EPI, e normas de setor somam exigências a ela. As que mais aparecem junto são a NR-32, de serviços de saúde, a NR-10, de eletricidade, e a NR-35, de trabalho em altura. Quando uma delas se aplica, as duas valem ao mesmo tempo: a de setor diz o que a atividade exige, e a NR-6 diz como o equipamento é aprovado, fornecido e registrado. O que muda na prática está em <a href="/para-seu-trabalho/enfermagem-e-saude/">EPI para enfermagem e saúde</a> e em <a href="/conhecimento/epi-para-eletricista-o-que-muda/">EPI para eletricista</a>.',
      },
      {
        tipo: 'h2',
        texto: 'NR-6 atualizada: o que mudou até 2026',
      },
      {
        tipo: 'p',
        texto:
          'A NR-6 foi editada originalmente pela Portaria MTb nº 3.214, de 8 de junho de 1978, junto com as demais normas regulamentadoras. O texto em vigor é o da nova redação aprovada pela Portaria MTP nº 2.175, de 28 de julho de 2022, que entrou em vigor em 2023.',
      },
      {
        tipo: 'p',
        texto:
          'A alteração mais recente que localizamos é a <a href="https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/sst-portarias/2025/portaria-mte-no-57-altera-o-item-6-9-4-da-nr-06.pdf" target="_blank" rel="noopener noreferrer">Portaria MTE nº 57, de 16 de janeiro de 2025</a>, em vigor desde julho de 2025. Ela mudou o item sobre o Certificado de Aprovação: o CA emitido para um fabricante ou importador não pode ser usado por outro, nem entre matriz e filial, sem que esse outro passe pelo procedimento para obter o próprio CA. Para quem compra, o efeito prático é conferir se o fabricante ou importador que aparece na consulta do CA é o mesmo do produto oferecido.',
      },
      {
        tipo: 'p',
        texto:
          'Norma regulamentadora muda por portaria, e a versão que vale é sempre a publicada no portal do Ministério do Trabalho e Emprego. Arquivos com "NR-6 atualizada" no nome, em outros sites, podem não trazer as alterações mais recentes.',
      },
      {
        tipo: 'h2',
        texto: 'O erro mais comum de quem compra',
      },
      {
        tipo: 'p',
        texto:
          'Comprar pelo preço e descobrir depois que o equipamento não é adequado ao risco. Um <a href="/protecao/respiratoria/">respirador aprovado para poeira</a> não resolve exposição a vapor químico; uma luva aprovada para manuseio geral não substitui resistência química específica. O CA descreve para que o equipamento foi aprovado. É esse texto que precisa bater com a avaliação de riscos da empresa.',
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
        titulo: 'Portaria MTE nº 57, de 16 de janeiro de 2025 — altera o item 6.9.4 da NR-6 (PDF oficial)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/sst-portarias/2025/portaria-mte-no-57-altera-o-item-6-9-4-da-nr-06.pdf',
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
        pergunta: 'O treinamento de NR-6 é obrigatório?',
        resposta:
          'Sim. Orientar e treinar sobre uso, guarda e conservação do EPI é obrigação da empresa. Não basta entregar o equipamento e registrar a entrega.',
      },
      {
        pergunta: 'O treinamento de NR-6 tem validade?',
        resposta:
          'A NR-6 não fixa carga horária, prazo de validade nem periodicidade para o treinamento de uso de EPI. O que tem prazo é o Certificado de Aprovação do equipamento. Na prática, vale refazer a orientação quando muda o equipamento, o risco ou a função.',
      },
      {
        pergunta: 'Onde encontrar a NR-6 atualizada em PDF?',
        resposta:
          'No portal do Ministério do Trabalho e Emprego, na página das normas regulamentadoras vigentes. É o lugar em que o texto é garantidamente o vigente. Cópias em outros sites podem não incluir as alterações mais recentes, como a de 2025 sobre o Certificado de Aprovação.',
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
      'Não existe "antiderrapante" genérico. O desempenho é medido em superfícies diferentes, e isso muda a escolha.',
    descricaoSeo:
      'Entenda o que é medido no ensaio de resistência ao escorregamento, o que significam as marcações e como escolher para piso molhado ou oleoso.',
    publicado: '2026-08-30',
    atualizado: '2026-10-03',
    atualizadoExibicao: 'outubro de 2026',
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
          '"Antiderrapante" virou palavra de anúncio. Na prática, ela descreve uma característica que é ensaiada, medida e registrada. E que muda conforme a superfície. Entender isso separa a compra que resolve da que decepciona no primeiro dia de chuva.',
      },
      {
        tipo: 'h2',
        texto: 'O que faz um solado ser antiderrapante',
      },
      {
        tipo: 'p',
        texto:
          'Duas coisas trabalham juntas: o composto do material e o desenho. O desenho cria canais que escoam a água ou o óleo para fora da área de contato, e o composto é o que agarra no piso quando esse contato acontece. Sem os canais, uma película de líquido fica entre a sola e o chão, e o calçado desliza sobre ela.',
      },
      {
        tipo: 'p',
        texto:
          'Por isso a pergunta "qual solado é antiderrapante" não tem resposta pelo nome do material. Borracha e poliuretano aparecem tanto em solados que seguram bem quanto em solados que não seguram, e o mesmo material com outro desenho dá outro resultado. O que separa um do outro é o ensaio, descrito abaixo.',
      },
      {
        tipo: 'p',
        texto:
          'Vale o mesmo para o tênis. Tênis comum não tem marcação de resistência ao escorregamento nem Certificado de Aprovação, então não há como saber em que piso ele foi testado, se foi. Para trabalho em piso molhado, o critério é o calçado ocupacional ou de segurança com o ensaio declarado.',
      },
      {
        tipo: 'h2',
        texto: 'O que é medido',
      },
      {
        tipo: 'p',
        texto:
          'Os ensaios de resistência ao escorregamento avaliam o atrito entre o solado e o piso na presença de um contaminante. As combinações mais usadas são piso cerâmico com solução detergente e piso de aço com glicerol. Uma representa ambiente molhado; a outra, ambiente oleoso.',
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
        tipo: 'p',
        texto:
          'Quem procura sapato antiderrapante para cozinha, inclusive o feminino, encontra os critérios específicos em <a href="/conhecimento/calcado-para-cozinha-como-escolher/">qual o melhor calçado para cozinha</a>. Para limpeza, onde o produto químico entra na conta, o caminho está em <a href="/para-seu-trabalho/limpeza-e-conservacao/">EPI para limpeza e conservação</a>.',
      },
      {
        tipo: 'h2',
        texto: 'Adesivo antiderrapante e solado por metro funcionam?',
      },
      {
        tipo: 'p',
        texto:
          'São as soluções mais vendidas para quem quer deixar um calçado antiderrapante, e servem a outro propósito. O adesivo de sola ajuda em sapato social ou de salto no uso do dia a dia, mas não passa por ensaio, pode soltar com água e gordura e não transforma um calçado comum em equipamento de proteção. O solado vendido por metro é material de fabricação e de reforma.',
      },
      {
        tipo: 'p',
        texto:
          'No calçado de trabalho, nenhum dos dois substitui o modelo aprovado. Um par com Certificado de Aprovação que recebe outra sola deixa de ser exatamente o que foi ensaiado. E lixar a sola, outra dica comum, piora a aderência em vez de melhorar. Antes de qualquer remendo, vale a ordem de investigação de <a href="/conhecimento/botina-escorrega-o-que-fazer-antes-de-trocar/">botina escorregando</a>, que começa por limpar a sola.',
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
          'Vale lembrar, sobretudo em <a href="/para-seu-trabalho/cozinha/">cozinha</a>, que a aderência é uma relação entre duas superfícies. É por isso que <a href="/conhecimento/botina-escorrega-o-que-fazer-antes-de-trocar/">nem toda queixa de escorregamento se resolve trocando o calçado</a>. O calçado responde por uma parte; o piso e a limpeza respondem pela outra. Piso muito liso, acúmulo de gordura e limpeza inadequada reduzem o desempenho de qualquer solado. O calçado é uma proteção individual. Não substitui corrigir o ambiente, quando dá para corrigir.',
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
          'Comparando o relevo da área de maior apoio com o de uma lateral que quase não toca o chão. Se a diferença é grande, o relevo já se foi. E é ele que garante a aderência.',
      },
      {
        pergunta: 'Adesivo antiderrapante na sola funciona?',
        resposta:
          'Para sapato social ou de salto no dia a dia, pode ajudar. Para trabalho, não resolve: o adesivo não passa por ensaio de resistência ao escorregamento, pode soltar com água e gordura e não transforma um calçado comum em equipamento de proteção.',
      },
      {
        pergunta: 'Qual o melhor calçado antiderrapante?',
        resposta:
          'O que foi ensaiado no tipo de piso onde você trabalha. Piso molhado com detergente e piso com óleo são ensaios diferentes, e um calçado pode ir bem em um e mal no outro. A marcação do modelo e o Certificado de Aprovação dizem em qual ele foi testado.',
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
    atualizado: '2026-10-05',
    atualizadoExibicao: 'outubro de 2026',
    cluster: 'Normas',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'A NR-6 estabelece que o empregador registre o fornecimento do EPI ao trabalhador, e admite que esse registro seja feito em livro, ficha ou sistema eletrônico. Na prática, a ficha de entrega é a prova de que a empresa cumpriu a obrigação. E é o primeiro documento pedido quando alguém pergunta.',
      },
      {
        tipo: 'p',
        texto:
          'A norma não publica um modelo oficial de ficha. O que ela exige é que o fornecimento fique registrado. Isso dá liberdade de formato e cria a dúvida que chega até nós com frequência: <em>o que precisa estar escrito ali?</em>',
      },
      {
        tipo: 'h2',
        texto: 'Ficha de EPI, de entrega, de recebimento ou de controle',
      },
      {
        tipo: 'p',
        texto:
          'São nomes diferentes para o mesmo documento: o registro de que um equipamento de proteção foi entregue a uma pessoa. Quem entrega chama de ficha de entrega ou de controle; quem assina, de ficha de recebimento ou termo de responsabilidade. A exigência é uma só, e a ficha é obrigatória no sentido de que o registro é: a NR-6 manda registrar o fornecimento, e a ficha é a forma mais comum de fazer isso.',
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
        texto: 'Modelo de ficha de EPI',
      },
      {
        tipo: 'p',
        texto:
          'Não existe modelo oficial, e por isso qualquer formato serve, em Word, Excel, sistema ou papel para imprimir, desde que responda às perguntas acima. Também não existe modelo "atualizado para 2026": a alteração mais recente da NR-6, de 2025, mudou uma regra sobre o Certificado de Aprovação, e não o que a ficha precisa trazer. Um modelo simples tem duas partes.',
      },
      {
        tipo: 'p',
        texto:
          '<strong>Para baixar:</strong> <a href="/modelos/ficha-de-entrega-de-epi.pdf" download>modelo em PDF para imprimir</a>, numa folha A4, ou <a href="/modelos/ficha-de-entrega-de-epi.xlsx" download>planilha para editar no Excel</a>, com lista de motivos pronta. Os dois trazem o cabeçalho, o termo de recebimento e a tabela de entregas descritos abaixo, sem nenhum dado preenchido.',
      },
      {
        tipo: 'p',
        texto:
          '<strong>O cabeçalho</strong>, preenchido uma vez por trabalhador: nome, função, setor, data de admissão e, se fizer sentido, numeração de calçado e tamanho de luva e de roupa. <strong>A tabela de entregas</strong>, com uma linha por item a cada entrega. Uma linha preenchida fica assim:',
      },
      {
        tipo: 'tabela',
        cabecalho: ['Data', 'Equipamento', 'Nº do CA', 'Qtd.', 'Motivo', 'Assinatura'],
        linhas: [
          ['05/10/2026', 'Botina de segurança com biqueira, nº 41', 'o número impresso no par entregue', '1 par', 'Primeira entrega', 'do trabalhador'],
          ['05/10/2026', 'Luva de proteção contra agentes químicos, tamanho M', 'o número da embalagem', '2 pares', 'Primeira entrega', 'do trabalhador'],
        ],
      },
      {
        tipo: 'p',
        texto:
          'Uma linha por item, e não uma linha para o "kit": é isso que permite saber depois qual CA foi entregue e quando cada peça foi trocada. Se a empresa também entrega uniforme, ele pode ficar na mesma ficha, em linhas próprias, sabendo que uniforme comum não é EPI e não tem CA.',
      },
      {
        tipo: 'h3',
        texto: 'Como fazer o termo de recebimento',
      },
      {
        tipo: 'p',
        texto:
          'O termo é o parágrafo que a pessoa assina junto com a ficha. Ele faz sentido quando repete o que a NR-6 já atribui ao trabalhador, sem inventar obrigação nova. Uma redação possível, a ser validada pelo responsável pela segurança do trabalho da empresa:',
      },
      {
        tipo: 'destaque',
        texto:
          'Declaro que recebi os equipamentos de proteção individual relacionados abaixo, gratuitamente, e que fui orientado sobre o uso adequado, a guarda e a conservação de cada um. Comprometo-me a usá-los apenas para a finalidade a que se destinam, a responsabilizar-me pela limpeza, guarda e conservação, a comunicar à empresa quando um equipamento for extraviado, danificado ou ficar impróprio para uso, e a cumprir as determinações sobre o uso adequado.',
      },
      {
        tipo: 'p',
        texto:
          'O termo assinado uma vez não substitui a assinatura de cada entrega. Ele registra o compromisso; as linhas da tabela registram o que foi entregue.',
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
          'É a rotina. Quando a entrega acontece no corredor, no meio do turno, o registro fica para depois, e depois vira nunca. O que costuma funcionar é amarrar a entrega a um momento que já existe: a troca programada, o início do mês, a reposição de numeração.',
      },
      {
        tipo: 'p',
        texto:
          'Ajuda também padronizar por função em vez de por pessoa. Quando a <a href="/para-seu-trabalho/">atividade define a lista</a>, quem entrega não precisa decidir nada na hora, e a ficha vira conferência em vez de redação.',
      },
      {
        tipo: 'h2',
        texto: 'Ficha de EPI para trabalho em altura',
      },
      {
        tipo: 'p',
        texto:
          'A ficha é a mesma. O que muda é o cuidado de registrar cada componente com CA próprio em linha própria, em vez de uma linha para o conjunto, e de lembrar que a inspeção desse equipamento antes do uso é assunto da NR-35, com registro que não se confunde com a ficha de entrega.',
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
        pergunta: 'A ficha de EPI é obrigatória?',
        resposta:
          'O registro da entrega é obrigatório pela NR-6, e a norma admite que ele seja feito em livro, ficha ou sistema eletrônico. A ficha é a forma mais comum. O que não pode é a entrega acontecer sem registro nenhum.',
      },
      {
        pergunta: 'Quem fornece a ficha de EPI?',
        resposta:
          'A empresa que entrega o equipamento. É ela quem elabora, preenche e guarda a ficha, porque é ela quem precisa comprovar a entrega. O fornecedor do EPI ajuda informando o CA de cada item, que é um dos campos da ficha.',
      },
      {
        pergunta: 'A ficha de EPI tem validade?',
        resposta:
          'Não. Ela é um registro contínuo, com uma linha por entrega, e não vence. Quando o espaço acaba, abre-se outra folha, e as anteriores continuam guardadas como histórico daquela pessoa.',
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
      'Quase sempre é numeração, forma ou modelo errado para a atividade, e não falta de tempo de uso. O que dá para resolver e o que não dá.',
    descricaoSeo:
      'Por que a biqueira não amacia, como saber se o problema é a numeração ou a forma do calçado, e quando insistir só piora. Sem truque caseiro.',
    publicado: '2026-09-03',
    atualizado: '2026-10-05',
    atualizadoExibicao: 'outubro de 2026',
    cluster: 'Calçados',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Calçado de segurança que machuca raramente é falta de amaciar. Na maioria dos casos é numeração errada, forma incompatível com o pé ou modelo inadequado para a atividade, e nenhum dos três se resolve com uso.',
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
        texto: 'Botina machucando: o que fazer hoje',
      },
      {
        tipo: 'p',
        texto:
          'A tabela diz a causa. Enquanto a troca não acontece, ou quando a folga é pequena, dá para reduzir o atrito no mesmo dia:',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Calcanhar:</strong> amarre até o último ilhós e use a laçada de travamento, passando o cadarço pelo laço do lado oposto antes de dar o nó. Ela segura o calcanhar no fundo do calçado. Meia que não escorrega e um protetor de calcanhar ajudam a bolha a não abrir de novo, mas, se o calcanhar continua subindo, a botina está grande.',
          '<strong>Dedos:</strong> confira se o dedo mais longo, que muitas vezes é o segundo, encosta na biqueira com você em pé. Se encosta, não há ajuste que resolva. Se o aperto é em cima dos dedos, afrouxar o cadarço na parte da frente e apertar só no tornozelo alivia.',
          '<strong>Sola do pé:</strong> ardência no fim do turno costuma ser palmilha achatada ou falta de amortecimento para muitas horas em pé, e o caminho está em <a href="/conhecimento/calcado-para-quem-trabalha-em-pe-o-dia-todo/">calçado para quem trabalha em pé o dia todo</a>.',
          '<strong>Um ponto só, sempre no mesmo lugar:</strong> passe a mão por dentro do calçado. Costura saliente, rebarba ou peça solta é defeito de fabricação, e o caso é troca com o fornecedor, não amaciar.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Bolha que já abriu precisa ficar limpa e protegida até fechar. Ferida que não cicatriza, sobretudo em quem tem diabetes, é assunto de atendimento de saúde, não de ajuste de calçado. O mesmo vale para dor que continua depois que o calçado foi corrigido, como a da planta do pé ou a do calcanhar ao levantar: condições como fascite plantar e metatarsalgia têm diagnóstico próprio, e o calçado ajuda mas não trata.',
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
        texto: 'Como amaciar a botina: a parte que amacia',
      },
      {
        tipo: 'p',
        texto:
          'O cabedal de couro cede um pouco nas primeiras semanas, e isso dá para ajudar sem estragar o par. Use a botina por períodos curtos nos primeiros dias, com a meia de trabalho, e aumente o tempo aos poucos. Caminhar e flexionar o pé dentro dela é o que molda o couro onde ele dobra, que é exatamente o que as dicas de meia grossa fazem. Uma ou duas horas por dia na primeira semana, em casa ou em tarefa leve, costuma ser o suficiente para saber se o par vai assentar ou não.',
      },
      {
        tipo: 'p',
        texto:
          'Para o couro em si, o que serve é produto próprio para couro, no tipo de couro do seu calçado e seguindo a orientação do fabricante. Ele mantém o couro flexível e evita trinca, mas não alarga. Nobuck e camurça pedem outro cuidado, e o detalhe está em <a href="/conhecimento/como-limpar-e-conservar-calcado-de-seguranca/">como limpar e conservar calçado de segurança</a>. O que nada disso alcança é a biqueira, o chamado bico de ferro, a forma e o solado. E material sintético cede bem menos que couro, então não conte com amaciar uma botina sintética que já começou apertada.',
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
          'O álcool borrifado por dentro, que também circula como truque, segue a mesma lógica: umedece o couro para ele ceder e evapora levando junto a oleosidade, o que pode manchar e ressecar o couro tratado de um calçado de trabalho. E nada disso muda a biqueira. No fim, o par volta a machucar com uma vida útil menor do que tinha.',
      },
      {
        tipo: 'h3',
        texto: 'E a palmilha de gel ou ortopédica?',
      },
      {
        tipo: 'p',
        texto:
          'Palmilha extra ocupa espaço. Dentro de uma botina que já está justa, a de gel aperta mais, em vez de aliviar. E a palmilha de conforto faz parte do calçado que foi ensaiado: a própria norma de calçado de segurança tem regras para palmilhas personalizadas. Quando há indicação de palmilha ortopédica por profissional de saúde, vale perguntar ao fabricante se o modelo aceita a troca antes de colocá-la.',
      },
      {
        tipo: 'h2',
        texto: 'Quando o problema é o modelo, não o tamanho',
      },
      {
        tipo: 'p',
        texto:
          'Existe um caso frequente e que ninguém considera: o calçado está certo, mas é do tipo errado para a atividade. Biqueira de proteção só faz sentido onde há risco de impacto sobre os dedos. Em cozinha, em serviço de limpeza, em atendimento de saúde e em boa parte do comércio, esse risco não existe. E o peso extra da biqueira, numa jornada de dez horas em pé, cobra caro.',
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
      {
        tipo: 'p',
        texto:
          'Antes de trocar o par, vale conferir se o tipo de calçado está certo para a sua rotina: a ferramenta <a href="/ferramentas/qual-calcado-usar/">qual calçado profissional é ideal para você</a> responde isso em um minuto.',
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
        pergunta: 'Como fazer a botina parar de machucar o calcanhar?',
        resposta:
          'Amarrando até o último ilhós com a laçada de travamento, que segura o calcanhar no fundo do calçado, e usando meia que não escorrega. Se mesmo assim o calcanhar sobe e desce ao andar, a botina está grande, e a solução é a numeração certa.',
      },
      {
        pergunta: 'O que é bom para amaciar o couro da botina?',
        resposta:
          'Uso em períodos curtos nos primeiros dias, com a meia de trabalho, e produto próprio para o tipo de couro do calçado, conforme o fabricante. Isso deixa o couro flexível. Secador, água e amaciante de roupa ressecam o couro e soltam o solado, e nenhum método amacia a biqueira.',
      },
      {
        pergunta: 'Que tipo de bota não machuca o pé?',
        resposta:
          'A que tem a numeração certa, provada com a meia de trabalho, e a forma compatível com o pé: largura, altura do peito do pé e espaço na biqueira. E a da categoria certa para a atividade, porque biqueira onde não há risco de impacto é peso que cansa o dia inteiro.',
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
    atualizado: '2026-10-05',
    atualizadoExibicao: 'outubro de 2026',
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
          'O erro é fácil de entender: as duas são luvas, as duas podem ser de nitrila, e a de procedimento é mais barata e já está no almoxarifado. Só que a espessura, o tempo de resistência e o uso previsto são outros, e é aí que a proteção acaba. Numa tarefa leve e rápida sem produto químico, como recolher material ou limpar a seco, ela separa a mão da sujeira, e mesmo assim rasga fácil em canto, escova e superfície áspera. Quando entra o produto de limpeza, ela deixa de ser a luva certa.',
      },
      {
        tipo: 'h2',
        texto: 'O que é luva de procedimento e para que serve',
      },
      {
        tipo: 'p',
        texto:
          'É a luva descartável e não estéril usada em procedimentos não invasivos: exame, curativo simples, coleta, higiene de paciente, qualquer contato com sangue, secreção ou material que pode estar contaminado. Ela protege quem atende e quem é atendido, e por isso aparece em hospital, clínica, consultório, farmácia e laboratório. Costuma vir em caixa de 100 unidades, em tamanhos de PP a G, e serve nas duas mãos.',
      },
      {
        tipo: 'p',
        texto:
          'Por ser produto para saúde, ela segue requisitos mínimos de qualidade definidos pela Anvisa, na RDC nº 547/2021, que trata das luvas cirúrgicas e das luvas para procedimento não cirúrgico. Quando tem Certificado de Aprovação, ela é também EPI, para risco biológico. O que nenhuma dessas regras faz é transformá-la em luva para produto químico.',
      },
      {
        tipo: 'h3',
        texto: 'Luva de procedimento ou luva estéril',
      },
      {
        tipo: 'p',
        texto:
          'A luva estéril, também chamada de cirúrgica, é a do procedimento invasivo e do campo estéril: vem embalada aos pares, já esterilizada, e tem formato próprio para a mão direita e para a esquerda. A de procedimento não é estéril e serve para o resto da rotina. Trocar uma pela outra é erro nos dois sentidos: estéril onde não precisa é custo, e de procedimento onde precisa de estéril é risco para o paciente. Os critérios da rotina de saúde estão em <a href="/para-seu-trabalho/enfermagem-e-saude/">EPI para enfermagem e saúde</a>.',
      },
      {
        tipo: 'h3',
        texto: 'Látex, nitrílica ou vinil',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Látex:</strong> elástica e com boa sensibilidade ao toque, mas pode causar alergia em quem usa e em quem é atendido. A versão sem pó deixa menos resíduo nas mãos.',
          '<strong>Nitrílica:</strong> sem látex, a alternativa para quem tem alergia, e mais resistente a furo. É a azul, a preta ou a roxa das caixas, e a cor não diz nada sobre proteção: quem diz é a embalagem.',
          '<strong>Vinil:</strong> sem látex, mais folgada e menos elástica, indicada pelos fabricantes para tarefas curtas e não invasivas, sem contato com fluidos.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Nenhuma das três vira luva química por ser de nitrila ou de vinil. O comportamento de cada material diante de produto químico é outro assunto, e está em <a href="/conhecimento/tipos-de-luva-qual-material-escolher/">qual material de luva escolher</a>.',
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
        texto: 'Qual luva usar para limpeza',
      },
      {
        tipo: 'p',
        texto:
          'A luva de limpeza tem vários nomes, luva de borracha, de látex, nitrílica, de PVC, e todos falam do material. Para trabalho, o que separa uma da outra é o que ela aguenta:',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Limpeza pesada e banheiro:</strong> é onde entram os produtos mais agressivos, como cloro, desincrustante e ácido. O caso é luva de proteção química escolhida pelo produto usado, de preferência com cano longo, porque o respingo chega ao antebraço.',
          '<strong>Com CA:</strong> luva de limpeza usada no trabalho é EPI e precisa de Certificado de Aprovação para o risco químico. Luva vendida para uso doméstico nem sempre tem, e sem ele não há como saber contra o quê ela foi ensaiada.',
          '<strong>Antialérgica:</strong> quem tem alergia a látex precisa de luva sem látex, como nitrílica ou de PVC, com a mesma resistência ao produto.',
          '<strong>Cores:</strong> em limpeza hospitalar e de facilities, a cor da luva costuma separar áreas, como banheiro e copa, para a mesma luva não levar sujeira de um lugar para o outro. Não localizamos uma tabela de cores obrigatória: cada serviço define a sua no procedimento de limpeza, e a cor não diz nada sobre resistência química.',
          '<strong>Conforto:</strong> forro interno ajuda com o suor em turno longo, e palma com relevo segura melhor o objeto molhado. Os dois são escolha de conforto, não de proteção.',
          '<strong>Descartável:</strong> só para produto e tempo de contato que o CA dela declara. Na limpeza do dia a dia, a descartável fina é exatamente a troca que este texto explica abaixo.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'O passo a passo para escolher pela ficha do produto está em <a href="/conhecimento/luva-para-produto-quimico-como-escolher/">como escolher luva pelo produto químico</a>, e o conjunto de EPI de quem limpa em <a href="/para-seu-trabalho/limpeza-e-conservacao/">EPI para limpeza e conservação</a>.',
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
        titulo: 'Anvisa — RDC nº 547/2021, requisitos mínimos para luvas cirúrgicas e para procedimento não cirúrgico (cópia da SES-SP)',
        url: 'https://ses.sp.bvs.br/wp-content/uploads/2021/08/U_RS-MS-ANVISA-RDC-547_300821.pdf',
      },
      {
        titulo: 'Coren-BA — Parecer técnico 003: utilização da luva de vinil em unidade básica de saúde',
        url: 'https://www.coren-ba.gov.br/wp-content/uploads/2016/06/PT-003-UTILIZAÇÃO-DA-LUVA-DE-VINIL-EM-UNIDADE-BÁSICA-DE-SAÚDE.pdf',
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
        pergunta: 'Qual a diferença entre luva estéril e luva de procedimento?',
        resposta:
          'A estéril, ou cirúrgica, é esterilizada, vem aos pares e tem formato para cada mão; é a do procedimento invasivo e do campo estéril. A de procedimento não é estéril, serve nas duas mãos e é usada no contato com sangue, secreção ou material contaminado em procedimentos não invasivos.',
      },
      {
        pergunta: 'Qual luva se usa na enfermagem?',
        resposta:
          'As duas, em momentos diferentes: luva de procedimento na maior parte da rotina, como higiene, curativo simples e coleta, e luva estéril nos procedimentos invasivos. Para limpeza de superfície e manuseio de saneante, nenhuma delas: o caso é luva de proteção química.',
      },
      {
        pergunta: 'Luva descartável serve para produto químico?',
        resposta:
          'Depende do produto e do que consta no Certificado de Aprovação da luva. Existem descartáveis com resistência química declarada para situações específicas — o que não existe é descartável que sirva para qualquer produto.',
      },
      {
        pergunta: 'Qual luva usar para limpar banheiro?',
        resposta:
          'Luva de proteção química com Certificado de Aprovação, escolhida pelo produto usado, e de cano longo, porque desincrustante, cloro e ácido respingam no antebraço. A luva fina descartável e a luva doméstica sem CA não servem para esse uso no trabalho.',
      },
      {
        pergunta: 'Qual luva usar na higienização hospitalar?',
        resposta:
          'Luva de proteção química, mais espessa, reutilizável e com punho compatível com o alcance do contato — escolhida a partir do produto que a equipe usa, e não da caixa que já está no almoxarifado.',
      },
    ],
    ctaTitulo: 'Quer conferir se a luva da sua equipe é a certa?',
    ctaTexto:
      'Diga qual produto químico é manuseado e por quanto tempo. Dá para verificar se o material da luva corresponde, e o CA vem junto no orçamento.',
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
    atualizado: '2026-10-05',
    atualizadoExibicao: 'outubro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'A peça facial filtrante (PFF) retém material particulado: poeira, névoa, fumo. Ela não retém vapor nem gás químico. Para isso é preciso respirador com filtro químico apropriado à substância. Outro equipamento, com outro Certificado de Aprovação.',
      },
      {
        tipo: 'p',
        texto:
          'É o erro mais perigoso da nossa rotina, e o mais silencioso. A pessoa está usando máscara, a empresa entregou EPI, a ficha está assinada. E a proteção contra o risco que existe ali é zero. Como vapor químico nem sempre tem cheiro forte, a falha só aparece em exame ou em sintoma.',
      },
      {
        tipo: 'h2',
        texto: 'Partícula e vapor são coisas diferentes',
      },
      {
        tipo: 'p',
        texto:
          'A PFF funciona como uma peneira muito fina: o material do filtro segura partículas sólidas e líquidas suspensas no ar. Vapor químico não é partícula. São moléculas em fase gasosa, e elas atravessam esse material sem resistência.',
      },
      {
        tipo: 'p',
        texto:
          'Reter vapor exige outro princípio: um filtro químico, com material que adsorve aquele tipo de substância. É por isso que filtro químico tem indicação de uso e vida útil próprias, e não serve para qualquer produto.',
      },
      {
        tipo: 'h2',
        texto: 'Para que serve a PFF2, então',
      },
      {
        tipo: 'p',
        texto:
          'Para partícula no ar: poeira de obra, de madeira e de grão, névoa que não é oleosa, fumo metálico e aerossol com agente biológico, como em serviço de saúde. É uma peça descartável, e todo modelo vendido como EPI tem Certificado de Aprovação, com o número impresso na própria máscara e consultável no <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">sistema do CA</a>.',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Com ou sem válvula:</strong> a válvula facilita a expiração e deixa a máscara menos quente e úmida, com a mesma proteção para quem usa. Mas o ar que sai pela válvula não é filtrado, e por isso, onde a máscara também precisa proteger quem está em volta, como em atendimento de saúde, o modelo é sem válvula.',
          '<strong>PFF2 e N95:</strong> N95 é a classificação americana, e PFF2 é a brasileira. As duas são de partícula e com eficiência parecida, mas, no trabalho, vale a PFF2 com Certificado de Aprovação brasileiro.',
          '<strong>Fumaça:</strong> é mistura. A parte de partícula a PFF2 retém; os gases da fumaça, como o monóxido de carbono, passam direto.',
          '<strong>Pintura:</strong> com tinta à base de solvente, não, porque o solvente evapora e vira vapor. A névoa da pistola é partícula, e por isso pintura costuma pedir filtro combinado, para os dois.',
          '<strong>Produto de limpeza:</strong> o cheiro que incomoda na diluição é vapor ou gás, e a PFF2 não segura nenhum dos dois.',
          '<strong>PFF2 com carvão ativado:</strong> a camada de carvão reduz o incômodo do odor, mas a peça continua sendo para partícula, como explicado em <a href="/conhecimento/respirador-como-escolher-o-filtro/">como escolher o filtro do respirador</a>.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'PFF1, PFF2 e PFF3 diferem na eficiência de filtração de partículas, que cresce de uma para a outra: a PFF2 retém pelo menos 94% das partículas no ensaio, mais que a PFF1, e a PFF3 retém mais que as duas. A classe certa vem do agente e do nível de exposição, e a comparação completa está em <a href="/protecao/respiratoria/">proteção respiratória</a>.',
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
          'Nesses casos a PFF pode ser necessária para a parte particulada da exposição. Mas não substitui o filtro químico, e a combinação certa depende da substância.',
      },
      {
        tipo: 'h2',
        texto: 'Qual máscara usar para produto químico',
      },
      {
        tipo: 'p',
        texto:
          'A máscara para produto químico é um respirador reutilizável com cartucho, e não uma peça descartável. Ela existe em dois formatos: a semifacial, que cobre nariz e boca, e a facial inteira, que cobre também os olhos e é a escolha quando o produto irrita a vista. O que protege é o cartucho, escolhido pela classe da substância: vapores orgânicos para solvente, tinta e cola; gases ácidos, que é a classe que os fabricantes indicam para cloro; amônia; entre outras.',
      },
      {
        tipo: 'p',
        texto:
          'A classe sai da ficha de informações de segurança do produto, e não do nome comercial. Quando há partícula e vapor ao mesmo tempo, o filtro é combinado. O passo a passo da escolha do cartucho e da troca está em <a href="/conhecimento/respirador-como-escolher-o-filtro/">como escolher o filtro do respirador</a>.',
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
          'A definição do equipamento adequado para exposição química depende da avaliação de riscos da empresa, com medição quando for o caso, feita por profissional habilitado. O que este texto resolve é a confusão de categoria. Ela sozinha já responde por boa parte dos casos que chegam até nós.',
      },
      {
        tipo: 'h2',
        texto: 'A classe da PFF não muda isso',
      },
      {
        tipo: 'p',
        texto:
          'Uma dúvida que aparece em seguida: "e se eu usar uma PFF3, que é mais protetora?". A classe da PFF indica eficiência de filtração de partículas. Subir de classe retém mais particulado, e não cria capacidade de reter vapor. É outra dimensão do problema.',
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
        titulo: 'HU-UFMA/Ebserh — Caderno de respiradores (PFF2, N95 e uso em serviços de saúde)',
        url: 'https://www.gov.br/hubrasil/pt-br/hospitais-universitarios/regiao-nordeste/hu-ufma/governanca/gerencia-administrativa/gestao-de-pessoas/CadernodeRespiradoresHUUFMA.pdf',
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
        pergunta: 'Para que serve a PFF2?',
        resposta:
          'Para reter partícula suspensa no ar: poeira, névoa não oleosa, fumo metálico e aerossol com agente biológico. Ela não retém vapor nem gás, então não serve para solvente, tinta à base de solvente, cheiro de produto de limpeza ou os gases da fumaça.',
      },
      {
        pergunta: 'Qual máscara usar para trabalhar com cloro?',
        resposta:
          'Respirador com cartucho químico da classe que o fabricante indica para cloro, que costuma ser a de gases ácidos, conferida no Certificado de Aprovação do filtro. Se o produto irrita os olhos, facial inteira. A PFF2, com ou sem carvão, não serve.',
      },
      {
        pergunta: 'Quantas vezes posso usar a máscara PFF2?',
        resposta:
          'Não existe um número fixo. Ela é descartável e sai de uso quando fica suja, úmida, amassada, com elástico frouxo, quando passa a ficar difícil respirar por ela ou quando deixa de vedar no rosto, o que vier primeiro, respeitando a orientação do fabricante e do serviço onde é usada.',
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
      'Diga qual produto é manuseado e em que ambiente. Dá para verificar se a categoria está certa, e o CA vem junto no orçamento.',
  },
  {
    slug: 'biqueira-de-composite-ou-de-aco-qual-escolher',
    titulo: 'Biqueira de composite ou de aço: qual escolher?',
    tituloSeo: 'Biqueira de composite ou de aço: qual escolher',
    resumo:
      'As duas protegem igual quando atendem à norma. O que decide é a atividade: eletricidade, detector de metal, frio, quanto se caminha, e o que acontece depois de um impacto.',
    descricaoSeo:
      'Composite e aço protegem os dedos do mesmo jeito pela norma. A escolha é pela atividade: risco elétrico, detector de metal, frio, peso na jornada e custo.',
    publicado: '2026-09-04',
    atualizado: '2026-10-05',
    atualizadoExibicao: 'outubro de 2026',
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
          'Quase tudo o que se lê sobre esse assunto compara material. É o jeito errado de decidir, porque a proteção contra impacto está garantida nos dois pelo <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">Certificado de Aprovação</a>. Quem trabalha com eletricidade precisa de mais do que isso, e o assunto está em <a href="/conhecimento/epi-para-eletricista-o-que-muda/">EPI para eletricista</a>. O que muda entre uma biqueira e outra é o resto: o que ela faz com eletricidade, com o frio, com um detector de metal, com o peso de quem caminha o dia inteiro. E o que sobra dela depois de uma pancada forte.',
      },
      {
        tipo: 'h2',
        texto: 'O que a norma exige das duas',
      },
      {
        tipo: 'p',
        texto:
          'A ABNT NBR ISO 20345 define o calçado de segurança pela biqueira de proteção, com requisito de resistência a impacto de 200 joules e a compressão de 15 quilonewtons. O requisito é o mesmo para qualquer material. Uma biqueira de composite aprovada não é uma versão mais fraca da de aço: ela passou no mesmo ensaio.',
      },
      {
        tipo: 'p',
        texto:
          'Isso significa que, se o Certificado de Aprovação do modelo é de calçado de segurança, a proteção dos dedos está resolvida — seja qual for o material. Tudo o que vem abaixo é sobre o que acontece <em>além</em> do impacto.',
      },
      {
        tipo: 'h3',
        texto: 'Biqueira aguenta quantos quilos?',
      },
      {
        tipo: 'p',
        texto:
          'A norma não fala em quilos, e sim em energia e força, mas dá para traduzir. Os 200 joules do impacto equivalem a um objeto de 20 kg caindo de pouco mais de 1 metro sobre a ponta do pé. Os 15 quilonewtons da compressão equivalem ao peso de cerca de 1.500 kg apoiado sobre ela. Os números são os mesmos para aço e para composite, e acima deles nenhuma biqueira tem proteção garantida.',
      },
      {
        tipo: 'h3',
        texto: 'O que é composite',
      },
      {
        tipo: 'p',
        texto:
          'É o nome dado à biqueira de material não metálico, feita de compostos como fibras e resinas. Ela não é de plástico comum: para ser biqueira de proteção, passa pelo mesmo ensaio da de aço, e é por isso que costuma ser mais volumosa.',
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
          ['Eletricidade', 'Conduz', 'Não conduz, mas isso não torna o calçado isolante'],
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
          'A diferença de peso entre as duas é pequena por passo e enorme por jornada. Quem percorre um galpão o dia todo sente o calçado mais pesado no fim do turno. E calçado pesado é o segundo motivo mais comum de a pessoa preferir o tênis. Para quem caminha muito, composite costuma ser a escolha certa mesmo custando mais, porque o calçado que fica no pé é o único que protege.',
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
        texto: 'E a biqueira de PVC?',
      },
      {
        tipo: 'p',
        texto:
          'A dúvida aparece muito, e quase sempre mistura duas coisas. Bota de PVC é o material da bota, e ela pode vir com biqueira de aço, com biqueira de composite ou sem biqueira nenhuma. Já um "bico de PVC" ou de plástico, sem mais informação, costuma ser a biqueira de conformação, que dá forma à ponta e não é biqueira de proteção. A diferença não se vê por fora: só o Certificado de Aprovação diz se aquele modelo é calçado de segurança, e a distinção entre as categorias está em <a href="/conhecimento/calcado-ocupacional-ou-de-seguranca/">calçado ocupacional ou de segurança</a>.',
      },
      {
        tipo: 'h2',
        texto: 'O que acontece depois da pancada',
      },
      {
        tipo: 'p',
        texto:
          'Ninguém pensa nisso na compra, e é onde as duas mais diferem. Uma biqueira de aço que recebeu um impacto forte pode ficar amassada. E amassada ela fica pressionando os dedos, o que a pessoa nota. Uma biqueira de composite pode trincar ou perder resistência sem nenhum sinal por fora.',
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
        texto: 'A biqueira de aço foi proibida?',
      },
      {
        tipo: 'p',
        texto:
          'Não. A busca aparece com frequência, mas nenhuma norma proibiu a biqueira de aço no calçado de segurança: ela continua atendendo à mesma exigência de impacto e compressão que a de composite. O que mudou em 2026 foi outra coisa: desde 3 de fevereiro, o Certificado de Aprovação de calçado de segurança só é emitido ou renovado com certificação por organismo acreditado, pela <a href="https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/sst-portarias/2025/portaria-mte-no-122-altera-a-portaria-mtp-no-672_21.pdf" target="_blank" rel="noopener noreferrer">Portaria MTE nº 122/2025</a>. A regra vale para os dois materiais e muda a forma de certificar, não o que a biqueira precisa aguentar.',
      },
      {
        tipo: 'p',
        texto:
          'Restrição ao aço, quando existe, vem do local ou da atividade: linha com detector de metais, ou avaliação de riscos que pede calçado isolante. Nesses casos, a regra é daquele ambiente, e não do material.',
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
      {
        tipo: 'p',
        texto:
          'Quer ver como a biqueira entra no conjunto, junto com solado, cabedal e conforto? A ferramenta <a href="/ferramentas/qual-calcado-usar/">qual calçado profissional é ideal para você</a> monta o perfil inteiro a partir da sua atividade.',
      },
    ],
    fontes: [
      {
        titulo: 'Requisitos para calçados de segurança e ocupacionais (ABNT NBR ISO 20345 e 20347) — Target Normas',
        url: 'https://www.normas.com.br/visualizar/artigo-tecnico/2532/os-requisitos-para-os-calcados-de-seguranca-e-ocupacionais',
      },
      {
        titulo: 'Portaria MTE nº 122, de 29 de janeiro de 2025 — altera a Portaria MTP nº 672/2021 (certificação de calçados e luvas)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/sst-portarias/2025/portaria-mte-no-122-altera-a-portaria-mtp-no-672_21.pdf',
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
        pergunta: 'Biqueira de composite aguenta quantos quilos?',
        resposta:
          'O mesmo que a de aço, porque o ensaio é o mesmo: 200 joules de impacto, o equivalente a 20 kg caindo de pouco mais de 1 metro, e 15 quilonewtons de compressão, o peso de cerca de 1.500 kg apoiado. A norma fala em energia e força, e a conversão em quilos é só para ter a ordem de grandeza.',
      },
      {
        pergunta: 'É proibido usar biqueira de aço?',
        resposta:
          'Não existe proibição geral na norma de EPI. O que existe são locais onde o metal atrapalha, como linha com detector de metais, e atividades em que a avaliação de riscos pede outra coisa, como calçado isolante para eletricidade. Nesses casos a regra vem do local ou da avaliação, e a biqueira de composite resolve o detector, mas não torna o calçado isolante. O que mudou em 2026 foi a certificação exigida para emitir ou renovar o CA de calçado de segurança, igual para aço e composite.',
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
    atualizado: '2026-10-05',
    atualizadoExibicao: 'outubro de 2026',
    cluster: 'Calçados',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Grade de numeração é a lista de quantos pares de cada número a equipe precisa. É a primeira coisa que a gente pergunta em todo orçamento de calçado. E a que mais vem estimada, com "uns 40, uns 42". Grade estimada vira troca depois da entrega.',
      },
      {
        tipo: 'p',
        texto:
          'Num pedido de calçado para equipe, o item e a quantidade costumam vir certos. O que falta é o resto: doze pares, mas de que número? Sem a grade, o fornecedor não consegue responder preço e prazo. E quando responde com uma grade chutada, a devolução chega junto com a entrega. Este texto é o método que usamos há trinta anos, para você fazer antes de pedir.',
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
          'Pergunte a cada pessoa o número. E sempre que der, meça com a meia que ela vai usar no trabalho, de preferência no fim de um turno. Anote nome e número numa lista. Parece burocracia para uma equipe de oito; deixa de parecer no dia em que três pares voltam.',
      },
      {
        tipo: 'h3',
        texto: '2. Provar antes de fechar',
      },
      {
        tipo: 'p',
        texto:
          'Peça ao fornecedor um par de amostra do modelo escolhido por faixa de numeração e deixe a equipe experimentar. É o passo que ninguém quer fazer e o que mais evita troca, sobretudo <a href="/conhecimento/primeiro-pedido-de-epi-como-montar/">no primeiro pedido da equipe</a>: cada modelo tem uma forma, e o mesmo número pode calçar diferente de um modelo para outro — inclusive entre biqueira de aço e de composite, porque <a href="/conhecimento/biqueira-de-composite-ou-de-aco-qual-escolher/">a de composite é mais volumosa</a>.',
      },
      {
        tipo: 'h3',
        texto: '3. Separar forma feminina, quando houver',
      },
      {
        tipo: 'p',
        texto:
          'Calçado de segurança em forma feminina existe, com numeração e largura próprias. Quando a equipe tem mulheres, isso entra na grade como item separado, não como "o mesmo modelo no 35". Um modelo de forma masculina em numeração pequena costuma sobrar na largura e apertar no peito do pé.',
      },
      {
        tipo: 'h3',
        texto: '4. Somar por número: essa é a grade',
      },
      {
        tipo: 'p',
        texto:
          'Com a lista pronta, some quantas pessoas usam cada número. O resultado é a grade. E é ela que vai no pedido, não o total. Um exemplo, para ficar claro o formato:',
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
          'Os nomes são de exemplo. A coluna "quem" não vai para o fornecedor — fica com você, porque é ela que resolve a entrega e a troca sem ninguém experimentar de novo. Para não fazer a conta à mão, a <a href="/ferramentas/grade-de-numeracao/">calculadora de grade da equipe</a> soma a lista, sugere a reserva e monta a mensagem do pedido.',
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
        texto: 'Quem fica entre dois números',
      },
      {
        tipo: 'p',
        texto:
          'Calçado profissional vem em número inteiro, e é comum alguém dizer que usa "39/40". Essa pessoa prova os dois, com a meia de trabalho e de preferência no fim do turno, e fica com o que não encosta o dedo na biqueira e não deixa o calcanhar subir ao andar. O número escolhido é o que vai para a lista, e não os dois.',
      },
      {
        tipo: 'p',
        texto:
          'As pontas da grade pedem outro cuidado. Números muito pequenos e muito grandes costumam ter menos modelos disponíveis, e vale confirmar com o fornecedor antes de fechar o modelo da equipe inteira, para ninguém ficar de fora por falta do seu número.',
      },
      {
        tipo: 'h2',
        texto: 'E as curvas prontas de tamanho?',
      },
      {
        tipo: 'p',
        texto:
          'Tabelas e respostas de busca mostram curvas com a porcentagem de pessoas em cada número. Elas descrevem a média de muita gente, e servem para quem abastece uma loja. Numa equipe de doze, uma pessoa a mais ou a menos num número muda a grade inteira, e a curva não sabe quantas mulheres há na equipe nem quem usa o 45. A grade da equipe vem da lista da equipe. O mesmo vale para a "grade fechada" do atacado, a caixa com 12 pares do mesmo modelo distribuídos em numeração baixa ou alta: ela é feita para abastecer vitrine de loja, e comprar EPI nesse formato garante sobra em uns números e falta em outros.',
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
        pergunta: 'Quem usa 39/40 entra com qual número na grade?',
        resposta:
          'Com o número que servir na prova. A pessoa experimenta os dois com a meia de trabalho, de preferência no fim do turno, e fica com o que não encosta o dedo na biqueira e não deixa o calcanhar subir. Na grade entra um número só.',
      },
      {
        pergunta: 'Como funciona a numeração dos calçados?',
        resposta:
          'No Brasil se usa a numeração brasileira, diferente da europeia e da americana. E mesmo dentro dela, o mesmo número calça diferente de um modelo para outro, porque cada fabricante tem a sua forma. Por isso a grade de uma equipe se confirma na prova do modelo escolhido, e não numa tabela.',
      },
      {
        pergunta: 'Preciso separar forma feminina na grade?',
        resposta:
          'Sim, quando a equipe tem mulheres. Calçado de segurança em forma feminina tem numeração e largura próprias — um modelo masculino em numeração pequena sobra na largura e aperta no peito do pé.',
      },
    ],
    ctaTitulo: 'Já tem a grade da sua equipe?',
    ctaTexto:
      'Mande os números par a par, pelo construtor ou direto aqui. Com a grade na mão a resposta vem com preço e prazo na primeira mensagem. E sem grade, é a primeira coisa que vamos perguntar.',
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
    atualizado: '2026-10-06',
    atualizadoExibicao: 'outubro de 2026',
    cluster: 'Calçados',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Não existe prazo fixo em norma para trocar calçado de segurança. A substituição é por condição, não por calendário. E a data de validade que aparece no Certificado de Aprovação não é a vida útil do par que está no pé de alguém.',
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
        tipo: 'h3',
        texto: 'E as tabelas de tempo de uso de EPI?',
      },
      {
        tipo: 'p',
        texto:
          'É o prazo que mais circula, inclusive nas respostas de busca, e ele não vem de norma: é uma média de mercado, que mistura obra com escritório. Serve como ordem de grandeza e atrapalha como regra. Trocar todo mundo em seis meses joga fora par bom; esperar um ano deixa no pé par que já perdeu o solado no terceiro mês. O prazo que vale para a sua equipe é o que a sua própria ficha de entrega mostra, e a conta está em <a href="/conhecimento/quantos-pares-por-ano-calcular-a-reposicao/">quantos pares por ano</a>.',
      },
      {
        tipo: 'p',
        texto:
          'O mesmo vale para as tabelas de "tempo de uso de EPI" ou "validade de EPIs" que circulam com ano no título, do tipo botina 6 meses, capacete 1 ano. Não há tabela oficial do Ministério do Trabalho com prazo por equipamento: essas listas são referências internas de empresas e consultorias, e podem servir de ponto de partida para planejar compra, nunca de critério para tirar ou manter um par no pé.',
      },
      {
        tipo: 'p',
        texto:
          'O que pode existir é a referência do próprio fabricante. Alguns indicam, na embalagem ou no manual do modelo, um prazo de durabilidade, como dois anos. Ele funciona como limite: vale seguir, e a condição do par continua mandando antes. Um calçado com solado liso no oitavo mês sai de uso, mesmo que o fabricante fale em dois anos.',
      },
      {
        tipo: 'h2',
        texto: 'Qual NR fala sobre calçados',
      },
      {
        tipo: 'p',
        texto:
          'A regra geral é a NR-6, que trata de todo EPI: fornecer adequado ao risco, em perfeito estado, e substituir quando danificado. O que o calçado precisa aguentar está nas normas técnicas, a ABNT NBR ISO 20345 para o de segurança e a 20347 para o ocupacional, explicadas em <a href="/conhecimento/calcado-ocupacional-ou-de-seguranca/">NBR ISO 20345 e 20347</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Normas de setor somam regras. A que mais aparece é a NR-32, dos serviços de saúde: o item 32.2.4.5 determina que o empregador vede o uso de calçados abertos a quem está exposto a agente biológico. Ela não fixa prazo de troca, e a lógica continua a mesma: calçado fechado, íntegro e em condição de proteger. O conjunto de quem trabalha na saúde está em <a href="/para-seu-trabalho/enfermagem-e-saude/">EPI para enfermagem e saúde</a>.',
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
          'Na prática, isso significa duas coisas ao mesmo tempo. E uma delas com menos margem do que costuma parecer. Um calçado com o CA em dia pode estar impróprio hoje, se o solado estiver liso ou o cabedal rasgado: aí não há dúvida nenhuma, e a troca é pelo estado. Na direção contrária, o vencimento do CA daquele modelo não funciona como ordem de recolher o par do pé de quem já o usa. Mas também não é assunto encerrado, e <a href="/conhecimento/ca-vencido-o-epi-pode-continuar-em-uso/">merece uma leitura à parte</a>. O CA responde por "este modelo foi aprovado"; o estado do par responde por "este calçado ainda protege".',
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
          'Não precisa de sistema. Precisa de periodicidade e de alguém responsável. Uma conferência visual por mês, feita junto com outra rotina que já existe, resolve: virar o calçado e olhar o solado, olhar biqueira e costuras, e perguntar à pessoa se está incomodando. Essa última pergunta encontra mais problema que as outras duas juntas. E quando a resposta é sim, <a href="/conhecimento/botina-que-machuca-calcado-ou-numeracao/">nem sempre o caso é troca por desgaste</a>.',
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
      {
        tipo: 'p',
        texto:
          'Na hora de repor, vale checar se o próximo par deveria ser igual ao anterior. A ferramenta <a href="/ferramentas/qual-calcado-usar/">qual calçado profissional é ideal para você</a> monta o perfil pela atividade, e não pelo hábito.',
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
        pergunta: 'Qual é o prazo de troca de botina de segurança?',
        resposta:
          'Não há prazo em norma. A troca é imediata quando aparece dano, como solado liso ou descolando, biqueira à mostra, rasgo ou impacto forte, e programada quando o conforto e o amortecimento acabam. Os "6 meses a 1 ano" que circulam são média de mercado, não regra.',
      },
      {
        pergunta: 'Existe tabela oficial de tempo de uso de EPI?',
        resposta:
          'Não. As tabelas que circulam, com botina em 6 meses e capacete em 1 ano, são referências de empresas e consultorias, não do Ministério do Trabalho. O que vale é o estado do equipamento e, quando houver, o prazo indicado pelo fabricante do modelo.',
      },
      {
        pergunta: 'O que a NR-32 fala sobre calçados?',
        resposta:
          'Que o empregador deve vedar o uso de calçados abertos a quem está exposto a agente biológico, no item 32.2.4.5. Ela não dá prazo de troca: vale a regra geral da NR-6, de manter o calçado íntegro e substituí-lo quando danificado.',
      },
      {
        pergunta: 'Quem decide a hora da troca?',
        resposta:
          'Na prática, a segurança do trabalho ou a chefia direta, com a informação de quem calça. A pessoa percebe o solado escorregando e o desconforto antes de qualquer inspeção. E o par só chega ao ponto de acidente quando essa informação não tem para onde ir.',
      },
      {
        pergunta: 'Quanto tempo dura uma botina de segurança?',
        resposta:
          'Depende inteiramente da atividade. Um par de obra pode acabar em seis meses e um de manutenção leve durar dois anos. Por isso a resposta útil é a lista do que olhar, e não um número de meses.',
      },
    ],
    ctaTitulo: 'Na dúvida se o par já passou da hora?',
    ctaTexto:
      'Mande uma foto do solado e diga há quanto tempo está em uso e em que atividade. Dá para dizer se é caso de troca, e, se for, já sai com a reposição.',
  },
  {
    slug: 'luva-para-produto-quimico-como-escolher',
    titulo: 'Como escolher luva pelo produto químico que você manuseia',
    tituloSeo: 'Luva para produto químico: como escolher',
    resumo:
      'Não existe luva que resista a tudo. O método é partir da ficha do produto, e não do catálogo. Como ler, o que perguntar e onde a escolha costuma falhar.',
    descricaoSeo:
      'O método que parte da ficha do produto químico, não do material da luva: concentração, tempo de contato, permeação e o que conferir no CA antes de comprar.',
    publicado: '2026-09-04',
    atualizado: '2026-10-06',
    atualizadoExibicao: 'outubro de 2026',
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
          'Fabricantes de luva publicam tabelas de resistência química por produto, com o tempo estimado até a substância atravessar o material. É esse tempo que define por quanto tempo aquela luva serve para aquela tarefa, e é ele que ninguém consulta.',
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
          'Todo produto químico usado no trabalho deve ter uma FISPQ — Ficha de Informações de Segurança de Produtos Químicos, fornecida pelo fabricante. Desde a revisão da ABNT NBR 14725 de 2023, o documento passou a se chamar FDS, Ficha com Dados de Segurança, e as duas siglas vão conviver por um tempo nas embalagens e nos fornecedores. Ela tem uma seção específica de controle de exposição e proteção individual, e é ali que estão as recomendações de EPI para aquele produto. Se a empresa não tem a FISPQ dos produtos que usa, esse é o primeiro problema a resolver. E é o fornecedor do produto que deve entregá-la.',
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
        texto: 'Nitrílica, látex, PVC: qual luva para qual produto',
      },
      {
        tipo: 'p',
        texto:
          'As buscas pedem uma regra curta, do tipo nitrílica para óleo e solvente, PVC para ácido, látex para contato leve. Como ponto de partida, essas associações aparecem nas tabelas dos fabricantes. Como decisão, não bastam: há solvente que atravessa nitrílica rápido, e a concentração do ácido muda a resposta do PVC. Por isso o passo 3 do método existe. O comportamento geral de cada material está em <a href="/conhecimento/tipos-de-luva-qual-material-escolher/">qual material de luva escolher</a>.',
      },
      {
        tipo: 'h3',
        texto: 'A cor da luva não diz o material',
      },
      {
        tipo: 'p',
        texto:
          'Luva verde, preta, azul ou amarela é escolha do fabricante, e a mesma cor existe em materiais diferentes. O mesmo vale para "emborrachada": o termo cobre desde a luva inteira de borracha até a luva de tecido com banho só na palma, que deixa o dorso da mão exposto e não é barreira química. O que identifica a luva é o material e o uso aprovado escritos no CA.',
      },
      {
        tipo: 'h3',
        texto: '"Luva química" também é nome de creme',
      },
      {
        tipo: 'p',
        texto:
          'Parte das buscas por luva química é sobre outra coisa: o creme protetor de segurança, aplicado na pele, que o mercado chama de luva química ou luva invisível. Ele é EPI, com Certificado de Aprovação, e entrou na lista da NR-6 nos anos 1990, pela <a href="https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/sst-portarias/1994/portaria_26_ca_para_cremes.pdf" target="_blank" rel="noopener noreferrer">Portaria SSST nº 26/1994</a>. Os cremes são divididos em grupos pelo tipo de agente, como água-resistente para produto à base de água e óleo-resistente para óleo e solvente, e o grupo consta do CA.',
      },
      {
        tipo: 'p',
        texto:
          'O creme serve onde a luva atrapalha a tarefa ou em contato leve e eventual. Ele não substitui a luva química em imersão, em produto corrosivo ou em contato prolongado, e a escolha entre um e outro sai da mesma ficha de segurança do produto.',
      },
      {
        tipo: 'h3',
        texto: 'Produto corrosivo: ácido e base',
      },
      {
        tipo: 'p',
        texto:
          'Corrosivo é o produto que ataca a pele em contato direto, como os ácidos e as bases fortes de desincrustante, limpeza pesada e tratamento de superfície. Aqui o tempo de resistência da tabela e o punho pesam mais que em qualquer outro caso: o respingo chega ao antebraço, e luva curta deixa a pele descoberta justamente onde o produto escorre. A luva sozinha não fecha a proteção, como explica a seção abaixo.',
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
        texto: 'Os outros EPIs de quem trabalha com produto químico',
      },
      {
        tipo: 'p',
        texto:
          'A mesma seção da FDS que indica a luva indica o resto do conjunto, e ele costuma ter mais de uma peça:',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Olhos e rosto:</strong> óculos de ampla visão contra respingo, e protetor facial por cima quando há risco de jato, como na diluição. Detalhes em <a href="/protecao/olhos-e-face/">proteção dos olhos e da face</a>.',
          '<strong>Corpo:</strong> avental ou vestimenta impermeável ao produto, conforme a quantidade manuseada, em <a href="/protecao/corpo/">vestimentas de proteção</a>.',
          '<strong>Respiração:</strong> respirador com filtro químico quando há vapor ou gás. Máscara descartável de partícula não serve, como explica <a href="/conhecimento/mascara-descartavel-nao-protege-de-vapor-quimico/">PFF2 e produto químico</a>.',
          '<strong>Pés:</strong> calçado ou bota impermeável onde o produto chega ao chão.',
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
        titulo: 'Portaria SSST nº 26/1994 — Certificado de Aprovação para cremes protetores (PDF oficial)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/sst-portarias/1994/portaria_26_ca_para_cremes.pdf',
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
        pergunta: 'Quais EPIs usar para trabalhar com produtos químicos?',
        resposta:
          'Os que a ficha de segurança do produto indica na seção de controle de exposição. Costuma ser luva química escolhida pelo produto, óculos de ampla visão ou protetor facial, avental ou vestimenta impermeável e, havendo vapor ou gás, respirador com filtro químico.',
      },
      {
        pergunta: 'Luva verde ou preta é luva química?',
        resposta:
          'A cor não diz. A mesma cor existe em materiais diferentes, e luva de tecido com banho só na palma não é barreira química. O que identifica a luva para produto químico é o material e o uso aprovado que constam no Certificado de Aprovação.',
      },
      {
        pergunta: 'Posso reutilizar luva que já teve contato com produto químico?',
        resposta:
          'Depois de passado o tempo de resistência daquele material àquela substância, não. A substância já está dentro do material, e lavar por fora não devolve a proteção.',
      },
    ],
    ctaTitulo: 'Diga qual produto a sua equipe manuseia',
    ctaTexto:
      'Com o nome do produto, a concentração e o tipo de contato, dá para indicar o material e o punho certos, e conferir o CA junto. Se tiver a FISPQ, mande que ela adianta metade.',
  },
  {
    slug: 'quantos-pares-por-ano-calcular-a-reposicao',
    titulo: 'Quantos pares por ano: como calcular a reposição',
    tituloSeo: 'Quantos pares de calçado por ano para a equipe',
    resumo:
      'Não existe número universal, e quem promete um está chutando. O número sai da sua própria operação. E ele já está na ficha de entrega, se ela estiver preenchida.',
    descricaoSeo:
      'Quantos pares de calçado por ano para a equipe: a conta tem três parcelas. Como tirar o número do seu histórico e o que fazer no primeiro ano.',
    publicado: '2026-09-04',
    atualizado: '2026-10-07',
    atualizadoExibicao: 'outubro de 2026',
    cluster: 'Calçados',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Não existe "tantos pares por pessoa por ano". A vida útil depende da atividade, do piso, da jornada e da conservação, e varia mais entre duas funções da mesma empresa do que entre duas empresas do mesmo setor. O número certo é o da SUA operação. E se a ficha de entrega estiver preenchida, ele já está lá.',
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
        texto: 'O que a lei define, e o que ela não define',
      },
      {
        tipo: 'p',
        texto:
          'Nenhuma lei fixa quantos pares por ano. O artigo 166 da CLT obriga a empresa a fornecer o EPI gratuitamente, adequado ao risco e em perfeito estado de conservação e funcionamento, e a <a href="/conhecimento/nr-6-o-que-a-empresa-precisa-saber/">NR-6</a> manda substituir imediatamente quando ele é danificado ou extraviado. Isso define a obrigação pela condição do par: se o calçado acabou no quarto mês, o segundo par é devido no quarto mês, e se dura dois anos, não há segundo par a dar no primeiro. O custo é sempre da empresa, como explica <a href="/conhecimento/empresa-pode-descontar-epi-do-salario/">pode descontar EPI do salário</a>.',
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
          'Somadas por função, e não pela empresa inteira, as três dão o número do ano. Somar pela empresa inteira devolve uma média que não descreve ninguém. A mesma conta vale para qualquer EPI de reposição, como luva, protetor auricular e óculos: o que muda é a vida útil de cada item, e não a lógica.',
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
          'É o dado mais confiável que existe sobre a sua operação, porque foi medido nela. Nenhuma estimativa de fornecedor, inclusive a nossa, chega perto disso. E é por isso que a ficha bem preenchida vale muito além da fiscalização.',
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
          'Aí a estimativa é inevitável. As médias que circulam no mercado, de dois pares por ano em uso pesado como obra e um par em uso leve, servem como ponto de partida, desde que tratadas como chute educado e não como meta. E o jeito de errar menos é começar pela função mais exigente e não pela média. Estime a reposição das funções de campo separadamente das administrativas, deixe a reserva calculada sobre as primeiras, e trate o primeiro ano como o ano de levantar o dado, não de acertar o número.',
      },
      {
        tipo: 'p',
        texto:
          'Isso significa registrar cada entrega com data e motivo desde o primeiro par. No ano seguinte, a conta deixa de ser estimativa.',
      },
      {
        tipo: 'h2',
        texto: 'Dois pares em rodízio',
      },
      {
        tipo: 'p',
        texto:
          'Onde o calçado molha ou a pessoa sua muito, ter dois pares e alternar entre um dia e outro costuma render mais do que comprar um par de cada vez. Cada par tem um turno inteiro para secar, e é a umidade que ataca forro, costura e adesivo, como explica <a href="/conhecimento/como-limpar-e-conservar-calcado-de-seguranca/">como limpar e conservar calçado de segurança</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Na conta do ano, o rodízio adianta a compra, porque a pessoa recebe dois pares de uma vez, e tende a espaçar as seguintes. Só a ficha de entrega dos meses seguintes mostra se compensou na sua operação.',
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
          '<strong>Reserva genérica.</strong> Guardar um par de cada número parece prudente e é a maneira mais cara de estocar calçado que ninguém vai usar. A reserva útil se concentra nos números mais frequentes da sua equipe, que a <a href="/conhecimento/grade-de-numeracao-como-definir-para-a-equipe/">grade de numeração</a> mostra de imediato. As margens de 10% a 20% que aparecem nas respostas de busca são uma convenção de planejamento, não regra; a <a href="/ferramentas/grade-de-numeracao/">calculadora de grade</a> deixa você escolher a porcentagem e distribui a reserva pelos números mais usados.',
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
      'Diga as funções, quantas pessoas em cada uma e como é o ambiente. Dá para chegar a uma estimativa de reposição junto. E ela melhora muito se você tiver o histórico das entregas.',
    perguntas: [
      {
        pergunta: 'Quantos pares de calçado por funcionário por ano?',
        resposta:
          'Não existe número universal, e quem dá um está chutando. Depende da atividade, do piso, da jornada e da conservação. O número da sua operação sai do histórico de entregas dos últimos doze meses, contado por função e não pela empresa inteira.',
      },
      {
        pergunta: 'A empresa é obrigada a dar quantos pares de botina?',
        resposta:
          'Não há número fixado em lei. A CLT e a NR-6 obrigam a empresa a fornecer gratuitamente e a substituir quando o calçado estiver danificado ou sem condição de proteger. Se o par acaba em quatro meses, a troca é devida em quatro meses, sem limite anual.',
      },
      {
        pergunta: 'Vale dar dois pares para usar em rodízio?',
        resposta:
          'Onde o calçado molha ou a pessoa sua muito, costuma valer: cada par seca um turno inteiro antes de voltar ao pé, e a umidade é o que mais encurta a vida do calçado. O histórico de entregas mostra depois se compensou.',
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
      'Escorregar quase nunca começa no calçado. Começa no piso, no produto de limpeza ou na gordura acumulada na própria sola, e dá para descobrir hoje, sem comprar nada.',
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
          'Quando um calçado que segurava passa a escorregar, alguma coisa mudou. E na maioria das vezes não foi o calçado. Antes de trocar, vale descobrir o quê: a investigação leva minutos, e a troca sem ela pode repetir o problema com um par novo.',
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
          'Lave a sola com escova e detergente comum, enxágue e deixe secar. Se a aderência volta, o problema era esse, e a solução é rotina de limpeza da sola, não par novo.',
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
      'A parte que a NR-6 responde não tem margem: o EPI é fornecido gratuitamente. A discussão sobre desconto começa depois disso, e quase sempre onde falta registro.',
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
          'O equipamento adequado ao risco, não o mais barato que existe, o adequado.',
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
          'A mesma NR-6 atribui deveres a quem usa: usar o equipamento apenas para a finalidade a que se destina, responsabilizar-se pela guarda e pela conservação, comunicar qualquer alteração que o torne impróprio para uso. É daí que sai o raciocínio de que, se a guarda é do trabalhador, a perda também seria, e é aí que o salto acontece.',
      },
      {
        tipo: 'p',
        texto:
          'A NR-6 não trata de desconto em folha. Ela diz o que a empresa fornece e o que o trabalhador faz com o que recebeu. Se um valor pode ou não ser descontado, em que hipótese e com qual formalidade, é matéria de direito do trabalho. E a resposta depende do caso, do que está escrito no contrato e do que a convenção coletiva da categoria estabelece.',
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
          'Em todos esses casos a resposta certa depende de documento, e o documento que mais pesa é o registro de entrega. Empresa que entrega EPI com ficha assinada, na numeração certa e com orientação registrada chega nessa conversa em outra posição, e, na prática, chega nela muito menos vezes.',
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
      'A resposta muda conforme o momento. Comprar com CA vencido está fora de questão; um item já entregue e íntegro é uma pergunta mais longa. E a resposta honesta não é um sim seco.',
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
          'Depende de onde o item está. Comprar ou entregar EPI com o CA vencido está fora de questão. Um par já entregue e em bom estado não vira impróprio na data em que o CA do modelo vence. Mas essa data é o aviso de que a reposição daquele modelo precisa ser resolvida, e não um assunto encerrado.',
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
          'O <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">Certificado de Aprovação</a> é do modelo, não do par. Ele diz que aquele equipamento, daquele fabricante ou importador, foi aprovado para uma finalidade descrita, e tem um prazo. Esse prazo é da aprovação do modelo no mercado. Não é uma data de vencimento estampada no item que a pessoa calça, veste ou respira.',
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
          'Vale dizer com clareza o que isso é e o que não é. <strong>Não existe na norma um dispositivo que autorize expressamente seguir usando o que já foi entregue.</strong> O que existe é ausência de regra mandando recolher. E ausência de proibição não é a mesma coisa que permissão escrita. Por isso a resposta honesta é que o vencimento do CA não funciona como gatilho de recolhimento imediato, e não que "pode usar até acabar".',
      },
      {
        tipo: 'p',
        texto:
          'O que costuma decidir a questão, quando ela é levantada, é outro dado: se o certificado estava vigente no momento da compra e da entrega. É esse registro que mostra que a empresa forneceu equipamento aprovado. E é ele que a <a href="/conhecimento/ficha-de-entrega-de-epi-o-que-precisa-constar/">ficha de entrega</a> guarda, quando traz o número do CA e a data.',
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
          'A situação de cada certificado é um dado do sistema oficial do Ministério do Trabalho e Emprego, e é lá que ela precisa ser conferida. Não na nota fiscal nem na memória de quem comprou. Consultar antes de concluir qualquer coisa evita tanto descartar equipamento bom quanto encomendar um modelo que já não pode ser fornecido.',
      },
      {
        pergunta: 'O número do CA precisa aparecer no registro de entrega?',
        resposta:
          'É o que torna o registro útil depois. Anotado com a data, ele mostra qual equipamento foi entregue e que o certificado estava vigente naquele momento — que é exatamente o dado pedido quando a pergunta sobre vencimento aparece meses ou anos mais tarde.',
      },
    ],
  },
  {
    slug: 'como-escolher-fornecedor-de-epi',
    titulo: 'Como escolher um fornecedor de EPI',
    tituloSeo: 'Como escolher fornecedor de EPI',
    resumo:
      'Preço igual em três propostas quase nunca é preço do mesmo item. O que pedir antes de fechar, como conferir sozinho, e quando um fornecedor pequeno não é a melhor escolha.',
    descricaoSeo:
      'O que exigir de um fornecedor de EPI antes de fechar: CA na proposta, descrição do que foi aprovado, reposição e troca de numeração. Com os sinais de risco.',
    publicado: '2026-09-05',
    atualizado: '2026-09-05',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Compra',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Um fornecedor de EPI precisa provar três coisas: que o item tem Certificado de Aprovação vigente, que esse CA cobre o risco da sua atividade, e o que acontece quando a numeração não serve. Preço e tamanho de catálogo vêm depois disso.',
      },
      {
        tipo: 'p',
        texto:
          'Quem compra EPI pela primeira vez costuma cotar como cota material de escritório. Manda a lista, junta três preços, fecha no menor. O problema aparece depois, e quase sempre no mesmo lugar: o item chegou, mas não é o item.',
      },
      {
        tipo: 'p',
        texto:
          'Três propostas com o mesmo preço quase nunca são do mesmo produto. Uma pode ser de um modelo com solado ensaiado para piso oleoso, outra de um modelo aprovado só para piso seco. As duas se chamam "botina de segurança" na planilha.',
      },
      {
        tipo: 'h2',
        texto: 'O que pedir antes de fechar',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>O número do CA de cada item, na proposta.</strong> Não depois, na nota. Na proposta, para dar tempo de conferir.',
          '<strong>A descrição do que aquele CA aprovou</strong>, e não só o número. É esse texto que precisa bater com o risco da sua atividade.',
          '<strong>A grade de numeração disponível</strong> e o prazo de reposição de cada faixa. Numeração extrema costuma ser o que atrasa.',
          '<strong>O que acontece quando um par não serve.</strong> Pergunte antes, por escrito, e antes de precisar.',
          '<strong>Quem responde.</strong> Se a resposta técnica depende de escalar para o fabricante, o prazo da sua dúvida é o prazo dele.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Nenhum desses cinco custa dinheiro ao fornecedor. Um fornecedor que trava em qualquer um deles está dizendo alguma coisa.',
      },
      {
        tipo: 'h2',
        texto: 'Como conferir sozinho, em dois minutos',
      },
      {
        tipo: 'p',
        texto:
          'Com o número do CA em mãos, a conferência é pública e independe do vendedor. A consulta oficial mostra o equipamento, o fabricante, a validade e a descrição do que foi aprovado. O caminho está em <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">o que é o CA e como consultar</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Confira dois pontos. Primeiro, se o certificado está vigente. Segundo, e mais importante, se a descrição bate com o seu risco. Um respirador aprovado para poeira tem CA em dia e não serve para vapor químico.',
      },
      {
        tipo: 'h2',
        texto: 'Os sinais de que vai dar problema',
      },
      {
        tipo: 'tabela',
        cabecalho: ['O sinal', 'O que costuma estar por trás', 'O que perguntar'],
        linhas: [
          ['A proposta não traz CA', 'Revenda que não sabe a procedência do que vende', 'Peça o CA de cada item por escrito'],
          ['Preço muito abaixo dos outros dois', 'Modelo diferente, ou grade incompleta escondida no total', 'Qual modelo exato, e quais numerações entram'],
          ['"Tem tudo, de todas as marcas"', 'Catálogo de intermediário, sem estoque próprio', 'Qual o prazo real para as numerações que você precisa'],
          ['Resposta técnica demora dias', 'Não há ninguém de segurança do trabalho do outro lado', 'Quem responde dúvida técnica, e em quanto tempo'],
          ['Troca de numeração "depende"', 'Não existe política, e você vai descobrir isso com o par no pé de alguém', 'Como funciona a troca, por escrito, antes de fechar'],
        ],
      },
      {
        tipo: 'h2',
        texto: 'Quando um fornecedor pequeno não é a melhor escolha',
      },
      {
        tipo: 'p',
        texto:
          'Esta parte é incômoda de escrever e é a mais útil do texto. A Tower é uma empresa de duas pessoas, e há casos em que a resposta honesta é procurar outro caminho.',
      },
      {
        tipo: 'lista',
        itens: [
          'Volume muito grande com prazo curto, do tipo que exige estoque parado esperando o seu pedido.',
          'Operação em vários estados, com entrega simultânea e nota por unidade.',
          'Exigência de estoque consignado dentro da sua empresa.',
          'Item muito específico de uma linha que o fornecedor não trabalha. Nesse caso, comprar direto de quem representa aquela linha sai melhor.',
          'Contrato que exige porte, certificação de fornecedor ou participação em pregão.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'E quando ele é',
      },
      {
        tipo: 'lista',
        itens: [
          'Equipe pequena ou média, em que a dúvida técnica aparece mais que o volume.',
          'Numeração que precisa de ajuste, e alguém disposto a resolver par a par.',
          'Atividade em que a escolha errada é cara, e vale ter quem entenda do risco atendendo direto.',
          'Reposição periódica, em que conhecer o histórico da equipe economiza tempo a cada pedido.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Vale dizer com todas as letras: preço importa. Só que preço de EPI só é comparável entre itens equivalentes, e a equivalência se estabelece pelo CA. Comparar antes disso é comparar duas coisas diferentes com o mesmo nome.',
      },
    ],
    fontes: [
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto oficial, PDF)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
    ],
    paginaComercial: {
      href: '/empresas/como-atendemos/',
      rotulo: 'Ver como a Tower atende empresas',
    },
    contexto: 'empresas',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Estou cotando EPI para a minha equipe e queria entender como vocês trabalham antes de pedir preço.',
    ctaTitulo: 'Está cotando com mais de um fornecedor?',
    ctaTexto:
      'Conte o que a sua equipe faz e quantas pessoas são. A gente responde com o CA de cada item, e diz na hora se o que você precisa não é o nosso caso.',
    perguntas: [
      {
        pergunta: 'O fornecedor tem que informar o CA na proposta?',
        resposta:
          'A NR-6 condiciona a venda e o fornecimento de EPI à indicação do Certificado de Aprovação, então o número existe e é identificável. Pedir na proposta, e não só na nota, é o que dá tempo de conferir antes de fechar. Fornecedor sério manda sem reclamar.',
      },
      {
        pergunta: 'Vale pedir amostra antes de fechar?',
        resposta:
          'Em calçado, quase sempre vale. Cada modelo tem uma forma, e o mesmo número calça diferente de um modelo para outro. Um par de amostra por faixa de numeração evita a troca depois, que é o custo escondido do primeiro pedido.',
      },
      {
        pergunta: 'Comparar três propostas pelo preço funciona?',
        resposta:
          'Só depois que as três forem do mesmo item. A equivalência se estabelece pelo número do CA e pela descrição do que ele aprovou. Duas botinas com o mesmo nome comercial e CAs diferentes podem ser aprovadas para riscos diferentes.',
      },
    ],
  },
  {
    slug: 'primeiro-pedido-de-epi-como-montar',
    titulo: 'Como montar o primeiro pedido de EPI da equipe',
    tituloSeo: 'Primeiro pedido de EPI da equipe',
    resumo:
      'Cinco dados resolvem. Quatro deles você já sabe de cabeça, e o quinto é o que trava todo mundo: a numeração.',
    descricaoSeo:
      'Os cinco dados que fazem o primeiro pedido de EPI andar, na ordem em que se levantam. E o que não precisa estar pronto para pedir orçamento.',
    publicado: '2026-09-05',
    atualizado: '2026-09-05',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Compra',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'O primeiro pedido trava sempre no mesmo ponto: a grade de numeração. Levantar pessoa a pessoa antes de pedir preço evita a troca que vem depois. É a parte chata, e é a que mais economiza.',
      },
      {
        tipo: 'p',
        texto:
          'A primeira compra de EPI de uma equipe costuma começar por uma lista de itens e terminar em três semanas de troca de mensagens. Não porque seja difícil, mas porque os dados chegam picados.',
      },
      {
        tipo: 'p',
        texto:
          'Com cinco informações o pedido sai numa conversa só. Quatro você já sabe. A quinta dá trabalho.',
      },
      {
        tipo: 'h2',
        texto: 'Os cinco dados',
      },
      {
        tipo: 'tabela',
        cabecalho: ['O dado', 'A pergunta que resolve', 'Onde isso já está explicado'],
        linhas: [
          ['A atividade de cada função', 'O que essa pessoa faz durante o turno, e onde ela pisa', 'Comece pela função, não pela pessoa'],
          ['O risco', 'O que pode acontecer com ela: queda de objeto, respingo, escorregamento, ruído', 'Vem da avaliação de riscos da empresa'],
          ['Quantas pessoas por função', 'Não o total da empresa. O total de cada função', 'É o que separa dois itens diferentes'],
          ['A grade de numeração', 'Quantos pares em cada número, par a par', 'Como definir a grade da equipe'],
          ['O prazo', 'Para quando precisa, e se é tudo junto ou em etapas', 'Muda a forma de fechar o pedido'],
        ],
      },
      {
        tipo: 'h2',
        texto: 'Comece pela função, não pela pessoa',
      },
      {
        tipo: 'p',
        texto:
          'Listar trinta nomes gera trinta linhas e nenhuma decisão. Listar seis funções gera seis decisões, e cada uma vale para todo mundo daquela função. A pessoa só volta a importar na hora da numeração.',
      },
      {
        tipo: 'p',
        texto:
          'Se duas funções pisam no mesmo chão e correm o mesmo risco, provavelmente usam o mesmo calçado. Se uma delas entra em câmara fria e a outra não, já são duas.',
      },
      {
        tipo: 'h2',
        texto: 'A grade é o passo que trava',
      },
      {
        tipo: 'p',
        texto:
          'É o único dos cinco que não se resolve numa reunião. Precisa perguntar a cada pessoa, e de preferência conferir, porque muita gente informa o número que usa em tênis. O caminho completo está em <a href="/conhecimento/grade-de-numeracao-como-definir-para-a-equipe/">como definir a grade de numeração de uma equipe</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Vale o atalho: se a equipe é grande, comece pelas funções mais críticas e mande o resto depois. Meia grade certa anda mais rápido que a grade inteira estimada.',
      },
      {
        tipo: 'h2',
        texto: 'Quanto pedir da primeira vez',
      },
      {
        tipo: 'p',
        texto:
          'Na primeira compra não existe histórico de desgaste, então a conta é diferente da reposição. O que costuma funcionar é fechar o necessário para todo mundo mais uma reserva pequena de numeração comum, e observar o desgaste real antes de definir a periodicidade. A conta completa está em <a href="/conhecimento/quantos-pares-por-ano-calcular-a-reposicao/">quantos pares por ano</a>.',
      },
      {
        tipo: 'h2',
        texto: 'O que não precisa estar pronto',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>O nome do produto.</strong> Descrever a atividade basta. Quem vende é que precisa saber o nome.',
          '<strong>O número do CA.</strong> Ele vem no orçamento, e serve justamente para você conferir depois.',
          '<strong>A grade inteira.</strong> Dá para pedir com o que já tem e completar antes de fechar.',
          '<strong>Uma decisão sobre marca.</strong> A marca é consequência do risco, e não o contrário.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'O que precisa estar pronto é o entendimento do risco. Isso vem da avaliação de riscos da sua empresa, feita por profissional habilitado, e nenhum fornecedor substitui esse documento.',
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
      href: '/orcamento/',
      rotulo: 'Montar o orçamento',
    },
    contexto: 'orcamento',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. É a primeira vez que compro EPI para a equipe e queria ajuda para montar o pedido.',
    ctaTitulo: 'É o primeiro pedido da equipe?',
    ctaTexto:
      'Conte quantas funções existem e o que cada uma faz. A gente ajuda a montar a lista antes de falar em preço, e a grade pode chegar depois.',
    perguntas: [
      {
        pergunta: 'Dá para começar só por uma função?',
        resposta:
          'Dá, e costuma ser o caminho mais rápido em equipe grande. Feche a função mais crítica primeiro, veja como o par se comporta em duas semanas de uso real, e use isso para decidir o resto. Errar em seis pares é barato; errar em sessenta, não.',
      },
      {
        pergunta: 'Como levantar a numeração sem medir todo mundo?',
        resposta:
          'Perguntando, com uma ressalva. Muita gente informa o número que calça em tênis, e calçado profissional costuma calçar diferente. Um par de amostra por faixa, deixado com a equipe por alguns dias, resolve o que a lista sozinha não resolve.',
      },
      {
        pergunta: 'Preciso saber o nome do produto para pedir?',
        resposta:
          'Não. Descrever o que a pessoa faz e onde ela trabalha é suficiente, e é uma informação melhor do que o nome do produto. Quem escolhe pelo nome que ouviu falar costuma escolher pelo item errado.',
      },
    ],
  },
  {
    slug: 'protetor-auditivo-plug-ou-concha',
    titulo: 'Plug ou concha: qual protetor auditivo usar',
    tituloSeo: 'Protetor auditivo: plug ou concha?',
    resumo:
      'Os dois protegem. O que decide é o que acontece no meio do turno: quem tira, quem coloca errado, quem não escuta o colega. A escolha é de rotina, não de catálogo.',
    descricaoSeo:
      'Como decidir entre protetor de inserção e concha pela rotina real da equipe: calor, retirada frequente, óculos, comunicação e a atenuação que consta no CA.',
    publicado: '2026-09-05',
    atualizado: '2026-09-05',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Os dois tipos protegem quando a atenuação atende ao ruído medido. O que separa um do outro é a rotina: quantas vezes a pessoa tira e recoloca, se usa óculos ou capacete, se o ambiente é quente, e se ela precisa ouvir alguém. Protetor que sai da orelha no meio do turno tem atenuação zero.',
      },
      {
        tipo: 'p',
        texto:
          'A escolha entre inserção e concha costuma ser tratada como preferência pessoal. Não é bem isso. Cada um falha de um jeito diferente, e o jeito de falhar é que decide qual serve para a sua equipe.',
      },
      {
        tipo: 'p',
        texto:
          'Antes de qualquer comparação, um ponto que não se negocia: a atenuação necessária vem da medição de ruído da atividade, feita pela empresa. Nenhum catálogo substitui esse número, e ele é o que define quais modelos entram na conversa. O que consta no <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">Certificado de Aprovação</a> de cada protetor é a atenuação que ele foi aprovado para oferecer.',
      },
      {
        tipo: 'h2',
        texto: 'Como cada um falha',
      },
      {
        tipo: 'tabela',
        cabecalho: ['', 'Inserção (plug)', 'Concha (abafador)'],
        linhas: [
          ['A falha mais comum', 'Colocado sem vedar, o que a pessoa não percebe', 'Afastado da orelha por haste de óculos ou cabelo'],
          ['Retirada frequente', 'Ruim: cada recolocação é uma chance de errar', 'Bom: sai e volta em um gesto'],
          ['Ambiente quente', 'Bom: não abafa a cabeça', 'Ruim: esquenta, e é o que faz a pessoa tirar'],
          ['Com óculos ou capacete', 'Não conflita', 'Conflita, a menos que seja modelo para capacete'],
          ['Higiene', 'Exige mão limpa a cada colocação', 'Não entra no canal auditivo'],
          ['Conferência pela chefia', 'Difícil ver de longe se está bem colocado', 'Fácil: ou está na cabeça, ou não está'],
        ],
      },
      {
        tipo: 'p',
        texto:
          'Repare que as duas colunas se invertem conforme a linha. É por isso que a pergunta "qual é melhor" não tem resposta fora do contexto da tarefa.',
      },
      {
        tipo: 'h2',
        texto: 'A regra prática que funciona',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Ruído contínuo, pessoa fixa num posto, ambiente quente:</strong> inserção costuma se sustentar melhor ao longo do turno.',
          '<strong>Entra e sai da área ruidosa o tempo todo:</strong> concha, porque cada recolocação de plug é uma chance de vedar mal.',
          '<strong>Já usa óculos de proteção ou capacete:</strong> confira a compatibilidade antes. Concha e haste de óculos disputam o mesmo espaço.',
          '<strong>Precisa conversar ou ouvir alarme:</strong> esse é um critério de segurança por si só, e muda a escolha do modelo.',
          '<strong>Dúvida real entre os dois:</strong> deixe as duas opções com a equipe por alguns dias. A que continua na orelha no fim do turno é a resposta.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O erro que anula os dois',
      },
      {
        tipo: 'p',
        texto:
          'Protetor auditivo é o EPI que mais sai do corpo durante o trabalho. Sai para atender o rádio, para entender uma instrução, porque incomoda no calor, porque a pessoa vai ficar "só um minuto" na área.',
      },
      {
        tipo: 'p',
        texto:
          'Cada minuto sem proteção pesa muito mais do que parece, porque a exposição é cumulativa ao longo do turno. Um protetor de atenuação alta usado metade do tempo protege menos que um de atenuação adequada usado o tempo inteiro. É por isso que conforto entra aqui como critério técnico, e não como luxo.',
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'O nível de ruído medido na atividade. Sem ele, não há como saber se o modelo atende.',
          'A atenuação que consta no CA do modelo, e não a do catálogo do fabricante.',
          'A compatibilidade com os outros equipamentos que a pessoa já usa.',
          'Se existe necessidade de comunicação, e como ela será resolvida.',
          'Quantas vezes por turno a pessoa entra e sai da área ruidosa.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'A perda auditiva induzida por ruído é gradual e não dói. Quando a pessoa percebe, o dano já aconteceu, e ele não volta. É a razão de este ser um dos EPIs em que a disciplina de uso vale mais que a especificação.',
      },
    ],
    fontes: [
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto oficial, PDF)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
    ],
    paginaComercial: {
      href: '/protecao/auditiva/',
      rotulo: 'Ver proteção auditiva',
    },
    contexto: 'protecao-auditiva',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Preciso de protetor auditivo para a equipe e queria ajuda para decidir entre inserção e concha.',
    ctaTitulo: 'Em dúvida entre plug e concha?',
    ctaTexto:
      'Conte o nível de ruído medido, quantas vezes a pessoa entra e sai da área, e o que mais ela usa na cabeça. Dá para resolver a escolha antes de comprar.',
    perguntas: [
      {
        pergunta: 'Usar os dois ao mesmo tempo dobra a proteção?',
        resposta:
          'Não dobra. O uso combinado aumenta a atenuação, mas bem menos do que a soma dos dois, porque o som também chega por condução óssea. É uma decisão que depende do nível de ruído medido e não deve ser tomada por conta própria.',
      },
      {
        pergunta: 'Algodão no ouvido serve para nada mesmo?',
        resposta:
          'Não serve, e é perigoso justamente por parecer que serve. Algodão não veda o canal auditivo, não tem atenuação ensaiada e não tem Certificado de Aprovação. A pessoa fica com a sensação de estar protegida, que é o pior resultado possível.',
      },
      {
        pergunta: 'De quanto em quanto tempo troca?',
        resposta:
          'Depende do tipo. O de inserção reutilizável e a concha se avaliam pelo estado: espuma endurecida, haste frouxa e almofada ressecada param de vedar. O descartável é de uso único. Na dúvida, o critério é a vedação, não o calendário.',
      },
    ],
  },
  {
    slug: 'epi-para-eletricista-o-que-muda',
    titulo: 'EPI para eletricista: o que muda na escolha',
    tituloSeo: 'EPI para eletricista: o que muda',
    resumo:
      'Aqui a compra por aparência é mais perigosa que em qualquer outro EPI, porque a bota que isola e a que conduz são visualmente iguais. O que precisa estar resolvido antes de cotar.',
    descricaoSeo:
      'EPI para eletricista: por que a escolha muda, o que a aparência do equipamento não mostra e o que definir antes de pedir o orçamento.',
    publicado: '2026-09-05',
    atualizado: '2026-09-05',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Duas botinas podem ser idênticas na foto e ter comportamento elétrico oposto. Em trabalho com eletricidade, o que vale é o que o Certificado de Aprovação declara para aquele modelo, e a especificação vem da análise de risco feita por profissional habilitado. Este texto ajuda a chegar preparado nessa conversa, e não a substituí-la.',
      },
      {
        tipo: 'p',
        texto:
          'Começando pelo que este texto não faz. Ele não diz qual EPI a sua equipe deve usar. Trabalho com eletricidade é regido por norma própria, e a definição do equipamento depende do tipo de instalação, da tensão, do procedimento e do estudo de risco da sua empresa. Quem faz isso é profissional habilitado, não um site.',
      },
      {
        tipo: 'p',
        texto:
          'O que dá para adiantar é o que costuma dar errado na hora de comprar, e isso vale a leitura.',
      },
      {
        tipo: 'h2',
        texto: 'A aparência não diz nada',
      },
      {
        tipo: 'p',
        texto:
          'Este é o ponto central. Em quase todo EPI, uma boa foto já elimina metade dos erros: dá para ver se a luva é de procedimento ou química, se a máscara tem filtro. Em eletricidade, não.',
      },
      {
        tipo: 'p',
        texto:
          'Uma botina com biqueira de composite não conduz eletricidade pela biqueira, e isso <a href="/conhecimento/biqueira-de-composite-ou-de-aco-qual-escolher/">não torna o calçado isolante</a>. São duas afirmações diferentes, e confundir as duas é o erro mais comum da categoria. Isolamento elétrico é uma característica ensaiada e declarada, não uma consequência do material da biqueira.',
      },
      {
        tipo: 'p',
        texto:
          'O mesmo vale para luva. Luva de vaqueta tem aparência robusta e não é luva isolante. Luva isolante para eletricidade é outra categoria, com ensaio próprio, e costuma ter regra de inspeção e de reteste que a luva comum não tem.',
      },
      {
        tipo: 'h2',
        texto: 'O que precisa estar definido antes de cotar',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Que tipo de trabalho é.</strong> Instalação predial, rede, painel, manutenção em campo. Cada um pede uma lista diferente.',
          '<strong>Se há trabalho energizado</strong>, e em que condições. Isso muda a categoria do equipamento por completo.',
          '<strong>A tensão envolvida.</strong> É o dado que separa classes de equipamento isolante.',
          '<strong>O que a análise de risco da empresa já determinou.</strong> Se o documento existe, ele é a lista. Se não existe, é por aí que se começa, e não pelo orçamento.',
          '<strong>Quem é o responsável técnico</strong> que assina a especificação.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Com esses cinco pontos, a cotação vira uma conversa de dez minutos. Sem eles, vira uma troca de mensagens que não conclui, porque ninguém do lado do fornecedor pode decidir por você.',
      },
      {
        tipo: 'h2',
        texto: 'O que um distribuidor pode e não pode fazer',
      },
      {
        tipo: 'tabela',
        cabecalho: ['Pode', 'Não pode'],
        linhas: [
          ['Informar o CA de cada item e o que ele declara', 'Definir qual EPI a sua atividade exige'],
          ['Dizer para que aquele modelo foi aprovado', 'Substituir a análise de risco da empresa'],
          ['Avisar quando o pedido não bate com a descrição do CA', 'Assinar responsabilidade técnica'],
          ['Indicar quando o item pedido não é da linha que trabalha', 'Garantir adequação sem conhecer a instalação'],
        ],
      },
      {
        tipo: 'p',
        texto:
          'A Tower é distribuidora. A coluna da esquerda é o que a gente faz de verdade, e a da direita é o que nenhum fornecedor sério promete. Quando um vendedor afirma que determinado item "serve para eletricista" sem perguntar nada sobre a instalação, isso é informação de venda, não de segurança.',
      },
      {
        tipo: 'h2',
        texto: 'A parte que vale para qualquer EPI, e aqui mais ainda',
      },
      {
        tipo: 'p',
        texto:
          'Confira o CA de cada item antes de aceitar a entrega, e confira o que ele descreve, não só o número. Um certificado vigente para uma finalidade que não é a sua é um certificado que não protege ninguém. O caminho da consulta está em <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">o que é o CA e como consultar</a>, e o número deve aparecer <a href="/conhecimento/como-escolher-fornecedor-de-epi/">já na proposta</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Para saber exatamente o que a norma exige em cada situação de trabalho com eletricidade, o caminho é a norma regulamentadora específica do tema, publicada pelo Ministério do Trabalho e Emprego, junto com o profissional que responde tecnicamente pela sua operação.',
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
      'Olá! Vim pelo site da Tower. Preciso de EPI para equipe que trabalha com eletricidade e já tenho a especificação do responsável técnico.',
    ctaTitulo: 'Já tem a especificação em mãos?',
    ctaTexto:
      'Mande o que o responsável técnico definiu. A gente responde com o CA de cada item e diz na hora se algum deles está fora da linha que trabalhamos.',
    perguntas: [
      {
        pergunta: 'Biqueira de composite deixa a botina isolante?',
        resposta:
          'Não. Composite não conduz pela biqueira, o que é diferente de o calçado ser isolante. Isolamento elétrico é uma característica ensaiada e declarada no Certificado de Aprovação do modelo. Se o CA não declara, o calçado não tem, mesmo com biqueira de composite.',
      },
      {
        pergunta: 'Quem define o EPI para trabalho com eletricidade?',
        resposta:
          'A análise de risco da empresa, conduzida por profissional habilitado, e não o fornecedor nem o catálogo. O distribuidor entra depois, informando o CA de cada item e o que ele declara. Fornecedor que define especificação de eletricidade sem conhecer a instalação está vendendo, não orientando.',
      },
      {
        pergunta: 'Luva de vaqueta serve para trabalho elétrico?',
        resposta:
          'Vaqueta é couro, e couro não é material isolante ensaiado. Existe luva isolante para eletricidade, que é outra categoria, com ensaio próprio e regras de inspeção. A aparência robusta da vaqueta engana justamente por parecer proteção suficiente.',
      },
    ],
  },
  {
    slug: 'tipos-de-luva-qual-material-escolher',
    titulo: 'Nitrílica, látex, vinílica ou neoprene: qual luva usar',
    tituloSeo: 'Tipos de luva de proteção: qual usar',
    resumo:
      'Cada material falha de um jeito diferente. O que a comparação de tipos resolve, o que ela não resolve, e por que a escolha final não sai de nenhuma lista genérica.',
    descricaoSeo:
      'Nitrílica, látex, vinílica e neoprene comparadas por resistência, tato e modo de falha — e por que a escolha final depende do produto manuseado e do CA da luva.',
    publicado: '2026-09-09',
    atualizado: '2026-09-09',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'A comparação de materiais serve para eliminar opções, e não para escolher a luva. Ela mostra que látex não fica de pé diante de óleo e que vinílica não aguenta esforço. Qual modelo resiste ao produto que a sua equipe manuseia, só a tabela de compatibilidade daquele fabricante responde.',
      },
      {
        tipo: 'p',
        texto:
          'Toda busca por tipo de luva termina na mesma tabela colorida, repetida em dezenas de sites, com uma coluna de "indicações" que serve para tudo. O problema não é a tabela existir. É ela ser tratada como decisão, quando é só o primeiro corte.',
      },
      {
        tipo: 'p',
        texto:
          'O que segue é a comparação honesta dos quatro materiais que aparecem em quase todo pedido, com o modo de falha de cada um. Depois dela, o que a comparação não alcança.',
      },
      {
        tipo: 'h2',
        texto: 'Onde cada material é forte, e como cada um falha',
      },
      {
        tipo: 'tabela',
        cabecalho: ['Material', 'Onde ele é forte', 'Como ele falha'],
        linhas: [
          [
            'Nitrílica',
            'Óleo, graxa e boa parte dos solventes. Boa resistência a furo e a rasgo, e sem a proteína que causa alergia ao látex.',
            'Perde para o látex em tato fino e em elasticidade. E descartável fina continua sendo descartável: não é luva de esforço.',
          ],
          [
            'Látex',
            'Tato e elasticidade. Veste como segunda pele, e é boa em tarefa que exige sensibilidade nos dedos.',
            'Não resiste a óleo nem a derivado de petróleo. A proteína natural é causa conhecida de alergia, e ela aparece na equipe com o uso repetido.',
          ],
          [
            'Vinílica (PVC)',
            'Preço, e ausência da proteína do látex. Serve para tarefa leve, curta e sem agressividade química.',
            'Ajuste frouxo, resistência mecânica baixa e barreira que se rompe cedo. É a que mais engana, porque a caixa é barata e o consumo é alto.',
          ],
          [
            'Neoprene',
            'Faixa química ampla, com ácido, base e parte dos solventes, mantendo flexibilidade.',
            'Custa mais. E o custo só se justifica quando a compatibilidade do produto mostra que as outras não atendem.',
          ],
        ],
      },
      {
        tipo: 'p',
        texto:
          'Nenhuma linha diz "a melhor". Elas se invertem conforme a tarefa, e é por isso que padronizar a equipe inteira num material só costuma sair caro: ou sobra proteção onde não precisa, ou falta onde precisava.',
      },
      {
        tipo: 'h2',
        texto: 'O que a comparação não decide',
      },
      {
        tipo: 'p',
        texto:
          'Resistência química não é propriedade do material sozinho. Ela depende do produto específico, da concentração, da temperatura, do tempo de contato e da espessura daquele modelo. O mesmo nitrílico resiste horas a um produto e minutos a outro.',
      },
      {
        tipo: 'p',
        texto:
          'Por isso a decisão final vem de dois documentos, e não de um artigo: a ficha de segurança do produto que a equipe manuseia, e a tabela de compatibilidade do modelo de luva. O caminho completo está em <a href="/conhecimento/luva-para-produto-quimico-como-escolher/">como escolher luva pelo produto químico</a>.',
      },
      {
        tipo: 'h2',
        texto: 'Espessura, punho e tamanho mudam mais do que parece',
      },
      {
        tipo: 'p',
        texto:
          'Escolhido o material, ainda restam decisões que mudam o resultado tanto quanto ele:',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Espessura.</strong> Aumenta o tempo até o produto atravessar e a resistência a furo, e reduz o tato. Luva grossa demais para serviço fino termina no bolso.',
          '<strong>Comprimento do punho.</strong> Quem mergulha a mão em recipiente precisa de cano longo. Respingo que entra pela borda anula a luva inteira.',
          '<strong>Textura da palma.</strong> Pegar peça molhada ou oleosa com luva lisa é como não usar luva: a pessoa aperta mais, cansa a mão e deixa cair.',
          '<strong>Forro.</strong> Conforta em jornada longa e atrapalha em tarefa que exige precisão. Também muda a higienização.',
          '<strong>Tamanho.</strong> Luva grande sobra na ponta e engancha; luva pequena rasga na costura e cansa a mão em meia hora.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O erro que aparece em quase todo estoque',
      },
      {
        tipo: 'p',
        texto:
          'É comprar uma caixa grande de um material só e usá-la para tudo, porque estava na prateleira. Funciona até o dia em que a tarefa muda e ninguém repara que a luva não acompanha.',
      },
      {
        tipo: 'p',
        texto:
          'O sinal de que isso está acontecendo é fácil de ver: luva descartada antes do fim do turno em quantidade alta, gente trabalhando com a luva enrolada no punho, ou luva de procedimento aparecendo na limpeza pesada — um caso que tem <a href="/conhecimento/luva-de-procedimento-nao-e-luva-de-limpeza/">nome e consequência própria</a>.',
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'O que a equipe manuseia, com nome de produto, e não só "produto de limpeza".',
          'A ficha de segurança desse produto, se houver, e a compatibilidade do modelo de luva com ele.',
          'Se alguém na equipe já teve reação a látex.',
          'A espessura e o comprimento de punho que a tarefa pede.',
          'O número do Certificado de Aprovação do modelo, que é o que torna aquela luva um EPI.',
          'Se a luva é de uso único ou reutilizável, e quem faz a higienização quando é reutilizável.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Vale lembrar por que o CA aparece nessa lista: <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">o Certificado de Aprovação</a> é o que liga o modelo ao risco para o qual ele foi ensaiado. Luva sem CA pode ser uma boa luva de uso geral, e ainda assim não é a resposta quando existe risco a proteger.',
      },
    ],
    fontes: [
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto oficial, PDF)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
    ],
    paginaComercial: {
      href: '/protecao/maos/',
      rotulo: 'Ver proteção para as mãos',
    },
    contexto: 'protecao-maos',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Queria ajuda para escolher o material de luva certo para o que a minha equipe manuseia.',
    ctaTitulo: 'Na dúvida entre dois materiais?',
    ctaTexto:
      'Conte o que a equipe manuseia e por quanto tempo a mão fica em contato. A gente responde qual material atende e o que ainda falta confirmar antes de fechar a caixa.',
    perguntas: [
      {
        pergunta: 'Luva mais grossa protege mais?',
        resposta:
          'Contra furo e abrasão, em geral sim. Contra produto químico não é tão simples: a espessura aumenta o tempo até o produto atravessar, mas o material errado atravessa de qualquer forma. E luva grossa demais tira o tato, o que faz a pessoa tirar a luva justamente na hora do serviço fino.',
      },
      {
        pergunta: 'Por que a luva incha ou fica pegajosa durante o uso?',
        resposta:
          'É sinal de que o material está sendo atacado pelo produto. Inchaço, endurecimento, pegajosidade e mudança de cor são avisos de que a barreira já está comprometida. A luva sai de uso na hora, mesmo sem furo visível, e o material precisa ser revisto.',
      },
      {
        pergunta: 'Luva sem CA serve para tarefa leve?',
        resposta:
          'Se ela está ali para proteger a pessoa de um risco, ela é EPI e precisa de Certificado de Aprovação. Existe luva de uso geral sem CA, para outras finalidades. O que define não é a tarefa parecer leve, e sim existir um risco de que a luva protege.',
      },
    ],
  },
  {
    slug: 'respirador-como-escolher-o-filtro',
    titulo: 'Respirador com filtro: como escolher o cartucho',
    tituloSeo: 'Respirador: como escolher o filtro',
    resumo:
      'O cartucho certo depende do que está no ar, e não do que a loja tem em estoque. A sequência de decisão, e o ponto em que nenhum filtro serve.',
    descricaoSeo:
      'Como escolher o filtro do respirador a partir do contaminante, da forma dele no ar e da rotina da equipe — e por que cheiro não serve como critério de troca.',
    publicado: '2026-09-09',
    atualizado: '2026-09-09',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Filtro não fabrica ar. Ele limpa o ar que existe. Onde falta oxigênio, ou onde a concentração é alta demais, nenhum cartucho resolve e o equipamento passa a ser de ar mandado. Essa pergunta vem antes da escolha do filtro, e não depois.',
      },
      {
        tipo: 'p',
        texto:
          'Quem chega até aqui já costuma saber que <a href="/conhecimento/mascara-descartavel-nao-protege-de-vapor-quimico/">máscara descartável não protege de vapor químico</a>. A pergunta seguinte é a difícil: então qual filtro, e como saber quando ele acabou.',
      },
      {
        tipo: 'h2',
        texto: 'A sequência que decide o filtro',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>O que está no ar.</strong> Nome do produto, não categoria. "Solvente" não escolhe filtro; o nome do solvente escolhe.',
          '<strong>Em que forma ele está.</strong> Poeira, névoa e fumo são partícula. Gás e vapor são outra coisa. Muita atividade tem os dois ao mesmo tempo.',
          '<strong>Em que concentração, e por quanto tempo.</strong> É o que define se o filtro dura um turno ou vinte minutos, e é medição da empresa.',
          '<strong>Se o ambiente tem oxigênio suficiente.</strong> Espaço confinado e tanque mudam a categoria de equipamento inteira.',
          '<strong>Quem vai usar.</strong> Tamanho da peça facial e vedação no rosto entram aqui, e valem tanto quanto o cartucho.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'Partícula, químico e combinado',
      },
      {
        tipo: 'tabela',
        cabecalho: ['O que está no ar', 'O que retém', 'O que não resolve'],
        linhas: [
          [
            'Poeira, névoa e fumo',
            'Filtro para partícula',
            'Gás e vapor atravessam sem serem retidos',
          ],
          [
            'Gás e vapor',
            'Filtro químico, escolhido pela família do produto',
            'Partícula satura o filtro sem ser o alvo dele',
          ],
          [
            'Os dois juntos',
            'Filtro químico com pré-filtro para partícula',
            'Nenhum dos dois sozinho cobre a mistura',
          ],
          [
            'Falta de oxigênio',
            'Nenhum filtro. O equipamento é de ar mandado',
            'Qualquer cartucho, em qualquer classe',
          ],
        ],
      },
      {
        tipo: 'p',
        texto:
          'A cor e a marcação impressas no cartucho ajudam a separar as famílias na prateleira, mas não são o critério de compra. O que vale é o que está na embalagem do modelo e no <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">Certificado de Aprovação</a> dele, porque é ali que consta para que aquele filtro foi ensaiado.',
      },
      {
        tipo: 'h2',
        texto: 'Cheiro não é critério de troca',
      },
      {
        tipo: 'p',
        texto:
          'A prática mais comum em campo é trocar o cartucho quando começa a sentir o cheiro do produto. É uma prática ruim por dois motivos, e os dois são graves.',
      },
      {
        tipo: 'p',
        texto:
          'O primeiro é que sentir o cheiro significa que o produto já passou pelo filtro e chegou ao nariz. A proteção já falhou quando o aviso chega. O segundo é que nem todo produto tem cheiro perceptível na concentração em que já faz mal — há substância que não avisa nada antes de causar dano.',
      },
      {
        tipo: 'p',
        texto:
          'A troca se organiza por rotina, com o dado de vida útil do fabricante para aquela condição de uso, e não por percepção. Anotar a data de abertura no próprio cartucho é o jeito mais simples de a rotina existir de verdade.',
      },
      {
        tipo: 'h2',
        texto: 'A vedação decide mais do que o filtro',
      },
      {
        tipo: 'p',
        texto:
          'Ar segue o caminho mais fácil. Se a borda da peça facial não sela no rosto, o ar entra por ali sem passar pelo filtro, e o cartucho mais caro do catálogo não muda esse resultado.',
      },
      {
        tipo: 'p',
        texto:
          'Isso coloca três coisas no mesmo nível de importância que a escolha do cartucho: o tamanho da peça facial ser o do rosto de quem usa, não haver pelo no caminho da borda de vedação, e a pessoa saber conferir a vedação antes de entrar na área.',
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'O nome do produto que gera o contaminante, e a ficha de segurança dele quando houver.',
          'Se o contaminante está no ar como partícula, como gás ou vapor, ou como os dois.',
          'A medição de concentração da atividade, que é o que define a vida útil do filtro.',
          'Se existe risco de deficiência de oxigênio ou trabalho em espaço confinado.',
          'O Certificado de Aprovação da peça facial e o do filtro, que são separados.',
          'O tamanho da peça facial para cada pessoa, e não um tamanho único para a equipe.',
          'A rotina de troca, de guarda em embalagem fechada e de higienização.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Vale a franqueza: essa é a família de EPI em que errar custa mais caro e demora mais a aparecer. Se a informação de concentração não existe, o certo é dizer isso e resolver a medição antes, e não escolher um filtro no escuro porque o pedido precisa fechar hoje.',
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
      'Olá! Vim pelo site da Tower. Preciso de respirador com filtro e queria ajuda para escolher o cartucho a partir do produto que a equipe usa.',
    ctaTitulo: 'Sabe o produto, mas não sabe o filtro?',
    ctaTexto:
      'Mande o nome do produto e a ficha de segurança, se tiver. A gente diz qual classe de filtro atende, e o que ainda falta medir antes de fechar.',
    perguntas: [
      {
        pergunta: 'Dá para usar o mesmo cartucho por vários dias?',
        resposta:
          'Depende do produto, da concentração e do tempo de uso, e a conta vem do dado do fabricante, não do calendário. O que não funciona é guardar o cartucho aberto no armário entre um dia e outro: fora de embalagem fechada ele continua saturando com o ar do ambiente.',
      },
      {
        pergunta: 'Barba impede o uso do respirador?',
        resposta:
          'Impede a vedação da peça facial no rosto, que é onde o ar entra sem passar pelo filtro. Pelo no caminho da borda de vedação compromete a proteção por mais adequado que seja o cartucho. Nesse caso a saída é outro tipo de equipamento, e não outro filtro.',
      },
      {
        pergunta: 'Máscara com carvão ativado resolve vapor químico?',
        resposta:
          'Não. A camada de carvão dessas máscaras existe para incômodo de odor, e não tem a capacidade de retenção de um filtro químico. Ela continua sendo uma peça para partícula. Havendo vapor no ar, o caminho é respirador com filtro químico adequado ao produto.',
      },
    ],
  },
  {
    slug: 'bota-de-pvc-quando-e-a-resposta-certa',
    titulo: 'Bota de PVC: quando ela é a resposta certa',
    tituloSeo: 'Bota de PVC: quando ela resolve',
    resumo:
      'Ela resolve um caso específico e cobra caro fora dele. A diferença entre o pé que fica dentro do líquido e o pé que só toma respingo muda o calçado inteiro.',
    descricaoSeo:
      'Quando a bota de PVC é a escolha certa, o que ela cobra em troca e como decidir entre ela e o calçado fechado impermeável — com o que conferir antes de comprar.',
    publicado: '2026-09-11',
    atualizado: '2026-09-11',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Calçados',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'A pergunta que decide não é "o ambiente é molhado?". É "o pé fica dentro do líquido?". Se fica, a bota de PVC é a resposta e quase nada substitui. Se não fica, ela costuma ser desconforto sem ganho, e um calçado fechado impermeável atende melhor.',
      },
      {
        tipo: 'p',
        texto:
          'A bota de PVC é uma das categorias mais compradas e menos explicadas do mercado de EPI. Ela é barata, todo mundo reconhece, e por isso acaba comprada por eliminação: molhou, põe bota. O resultado aparece duas semanas depois, com a equipe trabalhando de bota aberta no calcanhar ou de tênis escondido.',
      },
      {
        tipo: 'h2',
        texto: 'Onde ela ganha de qualquer outro calçado',
      },
      {
        tipo: 'p',
        texto:
          'O ponto forte dela é ser uma peça só, sem costura e sem entrada. Não existe cadarço por onde o líquido entre, nem cabedal que absorva, nem forro que guarde umidade. Onde o pé fica submerso ou quase, isso não tem concorrente:',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Lavagem de piso e de equipamento</strong>, em cozinha industrial, açougue e área de produção.',
          '<strong>Câmara fria, pescado e abate</strong>, onde o chão é lavado o tempo todo e a água não é só água.',
          '<strong>Concretagem</strong>, em que o pé fica dentro do concreto fresco e couro simplesmente não é material para isso.',
          '<strong>Limpeza pesada</strong>, com produto diluído escorrendo pelo chão.',
          '<strong>Irrigação, viveiro e lavagem de veículo</strong>, onde o dia inteiro é molhado por definição.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O que ela cobra em troca',
      },
      {
        tipo: 'p',
        texto:
          'Barreira total é barreira nos dois sentidos. O que impede o líquido de entrar também impede o suor de sair, e é daí que vêm quase todas as reclamações: pé encharcado por dentro no fim do turno, odor, e a sensação de peso que faz a pessoa arrastar o passo.',
      },
      {
        tipo: 'p',
        texto:
          'Some a isso o ajuste. A bota calça folgada por construção, e folga em jornada longa vira atrito, bolha e passo inseguro. Por isso ela é excelente por três horas de lavagem e questionável por oito horas de caminhada.',
      },
      {
        tipo: 'h2',
        texto: 'Como decidir entre as duas',
      },
      {
        tipo: 'tabela',
        cabecalho: ['O dia é assim', 'O que costuma resolver', 'Por quê'],
        linhas: [
          [
            'O pé fica dentro da água ou do produto',
            'Bota de PVC',
            'É a única que não tem por onde entrar líquido',
          ],
          [
            'Piso molhado, respingo, gordura, mas o pé não submerge',
            'Calçado fechado impermeável',
            'Protege do respingo e ainda deixa a jornada em pé viável',
          ],
          [
            'Lava o piso por um turno e faz outra coisa no resto',
            'Os dois, e a troca no meio do dia',
            'Um par certo para cada parte do dia sai mais barato que um par errado o dia todo',
          ],
          [
            'Existe risco de peso sobre o pé',
            'Modelo com biqueira, confirmado no CA',
            'Nem toda bota de PVC tem biqueira, e nenhuma tem por presunção',
          ],
        ],
      },
      {
        tipo: 'h2',
        texto: 'Biqueira: existe, mas não venha supondo',
      },
      {
        tipo: 'p',
        texto:
          'Bota de PVC existe nas duas versões, com e sem biqueira de proteção. A aparência não denuncia qual é qual, e a suposição errada é perigosa justamente porque o calçado parece robusto. A diferença entre as duas categorias está em <a href="/conhecimento/calcado-ocupacional-ou-de-seguranca/">calçado ocupacional ou de segurança</a>, e a confirmação está no <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">Certificado de Aprovação</a> do modelo.',
      },
      {
        tipo: 'h2',
        texto: 'O solado importa mais aqui do que em qualquer outro calçado',
      },
      {
        tipo: 'p',
        texto:
          'Quem usa bota de PVC trabalha, por definição, no piso mais escorregadio que a empresa tem. E a palavra antiderrapante não descreve uma característica única: o desempenho é ensaiado em superfícies e contaminantes específicos, como explica <a href="/conhecimento/solado-antiderrapante-o-que-significa/">o que significa solado antiderrapante</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Na prática isso quer dizer que água e gordura juntas pedem coisa diferente de água sozinha. É o dado que mais muda a escolha e o que mais falta quando o pedido chega.',
      },
      {
        tipo: 'h2',
        texto: 'A meia faz parte do equipamento',
      },
      {
        tipo: 'p',
        texto:
          'Parece detalhe e não é. Como a bota não respira, o que gerencia a umidade dentro dela é a meia. Meia de algodão encharca e fica encharcada; meia mais grossa, de secagem rápida, muda a percepção de conforto mais do que trocar de marca de bota.',
      },
      {
        tipo: 'p',
        texto:
          'Onde o turno é longo e molhado, dois pares de meia por dia resolvem mais reclamação do que qualquer outra medida barata.',
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'Se o pé realmente fica dentro do líquido, ou se o caso é de respingo.',
          'Quantas horas do turno são assim. É o que decide entre um par e dois.',
          'O que está no chão além da água: gordura, produto químico, resto orgânico.',
          'Se existe risco de impacto sobre o pé, e portanto se o modelo precisa de biqueira.',
          'Até onde o cano precisa chegar, considerando de onde o líquido vem.',
          'O número do CA do modelo, que é o que liga aquela bota ao risco para o qual ela foi ensaiada.',
          'Onde as botas ficam guardadas entre um turno e outro, e se secam de verdade.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Vale uma observação sobre produto químico: PVC resiste bem a muita coisa e mal a outras tantas, e isso depende do produto, da concentração e do tempo de contato. Quando a bota existe para proteger de um produto específico, e não da água, a compatibilidade daquele modelo com aquele produto precisa ser confirmada, do mesmo jeito que se faz com luva.',
      },
    ],
    fontes: [
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto oficial, PDF)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
    ],
    paginaComercial: {
      href: '/calcados/',
      rotulo: 'Ver os calçados que a Tower trabalha',
    },
    contexto: 'calcados',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Queria saber se o caso da minha equipe é de bota de PVC ou de calçado fechado impermeável.',
    ctaTitulo: 'Bota ou calçado fechado?',
    ctaTexto:
      'Conte quantas horas do turno o pé fica no molhado e o que escorre no chão além de água. Com isso dá para dizer qual das duas atende, e se o caso é de ter as duas.',
    perguntas: [
      {
        pergunta: 'Bota de PVC serve para usar o dia inteiro?',
        resposta:
          'Serve, mas raramente é a melhor ideia. Como ela não respira, o pé termina o turno úmido por dentro mesmo sem ter entrado água. Onde só parte do dia é molhada, dois pares e uma troca no meio do expediente resolvem melhor do que insistir em um par só.',
      },
      {
        pergunta: 'Dá para cortar o cano da bota para ficar mais fresca?',
        resposta:
          'Não. Cortar altera o produto, abre uma borda por onde o líquido entra e invalida a condição em que o modelo foi aprovado. Se o cano alto atrapalha, o caminho é um modelo de cano mais baixo, e não a adaptação do que já está no pé.',
      },
      {
        pergunta: 'Por que a bota racha na dobra do pé?',
        resposta:
          'É o ponto que mais flexiona, e ele envelhece primeiro com sol, calor e guarda dobrada. Bota guardada em pé, à sombra e seca por dentro dura bem mais. Rachadura ali já é fim de vida do par: o líquido passa, mesmo que a bota pareça inteira.',
      },
    ],
  },
  {
    slug: 'funcionario-recusa-usar-epi-o-que-fazer',
    titulo: 'Funcionário se recusa a usar o EPI: o que fazer',
    tituloSeo: 'Funcionário recusa usar EPI: o que fazer',
    resumo:
      'A resposta que a internet dá começa e termina em advertência. Antes disso existe uma pergunta que resolve a maior parte dos casos, e ela leva dez minutos.',
    descricaoSeo:
      'Funcionário se recusa a usar EPI: as cinco causas mais comuns, o que fazer em cada uma, como registrar e o que a NR-6 cobra de cada lado.',
    publicado: '2026-09-11',
    atualizado: '2026-09-11',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Normas',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Antes de tratar como indisciplina, vale gastar dez minutos descobrindo o porquê. Na maior parte dos casos a recusa tem causa física — o item não serve, machuca, embaça, esquenta ou atrapalha a tarefa — e causa física tem conserto. O que não tem conserto é insistir no item errado.',
      },
      {
        tipo: 'p',
        texto:
          'Procure essa dúvida e a primeira página inteira responde com medida disciplinar. A informação não está errada, mas ela começa no fim. Quem gerencia equipe sabe que advertir sem resolver a causa devolve o mesmo problema na semana seguinte, agora com uma relação pior.',
      },
      {
        tipo: 'h2',
        texto: 'O que a norma coloca de cada lado',
      },
      {
        tipo: 'p',
        texto:
          'A NR-6 distribui obrigações nos dois sentidos. Do lado do empregador está fornecer o equipamento adequado ao risco, gratuitamente, em perfeito estado, orientar e treinar sobre o uso, e substituir quando danificado ou extraviado. Do lado do trabalhador está usar o equipamento apenas para a finalidade a que ele se destina, responsabilizar-se pela guarda e conservação, comunicar qualquer alteração que o torne impróprio e cumprir as determinações do empregador sobre o uso adequado.',
      },
      {
        tipo: 'p',
        texto:
          'Ou seja: o uso não é opcional, e a adequação também não. As duas coisas estão no mesmo texto, e é por isso que a conversa sobre recusa começa checando se a empresa cumpriu a parte dela. O texto oficial e atualizado está no portal do Ministério do Trabalho e Emprego, e está linkado nas fontes ao final.',
      },
      {
        tipo: 'h2',
        texto: 'As causas que aparecem quase sempre',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Não serve.</strong> Numeração errada, largura errada, tamanho único para equipe inteira. É a campeã, de longe, e a que mais se conserta rápido.',
          '<strong>Machuca ou incomoda o bastante.</strong> Bolha, calor, óculos que embaça, protetor que aperta. Dor vence regra em toda equipe do mundo.',
          '<strong>Atrapalha a tarefa.</strong> Luva grossa demais para serviço fino, protetor que impede ouvir o colega. Aqui a pessoa tira para conseguir trabalhar.',
          '<strong>Ninguém explicou o risco.</strong> Quando o dano é invisível e lento, como ruído e vapor, a proteção parece exagero de quem não está lá.',
          '<strong>Não está disponível na hora.</strong> Acabou, está trancado, o responsável saiu. A recusa aqui nem é recusa, mas entra na conta como se fosse.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Repare que quatro das cinco não são sobre a pessoa. São sobre o item, sobre a informação ou sobre o processo de entrega.',
      },
      {
        tipo: 'h2',
        texto: 'O que fazer, na ordem',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Perguntar, e ouvir a resposta inteira.</strong> "Por que você não está usando" é uma pergunta de diagnóstico, não de acusação. O tom muda o que você vai descobrir.',
          '<strong>Testar a alternativa mais óbvia.</strong> Outro número, outro modelo, outro tipo. Boa parte dos casos morre aqui, no mesmo dia.',
          '<strong>Explicar o risco com o que acontece, e não com o nome da norma.</strong> Perda auditiva não dói e não volta; isso convence mais que citar item de norma.',
          '<strong>Registrar o que foi oferecido e o que foi recusado.</strong> Por escrito, com data e nome do item.',
          '<strong>Só então tratar como questão disciplinar.</strong> Qual medida cabe, e quando, é decisão da empresa com a assessoria jurídica dela — e é uma conversa muito mais firme depois que as quatro anteriores estão documentadas.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O sinal de que o problema não é a pessoa',
      },
      {
        tipo: 'p',
        texto:
          'É simples e vale mais que qualquer diagnóstico: se mais de uma pessoa recusa o mesmo item, o item é o problema. Recusa isolada pede conversa individual; recusa repetida no mesmo equipamento é aviso de compra errada, e insistir nela custa mais caro do que trocar.',
      },
      {
        tipo: 'p',
        texto:
          'O mesmo vale para o EPI que sai do corpo no meio do turno. Protetor auditivo pendurado no pescoço e óculos na testa não são desobediência aberta — são o item dizendo que não dá para usar oito horas.',
      },
      {
        tipo: 'h2',
        texto: 'O registro é o que sustenta qualquer caminho',
      },
      {
        tipo: 'p',
        texto:
          'Seja para provar que a empresa forneceu, seja para mostrar que ofereceu alternativa antes de escalar, o que sustenta os dois é o mesmo documento. O que ele precisa trazer está em <a href="/conhecimento/ficha-de-entrega-de-epi-o-que-precisa-constar/">ficha de entrega de EPI</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Vale registrar também a recusa em si, com a data, o item, o motivo que a pessoa deu e o que foi oferecido no lugar. Não é burocracia contra o funcionário: na maioria das vezes esse registro é o que mostra, três meses depois, que o modelo comprado não servia para ninguém.',
      },
      {
        tipo: 'h2',
        texto: 'Onde isso vira uma questão de compra',
      },
      {
        tipo: 'p',
        texto:
          'Recusa recorrente quase sempre nasce no pedido, e não no chão. Grade de numeração montada no olho, modelo escolhido pelo preço da caixa e equipe mista com um tamanho só produzem recusa de forma previsível.',
      },
      {
        tipo: 'p',
        texto:
          'É por isso que o assunto termina longe do RH e perto da compra: EPI que serve é usado, e EPI usado é o único que protege.',
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
      'Olá! Vim pelo site da Tower. A equipe está resistindo a usar um EPI e queria ajuda para descobrir se o problema é o modelo.',
    ctaTitulo: 'A equipe está deixando de usar algum item?',
    ctaTexto:
      'Conte qual é o item e o que as pessoas reclamam dele. Na maior parte das vezes dá para identificar se o caso é de numeração, de modelo ou de categoria errada.',
    perguntas: [
      {
        pergunta: 'A empresa pode obrigar o uso do EPI?',
        resposta:
          'A NR-6 coloca o uso entre as obrigações do trabalhador, junto com conservar o equipamento e cumprir as determinações do empregador sobre o uso adequado. O que a norma não faz é dizer qual medida cabe em cada situação: isso é decisão da empresa, tomada com a assessoria jurídica dela.',
      },
      {
        pergunta: 'Advertir resolve quando o EPI não serve?',
        resposta:
          'Não resolve, e costuma piorar. Se o item aperta, machuca ou impede a tarefa, a pessoa volta a tirar assim que ninguém olha, e agora com um desgaste a mais na relação. Trocar o item sai mais barato que repetir a advertência.',
      },
      {
        pergunta: 'Como registrar uma recusa?',
        resposta:
          'Por escrito, com data, o nome do item, o motivo que a pessoa deu e o que a empresa ofereceu no lugar. Esse registro serve para os dois lados: mostra que a empresa cumpriu a parte dela e, quando a recusa se repete entre pessoas diferentes, mostra que o modelo comprado é que está errado.',
      },
    ],
  },
  {
    slug: 'como-limpar-e-conservar-calcado-de-seguranca',
    titulo: 'Como limpar e conservar calçado de segurança',
    tituloSeo: 'Como limpar calçado de segurança',
    resumo:
      'O que encurta a vida do par quase nunca é o uso. É a secagem. A rotina que cabe em dois minutos por dia e o que estraga um calçado bom em um mês.',
    descricaoSeo:
      'Como limpar e conservar calçado de segurança: a rotina de dois minutos, o que nunca fazer com couro e solado, e por que alternar pares faz durar mais.',
    publicado: '2026-09-11',
    atualizado: '2026-09-11',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Calçados',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'O que mata calçado de trabalho quase nunca é o uso: é a secagem. Par lavado por fora e guardado úmido envelhece por dentro antes de parecer gasto por fora. Secar direito e alternar pares fazem mais pela vida útil do que qualquer produto de prateleira.',
      },
      {
        tipo: 'p',
        texto:
          'Calçado de segurança é o EPI mais caro por pessoa na maioria das equipes, e o único que passa oito horas dentro de suor, água e sujeira todo dia. Ainda assim a conservação costuma ser a última coisa que alguém explica na entrega.',
      },
      {
        tipo: 'p',
        texto:
          'O que segue não é rotina de vitrine. É o mínimo que muda o resultado, e cabe em dois minutos no fim do turno.',
      },
      {
        tipo: 'h2',
        texto: 'A rotina diária, em dois minutos',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Tirar o excesso ainda no local.</strong> Barro, resto de produto e poeira saem fácil na hora e viram crosta no dia seguinte.',
          '<strong>Olhar a sola.</strong> Pedra presa no desenho do solado tira a aderência de um lado só, e é uma das causas de <a href="/conhecimento/botina-escorrega-o-que-fazer-antes-de-trocar/">escorregão que ninguém atribui ao calçado</a>.',
          '<strong>Afrouxar o cadarço e abrir a língua.</strong> Calçado fechado não seca por dentro, e é por dentro que ele apodrece.',
          '<strong>Tirar a palmilha, quando for removível.</strong> Ela é a parte mais encharcada do conjunto e a que mais demora a secar presa lá dentro.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'Secar: o passo que decide tudo',
      },
      {
        tipo: 'p',
        texto:
          'Secagem é sombra e ar circulando, e é lenta por natureza. O erro clássico é tentar acelerar com calor, e ele cobra caro: calor direto resseca e trinca o couro, deforma a forma e ataca o adesivo que segura o solado. Descolamento de sola em calçado com pouco uso costuma ter essa origem.',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Nunca:</strong> sol direto, estufa, secador, em cima de motor, perto de forno ou de aquecedor.',
          '<strong>Sempre:</strong> local arejado, à sombra, com a língua aberta e a palmilha fora.',
          '<strong>Encharcou de verdade:</strong> papel absorvente amassado dentro, trocado depois de algumas horas, puxa a água de onde o ar não chega.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'Lavar: o que pode e o que estraga',
      },
      {
        tipo: 'p',
        texto:
          'A regra muda com o material do cabedal, e é aqui que boa parte dos pares morre antes da hora.',
      },
      {
        tipo: 'tabela',
        cabecalho: ['Material', 'O que funciona', 'O que estraga'],
        linhas: [
          [
            'Couro',
            'Pano úmido com sabão neutro, por fora, e secagem à sombra.',
            'Imersão, máquina de lavar, água sanitária e solvente. Ressecam, endurecem e atacam a costura.',
          ],
          [
            'Microfibra e sintético',
            'Tolera pano úmido com mais frequência e seca mais rápido.',
            'Calor para acelerar, que deforma antes de o material reclamar.',
          ],
          [
            'PVC e borracha',
            'Água corrente por fora, sempre que precisar.',
            'Guardar molhado por dentro e dobrar o cano na hora de guardar.',
          ],
          [
            'Solado, em qualquer caso',
            'Escova e água para soltar o que está entalado no desenho.',
            'Qualquer produto oleoso ou lustrante, que reduz aderência justamente onde ela importa.',
          ],
        ],
      },
      {
        tipo: 'h2',
        texto: 'A palmilha merece um parágrafo só dela',
      },
      {
        tipo: 'p',
        texto:
          'É a peça que recebe o suor inteiro do turno e a primeira a acabar. Palmilha achatada perde o amortecimento e transfere o impacto para o calcanhar, o que costuma ser sentido como "a botina ficou dura" quando o problema é só ela.',
      },
      {
        tipo: 'p',
        texto:
          'Onde for removível, vale tirar todo dia para secar e trocar quando amassar. É a manutenção mais barata que existe em calçado de trabalho.',
      },
      {
        tipo: 'h2',
        texto: 'Guardar',
      },
      {
        tipo: 'lista',
        itens: [
          'Em pé, sem empilhar e sem outra coisa em cima, para não deformar a frente.',
          'Fora de sacola plástica fechada e de armário abafado, que transformam umidade em mofo e odor.',
          'Longe do sol e de fonte de calor, também no fim de semana.',
          'Seco por dentro antes de guardar. Guardar úmido é o que produz o cheiro que ninguém consegue tirar depois.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'Alternar pares é a medida que mais rende',
      },
      {
        tipo: 'p',
        texto:
          'Um calçado precisa de um bom tempo parado para secar por completo por dentro, e quem usa o mesmo par todo dia nunca dá esse tempo a ele. Onde o turno é molhado, dois pares alternados não são luxo: cada um passa o dia seguinte secando de verdade, e o conjunto envelhece mais devagar.',
      },
      {
        tipo: 'p',
        texto:
          'Vale também para conforto. Par seco por dentro reduz atrito, e atrito é a origem de bolha e de calo.',
      },
      {
        tipo: 'h2',
        texto: 'Em cozinha e em serviço de saúde a lógica muda um pouco',
      },
      {
        tipo: 'p',
        texto:
          'Ali a higienização é externa e frequente, porque o critério é sanitário e não estético. Material que não absorve é o que permite isso todo dia sem encharcar o par. Vale lembrar que impermeável descreve a barreira contra o líquido que vem de fora, e não uma autorização para lavar o calçado por dentro.',
      },
      {
        tipo: 'h2',
        texto: 'Conservar não adia a troca',
      },
      {
        tipo: 'p',
        texto:
          'Cuidar bem faz o par chegar inteiro ao fim da vida útil dele, não faz a vida útil aumentar para sempre. Solado gasto, biqueira exposta e costura aberta continuam sendo critério de troca, e estão em <a href="/conhecimento/quando-trocar-o-calcado-de-seguranca/">quando trocar o calçado de segurança</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Em equipe, o ganho maior aparece de outro jeito: par conservado é par que a pessoa continua usando. E EPI usado é o único que protege.',
      },
    ],
    fontes: [
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto oficial, PDF)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
    ],
    paginaComercial: {
      href: '/calcados/',
      rotulo: 'Ver os calçados que a Tower trabalha',
    },
    contexto: 'calcados',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. O calçado da minha equipe está durando pouco e queria ajuda para entender se é uso, conservação ou modelo.',
    ctaTitulo: 'O par da sua equipe está durando pouco?',
    ctaTexto:
      'Conte quanto tempo dura hoje e como é o ambiente. Dá para dizer se o caso é de conservação, de rodízio de pares ou de o modelo não ser o certo para aquele piso.',
    perguntas: [
      {
        pergunta: 'Pode lavar botina na máquina de lavar?',
        resposta:
          'Não. A máquina encharca forro, entretela e adesivo de uma vez, e a batida do tambor descola solado e abre costura. O calçado até sai limpo na primeira vez, e é justamente por isso que o hábito pega — o estrago aparece algumas lavagens depois.',
      },
      {
        pergunta: 'Graxa e hidratante de couro servem em calçado de trabalho?',
        resposta:
          'Em couro liso, um produto próprio para couro ajuda a evitar ressecamento e trinca. Em nobuck, camurça e microfibra, não: o acabamento é outro e o produto empasta. E nada disso vai no solado, porque qualquer coisa oleosa ali reduz a aderência.',
      },
      {
        pergunta: 'Como tirar o cheiro do calçado?',
        resposta:
          'O cheiro é consequência de umidade que ficou, então perfume não resolve: ele volta no dia seguinte. O que resolve é secar de verdade entre um turno e outro, tirar a palmilha todo dia e alternar dois pares onde o ambiente é molhado.',
      },
    ],
  },
  {
    slug: 'epi-para-frigorifico-e-camara-fria',
    titulo: 'EPI para frigorífico e câmara fria: o que muda',
    tituloSeo: 'EPI para frigorífico e câmara fria',
    resumo:
      'Frio sozinho é administrável. O que torna esse ambiente difícil é a combinação: frio, água, faca e piso escorregadio ao mesmo tempo, por oito horas.',
    descricaoSeo:
      'O que muda na escolha de EPI para frigorífico e câmara fria: mão dormente, luva em camadas, piso molhado e o que costuma faltar no pedido.',
    publicado: '2026-09-11',
    atualizado: '2026-09-11',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'O frio não é o risco principal desse ambiente: ele é o que agrava todos os outros. Mão fria perde destreza e sensibilidade, e é a mão dormente que se corta na faca e que aperta errado a caixa. Todo EPI ali precisa funcionar molhado, no frio, e com a pessoa já cansada.',
      },
      {
        tipo: 'p',
        texto:
          'Frigorífico, câmara fria de distribuidora, área de pescado e sala de cortes têm em comum uma coisa que nenhum outro ambiente junta: temperatura baixa, água o tempo todo, ferramenta cortante e chão escorregadio, na mesma jornada.',
      },
      {
        tipo: 'p',
        texto:
          'Isso muda a escolha de EPI de um jeito que catálogo nenhum resolve sozinho, porque os itens passam a competir entre si.',
      },
      {
        tipo: 'h2',
        texto: 'O frio mexe no corpo antes de machucar',
      },
      {
        tipo: 'p',
        texto:
          'Com a mão fria, a força de preensão cai e a sensibilidade também. A pessoa compensa apertando mais a faca e prestando menos atenção ao que sente na ponta dos dedos. É por isso que acidente de corte em ambiente frio raramente é falta de atenção: é consequência fisiológica de uma jornada no frio.',
      },
      {
        tipo: 'p',
        texto:
          'Daí vem a regra que organiza todo o resto: manter a mão funcionando é uma medida de segurança, e não de conforto.',
      },
      {
        tipo: 'h2',
        texto: 'As mãos são o centro do problema',
      },
      {
        tipo: 'p',
        texto:
          'Nesse ambiente a mão precisa de três coisas que normalmente não vêm na mesma peça: proteção térmica, proteção contra corte e barreira contra umidade. Tentar resolver as três com uma luva só costuma terminar em uma luva que não faz nenhuma bem.',
      },
      {
        tipo: 'p',
        texto:
          'A saída prática é combinar camadas, e a combinação depende da tarefa: quem manuseia faca tem exigência diferente de quem só movimenta caixa na câmara. Cada item da combinação precisa ter o próprio <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">Certificado de Aprovação</a> para o risco que ele cobre, e o material de cada camada muda o resultado, como em <a href="/conhecimento/tipos-de-luva-qual-material-escolher/">qual material de luva escolher</a>.',
      },
      {
        tipo: 'destaque',
        texto:
          'Luva molhada não aquece. A partir do momento em que a água entra, a camada térmica vira o contrário do que deveria ser, e a pessoa passa o resto do turno pior do que estaria sem ela. Reposição durante o turno faz parte do dimensionamento, não é desperdício.',
      },
      {
        tipo: 'h2',
        texto: 'O pé: o frio sobe do chão',
      },
      {
        tipo: 'p',
        texto:
          'Piso lavado o tempo todo, resto orgânico e gordura formam a pior combinação de aderência que existe, e ela vem junto com frio que atravessa o solado. A escolha aqui precisa resolver as duas coisas.',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Impermeabilidade real.</strong> Onde o pé fica dentro da água, o caminho costuma ser a <a href="/conhecimento/bota-de-pvc-quando-e-a-resposta-certa/">bota de PVC</a>; onde é respingo e piso molhado, um calçado fechado impermeável atende melhor.',
          '<strong>Solado pensado para esse piso.</strong> Água com gordura pede desempenho diferente de água sozinha, como explica <a href="/conhecimento/solado-antiderrapante-o-que-significa/">o que significa antiderrapante</a>.',
          '<strong>Biqueira, quando houver movimentação de carga.</strong> Câmara com paleteira e caixa empilhada tem risco de impacto; sala de corte, nem sempre.',
          '<strong>Meia adequada.</strong> É ela que gerencia a umidade dentro do calçado, e no frio isso deixa de ser detalhe.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'Vestimenta: camadas, e não uma peça grossa',
      },
      {
        tipo: 'p',
        texto:
          'Uma peça muito grossa restringe o movimento e faz a pessoa transpirar dentro dela; suor no frio esfria mais do que o ambiente. Camadas permitem ajustar ao longo do dia e à diferença de temperatura entre a câmara e a área externa, que em muitas operações é enorme.',
      },
      {
        tipo: 'p',
        texto:
          'Quem entra e sai da câmara várias vezes por turno tem um problema diferente de quem fica dentro: para esse caso, o que precisa ser fácil é vestir e tirar.',
      },
      {
        tipo: 'h2',
        texto: 'O que costuma faltar no pedido',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Proteção de cabeça e orelha.</strong> É por onde mais se perde calor, e é o item que mais fica de fora da lista.',
          '<strong>Reposição durante o turno.</strong> Luva e meia molhadas precisam de substituição, não de paciência.',
          '<strong>Tamanho por pessoa.</strong> Luva apertada corta a circulação e esfria a mão mais rápido; luva folgada tira a firmeza na faca.',
          '<strong>Onde as peças secam.</strong> Sem lugar de secagem, a equipe começa o turno seguinte com o equipamento úmido de ontem.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'Uma coisa que EPI não resolve',
      },
      {
        tipo: 'p',
        texto:
          'Tempo de permanência em ambiente artificialmente frio e regime de pausa são tratados em norma específica e definidos pela avaliação da própria empresa. Nenhum equipamento substitui isso, e vale dizer com todas as letras: se a organização do trabalho no frio estiver errada, EPI bom apenas adia o problema.',
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'Qual a temperatura real de cada área, e quanto tempo cada pessoa passa em cada uma.',
          'Quem manuseia ferramenta cortante e quem só movimenta carga.',
          'Se o pé fica dentro da água ou apenas em piso molhado.',
          'Quantas vezes por turno a pessoa entra e sai do frio.',
          'Quantas trocas de luva e de meia o turno exige, e quem repõe.',
          'Se existe risco de impacto sobre o pé na área.',
          'O CA de cada item, lembrando que proteção térmica e proteção contra corte são ensaiadas separadamente.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'É um dos ambientes em que a rotatividade é mais alta, e isso tem consequência direta de compra: sem a grade de numeração mapeada e poucos modelos padronizados, cada admissão vira uma escolha do zero, e o que entra no pé da pessoa nova costuma ser o que sobrou.',
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
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
    ],
    paginaComercial: {
      href: '/empresas/',
      rotulo: 'Ver soluções para empresas',
    },
    contexto: 'empresas',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Preciso equipar uma equipe que trabalha no frio e queria ajuda para montar a lista.',
    ctaTitulo: 'Vai equipar uma equipe que trabalha no frio?',
    ctaTexto:
      'Conte a temperatura da área, quem usa faca e quantas horas cada um passa lá dentro. Com isso dá para montar a lista por função, e não por catálogo.',
    perguntas: [
      {
        pergunta: 'Luva térmica sozinha resolve em sala de corte?',
        resposta:
          'Quase nunca. Térmica e anticorte são proteções diferentes, ensaiadas separadamente, e raramente vêm bem resolvidas na mesma peça. Onde há faca, a conversa é sobre combinar camadas conforme a tarefa, e cada item precisa do Certificado de Aprovação para o risco que ele cobre.',
      },
      {
        pergunta: 'Por que a equipe tira a luva no meio do turno?',
        resposta:
          'Na maior parte das vezes porque ela molhou. Luva úmida esfria a mão em vez de aquecer, e tirar passa a ser a atitude que dá alívio. É um problema de reposição durante o turno, e não de disciplina.',
      },
      {
        pergunta: 'Calçado de câmara fria precisa ter biqueira?',
        resposta:
          'Depende da área. Onde há paleteira, carrinho e caixa empilhada existe risco de impacto sobre o pé, e aí sim. Em sala de corte sem movimentação de carga pesada, o critério principal passa a ser aderência no piso molhado e barreira contra líquido. Quem define é a avaliação de riscos da empresa.',
      },
    ],
  },
  {
    slug: 'calcado-para-quem-trabalha-em-pe-o-dia-todo',
    titulo: 'Calçado para quem trabalha em pé o dia todo',
    tituloSeo: 'Calçado para trabalhar em pé o dia todo',
    resumo:
      'Quem passa oito horas em pé não sofre um acidente: acumula carga. E o critério que decide o fim do turno não é a robustez do calçado — é outro.',
    descricaoSeo:
      'O que decide o conforto de quem passa o turno em pé: peso do par, amortecimento e numeração, nessa ordem. E o que ajuda sem ser o calçado.',
    publicado: '2026-09-12',
    atualizado: '2026-09-12',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Calçados',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Quem passa o turno em pé não sofre um acidente: acumula carga. O que decide o fim do dia é peso do par, amortecimento e numeração, nessa ordem — e não a robustez do calçado. Botina pesada escolhida "porque é mais segura" costuma ser a que mais cansa, sem proteger de nada que exista ali.',
      },
      {
        tipo: 'p',
        texto:
          'Procure "calçado para trabalhar em pé" e a resposta vem de loja de tênis. É compreensível: a dor é a mesma. Mas a resposta não serve, porque em cozinha, em loja, em linha de produção e em plantão existe risco que tênis nenhum cobre, e existe exigência de Certificado de Aprovação.',
      },
      {
        tipo: 'h2',
        texto: 'O que acontece com o corpo em oito horas de pé',
      },
      {
        tipo: 'p',
        texto:
          'O pé incha ao longo do dia, o que muda o ajuste do calçado entre a manhã e o fim do expediente. O impacto de cada passo é pequeno e se repete o dia inteiro, então ele não aparece como dor aguda: aparece como cansaço no fim do turno, peso na panturrilha e dor lombar.',
      },
      {
        tipo: 'p',
        texto:
          'Repare que boa parte da queixa nem é no pé. É por isso que "o calçado está bom, a pessoa é que reclama" costuma ser diagnóstico errado.',
      },
      {
        tipo: 'h2',
        texto: 'Peso do par é o critério que ninguém mede',
      },
      {
        tipo: 'p',
        texto:
          'Cada passo levanta o calçado inteiro, e são muitos passos. Uma diferença que parece pequena com o par na mão deixa de ser pequena ao longo de um turno, e é a primeira coisa a olhar quando a equipe reclama de cansaço e não de dor.',
      },
      {
        tipo: 'p',
        texto:
          'Onde a biqueira é realmente necessária, a de composite pesa menos que a de aço, e a comparação entre as duas está em <a href="/conhecimento/biqueira-de-composite-ou-de-aco-qual-escolher/">biqueira de composite ou de aço</a>.',
      },
      {
        tipo: 'h2',
        texto: 'Onde o amortecimento realmente está',
      },
      {
        tipo: 'p',
        texto:
          'Ele vem da entressola e da palmilha, e as duas se comportam de forma diferente com o tempo. A entressola envelhece devagar; a palmilha achata rápido, e quando achata transfere o impacto direto para o calcanhar.',
      },
      {
        tipo: 'p',
        texto:
          'Isso explica uma reclamação comum: "a botina endureceu". Na maior parte das vezes o calçado está igual e a palmilha é que acabou. Trocar a palmilha é a manutenção mais barata que existe aqui, e ela aparece na rotina de <a href="/conhecimento/como-limpar-e-conservar-calcado-de-seguranca/">conservação do par</a>.',
      },
      {
        tipo: 'h2',
        texto: 'Biqueira só onde há risco de impacto',
      },
      {
        tipo: 'p',
        texto:
          'Esta é a decisão que mais muda o peso do conjunto, e ela não é de preferência: é do risco da atividade. Onde não há queda de objeto pesado sobre o pé, o calçado ocupacional atende melhor e cansa menos. A diferença entre as duas categorias está em <a href="/conhecimento/calcado-ocupacional-ou-de-seguranca/">calçado ocupacional ou de segurança</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Vale dizer o contrário com a mesma clareza: onde o risco existe, nenhum ganho de conforto compensa tirar a biqueira.',
      },
      {
        tipo: 'h2',
        texto: 'A numeração decide mais do que o modelo',
      },
      {
        tipo: 'p',
        texto:
          'Um modelo excelente no número errado perde para um modelo comum no número certo, todas as vezes. Como o pé incha, a prova precisa considerar o fim do expediente, e a largura da forma importa tanto quanto o número.',
      },
      {
        tipo: 'p',
        texto:
          'Onde exatamente dói diz o que aconteceu, e isso está destrinchado em <a href="/conhecimento/botina-que-machuca-calcado-ou-numeracao/">botina que machuca: é o calçado ou a numeração?</a>.',
      },
      {
        tipo: 'h2',
        texto: 'O que ajuda e não é o calçado',
      },
      {
        tipo: 'p',
        texto:
          'Vale a honestidade: nem tudo aqui se resolve comprando calçado, e quem vende calçado dizendo o contrário está vendendo errado.',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>O piso.</strong> Concreto nu castiga mais que qualquer outro. Onde o posto é fixo, tapete de alívio muda mais do que trocar de modelo.',
          '<strong>A meia.</strong> Gerencia umidade e atrito, e atrito é a origem de bolha e de calo.',
          '<strong>Dois pares em rodízio.</strong> Par seco por dentro cansa menos, e ainda dura mais.',
          '<strong>Alternar postura.</strong> Poder sentar alguns minutos, ou apoiar um pé, muda o acúmulo do dia. Isso é organização do trabalho, não compra.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'Quantas horas a pessoa fica em pé, e quanto disso é parada e quanto é caminhando.',
          'Se existe risco de impacto sobre o pé, que é o que define a categoria.',
          'Como é o piso, e se ele é molhado ou gorduroso.',
          'O peso do par, comparado ao que a equipe usa hoje.',
          'Se a palmilha é removível e se há reposição dela.',
          'A numeração provada no fim do expediente, e a largura da forma.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Em compra para equipe, esses dados valem mais que o nome do modelo. Com eles dá para montar a grade uma vez e repor sem recomeçar a escolha a cada contratação.',
      },
      {
        tipo: 'p',
        texto:
          'Se quiser cruzar a jornada com o piso e o risco da sua atividade, a ferramenta <a href="/ferramentas/qual-calcado-usar/">qual calçado profissional é ideal para você</a> devolve o perfil de calçado a avaliar, com o conforto no lugar que ele merece.',
      },
    ],
    fontes: [
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto oficial, PDF)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
    ],
    paginaComercial: {
      href: '/calcados/ocupacionais/',
      rotulo: 'Ver os calçados ocupacionais',
    },
    contexto: 'calcados-ocupacionais',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Minha equipe passa o turno em pé e queria ajuda para escolher um calçado que canse menos.',
    ctaTitulo: 'A equipe reclama de cansaço no fim do turno?',
    ctaTexto:
      'Conte quantas horas são em pé, como é o piso e se existe risco de impacto no pé. Dá para dizer se o caso é de categoria, de peso do par ou de numeração.',
    perguntas: [
      {
        pergunta: 'Calçado mais macio é sempre melhor para ficar em pé?',
        resposta:
          'Não. Macio demais afunda e deixa de sustentar, e o pé trabalha mais para se estabilizar, o que cansa igual. O que se procura é amortecimento com estabilidade, e não o calçado mais fofo da prateleira.',
      },
      {
        pergunta: 'Tênis serve para trabalhar em pé?',
        resposta:
          'Para conforto, às vezes serve. Como EPI, não: tênis esportivo não tem Certificado de Aprovação, não é ensaiado para os riscos do ambiente de trabalho e é feito para outro movimento. Onde existe risco no piso ou sobre o pé, ele não entra na conversa.',
      },
      {
        pergunta: 'Palmilha de gel resolve a dor no fim do dia?',
        resposta:
          'Pode aliviar, e pode esconder a causa. Se a dor vem de numeração errada ou de par gasto, a palmilha só adia o problema — e colocada dentro de um calçado já justo, aperta ainda mais. Dor que persiste depois do ajuste do calçado é assunto de avaliação de saúde, não de acessório.',
      },
    ],
  },
  {
    slug: 'epi-para-soldador-o-que-muda',
    titulo: 'EPI para soldador: o que muda na escolha',
    tituloSeo: 'EPI para soldador: o que muda',
    resumo:
      'Três riscos acontecem ao mesmo tempo e em direções diferentes. Proteger dois e esquecer o terceiro é o padrão — e o esquecido costuma ser sempre o mesmo.',
    descricaoSeo:
      'Radiação, respingo e fumo de solda exigem proteções diferentes ao mesmo tempo. O que muda na escolha, o que a roupa não pode ser e quem mais fica exposto.',
    publicado: '2026-09-12',
    atualizado: '2026-09-12',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Na solda três riscos acontecem ao mesmo tempo e em direções diferentes: radiação que queima olho e pele, respingo de metal muito quente, e fumo que vai para o pulmão. Proteger dois e esquecer o terceiro é o padrão do setor, e o esquecido é quase sempre o respiratório.',
      },
      {
        tipo: 'p',
        texto:
          'A busca por EPI de soldador cai em catálogo, e catálogo lista itens sem dizer qual decisão cada um resolve. O que segue é a ordem em que essas decisões aparecem na prática.',
      },
      {
        tipo: 'h2',
        texto: 'A radiação é a que mais engana',
      },
      {
        tipo: 'p',
        texto:
          'O arco emite radiação ultravioleta e infravermelha em quantidade alta. A lesão de córnea que o setor chama de "olho de arco" não dói na hora: aparece horas depois, de madrugada, e quem foi atingido costuma jurar que não olhou para o arco.',
      },
      {
        tipo: 'p',
        texto:
          'A mesma radiação queima a pele exposta, como uma queimadura de sol acelerada. Pescoço, orelha e antebraço são as regiões que mais aparecem, justamente porque são as que ficam de fora.',
      },
      {
        tipo: 'h2',
        texto: 'O número do filtro não sai de artigo nenhum',
      },
      {
        tipo: 'p',
        texto:
          'A tonalidade do filtro depende do processo de solda e da corrente de trabalho, e sai da tabela técnica aplicável ao caso, confirmada pelo responsável técnico da empresa. Qualquer número que você leia num blog, inclusive neste, seria chute — e chute aqui é lesão de vista.',
      },
      {
        tipo: 'p',
        texto:
          'O que vale dizer sem risco de errar: a máscara precisa ter Certificado de Aprovação, e a tonalidade certa é a que permite enxergar a poça de solda sem esforço. Filtro escuro demais faz a pessoa levantar a máscara para posicionar a peça, e é nesse instante que a vista é atingida.',
      },
      {
        tipo: 'h2',
        texto: 'Respingo: o que a roupa não pode ser',
      },
      {
        tipo: 'p',
        texto:
          'Esta é a parte em que a escolha errada é mais perigosa do que nenhuma escolha. Tecido sintético não pega fogo como algodão: ele derrete, gruda na pele e continua queimando ali. Camiseta comum de poliéster embaixo do uniforme anula boa parte do que o uniforme faria.',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Nada de sintético em contato com a pele</strong>, nem por baixo.',
          '<strong>Bolso fechado e bainha para baixo.</strong> Bolso aberto e barra dobrada viram copo para respingo.',
          '<strong>Calça por fora do calçado</strong>, nunca por dentro, para o respingo escorrer em vez de entrar.',
          '<strong>Cobertura de pescoço e orelha</strong>, que é a lacuna clássica entre a máscara e a roupa.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O fumo de solda é o risco que ninguém vê sair',
      },
      {
        tipo: 'p',
        texto:
          'O que sobe do arco não é fumaça no sentido comum: é material do metal e do consumível que virou partícula muito fina, às vezes acompanhado de gás. O que exatamente está ali depende do metal base, do revestimento dele e do eletrodo usado — revestimento galvanizado, por exemplo, muda completamente a conversa.',
      },
      {
        tipo: 'p',
        texto:
          'Como a mistura decide o filtro, e a mistura muda de serviço para serviço, este é o item que mais exige conversa antes da compra. A sequência de decisão está em <a href="/conhecimento/respirador-como-escolher-o-filtro/">como escolher o filtro do respirador</a>, e o erro mais caro do assunto está em <a href="/conhecimento/mascara-descartavel-nao-protege-de-vapor-quimico/">máscara descartável não protege de vapor químico</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Vale um lembrete que não é sobre EPI: ventilação e exaustão no ponto de geração reduzem a exposição de todo mundo ao mesmo tempo, e vêm antes do equipamento individual na ordem das medidas.',
      },
      {
        tipo: 'h2',
        texto: 'O ajudante, e quem só passa ao lado',
      },
      {
        tipo: 'p',
        texto:
          'A radiação do arco não escolhe quem está trabalhando. Ajudante, conferente e quem cruza o galpão são atingidos do mesmo jeito, sem máscara nenhuma, e são eles que mais aparecem com lesão de vista.',
      },
      {
        tipo: 'p',
        texto:
          'Biombo ou cortina de solda resolve isso para todos de uma vez, e quem trabalha junto do soldador precisa da própria proteção de vista. É uma das lacunas mais comuns e mais baratas de fechar.',
      },
      {
        tipo: 'h2',
        texto: 'Mão, braço e pé',
      },
      {
        tipo: 'p',
        texto:
          'A luva de solda tem duas funções que competem: resistir ao calor e ao respingo, e permitir manipular a peça. Quanto mais grossa, mais protege e menos deixa trabalhar — e luva que impede o serviço acaba saindo da mão, que é o pior resultado possível.',
      },
      {
        tipo: 'p',
        texto:
          'No pé, o que decide é o respingo não entrar pela boca do calçado, e a categoria continua sendo definida pelo risco de impacto, como em qualquer outra atividade.',
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'Qual processo de solda é usado, e em que faixa de corrente.',
          'Qual o metal base e se há revestimento, porque isso muda o que sobe no ar.',
          'Se a solda é em bancada, em campo ou em posição difícil, o que muda de onde vem o respingo.',
          'Se existe ventilação ou exaustão no ponto, antes de discutir respirador.',
          'Quem mais fica na área, e se há biombo.',
          'O CA de cada item, lembrando que máscara, respirador, luva e vestimenta são aprovações separadas.',
          'O que a equipe veste por baixo do uniforme.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'O último item da lista é o que mais surpreende quem nunca perguntou. Boa parte das queimaduras que aparecem em oficina veio de uma camiseta que ninguém tinha considerado parte do problema.',
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
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
    ],
    paginaComercial: {
      href: '/empresas/',
      rotulo: 'Ver soluções para empresas',
    },
    contexto: 'empresas',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Preciso equipar soldador e queria ajuda para montar a lista a partir do processo que a gente usa.',
    ctaTitulo: 'Vai equipar quem solda?',
    ctaTexto:
      'Conte o processo de solda, o metal que vocês trabalham e se a área tem exaustão. Com isso dá para montar a lista certa, e dizer o que falta antes de comprar.',
    perguntas: [
      {
        pergunta: 'Óculos escuro comum protege do arco de solda?',
        resposta:
          'Não. Lente escura reduz o brilho e não a radiação ultravioleta e infravermelha do arco, então ela deixa a pessoa encarar mais tempo o que continua queimando a vista. Proteção contra arco é equipamento ensaiado para isso, com Certificado de Aprovação.',
      },
      {
        pergunta: 'Quem trabalha ao lado do soldador precisa de proteção?',
        resposta:
          'Precisa. A radiação do arco atinge quem está em volta do mesmo jeito, e é comum a lesão de vista aparecer no ajudante e não em quem soldava. Biombo ou cortina de solda protege todo mundo ao mesmo tempo, e quem fica perto precisa de proteção própria para os olhos.',
      },
      {
        pergunta: 'Máscara PFF resolve o fumo de solda?',
        resposta:
          'Ela pode ser parte da resposta para a parte particulada, e não é a resposta inteira. O que sobe do arco depende do metal, do revestimento e do consumível, e pode incluir gás, que peça para partícula não retém. A escolha vem do que existe naquele serviço, e não do que costuma ter no almoxarifado.',
      },
    ],
  },
  {
    slug: 'epi-na-regiao-metropolitana-de-fortaleza',
    titulo: 'EPI na Região Metropolitana de Fortaleza: o que muda de cidade para cidade',
    tituloSeo: 'EPI na Região Metropolitana de Fortaleza',
    resumo:
      'Equipe espalhada por três municípios costuma receber o mesmo pedido. E é aí que metade dela fica com o item errado, porque o trabalho não é o mesmo em cada lugar.',
    descricaoSeo:
      'O que muda na escolha de EPI entre os municípios da Região Metropolitana de Fortaleza, e como montar o pedido de uma equipe espalhada sem errar em metade dela.',
    publicado: '2026-09-20',
    atualizado: '2026-09-20',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Compra',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'O erro mais caro que a gente vê em empresa da Região Metropolitana não é de marca nem de preço. É tratar a região como um lugar só. Quem está no distrito industrial, quem está na obra e quem está na rede hoteleira correm riscos diferentes — e um pedido único para todos entrega item errado em pelo menos um deles.',
      },
      {
        tipo: 'p',
        texto:
          'A Tower é de Fortaleza desde 1995 e atende a Região Metropolitana desde então. Em quase toda empresa que cresce por aqui acontece a mesma coisa: a equipe deixa de estar num endereço só. A administração fica na capital, a produção vai para um município vizinho, a manutenção roda entre os dois.',
      },
      {
        tipo: 'p',
        texto:
          'O pedido de EPI, porém, continua sendo feito como se fosse tudo a mesma coisa. É esse descompasso que este texto trata.',
      },
      {
        tipo: 'h2',
        texto: 'O que costuma mudar de município para município',
      },
      {
        tipo: 'p',
        texto:
          'Não é regra rígida, e toda empresa tem exceção. Mas o perfil de atividade predominante muda bastante dentro da região, e com ele muda o risco:',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Fortaleza.</strong> Rede hospitalar, serviços de alimentação, comércio e construção. Predomina o risco de piso molhado, jornada em pé e contato biológico ou químico, mais obra na área urbana.',
          '<strong>Maracanaú.</strong> Concentra distrito industrial e indústria de transformação. Aqui o eixo é risco mecânico, movimentação de carga e ruído contínuo.',
          '<strong>Caucaia.</strong> Indústria e logística convivendo com comércio. Movimentação de carga, muita caminhada e piso de galpão.',
          '<strong>Horizonte e Pacajus.</strong> Indústria, com presença do setor calçadista. Linha de produção, ruído, e manuseio de cola e solvente em parte das operações.',
          '<strong>Maranguape.</strong> Indústria e agroindústria, o que traz junto o EPI de manipulação de alimento e de produto químico.',
          '<strong>Eusébio.</strong> Comércio, serviços e indústria leve, com boa parte do risco em manutenção predial e em cozinha.',
          '<strong>Aquiraz.</strong> Turismo e hotelaria. Cozinha industrial, camareira, manutenção e área de piscina — o oposto do distrito industrial em quase tudo.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Repare que os extremos dessa lista estão a menos de uma hora um do outro. Uma empresa com unidade em Maracanaú e outra em Aquiraz não tem um pedido de EPI: tem dois.',
      },
      {
        tipo: 'h2',
        texto: 'O que a grade única produz',
      },
      {
        tipo: 'p',
        texto:
          'Quando o pedido é montado por endereço da empresa, e não por função, o resultado é previsível. Sobra proteção onde ela não era necessária, que vira peso e desconforto, e falta onde era, que vira exposição.',
      },
      {
        tipo: 'p',
        texto:
          'O sintoma aparece rápido e quase sempre é lido como problema de disciplina: gente de um posto usando o EPI direitinho e gente de outro posto tirando. Se isso está acontecendo por unidade, e não por pessoa, o problema é o pedido, e não a equipe — o assunto está em <a href="/conhecimento/funcionario-recusa-usar-epi-o-que-fazer/">funcionário se recusa a usar o EPI</a>.',
      },
      {
        tipo: 'h2',
        texto: 'Como organizar o pedido de uma equipe espalhada',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Agrupe por risco, não por endereço.</strong> Duas unidades distantes podem ter a mesma necessidade, e duas áreas do mesmo galpão podem ter necessidades opostas.',
          '<strong>Liste função por função.</strong> O nome do cargo engana; o que decide é o que a pessoa faz no turno e o que existe no chão onde ela pisa.',
          '<strong>Monte a grade de numeração por pessoa.</strong> Ela não é atributo da unidade, e é o motivo número um de calçado abandonado — o caminho está em <a href="/conhecimento/grade-de-numeracao-como-definir-para-a-equipe/">como definir a grade da equipe</a>.',
          '<strong>Defina quem recebe e quem assina em cada endereço.</strong> Entrega sem responsável é entrega sem registro.',
          '<strong>Deixe a reposição combinada antes de precisar dela.</strong> Unidade distante da administração é onde a reposição atrasa mais.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O que não muda em lugar nenhum',
      },
      {
        tipo: 'p',
        texto:
          'Três coisas valem igual em qualquer município, e é bom que valham: todo EPI precisa de <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">Certificado de Aprovação</a> válido para o risco a que se destina; toda entrega precisa de <a href="/conhecimento/ficha-de-entrega-de-epi-o-que-precisa-constar/">registro</a>; e quem define o que cada função precisa é a avaliação de riscos da empresa, não o fornecedor.',
      },
      {
        tipo: 'p',
        texto:
          'O que um fornecedor bom faz é outra coisa: perguntar antes de vender, e dizer quando o que você pediu não é o que resolve.',
      },
      {
        tipo: 'h2',
        texto: 'O que ter em mãos antes de pedir',
      },
      {
        tipo: 'lista',
        itens: [
          'Quantas pessoas em cada endereço, e o que cada grupo faz.',
          'Como é o piso de cada área, e o que escorre nele.',
          'Onde existe movimentação de carga e risco de impacto sobre o pé.',
          'Onde existe ruído contínuo, e se há medição.',
          'Que produto químico é manuseado, e em qual unidade.',
          'A grade de numeração, ou a disposição de montá-la junto.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Se for a primeira compra da empresa, o roteiro completo está em <a href="/conhecimento/primeiro-pedido-de-epi-como-montar/">como montar o primeiro pedido de EPI</a>. E se a dúvida for sobre quais cidades a Tower atende, isso está em <a href="/epi-por-cidade/">EPI por cidade</a>.',
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
      href: '/epi-por-cidade/',
      rotulo: 'Ver as cidades que a Tower atende',
    },
    contexto: 'epi-por-cidade',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Tenho equipe em mais de um município da Região Metropolitana de Fortaleza e queria ajuda para montar o pedido.',
    ctaTitulo: 'Tem equipe em mais de um endereço?',
    ctaTexto:
      'Conte quantas pessoas há em cada unidade e o que elas fazem. A gente separa o pedido por risco em vez de por endereço, e monta a grade junto.',
    perguntas: [
      {
        pergunta: 'Dá para padronizar o EPI da empresa inteira?',
        resposta:
          'Dá para padronizar o critério, e quase nunca o item. O mesmo risco deve receber a mesma categoria de proteção em qualquer unidade — isso é padronização útil. Já obrigar a fábrica e o hotel a usarem o mesmo calçado é padronizar o que não deveria, e sai caro nos dois lados.',
      },
      {
        pergunta: 'Vale fazer um pedido só para todas as unidades?',
        resposta:
          'Vale, desde que o pedido venha separado por grupo de risco dentro dele. Um pedido único economiza frete e conversa; uma lista única, sem separação por função, é o que produz item errado em metade dos postos.',
      },
      {
        pergunta: 'Quem assina a ficha de entrega quando a unidade é distante?',
        resposta:
          'Alguém precisa ser definido em cada endereço, com nome, antes da primeira entrega. Ficha que fica esperando o responsável passar por lá é ficha que não é assinada, e entrega sem registro é o ponto que mais dá problema depois.',
      },
    ],
  },
  {
    slug: 'epi-para-industria-textil',
    titulo: 'EPI para indústria têxtil: o que muda na escolha',
    tituloSeo: 'EPI para indústria têxtil',
    resumo:
      'O setor tem duas metades com riscos opostos. Comprar para "a têxtil" sem separar fiação de confecção é o erro que nasce antes do pedido.',
    descricaoSeo:
      'Ruído contínuo, fibra no ar, corte e jornada em pé: o que muda na escolha de EPI entre fiação, tecelagem e confecção, e o que costuma faltar no pedido.',
    publicado: '2026-09-20',
    atualizado: '2026-09-20',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Na fiação e na tecelagem, o que mais adoece não é o que corta: é o que não se vê e o que se ouve o turno inteiro. Na confecção o eixo muda para corte e postura. São duas realidades dentro do mesmo setor, e o pedido que não separa as duas erra nas duas.',
      },
      {
        tipo: 'p',
        texto:
          'Têxtil é um dos setores em que a Tower tem mais estrada: uma indústria do ramo compra com a gente desde os anos 1990, e é o cliente mais antigo da casa. O que segue vem dessa convivência, e não de catálogo.',
      },
      {
        tipo: 'h2',
        texto: 'Ruído é a exposição que define a fiação e a tecelagem',
      },
      {
        tipo: 'p',
        texto:
          'Não é um estampido isolado: é ruído contínuo, alto, por toda a jornada, vindo de dezenas de máquinas ao mesmo tempo. Essa é a diferença que muda a escolha do protetor — o problema não é aguentar um pico, é manter a proteção na orelha por oito horas.',
      },
      {
        tipo: 'p',
        texto:
          'A atenuação necessária vem da medição de ruído da atividade, feita pela empresa, e nenhum catálogo substitui esse número. O que decide entre os tipos é a rotina: quem entra e sai da área, quem usa óculos, quem precisa conversar. A comparação está em <a href="/conhecimento/protetor-auditivo-plug-ou-concha/">plug ou concha</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Vale a franqueza: a perda auditiva induzida por ruído é gradual e não dói. Quando a pessoa percebe, o dano já aconteceu e não volta. É por isso que, aqui, conforto é critério técnico e não luxo — protetor que sai da orelha no meio do turno tem atenuação zero.',
      },
      {
        tipo: 'h2',
        texto: 'Fibra no ar',
      },
      {
        tipo: 'p',
        texto:
          'Abertura, cardagem e fiação levantam poeira de fibra, e esse é um risco respiratório clássico do setor, com doença ocupacional associada. Quem mede a exposição e define a proteção é a avaliação da própria empresa.',
      },
      {
        tipo: 'p',
        texto:
          'Duas coisas valem dizer antes de escolher peça. A primeira é que exaustão e ventilação no ponto reduzem a exposição de todo mundo ao mesmo tempo, e vêm antes do equipamento individual. A segunda é que a escolha do filtro depende do que está no ar naquele setor — poeira é uma coisa, vapor de tinturaria é outra, e a sequência de decisão está em <a href="/conhecimento/respirador-como-escolher-o-filtro/">como escolher o filtro do respirador</a>.',
      },
      {
        tipo: 'h2',
        texto: 'Corte e costura: a mão entra na conta',
      },
      {
        tipo: 'p',
        texto:
          'Na sala de corte o risco muda de natureza. Ali a conversa é de resistência ao corte, e o nível adequado sai da ferramenta usada e da tarefa, não do preço da caixa. O material da luva também muda o resultado, como em <a href="/conhecimento/tipos-de-luva-qual-material-escolher/">qual material de luva escolher</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Na costura, a franqueza é outra: contra agulha de máquina, luva não é a resposta. O que protege ali é a proteção da própria máquina, que é medida coletiva — e nenhum EPI compensa a falta dela.',
      },
      {
        tipo: 'h2',
        texto: 'Tinturaria e acabamento são outro setor dentro do setor',
      },
      {
        tipo: 'p',
        texto:
          'Onde há corante, alvejante, ácido e calor, o EPI deixa de ser o da fábrica e passa a ser o de produto químico. A escolha vem da ficha de segurança de cada produto e da compatibilidade do modelo com ele, e o caminho está em <a href="/conhecimento/luva-para-produto-quimico-como-escolher/">como escolher luva pelo produto químico</a>.',
      },
      {
        tipo: 'h2',
        texto: 'O pé, em todas as áreas',
      },
      {
        tipo: 'p',
        texto:
          'Jornada em pé é comum a quase toda a fábrica, e nem toda área tem risco de impacto sobre o pé. Onde não tem, calçado ocupacional costuma atender melhor e cansar menos — o que muda o fim do turno está em <a href="/conhecimento/calcado-para-quem-trabalha-em-pe-o-dia-todo/">calçado para quem trabalha em pé o dia todo</a>.',
      },
      {
        tipo: 'h2',
        texto: 'O que costuma faltar no pedido',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Proteção de olhos na manutenção.</strong> Quem abre e regula máquina corre risco que o operador não corre, e costuma ficar de fora da lista.',
          '<strong>Reposição de protetor auditivo.</strong> Descartável é de uso único, e quando falta, a equipe reutiliza.',
          '<strong>Separação entre produção e tinturaria.</strong> São duas listas, e viram uma na hora da compra.',
          '<strong>Luva por tamanho, e não por caixa.</strong> Luva folgada na sala de corte tira a firmeza justamente onde a ferramenta está.',
          '<strong>Quem circula sem ser da área.</strong> Manutenção, qualidade e visita entram no galpão com a mesma exposição de ruído e de poeira.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'Quais setores existem na planta, e quantas pessoas em cada um.',
          'A medição de ruído por área, que é o que define a atenuação necessária.',
          'Se há exaustão nos pontos que levantam fibra, antes de discutir respirador.',
          'Que produtos a tinturaria e o acabamento usam, com nome.',
          'Quem manuseia ferramenta de corte, e qual.',
          'Onde existe risco de impacto sobre o pé, e onde não existe.',
          'O CA de cada item, lembrando que proteção auditiva, respiratória e contra corte são aprovações separadas.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'É um setor com muita gente e muitos postos diferentes, e por isso é onde mais compensa montar a lista por função uma vez e repor a partir dela. Refazer a escolha a cada admissão é o que faz o pedido inchar sem proteger melhor.',
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
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
    ],
    paginaComercial: {
      href: '/empresas/industria/',
      rotulo: 'Ver soluções para indústria',
    },
    contexto: 'empresas-industria',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Preciso de EPI para uma indústria têxtil e queria ajuda para separar a lista por setor da planta.',
    ctaTitulo: 'Vai equipar uma planta têxtil?',
    ctaTexto:
      'Conte quais setores existem e quantas pessoas em cada um. A gente separa a lista por área, porque fiação, corte e tinturaria não pedem a mesma coisa.',
    perguntas: [
      {
        pergunta: 'Protetor auditivo descartável pode ser reutilizado?',
        resposta:
          'O de uso único não pode, e o que faz a equipe reutilizar quase sempre é falta de reposição à mão. Inserção suja entra no canal auditivo com o que pegou, e espuma já comprimida não veda mais como no primeiro uso. A conta de repor sai bem mais barata que a de não proteger.',
      },
      {
        pergunta: 'Máscara de tecido serve contra poeira de fibra?',
        resposta:
          'Não. Máscara de tecido não tem Certificado de Aprovação como proteção respiratória e não tem retenção ensaiada, então ela dá sensação de proteção sem oferecer nenhuma. Onde há poeira, o caminho é peça filtrante adequada ao que está no ar daquele setor.',
      },
      {
        pergunta: 'Luva resolve o risco de agulha na costura?',
        resposta:
          'Não resolve, e insistir nisso atrasa a solução certa. Contra agulha de máquina o que protege é a proteção do próprio equipamento, que é medida coletiva e vem antes do EPI. Luva ali costuma atrapalhar a tarefa e sair da mão.',
      },
    ],
  },
  {
    slug: 'epi-para-aplicacao-de-defensivo-agricola',
    titulo: 'EPI para aplicação de defensivo agrícola',
    tituloSeo: 'EPI para aplicação de defensivo',
    resumo:
      'Aqui a lista de EPI não é do fornecedor nem do catálogo. É da bula do produto — e ela muda de produto para produto, e entre preparar e aplicar.',
    descricaoSeo:
      'Por que a bula do defensivo é quem especifica o EPI, o que muda entre preparo e aplicação, e o cuidado depois do trabalho que quase ninguém faz direito.',
    publicado: '2026-09-20',
    atualizado: '2026-09-20',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Neste assunto a lista de EPI não é nossa. É da bula do produto. Cada defensivo traz o equipamento exigido para o preparo da calda e para a aplicação, e os dois não são iguais. Quem compra por catálogo compra errado, porque a bula muda de produto para produto — e quem vende sem perguntar qual produto é está adivinhando.',
      },
      {
        tipo: 'p',
        texto:
          'É a categoria de EPI em que errar tem a consequência mais imediata. Não é um risco que se acumula em anos: é contato com produto concentrado, no mesmo dia, com a pele e com a respiração.',
      },
      {
        tipo: 'p',
        texto:
          'Também é a categoria em que o fornecedor mais deveria perguntar e menos pergunta. O que segue é o que a gente pergunta antes de montar qualquer pedido de agro.',
      },
      {
        tipo: 'h2',
        texto: 'Preparo e aplicação são duas exposições diferentes',
      },
      {
        tipo: 'p',
        texto:
          'No preparo da calda a pessoa lida com o produto concentrado: abre embalagem, mede, despeja, lava. É o momento de maior concentração do dia inteiro, e é onde acontece o respingo que ninguém previu — e normalmente é o momento mais curto, o que faz muita gente encarar sem o equipamento completo.',
      },
      {
        tipo: 'p',
        texto:
          'Na aplicação a concentração é menor e o tempo é muito maior, com deriva, vento e sol somados. São perfis diferentes de exposição, e a bula costuma listar equipamento diferente para cada um. Vale ler as duas listas, e não só a segunda.',
      },
      {
        tipo: 'h2',
        texto: 'O que a bula costuma exigir',
      },
      {
        tipo: 'p',
        texto:
          'Varia por produto, e a frase anterior é a mais importante deste texto. Ainda assim, o conjunto que aparece com mais frequência é este, e serve para você conferir se a sua lista está completa:',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Vestimenta hidrorrepelente</strong>, jaleco e calça ou macacão, que é a barreira principal contra respingo e deriva.',
          '<strong>Avental impermeável</strong> para o preparo da calda, por cima da vestimenta.',
          '<strong>Luva</strong> resistente ao produto manuseado, e não a luva que estava no galpão.',
          '<strong>Proteção respiratória</strong> com o filtro adequado ao que a bula indica.',
          '<strong>Proteção de olhos e face</strong>, que a bula costuma pedir como viseira no preparo.',
          '<strong>Proteção da cabeça e da nuca</strong>, normalmente touca árabe ou boné árabe.',
          '<strong>Calçado impermeável de cano alto</strong>, com a barra da calça por fora.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Confirme item por item na bula do produto que a sua operação usa, e no receituário agronômico. Nenhuma lista genérica, inclusive esta, substitui esses dois documentos.',
      },
      {
        tipo: 'h2',
        texto: 'O filtro é onde mais se erra',
      },
      {
        tipo: 'p',
        texto:
          'O erro clássico é usar peça para partícula onde existe vapor. Máscara descartável não retém vapor químico, e esse ponto tem <a href="/conhecimento/mascara-descartavel-nao-protege-de-vapor-quimico/">um texto só sobre ele</a>. Em pulverização é comum haver os dois ao mesmo tempo — névoa e vapor —, o que muda a combinação.',
      },
      {
        tipo: 'p',
        texto:
          'A sequência para acertar isso está em <a href="/conhecimento/respirador-como-escolher-o-filtro/">como escolher o filtro do respirador</a>. E vale lembrar o critério de troca: cheiro não serve, porque sentir o cheiro significa que o produto já passou.',
      },
      {
        tipo: 'h2',
        texto: 'A luva não é automática',
      },
      {
        tipo: 'p',
        texto:
          'Nitrílica resolve boa parte dos casos, e boa parte não é todos. A resistência depende do produto, da concentração, da temperatura e do tempo de contato, e quem responde isso é a compatibilidade daquele modelo com aquele produto. O caminho está em <a href="/conhecimento/luva-para-produto-quimico-como-escolher/">como escolher luva pelo produto químico</a>, e a diferença entre os materiais em <a href="/conhecimento/tipos-de-luva-qual-material-escolher/">qual material de luva escolher</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Um detalhe de campo que muda tudo: a manga da vestimenta vai por fora do punho da luva quando o braço trabalha para baixo, e por dentro quando trabalha para cima. É o que impede o produto de escorrer para dentro.',
      },
      {
        tipo: 'h2',
        texto: 'O pé, e por que couro não entra aqui',
      },
      {
        tipo: 'p',
        texto:
          'Couro absorve, e produto absorvido fica em contato com o pé o dia inteiro e não sai com limpeza. Em aplicação o caminho é calçado impermeável de cano alto, com a calça por fora — o assunto está em <a href="/conhecimento/bota-de-pvc-quando-e-a-resposta-certa/">bota de PVC: quando ela resolve</a>.',
      },
      {
        tipo: 'h2',
        texto: 'O trabalho que vem depois da aplicação',
      },
      {
        tipo: 'p',
        texto:
          'Esta é a parte que quase ninguém faz direito, e ela decide se o EPI protegeu mesmo ou só adiou o contato.',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>A vestimenta se lava separada.</strong> Nunca junto com a roupa da casa e nunca com a roupa das crianças.',
          '<strong>Tira-se de fora para dentro</strong>, sem encostar o lado externo na pele, e as luvas saem por último, ainda calçadas, depois de lavadas por fora.',
          '<strong>O EPI não guarda junto com o produto.</strong> Armário de defensivo contamina o que está dentro dele.',
          '<strong>Filtro saturado e embalagem seguem destino próprio</strong>, e não o lixo comum.',
          '<strong>Vestimenta hidrorrepelente perde a repelência com o uso e a lavagem.</strong> Ela tem fim de vida, mesmo sem rasgo aparente.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O calor é o motivo número um de EPI abandonado',
      },
      {
        tipo: 'p',
        texto:
          'Macacão fechado, sol a pino e bomba costas é uma combinação que ninguém sustenta por horas. Quando a pessoa abre a manga ou tira a touca no meio da aplicação, a proteção acabou ali, e o pedido não tem culpa nisso.',
      },
      {
        tipo: 'p',
        texto:
          'O que resolve é em boa parte organização, e não compra: aplicar nas horas mais frescas, revezar, ter água por perto. Vale dizer isso na hora do orçamento, porque é o que faz a diferença entre equipamento usado e equipamento guardado.',
      },
      {
        tipo: 'h2',
        texto: 'Colheita e galpão de embalagem são outra lista',
      },
      {
        tipo: 'p',
        texto:
          'Depois da lavoura o risco muda de natureza. Na colheita são sol, ferramenta de corte e contato com folha e seiva. No galpão de embalagem o chão é permanentemente molhado, às vezes com câmara fria junto, e aí a conversa é de aderência e de barreira contra líquido — o que aparece em <a href="/conhecimento/epi-para-frigorifico-e-camara-fria/">EPI para frigorífico e câmara fria</a>.',
      },
      {
        tipo: 'h2',
        texto: 'O que ter em mãos antes de pedir',
      },
      {
        tipo: 'lista',
        itens: [
          'A bula dos produtos que a operação usa, ou pelo menos o nome deles.',
          'Quem prepara a calda e quem aplica, porque pode não ser a mesma pessoa.',
          'Como é a aplicação: costal, tratorizada ou outra.',
          'Quantas horas por dia, e em que parte do dia.',
          'Quem trabalha na colheita e quem trabalha no galpão de embalagem.',
          'Onde o EPI é guardado hoje, e onde é lavado.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Com isso dá para montar a lista certa de uma vez. Sem a bula, qualquer proposta de EPI para agro é chute educado — inclusive a nossa.',
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
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
    ],
    paginaComercial: {
      href: '/epi-por-cidade/assu-rn/',
      rotulo: 'Ver o atendimento no Vale do Açu',
    },
    contexto: 'cidade-assu',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Preciso de EPI para aplicação de defensivo e queria montar a lista a partir da bula dos produtos que a gente usa.',
    ctaTitulo: 'Tem a bula dos produtos em mãos?',
    ctaTexto:
      'Mande o nome dos produtos que a operação usa. A gente monta a lista a partir do que a bula exige, separando quem prepara a calda de quem aplica.',
    perguntas: [
      {
        pergunta: 'Posso usar o mesmo EPI para todos os defensivos?',
        resposta:
          'Nem sempre. A vestimenta e o calçado costumam servir para vários produtos, mas a luva e o filtro do respirador dependem do que está sendo manuseado. Mudou o produto, vale reconferir esses dois na bula antes de assumir que a lista continua valendo.',
      },
      {
        pergunta: 'Dá para lavar o macacão em casa?',
        resposta:
          'Lavar separado, sim; lavar junto com a roupa da família, nunca. O resíduo passa de uma peça para outra na mesma água, e quem acaba exposto é quem nem entrou na lavoura. Vale ainda seguir a orientação da bula, porque parte das vestimentas tem instrução própria de lavagem.',
      },
      {
        pergunta: 'Máscara PFF2 serve para aplicar defensivo?',
        resposta:
          'Serve apenas para a parte particulada, e não é a resposta inteira. Boa parte dos produtos exige proteção contra vapor, que peça para partícula não retém. Quem diz o que é necessário é a bula do produto, e o filtro se escolhe a partir dela.',
      },
    ],
  },
  {
    slug: 'epi-para-fabrica-de-calcado',
    titulo: 'EPI para fábrica de calçado: o que muda na escolha',
    tituloSeo: 'EPI para fábrica de calçado',
    resumo:
      'Numa fábrica de calçado o risco não está no produto que sai pela porta. Está na cola, no solvente, no corte e no ruído da linha.',
    descricaoSeo:
      'O que organiza o EPI de uma fábrica de calçado: vapor de cola e solvente, corte, ruído e jornada em pé — e o que costuma faltar no pedido da fábrica pequena.',
    publicado: '2026-09-20',
    atualizado: '2026-09-20',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Numa fábrica de calçado o risco não está no produto que sai pela porta. Está no que evapora da cola, no que a faca de corte encontra e no barulho que a linha faz o dia inteiro. É um ambiente que junta risco químico, mecânico e auditivo em poucos metros quadrados.',
      },
      {
        tipo: 'p',
        texto:
          'No Cariri cearense, entre Crato, Juazeiro do Norte e Barbalha, isso aparece numa escala particular: muitas fábricas pequenas e médias, às vezes com setores diferentes dentro do mesmo galpão. É onde este texto foi pensado.',
      },
      {
        tipo: 'h2',
        texto: 'O solvente é o que organiza o resto',
      },
      {
        tipo: 'p',
        texto:
          'Cola de contato e limpadores evaporam o tempo todo, e a exposição é contínua e diluída — não é um vazamento, é o ar da sala. Por ser assim, ela não assusta ninguém no primeiro dia, e é exatamente esse o problema.',
      },
      {
        tipo: 'p',
        texto:
          'Duas consequências práticas. A primeira: onde há vapor, peça filtrante para partícula não resolve, e vale ler <a href="/conhecimento/mascara-descartavel-nao-protege-de-vapor-quimico/">por que a máscara descartável não protege de vapor químico</a>. A segunda: antes de comprar respirador, vale tratar de ventilação e exaustão no ponto, que reduzem a exposição de todo mundo ao mesmo tempo.',
      },
      {
        tipo: 'p',
        texto:
          'Feito isso, a escolha do filtro sai do que está no ar daquela sala, e a sequência está em <a href="/conhecimento/respirador-como-escolher-o-filtro/">como escolher o filtro do respirador</a>.',
      },
      {
        tipo: 'h2',
        texto: 'A luva do setor de colagem',
      },
      {
        tipo: 'p',
        texto:
          'Aqui a mão passa o turno em contato direto com adesivo e com limpador, e o tempo de contato é o que decide. Nenhuma luva serve para tudo: a compatibilidade vem da ficha de segurança do produto usado e da tabela do modelo, como em <a href="/conhecimento/luva-para-produto-quimico-como-escolher/">como escolher luva pelo produto químico</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Um sinal de que a luva está errada aparece antes de qualquer laudo: ela incha, endurece ou fica pegajosa no meio do turno. Quando isso acontece, a barreira já foi vencida, mesmo sem furo visível.',
      },
      {
        tipo: 'h2',
        texto: 'Corte: a mão que segura a peça',
      },
      {
        tipo: 'p',
        texto:
          'No corte e no chanfro a lesão típica é na mão que segura, e não na que trabalha. Resistência ao corte é uma característica própria, e o nível adequado sai da ferramenta e da tarefa. O material também muda o resultado, e a comparação está em <a href="/conhecimento/tipos-de-luva-qual-material-escolher/">qual material de luva escolher</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Onde a máquina é balancim ou prensa, a conversa muda de figura: proteção de máquina é medida coletiva e vem antes do EPI. Luva não protege de prensagem, e insistir nela atrasa a solução certa.',
      },
      {
        tipo: 'h2',
        texto: 'Ruído: contínuo, e não em picos',
      },
      {
        tipo: 'p',
        texto:
          'Costura, esteira, compressor e balancim somam um ruído de fundo que dura o expediente inteiro. A atenuação necessária vem da medição feita pela empresa, e o que decide entre os tipos é a rotina — quem entra e sai, quem usa óculos, quem precisa ouvir o colega. A comparação está em <a href="/conhecimento/protetor-auditivo-plug-ou-concha/">plug ou concha</a>.',
      },
      {
        tipo: 'h2',
        texto: 'O pé, numa fábrica em que quase ninguém senta',
      },
      {
        tipo: 'p',
        texto:
          'Boa parte dos postos é de jornada em pé em piso duro, e em boa parte deles não existe risco de queda de objeto pesado sobre o pé. Onde não existe, calçado ocupacional costuma atender melhor e cansar menos — o que muda o fim do turno está em <a href="/conhecimento/calcado-para-quem-trabalha-em-pe-o-dia-todo/">calçado para quem trabalha em pé o dia todo</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Onde existe movimentação de carga, matéria-prima empilhada ou máquina pesada, a categoria muda, e aí a biqueira deixa de ser opcional.',
      },
      {
        tipo: 'h2',
        texto: 'O que costuma faltar no pedido da fábrica pequena',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Proteção de olhos na manutenção.</strong> Quem abre e regula máquina corre risco que o operador não corre.',
          '<strong>Reposição de luva durante o turno.</strong> Luva de colagem tem vida curta, e quando falta, a equipe trabalha sem.',
          '<strong>Separação entre colagem e costura.</strong> São listas diferentes, e viram uma só na hora da compra.',
          '<strong>Quem circula sem ser da área.</strong> Escritório, entrega e visita entram no galpão e respiram o mesmo ar.',
          '<strong>Proteção respiratória para quem limpa peça com solvente</strong>, que muitas vezes não está na lista de ninguém.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'Quais setores existem no galpão, e se eles estão separados fisicamente.',
          'Quais colas e limpadores são usados, com nome, e se há ficha de segurança.',
          'Se existe exaustão nos pontos de colagem, antes de discutir respirador.',
          'A medição de ruído, que é o que define a atenuação necessária.',
          'Quem opera balancim e prensa, e se a máquina tem proteção própria.',
          'Onde há movimentação de carga, e onde não há.',
          'O CA de cada item, lembrando que proteção respiratória, contra corte e auditiva são aprovações separadas.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Em fábrica pequena essa conversa costuma cair no dono, que já faz tudo. Por isso vale montar a lista por função uma vez, escrita, e repor a partir dela: é o que evita recomeçar a escolha a cada contratação e a cada pedido de reposição.',
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
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
    ],
    paginaComercial: {
      href: '/epi-por-cidade/barbalha-ce/',
      rotulo: 'Ver o atendimento no Cariri',
    },
    contexto: 'cidade-barbalha',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Tenho uma fábrica de calçado e queria ajuda para montar a lista de EPI por setor do galpão.',
    ctaTitulo: 'Vai equipar uma fábrica de calçado?',
    ctaTexto:
      'Conte quais setores existem no galpão e quais colas e limpadores vocês usam. A gente separa a lista por área, porque colagem, corte e costura não pedem a mesma coisa.',
    perguntas: [
      {
        pergunta: 'Ventilador na sala de colagem resolve o cheiro de cola?',
        resposta:
          'Espalha, e não remove. Ventilador dilui o vapor no ambiente e dá a sensação de que melhorou, enquanto a exposição continua e passa a atingir mais gente. O que retira de verdade é exaustão no ponto onde o vapor nasce.',
      },
      {
        pergunta: 'Luva de pano serve no setor de cola?',
        resposta:
          'Não. Pano absorve o adesivo e o segura contra a pele, o que é pior do que não usar nada. Onde há contato com cola e limpador, a luva precisa ser de material compatível com aqueles produtos, confirmado na tabela do fabricante.',
      },
      {
        pergunta: 'Quem trabalha na costura precisa de protetor auditivo?',
        resposta:
          'Depende do nível medido na área, e não do posto. Em galpão sem divisão física o ruído do balancim e do compressor chega na costura igual, e a medição costuma mostrar isso. Quem define é a avaliação de riscos da empresa.',
      },
    ],
  },
  {
    slug: 'epi-para-hotelaria-o-que-muda',
    titulo: 'EPI para hotel e pousada: o que muda na escolha',
    tituloSeo: 'EPI para hotelaria: o que muda',
    resumo:
      'Um hotel não é um negócio: são cinco, cada um com risco próprio. E o pedido de EPI costuma ser feito como se fosse um uniforme só.',
    descricaoSeo:
      'Cozinha, governança, lavanderia, manutenção e área de lazer pedem EPI diferente. O que muda em cada uma, e por que a alta temporada é um problema de EPI.',
    publicado: '2026-09-20',
    atualizado: '2026-09-20',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Um hotel não é uma operação, são cinco: cozinha, governança, lavanderia, manutenção predial e área de lazer. Cada uma tem risco próprio, e nenhuma delas se resolve com a lista da outra. O pedido, porém, quase sempre é feito como se fosse um uniforme único para a casa inteira.',
      },
      {
        tipo: 'p',
        texto:
          'É um setor em que quase não há acidente grave e há muito afastamento por coisa pequena e repetida: escorregão em piso molhado, dermatite pelo contato com saneante, dor no fim de turnos longos em pé.',
      },
      {
        tipo: 'p',
        texto:
          'Nenhum desses aparece no relatório como emergência. Todos aparecem na folha.',
      },
      {
        tipo: 'h2',
        texto: 'Cozinha: o piso decide tudo',
      },
      {
        tipo: 'p',
        texto:
          'Água com gordura é a pior combinação de aderência que existe, e ela é o estado normal do chão de uma cozinha em serviço. Aqui a resistência ao escorregamento vem antes de qualquer outra característica, e vale saber que a palavra antiderrapante não descreve uma coisa só — o desempenho é ensaiado em superfícies e contaminantes específicos, como explica <a href="/conhecimento/solado-antiderrapante-o-que-significa/">o que significa solado antiderrapante</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Na maior parte das cozinhas de hotel não existe risco de queda de objeto pesado sobre o pé, o que torna o calçado ocupacional a categoria adequada — mais leve e mais confortável para a jornada. O critério completo está em <a href="/conhecimento/calcado-para-cozinha-como-escolher/">qual calçado para cozinha</a>.',
      },
      {
        tipo: 'h2',
        texto: 'Governança: a mão que passa o dia no saneante',
      },
      {
        tipo: 'p',
        texto:
          'A camareira limpa banheiro, troca roupa de cama, recolhe resíduo e manuseia produto concentrado, muitas vezes no mesmo quarto e em sequência. O risco dominante não é corte nem impacto: é contato químico repetido, todos os dias.',
      },
      {
        tipo: 'p',
        texto:
          'Duas coisas importam mais do que parecem. A primeira é que <a href="/conhecimento/luva-de-procedimento-nao-e-luva-de-limpeza/">luva de procedimento não é luva de limpeza</a>, e usar uma no lugar da outra é o erro mais comum do setor. A segunda é separar a luva por área: a que passou pelo sanitário não deveria seguir para a copa.',
      },
      {
        tipo: 'h2',
        texto: 'Lavanderia',
      },
      {
        tipo: 'p',
        texto:
          'Calor, umidade, produto químico concentrado e piso molhado no mesmo lugar. É a área que mais se parece com uma pequena indústria dentro do hotel, e a que mais fica de fora da lista de compra.',
      },
      {
        tipo: 'p',
        texto:
          'Onde há alvejante e neutralizante em volume, a escolha da luva sai da ficha de segurança do produto e da compatibilidade do modelo, e não do hábito — o caminho está em <a href="/conhecimento/luva-para-produto-quimico-como-escolher/">como escolher luva pelo produto químico</a>.',
      },
      {
        tipo: 'h2',
        texto: 'Manutenção predial e área de lazer',
      },
      {
        tipo: 'p',
        texto:
          'Aqui o risco muda a cada chamado, e o conjunto se monta por tarefa. Há um ponto específico que merece atenção porque costuma ser tratado como rotina banal: o tratamento de piscina envolve produto químico concentrado, e concentrado é outra conversa. Respingo no olho e vapor em local fechado são os dois acidentes clássicos dessa função.',
      },
      {
        tipo: 'p',
        texto:
          'Onde há vapor, peça filtrante para partícula não resolve, e a sequência para acertar isso está em <a href="/conhecimento/respirador-como-escolher-o-filtro/">como escolher o filtro do respirador</a>.',
      },
      {
        tipo: 'h2',
        texto: 'A alta temporada é um problema de EPI',
      },
      {
        tipo: 'p',
        texto:
          'Esta é a parte específica de hotel e pousada de litoral, e é a que ninguém planeja. Na temporada a equipe dobra, boa parte é gente nova, e ela chega para trabalhar no mesmo dia em que foi contratada.',
      },
      {
        tipo: 'p',
        texto:
          'O que acontece na prática: não existe grade de numeração da equipe nova, então o calçado que sobra é o que ninguém quis; a entrega vira informal porque a casa está cheia; e ninguém sabe dizer, em março, o que foi entregue a quem em dezembro.',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Monte a grade antes da temporada</strong>, e não durante. O caminho está em <a href="/conhecimento/grade-de-numeracao-como-definir-para-a-equipe/">como definir a grade da equipe</a>.',
          '<strong>Mantenha a ficha de entrega mesmo no corre-corre.</strong> O que ela precisa trazer está em <a href="/conhecimento/ficha-de-entrega-de-epi-o-que-precisa-constar/">ficha de entrega de EPI</a>.',
          '<strong>Padronize poucos modelos.</strong> Com rotatividade alta, cada modelo a mais é uma escolha a refazer.',
          '<strong>Compre a reposição junto com a temporada</strong>, não depois que ela começar.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O que costuma faltar no pedido',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>A lavanderia inteira.</strong> É a área mais esquecida da casa.',
          '<strong>Proteção de olhos na manutenção e na piscina.</strong> Item barato, ausência frequente.',
          '<strong>Luva separada por área</strong>, em vez de uma caixa geral no almoxarifado.',
          '<strong>Calçado para quem trabalha na recepção e no salão.</strong> Jornada em pé também é exposição, e o assunto está em <a href="/conhecimento/calcado-para-quem-trabalha-em-pe-o-dia-todo/">calçado para quem trabalha em pé o dia todo</a>.',
          '<strong>Reposição dimensionada para a temporada</strong>, e não para o mês médio.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'Quantas pessoas em cada área, na baixa e na alta temporada.',
          'Quais produtos de limpeza a casa usa, com nome.',
          'Como é o piso da cozinha e o que escorre nele.',
          'Se existe risco de impacto sobre o pé em alguma área, e onde.',
          'Quem cuida da piscina, e com que produto.',
          'A grade de numeração, ou a disposição de montá-la antes da temporada.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'A Tower atende hotelaria no litoral cearense e também em <a href="/epi-por-cidade/parnaiba-pi/">Parnaíba</a> e em <a href="/epi-por-cidade/natal-rn/">Natal</a>, que são dois destinos com perfil parecido e temporadas diferentes.',
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
      href: '/empresas/facilities-e-limpeza/',
      rotulo: 'Ver o atendimento a facilities e limpeza',
    },
    contexto: 'empresas-facilities',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Tenho um hotel e queria ajuda para montar a lista de EPI separada por área da casa.',
    ctaTitulo: 'Vai equipar a casa antes da temporada?',
    ctaTexto:
      'Conte quantas pessoas há em cada área e quais produtos a limpeza usa. A gente separa a lista por setor e ajuda a montar a grade antes de a temporada começar.',
    perguntas: [
      {
        pergunta: 'A camareira precisa de biqueira no calçado?',
        resposta:
          'Na maior parte das casas não, porque não existe risco de queda de objeto pesado sobre o pé no serviço de quarto. O que existe é piso molhado e muitas horas em pé, e para isso a linha ocupacional antiderrapante atende melhor e pesa menos. Quem define é a avaliação de riscos da casa.',
      },
      {
        pergunta: 'Como equipar a equipe extra da temporada sem comprar duas vezes?',
        resposta:
          'Montando a grade de numeração antes de a temporada abrir e padronizando poucos modelos. O gasto duplicado quase sempre vem de comprar no susto, em tamanho errado, e ter que repor no meio da alta. Vale também combinar a reposição junto com o pedido principal.',
      },
      {
        pergunta: 'Quem cuida da piscina precisa de EPI diferente?',
        resposta:
          'Precisa, porque ali o produto é manuseado concentrado, e não diluído como no resto da casa. A conversa passa a ser de proteção de olhos e face, luva compatível com aquele produto específico e cuidado com vapor em local fechado. A ficha de segurança do produto é quem diz o quê.',
      },
    ],
  },
  {
    slug: 'epi-para-mecanico-de-oficina',
    titulo: 'EPI para mecânico de oficina: o que muda na escolha',
    tituloSeo: 'EPI para mecânico de oficina',
    resumo:
      'Na oficina o problema raramente é um acidente grande. É o acúmulo de contatos pequenos, todos os dias, na mesma mão e no mesmo olho.',
    descricaoSeo:
      'Óleo, solvente, peça quente e escorregão: o que muda na escolha de EPI numa oficina mecânica, e por que filtro não resolve gás de escape.',
    publicado: '2026-09-20',
    atualizado: '2026-09-20',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Na oficina o problema raramente é um acidente grande. É o acúmulo de contatos pequenos: óleo na pele todo dia, solvente na limpeza de peça, batida de ferramenta, estilhaço no esmeril. Nenhum deles assusta sozinho, e é por isso que a oficina é um dos lugares onde menos se usa EPI.',
      },
      {
        tipo: 'p',
        texto:
          'Some a isso a cultura do setor, em que trabalhar sem luva é sinal de prática. O caminho para mudar isso não é palestra: é escolher equipamento que deixe a pessoa trabalhar.',
      },
      {
        tipo: 'h2',
        texto: 'A mão é o centro do problema',
      },
      {
        tipo: 'p',
        texto:
          'Aqui a luva precisa fazer três coisas ao mesmo tempo: resistir a óleo e solvente, aguentar abrasão, e ainda permitir pegar um parafuso pequeno. Luva que impede a tarefa sai da mão em cinco minutos, e a partir daí não protege de nada.',
      },
      {
        tipo: 'p',
        texto:
          'Por isso a escolha de material pesa mais aqui do que em quase qualquer outro ambiente, e a comparação está em <a href="/conhecimento/tipos-de-luva-qual-material-escolher/">qual material de luva escolher</a>. Vale um alerta específico: couro absorve óleo e passa a segurar o produto contra a pele — o oposto do que se espera dele.',
      },
      {
        tipo: 'h2',
        texto: 'Óleo e solvente na pele, todos os dias',
      },
      {
        tipo: 'p',
        texto:
          'É a exposição mais subestimada da oficina. O contato repetido resseca, racha e sensibiliza a pele, e o quadro se instala devagar o bastante para ninguém ligar uma coisa à outra.',
      },
      {
        tipo: 'p',
        texto:
          'Creme de proteção ajuda, e não substitui a barreira: onde há solvente, quem protege é a luva compatível com o produto, como em <a href="/conhecimento/luva-para-produto-quimico-como-escolher/">como escolher luva pelo produto químico</a>. E lavar a mão com solvente no fim do expediente, que é hábito comum, é a pior parte do dia inteiro.',
      },
      {
        tipo: 'h2',
        texto: 'O olho, e tudo que salta',
      },
      {
        tipo: 'p',
        texto:
          'Esmeril, escova rotativa, ar comprimido, mola sob tensão, fluido pressurizado e bateria. A oficina tem mais fontes de projeção do que a maioria das indústrias, e o óculos de proteção é ao mesmo tempo o item mais barato da lista e o que mais falta.',
      },
      {
        tipo: 'p',
        texto:
          'Quem usa óculos de grau precisa de solução própria — sobreposição adequada ou lente de grau em armação de proteção. Improviso aqui termina com a pessoa trabalhando sem nenhum dos dois.',
      },
      {
        tipo: 'h2',
        texto: 'O pé, embaixo e ao lado do carro',
      },
      {
        tipo: 'p',
        texto:
          'Existem dois riscos diferentes no mesmo piso. Um é a queda de ferramenta ou peça sobre o pé, que pede biqueira de proteção — a diferença entre as categorias está em <a href="/conhecimento/calcado-ocupacional-ou-de-seguranca/">calçado ocupacional ou de segurança</a>.',
      },
      {
        tipo: 'p',
        texto:
          'O outro é o escorregão, porque o chão de oficina junta óleo com água de lavagem. É uma combinação que exige atenção ao ensaio do solado, e não só à palavra estampada na caixa.',
      },
      {
        tipo: 'h2',
        texto: 'O que a oficina respira',
      },
      {
        tipo: 'p',
        texto:
          'São três coisas diferentes, e elas pedem respostas diferentes. Vapor de solvente na limpeza de peça e névoa de tinta na funilaria são casos de filtro químico, e a sequência para escolher está em <a href="/conhecimento/respirador-como-escolher-o-filtro/">como escolher o filtro do respirador</a>.',
      },
      {
        tipo: 'destaque',
        texto:
          'A terceira é a mais perigosa e a que mais gente entende errado: gás de escape em box fechado. Monóxido de carbono não tem cheiro e não é retido por filtro comum. Aqui não existe EPI que resolva — a resposta é exaustão ligada ao escapamento e ventilação do box, e nenhum cartucho substitui isso.',
      },
      {
        tipo: 'h2',
        texto: 'Ar comprimido não limpa roupa nem pessoa',
      },
      {
        tipo: 'p',
        texto:
          'É um hábito tão comum que quase não é visto como risco: usar a pistola de ar para tirar poeira da roupa, do cabelo ou da bancada perto de alguém. Ar sob pressão projeta partícula em alta velocidade e pode penetrar a pele.',
      },
      {
        tipo: 'p',
        texto:
          'Não é assunto de compra, é de regra da casa — mas entra aqui porque nenhum óculos da lista protege de uma pistola apontada de perto.',
      },
      {
        tipo: 'h2',
        texto: 'O que costuma faltar no pedido',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Luva em mais de um tipo.</strong> A de serviço grosso e a de serviço fino não são a mesma, e exigir uma só garante que uma das duas tarefas será feita sem.',
          '<strong>Reposição frequente.</strong> Luva de oficina tem vida curta; quando falta, o pessoal trabalha sem e ninguém avisa.',
          '<strong>Proteção auditiva</strong>, onde há esmeril, lixadeira e ar comprimido em uso contínuo.',
          '<strong>Quem circula no box.</strong> Atendente, lavador e estagiário entram na mesma área e não costumam estar na lista.',
          '<strong>Proteção de face na bateria</strong>, que é um ponto de risco químico esquecido.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'Que serviços a oficina faz: mecânica, funilaria, pintura, elétrica, lavagem.',
          'Quais solventes e desengraxantes são usados, com nome.',
          'Se existe exaustão de escapamento no box, e se há box fechado.',
          'Se há esmeril, lixadeira e com que frequência.',
          'Como é o piso e o que escorre nele.',
          'Quantas pessoas, e quem entra no box sem ser mecânico.',
          'O CA de cada item, lembrando que luva, óculos e respirador são aprovações separadas.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Oficina pequena costuma comprar EPI por caixa e por preço, e é o lugar onde isso sai mais caro: item que não deixa trabalhar não é usado, e item não usado é dinheiro gasto sem nenhuma proteção em troca.',
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
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
    ],
    paginaComercial: {
      href: '/empresas/',
      rotulo: 'Ver soluções para empresas',
    },
    contexto: 'empresas',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Tenho uma oficina e queria ajuda para montar a lista de EPI a partir dos serviços que a gente faz.',
    ctaTitulo: 'Vai equipar uma oficina?',
    ctaTexto:
      'Conte que serviços vocês fazem e quais solventes usam. A gente monta a lista com luva em mais de um tipo, que é o que faz a equipe realmente usar.',
    perguntas: [
      {
        pergunta: 'Luva de vaqueta serve para trabalhar com óleo?',
        resposta:
          'Serve mal. O couro absorve o óleo e passa a manter o produto em contato com a pele, o que é pior do que parece e não sai com limpeza. Vaqueta tem lugar em serviço de abrasão e de manuseio grosso; onde há óleo e solvente, o caminho é outro material.',
      },
      {
        pergunta: 'Creme de proteção substitui a luva?',
        resposta:
          'Não. Ele é complemento, e ajuda em contato leve e eventual. Onde existe solvente ou contato prolongado, quem faz a barreira é a luva compatível com aquele produto — creme nenhum segura solvente.',
      },
      {
        pergunta: 'Máscara resolve o gás de escape num box fechado?',
        resposta:
          'Não resolve. Monóxido de carbono não tem cheiro e não é retido por filtro comum, então a pessoa não percebe nada enquanto se expõe. A resposta é exaustão ligada ao escapamento e ventilação do box, e isso vem antes de qualquer equipamento individual.',
      },
    ],
  },
  {
    slug: 'botina-bota-ou-sapato-de-seguranca',
    titulo: 'Botina, bota ou sapato de segurança: quando cada um',
    tituloSeo: 'Botina, bota ou sapato de segurança',
    resumo:
      'Essa escolha vem depois da categoria, e não no lugar dela. O que decide a altura do cano é o que pode entrar pelo pé e o que o tornozelo faz no turno.',
    descricaoSeo:
      'O que muda entre sapato, botina e bota de cano alto: barreira de entrada, apoio do tornozelo e conforto. A pergunta que resolve, e o erro do cano mais alto.',
    publicado: '2026-09-20',
    atualizado: '2026-09-20',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Calçados',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'A altura do cano não muda a proteção contra impacto: isso é da biqueira. O cano resolve outras duas coisas — o que pode entrar pelo pé e o que acontece com o tornozelo ao longo do turno. Escolher o mais alto "por garantia" é o erro mais comum aqui, e ele costuma terminar com o calçado fora do pé.',
      },
      {
        tipo: 'p',
        texto:
          'Vale separar uma coisa da outra logo no começo. Se a sua dúvida ainda é entre calçado ocupacional e de segurança, ela vem antes desta e está em <a href="/calcados/comparativo/">ocupacional ou de segurança: qual é o seu caso</a>. Definida a categoria, sobra escolher o formato — e é disso que este texto trata.',
      },
      {
        tipo: 'h2',
        texto: 'O que o cano faz, e o que ele não faz',
      },
      {
        tipo: 'p',
        texto:
          'Ele faz duas coisas. A primeira é barreira: impedir que respingo, cavaco, brita, grão ou água entrem pela boca do calçado. A segunda é envolver o tornozelo, o que dá sensação de firmeza em piso irregular e limita movimento em piso regular.',
      },
      {
        tipo: 'p',
        texto:
          'E vale dizer o que ele não faz, porque a confusão é frequente: cano alto não substitui biqueira de proteção e não protege a sola contra perfuração. São requisitos independentes, e cada um precisa constar no <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">Certificado de Aprovação</a> do modelo.',
      },
      {
        tipo: 'h2',
        texto: 'Os três formatos, lado a lado',
      },
      {
        tipo: 'tabela',
        cabecalho: ['Formato', 'Onde ele ganha', 'Onde ele atrapalha'],
        linhas: [
          [
            'Sapato, de cano baixo',
            'Piso regular e interno, jornada longa, calor, quem calça e descalça várias vezes ao dia.',
            'Qualquer lugar onde algo possa entrar pela boca do calçado, e piso irregular.',
          ],
          [
            'Botina, cano na altura do tornozelo',
            'É o meio-termo que atende a maior parte da indústria, da obra e da logística: barra alguma entrada e ainda deixa caminhar.',
            'Ambiente muito quente e tarefa que exige agachar o tempo todo, onde o cano marca a canela.',
          ],
          [
            'Bota de cano alto',
            'Onde entra material pela lateral, onde há vegetação, ou onde a canela precisa de cobertura.',
            'Calor, jornada longa e troca frequente. É a que mais pesa e a que mais demora para calçar.',
          ],
          [
            'Bota de PVC',
            'Onde o pé fica dentro de líquido. É categoria à parte, tratada em <a href="/conhecimento/bota-de-pvc-quando-e-a-resposta-certa/">bota de PVC</a>.',
            'Uso o dia inteiro em ambiente seco, porque não respira.',
          ],
        ],
      },
      {
        tipo: 'h2',
        texto: 'A pergunta que resolve',
      },
      {
        tipo: 'p',
        texto:
          'Em vez de comparar os três, responda duas coisas sobre a rotina real:',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Alguma coisa pode entrar pelo pé?</strong> Respingo quente, cavaco de torno, brita, grão, água, produto. Se pode, o cano sobe.',
          '<strong>O piso é irregular ou a pessoa sobe e desce?</strong> Terreno de obra, escada, plataforma e valeta pedem apoio de tornozelo. Piso de galpão plano, não.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Respondidas as duas, o formato quase sempre se escolhe sozinho. E quando as duas respostas forem não, o sapato deixa de ser a opção "menos protetora" e passa a ser a mais adequada.',
      },
      {
        tipo: 'h2',
        texto: 'Fechamento: cadarço, elástico ou fivela',
      },
      {
        tipo: 'p',
        texto:
          'É uma decisão pequena que muda o dia. O elástico é o formato de quem calça e descalça várias vezes — cozinha, área limpa, entrada de sala controlada. O cadarço dá ajuste fino, que importa em pé mais estreito ou mais largo, e exige atenção onde há máquina rotativa, porque ponta solta é risco de enrosco.',
      },
      {
        tipo: 'p',
        texto:
          'Um sinal prático de numeração errada: elástico frouxo depois de pouco tempo costuma indicar número acima do ideal, e não elástico ruim.',
      },
      {
        tipo: 'h2',
        texto: 'O erro de escolher pelo cano mais alto',
      },
      {
        tipo: 'p',
        texto:
          'Bota de cano alto em cozinha quente, ou em jornada de dez horas em piso plano, é a receita para a pessoa trocar por conta própria. E o par que ela vai usar no lugar quase nunca é EPI.',
      },
      {
        tipo: 'p',
        texto:
          'Aqui vale a mesma lógica do peso: proteção que não fica no corpo tem desempenho zero, por melhor que seja a especificação. O efeito do peso e da jornada está em <a href="/conhecimento/calcado-para-quem-trabalha-em-pe-o-dia-todo/">calçado para quem trabalha em pé o dia todo</a>.',
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'Se existe risco de impacto sobre o pé, que define a categoria antes do formato.',
          'O que pode entrar pela boca do calçado na rotina real.',
          'Como é o piso: plano, irregular, com escada, com valeta.',
          'Quantas vezes por turno a pessoa calça e descalça.',
          'A temperatura do ambiente, que é o que faz cano alto ser abandonado.',
          'Se há máquina rotativa por perto, o que pesa contra o cadarço.',
          'A numeração provada no fim do expediente, e a largura da forma.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Em compra para equipe é comum precisar de mais de um formato, e isso não é falha de padronização. Padronizar o critério é o que importa; obrigar a mesma bota em áreas diferentes é padronizar o que não deveria.',
      },
      {
        tipo: 'p',
        texto:
          'Para juntar formato, categoria, solado e conforto numa resposta só, a ferramenta <a href="/ferramentas/qual-calcado-usar/">qual calçado profissional é ideal para você</a> faz as perguntas na ordem certa.',
      },
    ],
    fontes: [
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto oficial, PDF)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
    ],
    paginaComercial: {
      href: '/calcados/',
      rotulo: 'Ver os calçados que a Tower trabalha',
    },
    contexto: 'calcados',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Estou em dúvida entre sapato, botina e bota para a minha equipe e queria ajuda para decidir.',
    ctaTitulo: 'Em dúvida entre sapato, botina e bota?',
    ctaTexto:
      'Conte o que pode entrar pelo pé na rotina da equipe e como é o piso. Com essas duas respostas dá para fechar o formato, e a gente já ajuda com a grade.',
    perguntas: [
      {
        pergunta: 'Cano alto protege mais?',
        resposta:
          'Protege de outra coisa. Ele impede entrada de material pela boca do calçado e envolve o tornozelo, e não tem relação com a proteção dos dedos, que vem da biqueira. Onde não existe o que entrar nem piso irregular, o cano alto só acrescenta peso e calor.',
      },
      {
        pergunta: 'Sapato de segurança pode ser usado em obra?',
        resposta:
          'Pode existir com biqueira e atender à norma, mas em obra costuma ser a escolha errada por outro motivo: terreno irregular, entulho e material solto pedem cano. Quem define é o risco da frente de trabalho, não o formato em si.',
      },
      {
        pergunta: 'A calça vai por dentro ou por fora da bota?',
        resposta:
          'Depende do que você quer evitar. Contra respingo e material que cai de cima, a calça vai por fora, para escorrer. Em vegetação alta ou onde há risco de enrosco, a calça costuma ir por dentro. É uma decisão da atividade, e vale combinar com a equipe para não ficar cada um de um jeito.',
      },
    ],
  },
  {
    slug: 'epi-pelo-menor-preco-onde-a-conta-nao-fecha',
    titulo: 'O erro de comprar EPI pelo menor preço',
    tituloSeo: 'EPI pelo menor preço: a conta fecha?',
    resumo:
      'Às vezes o mais barato é exatamente o certo, e dizer o contrário é conversa de vendedor. O problema é que o preço da caixa é só uma das quatro parcelas.',
    descricaoSeo:
      'As quatro parcelas do custo real de um EPI, quando o mais barato é a escolha certa e quando ele é o mais caro de todos — com o que pedir para fazer a conta.',
    publicado: '2026-09-20',
    atualizado: '2026-09-20',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Compra',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Nem sempre o mais barato é o errado. Às vezes é exatamente o certo, e quem diz o contrário está vendendo. O problema é outro: o preço da caixa é só a primeira de quatro parcelas do que aquele EPI vai custar, e as outras três só aparecem depois que a compra já foi feita.',
      },
      {
        tipo: 'p',
        texto:
          'Este texto não existe para convencer ninguém a gastar mais. Existe para que a comparação seja entre as mesmas coisas — porque comparar preço de itens que não fazem o mesmo trabalho não é economia, é sorteio.',
      },
      {
        tipo: 'h2',
        texto: 'As quatro parcelas do custo',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>1. O preço.</strong> É o que aparece na proposta, e é a única parcela que todo mundo compara.',
          '<strong>2. Quantas vezes você troca por ano.</strong> Um par que dura metade custa o dobro, mesmo que a etiqueta diga o contrário.',
          '<strong>3. Quanto tempo ele passa no corpo.</strong> EPI que incomoda sai. E item que não é usado tem custo integral e proteção zero.',
          '<strong>4. O que ele deixa de proteger.</strong> Esta não tem preço de tabela, e é a única que pode aparecer como afastamento.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'As duas primeiras se calculam. A terceira se observa no chão. A quarta é a que transforma uma economia em prejuízo, e é a razão de a escolha começar pelo risco da atividade e não pelo orçamento.',
      },
      {
        tipo: 'h2',
        texto: 'A conta que quase ninguém faz',
      },
      {
        tipo: 'p',
        texto:
          'Ela é simples: em vez de comparar o preço do item, compare o custo por pessoa por ano. Preço multiplicado pelo número de trocas esperadas no período, para cada opção.',
      },
      {
        tipo: 'p',
        texto:
          'Não vou colocar números aqui, porque eles dependem do seu ambiente e inventá-los seria enganar. Mas vale fazer a conta com os seus: se o item mais barato é trocado com o dobro da frequência, a diferença de preço desaparece — e o que sobra é o tempo gasto em compra, entrega e registro a mais, que também custa.',
      },
      {
        tipo: 'p',
        texto:
          'O caminho para estimar frequência de troca de calçado está em <a href="/conhecimento/quantos-pares-por-ano-calcular-a-reposicao/">quantos pares por ano</a>.',
      },
      {
        tipo: 'h2',
        texto: 'O custo que não está em planilha nenhuma',
      },
      {
        tipo: 'p',
        texto:
          'É o item comprado e não usado. Luva grossa demais para o serviço fino, protetor que esquenta, botina que machuca, óculos que embaça. A pessoa não avisa que parou de usar; ela simplesmente para.',
      },
      {
        tipo: 'p',
        texto:
          'Quando isso acontece com mais de uma pessoa no mesmo item, o problema é o item, e não a equipe — o assunto está em <a href="/conhecimento/funcionario-recusa-usar-epi-o-que-fazer/">funcionário se recusa a usar o EPI</a>. E o dinheiro daquela caixa já foi gasto inteiro, sem nenhuma proteção em troca.',
      },
      {
        tipo: 'h2',
        texto: 'Quando o mais barato é a escolha certa',
      },
      {
        tipo: 'p',
        texto:
          'Existe, e é honesto dizer quais são os casos:',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Uso esporádico</strong>, de quem entra na área poucas vezes por mês.',
          '<strong>Visitante e terceiro de passagem</strong>, onde o item precisa atender ao risco e não precisa durar.',
          '<strong>Descartável por higiene</strong>, em que a vida útil é de uso único por definição e durabilidade não é critério.',
          '<strong>Onde as opções são equivalentes</strong> em desempenho e em conforto, e a diferença é só de marca.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Nesses casos, pagar mais não compra proteção nenhuma — compra só a sensação de ter comprado melhor.',
      },
      {
        tipo: 'h2',
        texto: 'Quando ele é o mais caro de todos',
      },
      {
        tipo: 'p',
        texto:
          'Quando o item não corresponde ao risco. Aí ele não é barato nem caro: é inútil, e pior que inútil, porque dá à pessoa a sensação de estar protegida. Máscara para partícula onde existe vapor, luva de procedimento onde existe produto químico, calçado sem biqueira onde cai peso.',
      },
      {
        tipo: 'p',
        texto:
          'O filtro contra isso é objetivo e não custa nada: o <a href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">Certificado de Aprovação</a> diz para que aquele modelo foi ensaiado. Item sem CA, ou com CA para outro risco, sai da comparação antes de o preço entrar na conversa.',
      },
      {
        tipo: 'h2',
        texto: 'Como comparar propostas sem comparar só preço',
      },
      {
        tipo: 'p',
        texto:
          'Para que a comparação seja justa, as propostas precisam estar na mesma base. Peça que cada uma traga:',
      },
      {
        tipo: 'lista',
        itens: [
          'O número do CA de cada item, e não só a descrição.',
          'A categoria e o desempenho, quando houver — biqueira, resistência ao escorregamento, atenuação, classe de filtro.',
          'Marca e modelo exatos, porque "luva nitrílica" não é um produto.',
          'Prazo de entrega e condição de reposição.',
          'O que acontece quando a numeração vem errada.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Se a escolha ainda for entre fornecedores, e não entre itens, isso tem texto próprio: <a href="/conhecimento/como-escolher-fornecedor-de-epi/">como escolher um fornecedor de EPI</a>.',
      },
      {
        tipo: 'h2',
        texto: 'Uma observação de quem vende',
      },
      {
        tipo: 'p',
        texto:
          'A Tower é distribuidora, e tem interesse óbvio nesta conversa. Por isso vale ser direto: se o mais barato atende ao risco e a equipe usa, ele é a resposta certa, e a gente diz isso.',
      },
      {
        tipo: 'p',
        texto:
          'O que a gente não faz é vender item que não corresponde ao risco porque o preço fechou. Esse tipo de venda volta — em troca, em reclamação, ou em coisa pior.',
      },
    ],
    fontes: [
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto oficial, PDF)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
    ],
    paginaComercial: {
      href: '/orcamento/',
      rotulo: 'Montar o orçamento',
    },
    contexto: 'orcamento',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Tenho propostas de EPI com preços bem diferentes e queria ajuda para comparar o que realmente muda entre elas.',
    ctaTitulo: 'Tem propostas com preços muito diferentes?',
    ctaTexto:
      'Mande o que você recebeu. A gente ajuda a colocar tudo na mesma base — CA, categoria e desempenho — para a comparação ser entre as mesmas coisas.',
    perguntas: [
      {
        pergunta: 'O item mais caro é o que protege mais?',
        resposta:
          'Não existe essa relação. Dois modelos que atendem ao mesmo requisito protegem igual contra aquele risco, e o preço pode variar por conforto, acabamento, durabilidade ou marca. O que separa proteção de preço é o Certificado de Aprovação, que diz para que o modelo foi ensaiado.',
      },
      {
        pergunta: 'Comprar em quantidade maior compensa?',
        resposta:
          'Compensa quando o item tem giro e não vence na prateleira. Descartável, filtro e item com prazo de validade estocados em excesso viram perda. E estoque grande de um modelo que a equipe rejeita é o pior dos dois mundos: dinheiro parado em algo que não é usado.',
      },
      {
        pergunta: 'Como justificar internamente um item mais caro?',
        resposta:
          'Com a conta de custo por pessoa por ano, e não com argumento de qualidade. Preço vezes número de trocas no período, para cada opção, mais a observação de quanto tempo cada uma fica de fato no corpo. É um número que a área de compras entende e que sustenta a decisão depois.',
      },
    ],
  },
  {
    slug: 'epi-para-beneficiamento-de-castanha-de-caju',
    titulo: 'EPI para beneficiamento de castanha de caju',
    tituloSeo: 'EPI para beneficiamento de castanha de caju',
    resumo:
      'Na castanha de caju o risco tem nome: o líquido da casca. Ele queima a pele, e quase tudo o que a fábrica precisa de EPI existe por causa dele.',
    descricaoSeo:
      'O líquido da casca queima a pele, o cozimento solta vapor e a quebra é trabalho manual o dia inteiro. O que organiza o EPI de uma fábrica de castanha.',
    publicado: '2026-09-28',
    atualizado: '2026-09-28',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Na castanha de caju o risco tem nome: o líquido da casca, que o setor chama de LCC. Ele é cáustico, gruda na pele e queima. Luva, avental, lavagem, reposição durante o turno — quase tudo o que uma fábrica de castanha precisa de EPI existe por causa dele.',
      },
      {
        tipo: 'p',
        texto:
          'O Ceará é o maior produtor de castanha de caju do país, e o beneficiamento acontece em duas escalas muito diferentes: a indústria grande, mecanizada, e as minifábricas do interior, modelo que a Embrapa desenvolveu com uma fábrica-escola em Pacajus, na Região Metropolitana de Fortaleza. O risco é o mesmo nas duas. O que muda é quem compra o EPI e como a compra é feita.',
      },
      {
        tipo: 'h2',
        texto: 'O líquido da casca organiza o resto',
      },
      {
        tipo: 'p',
        texto:
          'Entre a casca e a amêndoa existe um líquido escuro e pegajoso. Ele contém ácido anacárdico, que irrita e queima a pele por contato, e não sai com água. O dano aparece nas mãos de quem corta, quebra e separa castanha sem proteção: rachaduras, dor e, em casos documentados no Nordeste, a perda das digitais.',
      },
      {
        tipo: 'p',
        texto:
          'Daí vem a regra que mais se erra no setor: a proteção das mãos é química, e não mecânica. Luva de pano ou de malha absorve o líquido e o segura contra a pele, o que é pior do que não usar nada. A luva precisa ser de material compatível com o LCC, confirmado na tabela do fabricante da luva. O raciocínio é o mesmo de <a href="/conhecimento/luva-para-produto-quimico-como-escolher/">qualquer luva para produto químico</a>: tempo de contato e compatibilidade, e não a aparência.',
      },
      {
        tipo: 'p',
        texto:
          'Um sinal prático de que a luva está errada aparece antes de qualquer laudo: ela escurece por dentro, amolece ou fica pegajosa no meio do turno. Quando isso acontece, o líquido já passou, e a troca é naquela hora — não no fim do expediente.',
      },
      {
        tipo: 'h2',
        texto: 'Cozimento: vapor e superfície quente',
      },
      {
        tipo: 'p',
        texto:
          'Antes do corte, a castanha passa por um tratamento térmico que amolece a casca e facilita a separação. Quem abre o cozedor, retira os cestos e movimenta a castanha quente lida com vapor e com superfície quente, que são riscos diferentes do LCC e pedem luva diferente: proteção contra calor de contato é uma característica própria, que consta no Certificado de Aprovação.',
      },
      {
        tipo: 'p',
        texto:
          'É o posto em que uma luva só costuma falhar nos dois sentidos. A luva térmica não segura o líquido, e a luva química não aguenta o cesto quente. Separar os dois postos na lista de compra resolve mais do que procurar a luva que faça tudo.',
      },
      {
        tipo: 'h2',
        texto: 'Corte e quebra: a mão perto da máquina',
      },
      {
        tipo: 'p',
        texto:
          'No corte, a castanha é posicionada à mão numa máquina de lâmina, muitas vezes acionada por pedal, centenas de vezes por turno. O risco para a mão é mecânico, e o que protege de verdade é a própria máquina: guarda, posição de trabalho e treino. Luva não protege de prensagem, e insistir nela atrasa a solução certa.',
      },
      {
        tipo: 'p',
        texto:
          'Ao mesmo tempo, é o posto com mais contato com o LCC, porque a lâmina abre a casca e o líquido escorre. Por isso a luva desse posto é escolhida pelo líquido, e a proteção contra o corte vem da máquina.',
      },
      {
        tipo: 'h2',
        texto: 'Estufa, despeliculagem e seleção',
      },
      {
        tipo: 'p',
        texto:
          'Depois do corte, a amêndoa seca em estufa, perde a película e é classificada, quase sempre à mão e sentada, por horas. O risco químico cai, e aparecem a poeira da película, o calor perto da estufa e a postura. Aqui a queixa costuma ser de cansaço e de dor, e a resposta é organização do posto e pausa, mais do que equipamento.',
      },
      {
        tipo: 'p',
        texto:
          'Vale uma separação que confunde muita gente em indústria de alimento: touca, máscara higiênica e luva descartável de manipulação existem para proteger o produto, pelas boas práticas de fabricação. Elas não são EPI e não protegem o trabalhador do LCC. As duas listas convivem, e uma não substitui a outra.',
      },
      {
        tipo: 'h2',
        texto: 'O pé e o piso',
      },
      {
        tipo: 'p',
        texto:
          'Resíduo de LCC e de óleo no chão deixa o piso escorregadio, e boa parte da fábrica é de jornada em pé. Onde não há risco de queda de objeto pesado, <a href="/calcados/antiderrapantes/">calçado ocupacional antiderrapante</a> e fechado atende melhor e cansa menos. Onde há movimentação de sacas e de cestos pesados, a categoria muda para calçado com biqueira.',
      },
      {
        tipo: 'h2',
        texto: 'O que costuma faltar no pedido',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Luva de reposição durante o turno.</strong> Luva que entrou em contato com o líquido tem vida curta, e quando a reposição falta, a equipe trabalha sem.',
          '<strong>Luva térmica separada da luva química.</strong> O posto do cozimento e o posto do corte pedem coisas diferentes, e viram um item só na hora da compra.',
          '<strong>Avental impermeável</strong> para quem manipula castanha crua e casca, que respinga no corpo e não só na mão.',
          '<strong>Proteção para quem limpa.</strong> Quem recolhe casca e lava o piso encontra o mesmo líquido, e raramente está na lista.',
          '<strong>Calçado antiderrapante</strong> onde o piso acumula resíduo, e não o mesmo calçado para a fábrica inteira.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'Quais etapas existem na fábrica: cozimento, corte, estufa, despeliculagem, seleção, embalagem.',
          'Em quais postos há contato direto com a casca e com o líquido.',
          'Se o LCC é recolhido e armazenado, e se há ficha de segurança dele.',
          'A medição de ruído, onde houver máquinas de corte em série.',
          'Onde há movimentação de sacas e cestos pesados, e onde não há.',
          'O CA de cada item, lembrando que proteção química, contra calor e contra corte são aprovações separadas.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Na minifábrica, essa conversa costuma cair na cooperativa ou no dono, que já faz tudo. Vale montar a lista por posto uma vez, escrita, e repor a partir dela. Se a unidade fica na Região Metropolitana, o texto sobre <a href="/conhecimento/epi-na-regiao-metropolitana-de-fortaleza/">EPI na Região Metropolitana de Fortaleza</a> trata de como organizar a compra quando a empresa tem mais de um endereço.',
      },
    ],
    fontes: [
      {
        titulo: 'Maior produtor de castanha de caju do país, Ceará enfrenta desafios no setor — Assembleia Legislativa do Ceará',
        url: 'https://www.al.ce.gov.br/noticias/maior-produtor-de-castanha-de-caju-do-pais-ceara-enfrenta-desafios-no-setor',
      },
      {
        titulo: 'Cajucultura — Caderno Setorial ETENE, Banco do Nordeste (março de 2026)',
        url: 'https://www.bnb.gov.br/revista/cse/article/view/3378',
      },
      {
        titulo: 'Minifábrica de processamento de castanha de caju — Circular Técnica nº 7, Embrapa',
        url: 'https://www.infoteca.cnptia.embrapa.br/bitstream/doc/422699/1/Ci007.pdf',
      },
      {
        titulo: 'Líquido da casca da castanha-de-caju: de subproduto do agronegócio a protagonista da química — Agência UFC',
        url: 'https://agencia.ufc.br/liquido-da-casca-da-castanha-de-caju-de-subproduto-do-agronegocio-a-protagonista-da-quimica/',
      },
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto oficial, PDF)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
    ],
    paginaComercial: {
      href: '/epi-por-cidade/ceara/',
      rotulo: 'Ver o atendimento no Ceará',
    },
    contexto: 'epi-por-cidade',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Trabalho com beneficiamento de castanha de caju e queria ajuda para montar a lista de EPI por posto da fábrica.',
    ctaTitulo: 'Quais etapas a sua fábrica tem?',
    ctaTexto:
      'Conte do cozimento à embalagem, e em quais postos há contato com a casca. A gente separa a lista por posto, porque o corte e o cozimento não pedem a mesma luva.',
    perguntas: [
      {
        pergunta: 'Por que a mão de quem quebra castanha fica rachada?',
        resposta:
          'Por causa do líquido da casca. Ele contém ácido anacárdico, que irrita e queima a pele por contato e não sai com água. Sem luva compatível, o contato repetido ao longo do turno racha e fere a pele das mãos.',
      },
      {
        pergunta: 'Touca e máscara da fábrica de alimentos são EPI?',
        resposta:
          'Não. Touca, máscara higiênica e luva descartável de manipulação existem para proteger o produto, pelas boas práticas de fabricação. O EPI protege o trabalhador, e é escolhido pelo risco do posto. Numa fábrica de castanha as duas listas convivem.',
      },
      {
        pergunta: 'Minifábrica precisa do mesmo EPI que a indústria grande?',
        resposta:
          'Precisa da mesma proteção, porque o risco é o mesmo: o líquido da casca queima a pele nas duas. O que muda é a quantidade, a organização da compra e, às vezes, o equipamento de corte, que na minifábrica costuma ser mais manual.',
      },
    ],
  },
  {
    slug: 'epi-para-ceramica-vermelha-e-olaria',
    titulo: 'EPI para cerâmica vermelha e olaria: o que muda',
    tituloSeo: 'EPI para cerâmica vermelha e olaria',
    resumo:
      'Cerâmica de telha e tijolo junta poeira mineral, calor de forno, ruído e peso. E a compra de EPI costuma resolver só o risco que se vê.',
    descricaoSeo:
      'Poeira de argila, calor de forno, ruído de máquina e peso o dia inteiro. O que organiza o EPI de uma cerâmica de telha e tijolo, do barreiro à expedição.',
    publicado: '2026-09-28',
    atualizado: '2026-09-28',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Uma cerâmica de telha e tijolo junta quatro riscos que raramente aparecem juntos: poeira mineral, calor de forno, ruído de máquina e carga manual. A compra de EPI costuma resolver o que se vê, que é o calor. O risco mais sério é o que não se vê: a poeira.',
      },
      {
        tipo: 'p',
        texto:
          'Teresina é o maior polo produtor de cerâmica vermelha do Piauí, principalmente de telhas. Não confundir com o polo artesanal do Poti Velho, que é outra atividade, de ateliê, com outra escala. Este texto trata da indústria: do barreiro de onde sai a argila até a expedição.',
      },
      {
        tipo: 'h2',
        texto: 'A poeira de argila é o risco que não aparece',
      },
      {
        tipo: 'p',
        texto:
          'A argila contém sílica. Quando ela seca e é triturada, varrida ou manuseada, parte vira poeira fina o bastante para chegar ao fundo do pulmão. A exposição repetida por anos pode causar silicose, uma doença pulmonar sem cura. Não dói no primeiro dia, e é por isso que é a parte da lista que mais falta.',
      },
      {
        tipo: 'p',
        texto:
          'Os pontos de mais poeira costumam ser a preparação da massa, o destorroamento, a varrição a seco, o pátio de secagem e a desenforna. Antes do respirador vem o que tira a poeira do ar: umidificar, trocar a varrição a seco por limpeza úmida, ventilar. Depois disso, o respirador para partículas, escolhido pela avaliação de riscos da empresa. A sequência da escolha está em <a href="/conhecimento/respirador-como-escolher-o-filtro/">como escolher o filtro do respirador</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Um detalhe que decide se o respirador funciona: ele precisa vedar no rosto. Barba e máscara de pano por baixo abrem caminho para a poeira, e o equipamento certo passa a proteger pela metade.',
      },
      {
        tipo: 'h2',
        texto: 'O forno: calor de ambiente e calor de contato',
      },
      {
        tipo: 'p',
        texto:
          'Na queima, na enforna e na desenforna, o trabalhador lida com dois calores diferentes. O do ambiente, que se controla com organização: pausa, rodízio, hidratação, e que EPI nenhum resolve. E o calor de contato, das peças que saem quentes do forno, que pede luva própria. Proteção contra calor de contato é uma característica que consta no Certificado de Aprovação, e não uma luva grossa qualquer.',
      },
      {
        tipo: 'p',
        texto:
          'É o posto em que a luva mais se confunde. A luva para peça quente não é a mesma do manuseio de telha fria, e a luva do manuseio não aguenta o forno. Separar os dois postos na lista evita a luva que serve mais ou menos para os dois.',
      },
      {
        tipo: 'h2',
        texto: 'Ruído: misturador, maromba e destorroador',
      },
      {
        tipo: 'p',
        texto:
          'A preparação e a conformação da massa usam máquinas que fazem ruído o turno inteiro. A atenuação necessária vem da medição feita pela empresa, e a escolha entre os tipos sai da rotina de cada posto. O que muda de um para outro está em <a href="/conhecimento/protetor-auditivo-plug-ou-concha/">protetor auditivo: plug ou concha</a>.',
      },
      {
        tipo: 'h2',
        texto: 'Peso, abrasão e o pé',
      },
      {
        tipo: 'p',
        texto:
          'Telha e tijolo são carregados, empilhados e paletizados à mão o dia inteiro. A peça é áspera e desgasta a pele da mão, e de vez em quando cai. Por isso aqui a luva é de manuseio, resistente à abrasão, e o calçado é de segurança, com biqueira: queda de peça sobre o pé é risco real no pátio e na expedição. O que muda entre <a href="/calcados/seguranca/">os calçados de segurança</a> está na página da categoria.',
      },
      {
        tipo: 'p',
        texto:
          'Quem trabalha no barreiro e no pátio passa boa parte do dia no sol. Roupa de manga longa e proteção para a cabeça entram na conversa, e a avaliação de riscos define quais desses itens a empresa trata como EPI.',
      },
      {
        tipo: 'h2',
        texto: 'O que costuma faltar no pedido',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Respirador para quem varre e desenforna.</strong> É o posto com mais poeira e o que menos aparece na lista.',
          '<strong>Luva térmica separada da luva de manuseio.</strong> Forno e pátio pedem coisas diferentes.',
          '<strong>Reposição de luva de manuseio.</strong> A abrasão da telha gasta a luva em dias, e quando ela fura, a mão passa a trabalhar sem.',
          '<strong>Protetor auditivo para quem só passa pela área das máquinas</strong>, que respira a mesma poeira e ouve o mesmo ruído.',
          '<strong>Calçado com biqueira na expedição</strong>, e não só no forno.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'Quais etapas existem: barreiro, preparação, conformação, secagem, forno, expedição.',
          'Onde a limpeza é feita a seco, e se dá para trocar por limpeza úmida.',
          'A medição de ruído e, se houver, a avaliação de poeira da empresa.',
          'Quem opera o forno e quem só passa por ele.',
          'Onde há empilhamento e carga manual, e onde há máquina.',
          'O CA de cada item, lembrando que proteção respiratória, contra calor e auditiva são aprovações separadas.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Cerâmica costuma ter muita gente no pátio e na expedição e pouca gente no forno. Vale montar a lista por posto, e não por pessoa: é o que mantém a compra certa quando a equipe do pátio muda na safra de obra.',
      },
    ],
    fontes: [
      {
        titulo: 'Cerâmica vermelha em Teresina — Revista Cerâmica Industrial, v. 14, n. 4 (2009)',
        url: 'https://www.ceramicaindustrial.org.br/article/5876573d7f8c9d6e028b476d/pdf/ci-14-4-5876573d7f8c9d6e028b476d.pdf',
      },
      {
        titulo: 'Revitalização do Polo Cerâmico do Poti Velho — Governo do Piauí',
        url: 'https://www.pi.gov.br/revitalizacao-do-polo-ceramico-do-poti-velho-e-inaugurada-e-vai-impulsionar-turismo-e-vendas-na-regiao-1/',
      },
      {
        titulo: 'Riscos profissionais no setor cerâmico: estudo de caso — Contecc 2018, Confea',
        url: 'https://www.confea.org.br/sites/default/files/antigos/contecc2018/mecanica/26_ronicedcmeinmdp.pdf',
      },
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto oficial, PDF)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
    ],
    paginaComercial: {
      href: '/epi-por-cidade/teresina-pi/',
      rotulo: 'Ver o atendimento em Teresina',
    },
    contexto: 'cidade-teresina',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Tenho uma cerâmica de telha e tijolo e queria ajuda para montar a lista de EPI por posto, do pátio ao forno.',
    ctaTitulo: 'Quais postos a sua cerâmica tem?',
    ctaTexto:
      'Conte do barreiro à expedição, e onde a limpeza é feita a seco. A gente separa a lista por posto, porque forno, pátio e preparação da massa não pedem a mesma coisa.',
    perguntas: [
      {
        pergunta: 'Máscara de pano protege da poeira de argila?',
        resposta:
          'Não. A poeira que preocupa é a fina, que chega ao fundo do pulmão, e o tecido não a retém. O que protege é respirador para partículas, com Certificado de Aprovação e bem vedado no rosto, depois das medidas que tiram a poeira do ar.',
      },
      {
        pergunta: 'Por que a poeira da cerâmica é perigosa se é só barro?',
        resposta:
          'Porque a argila contém sílica, e a parte mais fina da poeira, respirada por anos, pode causar silicose, uma doença pulmonar sem cura. O risco não aparece no curto prazo, e é por isso que costuma ficar fora da lista de compra.',
      },
      {
        pergunta: 'A luva do forno serve para carregar telha?',
        resposta:
          'Costuma servir mal. A luva para peça quente é feita para calor de contato, e a do manuseio é feita para abrasão. Uma usada no lugar da outra ou esquenta a mão ou gasta em poucos dias. Vale separar os dois postos na lista.',
      },
    ],
  },
  {
    slug: 'epi-para-salina-e-industria-do-sal',
    titulo: 'EPI para salina e indústria do sal: o que muda',
    tituloSeo: 'EPI para salina e indústria do sal',
    resumo:
      'Numa salina o sol vem duas vezes: de cima e refletido pelo sal. É o risco que organiza o resto, e o que a compra de EPI costuma tratar como detalhe.',
    descricaoSeo:
      'Sol refletido no sal, salmoura no pé, poeira na moagem e máquina na colheita. O que organiza o EPI de uma salina, do cristalizador à embalagem.',
    publicado: '2026-09-28',
    atualizado: '2026-09-28',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Numa salina o sol vem duas vezes: de cima e refletido pelo sal branco do chão. É o risco que organiza o resto — olhos, pele, calor — e é o que a compra de EPI costuma tratar como detalhe, com um boné e um óculos escuro qualquer.',
      },
      {
        tipo: 'p',
        texto:
          'O Rio Grande do Norte produz quase todo o sal marinho do Brasil, concentrado na Costa Branca: Mossoró, Macau, Areia Branca e Grossos. É trabalho a céu aberto, em área plana, clara e sem sombra, com a colheita e o beneficiamento cada vez mais mecanizados. Este texto trata da salina inteira, do cristalizador à embalagem.',
      },
      {
        tipo: 'h2',
        texto: 'O sol que vem de baixo',
      },
      {
        tipo: 'p',
        texto:
          'Superfície clara reflete radiação, e o sal é das mais claras que existem. Quem trabalha no cristalizador recebe o sol de cima e o refletido de baixo, que entra por onde o boné não cobre: pelos lados do rosto e direto nos olhos. A exposição repetida à radiação ultravioleta está ligada a queimadura, envelhecimento da pele, câncer de pele e catarata.',
      },
      {
        tipo: 'p',
        texto:
          'Por isso o óculos da salina é equipamento de proteção, com Certificado de Aprovação e filtro para radiação ultravioleta, e não óculos escuro comum. Lente escura sem filtro faz a pupila abrir, e pode deixar entrar mais radiação do que entraria sem óculos nenhum. O modelo com proteção lateral faz diferença aqui, porque o reflexo vem de baixo e dos lados. As opções estão em <a href="/protecao/olhos-e-face/">proteção para olhos e face</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Para a pele, roupa de manga longa e proteção de cabeça que cubra a nuca e as laterais do rosto. A avaliação de riscos da empresa define quais desses itens ela trata como EPI e quais como uniforme — mas a exposição é a mesma nos dois casos.',
      },
      {
        tipo: 'h2',
        texto: 'Calor: o que EPI não resolve',
      },
      {
        tipo: 'p',
        texto:
          'Área sem sombra, sol refletido e esforço físico somam uma carga de calor alta na maior parte do ano. Isso se controla com organização — pausa, água, sombra, horário das tarefas mais pesadas —, e nenhum equipamento substitui essas medidas. Vale lembrar na hora de escolher roupa e calçado: o que é pesado e abafado demais acaba sendo tirado no meio do turno.',
      },
      {
        tipo: 'h2',
        texto: 'Salmoura, sal e o pé',
      },
      {
        tipo: 'p',
        texto:
          'Quem entra nos cristalizadores e nos tanques trabalha com o pé dentro de salmoura. Onde é assim, a resposta é bota impermeável de cano alto, e o critério inteiro está em <a href="/conhecimento/bota-de-pvc-quando-e-a-resposta-certa/">quando a bota de PVC é a resposta certa</a>. Calçado de couro que molha em salmoura todo dia resseca, racha e dura pouco.',
      },
      {
        tipo: 'p',
        texto:
          'O sal também corrói metal. Ilhós, fivela e biqueira metálica sofrem mais aqui do que em qualquer outro ambiente, e onde há risco de impacto a biqueira de composite costuma durar mais. O que muda entre as duas está em <a href="/conhecimento/biqueira-de-composite-ou-de-aco-qual-escolher/">biqueira de composite ou de aço</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Nas mãos, o cristal de sal é áspero e corta, e a salmoura agrava qualquer ferida. Luva impermeável onde há contato com salmoura, luva de manuseio resistente à abrasão onde se lida com sal seco e sacaria.',
      },
      {
        tipo: 'h2',
        texto: 'Colheita, lavagem e moagem: máquina, ruído e poeira',
      },
      {
        tipo: 'p',
        texto:
          'A colheita e o beneficiamento usam máquina pesada, esteira e moinho. Três coisas mudam a lista nessa parte. O ruído, que pede protetor auditivo conforme a medição feita pela empresa — a escolha entre os tipos está em <a href="/conhecimento/protetor-auditivo-plug-ou-concha/">plug ou concha</a>. A poeira de sal da moagem, do refino e da embalagem, que irrita olhos e vias respiratórias e pode pedir respirador para partículas, conforme a avaliação. E a máquina, em que a proteção de verdade é a da própria máquina, e não luva.',
      },
      {
        tipo: 'h2',
        texto: 'O EPI dura menos na salina',
      },
      {
        tipo: 'p',
        texto:
          'Sal, sol e salmoura desgastam tudo mais rápido: o elástico cede, a lente risca, a bota resseca, o metal enferruja. Duas consequências práticas. A reposição precisa de um prazo mais curto do que o de outras operações, e vale planejar isso na compra em vez de descobrir no meio da safra. E lavar com água doce ao fim do turno prolonga a vida de quase tudo — bota, óculos e luva.',
      },
      {
        tipo: 'h2',
        texto: 'O que costuma faltar no pedido',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Óculos com filtro ultravioleta e proteção lateral</strong>, no lugar do óculos escuro comum.',
          '<strong>Proteção de nuca e das laterais do rosto</strong>, que o boné não cobre.',
          '<strong>Bota de cano alto para quem entra no cristalizador</strong>, separada do calçado de quem fica na área seca.',
          '<strong>Protetor auditivo e respirador na moagem e na embalagem</strong>, que costumam ficar fora da lista por serem a parte coberta da operação.',
          '<strong>Reposição mais frequente</strong>, porque o ambiente gasta o equipamento antes do previsto.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'Quais etapas a salina tem: cristalizador, colheita, lavagem, pátio, moagem, refino, embalagem.',
          'Quem trabalha com o pé em salmoura, e quem fica na área seca.',
          'A medição de ruído das áreas de máquina e, se houver, a avaliação de poeira.',
          'Onde há risco de impacto no pé, e onde não há.',
          'Com que frequência o equipamento tem sido trocado hoje, para planejar a reposição.',
          'O CA de cada item, lembrando que proteção dos olhos, respiratória e auditiva são aprovações separadas.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Salina costuma ter muita gente na colheita em algumas épocas e pouca no resto do ano. Montar a lista por etapa, e não por pessoa, é o que mantém a compra certa quando a equipe muda. A Tower atende empresas no Rio Grande do Norte a partir de Fortaleza, e a <a href="/epi-por-cidade/assu-rn/">página do Vale do Açu</a> mostra como é o atendimento no interior do estado.',
      },
    ],
    fontes: [
      {
        titulo: 'Breve revisão sobre a evolução histórica da atividade salineira no Rio Grande do Norte — Sociedade & Natureza (SciELO)',
        url: 'http://www.scielo.br/j/sn/a/brW3Srcz78BWF5DHfzLvqcb/?lang=pt',
      },
      {
        titulo: 'Trabalho a céu aberto e sua relação com a saúde dos trabalhadores: exposição ao calor e à radiação solar — Repositório UFMG',
        url: 'https://repositorio.ufmg.br/handle/1843/53993',
      },
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto oficial, PDF)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
      {
        titulo: 'Consulta ao Certificado de Aprovação (CA) — gov.br',
        url: 'https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca',
      },
    ],
    paginaComercial: {
      href: '/epi-por-cidade/rio-grande-do-norte/',
      rotulo: 'Ver o atendimento no Rio Grande do Norte',
    },
    contexto: 'epi-por-cidade',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Trabalho numa salina no Rio Grande do Norte e queria ajuda para montar a lista de EPI por etapa, do cristalizador à embalagem.',
    ctaTitulo: 'Quais etapas a sua salina tem?',
    ctaTexto:
      'Conte do cristalizador à embalagem, e quem trabalha com o pé em salmoura. A gente separa a lista por etapa, porque a colheita e a moagem não pedem a mesma coisa.',
    perguntas: [
      {
        pergunta: 'Óculos escuro comum serve para trabalhar na salina?',
        resposta:
          'Não. Lente escura sem filtro para radiação ultravioleta faz a pupila abrir e pode deixar entrar mais radiação do que sem óculos. Na salina o óculos é equipamento de proteção, com CA, filtro ultravioleta e, de preferência, proteção lateral, porque o reflexo vem do chão.',
      },
      {
        pergunta: 'Por que a bota de couro dura pouco na salina?',
        resposta:
          'Porque a salmoura molha e resseca o couro todo dia, e o sal corrói as partes metálicas. Onde o pé fica em salmoura, a resposta é bota impermeável de cano alto; na área seca, lavar o calçado com água doce ao fim do turno prolonga a vida dele.',
      },
      {
        pergunta: 'Quem trabalha na moagem do sal precisa de respirador?',
        resposta:
          'Depende da avaliação de riscos da empresa. A poeira de sal da moagem, do refino e da embalagem irrita olhos e vias respiratórias, e onde a avaliação indica exposição, o respirador para partículas entra na lista, com Certificado de Aprovação e bem vedado no rosto.',
      },
    ],
  },
  {
    slug: 'epi-para-extracao-de-carnauba',
    titulo: 'EPI para extração de carnaúba: do corte à batição',
    tituloSeo: 'EPI para extração de carnaúba',
    resumo:
      'No corte da carnaúba o acidente típico vem de cima: a folha se solta da vara e cai como flecha, no rosto e no olho. É por onde a lista de EPI começa.',
    descricaoSeo:
      'A folha que cai como flecha, a vara de até 12 metros, o sol do carnaubal e a poeira da batição. O que organiza o EPI na safra da carnaúba.',
    publicado: '2026-09-28',
    atualizado: '2026-09-28',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'No corte da carnaúba o acidente típico vem de cima: a folha se solta da vara e cai como flecha — no braço, no rosto, no olho. É por onde a lista de EPI começa, e é justamente a parte que a safra costuma fazer sem equipamento nenhum.',
      },
      {
        tipo: 'p',
        texto:
          'Piauí e Ceará produzem praticamente todo o pó de carnaúba do Brasil. O Piauí lidera entre os estados, e os municípios que mais produzem estão no norte do Ceará — Granja, Camocim, Santana do Acaraú e Coreaú. É uma atividade de safra, no segundo semestre, com muita gente contratada por temporada. Este texto acompanha o caminho da palha: corte, transporte, secagem, batição e, na indústria, a cera.',
      },
      {
        tipo: 'h2',
        texto: 'O corte: rosto e olhos primeiro',
      },
      {
        tipo: 'p',
        texto:
          'A folha é cortada do chão, com uma foice presa na ponta de uma vara que pode passar de dez metros. Para cortar, o trabalhador puxa a foice na própria direção, e a folha se solta de cima, pontuda, rápida e mudando de rumo com o vento. Estudos com trabalhadores do setor registram ferimentos no rosto, nos braços e nos olhos, inclusive casos de cegueira.',
      },
      {
        tipo: 'p',
        texto:
          'Por isso a primeira linha da lista é proteção para os olhos e o rosto contra impacto, com Certificado de Aprovação — não óculos escuro de feira —, e proteção para a cabeça contra queda de objeto. As opções estão em <a href="/protecao/olhos-e-face/">proteção para olhos e face</a> e em <a href="/protecao/cabeca/">proteção da cabeça</a>. Manga longa protege o braço, que é onde a folha mais acerta quando não acerta o rosto.',
      },
      {
        tipo: 'p',
        texto:
          'O talo da folha tem espinho, e o manuseio da palha cortada fere a mão. Luva de manuseio resistente a corte e perfuração, e calçado fechado e firme para o terreno do carnaubal, que tem toco, espinho e chão irregular.',
      },
      {
        tipo: 'h2',
        texto: 'Transporte e secagem: peso e sol',
      },
      {
        tipo: 'p',
        texto:
          'A palha é juntada em feixes, carregada e espalhada ao sol para secar por dias, sendo revirada. É trabalho a céu aberto o dia inteiro, na época mais quente do ano: roupa de manga longa e proteção de cabeça que cubra a nuca entram na conversa, e pausa, água e sombra são medidas que nenhum equipamento substitui.',
      },
      {
        tipo: 'h2',
        texto: 'A batição: máquina, poeira e ruído',
      },
      {
        tipo: 'p',
        texto:
          'Seca, a palha vai para a batedeira, que bate as folhas e separa o pó. É a etapa que junta três riscos diferentes. Poeira fina no ar, que pede respirador para partículas conforme a avaliação — a sequência da escolha está em <a href="/conhecimento/respirador-como-escolher-o-filtro/">como escolher o filtro do respirador</a>. Ruído contínuo, que pede protetor auditivo conforme a medição. E a mão perto de parte móvel, em que o que protege é a proteção da própria máquina: luva não protege de ser puxada, e pode piorar.',
      },
      {
        tipo: 'h2',
        texto: 'Na indústria: a cera quente',
      },
      {
        tipo: 'p',
        texto:
          'Na indústria que transforma o pó em cera, o risco muda de natureza: cera derretida, superfície quente e respingo. Aqui a luva é de proteção contra calor de contato, que é uma característica própria que consta no CA, e onde há respingo entram avental e proteção facial. É outro ambiente, e a lista do campo não serve para ele.',
      },
      {
        tipo: 'h2',
        texto: 'A safra e quem fornece o EPI',
      },
      {
        tipo: 'p',
        texto:
          'Por ser trabalho de temporada, o EPI da carnaúba costuma ser adiado de uma safra para a outra. A regra, porém, não muda com a temporada: a NR-6 obriga o empregador a fornecer, gratuitamente, o EPI adequado ao risco, e o trabalho no campo tem ainda norma própria de segurança e saúde, a NR-31. Quem contrata a safra é quem compra.',
      },
      {
        tipo: 'p',
        texto:
          'Na prática, o que funciona é montar a lista por etapa antes do início da safra, com a quantidade de cada item pela equipe prevista para o corte, para o transporte e para a batição. É a mesma lógica de outras atividades do campo, como a <a href="/conhecimento/epi-para-aplicacao-de-defensivo-agricola/">aplicação de defensivo</a>: a lista sai da tarefa, e não do cargo.',
      },
      {
        tipo: 'h2',
        texto: 'O que costuma faltar no pedido',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Proteção de olhos e rosto para o foiceiro</strong>, que é quem mais se machuca e quem menos recebe.',
          '<strong>Proteção de cabeça no corte</strong>, porque a folha cai de cima.',
          '<strong>Luva para a palha com espinho</strong>, separada da luva de quem opera a batedeira.',
          '<strong>Respirador e protetor auditivo na batição</strong>, que costuma ficar fora da lista por ser uma etapa curta.',
          '<strong>Quantidade pela equipe da safra</strong>, e não pela equipe fixa do resto do ano.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'Quantas pessoas trabalham em cada etapa: corte, transporte, secagem, batição.',
          'Se a batição é feita no carnaubal ou em outro lugar, e com que máquina.',
          'A medição de ruído e a avaliação de poeira da batição, se houver.',
          'Se a empresa também beneficia o pó e trabalha com cera quente.',
          'O CA de cada item, lembrando que proteção dos olhos, da cabeça, respiratória e auditiva são aprovações separadas.',
        ],
      },
    ],
    fontes: [
      {
        titulo: 'Piauí é o maior produtor de pó de carnaúba do país (dados da PEVS/IBGE) — Conecta Piauí',
        url: 'https://conectapiaui.com.br/blog/em-pauta/piaui-e-o-maior-produtor-de-po-de-carnauba-do-pais-confirma-ibge-33044.html',
      },
      {
        titulo: 'Processos produtivos de trabalhadores rurais no extrativismo da palha de carnaúba — Interações (SciELO)',
        url: 'https://www.scielo.br/j/inter/a/mBZJJ7Q6wbPhbXgFNppmyzF/?lang=pt',
      },
      {
        titulo: 'Riscos à saúde de trabalhadores rurais no extrativismo da palha de carnaúba — Enfermagem em Foco',
        url: 'https://enfermfoco.org/en/article/risk-to-health-of-rural-workers-in-the-extrativism-of-the-straw-of-carnauba/',
      },
      {
        titulo: 'Norma Regulamentadora nº 31 (NR-31) — Ministério do Trabalho e Emprego',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-31-nr-31',
      },
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto oficial, PDF)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
    ],
    paginaComercial: {
      href: '/epi-por-cidade/piaui/',
      rotulo: 'Ver o atendimento no Piauí',
    },
    contexto: 'epi-por-cidade',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Trabalho com extração de carnaúba e queria ajuda para montar a lista de EPI da safra, do corte à batição.',
    ctaTitulo: 'Quantas pessoas trabalham em cada etapa da safra?',
    ctaTexto:
      'Conte quantos estão no corte, no transporte e na batição. A gente monta a lista por etapa, porque o foiceiro e quem opera a batedeira não precisam da mesma coisa.',
    perguntas: [
      {
        pergunta: 'Óculos comum protege no corte da palha de carnaúba?',
        resposta:
          'Não. O risco no corte é de impacto: a folha cai de cima, pontuda e rápida. O que protege é equipamento de proteção para olhos e rosto contra impacto, com Certificado de Aprovação. Óculos escuro comum não foi feito para isso.',
      },
      {
        pergunta: 'Precisa de proteção de cabeça para cortar carnaúba?',
        resposta:
          'O corte é feito de baixo, com a folha caindo sobre quem corta, e por isso a proteção contra queda de objeto sobre a cabeça faz parte da conversa. Quem define os itens é a avaliação de riscos de quem contrata a safra.',
      },
      {
        pergunta: 'Quem deve fornecer o EPI na safra da carnaúba?',
        resposta:
          'O empregador, gratuitamente. A NR-6 não muda por ser trabalho de temporada, e o trabalho no campo tem ainda norma própria, a NR-31. Na safra, quem contrata o trabalho é quem fornece o equipamento adequado a cada etapa.',
      },
    ],
  },
  {
    slug: 'epi-para-marmoraria-e-rochas-ornamentais',
    titulo: 'EPI para marmoraria: granito, sílica e corte úmido',
    tituloSeo: 'EPI para marmoraria e rochas ornamentais',
    resumo:
      'Granito tem sílica, e o acabamento é onde a poeira mais sobe. Numa marmoraria, o risco mais sério não é o disco: é o pó que ele levanta.',
    descricaoSeo:
      'Granito tem sílica, e o acabamento é onde a poeira mais sobe. O que organiza o EPI de uma marmoraria: corte úmido, respirador, ruído, água e chapa pesada.',
    publicado: '2026-09-29',
    atualizado: '2026-09-29',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Numa marmoraria o risco mais sério não é o disco que corta a pedra. É o pó que ele levanta. Granito e quartzito são ricos em sílica, e é no acabamento — lixar, polir, fazer borda — que essa poeira mais sobe.',
      },
      {
        tipo: 'p',
        texto:
          'O Ceará é um dos grandes exportadores de rochas ornamentais do país. A extração se concentra no noroeste do estado, em Sobral, Massapê e Santa Quitéria, terra do granito branco, e também em Caucaia, na Região Metropolitana. Na ponta da cadeia estão as marmorarias de Fortaleza e da região, que cortam e dão acabamento em bancada, piso e soleira. É delas que este texto trata.',
      },
      {
        tipo: 'h2',
        texto: 'Por que o granito preocupa mais',
      },
      {
        tipo: 'p',
        texto:
          'Granito e quartzito têm muito quartzo, que é sílica cristalina. Cortada e lixada, a pedra solta uma poeira fina o bastante para chegar ao fundo do pulmão, e a exposição repetida está ligada à silicose, doença pulmonar sem cura, e ao câncer de pulmão. Estudos com marmorarias mostram que quem faz acabamento a seco é o mais exposto da oficina.',
      },
      {
        tipo: 'h2',
        texto: 'Corte úmido é regra, não opção',
      },
      {
        tipo: 'p',
        texto:
          'Desde 2008, o anexo da norma de atividades insalubres que trata de poeiras minerais exige que as máquinas e ferramentas de corte e acabamento de rochas ornamentais tenham sistema de umidificação, capaz de reduzir ou eliminar a poeira. Na prática, o acabamento a seco deixou de ser permitido. É a medida que mais protege, e vem antes de qualquer respirador.',
      },
      {
        tipo: 'p',
        texto:
          'A água reduz a poeira, mas não resolve tudo sozinha. Onde a avaliação de riscos da empresa ainda indicar exposição, entra o respirador para partículas, com Certificado de Aprovação e bem vedado no rosto. A sequência da escolha está em <a href="/conhecimento/respirador-como-escolher-o-filtro/">como escolher o filtro do respirador</a>.',
      },
      {
        tipo: 'h2',
        texto: 'O que muda quando a oficina fica molhada',
      },
      {
        tipo: 'p',
        texto:
          'Corte úmido troca a poeira pela lama. O chão fica molhado e liso o dia inteiro, e a lama de pedra respinga no corpo. Calçado impermeável e antiderrapante, com biqueira, porque a chapa cai; e avental impermeável para quem opera a máquina. As opções de calçado estão em <a href="/calcados/seguranca/">calçados de segurança</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Água e ferramenta elétrica juntas pedem cuidado que não é de EPI: equipamento feito para uso úmido e instalação elétrica adequada. Isso é da empresa, e nenhuma luva substitui.',
      },
      {
        tipo: 'h2',
        texto: 'Disco, ruído e fragmento',
      },
      {
        tipo: 'p',
        texto:
          'Serra, disco e lixadeira fazem ruído alto e lançam fragmento. Protetor auditivo conforme a medição feita pela empresa — a escolha entre os tipos está em <a href="/conhecimento/protetor-auditivo-plug-ou-concha/">plug ou concha</a> — e proteção para os olhos e o rosto contra partículas, que no acabamento com disco costuma ser protetor facial sobre o óculos. As opções estão em <a href="/protecao/olhos-e-face/">proteção para olhos e face</a>.',
      },
      {
        tipo: 'h2',
        texto: 'A chapa pesada',
      },
      {
        tipo: 'p',
        texto:
          'Chapa de granito é pesada, frágil e tem borda cortante. A movimentação e a armazenagem de chapas têm regra própria, num anexo da norma de movimentação de materiais, que trata de cavalete, apoio e equipamento de içamento. O EPI completa essas medidas e não as substitui: calçado com biqueira e luva resistente a corte para quem pega a peça pela borda.',
      },
      {
        tipo: 'h2',
        texto: 'O que costuma faltar no pedido',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Respirador para o acabamento</strong>, mesmo com corte úmido, onde a avaliação ainda indica poeira.',
          '<strong>Calçado impermeável com biqueira</strong>, e não o calçado de couro comum, que encharca na lama.',
          '<strong>Avental impermeável</strong> para quem opera a serra e a lixadeira com água.',
          '<strong>Protetor facial no acabamento com disco</strong>, além do óculos.',
          '<strong>Luva resistente a corte para quem movimenta chapa</strong>, separada da luva de quem opera a máquina.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'Se todas as máquinas de corte e acabamento têm umidificação funcionando.',
          'Quais pedras a oficina mais trabalha — granito e quartzito pedem mais atenção à poeira.',
          'A medição de ruído e, se houver, a avaliação de poeira da empresa.',
          'Como as chapas são movimentadas e armazenadas.',
          'O CA de cada item, lembrando que proteção respiratória, auditiva e dos olhos são aprovações separadas.',
        ],
      },
      {
        tipo: 'p',
        texto:
          'Marmoraria costuma ser negócio pequeno, com o dono na bancada. Vale montar a lista por posto — corte, acabamento, movimentação — uma vez, escrita, e repor a partir dela. A mesma poeira mineral aparece em outro setor forte da região, a <a href="/conhecimento/epi-para-ceramica-vermelha-e-olaria/">cerâmica vermelha</a>, com outros pontos de exposição.',
      },
    ],
    fontes: [
      {
        titulo: 'NR-15 — Anexo nº 12: limites de tolerância para poeiras minerais (texto oficial, PDF)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-15-anexo-12.pdf',
      },
      {
        titulo: 'Sílica e silicose: legislação — Fundacentro',
        url: 'https://www.gov.br/fundacentro/pt-br/acesso-a-informacao/acoes-e-programas/projetos-encerrados/silica-e-silicose/legislacao',
      },
      {
        titulo: 'Artigo aponta riscos do beneficiamento de mármores e granitos — Fundacentro (2025)',
        url: 'https://www.gov.br/fundacentro/pt-br/comunicacao/noticias/noticias/2025/junho/artigo-aponta-riscos-do-beneficiamento-de-marmores-e-granitos',
      },
      {
        titulo: 'Norma Regulamentadora nº 11 (NR-11) — Ministério do Trabalho e Emprego',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-11-nr-11',
      },
      {
        titulo: 'Exportações de rochas ornamentais do Ceará mais que dobram até maio de 2025 — Sistema FIEC',
        url: 'https://www1.sfiec.org.br/fiec-noticias/search/166820/exportacoes-de-rochas-ornamentais-do-ceara-mais-que-dobram-ate-maio-de-2025-e-consolidam-setor-na-pauta-externa-do-estado',
      },
    ],
    paginaComercial: {
      href: '/epi-por-cidade/ceara/',
      rotulo: 'Ver o atendimento no Ceará',
    },
    contexto: 'epi-por-cidade',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Tenho uma marmoraria e queria ajuda para montar a lista de EPI por posto: corte, acabamento e movimentação de chapa.',
    ctaTitulo: 'Quais postos a sua marmoraria tem?',
    ctaTexto:
      'Conte quem corta, quem faz acabamento e quem movimenta chapa, e quais pedras vocês mais trabalham. A gente separa a lista por posto.',
    perguntas: [
      {
        pergunta: 'Corte a seco de granito é permitido?',
        resposta:
          'Não. Desde 2008, o Anexo 12 da NR-15 exige que as máquinas e ferramentas de corte e acabamento de rochas ornamentais tenham sistema de umidificação, para reduzir ou eliminar a poeira. O acabamento a seco deixou de ser permitido.',
      },
      {
        pergunta: 'Mármore tem o mesmo risco de sílica que o granito?',
        resposta:
          'Costuma ter menos. O risco maior está nas pedras ricas em quartzo, como granito e quartzito, que são as mais trabalhadas nas marmorarias. Mas a oficina corta as duas coisas, e a proteção é pensada para a pedra de maior risco.',
      },
      {
        pergunta: 'Qual calçado usar numa marmoraria?',
        resposta:
          'Impermeável, antiderrapante e com biqueira. O corte úmido deixa o chão molhado e com lama de pedra o dia inteiro, e a chapa que cai no pé é risco real na movimentação. Calçado de couro comum encharca e não protege do impacto.',
      },
    ],
  },
  {
    slug: 'epi-para-carcinicultura-e-despesca-de-camarao',
    titulo: 'EPI para carcinicultura: o metabissulfito na despesca',
    tituloSeo: 'EPI para carcinicultura e despesca de camarão',
    resumo:
      'Numa fazenda de camarão o risco mais grave não está no viveiro. Está no saco de metabissulfito da despesca, que solta gás tóxico em contato com água e gelo.',
    descricaoSeo:
      'O metabissulfito da despesca solta gás tóxico em contato com água e gelo. O que organiza o EPI de uma fazenda de camarão, do viveiro ao gelo.',
    publicado: '2026-09-29',
    atualizado: '2026-09-29',
    atualizadoExibicao: 'setembro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Numa fazenda de camarão o risco mais grave não está no viveiro. Está no saco de metabissulfito usado na despesca: em contato com água, gelo ou ácido, ele solta dióxido de enxofre, um gás corrosivo que pode matar quem o respira em lugar fechado.',
      },
      {
        tipo: 'p',
        texto:
          'O Ceará produz mais da metade do camarão cultivado no Brasil, e oito dos dez municípios que mais produzem estão no estado — Aracati e Jaguaruana à frente. O Rio Grande do Norte vem logo depois, com Pendências entre os maiores. São milhares de fazendas, muitas pequenas, em que a compra de EPI costuma cair no dono. Este texto acompanha a fazenda do viveiro ao gelo.',
      },
      {
        tipo: 'h2',
        texto: 'Metabissulfito: o gás que sai do gelo',
      },
      {
        tipo: 'p',
        texto:
          'O metabissulfito de sódio é usado logo depois da despesca para impedir que o camarão escureça. O perigo não é o pó em si: é o gás que ele libera quando encontra água, gelo ou ácido. O dióxido de enxofre irrita olhos e vias respiratórias, é corrosivo e, em concentração alta, pode causar asfixia. Há mortes registradas no manuseio em ambiente fechado, e quem tem asma é ainda mais sensível.',
      },
      {
        tipo: 'p',
        texto:
          'Por isso a primeira medida não é equipamento: é onde e como a solução é preparada. Ao ar livre ou em local bem ventilado, nunca em caixa fechada, porão ou câmara, e sempre na quantidade e no modo indicados na ficha de segurança do produto. Quem manuseia precisa saber reconhecer o cheiro e sair do lugar na hora.',
      },
      {
        tipo: 'p',
        texto:
          'Feito isso, o EPI do manuseio tem três partes. Proteção respiratória com filtro para gases — o filtro para partículas, da máscara de pó, não retém gás nenhum, como explica <a href="/conhecimento/mascara-descartavel-nao-protege-de-vapor-quimico/">por que a máscara descartável não protege de vapor</a>; a classe do filtro sai da ficha de segurança e da avaliação de riscos. Proteção para os olhos contra respingo e gás, que as opções em <a href="/protecao/olhos-e-face/">proteção para olhos e face</a> ajudam a escolher. E luva e avental impermeáveis, de material compatível com o produto, pelo mesmo raciocínio de <a href="/conhecimento/luva-para-produto-quimico-como-escolher/">qualquer luva para produto químico</a>.',
      },
      {
        tipo: 'h2',
        texto: 'O viveiro: água, lama e sol',
      },
      {
        tipo: 'p',
        texto:
          'Despesca, manejo e limpeza de viveiro são feitos com o corpo dentro da água e da lama. Onde é assim, a resposta é bota impermeável de cano alto, ou vestimenta impermeável até o peito quando a água passa do joelho. O critério está em <a href="/conhecimento/bota-de-pvc-quando-e-a-resposta-certa/">quando a bota de PVC é a resposta certa</a>.',
      },
      {
        tipo: 'p',
        texto:
          'O resto do dia é a céu aberto, no sol do litoral. Roupa de manga longa e proteção de cabeça que cubra a nuca entram na conversa, e pausa, água e sombra são medidas que nenhum equipamento substitui.',
      },
      {
        tipo: 'h2',
        texto: 'Cal e insumos do viveiro',
      },
      {
        tipo: 'p',
        texto:
          'A preparação do viveiro usa cal e outros corretivos, e alguns deles são cáusticos para a pele e para os olhos. Quem espalha o produto precisa de luva, óculos e, conforme a ficha de segurança, proteção respiratória para a poeira. Saco de ração e de insumo também pesa, e a carga manual repetida é o que mais aparece como queixa no fim da safra.',
      },
      {
        tipo: 'h2',
        texto: 'Gelo, caixa e beneficiamento',
      },
      {
        tipo: 'p',
        texto:
          'Depois da despesca vêm o gelo e as caixas: mão no frio o tempo todo, peso e piso molhado. Luva para frio, calçado impermeável e antiderrapante. Quando a fazenda tem unidade de beneficiamento, o ambiente passa a ser o de uma indústria de pescado, com frio, faca e piso molhado, e o critério está em <a href="/conhecimento/epi-para-frigorifico-e-camara-fria/">EPI para frigorífico e câmara fria</a>.',
      },
      {
        tipo: 'h2',
        texto: 'O que costuma faltar no pedido',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Respirador com filtro para gases no manuseio do metabissulfito</strong>, no lugar da máscara de pó.',
          '<strong>Proteção para os olhos contra respingo</strong> para quem prepara a solução.',
          '<strong>Luva e avental impermeáveis</strong> para o metabissulfito e para a cal, separados da luva de manuseio da caixa.',
          '<strong>Bota de cano alto ou vestimenta impermeável</strong> para quem entra no viveiro.',
          '<strong>Luva para frio</strong> para quem trabalha no gelo depois da despesca.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'Onde a solução de metabissulfito é preparada, e se o local é aberto e ventilado.',
          'A ficha de segurança do metabissulfito e da cal usados na fazenda.',
          'Quem entra no viveiro, e até que altura a água chega.',
          'Se a fazenda tem unidade de beneficiamento, com câmara fria.',
          'O CA de cada item, lembrando que proteção respiratória, dos olhos e química são aprovações separadas.',
        ],
      },
    ],
    fontes: [
      {
        titulo: 'Ceará produz 6 em cada 10 camarões consumidos pelos brasileiros; veja os maiores produtores — Diário do Nordeste',
        url: 'https://diariodonordeste.verdesmares.com.br/negocios/ceara-produz-6-em-cada-10-camaroes-consumidos-pelos-brasileiros-veja-os-maiores-produtores-1.3563824',
      },
      {
        titulo: 'Camarão brasileiro: um tesouro nacional — Ministério da Pesca e Aquicultura',
        url: 'https://www.gov.br/mpa/pt-br/assuntos/noticias/camarao-brasileiro-um-tesouro-nacional',
      },
      {
        titulo: 'O metabissulfito de sódio e o seu uso na carcinicultura — Revista Panorama da Aquicultura',
        url: 'https://panoramadaaquicultura.com.br/o-metabissulfito-de-sodio-e-o-seu-uso-na-carcinicultura/',
      },
      {
        titulo: 'Uso do metabissulfito de sódio — Acta Scientiarum, Universidade Estadual de Maringá',
        url: 'https://periodicos.uem.br/ojs/index.php/ActaSciBiolSci/article/download/1039/513/',
      },
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto oficial, PDF)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
    ],
    paginaComercial: {
      href: '/epi-por-cidade/ceara/',
      rotulo: 'Ver o atendimento no Ceará',
    },
    contexto: 'epi-por-cidade',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Trabalho numa fazenda de camarão e queria ajuda para montar a lista de EPI, principalmente para o manuseio do metabissulfito na despesca.',
    ctaTitulo: 'Onde a sua fazenda prepara o metabissulfito?',
    ctaTexto:
      'Conte como é a despesca e quem manuseia o produto. A gente começa a lista pelo metabissulfito, que é onde o risco é maior, e depois passa para o viveiro e o gelo.',
    perguntas: [
      {
        pergunta: 'Por que o metabissulfito da despesca é perigoso?',
        resposta:
          'Porque, em contato com água, gelo ou ácido, ele libera dióxido de enxofre, um gás corrosivo que irrita olhos e vias respiratórias e pode causar asfixia em concentração alta. O risco maior é o manuseio em lugar fechado, sem ventilação.',
      },
      {
        pergunta: 'Máscara de pó protege do gás da despesca?',
        resposta:
          'Não. O filtro para partículas retém poeira, e não gás. Para o dióxido de enxofre, o respirador precisa de filtro para gases, e a classe sai da ficha de segurança do produto e da avaliação de riscos da empresa.',
      },
      {
        pergunta: 'Onde preparar a solução de metabissulfito?',
        resposta:
          'Ao ar livre ou em local bem ventilado, nunca em caixa fechada, porão ou câmara, e na quantidade e no modo indicados na ficha de segurança do produto. É a medida que mais protege, e vem antes do equipamento.',
      },
    ],
  },
  {
    slug: 'epi-para-packing-house-de-frutas',
    titulo: 'EPI para packing house de frutas: o que é EPI e o que é higiene',
    tituloSeo: 'EPI para packing house de frutas',
    resumo:
      'Num packing house, touca e luva descartável protegem a fruta. Quem trabalha precisa de outra lista, e é ela que costuma faltar no pedido.',
    descricaoSeo:
      'Touca e luva descartável protegem a fruta, não quem trabalha. O que é EPI num packing house de frutas: piso molhado, cloro, esteira, câmara fria e corte.',
    publicado: '2026-10-03',
    atualizado: '2026-10-03',
    atualizadoExibicao: 'outubro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'Num packing house existem duas listas, e a compra costuma juntá-las. Touca, rede de cabelo, máscara higiênica e luva descartável protegem a fruta. Bota impermeável, luva química, protetor auditivo e roupa para frio protegem quem trabalha. Só a segunda é EPI.',
      },
      {
        tipo: 'p',
        texto:
          'O polo de Mossoró, Baraúna e Chapada do Apodi é o maior produtor de melão do país, e o Rio Grande do Norte é o principal exportador da fruta. É fruta que passa por packing house antes de seguir para o porto: recepção, lavagem, seleção, embalagem, câmara fria e contêiner. Este texto acompanha esse caminho, posto a posto.',
      },
      {
        tipo: 'h2',
        texto: 'Higiene e EPI: o que cada lista protege',
      },
      {
        tipo: 'p',
        texto:
          'Os itens de higiene existem pelas boas práticas de fabricação e pelas exigências de quem compra a fruta: evitam que cabelo, suor e contaminação cheguem ao produto. O EPI existe pelo risco do posto: piso, produto químico, máquina, frio. Um não substitui o outro, e a luva descartável fina da seleção, por exemplo, não protege ninguém do produto clorado da lavagem.',
      },
      {
        tipo: 'p',
        texto:
          'Alguns itens podem ser as duas coisas ao mesmo tempo. A bota branca impermeável atende a higiene e, se tiver Certificado de Aprovação, também é EPI. O que decide é o CA, e não a cor ou o lugar onde ela é usada.',
      },
      {
        tipo: 'h2',
        texto: 'Recepção e lavagem: água e produto clorado',
      },
      {
        tipo: 'p',
        texto:
          'A fruta é lavada e sanitizada, quase sempre com solução clorada, e o piso fica molhado o turno inteiro. O cloro concentrado é corrosivo: irrita a pele, os olhos e as vias respiratórias. Quem prepara a solução precisa de luva impermeável de material compatível, óculos contra respingo e avental, e a necessidade de proteção respiratória sai da ficha de segurança do produto. O raciocínio da luva está em <a href="/conhecimento/luva-para-produto-quimico-como-escolher/">como escolher luva para produto químico</a>.',
      },
      {
        tipo: 'p',
        texto:
          'No piso da lavagem, bota impermeável e antiderrapante. O critério de quando ela precisa ser de cano alto está em <a href="/conhecimento/bota-de-pvc-quando-e-a-resposta-certa/">quando a bota de PVC é a resposta certa</a>.',
      },
      {
        tipo: 'h2',
        texto: 'Seleção e embalagem: esteira, corte e repetição',
      },
      {
        tipo: 'p',
        texto:
          'Na esteira, o risco é de máquina: parte móvel puxa luva, manga e cabelo. O que protege é a proteção da própria máquina, e não o EPI, e é por isso que luva folgada e manga solta perto da esteira são problema. Onde há corte de pedúnculo ou de refugo com faca, a luva que resiste a corte entra na mão que segura a fruta.',
      },
      {
        tipo: 'p',
        texto:
          'O ruído do galpão soma esteira, ventilação e máquina de embalagem. Protetor auditivo conforme a medição feita pela empresa, e a escolha entre os tipos está em <a href="/conhecimento/protetor-auditivo-plug-ou-concha/">plug ou concha</a>. O resto do posto é repetição e peso de caixa, que se resolve com organização do trabalho e pausa, mais do que com equipamento.',
      },
      {
        tipo: 'h2',
        texto: 'Câmara fria e expedição',
      },
      {
        tipo: 'p',
        texto:
          'Depois de embalada, a fruta vai para o resfriamento e para a câmara fria. Quem entra e sai dela o turno inteiro alterna calor e frio, e o risco cresce com o tempo de exposição: roupa e luva para frio, e calçado com isolamento. O critério completo está em <a href="/conhecimento/epi-para-frigorifico-e-camara-fria/">EPI para frigorífico e câmara fria</a>.',
      },
      {
        tipo: 'p',
        texto:
          'Na paletização e na expedição circulam empilhadeira e palete pesado. Ali o calçado precisa de biqueira, porque palete e caixa caem, e quem anda a pé precisa ser visto por quem dirige.',
      },
      {
        tipo: 'h2',
        texto: 'A safra muda o tamanho da equipe',
      },
      {
        tipo: 'p',
        texto:
          'Packing house trabalha por safra, com equipe que cresce muito em poucas semanas. Por isso a lista que funciona é por posto, e não por pessoa: quantos na lavagem, quantos na seleção, quantos na câmara. Quando a equipe muda, a quantidade muda, e a lista continua certa. A numeração das botas sai mais rápido com a <a href="/ferramentas/grade-de-numeracao/">calculadora de grade da equipe</a>.',
      },
      {
        tipo: 'h2',
        texto: 'O que costuma faltar no pedido',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Luva química para quem prepara a solução clorada</strong>, separada da luva descartável da seleção.',
          '<strong>Óculos contra respingo</strong> na lavagem e no preparo de produto.',
          '<strong>Protetor auditivo</strong> para o galpão, que costuma ficar fora da lista por ser ruído contínuo e não alto.',
          '<strong>Roupa e luva para frio</strong> para quem entra na câmara, e não só para quem trabalha dentro dela.',
          '<strong>Calçado com biqueira na expedição</strong>, onde circula palete, e não a mesma bota da lavagem.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'Quais postos o packing house tem: recepção, lavagem, seleção, embalagem, câmara, expedição.',
          'Qual produto é usado na sanitização, e a ficha de segurança dele.',
          'A medição de ruído do galpão.',
          'Quem entra na câmara fria, e por quanto tempo.',
          'Quantas pessoas cada posto terá no pico da safra.',
          'O CA de cada item — e quais itens são só de higiene, para não contá-los como EPI.',
        ],
      },
    ],
    fontes: [
      {
        titulo: 'Sistema produtivo e inovativo local: o APL da fruticultura de melão de Mossoró/Baraúna — RedeSist, UFRJ',
        url: 'https://www.redesist.ie.ufrj.br/lalics/papers/22_Sistema_Produtivo_e_Inovativo_Local__O_APL_da_Fruticultura_de_Melao_de_MossoroBarauna.pdf',
      },
      {
        titulo: 'Manual de segurança e qualidade para a cultura do melão — Embrapa',
        url: 'https://www.infoteca.cnptia.embrapa.br/bitstream/doc/111894/1/MANUALSEGURANCAQUALIDADEParaaculturadomelao.pdf',
      },
      {
        titulo: 'Trabalhadores da câmara fria — Prefeitura de Belo Horizonte, Saúde do Trabalhador',
        url: 'https://prefeitura.pbh.gov.br/sites/default/files/estrutura-de-governo/saude/2023/trabalhadores-da-camara-fria-volume-1-4-12-23.pdf',
      },
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto oficial, PDF)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
    ],
    paginaComercial: {
      href: '/epi-por-cidade/assu-rn/',
      rotulo: 'Ver o atendimento no Vale do Açu',
    },
    contexto: 'cidade-assu',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Trabalho num packing house de frutas e queria ajuda para montar a lista de EPI por posto, da lavagem à câmara fria.',
    ctaTitulo: 'Quantos postos o seu packing house tem na safra?',
    ctaTexto:
      'Conte da recepção à expedição, e qual produto vocês usam na lavagem. A gente separa o que é EPI do que é higiene e monta a lista por posto.',
    perguntas: [
      {
        pergunta: 'Quais EPIs são usados num packing house de frutas?',
        resposta:
          'Depende do posto. Na lavagem, bota impermeável, luva química e óculos contra respingo; na seleção, protetor auditivo conforme a medição e luva contra corte onde há faca; na câmara fria, roupa e luva para frio; na expedição, calçado com biqueira. Touca e luva descartável são de higiene, não EPI.',
      },
      {
        pergunta: 'A luva descartável da seleção protege contra o cloro?',
        resposta:
          'Não. A luva descartável fina existe para proteger a fruta. Quem prepara ou manuseia a solução clorada precisa de luva impermeável de material compatível com o produto, confirmada na tabela do fabricante, além de óculos contra respingo.',
      },
      {
        pergunta: 'Quem só entra e sai da câmara fria precisa de roupa térmica?',
        resposta:
          'Precisa ser avaliado, porque o risco depende do tempo de exposição, e quem entra e sai o turno inteiro acumula frio. É comum a lista proteger só quem trabalha dentro da câmara e esquecer quem abastece e retira palete.',
      },
    ],
  },
  {
    slug: 'epi-para-fabrica-de-cimento-e-mineracao-de-calcario',
    titulo: 'EPI para fábrica de cimento e mineração de calcário',
    tituloSeo: 'EPI para fábrica de cimento e calcário',
    resumo:
      'Pedreira e fábrica de cimento são dois ambientes, e a compra costuma tratá-los como um. Na pedreira mandam fragmento e máquina; na fábrica, calor, ruído e o cimento que ataca a pele.',
    descricaoSeo:
      'Na pedreira de calcário e na fábrica de cimento: poeira, ruído de moinho, calor de forno e o cimento alcalino que ataca a pele. O que organiza o EPI.',
    publicado: '2026-10-03',
    atualizado: '2026-10-03',
    atualizadoExibicao: 'outubro de 2026',
    cluster: 'Proteção',
    blocos: [
      {
        tipo: 'destaque',
        texto:
          'A pedreira de calcário e a fábrica de cimento são dois ambientes, e a compra de EPI costuma tratá-los como um. Na pedreira mandam o fragmento de rocha, a máquina pesada e a poeira. Na fábrica, o calor do forno, o ruído do moinho e o próprio cimento, que é alcalino e ataca a pele.',
      },
      {
        tipo: 'p',
        texto:
          'O calcário é o maior potencial mineral do Ceará, com reservas na região de Sobral e Coreaú, no noroeste do estado, e na Chapada do Apodi. É dele que sai o cimento, e também a cal das caieiras do norte do estado. Este texto separa as duas pontas: a lavra, a céu aberto, e a fábrica.',
      },
      {
        tipo: 'h2',
        texto: 'A pedreira: mineração a céu aberto',
      },
      {
        tipo: 'p',
        texto:
          'A extração de calcário é mineração, e a mineração tem norma de segurança própria, a NR-22, que cobre a lavra a céu aberto e o beneficiamento mineral. No dia a dia, os riscos da pedreira são fragmento lançado no desmonte e na britagem, tráfego de máquina pesada, ruído e poeira.',
      },
      {
        tipo: 'p',
        texto:
          'Isso dá a base da lista: proteção da cabeça contra impacto, as opções em <a href="/protecao/cabeca/">proteção da cabeça</a>; proteção para olhos e rosto contra fragmento, em <a href="/protecao/olhos-e-face/">proteção para olhos e face</a>; calçado com biqueira, porque pedra cai; e roupa de alta visibilidade onde gente a pé divide espaço com máquina, conforme a avaliação de riscos.',
      },
      {
        tipo: 'h2',
        texto: 'Poeira: calcário, cimento e onde entra a sílica',
      },
      {
        tipo: 'p',
        texto:
          'O calcário é principalmente carbonato de cálcio. A sílica, que é o que causa silicose, depende das impurezas da rocha e das outras matérias-primas da mistura, e por isso varia de uma operação para outra — não é correto tratar toda poeira de cimento como poeira de sílica, nem o contrário. Já a poeira de cimento é alcalina e irrita olhos e vias respiratórias por si só.',
      },
      {
        tipo: 'p',
        texto:
          'Na britagem, na moagem e no ensacamento, o controle começa por enclausurar, umidificar e exaurir a poeira. Onde a avaliação ainda indicar exposição, entra o respirador para partículas, com Certificado de Aprovação e bem vedado no rosto. A classe do filtro sai dessa avaliação, e não de uma lista genérica; a sequência da escolha está em <a href="/conhecimento/respirador-como-escolher-o-filtro/">como escolher o filtro do respirador</a>.',
      },
      {
        tipo: 'h2',
        texto: 'O cimento ataca a pele',
      },
      {
        tipo: 'p',
        texto:
          'Este é o risco que quase ninguém explica. O cimento é alcalino, abrasivo e absorve água: em contato com o suor ou molhado, ele irrita e queima a pele. A dermatite de contato nas mãos e nos pés é a doença de pele mais conhecida de quem trabalha com cimento, e o cimento que entra na bota, somado ao atrito, pode causar feridas profundas. Nos olhos, o respingo de cimento molhado causa queimadura química.',
      },
      {
        tipo: 'p',
        texto:
          'Por isso a luva não pode ser de pano nem de couro que encharca: ela precisa ser impermeável e resistente ao material alcalino, e o raciocínio está em <a href="/conhecimento/tipos-de-luva-qual-material-escolher/">qual material de luva escolher</a>. Manga longa, bota de cano alto com a calça por fora para o cimento não entrar, óculos onde há respingo. E pele lavada assim que houver contato, sem esperar o fim do turno.',
      },
      {
        tipo: 'p',
        texto:
          'Na caieira, onde o calcário vira cal, vale o mesmo cuidado com mais força: a cal virgem reage com a água e com o suor, esquenta e é cáustica para a pele e para os olhos.',
      },
      {
        tipo: 'h2',
        texto: 'Forno e moinho: calor e ruído',
      },
      {
        tipo: 'p',
        texto:
          'Em volta do forno, calor radiante e superfície quente: vestimenta e luva com proteção contra calor, que é uma característica própria que consta no CA, e protetor facial onde há exposição direta. Nos moinhos e nos britadores, ruído alto e contínuo: protetor auditivo conforme a medição feita pela empresa, com a escolha entre os tipos em <a href="/conhecimento/protetor-auditivo-plug-ou-concha/">plug ou concha</a>.',
      },
      {
        tipo: 'h2',
        texto: 'Ensacamento e expedição',
      },
      {
        tipo: 'p',
        texto:
          'No ensacamento se juntam poeira, saco pesado e repetição, e na expedição circulam empilhadeira e caminhão. Respirador conforme a avaliação, luva impermeável para o pó de cimento, e calçado de segurança com biqueira. As opções estão em <a href="/calcados/seguranca/">calçados de segurança</a>.',
      },
      {
        tipo: 'h2',
        texto: 'Poeira de cimento dá insalubridade?',
      },
      {
        tipo: 'p',
        texto:
          'É uma das perguntas mais buscadas sobre o assunto, e a resposta honesta é que depende de avaliação técnica. A insalubridade é caracterizada conforme a NR-15, a partir das condições reais de exposição de cada posto, e não pela atividade em si nem por uma lista de EPI. O EPI adequado faz parte dessa avaliação, mas não a substitui.',
      },
      {
        tipo: 'h2',
        texto: 'O que costuma faltar no pedido',
      },
      {
        tipo: 'lista',
        itens: [
          '<strong>Luva impermeável para o cimento</strong>, no lugar da luva de pano ou de couro.',
          '<strong>Bota de cano alto bem fechada</strong> onde há cimento solto ou molhado, para ele não entrar no calçado.',
          '<strong>Óculos contra respingo</strong> no manuseio de cimento molhado e de cal.',
          '<strong>Proteção contra calor no forno</strong>, separada da luva de manuseio.',
          '<strong>Listas separadas para pedreira e fábrica</strong>, que viram uma só na hora da compra.',
        ],
      },
      {
        tipo: 'h2',
        texto: 'O que verificar antes de comprar',
      },
      {
        tipo: 'lista',
        itens: [
          'Quais operações a empresa tem: lavra, britagem, moagem, forno, ensacamento, expedição, caieira.',
          'A avaliação de poeira de cada setor, e se ela indica sílica.',
          'A medição de ruído dos britadores e moinhos.',
          'Onde há contato com cimento molhado ou com cal.',
          'Onde gente a pé divide espaço com máquina pesada.',
          'O CA de cada item, lembrando que proteção respiratória, auditiva, contra calor e química são aprovações separadas.',
        ],
      },
    ],
    fontes: [
      {
        titulo: 'Rochas e minerais industriais do estado do Ceará — CETEM',
        url: 'https://mineralis.cetem.gov.br/bitstream/cetem/495/1/livro-rochas-minerais-ceara.pdf',
      },
      {
        titulo: 'Panorama do setor mineral do estado do Ceará — ADECE',
        url: 'https://www.adece.ce.gov.br/wp-content/uploads/sites/98/2022/11/VF-Panorama-do-Setor-Mineral-do-Estado-do-Ceara-1.pdf',
      },
      {
        titulo: 'Dermatose profissional na construção civil causada pelo cimento — BVS',
        url: 'https://pesquisa.bvsalud.org/portal/resource/pt/lil-113866',
      },
      {
        titulo: 'Norma Regulamentadora nº 22 (NR-22) — Segurança e saúde ocupacional na mineração, MTE',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-22-nr-22',
      },
      {
        titulo: 'Norma Regulamentadora nº 15 (NR-15) — Atividades e operações insalubres, MTE',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-15-nr-15',
      },
      {
        titulo: 'NR-6 — Equipamento de Proteção Individual (texto oficial, PDF)',
        url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf',
      },
    ],
    paginaComercial: {
      href: '/epi-por-cidade/ceara/',
      rotulo: 'Ver o atendimento no Ceará',
    },
    contexto: 'epi-por-cidade',
    mensagemWhats:
      'Olá! Vim pelo site da Tower. Trabalho numa empresa de cimento ou de calcário e queria ajuda para montar a lista de EPI, separando a pedreira da fábrica.',
    ctaTitulo: 'A sua operação é pedreira, fábrica ou as duas?',
    ctaTexto:
      'Conte quais setores existem e onde há contato com cimento molhado ou cal. A gente separa a lista da lavra da lista da fábrica, porque os riscos não são os mesmos.',
    perguntas: [
      {
        pergunta: 'Poeira de cimento dá insalubridade?',
        resposta:
          'Depende de avaliação técnica. A insalubridade é caracterizada conforme a NR-15, a partir das condições reais de exposição de cada posto, e não pela atividade em si. O EPI adequado faz parte dessa avaliação, mas não a substitui.',
      },
      {
        pergunta: 'Qual luva usar para trabalhar com cimento?',
        resposta:
          'Luva impermeável e resistente a material alcalino. Luva de pano ou de couro encharca e segura o cimento contra a pele, o que piora a irritação. Vale também manga longa e bota de cano alto com a calça por fora, para o cimento não entrar.',
      },
      {
        pergunta: 'A pedreira de calcário segue qual norma de segurança?',
        resposta:
          'A extração de calcário é mineração, e a mineração tem norma própria, a NR-22, que cobre a lavra a céu aberto e o beneficiamento mineral. A fábrica de cimento é outro ambiente, de indústria, e a lista de EPI de cada um sai da sua avaliação de riscos.',
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
