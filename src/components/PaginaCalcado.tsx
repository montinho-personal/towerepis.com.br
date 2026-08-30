import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CALCADOS, buscarCalcado } from '@/content/calcados'
import {
  Trilha,
  CabecalhoPagina,
  EmUmaFrase,
  OQueObservar,
  GradeLinks,
  Perguntas,
  AssinaturaTecnica,
  Secao,
} from './Blocos'
import { BlocoCta } from './WhatsAppCta'
import { JsonLd, schemaFaq } from '@/lib/schema'

export function metadataCalcado(slug: string): Metadata {
  const c = buscarCalcado(slug)
  if (!c) return {}
  return {
    title: c.titleSeo,
    description: c.descricaoSeo,
    alternates: { canonical: `/calcados/${c.slug}/` },
    openGraph: { title: c.titleSeo, description: c.descricaoSeo },
  }
}

export function PaginaCalcado({ slug }: { slug: string }) {
  const c = buscarCalcado(slug)
  if (!c) notFound()

  return (
    <>
      <JsonLd dados={schemaFaq(c.perguntas)} />
      <Trilha
        itens={[
          { nome: 'Calçados', url: '/calcados/' },
          { nome: c.nome, url: `/calcados/${c.slug}/` },
        ]}
      />

      <CabecalhoPagina rotulo="Calçados" titulo={c.h1} resumo={c.resumo} />

      <Secao className="wrap pt-0">
        <EmUmaFrase>{c.emUmaFrase}</EmUmaFrase>
      </Secao>

      <Secao className="wrap pt-0">
        <OQueObservar itens={c.oQueObservar} />
      </Secao>

      <Secao className="band">
        <div className="wrap">
          <h2 className="text-2xl sm:text-3xl">Quem costuma usar</h2>
          <div className="mt-10">
            <GradeLinks itens={c.paraQuem} />
          </div>
        </div>
      </Secao>

      <Secao className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <Perguntas perguntas={c.perguntas} />
          <div className="space-y-6">
            <AssinaturaTecnica atualizado="agosto de 2026" />
            <Link
              href="/calcados/comparativo/"
              className="block border border-rule bg-paper-2 p-6 transition-colors hover:border-ink"
            >
              <p className="eyebrow">Antes de decidir</p>
              <p className="mt-2 font-display text-lg font-bold">
                Entenda a diferença entre ocupacional e de segurança →
              </p>
            </Link>
          </div>
        </div>
      </Secao>

      <Secao className="wrap pt-0">
        <BlocoCta
          contexto={c.contexto}
          secao="calcado-fechamento"
          titulo={c.ctaTitulo}
          texto={c.ctaTexto}
          rotulo="Ver opções no WhatsApp"
          categoria={c.slug}
        />
      </Secao>

      <Secao className="wrap pt-0">
        <p className="eyebrow">Outros tipos</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {CALCADOS.filter((o) => o.slug !== c.slug).map((o) => (
            <li key={o.slug}>
              <Link
                href={`/calcados/${o.slug}/`}
                className="inline-block border border-rule-strong px-4 py-3 font-display text-[0.8rem] font-semibold transition-colors hover:border-ink hover:bg-paper-2"
              >
                {o.nome}
              </Link>
            </li>
          ))}
        </ul>
      </Secao>
    </>
  )
}
