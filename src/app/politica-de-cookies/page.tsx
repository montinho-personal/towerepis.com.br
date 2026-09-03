import type { Metadata } from 'next'
import Link from 'next/link'
import { Trilha, CabecalhoPagina, SumarioLegal, Secao } from '@/components/Blocos'
import { ControleConsentimento } from '@/components/ControleConsentimento'
import { AvisoMedicaoInativa } from '@/components/AvisoMedicao'

/**
 * Política de cookies.
 *
 * A VERSÃO ANTERIOR DESTA PÁGINA DIZIA "nenhum", e estava certa na época. O
 * site passou a usar Google Analytics 4, e esta página mudou junto — antes de
 * a ferramenta ir ao ar, como a própria página prometia que aconteceria.
 *
 * O QUE NÃO MUDOU: continua não havendo cookie para quem não aceita. O
 * gtag.js não é sequer baixado antes do aceite, então quem recusa ou ignora o
 * banner navega no site exatamente como antes — zero cookie, zero host de
 * terceiro. Isso é medido em docs/ferramentas/qa-privacidade.mjs, que roda as
 * três trilhas: sem responder, depois de recusar e depois de aceitar.
 *
 * A tabela abaixo precisa acompanhar a realidade. Se alguém acrescentar GTM,
 * pixel, mapa incorporado ou chat, a linha entra aqui ANTES de a ferramenta
 * ir ao ar, e a versão do consentimento sobe em lib/consentimento.ts para
 * reperguntar.
 */
export const metadata: Metadata = {
  title: 'Política de cookies',
  description:
    'Este site só usa cookie de análise, e só depois de você aceitar. Veja a tabela completa, o que foi medido antes e depois do aceite, e mude a sua escolha aqui.',
  alternates: { canonical: '/politica-de-cookies/' },
}

const SECOES = [
  { id: 'resposta', rotulo: 'A resposta curta' },
  { id: 'escolha', rotulo: 'Mudar a sua escolha' },
  { id: 'oque', rotulo: 'O que são cookies' },
  { id: 'tabela', rotulo: 'A tabela completa' },
  { id: 'registro', rotulo: 'O registro da sua resposta' },
  { id: 'antes', rotulo: 'O que acontece antes de você responder' },
  { id: 'banner', rotulo: 'Como o banner foi construído' },
  { id: 'medido', rotulo: 'O que foi medido' },
  { id: 'navegador', rotulo: 'Controle no seu navegador' },
]

export default function PoliticaCookies() {
  return (
    <>
      <Trilha itens={[{ nome: 'Política de cookies', url: '/politica-de-cookies/' }]} />
      <CabecalhoPagina
        rotulo="Privacidade"
        titulo="Política de cookies"
        resumo="Este site usa um único tipo de cookie — o de medição de audiência — e só depois de você aceitar. Antes disso, e para sempre se você recusar, nada é gravado no seu navegador."
      />

      <Secao className="wrap pt-0">
        <div className="prose-tower min-w-0 max-w-2xl">
          <SumarioLegal itens={SECOES} />

          <AvisoMedicaoInativa />

          <h2 id="resposta">A resposta curta</h2>
          <p>
            <strong>Se você não aceitou, não há cookie nenhum.</strong> Nem próprio, nem
            de terceiro — e o script do Google não chega a ser baixado. Se você aceitou,
            existem dois cookies do Google Analytics, e só eles.
          </p>
          <p>
            Não há cookie de marketing, remarketing, pixel de rede social nem venda de
            dados. Isso não é uma promessa de intenção: mesmo para quem aceita, o
            armazenamento de publicidade continua negado no código.
          </p>

          <h2 id="escolha">Mudar a sua escolha</h2>
          <p>
            Você pode mudar de ideia aqui, agora, sem pedir nada a ninguém — retirar o
            consentimento tem de ser tão fácil quanto dar.
          </p>
          <ControleConsentimento />

          <h2 id="oque">O que são cookies</h2>
          <p>
            Cookies são pequenos arquivos que um site guarda no seu navegador para
            reconhecer o dispositivo em visitas seguintes. Servem para coisas legítimas —
            manter você logado, lembrar um idioma — e também para medir audiência e montar
            perfil de publicidade. É por isso que a legislação de privacidade se preocupa
            com eles.
          </p>

          <h2 id="tabela">A tabela completa</h2>
          <p>
            Estes são todos os cookies que este site pode criar. Os dois primeiros só
            existem depois do seu aceite.
          </p>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quem cria</th>
                <th>Para quê</th>
                <th>Dura</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>_ga</code>
                </td>
                <td>Google Analytics 4</td>
                <td>
                  Distinguir um visitante de outro, para contar visitas em vez de contar
                  cliques
                </td>
                <td>2 anos</td>
              </tr>
              <tr>
                <td>
                  <code>_ga_&lt;id&gt;</code>
                </td>
                <td>Google Analytics 4</td>
                <td>Manter o estado da sessão desta propriedade</td>
                <td>2 anos</td>
              </tr>
            </tbody>
          </table>
          <p>
            Categoria de ambos: <strong>análise</strong>. Nenhum é necessário para o site
            funcionar, e é por isso que dependem do seu aceite.
          </p>

          <h2 id="registro">O registro da sua resposta</h2>
          <p>
            Uma coisa é guardada mesmo se você recusar: <strong>a sua resposta</strong>.
            Ela fica em <code>localStorage</code>, com a chave{' '}
            <code>tower-consentimento</code>, no seu próprio navegador. Não é cookie, não
            vai para servidor nenhum e não identifica você — guarda só se foi
            &ldquo;aceito&rdquo; ou &ldquo;recusado&rdquo;, a data e a versão da pergunta.
          </p>
          <p>
            Ela existe justamente para respeitar a sua escolha: sem esse registro, o site
            perguntaria de novo a cada página, o que seria pior para quem recusou. O botão{' '}
            <em>Apagar minha resposta</em>, acima, remove esse registro — e aí o banner
            volta a perguntar.
          </p>

          <h2 id="antes">O que acontece antes de você responder</h2>
          <p>
            Nada. Essa é a diferença entre este site e a maior parte dos sites que exibem
            um banner.
          </p>
          <p>
            O Google oferece um modo — o Consent Mode — em que a ferramenta carrega desde
            o primeiro segundo, sem gravar cookie, mas ainda enviando sinal para o Google
            estimar o comportamento de quem não aceitou. É legítimo e é o caminho mais
            comum. <strong>A Tower não usa esse caminho.</strong> Aqui o script do Google
            só é baixado depois do &ldquo;Aceitar&rdquo;.
          </p>
          <p>
            O custo dessa escolha é real e fica declarado: os relatórios da Tower enxergam
            apenas quem aceitou, sem estimativa para o restante. Em troca, a frase
            &ldquo;este site não contata nenhum host de terceiro&rdquo; continua verdadeira
            para quem não deu consentimento.
          </p>

          <h2 id="banner">Como o banner foi construído</h2>
          <ul>
            <li>
              <strong>Aceitar e Recusar são o mesmo botão</strong> — mesmo tamanho, mesma
              cor, mesma área de toque. Não existe recusa escondida em texto cinza.
            </li>
            <li>
              <strong>Nenhuma caixa vem pré-marcada.</strong>
            </li>
            <li>
              <strong>Não dá para fechar sem responder</strong>, e ignorar não vale como
              aceite — sem escolha, nada carrega.
            </li>
            <li>
              <strong>O banner não bloqueia a leitura</strong> do site. Você pode ler tudo
              sem responder.
            </li>
            <li>
              <strong>A pergunta volta se a finalidade mudar.</strong> Um consentimento
              dado para medição de audiência não cobre uma finalidade nova.
            </li>
          </ul>

          <h2 id="medido">O que foi medido</h2>
          <p>
            A verificação roda as duas trilhas em navegador real, com os recursos
            carregados até o fim:
          </p>
          <table>
            <thead>
              <tr>
                <th>Situação</th>
                <th>Cookies</th>
                <th>Hosts de terceiros</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Antes de responder ao banner</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Depois de recusar</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Depois de aceitar</td>
                <td>
                  <code>_ga</code>, <code>_ga_&lt;id&gt;</code>
                </td>
                <td>Google (Tag Manager e Analytics)</td>
              </tr>
            </tbody>
          </table>
          <p>
            A verificação é repetível: está no repositório do projeto e roda a cada
            mudança relevante. As fontes do site continuam servidas pelo próprio domínio —
            não há Google Fonts, mapa incorporado, vídeo externo nem chat de terceiro em
            nenhuma das trilhas.
          </p>

          <h2 id="navegador">Controle no seu navegador</h2>
          <p>
            Independentemente deste site, todo navegador permite bloquear e apagar cookies
            nas configurações de privacidade. Bloquear cookies de terceiros ou usar uma
            extensão de bloqueio não quebra nada aqui: o site inteiro funciona sem
            medição.
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
