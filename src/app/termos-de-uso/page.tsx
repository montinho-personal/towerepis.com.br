import type { Metadata } from 'next'
import Link from 'next/link'
import { Trilha, CabecalhoPagina, SumarioLegal, Secao } from '@/components/Blocos'
import { empresa } from '@/config/empresa'

/**
 * Termos de uso.
 *
 * O site não vende online, não tem cadastro e não tem área logada — então a
 * maior parte do que costuma entrar num termo de uso não se aplica aqui, e
 * incluir por hábito seria ruído. O que este documento precisa cobrir de
 * verdade é: o conteúdo é informativo e não substitui avaliação técnica; o
 * WhatsApp é de terceiro; e nada aqui é oferta com preço firme.
 *
 * Nenhuma cláusula tenta afastar direito de consumidor. Isso não é generosidade
 * — cláusula abusiva é nula, e escrever uma só serviria para dar impressão
 * errada a quem lê.
 */
export const metadata: Metadata = {
  title: 'Termos de uso',
  description:
    'As regras de uso do site da Tower EPI’s: finalidade informativa do conteúdo, orçamento sem compromisso, propriedade do material e limites de responsabilidade.',
  alternates: { canonical: '/termos-de-uso/' },
}

const SECOES = [
  { id: 'objetivo', rotulo: 'Para que este site serve' },
  { id: 'aceitacao', rotulo: 'Aceitação' },
  { id: 'conteudo', rotulo: 'O conteúdo é informativo' },
  { id: 'orcamento', rotulo: 'Orçamento e preço' },
  { id: 'whatsapp', rotulo: 'Atendimento por WhatsApp' },
  { id: 'propriedade', rotulo: 'Propriedade do material' },
  { id: 'permitido', rotulo: 'Uso permitido' },
  { id: 'proibido', rotulo: 'Uso proibido' },
  { id: 'disponibilidade', rotulo: 'Disponibilidade' },
  { id: 'externos', rotulo: 'Links externos' },
  { id: 'responsabilidade', rotulo: 'Responsabilidade' },
  { id: 'privacidade', rotulo: 'Privacidade' },
  { id: 'alteracoes', rotulo: 'Alterações' },
  { id: 'lei', rotulo: 'Lei aplicável e contato' },
]

export default function TermosDeUso() {
  return (
    <>
      <Trilha itens={[{ nome: 'Termos de uso', url: '/termos-de-uso/' }]} />
      <CabecalhoPagina
        rotulo="Termos"
        titulo="Termos de uso"
        resumo="Este site informa e encaminha para uma conversa. Não vende online, não tem cadastro e não emite preço automático — e é isso que estes termos organizam."
      />

      <Secao className="wrap pt-0">
        <div className="prose-tower min-w-0 max-w-2xl">
          <SumarioLegal itens={SECOES} />

          <h2 id="objetivo">Para que este site serve</h2>
          <p>
            {empresa.site} é o site institucional da {empresa.nome}, distribuidora de
            equipamentos de proteção individual em Fortaleza, Ceará, em atividade desde{' '}
            {empresa.fundacao}. Ele apresenta as categorias de produto que a empresa
            trabalha, publica material técnico sobre escolha de EPI e encaminha o
            atendimento para o WhatsApp.
          </p>
          <p>
            <strong>Não é uma loja virtual.</strong> Não há carrinho, pagamento, cadastro,
            login nem entrega contratada pelo site.
          </p>

          <h2 id="aceitacao">Aceitação</h2>
          <p>
            Ao usar o site você concorda com estes termos. Se não concordar com algum
            ponto, o caminho é não utilizar o site — e, se quiser, falar com a gente sobre
            o ponto.
          </p>

          <h2 id="conteudo">O conteúdo é informativo</h2>
          <p>
            Os textos técnicos deste site são escritos e revisados por técnico de segurança
            do trabalho e citam fonte oficial quando tratam de norma. Ainda assim,{' '}
            <strong>eles têm caráter informativo e não substituem</strong> a avaliação de
            riscos do seu ambiente de trabalho, laudo, programa de segurança ou a
            orientação de profissional habilitado que conheça a sua operação.
          </p>
          <p>
            A definição do que é obrigatório em cada função depende dessa avaliação, e não
            de um texto genérico — inclusive dos nossos.
          </p>
          <p>
            Normas técnicas e regulamentadoras são atualizadas. Sempre que uma informação
            for decisiva para você, confira na fonte oficial citada ao fim de cada texto.
          </p>

          <h2 id="orcamento">Orçamento e preço</h2>
          <p>
            O site não exibe preço e não emite orçamento automático. O que ele faz é montar
            uma mensagem organizada para você enviar pelo WhatsApp.
          </p>
          <p>
            Qualquer valor, prazo ou condição informado depois, na conversa, é{' '}
            <strong>proposta comercial sujeita a confirmação</strong>, e depende de
            disponibilidade do item, da quantidade e das condições vigentes no momento.
            Nada nesta página constitui oferta vinculante.
          </p>

          <h2 id="whatsapp">Atendimento por WhatsApp</h2>
          <p>
            Os botões de WhatsApp levam você para fora deste site, para um aplicativo
            operado por terceiro, com termos e política de privacidade próprios. A mensagem
            já aparece escrita para poupar seu tempo, e{' '}
            <strong>você pode revisar, editar ou apagar antes de enviar</strong> — nada é
            enviado automaticamente.
          </p>

          <h2 id="propriedade">Propriedade do material</h2>
          <p>
            Os textos, o logotipo, a identidade visual e a organização do conteúdo deste
            site pertencem à {empresa.nome}, salvo quando indicado de outra forma. Marcas
            de fabricantes citadas pertencem aos seus respectivos titulares, e são
            mencionadas para identificar produtos e parcerias reais.
          </p>

          <h2 id="permitido">Uso permitido</h2>
          <p>
            Você pode ler, imprimir e compartilhar o conteúdo, e citá-lo indicando a fonte
            com link para a página original. Se um texto daqui ajudou a sua equipe, use à
            vontade.
          </p>

          <h2 id="proibido">Uso proibido</h2>
          <ul>
            <li>Copiar o conteúdo para publicar como próprio, com ou sem alteração.</li>
            <li>
              Usar a marca, o logotipo ou o nome da Tower de forma a sugerir vínculo,
              representação ou autorização que não existam.
            </li>
            <li>
              Extrair conteúdo em massa de forma automatizada a ponto de prejudicar o
              funcionamento do site.
            </li>
            <li>
              Tentar obter acesso não autorizado, testar vulnerabilidade sem autorização ou
              interferir na operação do site.
            </li>
            <li>Usar o site para qualquer finalidade ilícita.</li>
          </ul>

          <h2 id="disponibilidade">Disponibilidade</h2>
          <p>
            Trabalhamos para manter o site disponível, mas ele pode ficar fora do ar por
            manutenção, falha de infraestrutura de terceiros ou motivo fora do nosso
            controle. Não garantimos disponibilidade ininterrupta.
          </p>
          <p>
            O conteúdo também pode ser alterado, atualizado ou removido a qualquer momento
            — o que é frequente em material técnico, e desejável.
          </p>

          <h2 id="externos">Links externos</h2>
          <p>
            Este site aponta para fontes oficiais, órgãos públicos e sites de fabricantes.
            Esses links existem para você conferir a informação. Não controlamos o conteúdo
            nem as práticas de privacidade desses sites, e a inclusão de um link não
            significa endosso a tudo o que ele publica.
          </p>

          <h2 id="responsabilidade">Responsabilidade</h2>
          <p>
            Escrevemos com cuidado e corrigimos o que descobrimos estar errado. Ainda
            assim, decisões sobre segurança do trabalho dependem da realidade de cada
            operação, e a Tower não responde por consequências de uso do conteúdo fora do
            contexto para o qual ele foi escrito, nem por conteúdo de terceiros acessado a
            partir daqui.
          </p>
          <p>
            <strong>Isto não afasta as responsabilidades da Tower como fornecedora</strong>{' '}
            em relação aos produtos que ela efetivamente vende, nem os direitos que a
            legislação de defesa do consumidor garante a você.
          </p>

          <h2 id="privacidade">Privacidade</h2>
          <p>
            O tratamento de dados está descrito na{' '}
            <Link href="/politica-de-privacidade/">política de privacidade</Link> e na{' '}
            <Link href="/politica-de-cookies/">política de cookies</Link>. Em resumo: o
            site não tem cadastro, não guarda o que você digita no formulário e só grava
            cookie de medição de audiência se você aceitar.
          </p>

          <h2 id="alteracoes">Alterações</h2>
          <p>
            Estes termos podem ser atualizados. A versão vigente é sempre a publicada nesta
            página, com a data ao final.
          </p>

          <h2 id="lei">Lei aplicável e contato</h2>
          <p>
            Aplica-se a legislação brasileira. Para qualquer questão sobre estes termos,
            fale com a Tower pelo WhatsApp {empresa.whatsapp.exibicao} ou pela{' '}
            <Link href="/contato/">página de contato</Link>.
          </p>
          <p>
            <strong>[INFORMAÇÃO NECESSÁRIA]</strong> — razão social, CNPJ e foro de eleição
            não foram informados para publicação. A identificação completa da empresa
            precisa constar aqui, e a cláusula de foro deve ser redigida com validação
            jurídica.
          </p>

          <p className="text-sm text-ink-3">Última atualização: setembro de 2026.</p>
        </div>
      </Secao>
    </>
  )
}
