import type { Metadata } from 'next'
import { metadados } from '@/lib/seo'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { SETORES, buscarSetor } from '@/content/setores'
import {
  Trilha,
  CabecalhoPagina,
  OQueObservar,
  LinksIrmaos,
  Perguntas,
  Secao,
} from '@/components/Blocos'
import { FechamentoCta, CtaLinha } from '@/components/WhatsAppCta'
import { ComoAtendemos, ComQuemVoceFala, ErroCaro } from '@/components/BlocosB2B'
import { IconeSeta } from '@/components/Icones'
import { JsonLd, schemaFaq } from '@/lib/schema'

export const dynamicParams = false

export function generateStaticParams() {
  return SETORES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const s = buscarSetor(slug)
  if (!s) return {}
  return metadados({ titulo: s.titleSeo, descricao: s.descricaoSeo, canonical: `/empresas/${s.slug}/` })
}

export default async function PaginaSetor({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const s = buscarSetor(slug)
  if (!s) notFound()

  return (
    <>
      <JsonLd dados={schemaFaq(s.perguntas)} />
      <Trilha
        itens={[
          { nome: 'Para equipes', url: '/empresas/' },
          { nome: s.nome, url: `/empresas/${s.slug}/` },
        ]}
      />

      <CabecalhoPagina rotulo={`Para equipes · ${s.nome}`} titulo={s.h1} resumo={s.resumo} />

      {/* O problema DELE, antes do produto. */}
      <section className="wrap">
        <div className="border-y border-rule py-8">
          <p className="eyebrow">O que costuma complicar nesse setor</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {s.problemas.map((item) => (
              <li key={item} className="flex gap-3 text-[0.98rem] leading-relaxed">
                <span className="mt-2.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-tower-red" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Secao className="wrap">
        {/* Atalho cedo: o comprador B2B com pressa não deveria precisar
            percorrer a página toda para pedir. */}
        <CtaLinha
          contexto={s.contexto}
          secao="setor-topo"
          texto="Precisa de um orçamento para a sua equipe?"
          rotulo="Pedir pelo WhatsApp"
          publico="b2b"
          categoria={s.slug}
        />
        <div className="mt-14">
          <OQueObservar titulo="O que costuma ser necessário" itens={s.oQueCostuma} />
        </div>
        <p className="mt-6 max-w-2xl text-sm text-ink-3">
          Esta lista é orientativa. A definição do que é obrigatório em cada função vem
          da avaliação de riscos da sua empresa, feita por profissional habilitado.
        </p>
      </Secao>

      <ErroCaro />
      <ComoAtendemos />
      <ComQuemVoceFala />

      <Secao className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <Perguntas perguntas={s.perguntas} />
          {s.profissaoRelacionada && (
            <Link
              href={s.profissaoRelacionada.href}
              className="group flex h-fit items-center justify-between gap-6 border border-rule bg-paper-2 p-6 transition-colors hover:border-ink"
            >
              <div>
                <p className="eyebrow">Critério técnico</p>
                <p className="mt-2 font-display text-lg font-bold group-hover:text-tower-red">
                  {s.profissaoRelacionada.rotulo}
                </p>
              </div>
              <IconeSeta className="h-5 w-5 shrink-0 text-tower-red" />
            </Link>
          )}
        </div>
      </Secao>

      <FechamentoCta
        contexto={s.contexto}
        secao="setor-fechamento"
        titulo="Conte o que a sua equipe faz que a gente monta o orçamento."
        texto="Quantas pessoas são, o que elas fazem e para quando você precisa. Com isso já conseguimos indicar o que faz sentido e passar prazo e valor."
        rotulo="Solicitar orçamento"
        publico="b2b"
        categoria={s.slug}
      >
        <Link href="/orcamento/" className="btn btn-red btn-block">
          Montar o orçamento item a item
        </Link>
      </FechamentoCta>

      <LinksIrmaos
        rotulo="Outros setores"
        itens={SETORES.filter((o) => o.slug !== s.slug).map((o) => ({
          href: `/empresas/${o.slug}/`,
          nome: o.nome,
        }))}
      />
    </>
  )
}
