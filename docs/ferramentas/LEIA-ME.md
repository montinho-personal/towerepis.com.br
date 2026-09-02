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
