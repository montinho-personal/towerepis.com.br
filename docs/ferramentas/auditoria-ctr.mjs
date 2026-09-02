import fs from 'fs'
const { paginas } = JSON.parse(fs.readFileSync('auditoria/paginas.json', 'utf8'))
const SUF = " · Tower EPI's"
const base = (t) => (t.endsWith(SUF) ? t.slice(0, -SUF.length) : t)

// Intenção, keyword e prioridade — julgamento, declarado por página.
const MAPA = {
  '/':                                  ['local/navegacional', 'EPI Fortaleza', 'P1', true],
  '/calcados/':                         ['comercial', 'calçado de segurança / ocupacional', 'P1', true],
  '/calcados/seguranca/':               ['comercial', 'calçado de segurança Fortaleza', 'P1', true],
  '/calcados/ocupacionais/':            ['comercial', 'calçado ocupacional Fortaleza', 'P1', true],
  '/calcados/antiderrapantes/':         ['comercial', 'sapato antiderrapante trabalho', 'P1', true],
  '/calcados/comparativo/':             ['comparativa', 'calçado ocupacional ou de segurança', 'P1', false],
  '/empresas/':                         ['comercial B2B', 'fornecedor de EPI para empresas', 'P1', true],
  '/orcamento/':                        ['transacional', 'orçamento de EPI', 'P1', true],
  '/empresas/industria/':               ['comercial B2B', 'EPI para indústria', 'P1', true],
  '/empresas/construcao/':              ['comercial B2B', 'EPI para construtora', 'P1', true],
  '/empresas/alimentacao/':             ['comercial B2B', 'EPI para restaurante', 'P2', true],
  '/empresas/saude/':                   ['comercial B2B', 'EPI para clínica e hospital', 'P2', true],
  '/empresas/facilities-e-limpeza/':    ['comercial B2B', 'EPI para empresa de limpeza', 'P2', true],
  '/empresas/como-atendemos/':          ['comercial B2B', 'como funciona o fornecimento', 'P3', false],
  '/para-seu-trabalho/':                ['comercial', 'EPI por profissão', 'P2', true],
  '/para-seu-trabalho/cozinha/':        ['comercial', 'calçado para cozinha', 'P1', true],
  '/para-seu-trabalho/construcao/':     ['comercial', 'EPI para construção civil', 'P1', true],
  '/para-seu-trabalho/enfermagem-e-saude/': ['comercial', 'calçado para enfermagem', 'P1', true],
  '/para-seu-trabalho/industria/':      ['comercial', 'EPI para indústria', 'P2', true],
  '/para-seu-trabalho/limpeza-e-conservacao/': ['comercial', 'EPI para limpeza', 'P2', true],
  '/para-seu-trabalho/logistica-e-estoque/':   ['comercial', 'EPI para logística', 'P3', true],
  '/para-seu-trabalho/manutencao/':     ['comercial', 'EPI para manutenção', 'P3', true],
  '/protecao/':                         ['comercial', 'tipos de EPI por parte do corpo', 'P2', true],
  '/protecao/respiratoria/':            ['comercial/informacional', 'PFF1 PFF2 PFF3', 'P1', false],
  '/protecao/maos/':                    ['comercial/informacional', 'luva de segurança tipos', 'P2', false],
  '/protecao/auditiva/':                ['comercial/informacional', 'protetor auricular plug ou concha', 'P3', false],
  '/protecao/cabeca/':                  ['comercial/informacional', 'capacete de segurança classes', 'P3', false],
  '/protecao/olhos-e-face/':            ['comercial/informacional', 'óculos de proteção', 'P3', false],
  '/protecao/corpo/':                   ['comercial/informacional', 'vestimenta de proteção', 'P4', false],
  '/conhecimento/':                     ['navegacional', 'central de conhecimento EPI', 'P3', false],
  '/conhecimento/calcado-para-cozinha-como-escolher/': ['informacional', 'melhor calçado para cozinha', 'P1', false],
  '/conhecimento/o-que-e-ca-certificado-de-aprovacao/': ['informacional', 'o que é CA do EPI', 'P1', false],
  '/conhecimento/nr-6-o-que-a-empresa-precisa-saber/':  ['informacional', 'NR-6 EPI obrigações', 'P1', false],
  '/conhecimento/calcado-ocupacional-ou-de-seguranca/': ['informacional', 'diferença ocupacional e segurança', 'P2', false],
  '/conhecimento/solado-antiderrapante-o-que-significa/': ['informacional', 'solado antiderrapante significado', 'P2', false],
  '/marcas/bompel/':                    ['navegacional/marca', 'Bompel calçado', 'P2', false],
  '/marcas/':                           ['navegacional/marca', 'marcas de EPI', 'P3', false],
  '/marcas/3m/':                        ['navegacional/marca', '3M EPI distribuidor', 'P3', false],
  '/a-tower/':                          ['institucional', 'Tower EPIs história', 'P3', false],
  '/a-tower/helano/':                   ['institucional/autoria', 'Helano técnico segurança', 'P4', false],
  '/contato/':                          ['navegacional', 'Tower EPIs contato', 'P2', true],
  '/encontrar-epi/':                    ['ferramenta', 'qual EPI preciso usar', 'P3', false],
  '/politica-de-privacidade/':          ['legal', '—', 'P4', false],
}

const LOCAL = /fortaleza|ceará|\bce\b|região metropolitana/i
const AUTORIDADE = /1995|técnico de segurança|distribuidor regional|3m\b|fonte oficial|gov\.br|revisad/i
const CLICHE = /soluções completas|qualidade e compromisso|excelência|melhores produtos|confira|descubra tudo|saiba tudo/i

const linhas = []
for (const [rota, [intencao, kw, prio, ehLocal]] of Object.entries(MAPA)) {
  const p = paginas[rota]
  if (!p) { console.error('faltou', rota); continue }
  const t = base(p.title), d = p.desc || ''
  const s = {}

  // --- mecânicas ---
  // escaneabilidade: risco de truncamento + posição da informação principal
  s.escaneabilidade = p.title.length <= 55 ? 10 : p.title.length <= 60 ? 8 : 5
  // localidade: presença quando a intenção é local; ausência correta quando não é
  const temLocalT = LOCAL.test(t), temLocalD = LOCAL.test(d)
  s.localidade = ehLocal ? (temLocalT ? 10 : temLocalD ? 6 : 2) : (temLocalT ? 6 : 10)
  // autoridade: sinal verificável no título ou na descrição
  s.autoridade = AUTORIDADE.test(t) ? 10 : AUTORIDADE.test(d) ? 7 : 3
  // confiança: sem clichê e sem promessa vazia
  s.confianca = CLICHE.test(t + d) ? 3 : 9
  // diferenciação: o título repete a marca? é igual ao H1? tem cauda de fórmula?
  let dif = 8
  if (/tower/i.test(t)) dif -= 3                          // marca duas vezes no <title>
  if (t.toLowerCase() === (p.h1[0] || '').toLowerCase()) dif -= 1
  if (/Tower EPI[’']s, Fortaleza, desde 1995\.$/.test(d)) dif -= 3   // cauda repetida em 15 páginas
  s.diferenciacao = Math.max(1, dif)
  // clareza: descrição informativa e no tamanho útil
  s.clareza = d.length >= 110 && d.length <= 158 ? 9 : 6
  // persuasão: a descrição dá um motivo concreto, além de descrever
  s.persuasao = /veja|entenda|conte|fale|monte|peça|como escolher|o que observar/i.test(d) ? 8 : 5
  // relevância: a keyword principal aparece no início do título
  const kwCabeca = kw.split(/[ /]/)[0].toLowerCase()
  s.relevancia = t.toLowerCase().indexOf(kwCabeca) === 0 ? 10
    : t.toLowerCase().includes(kwCabeca) ? 8 : 5
  // intenção: formato do snippet x formato que a SERP premia (julgamento por cluster)
  s.intencao = { 'informacional': 9, 'comparativa': 9, 'comercial': 8, 'comercial B2B': 8,
    'comercial/informacional': 6, 'transacional': 7, 'local/navegacional': 8,
    'navegacional': 8, 'navegacional/marca': 8, 'institucional': 8,
    'institucional/autoria': 8, 'ferramenta': 6, 'legal': 9 }[intencao] ?? 7
  // potencial de clique: média das outras, arredondada
  const outras = Object.values(s)
  s.clique = Math.round(outras.reduce((a, b) => a + b, 0) / outras.length)

  const total = Object.values(s).reduce((a, b) => a + b, 0)
  linhas.push({ rota, intencao, kw, prio, total, s, tLen: p.title.length, dLen: d.length })
}

linhas.sort((a, b) => a.total - b.total)
console.log('CTR POTENTIAL SCORE — 0 a 100 (10 dimensões × 0-10)\n')
console.log('score prio  rota'.padEnd(58) + 'rel cla int dif aut loc per con esc cli')
for (const l of linhas) {
  const d = l.s
  console.log(
    String(l.total).padStart(4), l.prio.padEnd(4), l.rota.padEnd(50).slice(0, 50),
    [d.relevancia, d.clareza, d.intencao, d.diferenciacao, d.autoridade, d.localidade,
     d.persuasao, d.confianca, d.escaneabilidade, d.clique].map(v => String(v).padStart(3)).join(' '))
}
const med = (arr) => (arr.reduce((a, b) => a + b.total, 0) / arr.length).toFixed(1)
console.log('\nmédia geral:', med(linhas))
for (const p of ['P1','P2','P3','P4']) {
  const g = linhas.filter(l => l.prio === p)
  if (g.length) console.log(`média ${p}: ${med(g)}  (${g.length} URLs)`)
}
fs.writeFileSync('auditoria/scores.json', JSON.stringify(linhas, null, 1))
