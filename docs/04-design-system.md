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
