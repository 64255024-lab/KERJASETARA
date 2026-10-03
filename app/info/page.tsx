import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export default function InfoPage() {
  const tips = [
    { t: "CV percaya diri", d: "Tulis akomodasi sebagai kebutuhan profesional.", img: "/assets/tips-cv.jpg" },
    { t: "Siap interview", d: "Minta adaptasi tanpa ragu.", img: "/assets/tips-interview.jpg" },
    { t: "Kenali hakmu", d: "Kuota & hak kerja inklusif.", img: "/assets/tips-hak.jpg" },
    { t: "Bangun portofolio", d: "Tunjukkan karya terbaikmu.", img: "/assets/tips-portofolio.jpg" },
  ];
  return (
    <>
      <Nav />
      <div style={{ padding: "48px 64px" }}>
        <h1>Tips karier</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
          {tips.map((x) => (
            <div className="card" key={x.t}>
              <img src={x.img} alt={x.t} style={{ width: "100%", height: 110, objectFit: "cover", borderRadius: 12 }} />
              <b>{x.t}</b>
              <p style={{ color: "var(--muted)" }}>{x.d}</p>
            </div>
          ))}
        </div>
        <div className="card" style={{ marginTop: 24 }}>
          <h3 style={{ marginTop: 0 }}>Tentang KerjaSetara</h3>
          <p>Jaringan karir inklusif untuk pekerja dengan disabilitas. Data disabilitas bersifat privat — publik hanya melihat kategori dan akomodasi.</p>
          <p><Link className="btn" href="/register">Buat profil gratis</Link></p>
        </div>
      </div>
      <Footer />
    </>
  );
}
