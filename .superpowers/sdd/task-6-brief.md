# Task 6: Info pages + prompts gambar

**Files:**
- Create: `frames/18-info.html` (Tips Karier 4 kartu + Tentang/Mitra/FAQ/Kontak ringkas)
- Create: `prompts-gambar.txt` (8 prompt AI image: hero inklusif, 5 representasi disabilitas, 2 kantor)
- Test: screenshot info page; txt berisi 8 prompt bernomor

**Interfaces:**
- Consumes: `frames/_tokens.css`.
- Produces: `prompts-gambar.txt` untuk user generate (di luar plan).

**Global Constraints (verbatim):**
- Frame width 1440px, font Inter/Plus Jakarta Sans, primary #1B4DD8, aksen #0E9F8A, kontras teks ≥4.5:1.
- Target sentuh min 48px (56px mode daksa), tiap gambar wajib alt text.
- Bahasa person-first, tanpa istilah merendahkan.
- Semua file di `C:\Users\s7n0c\Downloads\UNTUKLOMBA\`.
- Commit tiap task selesai.

## Steps
- [ ] Step 1: Tulis 18-info.html — 4 kartu tips karir (judul + 2 kalimat + "Baca"), section Tentang (2 paragraf), Mitra (6 logo placeholder kotak), FAQ (5 Q/A), Kontak (form nama/email/pesan + tombol Kirim), footer.
- [ ] Step 2: Tulis prompts-gambar.txt — 8 prompt Bahasa Inggris detail, gaya fotografi cerah profesional, inklusif Indonesia: 1. hero tim kantor inklusif; 2. profesional netra + screen reader; 3. profesional rungu + bahasa isyarat; 4. profesional daksa pengguna kursi roda di kantor; 5. pekerja grahita + mentor; 6. ruang tenang untuk kesehatan mental; 7. interview inklusif; 8. tim beragam tersenyum. Tiap prompt 2-3 kalimat + "--ar 16:9".
- [ ] Step 3: Render + screenshot info page (html_to_design width 1440, take_screenshot scale 0.5). Jika tool Figma tak tersedia, laporkan concern.
- [ ] Step 4: Commit: `git add frames/18-info.html prompts-gambar.txt && git commit -m "feat: info pages dan prompt gambar"`
