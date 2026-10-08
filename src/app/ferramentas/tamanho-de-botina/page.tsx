import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Trilha, CabecalhoPagina, Perguntas, AssinaturaTecnica, Secao } from '@/components/Blocos'
import { TamanhoBotina } from '@/components/TamanhoBotina'
import { JsonLd, schemaBreadcrumb, schemaFaq, schemaWebApplication } from '@/lib/schema'
import { metadados } from '@/lib/seo'
import { cmDoNumero, estimar, formatarCm, FONTES_DA_PROVA, PUBLICAVEL, REFERENCIA } from '@/lib/tamanho-calcado'

/**
 * Calculadora de tamanho de botina.
 *
 * A URL. /tamanho-de-botina/ e não /calculadora-tamanho-botina/: "tamanho de
 * botina" é a consulta principal do assunto, e "calculadora" na pesquisa de
 * setembro de 2026 só puxava conversores genéricos. A palavra vai no title e
 * no H1, onde ajuda, e fica fora do caminho, onde só alongaria.
 *
 * A TRAVA. A página só existe quando a referência geral de numeração foi
 * conferida na fonte (`verificada` em src/content/tabelas-numeracao.json).
 * Enquanto não foi, o build devolve 404 e a página fica fora do sitemap e do
 * hub. Calculadora que publica número sem fonte conferida quebra a regra 1
 * do projeto na primeira resposta que dá.
 *
 * CANIBALIZAÇÃO. O artigo "botina que machuca" é dono do "por que dói"; o
 * de grade é dono da compra da equipe; o teste "qual calçado" é dono do tipo
 * de calçado. Esta página é dona de "que número eu peço", e aponta para os
 * três em vez de repetir.
 */

const CAMINHO = '/ferramentas/tamanho-de-botina/'

// As respostas "pé de X cm calça quanto" saem da mesma função da calculadora.
// Se a referência mudar, a FAQ muda junto — e nunca contradiz a ferramenta.
const resposta = (cm: number) => {
  const e = estimar(cm)
  return e.tipo === 'unico'
    ? `Na referência desta calculadora, ${formatarCm(cm)} cm corresponde aproximadamente ao ${e.numero}. É o número para começar a prova; a tabela do modelo e a prova confirmam, porque a forma muda entre marcas.`
    : `Na referência desta calculadora, ${formatarCm(cm)} cm fica entre o ${e.de} e o ${e.ate}. Nessa faixa vale provar os dois: quem decide é a forma do modelo, e a tabela do fabricante, quando existe.`
}

const PERGUNTAS = [
  { pergunta: 'Pé de 25 cm calça quanto?', resposta: resposta(25) },
  { pergunta: 'Pé de 26 cm calça quanto?', resposta: resposta(26) },
  { pergunta: 'Pé de 27 cm calça quanto?', resposta: resposta(27) },
  {
    pergunta: 'Devo somar uma folga à medida do pé antes de converter?',
    resposta:
      'Não. Na numeração brasileira, o número expressa o comprimento do pé, e a folga já está na fôrma do calçado. Somar um centímetro antes de converter conta a folga duas vezes e leva a um número acima do certo.',
  },
  {
    pergunta: 'Quanto espaço deve sobrar na ponta da botina?',
    resposta:
      'Cerca de 1 cm entre o dedo mais longo e a ponta, com você em pé. Menos que isso, os dedos batem na biqueira ao andar; muito mais, o calcanhar solta. É uma conferência da prova, e não um valor para somar à medida do pé.',
  },
  {
    pergunta: 'Por que a calculadora não pergunta se é para homem ou mulher?',
    resposta:
      'Porque o comprimento do pé é o mesmo dado nos dois casos, e a conversão também. O que muda entre formas masculina e feminina é largura e altura do peito do pé, e isso se resolve na escolha do modelo, não no número.',
  },
  {
    pergunta: 'A estimativa vale para qualquer marca?',
    resposta:
      'Vale como ponto de partida. Cada fabricante define a folga e o desenho da sua fôrma, e a mesma medida pode calçar melhor num número em uma marca e no vizinho em outra. Por isso o resultado diz dois números quando a medida fica entre eles.',
  },
]

export const metadata = metadados({
  titulo: 'Calculadora de tamanho de botina pelo pé em cm',
  descricao:
    'Meça o pé em centímetros e veja qual numeração de botina ou calçado profissional vale experimentar, e como conferir na prova. Grátis, sem cadastro.',
  canonical: CAMINHO,
})

const NUMEROS_TABELA = Array.from({ length: 13 }, (_, i) => 34 + i)

export default function TamanhoDeBotina() {
  if (!PUBLICAVEL) notFound()

  return (
    <>
      <JsonLd
        dados={[
          schemaWebApplication({
            nome: 'Calculadora de tamanho de botina',
            descricao:
              'Estima a numeração brasileira de botina e calçado profissional a partir do comprimento do pé em centímetros. Gratuita e sem cadastro.',
            caminho: CAMINHO,
          }),
          schemaBreadcrumb([
            { nome: 'Ferramentas', url: '/ferramentas/' },
            { nome: 'Tamanho de botina', url: CAMINHO },
          ]),
          schemaFaq(PERGUNTAS),
        ]}
      />
      <Trilha
        itens={[
          { nome: 'Ferramentas', url: '/ferramentas/' },
          { nome: 'Tamanho de botina', url: CAMINHO },
        ]}
        tom="escuro"
      />
      <CabecalhoPagina
        variante="ink"
        rotulo="Ferramenta · Calçado profissional"
        titulo="Calculadora de tamanho de botina"
        resumo="Informe o comprimento do seu pé e descubra qual numeração vale experimentar. Leva menos de um minuto e não pede cadastro."
      />

      <Secao className="wrap">
        <TamanhoBotina />
      </Secao>

      <Secao className="band">
        <div className="wrap">
          <h2 className="text-2xl sm:text-3xl">Como medir o pé para comprar botina</h2>
          {/* Resposta direta primeiro: é o parágrafo que o buscador recorta. */}
          <p className="mt-4 max-w-2xl text-lg leading-relaxed">
            Em pé, no fim do dia e com a meia do trabalho, encoste o calcanhar numa parede sobre uma
            folha de papel, marque a ponta do dedo mais longo e meça da parede até a marca. Repita no
            outro pé e use a medida do maior.
          </p>
          <p className="mt-4 max-w-2xl text-ink-2">
            O fim do dia importa porque o pé incha ao longo do turno. O peso nos dois pés importa
            porque o pé se alonga quando pisa. E o dedo mais longo nem sempre é o dedão: em muita gente
            é o segundo, e quem marca o dedão mede a menos.
          </p>

          <h2 className="mt-14 text-2xl sm:text-3xl">Tabela de referência: comprimento do pé e numeração</h2>
          <p className="mt-4 max-w-2xl text-ink-2">
            É a mesma conta da calculadora, em forma de consulta. Serve de ponto de partida, e não é a
            tabela de nenhum modelo: cada fabricante tem a sua fôrma.
          </p>
          <div className="mt-6 max-w-md overflow-x-auto">
            <table className="w-full border-collapse text-left text-[0.95rem]">
              <caption className="sr-only">Numeração brasileira e comprimento do pé correspondente, pela referência em ponto francês</caption>
              <thead>
                <tr className="border-b-2 border-ink">
                  <th scope="col" className="py-2 pr-6 font-display">Numeração</th>
                  <th scope="col" className="py-2 font-display">Comprimento do pé (aprox.)</th>
                </tr>
              </thead>
              <tbody>
                {NUMEROS_TABELA.map((n) => (
                  <tr key={n} className="border-b border-rule">
                    <th scope="row" className="py-2 pr-6 font-display font-bold">{n}</th>
                    <td className="py-2 tabular-nums">{formatarCm(cmDoNumero(n))} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 max-w-2xl text-sm text-ink-2">
            Quando a medida cai no meio de dois números, a calculadora mostra os dois. É o caso em que
            as tabelas de fabricantes mais discordam entre si.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:gap-x-14">
            <Bloco titulo="Botina tem a mesma numeração do tênis?">
              O número é o mesmo sistema, mas o calce não. A forma do calçado de segurança costuma ser
              mais reta, o cabedal é mais firme e a biqueira não cede. Por isso o número do tênis é um
              ponto de partida pior que a medida do pé.
            </Bloco>
            <Bloco titulo="Botina deve ficar apertada ou folgada?">
              Nenhum dos dois. Firme no peito do pé e no calcanhar, com espaço para os dedos se
              mexerem na frente. Apertada machuca e sai do pé no meio do turno; folgada faz o pé
              escorregar até a biqueira.
            </Bloco>
            <Bloco titulo="O que fazer quando um pé é maior que o outro?">
              É comum, e a regra é simples: a numeração sai do maior. O pé menor se ajusta com o
              cadarço; o maior apertado não tem ajuste.
            </Bloco>
            <Bloco titulo="Como saber se a biqueira está apertada?">
              Em pé e parado, você não deve sentir a biqueira sobre os dedos. Se sente ao dobrar o pé
              andando, é número ou forma — e ela não amacia com o uso. O que muda em cada caso está em{' '}
              <Link href="/conhecimento/botina-que-machuca-calcado-ou-numeracao/">botina que machuca</Link>.
            </Bloco>
            <Bloco titulo="Qual meia usar ao experimentar?">
              A mesma que vai usar no trabalho. Meia grossa ocupa espaço, e o calçado provado com meia
              fina aperta no primeiro dia de uso.
            </Bloco>
            <Bloco titulo="Como comprar pela internet sem errar?">
              Meça o pé, compare com a tabela do modelo quando ela existir e, na dúvida entre dois
              números, pergunte antes. Para equipe, prove uma amostra por faixa de numeração antes de
              fechar a grade: o método está em{' '}
              <Link href="/conhecimento/grade-de-numeracao-como-definir-para-a-equipe/">como definir a grade da equipe</Link>.
            </Bloco>
            <Bloco titulo="Numeração brasileira, europeia e americana">
              A europeia usa o mesmo passo de dois terços de centímetro, mas mede a fôrma, e por isso
              costuma ficar dois números acima da brasileira. A americana usa outro sistema. Esta
              calculadora trabalha só com a numeração brasileira, que é a do calçado vendido aqui.
            </Bloco>
            <Bloco titulo="E o tipo de calçado?">
              O tamanho não diz se você precisa de biqueira, de solado para óleo ou de bota
              impermeável. Isso sai do risco da atividade, e o teste{' '}
              <Link href="/ferramentas/qual-calcado-usar/">qual calçado profissional é ideal para você</Link>{' '}
              responde em um minuto.
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
              A calculadora estima a numeração a partir do comprimento do pé. Ela não substitui a
              tabela do fabricante nem a prova do calçado, e não indica tipo de proteção, biqueira,
              solado ou CA — isso depende dos riscos da atividade e da orientação do responsável pela
              segurança do trabalho.
            </div>
            <div className="border border-rule p-6">
              <p className="eyebrow">Como calculamos</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
                {REFERENCIA.resumo} A calculadora divide o comprimento do pé pelo passo de um número
                ({REFERENCIA.passoMm.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} mm) e não soma folga nenhuma.
                Quando a medida fica perto do meio de dois números, mostra os dois. Quando houver tabela
                oficial do modelo, publicada pelo fabricante e medida no pé, ela passa a valer para
                aquele modelo.
              </p>
              <p className="mt-3 text-sm text-ink-3">Referência revisada em {REFERENCIA.revisado.split('-').reverse().join('/')}.</p>
              <p className="mt-3 text-[0.95rem]">
                <Link href="/ferramentas/" className="underline underline-offset-4 hover:text-tower-red">
                  Ver todas as ferramentas
                </Link>
              </p>
            </div>
            <div className="border border-rule p-6">
              <p className="eyebrow">Fontes</p>
              <ul className="mt-4 space-y-3 text-sm">
                {[REFERENCIA.fonte, ...REFERENCIA.fontesDeApoio, ...FONTES_DA_PROVA].map((f) => (
                  <li key={f.url}>
                    <a href={f.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                      {f.titulo}
                    </a>
                  </li>
                ))}
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
