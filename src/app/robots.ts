import type { MetadataRoute } from 'next'
import { empresa } from '@/config/empresa'

export default function robots(): MetadataRoute.Robots {
  return {
    // Nada bloqueado. A política de privacidade estava em disallow, o que é o
    // oposto do que ela existe para fazer: um documento de transparência
    // precisa ser encontrável.
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${empresa.site}/sitemap.xml`,
    host: empresa.site,
  }
}
