# FASE 7 — DESIGN SYSTEM
### Tower EPI's · derivado do Instagram @towerepis

> Implementado em `src/app/globals.css`, bloco `@theme`.
> Base da análise: `03-fatos-verificados.md`, seção 10.

---

## O PRINCÍPIO

> **Preservar o que é reconhecimento de marca. Descartar o que é limitação de ferramenta.**

A maior parte do que parece "identidade" no Instagram de uma PME não é decisão de
marca — é consequência de ter sido feito no celular, no aplicativo disponível, com
pressa. Separar uma coisa da outra foi o trabalho.

---

## O QUE FOI PRESERVADO

| Elemento | Por quê |
|---|---|
| **Vermelho** | É o ativo de reconhecimento da marca. O selo circular vermelho é o que o cliente identifica |
| **O ponto no lugar do "O"** | Detalhe distintivo do logotipo. Virou marca gráfica recorrente do site |
| **Azul-marinho** | Cor secundária real dos posts, usada para hierarquia |
| **Creme / off-white** | Fundo dos posts. Virou a cor de faixa do site |
| **Destaque em vermelho na palavra-chave** | Princípio editorial que eles já aplicam. Mantido de forma sistemática |

## O QUE FOI EVOLUÍDO

| Elemento | De | Para | Por quê |
|---|---|---|---|
| Logo | Selo com degradê | Tipográfico, vermelho chapado | Degradê não escala, não imprime bem e envelhece rápido |
| Formas diagonais e blobs | Presentes em quase todo post | Removidos | Não são identidade; são o recurso que o app oferecia |
| Tipografia | Fontes variando por post | Duas famílias, escala fixa | Consistência é o que faz parecer profissional |
| Cores de post | Muitas, sem regra | Paleta fechada, cor com função | Cor sem função é ruído |

---

## COR

Todos os valores verificados para contraste. O texto pequeno em `--color-ink-3`
foi escurecido de `#767b85` (4,14:1 — reprovado) para `#6e737c` (4,63:1 — aprovado).

| Token | Valor | Uso | Contraste sobre papel |
|---|---|---|---|
| `--color-tower-red` | `#b4111b` | Marca, rótulos, marcadores, o ponto | 6,7:1 ✅ |
| `--color-tower-red-deep` | `#7e0b12` | Hover e links em texto | — |
| `--color-tower-red-soft` | `#fdf0ef` | Fundo do bloco "Em uma frase" | — |
| `--color-tower-navy` | `#15294b` | Cor secundária | — |
| `--color-paper` | `#fcfbf9` | Fundo geral (papel quente) | — |
| `--color-paper-2` | `#f4f1ec` | Faixas — o creme do feed | — |
| `--color-ink` | `#191a1d` | Texto principal, faixas escuras | 16,3:1 ✅ |
| `--color-ink-2` | `#4a4e56` | Texto secundário | 8,1:1 ✅ |
| `--color-ink-3` | `#6e737c` | Texto de apoio, rótulos | 4,63:1 ✅ |
| `--color-rule` | `#e3ded6` | Divisórias | — |
| `--color-zap` | `#128c4a` | **Exclusivo do WhatsApp** | 4,9:1 ✅ |

**Regra do verde:** aparece somente em CTA de WhatsApp. Nunca decorativo. É o que
o briefing chama de "cor com função" — ao ver verde, o usuário sabe o que acontece.

---

## TIPOGRAFIA

**Archivo** (grotesca) para títulos, botões, rótulos e numerais.
**Source Serif 4** (serifada) para leitura corrida.

**Racional:** Helano é jornalista de formação. Uma identidade de inflexão editorial
— grotesca forte no título, serifa no corpo — não é escolha estética arbitrária:
é biograficamente verdadeira. E distingue a Tower de todo e-commerce de EPI, que
usa sans-serif genérica sem exceção.

Escala modular ~1,25 ancorada em 16px, de `--text-2xs` (0,6875rem) a `--text-7xl`
(5,5rem). Corpo do texto em 17px — acima do padrão de 16px, porque boa parte do
público lê no celular, muitas vezes em ambiente de trabalho.

Fontes auto-hospedadas via `next/font`: zero requisição externa, sem FOUT.

### O numeral como assinatura
A classe `.numeral` (tabular, tracking negativo, line-height 0,85) é usada para
**1995**, para os anos da linha do tempo e para a numeração das listas de critério.
É o elemento que um concorrente fundado em 2009 não pode copiar.

---

## COMPONENTES

Cada um existe por uma razão estratégica, não estética.

| Componente | Função |
|---|---|
| `EmUmaFrase` | A resposta no topo. Respeita quem tem pressa e sinaliza que aqui não se enrola |
| `OQueObservar` | Lista de critério numerada. **A assinatura consultiva da Tower** — entrega critério mesmo a quem não vai comprar |
| `Comparacao` | Duas colunas lado a lado. O "motivo gráfico" do projeto: o site inteiro é sobre distinguir A de B |
| `BarraProva` | Quatro fatos, zero adjetivo, antes de pedir qualquer coisa |
| `AssinaturaTecnica` | E-E-A-T visível para o leitor, não só para o robô |
| `Perguntas` | FAQ em acordeão nativo — `<details>`/`<summary>`, sem JavaScript |
| `PonteEmpresas` | Ponte B2C→B2B. Quem lê "cozinha" pode ser o cozinheiro **ou** o dono |
| `BlocoCta` | CTA com a mensagem do WhatsApp à vista |
| `ErroCaro` | Reposiciona a decisão B2B de preço para adesão |
| `ComQuemVoceFala` | Diz que a Tower são duas pessoas — antes que o comprador descubra sozinho |
| `Ferramenta` | Orientação em 4 passos, com ressalva técnica **antes** de começar |

### Grid e espaço
Contêiner de 78rem, medida de leitura de 38rem. Escala de espaçamento fixa
(`--spacing: 0.25rem`) — não existe valor avulso. As divisórias são desenhadas com
`gap-px` sobre fundo de régua, o que produz as linhas finas contínuas do sistema
editorial.

### Estados
Foco visível obrigatório: contorno vermelho de 3px com deslocamento de 3px.
Alvos de toque com no mínimo 44px de altura. `prefers-reduced-motion` respeitado.

---

### O FAQ em acordeão

Construído sobre `<details>`/`<summary>` nativo, **sem uma linha de JavaScript**.
Isso não é economia de código — é o que garante três coisas ao mesmo tempo:

1. **Funciona sem JS**, como o resto do site.
2. **É acessível de graça**: navegável por teclado, anunciado corretamente por
   leitor de tela, com estado aberto/fechado exposto ao sistema operacional.
3. **Mantém a resposta dentro do HTML**, mesmo fechada. Este é o ponto crítico:
   26 páginas do site emitem schema `FAQPage`, que exige a resposta presente na
   página. Um acordeão em JavaScript que injetasse o texto só no clique quebraria
   o schema — e ninguém perceberia, porque visualmente ficaria igual.

O marcador é um `+` que vira `−`, feito com dois pseudo-elementos e uma
transformação. Anima só `transform`, que é barato, e some sob
`prefers-reduced-motion`.

O atributo `name` dá o comportamento clássico de abrir uma e fechar a anterior.
Navegadores que ainda não o suportam permitem várias abertas — degradação
aceitável, não falha.

A abertura suave usa `interpolate-size` e `::details-content` dentro de um
`@supports`. Onde o navegador não suporta, abre instantaneamente — que é um
comportamento correto, não um defeito.

## FASE 2 — RITMO DE SUPERFÍCIES *(implementado)*

Três superfícies com função declarada, mais o ponto como elemento proprietário.

| Superfície | Token | Função |
|---|---|---|
| Papel | `--color-paper` | Onde se lê |
| Creme | `--color-paper-2` | Separar sem escurecer |
| Grafite | `--color-grafite-800` / `-900` | Onde se afirma |
| Vermelho | `--color-tower-red` | Onde se decide |

**Proporção medida na Home:** 40% papel · 22% creme · 34% grafite · 4% vermelho.
Antes era 85 / 10 / 5 / 0.

### Duas regras que o QA verifica
1. **Nunca vermelho da marca como texto sobre escuro.** Dá 2,4:1 e reprova. Sobre
   grafite, rótulo usa `--color-tower-red-light` (5,2:1); o vermelho da marca só
   entra como campo. O QA falha a build se encontrar texto `#b4111b` em `.band-ink`.
2. **Uma faixa vermelha por página.** Na Home é a da Bompel. Mais de uma e o
   impacto se dissolve.

### Armadilha de CSS registrada
`.band-ink .eyebrow` e `.band-ink .eyebrow-red` têm a mesma especificidade. Se a
genérica vier depois, o rótulo vermelho no escuro renderiza cinza — sem erro
visível. A ordem no arquivo é a proteção; não trocar.

### Duas superfícies escuras nunca se encostam
Onde o fechamento em grafite encontra o rodapé, entra uma costura vermelha de 4px.
O vermelho fazendo trabalho estrutural, em vez de dois escuros se fundindo num
bloco só.

## ETAPA 3 — PÁGINAS INTERNAS E O FIM DO DOMÍNIO DOS CARDS

Antes desta etapa, 12 das 42 páginas não tinham **nenhuma** superfície: eram
papel do topo ao rodapé. A média de superfície escura no site era de 2%.
Depois: nenhuma página sem superfície, e média de 22%.

### Hierarquia de abertura — a regra que decide o grafite

Não é decoração, é nível de navegação:

| Tipo de página | Abertura | Por quê |
|---|---|---|
| Índice (`/protecao/`, `/para-seu-trabalho/`, `/calcados/`, `/conhecimento/`, `/empresas/`, `/marcas/`, `/encontrar-epi/`) | **Grafite** | São aberturas de capítulo. Quem chega está escolhendo um caminho, e a troca de superfície marca a mudança de nível. |
| Página final (profissão, proteção, calçado, setor, artigo) | **Papel** | São para ler. Escurecer todas gastaria o grafite até ele não significar mais nada. |

Nas páginas de índice a **trilha também é escura**. Trilha em papel acima de
faixa escura deixava uma tira branca de poucos pixels entre o topo e o
cabeçalho.

### Onde o grafite entra nas páginas finais

Dois momentos, sempre os mesmos:

1. **`O que observar`** — o critério técnico. É o que a página tem de mais
   valioso e vinha no mesmo peso do resto. É o momento em que a Tower afirma.
2. **O fechamento** — todas as páginas terminavam num quadro creme sobre papel.
   O verde do WhatsApp contra o grafite é o contraste mais forte do sistema, e
   desperdiçá-lo justamente no momento da decisão era o erro. `BlocoCta` foi
   removido; existe só `FechamentoCta`, que sangra de borda a borda.

### Cards deixaram de ser a resposta padrão

24 grades de cards no site → 8. As 8 que ficaram são conjuntos de destinos
realmente equivalentes (categorias da Home, índices).

Card é uma **promessa de equivalência entre itens**. Quando os itens não são
equivalentes, a régua é mais honesta — e ocupa menos altura, o que no celular é
a diferença entre ver e não ver. Duas substituições:

- `ListaLinks variante="numerada"` — quando a lista é um raciocínio
  ("o que a Tower trabalha para essa rotina").
- `ListaLinks variante="simples"` — quando são atalhos laterais que não deveriam
  competir com o conteúdo ("onde essa proteção costuma ser usada").

`LinksIrmaos` recolheu quatro cópias da mesma marcação de "outras profissões /
outros tipos / outros setores", agora sobre creme.

### `Secao` ganhou compasso

`ritmo="compacto" | "normal" | "amplo"`. A monotonia não vinha só da cor: vinha
de toda seção respirar igual. `pt-0` e `pb-0` continuam vencendo por cima —
`.ritmo-*` vive na camada de componentes e o Tailwind resolve utilidades depois.

### `data-continua` — intenção declarada no código, não exceção no teste

A verificação de QA reprova duas faixas escuras adjacentes, porque quase sempre é
descuido. Onde é de propósito — trilha + cabeçalho + prova formando uma abertura
de capítulo única em `/empresas/` — o elemento seguinte carrega `data-continua`.
A exceção mora no código, não numa regra especial dentro do teste.

### `.btn-linha`
Contorno para superfície escura. `.btn-ghost` usa texto em tinta e desaparece no
grafite — o que só se descobre olhando.

### Duas armadilhas do próprio QA, registradas
1. **Limiar de luminância não é contraste.** A primeira versão reprovava o
   vermelho-claro sobre grafite, que passa em AA com folga (5,36:1).
2. **Regex não lê cor de CSS moderno.** O Tailwind v4 resolve `text-paper/70`
   para um `color-mix()` que o navegador devolve em oklab; extrair "números" dali
   produz lixo — todas as medições vinham 1,30:1. Toda cor passa por um canvas,
   que normaliza qualquer sintaxe e ainda entrega o alfa.

### O que ficou de fora, e por quê
`/orcamento/` continua sem faixa escura. É um formulário, e a página é o
formulário: escurecer campos de preenchimento prejudica o uso sem ganhar nada.

---

## O QUE O SISTEMA NÃO TEM — DE PROPÓSITO

Sem gradiente. Sem sombra decorativa. Sem card com borda arredondada. Sem ícone
genérico. Sem animação de rolagem. Sem parallax. Sem biblioteca de UI.

O briefing pediu que o resultado não parecesse "template de loja de EPI" nem
startup. A forma de conseguir isso não é adicionar — é **remover até sobrar
tipografia, grid, espaço e contraste**.

---

## PENDÊNCIA CRÍTICA: FOTOGRAFIA

O sistema está desenhado para fotografia real e **ainda não tem nenhuma**.
O questionário confirma que existem fotos dos fundadores, da primeira sede e dos
logotipos antigos.

Enquanto não chegam, todas as áreas previstas para foto foram resolvidas
tipograficamente — nunca com banco de imagens, que é o que o briefing proíbe e o
que destruiria a promessa de autenticidade do projeto.

**Prioridade das fotos:**
1. Helano e Cristina (Home, `/a-tower/`, `/a-tower/helano/`)
2. Primeira sede no Montese, 1995 (`/a-tower/`) — o ativo visual mais valioso
3. Logotipos antigos (`/a-tower/`)
4. Produtos das linhas trabalhadas (páginas de calçado e proteção)
