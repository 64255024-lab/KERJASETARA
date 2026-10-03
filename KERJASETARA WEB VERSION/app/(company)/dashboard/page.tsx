import Link from "next/link";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { scoreCompany } from "../../../lib/score";

export default function DashboardPage() {
  const result = scoreCompany(
    ["deskripsi-jelas", "akomodasi-tercantum", "proses-tertulis"],
    ["kursi-roda", "tertulis", "fleksibel"]
  );
  const r = 54;
  const circ = 2 * Math.PI * r;
  const off = circ - (result.overall / 100) * circ;

  return (
    <>
      <Nav />
      <div style={{ padding: "48px 64px", maxWidth: 900, margin: "0 auto" }}>
        <div className="card" style={{ textAlign: "center" }}>
          <p className="chip">Dashboard Inklusivitas</p>
          <h1>Skor perusahaanmu</h1>
          <svg width="140" height="140" viewBox="0 0 140 140" role="img" aria-label={`Skor ${result.overall}`}>
            <circle cx="70" cy="70" r={r} fill="none" stroke="var(--line)" strokeWidth="14" />
            <circle
              cx="70" cy="70" r={r} fill="none"
              stroke="var(--teal)" strokeWidth="14" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={off}
              transform="rotate(-90 70 70)"
            />
            <text x="70" y="78" textAnchor="middle" fontSize="30" fontWeight="800" fill="var(--ink)">{result.overall}</text>
          </svg>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginTop: 16 }}>
          {result.dimensions.map((d) => (
            <div className="card" key={d.name}>
              <b>{d.name}</b>
              <p style={{ fontSize: 28, margin: "8px 0 0", color: "var(--primary)" }}>{d.value}</p>
            </div>
          ))}
        </div>
        <div className="card" style={{ marginTop: 16 }}>
          <h3 style={{ marginTop: 0 }}>3 langkah perbaikan</h3>
          {result.actions.map((a, i) => (
            <p key={i}>• {a.text} — <Link href={a.href}>Perbaiki →</Link></p>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
