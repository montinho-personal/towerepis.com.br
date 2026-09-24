import Link from 'next/link'
import { Trilha, CabecalhoPagina, Perguntas, AssinaturaTecnica, Secao } from '@/components/Blocos'
import { QualCalcado } from '@/components/QualCalcado'
import { JsonLd, schemaBreadcrumb, schemaFaq, schemaWebApplication } from '@/lib/schema'
import { metadados } from '@/lib/seo'

/**
 * Qual calçado profissional é ideal para você?
 *
 * A URL. Entre /qual-calcado-profissional-usar/ e /qual-botina-usar/, ficou
 * /qual-calcado-usar/: "calçado" é o termo que o site inteiro usa, cobre
 * sapato, botina e bota, e a consulta de maior intenção registrada na
 * pesquisa de setembro é "qual calçado de segurança usar". "Botina" no
 * caminho estreitaria para um formato e disputaria com o artigo que já
 * responde botina × bota × sapato.
 *
 * O TITLE fala a língua da busca ("calçado de segurança"), porque é assim
 * que a pessoa pergunta mesmo quando o que ela precisa é ocupacional — e é
 * exatamente essa confusão que a ferramenta desfaz. O H1 fala a língua da
 * intenção ("calçado profissional é ideal para você"), porque quem já
 * chegou não precisa da palavra-chave, precisa da promessa.
 *
 * O CONTEÚDO ABAIXO DA FERRAMENTA não repete os artigos: aponta para eles.
 * Cada bloco responde em duas frases e manda para o texto que é dono do
 * assunto. É o que impede esta página de canibalizar o que já ranqueia.
 */

const CAMINHO = '/ferramentas/qual-calcado-usar/'

const PERGUNTAS = [
  {
    pergunta: 'Este teste diz qual calçado eu sou obrigado a usar?',
    resposta:
      'Não. Ele diz que tipo de calçado merece ser avaliado pelas características que você informou. O calçado obrigatório sai da avaliação de riscos da empresa, do CA do modelo e da especificação do fabricante, e não de um teste no site.',
  },
  {
    pergunta: 'Preciso saber termos técnicos para responder?',
    resposta:
      'Não. As perguntas são sobre o seu dia: se algo pesado pode cair no pé, como é o piso, quantas horas em pé. Em toda pergunta de risco existe a opção “não sei”, e o resultado diz o que confirmar antes de comprar.',
  },
  {
    pergunta: 'O resultado mostra um modelo específico?',
    resposta:
      'Mostra a família de calçado e as características que vale procurar: biqueira, solado, cabedal, água e conforto. Modelo e CA saem na conversa, porque dependem do risco real da atividade e do que há disponível no momento.',
  },
  {
    pergunta: 'Por que não pede meu nome ou telefone?',
    resposta:
      'Porque o resultado é gratuito e não precisa disso. O contato é a etapa seguinte, se você quiser: o botão abre o WhatsApp com o seu perfil já escrito, e você decide se envia.',
  },
  {
    pergunta: 'Posso usar o teste para uma equipe inteira?',
    resposta:
      'Pode. Marque “para uma equipe” e o tamanho aproximado, e o resultado muda o caminho: em vez de escolher um par, a conversa passa a ser sobre padronizar por risco e montar a grade de numeração.',
  },
  {
    pergunta: 'O teste serve para quem trabalha com eletricidade?',
    resposta:
      'Serve como lembrete de que a escolha muda, e só isso. Atividade com eletricidade tem norma própria, e a especificação do calçado vem do responsável técnico da empresa. O resultado aponta isso em vez de fingir que resolve.',
  },
  {
    pergunta: 'De onde vêm os critérios do teste?',
    resposta:
      'Da distinção entre calçado ocupacional e de segurança que a norma técnica faz, do que o Certificado de Aprovação informa sobre cada modelo, e de trinta anos de pedidos e reclamações que a Tower ouviu. Nenhum critério aqui é número inventado.',
  },
]

export const metadata = metadados({
  titulo: 'Qual calçado de segurança usar? Faça o teste',
  descricao:
    'Responda 11 perguntas sobre a sua atividade e veja que tipo de calçado avaliar: ocupacional ou de segurança, biqueira, solado e cabedal. Grátis, sem cadastro.',
  canonical: CAMINHO,
})

export default function QualCalcadoUsar() {
  return (
    <>
      <JsonLd
        dados={[
          schemaWebApplication({
            nome: 'Qual calçado profissional é ideal para mim?',
            descricao:
              'Orientação inicial de seleção de calçado profissional a partir da atividade, dos riscos do piso e da jornada. Gratuita e sem cadastro.',
            caminho: CAMINHO,
          }),
          schemaBreadcrumb([
            { nome: 'Ferramentas', url: '/ferramentas/' },
            { nome: 'Qual calçado usar', url: CAMINHO },
          ]),
          schemaFaq(PERGUNTAS),
        ]}
      />
      <Trilha
        itens={[
          { nome: 'Ferramentas', url: '/ferramentas/' },
          { nome: 'Qual calçado usar', url: CAMINHO },
        ]}
        tom="escuro"
      />
      <CabecalhoPagina
        variante="ink"
        rotulo="Ferramenta · Calçado profissional"
        titulo="Qual calçado profissional é ideal para você?"
        resumo="Responda algumas perguntas sobre a sua atividade e veja quais características vale procurar no seu próximo calçado de trabalho. Leva menos de um minuto e não precisa saber termos técnicos."
      />

      <Secao className="wrap">
        {/* Uma linha antes da ferramenta, o aviso completo depois dela. No
            celular o parágrafo inteiro empurrava a primeira pergunta para
            fora da tela, e aviso que ninguém lê não protege ninguém. */}
        <p className="mb-8 border-l-4 border-tower-red bg-tower-red-soft px-5 py-3 text-[0.9rem] leading-relaxed">
          Orientação inicial, e não laudo. O aviso completo está no fim da página, junto de como o teste decide.
        </p>

        <QualCalcado />
      </Secao>

      {/* Conteúdo que sustenta a página como busca, sem repetir os artigos. */}
      <Secao className="band">
        <div className="wrap">
          <h2 className="text-2xl sm:text-3xl">Como escolher um calçado de segurança</h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-2">
            Uma pergunta decide a categoria. As outras decidem o modelo. É nessa ordem que a
            ferramenta pergunta, e é nessa ordem que vale pensar.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:gap-x-14">
            <Bloco titulo="Ocupacional e de segurança são a mesma coisa?">
              Não. A diferença central é a biqueira de proteção contra impacto: o de segurança
              tem, o ocupacional não. Qual serve para você depende de existir ou não risco de
              algo pesado cair sobre o pé, e a página{' '}
              <Link href="/calcados/comparativo/">ocupacional ou de segurança</Link> decide isso em
              uma pergunta.
            </Bloco>
            <Bloco titulo="Quando a biqueira é necessária?">
              Quando há risco de queda ou prensagem de objeto pesado sobre o pé. Onde não há, ela
              só acrescenta peso, e o calçado ocupacional costuma proteger melhor no que importa —
              piso e jornada. O que a biqueira faz e não faz está em{' '}
              <Link href="/conhecimento/calcado-ocupacional-ou-de-seguranca/">as duas normas do calçado profissional</Link>.
            </Bloco>
            <Bloco titulo="Biqueira de aço ou de composite?">
              Protegem igual quando atendem ao requisito. O que muda é peso, comportamento no
              calor e passagem em detector de metal, e a decisão atividade por atividade está em{' '}
              <Link href="/conhecimento/biqueira-de-composite-ou-de-aco-qual-escolher/">biqueira de composite ou de aço</Link>.
            </Bloco>
            <Bloco titulo="Como escolher o solado?">
              Pelo que há no chão. Água e gordura juntas pedem desempenho diferente de água
              sozinha, e a palavra antiderrapante não diz em qual condição o solado foi ensaiado.
              A leitura da marcação está em{' '}
              <Link href="/conhecimento/solado-antiderrapante-o-que-significa/">o que significa solado antiderrapante</Link>.
            </Bloco>
            <Bloco titulo="Qual calçado usar em piso molhado?">
              Fechado em cima, para segurar respingo, com solado ensaiado para superfície molhada e
              cabedal que não absorve. Se o pé fica dentro de líquido, a categoria muda para{' '}
              <Link href="/conhecimento/bota-de-pvc-quando-e-a-resposta-certa/">bota impermeável</Link>. Em
              cozinha o critério inteiro está em{' '}
              <Link href="/conhecimento/calcado-para-cozinha-como-escolher/">qual calçado para cozinha</Link>.
            </Bloco>
            <Bloco titulo="E quem trabalha muitas horas em pé?">
              Aí o que decide o fim do turno é peso do par, amortecimento e numeração, nessa
              ordem. Botina pesada escolhida por garantia é a que mais cansa. O detalhe está em{' '}
              <Link href="/conhecimento/calcado-para-quem-trabalha-em-pe-o-dia-todo/">calçado para quem trabalha em pé o dia todo</Link>.
            </Bloco>
            <Bloco titulo="Como funciona o CA?">
              O Certificado de Aprovação é o que liga um modelo ao risco para o qual ele foi
              ensaiado. É nele que se confirma se há biqueira, proteção contra perfuração e
              resistência ao escorregamento. Como consultar está em{' '}
              <Link href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">o que é o CA</Link>.
            </Bloco>
            <Bloco titulo="Como saber o tamanho correto?">
              Provando no fim do expediente, porque o pé incha ao longo do dia, e olhando a
              largura da forma além do número. Biqueira de proteção não amacia: se aperta, é
              numeração. O caminho está em{' '}
              <Link href="/conhecimento/botina-que-machuca-calcado-ou-numeracao/">botina que machuca</Link>{' '}
              e, para equipe, em{' '}
              <Link href="/conhecimento/grade-de-numeracao-como-definir-para-a-equipe/">como definir a grade</Link>.
            </Bloco>
            <Bloco titulo="Quando trocar o calçado?">
              A norma não dá prazo, dá condição: solado gasto, biqueira exposta, costura aberta e
              qualquer pancada forte na biqueira. Os sinais estão em{' '}
              <Link href="/conhecimento/quando-trocar-o-calcado-de-seguranca/">quando trocar o calçado de segurança</Link>.
            </Bloco>
            <Bloco titulo="Botina, bota ou sapato?">
              O cano não muda a proteção contra impacto. Ele decide o que pode entrar pela boca
              do calçado e o apoio do tornozelo. Duas perguntas resolvem, em{' '}
              <Link href="/conhecimento/botina-bota-ou-sapato-de-seguranca/">botina, bota ou sapato de segurança</Link>.
            </Bloco>
          </div>
        </div>
      </Secao>

      <Secao className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <Perguntas perguntas={PERGUNTAS} />
          </div>
          <div className="space-y-6">
            <AssinaturaTecnica atualizado="setembro de 2026" />
            <div className="border-l-4 border-tower-red bg-tower-red-soft px-5 py-4 text-[0.92rem] leading-relaxed">
              Esta ferramenta oferece orientação inicial com base nas informações fornecidas. A escolha do EPI deve considerar os riscos reais da atividade, o CA, as especificações do fabricante, o PGR e a orientação do profissional responsável pela segurança do trabalho.
            </div>
            <div className="border border-rule p-6">
              <p className="eyebrow">Como o teste decide</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
                A primeira decisão é a categoria, e ela sai de uma pergunta só: se existe risco de
                queda de objeto pesado sobre o pé. Depois entram piso, óleo, água, eletricidade e
                produto químico, que ajustam solado, cabedal e cano. Por último, jornada e
                incômodos, que decidem se o calçado vai continuar no pé. Onde a resposta é “não
                sei”, o teste lista o que confirmar em vez de adivinhar.
              </p>
              <p className="mt-3 text-[0.95rem]">
                <Link href="/ferramentas/" className="underline underline-offset-4 hover:text-tower-red">
                  Ver todas as ferramentas
                </Link>
              </p>
            </div>
            <div className="border border-rule p-6">
              <p className="eyebrow">Fontes</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a href="https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                    NR-6 — Equipamento de Proteção Individual (texto oficial, PDF)
                  </a>
                </li>
                <li>
                  <a href="https://www.gov.br/pt-br/servicos/obter-certificado-de-aprovacao-de-equipamento-de-protecao-individual-ca" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                    Consulta ao Certificado de Aprovação (CA) — gov.br
                  </a>
                </li>
                <li>
                  <a href="https://www.normas.com.br/visualizar/artigo-tecnico/2532/os-requisitos-para-os-calcados-de-seguranca-e-ocupacionais" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                    Requisitos para calçados de segurança e ocupacionais — Target Normas
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Secao>
    </>
  )
}

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="prose-tower border-t border-rule pt-5">
      <h3 className="text-lg">{titulo}</h3>
      <p className="text-[0.98rem] text-ink-2">{children}</p>
    </div>
  )
}
