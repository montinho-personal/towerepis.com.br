import type { Metadata } from 'next'
import Link from 'next/link'
import { Trilha, CabecalhoPagina, EmUmaFrase, Secao } from '@/components/Blocos'
import { Ferramenta } from '@/components/Ferramenta'

export const metadata: Metadata = {
  title: 'Encontre o EPI certo para o seu trabalho',
  description:
    'Quatro perguntas sobre a sua rotina, e no fim o que costuma merecer atenção no seu caso. Orientação inicial, não laudo — e o contexto já pronto para o WhatsApp.',
  alternates: { canonical: '/encontrar-epi/' },
}

export default function EncontrarEpi() {
  return (
    <>
      <Trilha itens={[{ nome: 'Encontrar EPI', url: '/encontrar-epi/' }]} tom="escuro" />
      <CabecalhoPagina
        variante="ink"
        rotulo="Ferramenta de orientação"
        titulo="Encontre o EPI certo para o seu trabalho"
        resumo="Quatro perguntas. No final, você vê o que costuma merecer atenção no seu caso e pode falar com a gente com o contexto já pronto."
      />

      <Secao className="wrap">
        {/* Ressalva antes da ferramenta, não depois. Uma ferramenta de
            orientação que se apresenta como diagnóstico técnico seria
            irresponsável em saúde e segurança do trabalho. */}
        <div className="mb-10 border-l-4 border-tower-red bg-tower-red-soft px-6 py-5">
          <p className="eyebrow eyebrow-red">Antes de começar</p>
          <p className="mt-2 text-[0.95rem] leading-relaxed">
            Isto é uma orientação inicial, para ajudar você a saber o que perguntar e o
            que observar. Não é uma avaliação técnica de riscos — essa, quando necessária,
            precisa ser feita por profissional habilitado, no seu ambiente de trabalho.
          </p>
        </div>

        <Ferramenta />
      </Secao>

      {/* A página tinha 59 palavras: era a ferramenta e mais nada. Uma página
          que só carrega um componente não responde a busca nenhuma, e esta é
          a porta de entrada de quem não sabe nomear o que precisa. */}
      <Secao className="wrap" ritmo="normal">
        <EmUmaFrase>
          Esta ferramenta faz quatro perguntas sobre a sua rotina de trabalho — o ambiente,
          o que passa pelas mãos, o piso e o tempo em pé — e devolve as categorias de
          Equipamento de Proteção Individual (EPI) que costumam merecer atenção nesse
          perfil. É uma orientação inicial para você saber o que perguntar; não substitui a
          avaliação de riscos da empresa, que é feita por profissional habilitado.
        </EmUmaFrase>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4 text-[1.02rem] leading-relaxed text-ink-2">
            <h2 className="eyebrow text-ink">Para que ela serve</h2>
            <p>
              Para quem sabe descrever o trabalho, mas não sabe o nome do equipamento.
              Muita gente chega dizendo “preciso de um sapato que não escorregue” ou “uma
              luva para produto de limpeza” — e a partir daí a conversa anda.
            </p>
            <p>
              No fim, você pode mandar o resultado pelo WhatsApp com o contexto já pronto,
              sem precisar repetir tudo.
            </p>
          </div>
          <div className="space-y-4 text-[1.02rem] leading-relaxed text-ink-2">
            <h2 className="eyebrow text-ink">Se preferir ir direto</h2>
            <p>
              Já sabe a sua atividade? Vá por{' '}
              <Link href="/para-seu-trabalho/" className="underline underline-offset-4 hover:text-tower-red">
                profissão
              </Link>
              . Já sabe o que precisa proteger? Vá por{' '}
              <Link href="/protecao/" className="underline underline-offset-4 hover:text-tower-red">
                parte do corpo
              </Link>
              .
            </p>
            <p>
              É calçado e a dúvida é entre os dois tipos?{' '}
              <Link href="/calcados/comparativo/" className="underline underline-offset-4 hover:text-tower-red">
                Ocupacional ou de segurança
              </Link>{' '}
              responde em uma frase.
            </p>
          </div>
        </div>
      </Secao>
    </>
  )
}
