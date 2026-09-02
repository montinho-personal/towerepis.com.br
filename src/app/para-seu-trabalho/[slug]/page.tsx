import type { Metadata } from 'next'
import { metadados } from '@/lib/seo'
import { notFound } from 'next/navigation'

import { PROFISSOES, buscarProfissao } from '@/content/profissoes'
import {
  Trilha,
  CabecalhoPagina,
  EmUmaFrase,
  OQueObservar,
  ListaLinks,
  LinksIrmaos,
  Perguntas,
  AssinaturaTecnica,
  Ponte,
  Secao,
} from '@/components/Blocos'
import { FechamentoCta, CtaLinha } from '@/components/WhatsAppCta'
import { JsonLd, schemaFaq } from '@/lib/schema'

export const dynamicParams = false

export function generateStaticParams() {
  return PROFISSOES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = buscarProfissao(slug)
  if (!p) return {}
  return metadados({ titulo: p.titleSeo, descricao: p.descricaoSeo, canonical: `/para-seu-trabalho/${p.slug}/` })
}

export default async function PaginaProfissao({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const p = buscarProfissao(slug)
  if (!p) notFound()

  return (
    <>
      <JsonLd dados={schemaFaq(p.perguntas)} />
      <Trilha
        itens={[
          { nome: 'Por profissão', url: '/para-seu-trabalho/' },
          { nome: p.nome, url: `/para-seu-trabalho/${p.slug}/` },
        ]}
      />

      <CabecalhoPagina rotulo={p.nome} titulo={p.h1} resumo={p.resumo} />

      {/* RECONHECIMENTO — provar entendimento ANTES de qualquer oferta.
          Se a pessoa não pensar "é exatamente o meu caso" nos primeiros
          segundos, nada do que vier depois é lido. */}
      <section className="wrap">
        <div className="border-y border-rule py-8">
          <h2 className="eyebrow">A rotina que a gente conhece</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {p.reconhecimento.map((item) => (
              <li key={item} className="flex gap-3 text-[0.98rem] leading-relaxed">
                <span className="mt-2.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-tower-red" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Secao className="wrap pb-0">
        <EmUmaFrase>{p.emUmaFrase}</EmUmaFrase>

        {/* Atalho para quem já se decidiu, sem obrigar a rolar a página
            inteira. Mesma mensagem contextual do bloco do fim. */}
        <div className="mt-10">
          <CtaLinha
            contexto={p.contexto}
            secao="profissao-topo"
            texto="Já sabe o que precisa? Fale direto com quem entende."
            rotulo="Falar no WhatsApp"
            publico="b2c"
            categoria={p.slug}
          />
        </div>
      </Secao>

      {/* O critério é a coisa mais valiosa da página e vinha em papel, no
          mesmo peso do resto. É o momento em que a Tower afirma — e é onde
          o grafite tem função. */}
      <Secao className="band-ink" ritmo="normal">
        <div className="wrap">
          <OQueObservar itens={p.oQueObservar} tom="escuro" />
        </div>
      </Secao>

      {/* Régua, não cards: estes itens não são destinos equivalentes, são o
          conjunto que a rotina costuma pedir — e em cards ficavam com o
          mesmo peso de qualquer outra grade do site. */}
      <Secao className="band" ritmo="normal">
        <div className="wrap">
          <h2 className="text-2xl sm:text-3xl">O que a Tower trabalha para essa rotina</h2>
          <p className="mt-4 measure text-ink-2">
            Sem preço e sem carrinho. O modelo certo depende de detalhes da sua rotina, e
            isso a gente resolve conversando.
          </p>
          <div className="mt-9">
            <ListaLinks itens={p.categorias} />
          </div>
        </div>
      </Secao>

      <Secao className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <Perguntas perguntas={p.perguntas} />
          <div className="space-y-6">
            <AssinaturaTecnica atualizado="agosto de 2026" />
            {p.ponteEmpresas && (
              <Ponte
                href={p.ponteEmpresas.href}
                rotulo="Compra para uma equipe?"
                texto={p.ponteEmpresas.texto}
              />
            )}

            {/* Quem chega aqui e não se reconhece na rotina descrita é
                exatamente quem a ferramenta serve. Ela tinha um único link de
                entrada no site inteiro. */}
            <Ponte
              href="/encontrar-epi/"
              rotulo="Sua rotina é diferente?"
              texto="Responda quatro perguntas e veja o que costuma merecer atenção no seu caso"
            />
          </div>
        </div>
      </Secao>

      <FechamentoCta
        contexto={p.contexto}
        secao="profissao-fechamento"
        titulo={p.ctaTitulo}
        texto={p.ctaTexto}
        rotulo="Ver opções no WhatsApp"
        publico="b2c"
        categoria={p.slug}
      />

      <LinksIrmaos
        rotulo="Outras profissões"
        itens={PROFISSOES.filter((o) => o.slug !== p.slug).map((o) => ({
          href: `/para-seu-trabalho/${o.slug}/`,
          nome: o.nome,
        }))}
        hub={{ href: '/para-seu-trabalho/', rotulo: 'Ver a proteção indicada para cada profissão' }}
      />
    </>
  )
}
