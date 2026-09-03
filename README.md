# towerepis.com.br

Site institucional e central de conhecimento da **Tower EPI's** — distribuidora de
Equipamentos de Proteção Individual em Fortaleza/CE, desde 1995.

## O que este site é (e o que não é)

**É** um sistema de ajuda à decisão que leva o visitante orientado até uma conversa
no WhatsApp.

**Não é** um e-commerce, nem um catálogo. Não há carrinho, não há preço no site.
O fechamento acontece no WhatsApp, com atendimento humano — e o papel do site é
fazer boa parte do trabalho comercial antes disso.

```
ATRAIR → ENTENDER → ORIENTAR → GERAR CONFIANÇA → QUALIFICAR → WHATSAPP
```

## No ar

**https://towerepis-com-br-git-claude-to-1dd32b-montinho-personal-trainer.vercel.app**

Deploy automático na Vercel a cada push em **`main`**
(projeto `towerepis-com-br`, time Montinho Personal Trainer).

### Branches

| Branch | Papel |
|---|---|
| `main` | **Produção.** Todo push aqui publica no domínio |
| `claude/tower-epis-website-v7fq8k` | Branch de desenvolvimento. Gera deploy de preview |

Os dois são mantidos em sincronia. O `main` existe porque a Vercel usa esse nome
como branch de produção por padrão — sem ele, todo push gerava apenas preview e a
produção só mudava com promoção manual, o que fez o site ficar três entregas
atrasado sem ninguém perceber.

O domínio `towerepis.com.br` **já aponta para a Vercel** (setembro de 2026):
resolve para `216.150.1.1`, e `www` para o CNAME da Vercel. O deploy de `main`
é de produção e o site está publicamente acessível.

A Vercel continua enviando `x-robots-tag: noindex` nas URLs `*.vercel.app` — é
comportamento padrão dela para não indexar a URL do deploy em duplicidade, e
não se aplica ao domínio próprio. Se houver dúvida sobre indexação, conferir o
cabeçalho direto em `https://towerepis.com.br/` e o Search Console.

## Estado atual

**Site implementado e passando no QA. Aguardando os dados pendentes para lançar.**

| Fase | Entrega | Status |
|---|---|---|
| 1 | Descoberta e leitura estratégica | ✅ |
| 2 | Posicionamento | ✅ revisado após o questionário |
| 3 | SEO e arquitetura definitiva | ✅ |
| 4 | Jornadas B2C e B2B | ✅ |
| 5 | Wireframes | ✅ |
| 6 | Copy | ✅ real, sem lorem ipsum |
| 7 | Design System | ✅ derivado do Instagram |
| 8 | UI | ✅ |
| 9 | Implementação | ✅ 47 páginas estáticas |
| 10 | QA | ✅ 0 problemas em 41 páginas |

### Antes de colocar no ar

1. 🔴 **Confirmar o WhatsApp (85) 3491-9494.** O número veio de um post do Instagram
   e alimenta os 29 CTAs do site. Se estiver errado, o site converte para lugar nenhum.
2. 🔴 **Fotos reais.** O design foi feito para elas e ainda não tem nenhuma.
3. 🟡 Revisão do conteúdo técnico pelo Helano.
4. 🟡 Google Business Profile como *service-area business* e campanha de avaliações.

Lista completa em [`docs/informacoes-pendentes.md`](docs/informacoes-pendentes.md).

## Rodando o projeto

```bash
npm install
npm run dev        # desenvolvimento
npm run build      # build de produção
npm run typecheck  # checagem de tipos
```

Deploy na Vercel: o projeto é Next.js padrão, sem variável de ambiente
obrigatória.

### `NEXT_PUBLIC_GA_ID` — a única variável

Liga o Google Analytics 4. Formato `G-XXXXXXXXXX`, lida no build e inlinada.

**Defina só no ambiente de produção.** Em prévia e em desenvolvimento ela deve
ficar em branco, senão o tráfego de teste entra na propriedade.

Sem ela o site não tem banner, não grava cookie nenhum e não contata o Google —
e as páginas legais mostram sozinhas um aviso de que a medição descrita ainda
não está ligada. Com ela, o banner pergunta e **o `gtag.js` só é baixado depois
do aceite**: quem recusa ou ignora navega sem nenhum cookie.

Conferir depois de mexer: `docs/ferramentas/qa-privacidade.mjs`.

### Onde mexer

| Para mudar | Edite |
|---|---|
| Telefone, WhatsApp, horário, dados da empresa | `src/config/empresa.ts` |
| Mensagens de WhatsApp por contexto | `src/lib/whatsapp.ts` |
| Conteúdo de uma profissão | `src/content/profissoes.ts` |
| Conteúdo de uma categoria de proteção | `src/content/protecoes.ts` |
| Conteúdo de calçados | `src/content/calcados.ts` |
| Páginas de setor B2B | `src/content/setores.ts` |
| Artigos | `src/content/artigos.ts` |
| Cores, tipografia, espaçamento | `src/app/globals.css`, bloco `@theme` |

Adicionar uma profissão, um setor ou um artigo é adicionar **um objeto** ao arquivo
de conteúdo — a página, o sitemap e os links internos passam a existir sozinhos.

## Documentos

| Arquivo | Conteúdo |
|---|---|
| [`docs/01-fase-1-descoberta-e-estrategia.md`](docs/01-fase-1-descoberta-e-estrategia.md) | Leitura estratégica, concorrência, SEO, arquitetura, jornadas |
| [`docs/02-posicionamento-seo-e-wireframes.md`](docs/02-posicionamento-seo-e-wireframes.md) | Mapa de palavras-chave, interlinking, wireframes |
| [`docs/03-fatos-verificados.md`](docs/03-fatos-verificados.md) | **Fonte única de verdade da copy.** Questionário + DNA visual do Instagram |
| [`docs/04-design-system.md`](docs/04-design-system.md) | O que preservou do Instagram, o que evoluiu e por quê |
| [`docs/05-posicionamento-revisado.md`](docs/05-posicionamento-revisado.md) | Posicionamento final, depois do questionário |
| [`docs/06-qa.md`](docs/06-qa.md) | Relatório de QA e correções aplicadas |
| [`docs/informacoes-pendentes.md`](docs/informacoes-pendentes.md) | O que falta e o que cada item destrava |

## Princípios inegociáveis do projeto

Extraídos do briefing e assumidos como regra de execução:

1. **Nada inventado.** Nenhum número, depoimento, credencial ou selo sem lastro.
2. **Norma citada tem fonte oficial e data.** gov.br / MTE / Fundacentro / texto vigente da NR.
3. **Nenhuma afirmação de adequação de EPI a risco específico por inferência.**
   O site orienta; não substitui avaliação técnica de riscos quando ela for necessária.
4. **Fotografia real.** Zero banco de imagens.
5. **Todo CTA carrega contexto** e monta a mensagem do WhatsApp. Nada de "Fale conosco" genérico.
6. **Sem dark pattern**, sem falsa urgência, sem popup, sem chatbot.
7. **Sem página local para cidade onde não há operação real.**
8. **Mobile-first de verdade**, não desktop reduzido.
9. **Performance acima de animação.** LCP < 2,0s, CLS < 0,05, INP < 200ms.
10. **Conteúdo técnico é assinado e datado.**

11. **Nada sugere loja física.** A Tower não tem loja desde 2018 — opera como
    *service-area business*, e o site diz isso com todas as letras.
12. **Sem sucessão inventada.** As filhas escolheram outros caminhos.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · conteúdo tipado em
`src/content` · deploy na Vercel · sem CMS e sem banco de dados.

47 páginas estáticas, 102 kB de JS compartilhado, zero biblioteca de terceiros
no navegador.
