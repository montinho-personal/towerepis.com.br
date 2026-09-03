import type { Metadata } from 'next'
import { PROTECOES } from '@/content/protecoes'
import { Trilha, CabecalhoPagina, GradeLinks, Secao } from '@/components/Blocos'
import { FechamentoCta } from '@/components/WhatsAppCta'

export const metadata: Metadata = {
  title: 'EPI por parte do corpo: o que cada um protege',
  description:
    'Respiração, mãos, audição, olhos, cabeça, corpo e pés. O que observar em cada categoria antes de escolher, com critério de técnico de segurança do trabalho.',
  alternates: { canonical: '/protecao/' },
}

export default function HubProtecao() {
  return (
    <>
      <Trilha itens={[{ nome: 'Proteção', url: '/protecao/' }]} tom="escuro" />
      <CabecalhoPagina
        variante="ink"
        rotulo="Proteção"
        titulo="O que você precisa proteger?"
        resumo="Cada parte do corpo enfrenta um tipo de risco e exige um critério próprio de escolha. Comece pela que precisa de proteção na sua atividade."
      />
      <Secao className="wrap">
        <h2 className="sr-only">Categorias de proteção</h2>
        <GradeLinks
          itens={[
            {
              href: '/calcados/',
              titulo: 'Pés',
              texto:
                'Calçados ocupacionais e de segurança. A categoria que mais gera dúvida — e onde o erro sai mais caro.',
            },
            ...PROTECOES.map((p) => ({
              href: `/protecao/${p.slug}/`,
              titulo: p.parte,
              texto: p.resumoCurto,
            })),
          ]}
        />
      </Secao>
      <FechamentoCta
        contexto="home"
        secao="hub-protecao"
        titulo="Não sabe qual proteção a sua atividade exige?"
        texto="Descreva a rotina e a que você fica exposto. A gente ajuda a identificar o que costuma ser necessário — e o que precisa de avaliação técnica antes."
        rotulo="Falar com a Tower"
      />
    </>
  )
}
