"""Converte o selo do .ai (PDF por dentro) em SVG, com as formas e os degradês.

Percorre o content stream de verdade em vez de transcrever caminhos à mão:
seis regiões recortadas, cada uma preenchida por um shading axial sob uma
matriz própria. Transcrever isso a olho é onde entram os erros que ninguém vê.
"""
import re, sys
sys.path.insert(0, '.')
from cff import abrir

def num(t):
    return float(t)

def converter(caminho_content):
    src = open(caminho_content).read()
    toks = src.replace('\n', ' ').split()
    pilha_ops = []          # operandos numéricos correntes
    estado = {'cm': None}
    salvos = []
    regioes = []            # (d, shading, matriz)
    d_atual = []
    ponto = None
    i = 0
    while i < len(toks):
        t = toks[i]
        try:
            pilha_ops.append(num(t)); i += 1; continue
        except ValueError:
            pass
        if t == 'q':
            salvos.append(dict(estado)); pilha_ops = []
        elif t == 'Q':
            estado = salvos.pop() if salvos else {'cm': None}; pilha_ops = []
        elif t == 'cm':
            estado = dict(estado); estado['cm'] = pilha_ops[-6:]; pilha_ops = []
        elif t == 're':
            x, y, w, h = pilha_ops[-4:]
            d_atual.append(f'M{x} {y}H{x+w}V{y+h}H{x}Z'); pilha_ops = []
        elif t == 'm':
            x, y = pilha_ops[-2:]; ponto = (x, y)
            d_atual.append(f'M{x} {y}'); pilha_ops = []
        elif t == 'l':
            x, y = pilha_ops[-2:]; ponto = (x, y)
            d_atual.append(f'L{x} {y}'); pilha_ops = []
        elif t == 'c':
            a, b, c, dd, e, f = pilha_ops[-6:]; ponto = (e, f)
            d_atual.append(f'C{a} {b} {c} {dd} {e} {f}'); pilha_ops = []
        elif t == 'h':
            d_atual.append('Z'); pilha_ops = []
        elif t == 'W':
            pass                      # o recorte é o próprio caminho
        elif t == 'n':
            estado = dict(estado); estado['clip'] = ''.join(d_atual)
            d_atual = []; pilha_ops = []
        elif t == 'sh':
            nome = toks[i-1]          # /Sh0 ou /Sh1
            regioes.append((estado.get('clip') or (salvos[-1].get('clip') if salvos else ''),
                            nome.lstrip('/'), estado['cm']))
            pilha_ops = []
        elif t == 'BT':
            break
        else:
            pilha_ops = []
        i += 1
    # o recorte fica no estado salvo anterior ao q que envolve o sh
    corrigidas = []
    for d, sh, cm in regioes:
        corrigidas.append((d, sh, cm))
    return corrigidas

def paradas(c0, c1, n_exp, passos=12):
    """Amostra a função exponencial do PDF: C(t) = C0 + t^N * (C1 - C0)."""
    out = []
    for k in range(passos):
        t = k / (passos - 1)
        c = [c0[j] + (t ** n_exp) * (c1[j] - c0[j]) for j in range(3)]
        hexa = '#' + ''.join(f'{round(v*255):02x}' for v in c)
        out.append(f'<stop offset="{t*100:.4g}%" stop-color="{hexa}"/>')
    return ''.join(out)

SH = {
    'Sh0': ([1.0, 1.0, 1.0], [0.819608, 0.823529, 0.827451], 1.61089),
    'Sh1': ([0.603922, 0.109804, 0.121569], [0.886275, 0.117647, 0.184314], 1.61089),
}

regioes = converter('logo/content.txt')
print(f'{len(regioes)} regiões com degradê')

defs, corpos = [], []
for k, (d, sh, cm) in enumerate(regioes):
    c0, c1, n = SH[sh]
    gid = f'g{k}'
    m = ' '.join(f'{v:g}' for v in cm)
    defs.append(f'<linearGradient id="{gid}" gradientUnits="userSpaceOnUse" '
                f'x1="0" y1="0" x2="1" y2="0" gradientTransform="matrix({m})">'
                f'{paradas(c0, c1, n)}</linearGradient>')
    corpos.append(f'<path d="{d}" fill="url(#{gid})"/>')
    print(f'  {gid}: {sh}  d={len(d)} chars')

# tipografia branca por cima, nas mesmas coordenadas do PDF
bold = abrir('logo/fonts/f1.cff')['glifos']
light = abrir('logo/fonts/f0.cff')['glifos']

def corrida(glifos, seq, tx, ty, sx, sy):
    ds, pos = [], 0.0
    for nome, ajuste, forcar in seq:
        g = glifos[nome]
        if forcar is not None: pos = forcar
        ds.append(f'<path d="{g["d"]}" transform="translate({pos:.2f} 0)"/>')
        pos += g['largura'] - ajuste
    return (f'<g transform="translate({tx} {ty}) scale({sx/1000:.6f} {sy/1000:.6f})">'
            f'{"".join(ds)}</g>')

tipo = (corrida(bold, [('T',19,None),('O',10,None),('W',0,None),('E',0,None),('R',0,None)],
                63.25, 515.4541, 241.3008, 241.3008)
        + '<rect x="90" y="468.523" width="846" height="7"/>'
        + corrida(light, [('E',0,None),('P',0,None),('I',0,None),('quoteright',0,None),('s',0,1597.0)],
                  306.8188, 292.3457, 199.1262, 197.9051))

svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">'
       f'<defs>{"".join(defs)}</defs>'
       '<g transform="translate(0 1000) scale(1 -1)">'
       f'{"".join(corpos)}'
       f'<g fill="#ffffff">{tipo}</g>'
       '</g></svg>')
open('logo/selo.svg','w').write(svg)
print('selo.svg:', len(svg), 'bytes')
