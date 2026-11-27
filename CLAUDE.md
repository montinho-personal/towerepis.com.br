# Tower EPI's — instruções do projeto

Site institucional de distribuidora de EPI em Fortaleza, no ar em
`towerepis.com.br`. Next.js (App Router), TypeScript, Tailwind v4, conteúdo
tipado em `src/content`, deploy na Vercel a partir de `main`.

Não vende online. **O WhatsApp é o único canal de conversão.**

---

## Antes de executar qualquer tarefa

**Avaliar o ritmo e apresentar a avaliação junto com o plano** — de uma vez ou
dividido em lotes, com o motivo. A regra completa, incluindo por que "o Google
penaliza quem publica muito de uma vez" é falso e o que é risco de verdade,
está em `docs/16-regra-de-ritmo.md`.

Resumo operacional:

- **Conteúdo novo em URL nova:** no máximo dois artigos por lote, com a
  auditoria de canibalização entre os lotes. O limite é a revisão, não o Google.
- **Correção de defeito:** tudo de uma vez. Defeito não tem lote.
- **Mudança em página já indexada** (título, description, canonical, links):
  divide, e só depois que houver Search Console para medir.
- **Trabalho invisível ao buscador** (imagem, acessibilidade, cabeçalho HTTP):
  tudo de uma vez.

---

## Regras que não se quebram

1. **Nunca inventar número, depoimento, credencial ou selo.** Se não foi
   medido ou confirmado, não vai para o site.
2. **Nenhuma afirmação normativa sem fonte oficial.** Conteúdo sobre NR, CA ou
   norma técnica cita a fonte e traz data de revisão.
3. **Não publicar endereço.** A empresa opera como *service-area business*
   desde 2018. Nada no site pode sugerir loja, filial ou atendimento
   presencial.
4. **Não citar Grupo Vicunha nem Grupo Santana Têxtil** sem autorização
   escrita.
5. **A 3M aparece como história** — o convite de 1995, o prêmio. Nunca como
   promessa de estoque. A parceria atual em destaque é a Bompel.
6. **Título, description e H1 estão congelados** até a revisão de 1º de
   novembro de 2026. Ver `docs/10-regra-de-avaliacao.md`.
7. **Todo artigo tem FAQ.** `perguntas` é campo obrigatório do tipo `Artigo` —
   artigo sem FAQ não compila. O que entra no campo está na declaração do tipo.
8. **Sem foto de banco de imagem.** Só foto real da empresa.
9. **Fonte única de verdade:** todo dado factual sai de `src/config/empresa.ts`.
   Nenhum componente escreve telefone, ano ou credencial na mão.
10. **Se um dado obrigatório não existe, marcar `[INFORMAÇÃO NECESSÁRIA]`** em
    vez de preencher com aproximação.

---

## Medir antes de afirmar

Nenhuma afirmação sobre o site entra numa resposta sem ter sido medida. As
ferramentas estão em `docs/ferramentas/`, documentadas no `LEIA-ME.md` de lá:

```
npm run build && npx next start -p 3000        # e -p 3122 para o rastreador
node docs/ferramentas/qa-larguras.mjs          # estouro horizontal, 12 larguras
node docs/ferramentas/qa-navegador.mjs         # navegador: rotas, menu, links, WhatsApp, orçamento (computador e celular)
node docs/ferramentas/qa-foco.mjs              # foco pelo teclado: contorno e contraste (WCAG 2.4.7 e 1.4.11)
node docs/ferramentas/qa-privacidade.mjs       # cookies e hosts, três trilhas
node docs/ferramentas/qa-faq.mjs               # FAQ: presença e duplicação
node docs/ferramentas/qa-barra.mjs             # barra contextual, matriz
node docs/ferramentas/qa-qual-calcado.mjs       # ferramenta de calçado, 32 percursos
node docs/ferramentas/qa-qual-calcado-logica.mjs  # lógica, 1,7 mi de combinações (sem site no ar)
node docs/ferramentas/qa-tamanho-botina-logica.mjs  # calculadora de tamanho, lógica (sem site no ar)
node docs/ferramentas/qa-tamanho-botina.mjs     # calculadora de tamanho, 28 percursos (build de prévia)
node docs/ferramentas/qa-grade-equipe-logica.mjs  # grade da equipe: soma, reserva, importação (sem site no ar)
node docs/ferramentas/qa-grade-equipe.mjs       # grade da equipe, 34 percursos em 4 larguras
node docs/ferramentas/auditoria-rastrear.mjs   # rastreia (porta 3122)
node docs/ferramentas/auditoria-analisar.mjs   # inventário — gera o grafo
node docs/ferramentas/auditoria-canibalizacao.mjs   # lê o grafo, não o gera
```

As três da auditoria são uma sequência, nesta ordem. A de canibalização
**lê** `auditoria/grafo.json` e não o escreve: pular a do meio deixa o grafo
de uma execução anterior no disco, e a seção de links de corpo passa a
descrever o site de outro dia. Ela agora recusa rodar com grafo mais velho
que o rastreio, mas a ordem continua sendo a sua responsabilidade.

O rastreador escreve em `auditoria/`, que é ignorado pelo git. Criar a pasta se
não existir.

**Falso positivo conhecido:** o "1995" decorativo do rodapé transborda a coluna
de propósito e aparece uma vez por página a partir de 1024px na varredura de
larguras. Não é defeito.

---

## Toda mudança no site passa por estes seis passos

Regra do Renato, 25/11/2026. Vale para qualquer ação que mexa no site:
artigo novo, revisão, correção, mudança de componente. Nenhuma entrega é dada
como pronta sem os seis, e a resposta diz o resultado de cada um.

1. **Abrir o site no navegador.** Build de produção e `npx next start -p 3000`;
   o navegador é o Chromium do Playwright, não a leitura do código.
2. **Testar botões e funcionalidades.** `node docs/ferramentas/qa-navegador.mjs`
   percorre todas as rotas, abre e fecha o menu do celular, confere todo link
   de WhatsApp e todo link interno, e usa o formulário de orçamento até o
   botão de enviar. Se a mudança tocou numa ferramenta, roda também o teste
   dela (qa-qual-calcado, qa-tamanho-botina, qa-grade-equipe) e o qa-barra.
3. **Verificar a versão mobile.** O qa-navegador roda num celular emulado
   (Pixel 7); a página alterada passa ainda pela varredura de larguras
   (320 a 1280) e, se mudou layout, `qa-larguras.mjs` completo.
4. **Executar os testes automatizados.** `npx tsc --noEmit`, o build, a
   sequência da auditoria (rastrear, analisar, canibalização) e o `qa-faq`.
5. **Identificar erros e corrigi-los.** Defeito achado é corrigido no mesmo
   trabalho; se for do teste (falso positivo), corrige o teste e registra.
6. **Repetir os testes depois das correções.** Todos os que falharam, mais o
   qa-navegador inteiro. Só faz commit e push com tudo verde.

---

## Git

Desenvolver em `claude/tower-epis-website-v7fq8k`, manter `main` em sincronia —
a Vercel faz deploy de produção a partir de `main`. Conferir
`git fetch` antes de todo push: uma vez, um force-push apagou dois commits de
upload do cliente.

---

## Pesquisa no Google pelo SerpApi (no lugar dos prints)

Os dados do Google vêm do SerpApi, pelo MCP em `https://mcp.serpapi.com/mcp`.
A chave está no cofre do ambiente e o proxy envia sozinho: nunca pedir a chave
na conversa. Se der erro de chave, usar `request_credential` para
`mcp.serpapi.com`.

```bash
serp() { curl -sS -m 90 -X POST https://mcp.serpapi.com/mcp \
  -H 'Content-Type: application/json' -H 'Accept: application/json, text/event-stream' \
  -d "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/call\",\"params\":{\"name\":\"search\",\"arguments\":{\"params\":$1}}}"; }

# Busca comum (PAA, outras pesquisas, visão de IA, quem ranqueia):
serp '{"engine":"google","q":"BUSCA","location":"Fortaleza,Ceara,Brazil","device":"mobile","hl":"pt-br","gl":"br"}'
# Autocompletar:
serp '{"engine":"google_autocomplete","q":"BUSCA","hl":"pt-br","gl":"br"}'
# Mapa (SEO local):
serp '{"engine":"google_maps","type":"search","q":"BUSCA","ll":"@-3.7318616,-38.5266704,13z","hl":"pt-br","gl":"br"}'
```

A resposta é JSON dentro de `result.content[0].text`. Sempre `"device":"mobile"`
e a região `Fortaleza,Ceara,Brazil` (nome conferido em
`https://serpapi.com/locations.json?q=Fortaleza`, consulta grátis).

**"Cria/revisa o próximo artigo" começa pela pesquisa.** A resposta traz as
intenções de busca por tipo (autocompletar, "As pessoas também perguntam",
outras pesquisas, visão de IA, quem ranqueia), com o que entrou no texto e o que
ficou de fora. O que ficou de fora vira pauta, com uma de três decisões: vale um
artigo / não recomendo / cabe em página existente.

**Evidência:** o JSON enxuto de cada busca (só os campos usados) vai para
`docs/seo/evidencias/`, com a data no nome.

**Orçamento do mês** (1.000 pesquisas, todos os sites somados; revisto em
26/11/2026): o Renato reduziu as revisões diárias de 2 para 1 por dia em todos
os sites, para a soma caber na cota. Rotinas diárias: Direito de Verdade (1
revisão, 2 buscas) cerca de 150; Personal por Perto (1 artigo + 1 cidade) cerca
de 180; Site do Montinho (1 artigo) cerca de 60 a 75; Crédito por Perto (1
página) cerca de 60 a 90; Guia Fitness Alphaville (1 artigo) cerca de 75 a 90;
Tower EPI's (1 artigo, até 2 buscas) cerca de 60 a 90; site de missões de GTA 6
(Radar, no máximo 3 chamadas por dia) cerca de 90. Rotinas mensais (dia 16):
visão de IA com ideias de artigo nos 7 sites, mapa do Montinho e da Tower e
alertas de regra do Direito e do Crédito, cerca de 205. Total: cerca de 880 a
970, dentro da cota. Mesmo assim, quando o SerpApi disser que a cota acabou ou
der limite de requisições, parar na hora e avisar o Renato. Não repetir busca
que já está em `docs/seo/evidencias/`.

## Estratégias de SEO com o SerpApi

1. **Formato antes de escrever:** ver o que ranqueia (guia, lista, tabela,
   ferramenta) e escrever no formato que o Google já premia para aquela busca.
2. **Visão de IA:** registrar quem o resumo de IA cita e como é a página citada
   (`docs/seo/visao-de-ia.md`). Resumo de IA errado é oportunidade: o artigo
   corrige com fonte oficial, como no caso da NCM 6403.91.90 × 6403.99.90.
3. **Concorrentes:** olhar a página que ranqueia para aprender o formato, nunca
   para copiar, citar ou ranquear concorrente no site.
4. **Sazonalidade:** Google Trends (`"engine":"google_trends"`) antes de pautas
   sazonais, como a quadra chuvosa.
5. **Mapa local:** a Tower tem Perfil da Empresa no Google ("TOWER EPIS"). A
   linha de base e o passo a passo estão em `docs/seo-local/README.md`. Perfil
   sempre como área de atendimento: nunca endereço público, nunca endereço
   falso, nunca palavra-chave no nome.

**Rotinas agendadas:** mensal no dia 16, às 14h42 de Brasília (mapa local,
visão de IA das 5 buscas principais, ideias de pauta); diária, um artigo
por dia da fila em `docs/seo/fila-revisao.md`, com até 2 buscas no SerpApi
(busca comum + autocompletar). Diária às 15h13 de Fortaleza: QA de duas
ferramentas por dia, com três especialistas (QA, mobile e acessibilidade,
auditor de cálculo), pelo roteiro e pela fila em `docs/qa/rotina-ferramentas.md`. As 5 buscas principais: "epi
fortaleza", "loja de epi fortaleza", "botina de segurança fortaleza",
"fornecedor de epi fortaleza", "calçado de segurança fortaleza".
