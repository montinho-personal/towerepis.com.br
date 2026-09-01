"""Extrai contornos de um CFF (Type1C) embutido e devolve caminhos SVG.

Escrito porque as bibliotecas disponíveis (fontkit, opentype.js) só aceitam
CFF dentro de um invólucro OpenType, e o que veio do .ai é CFF puro. São
1,3 KB de charstrings — menos trabalho interpretar do que montar um OTF
mínimo em volta.
"""
import struct, sys, json

STD = ['.notdef','space','exclam','quotedbl','numbersign','dollar','percent','ampersand','quoteright','parenleft','parenright','asterisk','plus','comma','hyphen','period','slash','zero','one','two','three','four','five','six','seven','eight','nine','colon','semicolon','less','equal','greater','question','at','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','bracketleft','backslash','bracketright','asciicircum','underscore','quoteleft','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

def indice(d, p):
    """Lê um INDEX do CFF; devolve (lista de bytes, posição seguinte)."""
    cnt = struct.unpack('>H', d[p:p+2])[0]
    p += 2
    if cnt == 0:
        return [], p
    tam = d[p]; p += 1
    desl = []
    for i in range(cnt+1):
        v = 0
        for b in d[p:p+tam]: v = (v<<8) | b
        desl.append(v); p += tam
    base = p - 1
    itens = [d[base+desl[i]: base+desl[i+1]] for i in range(cnt)]
    return itens, base + desl[-1]

def dicionario(b):
    """Lê um DICT do CFF; devolve {operador: [operandos]}."""
    out, ops, i = {}, [], 0
    while i < len(b):
        v = b[i]
        if v <= 21:
            op = v; i += 1
            if v == 12: op = 1200 + b[i]; i += 1
            out[op] = ops; ops = []
        elif v == 28: ops.append(struct.unpack('>h', b[i+1:i+3])[0]); i += 3
        elif v == 29: ops.append(struct.unpack('>i', b[i+1:i+5])[0]); i += 5
        elif v == 30:  # real
            s = ''; i += 1
            fim = False
            while i < len(b) and not fim:
                for nib in (b[i]>>4, b[i]&15):
                    if nib <= 9: s += str(nib)
                    elif nib == 10: s += '.'
                    elif nib == 11: s += 'E'
                    elif nib == 12: s += 'E-'
                    elif nib == 14: s += '-'
                    elif nib == 15: fim = True; break
                i += 1
            ops.append(float(s) if s else 0.0)
        elif 32 <= v <= 246: ops.append(v-139); i += 1
        elif 247 <= v <= 250: ops.append((v-247)*256 + b[i+1] + 108); i += 2
        elif 251 <= v <= 254: ops.append(-(v-251)*256 - b[i+1] - 108); i += 2
        else: i += 1
    return out

def viés(n): return 107 if n < 1240 else (1131 if n < 33900 else 32768)

def contorno(cs, subrs_l, subrs_g):
    """Interpreta um charstring Type 2 e devolve (d do SVG, largura de avanço)."""
    x = y = 0.0
    pilha, partes, nstems = [], [], 0
    largura = None
    aberto = False
    bl, bg = viés(len(subrs_l)), viés(len(subrs_g))
    trans = []

    def mover(nx, ny):
        nonlocal aberto
        if aberto: partes.append('Z')
        partes.append(f'M{nx:.1f} {ny:.1f}'); aberto = True

    def exec_cs(code, prof=0):
        nonlocal x, y, nstems, largura, pilha
        if prof > 10: return
        i = 0
        while i < len(code):
            v = code[i]
            if v >= 32 or v == 28:
                if v == 28: pilha.append(struct.unpack('>h', code[i+1:i+3])[0]); i += 3
                elif v <= 246: pilha.append(v-139); i += 1
                elif v <= 250: pilha.append((v-247)*256 + code[i+1] + 108); i += 2
                elif v <= 254: pilha.append(-(v-251)*256 - code[i+1] - 108); i += 2
                else: pilha.append(struct.unpack('>i', code[i+1:i+5])[0] / 65536.0); i += 5
                continue
            i += 1
            if v in (1, 3, 18, 23):                     # h/vstem(hm)
                if largura is None and len(pilha) % 2 == 1: largura = pilha.pop(0)
                nstems += len(pilha)//2; pilha = []
            elif v == 19 or v == 20:                    # hintmask
                if largura is None and len(pilha) % 2 == 1: largura = pilha.pop(0)
                nstems += len(pilha)//2; pilha = []
                i += (nstems + 7)//8
            elif v == 21:                               # rmoveto
                if len(pilha) > 2 and largura is None: largura = pilha.pop(0)
                x += pilha[0]; y += pilha[1]; mover(x, y); pilha = []
            elif v == 22:                               # hmoveto
                if len(pilha) > 1 and largura is None: largura = pilha.pop(0)
                x += pilha[0]; mover(x, y); pilha = []
            elif v == 4:                                # vmoveto
                if len(pilha) > 1 and largura is None: largura = pilha.pop(0)
                y += pilha[0]; mover(x, y); pilha = []
            elif v == 5:                                # rlineto
                for j in range(0, len(pilha)-1, 2):
                    x += pilha[j]; y += pilha[j+1]; partes.append(f'L{x:.1f} {y:.1f}')
                pilha = []
            elif v in (6, 7):                           # hlineto / vlineto
                horiz = (v == 6)
                for val in pilha:
                    if horiz: x += val
                    else: y += val
                    partes.append(f'L{x:.1f} {y:.1f}'); horiz = not horiz
                pilha = []
            elif v == 8:                                # rrcurveto
                for j in range(0, len(pilha)-5, 6):
                    x1,y1 = x+pilha[j], y+pilha[j+1]; x2,y2 = x1+pilha[j+2], y1+pilha[j+3]
                    x,y = x2+pilha[j+4], y2+pilha[j+5]
                    partes.append(f'C{x1:.1f} {y1:.1f} {x2:.1f} {y2:.1f} {x:.1f} {y:.1f}')
                pilha = []
            elif v == 24:                               # rcurveline
                j = 0
                while len(pilha) - j >= 8:
                    x1,y1 = x+pilha[j], y+pilha[j+1]; x2,y2 = x1+pilha[j+2], y1+pilha[j+3]
                    x,y = x2+pilha[j+4], y2+pilha[j+5]
                    partes.append(f'C{x1:.1f} {y1:.1f} {x2:.1f} {y2:.1f} {x:.1f} {y:.1f}'); j += 6
                x += pilha[j]; y += pilha[j+1]; partes.append(f'L{x:.1f} {y:.1f}'); pilha = []
            elif v == 25:                               # rlinecurve
                j = 0
                while len(pilha) - j >= 8:
                    x += pilha[j]; y += pilha[j+1]; partes.append(f'L{x:.1f} {y:.1f}'); j += 2
                x1,y1 = x+pilha[j], y+pilha[j+1]; x2,y2 = x1+pilha[j+2], y1+pilha[j+3]
                x,y = x2+pilha[j+4], y2+pilha[j+5]
                partes.append(f'C{x1:.1f} {y1:.1f} {x2:.1f} {y2:.1f} {x:.1f} {y:.1f}'); pilha = []
            elif v in (26, 27):                         # vvcurveto / hhcurveto
                j = 0; d1 = 0
                if len(pilha) % 4 == 1: d1 = pilha[0]; j = 1
                while j + 3 < len(pilha):
                    if v == 26:
                        x1,y1 = x+d1, y+pilha[j]; x2,y2 = x1+pilha[j+1], y1+pilha[j+2]
                        x,y = x2, y2+pilha[j+3]
                    else:
                        x1,y1 = x+pilha[j], y+d1; x2,y2 = x1+pilha[j+1], y1+pilha[j+2]
                        x,y = x2+pilha[j+3], y2
                    partes.append(f'C{x1:.1f} {y1:.1f} {x2:.1f} {y2:.1f} {x:.1f} {y:.1f}')
                    d1 = 0; j += 4
                pilha = []
            elif v in (30, 31):                         # vhcurveto / hvcurveto
                horiz = (v == 31); j = 0
                while j + 3 < len(pilha):
                    ult = (len(pilha) - j == 5)
                    if horiz:
                        x1,y1 = x+pilha[j], y; x2,y2 = x1+pilha[j+1], y1+pilha[j+2]
                        y = y2+pilha[j+3]; x = x2 + (pilha[j+4] if ult else 0)
                    else:
                        x1,y1 = x, y+pilha[j]; x2,y2 = x1+pilha[j+1], y1+pilha[j+2]
                        x = x2+pilha[j+3]; y = y2 + (pilha[j+4] if ult else 0)
                    partes.append(f'C{x1:.1f} {y1:.1f} {x2:.1f} {y2:.1f} {x:.1f} {y:.1f}')
                    horiz = not horiz; j += 4
                pilha = []
            elif v == 10:                               # callsubr
                idx = int(pilha.pop()) + bl
                if 0 <= idx < len(subrs_l): exec_cs(subrs_l[idx], prof+1)
            elif v == 29:                               # callgsubr
                idx = int(pilha.pop()) + bg
                if 0 <= idx < len(subrs_g): exec_cs(subrs_g[idx], prof+1)
            elif v == 11: return                        # return
            elif v == 14:                               # endchar
                if largura is None and len(pilha) in (1, 5): largura = pilha[0]
                if aberto: partes.append('Z')
                return
            elif v == 12: i += 1; pilha = []             # escape: ignora flex etc.
            else: pilha = []
    exec_cs(cs)
    return ''.join(partes), largura

def abrir(caminho):
    d = open(caminho, 'rb').read()
    p = d[2]                       # hdrSize
    nomes, p = indice(d, p)
    tops, p = indice(d, p)
    strings, p = indice(d, p)
    gsubrs, p = indice(d, p)
    top = dicionario(tops[0])
    cs_off = int(top[17][0])
    charstrings, _ = indice(d, cs_off)
    lsubrs = []
    if 18 in top:
        ptam, poff = int(top[18][0]), int(top[18][1])
        priv = dicionario(d[poff:poff+ptam])
        if 19 in priv:
            lsubrs, _ = indice(d, poff + int(priv[19][0]))
    # charset: mapeia glifo -> nome
    nomes_g = ['.notdef']
    if 15 in top and int(top[15][0]) > 2:
        q = int(top[15][0]); fmt = d[q]; q += 1
        if fmt == 0:
            for _ in range(len(charstrings)-1):
                sid = struct.unpack('>H', d[q:q+2])[0]; q += 2
                nomes_g.append(STD[sid] if sid < len(STD) else strings[sid-391].decode('latin1'))
        else:
            while len(nomes_g) < len(charstrings):
                sid = struct.unpack('>H', d[q:q+2])[0]; q += 2
                n = d[q] if fmt == 1 else struct.unpack('>H', d[q:q+2])[0]
                q += 1 if fmt == 1 else 2
                for k in range(n+1):
                    s = sid+k
                    nomes_g.append(STD[s] if s < len(STD) else strings[s-391].decode('latin1'))
    else:
        nomes_g = [STD[i] if i < len(STD) else f'g{i}' for i in range(len(charstrings))]
    saida = {}
    for i, cs in enumerate(charstrings):
        nome = nomes_g[i] if i < len(nomes_g) else f'g{i}'
        d_svg, larg = contorno(cs, lsubrs, gsubrs)
        saida[nome] = {'d': d_svg, 'largura': larg}
    return {'nome': nomes[0].decode('latin1'), 'glifos': saida}

if __name__ == '__main__':
    for f in sys.argv[1:]:
        r = abrir(f)
        print(f, '->', r['nome'])
        for n, g in r['glifos'].items():
            print(f"   {n:12} largura={g['largura']} d={len(g['d'])} chars")
        json.dump(r, open(f.replace('.cff', '.json'), 'w'))
