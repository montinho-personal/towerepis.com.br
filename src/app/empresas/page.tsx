import type { Metadata } from 'next'
import Link from 'next/link'
import { SETORES } from '@/content/setores'
import { Trilha, CabecalhoPagina, GradeLinks, Secao, BarraProva } from '@/components/Blocos'
import { FechamentoCta } from '@/components/WhatsAppCta'
import { ComoAtendemos, ComQuemVoceFala, ErroCaro } from '@/components/BlocosB2B'

export const metadata: Metadata = {
  title: { absolute: 'Fornecedor de EPI para empresas em Fortaleza' },
  description:
    'Fornecimento para equipes em Fortaleza e no Ceará, com o CA de cada item no orçamento. Sem CNPJ para começar a conversa — quem responde é um dos dois sócios.',
  alternates: { canonical: '/empresas/' },
}

export default function Empresas() {
  return (
    <>
      <Trilha itens={[{ nome: 'Para equipes', url: '/empresas/' }]} tom="escuro" />
      <CabecalhoPagina
        variante="ink"
        rotulo="Para equipes"
        titulo="EPI para a sua equipe, escolhido pela atividade"
        resumo="Você precisa que o equipamento chegue no prazo, corresponda ao risco e seja realmente usado pela equipe. É nessas três coisas que a gente trabalha desde 1995."
      />

      {/* Cabeçalho, ações e prova formam um bloco grafite só. Separados por
          uma tira de papel, os botões viravam uma faixa branca solta entre
          duas superfícies escuras. */}
      <div className="band-ink pb-14" data-continua>
        <div className="wrap">
          <div className="flex flex-wrap gap-3">
            <Link href="/orcamento/" className="btn btn-red">
              Pedir orçamento
            </Link>
            <Link href="/empresas/como-atendemos/" className="btn btn-linha">
              Como atendemos
            </Link>
          </div>
        </div>
      </div>

      <BarraProva continua />

      <Secao className="wrap">
        <h2 className="text-2xl sm:text-3xl">Encontre o seu setor</h2>
        <p className="mt-4 measure text-ink-2">
          Cada setor tem riscos, vocabulário e prioridades diferentes. Escolha o seu para
          ver o que costuma ser necessário.
        </p>
        <div className="mt-10">
          <GradeLinks
            itens={SETORES.map((s) => ({
              href: `/empresas/${s.slug}/`,
              titulo: s.nome,
              texto: s.resumoCurto,
            }))}
          />
        </div>
      </Secao>

      {/* Ponte para o hub regional. Link de corpo, e não só de rodapé: o
          menu aponta para tudo e por isso não sinaliza importância de nada. */}
      <Secao className="wrap" ritmo="compacto">
        <p className="measure text-[1.02rem] leading-relaxed text-ink-2">
          A Tower atende empresas em Fortaleza e no interior do Ceará, e também em Teresina,
          Parnaíba, Natal e Assú.{' '}
          <Link href="/epi-por-cidade/" className="underline underline-offset-4 hover:text-tower-red">
            Veja o que muda de uma região para outra
          </Link>{' '}
          — o EPI que resolve uma cozinha de hotel no litoral não é o que resolve um galpão
          de embalagem de fruta.
        </p>
      </Secao>

      <ErroCaro />
      <ComoAtendemos />
      <ComQuemVoceFala />

      <FechamentoCta
        contexto="empresas"
        secao="empresas-fechamento"
        titulo="Conte o que a sua equipe faz que a gente monta o orçamento."
        texto="Quantas pessoas são, quais atividades e para quando você precisa. Não pedimos CNPJ nem cadastro para começar — isso fica para depois, se fechar."
        rotulo="Solicitar orçamento"
        publico="b2b"
      />
    </>
  )
}
