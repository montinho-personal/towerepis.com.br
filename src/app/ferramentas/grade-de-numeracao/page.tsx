import Link from 'next/link'
import { Trilha, CabecalhoPagina, Perguntas, AssinaturaTecnica, Secao } from '@/components/Blocos'
import { GradeEquipe } from '@/components/GradeEquipe'
import { JsonLd, schemaBreadcrumb, schemaFaq, schemaWebApplication } from '@/lib/schema'
import { metadados } from '@/lib/seo'
import { calcular, ESTADO_INICIAL, NUMERO_MAX, NUMERO_MIN } from '@/lib/grade-equipe'
import { PUBLICAVEL as TAMANHO_PUBLICAVEL } from '@/lib/tamanho-calcado'

/**
 * Calculadora de grade de numeração da equipe.
 *
 * A URL. /grade-de-numeracao/, no mesmo padrão das outras ferramentas e com
 * o termo que fabricante e distribuidor usam. Na pesquisa de setembro de
 * 2026, "grade de numeração de calçados" sozinho puxa estoque de loja de
 * sapato; por isso "equipe" vai no title e no H1, onde separa a intenção.
 *
 * CANIBALIZAÇÃO. O artigo "como definir a grade de numeração de uma equipe"
 * é dono do método — levantar, provar, separar forma feminina, registrar.
 * Esta página é dona da conta. Os blocos abaixo da ferramenta respondem em
 * duas frases e mandam para o artigo, e a FAQ não repete as perguntas dele.
 *
 * O EXEMPLO abaixo é calculado pela mesma função da ferramenta, no build.
 * Se a regra de reserva mudar, o exemplo muda junto e nunca a contradiz.
 */

const CAMINHO = '/ferramentas/grade-de-numeracao/'

const EXEMPLO = { 36: 2, 37: 3, 38: 6, 39: 9, 40: 12, 41: 9, 42: 6, 43: 2, 44: 1 }
const exemplo = calcular({
  ...ESTADO_INICIAL,
  contagem: Object.fromEntries(Object.entries(EXEMPLO).map(([k, v]) => [k, v])),
  reserva: { tipo: 'percentual', pct: 5 },
})

const PERGUNTAS = [
  {
    pergunta: 'A empresa é obrigada a fornecer quantos pares?',
    resposta:
      'A NR-6 não fixa quantidade de pares. Ela obriga a fornecer, gratuitamente, o EPI adequado ao risco, em perfeito estado de conservação e funcionamento, e a substituir quando ele é danificado ou extraviado. Quantos pares isso significa depende da atividade, do desgaste e da conservação — e é decisão da empresa, não da norma.',
  },
  {
    pergunta: 'Qual percentual de reserva usar?',
    resposta:
      'Não existe percentual técnico de referência para reserva de calçado. Ela é uma decisão logística: cobre admissões e trocas por dano até a próxima compra. Equipe com muita rotatividade pede mais; equipe estável, pouca ou nenhuma. A calculadora aplica o percentual que você escolher e mostra o resultado.',
  },
  {
    pergunta: 'Como a reserva é distribuída entre os números?',
    resposta:
      'Na proporção da equipe. O percentual é aplicado sobre os pares, o total é arredondado para cima, e cada número recebe a sua parte: onde está a maior parte da equipe fica a maior parte da reserva, e as pontas costumam ficar sem nenhuma.',
  },
  {
    pergunta: 'O que fazer com quem ainda não sabe a numeração?',
    resposta:
      'Marcar como pendente. A pessoa aparece na conferência, mas não entra no pedido, e a reserva não é usada para cobrir o número dela: são coisas diferentes. Quando o número chegar, basta somar à grade.',
  },
  {
    pergunta: 'A calculadora guarda os nomes dos funcionários?',
    resposta:
      'Não. O nome é opcional e fica só na tela, para quem monta a lista conferir. Ele não vai para a mensagem do WhatsApp, para o arquivo baixado nem para o que fica salvo no navegador, que guarda só números e setores.',
  },
  {
    pergunta: 'Dá para separar a grade por setor?',
    resposta:
      'Dá, no modo de lista por pessoa. Com o setor preenchido, o resultado mostra a grade geral e a grade de cada setor — útil quando cada setor recebe um modelo diferente, ou para separar a forma feminina.',
  },
  {
    pergunta: 'Preciso saber o modelo antes de montar a grade?',
    resposta:
      'Não. A grade vale para qualquer modelo, e pode ser mandada sem ele: a conversa sobre o modelo vem junto com o orçamento. Se o modelo mudar, vale provar uma amostra antes, porque a forma muda entre fabricantes.',
  },
]

export const metadata = metadados({
  titulo: 'Calculadora de grade de numeração da equipe',
  descricao:
    'Informe a numeração dos funcionários e monte a grade de calçados da equipe, com pares por pessoa, reserva e pendências. Grátis, sem cadastro.',
  canonical: CAMINHO,
})

export default function GradeDeNumeracao() {
  return (
    <>
      <JsonLd
        dados={[
          schemaWebApplication({
            nome: 'Calculadora de grade de numeração da equipe',
            descricao:
              'Organiza a numeração de calçado de uma equipe e calcula os pares por número, com pares por pessoa, reserva e pendências. Gratuita e sem cadastro.',
            caminho: CAMINHO,
          }),
          schemaBreadcrumb([
            { nome: 'Ferramentas', url: '/ferramentas/' },
            { nome: 'Grade de numeração', url: CAMINHO },
          ]),
          schemaFaq(PERGUNTAS),
        ]}
      />
      <Trilha
        itens={[
          { nome: 'Ferramentas', url: '/ferramentas/' },
          { nome: 'Grade de numeração', url: CAMINHO },
        ]}
        tom="escuro"
      />
      <CabecalhoPagina
        variante="ink"
        rotulo="Ferramenta · Compra para equipes"
        titulo="Calculadora de grade de numeração da equipe"
        resumo="Organize os tamanhos dos colaboradores e veja quantos pares pedir de cada numeração. Sem cadastro, e a grade pronta vai direto para o orçamento."
      />

      <Secao className="wrap">
        <GradeEquipe tamanho={TAMANHO_PUBLICAVEL} />
      </Secao>

      <Secao className="band">
        <div className="wrap">
          <h2 className="text-2xl sm:text-3xl">Da lista de pessoas ao pedido</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed">
            A conta tem três passos: pessoas por número, vezes pares por pessoa, mais a reserva que
            você escolher. Quem ainda não sabe o número fica pendente, fora do pedido, até ser
            resolvido.
          </p>
          <p className="mt-4 max-w-2xl text-ink-2">
            O levantamento que vem antes — pessoa a pessoa, com prova de amostra antes de fechar —
            está em{' '}
            <Link href="/conhecimento/grade-de-numeracao-como-definir-para-a-equipe/" className="underline underline-offset-4 hover:text-tower-red">
              como definir a grade da equipe
            </Link>
            .
          </p>

          <h2 className="mt-14 text-2xl sm:text-3xl">Exemplo: uma equipe de 50 pessoas</h2>
          <p className="mt-4 max-w-2xl text-ink-2">
            Um par por pessoa e 5% de reserva. {exemplo.reservaDescricao} É a conta que a
            calculadora faz:
          </p>
          <div className="mt-6 max-w-xl overflow-x-auto">
            <table className="w-full border-collapse text-left text-[0.95rem] tabular-nums">
              <caption className="sr-only">Grade de exemplo para 50 pessoas com 5% de reserva</caption>
              <thead>
                <tr className="border-b-2 border-ink font-display">
                  <th scope="col" className="py-2 pr-4">Numeração</th>
                  <th scope="col" className="py-2 pr-4 text-right">Pessoas</th>
                  <th scope="col" className="py-2 pr-4 text-right">Reserva</th>
                  <th scope="col" className="py-2 text-right">Pedido</th>
                </tr>
              </thead>
              <tbody>
                {exemplo.linhas.map((l) => (
                  <tr key={l.numero} className="border-b border-rule">
                    <th scope="row" className="py-2 pr-4 font-display font-bold">{l.numero}</th>
                    <td className="py-2 pr-4 text-right">{l.pessoas}</td>
                    <td className="py-2 pr-4 text-right">{l.reserva || '—'}</td>
                    <td className="py-2 text-right font-bold">{l.pedido}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-ink font-display font-bold">
                  <th scope="row" className="py-2 pr-4">Total</th>
                  <td className="py-2 pr-4 text-right">{exemplo.pessoas}</td>
                  <td className="py-2 pr-4 text-right">{exemplo.reserva}</td>
                  <td className="py-2 text-right">{exemplo.pedido}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:gap-x-14">
            <Bloco titulo="Devo comprar pares de reserva?">
              Depende da rotatividade. A reserva cobre quem entra e o par que estraga antes da
              próxima compra. É decisão logística, e não obrigação de norma — por isso a calculadora
              deixa você escolher, e começa sem.
            </Bloco>
            <Bloco titulo="Por que o percentual é sobre pares, e não sobre pessoas?">
              Porque o pedido é de pares. Com dois pares por pessoa, 5% sobre 100 pessoas dariam 5
              pares; sobre os 200 pares do pedido, dão 10. A calculadora mostra a base usada em cada
              conta, para não haver dúvida sobre qual das duas foi feita.
            </Bloco>
            <Bloco titulo="Por que arredondar a reserva para cima?">
              Porque não existe fração de par, e arredondar para baixo zeraria a reserva de equipes
              pequenas: 5% de 12 pares são 0,6. Para cima, vira 1 par, e a tela diz que houve
              arredondamento.
            </Bloco>
            <Bloco titulo="Reserva não é reposição">
              A reserva é o que fica guardado para imprevistos. A reposição é a troca do par quando
              ele deixa de proteger, e depende da condição de uso, não de calendário. Os sinais estão
              em <Link href="/conhecimento/quando-trocar-o-calcado-de-seguranca/">quando trocar o calçado de segurança</Link>,
              e o consumo do ano em{' '}
              <Link href="/conhecimento/quantos-pares-por-ano-calcular-a-reposicao/">quantos pares comprar no ano</Link>.
            </Bloco>
          </div>
          <p className="mt-10 max-w-2xl text-sm text-ink-2">
            A faixa da calculadora vai de {NUMERO_MIN} a {NUMERO_MAX}, a mesma do orçamento do site. Qual
            numeração cada modelo é fabricado se confirma no orçamento.
          </p>
        </div>
      </Secao>

      <Secao className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <Perguntas perguntas={PERGUNTAS} />
          </div>
          <div className="space-y-6">
            <AssinaturaTecnica atualizado="setembro de 2026" />
            <div className="border-l-4 border-tower-red bg-tower-red-soft px-5 py-4 text-[0.92rem] leading-relaxed">
              Esta ferramenta auxilia na organização de quantidades e numerações. A escolha do modelo e
              da proteção adequada deve considerar os riscos da atividade, o CA e as orientações de
              segurança aplicáveis.
            </div>
            <div className="border border-rule p-6">
              <p className="eyebrow">Como a conta é feita</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
                Pessoas por número, vezes pares por pessoa, dá os pares-base. A reserva percentual é
                aplicada sobre os pares-base, arredondada para cima e distribuída na proporção de cada
                número pelo método dos maiores restos. A reserva por numeração é a que você define.
                Pendentes ficam fora do pedido. Tudo é calculado no seu navegador.
              </p>
              <p className="mt-3 text-[0.95rem]">
                <Link href="/ferramentas/" className="underline underline-offset-4 hover:text-tower-red">
                  Ver todas as ferramentas
                </Link>
              </p>
            </div>
            <div className="border border-rule p-6">
              <p className="eyebrow">Fonte</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href="https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-06-atualizada-2022-1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    NR-6 — Equipamento de Proteção Individual (texto oficial, PDF)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Secao>
    </>
  )
}

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="prose-tower border-t border-rule pt-5">
      <h3 className="text-lg">{titulo}</h3>
      <p className="text-[0.98rem] text-ink-2">{children}</p>
    </div>
  )
}
