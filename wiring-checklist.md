# Wiring Checklist — KerjaSetara (plugin autowire, ±5 menit)

Import 20 file dari `figma-import-20-frame.zip` berurutan via plugin Design to HTML
(width 1440). Nama frame otomatis `01-02-home … 20-21-pricing` — plugin autowire
mendukung format ini (kunci `02-home … 21-pricing`).

Klik kanan frame `01-02-home` → Add starting point. Lalu Plugins > Development >
KerjaSetara Autowire > Scan > Wire.

## Rute Juri (terverifikasi dari href tiap HTML)
- Guest: 02-home [Cari] → 03-search [Selengkapnya] → 04-detail [Lamar] → 12-apply [Kirim] → 13-my-jobs
- Guest alt: 02-home [Buat profil] → 06-register-talent [Lanjutkan] → 08-wizard-1 [Lanjut] → 09-wizard-2 [Selesai] → 10-resume [Lihat Skor AI] → 11-matcher
- Talent: 05-login [Masuk sebagai Talent] → 13-my-jobs [Kenapa 87%] → 11-matcher [Lamar] → 12-apply [Lihat status] → 13-my-jobs
- Company: 05-login [Masuk sebagai Perusahaan] → 16-applicants [+ Pasang loker baru] → 15-post-job [Tayangkan] → 16-applicants [dashboard] → 17-dashboard [Perbaiki] → 15-post-job
- Company alt: 20-employer [Pasang iklan GRATIS] → 07-register-company [Daftar & pasang] → 15-post-job ; 21-pricing [Pilih *] → 07-register-company

## Hotspot detail (semua CTA ter-cover plugin)
- 02-home: nav Cari→03, Daftar Perusahaan→19, Tips→18, Penyedia→20, Masuk→05, Daftar→06; Cari→03; Lihat semua→03; Selengkapnya→04 (sekartu); Buat profil→06; Baca→18.
- 03-search: Selengkapnya→04 (sekartu); Daftar & auto-match→06; Cari (#) = statis.
- 04-detail: Lamar→12; Cek Skor AI→11; Simpan→13; Lihat profil perusahaan→19; Contoh dashboard→17; Lihat (lowongan lain)→04; Bagikan (#) = statis.
- 05-login: demo talent→13, demo perusahaan→16; Daftar talent→06; Daftar perusahaan→07; Lupa password (#) = statis.
- 06-register-talent: Lanjutkan→08; Masuk→05; syarat/privasi→18.
- 07-register-company: Daftar & pasang→15; Lihat paket→21.
- 08-wizard-1: Lanjut→09.
- 09-wizard-2: Selesai→10; Kembali→08.
- 10-resume: Lihat Skor AI / Kenapa cocok→11; Unduh PDF (#) = statis.
- 11-matcher: Lamar→12; Simpan→13; Buka wizard→08; Tutup Gap (#) = statis.
- 12-apply: Kirim→13; Lihat status→13; AI Matcher (nav)→11.
- 13-my-jobs: Kenapa 87%/81%→11; Lamar→12; Lihat/Riwayat→04.
- 14-network: Cari/Undang/Terhubung (#) = statis; nav Profil→10, Loker Saya→13.
- 15-post-job: Tayangkan→16; Kelola Pelamar (nav)→16.
- 16-applicants: Pasang loker baru→15; dashboard→17; Lihat/Terima/Tolak (#) = statis.
- 17-dashboard: Lihat pelamar→16; Perbaiki→15.
- 18-info: wizard→09; form lamar→12; Baca/Kirim (#) = statis.
- 19-companies: Selengkapnya→04 (sekartu); Cari/Berikutnya (#) = statis.
- 20-employer: Pasang iklan GRATIS→07; Mendaftar→07; Lihat paket→21; Contoh dashboard→17; Coba pasang loker→15.
- 21-pricing: Pilih Free/Standar/Populer/Premium→07; Minta penawaran→07; dashboard→17; Coba form→15.

## Catatan deteksi (kenapa versi lama "gak bisa")
- Logo "KerjaSetara" kini di-wire → 02-home (dulu tak ada rule, logo mati).
- "Daftar Perusahaan" (nav, P besar) vs "Daftar perusahaan" (tombol form, p kecil) dipisah via case-sensitive — dulu lowercase bikin semua → 19, tombol form salah arah.
- Teks Figma hasil render mengandung "→ ? ?? ✓" + `?` sisa cp1252 — norm() kini buang semua itu sebelum match (dulu `?` ikut dibersihkan tapi `→` tidak, jadi "Selengkapnya →" tak match "selengkapnya").
- Frame zip `01-02-home` (prefix ganda) dinormalisasi ke `02-home` — dulu regex `^\d\d-` + slice(0,2) baca `01` sehingga CTA home tak pernah kepakai.
- Scan kini tampilkan "Kunci:" di log — kalau ada kunci asing, berarti ada frame nyasar di page.

## Presentasi 5 menit
- 0:00–0:30 masalah + solusi 2 fitur (hero home). 0:30–1:30 Guest (home→search→detail). 1:30–2:30 Talent (wizard→matcher 87%→lamar). 2:30–4:00 Company (pasang checklist→dashboard). 4:00–5:00 parity + privasi granular.

## Final check
- [x] 20 frame ada (02-home … 21-pricing) — file HTML di frames/ + zip urut
- [x] Tiap form ada error state (05 login) + sukses state (12 apply)
- [x] Kontras teks ≥4.5:1 (tokens), target sentuh ≥48px
- [x] Bahasa person-first, tanpa jalan buntu (tiap frame ada nav next/back)
- [x] Tanpa fake stats (skor fitur 87%/78 + harga paket = data desain)
