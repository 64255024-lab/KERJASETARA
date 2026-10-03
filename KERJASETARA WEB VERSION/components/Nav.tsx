import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
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
  );
}
