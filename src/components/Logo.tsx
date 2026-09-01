/**
 * Logotipo.
 *
 * Reconstrução tipográfica: "TOWER" em caixa alta com o ponto vermelho no
 * lugar do O, e "EPI's" abaixo. Descarta o degradê do selo — que não escala,
 * não imprime bem e envelhece rápido.
 *
 * DIVERGÊNCIA A RESOLVER: o selo de 1000px que Helano/Cristina enviaram tem o
 * O comum, sem ponto. O ponto veio da leitura que fiz do Instagram e pode ter
 * sido invenção minha. Está aguardando decisão deles — trocar o desenho da
 * marca não é escolha de quem faz o site.
 *
 * PENDENTE: o vetor oficial (AI, EPS, SVG ou PDF). O arquivo que chegou é
 * raster com fundo vermelho chapado, então não substitui isto no cabeçalho.
 */
export function Logo({ escuro = false }: { escuro?: boolean }) {
  return (
    <span className="inline-flex flex-col leading-none">
      <span
        className={`numeral text-[1.6rem] sm:text-[1.85rem] ${escuro ? 'text-paper' : 'text-ink'}`}
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
        className={`font-display text-[0.66rem] font-bold tracking-[0.3em] ${escuro ? 'text-paper/70' : 'text-ink-2'}`}
      >
        EPI&rsquo;s
      </span>
    </span>
  )
}
