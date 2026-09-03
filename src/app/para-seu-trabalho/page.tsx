import type { Metadata } from 'next'
import { PROFISSOES } from '@/content/profissoes'
import Link from 'next/link'
import { Trilha, CabecalhoPagina, GradeLinks, EmUmaFrase, Ponte, Perguntas, Secao } from '@/components/Blocos'
import { FechamentoCta } from '@/components/WhatsAppCta'
import { JsonLd, schemaFaq } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'EPI por profissão em Fortaleza',
  description:
    'Cozinha, enfermagem, limpeza, construção, indústria, logística e manutenção. O que observar na escolha do EPI para cada rotina — e por onde começar.',
  alternates: { canonical: '/para-seu-trabalho/' },
}

/**
 * Hub de profissões.
 *
 * Tinha 146 palavras. O índice listava sete profissões e não dizia por que o
 * site é organizado assim — que é justamente a informação que faz alguém
 * reconhecer o próprio caso e clicar no lugar certo.
 */
const PERGUNTAS = [
  {
    pergunta: 'Por que o EPI muda de uma profissão para outra?',
    resposta:
      'Porque o risco muda. Duas pessoas podem usar calçado o dia inteiro e precisar de calçados diferentes: quem trabalha em cozinha precisa de solado que segure em piso molhado e engordurado; quem trabalha em obra precisa de biqueira contra queda de objeto. O equipamento acompanha a rotina, não o cargo.',
  },
  {
    pergunta: 'A minha profissão não está na lista. E agora?',
    resposta:
      'As sete páginas cobrem as rotinas que mais chegam à Tower, mas a lógica vale para qualquer atividade: descreva o que você faz, em que ambiente e a que fica exposto. É assim que se chega ao equipamento certo, mesmo sem uma página pronta para a sua função.',
  },
  {
    pergunta: 'Quem decide o EPI: eu ou a empresa?',
    resposta:
      'A empresa. A definição do EPI adequado vem da avaliação de riscos, e o fornecimento é obrigação do empregador, gratuitamente. O que esta seção do site ajuda é a entender o porquê de cada item — o que costuma melhorar o uso e a conversa com quem compra.',
  },
]

export default function HubProfissoes() {
  return (
    <>
      <JsonLd dados={schemaFaq(PERGUNTAS)} />
      <Trilha itens={[{ nome: 'Por profissão', url: '/para-seu-trabalho/' }]} tom="escuro" />
      <CabecalhoPagina
        variante="ink"
        rotulo="Por profissão"
        titulo="Comece pelo que você faz"
        resumo="O risco muda conforme a rotina, e o critério de escolha muda junto. Encontre a sua atividade e veja o que realmente importa observar antes de comprar."
      />
      <Secao className="wrap" ritmo="normal">
        <EmUmaFrase>
          O Equipamento de Proteção Individual (EPI) certo depende da rotina, e não do
          cargo: o que decide é a que a pessoa fica exposta durante a jornada — piso,
          produto, ruído, peso, temperatura e ferramenta. Por isso este site é organizado
          por atividade, e cada página explica o critério de escolha daquela rotina antes
          de falar em produto.
        </EmUmaFrase>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4 text-[1.02rem] leading-relaxed text-ink-2">
            <h2 className="eyebrow text-ink">O que muda de uma rotina para outra</h2>
            <p>
              Três coisas, quase sempre: <strong>o piso</strong>, que decide o solado;{' '}
              <strong>o que passa pelas mãos</strong>, que decide a luva; e{' '}
              <strong>quanto tempo se fica em pé</strong>, que decide o peso aceitável do
              calçado. O resto é consequência.
            </p>
            <p>
              É por isso que a cozinha de um restaurante e o refeitório de uma indústria
              usam o mesmo calçado, e o almoxarifado ao lado usa outro — mesma empresa,
              risco diferente.
            </p>
          </div>
          <div className="space-y-4 text-[1.02rem] leading-relaxed text-ink-2">
            <h2 className="eyebrow text-ink">O erro que se repete</h2>
            <p>
              Padronizar pelo cargo em vez de padronizar pela exposição. A equipe inteira
              recebe o mesmo item porque está na mesma folha, e metade dela fica protegida
              a mais — carregando peso que não precisa — e a outra metade, protegida a
              menos.
            </p>
            <p>
              Quando a padronização parte da atividade, sobra dinheiro e falta reclamação.
            </p>
          </div>
        </div>
      </Secao>

      <Secao className="wrap" ritmo="normal">
        <h2 className="text-2xl sm:text-3xl">Encontre a sua atividade</h2>
        <div className="mt-10">
        <GradeLinks
          itens={PROFISSOES.map((p) => ({
            href: `/para-seu-trabalho/${p.slug}/`,
            titulo: p.nome,
            texto: p.resumoCurto,
          }))}
        />
        </div>
      </Secao>

      <Ponte
        href="/encontrar-epi/"
        rotulo="Não achou a sua atividade?"
        texto="Quatro perguntas sobre a sua rotina, e no fim você vê o que costuma merecer atenção no seu caso."
      />

      <Secao className="wrap" ritmo="normal">
        <Perguntas perguntas={PERGUNTAS} titulo="Perguntas sobre EPI por profissão" />
        <p className="mt-8 measure text-[0.95rem] leading-relaxed text-ink-2">
          Se o que você precisa é entender a categoria antes da profissão, comece por{' '}
          <Link href="/protecao/" className="underline underline-offset-4 hover:text-tower-red">
            o que você precisa proteger
          </Link>
          . Se a dúvida é entre os dois tipos de calçado, ela está respondida em{' '}
          <Link href="/calcados/comparativo/" className="underline underline-offset-4 hover:text-tower-red">
            ocupacional ou de segurança
          </Link>
          .
        </p>
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
