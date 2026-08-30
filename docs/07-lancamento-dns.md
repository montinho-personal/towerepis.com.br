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

## DNS final — HostGator

⚠️ **Estes valores são específicos deste projeto Vercel.** Não são os genéricos da
documentação. Se um dia o projeto for recriado na Vercel, os valores mudam — sempre
copiar de *Settings → Domains → View DNS configuration*.

| Tipo | Nome | Valor | TTL |
|---|---|---|---|
| `A` | `towerepis.com.br` | `216.150.1.1` | 14400 |
| `CNAME` | `www` | `1e3fda645d3a9614.vercel-dns-016.com` | 14400 |

Registros `MX`, `mail` e `ftp` foram removidos — não há e-mail neste domínio.

### As duas armadilhas deste apontamento

**1. O IP genérico não serviu.** Começamos com `76.76.21.21`, que é o endereço
anycast antigo e de uso geral da Vercel, citado na documentação dela. O domínio
respondeu com `ERR_CONNECTION_TIMED_OUT` mesmo depois da propagação completa.
A Vercel expandiu a faixa de IPs e passou a atribuir endereços próprios por projeto;
o card do domínio no painel é a única fonte confiável do valor. O aviso
*"DNS Change Recommended"* era exatamente isso — não era cosmético.

**2. O `MX` apontava para o próprio domínio.** Enquanto o apex resolvia para a
HostGator, o e-mail funcionava. Ao mover o `A` para a Vercel, o MX passaria a
entregar num servidor sem serviço de e-mail — e mensagem sumiria sem erro visível
para quem enviou. Como não há caixa no domínio, foi só remover.

**Se um dia criarem e-mail `@towerepis.com.br`**, o `MX` precisa apontar para o
servidor do provedor de e-mail escolhido — **nunca** para `towerepis.com.br`.

### Sobre o TTL
Os dois registros estão com TTL de 14400s (4 horas). **Vale baixar para 300s**:
qualquer ajuste futuro passa a propagar em 5 minutos em vez de 4 horas.

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
