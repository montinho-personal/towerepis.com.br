import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Trilha,
  CabecalhoPagina,
  EmUmaFrase,
  Comparacao,
  Perguntas,
  AssinaturaTecnica,
  Secao,
} from '@/components/Blocos'
import { FechamentoCta } from '@/components/WhatsAppCta'
import { JsonLd, schemaFaq } from '@/lib/schema'

const PERGUNTAS = [
  {
    pergunta: 'Qual a diferença entre calçado ocupacional e calçado de segurança?',
    resposta:
      'Um tem biqueira de proteção contra impacto e o outro não, e cada um responde a uma norma própria: ABNT NBR ISO 20345 para o de segurança, 20347 para o ocupacional. Para efeito de compra, o que separa os dois é uma pergunta só — existe risco de algo pesado cair ou prensar o pé nessa atividade?',
  },
  {
    pergunta: 'Calçado ocupacional protege menos?',
    resposta:
      'Protege contra outra coisa. Ele não é feito para impacto sobre os dedos, mas pode ter excelente desempenho em resistência ao escorregamento, que é o risco principal de ambientes como cozinha e área da saúde. O adequado é o que corresponde ao risco que existe na sua atividade.',
  },
  {
    pergunta: 'Biqueira de aço ou de composite: qual protege mais?',
    resposta:
      'Nenhuma das duas protege mais que a outra quando ambas atendem ao requisito da norma. A escolha se faz por peso, por ambiente muito quente ou muito frio e por passagem em detector de metal — e por isso ela vem depois, modelo a modelo, com a categoria já definida.',
  },
  {
    pergunta: 'O que é biqueira de conformação?',
    resposta:
      'É uma peça que dá forma à parte da frente do calçado, mas não é uma biqueira de proteção contra impacto. O nome parecido causa confusão. Se a proteção contra impacto é necessária na sua atividade, verifique se o modelo atende à norma de calçado de segurança e confira o Certificado de Aprovação.',
  },
  {
    pergunta: 'Todo calçado de segurança protege contra perfuração?',
    resposta:
      'Não. São dois requisitos diferentes, e o segundo só existe em parte dos modelos. Na hora de pedir, trate a proteção da sola como item separado e confirme no Certificado de Aprovação: bico reforçado não implica sola protegida.',
  },
]

export const metadata: Metadata = {
  title: 'Ocupacional ou de segurança: qual é o seu caso',
  description:
    'Queda de objeto, tipo de piso e horas em pé: o que pesa na escolha entre os dois, o que a biqueira faz e o que ela não faz.',
  alternates: { canonical: '/calcados/comparativo/' },
}

export default function Comparativo() {
  return (
    <>
      <JsonLd dados={schemaFaq(PERGUNTAS)} />
      <Trilha
        itens={[
          { nome: 'Calçados', url: '/calcados/' },
          { nome: 'Ocupacional ou de segurança', url: '/calcados/comparativo/' },
        ]}
      />

      <CabecalhoPagina
        rotulo="A dúvida mais comum"
        titulo="Calçado ocupacional ou de segurança: qual é o seu caso?"
        resumo="São coisas diferentes, atendem a normas diferentes e servem a riscos diferentes. Comprar o errado custa dinheiro e não protege onde precisa."
      />

      <Secao className="wrap pt-0">
        <EmUmaFrase>
          A escolha não é entre mais e menos proteção: é entre dois tipos de risco. Esta
          página serve para você identificar qual deles existe na sua rotina e sair daqui
          com a categoria decidida.
        </EmUmaFrase>
      </Secao>

      <Secao className="wrap pt-0">
        {/* O par que canibalizava. Esta página decide a COMPRA; o artigo
            explica a NORMA. Antes as duas tinham o mesmo H1 e disputavam a
            mesma consulta — duas páginas boas gastando uma. O link explicita
            a divisão para o leitor e para o buscador. */}
        <h2 className="eyebrow">A distinção normativa</h2>
        <div className="mt-6">
          <Comparacao
            a={{
              titulo: 'Calçado ocupacional',
              sub: 'ABNT NBR ISO 20347',
              itens: [
                'Não possui biqueira de proteção contra impacto.',
                'Destinado a atividades sem risco mecânico sobre os dedos.',
                'Costuma priorizar conforto, higiene e aderência.',
                'Comum em cozinha, saúde, limpeza, comércio e serviços.',
                'Geralmente mais leve, o que favorece jornadas longas em pé.',
              ],
            }}
            b={{
              titulo: 'Calçado de segurança',
              sub: 'ABNT NBR ISO 20345',
              itens: [
                'Possui biqueira com resistência a impacto de 200 J.',
                'Destinado a atividades com risco mecânico sobre os dedos.',
                'Pode ter proteções adicionais, como contra perfuração.',
                'Comum em indústria, construção, logística e manutenção.',
                'Biqueira em aço, composite ou outros materiais.',
              ],
            }}
          />
        </div>
        <p className="mt-8 measure text-[0.95rem] leading-relaxed text-ink-2">
          Esta página existe para você <strong>decidir qual comprar</strong>. Se o que você
          precisa é entender as duas normas — o que cada uma exige da biqueira e como isso
          aparece na marcação do produto —, isso está em{' '}
          <Link
            href="/conhecimento/calcado-ocupacional-ou-de-seguranca/"
            className="underline underline-offset-4 hover:text-tower-red"
          >
            NBR ISO 20345 e 20347: o que muda no calçado profissional
          </Link>
          .
        </p>
      </Secao>

      {/* SE / ENTÃO — a pergunta que resolve, em vez de "qual é melhor". */}
      <Secao className="band">
        <div className="wrap">
          <p className="eyebrow eyebrow-red">A pergunta que resolve</p>
          <h2 className="mt-4 max-w-3xl text-2xl sm:text-3xl">
            Na sua rotina, existe risco de algo pesado cair ou prensar o seu pé?
          </h2>

          <div className="mt-10 grid gap-px border border-ink bg-ink sm:grid-cols-2">
            <div className="bg-paper p-7 sm:p-8">
              <p className="eyebrow">Se existe</p>
              <p className="mt-3 font-display text-xl font-bold">Calçado de segurança</p>
              <p className="mt-4 text-ink-2">
                Movimentação de carga, palete, ferramenta pesada, peça, empilhadeira,
                material de obra. Nesses casos a biqueira de proteção deixa de ser
                opcional.
              </p>
              <Link
                href="/calcados/seguranca/"
                className="mt-6 inline-block font-display text-sm font-bold text-tower-red"
              >
                Ver calçados de segurança →
              </Link>
            </div>

            <div className="bg-paper p-7 sm:p-8">
              <p className="eyebrow">Se não existe</p>
              <p className="mt-3 font-display text-xl font-bold">Calçado ocupacional</p>
              <p className="mt-4 text-ink-2">
                O problema real é piso escorregadio, líquido, higiene e jornada longa em
                pé. Aqui o calçado ocupacional tende a proteger melhor no que importa — e
                a ser mais leve.
              </p>
              <Link
                href="/calcados/ocupacionais/"
                className="mt-6 inline-block font-display text-sm font-bold text-tower-red"
              >
                Ver calçados ocupacionais →
              </Link>
            </div>
          </div>

          <p className="mt-8 max-w-2xl text-ink-2">
            Repare que a pergunta não é <em>qual protege mais</em>. Um calçado de
            segurança usado numa cozinha sem risco mecânico adiciona peso sem adicionar
            proteção onde ela é necessária. E peso, numa jornada de dez horas em pé, tem
            consequência: é o que faz o calçado ser abandonado.
          </p>
        </div>
      </Secao>

      <Secao className="wrap">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="prose-tower">
            <h2>Se o caso for calçado de segurança</h2>
            <p>
              Aparece então a segunda escolha, entre biqueira de aço e de composite. Ela
              não muda a categoria nem o que você precisa pedir: muda peso, comportamento
              em ambiente muito quente ou muito frio e a passagem em detector de metal.
            </p>
            <p>
              É decisão de modelo, e não de categoria, então vale resolver depois desta
              página. A comparação atividade por atividade está em{' '}
              <Link href="/conhecimento/biqueira-de-composite-ou-de-aco-qual-escolher/">
                biqueira de composite ou de aço
              </Link>
              .
            </p>

            <h2>O erro de pedido que aparece toda semana</h2>
            <p>
              Biqueira e proteção contra perfuração são requisitos separados, e pedir
              &ldquo;botina com bico de aço&rdquo; não traz o segundo junto. Onde o chão
              tem prego, ferro ou material perfurante, a proteção da sola precisa estar
              escrita no pedido e confirmada no Certificado de Aprovação do modelo.
            </p>
            <p>
              Por que os dois requisitos são separados, e o que mais a marcação do calçado
              informa, está no texto sobre{' '}
              <Link href="/conhecimento/calcado-ocupacional-ou-de-seguranca/">
                as duas normas do calçado profissional
              </Link>
              .
            </p>

            <h2>E o solado?</h2>
            <p>
              Os dois tipos podem ter solado antiderrapante. Como a resistência ao
              escorregamento é ensaiada em superfícies e contaminantes diferentes, vale
              verificar a marcação do modelo específico.{' '}
              <Link href="/conhecimento/solado-antiderrapante-o-que-significa/">
                Explicamos o que essas marcações significam neste texto
              </Link>
              .
            </p>
          </div>

          <div className="space-y-8">
            <Perguntas perguntas={PERGUNTAS} />
            <AssinaturaTecnica atualizado="agosto de 2026" />

            <div className="border border-rule p-6">
              <p className="eyebrow">Fontes consultadas</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href="https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/equipamentos-de-protecao-individual"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    Equipamentos de Proteção Individual — Ministério do Trabalho e Emprego
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.normas.com.br/visualizar/artigo-tecnico/2532/os-requisitos-para-os-calcados-de-seguranca-e-ocupacionais"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    Os requisitos para os calçados de segurança e ocupacionais — Target
                    Normas
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Secao>

      <FechamentoCta
        contexto="calcados-comparativo"
        secao="comparativo-fechamento"
        titulo="Ainda não sabe qual é o seu caso?"
        texto="Diga quantas pessoas são, o que elas fazem e como é o chão onde trabalham. A gente responde com a categoria certa e já ajuda a montar a grade, se for compra para equipe."
        rotulo="Tirar a dúvida no WhatsApp"
        categoria="calcados"
      />
    </>
  )
}
