# Catálogo consultivo — auditoria e arquitetura

Auditoria de 5 de setembro de 2026, feita antes de qualquer alteração de código,
como o próprio pedido determinava. O relatório legível está no artefato
**"Catálogo consultivo"**. Este arquivo é o registro das decisões.

---

## O achado que muda a ordem de execução

**Não existe nenhum produto cadastrado no site.** A varredura de
`src/content/*.ts` retorna zero para SKU, fabricante como dado, modelo, número
de CA, atributo, tamanho e imagem de produto. A palavra "fabricante" só aparece
na prosa dos artigos.

Consequência direta: **filtro, comparador, grade de produtos, "meu kit" e schema
de `Product` são maquinário que processa produto.** Sem o dado, não há o que
construir — e inventar está proibido pela regra 1 deste projeto e pelo item 79
do pedido. Num site de EPI a proibição é mais séria do que em marketing: o CA é
consultável publicamente, e número errado é informação de segurança errada.

---

## O que já existe, e não será refeito

O site já é, em estrutura, o que o pedido descreve — organizado por assunto em
vez de por produto.

| Pedido | Onde já está |
| --- | --- |
| Modelo de dados de categoria | 5 taxonomias tipadas: calçados, proteções, profissões, setores, cidades |
| Template sem hardcode | Rotas `[slug]` alimentadas por dados |
| Breadcrumb + BreadcrumbList | `Trilha` |
| Hero e mini resposta de intenção | `CabecalhoPagina` + `EmUmaFrase` |
| Bloco "como escolher" | `OQueObservar` |
| Profissões relacionadas | `paraQuem[]` |
| FAQ acessível com FAQPage | `Perguntas`, com verificador de duplicação |
| CTA contextual de WhatsApp | 46 mensagens por rota, motor em `whatsapp.ts` |
| Barra fixa no mobile | `BarraContextual` |
| Cotação sem carrinho | `/orcamento/`, com grade de numeração par a par |
| Mecanismo de descoberta | `/encontrar-epi/` |
| SEO on-page automatizado | `metadados()`, canonical, OG por página |
| Sitemap só com indexáveis | Gerado das taxonomias |
| E-E-A-T | `AssinaturaTecnica` + `fontes[]` |

**Não recriar nada disso.** O pedido é explícito e a auditoria confirma que
funciona.

---

## O eixo que falta: risco

O grafo hoje liga categoria ↔ profissão ↔ setor ↔ cidade. Falta **risco**, e é
ele que resolve o princípio central do pedido: *não obrigar o usuário a saber o
nome exato do EPI*.

Quem escorrega não procura "calçado ocupacional com solado bidensidade". Procura
"botina que não escorrega". O eixo de risco é a ponte entre a linguagem do
problema e a do catálogo — e é a única parte grande da arquitetura que **não
depende de produto para existir**.

---

## Modelo de dados

Entregue como código tipado em `src/content/produtos.ts`, com a lista vazia. Os
campos estão documentados um a um. Três guardas de build recusam produto pela
metade:

1. produto sem fabricante ou sem categoria derruba o build;
2. `ca` fora de formato numérico derruba o build;
3. `ca` sem `caConferidoEm` derruba o build.

A terceira é a que mais importa: **número de CA sem data de conferência
envelhece calado.** O CA tem prazo, e daqui a dois anos ninguém lembra se aquele
número foi checado no CAEPI ou copiado de catálogo velho.

`filtrosDaCategoria()` já implementa a regra "não mostrar filtro vazio" no dado,
e não na interface: devolve só as chaves que os produtos daquela categoria
declaram, descartando as de valor único.

---

## Regra de indexação

O sitemap é gerado das taxonomias, então **uma URL só existe para o Google se
estiver numa lista tipada**. Combinação de filtro nunca entra por construção.

| URL | Index | Canonical | Sitemap |
| --- | --- | --- | --- |
| `/calcados/seguranca/` | sim | ela mesma | sim |
| `?cor=preta&tam=42` | **não** | a categoria limpa | não |
| `/riscos/escorregamento/` | sim | ela mesma | sim |
| filtro promovido a página | só passando nos 5 critérios | ela mesma | se indexável |

Os cinco critérios: intenção própria, produtos suficientes, conteúdo distinto,
relações reais, sem canibalização. O quinto é medido por
`docs/ferramentas/auditoria-canibalizacao.mjs` — a faixa de disputa começa em
0,55 e nenhuma URL nova entra sem passar por ele.

**Schema:** `CollectionPage` e `ItemList` das subpáginas são legítimos hoje.
`Product`, `Offer`, `AggregateRating` e disponibilidade não entram até haver
dado.

---

## Fases

**Fase 1 — do cliente.** Preencher `produtos.ts`. Começar por uma linha só, a
Bompel. Dez produtos verdadeiros valem mais que duzentos aproximados.

**Fase 2 — em paralelo, não depende de produto.** Taxonomia `riscos.ts`, páginas
`/riscos/<slug>/`, bloco "escolha pelo risco" nas categorias, tabela de decisão
por categoria, ligação sistemática categoria → guia.

**Fase 3 — depois da 1.** Grade, cards ricos, filtros derivados, comparador,
seleção para cotação, schema de catálogo.

---

## Avaliação de ritmo

```
FASE 2 — dividido, máximo duas páginas de risco por lote
Motivo: cria URL nova, o que pela regra poderia ir junto. Mas cada página
        de risco é conteúdo editorial novo e o limite real é a revisão.
        As páginas de risco nascem perto das de proteção, e é ali que a
        canibalização aparece — a auditoria roda entre os lotes.

FASE 3 — de uma vez
Motivo: é interface sobre dado que já existirá. Não cria URL indexável
        nova e não mexe em texto que ranqueia.
```

Título, description e H1 continuam congelados até 1º de novembro
(`docs/10-regra-de-avaliacao.md`). Nenhuma fase deste plano toca neles.

---

## A pergunta que fica

A Tower quer mesmo publicar catálogo?

O site hoje converte por conhecimento, e conhecimento não desatualiza. Catálogo
desatualiza, e catálogo errado num site de EPI custa mais caro que catálogo
nenhum. Vale a pena se houver rotina para manter. Se não houver, o mesmo esforço
rende mais nas 12 capas de artigo que faltam e no eixo de risco.

Registrado para que a decisão seja tomada com o custo à vista, e não por
entusiasmo com a arquitetura.
