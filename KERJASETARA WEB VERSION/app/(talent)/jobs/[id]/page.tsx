import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "../../../../components/Nav";
import Footer from "../../../../components/Footer";
import { getSeed, ACC_LABEL } from "../../../../lib/data";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const seed = getSeed();
  const job = seed.jobs.find((j) => j.id === params.id);
  if (!job) return notFound();
  const company = seed.companies.find((c) => c.id === job.companyId);

  return (
    <>
      <Nav />
      <div style={{ padding: "32px 64px", display: "flex", gap: 32 }}>
        <div style={{ flex: 2 }}>
          <Image
            src={job.cover}
            alt={job.title}
            width={900}
            height={280}
            style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 22 }}
          />
          <p style={{ marginTop: 16 }}>
            {job.accommodations.map((a) => (
              <span className="badge" key={a} style={{ marginRight: 8 }}>{ACC_LABEL[a] ?? a}</span>
            ))}
          </p>
          <h1 style={{ margin: "12px 0 4px", fontSize: 40 }}>{job.title}</h1>
          <p style={{ color: "var(--muted)", fontSize: 17 }}>
            {company?.name} • {job.category} • {job.location}
          </p>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Detail lowongan</h3>
            <p>{job.description}</p>
            <h3>Kriteria umum</h3>
            <p>{job.criteria.join(" • ")}</p>
            <h3>Keahlian</h3>
            <p>{job.skills.join(" • ")}</p>
          </div>
          <p style={{ marginTop: 24 }}>
            <Link className="btn" href={`/apply/${job.id}`}>Lamar posisi ini</Link>{" "}
            <Link className="btn btn-ghost" href="/my-jobs">Simpan</Link>{" "}
            <Link className="btn btn-ghost" href={`/matcher/${job.id}`}>Cek Skor AI</Link>
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <div className="card" style={{ position: "sticky", top: 96, textAlign: "center" }}>
            {company?.logo && (
              <Image src={company.logo} alt={company.name} width={120} height={56} />
            )}
            <h3>{company?.name}</h3>
            <p style={{ color: "var(--muted)" }}>{company?.about}</p>
            <p style={{ color: "var(--muted)" }}>{job.category} • {job.location}</p>
            <p><Link className="btn" href="/companies">Lihat profil perusahaan →</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
