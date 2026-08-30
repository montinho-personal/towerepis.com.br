/**
 * Logotipo.
 *
 * Reconstrução tipográfica do selo do Instagram: "TOWER" em caixa alta com o
 * ponto vermelho no lugar do O, e "EPI's" abaixo. Mantém o reconhecimento e
 * descarta o degradê — que não escala, não imprime bem e envelhece rápido.
 *
 * PENDENTE: substituir pelo vetor oficial quando Helano/Cristina enviarem.
 */
export function Logo({ escuro = false }: { escuro?: boolean }) {
  return (
    <span className="inline-flex flex-col leading-none">
      <span
        className={`numeral text-[1.4rem] sm:text-[1.55rem] ${escuro ? 'text-paper' : 'text-ink'}`}
        style={{ letterSpacing: '0.02em' }}
      >
        T
        <span className="relative inline-block align-baseline">
          <span className="invisible">O</span>
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="block h-[0.72em] w-[0.72em] rounded-full bg-tower-red" />
          </span>
        </span>
        WER
      </span>
      <span
        className={`font-display text-[0.6rem] font-semibold tracking-[0.34em] ${escuro ? 'text-paper/70' : 'text-ink-2'}`}
      >
        EPI&rsquo;S
      </span>
    </span>
  )
}
