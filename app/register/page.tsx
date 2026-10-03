import { redirect } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { setDraft } from "../../lib/session";

const CATS = ["Produksi", "Administrasi", "Kreatif", "Layanan", "Teknologi", "Kuliner"];
const DISA = ["Tuna daksa", "Tuna rungu wicara", "Tuna netra", "Tuna grahita", "Disabilitas mental"];
const NEEDS = ["kursi-roda", "isyarat", "screen-reader", "tertulis", "remote", "fleksibel", "mentor", "tenang"];

export default function RegisterPage() {
  async function submit(form: FormData) {
    "use server";
    const role = form.get("role") === "company" ? "company" : "talent";
    const disabilities = form.getAll("disabilities").map(String);
    const needs = form.getAll("needs").map(String);
    await setDraft({
      role,
      name: `${String(form.get("first") ?? "")} ${String(form.get("last") ?? "")}`.trim(),
      city: String(form.get("city") ?? ""),
      category: String(form.get("category") ?? ""),
      disabilities,
      needs,
      skills: String(form.get("skills") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      experienceYears: Number(form.get("experience") ?? 0),
    });
    redirect("/wizard/step-1");
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
            Semua field wajib kecuali foto (nanti).
          </p>
          <form action={submit}>
            <div className="field">
              <span className="lbl">Saya mendaftar sebagai</span>
              <div style={{ display: "flex", gap: 16, fontWeight: 400 }}>
                <label><input type="radio" name="role" value="talent" defaultChecked /> Talent</label>
                <label><input type="radio" name="role" value="company" /> Perusahaan</label>
              </div>
            </div>
            <div className="frow">
              <label className="field">
                <span className="lbl">Nama depan</span>
                <input name="first" placeholder="Sinta" required />
              </label>
              <label className="field">
                <span className="lbl">Nama belakang</span>
                <input name="last" placeholder="Prameswari" required />
              </label>
            </div>
            <label className="field">
              <span className="lbl">Email</span>
              <input name="email" type="email" placeholder="nama@email.com" required />
            </label>
            <div className="frow">
              <label className="field">
                <span className="lbl">Kota</span>
                <input name="city" placeholder="Semarang" required />
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
            <div className="card" style={{ background: "var(--primary-soft)", border: "none", margin: "0 0 20px" }}>
              <p style={{ margin: 0 }}><b>Kriteria disabilitas</b></p>
              <p style={{ margin: "4px 0 0", color: "var(--muted)", fontSize: 14 }}>
                Pilih semua yang sesuai — privat, hanya untuk pencocokan AI, tidak tampil publik.
              </p>
              <div className="acc-grid">
                {DISA.map((d) => (
                  <label className="chip" key={d} style={{ background: "#fff", border: "1.5px solid var(--line)", color: "var(--muted)", cursor: "pointer", fontWeight: 400 }}>
                    <input type="checkbox" name="disabilities" value={d} style={{ display: "none" }} /> {d}
                  </label>
                ))}
              </div>
            </div>
            <div className="field">
              <span className="lbl">Kebutuhan akomodasi</span>
              <div className="check-grid">
                {NEEDS.map((n) => (
                  <label key={n} style={{ fontWeight: 400 }}>
                    <input type="checkbox" name="needs" value={n} /> {n}
                  </label>
                ))}
              </div>
            </div>
            <div className="frow">
              <label className="field">
                <span className="lbl">Keahlian (pisahkan koma)</span>
                <input name="skills" placeholder="menjahit, excel-dasar" />
              </label>
              <label className="field">
                <span className="lbl">Pengalaman (tahun)</span>
                <input name="experience" type="number" min={0} defaultValue={0} />
              </label>
            </div>
            <p style={{ margin: "0 0 12px" }}>
              <button className="btn" type="submit" style={{ width: "100%" }}>Lanjutkan ke profil →</button>
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
