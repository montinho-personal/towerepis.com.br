import type { Metadata } from 'next'
import Link from 'next/link'
import { Trilha, Secao } from '@/components/Blocos'
import { Retrato } from '@/components/Retrato'
import { FechamentoCta } from '@/components/WhatsAppCta'
import { JsonLd, schemaPessoaHelano } from '@/lib/schema'
import { ARTIGOS } from '@/content/artigos'

export const metadata: Metadata = {
  title: 'Helano — Técnico de Segurança do Trabalho',
  description:
    'Sócio-proprietário e técnico de segurança do trabalho. Revisa todo o conteúdo técnico do site. Antes de 1995, treinava equipes dentro das empresas em São Paulo.',
  alternates: { canonical: '/a-tower/helano/' },
}

/**
 * Página de autor — o maior ganho de E-E-A-T do projeto.
 *
 * Conteúdo de saúde e segurança ocupacional sem autor identificado é fraco
 * aos olhos do Google e do leitor técnico (SESMT, TST), que é justamente o
 * público que valida a credibilidade do resto do site.
 *
 * PENDENTE: nome completo, número de registro profissional e foto.
 * Nada aqui afirma credencial que não tenha sido declarada pelo próprio Helano.
 */
export default function PaginaHelano() {
  return (
    <>
      <JsonLd dados={schemaPessoaHelano()} />
      <Trilha
        itens={[
          { nome: 'A Tower', url: '/a-tower/' },
          { nome: 'Helano', url: '/a-tower/helano/' },
        ]}
      />

      {/* Página de autoria: é ela que sustenta o E-E-A-T dos artigos. Rosto
          com nome e função faz mais por isso do que qualquer declaração. */}
      <section className="wrap pt-10 pb-14 sm:pt-14">
        {/* O recorte guarda a mão da Cristina no ombro dele, porque a foto não
            separa os dois em nenhum enquadramento — ela está atrás dele em
            todos. Em tamanho pequeno aquilo virava uma mancha escura sem
            sentido; grande o bastante, lê-se como o que é. */}
        <div className="grid gap-9 sm:grid-cols-[17rem_1fr] sm:items-end sm:gap-12">
          <Retrato
            src="/fotos/pessoas/helano.jpg"
            alt="Helano, sócio-proprietário da Tower EPI's e técnico de segurança do trabalho, com a mão de Cristina em seu ombro."
            largura={950}
            altura={1330}
            tamanhos="(min-width: 640px) 17rem, 70vw"
            prioridade
          />
          <div className="sm:pb-2">
            <p className="eyebrow eyebrow-red">Quem revisa o conteúdo técnico</p>
            <h1 className="mt-5 text-4xl sm:text-5xl">Helano</h1>
            <p className="mt-4 font-display text-lg font-semibold text-ink-2">
              Sócio-proprietário da Tower EPI&rsquo;s · Técnico de Segurança do Trabalho
            </p>
          </div>
        </div>
      </section>

      <Secao className="wrap pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="prose-tower">
            <h2>Trajetória</h2>
            <p>
              Helano é jornalista de formação e trabalhou na imprensa antes de entrar no
              mercado de equipamentos de proteção individual. Formou-se técnico de
              segurança do trabalho e passou a atuar em São Paulo pela Bereneli,
              distribuidora especializada da 3M do Brasil, onde fazia desenvolvimento e
              treinamento dentro das empresas clientes.
            </p>
            <p>
              Em 1995, a 3M procurava alguém para desenvolver esse mesmo trabalho no
              Ceará e ofereceu a ele uma distribuição. Helano voltou ao estado natal e
              fundou a Tower EPI&rsquo;s em Fortaleza, junto com a Cristina.
            </p>
            <p>
              Nos anos seguintes, conduziu o desenvolvimento técnico dos clientes da
              Tower — incluindo o trabalho que levou ao primeiro grande cliente
              industrial da empresa — e participou de feiras e de eventos técnicos com
              especialistas da 3M e de outros fabricantes.
            </p>

            <h2>O que ele faz hoje</h2>
            <p>
              Continua atendendo diretamente. Quando alguém escreve para a Tower com uma
              dúvida técnica sobre qual equipamento serve para determinada atividade, é
              ele quem responde.
            </p>
            <p>
              No site, é responsável pela revisão do conteúdo técnico: as páginas de
              categoria, as páginas por profissão e os textos da central de conhecimento.
            </p>

            <h2>Como o conteúdo é produzido</h2>
            <p>
              Todo conteúdo técnico deste site segue três regras, e vale dizer quais são:
            </p>
            <ul>
              <li>
                Afirmação sobre norma, Certificado de Aprovação ou obrigação legal cita
                fonte oficial — Ministério do Trabalho e Emprego, gov.br, ou o texto
                vigente da norma.
              </li>
              <li>
                Não afirmamos que um equipamento é adequado a uma exposição específica
                por inferência. Quando a definição depende de avaliação de riscos, o texto
                diz isso.
              </li>
              <li>
                O conteúdo orienta a escolha. Não substitui a avaliação de riscos do
                ambiente de trabalho, que precisa ser feita por profissional habilitado
                quando necessária.
              </li>
            </ul>
          </div>

          <aside className="space-y-6">
            <div className="border border-rule bg-paper-2 p-6">
              <p className="eyebrow">Áreas de atuação</p>
              <ul className="mt-4 space-y-2 text-[0.95rem] text-ink-2">
                <li>Equipamento de proteção individual</li>
                <li>Proteção respiratória</li>
                <li>Calçados de segurança e ocupacionais</li>
                <li>Segurança do trabalho</li>
                <li>Treinamento e desenvolvimento em empresas</li>
              </ul>
            </div>

            <div className="border border-rule p-6">
              <p className="eyebrow">Textos revisados</p>
              <ul className="mt-4 space-y-3">
                {ARTIGOS.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/conhecimento/${a.slug}/`}
                      className="text-[0.95rem] underline underline-offset-4 hover:text-tower-red"
                    >
                      {a.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Secao>

      <FechamentoCta
        contexto="historia"
        secao="helano-fechamento"
        titulo="Tem uma dúvida técnica?"
        texto="Descreva a atividade e a que a pessoa fica exposta. A resposta vem de quem trabalha com isso desde antes de 1995."
        rotulo="Falar com a Tower"
      />
    </>
  )
}
