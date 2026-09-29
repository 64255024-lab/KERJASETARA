// KerjaSetara Autowire — wire prototype otomatis sesuai HTML href + wiring-checklist.
// Cara pakai: Plugins > Development > Import plugin from manifest > pilih folder ini > Run > klik "Wire Prototype".

// ── PETA LOGIKA (sumber: href asli tiap HTML, persis plan) ──
// Tiap rule: teks yang muncul di layer TEXT -> frame tujuan (prefix nama frame).
// Urutan PENTING: spesifik dulu, generik belakangan ("masuk sebagai talent" sebelum "masuk").
const CTA = {
  "02-home": [
    { m: ["pencarian lanjutan"], d: "03-search" },
    { m: ["lihat semua"], d: "03-search" },
    { m: ["selengkapnya"], d: "04-detail" },
    { m: ["buat profil"], d: "06-register-talent" },
    { m: ["cari lowongan", "cari loker"], d: "03-search" },
    { m: ["baca →", "baca"], d: "18-info" },
  ],
  "03-search": [
    { m: ["selengkapnya"], d: "04-detail" },
    { m: ["daftar gratis", "daftar & auto-match", "daftar"], d: "06-register-talent" },
  ],
  "04-detail": [
    { m: ["lamar posisi ini"], d: "12-apply" },
    { m: ["cek skor ai", "87%"], d: "11-matcher" },
    { m: ["lihat profil perusahaan"], d: "19-companies" },
    { m: ["contoh dashboard"], d: "17-dashboard" },
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
  "10-resume": [{ m: ["lihat skor ai", "kenapa cocok"], d: "11-matcher" }],
  "11-matcher": [
    { m: ["lamar posisi ini", "lamar"], d: "12-apply" },
    { m: ["buka wizard"], d: "08-wizard-1" },
    { m: ["simpan"], d: "13-my-jobs" },
  ],
  "12-apply": [
    { m: ["kirim lamaran", "kirim"], d: "13-my-jobs" },
    { m: ["lihat status"], d: "13-my-jobs" },
    { m: ["ai matcher"], d: "11-matcher" },
  ],
  "13-my-jobs": [
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
  "19-companies": [{ m: ["selengkapnya"], d: "04-detail" }],
  "20-employer": [
    { m: ["mendaftar sebagai penyedia", "pasang iklan gratis", "daftar perusahaan"], d: "07-register-company" },
    { m: ["contoh dashboard"], d: "17-dashboard" },
    { m: ["coba pasang loker"], d: "15-post-job" },
    { m: ["lihat paket"], d: "21-pricing" },
  ],
  "21-pricing": [
    { m: ["pilih free", "pilih standar", "pilih populer", "pilih"], d: "07-register-company" },
    { m: ["dashboard inklusivitas"], d: "17-dashboard" },
    { m: ["coba form pasang loker"], d: "15-post-job" },
  ],
};

// Nav global (berlaku di semua frame, prioritas di bawah CTA spesifik)
const NAV = [
  { m: ["cari lowongan"], d: "03-search" },
  { m: ["daftar perusahaan"], d: "19-companies" },
  { m: ["tips karir", "tips karier"], d: "18-info" },
  { m: ["penyedia kerja"], d: "20-employer" },
  { m: ["layanan & biaya", "layanan dan biaya"], d: "21-pricing" },
  { m: ["lowongan cocok"], d: "11-matcher" },
  { m: ["lowongan disimpan", "lamaran dikirim", "loker saya"], d: "13-my-jobs" },
  { m: ["kelola pelamar"], d: "16-applicants" },
  { m: ["koneksi"], d: "14-network" },
  { m: ["tentang", "mitra", "hubungi kami", "faq", "baca selengkapnya"], d: "18-info" },
  { m: ["mendaftar"], d: "07-register-company" },
  { m: ["masuk"], d: "05-login" }, // generik, paling belakang
  { m: ["daftar"], d: "06-register-talent" }, // generik, paling belakang
  { m: ["profil"], d: "10-resume" },
];

// teks kartu loker -> detail (untuk wire sekartu penuh)
const CARD_LINK = ["selengkapnya"];

const norm = (s) =>
  (s || "").toLowerCase().replace(/[�\u0095\u0097?]/g, "").replace(/\s+/g, " ").trim();

function findFrame(frames, prefix) {
  const p = prefix.toLowerCase();
  return frames.find((f) => f.name.toLowerCase().startsWith(p)) || null;
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
        .filter((n) => n.type === "FRAME" && /^\d\d-/.test(n.name))
        .map((f) => ({ id: f.id, name: f.name }));
      figma.ui.postMessage({ type: "scanned", frames });
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
      const frames = page.children.filter((n) => n.type === "FRAME" && /^\d\d-/.test(n.name));
      if (frames.length === 0) {
        figma.ui.postMessage({ type: "log", text: "❌ Ga ada frame NN-* (02-home … 21-pricing) di page ini." });
        return;
      }
      const log = (t) => figma.ui.postMessage({ type: "log", text: t });
      let wired = 0, skipped = 0, noDest = 0;
      const wiredIds = new Set();

      for (const src of frames) {
        const key = src.name.slice(0, 10).toLowerCase(); // "06-registe…"
        const prefix = src.name.slice(0, 8).toLowerCase(); // "06-regis"
        const short = src.name.slice(0, 2); // "06"
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
          let ch = "";
          try { ch = norm(t.characters); } catch (e) { continue; }
          if (!ch) continue;
          // rule pertama yang cocok menang
          let hit = null;
          for (const r of rules) {
            if (r.m.some((kw) => ch.includes(kw))) { hit = r; break; }
          }
          if (!hit) continue;
          const dest = findFrame(frames, hit.d);
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
      log(`▶️ Klik Play (Present) — kalau flow belum mulai di 02-home: klik kanan frame 02-home > Add starting point.`);
      figma.notify(`Autowire selesai: ${wired} koneksi`);
    }
  } catch (err) {
    figma.ui.postMessage({ type: "log", text: "❌ Error: " + (err && err.message) });
  }
};
