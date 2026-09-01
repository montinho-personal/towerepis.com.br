import type { Metadata } from 'next'
import Link from 'next/link'
import { Trilha, Secao } from '@/components/Blocos'
import { Retrato } from '@/components/Retrato'
import { FechamentoCta } from '@/components/WhatsAppCta'

export const metadata: Metadata = {
  title: 'Nossa história: trinta anos no Ceará',
  description:
    'Em 1995 a 3M procurava alguém para desenvolver o mercado de proteção no Ceará. Convidou o Helano. Esta é a história da Tower EPI’s, contada por quem viveu.',
  alternates: { canonical: '/a-tower/' },
}

/**
 * PENDENTE: fotos históricas. O questionário confirma que existem fotos dos
 * fundadores, da primeira sede e dos logotipos antigos. Enquanto não chegam,
 * a página é resolvida tipograficamente — nunca com banco de imagens.
 */
const MARCOS = [
  {
    ano: '1994',
    titulo: 'São Paulo, antes de tudo',
    texto:
      'Helano e Cristina trabalhavam no mercado de EPI em São Paulo, na Bereneli, distribuidora especializada da 3M do Brasil e empresa do pai da Cristina. Helano, técnico de segurança do trabalho, fazia desenvolvimento e treinamento dentro das empresas. Cristina trabalhava em vendas — depois de treze anos em banco.',
  },
  {
    ano: '1995',
    titulo: 'O convite e o começo, no Montese',
    texto:
      'A 3M procurava alguém que fizesse esse mesmo trabalho no Ceará e ofereceu uma distribuição ao Helano. Ele queria voltar ao estado natal, e aceitou. A Tower começou num prédio pequeno alugado no Montese, em Fortaleza: estoque embaixo, escritório em cima. Eram só os dois. Cristina no administrativo e nas vendas internas; Helano no desenvolvimento de clientes, no treinamento e na entrega das mercadorias.',
  },
  {
    ano: 'Os primeiros anos',
    titulo: 'Vender o que ainda não tinha demanda',
    texto:
      'A maior dificuldade não foi concorrência. Foi cultura: o mercado local ainda usava material que durava muito tempo, e a proteção descartável precisava ser explicada antes de ser vendida. Somava-se a falta de capital de giro e a tarefa de conquistar clientela do zero, numa praça onde ninguém os conhecia.',
  },
  {
    ano: 'Anos 90',
    titulo: 'O primeiro grande cliente',
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
    texto:
      'O reconhecimento de que Helano e Cristina mais se orgulham. Veio do trabalho e do volume de vendas — e da mesma empresa que, anos antes, tinha feito o convite que deu origem a tudo.',
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
