import glob, os, re
from PIL import Image

BASE = os.path.dirname(os.path.abspath(__file__))
SRC_ASSETS = os.path.join(BASE, '..', 'assets')
OUT_ASSETS = os.path.join(BASE, 'figma-assets')
os.makedirs(OUT_ASSETS, exist_ok=True)

# 1. Kompres aset (skip kalau sudah ada & ukurannya > 0)
for fn in sorted(os.listdir(SRC_ASSETS)):
    src = os.path.join(SRC_ASSETS, fn)
    dst = os.path.join(OUT_ASSETS, fn)
    if not os.path.isfile(src):
        continue
    if os.path.isfile(dst) and os.path.getsize(dst) > 0:
        continue
    try:
        im = Image.open(src)
        ext = os.path.splitext(fn)[1].lower()
        if ext in ('.jpg', '.jpeg'):
            im = im.convert('RGB')
            im.thumbnail((800, 800))
            im.save(dst, 'JPEG', quality=68, optimize=True)
        elif ext == '.png':
            im.thumbnail((400, 400))
            im.save(dst, 'PNG', optimize=True)
        else:
            im.save(dst)
        print(f'{fn}: {os.path.getsize(src)//1024}KB -> {os.path.getsize(dst)//1024}KB')
    except Exception as e:
        print(f'SKIP {fn}: {e}')

# 2. Resolve CSS vars -> literal (renderer Figma tidak dukung var())
css = open(os.path.join(BASE, '_tokens.css'), encoding='utf-8').read()
VAR = {
    '--primary': '#1B4DD8', '--primary-deep': '#12327E',
    '--primary-soft': '#EAF0FE', '--teal': '#0E9F8A',
    '--teal-soft': '#E6F6F1', '--amber': '#F59E0B',
    '--ink': '#0F1B2D', '--muted': '#5B6B82',
    '--bg': '#F2F5FB', '--card': '#ffffff',
    '--line': '#E3E9F3', '--radius': '22px', '--focus': '#FFB300',
    '--shadow': '0 8px 30px rgba(27,77,216,.08)',
    '--shadow-hover': '0 16px 44px rgba(27,77,216,.16)',
}
for k, v in VAR.items():
    css = css.replace(f'var({k})', v)
# body tetap center di frame 1440
css = css.replace('body{margin:0;', 'body{margin:0 auto;')

def read_text(f):
    try:
        t = open(f, encoding='utf-8-sig').read()
        if '�' in t:
            raise UnicodeDecodeError('x', b'', 0, 1, 'x')
        return t
    except UnicodeDecodeError:
        return open(f, encoding='cp1252').read()  # bytes 0x95/0x97 -> •/—

n = 0
for f in sorted(glob.glob(os.path.join(BASE, '*.html'))):
    base = os.path.basename(f)
    if base.endswith('.figma.html') or base.startswith('_figma'):
        continue
    h = read_text(f)
    assert '<link rel="stylesheet" href="_tokens.css">' in h, base
    h = h.replace('<link rel="stylesheet" href="_tokens.css">',
                  '<meta charset="utf-8"><style>' + css + '</style>')
    h = h.replace('../assets/', 'figma-assets/')

    # FIX BG HITAM (akar): frame root Figma = transparan. Renderer hanya mewarnai
    # node yg punya fill eksplisit. Browser mewarnai area kosong dari <body>, Figma
    # TIDAK — area kosong = hitam canvas. Bungkus SELURUH isi dgn 1 div bg terang.
    # Tampilan browser TIDAK berubah (warna sama dgn body).
    h = re.sub(r'(</style>)\s*(<div class="nav">)',
               r'\1<div style="background:#F2F5FB">\2', h, count=1)
    h = h.replace('</div></div>\n',
                  '</div></div></div>\n', 1) if False else h  # (jangan; tutup di bawah)
    if '<div style="background:#F2F5FB"><div class="nav">' in h:
        idx = h.rfind('<div class="footer">')
        if idx != -1:
            # cari </div></div> penutup footer, sisip tutup wrapper setelahnya
            end = h.find('</div></div>', idx) + len('</div></div>')
            h = h[:end] + '</div>' + h[end:]
    h = h.replace('<div style="padding:40px 64px 0">',
                  '<div style="padding:40px 64px 0;background:#F2F5FB">')
    h = h.replace('<div style="padding:32px 64px">',
                  '<div style="padding:32px 64px;background:#F2F5FB">')
    h = h.replace('<div style="padding:48px 64px">',
                  '<div style="padding:48px 64px;background:#F2F5FB">')
    h = h.replace('<div style="padding:40px 64px">',
                  '<div style="padding:40px 64px;background:#F2F5FB">')
    h = h.replace('<div style="display:flex;gap:0;min-height:640px">',
                  '<div style="display:flex;gap:0;min-height:640px;background:#F2F5FB">')

    # FIX kotak form sempit di Figma: renderer abaikan max-width px + margin auto
    # (06/07/10: card 680/900px jadi kolom ~300px; 12/15: 640px). Ganti dgn lebar
    # eksplisit + margin auto: TAMPILAN SAMA di browser, benar di Figma.
    h = h.replace('<div style="max-width:680px;padding:0 24px;margin:24px auto 0">',
                  '<div style="width:680px;margin:24px auto 0">')
    h = h.replace('<div style="max-width:900px;padding:0 24px;margin:24px auto 0">',
                  '<div style="width:900px;margin:24px auto 0">')
    h = h.replace('<div style="max-width:640px;padding:0 24px;margin:32px auto 0">',
                  '<div style="width:640px;margin:32px auto 0">')
    h = h.replace('<div style="max-width:680px;padding:0 24px;margin:48px auto">',
                  '<div style="width:680px;margin:48px auto">')
    # input/select/textarea width:100% + min-height: tanpa max-width parent benar
    # kadang collapse; kunci min-width agar kolom form gak menyusut
    h = h.replace('<label style="flex:1;min-width:0">', '<label style="flex:1">')

    # var() sisa di inline style -> literal (renderer Figma buta var)
    for k, v in VAR.items():
        h = h.replace(f'var({k})', v)
    h = h.replace('var(--shadow-hover)', '0 16px 44px rgba(27,77,216,.16)')
    h = h.replace('var(--shadow)', '0 8px 30px rgba(27,77,216,.08)')
    assert 'var(' not in h, f'sisa var() di {base}'

    # hero centered -> flex column (judul gak numpuk)
    h = re.sub(
        r'<div class="hero" style="([^"]*?)text-align:center([^"]*?)">',
        r'<div class="hero" style="display:flex;flex-direction:column;align-items:center;\1text-align:center\2">',
        h)
    # JANGAN hapus margin auto (centering!) — fix lama 'margin:0 auto'->'margin:0' dibuang.

    # KPI: parent center, item inline-block (span natural side-by-side)
    h = h.replace('<div class="kpi">',
                  '<div class="kpi" style="text-align:center;margin-top:28px">')
    h = h.replace('<div class="kpi" style="justify-content:start">',
                  '<div class="kpi" style="text-align:left;margin-top:20px">')
    h = h.replace('<span class="item">',
                  '<span class="item" style="display:inline-block;white-space:nowrap;margin:4px 8px">')

    # FIX UTAMA kotak daftar: negative-margin overlap -> margin positif + padding samping.
    # Renderer Figma gagal hitung margin negatif + relative -> kotak kebablasan & gutter hitam.
    h = h.replace('margin:-32px auto 0;position:relative', 'margin:24px auto 0')
    h = h.replace('margin:-24px auto 0;position:relative', 'margin:24px auto 0')
    h = h.replace('margin:-32px auto 0', 'margin:24px auto 0')
    h = h.replace('margin:-24px auto 0', 'margin:24px auto 0')
    # wadah card 680/900 + padding samping biar gak mentok
    h = h.replace('<div style="max-width:680px;', '<div style="max-width:680px;padding:0 24px;')
    h = h.replace('<div style="max-width:900px;', '<div style="max-width:900px;padding:0 24px;')
    # card pastikan putih eksplisit (gagal var() = transparan)
    h = h.replace('<div class="card">', '<div class="card" style="background:#ffffff">')

    # grid repeat() -> flex (renderer grid inline sering jadi stack acak)
    h = h.replace('display:grid;grid-template-columns:repeat(3,1fr);gap:32px',
                  'display:flex;gap:32px')
    h = h.replace('display:grid;grid-template-columns:repeat(4,1fr);gap:32px',
                  'display:flex;gap:32px')
    h = h.replace('display:grid;grid-template-columns:repeat(4,1fr);gap:24px',
                  'display:flex;gap:24px')
    h = h.replace('display:grid;grid-template-columns:1fr 1fr;gap:0 32px;margin-top:16px',
                  'display:flex;gap:0 32px;margin-top:16px')
    h = h.replace('display:grid;grid-template-columns:repeat(3,1fr);gap:24px',
                  'display:flex;gap:24px')

    # section-band CTA: cegah img+teks+btn numpuk
    h = h.replace('<div style="flex:1">', '<div style="flex:1;min-width:0">')
    h = h.replace('<label style="flex:1">', '<label style="flex:1;min-width:0">')
    h = h.replace('href="06-register-talent.html">Buat profil<',
                  'href="06-register-talent.html" style="flex-shrink:0;white-space:nowrap">Buat profil<')

    # ikon '?' placeholder -> panah/bullet beneran
    h = h.replace(' ?</a>', ' →</a>').replace(' ?<', ' →<')
    h = h.replace(' ?? ', ' • ').replace('?? ', '').replace(' ??', '')
    h = h.replace('? 1 Akun', '● 1 Akun').replace('? ? 2 Profil', '○ 2 Profil')
    h = h.replace('? Tuna rungu wicara', '● Tuna rungu wicara')
    h = h.replace('Baca selengkapnya →', 'Baca selengkapnya →')

    extra = '.hero h1{max-width:1000px;line-height:1.15}'
    h = h.replace('</style>', extra + '</style>', 1)
    out = os.path.join(BASE, base.replace('.html', '.figma.html'))
    open(out, 'w', encoding='utf-8', newline='\n').write(h)
    n += 1
print(f'built: {n} figma html')
