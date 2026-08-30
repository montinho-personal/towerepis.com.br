'use client'

import { useState } from 'react'
import Link from 'next/link'
import { linkWhatsApp } from '@/lib/whatsapp'
import {
  rastrearFerramenta,
  rastrearFerramentaConcluida,
  rastrearWhatsApp,
} from '@/lib/analytics'
import { IconeWhatsApp } from './Icones'

/**
 * Ferramenta de orientação.
 *
 * Não é diagnóstico técnico e o texto deixa isso explícito. O papel dela é
 * transformar "não sei o que preciso" em "sei o que perguntar" — e chegar no
 * WhatsApp com contexto.
 *
 * Cada resultado aponta para páginas reais do site, para que a orientação
 * continue mesmo se a pessoa não quiser conversar agora.
 */

type Opcao = { valor: string; rotulo: string }

const ONDE: Opcao[] = [
  { valor: 'cozinha', rotulo: 'Cozinha ou área de alimentação' },
  { valor: 'saude', rotulo: 'Hospital, clínica ou laboratório' },
  { valor: 'limpeza', rotulo: 'Limpeza e conservação' },
  { valor: 'obra', rotulo: 'Obra ou construção' },
  { valor: 'industria', rotulo: 'Indústria ou produção' },
  { valor: 'logistica', rotulo: 'Armazém, estoque ou logística' },
  { valor: 'manutencao', rotulo: 'Manutenção' },
]

const RISCO: Opcao[] = [
  { valor: 'escorregar', rotulo: 'Piso molhado ou escorregadio' },
  { valor: 'impacto', rotulo: 'Queda de objeto pesado sobre o pé' },
  { valor: 'quimico', rotulo: 'Contato com produto químico' },
  { valor: 'poeira', rotulo: 'Poeira, névoa ou vapor no ar' },
  { valor: 'ruido', rotulo: 'Ruído alto e constante' },
  { valor: 'particula', rotulo: 'Projeção de partícula nos olhos' },
  { valor: 'pe', rotulo: 'Muitas horas em pé' },
]

const PARA: Opcao[] = [
  { valor: 'mim', rotulo: 'Para mim' },
  { valor: 'equipe', rotulo: 'Para uma equipe' },
]

type Resultado = {
  titulo: string
  atencao: string[]
  paginas: { href: string; rotulo: string }[]
}

const RESULTADOS: Record<string, Resultado> = {
  escorregar: {
    titulo: 'O que mais importa no seu caso é a aderência do solado',
    atencao: [
      'Resistência ao escorregamento é ensaiada em superfícies diferentes — verifique a marcação do modelo e o Certificado de Aprovação.',
      'Se o piso tem gordura ou óleo, o desempenho em superfície oleosa é o que interessa, não apenas em piso molhado.',
      'Calçado fechado e impermeável, se houver respingo de líquido.',
      'O relevo do solado se desgasta: confira periodicamente, porque é ele que garante a aderência.',
    ],
    paginas: [
      { href: '/calcados/antiderrapantes/', rotulo: 'Calçados antiderrapantes' },
      { href: '/calcados/comparativo/', rotulo: 'Ocupacional ou de segurança?' },
    ],
  },
  impacto: {
    titulo: 'O seu caso é de calçado de segurança, com biqueira',
    atencao: [
      'Biqueira de proteção conforme a ABNT NBR ISO 20345, com resistência a impacto de 200 J.',
      'Aço e composite protegem de forma equivalente quando atendem à norma; o composite é mais leve.',
      'A biqueira não protege a sola: se há material perfurante no chão, verifique se o modelo tem proteção contra perfuração.',
      'Se você caminha muito, o peso do calçado passa a ser um critério real.',
    ],
    paginas: [
      { href: '/calcados/seguranca/', rotulo: 'Calçados de segurança' },
      { href: '/calcados/comparativo/', rotulo: 'Entender a diferença' },
    ],
  },
  quimico: {
    titulo: 'A escolha depende de qual produto químico você usa',
    atencao: [
      'A resistência química varia conforme o material da luva, o produto e o tempo de contato.',
      'Não existe luva que resista bem a todos os produtos — é preciso saber quais são os seus.',
      'O comprimento do punho depende de até onde o braço fica exposto.',
      'Óculos de proteção durante a diluição do produto concentrado, que é o momento de maior risco.',
    ],
    paginas: [
      { href: '/protecao/maos/', rotulo: 'Proteção das mãos' },
      { href: '/protecao/olhos-e-face/', rotulo: 'Proteção para olhos' },
    ],
  },
  poeira: {
    titulo: 'É preciso saber qual agente está no ar antes de escolher',
    atencao: [
      'Máscara para partícula não protege contra vapor ou gás — e vice-versa.',
      'A classe da peça filtrante depende do agente e do nível de exposição.',
      'Equipamento que não veda no rosto não protege, independentemente da classe.',
      'Essa definição vem da avaliação de riscos do ambiente, não da aparência do equipamento.',
    ],
    paginas: [{ href: '/protecao/respiratoria/', rotulo: 'Proteção respiratória' }],
  },
  ruido: {
    titulo: 'O que protege é o protetor que se consegue usar o turno inteiro',
    atencao: [
      'A escolha depende do nível de ruído e do tempo de exposição, obtidos por medição.',
      'Atenuação em excesso pode impedir a percepção de alarmes e levar à retirada do protetor.',
      'Plug e concha têm perfis diferentes de conforto — o melhor é o que a pessoa mantém.',
      'Verifique a compatibilidade com capacete e óculos, se forem usados juntos.',
    ],
    paginas: [{ href: '/protecao/auditiva/', rotulo: 'Proteção auditiva' }],
  },
  particula: {
    titulo: 'A proteção muda conforme o agente: partícula, respingo ou radiação',
    atencao: [
      'Óculos com hastes protegem contra projeção frontal; respingo de líquido exige vedação.',
      'Protetor facial protege o rosto, mas não veda os olhos — muitas vezes os dois são usados juntos.',
      'Atividade com solda exige equipamento específico, com filtro adequado ao processo.',
      'Tratamento antiembaçante deixa de ser conforto e vira condição de uso em calor e umidade.',
    ],
    paginas: [{ href: '/protecao/olhos-e-face/', rotulo: 'Proteção para olhos e face' }],
  },
  pe: {
    titulo: 'Aqui o conforto é critério de proteção, não de preferência',
    atencao: [
      'Calçado que machuca é retirado no meio do turno — e aí não protege mais nada.',
      'Peso e amortecimento importam tanto quanto a proteção declarada.',
      'O pé incha ao longo do dia: prove pensando no fim do expediente.',
      'Se não há risco de impacto sobre os dedos, um calçado ocupacional tende a ser mais adequado.',
    ],
    paginas: [
      { href: '/calcados/ocupacionais/', rotulo: 'Calçados ocupacionais' },
      { href: '/calcados/comparativo/', rotulo: 'Ocupacional ou de segurança?' },
    ],
  },
}

const PAGINA_POR_ONDE: Record<string, string> = {
  cozinha: '/para-seu-trabalho/cozinha/',
  saude: '/para-seu-trabalho/enfermagem-e-saude/',
  limpeza: '/para-seu-trabalho/limpeza-e-conservacao/',
  obra: '/para-seu-trabalho/construcao/',
  industria: '/para-seu-trabalho/industria/',
  logistica: '/para-seu-trabalho/logistica-e-estoque/',
  manutencao: '/para-seu-trabalho/manutencao/',
}

const ROTULO_ONDE = Object.fromEntries(ONDE.map((o) => [o.valor, o.rotulo]))
const ROTULO_RISCO = Object.fromEntries(RISCO.map((o) => [o.valor, o.rotulo]))

export function Ferramenta() {
  const [etapa, setEtapa] = useState(0)
  const [onde, setOnde] = useState('')
  const [risco, setRisco] = useState('')
  const [para, setPara] = useState('')

  function escolher(campo: 'onde' | 'risco' | 'para', valor: string) {
    rastrearFerramenta(campo, valor)
    if (campo === 'onde') setOnde(valor)
    if (campo === 'risco') setRisco(valor)
    if (campo === 'para') {
      setPara(valor)
      rastrearFerramentaConcluida(`${onde}|${risco}|${valor}`)
    }
    setEtapa((e) => e + 1)
  }

  function reiniciar() {
    setEtapa(0)
    setOnde('')
    setRisco('')
    setPara('')
  }

  const resultado = RESULTADOS[risco]

  const mensagem = resultado
    ? [
        'Olá! Vim pelo site da Tower e usei a ferramenta de orientação.',
        '',
        `Onde trabalho: ${ROTULO_ONDE[onde] ?? onde}`,
        `Principal necessidade: ${ROTULO_RISCO[risco] ?? risco}`,
        `Compra: ${para === 'equipe' ? 'para uma equipe' : 'para mim'}`,
        '',
        'Gostaria de ajuda para escolher.',
      ].join('\n')
    : ''

  const botao =
    'w-full border border-rule-strong bg-paper px-5 py-4 text-left font-display text-base font-semibold transition-colors hover:border-ink hover:bg-paper-2'

  return (
    <div className="max-w-3xl">
      {/* Progresso */}
      <ol className="mb-8 flex gap-2" aria-label="Progresso">
        {[0, 1, 2, 3].map((i) => (
          <li
            key={i}
            className={`h-1 flex-1 ${i <= etapa ? 'bg-tower-red' : 'bg-rule'}`}
            aria-current={i === etapa ? 'step' : undefined}
          />
        ))}
      </ol>

      {etapa === 0 && (
        <fieldset>
          <legend className="font-display text-xl font-bold sm:text-2xl">
            Onde você trabalha?
          </legend>
          <div className="mt-6 grid gap-2">
            {ONDE.map((o) => (
              <button key={o.valor} type="button" className={botao} onClick={() => escolher('onde', o.valor)}>
                {o.rotulo}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {etapa === 1 && (
        <fieldset>
          <legend className="font-display text-xl font-bold sm:text-2xl">
            Qual é a principal preocupação na sua rotina?
          </legend>
          <p className="mt-2 text-sm text-ink-3">
            Se houver mais de uma, escolha a que mais incomoda hoje.
          </p>
          <div className="mt-6 grid gap-2">
            {RISCO.map((o) => (
              <button key={o.valor} type="button" className={botao} onClick={() => escolher('risco', o.valor)}>
                {o.rotulo}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {etapa === 2 && (
        <fieldset>
          <legend className="font-display text-xl font-bold sm:text-2xl">
            A compra é para você ou para uma equipe?
          </legend>
          <div className="mt-6 grid gap-2">
            {PARA.map((o) => (
              <button key={o.valor} type="button" className={botao} onClick={() => escolher('para', o.valor)}>
                {o.rotulo}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {etapa >= 3 && resultado && (
        <div>
          <p className="eyebrow eyebrow-red">O que merece atenção no seu caso</p>
          <h2 className="mt-4 text-2xl sm:text-3xl">{resultado.titulo}</h2>

          <ul className="mt-8 divide-y divide-rule border-y border-rule">
            {resultado.atencao.map((item) => (
              <li key={item} className="flex gap-4 py-5">
                <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-tower-red" />
                <span className="text-[0.98rem] leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 eyebrow">Onde ler mais</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {[
              ...resultado.paginas,
              ...(PAGINA_POR_ONDE[onde]
                ? [{ href: PAGINA_POR_ONDE[onde], rotulo: ROTULO_ONDE[onde] }]
                : []),
              ...(para === 'equipe' ? [{ href: '/empresas/', rotulo: 'Para empresas' }] : []),
            ].map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="inline-block border border-rule-strong px-4 py-3 font-display text-[0.8rem] font-semibold transition-colors hover:border-ink hover:bg-paper-2"
                >
                  {p.rotulo}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 border border-rule bg-paper-2 p-6 sm:p-8">
            <h3 className="text-xl">Quer que a Tower ajude a encontrar uma opção?</h3>
            <p className="mt-3 text-ink-2">
              A gente já sabe o essencial do seu caso. É só enviar — a mensagem vai pronta.
            </p>
            <div className="mt-6">
              <a
                href={linkWhatsApp('ferramenta', mensagem)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-zap"
                onClick={() =>
                  rastrearWhatsApp({
                    contexto: 'ferramenta',
                    pagina: '/encontrar-epi/',
                    secao: 'resultado',
                    publico: para === 'equipe' ? 'b2b' : 'b2c',
                    categoria: risco,
                  })
                }
              >
                <IconeWhatsApp />
                Falar com a Tower
              </a>
            </div>
            <p className="mt-5 whitespace-pre-line text-xs italic leading-relaxed text-ink-3">
              “{mensagem}”
            </p>
          </div>

          <button
            type="button"
            onClick={reiniciar}
            className="mt-8 font-display text-sm font-bold underline underline-offset-4"
          >
            Recomeçar
          </button>
        </div>
      )}

      {etapa > 0 && etapa < 3 && (
        <button
          type="button"
          onClick={() => setEtapa((e) => e - 1)}
          className="mt-8 font-display text-sm font-bold text-ink-2 underline underline-offset-4"
        >
          ← Voltar
        </button>
      )}
    </div>
  )
}
