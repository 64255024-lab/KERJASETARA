# Seed mirror note

`data/seed.json` adalah cermin 1:1 dari skema `supabase/schema.sql`:

- `companies[]` → tabel `companies`
- `jobs[]` → tabel `jobs` (`companyId` → `company_id`, `experienceMin` → `experience_min`)
- `demoTalent` / `demoCompany` → baris contoh tabel `profiles`

Langkah migrasi:

1. `supabase db push` dengan `schema.sql`.
2. Impor `seed.json` ke tabel yang sesuai (konversi camelCase → snake_case di atas).
3. Ganti isi `lib/data.ts:getSeed()` dengan query Supabase (`jobs` + `companies` join); tipe `SeedJob/SeedCompany/SeedProfile` tidak berubah.
4. Cookie demo (`ks_session`, `ks_draft`, `ks_apps`, `ks_saved`, `ks_posted`) diganti auth Supabase + tabel `applications`.
5. Kolom `profiles.disabilities` tetap owner-only via policy `owner_read`.
