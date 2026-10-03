"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { supabaseBrowser } from "../../lib/supabase-browser";

const CATS = ["Produksi", "Administrasi", "Kreatif", "Layanan", "Teknologi", "Kuliner"];

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"talent" | "company">("talent");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );

  async function signupGoogle() {
    setErr("");
    const supabase = supabaseBrowser();
    if (!supabase) {
      setErr("Konfigurasi daftar belum dipasang di server. Coba lagi nanti.");
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setErr(error.message);
  }

  async function signupEmail(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const supabase = supabaseBrowser();
    if (!supabase) {
      setErr("Konfigurasi daftar belum dipasang di server. Coba lagi nanti.");
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role, name } },
    });
    if (error) {
      setErr(error.message);
      return;
    }
    if (data.user) {
      // Baris profil dibuat di sini (fallback callback juga membuatnya).
      await supabase.from("profiles").upsert(
        { id: data.user.id, role, name, email },
        { onConflict: "id" }
      );
    }
    router.push("/wizard/step-1");
    router.refresh();
  }

  return (
    <>
      <Nav />
      <div className="hero" style={{ padding: "56px 64px", textAlign: "center", borderRadius: "0 0 48px 48px" }}>
        <p className="chip">Akun gratis • 2 langkah • 3 menit</p>
        <h1 style={{ fontSize: 44, margin: "16px 0 8px" }}>Daftar — Pencari Kerja</h1>
        <p className="sub">Isi sekali — lamar 1-klik. Data disabilitas privat, hanya untuk pencocokan AI.</p>
        <p style={{ marginTop: 16 }}>
          <span className="badge" style={{ background: "#fff", color: "var(--primary)" }}>● 1 Akun</span>{" "}
          <span style={{ opacity: 0.7 }}>○ 2 Profil</span>
        </p>
      </div>
      <div style={{ maxWidth: 680, padding: "0 24px", margin: "24px auto 0" }}>
        <div className="card" style={{ padding: 32 }}>
          <h2 style={{ margin: "0 0 4px" }}>Langkah 1 dari 2 — Akun</h2>
          <p style={{ color: "var(--muted)", margin: "0 0 24px", fontSize: 14 }}>
            Buat akun dulu, profil dilengkapi di langkah 2.
          </p>
          {!configured && (
            <p className="badge">Mode demo — daftar server belum dikonfigurasi</p>
          )}
          <button
            className="btn"
            type="button"
            onClick={signupGoogle}
            disabled={!configured}
            style={{ width: "100%", opacity: configured ? 1 : 0.5 }}
          >
            Daftar dengan Google
          </button>
          <p style={{ textAlign: "center", color: "var(--muted)", margin: "20px 0" }}>— atau —</p>
          <form onSubmit={signupEmail}>
            <div className="field">
              <span className="lbl">Saya mendaftar sebagai</span>
              <div style={{ display: "flex", gap: 16, fontWeight: 400 }}>
                <label>
                  <input type="radio" name="role" value="talent" checked={role === "talent"} onChange={() => setRole("talent")} /> Talent
                </label>
                <label>
                  <input type="radio" name="role" value="company" checked={role === "company"} onChange={() => setRole("company")} /> Perusahaan
                </label>
              </div>
            </div>
            <div className="frow">
              <label className="field">
                <span className="lbl">Nama</span>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Sinta Prameswari" required />
              </label>
              <label className="field">
                <span className="lbl">Kategori minat</span>
                <span className="sel-wrap">
                  <select name="category" defaultValue={CATS[0]} style={{ width: "100%" }}>
                    {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <span className="chev">▾</span>
                </span>
              </label>
            </div>
            <label className="field">
              <span className="lbl">Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@email.com" required />
            </label>
            <label className="field">
              <span className="lbl">Password</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 karakter" required minLength={6} />
            </label>
            {err && <p style={{ color: "#B42318" }}>{err}</p>}
            <p style={{ margin: "0 0 12px" }}>
              <button className="btn" type="submit" disabled={!configured} style={{ width: "100%", opacity: configured ? 1 : 0.5 }}>
                Buat akun →
              </button>
            </p>
            <p style={{ color: "var(--muted)", fontSize: 14, textAlign: "center", margin: 0 }}>
              Sudah punya akun? <a href="/login">Masuk</a>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
