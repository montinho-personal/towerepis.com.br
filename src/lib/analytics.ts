/**
 * Mensuração.
 *
 * A pergunta do negócio não é "quantas visitas o site teve?", é
 * "qual conteúdo gera conversa no WhatsApp?".
 *
 * Por isso todo evento carrega origem e contexto. Sem provedor configurado,
 * as funções são no-op — o site funciona igual.
 */

type Params = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function enviar(evento: string, params: Params = {}) {
  if (typeof window === 'undefined') return
  const limpos = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== ''),
  )
  window.dataLayer?.push({ event: evento, ...limpos })
  window.gtag?.('event', evento, limpos)
}

/** Evento central do projeto. */
export function rastrearWhatsApp(params: {
  contexto: string
  pagina: string
  secao: string
  publico?: 'b2b' | 'b2c'
  categoria?: string
}) {
  enviar('whatsapp_click', params)
}

export const rastrearCta = (nome: string, pagina: string) =>
  enviar('cta_click', { nome, pagina })

export const rastrearFormIniciado = (form: string) =>
  enviar('form_iniciado', { form })

export const rastrearFormConcluido = (form: string, params: Params = {}) =>
  enviar('form_concluido', { form, ...params })

export const rastrearFerramenta = (etapa: string, resposta?: string) =>
  enviar('ferramenta_etapa', { etapa, resposta })

export const rastrearFerramentaConcluida = (perfil: string) =>
  enviar('ferramenta_concluida', { perfil })
