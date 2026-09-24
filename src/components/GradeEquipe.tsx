'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { IconeSeta, IconeWhatsApp } from '@/components/Icones'
import { linkWhatsApp, LIMITE_MENSAGEM } from '@/lib/whatsapp'
import {
  rastrearCta,
  rastrearFerramenta,
  rastrearFerramentaConcluida,
  rastrearFerramentaIniciada,
  rastrearFerramentaReiniciada,
  rastrearFerramentaResultado,
  rastrearWhatsApp,
} from '@/lib/analytics'
import {
  calcular,
  CHAVE_LOCAL,
  conferir,
  csvGrade,
  CSV_MODELO,
  duplicados,
  ESTADO_INICIAL,
  faixaEquipe,
  interpretarLista,
  LIMITE_ALERTA_POR_NUMERO,
  lerQuantidade,
  lerSalvo,
  mensagemWhatsApp,
  novoId,
  NUMEROS,
  PARES_POR_PESSOA_MAX,
  paraSalvar,
  RESERVA_PCT_MAX,
  sugestaoPorNumeracao,
  temConteudo,
  textoGrade,
  type Estado,
  type Importacao,
  type Resultado,
  type SabeModelo,
} from '@/lib/grade-equipe'
import { NOME_FAMILIA, type FamiliaOrigem } from '@/lib/tamanho-calcado'

/**
 * Calculadora de grade de numeração da equipe.
 *
 * Três etapas — equipe, pedido, grade pronta — e nenhuma obrigatória além
 * da primeira. Quem já tem "40: 12, 41: 8, 42: 4" digita, clica duas vezes
 * e tem a grade; pares por pessoa e reserva já vêm no valor neutro (1 par,
 * sem reserva).
 *
 * O total aparece enquanto a pessoa digita, porque é o que responde "está
 * faltando alguém?" antes de ela precisar perguntar.
 *
 * Nada aqui depende de servidor: a conta é feita no navegador, a grade fica
 * salva no navegador (sem os nomes), e a mensagem do WhatsApp é montada no
 * navegador.
 */

const FERRAMENTA = 'grade-equipe'
const CAMINHO = '/ferramentas/grade-de-numeracao/'

type Etapa = 'equipe' | 'pedido' | 'resultado'
const ETAPAS: { id: Etapa; rotulo: string }[] = [
  { id: 'equipe', rotulo: 'Equipe' },
  { id: 'pedido', rotulo: 'Pedido' },
  { id: 'resultado', rotulo: 'Grade pronta' },
]

const GRUPOS_SUGERIDOS = ['Produção', 'Logística', 'Manutenção', 'Limpeza', 'Cozinha', 'Administrativo', 'Forma feminina']

const BOTAO_PASSO =
  'flex h-11 w-11 shrink-0 items-center justify-center border border-rule-strong bg-paper font-display text-xl font-bold hover:border-ink hover:bg-paper-2 disabled:opacity-40'
const CAMPO_NUM =
  'h-11 w-16 border border-rule-strong bg-paper text-center font-display text-lg font-bold tabular-nums focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink'
const CAMPO_TXT =
  'min-h-11 w-full border border-rule-strong bg-paper px-3 text-[0.98rem] focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink'
const CHIP = (ativo: boolean) =>
  `relative flex min-h-11 cursor-pointer items-center border px-4 font-display text-sm font-semibold ${
    ativo ? 'border-ink bg-ink text-paper' : 'border-rule-strong bg-paper hover:border-ink'
  }`

const pares = (n: number) => `${n} ${n === 1 ? 'par' : 'pares'}`
const pessoas = (n: number) => `${n} ${n === 1 ? 'pessoa' : 'pessoas'}`

export function GradeEquipe({ tamanho = false }: { tamanho?: boolean }) {
  const [estado, setEstado] = useState<Estado>(ESTADO_INICIAL)
  const [textos, setTextos] = useState<Record<string, string>>({})
  const [etapa, setEtapa] = useState<Etapa>('equipe')
  const [carregado, setCarregado] = useState(false)
  const [restaurado, setRestaurado] = useState(false)
  const [aviso, setAviso] = useState('')
  const [limpando, setLimpando] = useState(false)
  const [tentouVazio, setTentouVazio] = useState(false)
  const titulo = useRef<HTMLHeadingElement>(null)
  const interagiu = useRef(false)
  const iniciou = useRef(false)

  // Carrega o que ficou salvo e a origem do teste de calçado.
  useEffect(() => {
    let salvo: Estado | null = null
    try {
      salvo = lerSalvo(window.localStorage.getItem(CHAVE_LOCAL))
    } catch {
      salvo = null
    }
    const calcado = new URLSearchParams(window.location.search).get('calcado')
    const origem = calcado && calcado in NOME_FAMILIA ? (calcado as FamiliaOrigem) : undefined
    if (salvo && temConteudo(salvo)) {
      setEstado({ ...salvo, calcado: origem ?? salvo.calcado })
      setTextos(Object.fromEntries(Object.entries(salvo.contagem).map(([k, v]) => [k, String(v)])))
      setRestaurado(true)
    } else if (origem) {
      setEstado((e) => ({ ...e, calcado: origem }))
    }
    setCarregado(true)
  }, [])

  // Salva a cada mudança, sem os nomes. Grade vazia não deixa rastro.
  useEffect(() => {
    if (!carregado) return
    const t = setTimeout(() => {
      try {
        if (temConteudo(estado)) window.localStorage.setItem(CHAVE_LOCAL, paraSalvar(estado))
        else window.localStorage.removeItem(CHAVE_LOCAL)
      } catch {
        // navegador sem armazenamento: a ferramenta funciona igual, só não lembra
      }
    }, 300)
    return () => clearTimeout(t)
  }, [estado, carregado])

  useEffect(() => {
    if (!interagiu.current) return
    const el = titulo.current
    if (!el) return
    el.focus({ preventScroll: true })
    requestAnimationFrame(() => el.scrollIntoView({ block: 'start', behavior: 'smooth' }))
  }, [etapa])

  const resultado = useMemo(() => calcular(estado), [estado])
  const conf = conferir(estado, resultado)

  function mudar(parcial: Partial<Estado>) {
    if (!iniciou.current) {
      iniciou.current = true
      rastrearFerramentaIniciada(FERRAMENTA)
    }
    setEstado((e) => ({ ...e, ...parcial }))
  }

  function irPara(e: Etapa) {
    interagiu.current = true
    setEtapa(e)
  }

  function gerar() {
    const r = calcular(estado)
    rastrearFerramentaConcluida(faixaEquipe(r.pessoas + r.pendentes), FERRAMENTA)
    rastrearFerramentaResultado(FERRAMENTA, estado.reserva.tipo, 'b2b', {
      faixa_equipe: faixaEquipe(r.pessoas + r.pendentes),
      pares_total: r.pedido,
      pares_por_pessoa: estado.paresPorPessoa,
      reserva_pct: estado.reserva.tipo === 'percentual' ? estado.reserva.pct : undefined,
      modo: estado.modo,
      pendentes: r.pendentes > 0,
    })
    irPara('resultado')
  }

  function limpar() {
    rastrearFerramentaReiniciada(FERRAMENTA)
    setEstado({ ...ESTADO_INICIAL, calcado: estado.calcado })
    setTextos({})
    setLimpando(false)
    setRestaurado(false)
    setAviso('Grade apagada.')
    try {
      window.localStorage.removeItem(CHAVE_LOCAL)
    } catch {}
    irPara('equipe')
  }

  const indice = ETAPAS.findIndex((x) => x.id === etapa)
  const vazio = resultado.pessoas === 0 && resultado.pendentes === 0

  return (
    <div className="max-w-4xl" data-ferramenta={FERRAMENTA}>
      <ol className="mb-6 grid grid-cols-3 gap-2" aria-label="Etapas da calculadora">
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

      {restaurado && etapa === 'equipe' && (
        <p className="mb-6 border-l-4 border-ink bg-paper-2 px-4 py-3 text-[0.92rem]">
          Recuperamos a grade que você estava montando neste navegador. Os nomes não ficam salvos,
          só números e setores.
        </p>
      )}
      {aviso && (
        <p className="mb-6 text-sm text-ink-2" role="status">
          {aviso}
        </p>
      )}

      {etapa !== 'resultado' && <Placar r={resultado} estado={estado} />}

      {etapa === 'equipe' && (
        <section aria-labelledby="etapa">
          <h2 id="etapa" ref={titulo} tabIndex={-1} className="text-2xl outline-none sm:text-3xl">
            Informe a numeração da equipe
          </h2>
          <p className="mt-3 max-w-2xl text-ink-2">
            Não precisa preencher números que a equipe não usa, nem saber o total antes: a soma é
            feita enquanto você digita.
          </p>

          <fieldset className="mt-6">
            <legend className="font-display text-sm font-bold">Como você tem a numeração?</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {(
                [
                  ['grade', 'Já tenho a quantidade por número', 'Ex.: 40 → 12 pessoas'],
                  ['lista', 'Quero montar a lista por pessoa', 'Um nome por linha, ou colar uma lista'],
                ] as const
              ).map(([v, r, d]) => (
                <label key={v} className={`${CHIP(estado.modo === v)} flex-col items-start justify-center py-3`}>
                  <input
                    type="radio"
                    name="modo"
                    value={v}
                    checked={estado.modo === v}
                    onChange={() => {
                      mudar({ modo: v })
                      rastrearFerramenta('modo', v, FERRAMENTA)
                    }}
                    className="sr-only"
                  />
                  <span>{r}</span>
                  <span className={`mt-1 text-xs font-normal ${estado.modo === v ? 'text-paper/75' : 'text-ink-3'}`}>{d}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {estado.modo === 'grade' ? (
            <ModoGrade estado={estado} textos={textos} setTextos={setTextos} mudar={mudar} />
          ) : (
            <ModoLista estado={estado} mudar={mudar} />
          )}

          <div className="mt-8 max-w-md">
            <label htmlFor="equipe-informada" className="block font-display text-sm font-bold">
              Quantas pessoas tem a equipe? <span className="font-normal text-ink-3">(opcional, só para conferir)</span>
            </label>
            <input
              id="equipe-informada"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={estado.equipeInformada ?? ''}
              onChange={(e) => {
                const q = lerQuantidade(e.target.value, 100000)
                if (q !== null) mudar({ equipeInformada: q || undefined })
              }}
              onBlur={() => estado.equipeInformada && rastrearFerramenta('equipe-informada', faixaEquipe(estado.equipeInformada), FERRAMENTA)}
              className={`${CAMPO_TXT} mt-2 max-w-40 font-display text-lg font-bold tabular-nums`}
            />
            <Conferencia conf={conf} />
          </div>

          {vazio && tentouVazio && (
            <p role="alert" className="mt-6 font-semibold text-tower-red-deep">
              A grade está vazia. Informe pelo menos uma numeração.
            </p>
          )}
          <button
            type="button"
            onClick={() => {
              if (vazio) return setTentouVazio(true)
              setTentouVazio(false)
              irPara('pedido')
            }}
            className="btn btn-red mt-8 w-full sm:w-auto"
          >
            Continuar <IconeSeta />
          </button>
        </section>
      )}

      {etapa === 'pedido' && (
        <EtapaPedido
          estado={estado}
          resultado={resultado}
          conf={conf}
          mudar={mudar}
          titulo={titulo}
          voltar={() => irPara('equipe')}
          gerar={gerar}
        />
      )}

      {etapa === 'resultado' && (
        <ResultadoGrade
          estado={estado}
          r={resultado}
          conf={conf}
          titulo={titulo}
          tamanho={tamanho}
          editar={() => irPara('equipe')}
          ajustar={() => irPara('pedido')}
          pedirLimpar={() => setLimpando(true)}
        />
      )}

      {temConteudo(estado) && (
        <div className="mt-10 border-t border-rule pt-5 text-sm print:hidden">
          <p className="text-ink-3">Seu progresso fica salvo neste navegador, sem os nomes.</p>
          {!limpando ? (
            <button type="button" onClick={() => setLimpando(true)} className="mt-1 inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-tower-red">
              Limpar grade
            </button>
          ) : (
            <div role="alertdialog" aria-labelledby="limpar-titulo" className="mt-3 max-w-md border border-tower-red bg-tower-red-soft p-4">
              <p id="limpar-titulo" className="font-semibold">
                Tem certeza? Os dados desta grade serão apagados.
              </p>
              <div className="mt-3 flex gap-3">
                <button type="button" onClick={limpar} className="btn btn-red">
                  Apagar grade
                </button>
                <button type="button" onClick={() => setLimpando(false)} className="btn btn-ghost" autoFocus>
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------- placar */

function Placar({ r, estado }: { r: Resultado; estado: Estado }) {
  return (
    <div className="sticky top-14 z-10 mb-6 grid grid-cols-3 border border-ink bg-paper text-center sm:top-16" aria-live="polite" aria-atomic="true">
      <p className="border-r border-rule px-2 py-2">
        <span className="block font-display text-2xl font-bold tabular-nums">{r.pessoas}</span>
        <span className="block text-xs text-ink-2">com numeração</span>
      </p>
      <p className="border-r border-rule px-2 py-2">
        <span className="block font-display text-2xl font-bold tabular-nums">{r.pendentes}</span>
        <span className="block text-xs text-ink-2">pendentes</span>
      </p>
      <p className="px-2 py-2">
        <span className="block font-display text-2xl font-bold tabular-nums">{r.pedido}</span>
        <span className="block text-xs text-ink-2">{estado.reserva.tipo === 'nenhuma' && estado.paresPorPessoa === 1 ? 'pares' : 'pares no pedido'}</span>
      </p>
    </div>
  )
}

function Conferencia({ conf }: { conf: ReturnType<typeof conferir> }) {
  if (conf.tipo === 'sem-referencia') return null
  if (conf.tipo === 'ok')
    return (
      <p className="mt-2 text-[0.95rem] font-semibold" role="status">
        ✓ A grade fecha com o total informado.
      </p>
    )
  return (
    <p className="mt-2 text-[0.95rem] font-semibold text-tower-red-deep" role="status">
      {conf.tipo === 'faltam'
        ? `Faltam ${pessoas(conf.n)} para fechar a quantidade informada.`
        : `A grade tem ${pessoas(conf.n)} a mais que o total informado.`}
    </p>
  )
}

/* ------------------------------------------------------------ modo grade */

function ModoGrade({
  estado,
  textos,
  setTextos,
  mudar,
}: {
  estado: Estado
  textos: Record<string, string>
  setTextos: React.Dispatch<React.SetStateAction<Record<string, string>>>
  mudar: (p: Partial<Estado>) => void
}) {
  function definir(n: string, texto: string) {
    setTextos((t) => ({ ...t, [n]: texto }))
    const q = lerQuantidade(texto)
    if (q === null) return
    const contagem = { ...estado.contagem }
    if (q) contagem[n] = q
    else delete contagem[n]
    mudar({ contagem })
  }
  function passo(n: string, d: number) {
    const atual = estado.contagem[n] ?? 0
    definir(n, String(Math.max(0, atual + d)))
  }

  return (
    <div className="mt-6">
      <p className="text-sm text-ink-3">Pessoas por numeração. Use + e − ou digite.</p>
      <ul className="mt-3 grid gap-x-8 gap-y-2 md:grid-cols-2">
        {NUMEROS.map((num) => {
          const n = String(num)
          const q = estado.contagem[n] ?? 0
          const texto = textos[n] ?? (q ? String(q) : '')
          const invalido = lerQuantidade(texto) === null
          const alto = q > LIMITE_ALERTA_POR_NUMERO
          return (
            <li key={n}>
              <div className={`flex items-center gap-2 border px-3 py-1.5 ${q > 0 ? 'border-ink' : 'border-rule'}`}>
                <label htmlFor={`n-${n}`} className="w-20 font-display text-lg font-bold">
                  {n}
                  <span className="sr-only"> — pessoas que calçam {n}</span>
                </label>
                <button type="button" className={BOTAO_PASSO} onClick={() => passo(n, -1)} disabled={q === 0} aria-label={`Menos uma pessoa no ${n}`}>
                  −
                </button>
                <input
                  id={`n-${n}`}
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="0"
                  value={texto}
                  onChange={(e) => definir(n, e.target.value)}
                  onFocus={(e) => e.currentTarget.select()}
                  aria-invalid={invalido || undefined}
                  aria-describedby={invalido || alto ? `n-${n}-msg` : undefined}
                  className={`${CAMPO_NUM} ${invalido ? 'border-tower-red' : ''}`}
                />
                <button type="button" className={BOTAO_PASSO} onClick={() => passo(n, 1)} aria-label={`Mais uma pessoa no ${n}`}>
                  +
                </button>
              </div>
              {(invalido || alto) && (
                <p id={`n-${n}-msg`} className="mt-1 text-sm font-semibold text-tower-red-deep">
                  {invalido ? 'Use só números inteiros, como 12.' : `Confira: ${q.toLocaleString('pt-BR')} pessoas no ${n}?`}
                </p>
              )}
            </li>
          )
        })}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-3 border border-dashed border-rule-strong px-3 py-2">
        <label htmlFor="pendentes" className="font-display font-bold">
          Numeração a confirmar
        </label>
        <div className="flex items-center gap-2">
          <button type="button" className={BOTAO_PASSO} onClick={() => mudar({ pendentes: Math.max(0, estado.pendentes - 1) })} disabled={!estado.pendentes} aria-label="Menos uma pessoa pendente">
            −
          </button>
          <input
            id="pendentes"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="0"
            value={estado.pendentes || ''}
            onChange={(e) => {
              const q = lerQuantidade(e.target.value)
              if (q !== null) mudar({ pendentes: q })
            }}
            className={CAMPO_NUM}
          />
          <button type="button" className={BOTAO_PASSO} onClick={() => mudar({ pendentes: estado.pendentes + 1 })} aria-label="Mais uma pessoa pendente">
            +
          </button>
        </div>
        <p className="w-full text-sm text-ink-3">Não sabe o número de alguém? Marque como pendente. Pendente não entra no pedido.</p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ modo lista */

function ModoLista({ estado, mudar }: { estado: Estado; mudar: (p: Partial<Estado>) => void }) {
  const [nome, setNome] = useState('')
  const [numero, setNumero] = useState('')
  const [grupo, setGrupo] = useState('')
  const [colado, setColado] = useState('')
  const [imp, setImp] = useState<Importacao | null>(null)
  const nomeRef = useRef<HTMLInputElement>(null)
  const dup = duplicados(estado.pessoas)

  function adicionar(ev: React.FormEvent) {
    ev.preventDefault()
    if (!numero) return
    mudar({
      pessoas: [
        ...estado.pessoas,
        { id: novoId(), nome: nome.trim() || undefined, numero: numero === 'pendente' ? null : Number(numero), grupo: grupo.trim() || undefined },
      ],
    })
    setNome('')
    // O número e o grupo ficam: a próxima pessoa costuma ser do mesmo setor.
    nomeRef.current?.focus()
  }

  function importar(texto: string) {
    const r = interpretarLista(texto)
    setImp(r)
    rastrearFerramenta('importacao', `${r.pessoas.length}/${r.pessoas.length + r.ignoradas.length}`, FERRAMENTA)
    if (r.pessoas.length) mudar({ pessoas: [...estado.pessoas, ...r.pessoas] })
    setColado('')
  }

  function arquivo(ev: React.ChangeEvent<HTMLInputElement>) {
    const f = ev.target.files?.[0]
    if (!f) return
    if (f.size > 2_000_000) {
      setImp({ pessoas: [], ignoradas: [{ linha: 0, texto: f.name, motivo: 'arquivo grande demais para uma lista de equipe' }], cabecalhos: 0 })
      return
    }
    f.text().then(importar)
    ev.target.value = ''
  }

  function baixarModelo() {
    rastrearCta('baixar-modelo-csv', CAMINHO)
    baixar('modelo-grade-equipe.csv', CSV_MODELO)
  }

  return (
    <div className="mt-6">
      <p className="border-l-4 border-ink bg-paper-2 px-4 py-3 text-[0.92rem]">
        O nome é opcional — pode ser apelido, iniciais ou matrícula. Ele fica só nesta tela: não vai
        para a mensagem, para o arquivo nem para o que fica salvo no navegador.
      </p>

      <form onSubmit={adicionar} className="mt-4 grid gap-3 sm:grid-cols-[1.4fr_0.8fr_1.2fr_auto] sm:items-end">
        <div>
          <label htmlFor="p-nome" className="block font-display text-sm font-bold">
            Nome <span className="font-normal text-ink-3">(opcional)</span>
          </label>
          <input id="p-nome" ref={nomeRef} value={nome} onChange={(e) => setNome(e.target.value.slice(0, 60))} autoComplete="off" className={`${CAMPO_TXT} mt-1`} />
        </div>
        <div>
          <label htmlFor="p-numero" className="block font-display text-sm font-bold">
            Numeração
          </label>
          <select id="p-numero" value={numero} onChange={(e) => setNumero(e.target.value)} required className={`${CAMPO_TXT} mt-1`}>
            <option value="">Escolha</option>
            {NUMEROS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
            <option value="pendente">Pendente</option>
          </select>
        </div>
        <div>
          <label htmlFor="p-grupo" className="block font-display text-sm font-bold">
            Setor ou grupo <span className="font-normal text-ink-3">(opcional)</span>
          </label>
          <input id="p-grupo" list="grupos-sugeridos" value={grupo} onChange={(e) => setGrupo(e.target.value.slice(0, 40))} autoComplete="off" className={`${CAMPO_TXT} mt-1`} />
          <datalist id="grupos-sugeridos">
            {GRUPOS_SUGERIDOS.map((g) => (
              <option key={g} value={g} />
            ))}
          </datalist>
        </div>
        <button type="submit" className="btn btn-ink" disabled={!numero}>
          Adicionar
        </button>
      </form>

      <details className="mt-5 border border-rule p-4">
        <summary className="flex min-h-11 cursor-pointer items-center font-display font-bold">Colar uma lista ou importar planilha</summary>
        <p className="mt-2 text-sm text-ink-2">
          Uma pessoa por linha, com a numeração em qualquer posição: <code>Carlos, 40</code>,{' '}
          <code>Ana; 36; Limpeza</code> ou só <code>40</code>. Para quem ainda não sabe, escreva{' '}
          <code>?</code> ou <code>pendente</code>.
        </p>
        <label htmlFor="colar" className="sr-only">
          Lista para colar
        </label>
        <textarea
          id="colar"
          value={colado}
          onChange={(e) => setColado(e.target.value)}
          rows={5}
          placeholder={'Carlos, 40, Expedição\nJoão, 42, Logística\nAna, 36, Limpeza'}
          className="mt-3 w-full border border-rule-strong bg-paper p-3 font-mono text-sm focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-ink" onClick={() => importar(colado)} disabled={!colado.trim()}>
            Interpretar lista
          </button>
          <label className="btn btn-ghost relative cursor-pointer">
            Importar arquivo CSV
            <input type="file" accept=".csv,.txt,text/csv,text/plain" onChange={arquivo} className="sr-only" />
          </label>
          <button type="button" onClick={baixarModelo} className="inline-flex min-h-11 items-center text-sm underline underline-offset-4 hover:text-tower-red">
            Baixar modelo de planilha
          </button>
        </div>
        {imp && (
          <div role="status" className="mt-4 text-[0.95rem]">
            <p className="font-semibold">
              {imp.pessoas.length ? `${pessoas(imp.pessoas.length)} ${imp.pessoas.length === 1 ? 'adicionada' : 'adicionadas'}.` : 'Nenhuma pessoa reconhecida.'}
              {imp.cabecalhos ? ' Cabeçalho ignorado.' : ''}
            </p>
            {imp.ignoradas.length > 0 && (
              <>
                <p className="mt-2 text-tower-red-deep">
                  {imp.ignoradas.length === 1 ? 'Uma linha ficou de fora' : `${imp.ignoradas.length} linhas ficaram de fora`} — confira e adicione à mão:
                </p>
                <ul className="mt-1 list-disc pl-5 text-sm">
                  {imp.ignoradas.slice(0, 10).map((x) => (
                    <li key={`${x.linha}-${x.texto}`}>
                      {x.linha ? `linha ${x.linha}: ` : ''}
                      <code>{x.texto}</code> — {x.motivo}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </details>

      {estado.pessoas.length > 0 && (
        <div className="mt-6">
          <h3 className="font-display text-base font-bold">
            {pessoas(estado.pessoas.length)} na lista
          </h3>
          {dup.length > 0 && (
            <p className="mt-2 text-[0.95rem] font-semibold text-tower-red-deep" role="status">
              Nome repetido: {dup.join(', ')}. Pode ser a mesma pessoa lançada duas vezes.
            </p>
          )}
          <ul className="mt-3 divide-y divide-rule border-y border-rule">
            {estado.pessoas.map((p, i) => (
              <li key={p.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2">
                <span className="min-w-0 flex-1 truncate">{p.nome || <span className="text-ink-3">Pessoa {i + 1}</span>}</span>
                <label className="sr-only" htmlFor={`pn-${p.id}`}>
                  Numeração de {p.nome || `pessoa ${i + 1}`}
                </label>
                <select
                  id={`pn-${p.id}`}
                  value={p.numero ?? 'pendente'}
                  onChange={(e) =>
                    mudar({
                      pessoas: estado.pessoas.map((x) => (x.id === p.id ? { ...x, numero: e.target.value === 'pendente' ? null : Number(e.target.value) } : x)),
                    })
                  }
                  className="min-h-11 border border-rule-strong bg-paper px-2 font-display font-bold"
                >
                  {NUMEROS.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                  <option value="pendente">Pendente</option>
                </select>
                {p.grupo && <span className="text-sm text-ink-2">{p.grupo}</span>}
                <button
                  type="button"
                  onClick={() => mudar({ pessoas: estado.pessoas.filter((x) => x.id !== p.id) })}
                  className="inline-flex min-h-11 items-center px-2 text-sm underline underline-offset-4 hover:text-tower-red"
                  aria-label={`Remover ${p.nome || `pessoa ${i + 1}`}`}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/* ---------------------------------------------------------- etapa pedido */

function EtapaPedido({
  estado,
  resultado,
  conf,
  mudar,
  titulo,
  voltar,
  gerar,
}: {
  estado: Estado
  resultado: Resultado
  conf: ReturnType<typeof conferir>
  mudar: (p: Partial<Estado>) => void
  titulo: React.RefObject<HTMLHeadingElement | null>
  voltar: () => void
  gerar: () => void
}) {
  const ppp = estado.paresPorPessoa
  const outroPares = ![1, 2].includes(ppp)
  const res = estado.reserva
  const pct = res.tipo === 'percentual' ? res.pct : 0
  const outroPct = res.tipo === 'percentual' && ![5, 10, 15].includes(res.pct)
  const usados = resultado.linhas.filter((l) => l.pessoas > 0)

  function porNumero(n: string, v: number) {
    const atual = res.tipo === 'numeracao' ? res.porNumero : {}
    const novo = { ...atual }
    if (v > 0) novo[n] = v
    else delete novo[n]
    mudar({ reserva: { tipo: 'numeracao', porNumero: novo } })
  }

  return (
    <section aria-labelledby="etapa">
      <h2 id="etapa" ref={titulo} tabIndex={-1} className="text-2xl outline-none sm:text-3xl">
        Monte o pedido
      </h2>
      <p className="mt-3 text-ink-2">Dá para ajustar tudo depois. Se não precisar mudar nada, é só gerar a grade.</p>

      <fieldset className="mt-8">
        <legend className="font-display text-lg font-bold">Quantos pares por pessoa?</legend>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {[1, 2].map((n) => (
            <label key={n} className={CHIP(ppp === n)}>
              <input
                type="radio"
                name="ppp"
                checked={ppp === n}
                onChange={() => {
                  rastrearFerramenta('pares-por-pessoa', String(n), FERRAMENTA)
                  mudar({ paresPorPessoa: n })
                }}
                className="sr-only"
              />
              {pares(n)}
            </label>
          ))}
          <label className={CHIP(outroPares)}>
            <input type="radio" name="ppp" checked={outroPares} onChange={() => mudar({ paresPorPessoa: 3 })} className="sr-only" />
            Outro
          </label>
          {outroPares && (
            <>
              <label htmlFor="ppp-outro" className="sr-only">
                Pares por pessoa
              </label>
              <input
                id="ppp-outro"
                type="text"
                inputMode="numeric"
                value={ppp}
                onChange={(e) => {
                  const q = lerQuantidade(e.target.value, PARES_POR_PESSOA_MAX)
                  if (q) mudar({ paresPorPessoa: q })
                }}
                onBlur={() => rastrearFerramenta('pares-por-pessoa', String(ppp), FERRAMENTA)}
                className={CAMPO_NUM}
              />
            </>
          )}
        </div>
        {ppp > 1 && (
          <p className="mt-2 text-sm text-ink-2">
            {resultado.pessoas} pessoas × {ppp} pares = {resultado.base} pares-base. Cada número é multiplicado igual: 10 pessoas no 40 viram {10 * ppp} pares.
          </p>
        )}
      </fieldset>

      <fieldset className="mt-8">
        <legend className="font-display text-lg font-bold">Quer incluir pares de reserva?</legend>
        <p className="mt-1 max-w-2xl text-sm text-ink-2">
          A reserva é uma decisão sua. Não existe percentual técnico de referência para ela: na
          prática, serve para admissões e para trocas por dano, e vale conforme a rotatividade da
          equipe.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              ['nenhuma', 'Sem reserva'],
              ['percentual', 'Percentual'],
              ['numeracao', 'Por numeração'],
            ] as const
          ).map(([t, r]) => (
            <label key={t} className={CHIP(res.tipo === t)}>
              <input
                type="radio"
                name="reserva"
                checked={res.tipo === t}
                onChange={() => {
                  rastrearFerramenta('reserva', t, FERRAMENTA)
                  mudar({
                    reserva:
                      t === 'nenhuma'
                        ? { tipo: 'nenhuma' }
                        : t === 'percentual'
                          ? { tipo: 'percentual', pct: 5 }
                          : { tipo: 'numeracao', porNumero: sugestaoPorNumeracao(new Map(usados.map((l) => [l.numero, l.pessoas]))) },
                  })
                }}
                className="sr-only"
              />
              {r}
            </label>
          ))}
        </div>

        {res.tipo === 'percentual' && (
          <div className="mt-4">
            <p className="font-display text-sm font-bold">Percentual sobre os pares-base</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {[5, 10, 15].map((p) => (
                <label key={p} className={CHIP(pct === p)}>
                  <input
                    type="radio"
                    name="pct"
                    checked={pct === p}
                    onChange={() => {
                      rastrearFerramenta('reserva-percentual', String(p), FERRAMENTA)
                      mudar({ reserva: { tipo: 'percentual', pct: p } })
                    }}
                    className="sr-only"
                  />
                  {p}%
                </label>
              ))}
              <label className={CHIP(outroPct)}>
                <input type="radio" name="pct" checked={outroPct} onChange={() => mudar({ reserva: { tipo: 'percentual', pct: 8 } })} className="sr-only" />
                Outro
              </label>
              {outroPct && (
                <span className="flex items-center gap-1">
                  <label htmlFor="pct-outro" className="sr-only">
                    Percentual de reserva
                  </label>
                  <input
                    id="pct-outro"
                    type="text"
                    inputMode="numeric"
                    value={pct}
                    onChange={(e) => {
                      const q = lerQuantidade(e.target.value, RESERVA_PCT_MAX)
                      if (q !== null) mudar({ reserva: { tipo: 'percentual', pct: q } })
                    }}
                    onBlur={() => rastrearFerramenta('reserva-percentual', String(pct), FERRAMENTA)}
                    className={CAMPO_NUM}
                  />
                  <span className="font-display font-bold">%</span>
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-ink-2" aria-live="polite">
              {resultado.reservaDescricao}
            </p>
          </div>
        )}

        {res.tipo === 'numeracao' && (
          <div className="mt-4">
            <p className="max-w-2xl text-sm text-ink-2">
              Começamos com um par a mais nos números que, juntos, somam metade da equipe — os mais
              frequentes — e nenhum nas pontas. Ajuste como quiser.
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {usados.map((l) => {
                const n = String(l.numero)
                const v = res.porNumero[n] ?? 0
                return (
                  <li key={n} className="flex items-center gap-2 border border-rule px-3 py-1.5">
                    <span className="w-24 font-display font-bold">
                      {n} <span className="text-xs font-normal text-ink-3">({l.pessoas})</span>
                    </span>
                    <button type="button" className={BOTAO_PASSO} onClick={() => porNumero(n, Math.max(0, v - 1))} disabled={!v} aria-label={`Menos um par de reserva no ${n}`}>
                      −
                    </button>
                    <span className="w-8 text-center font-display text-lg font-bold tabular-nums" aria-live="polite" aria-label={`Reserva no ${n}: ${v}`}>
                      {v}
                    </span>
                    <button type="button" className={BOTAO_PASSO} onClick={() => porNumero(n, v + 1)} aria-label={`Mais um par de reserva no ${n}`}>
                      +
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </fieldset>

      <fieldset className="mt-8">
        <legend className="font-display text-lg font-bold">
          Já sabe qual modelo precisa? <span className="text-sm font-normal text-ink-3">(opcional)</span>
        </legend>
        {estado.calcado && (
          <p className="mt-2 text-sm text-ink-2">
            Do teste de calçado: <strong>{NOME_FAMILIA[estado.calcado as FamiliaOrigem]}</strong>.
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              ['sim', 'Sim'],
              ['nao', 'Não'],
              ['avaliando', 'Estou avaliando'],
            ] as [SabeModelo, string][]
          ).map(([v, r]) => (
            <label key={v} className={CHIP(estado.modelo?.sabe === v)}>
              <input
                type="radio"
                name="modelo"
                checked={estado.modelo?.sabe === v}
                onChange={() => {
                  rastrearFerramenta('sabe-modelo', v, FERRAMENTA)
                  mudar({ modelo: { sabe: v, nome: estado.modelo?.nome } })
                }}
                className="sr-only"
              />
              {r}
            </label>
          ))}
        </div>
        {estado.modelo?.sabe === 'sim' && (
          <div className="mt-3 max-w-md">
            <label htmlFor="modelo-nome" className="block text-sm font-bold">
              Qual? <span className="font-normal text-ink-3">(vai na mensagem, se você preencher)</span>
            </label>
            <input
              id="modelo-nome"
              value={estado.modelo.nome ?? ''}
              onChange={(e) => mudar({ modelo: { sabe: 'sim', nome: e.target.value.slice(0, 80) } })}
              autoComplete="off"
              className={`${CAMPO_TXT} mt-1`}
            />
          </div>
        )}
        {estado.modelo && estado.modelo.sabe !== 'sim' && !estado.calcado && (
          <p className="mt-3 text-[0.95rem]">
            <Link
              href="/ferramentas/qual-calcado-usar/"
              className="font-semibold underline underline-offset-4 hover:text-tower-red"
              onClick={() => rastrearCta('qual-calcado', CAMINHO)}
            >
              Descobrir qual calçado é ideal
            </Link>{' '}
            — a grade fica salva aqui enquanto isso.
          </p>
        )}
      </fieldset>

      {/* Conferência antes de gerar */}
      <div className="mt-10 border border-ink bg-paper-2 p-5 sm:p-6">
        <h3 className="font-display text-lg font-bold">Confira sua equipe</h3>
        <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
          <Dado rotulo="Com numeração" valor={String(resultado.pessoas)} />
          <Dado rotulo="Pendentes" valor={String(resultado.pendentes)} />
          <Dado rotulo="Maior concentração" valor={resultado.maisFrequentes.join(' e ') || '—'} />
          <Dado rotulo="Faixa" valor={resultado.faixa ? `${resultado.faixa.min}–${resultado.faixa.max}` : '—'} />
        </dl>
        {resultado.pendentes > 0 && (
          <p className="mt-4 text-[0.95rem]">
            {pessoas(resultado.pendentes)} sem numeração {resultado.pendentes === 1 ? 'fica' : 'ficam'} fora do pedido. A reserva não
            cobre pendências: são coisas diferentes.
          </p>
        )}
        <Conferencia conf={conf} />
        {(conf.tipo === 'faltam' || conf.tipo === 'sobram') && (
          <button type="button" onClick={voltar} className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4 hover:text-tower-red">
            Voltar e corrigir
          </button>
        )}
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
        <button type="button" onClick={voltar} className="btn btn-ghost">
          Voltar
        </button>
        <button type="button" onClick={gerar} className="btn btn-red sm:min-w-56" disabled={resultado.pedido === 0}>
          Gerar grade <IconeSeta />
        </button>
      </div>
    </section>
  )
}

function Dado({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-ink-2">{rotulo}</dt>
      <dd className="mt-1 font-display text-2xl font-bold tabular-nums">{valor}</dd>
    </div>
  )
}

/* ------------------------------------------------------------- resultado */

function baixar(nome: string, conteudo: string) {
  const blob = new Blob([conteudo], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nome
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function ResultadoGrade({
  estado,
  r,
  conf,
  titulo,
  tamanho,
  editar,
  ajustar,
  pedirLimpar,
}: {
  estado: Estado
  r: Resultado
  conf: ReturnType<typeof conferir>
  titulo: React.RefObject<HTMLHeadingElement | null>
  tamanho: boolean
  editar: () => void
  ajustar: () => void
  pedirLimpar: () => void
}) {
  const [feito, setFeito] = useState('')
  const mensagem = mensagemWhatsApp(r, estado)
  const linkZap = linkWhatsApp('ferramenta-grade', mensagem.length > LIMITE_MENSAGEM ? undefined : mensagem)
  const maior = Math.max(1, ...r.linhas.map((l) => l.pedido))
  const grande = r.pessoas + r.pendentes > 30
  const modelo = estado.modelo?.nome?.trim()
  const data = new Date().toLocaleDateString('pt-BR')

  async function copiar() {
    rastrearCta('copiar-grade', CAMINHO)
    try {
      await navigator.clipboard.writeText(textoGrade(r, estado))
      setFeito('Grade copiada.')
    } catch {
      setFeito('Não foi possível copiar. Selecione a tabela e copie à mão.')
    }
  }
  function csv() {
    rastrearCta('baixar-csv', CAMINHO)
    baixar(`grade-de-calcados-${new Date().toISOString().slice(0, 10)}.csv`, csvGrade(r))
    setFeito('Arquivo CSV baixado.')
  }
  function imprimir() {
    rastrearCta('imprimir-grade', CAMINHO)
    // A classe restringe a impressão ao bloco da grade só nesta ação: o
    // resto do site continua imprimindo como sempre.
    document.body.classList.add('imprimindo-grade')
    const fim = () => {
      document.body.classList.remove('imprimindo-grade')
      window.removeEventListener('afterprint', fim)
    }
    window.addEventListener('afterprint', fim)
    window.print()
  }

  return (
    <section aria-labelledby="etapa" data-resultado>
      <h2 id="etapa" ref={titulo} tabIndex={-1} className="scroll-mt-28 text-2xl outline-none sm:text-3xl">
        Grade da sua equipe
      </h2>

      <dl className="mt-6 grid grid-cols-2 border border-ink sm:grid-cols-5">
        {[
          ['Pessoas com numeração', r.pessoas],
          ['Pares por pessoa', r.paresPorPessoa],
          ['Pares-base', r.base],
          ['Reserva', r.reserva],
        ].map(([k, v]) => (
          <div key={k} className="border-b border-r border-rule px-4 py-3">
            <dt className="text-xs uppercase tracking-wide text-ink-2">{k}</dt>
            <dd className="mt-1 font-display text-2xl font-bold tabular-nums">{v}</dd>
          </div>
        ))}
        <div className="col-span-2 bg-ink px-4 py-3 text-paper sm:col-span-1">
          <dt className="text-xs uppercase tracking-wide text-paper/75">Total do pedido</dt>
          <dd className="mt-1 font-display text-3xl font-bold tabular-nums" data-total>
            {pares(r.pedido)}
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-[0.95rem] text-ink-2">{r.reservaDescricao}</p>

      {r.pendentes > 0 && (
        <p className="mt-3 border-l-4 border-tower-red bg-tower-red-soft px-4 py-3 text-[0.95rem]" role="note">
          <strong>{pessoas(r.pendentes)} com numeração pendente</strong> {r.pendentes === 1 ? 'não está' : 'não estão'} no pedido. Quando
          souber os números, some à grade — a reserva não substitui essa conferência.
        </p>
      )}
      {(conf.tipo === 'faltam' || conf.tipo === 'sobram') && (
        <div className="mt-3 border-l-4 border-tower-red bg-tower-red-soft px-4 py-3">
          <Conferencia conf={conf} />
          <button type="button" onClick={editar} className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">
            Corrigir a grade
          </button>
        </div>
      )}

      {/* Celular: um cartão por número. */}
      <ul className="mt-6 space-y-2 md:hidden" aria-label="Grade por numeração">
        {r.linhas.map((l) => (
          <li key={l.numero} className="border border-rule px-4 py-3">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-display text-2xl font-bold">{l.numero}</span>
              <span className="font-display text-lg font-bold">{pares(l.pedido)}</span>
            </div>
            <p className="mt-1 text-sm text-ink-2">
              {pessoas(l.pessoas)}
              {r.paresPorPessoa > 1 ? ` × ${r.paresPorPessoa} = ${l.base}` : ''}
              {l.reserva ? ` · reserva +${l.reserva}` : ''}
            </p>
            <span className="mt-2 block h-2 bg-tower-red" style={{ width: `${(l.pedido / maior) * 100}%` }} aria-hidden="true" />
          </li>
        ))}
      </ul>

      {/* Computador: tabela. */}
      <table className="mt-6 hidden w-full border-collapse text-left md:table">
        <caption className="sr-only">Grade de calçados por numeração</caption>
        <thead>
          <tr className="border-b-2 border-ink font-display text-sm">
            <th scope="col" className="py-2 pr-4">Numeração</th>
            <th scope="col" className="py-2 pr-4 text-right">Pessoas</th>
            <th scope="col" className="py-2 pr-4 text-right">Pares-base</th>
            <th scope="col" className="py-2 pr-4 text-right">Reserva</th>
            <th scope="col" className="py-2 pr-4 text-right">Pedido</th>
            <th scope="col" className="w-2/5 py-2">Distribuição</th>
          </tr>
        </thead>
        <tbody className="tabular-nums">
          {r.linhas.map((l) => (
            <tr key={l.numero} className="border-b border-rule">
              <th scope="row" className="py-2 pr-4 font-display text-lg font-bold">{l.numero}</th>
              <td className="py-2 pr-4 text-right">{l.pessoas}</td>
              <td className="py-2 pr-4 text-right">{l.base}</td>
              <td className="py-2 pr-4 text-right">{l.reserva || '—'}</td>
              <td className="py-2 pr-4 text-right font-display font-bold">{l.pedido}</td>
              <td className="py-2">
                <span className="block h-3 bg-tower-red" style={{ width: `${(l.pedido / maior) * 100}%` }} aria-hidden="true" />
              </td>
            </tr>
          ))}
          <tr className="border-t-2 border-ink font-display font-bold">
            <th scope="row" className="py-2 pr-4">Total</th>
            <td className="py-2 pr-4 text-right">{r.pessoas}</td>
            <td className="py-2 pr-4 text-right">{r.base}</td>
            <td className="py-2 pr-4 text-right">{r.reserva}</td>
            <td className="py-2 pr-4 text-right">{r.pedido}</td>
            <td />
          </tr>
        </tbody>
      </table>

      {r.ranking.length > 1 && (
        <p className="mt-4 text-[0.95rem]">
          <strong>Numerações com mais pares:</strong>{' '}
          {r.ranking.map((l, i) => `${i + 1}º ${l.numero} — ${pares(l.pedido)}`).join(' · ')}
          {r.faixa && <> · faixa de {r.faixa.min} a {r.faixa.max}</>}
        </p>
      )}

      {r.grupos.length > 1 && (
        <div className="mt-8">
          <h3 className="font-display text-lg font-bold">Grade por setor</h3>
          <p className="mt-1 text-sm text-ink-2">Sem reserva, que fica no total. Útil quando cada setor recebe um modelo.</p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {r.grupos.map((g) => (
              <li key={g.nome} className="border border-rule p-4">
                <p className="font-display font-bold">
                  {g.nome} <span className="font-normal text-ink-2">— {pessoas(g.pessoas)}{g.pendentes ? `, +${g.pendentes} pendente${g.pendentes === 1 ? '' : 's'}` : ''}</span>
                </p>
                <p className="mt-2 text-[0.95rem] tabular-nums">
                  {g.linhas.map((x) => `${x.numero}: ${x.pares}`).join(' · ') || 'Só pendentes'}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pedido sugerido: o formato que vira orçamento. */}
      <div className="mt-8 border border-rule bg-paper-2 p-5">
        <h3 className="font-display text-lg font-bold">Pedido sugerido</h3>
        <p className="mt-2 text-[0.95rem]">
          Produto: <strong>{modelo || (estado.calcado ? NOME_FAMILIA[estado.calcado as FamiliaOrigem] : 'a definir')}</strong>
        </p>
        <ul className="mt-2 columns-2 gap-6 text-[0.95rem] tabular-nums sm:columns-3">
          {r.linhas
            .filter((l) => l.pedido > 0)
            .map((l) => (
              <li key={l.numero}>
                Numeração {l.numero} — {pares(l.pedido)}
              </li>
            ))}
        </ul>
        {modelo && <p className="mt-3 text-sm text-ink-2">Seu pedido estimado para {modelo}: {pares(r.pedido)}. Disponibilidade e prazo se confirmam no orçamento.</p>}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="button" onClick={copiar} className="btn btn-ghost">
          Copiar grade
        </button>
        <button type="button" onClick={csv} className="btn btn-ghost">
          Baixar CSV
        </button>
        <button type="button" onClick={imprimir} className="btn btn-ghost">
          Imprimir ou salvar em PDF
        </button>
        <span role="status" className="text-sm text-ink-2">
          {feito}
        </span>
      </div>

      {/* CTA principal */}
      <div className="mt-10 band-ink p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl">Grade pronta. Quer cotar?</h3>
        <p className="mt-3 max-w-xl text-paper/80">
          {grande
            ? 'A mensagem já vai com a grade inteira. Para equipes desse tamanho, vale combinar um par de amostra por faixa de numeração antes de fechar: é o que mais evita troca depois da entrega.'
            : 'A mensagem já vai com a grade inteira, sem nenhum nome. A gente responde com as opções, preço e prazo.'}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={linkZap}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-zap"
            onClick={() =>
              rastrearWhatsApp({
                contexto: 'ferramenta-grade',
                pagina: CAMINHO,
                secao: 'resultado',
                publico: 'b2b',
                categoria: faixaEquipe(r.pessoas + r.pendentes),
              })
            }
          >
            <IconeWhatsApp />
            Enviar grade para a Tower
          </a>
        </div>
        <details className="mt-5 text-xs text-paper/60">
          <summary className="inline-flex min-h-11 cursor-pointer items-center underline underline-offset-4">Ver a mensagem que vai ser enviada</summary>
          <p className="mt-3 whitespace-pre-line italic leading-relaxed">{mensagem}</p>
        </details>
      </div>

      {/* Próximos passos: cada pergunta tem a sua ferramenta ou o seu texto. */}
      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        <Proximo
          href="/ferramentas/qual-calcado-usar/"
          eyebrow="Qual calçado?"
          texto="Descobrir o tipo certo para a atividade"
          cta="qual-calcado"
        />
        {tamanho ? (
          <Proximo href="/ferramentas/tamanho-de-botina/" eyebrow="Alguém não sabe o número?" texto="Calcular o tamanho pelo pé" cta="tamanho-botina" />
        ) : (
          <Proximo
            href="/conhecimento/grade-de-numeracao-como-definir-para-a-equipe/"
            eyebrow="Alguém não sabe o número?"
            texto="Como levantar a numeração pessoa a pessoa"
            cta="levantar-numeracao"
          />
        )}
        <Proximo
          href="/conhecimento/quantos-pares-por-ano-calcular-a-reposicao/"
          eyebrow="E ao longo do ano?"
          texto="Quantos pares a equipe consome"
          cta="reposicao-anual"
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-1 text-sm">
        <button type="button" onClick={editar} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-tower-red">
          Editar a equipe
        </button>
        <button type="button" onClick={ajustar} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-tower-red">
          Ajustar pares e reserva
        </button>
        <button type="button" onClick={pedirLimpar} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-tower-red">
          Começar outra grade
        </button>
      </div>

      {/* Versão de impressão: só a grade, com data e origem. */}
      <div data-imprimir className="hidden">
        <p style={{ fontSize: 11 }}>Tower EPI&rsquo;s · {data}</p>
        <h2 style={{ fontSize: 20, margin: '4px 0 12px' }}>GRADE DE CALÇADOS</h2>
        <p style={{ fontSize: 12 }}>
          Produto: {modelo || 'a definir'} · Pessoas com numeração: {r.pessoas} · Pares por pessoa: {r.paresPorPessoa} · Reserva: {r.reserva}
          {r.pendentes ? ` · Pendentes (fora do total): ${r.pendentes}` : ''}
        </p>
        <table style={{ borderCollapse: 'collapse', marginTop: 12, fontSize: 13 }}>
          <thead>
            <tr>
              {['Numeração', 'Pessoas', 'Pares-base', 'Reserva', 'Pedido'].map((h) => (
                <th key={h} style={{ border: '1px solid #999', padding: '4px 10px', textAlign: 'left' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {r.linhas.map((l) => (
              <tr key={l.numero}>
                {[l.numero, l.pessoas, l.base, l.reserva, l.pedido].map((v, i) => (
                  <td key={i} style={{ border: '1px solid #999', padding: '4px 10px' }}>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              {['Total', r.pessoas, r.base, r.reserva, r.pedido].map((v, i) => (
                <td key={i} style={{ border: '1px solid #999', padding: '4px 10px', fontWeight: 700 }}>
                  {v}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <p style={{ fontSize: 12, marginTop: 12 }}>{r.reservaDescricao}</p>
        <p style={{ fontSize: 12, marginTop: 24 }}>Observações: ____________________________________________</p>
        <p style={{ fontSize: 10, marginTop: 24 }}>Grade gerada gratuitamente em towerepis.com.br</p>
      </div>
    </section>
  )
}

function Proximo({ href, eyebrow, texto, cta }: { href: string; eyebrow: string; texto: string; cta: string }) {
  return (
    <Link href={href} onClick={() => rastrearCta(cta, CAMINHO)} className="block border border-rule p-4 transition-colors hover:border-ink">
      <span className="eyebrow block">{eyebrow}</span>
      <span className="mt-2 block font-display font-bold">{texto} →</span>
    </Link>
  )
}
