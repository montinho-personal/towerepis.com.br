import type { Metadata } from 'next'

/**
 * Construtor de metadados.
 *
 * Existe por causa de uma armadilha do Next: quando uma página define
 * `openGraph` próprio, ele SUBSTITUI o do layout — inclusive a imagem.
 * Na prática, as páginas mais compartilháveis do site (profissões e
 * artigos) ficavam sem imagem no card do WhatsApp, sem nenhum erro
 * visível. Centralizar aqui torna esse esquecimento impossível.
 */

const OG = {
  url: '/opengraph-image.png',
  width: 1200,
  height: 630,
  alt: "Tower EPI's — Proteção para o trabalho desde 1995. Equipamentos de proteção individual em Fortaleza, Ceará.",
}

export function metadados(dados: {
  titulo: string
  descricao: string
  canonical: string
  artigo?: { publicado: string; atualizado: string }
}): Metadata {
  return {
    title: dados.titulo,
    description: dados.descricao,
    alternates: { canonical: dados.canonical },
    openGraph: {
      title: dados.titulo,
      description: dados.descricao,
      url: dados.canonical,
      siteName: "Tower EPI's",
      locale: 'pt_BR',
      images: [OG],
      ...(dados.artigo
        ? {
            type: 'article' as const,
            publishedTime: dados.artigo.publicado,
            modifiedTime: dados.artigo.atualizado,
          }
        : { type: 'website' as const }),
    },
  }
}
