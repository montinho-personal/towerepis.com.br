# LANÇAMENTO — APONTAR O DOMÍNIO PARA A VERCEL

## O que descobri antes de apontar

### 1. O número de WhatsApp está corroborado ✅
`(85) 3491-9494` aparece agora em **três fontes independentes**:
- post do Instagram, com ícone de WhatsApp
- site antigo `tower-ce.com.br`
- ficha da Tower no GuiaMais

Isso eleva bastante a confiança de que o número está certo. **Ainda falta testar**
uma coisa específica: se ele recebe mensagem com texto pré-preenchido pelo link
`wa.me`. Teste no celular: abrir `https://wa.me/558534919494?text=teste`.

### 2. Existia um site antigo: `tower-ce.com.br`
Indexado como *"Tower – Distribuidora de EPI's"*, com páginas de home, parceiros
(Bompel e Sticky), sobre e contato.

**Ele está fora do ar** — o domínio não resolve mais.

Isso levanta uma pergunta que vale dinheiro: **vocês ainda são donos desse
domínio?** Se sim, ele deve ser apontado para a Vercel com um redirecionamento
301 para `towerepis.com.br`, para recuperar o histórico e os links que existirem.
Se o registro caducou, vale renovar antes que outra pessoa registre — domínio de
empresa com trinta anos de mercado nas mãos de terceiros é um problema.

### 3. `towerepis.com.br` resolve para `162.240.81.81`
É um IP de hospedagem compartilhada. Não consegui ver o que tem lá (a rede desta
sessão bloqueia sites brasileiros). Precisamos saber se há algo publicado e se
existem URLs antigas a redirecionar.

---

## Passo a passo

Não consigo executar esta parte: o conjunto de ferramentas da Vercel disponível
aqui **não expõe a ação de adicionar domínio a um projeto**, e a alteração de DNS
exige o login do registrador, que é de vocês.

### Passo 1 — Adicionar o domínio na Vercel
No painel: projeto **towerepis-com-br** → **Settings** → **Domains** → adicionar:
- `towerepis.com.br`
- `www.towerepis.com.br`

A Vercel vai mostrar os registros exatos a configurar. **Use os valores que ela
mostrar**, não os deste documento — o alvo do CNAME varia por projeto.

### Passo 2 — Configurar o DNS no registrador
Os valores esperados:

| Registro | Nome | Valor |
|---|---|---|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns-0.com` |

Isso **substitui** o apontamento atual para `162.240.81.81`.

⚠️ Se houver e-mail no domínio (`@towerepis.com.br`), **não mexa nos registros
`MX`**. Trocar o A e o CNAME não afeta e-mail; apagar os MX derruba.

### Passo 3 — Promover para produção
Na Vercel, em **Deployments**, no menu `⋯` do deploy mais recente:
**Promote to Production**. Ou definir o branch de produção em
**Settings → Git → Production Branch** como `claude/tower-epis-website-v7fq8k`.

Enquanto o deploy for de preview, a Vercel envia `x-robots-tag: noindex` e o
Google não indexa.

### Passo 4 — Depois que propagar
1. Conferir se `https://towerepis.com.br` abre o site novo (pode levar de minutos
   a algumas horas).
2. Conferir se o certificado HTTPS foi emitido (a Vercel faz sozinha).
3. Testar um CTA de WhatsApp de verdade, do celular.
4. Cadastrar no **Google Search Console** e enviar
   `https://towerepis.com.br/sitemap.xml`.
5. Configurar o **Google Business Profile** como área de atendimento.

---

## Redirecionamentos já configurados

Em `vercel.json`, para o caso de existirem URLs antigas nos dois domínios:

| De | Para |
|---|---|
| `/sobre`, `/quem-somos`, `/empresa` | `/a-tower/` |
| `/parceiros` | `/marcas/` |
| `/produtos` | `/protecao/` |
| `/blog`, `/blog/:slug` | `/conhecimento/` |

São 301. Caminho que não existir simplesmente não é acionado — não há risco.

Se vocês tiverem a lista real das URLs do site antigo, mando o mapeamento
completo. Sem isso, o que está aí cobre os caminhos mais prováveis.
