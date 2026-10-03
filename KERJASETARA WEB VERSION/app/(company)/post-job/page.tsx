import { redirect } from "next/navigation";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { ACC_LABEL } from "../../../lib/data";
import { addPostedJob } from "../../../lib/posted";

const CATS = ["Produksi", "Administrasi", "Kreatif", "Layanan", "Teknologi", "Kuliner"];
const CHECKS = ["deskripsi-jelas", "akomodasi-tercantum", "proses-tertulis", "kontak-jelas"];

export default function PostJobPage() {
  async function submit(form: FormData) {
    "use server";
    const checklist = form.getAll("checklist").map(String);
    if (checklist.length < 2) return;
    const title = String(form.get("title") ?? "").trim();
    if (!title) return;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `loker-${Date.now()}`;
    await addPostedJob({
      id: slug,
      title,
      companyId: "kopi-ruang",
      category: String(form.get("category") ?? "Produksi"),
      location: String(form.get("location") ?? ""),
      remote: form.get("remote") === "on",
      deadline: String(form.get("deadline") ?? ""),
      description: String(form.get("description") ?? ""),
      criteria: String(form.get("criteria") ?? "").split("•").map((s) => s.trim()).filter(Boolean),
      accommodations: form.getAll("acc").map(String) as never[],
      skills: String(form.get("skills") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      experienceMin: Number(form.get("experienceMin") ?? 0),
      cover: "/assets/co-kopi.jpg",
    });
    redirect("/company/applicants");
  }
  return (
    <>
      <Nav />
      <div style={{ padding: "48px 64px", maxWidth: 760, margin: "0 auto" }}>
        <div className="card">
          <h1 style={{ marginTop: 0 }}>Pasang loker</h1>
          <p style={{ color: "var(--muted)" }}>Cantumkan akomodasi dengan jujur — tanpa label disabilitas.</p>
          <form action={submit}>
            <label className="field">
              <span className="lbl">Judul posisi</span>
              <input name="title" required />
            </label>
            <div className="frow">
              <label className="field">
                <span className="lbl">Kategori</span>
                <select name="category" defaultValue={CATS[0]}>
                  {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
              <label className="field">
                <span className="lbl">Lokasi</span>
                <input name="location" required />
              </label>
            </div>
            <div className="frow">
              <label className="field">
                <span className="lbl">Deadline</span>
                <input name="deadline" type="date" required />
              </label>
              <label className="field">
                <span className="lbl">Pengalaman minimal (tahun)</span>
                <input name="experienceMin" type="number" min={0} defaultValue={0} />
              </label>
            </div>
            <label className="field">
              <span className="lbl">Deskripsi</span>
              <textarea name="description" rows={4} required />
            </label>
            <label className="field">
              <span className="lbl">Kriteria (pisahkan dengan •)</span>
              <input name="criteria" placeholder="Teliti • Mampu kerja tim" />
            </label>
            <label className="field">
              <span className="lbl">Keahlian (pisahkan koma)</span>
              <input name="skills" placeholder="pelayanan, kerja-tim" />
            </label>
            <div className="field">
              <span className="lbl">Akomodasi yang tersedia</span>
              <div className="check-grid">
                {Object.entries(ACC_LABEL).map(([k, label]) => (
                  <label key={k}><input type="checkbox" name="acc" value={k} /> {label}</label>
                ))}
              </div>
            </div>
            <div className="field">
              <span className="lbl">Checklist inklusif (minimal 2)</span>
              <div className="check-grid">
                {CHECKS.map((c) => (
                  <label key={c}><input type="checkbox" name="checklist" value={c} /> {c}</label>
                ))}
              </div>
            </div>
            <label style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
              <input type="checkbox" name="remote" /> Bisa remote
            </label>
            <button className="btn" type="submit">Terbitkan loker</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
