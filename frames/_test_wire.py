import os, re

BASE = os.path.dirname(os.path.abspath(__file__))
SRC = open(os.path.join(BASE, 'figma-autowire-plugin', 'code.js'), encoding='utf-8').read()

# Ambil blok JS lalu ubah ke Python: const X = -> X =, { m: -> { 'm':
def js2py(block):
    block = re.sub(r'const (\w+) =', r'\1 =', block)
    block = re.sub(r'//.*', '', block)  # buang komentar JS
    block = block.replace("{ m:", "{ 'm':").replace("{m:", "{ 'm':")
    block = re.sub(r',\s*\bd:', ", 'd':", block)
    return block

def cut(a, b):
    s = SRC[SRC.index(a):SRC.index(b)]
    # potong dari penutup blok terakhir (}; atau ];) agar komentar trailing ikut hilang
    end = max(s.rfind('};'), s.rfind('];'))
    return s[:end + 2]

cta_src = js2py(cut('const CTA =', '// Nav global'))
nav_src = js2py(cut('const NAV =', '// Aturan case-sensitive'))
case_src = js2py(cut('const CASE_RULES =', '// Teks persis'))
whole_src = js2py(cut('const WHOLE =', '// teks kartu loker'))

ns = {}
exec(cta_src, ns); exec(nav_src, ns); exec(case_src, ns); exec(whole_src, ns)
CTA, NAV, CASE_RULES, WHOLE = ns['CTA'], ns['NAV'], ns['CASE_RULES'], ns['WHOLE']

STRIP = list('→←•○●✓▾📎�?!"\'“”‘’.,:;()[]—–_*+#%@-') + ['\u0095', '\u0097', '\\']
def norm(s):
    s = (s or '').lower()
    for c in STRIP:
        s = s.replace(c, ' ')
    return re.sub(r'\s+', ' ', s).strip()

def frame_key(name):
    # tiru JS baru: "NN-MM-slug" -> "MM-slug", selain itu tetap
    m = re.match(r'^(\d+)-(\d+)-(.+)$', (name or '').lower())
    if m:
        return '%s-%s' % (m.group(2), m.group(3))
    return (name or '').lower()

def find(frames, prefix):
    p = prefix.lower()
    for f in frames:
        if frame_key(f).startswith(p):
            return f
    return None

FRAMES = ['01-02-home', '02-03-search', '03-04-detail', '04-05-login',
          '05-06-register-talent', '06-07-register-company', '07-08-wizard-1',
          '08-09-wizard-2', '09-10-resume', '10-11-matcher', '11-12-apply',
          '12-13-my-jobs', '13-14-network', '14-15-post-job',
          '15-16-applicants', '16-17-dashboard', '17-18-info',
          '18-19-companies', '19-20-employer', '20-21-pricing']

ok, fails = 0, []
print('DBG CTA_KEYS=%d NAV=%d CASE=%d WHOLE=%d' % (len(CTA), len(NAV), len(CASE_RULES), len(WHOLE)))
for f in sorted(os.listdir(BASE)):
    if not re.match(r'^\d\d-.*\.html$', f) or f.endswith('.figma.html') or f.startswith('_'):
        continue
    fk = f[:-5].lower()
    short = fk[:2]
    rules = []
    for k, rs in CTA.items():
        if k[:2] == short:
            rules += rs
    rules += NAV
    try:
        h = open(os.path.join(BASE, f), encoding='utf-8-sig').read()
        if '�' in h:
            raise UnicodeDecodeError('x', b'', 0, 1, 'x')
    except UnicodeDecodeError:
        h = open(os.path.join(BASE, f), encoding='cp1252').read()
    for m in re.finditer(r'<a\b[^>]*href="([^"]*)"[^>]*>(.*?)</a>', h, re.S):
        href, inner = m.group(1), re.sub(r'<[^>]+>', ' ', m.group(2))
        raw = re.sub(r'\s+', ' ', inner).strip()
        if href == '#' or not raw:
            continue
        ch = norm(raw)
        dest = WHOLE.get(ch.strip().strip('"').strip("'"))
        if f == '02-home.html' and ok + len(fails) < 1:
            print('DBG LOOKUP ch=%r -> %r (keys=%r)' % (ch, dest, list(WHOLE.keys())[:3]))
        if not dest:
            for r in CASE_RULES:
                if any(kw in raw for kw in r['m']):
                    dest = r['d']
                    break
        if not dest:
            for r in rules:
                ms = r['m'] if isinstance(r['m'], list) else [r['m']]
                if any(kw in ch for kw in ms):
                    dest = r['d']
                    break
        if f == '02-home.html' and ok + len(fails) < 2:
            print('DBG WHOLE=%r' % (WHOLE,))
            print('DBG RULE0=%r RULE1=%r NAV0=%r' % (rules[0], rules[1], NAV[0]))
            print('DBG KW0=%r T=%s' % (rules[0]['m'][0], rules[0]['m'][0] in ch))
        want = href[:-5].lower()
        frame = find(FRAMES, dest) if dest else None
        got = frame_key(frame) if frame else None
        if got != want:
            fails.append('%s: [%s] "%s" -> %s (norm:"%s")'
                         % (f, href, raw[:45], got or 'NONE', ch[:40]))
        else:
            ok += 1

print('MATCH %d' % ok)
for x in fails:
    print('MISS ' + x)
print('MISS_COUNT %d' % len(fails))
