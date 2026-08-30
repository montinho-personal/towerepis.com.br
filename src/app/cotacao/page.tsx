import type { Metadata } from 'next'
import Link from 'next/link'
import { Trilha, CabecalhoPagina, Perguntas, Secao } from '@/components/Blocos'
import { FormularioCotacao } from '@/components/FormularioCotacao'
import { ComQuemVoceFala } from '@/components/BlocosB2B'
import { JsonLd, schemaFaq } from '@/lib/schema'

const PERGUNTAS = [
  {
    pergunta: 'Preciso me cadastrar ou informar CNPJ?',
    resposta:
      'Não. A cotação não pede cadastro, e-mail, CPF nem CNPJ. Os dados cadastrais só entram depois, se o pedido for fechado.',
  },
  {
    pergunta: 'Serve para pessoa física, ou só para empresa?',
    resposta:
      'Serve para os dois. Se for um par de calçado para você, marque 1 na sua numeração e pronto. Se for para uma equipe, preencha a grade inteira.',
  },
  {
    pergunta: 'Não sei exatamente qual modelo preciso. Posso usar mesmo assim?',
    resposta:
      'Pode, e é até melhor. Escolha a categoria e descreva a atividade em vez do produto — onde a pessoa trabalha, como é o piso, se há queda de material sobre o pé. É com isso que a gente indica o modelo certo.',
  },
  {
    pergunta: 'Meus dados ficam guardados em algum lugar?',
    resposta:
      'Não. Tudo é montado no seu próprio navegador e nada é enviado para servidor nosso. O texto só sai daqui quando você aperta enviar, e vai direto para a conversa do WhatsApp.',
  },
  {
    pergunta: 'Por que vocês pedem a numeração par a par?',
    resposta:
      'Porque é o dado que mais falta num pedido de calçado para equipe. Com a grade preenchida, conseguimos responder com preço e prazo já na primeira mensagem, em vez de gastar dois dias perguntando tamanho.',
  },
]

export const metadata: Metadata = {
  title: 'Montar cotação de EPI',
  description:
    'Monte sua cotação de EPI item a item, com grade de numeração para calçado, e envie pronta pelo WhatsApp. Sem cadastro. Tower EPI’s, Fortaleza.',
  alternates: { canonical: '/cotacao/' },
}

export default function Cotacao() {
  return (
    <>
      <JsonLd dados={schemaFaq(PERGUNTAS)} />
      <Trilha itens={[{ nome: 'Cotação', url: '/cotacao/' }]} />
      <CabecalhoPagina
        rotulo="Cotação"
        titulo="Monte sua cotação"
        resumo="Adicione os itens, preencha a numeração se for calçado, e a mensagem sai pronta para o WhatsApp. Sem cadastro, sem e-mail, sem CNPJ."
      />

      <Secao className="wrap pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <h2 className="eyebrow eyebrow-red">O que você precisa</h2>
            <div className="mt-6">
              <FormularioCotacao />
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="border border-ink bg-paper-2 p-6">
              <p className="eyebrow">Por que a grade de numeração</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
                É o dado que mais falta num pedido de calçado para equipe. Com ele
                preenchido, a gente responde com preço e prazo já na primeira mensagem —
                em vez de gastar dois dias perguntando tamanho.
              </p>
            </div>

            <div className="border border-rule p-6">
              <p className="eyebrow">Não guardamos nada</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
                A mensagem é montada no seu navegador. Nada é enviado para servidor nosso
                — o texto só sai daqui quando você aperta enviar.
              </p>
            </div>

            <div className="border border-rule p-6">
              <p className="eyebrow">Em dúvida sobre o que pedir?</p>
              <ul className="mt-4 space-y-3 text-[0.95rem]">
                <li>
                  <Link href="/calcados/comparativo/" className="underline underline-offset-4">
                    Preciso de biqueira ou não?
                  </Link>
                </li>
                <li>
                  <Link href="/para-seu-trabalho/" className="underline underline-offset-4">
                    Ver o que se usa na minha profissão
                  </Link>
                </li>
                <li>
                  <Link href="/encontrar-epi/" className="underline underline-offset-4">
                    Responder 3 perguntas e descobrir
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Secao>

      <ComQuemVoceFala />

      <Secao className="wrap">
        <div className="max-w-3xl">
          <Perguntas perguntas={PERGUNTAS} />
        </div>
      </Secao>
    </>
  )
}
