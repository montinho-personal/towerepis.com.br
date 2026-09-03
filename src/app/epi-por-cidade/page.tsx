import type { Metadata } from 'next'
import Link from 'next/link'
import { metadados } from '@/lib/seo'

import { ESTADOS, cidadesDoEstado } from '@/content/cidades'
import { empresa } from '@/config/empresa'
import { Trilha, CabecalhoPagina, EmUmaFrase, Secao, BarraProva } from '@/components/Blocos'
import { FechamentoCta } from '@/components/WhatsAppCta'
import { IconeSeta } from '@/components/Icones'

export const metadata: Metadata = metadados({
  titulo: 'Onde a Tower EPI’s atende: cidades e regiões',
  descricao:
    'Ceará, Piauí e Rio Grande do Norte. Veja o que muda de uma região para outra e como pedir orçamento com quem é técnico de segurança do trabalho.',
  canonical: '/epi-por-cidade/',
  absoluto: true,
})

/**
 * Hub regional.
 *
 * NÃO é uma lista de cidades. Uma lista de nomes com link é exatamente o que
 * as doorway pages da concorrência fazem, e não ajuda ninguém a decidir nada.
 * O que esta página entrega é o que muda de uma região para outra — porque é
 * isso que o comprador quer saber antes de perguntar se você atende.
 *
 * Fortaleza aparece aqui SEM página própria, de propósito: a home, /empresas/
 * e /calcados/ já disputam "EPI em Fortaleza", "fornecedor de EPI para
 * empresas em Fortaleza" e "calçado de segurança em Fortaleza". Criar uma
 * página de cidade para a capital seria pôr uma página nova para brigar com
 * três que já estão posicionadas.
 */
export default function PaginaEpiPorCidade() {
  return (
    <>
      <Trilha itens={[{ nome: 'Onde atendemos', url: '/epi-por-cidade/' }]} tom="escuro" />

      <CabecalhoPagina
        variante="ink"
        rotulo="Onde atendemos"
        titulo="A Tower atende de Fortaleza ao Vale do Açu"
        resumo="Três estados, seis cidades, e realidades de trabalho que não se parecem. Aqui está o que muda em cada uma — e como pedir um orçamento."
      />

      <Secao className="wrap" ritmo="normal">
        <EmUmaFrase>
          A Tower EPI’s é uma distribuidora de equipamentos de proteção individual de
          Fortaleza, no Ceará, em atividade desde {empresa.fundacao}. Atende empresas no
          Ceará, no Piauí e no Rio Grande do Norte. O atendimento começa por WhatsApp, sem
          cadastro, e quem responde é um dos dois sócios — um deles técnico de segurança do
          trabalho.
        </EmUmaFrase>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="space-y-5 text-[1.02rem] leading-relaxed text-ink-2">
            <h2 className="eyebrow text-ink">Por que estas páginas não são iguais</h2>
            <p>
              Existe um tipo de página de EPI que só troca o nome da cidade e repete o mesmo
              texto. Ela responde à busca e não responde à pergunta.
            </p>
            <p>
              O que a Tower faz de diferente é começar pela economia de cada lugar. Uma
              fábrica de calçado no Cariri, uma rede hospitalar em Teresina, uma cozinha de
              hotel em Parnaíba e um galpão de embalagem de fruta no Vale do Açu têm quatro
              listas de EPI distintas — e o erro de compra de cada uma é diferente.
            </p>
          </div>
          <div className="space-y-5 text-[1.02rem] leading-relaxed text-ink-2">
            <h2 className="eyebrow text-ink">Como funciona o atendimento</h2>
            <p>
              O pedido nasce numa conversa. Você diz a atividade, a quantidade aproximada e,
              no caso de calçado, a grade de numeração. A Tower responde com as opções, o
              Certificado de Aprovação (CA) de cada item e o que faz sentido para aquele
              risco.
            </p>
            <p>
              Prazo e frete são confirmados no orçamento, porque dependem do item e da
              quantidade. Prometer número em página é fácil; cumprir é que decide se o
              cliente volta.
            </p>
          </div>
        </div>
      </Secao>

      <BarraProva />

      <Secao className="wrap" ritmo="amplo">
        <h2 className="text-2xl sm:text-3xl">Por estado</h2>

        <div className="mt-10 space-y-14">
          {ESTADOS.map((e) => {
            const cidades = cidadesDoEstado(e.slug)
            return (
              <div key={e.slug} className="border-t-2 border-ink pt-7">
                <div className="grid gap-6 lg:grid-cols-[18rem_1fr] lg:gap-14">
                  <div>
                    <h3 className="text-xl sm:text-2xl">
                      <Link href={`/epi-por-cidade/${e.slug}/`} className="hover:text-tower-red">
                        {e.nome}
                      </Link>
                    </h3>
                    <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-2">{e.resumo}</p>
                    <Link
                      href={`/epi-por-cidade/${e.slug}/`}
                      className="mt-5 inline-flex items-center gap-2 border-b-2 border-tower-red pb-1 font-display text-sm font-bold hover:text-tower-red"
                    >
                      Ver o {e.nome} <IconeSeta />
                    </Link>
                  </div>

                  <ul className="grid border-t border-rule sm:grid-cols-2 sm:gap-x-10">
                    {e.slug === 'ceara' && (
                      <li className="border-b border-rule">
                        <Link href="/empresas/" className="block py-5 hover:bg-paper-2">
                          <h4 className="font-display text-base font-semibold">Fortaleza</h4>
                          <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-2">
                            A base da empresa desde {empresa.fundacao}. O atendimento da capital
                            está nas páginas por setor e por profissão.
                          </p>
                        </Link>
                      </li>
                    )}
                    {cidades.map((c) => (
                      <li key={c.slug} className="border-b border-rule">
                        <Link href={`/epi-por-cidade/${c.slug}/`} className="block py-5 hover:bg-paper-2">
                          <h4 className="font-display text-base font-semibold">{c.nome}</h4>
                          <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-2">
                            {c.resumo}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </Secao>

      <FechamentoCta
        contexto="epi-por-cidade"
        secao="hub-cidades"
        titulo="Não achou a sua cidade?"
        texto="Pergunte. A área de atendimento cresce quando faz sentido para os dois lados, e a resposta é rápida."
      />
    </>
  )
}

