/**
 * Mensuração.
 *
 * A pergunta do negócio não é "quantas visitas o site teve?", é
 * "qual conteúdo gera conversa no WhatsApp?".
 *
 * Por isso todo evento carrega origem e contexto. Sem provedor configurado,
 * as funções são no-op — o site funciona igual.
 *
 * ATENÇÃO, LGPD. Hoje NÃO existe provedor configurado, e o site não grava
 * cookie nenhum — foi medido, e as páginas legais afirmam isso por escrito.
 * No dia em que alguém ligar GA4, GTM ou pixel aqui, três coisas passam a
 * ser necessárias ANTES de a ferramenta ir ao ar:
 *
 *   1. banner de consentimento com aceitar, recusar e configurar no mesmo
 *      peso visual, sem caixa pré-marcada;
 *   2. Google Consent Mode v2 negado por padrão (analytics_storage,
 *      ad_storage, ad_user_data, ad_personalization);
 *   3. /politica-de-cookies/ com a tabela real e /politica-de-privacidade/
 *      descrevendo o tratamento — as duas hoje dizem que não existe.
 *
 * Ligar a medição sem isso torna dois documentos legais falsos.
 * Verificador: docs/ferramentas/qa-privacidade.mjs
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
