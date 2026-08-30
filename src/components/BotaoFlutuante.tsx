'use client'

import { linkWhatsApp } from '@/lib/whatsapp'
import { rastrearWhatsApp } from '@/lib/analytics'
import { IconeWhatsApp } from './Icones'

/**
 * Caminho curto, sempre disponível.
 *
 * Existe para o público que já sabe o que quer e não deve ser educado:
 * reposição, urgência, cliente antigo. Esconder o WhatsApp dessa pessoa
 * atrás de uma jornada de conteúdo é perder a venda mais fácil do site.
 */
export function BotaoFlutuante() {
  return (
    <a
      href={linkWhatsApp('flutuante')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Tower no WhatsApp"
      onClick={() =>
        rastrearWhatsApp({
          contexto: 'flutuante',
          pagina: typeof window !== 'undefined' ? window.location.pathname : '',
          secao: 'botao-flutuante',
        })
      }
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-zap text-white shadow-lg transition-colors hover:bg-zap-deep sm:h-15 sm:w-15"
    >
      <IconeWhatsApp className="h-7 w-7" />
    </a>
  )
}
