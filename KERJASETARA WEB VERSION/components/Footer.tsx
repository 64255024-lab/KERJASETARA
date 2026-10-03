import Link from "next/link";

export default function Footer() {
  return (
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
  );
}
