import type { Metadata } from 'next'
import { Trilha, CabecalhoPagina, Secao } from '@/components/Blocos'
import { empresa } from '@/config/empresa'

export const metadata: Metadata = {
  title: 'Política de privacidade',
  description: 'Este site não tem cadastro, não pede e-mail e não guarda o que você escreve no formulário. O que é coletado, como o WhatsApp entra e como falar com a gente.',
  alternates: { canonical: '/politica-de-privacidade/' },
  robots: { index: false, follow: true },
}

export default function Privacidade() {
  return (
    <>
      <Trilha itens={[{ nome: 'Política de privacidade', url: '/politica-de-privacidade/' }]} />
      <CabecalhoPagina
        rotulo="Privacidade"
        titulo="Política de privacidade"
        resumo="Em resumo: este site não tem cadastro, não pede e-mail e não guarda o que você escreve no formulário."
      />

      <Secao className="wrap pt-0">
        <div className="prose-tower max-w-2xl">
          <h2>O que este site não faz</h2>
          <ul>
            <li>Não possui área de cadastro ou login.</li>
            <li>Não solicita e-mail, CPF, CNPJ ou dados de pagamento.</li>
            <li>
              Não armazena o conteúdo do formulário de orçamento. Os campos preenchidos
              servem apenas para montar, no seu próprio navegador, a mensagem que será
              aberta no WhatsApp. Nada é enviado para um servidor nosso.
            </li>
          </ul>

          <h2>Dados de navegação</h2>
          <p>
            Utilizamos ferramenta de análise de audiência para entender quais conteúdos são
            mais úteis — por exemplo, de quais páginas partem mais conversas no WhatsApp.
            São dados agregados de navegação, como páginas visitadas e cliques em botões.
            Não usamos essas informações para identificar você pessoalmente.
          </p>

          <h2>WhatsApp</h2>
          <p>
            Ao clicar em um botão de WhatsApp, você é levado ao aplicativo com uma mensagem
            já escrita, que você pode revisar e editar antes de enviar. A conversa passa a
            ocorrer no WhatsApp e fica sujeita à política de privacidade daquele serviço.
          </p>

          <h2>Links externos</h2>
          <p>
            Este site contém links para fontes oficiais e para sites de fabricantes. Não
            somos responsáveis pelo conteúdo nem pelas práticas de privacidade desses
            sites.
          </p>

          <h2>Seus direitos e contato</h2>
          <p>
            Se você tiver qualquer dúvida sobre o tratamento de dados, ou quiser solicitar
            informação a respeito, fale com a gente pelo WhatsApp{' '}
            {empresa.whatsapp.exibicao}.
          </p>

          <p className="text-sm text-ink-3">Atualizada em agosto de 2026.</p>
        </div>
      </Secao>
    </>
  )
}
