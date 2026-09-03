'use client'

import { useEffect, useState } from 'react'
import {
  MEDICAO_CONFIGURADA,
  gravarConsentimento,
  lerConsentimento,
  limparConsentimento,
  ouvirConsentimento,
  type Estado,
} from '@/lib/consentimento'

/**
 * Mudar de ideia, dentro da política de cookies.
 *
 * Retirar o consentimento tem de ser tão fácil quanto dar — e "tão fácil"
 * quer dizer no mesmo lugar onde a pessoa foi procurar a informação, não num
 * e-mail que alguém responde em três dias.
 *
 * Mostra o estado atual em texto, porque "você aceitou em tal data" é o que a
 * pessoa veio conferir. Recusar aqui apaga o cookie do GA4 na hora, sem
 * esperar recarregar: consentimento retirado que só vale na próxima visita
 * não é consentimento retirado.
 */
export function ControleConsentimento() {
  const [estado, setEstado] = useState<Estado | null>(null)
  const [montou, setMontou] = useState(false)

  useEffect(() => {
    setEstado(lerConsentimento())
    setMontou(true)
    return ouvirConsentimento(setEstado)
  }, [])

  function recusar() {
    gravarConsentimento('recusado')
    apagarCookiesDoGa()
  }

  if (!MEDICAO_CONFIGURADA) {
    return (
      <div className="border-l-[3px] border-rule-strong bg-paper-2 p-5">
        <p className="text-[0.95rem]">
          Não há medição ativa neste site hoje, então não existe consentimento a dar
          nem a retirar. Se isso mudar, o controle aparece aqui e o banner pergunta
          antes.
        </p>
      </div>
    )
  }

  return (
    <div className="border-l-[3px] border-tower-red bg-paper-2 p-5">
      <p className="eyebrow eyebrow-red">Sua escolha</p>
      <p className="mt-3 text-[0.95rem] leading-relaxed">
        {/* Antes de hidratar não dá para saber, e chutar seria pior. */}
        {!montou
          ? 'Verificando…'
          : estado === 'aceito'
            ? 'Você aceitou a medição de audiência. O Google Analytics está ativo neste navegador.'
            : estado === 'recusado'
              ? 'Você recusou a medição de audiência. Nada do Google é carregado neste navegador.'
              : 'Você ainda não respondeu. Enquanto isso, nada de medição é carregado.'}
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={recusar}
          disabled={!montou || estado === 'recusado'}
          className="btn btn-ghost disabled:cursor-default disabled:opacity-45"
        >
          Recusar a medição
        </button>
        <button
          type="button"
          onClick={() => gravarConsentimento('aceito')}
          disabled={!montou || estado === 'aceito'}
          className="btn btn-ghost disabled:cursor-default disabled:opacity-45"
        >
          Aceitar a medição
        </button>
        {montou && estado !== null && (
          <button
            type="button"
            onClick={() => {
              limparConsentimento()
              apagarCookiesDoGa()
            }}
            className="btn btn-ghost"
          >
            Apagar minha resposta
          </button>
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-3">
        Recusar depois de ter aceitado apaga aqui os cookies do Google que este site
        conseguir alcançar. O que o Google já coletou enquanto o consentimento estava
        ativo continua com ele — para apagar isso, o caminho é o pedido de exclusão
        descrito na política de privacidade.
      </p>
    </div>
  )
}

/**
 * Apaga os cookies do GA4 pelo nome, no domínio do site e no domínio-pai.
 *
 * Só alcança cookie de primeira parte sem HttpOnly — que é o caso do `_ga` e
 * do `_ga_<id>`. É por isso que o texto acima não promete apagar tudo: um
 * componente de front-end não tem como alcançar o que está do lado do Google,
 * e prometer que tem seria a mentira mais fácil de escrever aqui.
 */
function apagarCookiesDoGa() {
  if (typeof document === 'undefined') return
  const dominios = [location.hostname, `.${location.hostname}`]
  const partes = location.hostname.split('.')
  if (partes.length > 2) dominios.push(`.${partes.slice(-2).join('.')}`)

  for (const bruto of document.cookie.split(';')) {
    const nome = bruto.split('=')[0]?.trim()
    if (!nome || !/^_ga/.test(nome)) continue
    for (const d of dominios) {
      document.cookie = `${nome}=; path=/; domain=${d}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    }
    document.cookie = `${nome}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  }
}
