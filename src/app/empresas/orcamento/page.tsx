import type { Metadata } from 'next'
import { Trilha, CabecalhoPagina, Secao } from '@/components/Blocos'
import { FormularioOrcamento } from '@/components/FormularioOrcamento'
import { ComQuemVoceFala } from '@/components/BlocosB2B'

export const metadata: Metadata = {
  title: 'Solicitar orçamento de EPI',
  description:
    'Cinco campos e a mensagem vai pronta para o WhatsApp. Sem cadastro, sem CNPJ, sem e-mail. Orçamento de EPI para equipes em Fortaleza e no Ceará.',
  alternates: { canonical: '/empresas/orcamento/' },
}

export default function Orcamento() {
  return (
    <>
      <Trilha
        itens={[
          { nome: 'Empresas', url: '/empresas/' },
          { nome: 'Orçamento', url: '/empresas/orcamento/' },
        ]}
      />
      <CabecalhoPagina
        rotulo="Empresas"
        titulo="Solicitar orçamento"
        resumo="Cinco campos. Nenhum deles é cadastro: cada um existe porque muda a nossa resposta. No final, a mensagem vai pronta para o WhatsApp — você revisa antes de enviar."
      />

      <Secao className="wrap pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <FormularioOrcamento />

          <aside className="space-y-6">
            <div className="border border-rule bg-paper-2 p-6">
              <p className="eyebrow">Por que não pedimos mais dados</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
                Não pedimos CNPJ, razão social, endereço nem e-mail para começar. Nada
                disso muda a resposta que a gente vai te dar — e formulário longo só
                atrasa quem tem pressa.
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
                Os dados cadastrais entram depois, se o pedido for fechado.
              </p>
            </div>

            <div className="border border-rule p-6">
              <p className="eyebrow">O que acontece depois</p>
              <ol className="mt-4 space-y-3 text-[0.95rem] text-ink-2">
                <li className="flex gap-3">
                  <span className="numeral text-tower-red">1</span>
                  <span>A mensagem abre no seu WhatsApp, já escrita. Você revisa e envia.</span>
                </li>
                <li className="flex gap-3">
                  <span className="numeral text-tower-red">2</span>
                  <span>Quem responde é o Helano ou a Cristina. Não há intermediário.</span>
                </li>
                <li className="flex gap-3">
                  <span className="numeral text-tower-red">3</span>
                  <span>
                    Se faltar alguma informação para indicar com segurança, a gente
                    pergunta antes de orçar.
                  </span>
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </Secao>

      <ComQuemVoceFala />
    </>
  )
}
