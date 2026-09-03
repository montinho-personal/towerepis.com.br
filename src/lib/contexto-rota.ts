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
  '/marcas/bompel/': {
    contexto: 'marcas',
    mensagem:
      'Olá! Vim pelo site da Tower. Vi a página da Bompel e gostaria de um orçamento da linha para a minha equipe.',
  },
  // 3M entra como consulta, nunca como promessa de estoque: a página trata a
  // 3M como história da Tower, e a mensagem não pode prometer o que a página
  // não promete.
  '/marcas/3m/': {
    contexto: 'marcas',
    mensagem:
      'Olá! Vim pelo site da Tower. Preciso de proteção respiratória e gostaria de consultar o que vocês têm disponível.',
  },
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
    // O estado entra pelo nome. Sem isso as três páginas de estado mandavam a
    // mesma frase do hub — "vocês atendem a minha cidade?" — e a Tower recebia
    // de volta menos contexto do que a página tinha acabado de dar.
    ESTADOS.map((e) => [
      `/epi-por-cidade/${e.slug}/`,
      {
        contexto: 'epi-por-cidade' as const,
        mensagem: `Olá! Vim pelo site da Tower. Tenho uma equipe ${e.uf === 'CE' ? 'no Ceará' : e.uf === 'PI' ? 'no Piauí' : 'no Rio Grande do Norte'} e gostaria de um orçamento de EPI.`,
      },
    ]),
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
