'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  GA_ID,
  MEDICAO_CONFIGURADA,
  gravarConsentimento,
  lerConsentimento,
  ouvirConsentimento,
  padroesNegados,
  type Estado,
} from '@/lib/consentimento'

/**
 * Medição e consentimento, no mesmo componente porque são a mesma decisão.
 *
 * ORDEM QUE IMPORTA: o banner pergunta, e só depois do "Aceitar" o gtag.js é
 * baixado. Antes disso o navegador não fala com nenhum host do Google. Quem
 * recusa nunca baixa nada. Isso é verificável e está verificado em
 * docs/ferramentas/qa-privacidade.mjs, que roda as duas trilhas.
 *
 * SEM MEDIÇÃO CONFIGURADA, SEM BANNER. Se `NEXT_PUBLIC_GA_ID` não estiver
 * definida — desenvolvimento, prévia de deploy, ou o dia em que a Tower
 * desligar o GA4 — este componente não renderiza nada e o site volta a ser o
 * que era: zero cookie, zero host externo, sem banner. Pedir consentimento
 * para uma ferramenta que não existe é encenação de conformidade, e é
 * exatamente o que /politica-de-cookies/ critica.
 */
export function Medicao() {
  const pathname = usePathname()
  const [estado, setEstado] = useState<Estado | null>(null)
  const [decidiu, setDecidiu] = useState(false)
  const carregado = useRef(false)

  // Lê a escolha depois da hidratação. Antes disso o servidor não sabe — e
  // renderizar o banner no HTML estático faria ele piscar para quem já
  // respondeu.
  useEffect(() => {
    setEstado(lerConsentimento())
    setDecidiu(true)
    return ouvirConsentimento((novo) => setEstado(novo))
  }, [])

  // Carrega o gtag.js uma única vez, e só com aceite.
  useEffect(() => {
    if (!MEDICAO_CONFIGURADA || estado !== 'aceito' || carregado.current) return
    carregado.current = true

    padroesNegados()
    window.gtag!('consent', 'update', { analytics_storage: 'granted' })

    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(s)

    window.gtag!('js', new Date())
    window.gtag!('config', GA_ID, {
      // O App Router troca de página sem recarregar; a visualização é enviada
      // à mão no efeito abaixo, senão o GA4 registraria só a primeira.
      send_page_view: false,
      // O GA4 anonimiza o IP por padrão, mas declarar deixa a intenção no
      // código, onde quem revisar a política vai procurar.
      anonymize_ip: true,
    })
  }, [estado])

  // Visualização de página, inclusive nas trocas de rota do lado do cliente.
  useEffect(() => {
    if (estado !== 'aceito' || !carregado.current) return
    window.gtag?.('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname, estado])

  const responder = useCallback((novo: Estado) => gravarConsentimento(novo), [])

  if (!MEDICAO_CONFIGURADA) return null
  // Enquanto não sabemos o que a pessoa já respondeu, não mostramos nada.
  if (!decidiu || estado !== null) return null

  return <Banner onResponder={responder} />
}

/**
 * O banner.
 *
 * DUAS AÇÕES IDÊNTICAS. "Aceitar" e "Recusar" usam a MESMA classe de botão,
 * a mesma largura e a mesma área de toque — não é o aceite sólido ao lado de
 * uma recusa em texto cinza, que é o padrão escuro mais comum deste tipo de
 * banner. Quem quiser saber por que os dois parecem iguais: é de propósito, e
 * é o ponto todo. Não existe caixa pré-marcada, não existe X que valha como
 * aceite, e não há como fechar sem responder — sem escolha, nada carrega.
 *
 * NÃO EMPILHA COM A BARRA CONTEXTUAL. As duas moram embaixo. Enquanto este
 * banner está na tela a barra não aparece — quem chegou agora está sendo
 * perguntado sobre dados, e vender no meio disso é o empilhamento que a gente
 * decidiu não ter.
 */
function Banner({ onResponder }: { onResponder: (e: Estado) => void }) {
  const [detalhe, setDetalhe] = useState(false)
  const caixa = useRef<HTMLDivElement>(null)

  // Foco entra no banner ao aparecer, para quem navega por teclado não ter de
  // percorrer a página inteira até o fim do documento para achar a pergunta.
  // Só que roubar foco de quem já começou a ler é pior do que o problema:
  // então só move se ninguém tiver interagido ainda.
  useEffect(() => {
    if (document.activeElement === document.body || document.activeElement === null) {
      caixa.current?.focus()
    }
  }, [])

  return (
    <div
      ref={caixa}
      tabIndex={-1}
      role="dialog"
      aria-modal="false"
      aria-labelledby="consentimento-titulo"
      className="band-ink fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto border-t-2 border-ink focus:outline-none"
    >
      <div className="wrap py-4 sm:py-6">
        <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <p className="eyebrow eyebrow-red">Medição de audiência</p>
            <h2 id="consentimento-titulo" className="mt-3 text-lg font-bold sm:text-xl">
              Podemos medir quais conteúdos ajudam?
            </h2>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-paper/80">
              A Tower quer saber quais textos levam a uma conversa útil, e para isso
              usaria o Google Analytics — que grava um cookie.{' '}
              <strong className="font-semibold text-paper">
                Enquanto você não responder, nada é carregado
              </strong>
              , nem o script do Google. Recusar não muda nada no site.
            </p>

            <button
              type="button"
              onClick={() => setDetalhe((v) => !v)}
              aria-expanded={detalhe}
              className="mt-4 text-[0.9rem] underline underline-offset-4 hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
            >
              {detalhe ? 'Ocultar detalhes' : 'Configurar e ver detalhes'}
            </button>

            {detalhe && (
              <div className="mt-4 border-t border-grafite-600 pt-4 text-[0.9rem] leading-relaxed text-paper/75">
                <dl className="grid gap-3">
                  <div>
                    <dt className="font-semibold text-paper">Necessários — sempre ativos</dt>
                    <dd>
                      Só o registro da sua resposta aqui, guardado no seu navegador para
                      não perguntarmos de novo. Não é cookie e não identifica você.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-paper">
                      Análise — só com o seu aceite
                    </dt>
                    <dd>
                      Google Analytics 4. Cookies <code>_ga</code> e{' '}
                      <code>_ga_&lt;id&gt;</code>, até 2 anos, para distinguir visitas.
                      Dados tratados também nos Estados Unidos.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-paper">Publicidade — não usamos</dt>
                    <dd>
                      Nenhum. Não há remarketing, pixel nem venda de dados, e o
                      armazenamento de anúncio fica negado mesmo se você aceitar.
                    </dd>
                  </div>
                </dl>
                <p className="mt-3">
                  Detalhe completo na{' '}
                  <Link
                    href="/politica-de-cookies/"
                    className="underline underline-offset-4 hover:text-paper"
                  >
                    política de cookies
                  </Link>
                  . Você pode mudar de ideia quando quiser, por lá.
                </p>
              </div>
            )}
          </div>

          {/* Os dois botões dividem a largura em partes iguais: a escolha não
              tem lado favorito. */}
          <div className="grid grid-cols-2 gap-3 lg:pt-8">
            <button
              type="button"
              onClick={() => onResponder('recusado')}
              className="btn btn-linha w-full"
            >
              Recusar
            </button>
            <button
              type="button"
              onClick={() => onResponder('aceito')}
              className="btn btn-linha w-full"
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
