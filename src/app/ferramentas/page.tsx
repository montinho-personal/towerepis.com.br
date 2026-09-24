import Link from 'next/link'
import { Trilha, CabecalhoPagina, EmUmaFrase, Secao } from '@/components/Blocos'
import { FechamentoCta } from '@/components/WhatsAppCta'
import { JsonLd, schemaBreadcrumb } from '@/lib/schema'
import { metadados } from '@/lib/seo'
import { IconeSeta } from '@/components/Icones'
import { PUBLICAVEL as TAMANHO_PUBLICAVEL } from '@/lib/tamanho-calcado'

/**
 * Hub de ferramentas.
 *
 * Existe só com ferramentas reais. As que estão no plano —
 * tamanho de botina, consumo anual, estoque mínimo, seletor de luva e de
 * respirador — aparecem como texto, não como link para página vazia. Hub
 * que lista "em breve" é hub que manda o buscador para lugar nenhum.
 *
 * Duas das três já existiam com outro nome: /encontrar-epi/ é o "qual EPI
 * eu preciso", e /orcamento/ é a grade de numeração da equipe. O hub dá a
 * elas o lugar que faltava.
 */

const FERRAMENTAS = [
  {
    href: '/ferramentas/qual-calcado-usar/',
    rotulo: 'Escolha de calçado',
    nome: 'Qual calçado profissional é ideal para mim?',
    texto:
      'Onze perguntas sobre a sua atividade, o piso e a jornada. No fim, a família de calçado a avaliar e as características que vale procurar — biqueira, solado, cabedal, água e conforto.',
    tempo: 'Menos de 1 minuto',
    destaque: true,
  },
  {
    href: '/ferramentas/grade-de-numeracao/',
    rotulo: 'Para equipes',
    nome: 'Calculadora de grade de numeração da equipe',
    texto:
      'Quantas pessoas calçam cada número, quantos pares por pessoa, reserva se quiser. No fim, a grade pronta para copiar, baixar ou mandar para cotação — sem nenhum nome.',
    tempo: '3 minutos',
    destaque: false,
  },
  // Só aparece quando a referência de numeração foi conferida na fonte.
  ...(TAMANHO_PUBLICAVEL
    ? [
        {
          href: '/ferramentas/tamanho-de-botina/',
          rotulo: 'Numeração',
          nome: 'Calculadora de tamanho de botina',
          texto:
            'Meça o pé em centímetros e veja qual numeração vale experimentar. Mostra dois números quando a medida fica entre eles, e o que conferir na prova.',
          tempo: 'Menos de 1 minuto',
          destaque: false,
        },
      ]
    : []),
  {
    href: '/encontrar-epi/',
    rotulo: 'Escolha de EPI',
    nome: 'Qual EPI a minha atividade pede?',
    texto:
      'Quatro perguntas sobre a rotina, e as categorias de proteção que costumam merecer atenção nesse perfil: mãos, respiração, audição, olhos ou pés.',
    tempo: '30 segundos',
    destaque: false,
  },
  {
    href: '/orcamento/',
    rotulo: 'Orçamento',
    nome: 'Orçamento pronto para o WhatsApp',
    texto:
      'Monte o pedido item a item — calçado com a grade, luva, máscara — e envie pronto pelo WhatsApp. Sem e-mail, sem CNPJ, e a resposta vem com preço e prazo.',
    tempo: '5 minutos',
    destaque: false,
  },
]

export const metadata = metadados({
  titulo: 'Ferramentas para escolher EPI',
  descricao:
    // Era "Três ferramentas": com a grade, deixou de ser verdade. Descrição
    // sem contagem, para não quebrar de novo a cada ferramenta nova.
    'Ferramentas gratuitas para escolher e comprar EPI sem chute: qual calçado usar, qual proteção a atividade pede, a grade da equipe e o orçamento pronto.',
  canonical: '/ferramentas/',
})

export default function Ferramentas() {
  return (
    <>
      <JsonLd dados={schemaBreadcrumb([{ nome: 'Ferramentas', url: '/ferramentas/' }])} />
      <Trilha itens={[{ nome: 'Ferramentas', url: '/ferramentas/' }]} />
      <CabecalhoPagina
        rotulo="Ferramentas"
        titulo="Ferramentas para escolher EPI sem chute"
        resumo="Orientação inicial, gratuita e sem cadastro. Cada uma termina com o contexto pronto para a conversa, se você quiser conversar."
      />

      <Secao className="wrap pt-0">
        <EmUmaFrase>
          São ferramentas de orientação, e não de laudo: ajudam a saber o que perguntar e o que
          observar. A avaliação de riscos da empresa, o Certificado de Aprovação de cada modelo e
          a orientação do responsável pela segurança do trabalho continuam sendo o que decide.
        </EmUmaFrase>
      </Secao>

      <Secao className="wrap pt-0">
        <div className={`grid gap-4 ${FERRAMENTAS.length > 3 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3"}`}>
          {FERRAMENTAS.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className={`group flex flex-col border p-6 transition-colors ${
                f.destaque ? 'border-ink bg-ink text-paper hover:bg-grafite-800' : 'border-rule bg-paper hover:border-ink'
              }`}
            >
              <p className={`eyebrow ${f.destaque ? 'text-paper/60' : ''}`}>{f.rotulo}</p>
              {/* A cor vem explícita: a regra global pinta todo título de tinta, e no
                  cartão escuro o título sumia — foi o que o cliente viu no celular. */}
              <h2 className={`mt-3 text-xl font-bold leading-snug ${f.destaque ? 'text-paper' : ''}`}>{f.nome}</h2>
              <p className={`mt-3 flex-1 text-[0.95rem] leading-relaxed ${f.destaque ? 'text-paper/80' : 'text-ink-2'}`}>
                {f.texto}
              </p>
              <p className={`mt-6 flex items-center gap-2 font-display text-sm font-bold ${f.destaque ? 'text-paper' : 'text-tower-red'}`}>
                {f.tempo} <IconeSeta />
              </p>
            </Link>
          ))}
        </div>
      </Secao>

      <Secao className="band">
        <div className="wrap">
          <h2 className="text-2xl sm:text-3xl">O que vem depois</h2>
          <p className="mt-4 max-w-2xl text-ink-2">
            As próximas ferramentas nascem do que mais falta nos pedidos que a Tower recebe. Em
            preparação, sem data: descobrir a numeração de botina sem medir todo mundo, calcular o
            consumo anual de calçado da equipe, definir o estoque mínimo de EPI sem empatar dinheiro,
            e os seletores de luva e de respirador — que seguem a mesma regra desta página: orientam,
            não certificam.
          </p>
          <p className="mt-4 max-w-2xl text-ink-2">
            Enquanto não existem, os assuntos estão escritos: a grade de numeração em{' '}
            <Link href="/conhecimento/grade-de-numeracao-como-definir-para-a-equipe/" className="underline underline-offset-4 hover:text-tower-red">
              como definir a grade da equipe
            </Link>
            , a reposição em{' '}
            <Link href="/conhecimento/quantos-pares-por-ano-calcular-a-reposicao/" className="underline underline-offset-4 hover:text-tower-red">
              quantos pares por ano
            </Link>
            , e a escolha de luva e de filtro em{' '}
            <Link href="/conhecimento/tipos-de-luva-qual-material-escolher/" className="underline underline-offset-4 hover:text-tower-red">
              qual material de luva
            </Link>{' '}
            e{' '}
            <Link href="/conhecimento/respirador-como-escolher-o-filtro/" className="underline underline-offset-4 hover:text-tower-red">
              como escolher o filtro do respirador
            </Link>
            .
          </p>
        </div>
      </Secao>

      <FechamentoCta
        contexto="ferramenta"
        secao="ferramentas-fechamento"
        titulo="Prefere perguntar direto?"
        texto="Conte o que a equipe faz e como é o ambiente. A gente responde com a categoria certa, e um dos dois sócios é técnico de segurança do trabalho."
        rotulo="Falar no WhatsApp"
        categoria="ferramentas"
      />
    </>
  )
}
