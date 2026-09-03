'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { linkWhatsApp } from '@/lib/whatsapp'
import { barraDaRota } from '@/lib/barra-contextual'
import { rastrearWhatsApp, rastrearBarra } from '@/lib/analytics'
import { MEDICAO_CONFIGURADA, lerConsentimento, ouvirConsentimento } from '@/lib/consentimento'
import { IconeWhatsApp } from './Icones'

/**
 * Barra contextual — substitui o botão flutuante.
 *
 * POR QUE SUBSTITUI, E NÃO SOMA. O site já tem CTA no meio do texto
 * (`CtaLinha`), CTA de fechamento (`FechamentoCta`) e o botão flutuante.
 * Acrescentar uma barra sobre isso seria a quarta camada da mesma pilha, que
 * é exatamente o empilhamento que a gente decidiu não ter. A barra faz o que
 * o círculo verde fazia — atalho sempre disponível — e faz o que ele não
 * fazia: dizer POR QUE falar agora.
 *
 * NÃO GUARDA NADA. O fechamento vive em estado de React: sobrevive à
 * navegação dentro do site e some num recarregamento. Dava para persistir em
 * sessionStorage, e eu não persisti de propósito. Desde que o GA4 entrou, o
 * site grava uma coisa no navegador: a resposta ao banner de consentimento —
 * e é só. Somar um segundo registro para lembrar que alguém fechou uma barra
 * transformaria "gravamos exatamente uma coisa, e é a sua escolha" em uma
 * lista, que é uma frase pior de escrever numa política e de defender.
 *
 * ESPERA O BANNER SAIR. Enquanto o consentimento não foi respondido, o banner
 * ocupa a mesma borda de baixo. Duas barras fixas empilhadas é o empilhamento
 * que a gente decidiu não ter — e perguntar sobre dados e vender ao mesmo
 * tempo é pior ainda.
 *
 * NÃO CONCORRE COM O CTA DA PÁGINA. Enquanto qualquer botão de WhatsApp do
 * conteúdo está na tela, a barra recolhe. Isso apareceu numa captura: no
 * fechamento de um artigo, a barra repetia palavra por palavra o título do
 * bloco de fechamento, com dois botões verdes visíveis ao mesmo tempo. A
 * barra existe para quem está longe de um CTA; perto de um, ela é eco.
 *
 * SEM CLS. O espaçador embaixo existe sempre, mesmo com a barra escondida, e
 * tem a altura dela. A barra entra e sai sem mover uma linha de conteúdo.
 *
 * O ESPAÇADOR É MEDIDO, NÃO CHUTADO. A altura da barra depende de quantas
 * linhas a frase ocupa, e a frase muda por página: medido, vai de 78px no
 * desktop a 127px em 320px de largura. Um espaçador de altura fixa reservava
 * 76px e deixava a barra cobrir o fim do rodapé em 51 das 52 páginas. Aqui um
 * ResizeObserver copia a altura real. O espaçador fica depois do rodapé, no
 * fim do documento, então corrigir a altura na hidratação não desloca nada
 * visível — o valor fixo das classes é só o ponto de partida do HTML.
 *
 * SEM BIBLIOTECA. Um listener de scroll com `passive: true` e um `rAF` para
 * não recalcular a cada pixel.
 */
export function BarraContextual() {
  const pathname = usePathname()
  const barra = barraDaRota(pathname)

  const [visivel, setVisivel] = useState(false)
  const [fechada, setFechada] = useState(false)
  const [ctaNaTela, setCtaNaTela] = useState(false)
  // Começa bloqueada quando existe medição configurada: o servidor não sabe se
  // a pessoa já respondeu, e aparecer sob o banner por um instante é pior do
  // que aparecer um instante depois.
  const [aguardandoBanner, setAguardandoBanner] = useState(MEDICAO_CONFIGURADA)
  const jaContou = useRef<string | null>(null)
  const caixa = useRef<HTMLDivElement>(null)
  const [altura, setAltura] = useState<number | null>(null)

  // Rota nova, barra nova: quem fechou numa página não fica sem barra no site
  // inteiro. Fechar é "agora não", não é "nunca mais".
  useEffect(() => {
    setFechada(false)
    setVisivel(false)
  }, [pathname])

  // Recolhe perto de um CTA do conteúdo. A margem inferior negativa impede
  // que o botão apareça pela borda de baixo e desligue a barra por um pixel:
  // o CTA precisa estar de fato na leitura, não raspando a dobra.
  useEffect(() => {
    if (!MEDICAO_CONFIGURADA) return
    setAguardandoBanner(lerConsentimento() === null)
    return ouvirConsentimento((estado) => setAguardandoBanner(estado === null))
  }, [])

  useEffect(() => {
    const el = caixa.current
    if (!el) return
    const observador = new ResizeObserver(() => setAltura(el.getBoundingClientRect().height))
    observador.observe(el)
    return () => observador.disconnect()
  }, [barra])

  useEffect(() => {
    const alvos = document.querySelectorAll('main a[href*="wa.me"]')
    if (!alvos.length) return
    const naTela = new Set<Element>()
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) naTela.add(e.target)
          else naTela.delete(e.target)
        }
        setCtaNaTela(naTela.size > 0)
      },
      { rootMargin: '0px 0px -140px 0px' },
    )
    for (const alvo of alvos) observador.observe(alvo)
    return () => observador.disconnect()
  }, [pathname])

  useEffect(() => {
    if (!barra || fechada) return

    let pedido = 0
    const avaliar = () => {
      pedido = 0
      const rolavel = document.documentElement.scrollHeight - window.innerHeight
      // Página curta demais para ter rolagem própria: mostra depois de um
      // tempo de leitura, em vez de nunca.
      const proporcao = rolavel > 200 ? window.scrollY / rolavel : 1
      if (proporcao >= barra.gatilho) setVisivel(true)
    }
    const aoRolar = () => {
      if (!pedido) pedido = requestAnimationFrame(avaliar)
    }

    const relogio = window.setTimeout(avaliar, 6000)
    window.addEventListener('scroll', aoRolar, { passive: true })
    avaliar()

    return () => {
      window.clearTimeout(relogio)
      window.removeEventListener('scroll', aoRolar)
      if (pedido) cancelAnimationFrame(pedido)
    }
  }, [barra, fechada, pathname])

  // Uma impressão por página, e só quando ela realmente apareceu.
  useEffect(() => {
    if (!visivel || fechada || ctaNaTela || aguardandoBanner || !barra) return
    if (jaContou.current === pathname) return
    jaContou.current = pathname
    rastrearBarra('barra_exibida', { pagina: pathname, chamada: barra.chamada })
  }, [visivel, fechada, ctaNaTela, aguardandoBanner, barra, pathname])

  if (!barra) return null

  const mostrando = visivel && !fechada && !ctaNaTela && !aguardandoBanner

  return (
    <>
      {/* Reserva de espaço permanente: a barra nunca empurra conteúdo. */}
      <div
        aria-hidden="true"
        className="h-[4.75rem] sm:h-[4.25rem]"
        style={altura ? { height: altura } : undefined}
      />

      <div
        ref={caixa}
        role="complementary"
        aria-label="Atendimento rápido"
        className={`fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-grafite-800 text-paper transition-transform duration-300 motion-reduce:transition-none ${
          mostrando ? 'translate-y-0' : 'translate-y-full'
        }`}
        // Escondida também para leitor de tela e para o teclado enquanto não
        // aparece — barra invisível que ainda recebe foco é armadilha.
        inert={!mostrando}
        aria-hidden={!mostrando}
      >
        <div className="wrap flex items-center gap-3 py-3 sm:gap-6 sm:py-3.5">
          <p className="min-w-0 flex-1 text-[0.92rem] leading-snug sm:text-[1rem]">
            {barra.chamada}
          </p>

          <a
            href={linkWhatsApp(barra.contexto, barra.mensagem)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              rastrearBarra('barra_clique', { pagina: pathname, chamada: barra.chamada })
              rastrearWhatsApp({
                contexto: barra.contexto,
                pagina: pathname,
                secao: 'barra-contextual',
              })
            }}
            className="btn btn-zap shrink-0 whitespace-nowrap px-4 py-2.5 text-[0.85rem] sm:px-5 sm:text-[0.9rem]"
          >
            <IconeWhatsApp className="h-4 w-4" />
            {/* No celular o rótulo curto: a frase acima já carrega o
                contexto, e o botão precisa caber sem quebrar. */}
            <span className="hidden sm:inline">{barra.rotulo}</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setFechada(true)
              rastrearBarra('barra_fechada', { pagina: pathname, chamada: barra.chamada })
            }}
            aria-label="Fechar atendimento rápido"
            className="-mr-1 flex h-9 w-9 shrink-0 items-center justify-center text-paper/55 transition-colors hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
