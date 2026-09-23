# Wiring Checklist — KerjaSetara (manual 15 menit di Figma)

Render tiap file frames/*.html via DesignAgent html_to_design (width 1440), lalu wire hotspot On Click → Navigate To:

## Rute Juri
- Guest: 01-cover [Mulai] → 02-home → 03-search → 04-detail → 06-register-talent → 05-login
- Talent: 08-wizard-1 [Lanjut] → 09-wizard-2 [Selesai] → 10-resume [Lihat Skor AI] → 11-matcher [Lamar] → 12-apply [Kirim] → 13-my-jobs → 14-network
- Company: 07-register-company → 15-post-job [Tayangkan] → 16-applicants → 17-dashboard [Perbaiki] → 15-post-job

## Hotspot detail
- 02-home: nav Cari→03, AI→11, Perusahaan→17, Masuk→05, Daftar→06; Access bar 5 chip (overlay variant / frame duplikat per mode); tiap kartu loker→04.
- 03-search: tiap kartu→04; empty-state statis.
- 04-detail: Lamar→12, Simpan→13, Skor AI→11, perusahaan→17.
- 05-login: demo talent→13, demo perusahaan→16; daftar links→06/07.
- 11-matcher: Lamar→12, Tutup Gap (overlay kursus), Simpan→13; profil-kosong CTA→08.
- 13-my-jobs: 3 tab (buat 3 variant / overlay); baris→04.
- 15-post-job: Tayangkan→16. 16: baris→detail pelamar (opsional). 17: Perbaiki→15.

## Access Mode (5 variant Home + Detail)
- Duplikat 02-home ×5: Default / Netra (kontras max, font 120%) / Rungu (badge transkrip menonjol) / Daksa (tombol 56px) / Grahita (hero 1 kalimat, sembunyikan tips). Chip Access Mode link antar variant. Sama untuk 04-detail.

## Presentasi 5 menit
- 0:00–0:30 masalah + solusi 2 fitur (cover). 0:30–1:30 Guest (home→search→detail). 1:30–2:30 live Access Mode toggle. 2:30–4:00 Talent (wizard→matcher 87%→lamar). 4:00–5:00 Company (pasang checklist→dashboard 78) + parity table.

## Final check
- [ ] 18 frame ada (01–18) — done, file HTML di frames/
- [ ] Tiap form ada error state (05 login) + sukses state (12 apply)
- [ ] Kontras teks ≥4.5:1 (tokens), target sentuh ≥48px, alt text saat gambar final masuk
- [ ] Bahasa person-first, tanpa jalan buntu (tiap frame ada nav next/back)
