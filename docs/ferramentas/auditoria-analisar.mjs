import fs from 'fs'
const { paginas, sitemap } = JSON.parse(fs.readFileSync('auditoria/paginas.json', 'utf8'))
const rotas = Object.keys(paginas).sort()

// --- grafo de links internos (só corpo = link editorial de verdade) ---
const entra = {}, sai = {}, entraCorpo = {}
for (const r of rotas) { entra[r] = []; sai[r] = []; entraCorpo[r] = [] }
for (const r of rotas) {
  const vistos = new Set()
  for (const l of paginas[r].internos) {
    let d = l.href.split('#')[0]
    if (!d || d.startsWith('//')) continue
    if (!d.endsWith('/') && !d.includes('.')) d += '/'
    if (!paginas[d] || d === r) continue
    const chave = d + '|' + l.regiao
    if (vistos.has(chave)) continue
    vistos.add(chave)
    sai[r].push({ destino: d, ...l })
    entra[d].push({ origem: r, ...l })
    if (l.regiao === 'corpo') entraCorpo[d].push({ origem: r, anchor: l.anchor })
  }
}

const tipo = (r) => {
  if (r === '/') return 'home'
  if (/^\/conhecimento\/[^/]+\/$/.test(r)) return 'artigo'
  if (/^\/para-seu-trabalho\/[^/]+\/$/.test(r)) return 'profissão'
  if (/^\/protecao\/[^/]+\/$/.test(r)) return 'proteção'
  if (/^\/empresas\/[^/]+\/$/.test(r) && r !== '/empresas/como-atendemos/') return 'setor'
  if (/^\/calcados\/(seguranca|ocupacionais|antiderrapantes)\/$/.test(r)) return 'calçado'
  if (/^\/marcas\/[^/]+\/$/.test(r)) return 'marca'
  if (['/calcados/','/protecao/','/para-seu-trabalho/','/empresas/','/conhecimento/','/marcas/'].includes(r)) return 'hub'
  return 'institucional'
}

fs.writeFileSync('auditoria/grafo.json', JSON.stringify({ entra, sai, entraCorpo }, null, 1))

// ================= INVENTÁRIO =================
console.log('# INVENTÁRIO\n')
console.log(['rota','tipo','prof','pal','H1','títuloN','descN','LI_entra','LI_corpo','LI_sai','schema','zap'].join('\t'))
for (const r of rotas) {
  const p = paginas[r]
  console.log([
    r, tipo(r), p.profundidade === null ? '?' : p.profundidade, p.palavras,
    p.h1.length, p.titleLen, (p.desc||'').length,
    entra[r].length, entraCorpo[r].length, sai[r].length,
    p.schemas.join('+') || '—', p.whatsapp,
  ].join('\t'))
}

// ================= PROBLEMAS =================
console.log('\n\n# PROBLEMAS DETECTADOS\n')
const P = []
const porTitulo = {}, porDesc = {}, porH1 = {}
for (const r of rotas) {
  const p = paginas[r]
  ;(porTitulo[p.title] ??= []).push(r)
  ;(porDesc[p.desc] ??= []).push(r)
  ;(porH1[p.h1[0]] ??= []).push(r)
  if (p.status !== 200) P.push(`[HTTP] ${r} → ${p.status}`)
  if (p.h1.length !== 1) P.push(`[H1] ${r} tem ${p.h1.length} H1`)
  if (!p.canonical) P.push(`[CANONICAL] ${r} sem canonical`)
  if (p.titleLen > 60) P.push(`[TITLE] ${r} ${p.titleLen} chars`)
  if ((p.desc||'').length > 158) P.push(`[DESC] ${r} ${(p.desc||'').length} chars`)
  if ((p.desc||'').length < 70) P.push(`[DESC] ${r} curta: ${(p.desc||'').length} chars`)
  if (!p.ogImage) P.push(`[OG] ${r} sem og:image`)
  // hierarquia
  const n = p.headings.map((h) => h.n)
  for (let i = 1; i < n.length; i++) if (n[i] - n[i-1] > 1) P.push(`[HEADING] ${r} pula h${n[i-1]}→h${n[i]}`)
  // imagens
  for (const im of p.imagens) if (!im.alt) P.push(`[ALT] ${r} imagem sem alt: ${im.src.slice(-40)}`)
  if (p.profundidade === null || p.profundidade === undefined) P.push(`[ÓRFÃ] ${r} não alcançada por link`)
  if (entraCorpo[r].length === 0 && tipo(r) !== 'home') P.push(`[ÓRFÃ-EDITORIAL] ${r} 0 links de corpo`)
  if (p.palavras < 250 && !['home'].includes(tipo(r))) P.push(`[RASO] ${r} ${p.palavras} palavras`)
}
for (const [t, rs] of Object.entries(porTitulo)) if (rs.length > 1) P.push(`[TITLE-DUP] ${rs.length}×: ${rs.join(', ')}`)
for (const [d, rs] of Object.entries(porDesc)) if (rs.length > 1 && d !== 'null') P.push(`[DESC-DUP] ${rs.length}×: ${rs.join(', ')}`)
for (const [h, rs] of Object.entries(porH1)) if (rs.length > 1) P.push(`[H1-DUP] ${rs.length}×: ${rs.join(', ')}`)
const grupos = {}
for (const p of P) { const k = p.match(/^\[([^\]]+)\]/)[1]; (grupos[k] ??= []).push(p) }
for (const [k, v] of Object.entries(grupos).sort((a,b)=>b[1].length-a[1].length)) {
  console.log(`\n## ${k} (${v.length})`)
  v.slice(0, 14).forEach((x) => console.log('  ' + x))
  if (v.length > 14) console.log(`  ... +${v.length - 14}`)
}

// ================= LINKS EXTERNOS =================
console.log('\n\n# LINKS EXTERNOS\n')
const ext = {}
for (const r of rotas) for (const e of paginas[r].externos) {
  const h = new URL(e.href).hostname
  ;(ext[h] ??= []).push({ de: r, anchor: e.anchor, rel: e.rel })
}
for (const [h, v] of Object.entries(ext).sort((a,b)=>b[1].length-a[1].length))
  console.log(`${String(v.length).padStart(3)}×  ${h}   (ex: ${v[0].de})`)

// ================= SCHEMA =================
console.log('\n\n# SCHEMA POR TIPO DE PÁGINA\n')
const porTipo = {}
for (const r of rotas) (porTipo[tipo(r)] ??= []).push(r)
for (const [t, rs] of Object.entries(porTipo)) {
  const s = new Set(); rs.forEach((r) => paginas[r].schemas.forEach((x) => s.add(x)))
  const pal = Math.round(rs.reduce((a,r)=>a+paginas[r].palavras,0)/rs.length)
  const liC = (rs.reduce((a,r)=>a+entraCorpo[r].length,0)/rs.length).toFixed(1)
  console.log(`${t.padEnd(14)} ${String(rs.length).padStart(2)} págs | ~${String(pal).padStart(4)} palavras | ${liC} links de corpo entrando | ${[...s].join(', ')}`)
}
