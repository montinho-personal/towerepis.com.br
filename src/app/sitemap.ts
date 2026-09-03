import type { MetadataRoute } from 'next'
import { empresa } from '@/config/empresa'
import { PROFISSOES } from '@/content/profissoes'
import { PROTECOES } from '@/content/protecoes'
import { CALCADOS } from '@/content/calcados'
import { SETORES } from '@/content/setores'
import { ARTIGOS } from '@/content/artigos'
import { CIDADES, ESTADOS } from '@/content/cidades'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = empresa.site
  const hoje = new Date()

  const url = (caminho: string, priority: number, changeFrequency: 'weekly' | 'monthly') => ({
    url: `${base}${caminho}`,
    lastModified: hoje,
    changeFrequency,
    priority,
  })

  return [
    url('/', 1, 'weekly'),
    url('/orcamento/', 0.95, 'monthly'),
    url('/calcados/', 0.9, 'monthly'),
    url('/calcados/comparativo/', 0.9, 'monthly'),
    ...CALCADOS.map((c) => url(`/calcados/${c.slug}/`, 0.8, 'monthly')),
    url('/protecao/', 0.8, 'monthly'),
    ...PROTECOES.map((p) => url(`/protecao/${p.slug}/`, 0.7, 'monthly')),
    url('/para-seu-trabalho/', 0.9, 'monthly'),
    ...PROFISSOES.map((p) => url(`/para-seu-trabalho/${p.slug}/`, 0.8, 'monthly')),
    url('/empresas/', 0.9, 'monthly'),
    url('/empresas/como-atendemos/', 0.7, 'monthly'),
    ...SETORES.map((s) => url(`/empresas/${s.slug}/`, 0.8, 'monthly')),
    url('/encontrar-epi/', 0.7, 'monthly'),
    url('/marcas/', 0.7, 'monthly'),
    url('/marcas/bompel/', 0.8, 'monthly'),
    url('/marcas/3m/', 0.6, 'monthly'),
    url('/a-tower/', 0.8, 'monthly'),
    url('/a-tower/helano/', 0.7, 'monthly'),
    url('/conhecimento/', 0.8, 'weekly'),
    ...ARTIGOS.map((a) => ({
      url: `${base}/conhecimento/${a.slug}/`,
      lastModified: new Date(a.atualizado),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    url('/epi-por-cidade/', 0.9, 'monthly'),
    ...ESTADOS.map((e) => url(`/epi-por-cidade/${e.slug}/`, 0.75, 'monthly')),
    ...CIDADES.map((c) => url(`/epi-por-cidade/${c.slug}/`, 0.85, 'monthly')),
    url('/contato/', 0.8, 'monthly'),
  ]
}
