import { redirect } from "next/navigation";
import Link from "next/link";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { supabaseServer } from "../../../lib/supabase-server";
import { ACC_LABEL } from "../../../lib/data";

const DISA = ["Tuna daksa", "Tuna rungu wicara", "Tuna netra", "Tuna grahita", "Disabilitas mental"];

export default async function WizardStep2() {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) redirect("/register");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  async function submit(form: FormData) {
    "use server";
    const { supabaseServer } = await import("../../../lib/supabase-server");
    const supabase = await supabaseServer();
    const { data: inner } = await supabase.auth.getUser();
    const innerUser = inner.user;
    if (!innerUser) redirect("/register");
    await supabase.from("profiles").upsert(
      {
        id: innerUser.id,
        email: innerUser.email ?? "",
        disabilities: form.getAll("disabilities").map(String),
        needs: form.getAll("needs").map(String),
      },
      { onConflict: "id" }
    );
    redirect("/resume");
  }

  return (
    <>
      <Nav />
      <div style={{ padding: "48px 64px", maxWidth: 640, margin: "0 auto" }}>
        <div className="card">
          <p className="chip">Langkah 2 dari 2 — Akomodasi</p>
          <h1>Kebutuhan akomodasi</h1>
          <p style={{ color: "var(--muted)" }}>
            Centang yang kamu butuhkan — perusahaan hanya melihat akomodasi, bukan label disabilitas.
          </p>
          <form action={submit}>
            <div className="card" style={{ background: "var(--primary-soft)", border: "none", margin: "0 0 20px" }}>
              <p style={{ margin: 0 }}><b>Kriteria disabilitas (privat)</b></p>
              <p style={{ margin: "4px 0 0", color: "var(--muted)", fontSize: 14 }}>
                Hanya untuk pencocokan AI, tidak tampil publik.
              </p>
              <div className="acc-grid">
                {DISA.map((d) => (
                  <label className="chip" key={d} style={{ background: "#fff", border: "1.5px solid var(--line)", color: "var(--muted)", cursor: "pointer", fontWeight: 400 }}>
                    <input type="checkbox" name="disabilities" value={d} defaultChecked={(profile?.disabilities ?? []).includes(d)} style={{ display: "none" }} /> {d}
                  </label>
                ))}
              </div>
            </div>
            <div className="field">
              <span className="lbl">Kebutuhan akomodasi</span>
              <div className="check-grid">
                {Object.entries(ACC_LABEL).map(([k, label]) => (
                  <label key={k} style={{ fontWeight: 400 }}>
                    <input type="checkbox" name="needs" value={k} defaultChecked={(profile?.needs ?? []).includes(k)} /> {label}
                  </label>
                ))}
              </div>
            </div>
            <button className="btn" type="submit">Selesai &amp; simpan profil</button>{" "}
            <Link className="btn btn-ghost" href="/wizard/step-1">Kembali</Link>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
