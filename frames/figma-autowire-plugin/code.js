// KerjaSetara Autowire — wire prototype otomatis sesuai href asli tiap HTML.
// Cara pakai: Plugins > Development > Import plugin from manifest > pilih folder ini > Run > Scan > Wire.
// Mendukung 2 format nama frame: "02-home" (lama) dan "01-02-home" (dari zip urut).

// ── PETA LOGIKA (sumber: href asli tiap HTML) ──
// Tiap rule: teks layer TEXT -> frame tujuan (prefix nama frame).
// Urutan PENTING: spesifik dulu, generik belakangan.
const CTA = {
  "02-home": [
    { m: ["pencarian lanjutan"], d: "03-search" },
    { m: ["lihat semua"], d: "03-search" },
    { m: ["selengkapnya"], d: "04-detail" },
    { m: ["buat profil"], d: "06-register-talent" },
    { m: ["baca"], d: "18-info" },
    { m: ["cari"], d: "03-search" }, // scoped home saja (tombol "Cari"); generik, paling belakang
  ],
  "03-search": [
    { m: ["selengkapnya"], d: "04-detail" },
    { m: ["daftar & auto-match", "daftar gratis"], d: "06-register-talent" },
  ],
  "04-detail": [
    { m: ["lamar posisi ini"], d: "12-apply" },
    { m: ["cek skor ai", "87%"], d: "11-matcher" },
    { m: ["lihat profil perusahaan"], d: "19-companies" },
    { m: ["contoh dashboard"], d: "17-dashboard" },
    { m: ["lihat"], d: "04-detail" }, // "Lihat" lowongan lain = self, di-skip
    { m: ["simpan"], d: "13-my-jobs" },
  ],
  "05-login": [
    { m: ["masuk sebagai talent"], d: "13-my-jobs" },
    { m: ["masuk sebagai perusahaan"], d: "16-applicants" },
    { m: ["daftar talent"], d: "06-register-talent" },
    { m: ["daftar perusahaan"], d: "07-register-company" },
  ],
  "06-register-talent": [
    { m: ["lanjutkan ke profil"], d: "08-wizard-1" },
    { m: ["sudah punya akun", "masuk"], d: "05-login" },
    { m: ["syarat & ketentuan", "kebijakan privasi"], d: "18-info" },
  ],
  "07-register-company": [
    { m: ["daftar & pasang lowongan", "pasang lowongan"], d: "15-post-job" },
    { m: ["lihat paket"], d: "21-pricing" },
  ],
  "08-wizard-1": [{ m: ["lanjut ke kebutuhan", "lanjut"], d: "09-wizard-2" }],
  "09-wizard-2": [
    { m: ["selesai", "lihat resume"], d: "10-resume" },
    { m: ["kembali", "1 data diri"], d: "08-wizard-1" },
  ],
  "10-resume": [
    { m: ["lihat skor ai", "kenapa cocok"], d: "11-matcher" },
    { m: ["resume"], d: "10-resume" }, // tab "Resume" = self, di-skip
  ],
  "11-matcher": [
    { m: ["lowongan disimpan", "lamaran dikirim"], d: "13-my-jobs" }, // tab footer — SEBELUM "lamar" agar tak salah wire
    { m: ["lamar posisi ini", "lamar"], d: "12-apply" },
    { m: ["buka wizard"], d: "08-wizard-1" },
    { m: ["simpan"], d: "13-my-jobs" },
    { m: ["resume"], d: "10-resume" }, // tab nav "Resume" -> kembali ke resume
  ],
  "12-apply": [
    { m: ["kirim lamaran", "kirim"], d: "13-my-jobs" },
    { m: ["lihat status"], d: "13-my-jobs" },
    { m: ["ai matcher"], d: "11-matcher" },
    { m: ["resume"], d: "10-resume" }, // tab nav "Resume" -> kembali ke resume
  ],
  "13-my-jobs": [
    { m: ["lamaran dikirim", "lowongan disimpan"], d: "13-my-jobs" }, // tab = self, di-skip (anti salah wire ke "lamar")
    { m: ["kenapa 87", "kenapa 81"], d: "11-matcher" },
    { m: ["lamar"], d: "12-apply" },
    { m: ["riwayat status", "lihat"], d: "04-detail" },
  ],
  "15-post-job": [
    { m: ["tayangkan lowongan", "tayangkan"], d: "16-applicants" },
    { m: ["kelola pelamar"], d: "16-applicants" },
  ],
  "16-applicants": [
    { m: ["pasang loker baru", "pasang loker"], d: "15-post-job" },
    { m: ["dashboard inklusivitas"], d: "17-dashboard" },
  ],
  "17-dashboard": [
    { m: ["lihat pelamar"], d: "16-applicants" },
    { m: ["perbaiki checklist", "perbaiki"], d: "15-post-job" },
  ],
  "18-info": [
    { m: ["wizard"], d: "09-wizard-2" },
    { m: ["form lamar"], d: "12-apply" },
  ],
  "19-companies": [
    { m: ["selengkapnya"], d: "04-detail" },
  ],
  "20-employer": [
    { m: ["mendaftar sebagai penyedia", "pasang iklan"], d: "07-register-company" },
    { m: ["contoh dashboard"], d: "17-dashboard" },
    { m: ["coba pasang loker"], d: "15-post-job" },
    { m: ["lihat paket"], d: "21-pricing" },
  ],
  "21-pricing": [
    { m: ["pilih free", "pilih standar", "pilih populer", "pilih premium", "pilih"], d: "07-register-company" },
    { m: ["minta penawaran"], d: "07-register-company" },
    { m: ["dashboard inklusivitas"], d: "17-dashboard" },
    { m: ["coba form pasang loker"], d: "15-post-job" },
  ],
};

// Nav global (berlaku di semua frame, prioritas di bawah CTA spesifik)
const NAV = [
  { m: ["cari lowongan"], d: "03-search" },
  { m: ["tips karir", "tips karier"], d: "18-info" },
  { m: ["penyedia kerja"], d: "20-employer" },
  { m: ["layanan & biaya", "layanan dan biaya"], d: "21-pricing" },
  { m: ["lowongan cocok"], d: "11-matcher" },
  { m: ["lowongan disimpan", "lamaran dikirim", "loker saya"], d: "13-my-jobs" },
  { m: ["kelola pelamar"], d: "16-applicants" },
  { m: ["pasang loker", "pasang lowongan"], d: "15-post-job" },
  { m: ["koneksi"], d: "14-network" },
  { m: ["tentang", "tentang kami", "mitra", "hubungi kami", "faq"], d: "18-info" },
  { m: ["mendaftar"], d: "07-register-company" },
  { m: ["masuk"], d: "05-login" }, // generik, paling belakang
  { m: ["daftar"], d: "06-register-talent" }, // generik, paling belakang
  { m: ["profil"], d: "10-resume" },
];

// Aturan case-sensitive (dicek PALING dulu, sebelum normalisasi).
// "Daftar Perusahaan" (P besar) -> daftar perusahaan; "Daftar perusahaan" (p kecil) -> form daftar.
// norm() yang lowercase bikin keduanya sama, jadi harus dipisah di sini.
const CASE_RULES = [
  { m: ["Daftar Perusahaan"], d: "19-companies" },
  { m: ["Daftar perusahaan"], d: "07-register-company" },
  { m: ["Daftar talent"], d: "06-register-talent" },
  { m: ["Masuk sebagai Talent"], d: "13-my-jobs" },
  { m: ["Masuk sebagai Perusahaan"], d: "16-applicants" },
  { m: ["Pasang iklan GRATIS"], d: "07-register-company" },
  { m: ["Pasang iklan gratis"], d: "20-employer" }, // footer self-link, di-skip
];

// Teks persis (setelah dibersihkan) -> tujuan. Logo/brand "KerjaSetara" -> home.
const WHOLE = { "kerjasetara": "02-home" };

// teks kartu loker -> detail (untuk wire sekartu penuh)
const CARD_LINK = ["selengkapnya", "lihat"];

// Bersihkan teks render Figma: lowercase, buang panah/bullet/ikon/?/tanda baca.
const norm = (s) =>
  (s || "")
    .toLowerCase()
    .replace(/[→←•○●✓▾📎�\u0095\u0097?!\"'“”‘’.,:;()\[\]—–\-_*+#%@]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// Normalisasi nama frame -> kunci "NN-slug":
// "01-02-home" -> "02-home" (buang prefix urut zip), "02-home" tetap "02-home".
// findFrame cocokkan by startsWith(kunci) sehingga "01-02-home" ketemu via "02-home".
function frameKey(name) {
  const n = (name || "").toLowerCase();
  const m = n.match(/^(\d+)-(\d+)-(.+)$/);
  if (m) return `${m[2]}-${m[3]}`;
  return n;
}

function findFrame(frames, prefix) {
  const p = prefix.toLowerCase();
  return frames.find((f) => frameKey(f.name).startsWith(p)) || null;
}

// Naik 1 level kalau parent kelihatan seperti tombol (bungkus 1-3 anak, kecil)
function pickTarget(textNode) {
  try {
    const p = textNode.parent;
    if (!p || (p.type !== "FRAME" && p.type !== "GROUP" && p.type !== "INSTANCE" && p.type !== "COMPONENT"))
      return textNode;
    const kids = p.children ? p.children.length : 99;
    const nm = (p.name || "").toLowerCase();
    if (nm.includes("btn") || nm.includes("button") || nm.includes("chip") || nm.includes("pill")) return p;
    if (kids <= 3 && p.width < 560 && p.height < 110) return p;
  } catch (e) {}
  return textNode;
}

async function setNav(node, destId, smart) {
  await node.setReactionsAsync([
    {
      trigger: { type: "ON_CLICK" },
      actions: [
        {
          type: "NODE",
          destinationId: destId,
          navigation: "NAVIGATE",
          transition: smart
            ? { type: "SMART_ANIMATE", easing: { type: "EASE_OUT" }, duration: 0.2 }
            : { type: "DISSOLVE", easing: { type: "EASE_OUT" }, duration: 0.15 },
          preserveScrollPosition: false,
        },
      ],
    },
  ]);
}

figma.showUI(__html__, { width: 330, height: 520 });

figma.ui.onmessage = async (msg) => {
  try {
    if (msg.type === "scan") {
      try { await figma.loadAllPagesAsync(); } catch (e) {}
      const frames = figma.currentPage.children
        .filter((n) => n.type === "FRAME" && /^\d+-/.test(n.name))
        .map((f) => ({ id: f.id, name: f.name }));
      const keys = [...new Set(frames.map((f) => frameKey(f.name)))].sort();
      figma.ui.postMessage({ type: "scanned", frames });
      figma.ui.postMessage({ type: "log", text: `Ketemu ${frames.length} frame. Kunci: ${keys.join(", ") || "-"}` });
      figma.notify(`Ketemu ${frames.length} frame NN-* di halaman ini`);
      return;
    }

    if (msg.type === "wire") {
      const opt = Object.assign(
        { includeNav: true, includeCards: true, smart: true, onlyEmpty: false },
        msg.options || {}
      );
      try { await figma.loadAllPagesAsync(); } catch (e) {}
      const page = figma.currentPage;
      const frames = page.children.filter((n) => n.type === "FRAME" && /^\d+-/.test(n.name));
      if (frames.length === 0) {
        figma.ui.postMessage({ type: "log", text: "❌ Ga ada frame NN-* (01-02-home … 20-21-pricing) di page ini." });
        return;
      }
      const log = (t) => figma.ui.postMessage({ type: "log", text: t });
      let wired = 0, skipped = 0, noDest = 0;
      const wiredIds = new Set();

      for (const src of frames) {
        const fk = frameKey(src.name); // "02-home" walau nama frame "01-02-home"
        const short = fk.slice(0, 2); // "02"
        // cari rules: cocokkan key diawali digit yg sama
        const rules = [];
        for (const [k, rs] of Object.entries(CTA)) {
          if (k.slice(0, 2) === short) rules.push(...rs);
        }
        if (opt.includeNav) rules.push(...NAV);

        let texts = [];
        try {
          texts = src.findAll((n) => n.type === "TEXT");
        } catch (e) {
          log(`⚠️ ${src.name}: findAll gagal (${e.message})`);
          continue;
        }
        let srcCount = 0;
        for (const t of texts) {
          let raw = "", ch = "";
          try { raw = t.characters; ch = norm(raw); } catch (e) { continue; }
          if (!ch) continue;
          // 0) teks persis (logo -> home)
          let destKey = WHOLE[ch] || null;
          // 1) case-sensitive ("Daftar Perusahaan" vs "Daftar perusahaan")
          if (!destKey) {
            for (const r of CASE_RULES) {
              if (r.m.some((kw) => raw.includes(kw))) { destKey = r.d; break; }
            }
          }
          // 2) rule pertama yang cocok menang (teks bersih)
          let hit = null;
          if (!destKey) {
            for (const r of rules) {
              if (r.m.some((kw) => ch.includes(kw))) { hit = r; break; }
            }
            if (hit) destKey = hit.d;
          }
          if (!destKey) continue;
          const dest = findFrame(frames, destKey);
          if (!dest) { noDest++; continue; }
          if (dest.id === src.id) continue; // jangan self-link

          const target = pickTarget(t);
          if (wiredIds.has(target.id)) continue;
          try {
            if (opt.onlyEmpty && target.reactions && target.reactions.length > 0) { skipped++; continue; }
          } catch (e) {}
          try {
            await setNav(target, dest.id, opt.smart);
            wiredIds.add(target.id);
            wired++; srcCount++;
          } catch (e) {
            log(`⚠️ gagal: ${src.name} "${ch.slice(0, 30)}" → ${e.message}`);
          }

          // wire sekartu penuh (ancestor besar) untuk link kartu
          if (opt.includeCards && CARD_LINK.some((kw) => ch.includes(kw))) {
            try {
              let cur = t.parent, up = 0, card = null;
              while (cur && up < 5 && cur.type !== "PAGE") {
                if ((cur.type === "FRAME" || cur.type === "GROUP") && cur.width > 220 && cur.height > 220) { card = cur; break; }
                cur = cur.parent; up++;
              }
              if (card && !wiredIds.has(card.id)) {
                let has = false;
                try { has = card.reactions && card.reactions.length > 0; } catch (e) {}
                if (!(opt.onlyEmpty && has)) {
                  await setNav(card, dest.id, opt.smart);
                  wiredIds.add(card.id);
                  wired++; srcCount++;
                }
              }
            } catch (e) {}
          }
        }
        log(`• ${src.name}: ${srcCount} koneksi`);
      }
      log(`——\n✅ Selesai: ${wired} koneksi. Skip: ${skipped}. Tujuan tak ketemu: ${noDest}.`);
      log(`▶️ Klik Play (Present) — kalau flow belum mulai di home: klik kanan frame 01-02-home > Add starting point.`);
      figma.notify(`Autowire selesai: ${wired} koneksi`);
    }
  } catch (err) {
    figma.ui.postMessage({ type: "log", text: "❌ Error: " + (err && err.message) });
  }
};
