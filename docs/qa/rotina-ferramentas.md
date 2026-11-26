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
| 1 | Calculadora de tamanho de botina | `/ferramentas/tamanho-de-botina/` | `qa-tamanho-botina-logica`, `qa-tamanho-botina` (build de prévia se a trava estiver ativa) | medida em cm → numeração, pela tabela de `src/content/tabelas-numeracao.json`, de 18 a 34 cm de décimo em décimo; pés diferentes; tabela da página = resultado da calculadora | |
| 2 | Grade de numeração da equipe | `/ferramentas/grade-de-numeracao/` | `qa-grade-equipe-logica`, `qa-grade-equipe` | soma por número, total de pares, reserva calculada sobre pares e arredondada para cima, distribuição da reserva pelos maiores restos, CSV = tela = mensagem | |
| 3 | Qual calçado usar | `/ferramentas/qual-calcado-usar/` | `qa-qual-calcado-logica`, `qa-qual-calcado` | cada combinação de resposta leva à categoria que as regras de `src/lib/qual-calcado.ts` mandam (biqueira só com impacto, impermeável com líquido etc.) | |
| 4 | Formulário de orçamento | `/orcamento/` | `qa-navegador` (parte do orçamento) + percurso próprio do especialista | soma da numeração por item, total de pares na mensagem, nenhum item perdido, limite de tamanho do link do WhatsApp | |
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
