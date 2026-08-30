import type { Metadata } from 'next'
import Link from 'next/link'
import { Trilha, CabecalhoPagina, Secao } from '@/components/Blocos'
import { BlocoCta } from '@/components/WhatsAppCta'

export const metadata: Metadata = {
  title: 'Marcas que a Tower trabalha',
  description:
    'Trabalhamos com 3M, Sticky Shoes e Bompel, entre outras. Trabalhar com mais de um fabricante permite comparar sem torcer para um lado.',
  alternates: { canonical: '/marcas/' },
}

/**
 * PENDENTE: lista completa de marcas trabalhadas hoje. As três confirmadas
 * vieram do feed do Instagram e do questionário. Não listamos marca sem
 * confirmação — catálogo desatualizado é pior que catálogo inexistente.
 */
export default function Marcas() {
  return (
    <>
      <Trilha itens={[{ nome: 'Marcas', url: '/marcas/' }]} />
      <CabecalhoPagina
        rotulo="Marcas"
        titulo="Com quem a gente trabalha"
        resumo="Trabalhar com mais de um fabricante tem uma vantagem prática para quem compra: a gente pode comparar sem torcer para um lado. Quando um modelo não serve para o seu caso, dá para dizer isso."
      />

      <Secao className="wrap pt-0">
        <h2 className="sr-only">Marcas trabalhadas</h2>
        <div className="mt-0 grid gap-px border border-ink bg-ink lg:grid-cols-3">
          <div className="bg-paper p-7 sm:p-9">
            <p className="numeral text-3xl">3M</p>
            <p className="eyebrow mt-3">Desde a fundação</p>
            <p className="mt-5 text-ink-2">
              A relação com a 3M é a origem da Tower: foi a 3M que, em 1995, procurava
              alguém para desenvolver o mercado de proteção no Ceará e ofereceu a
              distribuição ao Helano. A empresa recebeu depois o reconhecimento de
              Distribuidor Regional.
            </p>
            <Link
              href="/marcas/3m/"
              className="mt-6 inline-block font-display text-sm font-bold text-tower-red"
            >
              Ler a história com a 3M →
            </Link>
          </div>

          <div className="bg-paper p-7 sm:p-9">
            <p className="numeral text-3xl">Sticky Shoes</p>
            <p className="eyebrow mt-3">Calçado ocupacional</p>
            <p className="mt-5 text-ink-2">
              Linha de calçado ocupacional impermeável, com solado antiderrapante,
              bastante usada em cozinha, área de alimentação e serviços de saúde.
              Disponível também em linha branca para ambientes com padrão sanitário mais
              rígido.
            </p>
            <Link
              href="/calcados/ocupacionais/"
              className="mt-6 inline-block font-display text-sm font-bold text-tower-red"
            >
              Ver calçados ocupacionais →
            </Link>
          </div>

          <div className="bg-paper p-7 sm:p-9">
            <p className="numeral text-3xl">Bompel</p>
            <p className="eyebrow mt-3">Calçado profissional</p>
            <p className="mt-5 text-ink-2">
              Linha de calçado profissional em couro, incluindo modelos com fechamento em
              elástico e solado resistente a escorregamento. Usada em atividades que
              pedem mais robustez do que o calçado em material sintético.
            </p>
            <Link
              href="/calcados/"
              className="mt-6 inline-block font-display text-sm font-bold text-tower-red"
            >
              Ver calçados →
            </Link>
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-sm text-ink-3">
          Esta não é a lista completa. Trabalhamos com outros fabricantes conforme a
          categoria e a necessidade. Se você procura uma marca específica, pergunte.
        </p>
      </Secao>

      <Secao className="wrap pt-0">
        <BlocoCta
          contexto="marcas"
          secao="marcas-fechamento"
          titulo="Procura uma marca ou um modelo específico?"
          texto="Diga o que você procura. Se a gente trabalha, informa disponibilidade e prazo. Se não trabalha, diz isso também — e, se fizer sentido, indica uma alternativa equivalente."
          rotulo="Perguntar no WhatsApp"
        />
      </Secao>
    </>
  )
}
