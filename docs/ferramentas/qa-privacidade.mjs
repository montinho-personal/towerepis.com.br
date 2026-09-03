/**
 * Verificador de privacidade — o que o site realmente coleta.
 *
 * Mede em navegador real, com os recursos carregados: cookies gravados, hosts
 * de terceiros contatados, localStorage, sessionStorage e presença de gtag ou
 * dataLayer.
 *
 * Existe porque a politica de privacidade anterior afirmava que o site usava
 * ferramenta de analise de audiencia — e nao usava. Documento legal que
 * descreve tratamento inexistente e pior que documento omisso.
 *
 * SE ESTE SCRIPT PASSAR A ACUSAR COOKIE OU HOST EXTERNO, as tres coisas abaixo
 * precisam ser feitas ANTES de a ferramenta ir ao ar:
 *   1. banner de consentimento com aceitar, recusar e configurar no mesmo peso;
 *   2. Consent Mode v2 negado por padrao;
 *   3. tabela de cookies real na politica, e registro do consentimento.
 *
 * Uso: npm run build && npx next start -p 3000, depois node este-arquivo.
 */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const B='http://localhost:3000';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ctx=await b.newContext();
const p=await ctx.newPage();
const externos=new Set(), todas=new Set();
p.on('request', r => { const u=new URL(r.url()); todas.add(u.host); if(!u.host.startsWith('localhost')) externos.add(u.host+' ('+r.resourceType()+')'); });
const rotas=['/','/orcamento/','/encontrar-epi/','/conhecimento/','/empresas/','/contato/','/politica-de-privacidade/','/epi-por-cidade/teresina-pi/'];
for(const r of rotas){ await p.goto(B+r,{waitUntil:'networkidle'}); }
// interage com a ferramenta e o formulario
await p.goto(B+'/encontrar-epi/',{waitUntil:'networkidle'});
const btns=await p.$$('button');
for(const bt of btns.slice(0,3)){ try{ await bt.click({timeout:800}); await p.waitForTimeout(200);}catch{} }
await p.goto(B+'/orcamento/',{waitUntil:'networkidle'});
const armaz = await p.evaluate(()=>{
  const ls={}; try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);ls[k]=(localStorage.getItem(k)||'').slice(0,60);}}catch(e){}
  const ss={}; try{for(let i=0;i<sessionStorage.length;i++){const k=sessionStorage.key(i);ss[k]=(sessionStorage.getItem(k)||'').slice(0,60);}}catch(e){}
  return {localStorage:ls, sessionStorage:ss, dataLayer: typeof window.dataLayer, gtag: typeof window.gtag};
});
const cookies=await ctx.cookies();
console.log('COOKIES DEFINIDOS:', cookies.length);
for(const c of cookies) console.log('   ', c.name, '|', c.domain, '| secure='+c.secure, 'httpOnly='+c.httpOnly, 'sameSite='+c.sameSite, 'expires='+c.expires);
console.log('\nHOSTS EXTERNOS CONTATADOS:', externos.size);
for(const e of [...externos].sort()) console.log('   ', e);
console.log('\nARMAZENAMENTO:', JSON.stringify(armaz,null,1));
await ctx.close(); await b.close();
