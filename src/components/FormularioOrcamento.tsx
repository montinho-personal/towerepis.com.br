'use client'

import { useState } from 'react'
import { mensagemOrcamento, linkWhatsApp } from '@/lib/whatsapp'
import {
  rastrearFormIniciado,
  rastrearFormConcluido,
  rastrearWhatsApp,
} from '@/lib/analytics'
import { IconeWhatsApp } from './Icones'

/**
 * Formulário B2B.
 *
 * Ele NÃO captura lead: monta a mensagem e abre o WhatsApp. A Tower recebe
 * um pedido pronto para cotar em vez de um "oi", que é o que sobrecarrega
 * os sócios e piora o atendimento.
 *
 * Cinco campos, e cada um se paga: se o campo não muda a resposta da Tower,
 * ele sai do formulário.
 */

const SEGMENTOS = [
  'Restaurante ou cozinha',
  'Hotel ou pousada',
  'Clínica, hospital ou laboratório',
  'Indústria',
  'Construção',
  'Limpeza e conservação',
  'Logística ou estoque',
  'Comércio',
  'Outro',
]

const PESSOAS = ['Até 5', '6 a 20', '21 a 50', '51 a 100', 'Mais de 100']

const PRAZOS = [
  'É urgente, para esta semana',
  'Nas próximas duas semanas',
  'Este mês',
  'Estou levantando preço, sem pressa',
]

export function FormularioOrcamento() {
  const [segmento, setSegmento] = useState('')
  const [pessoas, setPessoas] = useState('')
  const [necessidade, setNecessidade] = useState('')
  const [prazo, setPrazo] = useState('')
  const [cidade, setCidade] = useState('')
  const [iniciado, setIniciado] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const marcarInicio = () => {
    if (!iniciado) {
      setIniciado(true)
      rastrearFormIniciado('orcamento-b2b')
    }
  }

  const completo =
    segmento !== '' && pessoas !== '' && necessidade.trim() !== '' && prazo !== ''

  const previa = completo
    ? mensagemOrcamento({ segmento, pessoas, necessidade, prazo, cidade })
    : null

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (!previa) {
      setErro('Preencha os campos obrigatórios para montar a mensagem.')
      return
    }
    setErro(null)
    rastrearFormConcluido('orcamento-b2b', { segmento, pessoas, prazo })
    rastrearWhatsApp({
      contexto: 'orcamento',
      pagina: '/empresas/orcamento/',
      secao: 'formulario',
      publico: 'b2b',
      categoria: segmento,
    })
    window.open(linkWhatsApp('orcamento', previa), '_blank', 'noopener,noreferrer')
  }

  const rotuloCampo = 'block font-display text-sm font-bold'
  const campo =
    'mt-2 w-full border border-rule-strong bg-paper px-4 py-3 text-base focus:border-ink focus:outline-none'

  return (
    <form onSubmit={enviar} onFocus={marcarInicio} noValidate>
      <div className="space-y-7">
        <div>
          <label htmlFor="segmento" className={rotuloCampo}>
            1. Qual é o segmento da empresa?
          </label>
          <select
            id="segmento"
            required
            value={segmento}
            onChange={(e) => setSegmento(e.target.value)}
            className={campo}
          >
            <option value="">Selecione</option>
            {SEGMENTOS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="pessoas" className={rotuloCampo}>
            2. Quantas pessoas vão usar o equipamento?
          </label>
          <select
            id="pessoas"
            required
            value={pessoas}
            onChange={(e) => setPessoas(e.target.value)}
            className={campo}
          >
            <option value="">Selecione</option>
            {PESSOAS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="necessidade" className={rotuloCampo}>
            3. O que vocês precisam?
          </label>
          <p className="mt-1 text-sm text-ink-3">
            Pode escrever do seu jeito. Se souber a atividade da equipe, ajuda mais do que
            o nome do produto.
          </p>
          <textarea
            id="necessidade"
            required
            rows={4}
            value={necessidade}
            onChange={(e) => setNecessidade(e.target.value)}
            placeholder="Ex.: calçado antiderrapante para a equipe de cozinha, e luva para quem faz a limpeza pesada"
            className={campo}
          />
        </div>

        <div>
          <label htmlFor="prazo" className={rotuloCampo}>
            4. Para quando você precisa?
          </label>
          <select
            id="prazo"
            required
            value={prazo}
            onChange={(e) => setPrazo(e.target.value)}
            className={campo}
          >
            <option value="">Selecione</option>
            {PRAZOS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cidade" className={rotuloCampo}>
            5. Em que cidade?{' '}
            <span className="font-normal text-ink-3">(opcional)</span>
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
      </div>

      {/* Prévia da mensagem: a pessoa vê exatamente o que vai enviar.
          Reduz a hesitação de quem tem receio de "incomodar". */}
      {previa && (
        <div className="mt-8 border-l-4 border-zap bg-paper-2 px-5 py-5">
          <p className="eyebrow">Sua mensagem ficará assim</p>
          <p className="mt-3 whitespace-pre-line text-[0.95rem] leading-relaxed italic">
            {previa}
          </p>
        </div>
      )}

      {erro && (
        <p role="alert" className="mt-6 text-sm font-semibold text-tower-red-deep">
          {erro}
        </p>
      )}

      <div className="mt-8">
        <button type="submit" className="btn btn-zap btn-block" disabled={!completo}>
          <IconeWhatsApp />
          Enviar pelo WhatsApp
        </button>
        {!completo && (
          <p className="mt-3 text-sm text-ink-3">
            Preencha os quatro primeiros campos para montar a mensagem.
          </p>
        )}
      </div>
    </form>
  )
}
