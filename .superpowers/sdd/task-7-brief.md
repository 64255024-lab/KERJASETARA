# Task 7: Wiring prototype + final check

**Jenis:** Figma-only (tanpa file baru). Jika tool Figma (html_to_design/take_screenshot/selection dsb.) tidak tersedia di environment-mu, JANGAN mengarang — laporkan NEEDS_CONTEXT/BLOCKED dengan jelas, dan sebagai gantinya hasilkan `wiring-checklist.md` berisi daftar hotspot lengkap per frame (frame asal → elemen → frame tujuan) untuk 3 rute juri + Access Mode overlay, sehingga wiring bisa dilakukan manual 15 menit.

**Rute yang harus ter-wire (atau terdaftar di checklist):**
- Guest: Cover → Home → Search → Detail → Register Talent → Login
- Talent: Wizard1 → Wizard2 → Resume → Matcher → Apply → Sukses → MyJobs → Network
- Company: Register Company → Post Job → Applicants → Dashboard
- Access Mode overlay di Home & Detail (5 variant)
- Tab Login (2 peran), tab MyJobs (3 tab)

**Final check:** 18 frame ada, kontras lolos, tiap form ada error+sukses state, alur presentasi 5-menit tertulis di `wiring-checklist.md` (Guest 1 mnt, Talent 2.5 mnt, Company 1.5 mnt).

**Files:**
- Create (fallback bila Figma tool tak ada): `wiring-checklist.md`
- Test: 3 rute tanpa buntu (klik atau checklist lengkap)

**Global Constraints (verbatim):** Bahasa person-first; semua file di `C:\Users\s7n0c\Downloads\UNTUKLOMBA\`; commit tiap task selesai.

## Steps
- [ ] Step 1: Wire Guest + Talent + Company (atau tulis checklist lengkap).
- [ ] Step 2: Access Mode overlay / catatan variant.
- [ ] Step 3: Final check + commit: `git add -A && git commit -m "feat: wiring prototype dan final check"`.
