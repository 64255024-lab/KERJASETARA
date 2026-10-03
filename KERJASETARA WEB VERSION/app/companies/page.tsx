import Image from "next/image";
import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { getSeed } from "../../lib/data";

export default function CompaniesPage() {
  const seed = getSeed();
  return (
    <>
      <Nav />
      <div style={{ padding: "48px 64px" }}>
        <h1>Perusahaan inklusif</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
          {seed.companies.map((c) => (
            <div className="card" key={c.id} style={{ textAlign: "center" }}>
              <Image src={c.logo} alt={c.name} width={120} height={40} style={{ height: 40, width: "auto" }} />
              <p><b>{c.name}</b></p>
              <p style={{ color: "var(--muted)" }}>{c.city}</p>
              <p style={{ color: "var(--muted)", fontSize: 14 }}>{c.about}</p>
              <p><Link href="/jobs">Lihat loker →</Link></p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
