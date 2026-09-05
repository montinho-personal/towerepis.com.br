import type { Metadata } from 'next'
import Link from 'next/link'
import { Trilha, Secao } from '@/components/Blocos'
import { IconeSeta } from '@/components/Icones'
import { Retrato } from '@/components/Retrato'
import { FechamentoCta } from '@/components/WhatsAppCta'

export const metadata: Metadata = {
  title: 'Nossa história: trinta anos no Ceará',
  description:
    'Em 1995 a 3M procurava alguém para desenvolver o mercado de proteção no Ceará. Convidou o Helano. Esta é a história da Tower EPI’s, contada por quem viveu.',
  alternates: { canonical: '/a-tower/' },
}

/**
 * AS FOTOS CHEGARAM, e mudam o que esta página é.
 *
 * Antes ela era uma história contada só com tipografia, porque a alternativa
 * seria banco de imagem — e foto genérica de "equipe sorrindo" custaria mais
 * credibilidade do que a ausência custava. Agora três fotos do acervo entram
 * na linha do tempo, cada uma no marco a que pertence.
 *
 * A REGRA DA LEGENDA AQUI: ela não descreve a foto, que quem enxerga já viu.
 * Ela diz o que a foto PROVA. O marco de 1995 afirma "estoque embaixo,
 * escritório em cima" e "a 3M ofereceu uma distribuição"; a foto do estoque
 * mostra a prateleira de caixas da 3M do Brasil, e a frase deixa de ser
 * release e vira coisa que aconteceu.
 *
 * O QUE NÃO ESTÁ AQUI, e por quê: as três fotos de premiação que vieram no
 * mesmo lote. Nelas aparecem pessoas de fora da Tower, identificáveis, e o
 * guia de fotos deste projeto exige autorização de quem aparece. Ficam fora
 * até haver essa autorização — a regra não vale menos quando a foto é boa.
 */

/** Foto do acervo, colada ao marco a que pertence. */
type FotoMarco = {
  arquivo: string
  alt: string
  legenda: React.ReactNode
  largura: number
  altura: number
}
const MARCOS: {
  ano: string
  titulo: string
  texto: string
  link?: { href: string; rotulo: string }
  fotos?: FotoMarco[]
}[] = [
  {
    ano: '1994',
    titulo: 'São Paulo, antes de tudo',
    texto:
      'Helano e Cristina trabalhavam no mercado de EPI em São Paulo, na Bereneli, distribuidora especializada da 3M do Brasil e empresa do pai da Cristina. Helano, técnico de segurança do trabalho, fazia desenvolvimento e treinamento dentro das empresas. Cristina trabalhava em vendas — depois de treze anos em banco.',
  },
  {
    ano: '1995',
    titulo: 'O convite e o começo, no Montese',
    fotos: [
      {
        arquivo: 'escritorio-montese-1995.jpg',
        alt:
          'Escritório da Tower no prédio do Montese, em 1995: um homem sentado a uma mesa de madeira com monitor de tubo, teclado e impressora matricial, numa sala de parede lisa.',
        legenda: (
          <>
            <strong className="font-semibold text-ink">O escritório de cima.</strong>{' '}
            Uma mesa, um monitor de tubo e uma impressora matricial. Não havia mais nada:
            este cômodo era o administrativo, o comercial e a diretoria da empresa
            inteira.
          </>
        ),
        largura: 1600,
        altura: 1180,
      },
      {
        arquivo: 'estoque-montese-1995.jpg',
        alt:
          'Estoque da Tower no Montese, em 1995: prateleiras de aço do chão ao teto, cheias de caixas de papelão com a marca 3M, e uma pessoa em pé no corredor à esquerda.',
        legenda: (
          <>
            <strong className="font-semibold text-ink">E o estoque de baixo.</strong>{' '}
            As caixas nas prateleiras são da 3M do Brasil. É a parte da história que mais
            soa a release — &ldquo;a 3M ofereceu uma distribuição&rdquo; — vista do jeito
            que ela chegava de verdade: em papelão, empilhada até o teto.
          </>
        ),
        largura: 1600,
        altura: 1266,
      },
    ],
    texto:
      'A 3M procurava alguém que fizesse esse mesmo trabalho no Ceará e ofereceu uma distribuição ao Helano. Ele queria voltar ao estado natal, e aceitou. A Tower começou num prédio pequeno alugado no Montese, em Fortaleza: estoque embaixo, escritório em cima. Eram só os dois. Cristina no administrativo e nas vendas internas; Helano no desenvolvimento de clientes, no treinamento e na entrega das mercadorias.',
  },
  {
    ano: 'Os primeiros anos',
    titulo: 'Vender o que ainda não tinha demanda',
    fotos: [
      {
        arquivo: 'helano-campanha-ca-seminario.jpg',
        alt:
          'Helano em pé diante de uma faixa de seminário que diz: Trabalhador abra o olho — usar, vender ou comprar EPI sem C.A. é crime! O C.A. é a sua garantia de qualidade. À direita da faixa, os nomes Tower, 3M, Bompel, Mapa e Mucambo.',
        legenda: (
          <>
            <strong className="font-semibold text-ink">
              &ldquo;Trabalhador abra o olho.&rdquo;
            </strong>{' '}
            É isto que &ldquo;explicar antes de vender&rdquo; queria dizer na prática:
            pendurar uma faixa sobre Certificado de Aprovação na porta de um seminário.
            A frase é dura do jeito que campanha de rua era naquela época — o que a norma
            estabelece hoje, com a fonte oficial, está no{' '}
            <Link href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/">
              texto sobre o CA
            </Link>
            . E repare em quem assina embaixo do nome da Tower: 3M e Bompel, as duas
            marcas que a Tower continua trabalhando trinta anos depois.
          </>
        ),
        largura: 1410,
        altura: 870,
      },
    ],
    texto:
      'A maior dificuldade não foi concorrência. Foi cultura: o mercado local ainda usava material que durava muito tempo, e a proteção descartável precisava ser explicada antes de ser vendida. Somava-se a falta de capital de giro e a tarefa de conquistar clientela do zero, numa praça onde ninguém os conhecia.',
  },
  {
    ano: 'Anos 90',
    titulo: 'O primeiro grande cliente',
    fotos: [
      {
        arquivo: 'carro-de-entrega-tower-fiec.jpg',
        alt:
          'Furgão Fiat Fiorino branco da Tower estacionado diante do prédio do FIEC/SESI Clube da Parceria, em Fortaleza. Na lateral do carro: Tower comércio & serviços ltda, produtos de segurança e fitas adesivas, selo de distribuidor especializado e um telefone de sete dígitos.',
        legenda: (
          <>
            <strong className="font-semibold text-ink">
              O carro da entrega, parado na porta do FIEC.
            </strong>{' '}
            &ldquo;Desenvolvimento de clientes&rdquo; tinha esta forma: um furgão pequeno,
            um telefone de sete dígitos na lateral e um selo de distribuidor
            especializado ao lado da porta. Repare no <em>O</em> vermelho de TOWER — é o
            mesmo da faixa do seminário, acima.
          </>
        ),
        largura: 1553,
        altura: 1120,
      },
    ],
    texto:
      'Um grande grupo industrial do Ceará foi conquistado pelo trabalho de desenvolvimento feito pelo Helano. No auge, a Tower chegou a fornecer quarenta mil máscaras descartáveis a esse cliente. Do mesmo período vem uma indústria têxtil que compra com a gente até hoje.',
  },
  {
    ano: '2003',
    titulo: 'A empresa cresce',
    texto:
      'Mudança para um prédio muito maior, no mesmo bairro, onde a Tower ficaria por mais de treze anos. Nesse período houve equipe de vendas externa, motorista de entrega, auxiliares de vendas e técnico de segurança do trabalho. Eram anos de feiras com exposição de produtos e de eventos com palestras de especialistas da 3M e de outros fabricantes para os clientes.',
  },
  {
    ano: 'O prêmio',
    titulo: 'Distribuidor Regional 3M',
    fotos: [
      {
        arquivo: 'premiacao-3m-comemoracao.jpg',
        alt:
          'Cerca de doze pessoas em pé atrás de uma mesa de jantar, braços erguidos, comemorando. Três delas seguram placas emolduradas.',
        legenda: (
          <>
            <strong className="font-semibold text-ink">A noite.</strong> Três placas na
            mesa e o braço de todo mundo no ar. É a foto menos posada do acervo, e a
            única em que dá para ver o tamanho que a Tower tinha chegado a ter.
          </>
        ),
        largura: 1364,
        altura: 822,
      },
      {
        arquivo: 'premiacao-3m-placa.jpg',
        alt:
          'Três pessoas lado a lado num salão à noite, a do meio segurando uma placa emoldurada com um selo em vermelho.',
        legenda: (
          <>
            <strong className="font-semibold text-ink">A mesma noite, mais cedo.</strong>{' '}
            O reconhecimento veio da mesma empresa que, anos antes, tinha feito o convite
            para abrir a Tower — e por isso é o que Helano e Cristina guardam com mais
            cuidado.
          </>
        ),
        largura: 1347,
        altura: 843,
      },
    ],
    texto:
      'O reconhecimento de que Helano e Cristina mais se orgulham. Veio do trabalho e do volume de vendas — e da mesma empresa que, anos antes, tinha feito o convite que deu origem a tudo.',
    link: { href: '/marcas/3m/', rotulo: 'A relação da Tower com a 3M' },
  },
  {
    ano: '2016 · 2018',
    titulo: 'Menor, por escolha',
    texto:
      'Em 2016 a Tower saiu do Montese para uma casa alugada na Varjota. Em 2018, já bem menor, Helano e Cristina decidiram trabalhar de casa, mantendo a entrega. Veio a pandemia, e assim continuou.',
  },
  {
    ano: 'Hoje',
    titulo: 'Os mesmos dois, e os mesmos clientes',
    texto:
      'Trinta anos depois, quem atende continua sendo quem começou. Sem intermediário, sem vendedor de comissão. E há clientes dos anos 90 que atravessaram todas essas fases junto com a Tower — e continuam comprando.',
  },
]

export default function ATower() {
  return (
    <>
      <Trilha itens={[{ nome: 'A Tower', url: '/a-tower/' }]} />

      <section className="wrap pt-10 pb-16 sm:pt-14 sm:pb-20">
        <p className="eyebrow eyebrow-red">Nossa história</p>
        <h1 className="mt-5 max-w-4xl text-3xl sm:text-5xl lg:text-6xl">
          Em 1995, a 3M procurava alguém para desenvolver o mercado de proteção no Ceará.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-2">
          Convidou o Helano. Ele aceitou, voltou para Fortaleza com a Cristina, e os dois
          abriram a Tower num prédio pequeno alugado no Montese. Estoque embaixo,
          escritório em cima.
        </p>
      </section>

      {/* LINHA DO TEMPO — data + fato + frase de quem viveu. */}
      <Secao className="wrap pt-0">
        <ol className="border-t-2 border-ink">
          {MARCOS.map((m) => (
            <li
              key={m.ano}
              className="grid gap-3 border-b border-rule py-10 sm:grid-cols-[10rem_1fr] sm:gap-10"
            >
              <p className="numeral text-2xl text-tower-red sm:text-3xl">{m.ano}</p>
              <div>
                <h2 className="font-display text-xl font-bold sm:text-2xl">{m.titulo}</h2>
                <p className="mt-3 max-w-2xl text-ink-2">{m.texto}</p>
                {/* Duas fotos do mesmo marco ficam lado a lado a partir de
                    640px: são o andar de cima e o de baixo do mesmo prédio, e
                    empilhadas perderiam a relação entre elas. */}
                {m.fotos && (
                  <div
                    className={`mt-8 grid gap-8 ${m.fotos.length > 1 ? 'sm:grid-cols-2 sm:gap-7' : 'max-w-2xl'}`}
                  >
                    {m.fotos.map((f) => (
                      <Retrato
                        key={f.arquivo}
                        src={`/fotos/historia/${f.arquivo}`}
                        alt={f.alt}
                        largura={f.largura}
                        altura={f.altura}
                        legenda={f.legenda}
                        tamanhos={
                          m.fotos!.length > 1
                            ? '(min-width: 1024px) 30vw, (min-width: 640px) 42vw, 92vw'
                            : '(min-width: 1024px) 42rem, 92vw'
                        }
                      />
                    ))}
                  </div>
                )}
                {m.link && (
                  <p className="mt-4">
                    <Link
                      href={m.link.href}
                      className="inline-flex items-center gap-2 font-display text-sm font-bold text-tower-red"
                    >
                      {m.link.rotulo}
                      <IconeSeta className="h-4 w-4" />
                    </Link>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Secao>

      {/* O QUE OS SEGUROU — palavras deles. */}
      <Secao className="band">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="eyebrow eyebrow-red">O que os segurou</p>
              <h2 className="mt-4 text-2xl sm:text-3xl">
                Perguntamos se em algum momento acharam que não daria certo.
              </h2>
              <p className="mt-6 text-ink-2">
                A resposta foi que dificuldade sempre houve, mas desistir nunca esteve em
                questão — porque a sobrevivência dos dois dependia do negócio. Quando
                perguntamos o que fez a empresa chegar até aqui, a resposta teve uma
                palavra só.
              </p>
            </div>

            <div className="space-y-8">
              <blockquote className="border-l-4 border-tower-red pl-6">
                <p className="font-display text-2xl font-bold leading-snug sm:text-3xl">
                  “Necessidade.”
                </p>
              </blockquote>
              <blockquote className="border-l-4 border-rule-strong pl-6">
                <p className="text-lg leading-relaxed">
                  “Sempre tivemos dificuldades, mas desistir não era o pensamento, pois
                  nossa sobrevivência dependia do negócio.”
                </p>
                <footer className="mt-3 text-sm text-ink-3">Helano e Cristina</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </Secao>

      {/* QUEM SÃO */}
      <Secao className="wrap">
        <h2 className="eyebrow eyebrow-red">Quem atende</h2>

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.62fr_1fr] lg:gap-14">
          <Retrato
            src="/fotos/pessoas/helano-e-cristina.jpg"
            alt="Helano e Cristina, sócios-proprietários da Tower EPI's, em retrato de estúdio."
            largura={2046}
            altura={3074}
            tamanhos="(min-width: 1024px) 26vw, 100vw"
            legenda={
              <>
                <strong className="font-semibold text-ink">Helano e Cristina.</strong>{' '}
                Os dois desde 1995 — pelo prédio do Montese, pela sede de 2003 e pela
                Tower de hoje.
              </>
            }
          />

          <div className="grid gap-px self-start border border-ink bg-ink">
          <div className="bg-paper p-7 sm:p-9">
            <h3 className="font-display text-2xl font-bold">Helano</h3>
            <p className="eyebrow mt-2">Sócio-proprietário · Técnico de Segurança do Trabalho</p>
            <p className="mt-5 text-ink-2">
              Jornalista de formação, virou técnico de segurança do trabalho e passou a
              fazer desenvolvimento e treinamento dentro das empresas. Foi esse trabalho
              que levou ao convite da 3M em 1995. Continua sendo ele quem responde as
              dúvidas técnicas da Tower.
            </p>
            <Link
              href="/a-tower/helano/"
              className="mt-6 inline-block font-display text-sm font-bold text-tower-red"
            >
              Ver a página do Helano →
            </Link>
          </div>

          <div className="bg-paper p-7 sm:p-9">
            <h3 className="font-display text-2xl font-bold">Cristina</h3>
            <p className="eyebrow mt-2">Sócia-proprietária · Atendimento e vendas</p>
            <p className="mt-5 text-ink-2">
              Trabalhou treze anos em banco antes de entrar no mercado de EPI, em São
              Paulo. Desde 1995 cuida do administrativo e do atendimento da Tower. Quando
              perguntamos como gostam que um cliente seja tratado, a resposta foi:
              “com eficiência, rapidez no atendimento, atenção e cuidado”.
            </p>
          </div>
          </div>
        </div>
      </Secao>

      {/* O QUE MUDOU E O QUE NÃO MUDOU */}
      <Secao className="band-ink">
        <div className="wrap">
          <p className="eyebrow text-paper/55">O que mudou e o que não mudou</p>
          <blockquote className="mt-6 max-w-4xl">
            <p className="font-display text-2xl font-bold leading-snug sm:text-4xl">
              “O que mudou muito foi o tamanho da empresa. Fomos grande. Hoje somos
              pequenos, mas nosso atendimento continua o mesmo — e ainda temos clientes
              que consideram isso ao comprar.”
            </p>
            <footer className="mt-8 text-sm text-paper/60">Helano e Cristina</footer>
          </blockquote>
        </div>
      </Secao>

      {/* FECHO */}
      <Secao className="wrap">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow eyebrow-red">O que a Tower representa</p>
            <p className="mt-6 font-display text-3xl font-bold leading-tight sm:text-4xl">
              “Para muita gente, a Tower é uma empresa de EPIs.
              <br />
              Para nós, é uma história de vida.”
            </p>
          </div>
          <div className="space-y-4 text-ink-2">
            <p>
              Perguntamos como gostariam que a empresa fosse lembrada. A resposta foi:
              como uma das pioneiras do setor no Ceará.
            </p>
            <p>
              E perguntamos qual ensinamento gostariam de deixar para quem continuar essa
              história. Foram duas palavras: <strong>perseverança e luta</strong>.
            </p>
            <p>
              As filhas escolheram outros caminhos, e não há segunda geração na empresa.
              O que existe são trinta anos de trabalho, um jeito de atender que não mudou
              e clientes que ficaram.
            </p>
          </div>
        </div>
      </Secao>

      {/* A história termina em AÇÃO. História que não vira porta de entrada
          é vaidade institucional. */}
      <FechamentoCta
        contexto="historia"
        secao="historia-fechamento"
        titulo="É com essas duas pessoas que você vai falar."
        texto="Conte o que você faz e o que precisa proteger. A resposta vem de quem trabalha com isso desde antes de 1995."
        rotulo="Falar com a Tower"
      />
    </>
  )
}
