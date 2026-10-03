import Link from "next/link";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import JobCard from "../../../components/JobCard";
import { getSeed } from "../../../lib/data";
import { getApplications, getSaved } from "../../../lib/store";

export default async function MyJobsPage() {
  const seed = getSeed();
  const companies = new Map(seed.companies.map((c) => [c.id, c]));
  const apps = await getApplications();
  const saved = await getSaved();
  const appJobs = seed.jobs.filter((j) => apps.includes(j.id));
  const savedJobs = seed.jobs.filter((j) => saved.includes(j.id));

  return (
    <>
      <Nav />
      <div style={{ padding: "48px 64px" }}>
        <h1>Lamaranku</h1>
        <h2>Lamaran Dikirim ({appJobs.length})</h2>
        {appJobs.length === 0 ? (
          <div className="card"><p style={{ color: "var(--muted)" }}>Belum ada lamaran. <Link href="/jobs">Cari lowongan →</Link></p></div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {appJobs.map((j) => (
              <JobCard key={j.id} job={j} companyName={companies.get(j.companyId)?.name ?? ""} />
            ))}
          </div>
        )}
        <h2 style={{ marginTop: 40 }}>Lowongan Disimpan ({savedJobs.length})</h2>
        {savedJobs.length === 0 ? (
          <div className="card"><p style={{ color: "var(--muted)" }}>Belum ada yang disimpan.</p></div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {savedJobs.map((j) => (
              <JobCard key={j.id} job={j} companyName={companies.get(j.companyId)?.name ?? ""} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
