import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PROFISSOES, buscarProfissao } from '@/content/profissoes'
import {
  Trilha,
  CabecalhoPagina,
  EmUmaFrase,
  OQueObservar,
  GradeLinks,
  Perguntas,
  AssinaturaTecnica,
  PonteEmpresas,
  Secao,
} from '@/components/Blocos'
import { BlocoCta } from '@/components/WhatsAppCta'
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
  return {
    title: p.titleSeo,
    description: p.descricaoSeo,
    alternates: { canonical: `/para-seu-trabalho/${p.slug}/` },
    openGraph: { title: p.titleSeo, description: p.descricaoSeo },
  }
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
          <p className="eyebrow">A rotina que a gente conhece</p>
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
      </Secao>

      <Secao className="wrap">
        <OQueObservar itens={p.oQueObservar} />
      </Secao>

      <Secao className="band">
        <div className="wrap">
          <h2 className="text-2xl sm:text-3xl">O que a Tower trabalha para essa rotina</h2>
          <p className="mt-4 measure text-ink-2">
            Sem preço e sem carrinho. O modelo certo depende de detalhes da sua rotina, e
            isso a gente resolve conversando.
          </p>
          <div className="mt-10">
            <GradeLinks itens={p.categorias} />
          </div>
        </div>
      </Secao>

      <Secao className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <Perguntas perguntas={p.perguntas} />
          <div className="space-y-6">
            <AssinaturaTecnica atualizado="agosto de 2026" />
            {p.ponteEmpresas && (
              <PonteEmpresas href={p.ponteEmpresas.href} texto={p.ponteEmpresas.texto} />
            )}
          </div>
        </div>
      </Secao>

      <Secao className="wrap pt-0">
        <BlocoCta
          contexto={p.contexto}
          secao="profissao-fechamento"
          titulo={p.ctaTitulo}
          texto={p.ctaTexto}
          rotulo="Ver opções no WhatsApp"
          publico="b2c"
          categoria={p.slug}
        />
      </Secao>

      <Secao className="wrap pt-0">
        <p className="eyebrow">Outras profissões</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {PROFISSOES.filter((o) => o.slug !== p.slug).map((o) => (
            <li key={o.slug}>
              <Link
                href={`/para-seu-trabalho/${o.slug}/`}
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
