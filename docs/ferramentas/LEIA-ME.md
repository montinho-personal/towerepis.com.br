# Ferramentas do projeto

## Auditoria SEO — repetível a cada lote

```
npm run build && npx next start -p 3111 &
node docs/ferramentas/auditoria-rastrear.mjs        # rastreia e grava paginas.json
node docs/ferramentas/auditoria-analisar.mjs        # inventário + problemas + schema
node docs/ferramentas/auditoria-canibalizacao.mjs   # sobreposição semântica + âncoras
```

O rastreador segue links a partir da home em navegador real, então mede a
profundidade de clique de verdade — não a que o sitemap sugere. Separa links
internos por região (cabeçalho, rodapé, trilha, corpo) porque só o link de
corpo sinaliza importância; menu e rodapé apontam para tudo e não dizem nada.

A análise de canibalização usa similaridade de cosseno sobre title, H1 e
headings com peso maior que o corpo. Acima de 0,8 é disputa real; entre 0,55 e
0,7 é padrão a vigiar.

O inventário de setembro de 2026 está em `auditoria-2026-09-inventario.txt`,
para comparação depois de cada lote.

## Extração de vetor

- `cff.py` — interpretador de charstrings CFF Type 2. Extrai contornos de
  glifos de fontes embutidas em PDF/AI.
- `selo.py` — converte o content stream do `.ai` do logo em SVG, com formas e
  degradês. Ver `docs/04-design-system.md`.

## Auditoria de title/description e CTR

```
node docs/ferramentas/auditoria-ctr.mjs    # score 0-100 por URL, precisa de paginas.json
```

Seis das dez dimensões são calculadas por regra e quatro são julgamento
declarado no próprio arquivo. O score NÃO é CTR medido — é heurística, e
existe para comparar antes e depois de uma alteração, não para prever clique.

`marco-zero-2026-09-titles.txt` é o estado das 43 URLs em setembro de 2026:
title, H1 e description com os comprimentos. É a linha de base da segunda
auditoria, que só faz sentido quando houver amostra no Search Console.

## Barra contextual

```
npm run build && npx next start -p 3000
node docs/ferramentas/qa-barra.mjs
```

Percorre todas as rotas do sitemap e monta a matriz do que a barra mostra em
cada página: frase, rótulo do botão, mensagem que vai para o WhatsApp e em que
ponto da rolagem ela aparece. **O gatilho é medido, não lido de
`barra-contextual.ts`** — se a regra e o comportamento divergirem, é o
comportamento que aparece na tabela.

Acusa três defeitos que não se veem olhando uma página por vez: frase repetida
em páginas diferentes, página que aparece sem rolagem e página onde a barra
nunca aparece.

A espera de 400ms por passo não é folga. A barra entra com transição de 300ms
disparada por `requestAnimationFrame`; uma versão anterior deste script
esperava 60ms, leu a barra no meio do caminho e reportou gatilho de 78% onde o
real era 30%, além de "nunca apareceu" em dez páginas onde ela aparece.
Medição rápida demais mede o próprio atraso.

## Privacidade e consentimento

```
npm run build && npx next start -p 3000
node docs/ferramentas/qa-privacidade.mjs        # site sem medição
NEXT_PUBLIC_GA_ID=G-XXXXXXX npm run build       # e de novo, com medição
```

Percorre nove rotas em navegador real e mede o que sobra no navegador. Com
`NEXT_PUBLIC_GA_ID` definida ele roda **três trilhas**, porque uma só mente:

1. **sem responder ao banner** — tem de ser zero cookie e zero host externo;
2. **depois de recusar** — idem, senão a recusa não é recusa;
3. **depois de aceitar** — o `gtag.js` tem de ser pedido, com o ID certo.

As trilhas 1 e 2 são as que sustentam o que `/politica-de-cookies/` afirma por
escrito. Se qualquer uma delas acusar cookie ou host externo, **o defeito é do
código, não do texto** — o texto está certo e o site é que parou de cumpri-lo.

A trilha 3 sai como INCONCLUSIVA em ambiente sem saída para o Google (sandbox,
CI fechado): o pedido é feito e morre no proxy. O script separa esse caso de
uma falha real, e nesse caso afirma só o que mediu — que o pedido só existiu
depois do aceite e usou o ID configurado. O cookie em si precisa ser conferido
com saída para a internet, ou no relatório de tempo real da propriedade.

### A variável

`NEXT_PUBLIC_GA_ID` é lida no build e inlinada. **Sem ela, não existe banner,
não existe cookie e nada é enviado ao Google** — e as páginas legais mostram
sozinhas um aviso dizendo que a medição descrita ainda não está ligada.
Defina-a apenas no ambiente de produção da Vercel: em prévia e em
desenvolvimento ela deve ficar em branco, para não sujar a propriedade com
tráfego que não é de visitante.

## FAQ dos artigos

```
npm run build && npx next start -p 3000
node docs/ferramentas/qa-faq.mjs
```

**Todo artigo tem FAQ, e essa regra é cobrada pelo compilador**: `perguntas` é
campo obrigatório do tipo `Artigo`, então artigo novo sem FAQ não compila
(`error TS2741`). Isso garante que o campo existe — não que o conteúdo preste.

Este script cuida da outra metade: confere que todo artigo emite `FAQPage` com
pelo menos três perguntas, que **a resposta do schema é exatamente a que está
visível na página** — exigência do dado estruturado, e o motivo de o
componente usar `<details>` com o texto já no HTML — e que nenhuma pergunta se
repete entre páginas diferentes.

A última checagem existe por um defeito real: na primeira leva de FAQ nos
artigos, quatro perguntas saíram idênticas a perguntas que já existiam em
outras páginas. Duas páginas do mesmo site disputando o mesmo resultado é o
pior uso possível de FAQPage, e passou despercebido porque cada página, lida
sozinha, estava correta.

As páginas de cidade são exceção declarada: "a Tower atende empresas em X?"
é a mesma forma de pergunta sobre lugares diferentes, e não conta como
repetição.
