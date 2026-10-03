import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export default function EmployerPage() {
  return (
    <>
      <Nav />
      <div className="hero" style={{ padding: "56px 64px" }}>
        <p className="chip">Untuk perusahaan</p>
        <h1 style={{ fontSize: 44, margin: "16px 0 8px" }}>Rekrut inklusif secara terukur</h1>
        <p className="sub">Pasang loker dengan akomodasi jelas, pantau skor inklusivitas, terima pelamar yang cocok.</p>
        <p style={{ marginTop: 24 }}>
          <Link className="btn" style={{ background: "#fff", color: "var(--primary)", boxShadow: "none" }} href="/company/post-job">Pasang iklan gratis</Link>{" "}
          <Link className="btn btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,.4)" }} href="/company/dashboard">Lihat contoh dashboard</Link>
        </p>
      </div>
      <div style={{ padding: "40px 64px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
        <div className="card"><b>1. Pasang loker</b><p style={{ color: "var(--muted)" }}>Checklist akomodasi + panduan bahasa inklusif.</p></div>
        <div className="card"><b>2. Terima pelamar</b><p style={{ color: "var(--muted)" }}>Kelola lamaran tanpa melihat label disabilitas.</p></div>
        <div className="card"><b>3. Naikkan skor</b><p style={{ color: "var(--muted)" }}>Dashboard 4 dimensi + 3 aksi perbaikan.</p></div>
      </div>
      <Footer />
    </>
  );
}
