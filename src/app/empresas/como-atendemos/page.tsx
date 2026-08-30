import type { Metadata } from 'next'
import { Trilha, CabecalhoPagina, Perguntas, Secao } from '@/components/Blocos'
import { BlocoCta } from '@/components/WhatsAppCta'
import { ComoAtendemos as Etapas, ComQuemVoceFala } from '@/components/BlocosB2B'
import { JsonLd, schemaFaq } from '@/lib/schema'

const PERGUNTAS = [
  {
    pergunta: 'Vocês têm pedido mínimo?',
    resposta:
      'Atendemos desde reposição pontual até equipes maiores. Conte o que você precisa que a gente diz na hora se conseguimos atender bem — e se não conseguirmos, dizemos isso também.',
  },
  {
    pergunta: 'Vocês informam o CA dos produtos?',
    resposta:
      'Sim. Os itens que fornecemos têm Certificado de Aprovação, e informamos o número para que a empresa registre na ficha de EPI e mantenha a rastreabilidade em auditoria e fiscalização.',
  },
  {
    pergunta: 'Como funciona a troca de numeração de calçado?',
    resposta:
      'É a dúvida mais comum de quem compra calçado para equipe. Combinamos as condições antes de fechar o pedido, para que não haja surpresa depois. Fale com a gente para acertar isso no seu caso.',
  },
  {
    pergunta: 'Vocês ajudam a definir qual EPI a equipe precisa?',
    resposta:
      'Ajudamos a orientar a escolha a partir da atividade e, quando existe, da avaliação de riscos da empresa. O que não fazemos é substituir essa avaliação: quem define o que é obrigatório em cada função é o profissional habilitado responsável pela segurança do trabalho.',
  },
  {
    pergunta: 'Qual é a área de entrega?',
    resposta:
      'Atendemos Fortaleza e região. Conte onde a sua equipe está que combinamos a forma de entrega e o prazo antes de fechar.',
  },
]

export const metadata: Metadata = {
  title: 'Como a Tower atende empresas',
  description:
    'Orçamento, prazo, CA dos itens, entrega em Fortaleza e reposição. Como funciona o atendimento a empresas na Tower EPI’s, desde 1995.',
  alternates: { canonical: '/empresas/como-atendemos/' },
}

export default function ComoAtendemosPagina() {
  return (
    <>
      <JsonLd dados={schemaFaq(PERGUNTAS)} />
      <Trilha
        itens={[
          { nome: 'Para equipes', url: '/empresas/' },
          { nome: 'Como atendemos', url: '/empresas/como-atendemos/' },
        ]}
      />
      <CabecalhoPagina
        rotulo="Para equipes"
        titulo="Como a gente atende"
        resumo="Antes de falar de produto, vale explicar o processo. Saber como funciona reduz mais incerteza do que qualquer promessa sobre qualidade."
      />

      <Etapas />
      <ComQuemVoceFala />

      <Secao className="wrap">
        <div className="max-w-3xl">
          <Perguntas perguntas={PERGUNTAS} />
        </div>
      </Secao>

      <Secao className="wrap pt-0">
        <BlocoCta
          contexto="empresas"
          secao="como-atendemos-fechamento"
          titulo="Vamos começar pelo que a sua equipe faz."
          texto="Segmento, quantas pessoas e para quando. Com isso já conseguimos indicar o que faz sentido e passar prazo e valor."
          rotulo="Falar no WhatsApp"
          publico="b2b"
        />
      </Secao>
    </>
  )
}
