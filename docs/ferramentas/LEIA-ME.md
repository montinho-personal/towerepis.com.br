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
