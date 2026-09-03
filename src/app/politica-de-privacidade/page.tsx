import type { Metadata } from 'next'
import Link from 'next/link'
import { Trilha, CabecalhoPagina, SumarioLegal, Secao } from '@/components/Blocos'
import { empresa } from '@/config/empresa'
import { AvisoMedicaoInativa } from '@/components/AvisoMedicao'

/**
 * Política de privacidade.
 *
 * ESCRITA A PARTIR DE MEDIÇÃO, NÃO DE MODELO. Uma versão antiga afirmava que
 * o site usava "ferramenta de análise de audiência" quando não usava. Depois
 * veio uma versão que afirmava não usar nenhuma — correta na época. Hoje o
 * site usa Google Analytics 4, condicionado a aceite, e esta página foi
 * atualizada ANTES de a ferramenta ir ao ar, como as duas versões anteriores
 * prometiam que aconteceria.
 *
 * REGRA DE MANUTENÇÃO: qualquer ferramenta nova — GTM, pixel, mapa, chat,
 * reCAPTCHA — entra nesta página, na tabela de /politica-de-cookies/ e na
 * versão do consentimento em lib/consentimento.ts ANTES de ir ao ar. A
 * verificação que sustenta os números está em
 * docs/ferramentas/qa-privacidade.mjs e roda as duas trilhas, com e sem
 * aceite.
 */
export const metadata: Metadata = {
  title: 'Política de privacidade',
  description:
    'O site só grava cookie de análise depois que você aceita, não tem cadastro e não guarda o que você escreve no formulário. Veja o que é tratado, por quê, e como exercer seus direitos.',
  alternates: { canonical: '/politica-de-privacidade/' },
}

const SECOES = [
  { id: 'resumo', rotulo: 'O resumo honesto' },
  { id: 'quem', rotulo: 'Quem é o responsável' },
  { id: 'dados', rotulo: 'Que dados são tratados' },
  { id: 'finalidades', rotulo: 'Para que servem' },
  { id: 'bases', rotulo: 'Bases legais' },
  { id: 'cookies', rotulo: 'Cookies' },
  { id: 'terceiros', rotulo: 'Quem mais recebe dados' },
  { id: 'internacional', rotulo: 'Fora do Brasil' },
  { id: 'retencao', rotulo: 'Por quanto tempo' },
  { id: 'seguranca', rotulo: 'Segurança' },
  { id: 'direitos', rotulo: 'Seus direitos' },
  { id: 'exercer', rotulo: 'Como exercer' },
  { id: 'menores', rotulo: 'Crianças e adolescentes' },
  { id: 'alteracoes', rotulo: 'Alterações' },
]

export default function Privacidade() {
  return (
    <>
      <Trilha itens={[{ nome: 'Política de privacidade', url: '/politica-de-privacidade/' }]} />
      <CabecalhoPagina
        rotulo="Privacidade"
        titulo="Política de privacidade"
        resumo="O site não tem cadastro, não guarda o que você escreve no formulário e só grava cookie de medição se você aceitar. Abaixo está o que realmente acontece com os seus dados."
      />

      <Secao className="wrap pt-0">
        <div className="prose-tower min-w-0 max-w-2xl">
          <SumarioLegal itens={SECOES} />

          <h2 id="resumo">O resumo honesto</h2>
          <p>
            A maior parte das políticas de privacidade descreve coisas que o site não faz.
            Esta descreve o que ele faz, e o que ele deixa de fazer é curto de listar:
          </p>
          <ul>
            <li>
              <strong>Só usa cookie se você aceitar.</strong> São dois, os do Google
              Analytics, e servem para medir audiência. Enquanto você não responder ao
              banner, e para sempre se você recusar, não há cookie nenhum — nem de
              marketing, nem de preferência.
            </li>
            <li>
              <strong>Não carrega nada de terceiros antes do seu aceite.</strong> Não há
              Google Tag Manager, pixel de rede social, mapa incorporado, chat, reCAPTCHA
              nem fonte externa em momento nenhum. As fontes são servidas pelo próprio
              site. O único terceiro é o Google Analytics, e ele só é baixado depois do
              &ldquo;Aceitar&rdquo;.
            </li>
            <li>
              <strong>Não tem cadastro, login nem newsletter.</strong>
            </li>
            <li>
              <strong>Não guarda o que você escreve.</strong> O construtor de orçamento
              monta a mensagem no seu próprio navegador. Nada é enviado para servidor nosso
              — nem quando você preenche, nem quando desiste.
            </li>
          </ul>
          <p>
            Isso foi verificado em navegador, em oito páginas do site, e não é promessa: se
            um dia mudar, esta página muda junto e a data lá embaixo muda também.
          </p>

          <h2 id="quem">Quem é o responsável</h2>
          <p>
            {empresa.nomeCompleto}, distribuidora de equipamentos de proteção individual em
            Fortaleza, Ceará, em atividade desde {empresa.fundacao}. O site é{' '}
            {empresa.site}.
          </p>
          <p>
            <strong>[INFORMAÇÃO NECESSÁRIA]</strong> — razão social e CNPJ ainda não foram
            informados para publicação. A identificação completa do controlador precisa
            constar aqui, e este parágrafo deve ser substituído por ela.
          </p>

          <h2 id="dados">Que dados são tratados</h2>
          <h3>O que você digita</h3>
          <p>
            No construtor de orçamento você pode informar o que precisa, quantidades,
            numeração, cidade, prazo e, se quiser, nome e empresa. <strong>Esses campos
            não são enviados a nenhum servidor da Tower.</strong> Eles servem só para
            montar, no seu navegador, a mensagem que abre no WhatsApp. Se você fechar a
            página sem enviar, nada resta.
          </p>
          <p>
            Nome e empresa são opcionais. Se preferir não identificar a empresa, o
            orçamento sai do mesmo jeito.
          </p>

          <h3>O que você escolhe na ferramenta de orientação</h3>
          <p>
            As respostas das quatro perguntas de{' '}
            <Link href="/encontrar-epi/">Encontrar EPI</Link> ficam apenas na memória da
            página enquanto ela está aberta. Não são gravadas nem transmitidas.
          </p>

          <h3>O que o servidor registra sozinho</h3>
          <p>
            Como qualquer site, este é servido por uma infraestrutura de hospedagem que
            registra dados técnicos das requisições — endereço IP, data e hora, página
            solicitada, tipo de navegador. Esse registro é do provedor de hospedagem, tem
            finalidade de operação e segurança, e a Tower não o usa para identificar
            visitantes nem para montar perfil.
          </p>

          <h3>O que a conversa no WhatsApp cria</h3>
          <p>
            Quando você clica em um botão de WhatsApp, passa a existir uma conversa: o seu
            número de telefone, o nome do seu perfil e o conteúdo do que vocês trocarem. É
            aí que os seus dados de contato realmente chegam à Tower — e é o único ponto
            do site em que isso acontece.
          </p>

          <h2 id="finalidades">Para que servem</h2>
          <ul>
            <li>
              <strong>Responder o seu contato e montar orçamento.</strong> É a finalidade
              principal, e praticamente a única.
            </li>
            <li>
              <strong>Continuar o atendimento comercial</strong> — acompanhar um pedido,
              tirar dúvida sobre item entregue, fazer reposição.
            </li>
            <li>
              <strong>Operar e proteger o site</strong>, no que depende dos registros
              técnicos do provedor de hospedagem.
            </li>
            <li>
              <strong>Cumprir obrigação legal</strong>, quando a lei exigir guardar
              documento fiscal ou informação de uma venda.
            </li>
          </ul>
          <p>
            Não fazemos publicidade comportamental, não vendemos base de contatos e não
            enviamos e-mail marketing — não temos lista de e-mail.
          </p>

          <h2 id="bases">Bases legais</h2>
          <p>
            A LGPD exige que todo tratamento tenha uma base legal. As que se aplicam aqui,
            na nossa leitura:
          </p>
          <ul>
            <li>
              <strong>Procedimentos preliminares relacionados a contrato</strong> — quando
              você pede um orçamento, o tratamento dos dados dessa conversa existe para
              atender ao seu próprio pedido.
            </li>
            <li>
              <strong>Execução de contrato</strong> — quando a conversa vira uma compra.
            </li>
            <li>
              <strong>Cumprimento de obrigação legal ou regulatória</strong> — guarda de
              documentos fiscais e afins.
            </li>
            <li>
              <strong>Legítimo interesse</strong> — registros técnicos de segurança e
              operação do site, que são os menos invasivos possíveis e não servem para
              perfilar ninguém.
            </li>
            <li>
              <strong>Consentimento</strong> — a medição de audiência, e só ela.
            </li>
          </ul>
          <p>
            A medição é o único tratamento deste site que depende de você autorizar. O
            pedido é destacado e específico, não vem embutido em nenhum outro aceite, e
            pode ser retirado a qualquer momento na{' '}
            <Link href="/politica-de-cookies/">política de cookies</Link>, com o mesmo
            número de cliques que custou dar. Retirar não afeta o que foi tratado
            licitamente antes.
          </p>
          <p>
            A Tower <strong>não</strong> apoia a medição em legítimo interesse, que seria
            o caminho para não precisar perguntar. A leitura do Guia Orientativo sobre
            Cookies da ANPD é a de que cookie não essencial depende de consentimento, e
            entre a leitura mais confortável e a mais protetiva a escolha aqui é a
            segunda.
          </p>
          <p className="text-sm">
            A classificação definitiva das bases legais é matéria jurídica e deve ser
            validada por profissional da área antes de ser tratada como definitiva.
          </p>

          <h2 id="cookies">Cookies e medição de audiência</h2>
          <AvisoMedicaoInativa />
          <p>
            O site usa <strong>Google Analytics 4</strong> para medir audiência —{' '}
            <strong>e só depois de você aceitar</strong>. Enquanto você não responder ao
            banner, e para sempre se você recusar, nenhum cookie é gravado e o script do
            Google não chega a ser baixado.
          </p>
          <p>
            A finalidade é uma só: saber quais conteúdos deste site levam a uma conversa
            útil, para escrever mais dos que ajudam. Não há publicidade, remarketing,
            pixel de rede social nem venda de dados, e o armazenamento de publicidade
            permanece negado mesmo para quem aceita.
          </p>
          <p>
            Os dados que o Google recebe são de comportamento no site — páginas vistas,
            origem da visita, cliques nos botões de WhatsApp, tipo de dispositivo,
            localização aproximada derivada do IP. <strong>Nada do que você digita no
            construtor de orçamento é enviado</strong> junto: os eventos registram que um
            botão foi usado e em que página, nunca o conteúdo dos campos.
          </p>
          <p>
            A tabela completa, com nome, duração e finalidade de cada cookie, está na{' '}
            <Link href="/politica-de-cookies/">política de cookies</Link> — junto com o
            controle para mudar a sua escolha a qualquer momento.
          </p>

          <h2 id="terceiros">Quem mais recebe dados</h2>
          <table>
            <thead>
              <tr>
                <th>Quem</th>
                <th>O que recebe</th>
                <th>Por quê</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Provedor de hospedagem (Vercel)</td>
                <td>Dados técnicos da requisição, incluindo IP</td>
                <td>Servir as páginas e manter o site no ar</td>
              </tr>
              <tr>
                <td>WhatsApp (Meta)</td>
                <td>Seu número, seu perfil e o conteúdo da conversa</td>
                <td>É o aplicativo onde o atendimento acontece</td>
              </tr>
              <tr>
                <td>Google (Analytics 4)</td>
                <td>
                  Comportamento no site e IP — <strong>apenas se você aceitar</strong>
                </td>
                <td>Medir quais conteúdos geram conversa</td>
              </tr>
            </tbody>
          </table>
          <p>
            É a lista inteira. Não há CRM, não há plataforma de automação, não há gateway
            de pagamento — o site não vende online — e a única ferramenta de análise é a
            que está na linha do Google, condicionada ao seu aceite.
          </p>
          <p>
            Ao abrir o WhatsApp você entra em um serviço de terceiro, com política de
            privacidade própria, sobre a qual a Tower não tem controle.
          </p>

          <h2 id="internacional">Fora do Brasil</h2>
          <p>
            A hospedagem do site, o WhatsApp e o Google Analytics são serviços de empresas
            estrangeiras, e o tratamento pode ocorrer em servidores fora do Brasil —
            inclusive nos Estados Unidos. A LGPD admite transferência internacional em
            hipóteses específicas, e a adequação dessa transferência depende dos termos de
            cada fornecedor.
          </p>
          <p>
            No caso do Google Analytics, essa transferência só acontece se você aceitar a
            medição — e deixa de acontecer a partir do momento em que você recusar.
          </p>
          <p className="text-sm">
            <strong>[VALIDAÇÃO JURÍDICA]</strong> — a hipótese legal aplicável a essas
            transferências e a redação desta seção devem ser conferidas por profissional
            da área.
          </p>

          <h2 id="retencao">Por quanto tempo</h2>
          <ul>
            <li>
              <strong>Formulário do site:</strong> nada é guardado. O dado deixa de existir
              quando você fecha a página.
            </li>
            <li>
              <strong>Conversa de WhatsApp:</strong> permanece no aparelho e na conta de
              quem atende, pelo tempo em que for útil ao relacionamento comercial. Você
              pode pedir a exclusão.
            </li>
            <li>
              <strong>Documentos de uma venda:</strong> pelo prazo que a legislação fiscal
              e comercial exigir.
            </li>
            <li>
              <strong>Registros técnicos do provedor:</strong> pelo prazo definido por ele,
              que não é controlado pela Tower.
            </li>
          </ul>

          <h2 id="seguranca">Segurança</h2>
          <p>
            O site é servido apenas por conexão criptografada (HTTPS), não tem área
            administrativa exposta, não tem banco de dados de visitantes e envia cabeçalhos
            de segurança que reduzem tipos comuns de abuso. A superfície de risco é pequena
            porque a quantidade de dado tratado é pequena.
          </p>
          <p>
            Nenhum sistema é imune a incidentes, e nós não prometemos segurança absoluta.
            Se ocorrer um incidente com risco relevante aos titulares, a LGPD prevê
            comunicação à autoridade e às pessoas afetadas.
          </p>

          <h2 id="direitos">Seus direitos</h2>
          <p>A LGPD garante a você, sobre os seus dados pessoais:</p>
          <ul>
            <li>confirmação de que existe tratamento;</li>
            <li>acesso aos dados;</li>
            <li>correção de dado incompleto, inexato ou desatualizado;</li>
            <li>anonimização, bloqueio ou eliminação de dado desnecessário ou excessivo;</li>
            <li>portabilidade, nos termos da regulamentação;</li>
            <li>eliminação de dado tratado com base em consentimento;</li>
            <li>informação sobre com quem os dados foram compartilhados;</li>
            <li>informação sobre a possibilidade de não consentir, e o que isso implica;</li>
            <li>revogação do consentimento, quando ele for a base do tratamento;</li>
            <li>oposição a tratamento feito com dispensa de consentimento;</li>
            <li>revisão de decisões automatizadas — que este site não toma.</li>
          </ul>

          <h2 id="exercer">Como exercer</h2>
          <p>
            Pelo WhatsApp {empresa.whatsapp.exibicao}, dizendo o que você quer. O pedido é
            recebido por um dos dois sócios — a empresa tem duas pessoas, e não há
            intermediário.
          </p>
          <p>
            O que acontece depois: confirmamos o recebimento, verificamos se conseguimos
            identificar você com segurança e respondemos. Quando o pedido for de exclusão,
            apagamos o que estiver sob nosso controle e explicamos o que precisar ser
            mantido por obrigação legal.
          </p>
          <p>
            <strong>[INFORMAÇÃO NECESSÁRIA]</strong> — recomendamos criar um e-mail no
            domínio para servir de canal de privacidade, e indicar formalmente quem
            responde por proteção de dados na empresa. Enquanto isso não existe, o WhatsApp
            acima é o canal, e ele é real: é onde a Tower atende todos os dias.
          </p>

          <h2 id="menores">Crianças e adolescentes</h2>
          <p>
            Este site é dirigido a empresas e a profissionais, e não coleta dados de
            crianças ou adolescentes de forma intencional.
          </p>

          <h2 id="alteracoes">Alterações</h2>
          <p>
            Esta política pode mudar — principalmente se o site passar a usar alguma
            ferramenta de medição. Quando isso acontecer, a mudança aparece aqui antes de a
            ferramenta entrar no ar, e a data abaixo é atualizada.
          </p>

          <p className="text-sm text-ink-3">
            Última atualização: setembro de 2026. Veja também a{' '}
            <Link href="/politica-de-cookies/">política de cookies</Link> e os{' '}
            <Link href="/termos-de-uso/">termos de uso</Link>.
          </p>
        </div>
      </Secao>
    </>
  )
}
