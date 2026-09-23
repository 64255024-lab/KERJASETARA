# Design Spec — Portal Karier Disabilitas (Lomba UI/UX, Figma Prototype)

Tanggal: 2026-09-23
Referensi: https://kerjabilitas.com/index.php (konsep saja, bukan copy aset)
Deliverable: prototype Figma full-function, klik penuh, siap presentasi + demo live
Folder: Downloads/UNTUKLOMBA
Visual: profesional inklusif, skill ui-max saat build

## 1. Tujuan & Sukses Lomba
- Reimajinasi Kerjabilitas: portal loker 2 sisi untuk disabilitas.
- Target: daksa, rungu wicara, netra, grahita, mental.
- Menang lewat 2 diferensiasi demo-able: Access Mode Switch + AI Job Matcher transparan.
- Sukses: juri bisa klik alur Guest → Talent → Perusahaan tanpa jalan buntu dalam 5 menit; tiap klik tunjukkan parity kompetitor + 1 improvement.

## 2. Scope / Non-scope
- IN: Home, Cari Loker, Detail Loker, Auth (Masuk/Daftar 2 peran), Profil Wizard + Resume Builder, AI Matcher + Gap Skill, Lamar 1-klik (+video/isyarat), Loker Cocok/Simpan/Dilamar, Koneksi, Perusahaan (Pasang Loker, Kelola Pelamar, Dashboard Inklusivitas), Tips Karier, Tentang/Mitra/FAQ/Kontak, Access Mode global.
- OUT: backend nyata, data real, integrasi email/SMS, verifikasi perusahaan, mobile native. Semua data dummy di Figma (variables + conditional interactions).

## 3. Arsitektur Prototype (Figma)
- 1 file Figma, page `Prototype`: Cover (nama tim + narasi) → Design System → Frames desktop 1440px.
- Navigasi: top nav + bottom footer konsisten; interactive components untuk Access Mode bar, kartu loker, skor AI.
- Variables: `role` (guest/talent/company), `accessMode` (default/netra/rungu/daksa/grahita), `savedJobs`, `appliedJobs`, `matchScore`.
- 18 frame utama:
  1. Cover 2. Home 3. Cari Loker 4. Detail Loker 5. Masuk 6. Daftar Talent 7. Daftar Perusahaan
  8. Profil Wizard s1 (data diri) 9. s2 (disabilitas/hambatan/alat bantu + privasi) 10. Resume Builder
  11. AI Matcher (skor + alasan + gap) 12. Lamar 1-klik + sukses 13. Loker Saya (cocok/simpan/dilamar)
  14. Koneksi 15. Perusahaan: Pasang Loker 16. Kelola Pelamar 17. Dashboard Inklusivitas 18. Tips + Tentang/FAQ
- Tiap frame: header, body, footer, state kosong/error, CTA next.

## 4. Parity Kompetitor → Improve
| Kompetitor | Kita |
|---|---|
| Profil bio, foto, password, tutup akun | Wizard 2 langkah + privasi granular per bagian |
| Resume: riwayat, pendidikan, pelatihan, keterampilan, minat | Resume Builder auto dari wizard + impor + template baca mudah |
| Jenis disabilitas, hambatan, alat bantu (text) | Chip terstruktur + kebutuhan akomodasi per loker, badge loker ramah |
| Loker terbaru, search, detail, simpan (love), lamar | + filter aksesibilitas, badge, deadline jelas, lamar 1-klik + video/isyarat opsional |
| Loker cocok/simpan/sesuai minat/dilamar, koneksi | + tab AI Skor, alasan transparan, tombol Tutup Gap |
| Penyedia: pasang gratis tanpa batas, lihat pelamar, cari kandidat | + panduan loker inklusif + Dashboard Skor Inklusivitas + checklist akomodasi wajib |
| Tips karir, tentang, mitra, hubungi, FAQ, kebijakan | Sama, ditulis ulang ringkas + mode baca mudah |
| Login 2 peran, lupa password, aktivasi | Sama + tetap masuk + contoh akun demo 1-klik |

## 5. Fitur Juara (detail)
### 5.1 Access Mode Switch (global bar, selalu terlihat)
- Default, Netra (kontras max, font 120%, fokus jelas, semua info penting teks + alt, pola suara/screen-reader note), Rungu (semua audio → teks/transkrip/isyarat, indikator visual ganti bunyi), Daksa (target sentuh ≥56px, navigasi keyboard penuh, skip-link, tanpa drag), Grahita/Mental (kalimat pendek, 1 aksi per layar, ikon + teks, tanpa distraksi, langkah bernomor).
- Demo: 1 toggle ubah Home + Detail secara live.

### 5.2 AI Job Matcher + Gap Skill
- Input: profil (keterampilan, lokasi, akomodasi) + loker. Output: skor % + 3 alasan cocok + 2 gap + estimasi tutup gap (kursus singkat) + CTA Lamar / Tutup Gap / Simpan.
- Transparan: tiap alasan tunjukkan sumber (misal "jahit 2 thn → butuh 1 thn").
- Edge: profil kosong → skor "lengkapi dulu" + CTA wizard, bukan 0%.

## 6. Alur Klik (jalan juri, tanpa buntu)
- Guest: Home → Cari (filter disabilitas/lokasi) → Detail (badge + akomodasi) → Daftar → Masuk demo.
- Talent: Wizard s1 → s2 (privasi) → Resume → AI Matcher → Detail → Lamar 1-klik → Sukses → Loker Saya → Koneksi.
- Perusahaan: Daftar → Pasang Loker (checklist inklusif) → Kelola Pelamar (filter akomodasi) → Dashboard Inklusivitas.
- Tiap form: validasi inline, sukses jelas, batal kembali aman.

## 7. Design System (profesional, ui-max)
- Warna: primary deep blue #1B4DD8, aksen teal #0E9F8A, netral slate, status (sukses/warn/danger). Kontras ≥4.5:1, mode kontras tinggi lolos 7:1.
- Type: 1 family (Inter/Plus Jakarta Sans), skala 14/16/20/28/40, line-height 1.5, mode besar +2px global.
- Komponen: button (3 size, min 48px, daksa 56px), input + error, chip disabilitas, kartu loker, badge aksesibilitas, skor ring, tab, modal, toast, empty-state.
- Tone: hormat, person-first ("pekerja dengan disabilitas"), tanpa istilah merendahkan; ikon + label teks selalu.

## 8. Aksesibilitas & Konten
- Target WCAG 2.2 AA pada desain: fokus visible, urutan tab logis, alt semua gambar, tanpa info warna-saja, target sentuh, teks tombol aksi jelas ("Lamar posisi ini").
- 5 persona diuji lewat mode: contoh alur Netra pakai heading + landmark; Rungu tanpa audio-only; Daksa full keyboard; Grahita mode sederhana.

## 9. Data Dummy
- 8 loker (semua kategori + 5 jenis disabilitas + 4 kota), 3 kandidat, 2 perusahaan, 4 tips karir. Nama/logo fiktif, foto placeholder (diganti hasil generate user nanti).

## 10. Gambar (tahap berikutnya, file prompt txt)
- Butuh 8 visual: hero inklusif kantor, 5 representasi (netra + screen reader, rungu + isyarat, daksa + kursi roda kerja, grahita + mentor, mental + ruang tenang), 2 perusahaan inklusif. Prompt AI digenerate setelah spec approved.

## 11. Kriteria Presentasi
- 30 detik: masalah + solusi 2 fitur. 2 menit: live toggle Access Mode + 1 klik AI match → lamar. 1 menit: parity table + dampak inklusivitas.
