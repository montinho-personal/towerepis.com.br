import type { ContextoWhatsApp } from './whatsapp'
import { PROFISSOES } from '@/content/profissoes'
import { PROTECOES } from '@/content/protecoes'
import { CALCADOS } from '@/content/calcados'
import { SETORES } from '@/content/setores'
import { ARTIGOS } from '@/content/artigos'
import { CIDADES, ESTADOS } from '@/content/cidades'

/**
 * Descobre o contexto de WhatsApp a partir da rota.
 *
 * Existe por causa de um vazamento silencioso: o botão flutuante é o
 * caminho mais usado no celular, e mandava a mesma mensagem genérica de
 * qualquer página. Alguém lia a página de indústria inteira, tocava no
 * verde, e a Tower recebia "gostaria de falar com vocês" — perdendo todo
 * o contexto que o site tinha acabado de construir.
 *
 * O mapa é derivado do próprio conteúdo. Uma profissão nova entra aqui
 * sozinha, sem ninguém precisar lembrar de atualizar uma lista paralela.
 */
type Destino = { contexto: ContextoWhatsApp; mensagem?: string }

const MAPA: Record<string, Destino> = {
  '/': { contexto: 'home' },
  '/calcados/': { contexto: 'calcados' },
  '/calcados/comparativo/': { contexto: 'calcados-comparativo' },
  '/protecao/': { contexto: 'home' },
  '/para-seu-trabalho/': { contexto: 'home' },
  '/empresas/': { contexto: 'empresas' },
  '/empresas/como-atendemos/': { contexto: 'empresas' },
  '/orcamento/': { contexto: 'orcamento' },
  '/encontrar-epi/': { contexto: 'ferramenta' },
  '/marcas/': { contexto: 'marcas' },
  '/marcas/bompel/': { contexto: 'marcas' },
  '/marcas/3m/': { contexto: 'marcas' },
  '/a-tower/': { contexto: 'historia' },
  '/a-tower/helano/': { contexto: 'historia' },
  '/conhecimento/': { contexto: 'artigo' },
  '/epi-por-cidade/': { contexto: 'epi-por-cidade' },
  '/contato/': { contexto: 'contato' },
  // A cidade acompanha o botão flutuante: quem lê a página de Teresina e
  // toca no verde chega dizendo que é de Teresina.
  ...Object.fromEntries(
    CIDADES.map((c) => [`/epi-por-cidade/${c.slug}/`, { contexto: c.contexto, mensagem: c.mensagemWhats }]),
  ),
  ...Object.fromEntries(
    ESTADOS.map((e) => [`/epi-por-cidade/${e.slug}/`, { contexto: 'epi-por-cidade' as const }]),
  ),
  ...Object.fromEntries(PROFISSOES.map((p) => [`/para-seu-trabalho/${p.slug}/`, { contexto: p.contexto }])),
  ...Object.fromEntries(PROTECOES.map((p) => [`/protecao/${p.slug}/`, { contexto: p.contexto }])),
  ...Object.fromEntries(CALCADOS.map((c) => [`/calcados/${c.slug}/`, { contexto: c.contexto }])),
  ...Object.fromEntries(SETORES.map((s) => [`/empresas/${s.slug}/`, { contexto: s.contexto }])),
  ...Object.fromEntries(
    ARTIGOS.map((a) => [
      `/conhecimento/${a.slug}/`,
      { contexto: a.contexto, mensagem: a.mensagemWhats },
    ]),
  ),
}

export function destinoDaRota(pathname: string): Destino {
  const rota = pathname.endsWith('/') ? pathname : `${pathname}/`
  return MAPA[rota] ?? { contexto: 'flutuante' }
}
