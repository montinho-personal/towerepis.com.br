import type { Metadata } from 'next'
import Link from 'next/link'
import { ARTIGOS } from '@/content/artigos'
import { Trilha, CabecalhoPagina, Secao } from '@/components/Blocos'
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

      <Secao className="wrap">
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
