/**
 * Mensuração.
 *
 * A pergunta do negócio não é "quantas visitas o site teve?", é
 * "qual conteúdo gera conversa no WhatsApp?".
 *
 * Por isso todo evento carrega origem e contexto. Sem provedor configurado,
 * as funções são no-op — o site funciona igual.
 *
 * LGPD. O provedor é o GA4, e ele só existe com aceite. As três condições que
 * este comentário exigia antes de qualquer medição ir ao ar foram cumpridas:
 *
 *   1. banner de consentimento com aceitar e recusar no mesmo peso visual,
 *      sem caixa pré-marcada — `components/Medicao.tsx`;
 *   2. Consent Mode v2 negado por padrão, e o gtag.js sequer é baixado antes
 *      do aceite — `lib/consentimento.ts`;
 *   3. /politica-de-cookies/ com a tabela real e /politica-de-privacidade/
 *      descrevendo o tratamento.
 *
 * NENHUM EVENTO SAI SEM ACEITE. A checagem abaixo é a terceira tranca, depois
 * de o script não carregar e de o Consent Mode negar. Parece redundante e é:
 * a que vai salvar é justamente a que ninguém lembrar de remover junto com as
 * outras duas no dia de uma refatoração apressada.
 *
 * Verificador: docs/ferramentas/qa-privacidade.mjs — roda as duas trilhas,
 * antes e depois do aceite.
 */

import { lerConsentimento } from './consentimento'

type Params = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function enviar(evento: string, params: Params = {}) {
  if (typeof window === 'undefined') return
  if (lerConsentimento() !== 'aceito') return
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

/**
 * Barra contextual. Três eventos, e todos carregam a frase exibida — é ela
 * que a gente vai querer comparar quando existir Search Console e teste A/B.
 */
export const rastrearBarra = (
  evento: 'barra_exibida' | 'barra_clique' | 'barra_fechada',
  params: { pagina: string; chamada: string },
) =>
  enviar(evento, {
    ...params,
    dispositivo: typeof window !== 'undefined' && window.innerWidth < 640 ? 'celular' : 'desktop',
    scroll:
      typeof window !== 'undefined'
        ? Math.round(
            (window.scrollY /
              Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) *
              100,
          )
        : undefined,
  })

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
