'use client'

import { useMemo, useState } from 'react'
import {
  CATEGORIAS_COTACAO,
  NUMERACOES,
  PRAZOS_COTACAO,
  buscarCategoria,
} from '@/content/cotacao'
import {
  linkWhatsApp,
  mensagemCotacao,
  LIMITE_MENSAGEM,
  type ItemCotacao,
} from '@/lib/whatsapp'
import {
  rastrearFormIniciado,
  rastrearFormConcluido,
  rastrearWhatsApp,
} from '@/lib/analytics'
import { IconeWhatsApp } from './Icones'

/**
 * Construtor de cotação.
 *
 * Não guarda nada e não envia nada para servidor nenhum: monta o texto no
 * próprio navegador e abre o WhatsApp com ele pronto. A Tower recebe um
 * pedido que dá para cotar direto, em vez de um "oi, quanto custa botina?"
 * seguido de dez perguntas.
 *
 * A grade de numeração existe porque é o dado que mais falta num pedido de
 * calçado para equipe — sem ela, o orçamento não sai na primeira resposta.
 */

const novoItem = (): ItemCotacao => ({
  id: Math.random().toString(36).slice(2, 9),
  categoria: '',
  descricao: '',
  quantidade: '',
  numeracao: {},
})

const rotulo = 'block font-display text-sm font-bold'
const campo =
  'mt-2 w-full border border-rule-strong bg-paper px-4 py-3 text-base focus:border-ink focus:outline-none'

export function FormularioCotacao() {
  const [itens, setItens] = useState<ItemCotacao[]>([novoItem()])
  const [cidade, setCidade] = useState('')
  const [prazo, setPrazo] = useState('')
  const [nome, setNome] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [observacao, setObservacao] = useState('')
  const [iniciado, setIniciado] = useState(false)
  const [copiado, setCopiado] = useState(false)

  const marcarInicio = () => {
    if (!iniciado) {
      setIniciado(true)
      rastrearFormIniciado('cotacao')
    }
  }

  function atualizar(id: string, campos: Partial<ItemCotacao>) {
    setItens((lista) =>
      lista.map((it) => (it.id === id ? { ...it, ...campos } : it)),
    )
  }

  function atualizarNumeracao(id: string, numero: string, valor: string) {
    setItens((lista) =>
      lista.map((it) =>
        it.id === id
          ? { ...it, numeracao: { ...it.numeracao, [numero]: valor } }
          : it,
      ),
    )
  }

  const itensValidos = itens.filter((i) => i.categoria !== '')
  const completo = itensValidos.length > 0

  const mensagem = useMemo(
    () =>
      completo
        ? mensagemCotacao({
            itens: itensValidos,
            cidade,
            prazo,
            nome,
            empresa,
            observacao,
          })
        : '',
    [completo, itensValidos, cidade, prazo, nome, empresa, observacao],
  )

  const longaDemais = mensagem.length > LIMITE_MENSAGEM

  function abrirWhatsApp() {
    rastrearFormConcluido('cotacao', {
      itens: itensValidos.length,
      prazo,
      tem_numeracao: itensValidos.some((i) =>
        Object.values(i.numeracao).some((q) => Number(q) > 0),
      ),
    })
    rastrearWhatsApp({
      contexto: 'cotacao',
      pagina: '/orcamento/',
      secao: 'formulario',
      publico: empresa.trim() ? 'b2b' : 'b2c',
      categoria: itensValidos[0]?.categoria,
    })
    window.open(linkWhatsApp('cotacao', mensagem), '_blank', 'noopener,noreferrer')
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(mensagem)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2500)
    } catch {
      setCopiado(false)
    }
  }

  return (
    <div onFocus={marcarInicio}>
      {/* ITENS */}
      <ol className="space-y-6">
        {itens.map((item, indice) => {
          const cat = buscarCategoria(item.categoria)
          const totalPares = Object.values(item.numeracao).reduce(
            (s, q) => s + (Number(q) || 0),
            0,
          )

          return (
            <li key={item.id} className="border border-rule-strong bg-paper p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <p className="numeral text-2xl text-tower-red">
                  {String(indice + 1).padStart(2, '0')}
                </p>
                {itens.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setItens((l) => l.filter((i) => i.id !== item.id))}
                    className="font-display text-sm font-semibold text-ink-3 underline underline-offset-4 hover:text-tower-red"
                  >
                    Remover
                  </button>
                )}
              </div>

              <div className="mt-4 space-y-5">
                <div>
                  <label htmlFor={`cat-${item.id}`} className={rotulo}>
                    O que você precisa?
                  </label>
                  <select
                    id={`cat-${item.id}`}
                    value={item.categoria}
                    onChange={(e) =>
                      atualizar(item.id, { categoria: e.target.value, numeracao: {} })
                    }
                    className={campo}
                  >
                    <option value="">Selecione a categoria</option>
                    {CATEGORIAS_COTACAO.map((c) => (
                      <option key={c.valor} value={c.valor}>
                        {c.rotulo}
                      </option>
                    ))}
                  </select>
                </div>

                {cat && (
                  <>
                    <div>
                      <label htmlFor={`desc-${item.id}`} className={rotulo}>
                        Detalhe, do seu jeito{' '}
                        <span className="font-normal text-ink-3">(opcional)</span>
                      </label>
                      <p className="mt-1 text-sm text-ink-3">{cat.exemplo}</p>
                      <input
                        id={`desc-${item.id}`}
                        type="text"
                        value={item.descricao}
                        onChange={(e) => atualizar(item.id, { descricao: e.target.value })}
                        className={campo}
                      />
                    </div>

                    {cat.numeracao ? (
                      /* GRADE DE NUMERAÇÃO — o dado que faz o orçamento sair
                         na primeira resposta em vez da terceira. */
                      <fieldset>
                        <legend className={rotulo}>
                          Quantos pares de cada numeração?
                        </legend>
                        <p className="mt-1 text-sm text-ink-3">
                          Preencha só as que precisar. Se for um par só, marque 1 na sua
                          numeração.
                        </p>
                        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">
                          {NUMERACOES.map((n) => (
                            <label key={n} className="block">
                              <span className="block text-center font-display text-xs font-bold text-ink-2">
                                {n}
                              </span>
                              <input
                                type="number"
                                min={0}
                                inputMode="numeric"
                                aria-label={`Pares na numeração ${n}`}
                                value={item.numeracao[n] ?? ''}
                                onChange={(e) =>
                                  atualizarNumeracao(item.id, n, e.target.value)
                                }
                                className="mt-1 w-full border border-rule-strong bg-paper px-1 py-2 text-center text-base focus:border-ink focus:outline-none"
                              />
                            </label>
                          ))}
                        </div>
                        <p aria-live="polite" className="mt-3 text-sm font-semibold">
                          {totalPares > 0
                            ? `${totalPares} ${totalPares === 1 ? 'par' : 'pares'} no total`
                            : 'Nenhum par informado ainda'}
                        </p>
                      </fieldset>
                    ) : (
                      <div>
                        <label htmlFor={`qtd-${item.id}`} className={rotulo}>
                          Quantidade{' '}
                          <span className="font-normal text-ink-3">({cat.unidade})</span>
                        </label>
                        <input
                          id={`qtd-${item.id}`}
                          type="text"
                          inputMode="numeric"
                          value={item.quantidade}
                          onChange={(e) =>
                            atualizar(item.id, { quantidade: e.target.value })
                          }
                          placeholder="Ex.: 30"
                          className={`${campo} sm:max-w-[10rem]`}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      <button
        type="button"
        onClick={() => setItens((l) => [...l, novoItem()])}
        className="btn btn-ghost mt-5"
      >
        + Adicionar outro item
      </button>

      {/* ENTREGA E IDENTIFICAÇÃO */}
      <div className="mt-12 border-t-2 border-ink pt-8">
        <h2 className="eyebrow eyebrow-red">Entrega e contato</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="cidade" className={rotulo}>
              Cidade
            </label>
            <input
              id="cidade"
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Fortaleza"
              className={campo}
            />
          </div>

          <div>
            <label htmlFor="prazo" className={rotulo}>
              Para quando você precisa?
            </label>
            <select
              id="prazo"
              value={prazo}
              onChange={(e) => setPrazo(e.target.value)}
              className={campo}
            >
              <option value="">Selecione</option>
              {PRAZOS_COTACAO.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="nome" className={rotulo}>
              Seu nome <span className="font-normal text-ink-3">(opcional)</span>
            </label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={campo}
            />
          </div>

          <div>
            <label htmlFor="empresa" className={rotulo}>
              Empresa <span className="font-normal text-ink-3">(se for o caso)</span>
            </label>
            <input
              id="empresa"
              type="text"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              className={campo}
            />
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="obs" className={rotulo}>
            Mais alguma coisa? <span className="font-normal text-ink-3">(opcional)</span>
          </label>
          <textarea
            id="obs"
            rows={3}
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            placeholder="Ex.: já usamos um modelo parecido, mas a equipe reclamou que esquenta muito"
            className={campo}
          />
        </div>
      </div>

      {/* PRÉVIA — mostrar o texto reduz a hesitação de quem tem receio de incomodar. */}
      <div className="mt-12 border-t-2 border-ink pt-8">
        <h2 className="eyebrow eyebrow-red">Sua mensagem</h2>

        {completo ? (
          <>
            <pre className="mt-5 whitespace-pre-wrap border-l-4 border-zap bg-paper-2 px-5 py-5 font-serif text-[0.95rem] leading-relaxed">
              {mensagem}
            </pre>

            {longaDemais && (
              <p
                role="alert"
                className="mt-4 border-l-4 border-tower-red bg-tower-red-soft px-5 py-4 text-[0.95rem]"
              >
                Sua cotação ficou longa e pode ser cortada pelo WhatsApp no meio do
                caminho. Use o botão <strong>Copiar texto</strong> e cole na conversa —
                assim nada se perde.
              </p>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {!longaDemais && (
                <button type="button" onClick={abrirWhatsApp} className="btn btn-zap">
                  <IconeWhatsApp />
                  Enviar pelo WhatsApp
                </button>
              )}
              <button type="button" onClick={copiar} className="btn btn-ghost">
                {copiado ? 'Texto copiado' : 'Copiar texto'}
              </button>
              {longaDemais && (
                <a
                  href={linkWhatsApp('cotacao')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    rastrearWhatsApp({
                      contexto: 'cotacao',
                      pagina: '/orcamento/',
                      secao: 'formulario-longo',
                      publico: empresa.trim() ? 'b2b' : 'b2c',
                    })
                  }
                  className="btn btn-zap"
                >
                  <IconeWhatsApp />
                  Abrir o WhatsApp para colar
                </a>
              )}
            </div>
            <p aria-live="polite" className="sr-only">
              {copiado ? 'Texto copiado para a área de transferência.' : ''}
            </p>
          </>
        ) : (
          <p className="mt-5 text-ink-2">
            Escolha ao menos uma categoria acima e a mensagem aparece aqui, pronta para
            você conferir antes de enviar.
          </p>
        )}
      </div>
    </div>
  )
}
