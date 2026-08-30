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

      {/* O canal e a área de atendimento são a página inteira, e estavam num
          quadro de contorno fino sobre papel — o mesmo peso de qualquer
          outra caixa do site. Em grafite, o número e o verde do WhatsApp
          passam a ser a primeira coisa que se vê. Faixa que sangra, não
          caixa: grafite em caixinha vira card. */}
      <section className="band-ink ritmo-normal">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow eyebrow-red">Canal principal</p>
              <p className="numeral mt-5 text-4xl sm:text-5xl">
                {empresa.whatsapp.exibicao}
              </p>
              <p className="mt-5 text-paper/75">
                Atendimento por Helano e Cristina. {empresa.horario.texto}.
              </p>
              <div className="mt-8 max-w-sm">
                <WhatsAppCta contexto="contato" secao="contato-principal" bloco>
                  Abrir conversa no WhatsApp
                </WhatsAppCta>
              </div>
            </div>

            <div className="space-y-8 lg:border-l lg:border-grafite-600 lg:pl-16">
              <div>
                <h2 className="eyebrow">Onde atendemos</h2>
                <p className="mt-3 text-lg">Fortaleza, região metropolitana e Ceará.</p>
                <p className="mt-3 text-paper/75">
                  Combinamos prazo e forma de entrega antes de fechar o pedido. Se não
                  dermos conta do prazo que você precisa, dizemos na hora.
                </p>
              </div>

              <div>
                <h2 className="eyebrow">Instagram</h2>
                <p className="mt-3">
                  <a
                    href={empresa.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg underline underline-offset-4 hover:text-tower-red-light"
                  >
                    @towerepis
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Secao className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <Perguntas perguntas={PERGUNTAS} />

          <div className="border-l-4 border-tower-red pl-6 lg:h-fit">
            <h2 className="eyebrow eyebrow-red">A Tower começou no Montese</h2>
            <p className="mt-3 text-ink-2">
              Foi num prédio pequeno alugado ali, em 1995, com estoque embaixo e
              escritório em cima. Em 2003 a empresa mudou para um prédio muito maior, no
              mesmo bairro, onde ficou mais de treze anos. Hoje a operação é conduzida
              diretamente pelos dois sócios, e o atendimento acontece pelo WhatsApp.
            </p>
          </div>
        </div>
      </Secao>
    </>
  )
}
