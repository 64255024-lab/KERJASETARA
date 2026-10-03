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
        <div className="strip">
          <Image src="/assets/strip-kantor-1.jpg" alt="Suasana kantor inklusif" width={300} height={120} />
          <Image src="/assets/strip-interview.jpg" alt="Interview inklusif dengan juru isyarat" width={300} height={120} />
          <Image src="/assets/strip-workshop.jpg" alt="Pendampingan kerja di workshop" width={300} height={120} />
          <Image src="/assets/strip-ruang-tenang.jpg" alt="Ruang tenang ramah sensorik" width={300} height={120} />
        </div>
        <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between" }}>
          <h2 style={{ margin: 0 }}>Lowongan terbaru</h2>
          <Link href="/jobs">Lihat semua →</Link>
        </div>
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
        <h2 style={{ marginTop: 56 }}>Tips karier</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
          <div className="card">
            <Image src="/assets/tips-cv.jpg" alt="Contoh CV di meja" width={300} height={110} style={{ width: "100%", height: 110, objectFit: "cover", borderRadius: 12 }} />
            <b>CV percaya diri</b>
            <p style={{ color: "var(--muted)" }}>Tulis akomodasi sebagai kebutuhan profesional.</p>
            <p><Link href="/info">Baca →</Link></p>
          </div>
          <div className="card">
            <Image src="/assets/tips-interview.jpg" alt="Simulasi interview" width={300} height={110} style={{ width: "100%", height: 110, objectFit: "cover", borderRadius: 12 }} />
            <b>Siap interview</b>
            <p style={{ color: "var(--muted)" }}>Minta adaptasi tanpa ragu.</p>
            <p><Link href="/info">Baca →</Link></p>
          </div>
          <div className="card">
            <Image src="/assets/tips-hak.jpg" alt="Dokumen hak ketenagakerjaan" width={300} height={110} style={{ width: "100%", height: 110, objectFit: "cover", borderRadius: 12 }} />
            <b>Kenali hakmu</b>
            <p style={{ color: "var(--muted)" }}>Kuota & hak kerja inklusif.</p>
            <p><Link href="/info">Baca →</Link></p>
          </div>
          <div className="card">
            <Image src="/assets/tips-portofolio.jpg" alt="Portofolio karya desain" width={300} height={110} style={{ width: "100%", height: 110, objectFit: "cover", borderRadius: 12 }} />
            <b>Bangun portofolio</b>
            <p style={{ color: "var(--muted)" }}>Tunjukkan karya terbaikmu.</p>
            <p><Link href="/info">Baca →</Link></p>
          </div>
        </div>
        <h2 style={{ marginTop: 56 }}>Dipercaya perusahaan inklusif</h2>
        <div style={{ display: "flex", gap: 16 }}>
          <div className="card" style={{ flex: 1, textAlign: "center", color: "var(--muted)" }}>
            <Image src="/assets/logo-apparel.png" alt="Logo Apparel Satu" width={120} height={40} style={{ height: 40, width: "auto" }} /><br />Apparel Satu
          </div>
          <div className="card" style={{ flex: 1, textAlign: "center", color: "var(--muted)" }}>
            <Image src="/assets/logo-mahayasa.png" alt="Logo Mahayasa" width={120} height={40} style={{ height: 40, width: "auto" }} /><br />Mahayasa
          </div>
          <div className="card" style={{ flex: 1, textAlign: "center", color: "var(--muted)" }}>
            <Image src="/assets/logo-karsa.png" alt="Logo Karsa" width={120} height={40} style={{ height: 40, width: "auto" }} /><br />Studio Karsa
          </div>
          <div className="card" style={{ flex: 1, textAlign: "center", color: "var(--muted)" }}>
            <Image src="/assets/logo-layanan.png" alt="Logo Layanan Prima" width={120} height={40} style={{ height: 40, width: "auto" }} /><br />Layanan Prima
          </div>
          <div className="card" style={{ flex: 1, textAlign: "center", color: "var(--muted)" }}>
            <Image src="/assets/logo-cerah.png" alt="Logo Media Cerah" width={120} height={40} style={{ height: 40, width: "auto" }} /><br />Media Cerah
          </div>
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
