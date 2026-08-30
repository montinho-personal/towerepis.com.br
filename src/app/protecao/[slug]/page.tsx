import type { Metadata } from 'next'
import { metadados } from '@/lib/seo'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PROTECOES, buscarProtecao } from '@/content/protecoes'
import {
  Trilha,
  CabecalhoPagina,
  EmUmaFrase,
  OQueObservar,
  GradeLinks,
  Perguntas,
  AssinaturaTecnica,
  Secao,
} from '@/components/Blocos'
import { BlocoCta } from '@/components/WhatsAppCta'
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
      </Secao>

      <Secao className="wrap pt-0">
        <OQueObservar itens={p.oQueObservar} />
      </Secao>

      <Secao className="band">
        <div className="wrap">
          <h2 className="text-2xl sm:text-3xl">Onde essa proteção costuma ser usada</h2>
          <div className="mt-10">
            <GradeLinks itens={p.paraQuem} />
          </div>
        </div>
      </Secao>

      <Secao className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <Perguntas perguntas={p.perguntas} />
          <AssinaturaTecnica atualizado="agosto de 2026" />
        </div>
      </Secao>

      <Secao className="wrap pt-0">
        <BlocoCta
          contexto={p.contexto}
          secao="protecao-fechamento"
          titulo={p.ctaTitulo}
          texto={p.ctaTexto}
          rotulo="Falar no WhatsApp"
          categoria={p.slug}
        />
      </Secao>

      <Secao className="wrap pt-0">
        <p className="eyebrow">Outras partes do corpo</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          <li>
            <Link
              href="/calcados/"
              className="inline-block border border-rule-strong px-4 py-3 font-display text-[0.8rem] font-semibold transition-colors hover:border-ink hover:bg-paper-2"
            >
              Pés
            </Link>
          </li>
          {PROTECOES.filter((o) => o.slug !== p.slug).map((o) => (
            <li key={o.slug}>
              <Link
                href={`/protecao/${o.slug}/`}
                className="inline-block border border-rule-strong px-4 py-3 font-display text-[0.8rem] font-semibold transition-colors hover:border-ink hover:bg-paper-2"
              >
                {o.parte}
              </Link>
            </li>
          ))}
        </ul>
      </Secao>
    </>
  )
}
