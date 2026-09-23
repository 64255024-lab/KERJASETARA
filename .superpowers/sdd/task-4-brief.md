# Task 4: AI Matcher + Lamar + Loker Saya + Koneksi

**Files:**
- Create: `frames/11-matcher.html` (skor ring %, 3 alasan cocok, 2 gap, CTA Tutup Gap/Lamar/Simpan; state profil-kosong)
- Create: `frames/12-apply.html` (lamar 1-klik, opsi video/isyarat, sukses check + langkah berikut)
- Create: `frames/13-my-jobs.html` (tab Cocok/Simpan/Dilamar + skor per baris)
- Create: `frames/14-network.html` (daftar koneksi + undang)
- Test: screenshot; skor contoh 87% + alasan tertera sumbernya

**Interfaces:**
- Consumes: field profil Task 3 (`nama, skill[], lokasi, akomodasi[], privasi`); pola `.job-card` Task 2 (salin definisi inline agar mandiri).
- Produces: — (ujung alur talent).

**Global Constraints (verbatim):**
- Frame width 1440px, font Inter/Plus Jakarta Sans, primary #1B4DD8, aksen #0E9F8A, kontras teks ≥4.5:1.
- Target sentuh min 48px (56px mode daksa), tiap gambar wajib alt text.
- Bahasa person-first, tanpa istilah merendahkan.
- Semua file di `C:\Users\s7n0c\Downloads\UNTUKLOMBA\`.
- Commit tiap task selesai.

## Steps
- [ ] Step 1: Tulis 11-matcher.html — contoh kandidat "Sinta" vs loker "Operator Sewing": ring skor SVG 87%, "Cocok karena" (1. Menjahit 2 thn → butuh 1 thn; 2. Lokasi Semarang sesuai; 3. Akomodasi komunikasi tertulis tersedia), "Gap" (1. Excel dasar — kursus 4 jam; 2. Sertifikat K3 — kursus 2 hari), tombol "Lamar posisi ini" + "Tutup Gap" + "Simpan". State kedua di bawah: profil kosong → "Lengkapi profil dulu untuk melihat skor" + CTA wizard.
- [ ] Step 2: Tulis 12-apply.html — ringkasan lamaran (posisi, perusahaan, profil ringkas), checkbox "Sertakan video perkenalan (opsional)" + "Butuh juru isyarat saat interview", tombol "Kirim lamaran", state sukses (check besar, "Lamaran terkirim", langkah berikut, tombol "Lihat status").
- [ ] Step 3: Tulis 13-my-jobs.html (tab Cocok/Simpan/Dilamar, tiap baris ada skor %, contoh tab Dilamar: status "Dilihat perusahaan") + 14-network.html (6 koneksi dummy + tombol "Terhubung"/"Undang" + search).
- [ ] Step 4: Render + screenshot (html_to_design width 1440, take_screenshot scale 0.5). Jika tool Figma tak tersedia, laporkan concern.
- [ ] Step 5: Commit: `git add frames/11-matcher.html frames/12-apply.html frames/13-my-jobs.html frames/14-network.html && git commit -m "feat: matcher lamar loker koneksi"`
