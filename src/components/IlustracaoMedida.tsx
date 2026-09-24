/**
 * Como medir o pé — ilustração própria, vista de cima.
 *
 * Parede à esquerda, calcanhar encostado nela, folha no chão, marca na ponta
 * do dedo mais longo e a cota da parede até a marca. É o método que os
 * fabricantes descrevem, desenhado para ser entendido sem ler o texto — mas
 * o texto existe ao lado, em lista numerada, porque a imagem não pode ser a
 * única forma de ensinar.
 *
 * O dedo mais longo aqui é o segundo, de propósito: em muita gente é ele, e
 * quem marca sempre o dedão erra a medida para menos.
 */
export function IlustracaoMedida({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 236"
      role="img"
      aria-labelledby="ilustracao-medida-titulo ilustracao-medida-desc"
      className={className}
    >
      <title id="ilustracao-medida-titulo">Como medir o comprimento do pé</title>
      <desc id="ilustracao-medida-desc">
        Pé visto de cima, sobre uma folha no chão, com o calcanhar encostado na parede. Uma marca
        vermelha fica na ponta do dedo mais longo, que neste desenho é o segundo dedo. Uma seta
        embaixo mede a distância da parede até a marca: esse é o comprimento do pé.
      </desc>

      {/* parede */}
      <rect x="8" y="18" width="30" height="170" fill="var(--color-aco)" />
      <g stroke="var(--color-paper)" strokeWidth="2" opacity="0.55">
        {[30, 52, 74, 96, 118, 140, 162].map((y) => (
          <line key={y} x1="8" y1={y + 20} x2="38" y2={y} />
        ))}
      </g>
      <text x="23" y="14" textAnchor="middle" fontSize="11" fontFamily="var(--font-display)" fontWeight="700" fill="var(--color-ink-2)">
        PAREDE
      </text>

      {/* folha no chão */}
      <rect x="38" y="30" width="366" height="146" fill="var(--color-paper)" stroke="var(--color-rule-strong)" strokeWidth="1.5" />

      {/* pé */}
      <g fill="var(--color-paper-2)" stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round">
        <path d="M80 66 C52 66 38 84 38 100 C38 118 52 134 82 134 L250 138 C285 139 305 132 318 124 L322 70 C300 58 270 56 250 60 C215 68 190 76 160 74 C130 72 105 66 80 66 Z" />
        <ellipse cx="338" cy="70" rx="20" ry="14" />
        <ellipse cx="348" cy="92" rx="18" ry="10" />
        <ellipse cx="336" cy="109" rx="14" ry="9" />
        <ellipse cx="325" cy="123" rx="11" ry="8" />
        <ellipse cx="312" cy="135" rx="9" ry="7" />
      </g>

      {/* marca no dedo mais longo */}
      <line x1="366" y1="40" x2="366" y2="190" stroke="var(--color-tower-red)" strokeWidth="2.5" strokeDasharray="6 4" />
      <text x="362" y="52" textAnchor="end" fontSize="11" fontFamily="var(--font-display)" fontWeight="700" fill="var(--color-tower-red-deep)">
        marca no dedo mais longo
      </text>

      {/* régua */}
      <rect x="38" y="182" width="366" height="16" fill="var(--color-paper)" stroke="var(--color-ink-3)" strokeWidth="1" />
      <g stroke="var(--color-ink-3)" strokeWidth="1">
        {Array.from({ length: 37 }, (_, i) => 38 + i * 10).map((x, i) => (
          <line key={x} x1={x} y1="182" x2={x} y2={i % 5 === 0 ? 192 : 187} />
        ))}
      </g>

      {/* cota */}
      <g stroke="var(--color-ink)" strokeWidth="2" fill="var(--color-ink)">
        <line x1="44" y1="212" x2="360" y2="212" />
        <path d="M38 212 L48 207 L48 217 Z" strokeWidth="0" />
        <path d="M366 212 L356 207 L356 217 Z" strokeWidth="0" />
      </g>
      <text x="202" y="230" textAnchor="middle" fontSize="12.5" fontFamily="var(--font-display)" fontWeight="700" fill="var(--color-ink)">
        comprimento do pé, em cm
      </text>
    </svg>
  )
}
