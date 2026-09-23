# Task 5: Sisi Perusahaan (3 frame)

**Files:**
- Create: `frames/15-post-job.html` (form + checklist inklusif wajib)
- Create: `frames/16-applicants.html` (tabel pelamar + filter akomodasi + aksi)
- Create: `frames/17-dashboard.html` (skor inklusivitas, breakdown, rekomendasi)
- Test: screenshot; checklist 6 item tampil, skor contoh 78/100

**Interfaces:**
- Consumes: `frames/_tokens.css`, pola `.job-card` (salin inline bila perlu).
- Produces: — (ujung alur perusahaan).

**Global Constraints (verbatim):**
- Frame width 1440px, font Inter/Plus Jakarta Sans, primary #1B4DD8, aksen #0E9F8A, kontras teks ≥4.5:1.
- Target sentuh min 48px (56px mode daksa), tiap gambar wajib alt text.
- Bahasa person-first, tanpa istilah merendahkan.
- Semua file di `C:\Users\s7n0c\Downloads\UNTUKLOMBA\`.
- Commit tiap task selesai.

## Steps
- [ ] Step 1: Tulis 15-post-job.html — form (judul, kategori, lokasi, jenis disabilitas terbuka chip multi, deskripsi, syarat) + checklist inklusif 6 item (1. Deskripsi jelas & baca-mudah; 2. Akomodasi tercantum; 3. Kontak aksesibel; 4. Tes adaptif; 5. Jam fleksibel; 6. Jalur evakuasi aksesibel) + tombol "Tayangkan lowongan".
- [ ] Step 2: Tulis 16-applicants.html — loker "Operator Sewing", 5 pelamar dummy (nama, skor %, akomodasi dibutuhkan, status), filter akomodasi, tombol Lihat/Terima/Tolak per baris.
- [ ] Step 3: Tulis 17-dashboard.html — skor besar 78/100, bar 4 dimensi (Akses Fisik 85, Proses Rekrutmen 70, Budaya 80, Retensi 65), 3 rekomendasi aksi ("Tambahkan transkrip video rekrutmen", dst.), tombol "Perbaiki checklist".
- [ ] Step 4: Render + screenshot (html_to_design width 1440, take_screenshot scale 0.5). Jika tool Figma tak tersedia, laporkan concern.
- [ ] Step 5: Commit: `git add frames/15-post-job.html frames/16-applicants.html frames/17-dashboard.html && git commit -m "feat: sisi perusahaan"`
