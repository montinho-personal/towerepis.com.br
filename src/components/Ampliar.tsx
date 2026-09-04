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
 * DOIS PASSOS DE ZOOM, e SEMPRE COMEÇA PELA IMAGEM INTEIRA. Abrir é para ver
 * o todo; aproximar é o passo seguinte, num toque, pelo botão ou pela própria
 * imagem. Aproximado, ela passa da largura do visor e se arrasta nos dois
 * eixos.
 *
 * UMA VERSÃO ANTERIOR ABRIA JÁ APROXIMADA quando calculava que encaixar
 * renderia pouco — num visor de 390px a capa vai de 350px na página para
 * 366px encaixada, 1,05x, e a conta dizia que não valia o toque. A conta
 * estava certa e a decisão estava errada: abrir cortado parece defeito, não
 * recurso. Quem toca numa imagem quer vê-la, e só depois decide se quer chegar
 * perto. Ganho medido não justifica primeira impressão de tela quebrada.
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
    const largura = window.innerWidth
    // Aproximar não passa da resolução do arquivo, e nunca fica menor que a
    // tela: acima disso o navegador só interpola pixel que não existe.
    setLarguraPerto(Math.max(largura, Math.min(largura * 2.5, larguraReal || largura * 2.5)))
    setPerto(false)
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
              {perto ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={src}
                  alt={alt}
                  onClick={() => setPerto(false)}
                  className="max-w-none cursor-zoom-out"
                  style={larguraPerto ? { width: larguraPerto } : undefined}
                />
              ) : (
                /* Numa tela em pé com imagem deitada, encaixar sobra altura e
                   não sobra largura — a imagem fica pequena e o espaço vazio
                   embaixo parece erro. A dica ocupa esse espaço dizendo o que
                   fazer em seguida, que é exatamente o que a pessoa quer
                   saber ao chegar aqui. */
                <div className="flex max-h-full flex-col items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt}
                    onClick={() => setPerto(true)}
                    className="min-h-0 max-w-full cursor-zoom-in object-contain"
                  />
                  <p className="shrink-0 text-center text-[0.8rem] text-paper/55">
                    <span className="sm:hidden">Toque na imagem para ver de perto</span>
                    <span className="hidden sm:inline">
                      Clique na imagem para ver de perto
                    </span>
                  </p>
                </div>
              )}
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
