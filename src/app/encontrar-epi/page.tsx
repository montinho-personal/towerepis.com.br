import type { Metadata } from 'next'
import { Trilha, CabecalhoPagina, Secao } from '@/components/Blocos'
import { Ferramenta } from '@/components/Ferramenta'

export const metadata: Metadata = {
  title: 'Encontre o EPI certo para o seu trabalho',
  description:
    'Quatro perguntas simples para orientar a escolha do equipamento de proteção. Uma orientação inicial, não um laudo técnico. Tower EPI’s, Fortaleza.',
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
    </>
  )
}
