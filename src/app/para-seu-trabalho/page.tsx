import type { Metadata } from 'next'
import { PROFISSOES } from '@/content/profissoes'
import { Trilha, CabecalhoPagina, GradeLinks, Secao } from '@/components/Blocos'
import { FechamentoCta } from '@/components/WhatsAppCta'

export const metadata: Metadata = {
  title: 'EPI por profissão em Fortaleza',
  description:
    'Cozinha, enfermagem, limpeza, construção, indústria, logística e manutenção. O que observar na escolha do EPI para cada rotina — e por onde começar.',
  alternates: { canonical: '/para-seu-trabalho/' },
}

export default function HubProfissoes() {
  return (
    <>
      <Trilha itens={[{ nome: 'Por profissão', url: '/para-seu-trabalho/' }]} tom="escuro" />
      <CabecalhoPagina
        variante="ink"
        rotulo="Por profissão"
        titulo="Comece pelo que você faz"
        resumo="O risco muda conforme a rotina, e o critério de escolha muda junto. Encontre a sua atividade e veja o que realmente importa observar antes de comprar."
      />
      <Secao className="wrap">
        <h2 className="sr-only">Profissões atendidas</h2>
        <GradeLinks
          itens={PROFISSOES.map((p) => ({
            href: `/para-seu-trabalho/${p.slug}/`,
            titulo: p.nome,
            texto: p.resumoCurto,
          }))}
        />
      </Secao>
      <FechamentoCta
        contexto="home"
        secao="hub-profissoes"
        titulo="Não encontrou a sua atividade?"
        texto="Conte o que você faz e a que fica exposto no dia a dia. A gente indica o que costuma ser necessário e explica o porquê de cada item."
        rotulo="Falar com a Tower"
        publico="b2c"
      />
    </>
  )
}
