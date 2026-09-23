# Task 3: Auth + Wizard + Resume

**Files:**
- Create: `frames/05-login.html` (2 tab peran + akun demo 1-klik)
- Create: `frames/06-register-talent.html`, `frames/07-register-company.html`
- Create: `frames/08-wizard-1.html` (data diri), `frames/09-wizard-2.html` (disabilitas/hambatan/alat bantu chip + privasi granular), `frames/10-resume.html` (template auto)
- Test: screenshot; wizard s2 tampilkan 5 chip disabilitas + 3 opsi privasi

**Interfaces:**
- Consumes: `frames/_tokens.css`; link ke Task 4 (matcher).
- Produces: field names profil (`nama, skill[], lokasi, akomodasi[], privasi`) yang dibaca Task 4. Tampilkan field dengan label persis itu di wizard/resume.

**Global Constraints (verbatim):**
- Frame width 1440px, font Inter/Plus Jakarta Sans, primary #1B4DD8, aksen #0E9F8A, kontras teks ≥4.5:1.
- Target sentuh min 48px (56px mode daksa), tiap gambar wajib alt text.
- Bahasa person-first, tanpa istilah merendahkan.
- Semua file di `C:\Users\s7n0c\Downloads\UNTUKLOMBA\`.
- Commit tiap task selesai.

## Steps
- [ ] Step 1: Tulis 05-login.html (tab "Pencari Kerja" / "Penyedia Kerja", form email+password, contoh error inline "Email wajib diisi", link lupa password, tombol "Coba akun demo" untuk tiap peran), 06-register-talent.html (nama depan/belakang, email, password, jenis kelamin, tanggal lahir), 07-register-company.html (nama perusahaan, email kerja, password, bidang usaha, kota).
- [ ] Step 2: Tulis 08-wizard-1.html (nama lengkap, kontak, kota, ringkasan diri, progress "Langkah 1 dari 2") dan 09-wizard-2.html (chip pilih multi: Daksa, Rungu Wicara, Netra, Grahita, Mental; jenis hambatan; alat bantu yang dibutuhkan; radio privasi: "Penuh — bagikan ke penyedia kerja" / "Sebagian — sembunyikan detail disabilitas" / "Privat — hanya saya"; progress "Langkah 2 dari 2"; tombol Kembali/Selesai).
- [ ] Step 3: Tulis 10-resume.html — section Riwayat Pekerjaan, Pendidikan, Pelatihan, Keterampilan (terisi contoh: Menjahit 2 tahun, Excel dasar), Karier yang Diminati; tombol "Unduh" + "Lihat Skor AI".
- [ ] Step 4: Render + screenshot (html_to_design width 1440, take_screenshot scale 0.5); cek error-state tampil. Jika tool Figma tak tersedia, laporkan concern.
- [ ] Step 5: Commit: `git add frames/05-login.html frames/06-register-talent.html frames/07-register-company.html frames/08-wizard-1.html frames/09-wizard-2.html frames/10-resume.html && git commit -m "feat: auth wizard resume"`
