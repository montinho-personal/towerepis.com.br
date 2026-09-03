import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { metadados } from '@/lib/seo'

import {
  CIDADES,
  ESTADOS,
  buscarCidade,
  buscarEstado,
  cidadesDoEstado,
} from '@/content/cidades'
import { empresa } from '@/config/empresa'
import {
  Trilha,
  CabecalhoPagina,
  EmUmaFrase,
  OQueObservar,
  ListaLinks,
  Perguntas,
  Secao,
  AssinaturaTecnica,
} from '@/components/Blocos'
import { FechamentoCta, CtaLinha } from '@/components/WhatsAppCta'
import { IconeSeta } from '@/components/Icones'
import { JsonLd, schemaFaq } from '@/lib/schema'

export const dynamicParams = false

/**
 * Uma rota resolve estado e cidade.
 *
 * `/epi-por-cidade/ceara/` e `/epi-por-cidade/barbalha-ce/` vivem no mesmo
 * nível porque foi assim que a arquitetura foi aprovada — e porque duas pastas
 * dinâmicas irmãs colidiriam. O slug decide qual das duas páginas renderiza:
 * cidade sempre termina em `-ce`, `-pi` ou `-rn`; estado, não.
 */
export function generateStaticParams() {
  return [...ESTADOS.map((e) => ({ slug: e.slug })), ...CIDADES.map((c) => ({ slug: c.slug }))]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cidade = buscarCidade(slug)
  if (cidade) {
    return metadados({
      titulo: cidade.titleSeo,
      descricao: cidade.descricaoSeo,
      canonical: `/epi-por-cidade/${cidade.slug}/`,
      absoluto: true,
    })
  }
  const estado = buscarEstado(slug)
  if (estado) {
    return metadados({
      titulo: estado.titleSeo,
      descricao: estado.descricaoSeo,
      canonical: `/epi-por-cidade/${estado.slug}/`,
      absoluto: true,
    })
  }
  return {}
}

export default async function PaginaLocal({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cidade = buscarCidade(slug)
  if (cidade) return <PaginaCidade slug={slug} />
  const estado = buscarEstado(slug)
  if (estado) return <PaginaEstado slug={slug} />
  notFound()
}

/* ------------------------------------------------------------------ ESTADO */

function PaginaEstado({ slug }: { slug: string }) {
  const e = buscarEstado(slug)!
  const cidades = cidadesDoEstado(e.slug)
  const outros = ESTADOS.filter((o) => o.slug !== e.slug)

  return (
    <>
      <Trilha
        tom="escuro"
        itens={[
          { nome: 'Onde atendemos', url: '/epi-por-cidade/' },
          { nome: e.nome, url: `/epi-por-cidade/${e.slug}/` },
        ]}
      />

      <CabecalhoPagina variante="ink" rotulo={`Onde atendemos · ${e.uf}`} titulo={e.h1} resumo={e.resumo} />

      <Secao className="wrap" ritmo="normal">
        <EmUmaFrase>{e.emUmaFrase}</EmUmaFrase>

        <div className="mt-12 max-w-2xl space-y-5 text-[1.05rem] leading-relaxed">
          <h2 className="eyebrow eyebrow-red">O que muda dentro do estado</h2>
          {e.contexto.map((p) => (
            <p key={p.slice(0, 30)}>{p}</p>
          ))}
        </div>
      </Secao>

      <Secao className="wrap" ritmo="normal">
        <h2 className="text-2xl sm:text-3xl">Cidades atendidas</h2>
        <div className="mt-8">
          <ListaLinks
            itens={[
              ...(e.slug === 'ceara'
                ? [
                    {
                      href: '/empresas/',
                      titulo: 'Fortaleza',
                      texto: `A base da Tower desde ${empresa.fundacao}. O atendimento da capital está nas páginas por setor e por profissão, que é onde a busca de Fortaleza chega.`,
                    },
                  ]
                : []),
              ...cidades.map((c) => ({
                href: `/epi-por-cidade/${c.slug}/`,
                titulo: c.nome,
                texto: c.resumo,
              })),
            ]}
          />
        </div>
      </Secao>

      <Secao className="wrap" ritmo="compacto">
        <h2 className="eyebrow">Outros estados</h2>
        <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-ink-2">
          A Tower também atende empresas{' '}
          {outros.map((o, i) => (
            <span key={o.slug}>
              {i > 0 && (i === outros.length - 1 ? ' e ' : ', ')}
              <Link href={`/epi-por-cidade/${o.slug}/`} className="underline underline-offset-4 hover:text-tower-red">
                {o.nome === 'Ceará' ? 'no Ceará' : `no ${o.nome}`}
              </Link>
            </span>
          ))}
          .
        </p>
      </Secao>

      <FechamentoCta
        contexto="epi-por-cidade"
        secao={`estado-${e.slug}`}
        titulo={`Precisa equipar uma equipe ${e.uf === 'CE' ? 'no Ceará' : e.uf === 'PI' ? 'no Piauí' : 'no Rio Grande do Norte'}?`}
        texto="Diga a atividade e a quantidade. A resposta vem com as opções e o CA de cada item."
      />
    </>
  )
}

/* ------------------------------------------------------------------ CIDADE */

function PaginaCidade({ slug }: { slug: string }) {
  const c = buscarCidade(slug)!
  const estado = buscarEstado(c.estado)!
  const irmas = cidadesDoEstado(c.estado).filter((o) => o.slug !== c.slug)

  return (
    <>
      <JsonLd dados={schemaFaq(c.perguntas)} />

      <Trilha
        itens={[
          { nome: 'Onde atendemos', url: '/epi-por-cidade/' },
          { nome: estado.nome, url: `/epi-por-cidade/${estado.slug}/` },
          { nome: c.nome, url: `/epi-por-cidade/${c.slug}/` },
        ]}
      />

      <CabecalhoPagina rotulo={`${c.nome} · ${c.uf}`} titulo={c.h1} resumo={c.resumo} />

      <Secao className="wrap" ritmo="compacto">
        <EmUmaFrase>{c.emUmaFrase}</EmUmaFrase>

        {/* Atalho cedo, para quem já sabe o que quer. */}
        <div className="mt-8">
          <CtaLinha
            contexto={c.contexto}
            secao="cidade-topo"
            mensagem={c.mensagemWhats}
            texto={`Já sabe o que precisa para a sua equipe em ${c.nome}?`}
            rotulo="Pedir orçamento pelo WhatsApp"
          />
        </div>
      </Secao>

      {/* O QUE ESTA CIDADE FAZ — a parte que nenhuma outra página repete. */}
      <Secao className="wrap" ritmo="normal">
        <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="min-w-0 max-w-2xl space-y-5 text-[1.05rem] leading-relaxed">
            <h2 className="text-2xl sm:text-3xl">
              O que se trabalha em {c.nome}
            </h2>
            {c.economia.map((p) => (
              <p key={p.slice(0, 30)}>{p}</p>
            ))}
          </div>
          <aside className="border-t border-rule pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <h3 className="eyebrow">Onde conferir</h3>
            <ul className="mt-4 space-y-3 text-[0.92rem] leading-relaxed">
              {c.fontes.map((f) => (
                <li key={f.url}>
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-tower-red"
                  >
                    {f.titulo}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.85rem] leading-relaxed text-ink-3">
              Fontes públicas, para o leitor conferir.
            </p>
          </aside>
        </div>
      </Secao>

      {/* ATIVIDADE LOCAL → EPI. É o cruzamento que dá valor à página, e por
          isso vai no grafite: é o trecho mais valioso, e não pode ter o mesmo
          peso visual do resto. */}
      <Secao className="band-ink">
        <div className="wrap">
          <OQueObservar
            titulo={`O EPI que essa rotina pede em ${c.nome}`}
            itens={c.oQuePede}
            tom="escuro"
          />
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-paper/60">
            Esta lista é orientativa. O que é obrigatório em cada função vem da avaliação de
            riscos da sua empresa, feita por profissional habilitado.
          </p>
        </div>
      </Secao>

      <Secao className="wrap" ritmo="normal">
        <CtaLinha
          contexto={c.contexto}
          secao="cidade-meio"
          mensagem={c.mensagemWhats}
          texto="Não sabe qual item atende a sua operação?"
          rotulo="Falar com um técnico de segurança"
        />
      </Secao>

      <Secao className="wrap" ritmo="normal">
        <h2 className="text-2xl sm:text-3xl">Os setores que {c.nome} aciona</h2>
        <div className="mt-8">
          <ListaLinks
            variante="simples"
            itens={c.setores.map((s) => ({ href: s.href, titulo: s.nome, texto: s.porque }))}
          />
        </div>
      </Secao>

      <Secao className="wrap" ritmo="normal">
        <h2 className="text-2xl sm:text-3xl">Antes de comprar, vale ler</h2>
        <div className="mt-8">
          <ListaLinks itens={c.guias} />
        </div>
      </Secao>

      {c.ondeNaoSomos && (
        <Secao className="wrap" ritmo="compacto">
          <div className="max-w-2xl border-l-4 border-tower-red bg-tower-red-soft px-6 py-5">
            <h2 className="eyebrow eyebrow-red">O que a Tower não faz</h2>
            <p className="mt-3 text-[1.02rem] leading-relaxed">{c.ondeNaoSomos}</p>
          </div>
        </Secao>
      )}

      <Secao className="wrap" ritmo="normal">
        <div className="max-w-2xl space-y-5 text-[1.05rem] leading-relaxed">
          <h2 className="text-2xl sm:text-3xl">Como o pedido chega de {c.nome}</h2>
          <p>{c.atendimento}</p>
          <p className="text-[0.95rem] text-ink-2">
            Prazo e frete são confirmados no orçamento, porque dependem do item e da
            quantidade.{' '}
            <Link href="/epi-por-cidade/" className="underline underline-offset-4 hover:text-tower-red">
              Como funciona o atendimento
            </Link>
            .
          </p>
        </div>
      </Secao>

      <Secao className="wrap" ritmo="normal">
        <Perguntas perguntas={c.perguntas} titulo={`Perguntas de quem é de ${c.nome}`} />
      </Secao>

      {irmas.length > 0 && (
        <Secao className="wrap" ritmo="compacto">
          <p className="max-w-2xl text-[1.02rem] leading-relaxed text-ink-2">
            A Tower também atende empresas em{' '}
            {irmas.map((o, i) => (
              <span key={o.slug}>
                {i > 0 && (i === irmas.length - 1 ? ' e ' : ', ')}
                <Link
                  href={`/epi-por-cidade/${o.slug}/`}
                  className="underline underline-offset-4 hover:text-tower-red"
                >
                  {o.nome}
                </Link>
              </span>
            ))}
            .{' '}
            <Link href="/epi-por-cidade/" className="inline-flex items-center gap-1.5 font-display text-sm font-semibold hover:text-tower-red">
              Ver todas as regiões <IconeSeta />
            </Link>
          </p>
        </Secao>
      )}

      <Secao className="wrap" ritmo="compacto">
        <AssinaturaTecnica atualizado="setembro de 2026" />
      </Secao>

      <FechamentoCta
        contexto={c.contexto}
        secao={`cidade-${c.slug}`}
        mensagem={c.mensagemWhats}
        publico="b2b"
        categoria={c.nome}
        titulo={`Equipar uma equipe em ${c.nome}`}
        texto="Conte qual é a atividade e o que você procura. A resposta vem com as opções e o CA de cada item."
      >
        <Link href="/orcamento/" className="btn btn-linha">
          Ver como funciona o orçamento
        </Link>
      </FechamentoCta>
    </>
  )
}
