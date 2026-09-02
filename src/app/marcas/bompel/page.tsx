import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Trilha,
  CabecalhoPagina,
  EmUmaFrase,
  OQueObservar,
  Perguntas,
  AssinaturaTecnica,
  Secao,
  LinksIrmaos,
} from '@/components/Blocos'
import { FechamentoCta } from '@/components/WhatsAppCta'
import { JsonLd, schemaFaq } from '@/lib/schema'

const PERGUNTAS = [
  {
    pergunta: 'A Bompel faz calçado de segurança ou ocupacional?',
    resposta:
      'Os dois. A linha inclui modelos com biqueira de proteção, que se enquadram como calçado de segurança, e modelos sem biqueira, que são calçados ocupacionais. Qual serve para você depende de existir, ou não, risco de queda de objeto pesado sobre o pé.',
  },
  {
    pergunta: 'Qual a diferença entre biqueira de composite e termoplástica?',
    resposta:
      'A biqueira de composite é uma biqueira de proteção contra impacto, usada em calçado de segurança. A termoplástica, em muitos modelos, é biqueira de conformação — dá forma à frente do calçado, mas não é proteção contra impacto. É uma distinção que muda tudo, e ela consta no Certificado de Aprovação do modelo. Na dúvida, pergunte antes de comprar.',
  },
  {
    pergunta: 'O fechamento em elástico segura bem o pé?',
    resposta:
      'É o formato mais pedido por quem calça e descalça várias vezes ao dia, e por quem não quer lidar com cadarço solto. A firmeza depende do modelo e da numeração estar certa — elástico frouxo costuma ser sinal de número acima do ideal.',
  },
  {
    pergunta: 'Como funciona a numeração?',
    resposta:
      'Vale provar considerando o fim do expediente, não o começo: o pé incha ao longo do dia. A largura da forma importa tanto quanto o número. Se for compra para equipe, a gente ajuda a montar a grade e registra ela para as reposições seguintes.',
  },
]

export const metadata: Metadata = {
  title: 'Bompel na Tower EPI’s',
  description:
    'A Bompel é hoje a principal parceria da Tower em calçado profissional. Veja o que a linha cobre, o que observar na escolha e como pedir.',
  alternates: { canonical: '/marcas/bompel/' },
}

export default function MarcaBompel() {
  return (
    <>
      <JsonLd dados={schemaFaq(PERGUNTAS)} />
      <Trilha
        itens={[
          { nome: 'Marcas', url: '/marcas/' },
          { nome: 'Bompel', url: '/marcas/bompel/' },
        ]}
      />
      <CabecalhoPagina
        rotulo="Marcas · Bompel"
        titulo="Bompel: a linha que mais atendemos hoje"
        resumo="Fabricante brasileiro de calçado profissional, com quase quatro décadas de operação. É a principal parceria da Tower em calçado — e a linha que conhecemos com mais profundidade."
      />

      <Secao className="wrap pt-0">
        <EmUmaFrase>
          A Bompel cobre tanto calçado de segurança, com biqueira de proteção, quanto
          calçado ocupacional, sem biqueira. Qual dos dois serve para você depende do
          risco da sua atividade — e não da marca.
        </EmUmaFrase>
      </Secao>

      {/* Por que essa parceria importa para quem compra — e não para nós. */}
      <Secao className="wrap pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div className="prose-tower">
            <h2>Por que isso interessa a você</h2>
            <p>
              Ser a principal parceria não é um selo comercial: é profundidade de
              conhecimento. Quando a gente atende a mesma linha todos os dias, passa a
              saber coisas que não estão no catálogo — qual modelo calça mais largo, qual
              solado se comporta melhor em piso engordurado, qual numeração costuma
              precisar de ajuste, quanto tempo leva a reposição de um item específico.
            </p>
            <p>
              É esse tipo de detalhe que evita a compra errada. E é por isso que, quando
              alguém descreve a rotina de trabalho, conseguimos responder rápido em vez de
              mandar uma lista de opções para a pessoa decidir sozinha.
            </p>

            <h2>O que a linha cobre</h2>
            <p>
              A Bompel fabrica botinas e sapatos profissionais em couro vaqueta, incluindo
              versões hidrofugadas. Entre as características que aparecem nos modelos estão
              biqueira em composite ou termoplástica conforme o modelo, solado bidensidade
              em poliuretano, fechamento em elástico e versões com proteção metatarsal.
            </p>
            <p>
              A empresa organiza os produtos em linhas — entre elas a{' '}
              <strong>ADAPT</strong>, de materiais mais macios, e a{' '}
              <strong>INFINITY</strong>, voltada a controle de movimento e absorção de
              impacto. São usadas em construção, indústria, manutenção e atividades com
              risco elétrico, conforme o modelo.
            </p>

            <h2>Uma observação honesta sobre marca</h2>
            <p>
              Nenhuma marca é adequada a tudo. Se a sua atividade pedir algo que a linha
              Bompel não cobre bem, a gente diz — e indica outra coisa. Trabalhamos com
              outros fabricantes justamente para isso.
            </p>
            <p>
              E vale repetir o que vale para qualquer calçado:{' '}
              <Link href="/calcados/comparativo/">
                o que define se você precisa de biqueira é o risco da atividade
              </Link>
              , não o fabricante.
            </p>
          </div>

          <aside className="space-y-6">
            <div className="border border-rule bg-paper-2 p-6">
              <p className="eyebrow">Onde costuma ser usada</p>
              <ul className="mt-4 space-y-2 text-[0.95rem] text-ink-2">
                <li>Construção</li>
                <li>Indústria</li>
                <li>Manutenção</li>
                <li>Logística e estoque</li>
              </ul>
            </div>

            <div className="border border-rule p-6">
              <p className="eyebrow">Antes de escolher</p>
              <ul className="mt-4 space-y-3 text-[0.95rem]">
                <li>
                  <Link href="/calcados/comparativo/" className="underline underline-offset-4">
                    Ocupacional ou de segurança?
                  </Link>
                </li>
                <li>
                  <Link href="/calcados/seguranca/" className="underline underline-offset-4">
                    O que observar num calçado de segurança
                  </Link>
                </li>
                <li>
                  <Link
                    href="/conhecimento/solado-antiderrapante-o-que-significa/"
                    className="underline underline-offset-4"
                  >
                    O que significa solado antiderrapante
                  </Link>
                </li>
              </ul>
            </div>

            <a
              href="https://www.bompel.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-rule p-6 transition-colors hover:border-ink"
            >
              <p className="eyebrow">Fabricante</p>
              <p className="mt-2 font-display text-lg font-bold">bompel.com.br →</p>
              <p className="mt-2 text-sm text-ink-3">
                Catálogo completo no site do fabricante. Para disponibilidade e prazo em
                Fortaleza, fale com a gente.
              </p>
            </a>
          </aside>
        </div>
      </Secao>

      <Secao className="band">
        <div className="wrap">
          <OQueObservar
            titulo="O que observar antes de fechar"
            itens={[
              {
                titulo: 'Se você precisa de biqueira de proteção',
                texto:
                  'A biqueira protege os dedos contra impacto e compressão. Ela faz sentido onde há risco de queda de objeto pesado sobre o pé. Onde esse risco não existe, um calçado ocupacional tende a ser mais leve e mais confortável para a jornada.',
              },
              {
                titulo: 'Composite ou termoplástica',
                texto:
                  'Atenção a esta: composite é biqueira de proteção; termoplástica, em muitos modelos, é biqueira de conformação, que dá forma mas não protege contra impacto. O Certificado de Aprovação do modelo diz qual é qual.',
              },
              {
                titulo: 'Proteção contra perfuração, se houver material no chão',
                texto:
                  'A biqueira não protege a sola. Se há prego ou ferro no piso da sua atividade, é preciso um modelo com proteção contra perfuração — e isso consta no CA.',
              },
              {
                titulo: 'O solado, para o seu piso',
                texto:
                  'Solado bidensidade em poliuretano é comum na linha. Mas o que importa é o desempenho em resistência ao escorregamento no tipo de piso onde você trabalha, e isso varia por modelo.',
              },
              {
                titulo: 'Numeração e largura',
                texto:
                  'Prove pensando no fim do expediente, quando o pé está inchado. A largura da forma pesa tanto quanto o número — e é a causa mais comum de calçado abandonado na segunda semana.',
              },
            ]}
          />
        </div>
      </Secao>

      <Secao className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <Perguntas perguntas={PERGUNTAS} />
          <AssinaturaTecnica atualizado="agosto de 2026" />
        </div>
      </Secao>

      <LinksIrmaos
        rotulo="Outras marcas"
        itens={[{ href: '/marcas/3m/', nome: '3M' }]}
        hub={{ href: '/marcas/', rotulo: 'Ver todas as marcas que a Tower trabalha' }}
      />

      <FechamentoCta
        contexto="marcas"
        secao="bompel-fechamento"
        titulo="Diga o que você faz que a gente indica o modelo."
        texto="Tipo de piso, se há queda de material sobre o pé, quantas horas em pé e se é para você ou para uma equipe. Com isso a gente já consegue apontar o modelo e passar prazo."
        rotulo="Falar no WhatsApp"
        categoria="bompel"
      />
    </>
  )
}
