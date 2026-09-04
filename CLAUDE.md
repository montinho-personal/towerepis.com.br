# Tower EPI's — instruções do projeto

Site institucional de distribuidora de EPI em Fortaleza, no ar em
`towerepis.com.br`. Next.js (App Router), TypeScript, Tailwind v4, conteúdo
tipado em `src/content`, deploy na Vercel a partir de `main`.

Não vende online. **O WhatsApp é o único canal de conversão.**

---

## Antes de executar qualquer tarefa

**Avaliar o ritmo e apresentar a avaliação junto com o plano** — de uma vez ou
dividido em lotes, com o motivo. A regra completa, incluindo por que "o Google
penaliza quem publica muito de uma vez" é falso e o que é risco de verdade,
está em `docs/16-regra-de-ritmo.md`.

Resumo operacional:

- **Conteúdo novo em URL nova:** no máximo dois artigos por lote, com a
  auditoria de canibalização entre os lotes. O limite é a revisão, não o Google.
- **Correção de defeito:** tudo de uma vez. Defeito não tem lote.
- **Mudança em página já indexada** (título, description, canonical, links):
  divide, e só depois que houver Search Console para medir.
- **Trabalho invisível ao buscador** (imagem, acessibilidade, cabeçalho HTTP):
  tudo de uma vez.

---

## Regras que não se quebram

1. **Nunca inventar número, depoimento, credencial ou selo.** Se não foi
   medido ou confirmado, não vai para o site.
2. **Nenhuma afirmação normativa sem fonte oficial.** Conteúdo sobre NR, CA ou
   norma técnica cita a fonte e traz data de revisão.
3. **Não publicar endereço.** A empresa opera como *service-area business*
   desde 2018. Nada no site pode sugerir loja, filial ou atendimento
   presencial.
4. **Não citar Grupo Vicunha nem Grupo Santana Têxtil** sem autorização
   escrita.
5. **A 3M aparece como história** — o convite de 1995, o prêmio. Nunca como
   promessa de estoque. A parceria atual em destaque é a Bompel.
6. **Título, description e H1 estão congelados** até a revisão de 1º de
   novembro de 2026. Ver `docs/10-regra-de-avaliacao.md`.
7. **Todo artigo tem FAQ.** `perguntas` é campo obrigatório do tipo `Artigo` —
   artigo sem FAQ não compila. O que entra no campo está na declaração do tipo.
8. **Sem foto de banco de imagem.** Só foto real da empresa.
9. **Fonte única de verdade:** todo dado factual sai de `src/config/empresa.ts`.
   Nenhum componente escreve telefone, ano ou credencial na mão.
10. **Se um dado obrigatório não existe, marcar `[INFORMAÇÃO NECESSÁRIA]`** em
    vez de preencher com aproximação.

---

## Medir antes de afirmar

Nenhuma afirmação sobre o site entra numa resposta sem ter sido medida. As
ferramentas estão em `docs/ferramentas/`, documentadas no `LEIA-ME.md` de lá:

```
npm run build && npx next start -p 3000        # e -p 3122 para o rastreador
node docs/ferramentas/qa-larguras.mjs          # estouro horizontal, 12 larguras
node docs/ferramentas/qa-privacidade.mjs       # cookies e hosts, três trilhas
node docs/ferramentas/qa-faq.mjs               # FAQ: presença e duplicação
node docs/ferramentas/qa-barra.mjs             # barra contextual, matriz
node docs/ferramentas/auditoria-rastrear.mjs   # rastreia (porta 3122)
node docs/ferramentas/auditoria-analisar.mjs   # inventário
node docs/ferramentas/auditoria-canibalizacao.mjs
```

O rastreador escreve em `auditoria/`, que é ignorado pelo git. Criar a pasta se
não existir.

**Falso positivo conhecido:** o "1995" decorativo do rodapé transborda a coluna
de propósito e aparece uma vez por página a partir de 1024px na varredura de
larguras. Não é defeito.

---

## Git

Desenvolver em `claude/tower-epis-website-v7fq8k`, manter `main` em sincronia —
a Vercel faz deploy de produção a partir de `main`. Conferir
`git fetch` antes de todo push: uma vez, um force-push apagou dois commits de
upload do cliente.
