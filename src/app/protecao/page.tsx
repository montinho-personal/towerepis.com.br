import type { Metadata } from 'next'
import { PROTECOES } from '@/content/protecoes'
import Link from 'next/link'
import { Trilha, CabecalhoPagina, GradeLinks, EmUmaFrase, OQueObservar, Perguntas, Secao } from '@/components/Blocos'
import { FechamentoCta } from '@/components/WhatsAppCta'
import { JsonLd, schemaFaq } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'EPI por parte do corpo: o que cada um protege',
  description:
    'Respiração, mãos, audição, olhos, cabeça, corpo e pés. O que observar em cada categoria antes de escolher, com critério de técnico de segurança do trabalho.',
  alternates: { canonical: '/protecao/' },
}

/**
 * Hub de proteção.
 *
 * Tinha 151 palavras e era uma grade de links com um título. Um índice que só
 * lista o que existe não responde à consulta de categoria — e a auditoria
 * mostrou que ele recebia zero link editorial e era a página mais fraca do
 * grupo que deveria liderar.
 *
 * O que ele passa a entregar é o MÉTODO: como se decide o que proteger. Isso
 * é o que a Tower sabe e o índice não dizia.
 */
const PERGUNTAS = [
  {
    pergunta: 'Como saber de qual EPI a minha atividade precisa?',
    resposta:
      'A escolha parte do risco da atividade, não do catálogo. Primeiro se identifica a que a pessoa fica exposta — impacto, produto químico, ruído, poeira, calor, corte —, depois se escolhe o equipamento que protege daquilo, e por último se confere o Certificado de Aprovação (CA) correspondente. Quando a exposição não é evidente, a definição vem da avaliação de riscos da empresa, feita por profissional habilitado.',
  },
  {
    pergunta: 'O que vem antes do EPI?',
    resposta:
      'A proteção coletiva. A norma trata o Equipamento de Proteção Individual como a medida a adotar quando não é possível eliminar o risco ou protegê-lo coletivamente — ou enquanto essas medidas estão sendo implantadas. Exaustão, enclausuramento de máquina e guarda-corpo protegem todo mundo ao mesmo tempo; o EPI protege uma pessoa de cada vez.',
  },
  {
    pergunta: 'Um EPI pode substituir outro?',
    resposta:
      'Não. Cada categoria protege de um risco específico e tem um CA próprio para aquele uso. Máscara descartável não retém vapor químico, luva de procedimento não resiste a saneante, e óculos de segurança não substituem protetor facial. Trocar de categoria por semelhança de aparência é o erro de compra mais comum.',
  },
  {
    pergunta: 'Quem paga o EPI?',
    resposta:
      'O empregador. A NR-6 estabelece que o EPI adequado ao risco é fornecido gratuitamente pela empresa, em perfeito estado de conservação e funcionamento, e que cabe a ela orientar sobre o uso, exigir o uso e substituir quando danificado ou extraviado.',
  },
]

export default function HubProtecao() {
  return (
    <>
      <JsonLd dados={schemaFaq(PERGUNTAS)} />
      <Trilha itens={[{ nome: 'Proteção', url: '/protecao/' }]} tom="escuro" />
      <CabecalhoPagina
        variante="ink"
        rotulo="Proteção"
        titulo="O que você precisa proteger?"
        resumo="Cada parte do corpo enfrenta um tipo de risco e exige um critério próprio de escolha. Comece pela que precisa de proteção na sua atividade."
      />
      <Secao className="wrap" ritmo="normal">
        <EmUmaFrase>
          Equipamento de Proteção Individual (EPI) é todo dispositivo de uso individual
          destinado a proteger o trabalhador dos riscos da atividade. A escolha se organiza
          por parte do corpo — respiração, mãos, audição, olhos e face, cabeça, corpo e pés
          —, e o que decide cada categoria é o risco a que a pessoa fica exposta, não o
          produto disponível no catálogo.
        </EmUmaFrase>
      </Secao>

      <Secao className="band-ink">
        <div className="wrap">
          <OQueObservar
            tom="escuro"
            titulo="Como se decide o que proteger"
            itens={[
              {
                titulo: 'O risco vem da atividade',
                texto:
                  'Ninguém escolhe EPI olhando prateleira. Escolhe olhando o que a pessoa faz: o que pode cair, o que ela manuseia, o que ela respira, quanto ruído existe e como é o piso. A lista de equipamentos é consequência disso, e é por isso que duas empresas do mesmo ramo às vezes precisam de coisas diferentes.',
              },
              {
                titulo: 'Proteção coletiva vem antes',
                texto:
                  'O EPI é a medida individual, e ele entra quando não dá para eliminar o risco na fonte nem protegê-lo coletivamente. Exaustão em vez de máscara, guarda em vez de luva, isolamento acústico em vez de protetor: quando é possível, é sempre melhor — porque protege quem esqueceu de colocar o equipamento.',
              },
              {
                titulo: 'A categoria certa, não a parecida',
                texto:
                  'Cada categoria tem um CA para um uso. Máscara descartável não retém vapor químico; luva de procedimento não resiste a saneante; óculos de segurança não fazem o trabalho do protetor facial. É onde a compra erra com mais frequência, e o erro só aparece no acidente.',
              },
              {
                titulo: 'O EPI que não é usado não protege',
                texto:
                  'Conforto não é luxo nesta conta: calçado que machuca sai do pé, óculos que embaça sobe para a testa, protetor que incomoda fica no bolso. Na prática, o equipamento mais protetor é o que a equipe aceita usar a jornada inteira — e isso se descobre antes de comprar para todo mundo.',
              },
            ]}
          />
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-paper/60">
            Esta é a lógica geral. O que é obrigatório em cada função vem da avaliação de
            riscos da sua empresa, feita por profissional habilitado.
          </p>
        </div>
      </Secao>

      <Secao className="wrap" ritmo="normal">
        <h2 className="text-2xl sm:text-3xl">Escolha a parte do corpo</h2>
        <p className="mt-4 measure text-ink-2">
          Cada página abaixo traz o critério daquela categoria: o que observar, o que muda
          entre os tipos e a dúvida que mais chega por lá.
        </p>
        <div className="mt-10">
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
        </div>
      </Secao>

      <Secao className="wrap" ritmo="normal">
        <Perguntas perguntas={PERGUNTAS} titulo="Perguntas sobre escolha de EPI" />
        <p className="mt-8 measure text-[0.95rem] leading-relaxed text-ink-2">
          As obrigações de quem fornece e de quem usa estão na NR-6, e o site explica isso
          em detalhe no texto sobre{' '}
          <Link href="/conhecimento/nr-6-o-que-a-empresa-precisa-saber/" className="underline underline-offset-4 hover:text-tower-red">
            o que a empresa precisa saber sobre EPI
          </Link>
          . Para conferir se um equipamento é aprovado, veja{' '}
          <Link href="/conhecimento/o-que-e-ca-certificado-de-aprovacao/" className="underline underline-offset-4 hover:text-tower-red">
            o que é o Certificado de Aprovação
          </Link>
          .
        </p>
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
