/**
 * Gera capa e card de compartilhamento a partir da arte original.
 *
 * Uso: node docs/ferramentas/capas-artigos.mjs (a partir da raiz do projeto).
 * Entrada em docs/originais/artigos/, saida em public/fotos/artigos/.
 */
import { createRequire } from 'node:module';
const sharp = createRequire(process.cwd() + '/x.js')('sharp');
import { stat } from 'node:fs/promises';

const mapa = [
  ['docs/originais/artigos/nr-6.png', 'nr-6-o-que-a-empresa-precisa-saber'],
  ['docs/originais/artigos/o-que-e-ca.png', 'o-que-e-ca-certificado-de-aprovacao'],
  ['docs/originais/artigos/solado-antiderrapante.png', 'solado-antiderrapante-o-que-significa'],
  ['docs/originais/artigos/calcado-ocupacional.png', 'calcado-ocupacional-ou-de-seguranca'],
  ['docs/originais/artigos/calcado-cozinha.png', 'calcado-para-cozinha-como-escolher'],
];
const kb = n => (n / 1024).toFixed(0) + 'KB';

// Uma borda só pode ser estendida se ela for de uma cor só. Nesta arte de
// cozinha há blocos vermelho e preto encostando na borda direita: estender
// o cinza claro ali deixaria uma tira visível ao lado do bloco.
async function borda(src, lado, larg, alt) {
  const { data } = await sharp(src)
    .extract({ left: lado === 'esq' ? 0 : larg - 6, top: 0, width: 6, height: alt })
    .raw().toBuffer({ resolveWithObject: true });
  let min = [255, 255, 255], max = [0, 0, 0], soma = [0, 0, 0], n = data.length / 3;
  for (let i = 0; i < data.length; i += 3)
    for (let c = 0; c < 3; c++) {
      const v = data[i + c];
      if (v < min[c]) min[c] = v; if (v > max[c]) max[c] = v; soma[c] += v;
    }
  const amplitude = Math.max(...max.map((v, c) => v - min[c]));
  return { uniforme: amplitude <= 12, cor: { r: Math.round(soma[0] / n), g: Math.round(soma[1] / n), b: Math.round(soma[2] / n) }, amplitude };
}

for (const [src, slug] of mapa) {
  const { width: W, height: H } = await sharp(src).metadata();
  const capa = `public/fotos/artigos/${slug}.webp`;
  await sharp(src).webp({ quality: 86, effort: 6 }).toFile(capa);

  const alvoA = 630, larg = Math.round(W * (alvoA / H)), falta = 1200 - larg;
  const e = await borda(src, 'esq', W, H), d = await borda(src, 'dir', W, H);
  let esq, dir;
  if (e.uniforme && d.uniforme) { esq = Math.floor(falta / 2); dir = falta - esq; }
  else if (e.uniforme) { esq = falta; dir = 0; }
  else if (d.uniforme) { esq = 0; dir = falta; }
  else { esq = null; }

  const og = `public/fotos/artigos/${slug}-og.jpg`;
  if (esq === null) {
    // Nenhuma borda estende sem emenda: corta pelo centro, e o alt cobre o resto.
    await sharp(src).resize(1200, 630, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 86, mozjpeg: true, progressive: true }).toFile(og);
    console.log(`${slug.padEnd(38)} CORTE  (nenhuma borda uniforme)`);
  } else {
    await sharp(src).resize(larg, alvoA)
      .extend({ top: 0, bottom: 0, left: esq, right: dir, background: esq > 0 ? e.cor : d.cor })
      .jpeg({ quality: 86, mozjpeg: true, progressive: true }).toFile(og);
    console.log(`${slug.padEnd(38)} capa ${kb((await stat(capa)).size).padStart(6)}  og ${kb((await stat(og)).size).padStart(6)}  estende esq ${esq} dir ${dir}  (amplitude esq ${e.amplitude}, dir ${d.amplitude})`);
  }
}
