/**
 * Consentimento de medição.
 *
 * A DECISÃO QUE GOVERNA ESTE ARQUIVO: nada do Google é carregado antes de a
 * pessoa aceitar. Nem o gtag.js, nem um ping sem cookie.
 *
 * O Consent Mode v2 permite carregar o gtag.js com armazenamento negado e
 * ainda assim mandar sinal para o Google modelar a parte do tráfego que não
 * aceitou. É um caminho legítimo e é o que a maioria dos sites faz. Aqui não
 * serve: a política de cookies afirma, com medição publicada, que o site não
 * contata host de terceiro, e um ping para googletagmanager.com antes de
 * qualquer escolha tornaria essa frase falsa para quem ainda não escolheu.
 * O custo é real e está declarado na política — sem modelagem, o GA4 enxerga
 * só quem aceitou.
 *
 * Os padrões negados abaixo continuam sendo enviados antes do gtag.js mesmo
 * assim. Hoje são redundantes, porque nada carrega sem aceite; existem para o
 * dia em que alguém acrescentar remarketing e esquecer desta linha.
 *
 * O REGISTRO FICA NO NAVEGADOR. Guardar a escolha é a única gravação que este
 * site faz, e ela existe justamente para respeitar a escolha — reperguntar a
 * cada página seria pior para quem recusou. É localStorage de primeira parte,
 * não é cookie, não identifica ninguém e está descrito em
 * /politica-de-cookies/.
 *
 * LIMITE HONESTO: localStorage é prova fraca de consentimento. Ele vive no
 * navegador da pessoa, ela pode apagar, e a Tower não tem cópia. Para um site
 * estático sem servidor de aplicação é o que existe; se um dia a Tower
 * precisar comprovar consentimento a um titular ou à ANPD, isto não basta e
 * vai exigir um registro do lado do servidor.
 */

/**
 * O identificador do GA4, vindo de `NEXT_PUBLIC_GA_ID`, inlinado no build.
 *
 * Sem ele configurado NADA disto existe: não carrega script, não grava nada e
 * o banner não aparece. É proposital — assim o site em desenvolvimento e as
 * prévias de deploy não sujam a propriedade, e o dia em que a variável for
 * removida o site volta sozinho ao estado de zero cookie.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ''
export const MEDICAO_CONFIGURADA = /^G-[A-Z0-9]{4,}$/.test(GA_ID)

export type Estado = 'aceito' | 'recusado'

/** Sobe quando a finalidade muda. Versão nova reabre a pergunta. */
export const VERSAO = 1

const CHAVE = 'tower-consentimento'
const EVENTO = 'tower:consentimento'

type Registro = { estado: Estado; versao: number; em: string }

/**
 * `null` significa "ainda não escolheu" — que é diferente de "recusou".
 * Enquanto for null o banner aparece e nada de medição carrega.
 */
export function lerConsentimento(): Estado | null {
  if (typeof window === 'undefined') return null
  try {
    const bruto = window.localStorage.getItem(CHAVE)
    if (!bruto) return null
    const r = JSON.parse(bruto) as Registro
    // Registro de versão antiga vale como não respondido: se a finalidade
    // mudou, o consentimento anterior não cobre a finalidade nova.
    if (r.versao !== VERSAO) return null
    return r.estado === 'aceito' || r.estado === 'recusado' ? r.estado : null
  } catch {
    // Navegador com armazenamento bloqueado cai aqui. O site funciona:
    // trata como não respondido e nada de medição carrega.
    return null
  }
}

export function gravarConsentimento(estado: Estado) {
  if (typeof window === 'undefined') return
  try {
    const r: Registro = { estado, versao: VERSAO, em: new Date().toISOString() }
    window.localStorage.setItem(CHAVE, JSON.stringify(r))
  } catch {
    // Sem conseguir gravar, a escolha vale para esta navegação e o banner
    // volta no próximo carregamento. Preferível a quebrar a página.
  }
  window.dispatchEvent(new CustomEvent(EVENTO, { detail: estado }))
}

/**
 * Apagar é diferente de recusar: volta ao estado de quem nunca respondeu, e o
 * banner reaparece. É o que a política chama de "mudar de ideia".
 */
export function limparConsentimento() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(CHAVE)
  } catch {
    /* nada a fazer */
  }
  window.dispatchEvent(new CustomEvent(EVENTO, { detail: null }))
}

export function ouvirConsentimento(fn: (estado: Estado | null) => void) {
  const aoMudar = (e: Event) => fn((e as CustomEvent).detail as Estado | null)
  window.addEventListener(EVENTO, aoMudar)
  // Outra aba decidiu: respeita a decisão sem esperar recarregar.
  const aoStorage = (e: StorageEvent) => {
    if (e.key === CHAVE) fn(lerConsentimento())
  }
  window.addEventListener('storage', aoStorage)
  return () => {
    window.removeEventListener(EVENTO, aoMudar)
    window.removeEventListener('storage', aoStorage)
  }
}

/**
 * Padrões do Consent Mode v2, todos negados. Roda antes de qualquer script do
 * Google. O site não faz publicidade, então os três `ad_*` ficam negados para
 * sempre — só `analytics_storage` muda com o aceite.
 */
export function padroesNegados() {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments)
    }
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  })
}
