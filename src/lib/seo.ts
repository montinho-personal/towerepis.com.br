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
  /**
   * Emite o título sem o sufixo de marca do template.
   *
   * O template acrescenta " · Tower EPI's" — 14 caracteres — a toda página.
   * Em consulta local comercial, esses caracteres valem mais carregando "em
   * Fortaleza": a marca já está na URL, logo acima do título, e no perfil do
   * Google. Nas páginas navegacionais e informacionais o sufixo fica, porque
   * ali ele ajuda o reconhecimento e não disputa espaço com termo nenhum.
   */
  absoluto?: boolean
  /**
   * Imagem própria do card de compartilhamento. Sem ela, todo link do site
   * chega no WhatsApp com o mesmo selo — e o card do artigo passa a valer o
   * mesmo que o da home. Com ela, a prévia mostra o assunto do texto.
   */
  imagem?: { url: string; alt: string }
}): Metadata {
  return {
    title: dados.absoluto ? { absolute: dados.titulo } : dados.titulo,
    description: dados.descricao,
    alternates: { canonical: dados.canonical },
    openGraph: {
      title: dados.titulo,
      description: dados.descricao,
      url: dados.canonical,
      siteName: "Tower EPI's",
      locale: 'pt_BR',
      images: [dados.imagem ? { ...dados.imagem, width: 1200, height: 630 } : OG],
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
