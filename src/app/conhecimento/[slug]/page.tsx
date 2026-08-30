import type { Metadata } from 'next'
import { metadados } from '@/lib/seo'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ARTIGOS, buscarArtigo, type Bloco } from '@/content/artigos'
import { Trilha, AssinaturaTecnica, Secao } from '@/components/Blocos'
import { FechamentoCta } from '@/components/WhatsAppCta'
import { IconeSeta } from '@/components/Icones'
import { JsonLd, schemaArtigo } from '@/lib/schema'

export const dynamicParams = false

export function generateStaticParams() {
  return ARTIGOS.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const a = buscarArtigo(slug)
  if (!a) return {}
  return metadados({
    titulo: a.tituloSeo,
    descricao: a.descricaoSeo,
    canonical: `/conhecimento/${a.slug}/`,
    artigo: { publicado: a.publicado, atualizado: a.atualizado },
  })
}

/** `texto` pode conter <strong> e <em> vindos do conteúdo controlado em src/content. */
function Renderizar({ bloco }: { bloco: Bloco }) {
  switch (bloco.tipo) {
    case 'h2':
      return <h2>{bloco.texto}</h2>
    case 'h3':
      return <h3>{bloco.texto}</h3>
    case 'p':
      return <p dangerouslySetInnerHTML={{ __html: bloco.texto }} />
    case 'lista':
      return (
        <ul>
          {bloco.itens.map((i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: i }} />
          ))}
        </ul>
      )
    case 'destaque':
      return (
        <div className="border-l-4 border-tower-red bg-tower-red-soft px-6 py-5 not-prose">
          <p className="eyebrow eyebrow-red">Em uma frase</p>
          <p className="mt-2 text-lg leading-relaxed">{bloco.texto}</p>
        </div>
      )
    case 'tabela':
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[0.95rem]">
            <thead>
              <tr className="border-b-2 border-ink">
                {bloco.cabecalho.map((c) => (
                  <th key={c} className="py-3 pr-5 font-display text-sm font-bold align-bottom">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bloco.linhas.map((linha, i) => (
                <tr key={i} className="border-b border-rule">
                  {linha.map((celula, j) => (
                    <td
                      key={j}
                      className={`py-3 pr-5 align-top ${j === 0 ? 'font-semibold' : 'text-ink-2'}`}
                    >
                      {celula}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

export default async function Artigo({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = buscarArtigo(slug)
  if (!a) notFound()

  const relacionados = ARTIGOS.filter((o) => o.slug !== a.slug).slice(0, 3)

  return (
    <>
      <JsonLd
        dados={schemaArtigo({
          titulo: a.titulo,
          descricao: a.descricaoSeo,
          url: `/conhecimento/${a.slug}/`,
          publicado: a.publicado,
          atualizado: a.atualizado,
        })}
      />
      <Trilha
        itens={[
          { nome: 'Conhecimento', url: '/conhecimento/' },
          { nome: a.titulo, url: `/conhecimento/${a.slug}/` },
        ]}
      />

      <article>
        <header className="wrap pt-8 pb-12 sm:pt-12">
          <p className="eyebrow eyebrow-red">{a.cluster}</p>
          <h1 className="mt-4 max-w-4xl text-3xl sm:text-4xl lg:text-5xl">{a.titulo}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{a.resumo}</p>
          <p className="mt-6 text-xs text-ink-3">
            Revisado por{' '}
            <Link href="/a-tower/helano/" className="underline underline-offset-4">
              Helano, técnico de segurança do trabalho
            </Link>{' '}
            · {a.atualizadoExibicao}
          </p>
        </header>

        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
            <div className="prose-tower max-w-2xl">
              {a.blocos.map((bloco, i) => (
                <Renderizar key={i} bloco={bloco} />
              ))}

              <h2>Fontes</h2>
              <ul>
                {a.fontes.map((f) => (
                  <li key={f.url}>
                    <a href={f.url} target="_blank" rel="noopener noreferrer">
                      {f.titulo}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-ink-3">
                Este texto tem finalidade informativa e orienta a escolha de equipamentos
                de proteção. Não substitui a avaliação de riscos do ambiente de trabalho,
                que deve ser feita por profissional habilitado quando necessária.
              </p>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <AssinaturaTecnica atualizado={a.atualizadoExibicao} />

              {/* Todo artigo linka para EXATAMENTE UMA página comercial.
                  Mais de uma dispersa; nenhuma desperdiça o tráfego. */}
              <Link
                href={a.paginaComercial.href}
                className="group flex items-center justify-between gap-4 border border-ink bg-paper p-6 transition-colors hover:bg-paper-2"
              >
                <div>
                  <p className="eyebrow">Na Tower</p>
                  <p className="mt-2 font-display text-lg font-bold group-hover:text-tower-red">
                    {a.paginaComercial.rotulo}
                  </p>
                </div>
                <IconeSeta className="h-5 w-5 shrink-0 text-tower-red" />
              </Link>
            </aside>
          </div>
        </div>
      </article>

      {/* CTA que nasce da intenção do artigo — nunca um "entre em contato".
          O artigo é a página mais longa e mais branca do site: terminar em
          grafite é o que separa o texto do que vem depois dele. */}
      <FechamentoCta
        contexto={a.contexto}
        secao="artigo-fechamento"
        titulo={a.ctaTitulo}
        texto={a.ctaTexto}
        rotulo="Falar no WhatsApp"
        categoria={a.cluster}
        mensagem={a.mensagemWhats}
      />

      <Secao className="band" ritmo="compacto">
        <div className="wrap">
          <h2 className="eyebrow">Continue lendo</h2>
          <ul className="mt-6 border-t-2 border-ink">
            {relacionados.map((o) => (
              <li key={o.slug} className="border-b border-rule">
                <Link
                  href={`/conhecimento/${o.slug}/`}
                  className="block py-6 font-display text-lg font-bold transition-colors hover:text-tower-red"
                >
                  {o.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Secao>
    </>
  )
}
