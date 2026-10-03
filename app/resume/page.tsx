import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { supabaseServer } from "../../lib/supabase-server";
import { ACC_LABEL } from "../../lib/data";

export default async function ResumePage() {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return (
      <>
        <Nav />
        <div style={{ padding: "64px", maxWidth: 640, margin: "0 auto" }}>
          <div className="card">
            <h1>Belum ada profil</h1>
            <p style={{ color: "var(--muted)" }}>Daftar atau masuk dulu untuk melihat profil privatmu.</p>
            <p><Link className="btn" href="/register">Daftar</Link></p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .maybeSingle();

  return (
    <>
      <Nav />
      <div style={{ padding: "48px 64px", maxWidth: 760, margin: "0 auto" }}>
        <div className="card">
          <p className="chip">Profil privat — hanya kamu &amp; AI</p>
          <h1>{profile?.name ?? data.user.email}</h1>
          <p style={{ color: "var(--muted)" }}>{profile?.city} • {profile?.category}</p>
          <p><b>Jenis disabilitas (privat):</b> {(profile?.disabilities ?? []).join(", ") || "—"}</p>
          <p><b>Kebutuhan akomodasi:</b> {(profile?.needs ?? []).map((n: string) => ACC_LABEL[n] ?? n).join(", ") || "—"}</p>
          <p><b>Keahlian:</b> {(profile?.skills ?? []).join(", ") || "—"}</p>
          <p><b>Pengalaman:</b> {profile?.experience_years ?? 0} tahun</p>
          <p>
            <Link className="btn" href="/wizard/step-1">Edit profil</Link>{" "}
            <Link className="btn btn-ghost" href="/jobs">Cari lowongan</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
