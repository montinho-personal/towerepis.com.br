'use client'

import { linkWhatsApp, mensagemDoContexto, type ContextoWhatsApp } from '@/lib/whatsapp'
import { rastrearWhatsApp } from '@/lib/analytics'
import { IconeWhatsApp } from './Icones'

type Props = {
  contexto: ContextoWhatsApp
  secao: string
  children: React.ReactNode
  publico?: 'b2b' | 'b2c'
  categoria?: string
  variante?: 'zap' | 'ink' | 'ghost'
  bloco?: boolean
  mensagem?: string
}

/**
 * Único caminho para criar um botão de WhatsApp no site.
 * Exige contexto e seção — assim nenhum CTA genérico consegue existir,
 * e a mensagem chega com informação suficiente para a Tower já responder.
 */
export function WhatsAppCta({
  contexto,
  secao,
  children,
  publico,
  categoria,
  variante = 'zap',
  bloco = false,
  mensagem,
}: Props) {
  const classes = {
    zap: 'btn btn-zap',
    ink: 'btn btn-ink',
    ghost: 'btn btn-ghost',
  }[variante]

  return (
    <a
      href={linkWhatsApp(contexto, mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${classes}${bloco ? ' btn-block' : ''}`}
      onClick={() =>
        rastrearWhatsApp({
          contexto,
          pagina: typeof window !== 'undefined' ? window.location.pathname : '',
          secao,
          publico,
          categoria,
        })
      }
    >
      <IconeWhatsApp />
      {children}
    </a>
  )
}

/**
 * CTA de linha, para aparecer cedo na página.
 *
 * O bloco completo fica no fim, depois de todo o conteúdo — que é o lugar
 * certo para ele. Mas quem já se decidiu no primeiro terço da página não
 * deveria precisar rolar tudo para agir, principalmente no celular.
 *
 * Compacto de propósito: não repete a promessa nem grita. Só oferece o
 * atalho, com a mesma mensagem contextual do bloco final.
 */
export function CtaLinha({
  contexto,
  secao,
  texto,
  rotulo,
  publico,
  categoria,
  mensagem,
}: {
  contexto: ContextoWhatsApp
  secao: string
  texto: string
  rotulo: string
  publico?: 'b2b' | 'b2c'
  categoria?: string
  mensagem?: string
}) {
  return (
    <div className="flex flex-col gap-4 border-y-2 border-ink py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <p className="max-w-lg font-display text-[1.05rem] font-bold leading-snug">
        {texto}
      </p>
      <div className="shrink-0">
        <WhatsAppCta
          contexto={contexto}
          secao={secao}
          publico={publico}
          categoria={categoria}
          mensagem={mensagem}
        >
          {rotulo}
        </WhatsAppCta>
      </div>
    </div>
  )
}

/**
 * Bloco de CTA com a mensagem à vista.
 * Mostrar o texto que será enviado reduz a hesitação de quem tem receio
 * de "incomodar" — a pessoa vê exatamente o que vai acontecer.
 */
export function BlocoCta({
  contexto,
  secao,
  titulo,
  texto,
  rotulo = 'Falar no WhatsApp',
  publico,
  categoria,
  mensagem,
}: {
  contexto: ContextoWhatsApp
  secao: string
  titulo: string
  texto: string
  rotulo?: string
  publico?: 'b2b' | 'b2c'
  categoria?: string
  mensagem?: string
}) {
  return (
    <div className="border border-rule bg-paper-2 p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl max-w-lg">{titulo}</h2>
      <p className="mt-3 measure text-ink-2">{texto}</p>

      <div className="mt-6">
        <WhatsAppCta
          contexto={contexto}
          secao={secao}
          publico={publico}
          categoria={categoria}
          mensagem={mensagem}
        >
          {rotulo}
        </WhatsAppCta>
      </div>

      <p className="mt-5 text-xs text-ink-3 leading-relaxed">
        <span className="eyebrow">Sua mensagem já vai assim</span>
        <span className="mt-1.5 block italic">
          “{mensagem ?? mensagemDoContexto(contexto)}”
        </span>
      </p>
    </div>
  )
}
