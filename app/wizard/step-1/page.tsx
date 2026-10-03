import { redirect } from "next/navigation";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { supabaseServer } from "../../../lib/supabase-server";

export default async function WizardStep1() {
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
        name: String(form.get("name") ?? ""),
        city: String(form.get("city") ?? ""),
        category: String(form.get("category") ?? "Produksi"),
        skills: String(form.get("skills") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
        experience_years: Number(form.get("experience") ?? 0),
      },
      { onConflict: "id" }
    );
    redirect("/wizard/step-2");
  }

  return (
    <>
      <Nav />
      <div style={{ padding: "48px 64px", maxWidth: 640, margin: "0 auto" }}>
        <div className="card">
          <p className="chip">Langkah 2 dari 2 — Data diri</p>
          <h1>Data diri</h1>
          <form action={submit}>
            <label className="field">
              <span className="lbl">Nama</span>
              <input name="name" defaultValue={profile?.name ?? ""} required />
            </label>
            <label className="field">
              <span className="lbl">Kota</span>
              <input name="city" defaultValue={profile?.city ?? ""} required />
            </label>
            <label className="field">
              <span className="lbl">Kategori minat</span>
              <input name="category" defaultValue={profile?.category ?? "Produksi"} />
            </label>
            <label className="field">
              <span className="lbl">Keahlian (pisahkan koma)</span>
              <input name="skills" defaultValue={(profile?.skills ?? []).join(", ")} />
            </label>
            <label className="field">
              <span className="lbl">Pengalaman (tahun)</span>
              <input name="experience" type="number" min={0} defaultValue={profile?.experience_years ?? 0} />
            </label>
            <button className="btn" type="submit">Lanjut</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
