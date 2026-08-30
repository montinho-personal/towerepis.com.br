'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Logo } from './Logo'
import { WhatsAppCta } from './WhatsAppCta'

const NAV = [
  { href: '/calcados/', rotulo: 'Calçados' },
  { href: '/protecao/', rotulo: 'Proteção' },
  { href: '/para-seu-trabalho/', rotulo: 'Para seu trabalho' },
  { href: '/empresas/', rotulo: 'Empresas' },
  { href: '/cotacao/', rotulo: 'Cotação' },
  { href: '/conhecimento/', rotulo: 'Conhecimento' },
  { href: '/a-tower/', rotulo: 'A Tower' },
]

export function Header() {
  const [aberto, setAberto] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-paper/95 backdrop-blur-sm">
      <div className="wrap flex h-16 items-center justify-between gap-4 sm:h-18">
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
          <div className="hidden sm:block">
            <WhatsAppCta contexto="header" secao="header" variante="ink">
              Falar agora
            </WhatsAppCta>
          </div>

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
            <li className="py-4">
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
