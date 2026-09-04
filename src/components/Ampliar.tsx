'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Ampliar imagem.
 *
 * POR QUE EXISTE. As capas dos artigos são infográficos: têm texto dentro. No
 * celular a capa ocupa 92vw e a legenda interna fica em corpo 6 — está lá e
 * não dá para ler. Uma imagem cujo conteúdo é texto precisa de um jeito de
 * ver de perto, senão ela é decoração cara.
 *
 * `<dialog>` NATIVO, e isso resolve três problemas de uma vez: o foco fica
 * preso dentro por conta do navegador, ESC fecha sem código, e o elemento vai
 * para a *top layer* — acima de tudo, sem disputar `z-index` com a barra
 * contextual (z-40) nem com o banner de consentimento (z-50). Empilhar
 * `z-index` até ganhar é o tipo de solução que quebra na próxima camada.
 *
 * DOIS PASSOS DE ZOOM, não um. Abrir só "em tela cheia" não resolve o caso
 * que motivou isto: no celular a tela cheia tem a mesma largura que os 92vw
 * de antes. Então o primeiro passo encaixa a imagem inteira na tela, e o
 * segundo amplia além da largura do visor, com rolagem nos dois eixos para
 * arrastar. É o que a pessoa faria com dois dedos, disponível também para
 * quem clica com o mouse.
 *
 * E ÀS VEZES O PRIMEIRO PASSO É INÚTIL. Medido: num visor de 390px a capa de
 * artigo ocupa 350px na página e 366px encaixada — 1,05x. O retrato no
 * desktop vai de 426px para 479px, 1,1x, porque ali quem limita é a ALTURA e
 * não a largura. Abrir nesses casos seria pedir um toque para não mudar nada.
 *
 * Então o componente calcula o encaixe antes de abrir, com as dimensões reais
 * da imagem, e abre aproximado sempre que encaixar renderia menos de 1,4x. O
 * botão "Ver inteira" continua ali para quem quiser o oposto. Uma regra só
 * sobre largura não daria conta: era o que eu tinha, e ela deixava o retrato
 * abrindo em 1,1x.
 *
 * O ZOOM NÃO PASSA DA RESOLUÇÃO DO ARQUIVO, e é por isso que `larguraReal`
 * é uma propriedade em vez de ser lida da imagem. O `naturalWidth` do
 * `next/image` devolve o tamanho SERVIDO, não o do arquivo: num celular ele
 * dá 390px para uma capa de 1536px. Uma versão anterior usava esse número
 * como teto e o zoom não saía do lugar — abria em 1,1x justamente no caso que
 * motivou o componente. A proporção pode vir da miniatura (não muda com o
 * tamanho servido); a resolução, não.
 *
 * NÃO GUARDA NADA e não carrega nada de fora: o `<img>` de dentro aponta para
 * o mesmo arquivo que o `next/image` já baixou, então abrir costuma vir do
 * cache.
 */
/** Altura aproximada da barra de cima mais a legenda, para calcular o encaixe. */
const CHROME = 130

export function Ampliar({
  src,
  alt,
  larguraReal,
  legenda,
  children,
}: {
  /** Caminho do arquivo cheio. O `next/image` de fora serve a versão reduzida. */
  src: string
  alt: string
  /** Largura do arquivo original, em px. Teto do zoom. */
  larguraReal: number
  /** Texto curto mostrado sob a imagem ampliada. Padrão: o próprio alt. */
  legenda?: string
  children: React.ReactNode
}) {
  const caixa = useRef<HTMLDialogElement>(null)
  const gatilho = useRef<HTMLButtonElement>(null)
  const [aberto, setAberto] = useState(false)
  const [perto, setPerto] = useState(false)

  /** Largura máxima útil do zoom, em px. Definida ao abrir. */
  const [larguraPerto, setLarguraPerto] = useState(0)

  const abrir = useCallback(() => {
    const botao = gatilho.current
    const img = botao?.querySelector('img')
    const naPagina = botao?.getBoundingClientRect().width ?? 0
    // Proporção pode vir da miniatura; resolução, não. Ver o cabeçalho.
    const nw = img?.naturalWidth ?? 0
    const nh = img?.naturalHeight ?? 0

    // Área livre dentro do diálogo: a tela menos a barra de cima e a legenda.
    const largura = window.innerWidth
    const altura = Math.max(120, window.innerHeight - CHROME)

    // Quanto a imagem mede encaixada — limitada pela largura OU pela altura,
    // o que apertar primeiro.
    const encaixada = nw && nh ? Math.min(largura, (altura * nw) / nh) : largura

    // Aproximar não passa da resolução do arquivo, e nunca fica menor que a
    // tela: acima disso o navegador só interpola pixel que não existe.
    setLarguraPerto(Math.max(largura, Math.min(largura * 2.5, larguraReal || largura * 2.5)))

    // Encaixar que rende menos de 1,4x não vale o toque.
    setPerto(naPagina > 0 && encaixada / naPagina < 1.4)
    setAberto(true)
    caixa.current?.showModal()
  }, [larguraReal])

  const fechar = useCallback(() => {
    setAberto(false)
    caixa.current?.close()
  }, [])

  // `close` dispara também no ESC, que o navegador trata sozinho — sem isto o
  // estado de React ficaria dizendo "aberto" com o diálogo já fechado.
  useEffect(() => {
    const el = caixa.current
    if (!el) return
    const aoFechar = () => setAberto(false)
    el.addEventListener('close', aoFechar)
    return () => el.removeEventListener('close', aoFechar)
  }, [])

  // Trava a rolagem do documento atrás. O `<dialog>` modal já bloqueia a
  // interação, mas o Safari continua rolando a página por baixo.
  useEffect(() => {
    if (!aberto) return
    const antes = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = antes
    }
  }, [aberto])

  return (
    <>
      {/* O botão não muda o layout: é bloco, sem preenchimento e com a mesma
          largura da imagem. Trocar a figura por um botão não pode mexer um
          pixel de onde a imagem estava. */}
      <button
        ref={gatilho}
        type="button"
        onClick={abrir}
        aria-label={`Ampliar imagem: ${alt}`}
        className="group relative block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tower-red"
      >
        {children}
        {/* Dica visual discreta, só onde há mouse: no toque não existe hover e
            um selo permanente sobre a imagem seria sujeira. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-3 hidden items-center gap-1.5 bg-ink/85 px-2.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-paper opacity-0 transition-opacity group-hover:opacity-100 motion-reduce:transition-none sm:inline-flex"
        >
          <IconeLupa />
          Ampliar
        </span>
      </button>

      <dialog
        ref={caixa}
        aria-label={`Imagem ampliada: ${alt}`}
        className="ampliador"
      >
        {aberto && (
          <div className="flex h-full w-full flex-col">
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-grafite-600 px-4 py-3">
              <button
                type="button"
                onClick={() => setPerto((v) => !v)}
                className="btn btn-linha px-4 py-2 text-[0.8rem]"
              >
                <IconeLupa />
                {perto ? 'Ver inteira' : 'Aproximar'}
              </button>
              <button
                type="button"
                onClick={fechar}
                aria-label="Fechar imagem ampliada"
                className="flex h-11 w-11 items-center justify-center text-paper/70 transition-colors hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
              >
                <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>

            <div
              // Em "inteira" sobra área vazia em volta da imagem, e clicar
              // nela fecha — que é o gesto que todo mundo tenta. O fundo do
              // `<dialog>` nunca é clicável aqui: ele ocupa a tela inteira,
              // então `::backdrop` não tem área nenhuma.
              onClick={(e) => {
                if (!perto && e.target === e.currentTarget) fechar()
              }}
              className={`min-h-0 flex-1 ${perto ? 'overflow-auto' : 'flex cursor-zoom-out items-center justify-center overflow-hidden p-3'}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                onClick={() => setPerto((v) => !v)}
                className={
                  perto
                    ? 'max-w-none cursor-zoom-out'
                    : 'max-h-full max-w-full cursor-zoom-in object-contain'
                }
                style={perto && larguraPerto ? { width: larguraPerto } : undefined}
              />
            </div>

            {/* Perto, a altura vale mais que a descrição: quem aproximou está
                lendo a imagem, não a legenda dela. */}
            {!perto && (
              <p className="shrink-0 border-t border-grafite-600 px-4 py-3 text-[0.8rem] leading-snug text-paper/70">
                {legenda ?? alt}
              </p>
            )}
          </div>
        )}
      </dialog>
    </>
  )
}

function IconeLupa() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0" aria-hidden="true" fill="none">
      <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="2" />
      <path d="M12.5 12.5L17 17" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
