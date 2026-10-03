import { redirect } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { setDraft } from "../../lib/session";

const CATS = ["Produksi", "Administrasi", "Kreatif", "Layanan", "Teknologi", "Kuliner"];
const DISA = ["daksa", "rungu wicara", "netra", "grahita", "mental"];
const NEEDS = ["kursi-roda", "isyarat", "screen-reader", "tertulis", "remote", "fleksibel", "mentor", "tenang"];

export default function RegisterPage() {
  async function submit(form: FormData) {
    "use server";
    const role = form.get("role") === "company" ? "company" : "talent";
    const disabilities = form.getAll("disabilities").map(String);
    const needs = form.getAll("needs").map(String);
    await setDraft({
      role,
      name: String(form.get("name") ?? ""),
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
      <div style={{ padding: "48px 64px", maxWidth: 760, margin: "0 auto" }}>
        <div className="card">
          <h1 style={{ marginTop: 0 }}>Daftar</h1>
          <form action={submit}>
            <label className="field">
              <span className="lbl">Saya mendaftar sebagai</span>
              <div style={{ display: "flex", gap: 16 }}>
                <label><input type="radio" name="role" value="talent" defaultChecked /> Talent</label>
                <label><input type="radio" name="role" value="company" /> Perusahaan</label>
              </div>
            </label>
            <label className="field">
              <span className="lbl">Nama</span>
              <input name="name" required />
            </label>
            <div className="frow">
              <label className="field">
                <span className="lbl">Kota</span>
                <input name="city" required />
              </label>
              <label className="field">
                <span className="lbl">Kategori minat</span>
                <select name="category" defaultValue={CATS[0]}>
                  {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
            </div>
            <div className="field">
              <span className="lbl">Jenis disabilitas — privat, hanya untuk AI</span>
              <div className="check-grid">
                {DISA.map((d) => (
                  <label key={d}><input type="checkbox" name="disabilities" value={d} /> {d}</label>
                ))}
              </div>
            </div>
            <div className="field">
              <span className="lbl">Kebutuhan akomodasi</span>
              <div className="check-grid">
                {NEEDS.map((n) => (
                  <label key={n}><input type="checkbox" name="needs" value={n} /> {n}</label>
                ))}
              </div>
            </div>
            <label className="field">
              <span className="lbl">Keahlian (pisahkan koma)</span>
              <input name="skills" placeholder="menjahit, excel-dasar" />
            </label>
            <label className="field">
              <span className="lbl">Pengalaman (tahun)</span>
              <input name="experience" type="number" min={0} defaultValue={0} />
            </label>
            <button className="btn" type="submit">Lanjut ke wizard</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
