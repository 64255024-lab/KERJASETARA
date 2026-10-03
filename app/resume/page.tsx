import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { getDraft, getSession } from "../../lib/session";
import { ACC_LABEL } from "../../lib/data";

export default async function ResumePage() {
  const session = await getSession();
  const draft = await getDraft();
  const profile = draft ?? session?.profile;
  if (!profile) {
    return (
      <>
        <Nav />
        <div style={{ padding: "64px", maxWidth: 640, margin: "0 auto" }}>
          <div className="card">
            <h1>Belum ada profil</h1>
            <p style={{ color: "var(--muted)" }}>Daftar atau masuk dulu untuk melihat profil privatmu.</p>
            <p><Link className="btn" href="/register">Daftar</Link></p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Nav />
      <div style={{ padding: "48px 64px", maxWidth: 760, margin: "0 auto" }}>
        <div className="card">
          <p className="chip">Profil privat — hanya kamu &amp; AI</p>
          <h1>{profile.name}</h1>
          <p style={{ color: "var(--muted)" }}>{profile.city} • {profile.category}</p>
          <p><b>Jenis disabilitas (privat):</b> {(profile.disabilities ?? []).join(", ") || "—"}</p>
          <p><b>Kebutuhan akomodasi:</b> {(profile.needs ?? []).map((n) => ACC_LABEL[n] ?? n).join(", ") || "—"}</p>
          <p><b>Keahlian:</b> {(profile.skills ?? []).join(", ") || "—"}</p>
          <p><b>Pengalaman:</b> {profile.experienceYears ?? 0} tahun</p>
          <p>
            <Link className="btn" href="/wizard/step-1">Edit profil</Link>{" "}
            <Link className="btn btn-ghost" href="/jobs">Cari lowongan</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
