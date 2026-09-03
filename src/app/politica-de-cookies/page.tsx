import type { Metadata } from 'next'
import Link from 'next/link'
import { Trilha, CabecalhoPagina, SumarioLegal, Secao } from '@/components/Blocos'

/**
 * Política de cookies.
 *
 * A página existe justamente porque a resposta é "nenhum". Medido em
 * navegador real, em oito rotas: zero cookies, zero requisições a terceiros,
 * localStorage e sessionStorage vazios.
 *
 * NÃO EXISTE BANNER DE CONSENTIMENTO NESTE SITE, e isso é decisão, não
 * esquecimento: pedir autorização para cookies que não existem é encenação de
 * conformidade. O dia em que entrar GA4, GTM ou pixel, o banner passa a ser
 * necessário — e a tabela abaixo, que hoje está vazia de propósito, precisa
 * ser preenchida com nome, fornecedor, finalidade e duração reais.
 */
export const metadata: Metadata = {
  title: 'Política de cookies',
  description:
    'Este site não utiliza cookies — nem de análise, nem de marketing. Veja o que foi medido, por que não há banner de consentimento e o que muda se isso mudar.',
  alternates: { canonical: '/politica-de-cookies/' },
}

const SECOES = [
  { id: 'resposta', rotulo: 'A resposta curta' },
  { id: 'oque', rotulo: 'O que são cookies' },
  { id: 'medido', rotulo: 'O que foi medido' },
  { id: 'banner', rotulo: 'Por que não há banner' },
  { id: 'categorias', rotulo: 'As categorias, para referência' },
  { id: 'mudar', rotulo: 'Se isso mudar' },
  { id: 'navegador', rotulo: 'Controle no seu navegador' },
]

export default function PoliticaCookies() {
  return (
    <>
      <Trilha itens={[{ nome: 'Política de cookies', url: '/politica-de-cookies/' }]} />
      <CabecalhoPagina
        rotulo="Privacidade"
        titulo="Política de cookies"
        resumo="Este site não utiliza cookies. Esta página explica como isso foi verificado, por que não existe banner de consentimento e o que mudaria se um dia passasse a usar."
      />

      <Secao className="wrap pt-0">
        <div className="prose-tower min-w-0 max-w-2xl">
          <SumarioLegal itens={SECOES} />

          <h2 id="resposta">A resposta curta</h2>
          <p>
            <strong>Nenhum cookie é criado por este site.</strong> Nem próprio, nem de
            terceiro. Nem necessário, nem de análise, nem de marketing. O site também não
            usa armazenamento local do navegador para identificar você.
          </p>

          <h2 id="oque">O que são cookies</h2>
          <p>
            Cookies são pequenos arquivos que um site guarda no seu navegador para
            reconhecer o dispositivo em visitas seguintes. Servem para coisas legítimas —
            manter você logado, lembrar um idioma — e também para medir audiência e montar
            perfil de publicidade. É por isso que a legislação de privacidade se preocupa
            com eles.
          </p>

          <h2 id="medido">O que foi medido</h2>
          <p>
            Em setembro de 2026, oito páginas do site foram abertas em navegador real, com
            os recursos carregados até o fim, e o resultado foi registrado:
          </p>
          <table>
            <thead>
              <tr>
                <th>O que foi verificado</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cookies gravados</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Hosts de terceiros contatados</td>
                <td>0</td>
              </tr>
              <tr>
                <td>localStorage e sessionStorage</td>
                <td>Vazios</td>
              </tr>
              <tr>
                <td>Google Analytics, Tag Manager, pixel</td>
                <td>Não instalados</td>
              </tr>
              <tr>
                <td>Fontes, mapas, vídeos ou chats externos</td>
                <td>Nenhum. As fontes são servidas pelo próprio site</td>
              </tr>
            </tbody>
          </table>
          <p>
            A verificação é repetível: está no repositório do projeto e roda a cada
            mudança relevante.
          </p>

          <h2 id="banner">Por que não há banner</h2>
          <p>
            Porque não haveria o que consentir. Um banner que pergunta se você aceita
            cookies num site que não usa cookies não protege ninguém — só treina as pessoas
            a clicar em &ldquo;aceitar&rdquo; sem ler, e ocupa a tela no celular.
          </p>
          <p>
            Se e quando o site passar a usar medição de audiência ou marketing, o banner
            entra <strong>antes</strong> da ferramenta, com as três opções que ele deve ter
            — aceitar, recusar e configurar — no mesmo peso visual, sem caixa pré-marcada.
          </p>

          <h2 id="categorias">As categorias, para referência</h2>
          <p>
            Nenhuma delas está em uso hoje. A lista fica aqui porque é o vocabulário que
            você vai encontrar em outros sites, e porque é o critério que a Tower vai
            aplicar caso passe a usar:
          </p>
          <ul>
            <li>
              <strong>Necessários</strong> — indispensáveis para o site funcionar. Não
              dependem de consentimento.
            </li>
            <li>
              <strong>Preferência</strong> — lembram escolhas suas, como idioma. Dependem
              de consentimento na maioria das leituras.
            </li>
            <li>
              <strong>Análise</strong> — medem uso e audiência. Dependem de consentimento.
            </li>
            <li>
              <strong>Marketing</strong> — servem a publicidade e remarketing. Dependem de
              consentimento, e só entram com o consentimento registrado.
            </li>
          </ul>

          <h2 id="mudar">Se isso mudar</h2>
          <p>
            A Tower tem interesse legítimo em saber quais conteúdos geram conversa — e pode
            vir a instalar uma ferramenta de medição. Se isso acontecer, três coisas
            mudam ao mesmo tempo, e antes da ferramenta ir ao ar: esta página passa a ter a
            tabela de cookies com nome, fornecedor, finalidade e duração; a{' '}
            <Link href="/politica-de-privacidade/">política de privacidade</Link> passa a
            descrever o tratamento; e o banner de consentimento aparece.
          </p>

          <h2 id="navegador">Controle no seu navegador</h2>
          <p>
            Independentemente deste site, todo navegador permite bloquear e apagar cookies
            nas configurações de privacidade. Como aqui não há nenhum, bloquear não muda
            nada na sua navegação.
          </p>

          <p className="text-sm text-ink-3">
            Última atualização: setembro de 2026. Veja também a{' '}
            <Link href="/politica-de-privacidade/">política de privacidade</Link> e os{' '}
            <Link href="/termos-de-uso/">termos de uso</Link>.
          </p>
        </div>
      </Secao>
    </>
  )
}
