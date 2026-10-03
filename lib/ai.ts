// Status AI generatif: tampilan boleh "real", fungsi menunggu API key.
// Matcher utama tetap deterministik + transparan (lib/matcher.ts) sehingga
// halaman matcher berguna 100% tanpa key. Ketika AI_API_KEY diisi di
// .env.local / Vercel, explainMatch() bisa disambung ke LLM tanpa ubah UI.
export function aiGenerativeEnabled(): boolean {
  return Boolean(process.env.AI_API_KEY);
}

export function aiGenerativeNote(): string {
  return aiGenerativeEnabled()
    ? "AI generatif aktif."
    : "Mode AI generatif nonaktif — tambah AI_API_KEY untuk penjelasan naratif. Skor di bawah dihitung transparan dari data profil + loker.";
}
