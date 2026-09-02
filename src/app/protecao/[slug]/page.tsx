import type { Metadata } from 'next'
import { metadados } from '@/lib/seo'
import { notFound } from 'next/navigation'

import { PROTECOES, buscarProtecao } from '@/content/protecoes'
import {
  Trilha,
  CabecalhoPagina,
  EmUmaFrase,
  OQueObservar,
  ListaLinks,
  LinksIrmaos,
  Perguntas,
  AssinaturaTecnica,
  Secao,
} from '@/components/Blocos'
import { FechamentoCta, CtaLinha } from '@/components/WhatsAppCta'
import { JsonLd, schemaFaq } from '@/lib/schema'

export const dynamicParams = false

export function generateStaticParams() {
  return PROTECOES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = buscarProtecao(slug)
  if (!p) return {}
  return metadados({ titulo: p.titleSeo, descricao: p.descricaoSeo, canonical: `/protecao/${p.slug}/` })
}

export default async function PaginaProtecao({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const p = buscarProtecao(slug)
  if (!p) notFound()

  return (
    <>
      <JsonLd dados={schemaFaq(p.perguntas)} />
      <Trilha
        itens={[
          { nome: 'Proteção', url: '/protecao/' },
          { nome: p.nome, url: `/protecao/${p.slug}/` },
        ]}
      />

      <CabecalhoPagina rotulo={p.nome} titulo={p.h1} resumo={p.resumo} />

      <Secao className="wrap pt-0">
        <EmUmaFrase>{p.emUmaFrase}</EmUmaFrase>

        {/* Atalho para quem já se decidiu, sem obrigar a rolar a página
            inteira. Mesma mensagem contextual do bloco do fim. */}
        <div className="mt-10">
          <CtaLinha
            contexto={p.contexto}
            secao="protecao-topo"
            texto="Prefere perguntar direto? A gente responde com o que faz sentido para a sua atividade."
            rotulo="Falar no WhatsApp"
            categoria={p.slug}
          />
        </div>
      </Secao>

      {/* O critério em grafite: é o que a página tem de mais valioso e
          estava no mesmo peso visual do resto. */}
      <Secao className="band-ink">
        <div className="wrap">
          <OQueObservar itens={p.oQueObservar} tom="escuro" />
        </div>
      </Secao>

      {/* Travessia lateral, não conteúdo principal: em cards ocupava meia
          tela de celular e competia com o que a pessoa veio ler. */}
      <Secao className="band" ritmo="compacto">
        <div className="wrap">
          <h2 className="text-2xl sm:text-3xl">Onde essa proteção costuma ser usada</h2>
          <div className="mt-8">
            <ListaLinks itens={p.paraQuem} variante="simples" />
          </div>
        </div>
      </Secao>

      <Secao className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <Perguntas perguntas={p.perguntas} />
          <AssinaturaTecnica atualizado="agosto de 2026" />
        </div>
      </Secao>

      <FechamentoCta
        contexto={p.contexto}
        secao="protecao-fechamento"
        titulo={p.ctaTitulo}
        texto={p.ctaTexto}
        rotulo="Falar no WhatsApp"
        categoria={p.slug}
      />

      <LinksIrmaos
        rotulo="Outras partes do corpo"
        itens={[
          { href: '/calcados/', nome: 'Pés' },
          ...PROTECOES.filter((o) => o.slug !== p.slug).map((o) => ({
            href: `/protecao/${o.slug}/`,
            nome: o.parte,
          })),
        ]}
        hub={{ href: '/protecao/', rotulo: 'Ver todas as partes do corpo que exigem proteção' }}
      />
    </>
  )
}
