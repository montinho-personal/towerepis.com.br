import type { Metadata } from 'next'
import Link from 'next/link'
import { Trilha, CabecalhoPagina, Secao } from '@/components/Blocos'
import { BlocoCta } from '@/components/WhatsAppCta'

export const metadata: Metadata = {
  title: 'A relação da Tower com a 3M',
  description:
    'A Tower nasceu de um convite da 3M para desenvolver o mercado de proteção no Ceará, em 1995. E recebeu depois o reconhecimento de Distribuidor Regional.',
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
              A Tower continua trabalhando com a linha 3M, com destaque para proteção
              respiratória — a categoria em que a relação começou e onde a exigência
              técnica é maior, porque o dano da escolha errada é invisível e cumulativo.
            </p>
          </div>

          <aside className="space-y-6">
            <div className="border border-rule bg-paper-2 p-6">
              <p className="eyebrow">Linhas que trabalhamos</p>
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

      <Secao className="wrap pt-0">
        <BlocoCta
          contexto="marcas"
          secao="3m-fechamento"
          titulo="Precisa de proteção respiratória?"
          texto="Conte a que a equipe fica exposta — poeira, névoa, vapor. É essa informação que define o equipamento adequado, e a gente ajuda a verificar."
          rotulo="Falar no WhatsApp"
        />
      </Secao>
    </>
  )
}
