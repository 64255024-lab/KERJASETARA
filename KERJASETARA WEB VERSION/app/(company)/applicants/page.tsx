import Link from "next/link";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { getSeed } from "../../../lib/data";
import { getApplications } from "../../../lib/store";
import { getPostedJobs } from "../../../lib/posted";

export default async function ApplicantsPage() {
  const seed = getSeed();
  const posted = await getPostedJobs();
  const all = [...seed.jobs, ...posted];
  const companies = new Map(seed.companies.map((c) => [c.id, c]));
  const apps = await getApplications();

  return (
    <>
      <Nav />
      <div style={{ padding: "48px 64px" }}>
        <h1>Pelamar</h1>
        <p style={{ color: "var(--muted)" }}>{apps.length} lamaran masuk • {posted.length} loker dipasang sesi ini</p>
        {all.filter((j) => apps.includes(j.id) || posted.some((p) => p.id === j.id)).map((j) => (
          <div className="card" key={j.id} style={{ marginBottom: 16 }}>
            <b>{j.title}</b> — {companies.get(j.companyId)?.name ?? "Perusahaan demo"} • {j.location}
            <p style={{ color: "var(--muted)" }}>
              {apps.includes(j.id) ? "1 pelamar (Sinta — profil privat terlindungi)" : "Belum ada pelamar"}
            </p>
            <p>
              <Link href={`/jobs/${j.id}`}>Lihat loker →</Link>{" "}
              <Link href="/company/dashboard">Skor inklusivitas →</Link>
            </p>
          </div>
        ))}
        <p style={{ marginTop: 24 }}>
          <Link className="btn" href="/company/post-job">+ Pasang loker baru</Link>{" "}
          <Link className="btn btn-ghost" href="/company/dashboard">Lihat dashboard</Link>
        </p>
      </div>
      <Footer />
    </>
  );
}
