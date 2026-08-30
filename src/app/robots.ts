import type { MetadataRoute } from 'next'
import { empresa } from '@/config/empresa'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/politica-de-privacidade/'] }],
    sitemap: `${empresa.site}/sitemap.xml`,
    host: empresa.site,
  }
}
