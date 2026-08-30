import { Secao } from './Blocos'
import { empresa } from '@/config/empresa'

/**
 * "O erro caro" — reposiciona a decisão de PREÇO para ADESÃO.
 * É aqui que a Tower sai da comparação por centavo, usando um argumento
 * que é verdadeiro e que só quem entende de segurança do trabalho faz.
 */
export function ErroCaro() {
  return (
    <Secao className="band-ink">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow text-paper/55">O erro que sai caro</p>
            <h2 className="mt-4 text-2xl sm:text-3xl">
              EPI que a equipe não usa é dinheiro perdido duas vezes.
            </h2>
          </div>
          <div className="space-y-4 text-paper/75">
            <p>
              Você paga pelo equipamento e continua com a exposição. Do ponto de vista de
              proteção e de fiscalização, EPI guardado no armário equivale a EPI que nunca
              foi fornecido.
            </p>
            <p>
              E o motivo do abandono quase nunca é rebeldia. É desconforto, numeração
              errada, peso, calor ou incompatibilidade entre dois equipamentos usados ao
              mesmo tempo. São coisas que se resolvem na escolha — antes da compra, não
              depois.
            </p>
            <p className="font-display text-lg font-bold text-paper">
              Por isso a nossa primeira pergunta nunca é quantos. É o que a equipe faz.
            </p>
          </div>
        </div>
      </div>
    </Secao>
  )
}

/**
 * Processo reduz risco percebido mais do que preço.
 * Dizer COMO funciona vale mais do que dizer QUE é bom.
 */
export function ComoAtendemos() {
  const etapas = [
    {
      titulo: 'Você conta o que a equipe faz',
      texto:
        'Segmento, quantas pessoas, quais atividades e para quando precisa. Não pedimos CNPJ nem cadastro para começar a conversa.',
    },
    {
      titulo: 'A gente verifica o que é adequado',
      texto:
        'Se vocês já têm a avaliação de riscos, trabalhamos a partir dela. Se não, apontamos o que costuma ser necessário para aquela atividade e o que precisa de definição técnica.',
    },
    {
      titulo: 'Orçamento com o CA dos itens',
      texto:
        'Informamos o Certificado de Aprovação dos equipamentos, para que vocês registrem na ficha de EPI e mantenham a rastreabilidade.',
    },
    {
      titulo: 'Entrega em Fortaleza e região',
      texto:
        'Combinamos prazo antes de fechar. Se não der para cumprir, dizemos na hora — em trinta anos, foi assim que os clientes continuaram voltando.',
    },
    {
      titulo: 'Reposição sem recomeçar do zero',
      texto:
        'Depois do primeiro pedido, a grade de numeração e os modelos ficam registrados. A recompra vira uma mensagem, não um novo processo.',
    },
  ]

  return (
    <Secao className="wrap">
      <p className="eyebrow eyebrow-red">Como funciona</p>
      <h2 className="mt-4 max-w-2xl text-2xl sm:text-3xl">
        Do primeiro contato à reposição
      </h2>

      <ol className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-5">
        {etapas.map((e, i) => (
          <li key={e.titulo} className="bg-paper p-6">
            <p className="numeral text-2xl text-tower-red">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-4 font-display text-base font-bold leading-snug">{e.titulo}</h3>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-2">{e.texto}</p>
          </li>
        ))}
      </ol>
    </Secao>
  )
}

/**
 * "Com quem você vai falar."
 *
 * A Tower é uma operação de duas pessoas. Um comprador B2B descobre isso de
 * qualquer forma — descobrir no meio da negociação gera desconfiança.
 * Dizer antes, com os fatos certos, transforma a informação em argumento.
 */
export function ComQuemVoceFala() {
  return (
    <Secao className="band">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow eyebrow-red">Com quem você vai falar</p>
            <h2 className="mt-4 text-2xl sm:text-3xl">
              Já fomos grandes. Hoje somos dois.
            </h2>
          </div>

          <div className="space-y-4 text-ink-2">
            <p>
              A Tower teve prédio grande, equipe de vendas externas, motorista e técnico
              de segurança próprio. Hoje somos o Helano e a Cristina, os mesmos que
              abriram a empresa em {empresa.fundacao}.
            </p>
            <p>
              Dizemos isso na primeira página porque é melhor você saber antes: aqui não
              existe intermediário, não existe vendedor trabalhando por comissão e não
              existe fila de atendimento. Quem responde a sua mensagem é um dos dois
              donos.
            </p>
            <p>
              O Helano é técnico de segurança do trabalho. Antes de {empresa.fundacao},
              o trabalho dele era entrar nas empresas, entender a atividade e treinar as
              pessoas para usar o equipamento certo.
            </p>
            <p className="font-display text-lg font-bold text-ink">
              Tem cliente que compra com a gente desde os anos 90. Uma indústria têxtil
              do Ceará atravessou todas essas fases com a Tower — e continua comprando.
            </p>
          </div>
        </div>
      </div>
    </Secao>
  )
}
