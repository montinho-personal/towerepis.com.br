# INFORMAÇÕES PENDENTES

> **Atualizado em 30/08/2026**, depois do questionário e do acesso ao Instagram.
> Resolvidos: história completa, nome canônico (**Tower EPI's**), decisão sobre
> endereço (não publicar — *service-area business*), decisão sobre citar clientes
> (setor + tempo), escopo da v1 (arquitetura completa), marcas (3M, Sticky Shoes,
> Bompel) e DNA visual da marca.
>
> O que segue é o que ainda falta.

---

## 🔴 BLOQUEIA O LANÇAMENTO

### 1. Confirmar o número do WhatsApp
**(85) 3491-9494** — visto em um post do Instagram, com ícone de WhatsApp.
Os **29 CTAs do site** apontam para ele. Precisamos confirmar três coisas:

1. o número está correto;
2. tem WhatsApp ativo;
3. recebe mensagem com texto pré-preenchido (link `wa.me`).

**Se estiver errado, o site inteiro converte para lugar nenhum.** É o item de maior
risco do projeto e o mais rápido de resolver: basta abrir
`https://wa.me/558534919494?text=teste` no celular e ver se abre a conversa certa.

Configurado em `src/config/empresa.ts` — um campo muda o site todo.

### 2. Fotografia — parcialmente resolvido em 5 de setembro de 2026
Chegaram sete fotos do acervo, todas publicadas: escritório e estoque do Montese
em 1995, a faixa do seminário sobre CA, o furgão de entrega na porta do FIEC e
três da noite da premiação. Estão em `public/fotos/historia/`.

A lista completa do que ainda falta, com o nome de arquivo de cada peça, está no
artefato "As fotos que faltam" e resumida em `public/fotos/COMO-SUBIR.md`. Em
ordem de valor, as que mais rendem hoje:

1. **Cristina sozinha.** O site fala em "os dois sócios" em onze lugares e mostra
   o rosto de um. É o buraco mais visível que restou.
2. **O par solado gasto / solado novo.** Destrava três capas de artigo e sustenta
   a afirmação técnica mais repetida do site.
3. **A fachada** do prédio do Montese. O que veio foi o interior.
4. **O número do CA marcado numa botina.** O artigo afirma que dá para conferir
   olhando o pé de alguém, e não mostra.

Foto antiga de qualidade baixa vale mais que foto nova genérica — as sete que
chegaram provam isso.

### 3. Logo em vetor
Reconstruí o logotipo tipograficamente a partir do selo do Instagram (TOWER com o
ponto vermelho no lugar do O). Funciona, mas o ideal é o arquivo original em
`.ai`, `.eps` ou `.svg`, ou PNG em alta com fundo transparente.

**Novidade de 5/9/2026:** o O vermelho aparece em duas fotos dos anos 90 — na
lateral do furgão (`carro-de-entrega-tower-fiec.jpg`, ali com "comércio &
serviços ltda" embaixo) e na faixa do seminário. A reconstrução estava certa, e
agora existe documento. Continua valendo pedir o vetor original.

---

## 🟡 ANTES DE DIVULGAR O SITE

### 4. Revisão técnica pelo Helano
Todo conteúdo normativo cita fonte oficial e nenhuma afirmação foi feita por
inferência. Mesmo assim, o conteúdo precisa da leitura dele antes de ir ao ar —
é o nome dele que assina as páginas.

### 4b. Lista completa das marcas trabalhadas hoje
A Bompel já está no site como principal parceria, com 3M e Sticky Shoes ao lado.
Se houver outras marcas relevantes, mandem que eu incluo — hoje a página diz
que a lista não é completa, o que é honesto mas menos útil do que a lista real.

### 5. Dados que faltam no rodapé e no schema
- Razão social e CNPJ
- E-mail comercial
- Horário exato de atendimento (hoje está genérico: "segunda a sexta, em horário comercial")

### 6. Nome e ano do prêmio da 3M — agora com três nomes diferentes em jogo
**Subiu de prioridade em 5/9/2026.** As fotos do acervo trouxeram documento, e o
documento não bate com o site. Hoje existem três termos:

| Onde | O que está escrito |
| --- | --- |
| O site, em `empresa.ts`, `/a-tower/` e `/marcas/3m/` | **Distribuidor Regional** |
| A placa, ampliada nas fotos da premiação | **Destaque Regional**, com um ano de quatro dígitos abaixo que parece **1998** |
| O selo na lateral do furgão de entrega | **Distribuidor Especializado** |

A hipótese mais provável é que sejam duas coisas distintas que o site fundiu numa
só: *Distribuidor Especializado* como a categoria de revenda da 3M — a mesma
palavra que o site já usa para descrever a Bereneli, onde os dois trabalhavam em
São Paulo — e *Destaque Regional* como o nome do prêmio recebido. É hipótese, e
por isso nada foi corrigido.

**O que precisa ser confirmado:** qual é o nome do prêmio, qual é o ano, e se
"Distribuidor Especializado" era a categoria. Com as três respostas eu acerto
`empresa.ts`, o marco da linha do tempo e a seção "O reconhecimento" de
`/marcas/3m/` de uma vez — é correção de defeito, e defeito não tem lote.

As fotos da premiação **já estão no ar** (autorização das outras pessoas
confirmada pelo cliente em 5/9/2026), com legenda sobre a noite e não sobre o
nome do prêmio, justamente para não repetir um dado que pode estar errado.

### 6b. Quem é quem nas fotos da premiação
Nas três fotos da premiação não dá para identificar com segurança quem é Helano e
quem é Cristina — numa delas há dois homens e duas mulheres, e o nome do arquivo
cita os dois sem dizer quem é quem. As legendas no ar hoje falam da noite e não
apontam ninguém. O mesmo vale para a foto do escritório de 1995: há um homem
sentado à mesa, quase certamente o Helano, mas o nome do arquivo não afirmava
isso e eu não afirmei por conta própria.

Confirmado quem é quem, as legendas ficam bem melhores — e a foto do escritório
passa a poder dizer "Helano, no escritório de cima" em vez de descrever um móvel.

### 7. Registro profissional do Helano
Para a página de autor e o schema `Person`. Só publico credencial que possa ser
comprovada.

### 8. Área de entrega real hoje
O site diz "Fortaleza e região". Precisa confirmar: o motorista de entrega
continua? Entregam em quais cidades, de fato?

### 9. Aprovação da frase sobre propina
Vocês responderam que nunca aceitaram **pagar propina**. É verdadeiro e forte, mas
**não coloquei no site** porque precisa da aprovação explícita de vocês dois — e
porque precisa ser dito em primeira pessoa, sem virar acusação ao mercado.

Sugestão, se aprovarem:
> *"Em trinta anos, nunca pagamos propina para vender. Perdemos negócios por isso.
> Seguimos aqui."*

### 10. Autorização para citar clientes pelo nome
Hoje o site diz *"uma indústria têxtil do Ceará compra com a gente desde os anos
1990"*, sem nome. Se conseguirem autorização por escrito do Grupo Santana Têxtil, a
prova fica ainda mais forte.

---

## 🟢 PARALELO AO SITE — E PODE COMEÇAR HOJE

### 11. Google Business Profile
Configurar como **área de atendimento**, sem endereço. Para busca local isso
frequentemente pesa mais do que o site.

### 12. Campanha de avaliações
**O maior retorno pelo menor esforço do projeto inteiro.** Trinta anos de clientes
e quase nenhuma avaliação registrada é dinheiro parado. Meta inicial: 30 avaliações
em 90 dias.

### 13. Corrigir o endereço antigo nos diretórios
GuiaMais, TeleListas, Apontador, Solutudo e Encontra Fortaleza ainda listam
"Tower Distribuidora" no endereço do Montese. **Endereço obsoleto público é pior do
que endereço nenhum** — o cliente vai lá e não encontra ninguém.

---

## ⚙️ ACESSOS PARA O LANÇAMENTO

### 14. Domínio
`towerepis.com.br` está registrado e aponta para `162.240.81.81`.
- Existe site no ar hoje? Há URLs antigas que precisem de redirecionamento 301?
- Quem controla o DNS? Precisaremos apontar para a Vercel.

### 15. Contas — resolvido em 5 de setembro de 2026
- **Search Console:** propriedade `https://towerepis.com.br/` verificada por
  etiqueta HTML, com o sitemap de 66 URLs enviado. O token está em
  `src/app/layout.tsx`, com um comentário dizendo para não removê-lo.
- **Google Analytics 4:** propriedade criada, identificador **`G-14E91VL3D3`**.
  A etiqueta gtag que o Google oferece na tela de instalação **não foi colada
  no site**, de propósito: colar aquele trecho carrega o gtag.js no primeiro
  segundo, antes de qualquer consentimento, e é exatamente o que
  `/politica-de-cookies/` promete por escrito que não acontece. O site usa o
  código próprio em `src/components/Medicao.tsx`, que só baixa o script depois
  do "Aceitar".
- **Vercel:** o projeto já está lá, com deploy de produção a partir de `main`.
  A variável `NEXT_PUBLIC_GA_ID` precisa existir **só no ambiente de
  Production** — em Preview ela faria os deploys de teste medirem tráfego
  falso na mesma propriedade.

Lembrete que custa caro esquecer: `NEXT_PUBLIC_*` é inlinada no build, não lida
em tempo de execução. Criar a variável não liga nada sozinho — só o próximo
deploy é que passa a ter medição.
