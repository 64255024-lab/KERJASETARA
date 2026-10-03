import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export default function NetworkPage() {
  return (
    <>
      <Nav />
      <div style={{ padding: "48px 64px", maxWidth: 760, margin: "0 auto" }}>
        <div className="card">
          <h1 style={{ marginTop: 0 }}>Koneksi</h1>
          <p style={{ color: "var(--muted)" }}>Bangun jejaring dengan talent dan perusahaan inklusif. Fitur komunitas penuh segera hadir — mulai dengan melengkapi profil.</p>
          <p><Link className="btn" href="/resume">Lengkapi profil</Link></p>
        </div>
      </div>
      <Footer />
    </>
  );
}
