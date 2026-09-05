'use client'

import Link from 'next/link'

import { linkWhatsApp, mensagemDoContexto, type ContextoWhatsApp } from '@/lib/whatsapp'
import { rastrearWhatsApp } from '@/lib/analytics'
import { IconeWhatsApp } from './Icones'

type Props = {
  contexto: ContextoWhatsApp
  secao: string
  children: React.ReactNode
  publico?: 'b2b' | 'b2c'
  categoria?: string
  variante?: 'zap' | 'ink' | 'ghost' | 'linha'
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
    // Sobre superfície escura ou sobre o vermelho da marca, onde o verde do
    // WhatsApp brigaria com o fundo em vez de se destacar dele.
    linha: 'btn btn-linha',
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
 * Fechamento de página, em grafite e de borda a borda.
 *
 * A Home já terminava assim; as páginas internas terminavam num quadro
 * creme dentro do papel, e o resultado era que a última coisa vista antes
 * do rodapé era mais branco. O verde do WhatsApp contra o grafite é o
 * contraste mais forte disponível no sistema — desperdiçá-lo justamente no
 * momento da decisão era o erro.
 *
 * Mostrar o texto que será enviado continua no lugar: reduz a hesitação de
 * quem tem receio de "incomodar", porque a pessoa vê exatamente o que vai
 * acontecer antes de tocar no botão.
 */
export function FechamentoCta({
  contexto,
  secao,
  titulo,
  texto,
  rotulo = 'Falar no WhatsApp',
  publico,
  categoria,
  mensagem,
  children,
}: {
  contexto: ContextoWhatsApp
  secao: string
  titulo: string
  texto: string
  rotulo?: string
  publico?: 'b2b' | 'b2c'
  categoria?: string
  mensagem?: string
  /** Ação secundária opcional — orçamento, comparativo, o que a página pedir. */
  children?: React.ReactNode
}) {
  return (
    <section className="band-ink ritmo-normal">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow eyebrow-red">Atendimento direto</p>
            <h2 className="mt-4 max-w-xl text-titulo">{titulo}</h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper/75">{texto}</p>
          </div>

          <div className="lg:pb-1">
            <div className="flex flex-col gap-4">
              <WhatsAppCta
                contexto={contexto}
                secao={secao}
                publico={publico}
                categoria={categoria}
                mensagem={mensagem}
                bloco
              >
                {rotulo}
              </WhatsAppCta>
              {children}
            </div>

            <p className="mt-7 border-t border-grafite-600 pt-5 text-xs leading-relaxed text-paper/60">
              <span className="eyebrow">Sua mensagem já vai assim</span>
              <span className="mt-2 block italic">
                &ldquo;{mensagem ?? mensagemDoContexto(contexto)}&rdquo;
              </span>
              {/* Aviso de terceiro, uma linha, junto do botão. Não é modal e
                  não pede confirmação: virar barreira num CTA que é o único
                  canal de conversão do site custaria mais do que informa. */}
              <span className="mt-4 block text-paper/45">
                O botão abre o WhatsApp, que é um serviço de terceiro. A mensagem vai
                pronta, mas quem envia é você.{' '}
                <Link
                  href="/politica-de-privacidade/"
                  className="underline underline-offset-2 hover:text-paper/70"
                >
                  Privacidade
                </Link>
                .
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
