import Link from 'next/link'
import { IconeSeta } from './Icones'
import { schemaBreadcrumb, JsonLd } from '@/lib/schema'

/** Trilha de navegação + BreadcrumbList. */
export function Trilha({ itens }: { itens: { nome: string; url: string }[] }) {
  const completo = [{ nome: 'Início', url: '/' }, ...itens]
  return (
    <>
      <JsonLd dados={schemaBreadcrumb(completo)} />
      <nav aria-label="Trilha de navegação" className="wrap pt-6">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-3">
          {completo.map((item, i) => (
            <li key={item.url} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === completo.length - 1 ? (
                <span className="text-ink-2">{item.nome}</span>
              ) : (
                <Link href={item.url} className="hover:text-tower-red">
                  {item.nome}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

/** Cabeçalho de página: rótulo, H1 e resposta direta. */
export function CabecalhoPagina({
  rotulo,
  titulo,
  resumo,
}: {
  rotulo: string
  titulo: string
  resumo: string
}) {
  return (
    <header className="wrap pt-8 pb-12 sm:pt-12 sm:pb-16">
      <p className="eyebrow eyebrow-red">{rotulo}</p>
      <h1 className="mt-4 max-w-4xl text-3xl sm:text-4xl lg:text-5xl">{titulo}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{resumo}</p>
    </header>
  )
}

/**
 * "Em uma frase" — a resposta no topo.
 * Existe para respeitar quem tem pressa e para sinalizar, logo de cara,
 * que aqui não se enrola antes de responder.
 */
export function EmUmaFrase({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-tower-red bg-tower-red-soft px-6 py-6 sm:px-8">
      <p className="eyebrow eyebrow-red">Em uma frase</p>
      <p className="mt-3 text-lg leading-relaxed sm:text-xl">{children}</p>
    </div>
  )
}

/**
 * "O que observar" — a assinatura consultiva da Tower.
 * Entrega critério mesmo para quem não vai comprar. É literalmente o
 * comportamento que construiu a empresa desde 1995.
 */
export function OQueObservar({
  titulo = 'O que observar',
  itens,
}: {
  titulo?: string
  itens: { titulo: string; texto: string }[]
}) {
  return (
    <section>
      <h2 className="eyebrow">{titulo}</h2>
      <ol className="mt-6 divide-y divide-rule border-y border-rule">
        {itens.map((item, i) => (
          <li key={item.titulo} className="grid gap-2 py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
            <span className="numeral text-2xl text-tower-red" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-display text-lg font-bold">{item.titulo}</h3>
              <p className="mt-1.5 measure text-ink-2">{item.texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** Comparação lado a lado — o motivo gráfico do projeto. */
export function Comparacao({
  a,
  b,
}: {
  a: { titulo: string; sub: string; itens: string[] }
  b: { titulo: string; sub: string; itens: string[] }
}) {
  return (
    <div className="grid gap-px border border-ink bg-ink sm:grid-cols-2">
      {[a, b].map((col) => (
        <div key={col.titulo} className="bg-paper p-6 sm:p-8">
          <h3 className="font-display text-xl font-bold">{col.titulo}</h3>
          <p className="eyebrow mt-2">{col.sub}</p>
          <ul className="mt-6 space-y-3">
            {col.itens.map((item) => (
              <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed">
                <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-tower-red" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/** Grade de links de navegação editorial. */
export function GradeLinks({
  itens,
  colunas = 3,
}: {
  itens: { href: string; titulo: string; texto: string }[]
  colunas?: 2 | 3
}) {
  // A grade usa gap-px sobre um fundo de régua para desenhar as divisórias.
  // Sem preenchimento, a última linha incompleta exibiria a cor da régua como
  // um bloco cinza solto. Estes itens vazios fecham a linha.
  const sobra = (colunas - (itens.length % colunas)) % colunas

  return (
    <ul
      className={`grid gap-px border border-rule bg-rule sm:grid-cols-2 ${
        colunas === 3 ? 'lg:grid-cols-3' : ''
      }`}
    >
      {itens.map((item) => (
        <li key={item.href} className="bg-paper">
          <Link
            href={item.href}
            className="group flex h-full flex-col p-6 transition-colors hover:bg-paper-2 sm:p-7"
          >
            <h3 className="font-display text-lg font-bold group-hover:text-tower-red">
              {item.titulo}
            </h3>
            <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-2">
              {item.texto}
            </p>
            <span className="mt-5 flex items-center gap-2 text-tower-red">
              <IconeSeta />
            </span>
          </Link>
        </li>
      ))}
      {Array.from({ length: sobra }).map((_, i) => (
        <li key={`vazio-${i}`} aria-hidden="true" className="hidden bg-paper sm:block" />
      ))}
    </ul>
  )
}

/**
 * Perguntas frequentes, em acordeão.
 *
 * Usa <details>/<summary> nativo em vez de JavaScript. Isso não é economia
 * de código: é o que garante que funcione sem JS, seja navegável por teclado
 * e por leitor de tela, e — o ponto crítico aqui — mantenha a resposta dentro
 * do HTML. Estas páginas emitem schema FAQPage, que exige a resposta presente
 * na página; um acordeão que injeta o texto só no clique quebraria isso.
 *
 * O atributo `name` faz o comportamento clássico de abrir uma e fechar a
 * anterior. Navegadores que ainda não o suportam simplesmente permitem várias
 * abertas ao mesmo tempo, o que também é utilizável.
 */
export function Perguntas({
  perguntas,
  titulo = 'Perguntas frequentes',
  nome = 'faq',
}: {
  perguntas: { pergunta: string; resposta: string }[]
  titulo?: string
  nome?: string
}) {
  return (
    <section>
      <h2 className="eyebrow">{titulo}</h2>
      <div className="faq mt-6">
        {perguntas.map((p) => (
          <details key={p.pergunta} name={nome} className="faq-item">
            <summary>
              <span>{p.pergunta}</span>
              <span className="faq-sinal" aria-hidden="true" />
            </summary>
            <p className="faq-resposta">{p.resposta}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

/** Assinatura técnica — E-E-A-T visível para o leitor, não só para o robô. */
export function AssinaturaTecnica({ atualizado }: { atualizado: string }) {
  return (
    <aside className="border border-rule bg-paper-2 p-6">
      <p className="eyebrow">Quem escreveu</p>
      <p className="mt-3 text-[0.95rem] leading-relaxed">
        <Link href="/a-tower/helano/" className="font-semibold underline underline-offset-4">
          Helano
        </Link>{' '}
        é técnico de segurança do trabalho e sócio-proprietário da Tower. Trabalha com
        equipamento de proteção individual desde antes de 1995, quando fundou a empresa
        em Fortaleza a convite da 3M.
      </p>
      <p className="mt-3 text-xs text-ink-3">Revisado em {atualizado}.</p>
    </aside>
  )
}

/** Ponte B2C → B2B. O leitor de "cozinha" pode ser o cozinheiro ou o dono. */
export function PonteEmpresas({
  href,
  texto,
}: {
  href: string
  texto: string
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-6 border border-rule bg-paper-2 p-6 transition-colors hover:border-ink"
    >
      <div>
        <p className="eyebrow">Compra para uma equipe?</p>
        <p className="mt-2 font-display text-lg font-bold group-hover:text-tower-red">
          {texto}
        </p>
      </div>
      <IconeSeta className="h-5 w-5 shrink-0 text-tower-red" />
    </Link>
  )
}

/**
 * Faixa de autoridade.
 *
 * Grafite, compacta e densa — é a seção que afirma. São só quatro
 * números porque só existem quatro verdadeiros: 1995, o prêmio 3M, os
 * dois sócios e o estado. Quatro números grandes e verdadeiros valem
 * mais que oito inventados, e a regra do projeto proíbe métrica
 * fabricada.
 */
export function BarraProva() {
  const fatos = [
    { destaque: '1995', texto: 'No mercado de proteção do Ceará' },
    { destaque: '3M', texto: 'Distribuidor Regional premiado' },
    { destaque: '2', texto: 'Sócios — você fala direto com eles' },
    { destaque: 'CE', texto: 'Fortaleza e região' },
  ]
  return (
    <section className="band-ink ritmo-compacto">
      <div className="wrap">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4">
          {fatos.map((f) => (
            <li key={f.destaque}>
              <p className="numeral text-5xl text-tower-red-light sm:text-6xl">
                {f.destaque}
              </p>
              <p className="mt-4 max-w-[16ch] text-[0.9rem] leading-snug text-paper/70">
                {f.texto}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Secao({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <section className={`py-14 sm:py-20 ${className}`}>{children}</section>
}
