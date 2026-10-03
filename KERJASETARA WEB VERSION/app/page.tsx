import Image from "next/image";
import Link from "next/link";
import seed from "../data/seed.json";

const ACC_LABEL: Record<string, string> = {
  "kursi-roda": "Ramah kursi roda",
  "isyarat": "Pelatihan isyarat tim",
  "tertulis": "Komunikasi tertulis",
  "remote": "Remote friendly",
  "fleksibel": "Jam fleksibel",
  "mentor": "Mentor pendamping",
  "tenang": "Ruang tenang",
  "screen-reader": "Kompatibel screen reader",
};

export default function Home() {
  const companies = new Map(seed.companies.map((c) => [c.id, c]));
  return (
    <>
      <div className="nav">
        <Link className="logo" href="/">
          <Image src="/assets/logo.png" alt="Logo KerjaSetara" width={36} height={36} />
          KerjaSetara
        </Link>
        <Link className="link" href="/jobs">Cari Lowongan</Link>
        <Link className="link" href="/companies">Daftar Perusahaan</Link>
        <Link className="link" href="/info">Tips Karir</Link>
        <Link className="link" href="/employer">Penyedia Kerja</Link>
        <span style={{ flex: 1 }}></span>
        <Link className="link" href="/login">Masuk</Link>
        <Link className="btn" href="/register">Daftar</Link>
      </div>

      <div className="hero" style={{ padding: "72px 64px 56px" }}>
        <div style={{ maxWidth: 700 }}>
          <p className="chip">Untuk semua — akses setara, peluang setara</p>
          <h1 style={{ fontSize: 52, margin: "20px 0 12px", letterSpacing: -1 }}>
            Cari lowongan sesuai keunikanmu
          </h1>
          <p className="sub" style={{ fontSize: 19 }}>
            Apapun tentangmu, selalu ada peluang di sini. Buat profil sekali — lamar cepat, dihubungi perusahaan.
          </p>
          <form className="searchbar" style={{ margin: "32px 0" }} action="/jobs" method="get">
            <input name="q" placeholder="Cari posisi atau perusahaan…" />
            <button className="btn" type="submit">Cari</button>
          </form>
          <p>
            <Link href="/jobs" style={{ fontSize: 14, color: "#fff" }}>
              Pencarian lanjutan: kategori • lokasi • perusahaan →
            </Link>
          </p>
          <div className="kpi">
            <span className="item">Gratis untuk talent</span>
            <span className="item">Privasi terkontrol</span>
            <span className="item">Akomodasi jelas</span>
          </div>
        </div>
        <Image
          className="img-slot"
          src="/assets/hero-tim-inklusif.jpg"
          alt="Tim inklusif Indonesia berkolaborasi di kantor modern"
          width={420}
          height={300}
        />
      </div>

      <div style={{ padding: "40px 64px 0" }}>
        <h2 style={{ margin: 0 }}>Lowongan terbaru</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginTop: 16 }}>
          {seed.jobs.map((j) => (
            <div className="job-card" key={j.id}>
              <Image className="cover" src={j.cover} alt={j.title} width={400} height={130} />
              <div className="pad">
                <span className="chip">{j.category}</span>
                <h3>{j.title}</h3>
                <p>{companies.get(j.companyId)?.name}</p>
                <p>{j.location}</p>
                <p>
                  <span className="badge">{ACC_LABEL[j.accommodations[0]] ?? j.accommodations[0]}</span>
                </p>
                <p>
                  <Link href={`/jobs/${j.id}`}>Selengkapnya →</Link>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="card section-band" style={{ marginTop: 48, display: "flex", gap: 24, alignItems: "center" }}>
          <Image
            src="/assets/cta-profil.jpg"
            alt="Talent tersenyum memegang laptop"
            width={220}
            height={150}
            style={{ width: 220, height: 150, objectFit: "cover", borderRadius: 16, border: "3px solid rgba(255,255,255,.4)" }}
          />
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: "0 0 8px" }}>Buat profil KerjaSetara — gratis</h2>
            <p style={{ margin: 0 }}>Dapat notifikasi peluang tiap hari • Lamar 1-klik dengan data auto-isi • Mudah dihubungi perusahaan yang cocok.</p>
          </div>
          <Link className="btn" style={{ background: "#fff", color: "var(--primary)", boxShadow: "none" }} href="/register">
            Buat profil
          </Link>
        </div>
      </div>

      <div className="footer">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
          <div>
            <b>KerjaSetara</b>
            <p>Jaringan karir inklusif untuk pekerja dengan disabilitas.</p>
            <p><Link href="/info">Tentang kami</Link></p>
          </div>
          <div>
            <b>Fitur</b>
            <p>
              <Link href="/resume">Profil</Link><br />
              <Link href="/jobs">Lowongan Cocok</Link><br />
              <Link href="/my-jobs">Lowongan Disimpan</Link><br />
              <Link href="/my-jobs">Lamaran Dikirim</Link><br />
              <Link href="/network">Koneksi</Link>
            </p>
          </div>
          <div>
            <b>Perusahaan</b>
            <p>
              <Link href="/info">Tentang</Link><br />
              <Link href="/info">Mitra</Link><br />
              <Link href="/info">Hubungi Kami</Link><br />
              <Link href="/info">FAQ</Link>
            </p>
          </div>
          <div>
            <b>Penyedia Kerja</b>
            <p>
              <Link href="/employer">Pasang iklan gratis</Link><br />
              <Link href="/register">Mendaftar</Link><br />
              <Link href="/pricing">Layanan &amp; Biaya</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
