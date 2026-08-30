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

### 2. Fotografia
O design foi feito para foto real e não tem nenhuma. O questionário confirma que
existem: **fotos dos fundadores, da primeira sede e dos logotipos antigos**.

Prioridade:
1. Helano e Cristina — vai para a Home, `/a-tower/` e `/a-tower/helano/`
2. **Primeira sede no Montese, 1995** — o ativo visual mais valioso do projeto
3. Logotipos antigos
4. Produtos das linhas Sticky Shoes, Bompel e 3M

Foto antiga de qualidade baixa vale mais que foto nova genérica. Se não houver
acervo suficiente, produção fotográfica precisa entrar no escopo.

### 3. Logo em vetor
Reconstruí o logotipo tipograficamente a partir do selo do Instagram (TOWER com o
ponto vermelho no lugar do O). Funciona, mas o ideal é o arquivo original em
`.ai`, `.eps` ou `.svg`, ou PNG em alta com fundo transparente.

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

### 6. Ano e nome exato do prêmio de Distribuidor Regional da 3M
Hoje o site diz "Distribuidor Regional premiado" sem data. Com o ano, fica mais forte.
Se houver troféu ou certificado, vale fotografar.

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

### 15. Contas
- Vercel: em qual conta o projeto deve ser criado?
- Google Analytics e Search Console: existem? Quem administra?
