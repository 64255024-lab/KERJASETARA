import { redirect } from "next/navigation";
import Link from "next/link";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { getDraft, setDraft, setSession } from "../../../lib/session";
import { ACC_LABEL } from "../../../lib/data";

export default async function WizardStep2() {
  const draft = await getDraft();
  async function submit(form: FormData) {
    "use server";
    const prev = await getDraft();
    const role = prev?.role === "company" ? "company" : "talent";
    await setDraft({ ...prev, needs: form.getAll("needs").map(String) });
    await setSession(role);
    redirect(role === "company" ? "/company/applicants" : "/resume");
  }
  return (
    <>
      <Nav />
      <div style={{ padding: "48px 64px", maxWidth: 640, margin: "0 auto" }}>
        <div className="card">
          <p className="chip">Langkah 2 dari 2</p>
          <h1>Kebutuhan akomodasi</h1>
          <p style={{ color: "var(--muted)" }}>Centang yang kamu butuhkan — perusahaan hanya melihat akomodasi, bukan label disabilitas.</p>
          <form action={submit}>
            <div className="field">
              <div className="check-grid">
                {Object.entries(ACC_LABEL).map(([k, label]) => (
                  <label key={k}>
                    <input type="checkbox" name="needs" value={k} defaultChecked={draft?.needs?.includes(k)} /> {label}
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
