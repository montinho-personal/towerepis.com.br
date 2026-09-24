'use client'

import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { linkWhatsApp, LIMITE_MENSAGEM } from '@/lib/whatsapp'
import {
  rastrearCta,
  rastrearFerramenta,
  rastrearFerramentaConcluida,
  rastrearFerramentaIniciada,
  rastrearFerramentaMetade,
  rastrearFerramentaReiniciada,
  rastrearFerramentaResultado,
  rastrearWhatsApp,
} from '@/lib/analytics'
import {
  calcular,
  desserializar,
  mensagemWhatsApp,
  serializar,
  ROTULO_ATIVIDADE,
  ROTULO_EQUIPE,
  ROTULO_INCOMODO,
  type Atividade,
  type Equipe,
  type Incomodo,
  type Respostas,
} from '@/lib/qual-calcado'
import {
  IconeAgua,
  IconeCalor,
  IconeCaminhada,
  IconeConforto,
  IconeEletricidade,
  IconeImpacto,
  IconeOleo,
  IconePerfuracao,
  IconeQuimico,
  IconeSeta,
  IconeWhatsApp,
} from './Icones'

/**
 * Qual calçado profissional é ideal para mim? — a conversa.
 *
 * UMA PERGUNTA POR TELA, e cada tela é um toque. Não existe "próximo": tocar
 * na opção avança. Isso tira um clique de cada uma das onze perguntas e é o
 * que faz a promessa de "menos de um minuto" ser verdadeira.
 *
 * O ESTADO É UM OBJETO SÓ, e a lista de telas é derivada dele: a tela de
 * tamanho de equipe só existe se a pessoa marcou "para uma equipe". A barra
 * de progresso conta as telas que existem para aquela pessoa, e não as
 * possíveis.
 *
 * FOCO. A cada tela nova o foco vai para a pergunta. Sem isso, quem navega
 * por teclado ou leitor de tela continua parado no botão que acabou de
 * sumir. O `aria-live` no contador de progresso anuncia "pergunta 4 de 11"
 * sem roubar o foco.
 *
 * NADA É PEDIDO ANTES DO RESULTADO. Nem nome, nem telefone. O contato é a
 * etapa seguinte, voluntária, e a mensagem já vai pronta.
 *
 * A LÓGICA NÃO MORA AQUI. Está em lib/qual-calcado.ts, pura, para ser lida
 * e testada sem navegador. Este arquivo só pergunta e mostra.
 */

const FERRAMENTA = 'qual-calcado'
const CAMINHO = '/ferramentas/qual-calcado-usar/'

type Opcao<T extends string> = { valor: T; rotulo: string; dica?: string; icone?: React.ReactNode }

const ATIVIDADES: Opcao<Atividade>[] = [
  { valor: 'construcao', rotulo: 'Construção civil' },
  { valor: 'industria', rotulo: 'Indústria' },
  { valor: 'logistica', rotulo: 'Logística / estoque' },
  { valor: 'manutencao', rotulo: 'Manutenção' },
  { valor: 'oficina', rotulo: 'Oficina / mecânica' },
  { valor: 'cozinha', rotulo: 'Cozinha / alimentos' },
  { valor: 'limpeza', rotulo: 'Limpeza' },
  { valor: 'saude', rotulo: 'Hospital / saúde' },
  { valor: 'servicos', rotulo: 'Serviços gerais' },
  { valor: 'eletrica', rotulo: 'Área elétrica' },
  { valor: 'agricultura', rotulo: 'Agricultura' },
  { valor: 'outro', rotulo: 'Outro' },
]

const TRI = (dicaSim?: string): Opcao<'sim' | 'nao' | 'nao-sei'>[] => [
  { valor: 'sim', rotulo: 'Sim', dica: dicaSim },
  { valor: 'nao', rotulo: 'Não' },
  { valor: 'nao-sei', rotulo: 'Não sei' },
]

type Tela =
  | { id: 'atividade' }
  | { id: 'para' }
  | { id: 'equipe' }
  | { id: 'impacto' }
  | { id: 'perfuracao' }
  | { id: 'piso' }
  | { id: 'oleo' }
  | { id: 'eletricidade' }
  | { id: 'quimico' }
  | { id: 'jornada' }
  | { id: 'calor' }
  | { id: 'incomodos' }

type Parcial = Partial<Respostas>

function telasPara(r: Parcial): Tela[] {
  const t: Tela[] = [{ id: 'atividade' }, { id: 'para' }]
  if (r.para === 'equipe') t.push({ id: 'equipe' })
  t.push(
    { id: 'impacto' },
    { id: 'perfuracao' },
    { id: 'piso' },
    { id: 'oleo' },
    { id: 'eletricidade' },
    { id: 'quimico' },
    { id: 'jornada' },
    { id: 'calor' },
    { id: 'incomodos' },
  )
  return t
}

function completo(r: Parcial): r is Respostas {
  return Boolean(
    r.atividade && r.para && r.impacto && r.perfuracao && r.piso && r.oleo &&
    r.eletricidade && r.quimico && r.jornada && r.calor && r.incomodos &&
    (r.para !== 'equipe' || r.equipe),
  )
}

/**
 * Botões de opção. Fica FORA do componente da ferramenta de propósito: um
 * componente definido dentro do render é um tipo novo a cada estado, e o
 * React desmonta e remonta os botões em toda resposta. O efeito visível
 * era o foco e o scroll caírem em posição defasada — a pergunta sumia
 * por cima da tela num dos caminhos — e o Playwright acusar "elemento
 * instável". Aqui fora, os botões só remontam quando a tela muda.
 */
const OPCAO =
  'group flex w-full items-center gap-4 border border-rule-strong bg-paper px-5 py-4 text-left font-display text-[1.02rem] font-semibold leading-snug transition-colors hover:border-ink hover:bg-paper-2 focus-visible:border-ink focus-visible:bg-paper-2 min-h-[3.5rem]'

function Botoes<T extends string>({
  opcoes,
  campo,
  cols = 1,
  responder,
}: {
  opcoes: Opcao<T>[]
  campo: keyof Respostas
  cols?: 1 | 2
  responder: (campo: keyof Respostas, valor: unknown) => void
}) {
  return (
    <div className={`mt-6 grid gap-2 ${cols === 2 ? 'sm:grid-cols-2' : ''}`} role="group" aria-labelledby="pergunta">
      {opcoes.map((o) => (
        <button key={o.valor} type="button" className={OPCAO} onClick={() => responder(campo, o.valor)}>
          {o.icone && <span className="shrink-0 text-tower-red">{o.icone}</span>}
          <span className="min-w-0">
            <span className="block">{o.rotulo}</span>
            {o.dica && <span className="mt-0.5 block font-sans text-[0.85rem] font-normal text-ink-3">{o.dica}</span>}
          </span>
        </button>
      ))}
    </div>
  )
}

/**
 * `tamanho`: a calculadora de numeração existe? Vem da página (servidor),
 * porque a trava de publicação lê variável de build que o navegador não vê.
 */
export function QualCalcado({ tamanho = false }: { tamanho?: boolean }) {
  const [r, setR] = useState<Parcial>({ incomodos: undefined })
  const [passo, setPasso] = useState(0)
  const [pronto, setPronto] = useState(false)
  const [outroTexto, setOutroTexto] = useState('')
  const [copiado, setCopiado] = useState(false)
  const iniciou = useRef(false)
  /** Só rola até o resultado quando ele nasce aqui — link compartilhado abre sem saltar. */
  const rolarAoResultado = useRef(false)
  const metade = useRef(false)
  const foco = useRef<HTMLHeadingElement>(null)

  const telas = useMemo(() => telasPara(r), [r])
  const total = telas.length
  const tela = telas[passo]

  // Link compartilhado: restaura o estado e vai direto ao resultado.
  useEffect(() => {
    const qs = window.location.search.replace(/^\?/, '')
    if (!qs) return
    const lido = desserializar(qs)
    if (lido) {
      setR(lido)
      setPronto(true)
    }
  }, [])

  // Foco na pergunta a cada tela — sem deixar o focus() rolar, porque ele
  // usa a posição de antes do layout assentar. A rolagem é feita depois,
  // pela posição real, com margem para o cabeçalho fixo (scroll-mt-24).
  useEffect(() => {
    const el = foco.current
    if (!el) return
    el.focus({ preventScroll: true })
    requestAnimationFrame(() => el.scrollIntoView({ block: 'start', behavior: 'smooth' }))
  }, [passo, pronto])

  const responder = useCallback(
    (campo: keyof Respostas, valor: unknown, extra: Parcial = {}) => {
      if (!iniciou.current) {
        iniciou.current = true
        rastrearFerramentaIniciada(FERRAMENTA)
      }
      rastrearFerramenta(campo, Array.isArray(valor) ? valor.join('.') : String(valor), FERRAMENTA)
      // `extra` existe para o "Outro": o texto livre precisa entrar na MESMA
      // atualização. Um setR antes do responder era atropelado pelo `r`
      // antigo deste closure, e o texto nunca chegava à mensagem.
      const novo = { ...r, ...extra, [campo]: valor }
      if (campo === 'atividade' && valor !== 'outro') delete novo.atividadeOutro
      setR(novo)
      const proximas = telasPara(novo)
      const proximo = passo + 1
      if (!metade.current && proximo >= Math.ceil(proximas.length / 2)) {
        metade.current = true
        rastrearFerramentaMetade(FERRAMENTA)
      }
      if (proximo >= proximas.length) {
        if (completo(novo)) {
          const res = calcular(novo)
          rastrearFerramentaConcluida(`${novo.atividade}|${res.familia.chave}`, FERRAMENTA)
          rastrearFerramentaResultado(FERRAMENTA, res.familia.chave, novo.para === 'equipe' ? 'b2b' : 'b2c')
        }
        setPronto(true)
        rolarAoResultado.current = true
      } else {
        setPasso(proximo)
      }
    },
    [r, passo],
  )

  function voltar() {
    if (passo > 0) setPasso((p) => p - 1)
  }

  function refazer() {
    rastrearFerramentaReiniciada(FERRAMENTA)
    setR({ incomodos: undefined })
    setPasso(0)
    setPronto(false)
    setOutroTexto('')
    setCopiado(false)
    iniciou.current = false
    metade.current = false
    if (window.location.search) window.history.replaceState(null, '', CAMINHO)
  }

  /* ------------------------------------------------------------ resultado */
  if (pronto && completo(r)) {
    return <Resultado r={r} refazer={refazer} copiado={copiado} setCopiado={setCopiado} rolar={rolarAoResultado.current} tamanho={tamanho} />
  }

  /* ------------------------------------------------------------ perguntas */
  return (
    <div className="max-w-2xl" data-ferramenta={FERRAMENTA}>
      {/* Progresso: goal gradient. O contador é anunciado; a barra é decorativa. */}
      <div className="mb-8">
        <p className="eyebrow" aria-live="polite">
          Pergunta {passo + 1} de {total}
        </p>
        <div className="mt-3 flex gap-1" aria-hidden="true">
          {telas.map((t, i) => (
            <span key={t.id} className={`h-1 flex-1 ${i <= passo ? 'bg-tower-red' : 'bg-rule'}`} />
          ))}
        </div>
        {passo >= 3 && passo < total - 1 && (
          <p className="mt-3 text-sm text-ink-3">Já estamos entendendo o seu perfil.</p>
        )}
      </div>

      {tela.id === 'atividade' && (
        <fieldset>
          <legend className="w-full">
            <h2 id="pergunta" ref={foco} tabIndex={-1} className="scroll-mt-24 text-2xl focus:outline-none sm:text-3xl">
              Onde você trabalha?
            </h2>
            <p className="mt-2 text-sm text-ink-3">Não precisa saber termos técnicos. Você pode escolher “não sei” nas próximas.</p>
          </legend>
          <div className="mt-6 grid gap-2 sm:grid-cols-2" role="group" aria-labelledby="pergunta">
            {ATIVIDADES.map((o) => (
              <button
                key={o.valor}
                type="button"
                className={OPCAO}
                aria-pressed={r.atividade === o.valor}
                onClick={() => {
                  if (o.valor === 'outro') setR({ ...r, atividade: 'outro' })
                  else responder('atividade', o.valor)
                }}
              >
                {o.rotulo}
              </button>
            ))}
          </div>
          {r.atividade === 'outro' && (
            <form
              className="mt-6 border border-rule bg-paper-2 p-5"
              onSubmit={(e) => {
                e.preventDefault()
                responder('atividade', 'outro', { atividadeOutro: outroTexto.trim() || undefined })
              }}
            >
              <label htmlFor="outro" className="block font-display text-sm font-bold">
                Conte rapidamente o que você faz <span className="font-normal text-ink-3">(opcional)</span>
              </label>
              <input
                id="outro"
                type="text"
                maxLength={80}
                value={outroTexto}
                onChange={(e) => setOutroTexto(e.target.value)}
                className="mt-2 w-full border border-rule-strong bg-paper px-4 py-3 text-base"
                placeholder="Ex.: reforma de móveis, lavagem de carros…"
                autoComplete="off"
              />
              <button type="submit" className="btn btn-ink mt-4">
                Continuar <IconeSeta />
              </button>
            </form>
          )}
        </fieldset>
      )}

      {tela.id === 'para' && (
        <fieldset>
          <legend className="w-full">
            <h2 id="pergunta" ref={foco} tabIndex={-1} className="scroll-mt-24 text-2xl focus:outline-none sm:text-3xl">
              O calçado é para você ou para uma equipe?
            </h2>
          </legend>
          <Botoes responder={responder} campo="para" opcoes={[{ valor: 'mim', rotulo: 'Para mim' }, { valor: 'equipe', rotulo: 'Para uma equipe' }]} />
        </fieldset>
      )}

      {tela.id === 'equipe' && (
        <fieldset>
          <legend className="w-full">
            <h2 id="pergunta" ref={foco} tabIndex={-1} className="scroll-mt-24 text-2xl focus:outline-none sm:text-3xl">
              Quantas pessoas, mais ou menos?
            </h2>
          </legend>
          <Botoes
            responder={responder}
            campo="equipe"
            cols={2}
            opcoes={(Object.keys(ROTULO_EQUIPE) as Equipe[]).map((v) => ({ valor: v, rotulo: ROTULO_EQUIPE[v] }))}
          />
        </fieldset>
      )}

      {tela.id === 'impacto' && (
        <fieldset>
          <legend className="w-full">
            <h2 id="pergunta" ref={foco} tabIndex={-1} className="flex scroll-mt-24 items-start gap-3 text-2xl focus:outline-none sm:text-3xl">
              <span className="mt-1 shrink-0 text-tower-red"><IconeImpacto /></span>
              <span>Existe risco de algo pesado cair ou prensar o seu pé?</span>
            </h2>
            <p className="mt-2 text-sm text-ink-3">Carga, palete, ferramenta pesada, peça, material de obra. É a pergunta que mais decide.</p>
          </legend>
          <Botoes responder={responder} campo="impacto" opcoes={TRI()} />
        </fieldset>
      )}

      {tela.id === 'perfuracao' && (
        <fieldset>
          <legend className="w-full">
            <h2 id="pergunta" ref={foco} tabIndex={-1} className="flex scroll-mt-24 items-start gap-3 text-2xl focus:outline-none sm:text-3xl">
              <span className="mt-1 shrink-0 text-tower-red"><IconePerfuracao /></span>
              <span>Há material pontiagudo no chão?</span>
            </h2>
            <p className="mt-2 text-sm text-ink-3">Prego, cavaco, ferragem, arame.</p>
          </legend>
          <Botoes responder={responder} campo="perfuracao" opcoes={TRI()} />
        </fieldset>
      )}

      {tela.id === 'piso' && (
        <fieldset>
          <legend className="w-full">
            <h2 id="pergunta" ref={foco} tabIndex={-1} className="flex scroll-mt-24 items-start gap-3 text-2xl focus:outline-none sm:text-3xl">
              <span className="mt-1 shrink-0 text-tower-red"><IconeAgua /></span>
              <span>Como é o piso onde você passa a maior parte do dia?</span>
            </h2>
          </legend>
          <Botoes
            responder={responder}
            campo="piso"
            opcoes={[
              { valor: 'seco', rotulo: 'Seco' },
              { valor: 'as-vezes', rotulo: 'Molhado às vezes', dica: 'Respingo, lavagem eventual' },
              { valor: 'sempre', rotulo: 'Molhado o tempo todo', dica: 'Cozinha, lavagem de piso, área de produção' },
              { valor: 'submerso', rotulo: 'O pé fica dentro de água ou líquido', dica: 'Lavagem pesada, concretagem, câmara fria' },
            ]}
          />
        </fieldset>
      )}

      {tela.id === 'oleo' && (
        <fieldset>
          <legend className="w-full">
            <h2 id="pergunta" ref={foco} tabIndex={-1} className="flex scroll-mt-24 items-start gap-3 text-2xl focus:outline-none sm:text-3xl">
              <span className="mt-1 shrink-0 text-tower-red"><IconeOleo /></span>
              <span>Tem óleo, graxa ou gordura no piso?</span>
            </h2>
          </legend>
          <Botoes
            responder={responder}
            campo="oleo"
            opcoes={[
              { valor: 'frequente', rotulo: 'Frequente' },
              { valor: 'ocasional', rotulo: 'Às vezes' },
              { valor: 'nao', rotulo: 'Não' },
            ]}
          />
        </fieldset>
      )}

      {tela.id === 'eletricidade' && (
        <fieldset>
          <legend className="w-full">
            <h2 id="pergunta" ref={foco} tabIndex={-1} className="flex scroll-mt-24 items-start gap-3 text-2xl focus:outline-none sm:text-3xl">
              <span className="mt-1 shrink-0 text-tower-red"><IconeEletricidade /></span>
              <span>Você trabalha próximo a eletricidade?</span>
            </h2>
            <p className="mt-2 text-sm text-ink-3">Painel, instalação, rede. Não vale a tomada do escritório.</p>
          </legend>
          <Botoes responder={responder} campo="eletricidade" opcoes={TRI()} />
        </fieldset>
      )}

      {tela.id === 'quimico' && (
        <fieldset>
          <legend className="w-full">
            <h2 id="pergunta" ref={foco} tabIndex={-1} className="flex scroll-mt-24 items-start gap-3 text-2xl focus:outline-none sm:text-3xl">
              <span className="mt-1 shrink-0 text-tower-red"><IconeQuimico /></span>
              <span>Tem contato com produto químico?</span>
            </h2>
          </legend>
          <Botoes
            responder={responder}
            campo="quimico"
            opcoes={[
              { valor: 'nao', rotulo: 'Não' },
              { valor: 'limpeza', rotulo: 'Produto de limpeza', dica: 'Saneante, desengordurante, alvejante' },
              { valor: 'oleo-solvente', rotulo: 'Óleo ou solvente', dica: 'Thinner, desengraxante, cola' },
              { valor: 'forte', rotulo: 'Ácido, alcalino ou similar', dica: 'Produto concentrado de processo' },
              { valor: 'nao-sei', rotulo: 'Sim, mas não sei qual' },
            ]}
          />
        </fieldset>
      )}

      {tela.id === 'jornada' && (
        <fieldset>
          <legend className="w-full">
            <h2 id="pergunta" ref={foco} tabIndex={-1} className="flex scroll-mt-24 items-start gap-3 text-2xl focus:outline-none sm:text-3xl">
              <span className="mt-1 shrink-0 text-tower-red"><IconeCaminhada /></span>
              <span>Como é o seu dia em pé?</span>
            </h2>
          </legend>
          <Botoes
            responder={responder}
            campo="jornada"
            opcoes={[
              { valor: 'sentado', rotulo: 'Sento boa parte do dia' },
              { valor: 'pe-parado', rotulo: 'Em pé, mais parado', dica: 'Posto fixo, bancada, linha' },
              { valor: 'pe-caminha', rotulo: 'Em pé, caminhando bastante' },
              { valor: 'pe-intenso', rotulo: 'Em pé o dia todo e andando muito', dica: 'Mais de 8 horas' },
            ]}
          />
        </fieldset>
      )}

      {tela.id === 'calor' && (
        <fieldset>
          <legend className="w-full">
            <h2 id="pergunta" ref={foco} tabIndex={-1} className="flex scroll-mt-24 items-start gap-3 text-2xl focus:outline-none sm:text-3xl">
              <span className="mt-1 shrink-0 text-tower-red"><IconeCalor /></span>
              <span>O ambiente é muito quente?</span>
            </h2>
          </legend>
          <Botoes responder={responder} campo="calor" cols={2} opcoes={[{ valor: 'sim', rotulo: 'Sim' }, { valor: 'nao', rotulo: 'Não' }]} />
        </fieldset>
      )}

      {tela.id === 'incomodos' && (
        <Incomodos
          ref={foco}
          selecionados={r.incomodos ?? []}
          onConfirmar={(lista) => responder('incomodos', lista)}
        />
      )}

      <div className="mt-8 flex items-center justify-between">
        {passo > 0 ? (
          <button type="button" onClick={voltar} className="inline-flex min-h-11 items-center font-display text-sm font-bold text-ink-2 underline underline-offset-4">
            ← Voltar
          </button>
        ) : (
          <span className="text-sm text-ink-3">Leva menos de 1 minuto. Resultado gratuito, sem cadastro.</span>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- incômodos */


const INCOMODOS: { valor: Incomodo; icone?: React.ReactNode }[] = [
  { valor: 'peso' },
  { valor: 'calor', icone: <IconeCalor className="h-5 w-5" /> },
  { valor: 'cansaco', icone: <IconeCaminhada className="h-5 w-5" /> },
  { valor: 'dor' },
  { valor: 'duro' },
  { valor: 'escorregar' },
  { valor: 'molhar', icone: <IconeAgua className="h-5 w-5" /> },
  { valor: 'biqueira' },
  { valor: 'higiene' },
  { valor: 'nenhum' },
]

const Incomodos = forwardRef<HTMLHeadingElement, { selecionados: Incomodo[]; onConfirmar: (l: Incomodo[]) => void }>(
  function Incomodos({ selecionados, onConfirmar }, ref) {
    const [lista, setLista] = useState<Incomodo[]>(selecionados)
    function alternar(v: Incomodo) {
      setLista((atual) => {
        if (v === 'nenhum') return atual.includes('nenhum') ? [] : ['nenhum']
        const sem = atual.filter((i) => i !== 'nenhum')
        return sem.includes(v) ? sem.filter((i) => i !== v) : [...sem, v]
      })
    }
    return (
      <fieldset>
        <legend className="w-full">
          <h2 id="pergunta" ref={ref} tabIndex={-1} className="flex scroll-mt-24 items-start gap-3 text-2xl focus:outline-none sm:text-3xl">
            <span className="mt-1 shrink-0 text-tower-red"><IconeConforto /></span>
            <span>O que mais incomoda em calçado de trabalho?</span>
          </h2>
          <p className="mt-2 text-sm text-ink-3">Pode escolher mais de um. Última pergunta.</p>
        </legend>
        <div className="mt-6 grid gap-2 sm:grid-cols-2" role="group" aria-labelledby="pergunta">
          {INCOMODOS.map((o) => {
            const ativo = lista.includes(o.valor)
            return (
              <button
                key={o.valor}
                type="button"
                aria-pressed={ativo}
                onClick={() => alternar(o.valor)}
                className={`flex min-h-[3.25rem] w-full items-center gap-3 border px-5 py-3 text-left font-display text-[1rem] font-semibold transition-colors ${
                  ativo ? 'border-ink bg-ink text-paper' : 'border-rule-strong bg-paper hover:border-ink hover:bg-paper-2'
                }`}
              >
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center border ${ativo ? 'border-paper bg-paper text-ink' : 'border-rule-strong'}`} aria-hidden="true">
                  {ativo && <svg viewBox="0 0 12 12" className="h-3 w-3"><path d="M2 6l3 3 5-6" fill="none" stroke="currentColor" strokeWidth="2" /></svg>}
                </span>
                {ROTULO_INCOMODO[o.valor].charAt(0).toUpperCase() + ROTULO_INCOMODO[o.valor].slice(1)}
              </button>
            )
          })}
        </div>
        <button
          type="button"
          onClick={() => onConfirmar(lista.length ? lista : ['nenhum'])}
          className="btn btn-red mt-6"
        >
          Ver meu resultado <IconeSeta />
        </button>
      </fieldset>
    )
  },
)

/* -------------------------------------------------------------- resultado */

function Resultado({
  r,
  refazer,
  copiado,
  setCopiado,
  rolar,
  tamanho,
}: {
  r: Respostas
  refazer: () => void
  copiado: boolean
  setCopiado: (v: boolean) => void
  rolar: boolean
  tamanho: boolean
}) {
  const res = useMemo(() => calcular(r), [r])
  const b2b = r.para === 'equipe'
  const mensagem = useMemo(() => mensagemWhatsApp(r, res), [r, res])
  const linkZap = linkWhatsApp('ferramenta-calcado', mensagem.length > LIMITE_MENSAGEM ? undefined : mensagem)
  const foco = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    foco.current?.focus({ preventScroll: true })
    if (rolar) foco.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    // Estado na URL, para o botão de compartilhar e para voltar depois.
    const qs = serializar(r)
    window.history.replaceState(null, '', `${CAMINHO}?${qs}`)
  }, [r])

  async function compartilhar() {
    rastrearCta('compartilhar-resultado', CAMINHO)
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Meu perfil de calçado profissional', url })
        return
      }
    } catch {
      /* cancelado pela pessoa: cai no copiar */
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2500)
    } catch {
      window.prompt('Copie o link:', url)
    }
  }

  const cartao = 'border border-rule bg-paper p-5'

  return (
    <div className="max-w-3xl" data-ferramenta={FERRAMENTA} data-resultado={res.familia.chave}>
      <p className="eyebrow eyebrow-red">Seu perfil de calçado</p>
      <h2 ref={foco} tabIndex={-1} className="mt-3 scroll-mt-28 text-2xl focus:outline-none sm:text-3xl lg:text-4xl">
        {res.insuficiente ? 'Seu cenário precisa de uma avaliação mais específica' : res.familia.nome}
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
        {res.insuficiente
          ? 'Com atividade fora da lista e as perguntas de risco sem resposta, qualquer orientação seria chute. O caminho mais curto é contar o que você faz para a gente responder com base no risco real.'
          : res.familia.frase}
      </p>
      {!res.insuficiente && (
        <p className="mt-3 text-sm text-ink-3">
          Pelas características informadas, este é o tipo de calçado que merece ser avaliado. O modelo definitivo depende do risco real da atividade, do CA e da especificação do fabricante.
        </p>
      )}

      {res.alertas.length > 0 && (
        <ul className="mt-8 space-y-3">
          {res.alertas.map((a) => (
            <li key={a} className="border-l-4 border-tower-red bg-tower-red-soft px-5 py-4 text-[0.95rem] leading-relaxed">
              {a}
            </li>
          ))}
        </ul>
      )}

      {!res.insuficiente && (
        <>
          <h3 className="mt-10 eyebrow">Características que vale procurar</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { rotulo: 'Formato', item: res.formato, icone: <IconeConforto className="h-5 w-5" /> },
              { rotulo: 'Biqueira', item: res.biqueira, icone: <IconeImpacto className="h-5 w-5" /> },
              { rotulo: 'Solado', item: res.solado, icone: <IconeOleo className="h-5 w-5" /> },
              { rotulo: 'Cabedal', item: res.cabedal, icone: <IconeQuimico className="h-5 w-5" /> },
              { rotulo: 'Água', item: res.agua, icone: <IconeAgua className="h-5 w-5" /> },
              { rotulo: 'Conforto', item: res.conforto, icone: <IconeCaminhada className="h-5 w-5" /> },
            ].map(({ rotulo, item, icone }) => (
              <div key={rotulo} className={cartao}>
                <p className="flex items-center gap-2 eyebrow">
                  <span className="text-tower-red">{icone}</span>
                  {rotulo}
                </p>
                <p className="mt-2 font-display text-lg font-bold leading-snug">{item.nome}</p>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-2">{item.frase}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {res.porque.length > 0 && (
        <div className="mt-10">
          <h3 className="eyebrow">Por que chegamos nisso</h3>
          <ul className="mt-4 divide-y divide-rule border-y border-rule">
            {res.porque.map((p) => (
              <li key={p} className="flex gap-4 py-4">
                <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-tower-red" />
                <span className="text-[0.95rem] leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {res.confirmar.length > 0 && (
        <div className="mt-10 border border-rule bg-paper-2 p-6">
          <h3 className="eyebrow">O que confirmar antes de comprar</h3>
          <p className="mt-2 text-sm text-ink-3">Você respondeu “não sei” nestes pontos. Nenhum deles é culpa sua: são justamente os que se confirmam com quem faz a avaliação de riscos.</p>
          <ul className="mt-4 space-y-3">
            {res.confirmar.map((c) => (
              <li key={c} className="flex gap-3 text-[0.95rem] leading-relaxed">
                <span className="mt-0.5 font-display text-xs font-bold text-tower-red">?</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA principal */}
      <div className="mt-10 band-ink p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl">
          {b2b ? 'Vai comprar para a equipe?' : 'Ficou em dúvida entre dois modelos?'}
        </h3>
        <p className="mt-3 max-w-xl text-paper/80">
          {b2b
            ? 'A mensagem já vai com o perfil e o tamanho da equipe. A gente responde com as opções e ajuda a montar a grade de numeração.'
            : 'A mensagem já vai com o seu perfil inteiro. Quem responde é um dos dois sócios, e um deles é técnico de segurança do trabalho.'}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={linkZap}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-zap"
            onClick={() =>
              rastrearWhatsApp({
                contexto: 'ferramenta-calcado',
                pagina: CAMINHO,
                secao: b2b ? 'resultado-equipe' : 'resultado',
                publico: b2b ? 'b2b' : 'b2c',
                categoria: res.familia.chave,
              })
            }
          >
            <IconeWhatsApp />
            {b2b ? 'Solicitar orçamento para minha equipe' : 'Falar com a Tower no WhatsApp'}
          </a>
          {b2b && (
            <Link href="/orcamento/" className="btn btn-linha" onClick={() => rastrearCta('montar-grade', CAMINHO)}>
              Montar grade de numeração
            </Link>
          )}
        </div>
        <details className="mt-5 text-xs text-paper/60">
          <summary className="inline-flex min-h-11 cursor-pointer items-center underline underline-offset-4">Ver a mensagem que vai ser enviada</summary>
          <p className="mt-3 whitespace-pre-line italic leading-relaxed">{mensagem}</p>
        </details>
      </div>

      {/* Próximo passo da jornada: o tipo está escolhido, falta o número. A
          família vai na URL, e a calculadora a devolve na mensagem. */}
      {tamanho && (
        <Link
          href={`/ferramentas/tamanho-de-botina/?calcado=${res.familia.chave}`}
          onClick={() => rastrearCta('tamanho-de-botina', CAMINHO)}
          className={`${cartao} mt-10 flex items-center justify-between gap-4 transition-colors hover:border-ink`}
        >
          <span>
            <span className="eyebrow block">Próximo passo</span>
            <span className="mt-2 block font-display text-lg font-bold">Qual numeração pedir? Calcule pelo seu pé</span>
          </span>
          <span aria-hidden="true">→</span>
        </Link>
      )}

      {/* Linhas reais */}
      {res.linhas.length > 0 && (
        <div className="mt-10">
          <h3 className="eyebrow">Linhas que a Tower trabalha nessa família</h3>
          <p className="mt-2 text-sm text-ink-3">O site não lista modelo nem CA: isso sai na conversa, com o risco da sua atividade na mão.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {res.linhas.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => rastrearCta(`linha-${l.rotulo.toLowerCase().replace(/\s/g, '-')}`, CAMINHO)}
                className={`${cartao} block transition-colors hover:border-ink`}
              >
                <p className="font-display text-lg font-bold">{l.rotulo} →</p>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-2">{l.frase}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Leituras e atividade */}
      {(res.leituras.length > 0 || res.paginaAtividade) && (
        <div className="mt-10">
          <h3 className="eyebrow">Para entender melhor cada escolha</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {[...(res.paginaAtividade ? [res.paginaAtividade] : []), ...res.leituras].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block border border-rule-strong px-4 py-3 font-display text-[0.8rem] font-semibold transition-colors hover:border-ink hover:bg-paper-2">
                  {l.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cross-sell honesto */}
      {res.outrasProtecoes.length > 0 && (
        <div className="mt-10 border-t border-rule pt-8">
          <h3 className="eyebrow">Além do calçado</h3>
          <p className="mt-2 max-w-xl text-[0.95rem] text-ink-2">
            Atividades com o perfil de {ROTULO_ATIVIDADE[r.atividade].toLowerCase()} costumam envolver outras categorias de proteção. Isto não é lista obrigatória: é o que vale olhar.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {res.outrasProtecoes.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block border border-rule-strong px-4 py-3 font-display text-[0.8rem] font-semibold transition-colors hover:border-ink hover:bg-paper-2">
                  {l.rotulo}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/encontrar-epi/" className="inline-block border border-ink bg-ink px-4 py-3 font-display text-[0.8rem] font-semibold text-paper">
                Descobrir outros EPIs para minha atividade
              </Link>
            </li>
          </ul>
        </div>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-rule pt-6">
        <button type="button" onClick={compartilhar} className="inline-flex min-h-11 items-center font-display text-sm font-bold underline underline-offset-4">
          {copiado ? 'Link copiado' : 'Compartilhar meu resultado'}
        </button>
        <button type="button" onClick={refazer} className="inline-flex min-h-11 items-center font-display text-sm font-bold text-ink-2 underline underline-offset-4">
          Refazer o teste
        </button>
      </div>
    </div>
  )
}
