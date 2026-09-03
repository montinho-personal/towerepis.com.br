'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Logo, REGUA_DA_MARCA } from './Logo'
import { WhatsAppCta } from './WhatsAppCta'
import { empresa } from '@/config/empresa'
import { linkWhatsApp } from '@/lib/whatsapp'

/**
 * Cabeçalho em duas linhas, como um cabeçalho de jornal.
 *
 * FITA (grafite, some ao rolar): os dois fatos que mais pesam e que não
 * cabem num logo — "Fortaleza — CE · Desde 1995" à esquerda, o WhatsApp à
 * direita. A direção de arte pediu o 1995 como ativo visual; aqui ele
 * abre toda página, em cima de tudo, sem gritar.
 *
 * MASTHEAD (papel): a marca em preto com o O vermelho, a navegação e o
 * botão de orçamento. O gesto que faz o cabeçalho ser desenhado, e não
 * montado, é a linha: a marca tem uma régua entre TOWER e EPI's, e a
 * navegação tem uma linha fina exatamente na mesma altura — a régua do
 * logo continua por baixo dos rótulos até o botão. No hover, o trecho da
 * linha sob o item fica vermelho. Uma ideia, tirada do próprio material.
 *
 * A altura da lista de navegação é igual à altura da marca, e a linha
 * fica a 53,2% dela (REGUA_DA_MARCA). Assim o alinhamento é geometria, não
 * pixel ajustado à mão — e continua certo quando o cabeçalho encolhe.
 *
 * TEXTO OPACO, SEMPRE. Sobre o degradê da marca, papel a 85% de opacidade
 * marca 4,49:1 no trecho claro e o telefone da fita marca 3,90:1 — reprova.
 * Opaco, o pior ponto do degradê (#e01e2f) ainda dá 4,62:1. Não existe
 * hierarquia por opacidade neste cabeçalho; quem marca o item sob o cursor é
 * o trecho branco da régua.
 *
 * FUNDO VERMELHO, decidido pelo cliente depois do teste. O que o teste
 * tinha apontado continua verdade, e cada ponto virou uma escolha explícita:
 * a marca vai em recorte branco (o O vermelho não se lê sobre vermelho); o
 * botão de orçamento inverte para branco com o rótulo em vermelho profundo,
 * para seguir sendo a ação mais forte da tela; e o WhatsApp do menu no
 * celular deixa o verde e vira contorno claro, porque verde sobre vermelho
 * briga em vez de destacar. O botão flutuante segue verde: ele fica sobre a
 * página, não sobre a faixa.
 */
const NAV = [
  { href: '/calcados/', rotulo: 'Calçados' },
  { href: '/protecao/', rotulo: 'Proteção' },
  { href: '/para-seu-trabalho/', rotulo: 'Por profissão' },
  { href: '/empresas/', rotulo: 'Para equipes' },
  { href: '/conhecimento/', rotulo: 'Conhecimento' },
  { href: '/a-tower/', rotulo: 'A Tower' },
]

export function Header() {
  const [aberto, setAberto] = useState(false)
  const [rolou, setRolou] = useState(false)

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  // Marca e lista de navegação compartilham a altura; a linha fica na régua.
  const alturaMarca = rolou ? 'h-9 sm:h-10' : 'h-11 sm:h-14'
  const linha = { top: `${REGUA_DA_MARCA * 100}%` }

  return (
    <header className="degrade-marca sticky top-0 z-30 border-b-2 border-ink text-paper">
      {/* FITA */}
      <div
        className={`overflow-hidden bg-black/25 transition-[max-height,opacity] duration-200 ${
          rolou ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
        }`}
      >
        <div className="wrap flex h-8 items-center justify-between gap-4 font-display text-[0.66rem] font-bold uppercase tracking-[0.16em] text-paper">
          <p className="m-0 truncate">
            <span className="hidden sm:inline">Fortaleza — CE · </span>Desde {empresa.fundacao}
          </p>
          <a
            href={linkWhatsApp('header')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 transition-colors hover:text-white"
          >
            <span className="hidden sm:inline">WhatsApp </span>{empresa.whatsapp.exibicao}
          </a>
        </div>
      </div>

      {/* MASTHEAD */}
      <div
        className={`wrap flex items-center justify-between gap-6 transition-[height] duration-200 ${
          rolou ? 'h-14 sm:h-16' : 'h-[4.5rem] sm:h-[5.5rem]'
        }`}
      >
        <Link href="/" className="shrink-0" aria-label="Tower EPI's, página inicial">
          <Logo prefixo="cabecalho" tom="vermelho" className={`w-auto transition-[height] duration-200 ${alturaMarca}`} />
        </Link>

        <nav aria-label="Principal" className="hidden flex-1 lg:block">
          <ul className={`relative flex items-start gap-8 ${alturaMarca}`}>
            {/* a régua do logo, continuada */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 h-px bg-paper/35" style={linha} />
            {NAV.map((item) => (
              <li key={item.href} className="group relative h-full">
                <Link
                  href={item.href}
                  className="flex h-full items-start pt-[0.35rem] font-display text-[0.8125rem] font-semibold text-paper transition-colors"
                >
                  {item.rotulo}
                </Link>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 h-[3px] -translate-y-px scale-x-0 bg-paper transition-transform duration-200 group-hover:scale-x-100"
                  style={linha}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/orcamento/" className="btn btn-papel hidden sm:inline-flex">
            Pedir orçamento
          </Link>
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            className="flex h-11 w-11 items-center justify-center border border-paper/45 lg:hidden"
          >
            <span className="sr-only">{aberto ? 'Fechar menu' : 'Abrir menu'}</span>
            <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
              {aberto ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" />
              ) : (
                <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.8" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {aberto && (
        <nav id="menu-mobile" aria-label="Principal, celular" className="border-t border-paper/25 lg:hidden">
          <ul className="wrap divide-y divide-paper/15 py-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setAberto(false)} className="block py-4 font-display text-base font-semibold">
                  {item.rotulo}
                </Link>
              </li>
            ))}
            <li className="space-y-3 py-4">
              <Link href="/orcamento/" onClick={() => setAberto(false)} className="btn btn-papel btn-block">
                Pedir orçamento
              </Link>
              <WhatsAppCta contexto="header" secao="menu-mobile" variante="linha" bloco>
                Falar no WhatsApp
              </WhatsAppCta>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
