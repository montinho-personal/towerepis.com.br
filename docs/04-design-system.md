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

## FOTOGRAFIA — O QUE CHEGOU

**Retrato de Helano e Cristina** (2046×3074). Entrou em três lugares, e só
três, porque repetir a mesma foto gasta o efeito dela:

| Onde | Por quê |
|---|---|
| Home, "Quem responde" | Fecha o argumento central do site. A promessa de que quem responde são os dois donos era só texto — verificável apenas depois de mandar mensagem. Agora se vê antes. |
| `/a-tower/`, "Quem atende" | Dá rosto aos dois cartões de biografia. |
| `/a-tower/helano/` | Página de autoria: é ela que sustenta o E-E-A-T dos artigos, e rosto com nome e função faz mais por isso do que declaração. |

O recorte só do Helano guarda a mão da Cristina no ombro dele. A foto não
separa os dois em enquadramento nenhum — ela está atrás dele em todos. Em
tamanho pequeno aquilo virava mancha escura sem sentido, então o retrato dele
é grande o bastante para a mão se ler como mão.

O componente `Retrato` é o único caminho para foto de pessoa: sem canto
arredondado, sem sombra e sem moldura. O fundo do estúdio é um tom quente
(#b39d89) bem mais escuro que o papel, então a foto se recorta sozinha —
moldura em cima disso viraria porta-retrato.

**Peso:** o PNG de 5,1 MB virou JPEG de 466 KB, e o `next/image` entrega AVIF
de **19 KB** no tamanho em que aparece. Todas com `width`/`height` declarados,
então não há deslocamento de layout.

**Dados estruturados:** `Person` do Helano ganhou `image`, e a `Organization`
ganhou `logo` e `image`. É o que o Google usa em painel de conhecimento.

## O LOGOTIPO — RESOLVIDO

Chegou o vetor (`Logo tower EPIS 2.ai`), e ele respondeu a divergência que eu
tinha registrado.

**Eu tinha errado.** A versão anterior do `Logo.tsx` punha um ponto vermelho no
lugar do O. Era invenção minha, feita a partir de uma leitura do Instagram. O
vetor oficial mostra o **O comum**. Corrigido.

**A tipografia da marca é Museo** — 700 no "TOWER", 300 no "EPI's". Isso estava
dentro do arquivo, em duas fontes CFF embutidas.

**A marca vai inteira, como ela é.** Fundo, seis facetas, degradês e tipografia
— reconstrução fiel do arquivo. Diferença média para o original: **0,46 de 255
por pixel**; o que resta é serrilhado de renderização.

Eu tinha feito uma primeira versão que descartava o fundo e o degradê, para a
marca herdar a cor do texto. O argumento era razoável — degradê não escala e o
sistema não tem nenhum — mas a decisão não era minha. Adaptar a marca de alguém
sem pedir é o mesmo erro do ponto, de outro tamanho.

**Como foi reconstruída:**
- As seis facetas e as matrizes de degradê saíram do content stream do PDF que
  mora dentro do `.ai`, percorrido por `docs/ferramentas/selo.py` — percorrido,
  não transcrito, porque transcrever caminho a olho é onde entram os erros que
  ninguém vê.
- Os degradês do PDF interpolam por t^1.61089 e o SVG só interpola linear entre
  paradas, então cada um virou doze paradas amostradas dessa curva.
- Os glifos são os contornos reais das duas fontes CFF embutidas, com o kerning
  do arquivo: −19 entre T e O, −10 entre O e W, e o "s" puxado para debaixo do
  apóstrofo por um `Td` de 1,597 em em vez do avanço natural.

**Contornos, não texto.** Um logotipo é artwork; tratá-lo como tipografia viva
criaria dependência de uma fonte comercial que o site não licencia, e a marca
quebraria em qualquer máquina sem Museo instalado.

**O selo é quadrado, e quem chama define o lado.** *(Histórico: o selo saiu do cabeçalho na correção seguinte, abaixo.)* O cabeçalho encolhe ao rolar
(88px → 64px), então o logo encolhe junto. `h-13`/`w-13` não existem no Tailwind
deste projeto — teriam falhado em silêncio, com o logo sem tamanho ao rolar. As
medidas fora da escala vão como valor explícito.

**`prefixo` é obrigatório** porque os degradês precisam de id e a marca aparece
duas vezes na mesma página. Ids repetidos fariam a segunda instância apontar
para os degradês da primeira: funciona por acidente, já que são idênticos, e
quebra no dia em que deixarem de ser.

**O favicon é o selo inteiro.** A 16px o tipo dentro não lê — vira um quadrado
vermelho. É o mesmo que acontece com o avatar deles no Instagram, e é o
quadrado vermelho que faz o reconhecimento. A 32px, que é o tamanho real na
maioria das telas hoje, o "TOWER" já aparece.

**O card de compartilhamento foi refeito.** Ele carregava o logo inventado, e é
a imagem que aparece em toda prévia de link no WhatsApp — o canal de conversão
do site inteiro. `apple-icon.png` também.

### Onde cada versão vive

| Arquivo | Onde | Por quê |
|---|---|---|
| `Logo.tsx` (inline) | cabeçalho e rodapé | Sem requisição extra, e o selo carrega as próprias cores. |
| `public/marca-tower-epis.svg` | asset solto | Para quando alguém precisar da marca fora do site. |
| `src/app/icon.svg` | favicon | O selo inteiro. A 16px vira o quadrado vermelho, que é o que reconhece. |
| `src/app/opengraph-image.png` | prévia de link | Refeito com o selo real. |
| `src/app/apple-icon.png` | tela de início no iOS | O selo, 180px. |
| `public/logo-tower-epis.png` | `logo` nos dados estruturados | O selo quadrado com fundo, que é o formato que o Google quer. |
| `docs/originais/logo-tower-epis.ai` | arquivo-fonte | Fora de `public/`, porque origem não se serve. |

### Como extraí, caso precise de novo
O `.ai` é um PDF por dentro. As bibliotecas disponíveis (fontkit, opentype.js)
só aceitam CFF dentro de um invólucro OpenType, e o que estava lá era CFF puro
— 1,3 KB. Interpretar os charstrings Type 2 direto deu menos trabalho do que
montar um OTF mínimo em volta. O interpretador está em
`docs/ferramentas/cff.py`.

---

## O LOGOTIPO, SEGUNDA CORREÇÃO — A MARCA PRETA

Chegaram mais dois arquivos: `LOGO TOWER PRETA.ai` e `Tower epis.jpg`. A marca
preta é o logotipo sem o selo: "TOWER" em preto com a régua embaixo, "EPI's"
em preto, e **o O em degradê vermelho** — dez preenchimentos e um shading, que
o JPG confirma.

**Eu tinha errado duas vezes.** Primeiro inventei um disco vermelho no lugar do
O. Depois, vendo o selo, declarei o O "comum". A marca preta mostra a verdade:
o O é a própria letra, preenchida com o degradê vermelho da marca. Nem disco,
nem comum. A correção está registrada no comentário do `Logo.tsx` para não se
perder.

**Esta é a versão que vai no cabeçalho e no rodapé.** O selo quadrado exigia
um bloco vermelho encostado no papel — e a régua do próprio logotipo dá ao
cabeçalho a ideia que ele precisava (abaixo). O selo continua sendo a marca
para favicon, prévia de link, ícone do iOS e dados estruturados, porque nesses
lugares o quadrado vermelho é o que reconhece.

**Como funciona o componente:**
- `tom="claro"` (fundo papel) ou `tom="escuro"` (fundo grafite): o tipo herda
  `currentColor`; o O carrega o próprio degradê, que é arte da marca e por isso
  é o único degradê permitido no sistema.
- `REGUA_DA_MARCA = 0.532` — a régua entre TOWER e EPI's fica a 53,2% da altura
  da marca, medida na bbox justa (`535.8 343.27 854.09 396.86`). O cabeçalho
  usa esse número.
- `prefixo` continua obrigatório: clip-path e degradê precisam de id único por
  instância.
- Extração: `docs/ferramentas/selo.py` ganhou um irmão para o `.ai` preto
  (`m/l/c/v/y/h/re/W n/cm/q/Q/sh`); o shading axial com expoente 1,61383 virou
  doze paradas, com `gradientUnits="userSpaceOnUse"` e a matriz do PDF em
  `gradientTransform`.

| Arquivo | Onde |
|---|---|
| `Logo.tsx` (inline) | cabeçalho (`tom="claro"`) e rodapé (`tom="escuro"`) |
| `public/marca-tower-preta.svg` | asset solto da marca preta |
| `docs/originais/logo-tower-preta.ai`, `tower-epis-foto.jpg` | arquivos-fonte, fora de `public/` |

---

## O CABEÇALHO — A RÉGUA QUE CONTINUA

O pedido foi "mais bonito, artístico". O teste do cabeçalho todo vermelho já
tinha mostrado o limite: o selo não lê sobre vermelho, e o tipo branco sobre
vermelho custa o botão vermelho e briga com o botão verde flutuante. O caminho
não era mais cor. Era um gesto que só esta marca pode fazer.

**A ideia:** o logotipo tem uma régua entre "TOWER" e "EPI's". A navegação tem
uma linha fina exatamente na mesma altura. A régua da marca continua por baixo
dos rótulos até o botão. No hover, o trecho da linha sob o item vira vermelho —
3px, com `scale-x` da esquerda — e o rótulo escurece. O menu deixa de ser uma
fileira de links e passa a ser a marca estendida.

**Como está montado:**
- **Fita** de 32px em grafite por cima: "Fortaleza — CE · Desde 1995" à
  esquerda, o WhatsApp à direita. No celular sobra só "Desde 1995" e o número.
  Some ao rolar (`max-h-0 opacity-0`), sem mexer no layout.
- **Masthead** de 72px (88px em `sm`) que encolhe para 56/64 ao rolar. A marca
  vai de `h-11 sm:h-14` a `h-9 sm:h-10`.
- **A lista de navegação tem a mesma altura da marca** (`items-start` + a
  classe de altura da marca), e a linha fina é um `span` absoluto em
  `top: 53.2%` — o mesmo `REGUA_DA_MARCA`. Como as duas caixas têm a mesma
  altura e o mesmo topo, a régua bate por construção, em qualquer tamanho.
  Medido: 77,79px na marca, 77,78px na linha, no topo; 33,28 e 33,27 rolado.
- O botão "Pedir orçamento" continua vermelho, único vermelho sólido do
  cabeçalho, e a fita grafite é a superfície escura da abertura — a hero de
  cada página continua sendo o que era.
- No celular a régua da marca fica sozinha, sem continuação: não há rótulos
  para ela seguir, e desenhar uma linha até o botão do menu seria decoração.

**O que não foi feito, de propósito:** nenhum degradê, sombra ou animação além
do trecho vermelho. O cabeçalho tem duas surpresas — a linha que continua e o
vermelho que acende — e é o suficiente.

**Duas superfícies escuras:** a fita é grafite e encosta na hero de papel, não
em outra superfície escura. Nas páginas de hub, cuja `Trilha` é escura, a
fita e o masthead de papel ficam entre elas: a regra "duas superfícies escuras
nunca se encostam" continua valendo, e o QA confirmou (0 problemas em 42
páginas).

---

## O DESTAQUE DEIXOU DE SER SEMPRE UM NÚMERO

A barra de prova nasceu com quatro números. Quando "Bompel" entrou no lugar de
um deles — a parceria de hoje, que o cliente pediu para destacar —, o slot do
numeral passou a receber seis letras onde antes cabiam quatro dígitos
tabulares. A 52px, "Bompel" pede 178px e a coluna de celular tem 128 a 174.

**Estourava a página inteira abaixo de 360px**, e estourava de novo **em
1024px**, onde a grade vira quatro colunas com o container ainda estreito — a
coluna encolhe de 288 para 218px justamente quando o tipo cresce para 68px.

O tamanho agora acompanha a coluna, fluido, e os quatro destaques escalam
juntos: uma linha só de tamanho em qualquer largura, que é o que faz a barra
parecer composta e não montada.

```
text-[clamp(2.1rem,calc(11.5vw-6px),3.25rem)]   sm:text-[4.25rem]
lg:text-[clamp(3.5rem,5.5vw,4.25rem)]
```

Os tetos — 3,25rem e 4,25rem — são exatamente `text-5xl` e `text-6xl`, os
tamanhos de antes. Onde já cabia, nada mudou: de 505px para cima no celular e
de 1236px para cima no desktop, o tamanho é o mesmo de sempre. A fórmula da
base é a largura real da coluna (`0,5·vw − 32`) dividida pelo avanço da fonte,
com folga; a de `lg` idem, sobre a coluna de quatro.

**A regra que fica:** destaque com palavra não é destaque com número. Antes de
pôr uma palavra no slot do numeral, medir a coluna mais estreita em que ela vai
cair — que quase nunca é a do celular, e quase sempre é a do primeiro
breakpoint de várias colunas.

### A armadilha de grade, segunda aparição

A coluna de texto dos artigos (`prose-tower`) é item de grade, e item de grade
tem `min-width: auto`. A tabela comparativa dentro dela — mesmo tendo o próprio
`overflow-x-auto`, que deveria bastar — empurrava a coluna para 337px dentro de
uma tela de 320. `min-w-0` no item resolve. É a mesma armadilha do retrato do
Helano, no mesmo projeto, pela segunda vez: **toda vez que algo largo entra num
item de grade, o item precisa de `min-w-0`.**

### O que a QA aprendeu

A QA media 390 e 1440. Os dois defeitos acima passaram nas duas: um vive
abaixo de 360, o outro em 1024. Duas larguras não são uma amostra — são dois
pontos escolhidos por hábito. `docs/ferramentas/qa-larguras.mjs` agora varre as
42 rotas em doze larguras, de 320 a 1440, procurando página que rola na
horizontal e texto que não cabe na própria caixa.

Falso positivo conhecido e registrado no próprio arquivo: o "1995" decorativo
do rodapé transborda a coluna de propósito, para a calha vazia ao lado.

---

## AINDA FALTA

O sistema está desenhado para mais fotografia do que tem.
O questionário confirma que existem fotos da primeira sede e dos
logotipos antigos.

Enquanto não chegam, todas as áreas previstas para foto foram resolvidas
tipograficamente — nunca com banco de imagens, que é o que o briefing proíbe e o
que destruiria a promessa de autenticidade do projeto.

**Prioridade do que falta:**
1. ~~Helano e Cristina~~ — chegou.
2. Primeira sede no Montese, 1995 (`/a-tower/`) — o ativo visual mais valioso
   que a empresa tem, e o único que nenhuma outra distribuidora pode ter.
3. Logotipos antigos (`/a-tower/`)
4. Produtos das linhas trabalhadas (páginas de calçado e proteção)
5. Uma foto de trabalho dos dois. O retrato que chegou é de estúdio, formal, e
   isso contrasta com o argumento de "nunca saíram do balcão". Ele funciona
   onde está; uma foto no meio do estoque ou atendendo faria outro trabalho,
   que o de estúdio não faz.
