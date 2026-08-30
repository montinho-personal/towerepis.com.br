import type { Metadata } from 'next'
import { metadados } from '@/lib/seo'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CALCADOS, buscarCalcado } from '@/content/calcados'
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
} from './Blocos'
import { FechamentoCta, CtaLinha } from './WhatsAppCta'
import { JsonLd, schemaFaq } from '@/lib/schema'

export function metadataCalcado(slug: string): Metadata {
  const c = buscarCalcado(slug)
  if (!c) return {}
  return metadados({
    titulo: c.titleSeo,
    descricao: c.descricaoSeo,
    canonical: `/calcados/${c.slug}/`,
  })
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

        {/* Atalho para quem já se decidiu, sem obrigar a rolar a página
            inteira. Mesma mensagem contextual do bloco do fim. */}
        <div className="mt-10">
          <CtaLinha
            contexto={c.contexto}
            secao="calcado-topo"
            texto="Quer ajuda para escolher o modelo certo para a sua rotina?"
            rotulo="Ver opções no WhatsApp"
            categoria={c.slug}
          />
        </div>
      </Secao>

      {/* Calçado é a categoria que mais gera dúvida no WhatsApp da Tower.
          O critério é a resposta, e merece a superfície que afirma. */}
      <Secao className="band-ink">
        <div className="wrap">
          <OQueObservar itens={c.oQueObservar} tom="escuro" />
        </div>
      </Secao>

      <Secao className="band" ritmo="compacto">
        <div className="wrap">
          <h2 className="text-2xl sm:text-3xl">Quem costuma usar</h2>
          <div className="mt-8">
            <ListaLinks itens={c.paraQuem} variante="simples" />
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

      <FechamentoCta
        contexto={c.contexto}
        secao="calcado-fechamento"
        titulo={c.ctaTitulo}
        texto={c.ctaTexto}
        rotulo="Ver opções no WhatsApp"
        categoria={c.slug}
      />

      <LinksIrmaos
        rotulo="Outros tipos"
        itens={CALCADOS.filter((o) => o.slug !== c.slug).map((o) => ({
          href: `/calcados/${o.slug}/`,
          nome: o.nome,
        }))}
      />
    </>
  )
}
