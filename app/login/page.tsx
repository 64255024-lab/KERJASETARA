"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { supabaseBrowser } from "../../lib/supabase-browser";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function loginGoogle() {
    setErr("");
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setErr(error.message);
  }

  async function loginEmail(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErr(error.message);
      return;
    }
    router.push("/jobs");
    router.refresh();
  }

  return (
    <>
      <Nav />
      <div style={{ padding: "64px 24px", maxWidth: 520, margin: "0 auto" }}>
        <div className="card">
          <h1 style={{ marginTop: 0 }}>Masuk</h1>
          <p style={{ color: "var(--muted)" }}>
            Masuk dengan Google atau email untuk melamar dan menyimpan lowongan.
          </p>
          <button className="btn" type="button" onClick={loginGoogle} style={{ width: "100%" }}>
            Masuk dengan Google
          </button>
          <p style={{ textAlign: "center", color: "var(--muted)", margin: "20px 0" }}>— atau —</p>
          <form onSubmit={loginEmail}>
            <label className="field">
              <span className="lbl">Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@email.com" required />
            </label>
            <label className="field">
              <span className="lbl">Password</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </label>
            {err && <p style={{ color: "#B42318" }}>{err}</p>}
            <button className="btn btn-ghost" type="submit" style={{ width: "100%" }}>
              Masuk dengan email
            </button>
          </form>
          <p style={{ color: "var(--muted)", fontSize: 14, textAlign: "center", marginBottom: 0 }}>
            Belum punya akun? <a href="/register">Daftar</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
