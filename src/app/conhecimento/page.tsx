import type { Metadata } from 'next'
import Link from 'next/link'
import { ARTIGOS } from '@/content/artigos'
import { Trilha, CabecalhoPagina, EmUmaFrase, OQueObservar, Secao } from '@/components/Blocos'
import { FechamentoCta } from '@/components/WhatsAppCta'

export const metadata: Metadata = {
  title: 'Central de conhecimento sobre EPI',
  description:
    'Textos sobre calçados profissionais, normas, CA e escolha de EPI. Escritos e revisados por técnico de segurança do trabalho, com fonte oficial citada.',
  alternates: { canonical: '/conhecimento/' },
}

export default function Conhecimento() {
  const clusters = [...new Set(ARTIGOS.map((a) => a.cluster))]

  return (
    <>
      <Trilha itens={[{ nome: 'Conhecimento', url: '/conhecimento/' }]} tom="escuro" />
      <CabecalhoPagina
        variante="ink"
        rotulo="Central de conhecimento"
        titulo="Antes de comprar, entenda"
        resumo="Textos que respondem as dúvidas que mais chegam no nosso WhatsApp. Todo conteúdo normativo cita fonte oficial e é revisado por técnico de segurança do trabalho."
      />

      <Secao className="wrap" ritmo="normal">
        <EmUmaFrase>
          Esta é a central de conhecimento da Tower EPI’s. Os textos respondem às dúvidas
          que mais chegam pelo WhatsApp da empresa, são escritos e revisados por técnico de
          segurança do trabalho, citam fonte oficial quando tratam de norma e trazem a data
          da última revisão. Nenhum deles existe para vender um produto específico.
        </EmUmaFrase>
      </Secao>

      {/* POLÍTICA EDITORIAL. Não é enfeite de E-E-A-T: é a única coisa nesta
          página que a concorrência de blog de distribuidora não consegue
          copiar, porque exige ter um técnico de segurança na empresa. */}
      <Secao className="band-ink">
        <div className="wrap">
          <OQueObservar
            tom="escuro"
            titulo="Como estes textos são feitos"
            itens={[
              {
                titulo: 'A pauta nasce de uma pergunta real',
                texto:
                  'Nenhum texto aqui foi escolhido por volume de busca. Cada um responde a uma dúvida que chegou mais de uma vez no WhatsApp da Tower — e é por isso que eles são específicos, e não panoramas gerais sobre segurança do trabalho.',
              },
              {
                titulo: 'Quem escreve conhece a operação',
                texto:
                  'A empresa é dos dois sócios, e um deles é técnico de segurança do trabalho desde 1995. O que está escrito vem de trinta anos entregando EPI, ouvindo a reclamação depois da entrega e voltando para trocar o que não funcionou.',
              },
              {
                titulo: 'Norma tem fonte, e a fonte fica visível',
                texto:
                  'Quando um texto afirma algo sobre NR-6, sobre Certificado de Aprovação ou sobre norma técnica, a fonte oficial aparece no rodapé do artigo, com link. Se não houver fonte que sustente, a frase não entra.',
              },
              {
                titulo: 'O que não fazemos aqui',
                texto:
                  'Não damos parecer jurídico, não substituímos a avaliação de riscos da sua empresa e não afirmamos que um EPI é obrigatório para a sua função sem conhecer o seu ambiente. Onde a resposta depende de análise técnica, o texto diz isso em vez de arriscar.',
              },
            ]}
          />
        </div>
      </Secao>

      <Secao className="wrap" ritmo="normal">
        <h2 className="text-2xl sm:text-3xl">Todos os textos</h2>
        <div className="mt-10">
        {clusters.map((cluster) => (
          <div key={cluster} className="mb-16 last:mb-0">
            <h2 className="eyebrow eyebrow-red">{cluster}</h2>
            <ul className="mt-6 border-t-2 border-ink">
              {ARTIGOS.filter((a) => a.cluster === cluster).map((a) => (
                <li key={a.slug} className="border-b border-rule">
                  <Link
                    href={`/conhecimento/${a.slug}/`}
                    className="group grid gap-2 py-7 sm:grid-cols-[1fr_auto] sm:gap-10"
                  >
                    <div>
                      <h3 className="font-display text-xl font-bold group-hover:text-tower-red sm:text-2xl">
                        {a.titulo}
                      </h3>
                      <p className="mt-2 max-w-2xl text-ink-2">{a.resumo}</p>
                    </div>
                    <p className="self-end whitespace-nowrap text-xs text-ink-3">
                      Revisado em {a.atualizadoExibicao}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        </div>
        <p className="mt-12 measure text-[0.95rem] leading-relaxed text-ink-2">
          Quem revisa é{' '}
          <Link href="/a-tower/helano/" className="underline underline-offset-4 hover:text-tower-red">
            Helano, técnico de segurança do trabalho
          </Link>
          , sócio da Tower desde 1995.
        </p>
      </Secao>

      <FechamentoCta
        contexto="artigo"
        secao="conhecimento-fechamento"
        titulo="Sua dúvida não está aqui?"
        texto="Pergunte. Se a pergunta se repetir, ela vira o próximo texto desta página — foi assim que escolhemos os que já estão publicados."
        rotulo="Perguntar no WhatsApp"
      />
    </>
  )
}
