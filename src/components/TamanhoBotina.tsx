'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { IlustracaoMedida } from '@/components/IlustracaoMedida'
import { IconeSeta, IconeWhatsApp } from '@/components/Icones'
import { linkWhatsApp, LIMITE_MENSAGEM } from '@/lib/whatsapp'
import {
  rastrearCta,
  rastrearFerramenta,
  rastrearFerramentaAjuda,
  rastrearFerramentaConcluida,
  rastrearFerramentaIniciada,
  rastrearFerramentaMedidaInvalida,
  rastrearFerramentaReiniciada,
  rastrearFerramentaResultado,
  rastrearWhatsApp,
} from '@/lib/analytics'
import {
  desserializar,
  estimar,
  foraDaGrade,
  formatarCm,
  GRADE_MAX,
  GRADE_MIN,
  lerMedida,
  maiorPe,
  mensagemWhatsApp,
  MODELOS_UTILIZAVEIS,
  NOME_FAMILIA,
  ORIENTACAO_LARGURA,
  serializar,
  textoCompartilhar,
  textoEstimativa,
  type Estado,
  type FamiliaOrigem,
  type Largura,
  type Leitura,
  type Para,
} from '@/lib/tamanho-calcado'

/**
 * Calculadora de tamanho de botina.
 *
 * Três etapas, e a pessoa sabe em qual está: medir, informar, resultado. A
 * primeira ensina antes de pedir o número — quem digita a numeração do tênis
 * no campo de centímetros é o erro que a ferramenta existe para evitar.
 *
 * Modo rápido primeiro: um campo e um botão. Os dois pés, a largura e o
 * "para quem" são opcionais e não atrasam o resultado. Nenhum dado pessoal
 * é pedido antes, durante ou depois.
 */

const FERRAMENTA = 'tamanho-botina'
const CAMINHO = '/ferramentas/tamanho-de-botina/'

type Etapa = 'medir' | 'informar' | 'resultado'
const ETAPAS: { id: Etapa; rotulo: string }[] = [
  { id: 'medir', rotulo: 'Medir' },
  { id: 'informar', rotulo: 'Informar' },
  { id: 'resultado', rotulo: 'Resultado' },
]

const PAGINA_FAMILIA: Record<FamiliaOrigem, { href: string; rotulo: string }> = {
  seguranca: { href: '/calcados/seguranca/', rotulo: 'Calçados de segurança' },
  ocupacional: { href: '/calcados/ocupacionais/', rotulo: 'Calçados ocupacionais' },
  'bota-impermeavel': { href: '/conhecimento/bota-de-pvc-quando-e-a-resposta-certa/', rotulo: 'Quando a bota impermeável é a resposta' },
  confirmar: { href: '/calcados/comparativo/', rotulo: 'Ocupacional ou de segurança?' },
}

const MENSAGEM_ERRO: Record<Exclude<Leitura, { ok: true }>['erro'], string> = {
  vazio: 'Digite o comprimento do pé em centímetros.',
  formato: 'Confira a medida. Digite só o número, como 26,4.',
  fora: 'Confira a medida. Digite o comprimento do pé em centímetros — num pé adulto, fica entre 18 e 34 cm.',
  mm: 'Parece que a medida está em milímetros.',
}

const CAMPO =
  'w-full border border-rule-strong bg-paper px-4 py-3 font-display text-3xl font-bold tabular-nums tracking-tight focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink'

export function TamanhoBotina() {
  const [etapa, setEtapa] = useState<Etapa>('medir')
  const [texto, setTexto] = useState('')
  const [doisPes, setDoisPes] = useState(false)
  const [textoEsq, setTextoEsq] = useState('')
  const [textoDir, setTextoDir] = useState('')
  const [para, setPara] = useState<Para | undefined>()
  const [erro, setErro] = useState<{ campo: 'unico' | 'esq' | 'dir'; leitura: Exclude<Leitura, { ok: true }> } | null>(null)
  const [estado, setEstado] = useState<Estado | null>(null)
  const [calcado, setCalcado] = useState<FamiliaOrigem | undefined>()
  const [pes, setPes] = useState<{ esquerdo: number; direito: number } | null>(null)
  const titulo = useRef<HTMLHeadingElement>(null)
  const interagiu = useRef(false)
  const iniciou = useRef(false)

  // Estado vindo da URL: link compartilhado, ou chegada pelo teste "Qual calçado".
  useEffect(() => {
    const { estado: e, calcado: c } = desserializar(window.location.search)
    if (c) setCalcado(c)
    if (e) {
      setEstado(e)
      setPara(e.para)
      setEtapa('resultado')
    }
  }, [])

  // Foco no título de cada etapa, para leitor de tela e teclado. Só rola a
  // página depois que a pessoa agiu; ao abrir por link, a página fica onde
  // o navegador a deixou.
  useEffect(() => {
    if (!interagiu.current) return
    const el = titulo.current
    if (!el) return
    // Na etapa de informar, o foco vai direto ao campo: o rótulo dele já diz
    // o que digitar, e quem usa teclado não precisa de um Tab a mais para
    // começar. Nas outras, vai ao título da etapa.
    const campo = etapa === 'informar' ? document.querySelector<HTMLInputElement>('#medida, #medida-esq') : null
    ;(campo ?? el).focus({ preventScroll: true })
    requestAnimationFrame(() => el.scrollIntoView({ block: 'start', behavior: 'smooth' }))
  }, [etapa])

  function irPara(e: Etapa) {
    interagiu.current = true
    setEtapa(e)
  }

  function comecar() {
    if (!iniciou.current) {
      iniciou.current = true
      rastrearFerramentaIniciada(FERRAMENTA)
    }
    irPara('informar')
  }

  function reverMedicao() {
    rastrearFerramentaAjuda(FERRAMENTA)
    irPara('medir')
  }

  function falhar(campo: 'unico' | 'esq' | 'dir', leitura: Exclude<Leitura, { ok: true }>) {
    setErro({ campo, leitura })
    rastrearFerramentaMedidaInvalida(FERRAMENTA, leitura.erro)
    const id = campo === 'unico' ? 'medida' : campo === 'esq' ? 'medida-esq' : 'medida-dir'
    document.getElementById(id)?.focus()
  }

  function calcular(ev: React.FormEvent) {
    ev.preventDefault()
    let cm: number
    let medidas: { esquerdo: number; direito: number } | null = null
    if (doisPes) {
      const a = lerMedida(textoEsq)
      if (!a.ok) return falhar('esq', a)
      const b = lerMedida(textoDir)
      if (!b.ok) return falhar('dir', b)
      medidas = { esquerdo: a.cm, direito: b.cm }
      cm = maiorPe(a.cm, b.cm).maior
    } else {
      const l = lerMedida(texto)
      if (!l.ok) return falhar('unico', l)
      cm = l.cm
    }
    setErro(null)
    setPes(medidas)
    const novo: Estado = { cm, para, calcado }
    setEstado(novo)
    if (!iniciou.current) {
      iniciou.current = true
      rastrearFerramentaIniciada(FERRAMENTA)
    }
    const e = estimar(cm)
    rastrearFerramentaConcluida('estimativa-geral', FERRAMENTA)
    rastrearFerramentaResultado(FERRAMENTA, 'estimativa-geral', para === 'equipe' ? 'b2b' : 'b2c', {
      numero: textoEstimativa(e),
      dois_pes: Boolean(medidas),
      origem: calcado ? 'qual-calcado' : 'direto',
    })
    irPara('resultado')
  }

  function aceitarSugestao(campo: 'unico' | 'esq' | 'dir', cm: number) {
    const v = formatarCm(cm)
    if (campo === 'unico') setTexto(v)
    else if (campo === 'esq') setTextoEsq(v)
    else setTextoDir(v)
    setErro(null)
  }

  function refazer() {
    rastrearFerramentaReiniciada(FERRAMENTA)
    setEstado(null)
    setPes(null)
    setTexto('')
    setTextoEsq('')
    setTextoDir('')
    setErro(null)
    if (window.location.search) {
      // Preserva só a origem do teste de calçado; a medida sai da URL.
      window.history.replaceState(null, '', calcado ? `${CAMINHO}?calcado=${calcado}` : CAMINHO)
    }
    irPara('informar')
  }

  const indice = ETAPAS.findIndex((x) => x.id === etapa)

  return (
    <div className="max-w-3xl" data-ferramenta={FERRAMENTA}>
      {/* Três etapas. A lista é a navegação visual; o anúncio é o parágrafo. */}
      <ol className="mb-8 grid grid-cols-3 gap-2" aria-label="Etapas da calculadora">
        {ETAPAS.map((x, i) => (
          <li key={x.id} aria-current={i === indice ? 'step' : undefined}>
            <span className={`block h-1 ${i <= indice ? 'bg-tower-red' : 'bg-rule'}`} aria-hidden="true" />
            <span className={`mt-2 block font-display text-sm font-bold ${i === indice ? 'text-ink' : 'text-ink-3'}`}>
              {i + 1}. {x.rotulo}
            </span>
          </li>
        ))}
      </ol>
      <p className="sr-only" aria-live="polite">
        Etapa {indice + 1} de 3: {ETAPAS[indice].rotulo}
      </p>

      {calcado && etapa !== 'resultado' && (
        <p className="mb-6 border-l-4 border-ink bg-paper-2 px-4 py-3 text-[0.92rem]">
          Você veio do teste de calçado, com resultado <strong>{NOME_FAMILIA[calcado]}</strong>. Falta a numeração.
        </p>
      )}

      {etapa === 'medir' && (
        <section aria-labelledby="etapa">
          <h2 id="etapa" ref={titulo} tabIndex={-1} className="text-2xl outline-none sm:text-3xl">
            Como medir o seu pé
          </h2>
          <p className="mt-3 text-ink-2">
            Não precisa saber a sua numeração atual. Você só precisa medir o pé — e medir é mais
            confiável do que partir do número do tênis, que muda de marca para marca.
          </p>
          {/* Atalho para quem já mediu: no celular, o botão do fim da etapa
              fica duas telas abaixo, depois da ilustração e dos passos. */}
          <button
            type="button"
            onClick={comecar}
            className="mt-4 inline-flex min-h-11 items-center gap-2 font-display text-sm font-bold text-tower-red-deep underline underline-offset-4"
          >
            Já sei quanto mede meu pé <IconeSeta />
          </button>

          <div className="mt-6 grid items-start gap-6 md:grid-cols-[1.1fr_1fr]">
            <IlustracaoMedida className="w-full border border-rule bg-paper-2 p-2" />
            <ol className="space-y-3 text-[0.98rem] leading-relaxed">
              {[
                'Coloque uma folha no chão, encostada na parede.',
                'Fique em pé sobre a folha, com a meia que você usa no trabalho.',
                'Encoste o calcanhar na parede.',
                'Marque no papel a ponta do dedo mais longo — que nem sempre é o dedão.',
                'Meça, em centímetros, da parede até a marca.',
                'Repita no outro pé. Vale a medida do maior.',
              ].map((p, i) => (
                <li key={p} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-ink font-display text-sm font-bold text-paper">
                    {i + 1}
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 border-l-4 border-tower-red bg-tower-red-soft px-5 py-4 text-[0.95rem] leading-relaxed">
            <strong>Quando medir:</strong> no fim do dia, em pé, com o peso nos dois pés. O pé incha ao
            longo do dia e se alonga quando recebe o peso do corpo; medido de manhã e sentado, sai menor
            do que vai estar no fim do turno.
          </div>

          <button type="button" onClick={comecar} className="btn btn-red mt-8 w-full sm:w-auto">
            Começar: já medi o pé <IconeSeta />
          </button>
        </section>
      )}

      {etapa === 'informar' && (
        <section aria-labelledby="etapa">
          <h2 id="etapa" ref={titulo} tabIndex={-1} className="text-2xl outline-none sm:text-3xl">
            Quanto mede o seu maior pé?
          </h2>

          <form onSubmit={calcular} noValidate className="mt-6 max-w-md">
            {!doisPes ? (
              <Campo
                id="medida"
                rotulo="Comprimento do maior pé"
                valor={texto}
                aoMudar={(v) => {
                  setTexto(v)
                  if (erro) setErro(null)
                }}
                erro={erro?.campo === 'unico' ? erro.leitura : null}
                aoAceitar={(cm) => aceitarSugestao('unico', cm)}
              />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                <Campo
                  id="medida-esq"
                  rotulo="Pé esquerdo"
                  valor={textoEsq}
                  aoMudar={(v) => {
                    setTextoEsq(v)
                    if (erro) setErro(null)
                  }}
                  erro={erro?.campo === 'esq' ? erro.leitura : null}
                  aoAceitar={(cm) => aceitarSugestao('esq', cm)}
                  autoFocus
                />
                <Campo
                  id="medida-dir"
                  rotulo="Pé direito"
                  valor={textoDir}
                  aoMudar={(v) => {
                    setTextoDir(v)
                    if (erro) setErro(null)
                  }}
                  erro={erro?.campo === 'dir' ? erro.leitura : null}
                  aoAceitar={(cm) => aceitarSugestao('dir', cm)}
                />
              </div>
            )}

            <label className="mt-4 flex min-h-11 cursor-pointer items-center gap-3 text-[0.95rem]">
              <input
                type="checkbox"
                checked={doisPes}
                onChange={(e) => {
                  setDoisPes(e.target.checked)
                  setErro(null)
                }}
                className="h-5 w-5 accent-[var(--color-ink)]"
              />
              Medi os dois pés e deram medidas diferentes
            </label>

            <fieldset className="mt-5">
              <legend className="font-display text-sm font-bold">A compra é para: <span className="font-normal text-ink-3">(opcional)</span></legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {(
                  [
                    ['mim', 'Para mim'],
                    ['equipe', 'Para uma equipe'],
                  ] as [Para, string][]
                ).map(([v, r]) => (
                  <label
                    key={v}
                    className={`relative flex min-h-11 cursor-pointer items-center gap-2 border px-4 font-display text-sm font-semibold ${
                      para === v ? 'border-ink bg-ink text-paper' : 'border-rule-strong bg-paper hover:border-ink'
                    }`}
                  >
                    <input
                      type="radio"
                      name="para"
                      value={v}
                      checked={para === v}
                      onChange={() => setPara(v)}
                      className="sr-only"
                    />
                    {r}
                  </label>
                ))}
              </div>
            </fieldset>

            <button type="submit" className="btn btn-red mt-7 w-full text-base">
              Calcular meu tamanho
            </button>
          </form>

          <button
            type="button"
            onClick={reverMedicao}
            className="mt-4 inline-flex min-h-11 items-center text-sm underline underline-offset-4 hover:text-tower-red"
          >
            Ainda não mediu? Ver como medir
          </button>
        </section>
      )}

      {etapa === 'resultado' && estado && (
        <Resultado
          estado={estado}
          pes={pes}
          titulo={titulo}
          refazer={refazer}
          aoMudarLargura={(l) => {
            rastrearFerramenta('largura', l, FERRAMENTA)
            setEstado({ ...estado, largura: l })
          }}
        />
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ campo */

function Campo({
  id,
  rotulo,
  valor,
  aoMudar,
  erro,
  aoAceitar,
  autoFocus,
}: {
  id: string
  rotulo: string
  valor: string
  aoMudar: (v: string) => void
  erro: Exclude<Leitura, { ok: true }> | null
  aoAceitar: (cm: number) => void
  autoFocus?: boolean
}) {
  const dica = `${id}-dica`
  const msg = `${id}-erro`
  return (
    <div>
      <label htmlFor={id} className="block font-display text-sm font-bold">
        {rotulo}, em centímetros
      </label>
      <div className="mt-2 flex items-stretch">
        <input
          id={id}
          name={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          enterKeyHint="done"
          placeholder="26,4"
          value={valor}
          onChange={(e) => aoMudar(e.target.value)}
          onFocus={(e) => {
            // No celular o teclado sobe por cima da metade de baixo da tela.
            // Centralizar o campo deixa o botão de calcular à vista.
            const el = e.currentTarget
            if (window.innerWidth < 768) setTimeout(() => el.scrollIntoView({ block: 'center', behavior: 'smooth' }), 250)
          }}
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? `${msg} ${dica}` : dica}
          autoFocus={autoFocus}
          className={`${CAMPO} ${erro ? 'border-tower-red' : ''}`}
        />
        <span className="flex items-center border border-l-0 border-rule-strong bg-paper-2 px-4 font-display text-xl font-bold text-ink-2" aria-hidden="true">
          cm
        </span>
      </div>
      <p id={dica} className="mt-2 text-sm text-ink-3">
        Pode usar vírgula ou ponto. Exemplo: 26,4.
      </p>
      {erro && (
        <div id={msg} role="alert" className="mt-2 text-[0.95rem] font-semibold text-tower-red-deep">
          {MENSAGEM_ERRO[erro.erro]}
          {erro.erro === 'mm' && (
            <button
              type="button"
              onClick={() => aoAceitar(erro.sugestaoCm)}
              className="flex min-h-11 items-center underline underline-offset-4"
            >
              Usar {formatarCm(erro.sugestaoCm)} cm
            </button>
          )}
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------- resultado */

function Resultado({
  estado,
  pes,
  titulo,
  refazer,
  aoMudarLargura,
}: {
  estado: Estado
  pes: { esquerdo: number; direito: number } | null
  titulo: React.RefObject<HTMLHeadingElement | null>
  refazer: () => void
  aoMudarLargura: (l: Largura) => void
}) {
  const [copiado, setCopiado] = useState(false)
  const e = estimar(estado.cm)
  const b2b = estado.para === 'equipe'
  const mensagem = mensagemWhatsApp(estado)
  const linkZap = linkWhatsApp('ferramenta-tamanho', mensagem.length > LIMITE_MENSAGEM ? undefined : mensagem)
  const dif = pes ? maiorPe(pes.esquerdo, pes.direito) : null
  const cm = formatarCm(estado.cm)

  // O resultado mora na URL: recarregar, voltar e compartilhar dão no mesmo.
  useEffect(() => {
    window.history.replaceState(null, '', `${CAMINHO}?${serializar(estado)}`)
  }, [estado])

  async function compartilhar() {
    rastrearCta('compartilhar-resultado', CAMINHO)
    const url = window.location.href
    const texto = textoCompartilhar(estado)
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Meu tamanho de botina', text: texto, url })
        return
      }
    } catch {
      // cancelado pela pessoa: cai no copiar
    }
    try {
      await navigator.clipboard.writeText(`${texto} ${url}`)
      setCopiado(true)
    } catch {
      setCopiado(false)
    }
  }

  return (
    <section aria-labelledby="etapa" data-resultado={e.tipo}>
      <div className="border border-ink bg-paper">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule px-6 py-4">
          <h2 id="etapa" ref={titulo} tabIndex={-1} className="eyebrow scroll-mt-28 outline-none">
            Numeração estimada
          </h2>
          <span className="border border-rule-strong px-2 py-1 font-display text-xs font-bold uppercase tracking-wide text-ink-2">
            Estimativa geral
          </span>
        </div>
        <div className="px-6 py-8 text-center sm:py-10">
          <p
            className={`whitespace-nowrap font-display font-bold leading-none tracking-tight text-ink ${
              e.tipo === 'unico' ? 'text-7xl sm:text-8xl' : 'text-6xl sm:text-7xl'
            }`}
            data-numero
          >
            {textoEstimativa(e)}
          </p>
          <p className="mt-4 font-display text-lg font-semibold">
            Seu pé: {cm} cm
            {dif && dif.lado !== 'iguais' && <span className="font-normal text-ink-2"> — o {dif.lado}, que é o maior</span>}
          </p>
        </div>
        <div className="border-t border-rule bg-paper-2 px-6 py-5 text-[0.98rem] leading-relaxed">
          {e.tipo === 'unico' ? (
            <p>
              Pela referência usada nesta ferramenta, {cm} cm corresponde aproximadamente ao{' '}
              <strong>{e.numero}</strong>. É um bom ponto de partida para a prova.
            </p>
          ) : (
            <p>
              Pela referência usada nesta ferramenta, {cm} cm fica <strong>entre o {e.de} e o {e.ate}</strong>.
              Vale provar os dois: nessa faixa, quem decide é a forma do modelo.
            </p>
          )}
          <p className="mt-2 text-ink-2">
            A forma muda entre marcas e modelos. Antes de comprar, confira a tabela do modelo ou prove.
          </p>
        </div>
      </div>

      {dif && dif.diferenca >= 0.5 && (
        <p className="mt-4 border-l-4 border-ink bg-paper-2 px-4 py-3 text-[0.95rem]">
          Seus pés têm {formatarCm(dif.diferenca)} cm de diferença. É comum. A numeração vem do
          maior, e a prova se faz com os dois pés calçados.
        </p>
      )}

      {foraDaGrade(e) && (
        <p className="mt-4 border-l-4 border-tower-red bg-tower-red-soft px-4 py-3 text-[0.95rem]">
          Essa numeração fica fora da grade de {GRADE_MIN} a {GRADE_MAX} do orçamento do site. Vale
          perguntar se o modelo que você procura é fabricado nela.
        </p>
      )}

      {/* Refinar: largura. Orienta, não muda o número — não há dado de largura
          dos modelos para mudar com honestidade. */}
      <details className="mt-6 border border-rule p-5" open={Boolean(estado.largura)}>
        <summary className="flex min-h-11 cursor-pointer items-center font-display font-bold">
          Quero melhorar a estimativa
        </summary>
        <fieldset className="mt-3">
          <legend className="text-[0.95rem] text-ink-2">Como você considera o seu pé?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {(
              [
                ['estreito', 'Estreito'],
                ['normal', 'Normal'],
                ['largo', 'Largo'],
                ['nao-sei', 'Não sei'],
              ] as [Largura, string][]
            ).map(([v, r]) => (
              <label
                key={v}
                className={`relative flex min-h-11 cursor-pointer items-center border px-4 font-display text-sm font-semibold ${
                  estado.largura === v ? 'border-ink bg-ink text-paper' : 'border-rule-strong bg-paper hover:border-ink'
                }`}
              >
                <input type="radio" name="largura" value={v} checked={estado.largura === v} onChange={() => aoMudarLargura(v)} className="sr-only" />
                {r}
              </label>
            ))}
          </div>
        </fieldset>
        {estado.largura && (
          <p className="mt-4 text-[0.95rem] leading-relaxed" aria-live="polite">
            {ORIENTACAO_LARGURA[estado.largura] ??
              'Com pé de largura comum, o número estimado vale como está. A prova confirma.'}
          </p>
        )}
        <p className="mt-4 text-sm text-ink-3">
          {MODELOS_UTILIZAVEIS.length === 0
            ? 'Tabela por modelo: ainda não publicamos a tabela oficial de nenhum modelo, então o resultado acima é só a estimativa geral. A numeração do modelo se confirma na conversa.'
            : null}
        </p>
      </details>

      {/* Conferir na prova */}
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-xl">Como saber se ficou bom</h3>
          <ul className="mt-4 space-y-3 text-[0.95rem] leading-relaxed">
            {[
              'Prove no fim do dia, com a meia do trabalho, e caminhe alguns minutos.',
              'Entre o dedo mais longo e a ponta, sobra cerca de 1 cm.',
              'Os dedos não encostam na biqueira, nem por cima nem na ponta.',
              'O calcanhar fica no lugar ao andar, sem subir e descer.',
              'As laterais não apertam. Se apertam, é a forma, e trocar de número não resolve.',
            ].map((x) => (
              <li key={x} className="flex gap-3">
                <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 bg-tower-red" />
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl">Botina laceia?</h3>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-2">
            O couro amacia e cede um pouco na largura e no peito do pé. O comprimento não aumenta, e a
            biqueira de proteção não cede nada. Calçado que aperta na prova vai continuar apertando:
            não vale comprar esperando que lacee. O que fazer quando já machuca está em{' '}
            <Link href="/conhecimento/botina-que-machuca-calcado-ou-numeracao/" className="underline underline-offset-4 hover:text-tower-red">
              botina que machuca
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Tamanho não é escolha de EPI */}
      <div className="mt-10 border border-ink p-6">
        <p className="eyebrow">Agora falta escolher o modelo certo</p>
        <p className="mt-3 text-[0.98rem] leading-relaxed">
          Esta calculadora trata só do tamanho. Tipo de proteção, biqueira, solado e CA dependem do
          risco da atividade, e não da numeração.
        </p>
        {estado.calcado ? (
          <p className="mt-3 text-[0.98rem]">
            Pelo teste que você fez, o caminho é <strong>{NOME_FAMILIA[estado.calcado]}</strong>.{' '}
            <Link
              href={PAGINA_FAMILIA[estado.calcado].href}
              className="font-semibold underline underline-offset-4 hover:text-tower-red"
              onClick={() => rastrearCta('familia-do-teste', CAMINHO)}
            >
              {PAGINA_FAMILIA[estado.calcado].rotulo}
            </Link>
          </p>
        ) : (
          <Link
            href="/ferramentas/qual-calcado-usar/"
            className="btn btn-ink mt-5"
            onClick={() => rastrearCta('qual-calcado', CAMINHO)}
          >
            Descobrir qual calçado é ideal para meu trabalho <IconeSeta />
          </Link>
        )}
      </div>

      {/* CTA principal */}
      <div className="mt-10 band-ink p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl">{b2b ? 'Vai comprar para vários funcionários?' : 'Quer confirmar antes de comprar?'}</h3>
        <p className="mt-3 max-w-xl text-paper/80">
          {b2b
            ? 'Em vez de repetir o cálculo pessoa a pessoa, monte a grade da equipe e envie pronta. Ou mande a sua medida agora e a gente ajuda a organizar o resto.'
            : 'A mensagem já vai com a sua medida e a numeração estimada. A gente confirma a numeração do modelo antes do pedido.'}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={linkZap}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-zap"
            onClick={() =>
              rastrearWhatsApp({
                contexto: 'ferramenta-tamanho',
                pagina: CAMINHO,
                secao: b2b ? 'resultado-equipe' : 'resultado',
                publico: b2b ? 'b2b' : 'b2c',
                categoria: estado.calcado,
              })
            }
          >
            <IconeWhatsApp />
            Falar com a Tower
          </a>
          {b2b && (
            <Link href={`/ferramentas/grade-de-numeracao/${estado.calcado ? `?calcado=${estado.calcado}` : ''}`} className="btn btn-linha" onClick={() => rastrearCta('grade-equipe', CAMINHO)}>
              Montar a grade da equipe
            </Link>
          )}
        </div>
        <details className="mt-5 text-xs text-paper/60">
          <summary className="inline-flex min-h-11 cursor-pointer items-center underline underline-offset-4">Ver a mensagem que vai ser enviada</summary>
          <p className="mt-3 whitespace-pre-line italic leading-relaxed">{mensagem}</p>
        </details>
      </div>

      {!b2b && (
        <p className="mt-6 text-[0.95rem] text-ink-2">
          Comprando para uma equipe?{' '}
          <Link href="/ferramentas/grade-de-numeracao/" className="font-semibold underline underline-offset-4 hover:text-tower-red" onClick={() => rastrearCta('grade-equipe', CAMINHO)}>
            Monte a grade de numeração
          </Link>{' '}
          e envie o pedido pronto.
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-rule pt-6 text-sm">
        <button type="button" onClick={compartilhar} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-tower-red">
          Compartilhar resultado
        </button>
        <button type="button" onClick={refazer} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-tower-red">
          Medir novamente
        </button>
        <span aria-live="polite" className="text-ink-3">
          {copiado ? 'Resultado copiado.' : ''}
        </span>
      </div>
    </section>
  )
}
