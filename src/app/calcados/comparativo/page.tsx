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
      'A diferença central é a biqueira de proteção contra impacto. O calçado de segurança, conforme a ABNT NBR ISO 20345, possui biqueira com resistência a impacto de 200 joules. O calçado ocupacional, conforme a ABNT NBR ISO 20347, não possui essa biqueira e é destinado a atividades sem risco mecânico sobre os dedos do pé.',
  },
  {
    pergunta: 'Calçado ocupacional protege menos?',
    resposta:
      'Protege contra outra coisa. Ele não é feito para impacto sobre os dedos, mas pode ter excelente desempenho em resistência ao escorregamento, que é o risco principal de ambientes como cozinha e área da saúde. O adequado é o que corresponde ao risco que existe na sua atividade.',
  },
  {
    pergunta: 'Biqueira de aço ou de composite: qual protege mais?',
    resposta:
      'Quando ambas atendem ao requisito da norma, a proteção contra impacto é equivalente. A diferença está em peso, condução de temperatura e detecção em detector de metal. O composite é mais leve e não conduz calor nem frio; o aço costuma ter custo menor.',
  },
  {
    pergunta: 'O que é biqueira de conformação?',
    resposta:
      'É uma peça que dá forma à parte da frente do calçado, mas não é uma biqueira de proteção contra impacto. O nome parecido causa confusão. Se a proteção contra impacto é necessária na sua atividade, verifique se o modelo atende à norma de calçado de segurança e confira o Certificado de Aprovação.',
  },
  {
    pergunta: 'Todo calçado de segurança protege contra perfuração?',
    resposta:
      'Não. A biqueira protege os dedos contra impacto e compressão, mas não protege a sola. A proteção contra perfuração é um requisito adicional, presente apenas em modelos específicos, e precisa constar no Certificado de Aprovação.',
  },
]

export const metadata: Metadata = {
  title: 'Calçado ocupacional ou de segurança?',
  description:
    'A diferença entre NBR ISO 20347 e NBR ISO 20345, o que a biqueira faz e o que ela não faz, e como descobrir qual dos dois serve para o seu trabalho.',
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
          A diferença central é a biqueira de proteção contra impacto: o calçado de
          segurança tem, o ocupacional não. Qual serve para você depende de existir, ou
          não, risco de algo pesado cair sobre o seu pé.
        </EmUmaFrase>
      </Secao>

      <Secao className="wrap pt-0">
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
            <h2>Sobre a biqueira</h2>
            <p>
              Quando o caso é de calçado de segurança, aparece a segunda dúvida: aço ou
              composite. Quando ambas atendem ao requisito da norma, a proteção contra
              impacto é equivalente. O que muda é outra coisa.
            </p>
            <ul>
              <li>
                <strong>Composite</strong> — mais leve e não conduz calor nem frio. Faz
                diferença em ambiente muito quente e para quem caminha muito.
              </li>
              <li>
                <strong>Aço</strong> — costuma ter custo menor e é a opção mais difundida.
              </li>
              <li>
                <strong>Biqueira de conformação</strong> — atenção: dá forma ao calçado,
                mas <em>não</em> é biqueira de proteção. O nome parecido gera confusão.
              </li>
            </ul>

            <h2>O que a biqueira não faz</h2>
            <p>
              A biqueira protege os dedos contra impacto e compressão. Ela não protege a
              sola contra perfuração. Se há prego, ferro ou material perfurante no chão da
              sua atividade, a proteção contra perfuração é um requisito adicional — e
              precisa ser conferida no Certificado de Aprovação do modelo.
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
        texto="Descreva a sua rotina: onde você fica, como é o piso e se há movimentação de carga. A gente diz qual dos dois faz sentido e explica por quê."
        rotulo="Tirar a dúvida no WhatsApp"
        categoria="calcados"
      />
    </>
  )
}
