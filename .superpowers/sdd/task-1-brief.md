# Task 1: Scaffold tokens + cover

**Files:**
- Create: `frames/_tokens.css`
- Create: `frames/01-cover.html`
- Test: `frames/01-cover.html` render screenshot terbaca

**Interfaces:**
- Consumes: —
- Produces: `_tokens.css` (:root vars `--primary #1B4DD8`, `--teal #0E9F8A`, `--ink #0F1B2D`, `--muted #5B6B82`, `--bg #F6F8FC`, `--radius 16px`, `.btn`, `.card`, `.chip`, `.badge` classes) dipakai semua task berikut.

**Global Constraints (verbatim):**
- Frame width 1440px, font Inter/Plus Jakarta Sans, primary #1B4DD8, aksen #0E9F8A, kontras teks ≥4.5:1.
- Target sentuh min 48px (56px mode daksa), tiap gambar wajib alt text.
- Bahasa person-first, tanpa istilah merendahkan.
- Semua file di `C:\Users\s7n0c\Downloads\UNTUKLOMBA\`.
- Commit tiap task selesai.

## Steps

### Step 1: Tulis tokens CSS — file `frames/_tokens.css`, exact content:

```css
:root{--primary:#1B4DD8;--teal:#0E9F8A;--ink:#0F1B2D;--muted:#5B6B82;--bg:#F6F8FC;--card:#fff;--radius:16px;--focus:#FFB300}
*{box-sizing:border-box}body{margin:0;font-family:'Plus Jakarta Sans',Inter,Arial,sans-serif;color:var(--ink);background:var(--bg);width:1440px}
.btn{display:inline-block;min-height:48px;line-height:48px;padding:0 28px;border-radius:12px;background:var(--primary);color:#fff;font-weight:700;text-decoration:none}
.btn-ghost{background:#fff;color:var(--primary);border:2px solid var(--primary)}
.card{background:var(--card);border-radius:var(--radius);padding:24px;box-shadow:0 2px 12px rgba(15,27,45,.08)}
.chip{display:inline-block;padding:8px 16px;border-radius:999px;background:#E8EEFB;font-weight:600}
.badge{display:inline-block;padding:6px 12px;border-radius:8px;background:#E6F6F1;color:#0B7A67;font-weight:700}
:focus-visible{outline:4px solid var(--focus);outline-offset:2px}
```

### Step 2: Tulis `frames/01-cover.html` — judul, nama tim "Tim Inklusif", narasi 2 kalimat, daftar 18 frame, CTA "Mulai prototype":

```html
<link rel="stylesheet" href="_tokens.css">
<div style="padding:96px;text-align:center">
<h1 style="font-size:56px">KerjaSetara — Karier Tanpa Batas</h1>
<p>Portal loker inklusif: Access Mode + AI Job Matcher transparan.</p>
<a class="btn" href="02-home.html">Mulai prototype</a>
</div>
```

Perluas sedikit: tambahkan sub-daftar 18 frame (cukup list nama frame dalam 3 kolom) agar cover informatif. Tetap 1 file, no JS.

### Step 3: Render ke Figma
Gunakan tool html_to_design dengan path file `frames/01-cover.html`, width 1440. Expected: frame id kembali. Jika tool tidak tersedia di environment-mu, LAPORKAN sebagai concern (jangan skip diam-diam) — file HTML tetap deliverable utama.

### Step 4: Screenshot verify
take_screenshot nodeId frame, scale 0.5. Expected: judul + CTA terbaca. Jika tool tak tersedia, verifikasi dengan membuka file di browser bila bisa, atau laporkan.

### Step 5: Commit
```bash
git add frames/_tokens.css frames/01-cover.html
git commit -m "feat: scaffold tokens dan cover"
```
