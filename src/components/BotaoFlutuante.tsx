'use client'

import { usePathname } from 'next/navigation'
import { linkWhatsApp } from '@/lib/whatsapp'
import { destinoDaRota } from '@/lib/contexto-rota'
import { rastrearWhatsApp } from '@/lib/analytics'
import { IconeWhatsApp } from './Icones'

/**
 * Caminho curto, sempre disponível — e agora com contexto.
 *
 * Existe para quem já sabe o que quer e não deve ser obrigado a percorrer
 * a página inteira: reposição, urgência, cliente antigo.
 *
 * A mensagem vem da rota. Antes era sempre a mesma frase genérica, o que
 * significava que o clique mais provável do celular era justamente o que
 * chegava sem informação nenhuma para a Tower.
 */
export function BotaoFlutuante() {
  const pathname = usePathname()
  const { contexto, mensagem } = destinoDaRota(pathname)

  return (
    <a
      href={linkWhatsApp(contexto, mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Tower no WhatsApp"
      onClick={() =>
        rastrearWhatsApp({ contexto, pagina: pathname, secao: 'botao-flutuante' })
      }
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-zap text-white shadow-lg transition-colors hover:bg-zap-deep sm:h-15 sm:w-15"
    >
      <IconeWhatsApp className="h-7 w-7" />
    </a>
  )
}
