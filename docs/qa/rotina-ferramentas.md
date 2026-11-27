# Rotina diária das ferramentas — duas por dia

Pedido do Renato em 26/11/2026: uma rotina diária só para as ferramentas e
funcionalidades do site, duas por dia, com especialistas de cada área e com
conferência das contas. Roda pelo agendamento "Tower EPI's — QA diário de 2
ferramentas" e segue também os seis passos do CLAUDE.md.

## A fila

Uma rodada pega as **duas primeiras linhas com a data mais antiga** (ou sem
data) e, no fim, grava a data e o commit. Com seis itens, cada um volta a
cada três dias.

| # | Ferramenta | Rota | Testes próprios | Contas que precisam fechar | Última rodada |
|---|---|---|---|---|---|
| 1 | Calculadora de tamanho de botina | `/ferramentas/tamanho-de-botina/` | `qa-tamanho-botina-logica`, `qa-tamanho-botina` (build de prévia se a trava estiver ativa) | medida em cm → numeração, pela tabela de `src/content/tabelas-numeracao.json`, de 18 a 34 cm de décimo em décimo; pés diferentes; tabela da página = resultado da calculadora | 2026-11-26 (e9325f0) |
| 2 | Grade de numeração da equipe | `/ferramentas/grade-de-numeracao/` | `qa-grade-equipe-logica`, `qa-grade-equipe` | soma por número, total de pares, reserva calculada sobre pares e arredondada para cima, distribuição da reserva pelos maiores restos, CSV = tela = mensagem | 2026-11-26 (e9325f0) |
| 3 | Qual calçado usar | `/ferramentas/qual-calcado-usar/` | `qa-qual-calcado-logica`, `qa-qual-calcado` | cada combinação de resposta leva à categoria que as regras de `src/lib/qual-calcado.ts` mandam (biqueira só com impacto, impermeável com líquido etc.) | 2026-11-27 (08cfa53) |
| 4 | Formulário de orçamento | `/orcamento/` | `qa-navegador` (parte do orçamento) + percurso próprio do especialista | soma da numeração por item, total de pares na mensagem, nenhum item perdido, limite de tamanho do link do WhatsApp | 2026-11-27 (08cfa53) |
| 5 | Barra contextual e botões de WhatsApp | todas as rotas | `qa-barra`, `qa-navegador` | mensagem de cada página corresponde ao contexto; número do WhatsApp = `empresa.ts` em todas as rotas | |
| 6 | Consentimento e medição | todas as rotas | `qa-privacidade` | zero cookie e zero host externo antes do aceite e depois da recusa | |

## Os especialistas

Para cada ferramenta da rodada, três agentes em paralelo, cada um com um
papel e um entregável. Nenhum deles altera código: eles acham e provam.
Quem corrige é a rodada principal, que depois roda tudo de novo.

1. **Engenheiro de QA e automação de testes.** Abre a ferramenta no
   Chromium do Playwright (site em :3000), roda os testes próprios da tabela,
   e testa à mão cada botão, campo, link, recarregar, voltar, duplo clique,
   entrada inválida e o envio para o WhatsApp. Entrega a lista de falhas com
   o passo a passo para reproduzir.
2. **Especialista em mobile e acessibilidade.** Celular emulado (Pixel 7 e
   iPhone 13) e larguras 320, 360, 390, 412 e 768: rolagem horizontal, alvo
   de toque de 44 px, teclado numérico nos campos de número, foco visível,
   leitura por leitor de tela (rótulos, aria), contraste. Entrega falhas com
   largura, aparelho e captura.
3. **Auditor de cálculo.** Refaz as contas **de forma independente**, a partir
   dos dados de origem (tabelas, regras), sem copiar a lógica do componente,
   e compara com o que a tela, a mensagem do WhatsApp e os arquivos baixados
   mostram, numa amostra grande de entradas, incluindo bordas (zero, máximo,
   valores quebrados, vírgula e ponto). Entrega cada divergência com a
   entrada, o valor esperado e o valor mostrado. Para as ferramentas 5 e 6,
   o "cálculo" é a correspondência de mensagens e a contagem de cookies.

## Depois dos especialistas

1. Separar o que é defeito do site do que é falso positivo do teste.
2. Corrigir os defeitos (correção de defeito não tem lote) e, se um teste
   estiver errado, corrigir o teste e registrar no `LEIA-ME.md`.
3. Repetir os testes que falharam, os testes próprios da ferramenta e o
   `qa-navegador` inteiro, mais tsc e build. Só então commit e push.
4. Gravar a data e o commit na tabela acima.
5. Resumo para o Renato: por ferramenta, o resultado de cada especialista,
   o que foi corrigido, a prova de que as contas fecham (quantas entradas
   conferidas, quantas divergências) e o que ficou pendente.

## Histórico

**26/11/2026 — rodada 1: tamanho de botina e grade da equipe.** Seis
especialistas. Correções:

- Calculadora de botina: a conta usava o passo arredondado 6,667 mm e dava
  "38 ou 39" para 25,8 cm e "39" para 26,2 cm, à mesma distância do 39; agora
  usa a fração exata da fonte (20/3). 8 de 161 medidas mudaram, todas para o
  número único que a regra declarada manda. O link passou a guardar os dois
  pés; o foco volta ao campo depois de "Usar X cm".
- Grade: nome digitado depois do número ("40, Xavier") virava setor e saía na
  mensagem e no que fica salvo (privacidade); valor inválido seguia somando;
  mensagem errada acima de 20.000; modelo continuava depois de "Não"; duplo
  clique trocava de etapa duas vezes; campos "Outro" sumiam no meio da
  digitação; "39,5" e "40; 41" entravam sem aviso; "Paulo ?" era ignorado;
  frase errada com reserva de 0%; "1 pares"; "Faltam 1"; desempate da
  reserva por ponto flutuante; linhas recusadas além da 10ª sem aviso.
- Acessibilidade em todo o site: botão de WhatsApp 4,31:1 → 5,14:1; foco
  visível nas opções com rádio escondido; contorno claro sobre superfície
  escura, vermelha e degradê; foco do "pular para o conteúdo"; borda de campo
  3,6:1; placeholder 4,6:1; foco não fica sob o cabeçalho e o placar; regiões
  de status persistentes; ordem do Tab igual à visual no celular; nome sem
  corte na lista.
- Contas conferidas pelos auditores: 238 entradas na calculadora de botina (8
  divergências, corrigidas) e 267 grades (nenhuma conta errada; 30 frases do
  0%, corrigidas).
- Pendente, decisão de produto: botão "voltar" do navegador sai da
  ferramenta em vez de voltar uma etapa; link com medida inválida volta ao
  início sem aviso.

**27/11/2026 — rodada 2: qual calçado usar e formulário de orçamento.** Seis
especialistas. Correções:

- Qual calçado: emoji na posição 60 do "Outro" derrubava a página inteira
  (corte no meio do emoji; agora corta por caractere, em 80, como o campo);
  duplo clique respondia a pergunta seguinte sem a pessoa ver; "constructor" e
  "__proto__" passavam na URL e iam para a mensagem; incômodo repetido na URL;
  link de equipe sem tamanho abria com respostas marcadas; URL inválida ficava
  na barra; a página abria já rolada até a pergunta, pulando título e aviso;
  campo "Outro" com borda de 1,40:1; texto cinza com 4,02:1 no creme (ink-3
  escurecido no site inteiro, agora 4,66:1).
- Orçamento: tela somava negativo e a mensagem não; "1e3", "1.5", "abc" e
  números enormes iam crus (agora inteiro de 1 a 99.999 nos dois lugares);
  quantidade escondida sobrava ao trocar de categoria; duplo clique abria o
  WhatsApp duas vezes; e-mail longo estourava a prévia no celular; cópia
  falhava calada; foco perdido ao remover item; política na mesma aba apagava o
  formulário (abre em nova aba, e o aviso diz que nada é salvo); "(1 pares)";
  título ENTREGA sozinho; campos sem dizer de qual item são; sem autocomplete
  em nome, empresa e cidade; foco não ia para o item novo; Remover e caixas da
  grade abaixo de 44px.
- Contas e regras conferidas pelos auditores: 210 combinações do "Qual
  calçado" (nenhum erro de decisão; o link compartilhado não leva o texto do
  "Outro", de propósito, por privacidade) e 160 orçamentos (5 "1 pares" e 3
  casos-borda, todos corrigidos). Novo teste `qa-orcamento-logica`: 5.000
  orçamentos sorteados.
- Testes do projeto ajustados (falso positivo, registrado no LEIA-ME):
  `qa-qual-calcado` agora espera 500ms entre respostas e não cobra foco na
  primeira tela.
- Pendente, decisão de produto: o orçamento não guarda o que foi digitado
  (recarregar apaga tudo); limite de mensagem conta caracteres, não o
  tamanho do link com acentos; setas do teclado não andam entre as opções.
