import Image from 'next/image'

/**
 * Retrato fotográfico.
 *
 * Único caminho para colocar foto de pessoa no site, para que o tratamento
 * seja um só. Sem canto arredondado e sem sombra decorativa — as duas coisas
 * que o sistema não tem — e sem moldura: o fundo do estúdio é um tom quente
 * bem mais escuro que o papel da página, então a foto já se recorta sozinha.
 * Moldura em cima disso viraria porta-retrato.
 *
 * A legenda é parte do argumento, não enfeite. O site inteiro afirma que quem
 * responde no WhatsApp são os dois donos; a foto só termina esse trabalho se
 * disser quem é quem.
 */
export function Retrato({
  src,
  alt,
  largura,
  altura,
  legenda,
  prioridade = false,
  tamanhos = '(min-width: 1024px) 34vw, 100vw',
}: {
  src: string
  alt: string
  largura: number
  altura: number
  legenda?: React.ReactNode
  /** true só na foto que aparece sem rolagem — carregar tudo com prioridade é não ter prioridade. */
  prioridade?: boolean
  tamanhos?: string
}) {
  return (
    // `min-w-0` não é enfeite: item de grid nasce com `min-width:auto`, e a
    // largura mínima de conteúdo de uma imagem é a largura intrínseca dela.
    // Sem isso a faixa do grid se recusa a encolher, o `w-full` da imagem
    // passa a valer 100% de 2046px, e a página inteira rola de lado no
    // celular — sem nenhum erro, só uma barra horizontal que ninguém quer.
    <figure className="min-w-0">
      <Image
        src={src}
        alt={alt}
        width={largura}
        height={altura}
        sizes={tamanhos}
        priority={prioridade}
        className="h-auto w-full max-w-full"
      />
      {legenda && (
        <figcaption className="mt-4 border-t-2 border-ink pt-3 text-[0.85rem] leading-snug text-ink-2">
          {legenda}
        </figcaption>
      )}
    </figure>
  )
}
