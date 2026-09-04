import type { Metadata } from 'next'
import { metadados } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ARTIGOS, buscarArtigo, type Bloco } from '@/content/artigos'
import { Trilha, AssinaturaTecnica, Perguntas, Secao } from '@/components/Blocos'
import { FechamentoCta } from '@/components/WhatsAppCta'
import { IconeSeta } from '@/components/Icones'
import { JsonLd, schemaArtigo, schemaFaq } from '@/lib/schema'
import { Ampliar } from '@/components/Ampliar'

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
    ...(a.imagem
      ? { imagem: { url: `/fotos/artigos/${a.slug}-og.jpg`, alt: a.imagem.alt } }
      : {}),
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
          {/* h2, e não p: é a resposta direta do artigo. Ficou de fora do Lote
              1 porque o artigo renderiza por outro caminho. */}
          <h2 className="eyebrow eyebrow-red">Em uma frase</h2>
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

  // Antes isto era `.slice(0, 3)` sobre a lista inteira: os três primeiros
  // artigos apareciam em todos os outros, sempre os mesmos. O resultado
  // medido foi desigual — o texto sobre solado recebia 4 links e o da NR-6
  // recebia 5, enquanto os do topo da lista recebiam 7.
  //
  // Agora: mesmo cluster primeiro, porque é o que o leitor daquele assunto
  // quer a seguir; o resto entra girando a partir da posição do artigo
  // atual, o que distribui os links por igual sem precisar de tabela.
  const indice = ARTIGOS.findIndex((o) => o.slug === a.slug)
  const giro = ARTIGOS.map((_, i) => ARTIGOS[(indice + 1 + i) % ARTIGOS.length]).filter(
    (o) => o.slug !== a.slug,
  )
  const relacionados = [
    ...giro.filter((o) => o.cluster === a.cluster),
    ...giro.filter((o) => o.cluster !== a.cluster),
  ].slice(0, 3)

  return (
    <>
      <JsonLd
        dados={[
          schemaArtigo({
            titulo: a.titulo,
            descricao: a.descricaoSeo,
            url: `/conhecimento/${a.slug}/`,
            publicado: a.publicado,
            atualizado: a.atualizado,
            imagem: a.imagem ? `/fotos/artigos/${a.slug}.webp` : undefined,
          }),
          // Só é emitido porque as perguntas estão visíveis na página, logo
          // abaixo do texto. FAQPage sem a resposta no HTML é dado estruturado
          // que não corresponde à página.
          schemaFaq(a.perguntas),
        ]}
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

        {/* A capa vem depois do título, não antes: o leitor chegou por uma
            dúvida, e o que responde a dúvida é o texto. A imagem é o maior
            elemento da tela, então carrega com `priority` — ela é o LCP. */}
        {a.imagem && (
          <figure className="wrap mb-12 min-w-0">
            {/* A capa é um infográfico: tem texto dentro. No celular ele fica
                em corpo ilegível, então a imagem abre ampliada ao toque. */}
            <Ampliar src={`/fotos/artigos/${a.slug}.webp`} alt={a.imagem.alt} larguraReal={1536}>
              <Image
                src={`/fotos/artigos/${a.slug}.webp`}
                alt={a.imagem.alt}
                width={1536}
                height={1024}
                priority
                sizes="(min-width: 1320px) 1200px, 92vw"
                className="h-auto w-full max-w-full border border-rule"
              />
            </Ampliar>
          </figure>
        )}

        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
            {/* `min-w-0`: item de grade tem `min-width: auto`, então a tabela
                comparativa — mesmo dentro do seu próprio `overflow-x-auto` —
                empurrava a coluna inteira para além da tela em 320px. */}
            <div className="min-w-0">
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

            {/* Fora do `.prose-tower` de propósito: o h2 do texto corrido tem
                régua em cima e escala própria, e o bloco de perguntas tem a
                sua. Dentro, um cancelaria o outro. */}
            <div className="mt-14 max-w-2xl border-t-2 border-ink pt-8">
              <Perguntas perguntas={a.perguntas} nome={`faq-${a.slug}`} />
            </div>
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

          {/* Volta ao índice do cluster: sem isto, a autoridade dos artigos
              só corria de lado. */}
          <p className="mt-6">
            <Link
              href="/conhecimento/"
              className="inline-flex items-center gap-2 font-display text-[0.95rem] font-bold transition-colors hover:text-tower-red"
            >
              Ver todos os textos da central de conhecimento
              <IconeSeta className="h-4 w-4 text-tower-red" />
            </Link>
          </p>
        </div>
      </Secao>
    </>
  )
}
