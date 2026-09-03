/**
 * Marca da Tower EPI's — versão para fundo claro e escuro.
 *
 * Contornos extraídos do vetor "LOGO TOWER PRETA.ai" (1920×1080, tudo já em
 * caminho, sem fonte embutida). Reconstrução conferida contra o JPG que veio
 * junto: idêntica, inclusive o degradê vermelho do O.
 *
 * Esta é a marca que a Tower usa sobre fundo branco: tipo preto, O em
 * vermelho. A versão anterior deste componente era o selo do Instagram
 * (quadrado vermelho), que continua no favicon, no ícone do iOS e no card de
 * compartilhamento — onde um selo quadrado é o formato certo.
 *
 * Correção de registro: na primeira versão do site eu tinha desenhado um
 * ponto vermelho no lugar do O; depois, ao ver o selo, disse que era invenção
 * minha. Meio errado das duas vezes. A marca sobre fundo claro TEM o O
 * vermelho — o que não existe é um disco no lugar da letra. É a letra O,
 * preenchida com o degradê da marca.
 *
 * `tom`: o tipo herda `currentColor`; o O vermelho é sempre o O vermelho.
 * Todo caminho de tipo precisa sair com `fill="currentColor"`. O extrator
 * deixou oito deles com o preto literal do arquivo, e no rodapé escuro só o
 * "T" e a régua ficavam brancos — o resto da marca sumia no grafite. No
 * cabeçalho o defeito era invisível e continuava errado: metade em ink,
 * metade em preto puro. Se a marca for regerada, conferir isto primeiro.
 * Sobre o vermelho da marca (`tom="vermelho"`) a marca vai chapada em
 * branco, o O incluído. Não é preferência: o O é vermelho, e vermelho sobre
 * vermelho não se lê. Toda marca com cor própria tem essa versão de recorte,
 * e é ela que aparece quando o fundo é a própria cor.
 *
 * `prefixo`: os ids do degradê e do recorte precisam ser únicos por
 * instância — a marca aparece no cabeçalho e no rodapé da mesma página.
 *
 * A régua entre TOWER e EPI's fica a 53,2% da altura da marca. O cabeçalho
 * usa esse número para alinhar a linha da navegação com a régua do logo.
 */
export const REGUA_DA_MARCA = 0.532

export function Logo({
  prefixo,
  tom = 'claro',
  className = 'h-12 w-auto',
}: {
  prefixo: string
  tom?: 'claro' | 'escuro' | 'vermelho'
  className?: string
}) {
  const p = prefixo
  return (
    <svg
      viewBox="535.8 343.27 854.09 396.86"
      role="img"
      aria-label="Tower EPI&rsquo;s"
      className={`shrink-0 ${tom === 'claro' ? 'text-ink' : 'text-paper'} ${className}`}
    >
      <defs><clipPath id={`${p}-c1`}><path d="M690.143 653.641C690.143 604.016 727.652 565.322 777.272 565.322L777.272 565.322C826.893 565.322 864.401 604.016 864.401 653.641L864.401 653.641C864.401 701.833 826.893 739.58 777.272 739.58L777.272 739.58C727.652 739.58 690.143 701.833 690.143 653.641M722.429 653.641C722.429 685.927 746.884 710.616 777.272 710.616L777.272 710.616C807.662 710.616 832.116 685.927 832.116 653.641L832.116 653.641C832.116 619.926 807.662 594.287 777.272 594.287L777.272 594.287C746.884 594.287 722.429 619.926 722.429 653.641" transform="matrix(1 0 0 1 0 0)" clipRule="evenodd"/></clipPath><linearGradient id={`${p}-g1`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1" y2="0" gradientTransform="matrix(174.258 0 0 -174.258 690.143 652.451)"><stop offset="0%" stopColor="#991d21"/><stop offset="9.091%" stopColor="#9a1d21"/><stop offset="18.18%" stopColor="#9e1d22"/><stop offset="27.27%" stopColor="#a21d23"/><stop offset="36.36%" stopColor="#a71d24"/><stop offset="45.45%" stopColor="#ad1d25"/><stop offset="54.55%" stopColor="#b41d26"/><stop offset="63.64%" stopColor="#bb1d28"/><stop offset="72.73%" stopColor="#c31e29"/><stop offset="81.82%" stopColor="#cc1e2b"/><stop offset="90.91%" stopColor="#d61e2d"/><stop offset="100%" stopColor="#e01e2f"/></linearGradient></defs>
      <g transform="translate(0 1080) scale(1 -1)"><path d="M1385.841 518.431h-846.0v7.0h846.0Z" transform="matrix(1 0 0 1 0 0)" fill="currentColor"/><path d="M0.0 0.0L-25.874 0.0C-29.199 0.0 -31.101 -1.902 -31.101 -5.223L-31.101 -15.433L-58.403 -15.433L-58.403 11.157C-58.403 22.314 -54.604 26.351 -43.209 26.351L74.314 26.351C85.71 26.351 89.508 22.314 89.508 11.157L89.508 -15.433L62.206 -15.433L62.206 -5.223C62.206 -1.902 60.305 0.0 56.979 0.0L31.101 0.0L31.101 -142.211L0.0 -142.211Z" transform="matrix(1 0 0 1 594.201 710.381)" fill="currentColor"/><rect x="0" y="0" width="1920" height="1080" fill={tom === 'vermelho' ? 'currentColor' : `url(#${p}-g1)`} clipPath={`url(#${p}-c1)`}/><path d="M0.0 0.0C-0.951 4.033 -3.56 5.223 -7.597 5.223L-12.108 5.223L-12.108 31.574L8.07 31.574C19.944 31.574 26.352 28.726 28.965 17.803L51.995 -82.623C54.131 -92.122 54.843 -100.427 54.843 -100.427L55.316 -100.427C55.316 -100.427 56.267 -92.352 58.881 -82.623L89.504 31.101L115.86 31.101L144.82 -82.623C147.434 -92.352 148.146 -100.427 148.146 -100.427L148.619 -100.427C148.619 -100.427 149.335 -92.122 151.471 -82.623L174.736 17.803C177.111 28.726 183.518 31.574 195.392 31.574L215.809 31.574L215.809 5.223L211.298 5.223C207.027 5.223 204.652 4.033 203.701 0.0L168.563 -136.989L132.713 -136.989L107.073 -41.55C104.225 -30.866 102.801 -20.656 102.801 -20.656L102.324 -20.656C102.324 -20.656 100.9 -30.628 97.813 -41.55L70.988 -136.989L34.899 -136.989Z" transform="matrix(1 0 0 1 885.323 705.159)" fill="currentColor"/><path d="M0.0 0.0L-15.433 0.0L-15.433 26.351L86.417 26.351C97.579 26.351 102.563 21.368 102.563 10.206L102.563 -15.433L74.31 -15.433L74.31 -5.223C74.31 -1.902 72.412 0.0 69.087 0.0L31.101 0.0L31.101 -44.164L85.705 -44.164L85.705 -70.511L31.101 -70.511L31.101 -110.637C31.101 -113.963 33.002 -115.855 36.323 -115.855L75.26 -115.855C78.586 -115.855 80.483 -113.963 80.483 -110.637L80.483 -100.422L108.736 -100.422L108.736 -126.071C108.736 -137.462 103.752 -142.211 92.591 -142.211L16.145 -142.211C4.749 -142.211 0.0 -137.462 0.0 -126.071Z" transform="matrix(1 0 0 1 1128.47 710.381)" fill="currentColor"/><path d="M0.0 0.0C15.668 0.0 24.927 9.738 24.927 26.59C24.927 43.209 15.668 52.707 0.473 52.707L-24.693 52.707L-24.693 0.0ZM-55.794 52.707L-71.227 52.707L-71.227 79.059L4.272 79.059C35.134 79.059 56.74 60.066 56.74 28.253C56.74 -2.131 35.846 -14.717 28.726 -16.141L28.726 -16.618C28.726 -16.618 33.949 -18.989 37.035 -25.162L53.415 -57.691C56.028 -62.679 60.066 -63.148 65.288 -63.148L68.375 -63.148L68.375 -89.504L51.991 -89.504C39.41 -89.504 33.949 -87.602 28.487 -76.919L6.885 -34.422C3.321 -27.78 -0.239 -26.586 -9.026 -26.586L-24.693 -26.586L-24.693 -89.504L-55.794 -89.504Z" transform="matrix(1 0 0 1 1321.51 657.674)" fill="currentColor"/><path d="M0.0 0.0L-12.935 0.0L-12.935 12.267L67.062 12.267C75.618 12.267 79.2 8.703 79.2 0.203L79.2 -13.638L66.067 -13.638L66.067 -4.351C66.067 -1.38 64.475 0.0 61.689 0.0L13.93 0.0L13.93 -50.625L66.465 -50.625L66.465 -62.883L13.93 -62.883L13.93 -110.146C13.93 -113.109 15.522 -114.498 18.308 -114.498L67.46 -114.498C70.246 -114.498 71.838 -113.109 71.838 -110.146L71.838 -100.851L84.772 -100.851L84.772 -114.692C84.772 -123.201 81.19 -126.756 72.633 -126.756L12.139 -126.756C3.582 -126.756 0.0 -123.201 0.0 -114.692Z" transform="matrix(1 0 0 1 781.432 469.004)" fill="currentColor"/><path d="M0.0 0.0C18.507 0.0 30.645 11.276 30.645 30.256C30.645 49.05 18.507 59.92 0.199 59.92L-30.446 59.92L-30.446 0.0ZM-44.376 59.92L-57.311 59.92L-57.311 72.187L1.791 72.187C26.665 72.187 44.973 55.966 44.973 30.256C44.973 4.351 26.665 -12.258 1.791 -12.258L-30.446 -12.258L-30.446 -66.836L-44.376 -66.836Z" transform="matrix(1 0 0 1 936.865 409.084)" fill="currentColor"/><path d="M0.0 0.0L13.134 0.0L13.134 114.498L0.0 114.498L0.0 126.765L39.998 126.765L39.998 114.498L26.665 114.498L26.665 0.0L39.998 0.0L39.998 -12.258L0.0 -12.258Z" transform="matrix(1 0 0 1 995.586 354.506)" fill="currentColor"/><path d="M0.0 0.0L14.129 0.0L2.985 -34.015L-7.761 -34.015Z" transform="matrix(1 0 0 1 1062.66 483.243)" fill="currentColor"/><path d="M0.0 0.0C0.0 0.0 11.144 -15.026 30.844 -15.026C41.988 -15.026 51.938 -9.684 51.938 0.796C51.938 22.544 -4.179 18.591 -4.179 50.625C-4.179 68.623 11.343 77.52 31.441 77.52C41.59 77.52 61.888 73.567 61.888 59.522L61.888 51.023L49.152 51.023L49.152 55.772C49.152 63.086 38.406 65.854 31.839 65.854C17.91 65.854 9.552 61.105 9.552 51.421C9.552 29.071 65.669 34.21 65.669 1.185C65.669 -15.424 50.545 -26.692 30.645 -26.692C4.577 -26.692 -7.761 -9.295 -7.761 -9.295Z" transform="matrix(1 0 0 1 1091.52 366.57)" fill="currentColor"/></g>
    </svg>
  )
}
