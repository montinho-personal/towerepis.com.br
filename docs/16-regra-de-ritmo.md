# Regra do projeto: ritmo de publicação e risco

**Vale para toda tarefa deste projeto.** Antes de executar qualquer pedido,
avaliar se ele vai de uma vez ou dividido ao longo de dias — e apresentar essa
avaliação junto com o plano, não depois de publicar.

---

## Primeiro, o que a regra NÃO é

**O Google não penaliza por ritmo de publicação.** Não existe limite de páginas
por dia, e publicar dez artigos num dia não é, por si, um sinal negativo.
Portais de notícia publicam centenas por dia há vinte anos. A orientação
pública do Google é explícita nesse ponto, e tratar "publiquei demais de uma
vez" como causa de queda é diagnóstico errado — que leva a atrasar trabalho bom
por medo de um risco que não existe.

> Não foi possível conferir os links do Search Central deste ambiente, que
> bloqueia saída de rede. O parágrafo acima vem de conhecimento do assunto e
> deve ser confirmado na documentação oficial antes de virar argumento com
> terceiros.

O que existe de verdade, e é outra coisa:

- **Abuso de conteúdo em escala.** A política de spam do Google mira conteúdo
  produzido em massa cujo propósito principal é manipular ranqueamento. O
  julgamento é sobre **valor e intenção**, não sobre velocidade. Cem textos
  rasos publicados ao longo de um ano continuam sendo cem textos rasos.
- **Diluição da qualidade média do site.** Sinal de site inteiro: acrescentar
  páginas fracas a um site bom pesa contra o site bom. De novo, qualidade.
- **Orçamento de rastreamento.** Só vira assunto na casa dos milhares de URLs.
  Com 62 páginas, é irrelevante aqui.

**Conclusão:** ritmo não é o eixo de risco. Qualidade por página é. Dividir uma
tarefa por medo de penalidade é superstição; dividir por outros motivos, abaixo,
é engenharia.

---

## As três perguntas que decidem

Nesta ordem. A primeira que der "dividir" já decide.

### 1. A tarefa cria URL nova ou mexe em URL que já existe?

- **URL nova, conteúdo bom, sem tocar no que existe** → vai junto. Espalhar não
  compra nada.
- **Mexe em página já indexada** — título, description, canonical, H1, estrutura
  de links, texto que já rankeia → **divide**. Não por penalidade: porque um
  erro sistemático atinge o site inteiro antes de alguém ver, e porque mudar
  vinte páginas no mesmo dia torna impossível saber qual mudança moveu o quê.
- **Mudança de URL, redirecionamento, canonical em massa** → **divide sempre**,
  e observa entre os lotes. É a única categoria com risco técnico real de perda
  temporária de posição.

### 2. Dá para medir o efeito?

Dividir serve para atribuir causa. **Sem medição, dividir não compra nada — é
atraso puro.**

Enquanto o Search Console não estiver configurado e o GA4 não estiver ligado,
não existe atribuição neste site. Nesse estado, faseamento por motivo de
medição é encenação. Primeiro liga a medição; depois faseia o que precisa ser
medido.

### 3. O erro é barato de desfazer?

- **Barato** (texto, imagem, schema, FAQ) → pode ir junto; se der errado, um
  commit desfaz.
- **Caro** (URL, redirect, canonical, arquitetura de navegação) → divide e
  observa entre os lotes.

---

## O limite que morde de verdade neste projeto

Não é o Google. **É a revisão.**

O registro desta sessão é a prova, e por isso está escrito aqui: numa leva de
treze FAQs escritas de uma vez, quatro perguntas saíram idênticas a perguntas
que já existiam em outras páginas do site. Numa leva de dois artigos, um título
foi publicado com 71 caracteres renderizados. Nos dois casos cada peça, lida
sozinha, estava correta — o defeito só existia no conjunto, e o conjunto não
cabia numa revisão só.

Então a regra prática, aqui, é sobre lote de revisão e não sobre calendário:

- **Conteúdo novo: no máximo dois artigos por lote**, com a auditoria de
  canibalização e o verificador de FAQ rodando entre os lotes. Dois é o
  tamanho que ainda cabe numa conferência honesta.
- **Correção de defeito: tudo de uma vez.** Adiar correção é manter o defeito
  no ar, e isso é sempre pior. Defeito não tem lote.
- **Trabalho invisível ao buscador** (imagem, acessibilidade, performance,
  cabeçalho HTTP): tudo de uma vez, com a verificação correspondente.

---

## Uma consideração real de calendário, e só uma

O site é novo — o domínio passou a apontar para a hospedagem em setembro de
2026. Para um site nesse estágio, o cuidado útil **não é publicar devagar**: é
não ficar mexendo nos sinais que já foram enviados enquanto o Google ainda está
formando a leitura dele.

É exatamente o que a `docs/10-regra-de-avaliacao.md` já determina, ao congelar
título, description e H1 até a revisão de 1º de novembro. As duas regras dizem
a mesma coisa por caminhos diferentes: **conteúdo novo pode ir; sinal
estabelecido não se mexe sem dado.**

---

## Como a avaliação aparece

Em toda tarefa, antes de executar, uma linha por item:

```
TAREFA — de uma vez | dividido em N lotes
Motivo: (qual das três perguntas decidiu, e por quê)
```

Se a resposta for "de uma vez", dizer isso com a mesma clareza. A regra existe
para evitar tanto o dano de fazer tudo às cegas quanto o desperdício de dividir
o que não precisa.
