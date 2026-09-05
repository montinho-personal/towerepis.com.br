import type { Metadata } from 'next'
import Link from 'next/link'
import { Trilha, CabecalhoPagina, Secao, LinksIrmaos } from '@/components/Blocos'
import { Retrato } from '@/components/Retrato'
import { FechamentoCta } from '@/components/WhatsAppCta'

export const metadata: Metadata = {
  title: { absolute: 'A 3M e a origem da Tower, em 1995' },
  description:
    'A Tower nasceu de um convite da 3M para desenvolver o mercado de proteção no Ceará. Hoje a linha tem disponibilidade sob consulta — a história continua aqui.',
  alternates: { canonical: '/marcas/3m/' },
}

export default function Marca3M() {
  return (
    <>
      <Trilha
        itens={[
          { nome: 'Marcas', url: '/marcas/' },
          { nome: '3M', url: '/marcas/3m/' },
        ]}
      />
      <CabecalhoPagina
        rotulo="Marcas · 3M"
        titulo="A relação com a 3M começou antes da Tower existir"
        resumo="Não é uma parceria comercial firmada depois. É a origem da empresa."
      />

      <Secao className="wrap pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="prose-tower">
            <h2>1994, em São Paulo</h2>
            <p>
              Helano e Cristina trabalhavam na Bereneli, distribuidora especializada da 3M
              do Brasil. Helano, técnico de segurança do trabalho, fazia desenvolvimento e
              treinamento dentro das empresas clientes. Cristina trabalhava em vendas.
            </p>

            <h2>O convite</h2>
            <p>
              A 3M procurava alguém que fizesse esse mesmo trabalho no Ceará e ofereceu
              uma distribuição ao Helano. Ele queria voltar ao estado natal. Aceitou. A
              Tower nasceu desse convite, em 1995.
            </p>
            <p>
              Vale registrar o que isso significava na prática naquele momento: o mercado
              local ainda usava material reutilizável de longa duração, e a proteção
              descartável precisava ser explicada antes de ser vendida. O trabalho não era
              distribuir produto — era desenvolver um mercado que ainda não existia.
            </p>

            <h2>O reconhecimento</h2>
            <p>
              Anos depois, a Tower recebeu da 3M o reconhecimento de{' '}
              <strong>Distribuidor Regional</strong>, por trabalho e volume de vendas. É a
              conquista de que Helano e Cristina mais se orgulham — e veio da mesma
              empresa que tinha feito o convite no começo de tudo.
            </p>

            <h2>Hoje</h2>
            <p>
              A relação continua, mas a disponibilidade de produto 3M na Tower hoje é
              limitada — a parceria principal em volume é a Bompel, em calçado. Se o
              item que você precisa é 3M, pergunte: informamos disponibilidade e prazo
              antes de qualquer coisa, e se não tivermos, dizemos na hora.
            </p>
          </div>

          <aside className="space-y-6">
            <div className="border border-rule bg-paper-2 p-6">
              <p className="eyebrow">Linhas, sob consulta</p>
              <ul className="mt-4 space-y-2 text-[0.95rem] text-ink-2">
                <li>Proteção respiratória</li>
                <li>Proteção auditiva</li>
                <li>Proteção para olhos e face</li>
              </ul>
              <p className="mt-4 text-sm text-ink-3">
                Pergunte pelo item específico — informamos disponibilidade e prazo.
              </p>
            </div>

            <Link
              href="/protecao/respiratoria/"
              className="block border border-rule p-6 transition-colors hover:border-ink"
            >
              <p className="eyebrow">Antes de escolher</p>
              <p className="mt-2 font-display text-lg font-bold">
                Entenda a diferença entre PFF1, PFF2 e PFF3 →
              </p>
            </Link>
          </aside>
        </div>
      </Secao>

      {/* A PROVA DA PÁGINA. O texto acima diz que a Tower nasceu de um convite
          da 3M em 1995 e que hoje a disponibilidade é limitada. As duas coisas
          são verdade, e a segunda é fácil de acreditar; a primeira, não. Esta
          foto resolve isso sem uma linha a mais — e fica aqui, e não no topo,
          porque ela responde ao texto em vez de anunciá-lo. */}
      <Secao className="wrap pt-0">
        <div className="grid gap-9 sm:grid-cols-2 sm:gap-7">
          <Retrato
            src="/fotos/historia/estoque-montese-1995.jpg"
            alt="Estoque da Tower no Montese, em 1995: prateleiras de aço do chão ao teto, cheias de caixas de papelão com a marca 3M, e uma pessoa em pé no corredor à esquerda."
            largura={1600}
            altura={1266}
            tamanhos="(min-width: 1024px) 30vw, (min-width: 640px) 42vw, 92vw"
            legenda={
              <>
                <strong className="font-semibold text-ink">O convite, por dentro.</strong>{' '}
                O estoque da Tower no Montese, em 1995: prateleira de caixas da 3M do
                Brasil, do chão ao teto. É também a medida honesta do que mudou — hoje a
                linha 3M na Tower é sob consulta, e a prateleira parecida com esta é de
                calçado.
              </>
            }
          />
          <Retrato
            src="/fotos/historia/premiacao-3m-grupo.jpg"
            alt="Quatro pessoas lado a lado num salão à noite; duas delas seguram placas emolduradas com um selo em vermelho."
            largura={1600}
            altura={1324}
            tamanhos="(min-width: 1024px) 30vw, (min-width: 640px) 42vw, 92vw"
            legenda={
              <>
                <strong className="font-semibold text-ink">E o reconhecimento.</strong>{' '}
                A noite da premiação, anos depois. As duas fotos desta página são as duas
                pontas da mesma relação: o que chegou em papelão no começo, e o que voltou
                em placa no fim da década.
              </>
            }
          />
        </div>
      </Secao>

      <LinksIrmaos
        rotulo="Outras marcas"
        itens={[{ href: '/marcas/bompel/', nome: 'Bompel' }]}
        hub={{ href: '/marcas/', rotulo: 'Ver todas as marcas que a Tower trabalha' }}
      />

      <FechamentoCta
        contexto="marcas"
        secao="3m-fechamento"
        titulo="Precisa de proteção respiratória?"
        texto="Conte a que a equipe fica exposta — poeira, névoa, vapor. É essa informação que define o equipamento adequado, e a gente ajuda a verificar."
        rotulo="Falar no WhatsApp"
      />
    </>
  )
}
