import Link from 'next/link'
import type { Metadata } from 'next'

import { WhatsAppCta, BlocoCta } from '@/components/WhatsAppCta'
import { BarraProva, GradeLinks, Secao, Comparacao } from '@/components/Blocos'
import { IconeSeta } from '@/components/Icones'
import { PROFISSOES } from '@/content/profissoes'
import { PROTECOES } from '@/content/protecoes'
import { ARTIGOS } from '@/content/artigos'

export const metadata: Metadata = {
  title: "EPI em Fortaleza — Tower EPI's, desde 1995",
  description:
    'Calçados ocupacionais e de segurança, proteção respiratória, luvas e mais, em Fortaleza. Com orientação de quem é técnico de segurança do trabalho.',
  alternates: { canonical: '/' },
}

export default function Home() {
  return (
    <>
      {/* 1. HERO — em 5 segundos: o que é, onde é, e os dois caminhos. */}
      <section className="wrap pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow eyebrow-red">Fortaleza — Ceará</p>
            <h1 className="mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
              O melhor EPI é o que a pessoa usa o dia inteiro.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-2">
              Equipamentos de proteção individual em Fortaleza, desde 1995. Calçados
              ocupacionais e de segurança, proteção respiratória, luvas, óculos e mais —
              com a orientação de quem é técnico de segurança do trabalho.
            </p>
          </div>

          <p
            className="numeral hidden text-[9rem] leading-none text-rule lg:block xl:text-[11rem]"
            aria-hidden="true"
          >
            1995
          </p>
        </div>
      </section>

      {/* 2. PROVA — fatos, zero adjetivo, antes de pedir qualquer coisa. */}
      <BarraProva />

      {/* 3. BIFURCAÇÃO — por situação, não por natureza jurídica.
             Ninguém quer se declarar "pessoa jurídica"; todo mundo sabe
             se compra para si ou para a equipe. */}
      <Secao className="wrap">
        <p className="eyebrow">Por onde você quer começar</p>
        <div className="mt-8 grid gap-px border border-ink bg-ink lg:grid-cols-2">
          <Link
            href="/para-seu-trabalho/"
            className="group flex flex-col bg-paper p-8 transition-colors hover:bg-paper-2 sm:p-10"
          >
            <p className="eyebrow eyebrow-red">Para mim</p>
            <h2 className="mt-4 text-2xl sm:text-3xl group-hover:text-tower-red">
              Procuro proteção para o meu trabalho
            </h2>
            <p className="mt-4 flex-1 measure text-ink-2">
              Você trabalha em cozinha, na enfermagem, na limpeza, na obra ou na
              indústria e quer acertar na escolha. Comece pela sua profissão.
            </p>
            <span className="mt-8 flex items-center gap-2 font-display text-sm font-bold text-tower-red">
              Ver por profissão <IconeSeta />
            </span>
          </Link>

          <Link
            href="/empresas/"
            className="group flex flex-col bg-paper p-8 transition-colors hover:bg-paper-2 sm:p-10"
          >
            <p className="eyebrow eyebrow-red">Para a equipe</p>
            <h2 className="mt-4 text-2xl sm:text-3xl group-hover:text-tower-red">
              Preciso equipar minha equipe
            </h2>
            <p className="mt-4 flex-1 measure text-ink-2">
              Você compra EPI para um restaurante, uma clínica, uma indústria ou uma
              obra. Veja como funciona o atendimento e peça um orçamento.
            </p>
            <span className="mt-8 flex items-center gap-2 font-display text-sm font-bold text-tower-red">
              Ver soluções para empresas <IconeSeta />
            </span>
          </Link>
        </div>
      </Secao>

      {/* 4. CATEGORIAS — vocabulário do corpo, não jargão de catálogo. */}
      <Secao className="band">
        <div className="wrap">
          <h2 className="text-2xl sm:text-3xl">O que você precisa proteger?</h2>
          <p className="mt-4 measure text-ink-2">
            A escolha muda conforme o risco, o ambiente e quanto tempo o equipamento
            fica no corpo. Comece pela parte que precisa de proteção.
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
        </div>
      </Secao>

      {/* 5. A DÚVIDA MAIS COMUM — demonstrar competência resolvendo,
             em vez de afirmar que se tem competência. */}
      <Secao className="wrap">
        <p className="eyebrow eyebrow-red">A pergunta que mais chega no nosso WhatsApp</p>
        <h2 className="mt-4 max-w-3xl text-2xl sm:text-3xl">
          Calçado ocupacional ou calçado de segurança?
        </h2>
        <p className="mt-4 max-w-2xl text-ink-2">
          São coisas diferentes, atendem a normas diferentes e servem a riscos
          diferentes. Comprar o errado custa dinheiro e não protege.
        </p>

        <div className="mt-10">
          <Comparacao
            a={{
              titulo: 'Calçado ocupacional',
              sub: 'ABNT NBR ISO 20347',
              itens: [
                'Não tem biqueira de proteção contra impacto.',
                'Para atividades sem risco de queda de objeto pesado sobre o pé.',
                'Comum em cozinha, saúde, limpeza, comércio e serviços.',
                'O foco costuma ser conforto, higiene e solado antiderrapante.',
              ],
            }}
            b={{
              titulo: 'Calçado de segurança',
              sub: 'ABNT NBR ISO 20345',
              itens: [
                'Tem biqueira de proteção contra impacto e compressão.',
                'Para atividades com risco mecânico sobre os dedos do pé.',
                'Comum em indústria, construção, logística e manutenção.',
                'Pode ter proteções adicionais conforme a atividade.',
              ],
            }}
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/calcados/comparativo/" className="btn btn-ink">
            Entender a diferença por completo
          </Link>
          <WhatsAppCta
            contexto="calcados-comparativo"
            secao="home-comparativo"
            variante="ghost"
            publico="b2c"
            categoria="calcados"
          >
            Tirar a dúvida no WhatsApp
          </WhatsAppCta>
        </div>
      </Secao>

      {/* 6. PROFISSÃO — reconhecimento imediato: "tem o meu caso aqui". */}
      <Secao className="band">
        <div className="wrap">
          <h2 className="text-2xl sm:text-3xl">Comece pelo que você faz</h2>
          <p className="mt-4 measure text-ink-2">
            Cada rotina tem um risco diferente e um critério diferente de escolha.
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
        </div>
      </Secao>

      {/* 7. QUEM ESTÁ DO OUTRO LADO — converte "um site" em "uma pessoa".
             Resolve a objeção central dos dois públicos de uma vez.
             PENDENTE: fotos reais de Helano e Cristina (declaradas no
             questionário). Até lá, tratamento tipográfico — nunca banco
             de imagens. */}
      <Secao className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow eyebrow-red">Quem responde</p>
            <h2 className="mt-4 text-2xl sm:text-3xl">
              Você não vai falar com um vendedor de comissão.
            </h2>
            <div className="mt-6 space-y-4 text-ink-2">
              <p>
                Quem responde no WhatsApp da Tower é o Helano ou a Cristina. Os dois
                fundaram a empresa em 1995 e nunca saíram do balcão.
              </p>
              <p>
                O Helano é técnico de segurança do trabalho. Antes de abrir a Tower, o
                trabalho dele era exatamente esse: entrar nas empresas, entender a
                atividade e treinar as pessoas para usar o equipamento certo.
              </p>
              <p>
                Por isso a conversa aqui costuma começar com uma pergunta em vez de um
                catálogo: <em>onde você trabalha e como é a sua rotina?</em>
              </p>
            </div>
            <div className="mt-8">
              <Link href="/a-tower/" className="btn btn-ghost">
                Conhecer a Tower
              </Link>
            </div>
          </div>

          <blockquote className="border-l-4 border-tower-red pl-6 sm:pl-8">
            <p className="font-display text-xl font-bold leading-snug sm:text-2xl">
              “Em 1995, a 3M procurava alguém para desenvolver o mercado de proteção no
              Ceará. Convidou o Helano. A Tower nasceu desse convite.”
            </p>
            <footer className="mt-6 text-sm text-ink-3">
              A empresa começou num prédio pequeno alugado no Montese, em Fortaleza.
              Estoque embaixo, escritório em cima. Eram só os dois.
            </footer>
          </blockquote>
        </div>
      </Secao>

      {/* 8. HISTÓRIA EM DOSE — planta a permanência sem sequestrar a Home. */}
      <Secao className="band-ink">
        <div className="wrap">
          <p className="eyebrow text-paper/55">Trinta anos</p>
          <h2 className="mt-4 max-w-2xl text-2xl sm:text-3xl">
            Já fomos grandes. Hoje somos dois. Tem cliente que compra com a gente desde
            os anos 90.
          </h2>

          <ol className="mt-12 grid gap-px border border-paper/15 bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                ano: '1994',
                texto:
                  'São Paulo. Helano é técnico de segurança do trabalho e faz treinamento em empresas por uma distribuidora especializada da 3M.',
              },
              {
                ano: '1995',
                texto:
                  'A 3M oferece a distribuição do Ceará. A Tower começa no Montese, em Fortaleza, com duas pessoas.',
              },
              {
                ano: '2003',
                texto:
                  'Mudança para um prédio muito maior, no mesmo bairro. Equipe de vendas, motorista e técnico de segurança próprio.',
              },
              {
                ano: 'Hoje',
                texto:
                  'Menor, e com os mesmos clientes. Distribuidor Regional premiado pela 3M, atendendo Fortaleza e o Ceará.',
              },
            ].map((item) => (
              <li key={item.ano} className="bg-ink p-6 sm:p-7">
                <p className="numeral text-3xl text-tower-red">{item.ano}</p>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-paper/70">
                  {item.texto}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <Link href="/a-tower/" className="btn btn-red">
              Ler a história completa
            </Link>
          </div>
        </div>
      </Secao>

      {/* 9. CONHECIMENTO — a autoridade é contínua, não uma alegação. */}
      <Secao className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow eyebrow-red">Central de conhecimento</p>
            <h2 className="mt-4 text-2xl sm:text-3xl">Antes de comprar, entenda</h2>
          </div>
          <Link
            href="/conhecimento/"
            className="flex items-center gap-2 font-display text-sm font-bold text-tower-red"
          >
            Ver tudo <IconeSeta />
          </Link>
        </div>

        <div className="mt-10">
          <GradeLinks
            itens={ARTIGOS.slice(0, 3).map((a) => ({
              href: `/conhecimento/${a.slug}/`,
              titulo: a.titulo,
              texto: a.resumo,
            }))}
          />
        </div>
      </Secao>

      {/* 10. FECHAMENTO — o passo mais fácil possível. */}
      <Secao className="wrap pt-0">
        <BlocoCta
          contexto="home"
          secao="home-fechamento"
          titulo="Não sabe por onde começar? Conte o que você faz."
          texto="Diga qual é a sua atividade e o que você precisa proteger. A gente responde com as opções que fazem sentido para o seu caso — e explica por quê."
          rotulo="Falar com a Tower"
        />
      </Secao>
    </>
  )
}
