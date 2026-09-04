import fs from 'fs'
const { paginas } = JSON.parse(fs.readFileSync('auditoria/paginas.json','utf8'))
const { entraCorpo } = JSON.parse(fs.readFileSync('auditoria/grafo.json','utf8'))
const rotas = Object.keys(paginas)

const PARAR = new Set('a o e de da do das dos para com que em no na nos nas um uma uns umas por se as os ao aos à às é são ser está mais como qual quais quando onde ou seu sua seus suas isso esse essa este esta pelo pela não sem sobre entre também já foi era tem têm ter pode podem deve devem'.split(' '))
const termos = (t) => (t||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')
  .replace(/[^a-z0-9\s]/g,' ').split(/\s+/).filter((w) => w.length > 3 && !PARAR.has(w))

// impressão digital de cada página: title + h1 + headings, com peso
const perfil = {}
for (const r of rotas) {
  const p = paginas[r]
  const bag = {}
  const add = (txt, peso) => termos(txt).forEach((w) => bag[w] = (bag[w]||0) + peso)
  add(p.title, 4); add(p.h1[0], 4)
  p.headings.filter(h=>h.n===2).forEach((h) => add(h.t, 2))
  p.headings.filter(h=>h.n===3).forEach((h) => add(h.t, 1))
  add(p.texto, 1)
  perfil[r] = bag
}
const cos = (a, b) => {
  const ks = new Set([...Object.keys(a), ...Object.keys(b)])
  let ab=0, aa=0, bb=0
  for (const k of ks) { const x=a[k]||0, y=b[k]||0; ab+=x*y; aa+=x*x; bb+=y*y }
  return aa && bb ? ab/Math.sqrt(aa*bb) : 0
}
console.log('# SOBREPOSIÇÃO SEMÂNTICA — pares acima de 0,35\n')
const pares = []
for (let i=0;i<rotas.length;i++) for (let j=i+1;j<rotas.length;j++) {
  const s = cos(perfil[rotas[i]], perfil[rotas[j]])
  if (s > 0.35) pares.push([s, rotas[i], rotas[j]])
}
pares.sort((a,b)=>b[0]-a[0])
for (const [s,a,b] of pares.slice(0,20)) {
  console.log(`${s.toFixed(2)}  ${a}\n      ${b}`)
  console.log(`      title A: ${paginas[a].title}`)
  console.log(`      title B: ${paginas[b].title}\n`)
}

// --- âncoras ---
console.log('\n# ÂNCORAS DE LINKS INTERNOS (só corpo)\n')
const anc = {}
for (const r of rotas) for (const l of paginas[r].internos)
  if (l.regiao === 'corpo' && l.anchor) (anc[l.anchor] ??= []).push(r)
const genericas = /^(clique aqui|saiba mais|veja aqui|leia mais|confira|acesse|aqui|ver mais|→)$/i
const lista = Object.entries(anc).sort((a,b)=>b[1].length-a[1].length)
console.log('mais repetidas:')
lista.slice(0,18).forEach(([a,rs]) => console.log(`  ${String(rs.length).padStart(3)}×  "${a}"`))
const gen = lista.filter(([a]) => genericas.test(a.trim()))
console.log(`\ngenéricas ("clique aqui"/"saiba mais"/vazias): ${gen.length ? gen.map(g=>g[0]).join(', ') : 'nenhuma'}`)
const vazias = []
for (const r of rotas) for (const l of paginas[r].internos)
  if (l.regiao === 'corpo' && !l.anchor.trim()) vazias.push(`${r} → ${l.href}`)
console.log(`âncoras vazias (só ícone/imagem): ${vazias.length}`)
vazias.slice(0,8).forEach(v=>console.log('   '+v))

// --- distribuição de links de corpo ---
console.log('\n\n# DISTRIBUIÇÃO DE LINKS EDITORIAIS (corpo)\n')
// `entraCorpo` só traz rota que recebeu link de corpo — página órfã não
// aparece na chave. Ler direto quebrava a ferramenta justamente no caso que
// ela existe para denunciar: zero é resposta, não erro.
const ord = rotas.map(r=>[(entraCorpo[r] ?? []).length, r]).sort((a,b)=>a[0]-b[0])
console.log('menos linkadas:')
ord.slice(0,12).forEach(([n,r]) => console.log(`  ${String(n).padStart(2)}  ${r}`))
console.log('mais linkadas:')
ord.slice(-8).reverse().forEach(([n,r]) => console.log(`  ${String(n).padStart(2)}  ${r}`))
