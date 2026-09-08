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
import { empresa } from '@/config/empresa'

/**
 * Sticky Shoes.
 *
 * O QUE ESTA PÁGINA PODE AFIRMAR, e de onde vem cada coisa:
 *
 *   - marca de calçado ocupacional de fábrica brasileira no Rio Grande do Sul,
 *     que a Tower compra e revende — informado pelo cliente em 8/9/2026;
 *   - impermeável, solado antiderrapante, linha branca para ambiente com
 *     padrão sanitário mais rígido — já publicado em /marcas/ e /calcados/
 *     desde a construção do site, com o cliente.
 *
 * O QUE ELA NÃO AFIRMA. Não foi possível ler stickyshoes.com.br: a rede deste
 * ambiente recusa saída para o domínio. Então nada aqui vem do site do
 * fabricante — nem linha, nem modelo, nem número de CA. O link externo está
 * no lugar certo para quem quiser o catálogo, e a página se limita ao que a
 * Tower sabe por trabalhar com a marca.
 *
 * O NOME DA FÁBRICA FICOU DE FORA de propósito. O cliente informou que a
 * fábrica se chama Canadá e que a marca do calçado é Sticky Shoes. Publicar
 * "Canadá" numa página de calçado brasileiro convida à leitura errada de
 * produto importado, que é o oposto do que o texto quer dizer. Fica
 * registrado em docs/informacoes-pendentes.md, para entrar se o cliente
 * quiser.
 *
 * O PAPEL DA PÁGINA não é vender a marca. É responder "essa categoria é a
 * minha?", que é a pergunta de quem chega aqui — e mandar para /calcados/
 * ocupacionais/ ou para a Bompel conforme a resposta.
 */

const PERGUNTAS = [
  {
    pergunta: 'Sticky Shoes tem modelo com biqueira de proteção?',
    resposta:
      'O que a Tower trabalha dessa marca é a linha ocupacional, que é sem biqueira de proteção. Se a sua atividade tem risco de queda de objeto pesado sobre o pé, a conversa é outra: aí o caminho é calçado de segurança, e a linha que a Tower atende com mais profundidade nesse caso é a Bompel.',
  },
  {
    pergunta: 'Por que existe uma linha branca?',
    resposta:
      'Porque em parte da área de alimentação e da saúde o branco é padrão de uniforme, e sujeira aparente vira critério de higiene. Não é uma característica de proteção: um calçado branco e um preto do mesmo modelo protegem igual. O que muda é a facilidade de ver que ele precisa ser limpo.',
  },
  {
    pergunta: 'Calçado impermeável pode ser lavado por dentro?',
    resposta:
      'Impermeável descreve a barreira contra líquido que vem de fora, e não uma autorização para encharcar o calçado por dentro. Lavar por dentro com frequência e guardar úmido ataca costura, forro e adesivo, e encurta a vida do par. A higienização externa frequente é o que a rotina de cozinha e de saúde realmente pede.',
  },
  {
    pergunta: 'Dá para misturar marcas na mesma equipe?',
    resposta:
      'Dá, e às vezes é o certo. Funções diferentes correm riscos diferentes, e nada obriga a padronizar por marca. O que vale padronizar é o critério: o mesmo risco pede a mesma categoria de calçado, seja qual for o fabricante.',
  },
]

export const metadata: Metadata = {
  title: { absolute: 'Sticky Shoes: calçado ocupacional impermeável' },
  description:
    'Marca de calçado ocupacional impermeável, com solado antiderrapante e linha branca, usada em cozinha, alimentação e saúde. Veja se é a sua categoria.',
  alternates: { canonical: '/marcas/sticky-shoes/' },
}

const marca = empresa.marcas.find((m) => m.slug === 'sticky-shoes')

export default function MarcaStickyShoes() {
  return (
    <>
      <JsonLd dados={schemaFaq(PERGUNTAS)} />
      <Trilha
        itens={[
          { nome: 'Marcas', url: '/marcas/' },
          { nome: 'Sticky Shoes', url: '/marcas/sticky-shoes/' },
        ]}
      />
      <CabecalhoPagina
        rotulo="Marcas · Sticky Shoes"
        titulo="Sticky Shoes: o calçado de quem trabalha no molhado"
        resumo="Marca de calçado ocupacional de uma fábrica brasileira do Rio Grande do Sul. A Tower compra e revende. É a linha que a gente indica para cozinha, área de alimentação e serviços de saúde."
      />

      <Secao className="wrap pt-0">
        <EmUmaFrase>
          É calçado ocupacional, ou seja, sem biqueira de proteção. Serve onde o risco
          principal é piso molhado, respingo e jornada em pé. Onde há risco de queda de
          objeto pesado sobre o pé, a categoria é outra.
        </EmUmaFrase>
      </Secao>

      <Secao className="wrap pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div className="prose-tower">
            <h2>Por que impermeável muda tanto</h2>
            <p>
              Em cozinha e em serviço de saúde o pé passa o turno inteiro perto de
              líquido. Água de limpeza, gordura, respingo, produto derramado. Um calçado
              que absorve líquido fica pesado, demora a secar e envelhece por dentro antes
              de parecer gasto por fora.
            </p>
            <p>
              A barreira contra líquido resolve isso, e resolve junto um problema de
              higiene: material que não absorve é material que se limpa por fora, todo
              dia, sem encharcar o par.
            </p>

            <h2>O solado é o que decide</h2>
            <p>
              Impermeabilidade importa, mas o acidente mais frequente nesses ambientes é
              queda por escorregamento. Isso coloca a resistência ao escorregamento acima
              de qualquer outra característica.
            </p>
            <p>
              E vale saber o que a palavra significa antes de comprar por ela:{' '}
              <Link href="/conhecimento/solado-antiderrapante-o-que-significa/">
                &ldquo;antiderrapante&rdquo; não é uma característica única
              </Link>
              . O desempenho é ensaiado em superfícies e contaminantes específicos, e um
              solado que vai bem em piso cerâmico molhado pode ir mal em piso com óleo.
              Como a cozinha combina os dois, é essa combinação que interessa.
            </p>

            <h2>A linha branca</h2>
            <p>
              Parte da área de alimentação e da saúde usa branco como padrão de uniforme.
              Ali a sujeira aparente vira critério de higiene, e um calçado escuro esconde
              o que deveria ser visto.
            </p>
            <p>
              Vale deixar claro que isso é padrão de ambiente, e não característica de
              proteção. O mesmo modelo em branco e em preto protege igual.
            </p>

            <h2>O que ela não faz</h2>
            <p>
              Calçado ocupacional não tem biqueira de proteção. Se na sua atividade existe
              risco real de queda de objeto pesado sobre o pé, essa linha não é a resposta,
              e nenhuma característica dela compensa isso.
            </p>
            <p>
              A diferença entre as duas categorias, com o que muda em cada norma, está em{' '}
              <Link href="/conhecimento/calcado-ocupacional-ou-de-seguranca/">
                calçado ocupacional ou de segurança
              </Link>
              .
            </p>

            <h2>Uma observação honesta sobre marca</h2>
            <p>
              A Tower é distribuidora. Compra da fábrica e revende, e isso vale para todas
              as marcas do site. Nenhuma delas é adequada a tudo.
            </p>
            <p>
              Se a sua atividade pedir algo que a linha ocupacional não cobre, a gente diz
              e indica outra coisa. É por isso que trabalhamos com mais de um fabricante:
              o critério é o risco da atividade, e não o catálogo que temos à mão.
            </p>
          </div>

          <aside className="space-y-6">
            <div className="border border-rule bg-paper-2 p-6">
              <p className="eyebrow">Onde ela costuma entrar</p>
              <ul className="mt-4 space-y-3 text-[0.95rem] text-ink-2">
                <li>
                  <Link href="/para-seu-trabalho/cozinha/" className="underline underline-offset-4">
                    Cozinha e alimentação
                  </Link>
                </li>
                <li>
                  <Link
                    href="/para-seu-trabalho/enfermagem-e-saude/"
                    className="underline underline-offset-4"
                  >
                    Enfermagem e saúde
                  </Link>
                </li>
                <li>
                  <Link
                    href="/para-seu-trabalho/limpeza-e-conservacao/"
                    className="underline underline-offset-4"
                  >
                    Limpeza e conservação
                  </Link>
                </li>
              </ul>
            </div>

            {marca?.site && (
              <a
                href={marca.site}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-rule bg-paper p-6 transition-colors hover:border-ink"
              >
                <p className="eyebrow">Site do fabricante</p>
                <p className="mt-2 font-display text-lg font-bold">stickyshoes.com.br →</p>
                <p className="mt-2 text-sm text-ink-3">
                  Catálogo completo no site da fábrica. Para disponibilidade e prazo em
                  Fortaleza, fale com a gente.
                </p>
              </a>
            )}
          </aside>
        </div>
      </Secao>

      <Secao className="band">
        <div className="wrap">
          <OQueObservar
            titulo="O que observar antes de fechar"
            itens={[
              {
                titulo: 'O piso, e o que cai nele',
                texto:
                  'Água e gordura pedem desempenho diferente de água sozinha. É o dado que mais muda a escolha do solado, e o que mais falta quando o pedido chega.',
              },
              {
                titulo: 'Se existe risco de impacto no pé',
                texto:
                  'Se existe, a categoria muda e a conversa é sobre calçado de segurança. Essa pergunta vem antes de qualquer outra.',
              },
              {
                titulo: 'O padrão de uniforme do local',
                texto:
                  'Cozinha industrial e área hospitalar às vezes exigem branco. É melhor descobrir antes de fechar a grade inteira.',
              },
              {
                titulo: 'Numeração e largura',
                texto:
                  'Vale provar pensando no fim do expediente, e não no começo: o pé incha ao longo do dia. Em compra para equipe, a gente ajuda a montar a grade e guarda ela para as reposições.',
              },
            ]}
          />
        </div>
      </Secao>

      <Secao className="wrap">
        <div className="max-w-2xl">
          <Perguntas perguntas={PERGUNTAS} />
          <AssinaturaTecnica atualizado="setembro de 2026" />
        </div>
      </Secao>

      <LinksIrmaos
        rotulo="Outras marcas"
        itens={[
          { href: '/marcas/bompel/', nome: 'Bompel' },
          { href: '/marcas/3m/', nome: '3M' },
        ]}
        hub={{ href: '/marcas/', rotulo: 'Ver todas as marcas que a Tower trabalha' }}
      />

      <FechamentoCta
        contexto="marcas"
        secao="sticky-shoes-fechamento"
        titulo="Quer saber se essa é a linha para a sua equipe?"
        texto="Conte o que a equipe faz e como é o piso onde ela trabalha. A gente responde dizendo qual categoria atende, mesmo que não seja esta."
        rotulo="Falar no WhatsApp"
        categoria="sticky-shoes"
      />
    </>
  )
}
