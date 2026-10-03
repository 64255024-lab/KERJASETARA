import { redirect } from "next/navigation";
import Link from "next/link";
import Nav from "../../../../components/Nav";
import Footer from "../../../../components/Footer";
import { getDraft, setDraft } from "../../../../lib/session";

export default async function WizardStep1() {
  const draft = await getDraft();
  async function submit(form: FormData) {
    "use server";
    const prev = await getDraft();
    await setDraft({
      ...prev,
      name: String(form.get("name") ?? prev?.name ?? ""),
      city: String(form.get("city") ?? prev?.city ?? ""),
      category: String(form.get("category") ?? prev?.category ?? ""),
      skills: String(form.get("skills") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      experienceYears: Number(form.get("experience") ?? 0),
    });
    redirect("/wizard/step-2");
  }
  return (
    <>
      <Nav />
      <div style={{ padding: "48px 64px", maxWidth: 640, margin: "0 auto" }}>
        <div className="card">
          <p className="chip">Langkah 1 dari 2</p>
          <h1>Data diri</h1>
          <form action={submit}>
            <label className="field">
              <span className="lbl">Nama</span>
              <input name="name" defaultValue={draft?.name ?? ""} required />
            </label>
            <label className="field">
              <span className="lbl">Kota</span>
              <input name="city" defaultValue={draft?.city ?? ""} required />
            </label>
            <label className="field">
              <span className="lbl">Kategori minat</span>
              <input name="category" defaultValue={draft?.category ?? ""} />
            </label>
            <label className="field">
              <span className="lbl">Keahlian (pisahkan koma)</span>
              <input name="skills" defaultValue={(draft?.skills ?? []).join(", ")} />
            </label>
            <label className="field">
              <span className="lbl">Pengalaman (tahun)</span>
              <input name="experience" type="number" min={0} defaultValue={draft?.experienceYears ?? 0} />
            </label>
            <button className="btn" type="submit">Lanjut</button>{" "}
            <Link className="btn btn-ghost" href="/register">Kembali</Link>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
