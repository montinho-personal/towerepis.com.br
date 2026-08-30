# towerepis.com.br

Site institucional e central de conhecimento da **Tower EPI's** — distribuidora de
Equipamentos de Proteção Individual em Fortaleza/CE, desde 1995.

## O que este site é (e o que não é)

**É** um sistema de ajuda à decisão que leva o visitante orientado até uma conversa
no WhatsApp.

**Não é** um e-commerce, nem um catálogo. Não há carrinho, não há preço no site.
O fechamento acontece no WhatsApp, com atendimento humano — e o papel do site é
fazer boa parte do trabalho comercial antes disso.

```
ATRAIR → ENTENDER → ORIENTAR → GERAR CONFIANÇA → QUALIFICAR → WHATSAPP
```

## Estado atual

**Fase 1 (Descoberta e Estratégia) concluída — aguardando aprovação.**
Nenhum código foi escrito ainda, por decisão de processo.

| Fase | Entrega | Status |
|---|---|---|
| 1 | Descoberta e leitura estratégica | ✅ Concluída, aguardando aprovação |
| 2 | Posicionamento | ⏸ Bloqueada (falta o questionário de história) |
| 3 | SEO e arquitetura definitiva | ⏸ Bloqueada (falta NAP e dados de operação) |
| 4 | Jornadas | ⏸ |
| 5 | Wireframes | ⏸ |
| 6 | Copy | ⏸ |
| 7 | Design System | ⏸ Bloqueada (falta material do Instagram) |
| 8 | UI | ⏸ |
| 9 | Implementação | ⏸ |
| 10 | QA | ⏸ |

## Documentos

| Arquivo | Conteúdo |
|---|---|
| [`docs/01-fase-1-descoberta-e-estrategia.md`](docs/01-fase-1-descoberta-e-estrategia.md) | Leitura estratégica, ativos, concorrência, SEO, posicionamento, conceito, arquitetura, jornadas |
| [`docs/informacoes-pendentes.md`](docs/informacoes-pendentes.md) | O que falta receber e o que cada item destrava |

## Princípios inegociáveis do projeto

Extraídos do briefing e assumidos como regra de execução:

1. **Nada inventado.** Nenhum número, depoimento, credencial ou selo sem lastro.
2. **Norma citada tem fonte oficial e data.** gov.br / MTE / Fundacentro / texto vigente da NR.
3. **Nenhuma afirmação de adequação de EPI a risco específico por inferência.**
   O site orienta; não substitui avaliação técnica de riscos quando ela for necessária.
4. **Fotografia real.** Zero banco de imagens.
5. **Todo CTA carrega contexto** e monta a mensagem do WhatsApp. Nada de "Fale conosco" genérico.
6. **Sem dark pattern**, sem falsa urgência, sem popup, sem chatbot.
7. **Sem página local para cidade onde não há operação real.**
8. **Mobile-first de verdade**, não desktop reduzido.
9. **Performance acima de animação.** LCP < 2,0s, CLS < 0,05, INP < 200ms.
10. **Conteúdo técnico é assinado e datado.**

## Stack previsto

Next.js (App Router, majoritariamente estático) · conteúdo em MDX versionado ·
deploy na Vercel · sem CMS externo na v1.

*Premissas detalhadas no Anexo A da Fase 1 — a confirmar na Fase 9.*
