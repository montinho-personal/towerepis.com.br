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

export const rastrearFerramenta = (etapa: string, resposta?: string, ferramenta?: string) =>
  enviar('ferramenta_etapa', { etapa, resposta, ferramenta })

export const rastrearFerramentaConcluida = (perfil: string, ferramenta?: string) =>
  enviar('ferramenta_concluida', { perfil, ferramenta })

/**
 * Funil da ferramenta "Qual calçado usar".
 *
 * Os nomes seguem a convenção em português do restante da propriedade —
 * misturar `tool_start` com `whatsapp_click` fragmentaria o relatório em
 * duas famílias. O funil que o GA4 vai montar:
 *
 *   page_view -> ferramenta_iniciada -> ferramenta_metade ->
 *   ferramenta_concluida -> ferramenta_resultado -> whatsapp_click
 *
 * `ferramenta_resultado` leva a família recomendada, e não as respostas
 * uma a uma: é o que responde "que perfil de gente usa isto", sem
 * carregar nada que identifique alguém.
 */
export const rastrearFerramentaIniciada = (ferramenta: string) =>
  enviar('ferramenta_iniciada', { ferramenta })

export const rastrearFerramentaMetade = (ferramenta: string) =>
  enviar('ferramenta_metade', { ferramenta })

export const rastrearFerramentaResultado = (ferramenta: string, familia: string, publico: 'b2b' | 'b2c') =>
  enviar('ferramenta_resultado', { ferramenta, familia, publico })

export const rastrearFerramentaReiniciada = (ferramenta: string) =>
  enviar('ferramenta_reiniciada', { ferramenta })
