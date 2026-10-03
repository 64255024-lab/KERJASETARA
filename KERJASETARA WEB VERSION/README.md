# KerjaSetara Web Version

Jaringan karir inklusif untuk pekerja dengan disabilitas — Next.js App Router, localhost-first, siap migrasi ke Supabase + Vercel.

## Jalankan lokal

```bash
cd "KERJASETARA WEB VERSION"
npm install
npm run dev
# buka http://localhost:3000
```

Node floor v24, npm 11, Next.js 16.3.8.

## Akun demo

- Talent: halaman `/login` → "Masuk sebagai Talent" (Sinta, Semarang, kebutuhan: tertulis + tenang)
- Perusahaan: `/login` → "Masuk sebagai Perusahaan" (Gunawan)

Tanpa kata sandi — sesi demo via cookie httpOnly `ks_session` bertanda tangan.

## Peta rute

- `/` home — hero + 8 loker unggulan + CTA profil
- `/jobs` cari + filter akomodasi/kota/kategori
- `/jobs/[id]` detail + badge akomodasi + CTA Lamar / Cek Skor AI
- `/matcher/[id]` skor transparan (alasan + sumber profil|loker + gap + Tutup Gap)
- `/apply/[id]` form prefill → `/my-jobs` (Dikirim / Disimpan)
- `/resume` profil privat (satu-satunya tempat label disabilitas tampil)
- `/login`, `/register`, `/wizard/step-1`, `/wizard/step-2`
- `/company/post-job` (checklist inklusif min-2) → `/company/applicants` → `/company/dashboard` (skor 0-100, 4 dimensi, 3 aksi)
- `/info`, `/companies`, `/employer`, `/pricing`, `/network`

## Aturan privasi

Kolom disabilitas hanya tampil di `/resume` (privat). Kartu, daftar, dan detail publik hanya menampilkan kategori + badge akomodasi. Perusahaan mengisi checkbox akomodasi — tidak pernah label disabilitas.

## Migrasi Supabase

`data/seed.json` mencerminkan skema `supabase/schema.sql`. Migrasi = ganti `lib/data.ts:getSeed()` dengan query Supabase; bentuk `SeedJob/SeedCompany/SeedProfile` tetap. Lihat `supabase/seed-mirror-note.md`.
