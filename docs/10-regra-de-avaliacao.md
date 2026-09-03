# Regra do projeto: avaliação de título, descrição e CTR

**Publicado o marco zero em 3 de setembro de 2026.** A partir dele, título,
description e H1 não são mexidos por conta própria. Mexer toda semana destrói
a leitura dos dados — não dá para saber o que mudou o quê.

## O período

**60 dias até a primeira leitura, 90 até a primeira decisão.**

Por quê 60 e não 30: site com dias de vida. Nos primeiros 30, o Google ainda
está rastreando e decidindo o que indexar; o que aparece no Search Console é
ruído. Aos 60 dias há impressão suficiente nas consultas de maior volume para
ver *padrão*, mesmo sem volume para ver *significância*. Aos 90, dá para
comparar dois meses fechados entre si.

Por quê não 120 ou mais: cada dia sem leitura é um dia com snippet
possivelmente errado em toda impressão. A partir de 90, o custo de esperar
passa a ser maior do que o risco de decidir com pouca amostra.

## O ritual, a cada período

1. Exportar do Search Console: consulta, página, impressões, cliques, CTR,
   posição — período fechado, comparado ao anterior quando houver.
2. Rodar `node docs/ferramentas/auditoria-ctr.mjs` e comparar com o marco zero
   em `docs/ferramentas/marco-zero-2026-09-titles.txt`.
3. Só então perguntar, por URL: muitas impressões e CTR baixo? posição 1–3 com
   CTR abaixo do esperado? posição 4–20 subindo? consulta inesperada?
4. Mudar **só o que o dado justifica**, e registrar a data da mudança para a
   próxima leitura ter linha de base.

## O que nunca decide sozinho

Uma página com 3 impressões e 0 cliques não tem CTR ruim — tem ausência de
amostra. Não se conclui nada de amostra pequena. Não se troca título porque
apareceu uma frase mais bonita.

## O lembrete

Existe uma rotina agendada que abre uma sessão no dia 1º de cada mês ímpar
(novembro, janeiro, março…) com a lista acima. Ela não decide nada: lembra,
roda a comparação estrutural, e pede a exportação do Search Console, que só
vocês têm.
