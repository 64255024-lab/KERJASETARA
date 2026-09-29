import base64, glob, mimetypes, os, re

BASE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(BASE, 'figma-assets')
IMG_EXT = ('.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg')

_cache = {}

def data_uri(name):
    if name in _cache:
        return _cache[name]
    p = os.path.join(ASSETS, os.path.basename(name))
    if not os.path.isfile(p) or os.path.splitext(p)[1].lower() not in IMG_EXT:
        return None
    ext = os.path.splitext(p)[1].lower()
    if ext == '.svg':
        mime = 'image/svg+xml'
        with open(p, 'rb') as f:
            raw = f.read()
    else:
        mime = mimetypes.guess_type(p)[0] or 'image/jpeg'
        with open(p, 'rb') as f:
            raw = f.read()
    uri = 'data:' + mime + ';base64,' + base64.b64encode(raw).decode('ascii')
    _cache[name] = uri
    print('embed %s %dKB' % (name, len(uri) // 1024))
    return uri

pat = re.compile(r'src="(figma-assets/[^"]+)"')
n_files, n_embed, n_miss = 0, 0, 0
for f in sorted(glob.glob(os.path.join(BASE, '*.figma.html'))):
    h = open(f, encoding='utf-8').read()

    def sub(m):
        global n_embed, n_miss
        uri = data_uri(m.group(1).split('/', 1)[1])
        if uri is None:
            n_miss += 1
            return m.group(0)
        n_embed += 1
        return 'src="' + uri + '"'

    h2 = pat.sub(sub, h)
    open(f, 'w', encoding='utf-8', newline='\n').write(h2)
    n_files += 1
print('files=%d embedded=%d missing=%d' % (n_files, n_embed, n_miss))
