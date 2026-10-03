import { redirect } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { setSession } from "../../lib/session";

export default function LoginPage() {
  async function loginTalent() {
    "use server";
    await setSession("talent");
    redirect("/jobs");
  }
  async function loginCompany() {
    "use server";
    await setSession("company");
    redirect("/company/applicants");
  }
  return (
    <>
      <Nav />
      <div style={{ padding: "64px", maxWidth: 640, margin: "0 auto" }}>
        <div className="card">
          <h1 style={{ marginTop: 0 }}>Masuk (demo)</h1>
          <p style={{ color: "var(--muted)" }}>Pilih akun demo — tanpa kata sandi untuk keperluan lomba.</p>
          <form action={loginTalent}>
            <button className="btn" type="submit" style={{ width: "100%" }}>Masuk sebagai Talent</button>
          </form>
          <form action={loginCompany} style={{ marginTop: 12 }}>
            <button className="btn btn-ghost" type="submit" style={{ width: "100%" }}>Masuk sebagai Perusahaan</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
