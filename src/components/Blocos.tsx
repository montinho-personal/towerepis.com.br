import Link from 'next/link'
import { IconeSeta } from './Icones'
import { schemaBreadcrumb, JsonLd } from '@/lib/schema'

/**
 * Trilha de navegação + BreadcrumbList.
 *
 * O tom escuro existe para as páginas de índice, que abrem em grafite: a
 * trilha em papel acima de uma faixa escura deixaria uma tira branca de
 * poucos pixels entre o topo e o cabeçalho. Com o mesmo fundo, trilha e
 * cabeçalho leem como um bloco só.
 */
export function Trilha({
  itens,
  tom = 'claro',
}: {
  itens: { nome: string; url: string }[]
  tom?: 'claro' | 'escuro'
}) {
  const completo = [{ nome: 'Início', url: '/' }, ...itens]
  const escuro = tom === 'escuro'
  return (
    <>
      <JsonLd dados={schemaBreadcrumb(completo)} />
      <nav
        aria-label="Trilha de navegação"
        className={escuro ? 'band-ink pt-6' : 'pt-6'}
      >
        <ol
          className={`wrap flex flex-wrap items-center gap-x-2 gap-y-1 text-xs ${
            escuro ? 'text-paper/55' : 'text-ink-3'
          }`}
        >
          {completo.map((item, i) => (
            <li key={item.url} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === completo.length - 1 ? (
                <span className={escuro ? 'text-paper/85' : 'text-ink-2'}>{item.nome}</span>
              ) : (
                <Link
                  href={item.url}
                  className={escuro ? 'hover:text-tower-red-light' : 'hover:text-tower-red'}
                >
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

/**
 * Cabeçalho de página: rótulo, H1 e resposta direta.
 *
 * Duas variantes, e a escolha entre elas é hierárquica, não decorativa.
 *
 * As páginas de índice — profissões, proteção, calçados, conhecimento,
 * equipes, marcas — abrem em grafite. São as aberturas de capítulo do site:
 * quem chega nelas está escolhendo um caminho, e a mudança de superfície
 * marca essa troca de nível durante a navegação.
 *
 * As páginas finais abrem em papel, porque são para ler. Escurecer todas
 * gastaria o grafite até ele não significar mais nada — a regra do projeto
 * é que a superfície escura afirma, e afirmação repetida vira ruído.
 */
export function CabecalhoPagina({
  rotulo,
  titulo,
  resumo,
  variante = 'papel',
}: {
  rotulo: string
  titulo: string
  resumo: string
  variante?: 'papel' | 'ink'
}) {
  if (variante === 'ink') {
    return (
      <header className="band-ink pb-14 pt-8 sm:pb-20 sm:pt-10" data-continua>
        <div className="wrap">
          <p className="eyebrow eyebrow-red">{rotulo}</p>
          <h1 className="mt-5 max-w-4xl text-titulo sm:text-4xl lg:text-5xl">{titulo}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-paper/75">{resumo}</p>
        </div>
      </header>
    )
  }

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
    // O rótulo é <h2>, e não <p>, porque este bloco é a resposta direta da
    // página. Como parágrafo, ele não existia no sumário do documento — e é
    // justamente o trecho que um extrator de resposta deveria citar. A
    // aparência não muda: a classe .eyebrow define tamanho e peso.
    <div className="border-l-4 border-tower-red bg-tower-red-soft px-6 py-6 sm:px-8">
      <h2 className="eyebrow eyebrow-red">Em uma frase</h2>
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
  tom = 'claro',
}: {
  titulo?: string
  itens: { titulo: string; texto: string }[]
  tom?: 'claro' | 'escuro'
}) {
  const escuro = tom === 'escuro'
  return (
    <section>
      <h2 className={`eyebrow ${escuro ? 'eyebrow-red' : ''}`}>{titulo}</h2>
      <ol
        className={`mt-6 divide-y border-y ${
          escuro ? 'divide-grafite-600 border-grafite-600' : 'divide-rule border-rule'
        }`}
      >
        {itens.map((item, i) => (
          <li key={item.titulo} className="grid gap-2 py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
            <span
              className={`numeral text-2xl ${escuro ? 'text-tower-red-light' : 'text-tower-red'}`}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-display text-lg font-bold">{item.titulo}</h3>
              <p className={`mt-1.5 measure ${escuro ? 'text-paper/70' : 'text-ink-2'}`}>
                {item.texto}
              </p>
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
 * Lista de links em régua — a alternativa à grade de cards.
 *
 * A grade de cards resolvia tudo no site, e por isso não resolvia nada bem:
 * um conjunto de seis destinos equivalentes e uma lista de "o que costuma
 * ser necessário para essa rotina" chegavam ao leitor com exatamente o
 * mesmo peso visual. Card é uma promessa de equivalência entre itens.
 * Quando os itens não são equivalentes, a régua é mais honesta — e ocupa
 * menos altura, o que no celular é a diferença entre ver e não ver.
 *
 * `numerada` dá ordem e peso: serve quando a lista é um raciocínio.
 * `simples` é só travessia: serve quando são atalhos laterais que não
 * deveriam competir com o conteúdo da página.
 *
 * Os títulos são <h3>, e isso não é detalhe. Na primeira versão deste
 * componente eu os fiz <span>, e a troca de cards por régua apagou ~40
 * headings do site — "Calçados antiderrapantes", "Cozinha e alimentação" —
 * sem nenhum sinal visível. Ganhar ritmo não pode custar sumário.
 */
export function ListaLinks({
  itens,
  variante = 'numerada',
  tom = 'claro',
}: {
  itens: { href: string; titulo: string; texto: string }[]
  variante?: 'numerada' | 'simples'
  tom?: 'claro' | 'escuro'
}) {
  const escuro = tom === 'escuro'
  const regua = escuro ? 'border-grafite-600' : 'border-rule'
  const secundario = escuro ? 'text-paper/65' : 'text-ink-2'
  const realce = escuro ? 'text-tower-red-light' : 'text-tower-red'
  const fundoHover = escuro ? 'hover:bg-grafite-700' : 'hover:bg-paper-2'

  if (variante === 'simples') {
    return (
      <ul className={`grid border-t ${regua} sm:grid-cols-2 sm:gap-x-10`}>
        {itens.map((item) => (
          <li key={item.href} className={`border-b ${regua}`}>
            <Link
              href={item.href}
              className={`group flex items-baseline justify-between gap-5 py-5 transition-colors ${
                escuro ? 'hover:text-tower-red-light' : 'hover:text-tower-red'
              }`}
            >
              <span>
                <h3 className="inline font-display text-base font-bold">{item.titulo}</h3>
                <span className={`mt-1 block text-[0.9rem] leading-snug ${secundario}`}>
                  {item.texto}
                </span>
              </span>
              <IconeSeta className={`h-4 w-4 shrink-0 translate-y-1 ${realce}`} />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ol className={`border-t-2 ${escuro ? 'border-paper/25' : 'border-ink'}`}>
      {itens.map((item, i) => (
        <li key={item.href} className={`border-b ${regua}`}>
          <Link
            href={item.href}
            className={`group grid gap-2 py-6 transition-colors sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-7 sm:px-3 ${fundoHover}`}
          >
            <span className={`numeral text-2xl ${realce}`} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>
              <h3
                className={`inline font-display text-lg font-bold transition-colors ${
                  escuro ? 'group-hover:text-tower-red-light' : 'group-hover:text-tower-red'
                }`}
              >
                {item.titulo}
              </h3>
              <span className={`mt-1.5 block measure text-[0.95rem] leading-relaxed ${secundario}`}>
                {item.texto}
              </span>
            </span>
            <IconeSeta className={`hidden h-4 w-4 shrink-0 sm:block ${realce}`} />
          </Link>
        </li>
      ))}
    </ol>
  )
}

/**
 * Links entre páginas irmãs — "outras profissões", "outros tipos".
 *
 * Existia copiado em quatro arquivos com a mesma marcação. Continua
 * discreto de propósito: é navegação de saída, não conteúdo, e não deveria
 * disputar atenção com o CTA que vem antes dele.
 */
export function LinksIrmaos({
  rotulo,
  itens,
  hub,
}: {
  rotulo: string
  itens: { href: string; nome: string }[]
  /**
   * Link de volta ao índice do cluster.
   *
   * A auditoria mostrou que a autoridade corria só para baixo e para os
   * lados: as páginas finais recebiam de 12 a 16 links editoriais e os
   * índices recebiam de 0 a 8 — o de proteção, zero. O índice é a página que
   * deveria responder à busca por categoria, e era a mais fraca do grupo.
   * Trilha de navegação não resolve isso: ela aparece em toda página e por
   * isso não sinaliza importância de nada.
   */
  hub?: { href: string; rotulo: string }
}) {
  return (
    <section className="band ritmo-compacto">
      <div className="wrap">
        <h2 className="eyebrow">{rotulo}</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {itens.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-block border border-rule-strong bg-paper px-4 py-3 font-display text-[0.8rem] font-semibold transition-colors hover:border-ink hover:bg-paper-2"
              >
                {item.nome}
              </Link>
            </li>
          ))}
        </ul>

        {hub && (
          <p className="mt-6 border-t border-rule pt-5">
            <Link
              href={hub.href}
              className="group inline-flex items-center gap-2 font-display text-[0.95rem] font-bold transition-colors hover:text-tower-red"
            >
              {hub.rotulo}
              <IconeSeta className="h-4 w-4 text-tower-red" />
            </Link>
          </p>
        )}
      </div>
    </section>
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

/**
 * Ponte para outro caminho.
 *
 * Nasceu como ponte B2C → B2B — o leitor de "cozinha" pode ser o cozinheiro
 * ou o dono. Serve para qualquer desvio de rota que dependa de quem está
 * lendo, e por isso o rótulo é parâmetro.
 */
export function Ponte({
  href,
  rotulo,
  texto,
}: {
  href: string
  rotulo: string
  texto: string
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-6 border border-rule bg-paper-2 p-6 transition-colors hover:border-ink"
    >
      <div>
        <p className="eyebrow">{rotulo}</p>
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
 * números porque só existem quatro verdadeiros: 1995 (e a 3M na origem), a
 * Bompel como parceria de hoje, os
 * dois sócios e o estado. Quatro números grandes e verdadeiros valem
 * mais que oito inventados, e a regra do projeto proíbe métrica
 * fabricada.
 */
export function BarraProva({ continua = false }: { continua?: boolean }) {
  const fatos = [
    { destaque: '1995', texto: 'Fundada a convite da 3M, no Ceará' },
    { destaque: 'Bompel', texto: 'Principal parceria em calçado, hoje' },
    { destaque: '2', texto: 'Sócios — você fala direto com eles' },
    { destaque: 'CE', texto: 'Fortaleza e região' },
  ]
  return (
    // `continua` declara que esta faixa é a continuação da anterior, e não
    // duas superfícies escuras empilhadas por descuido. A verificação de QA
    // reprova faixas escuras adjacentes justamente para pegar o descuido —
    // então a intenção precisa estar no código, não numa exceção do teste.
    <section className="band-ink ritmo-compacto" data-continua={continua || undefined}>
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

/**
 * Seção com compasso vertical explícito.
 *
 * O padrão continua sendo o compasso normal, mas ele deixou de ser a única
 * opção. A monotonia das páginas internas não vinha só da cor: vinha de
 * toda seção respirar igual. Compressão antes de expansão é o que produz
 * ritmo — e sem um jeito de pedir compressão, não havia ritmo a produzir.
 *
 * As utilidades `pt-0` e `pb-0` continuam funcionando por cima destas
 * classes: `.ritmo-*` vive na camada de componentes e o Tailwind resolve a
 * camada de utilidades depois.
 */
export function Secao({
  children,
  className = '',
  ritmo = 'normal',
}: {
  children: React.ReactNode
  className?: string
  ritmo?: 'compacto' | 'normal' | 'amplo'
}) {
  const compasso = {
    compacto: 'ritmo-compacto',
    normal: 'ritmo-normal',
    amplo: 'ritmo-amplo',
  }[ritmo]
  return <section className={`${compasso} ${className}`}>{children}</section>
}
