export function IconeWhatsApp({ className = 'h-[1.15em] w-[1.15em]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Z" />
    </svg>
  )
}

export function IconeSeta({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
      />
    </svg>
  )
}

/**
 * Ícones das perguntas da ferramenta de calçado.
 *
 * Traço único, sem preenchimento, 24 unidades. Existem para reduzir esforço
 * cognitivo em cinco perguntas de risco, não para decorar: cada um repete
 * em desenho o que o rótulo diz em texto. Por isso são aria-hidden — o
 * texto ao lado é a informação, o ícone é o reconhecimento.
 */
const traco = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export function IconeImpacto({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...traco}>
      <path d="M7 6h10v6H7z" />
      <path d="M12 12v3M9 16l3 3 3-3M4 21h16" />
    </svg>
  )
}

export function IconePerfuracao({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...traco}>
      <path d="M4 18h16M12 18V5M9.5 7.5 12 5l2.5 2.5" />
      <path d="M7 14h10" strokeDasharray="2 2" />
    </svg>
  )
}

export function IconeAgua({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...traco}>
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
      <path d="M9 14a3 3 0 0 0 3 3" />
    </svg>
  )
}

export function IconeOleo({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...traco}>
      <path d="M4 17c2-2 4-2 6 0s4 2 6 0 4-2 4 0" />
      <path d="M6 12h8l2-4H8l-2 4z" />
      <path d="M12 8V5" />
    </svg>
  )
}

export function IconeEletricidade({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...traco}>
      <path d="M13 2 5 13h6l-1 9 8-12h-6l1-8z" />
    </svg>
  )
}

export function IconeQuimico({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...traco}>
      <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" />
      <path d="M7 16h10" />
    </svg>
  )
}

export function IconeCaminhada({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...traco}>
      <circle cx="13" cy="4" r="1.5" />
      <path d="M10 21l2-6-3-2 1-5 3-1 2 3 3 1M9 12l-2 2v4M14 15l2 2 1 4" />
    </svg>
  )
}

export function IconeCalor({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...traco}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
    </svg>
  )
}

export function IconeConforto({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...traco}>
      <path d="M3 16c0-2 2-4 5-4h4l3-3h3l2 4v3H3z" />
      <path d="M3 19h17" />
    </svg>
  )
}
