/**
 * Legibilidade — quão fácil é ler cada página deste site.
 *
 * POR QUE EXISTE. "Escrever mais leve" é o tipo de pedido que vira discussão
 * de gosto em dois minutos: eu acho que está bom, outra pessoa acha pesado, e
 * ninguém consegue provar nada. Esta ferramenta transforma isso em número, de
 * modo que a conversa passe a ser sobre qual página melhorou e quanto.
 *
 * O ÍNDICE. Flesch adaptado ao português por Martins e outros (1996):
 *
 *     248,835 − 1,015 × (palavras/frase) − 84,6 × (sílabas/palavra)
 *
 * A fórmula original de Flesch é para o inglês e superestima a facilidade do
 * português, que tem palavras mais longas por natureza — daí a adaptação. As
 * faixas usadas aqui são as citadas na literatura de pt-BR:
 *
 *     75–100  muito fácil     ensino fundamental I
 *     50–75   fácil           ensino fundamental II
 *     25–50   difícil         ensino médio e superior
 *      0–25   muito difícil   acadêmico
 *
 * O QUE O NÚMERO NÃO É. Ele mede duas coisas só: comprimento de frase e
 * comprimento de palavra. Não sabe se o texto está claro, se a metáfora
 * ajuda, se a ordem das ideias faz sentido. Um texto pode marcar 70 e ser
 * confuso; pode marcar 40 e ser ótimo, se o assunto exigir palavra técnica —
 * "antiderrapante" e "Certificado de Aprovação" são longas e não têm
 * substituto honesto neste site. Use como termômetro e como ranking, nunca
 * como nota final.
 *
 * A CONTAGEM DE SÍLABAS É APROXIMADA. Conta grupos de vogais e separa hiato
 * de vogal forte por heurística. Erra em caso difícil ("saúde", "ideia"), e o
 * erro é parecido em todas as páginas — por isso serve para comparar páginas
 * entre si, que é o uso pretendido.
 *
 * OS VÍCIOS. Além do índice, conta quatro construções que este site usa
 * demais e que pesam a leitura sem aparecer no Flesch:
 *
 *   travessão      — a pausa dramática. Uma por parágrafo é estilo; três é tique.
 *   ponto e vírgula  quase sempre podia ser ponto final.
 *   contraste        "não é X, é Y". Ótimo uma vez por página. Ruim seis.
 *   frase longa      acima de 25 palavras, a pessoa relê.
 *
 * Uso: npm run build && npx next start -p 3000, depois node este-arquivo.
 *      node docs/ferramentas/qa-legibilidade.mjs --frases   lista as piores frases
 */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs'

const BASE = 'http://localhost:3000'
const LISTAR_FRASES = process.argv.includes('--frases')

const VOGAIS = 'aeiouáéíóúâêôãõàäëïöü'
const FORTES = 'aeoáéóâêôãõà'

/** Sílabas por grupo de vogais, com hiato de vogal forte contado à parte. */
function silabas(palavra) {
  const p = palavra.toLowerCase()
  let total = 0
  let i = 0
  while (i < p.length) {
    if (!VOGAIS.includes(p[i])) {
      i++
      continue
    }
    let j = i
    while (j < p.length && VOGAIS.includes(p[j])) j++
    const grupo = p.slice(i, j)
    total += 1
    // "po-e-ta", "sa-í-da": duas vogais fortes juntas são duas sílabas.
    for (let k = 1; k < grupo.length; k++) {
      if (FORTES.includes(grupo[k - 1]) && FORTES.includes(grupo[k])) total += 1
    }
    i = j
  }
  return Math.max(1, total)
}

/**
 * Blocos -> frases.
 *
 * O PRIMEIRO CORTE DESTA FERRAMENTA ESTAVA ERRADO e vale registrar por quê.
 * Ela lia o `innerText` da página inteira e cortava em ponto final. Só que
 * título e item de lista não terminam com ponto: o texto vinha como
 * "Onde o erro mais aparecePintura e aplicação com solvente..." e o medidor
 * anunciou uma frase de 183 palavras que não existe. O site parecia ter 29,9
 * palavras por frase, quando o número verdadeiro é bem menor.
 *
 * Agora cada bloco de prosa chega separado e o fim do bloco é fim de frase.
 * A lição serve para qualquer medição de texto em HTML: quem define a frase é
 * a marcação, não só a pontuação.
 */
function frases(blocos) {
  return blocos
    .flatMap((bloco) =>
      bloco
        .replace(/\s+/g, ' ')
        // Abreviações que não terminam frase. Sem isto, "Ex.:" vira corte.
        .replace(/\b(Ex|Sr|Sra|Dr|Dra|art|n|pág|etc)\.\s/gi, '$1<PONTO> ')
        .split(/(?<=[.!?])\s+/)
        .map((f) => f.replace(/<PONTO>/g, '.').trim()),
    )
    .filter((f) => palavrasDe(f).length >= 3)
}

const palavrasDe = (t) => t.match(/[\p{L}\p{N}][\p{L}\p{N}'-]*/gu) ?? []

function medir(blocos) {
  const fs = frases(blocos)
  // As palavras saem das frases retidas, e não do texto bruto: contar palavra
  // que ficou de fora da contagem de frases inflaria palavras-por-frase.
  const texto = fs.join(' ')
  const ps = palavrasDe(texto)
  if (!fs.length || !ps.length) return null
  const sil = ps.reduce((a, w) => a + silabas(w), 0)
  const ppf = ps.length / fs.length
  const spp = sil / ps.length
  const flesch = 248.835 - 1.015 * ppf - 84.6 * spp

  const longas = fs.filter((f) => palavrasDe(f).length > 25)
  const contraste =
    (texto.match(/\bnão\s+(é|são|foi|era|se trata)\b[^.!?]{0,60}?,\s*(é|e sim|são)\b/gi) ?? [])
      .length + (texto.match(/,\s*(e não|não o|não a|e sim)\b/gi) ?? []).length

  return {
    flesch,
    frases: fs.length,
    palavras: ps.length,
    ppf,
    spp,
    longas: longas.length,
    piores: fs
      .map((f) => [palavrasDe(f).length, f])
      .sort((a, b) => b[0] - a[0])
      .slice(0, 3),
    vocabulario: ps,
    travessao: (texto.match(/—/g) ?? []).length,
    pontoEVirgula: (texto.match(/;/g) ?? []).length,
    contraste,
  }
}

const faixa = (f) =>
  f >= 75 ? 'muito fácil' : f >= 50 ? 'fácil' : f >= 25 ? 'difícil' : 'muito difícil'

const navegador = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const p = await navegador.newPage()
await p.goto(`${BASE}/sitemap.xml`, { waitUntil: 'domcontentloaded' })
const rotas = [...(await p.content()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => new URL(m[1]).pathname,
)

const paginas = []
for (const rota of rotas) {
  await p.goto(BASE + rota, { waitUntil: 'domcontentloaded' })
  const blocos = await p.evaluate(() => {
    const main = document.querySelector('main')
    if (!main) return []
    const c = main.cloneNode(true)
    // Fora do medidor: o que não é prosa — navegação, rótulo de botão,
    // tabela de dados, olho de seção. Escrevem-se de formas diferentes, e
    // misturar rótulo com parágrafo não mede nem um nem outro.
    c.querySelectorAll('nav, table, script, style, [data-barra], .eyebrow, button').forEach(
      (el) => el.remove(),
    )
    // Prosa é parágrafo e item de lista. Título fica de fora: é rótulo, não
    // leitura, e a contagem dele puxaria a média para baixo de graça.
    return [...c.querySelectorAll('p, li')]
      .filter((el) => !el.querySelector('p, li'))
      .map((el) => el.innerText.trim())
      .filter(Boolean)
  })
  const m = medir(blocos)
  if (m) paginas.push({ rota, ...m })
}
await navegador.close()

const soma = (k) => paginas.reduce((a, x) => a + x[k], 0)
const totalPalavras = soma('palavras')
const totalFrases = soma('frases')
const geralPpf = totalPalavras / totalFrases
const geralSpp =
  paginas.reduce((a, x) => a + x.spp * x.palavras, 0) / totalPalavras
const geral = 248.835 - 1.015 * geralPpf - 84.6 * geralSpp

console.log(`\n# LEGIBILIDADE — ${paginas.length} páginas, ${totalPalavras.toLocaleString('pt-BR')} palavras\n`)
console.log(`ÍNDICE DO SITE: ${geral.toFixed(1)}  (${faixa(geral)})`)
console.log(`  palavras por frase: ${geralPpf.toFixed(1)}`)
console.log(`  sílabas por palavra: ${geralSpp.toFixed(2)}`)
console.log(`  frases acima de 25 palavras: ${soma('longas')} de ${totalFrases} (${((soma('longas') / totalFrases) * 100).toFixed(1)}%)`)
console.log(`  travessões: ${soma('travessao')} (${((soma('travessao') / totalPalavras) * 1000).toFixed(1)} a cada mil palavras)`)
console.log(`  pontos e vírgulas: ${soma('pontoEVirgula')}`)
console.log(`  construções de contraste: ${soma('contraste')}`)

const dist = { 'muito fácil': 0, fácil: 0, difícil: 0, 'muito difícil': 0 }
paginas.forEach((x) => dist[faixa(x.flesch)]++)
console.log('\nDISTRIBUIÇÃO')
for (const [k, v] of Object.entries(dist)) {
  console.log(`  ${k.padEnd(14)} ${String(v).padStart(3)}  ${'█'.repeat(v)}`)
}

/**
 * O QUE REALMENTE PESA NESTE SITE.
 *
 * A medição mostrou que a frase daqui é curta (14 palavras) e que o índice é
 * puxado para baixo pela PALAVRA, não pela frase: 2,13 sílabas por palavra.
 * Então a lista abaixo é a mais útil do relatório — são as palavras de quatro
 * sílabas ou mais que mais se repetem, com quantas páginas usam cada uma.
 *
 * Nem toda troca é possível. "Antiderrapante" e "Certificado de Aprovação"
 * não têm sinônimo curto e honesto, e trocá-los por aproximação seria mentir
 * para ganhar ponto num índice. Mas "utilizado", "necessário", "realizar" e
 * "possibilidade" têm, e cada troca dessas alivia o texto inteiro.
 */
const longas = new Map()
for (const x of paginas) {
  const vistas = new Set()
  for (const w of x.vocabulario) {
    if (silabas(w) < 4) continue
    const k = w.toLowerCase()
    if (!longas.has(k)) longas.set(k, { n: 0, paginas: new Set() })
    longas.get(k).n++
    longas.get(k).paginas.add(x.rota)
    vistas.add(k)
  }
}
const rank = [...longas.entries()]
  .filter(([, v]) => v.paginas.size >= 4)
  .sort((a, b) => b[1].n - a[1].n)
  .slice(0, 25)
console.log('\nPALAVRAS LONGAS (4+ sílabas) MAIS REPETIDAS')
console.log('   usos  págs  palavra')
for (const [w, v] of rank) {
  console.log(`  ${String(v.n).padStart(5)}  ${String(v.paginas.size).padStart(4)}  ${w}`)
}

const ord = [...paginas].sort((a, b) => a.flesch - b.flesch)
console.log('\nAS 15 PÁGINAS MAIS PESADAS')
console.log('  índice  p/frase  longas  —   ;   contr.  rota')
for (const x of ord.slice(0, 15)) {
  console.log(
    `  ${x.flesch.toFixed(1).padStart(6)}  ${x.ppf.toFixed(1).padStart(7)}  ${String(x.longas).padStart(6)}  ${String(x.travessao).padStart(2)}  ${String(x.pontoEVirgula).padStart(2)}  ${String(x.contraste).padStart(6)}  ${x.rota}`,
  )
}

console.log('\nAS 5 MAIS LEVES (o alvo já existe dentro do próprio site)')
for (const x of ord.slice(-5).reverse()) {
  console.log(`  ${x.flesch.toFixed(1).padStart(6)}  ${x.ppf.toFixed(1).padStart(7)}  ${x.rota}`)
}

if (LISTAR_FRASES) {
  console.log('\n\n# AS 25 FRASES MAIS LONGAS DO SITE\n')
  const todas = paginas.flatMap((x) => x.piores.map(([n, f]) => ({ n, f, rota: x.rota })))
  todas.sort((a, b) => b.n - a.n)
  for (const { n, f, rota } of todas.slice(0, 25)) {
    console.log(`${String(n).padStart(3)} palavras  ${rota}`)
    console.log(`   ${f}\n`)
  }
}

console.log('')
