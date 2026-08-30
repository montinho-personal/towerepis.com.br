'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { WhatsAppCta } from './WhatsAppCta'

/**
 * Os rótulos seguem uma lógica só: cada um nomeia o que está atrás do link.
 *
 * "Empresas" nomeava um tipo de cliente, não um conteúdo — e ninguém se
 * identifica como "Empresa" ao procurar calçado para a cozinha. "Para equipes"
 * nomeia a situação, que é como a pessoa realmente pensa.
 *
 * O orçamento não está aqui: é a conversão principal e vive no botão.
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

  /* Compacta a altura ao rolar. Não esconde e não reaparece saltando —
     header que some e volta é desorientador e faz o layout pular. */
  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  return (
    <header className="sticky top-0 z-30 border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
      <div
        className={`wrap flex items-center justify-between gap-4 transition-[height] duration-200 ${
          rolou ? 'h-14 sm:h-16' : 'h-18 sm:h-22'
        }`}
      >
        <Link href="/" className="shrink-0" aria-label="Tower EPI's, página inicial">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-display text-[0.8125rem] font-semibold text-ink-2 transition-colors hover:text-tower-red"
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Ação primária do site. O WhatsApp continua a um toque, pelo
              botão flutuante e pelos CTAs de cada página. */}
          <Link href="/orcamento/" className="btn btn-red hidden sm:inline-flex">
            Pedir orçamento
          </Link>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            className="flex h-11 w-11 items-center justify-center border border-rule-strong lg:hidden"
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
        <nav id="menu-mobile" aria-label="Principal, celular" className="border-t border-rule lg:hidden">
          <ul className="wrap divide-y divide-rule py-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setAberto(false)}
                  className="block py-4 font-display text-base font-semibold"
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
            <li className="space-y-3 py-4">
              <Link
                href="/orcamento/"
                onClick={() => setAberto(false)}
                className="btn btn-red btn-block"
              >
                Pedir orçamento
              </Link>
              <WhatsAppCta contexto="header" secao="menu-mobile" bloco>
                Falar no WhatsApp
              </WhatsAppCta>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
