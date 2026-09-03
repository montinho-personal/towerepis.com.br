import type { Metadata } from 'next'
import Link from 'next/link'
import { Trilha, CabecalhoPagina, Secao } from '@/components/Blocos'
import { FechamentoCta } from '@/components/WhatsAppCta'

export const metadata: Metadata = {
  title: { absolute: 'Marcas de EPI que a Tower trabalha' },
  description:
    'A Bompel é a principal parceria em calçado profissional. Também Sticky Shoes e, com disponibilidade sob consulta, a 3M — a marca com que a Tower nasceu.',
  alternates: { canonical: '/marcas/' },
}

/**
 * A ordem desta página reflete a operação de hoje, não a história.
 * A Bompel vem primeiro porque é a principal parceria atual; a 3M vem
 * depois, como origem da empresa e linha ainda trabalhada.
 *
 * PENDENTE: lista completa das marcas trabalhadas hoje.
 */
export default function Marcas() {
  return (
    <>
      <Trilha itens={[{ nome: 'Marcas', url: '/marcas/' }]} tom="escuro" />
      <CabecalhoPagina
        variante="ink"
        rotulo="Marcas"
        titulo="Com quem a gente trabalha"
        resumo="Em calçado profissional, que é o que mais sai hoje, a principal parceria da Tower é com a Bompel. Trabalhamos também com outras marcas — e é isso que permite dizer, quando for o caso, que um modelo não serve para a sua atividade."
      />

      {/* PARCEIRA PRINCIPAL — destaque de tamanho, não só de ordem. */}
      <Secao className="wrap">
        <h2 className="eyebrow eyebrow-red">Principal parceria hoje</h2>

        <div className="mt-6 border-2 border-ink">
          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
            <div>
              <p className="numeral text-4xl sm:text-5xl">Bompel</p>
              <p className="eyebrow mt-3">Calçado de segurança e ocupacional</p>
              <p className="mt-6 text-ink-2">
                Fabricante brasileiro de calçado profissional, com quase quatro décadas
                de operação. É a linha que mais atendemos hoje, e a que conhecemos com
                mais profundidade — de numeração e forma até o comportamento do solado em
                cada tipo de piso.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/marcas/bompel/" className="btn btn-ink">
                  Ver a linha Bompel
                </Link>
                <a
                  href="https://www.bompel.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  Site do fabricante
                </a>
              </div>
            </div>

            <div>
              <p className="eyebrow">O que costuma aparecer nos modelos</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  'Cabedal em couro vaqueta, incluindo versões hidrofugadas',
                  'Fechamento em elástico, sem cadarço',
                  'Biqueira em composite ou termoplástica, conforme o modelo',
                  'Solado bidensidade em poliuretano',
                  'Versões com proteção metatarsal',
                  'Modelos com Certificado de Aprovação',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed">
                    <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-tower-red" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-ink-3">
                O que cada modelo atende consta no Certificado de Aprovação dele. Pergunte
                pelo item específico que a gente confere antes de você comprar.
              </p>
            </div>
          </div>
        </div>
      </Secao>

      {/* OUTRAS MARCAS */}
      <Secao className="band">
        <div className="wrap">
          <h2 className="eyebrow">Também trabalhamos</h2>

          <div className="mt-6 grid gap-px border border-ink bg-ink lg:grid-cols-2">
            <div className="bg-paper p-7 sm:p-9">
              <p className="numeral text-3xl">3M</p>
              <p className="eyebrow mt-3">A origem da Tower · disponibilidade sob consulta</p>
              <p className="mt-5 text-ink-2">
                Foi a 3M que, em 1995, procurava alguém para desenvolver o mercado de
                proteção no Ceará e ofereceu a distribuição ao Helano. A empresa recebeu
                depois o reconhecimento de Distribuidor Regional. Hoje a linha tem
                disponibilidade limitada: pergunte pelo item e informamos prazo antes de
                qualquer coisa.
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
              <p className="eyebrow mt-3">Calçado ocupacional impermeável</p>
              <p className="mt-5 text-ink-2">
                Linha de calçado ocupacional impermeável, com solado antiderrapante, usada
                em cozinha, área de alimentação e serviços de saúde. Inclui linha branca,
                para ambientes com padrão sanitário mais rígido.
              </p>
              <Link
                href="/calcados/ocupacionais/"
                className="mt-6 inline-block font-display text-sm font-bold text-tower-red"
              >
                Ver calçados ocupacionais →
              </Link>
            </div>
          </div>

          <p className="mt-8 max-w-2xl text-sm text-ink-3">
            Esta não é a lista completa — trabalhamos com outros fabricantes conforme a
            categoria. Se você procura uma marca específica, pergunte: se a gente não
            trabalha, diz isso também.
          </p>
        </div>
      </Secao>

      <FechamentoCta
        contexto="marcas"
        secao="marcas-fechamento"
        titulo="Procura um modelo específico?"
        texto="Diga qual você procura. Informamos disponibilidade e prazo — e, se não fizer sentido para a sua atividade, dizemos isso antes de vender."
        rotulo="Perguntar no WhatsApp"
      />
    </>
  )
}
