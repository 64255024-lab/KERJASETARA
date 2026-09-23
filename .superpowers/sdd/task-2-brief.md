# Task 2: Home + Cari + Detail

**Files:**
- Create: `frames/02-home.html` (hero, Access Mode bar, 8 kartu loker dummy, keunggulan, tips, footer)
- Create: `frames/03-search.html` (filter: jenis disabilitas, lokasi, kategori; grid hasil)
- Create: `frames/04-detail.html` (badge ramah, akomodasi, deadline, CTA lamar/simpan, info perusahaan)
- Test: screenshot 3 frame, semua kartu tampil 8 loker

**Interfaces:**
- Consumes: `frames/_tokens.css` classes dari Task 1 (`.btn`, `.btn-ghost`, `.card`, `.chip`, `.badge`).
- Produces: pola `.job-card` (logo, judul, perusahaan, chip disabilitas, lokasi, deadline) dipakai ulang Task 4/5. Definisikan `.job-card` inline via `<style>` di 02-home.html DAN salin definisi yang sama ke file lain yang butuh (03, 04) — duplikasi kecil disengaja agar tiap file render mandiri di Figma.

**Global Constraints (verbatim):**
- Frame width 1440px, font Inter/Plus Jakarta Sans, primary #1B4DD8, aksen #0E9F8A, kontras teks ≥4.5:1.
- Target sentuh min 48px (56px mode daksa), tiap gambar wajib alt text.
- Bahasa person-first, tanpa istilah merendahkan.
- Semua file di `C:\Users\s7n0c\Downloads\UNTUKLOMBA\`.
- Commit tiap task selesai.

## Data loker dummy (8, pakai persis):
1. Operator Sewing — PT Apparel Satu — Produksi — Tuna Rungu Wicara — Semarang — Tutup 3 minggu lagi
2. Admin Officer Internship — PT Mahayasa Teknologi — Administrasi — Beberapa Jenis Disabilitas — Denpasar — Tutup hari ini
3. Desainer Grafis Junior — Studio Karsa — Kreatif — Daksa — Jakarta — Tutup 2 minggu lagi
4. Customer Support Chat — PT Layanan Prima — Layanan — Netra — Remote — Tutup 1 minggu lagi
5. Asisten Administrasi — Yayasan Tumbuh — Administrasi — Grahita — Bandung — Tutup 4 minggu lagi
6. Content Writer — Media Cerah — Kreatif — Kondisi Mental — Yogyakarta — Tutup 5 hari lagi
7. Teknisi Komputer — PT Solusi Digital — Teknologi — Daksa — Surabaya — Tutup 2 minggu lagi
8. Barista — Kopi Ruang — Kuliner — Rungu Wicara — Jakarta — Tutup 1 bulan lagi

## Steps
- [ ] Step 1: Tulis 02-home.html — top nav (logo KerjaSetara, Cari Loker, AI Matcher, Perusahaan, Masuk/Daftar), hero ("Cari lowongan sesuai keunikanmu"), Access Mode bar (5 tombol: Default, Netra, Rungu, Daksa, Grahita), grid 8 `.job-card`, 3 keunggulan (Selalu di depan, Melamar cepat, Mudah dihubungi), tips karir 4 kartu, footer (Tentang, Mitra, FAQ, Kontak).
- [ ] Step 2: Tulis 03-search.html — sidebar filter checkbox (5 disabilitas: Daksa, Rungu Wicara, Netra, Grahita, Mental; 4 kota: Jakarta, Semarang, Bandung, Denpasar; 4 kategori), grid hasil 8 kartu, empty-state "Tidak ada hasil — longgarkan filter".
- [ ] Step 3: Tulis 04-detail.html — header perusahaan, judul + badge "Ramah Kursi Roda" + badge "Transkrip Tersedia", list akomodasi (ram jalan, toilet aksesibel, jam fleksibel), deadline jelas, `.btn` "Lamar posisi ini" + `.btn-ghost` "Simpan", deskripsi + syarat, kartu perusahaan.
- [ ] Step 4: Render 3 file via html_to_design (width 1440), screenshot tiap frame scale 0.5. Expected: lolos baca, kartu konsisten. Jika tool Figma tak tersedia, laporkan concern.
- [ ] Step 5: Commit: `git add frames/02-home.html frames/03-search.html frames/04-detail.html && git commit -m "feat: home search detail loker"`
