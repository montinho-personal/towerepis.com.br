import type { Metadata } from 'next'
import Link from 'next/link'
import { Trilha, CabecalhoPagina, GradeLinks, Secao, Comparacao } from '@/components/Blocos'
import { FechamentoCta } from '@/components/WhatsAppCta'
import { PROFISSOES } from '@/content/profissoes'

export const metadata: Metadata = {
  title: 'Calçados de segurança e ocupacionais em Fortaleza',
  description:
    'Calçado de segurança com biqueira, calçado ocupacional e antiderrapante. Entenda a diferença e escolha com orientação de quem é técnico de segurança do trabalho.',
  alternates: { canonical: '/calcados/' },
}

export default function HubCalcados() {
  return (
    <>
      <Trilha itens={[{ nome: 'Calçados', url: '/calcados/' }]} tom="escuro" />
      <CabecalhoPagina
        variante="ink"
        rotulo="Calçados profissionais"
        titulo="Calçados de segurança e ocupacionais"
        resumo="É a categoria com maior demanda e maior confusão do mercado de EPI. A diferença entre um tipo e outro não é de qualidade — é de risco. Entender isso resolve a maior parte das compras erradas."
      />

      <Secao className="wrap">
        <h2 className="eyebrow">A distinção normativa</h2>
        <div className="mt-6" />
        <Comparacao
          a={{
            titulo: 'Calçado ocupacional',
            sub: 'ABNT NBR ISO 20347',
            itens: [
              'Não possui biqueira de proteção contra impacto.',
              'Para atividades sem risco de queda de objeto pesado sobre o pé.',
              'Cozinha, saúde, limpeza, comércio e serviços.',
              'Foco em conforto, higiene e solado antiderrapante.',
            ],
          }}
          b={{
            titulo: 'Calçado de segurança',
            sub: 'ABNT NBR ISO 20345',
            itens: [
              'Possui biqueira de proteção contra impacto de 200 J.',
              'Para atividades com risco mecânico sobre os dedos do pé.',
              'Indústria, construção, logística e manutenção.',
              'Pode ter proteções adicionais conforme a atividade.',
            ],
          }}
        />
        <div className="mt-6">
          <Link href="/calcados/comparativo/" className="btn btn-ink">
            Ver a comparação completa e descobrir o seu caso
          </Link>
        </div>
      </Secao>

      <Secao className="band">
        <div className="wrap">
          <h2 className="text-2xl sm:text-3xl">Por tipo</h2>
          <div className="mt-10">
            <GradeLinks
              itens={[
                {
                  href: '/calcados/ocupacionais/',
                  titulo: 'Calçados ocupacionais',
                  texto:
                    'Sem biqueira de proteção. Conforto, higiene e aderência para jornadas longas em pé.',
                },
                {
                  href: '/calcados/seguranca/',
                  titulo: 'Calçados de segurança',
                  texto:
                    'Com biqueira de proteção contra impacto, para atividade com risco mecânico.',
                },
                {
                  href: '/calcados/antiderrapantes/',
                  titulo: 'Antiderrapantes',
                  texto:
                    'O que a marcação de resistência ao escorregamento significa na prática.',
                },
              ]}
            />
          </div>
        </div>
      </Secao>

      <Secao className="wrap">
        <h2 className="text-2xl sm:text-3xl">Por profissão</h2>
        <p className="mt-4 measure text-ink-2">
          O modelo certo depende do piso, do risco e de quantas horas o calçado fica no
          pé. Comece pela sua rotina.
        </p>
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

      {/* Marcas — no hub de calçado, porque é onde a informação é útil
          para decidir, e não numa página institucional que ninguém abre. */}
      <Secao className="wrap pt-0">
        <h2 className="eyebrow eyebrow-red">As marcas que trabalhamos</h2>
        <div className="mt-6 grid gap-px border border-ink bg-ink lg:grid-cols-[1.4fr_1fr]">
          <Link
            href="/marcas/bompel/"
            className="group bg-paper p-7 transition-colors hover:bg-paper-2 sm:p-9"
          >
            <p className="eyebrow eyebrow-red">Principal parceria hoje</p>
            <p className="numeral mt-3 text-4xl group-hover:text-tower-red">Bompel</p>
            <p className="mt-5 measure text-ink-2">
              Fabricante brasileiro de calçado profissional, com quase quatro décadas de
              operação. Cobre calçado de segurança, com biqueira, e ocupacional, sem
              biqueira. É a linha que mais atendemos e a que conhecemos com mais
              profundidade — do comportamento do solado à grade de numeração.
            </p>
            <span className="mt-6 inline-block font-display text-sm font-bold text-tower-red">
              Ver a linha Bompel →
            </span>
          </Link>

          <div className="bg-paper p-7 sm:p-9">
            <p className="eyebrow">Também trabalhamos</p>
            <p className="numeral mt-3 text-2xl">Sticky Shoes</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">
              Calçado ocupacional impermeável, para cozinha, alimentação e saúde.
            </p>
            <p className="numeral mt-6 text-2xl">3M</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">
              Proteção respiratória, auditiva e visual. É a marca com que a Tower nasceu,
              em 1995.
            </p>
            <Link
              href="/marcas/"
              className="mt-6 inline-block font-display text-sm font-bold text-tower-red"
            >
              Ver todas as marcas →
            </Link>
          </div>
        </div>
      </Secao>

      <FechamentoCta
        contexto="calcados"
        secao="hub-calcados"
        titulo="Diga onde você trabalha que a gente indica o modelo."
        texto="Tipo de piso, se molha, se há queda de objeto e quantas horas em pé. Com isso a gente já consegue mostrar o que faz sentido — e o que não faz."
        rotulo="Ver opções no WhatsApp"
        categoria="calcados"
      />
    </>
  )
}
