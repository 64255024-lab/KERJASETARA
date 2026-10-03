import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export default function PricingPage() {
  return (
    <>
      <Nav />
      <div style={{ padding: "48px 64px", maxWidth: 900, margin: "0 auto" }}>
        <h1>Layanan &amp; Biaya</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
          <div className="card"><b>Talent — Gratis</b><p style={{ color: "var(--muted)" }}>Profil, AI matcher, lamaran 1-klik, notifikasi harian.</p><p><Link className="btn" href="/register">Daftar gratis</Link></p></div>
          <div className="card"><b>Perusahaan — Gratis saat lomba</b><p style={{ color: "var(--muted)" }}>Pasang loker, kelola pelamar, dashboard inklusivitas.</p><p><Link className="btn" href="/company/post-job">Pasang loker</Link></p></div>
        </div>
      </div>
      <Footer />
    </>
  );
}
