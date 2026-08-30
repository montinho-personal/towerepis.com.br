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

## Estado do DNS — resolvido em 30/08/2026

DNS gerido na **HostGator**. Configuração final:

| Tipo | Nome | Valor | Situação |
|---|---|---|---|
| `A` | `towerepis.com.br` | `76.76.21.21` | ✅ Vercel, propagado |
| `CNAME` | `www` | `cname.vercel-dns-0.com` | ✅ Vercel, propagado |
| ~~`MX`~~ | ~~`towerepis.com.br`~~ | — | ❌ removido |
| ~~`CNAME`~~ | ~~`mail`~~ | — | ❌ removido |
| ~~`CNAME`~~ | ~~`ftp`~~ | — | ❌ removido |

### O problema que apareceu no caminho

O registro `MX` apontava para o **próprio domínio** (`towerepis.com.br`). Enquanto o
apex resolvia para a HostGator, o e-mail funcionava. Ao trocar o `A` para a Vercel,
o MX passou a apontar para um servidor que **não tem serviço de e-mail** — e mensagem
enviada sumiria sem erro visível para quem enviou.

Confirmado que **não existe caixa de e-mail no domínio**, os registros `MX`, `mail` e
`ftp` foram removidos. Ficaram apenas os dois que servem o site.

⚠️ **Se um dia a Tower criar e-mail `@towerepis.com.br`**, o MX terá de apontar para o
servidor de e-mail do provedor escolhido — **nunca** para `towerepis.com.br`, que hoje
é a Vercel.

## Domínio canônico: apex, sem `www`

Decidido: **`https://towerepis.com.br`**, com `www` redirecionando para ele.

É o que o código já usa — os 41 `canonical`, o `sitemap.xml` e os `@id` do schema
apontam todos para o apex. Não há nenhum `www` no código, de propósito.

Na Vercel: `towerepis.com.br` como domínio de produção, e `www.towerepis.com.br`
como redirect para ele.

## O que falta

1. **Promover para produção** — em Deployments, menu `⋯` do deploy mais recente →
   *Promote to Production*. Sem isso o domínio serve o deploy antigo, só de documentos.
2. **Testar o WhatsApp** — abrir `https://wa.me/558534919494?text=teste` no celular.
3. Conferir se `https://towerepis.com.br` abre o site e se o HTTPS foi emitido
   (a Vercel faz sozinha, leva alguns minutos após o domínio validar).
4. **Google Search Console** — cadastrar o domínio e enviar
   `https://towerepis.com.br/sitemap.xml`.
5. **Google Business Profile** — configurar como área de atendimento, sem endereço.
6. **Campanha de avaliações** com os clientes de longa data.

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
