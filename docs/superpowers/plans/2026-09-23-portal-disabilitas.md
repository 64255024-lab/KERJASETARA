# Portal Karier Disabilitas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bangun 18-frame Figma prototype klik-penuh portal loker disabilitas via file HTML lokal yang di-render dengan html_to_design.

**Architecture:** Tiap frame = 1 file HTML statis (1440px) + 1 shared CSS tokens. Render ke Figma pakai html_to_design, verifikasi via take_screenshot, wiring interaksi native Figma. Data dummy inline di HTML.

**Tech Stack:** HTML + CSS murni, DesignAgent MCP (html_to_design, take_screenshot, set_auto_layout), Figma interactions.

## Global Constraints

- Frame width 1440px, font Inter/Plus Jakarta Sans, primary #1B4DD8, aksen #0E9F8A, kontras teks ≥4.5:1.
- Target sentuh min 48px (56px mode daksa), tiap gambar wajib alt text.
- Bahasa person-first, tanpa istilah merendahkan.
- Semua file di `C:\Users\s7n0c\Downloads\UNTUKLOMBA\`.
- Commit tiap task selesai.

---

### Task 1: Scaffold tokens + cover

**Files:**
- Create: `frames/_tokens.css`
- Create: `frames/01-cover.html`
- Test: `frames/01-cover.html` render screenshot terbaca

**Interfaces:**
- Consumes: —
- Produces: `_tokens.css` (:root vars `--primary #1B4DD8`, `--teal #0E9F8A`, `--ink #0F1B2D`, `--muted #5B6B82`, `--bg #F6F8FC`, `--radius 16px`, `.btn`, `.card`, `.chip`, `.badge` classes) dipakai semua task berikut.

- [ ] **Step 1: Tulis tokens CSS**

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

- [ ] **Step 2: Tulis 01-cover.html** (judul, nama tim, narasi 2 kalimat, daftar 18 frame, CTA "Mulai prototype")

```html
<link rel="stylesheet" href="_tokens.css">
<div style="padding:96px;text-align:center">
<h1 style="font-size:56px">KerjaSetara — Karier Tanpa Batas</h1>
<p>Portal loker inklusif: Access Mode + AI Job Matcher transparan.</p>
<a class="btn" href="02-home.html">Mulai prototype</a>
</div>
```

- [ ] **Step 3: Render ke Figma**

Run: html_to_design path `frames/01-cover.html`, width 1440. Expected: frame id kembali.
- [ ] **Step 4: Screenshot verify**

Run: take_screenshot nodeId frame, scale 0.5. Expected: judul + CTA terbaca.
- [ ] **Step 5: Commit**

```bash
git add frames/_tokens.css frames/01-cover.html
git commit -m "feat: scaffold tokens dan cover"
```

### Task 2: Home + Cari + Detail

**Files:**
- Create: `frames/02-home.html` (hero, Access Mode bar, 8 kartu loker dummy, keunggulan, tips, footer)
- Create: `frames/03-search.html` (filter: jenis disabilitas, lokasi, kategori; grid hasil)
- Create: `frames/04-detail.html` (badge ramah, akomodasi, deadline, CTA lamar/simpan, info perusahaan)
- Test: screenshot 3 frame, semua kartu tampil 8 loker

**Interfaces:**
- Consumes: `_tokens.css` classes dari Task 1.
- Produces: pola `.job-card` (logo, judul, perusahaan, chip disabilitas, lokasi, deadline) dipakai ulang Task 4/5.

- [ ] **Step 1: Tulis 02-home.html** — hero + access bar (5 tombol mode) + grid 8 `.job-card` + 3 keunggulan + footer. Data loker: Operator Sewing (Tuna Rungu, Semarang), Admin Intern (Multi, Denpasar), + 6 fiktif.
- [ ] **Step 2: Tulis 03-search.html** — sidebar filter checkbox (5 disabilitas, 4 kota, 4 kategori) + grid hasil + empty-state "Tidak ada hasil, longgarkan filter".
- [ ] **Step 3: Tulis 04-detail.html** — header perusahaan, badge "Ramah Kursi Roda", list akomodasi (ram jalan, toilet aksesibel, jam fleksibel), deadline, `.btn` Lamar + `.btn-ghost` Simpan.
- [ ] **Step 4: Render 3 file via html_to_design, screenshot tiap frame scale 0.5**

Expected: lolos baca, kartu konsisten.
- [ ] **Step 5: Commit**

```bash
git add frames/02-home.html frames/03-search.html frames/04-detail.html
git commit -m "feat: home search detail loker"
```

### Task 3: Auth + Wizard + Resume

**Files:**
- Create: `frames/05-login.html` (2 tab peran + akun demo 1-klik)
- Create: `frames/06-register-talent.html`, `frames/07-register-company.html`
- Create: `frames/08-wizard-1.html` (data diri), `frames/09-wizard-2.html` (disabilitas/hambatan/alat bantu chip + privasi granular), `frames/10-resume.html` (template auto)
- Test: screenshot; wizard s2 tampilkan 5 chip disabilitas + 3 opsi privasi

**Interfaces:**
- Consumes: `_tokens.css`; link ke Task 4 (matcher).
- Produces: field names profil (`nama, skill[], lokasi, akomodasi[], privasi`) yang dibaca Task 4.

- [ ] **Step 1: Tulis 05-login + 06 + 07** — form email/password, validasi inline, link lupa password, tombol "Coba akun demo".
- [ ] **Step 2: Tulis 08-wizard-1 + 09-wizard-2** — s1: nama, kontak, kota, ringkasan. s2: chip pilih (Daksa, Rungu Wicara, Netra, Grahita, Mental), hambatan, alat bantu, radio privasi (Penuh/Sebagian/Privat), progress "Langkah 2 dari 2".
- [ ] **Step 3: Tulis 10-resume.html** — section Riwayat, Pendidikan, Pelatihan, Keterampilan, Minat; tombol Unduh/Cetak + "Lihat Skor AI".
- [ ] **Step 4: Render + screenshot, cek error-state tampil (contoh: email kosong → pesan merah)**

- [ ] **Step 5: Commit**

```bash
git add frames/05-login.html frames/06-register-talent.html frames/07-register-company.html frames/08-wizard-1.html frames/09-wizard-2.html frames/10-resume.html
git commit -m "feat: auth wizard resume"
```

### Task 4: AI Matcher + Lamar + Loker Saya + Koneksi

**Files:**
- Create: `frames/11-matcher.html` (skor ring %, 3 alasan cocok, 2 gap, CTA Tutup Gap/Lamar/Simpan; state profil-kosong)
- Create: `frames/12-apply.html` (lamar 1-klik, opsi video/isyarat, sukses check + langkah berikut)
- Create: `frames/13-my-jobs.html` (tab Cocok/Simpan/Dilamar + skor per baris)
- Create: `frames/14-network.html` (daftar koneksi + undang)
- Test: screenshot; skor contoh 87% + alasan tertera sumbernya

**Interfaces:**
- Consumes: field profil Task 3; `.job-card` Task 2.
- Produces: — (ujung alur talent).

- [ ] **Step 1: Tulis 11-matcher.html** — ring skor SVG, list "Cocok karena: jahit 2thn → butuh 1thn" + "Gap: Excel dasar (kursus 4 jam)" + tombol.
- [ ] **Step 2: Tulis 12-apply.html** — ringkasan lamaran, checkbox "sertakan video perkenalan", tombol "Kirim lamaran", state sukses.
- [ ] **Step 3: Tulis 13-my-jobs.html + 14-network.html** — tab 3 kolom status; kartu koneksi + tombol Terhubung.
- [ ] **Step 4: Render + screenshot**

- [ ] **Step 5: Commit**

```bash
git add frames/11-matcher.html frames/12-apply.html frames/13-my-jobs.html frames/14-network.html
git commit -m "feat: matcher lamar loker koneksi"
```

### Task 5: Sisi Perusahaan (3 frame)

**Files:**
- Create: `frames/15-post-job.html` (form + checklist inklusif wajib)
- Create: `frames/16-applicants.html` (tabel pelamar + filter akomodasi + aksi)
- Create: `frames/17-dashboard.html` (skor inklusivitas, breakdown, rekomendasi)
- Test: screenshot; checklist 6 item tampil, skor contoh 78/100

**Interfaces:**
- Consumes: `_tokens.css`, `.job-card`.
- Produces: — (ujung alur perusahaan).

- [ ] **Step 1: Tulis 15-post-job.html** — judul, kategori, lokasi, jenis disabilitas terbuka, checklist: deskripsi jelas, akomodasi tercantum, kontak aksesibel, tes adaptif, jam fleksibel, jalur evakuasi.
- [ ] **Step 2: Tulis 16-applicants.html** — 5 pelamar dummy + badge kecocokan + filter + tombol Lihat/Terima/Tolak.
- [ ] **Step 3: Tulis 17-dashboard.html** — skor besar, bar 4 dimensi (Akses Fisik, Proses Rekrutmen, Budaya, Retensi), 3 rekomendasi aksi.
- [ ] **Step 4: Render + screenshot**

- [ ] **Step 5: Commit**

```bash
git add frames/15-post-job.html frames/16-applicants.html frames/17-dashboard.html
git commit -m "feat: sisi perusahaan"
```

### Task 6: Info pages + prompts gambar

**Files:**
- Create: `frames/18-info.html` (Tips Karier 4 kartu + Tentang/Mitra/FAQ/Kontak ringkas)
- Create: `prompts-gambar.txt` (8 prompt AI image: hero inklusif, 5 representasi disabilitas, 2 kantor)
- Test: screenshot info page; txt berisi 8 prompt bernomor

**Interfaces:**
- Consumes: —
- Produces: `prompts-gambar.txt` untuk user generate (di luar plan).

- [ ] **Step 1: Tulis 18-info.html + prompts-gambar.txt**
- [ ] **Step 2: Render + screenshot, commit**

```bash
git add frames/18-info.html prompts-gambar.txt
git commit -m "feat: info pages dan prompt gambar"
```

### Task 7: Wiring prototype + final check

**Files:**
- Modify: (Figma only, tanpa file) — hotspot: nav antar 18 frame, tab login, tab Loker Saya, toggle Access Mode (5 variant overlay), flow Lamar → sukses.
- Test: klik jalan juri 3 rute tanpa buntu + screenshot tiap rute

- [ ] **Step 1: Wire Guest (Cover→Home→Search→Detail→Register→Login)**
- [ ] **Step 2: Wire Talent (Wizard1→Wizard2→Resume→Matcher→Apply→Sukses→MyJobs→Network)**
- [ ] **Step 3: Wire Company (Register→Post→Applicants→Dashboard) + Access Mode overlay di Home & Detail**
- [ ] **Step 4: Final check: 18 frame ada, kontras lolos, tiap form ada error+sukses state, presentasi 5-menit kering**

## Self-Review

- Spec §2 semua IN ter-cover: Task 2 (home/search/detail), 3 (auth/wizard/resume), 4 (matcher/lamar/saya/koneksi), 5 (perusahaan), 6 (tips/tentang/FAQ), Access Mode di Task 2+7.
- No placeholder: semua step ada file, kode, command, expected.
- Konsistensi: `_tokens.css` → semua task; field profil Task 3 → Task 4; `.job-card` Task 2 → Task 4/5.
