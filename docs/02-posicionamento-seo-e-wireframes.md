# FASES 2, 3 e 5 — POSICIONAMENTO · SEO E ARQUITETURA · WIREFRAMES
### Tower EPI's · towerepis.com.br

> Base: `01-fase-1-descoberta-e-estrategia.md`. Este documento fecha as decisões
> que orientam a copy (Fase 6) e a implementação (Fase 9).
> Onde há dado pendente, está marcado `⚠️ PENDENTE` e centralizado em `src/config/empresa.ts`.

---

# FASE 2 — POSICIONAMENTO

## 2.1 Essência
**A Tower é a distribuidora onde quem atende entende de segurança do trabalho.**

Uma frase, e ela contém tudo: é distribuidora (vende produto, não consultoria),
mas a diferença está em *quem atende* (pessoa, não catálogo) e no que essa pessoa
sabe (segurança do trabalho, não vendas).

## 2.2 Promessa
> Você não vai comprar errado.

É a promessa que a Tower pode cumprir de verdade, é a dor real dos dois públicos,
e é a única coisa que nenhum marketplace consegue prometer.

## 2.3 Mensagem central

# "O melhor EPI é o que a pessoa usa o dia inteiro."

**Por que funciona:** é tecnicamente verdadeira, é fala de Técnico de Segurança do
Trabalho (não de publicitário), justifica a consultoria sem se autodeclarar
consultiva, e diz coisas diferentes para cada público sem se contradizer —
o B2C ouve *conforto*, o B2B ouve *adesão*.

**Onde vive:** hero da Home e página de história. Não se repete à exaustão;
o site inteiro é a prova dela.

## 2.4 Assinatura
**TOWER EPI'S** — *Proteção para o trabalho desde 1995.*

Uso fixo, em cabeçalho, rodapé e metadados. É posicionamento e é SEO na mesma linha.

## 2.5 Diferenciação — a tabela de decisão

| | Marketplace nacional | Concorrente local | **Tower** |
|---|---|---|---|
| Sortimento | Infinito | Amplo | Curado |
| Preço | Menor | Competitivo | Competitivo |
| Quem atende | Ninguém | Vendedor | **Quem entende do produto** |
| Erro de escolha | Por sua conta | Por sua conta | **Evitado antes da compra** |
| Prazo em Fortaleza | Dias | Rápido | Rápido |
| Tempo de casa | — | Anos | **Desde 1995** |

**A Tower não disputa as três primeiras linhas.** Disputa a quarta e a sexta,
e empata na quinta. Toda a copy do site obedece a isso.

## 2.6 Tom de voz — regras operacionais

| Regra | Errado | Certo |
|---|---|---|
| Fato mata adjetivo | "Vasta experiência" | "Desde 1995" |
| Segunda pessoa | "Oferecemos soluções" | "Você precisa de..." |
| Frase curta | Período de 4 linhas | Ponto final. Próxima. |
| Número exato | "Diversos clientes" | "Clientes que compram há mais de 20 anos" |
| Admitir limite | "O melhor calçado" | "Depende do seu piso" |
| Sem alarmismo | "Acidentes matam" | "Piso de cozinha molhado escorrega" |

**Teste do balcão:** se o Helano não diria a frase para um cliente, olhando na cara
dele, a frase não entra no site.

## 2.7 Palavras banidas
`qualidade e compromisso` · `soluções completas` · `excelência` · `sua segurança é
nossa prioridade` · `os melhores produtos do mercado` · `líder de mercado` ·
`atendimento diferenciado` · `parceiro ideal` · `entre em contato para saber mais` ·
`preços imperdíveis` · `venha nos conhecer`

## 2.8 Pilares e como cada um é PROVADO

| Pilar | Prova no site | Onde aparece |
|---|---|---|
| Critério | Conteúdo técnico correto, assinado e datado | Blog, páginas de calçado, `/a-tower/helano/` |
| Permanência | 1995; endereço fixo no Montese; clientes de décadas | Header, footer, história, empresas |
| Proximidade | Rosto, nome, endereço, WhatsApp humano | Contato, blocos de assinatura |
| Amplitude confiável | Marcas trabalhadas; comparação imparcial | Marcas, páginas de categoria |
| Agilidade | Prazo real declarado; WhatsApp direto | Empresas, contato, todo CTA |

---

# FASE 3 — SEO E ARQUITETURA DEFINITIVA

## 3.1 Nota metodológica

Não há acesso a ferramenta de volume (Keyword Planner, Ahrefs, Semrush) nesta sessão.
O mapa abaixo é derivado de **análise de SERP real** — quem ranqueia, com que tipo de
página, com que intenção. Isso é confiável para definir **arquitetura e prioridade**.

**Validação obrigatória antes de escalar conteúdo (30 dias pós-lançamento):**
1. Google Search Console — quais consultas já trazem impressão. É a fonte mais
   honesta que existe, porque é o comportamento real no seu domínio.
2. Keyword Planner (conta Google Ads, mesmo sem campanha ativa) — volume por termo,
   com filtro geográfico em Fortaleza.
3. **As 5 perguntas mais repetidas no WhatsApp da Tower.** Esta é a fonte que a
   concorrência não tem: demanda comprovada por dinheiro, não por estimativa.

## 3.2 Mapa de intenção → tipo de página

| Intenção | Exemplo de busca | Tipo de página | Conversão esperada |
|---|---|---|---|
| **Confusão** | "diferença entre calçado ocupacional e de segurança" | Página-pilar comparativa | Média — alto valor de autoridade |
| **Adequação** | "melhor calçado para cozinha" | Página de profissão | **Alta** |
| **Obrigação** | "o que diz a NR-6 sobre EPI" | Artigo com fonte oficial | Baixa — alto valor de E-E-A-T |
| **Local** | "loja de EPI em Fortaleza" | Home / contato | **Muito alta** |
| **Categoria+local** | "calçado de segurança Fortaleza" | Hub de categoria | **Muito alta** |
| **B2B** | "fornecedor de EPI para restaurante Fortaleza" | Página de setor | **Altíssimo valor** |
| **Produto** | "botina Marluvas preço" | — não atacar na v1 | — |

## 3.3 Arquitetura definitiva (URLs canônicas)

```
/                                       Home
/calcados/                              Hub calçados                    ★
  /calcados/comparativo/                Ocupacional x segurança         ★★ pilar
  /calcados/seguranca/
  /calcados/ocupacionais/
  /calcados/antiderrapantes/
/protecao/                              Hub proteção por parte do corpo
  /protecao/maos/  /protecao/respiratoria/  /protecao/auditiva/
  /protecao/olhos-e-face/  /protecao/cabeca/  /protecao/corpo/
/para-seu-trabalho/                     Hub por profissão               ★
  /para-seu-trabalho/cozinha/           ★ exemplar
  /para-seu-trabalho/enfermagem-e-saude/
  /para-seu-trabalho/limpeza-e-conservacao/
  /para-seu-trabalho/construcao/
  /para-seu-trabalho/industria/
  /para-seu-trabalho/logistica-e-estoque/
  /para-seu-trabalho/manutencao/
/empresas/                              Trilha B2B                      ★
  /empresas/orcamento/                  Formulário → WhatsApp           ★★ conversão
  /empresas/como-atendemos/
  /empresas/alimentacao/  /empresas/saude/  /empresas/industria/
  /empresas/construcao/   /empresas/facilities-e-limpeza/
/encontrar-epi/                         Ferramenta de orientação
/marcas/                                Marcas trabalhadas
/a-tower/                               História                        ★
  /a-tower/helano/                      Autor / responsável técnico     ★★ E-E-A-T
/conhecimento/                          Blog
  /conhecimento/[slug]/
/contato/                               Contato + localização           ★ SEO local
```

**Regras de URL:** minúsculas, hífen, sem acento, sem `/blog/`, sem data, sem `.html`,
sem parâmetro. Barra final consistente. Nunca reescrever URL publicada — se precisar
mudar, 301.

## 3.4 Mapa de palavras-chave por página

| URL | Alvo primário | Secundários |
|---|---|---|
| `/` | loja de EPI em Fortaleza | EPI Fortaleza · equipamentos de proteção individual Fortaleza · distribuidora de EPI Fortaleza |
| `/calcados/` | calçado de segurança Fortaleza | botina de segurança Fortaleza · calçado profissional Fortaleza |
| `/calcados/comparativo/` | diferença entre calçado ocupacional e de segurança | NBR ISO 20345 e 20347 · calçado com ou sem biqueira |
| `/calcados/antiderrapantes/` | sapato antiderrapante Fortaleza | solado SRC · calçado antiderrapante de trabalho |
| `/para-seu-trabalho/cozinha/` | calçado para cozinha | sapato antiderrapante para cozinha · EPI para cozinha industrial |
| `/para-seu-trabalho/enfermagem-e-saude/` | sapato para enfermagem | calçado para hospital · sapato para plantão |
| `/empresas/` | EPI para empresas Fortaleza | fornecedor de EPI Fortaleza · EPI no atacado Fortaleza |
| `/empresas/orcamento/` | orçamento de EPI Fortaleza | cotação de EPI para empresa |
| `/empresas/alimentacao/` | EPI para restaurante | EPI para cozinha industrial Fortaleza |
| `/protecao/respiratoria/` | máscara PFF2 Fortaleza | proteção respiratória · respirador 3M Fortaleza |
| `/contato/` | loja de EPI Montese Fortaleza | Tower EPI's endereço |
| `/a-tower/` | Tower EPI's | (marca — defesa de SERP própria) |

**Uma página, uma intenção.** Nenhuma página disputa o alvo primário de outra.
Onde há sobreposição, a página mais específica vence e a mais genérica linka para ela.

## 3.5 Estratégia de interlinking

**Três direções, cada uma com um propósito:**

```
ASCENDENTE (contexto)      artigo → hub → home
DESCENDENTE (aprofundar)   home → hub → específica
LATERAL (a jornada real)   profissão ⇄ categoria ⇄ artigo ⇄ empresas
```

**Regras:**
1. Todo artigo linka para **exatamente uma** página comercial — a mais relevante.
   Mais de uma dispersa; nenhuma desperdiça o tráfego.
2. Toda página de profissão linka para o hub de calçado E para `/empresas/[setor]/`
   correspondente — porque quem lê "cozinha" pode ser o cozinheiro **ou** o dono.
   Esta é a ponte B2C→B2B mais valiosa do site.
3. `/calcados/comparativo/` recebe link de **todas** as páginas de calçado e profissão.
   É a página-pilar: concentra autoridade.
4. Âncora descritiva, nunca "clique aqui" nem "saiba mais".
5. Máximo ~5 links internos no corpo de um artigo. Acima disso nenhum tem peso.

## 3.6 SEO técnico — checklist de implementação

**Dados estruturados**
- `LocalBusiness` — global, no layout. Com `geo`, `openingHoursSpecification`,
  `areaServed`, `sameAs`, `priceRange`. ⚠️ PENDENTE: coordenadas, horário, telefone.
- `Organization` + `WebSite` — global.
- `BreadcrumbList` — todas as páginas internas.
- `Article` / `BlogPosting` com `author` (Person), `datePublished`, `dateModified`,
  `reviewedBy` — todo conteúdo do blog.
- `Person` — `/a-tower/helano/`, com `jobTitle` e `knowsAbout`.
- `FAQPage` — **apenas** onde há pergunta genuinamente frequente, com resposta
  visível na página. Nunca marcar FAQ que o usuário não vê.
- `Product` — **não usar na v1** (sem preço e sem oferta, o markup é frágil e
  pode gerar aviso no Search Console).

**Fundamentos**
- Um `<h1>` por página, contendo o alvo primário de forma natural.
- `title` até 60 caracteres, com o termo à esquerda e a marca à direita.
- `meta description` escrita para clique, não para robô.
- `canonical` absoluto em todas as páginas.
- `sitemap.xml` e `robots.txt` gerados.
- Open Graph e Twitter Card com imagem própria.
- `lang="pt-BR"`, HTML semântico, hierarquia de headings correta.
- Imagem com `alt` descritivo real; imagem decorativa com `alt=""`.

## 3.7 Google Business Profile — ação paralela ao site

Prioridade máxima e **independente do desenvolvimento**:
1. Reivindicar o perfil e travar o nome canônico.
2. Categoria primária: *Loja de equipamentos de segurança* (validar as opções reais
   do painel). Secundárias: loja de calçados de segurança, distribuidora.
3. Fotos reais: fachada, interior, produtos, equipe. Mínimo 15.
4. Produtos e serviços cadastrados com os termos do mapa acima.
5. **Campanha de avaliações** com clientes de longa data — maior impacto/esforço
   do projeto inteiro. Meta inicial: 30 avaliações em 90 dias.
6. Perguntas e respostas: publicar e responder as 5 dúvidas mais comuns do WhatsApp.
7. Posts quinzenais reaproveitando o conteúdo do blog.

---

# FASE 5 — WIREFRAMES (estrutura e objetivo de cada seção)

Notação: cada bloco declara **objetivo psicológico** e **por que existe**.
Seção que não passa na Regra de Ouro (briefing, item 26) foi cortada.

## 5.1 HOME

A sequência abaixo diverge da proposta do briefing em um ponto e vale explicar:
**a bifurcação de público sobe para a posição 3**, antes das provas longas.
Motivo: 70%+ chega pelo celular com uma necessidade específica. Fazer essa pessoa
rolar por história institucional antes de encontrar seu caminho é o erro clássico
de site institucional. Prova e história vêm depois — **para quem ficou**.

```
┌─ 1. HERO
│  H1 posicionador + subtítulo com prova temporal + 2 caminhos
│  OBJETIVO: em 5 segundos, dizer o que é e abrir os dois caminhos.
│  "1995" presente como elemento gráfico, não como texto explicativo.
│
├─ 2. BARRA DE PROVA (uma linha, fatos)
│  Desde 1995 · Loja no Montese · Distribuidor regional 3M · Fortaleza-CE
│  OBJETIVO: reduzir incerteza antes de qualquer pedido. Fatos, zero adjetivo.
│
├─ 3. BIFURCAÇÃO ★ o bloco mais importante da Home
│  "Para o meu trabalho" | "Para minha equipe"
│  OBJETIVO: dividir por SITUAÇÃO, não por natureza jurídica. Ninguém quer
│  se declarar "pessoa jurídica"; todo mundo sabe se compra pra si ou pra equipe.
│
├─ 4. O QUE VOCÊ PRECISA PROTEGER
│  Grade de categorias, linguagem do corpo (pés, mãos, respiração, audição...)
│  OBJETIVO: entrada por vocabulário natural, não por jargão de catálogo.
│
├─ 5. A DÚVIDA MAIS COMUM
│  Bloco comparativo ocupacional x segurança → /calcados/comparativo/
│  OBJETIVO: demonstrar competência resolvendo, ali mesmo, a dúvida real —
│  em vez de afirmar que se tem competência.
│
├─ 6. POR PROFISSÃO
│  Cozinha · enfermagem · limpeza · construção · indústria · logística
│  OBJETIVO: reconhecimento imediato. "Tem o meu caso aqui."
│
├─ 7. QUEM ESTÁ DO OUTRO LADO
│  Foto real + nome + credencial + frase curta
│  OBJETIVO: converter "um site" em "uma pessoa". Resolve a objeção central
│  dos dois públicos de uma vez só.
│
├─ 8. A HISTÓRIA, EM DOSE
│  3 a 4 linhas + linha do tempo mínima → /a-tower/
│  OBJETIVO: plantar a permanência sem sequestrar a Home.
│
├─ 9. CONHECIMENTO
│  3 artigos mais úteis
│  OBJETIVO: provar que a autoridade é contínua, não uma alegação.
│
└─ 10. FECHAMENTO — ATENDIMENTO
   Endereço, horário, WhatsApp com contexto de origem "home"
   OBJETIVO: fechar com o passo mais fácil possível.
```

**Fixo em todas as páginas:** botão WhatsApp flutuante no mobile (caminho curto
para o público P3, que já sabe o que quer e não deve ser educado).

## 5.2 PÁGINA DE PROFISSÃO *(modelo — `/para-seu-trabalho/cozinha/`)*

```
1. H1 + RECONHECIMENTO        "É exatamente o meu caso"  → antes de qualquer oferta
2. EM UMA FRASE               resposta direta no topo    → respeita quem tem pressa
3. O QUE OBSERVAR             lista de critério          → ★ constrói a autoridade
4. A CONFUSÃO RESOLVIDA       aplicada ao caso           → destrava a decisão
5. O QUE A TOWER TEM          categorias, sem preço      → critério vira opção
6. QUEM RESPONDE              assinatura curta           → humaniza
7. PERGUNTAS FREQUENTES       reais, com FAQPage schema  → cauda longa + objeção
8. CTA CONTEXTUAL             WhatsApp com mensagem pronta
9. SE VOCÊ COMPRA PARA EQUIPE ponte discreta → /empresas/alimentacao/  ★ B2C→B2B
```

**O bloco 3 é o coração do modelo.** É onde a Tower entrega critério mesmo para quem
não vai comprar — que é literalmente o comportamento que construiu a empresa desde 1995.

## 5.3 PÁGINA-PILAR `/calcados/comparativo/`

```
1. H1 + resposta em uma frase          → 80% da intenção resolvida acima da dobra
2. TABELA COMPARATIVA                  → ★ o "motivo gráfico" do projeto
   ocupacional (NBR ISO 20347) x segurança (NBR ISO 20345)
3. "QUAL É O SEU CASO?"                → SE/ENTÃO por situação de trabalho
4. BIQUEIRA                            → aço, composite, plástico, conformação
5. SOLADO ANTIDERRAPANTE               → o que os códigos significam
6. ERROS COMUNS                        → específico, útil, memorável
7. FONTES E NOTA TÉCNICA               → ★ E-E-A-T: fonte oficial, autor, data
8. CTA                                 → "me diz onde você trabalha"
```

Toda afirmação normativa nesta página carrega fonte. É a página que o público
técnico (SESMT/TST) vai auditar — e é por ela que ele decide se confia no resto.

## 5.4 `/empresas/` e `/empresas/[setor]/`

```
1. H1 pelo PROBLEMA DELE, não pelo produto
2. PROVA DE CAPACIDADE OPERACIONAL   → fatos e datas: "esse fornecedor some?"
3. COMO FUNCIONA O ATENDIMENTO       → ★ processo reduz risco mais que preço
   orçamento · prazo · numeração e troca · recompra · pagamento
4. O ERRO CARO                       → reposiciona de PREÇO para ADESÃO
5. O QUE COSTUMA SER NECESSÁRIO      → orientativo, com ressalva técnica honesta
6. FORMULÁRIO CURTO (5 campos)       → monta mensagem, NÃO captura lead
7. WHATSAPP ESTRUTURADO
```

**Nunca pedir CNPJ, razão social ou endereço antes da primeira conversa.**
Mata conversão e não muda nada na resposta da Tower.

## 5.5 `/a-tower/`

```
1. ABERTURA — a frase de vida, tipografia plena
2. LINHA DO TEMPO — data + fato + foto real + frase de quem viveu
   ⚠️ PENDENTE: datas e fotos dependem do questionário
3. QUEM SÃO — Helano e Cristina, foto real
4. O QUE NÃO MUDOU — a ponte da história para o presente
5. "Para muita gente, a Tower é uma empresa de EPIs.
    Para nós, é uma história de vida."
6. CTA — ★ história termina em AÇÃO, não em sentimento.
   Página de história que não vira porta de entrada é vaidade institucional.
```

## 5.6 `/contato/` — página de utilidade, não formulário

```
1. WhatsApp em destaque (é o canal real)
2. Endereço completo + ponto de referência + como chegar
3. Foto da fachada  ★ reconhecimento na chegada, reduz ansiedade
4. Horário de funcionamento
5. Telefone e e-mail
6. Mapa (carregado sob clique — nunca no load, custa LCP)
7. Bloco "A Tower começou no Montese. Continua aqui."  ★ sinal local + permanência
```

## 5.7 Sistema de CTA de WhatsApp

**Regra:** nenhum CTA genérico existe no site. Todo botão carrega origem e contexto,
e monta a mensagem. Implementado em `src/lib/whatsapp.ts` com registro central de
contextos, para que nenhum botão possa ser criado sem declarar de onde veio.

| Origem | Texto do botão | Mensagem montada |
|---|---|---|
| Home | Falar com a Tower | "Olá! Vim pelo site da Tower e gostaria de uma orientação." |
| Cozinha | Ver opções no WhatsApp | "...Trabalho em cozinha e procuro um calçado antiderrapante. Pode me ajudar a escolher?" |
| Comparativo | Tirar a dúvida no WhatsApp | "...Estou em dúvida entre calçado ocupacional e de segurança para o meu trabalho." |
| Empresas | Solicitar orçamento | "...Vim pela área de empresas e gostaria de solicitar um orçamento de EPIs para nossa equipe." |
| Formulário B2B | Enviar pelo WhatsApp | mensagem estruturada com segmento, nº de pessoas, necessidade e prazo |
| Artigo | (nasce da intenção do artigo) | contexto específico daquele conteúdo |

**Objetivo operacional, não estético:** a Tower deve receber pedidos prontos para
cotar, não "oi". Isso é o que impede o site de piorar a rotina dos fundadores.

## 5.8 Mensuração — o evento que importa

A pergunta do negócio não é *"quantas visitas?"*, é **"qual conteúdo gera conversa?"**.

Evento central `whatsapp_click`, com:
`origem_pagina` · `origem_secao` · `contexto` · `publico` (b2b/b2c) · `categoria`

Demais eventos: `form_iniciado` · `form_concluido` · `ferramenta_iniciada` ·
`ferramenta_concluida` · `telefone_click` · `mapa_click` · `cta_click`.

Com isso é possível responder, em 60 dias: *quais artigos e quais páginas de
profissão produzem conversas reais* — e concentrar produção de conteúdo só neles.

---

**Próximo: Fases 6, 7 e 9 — copy real, design system e implementação.**
