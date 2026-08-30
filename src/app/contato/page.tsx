import type { Metadata } from 'next'
import { Trilha, CabecalhoPagina, Perguntas, Secao } from '@/components/Blocos'
import { WhatsAppCta } from '@/components/WhatsAppCta'
import { empresa } from '@/config/empresa'
import { JsonLd, schemaFaq } from '@/lib/schema'

const PERGUNTAS = [
  {
    pergunta: 'A Tower tem loja física para visitar?',
    resposta:
      'Não. A Tower funcionou em loja no Montese de 1995 a 2016 e depois na Varjota. Desde 2018 a operação é conduzida diretamente por Helano e Cristina, com atendimento e pedidos pelo WhatsApp e entrega em Fortaleza e região.',
  },
  {
    pergunta: 'Qual a área de atendimento?',
    resposta:
      'Fortaleza e região. Conte onde você está que combinamos a forma de entrega e o prazo antes de fechar o pedido.',
  },
  {
    pergunta: 'Quem responde as mensagens?',
    resposta:
      'Helano ou Cristina, os dois sócios que fundaram a empresa em 1995. Não há intermediário nem vendedor trabalhando por comissão.',
  },
  {
    pergunta: 'Vocês atendem pessoa física?',
    resposta:
      'Sim. Atendemos tanto profissionais comprando para si quanto empresas comprando para a equipe. Conte o que você precisa que a gente orienta.',
  },
]

export const metadata: Metadata = {
  title: 'Contato — Tower EPI’s, Fortaleza',
  description:
    'Fale com a Tower EPI’s pelo WhatsApp. Atendimento por Helano e Cristina, os sócios, com entrega em Fortaleza e região. Desde 1995.',
  alternates: { canonical: '/contato/' },
}

/**
 * Página de utilidade, não de formulário.
 *
 * Como a Tower não tem loja física desde 2018, esta página não é "como
 * chegar" — é "como a gente atende". Endereço obsoleto público seria pior
 * do que endereço nenhum.
 */
export default function Contato() {
  return (
    <>
      <JsonLd dados={schemaFaq(PERGUNTAS)} />
      <Trilha itens={[{ nome: 'Contato', url: '/contato/' }]} />
      <CabecalhoPagina
        rotulo="Contato"
        titulo="Fale com a Tower"
        resumo="O WhatsApp é o nosso canal principal, e quem responde é um dos dois sócios. Se puder, já diga o que você faz e o que precisa proteger — assim a primeira resposta já vem útil."
      />

      <Secao className="wrap pt-0">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="border border-ink p-7 sm:p-9">
            <p className="eyebrow eyebrow-red">Canal principal</p>
            <p className="numeral mt-4 text-3xl sm:text-4xl">
              {empresa.whatsapp.exibicao}
            </p>
            <p className="mt-4 text-ink-2">
              Atendimento por Helano e Cristina. {empresa.horario.texto}.
            </p>
            <div className="mt-7">
              <WhatsAppCta contexto="contato" secao="contato-principal" bloco>
                Abrir conversa no WhatsApp
              </WhatsAppCta>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="eyebrow">Onde atendemos</p>
              <p className="mt-3 text-lg">
                Fortaleza, região metropolitana e Ceará.
              </p>
              <p className="mt-3 text-ink-2">
                Combinamos prazo e forma de entrega antes de fechar o pedido. Se não
                dermos conta do prazo que você precisa, dizemos na hora.
              </p>
            </div>

            <div>
              <p className="eyebrow">Instagram</p>
              <p className="mt-3">
                <a
                  href={empresa.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg underline underline-offset-4 hover:text-tower-red"
                >
                  @towerepis
                </a>
              </p>
            </div>

            <div className="border-t border-rule pt-8">
              <p className="eyebrow eyebrow-red">A Tower começou no Montese</p>
              <p className="mt-3 text-ink-2">
                Foi num prédio pequeno alugado ali, em 1995, com estoque embaixo e
                escritório em cima. Em 2003 a empresa mudou para um prédio muito maior, no
                mesmo bairro, onde ficou mais de treze anos. Hoje a operação é conduzida
                diretamente pelos dois sócios, e o atendimento acontece pelo WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </Secao>

      <Secao className="wrap pt-0">
        <div className="max-w-3xl">
          <Perguntas perguntas={PERGUNTAS} />
        </div>
      </Secao>
    </>
  )
}
