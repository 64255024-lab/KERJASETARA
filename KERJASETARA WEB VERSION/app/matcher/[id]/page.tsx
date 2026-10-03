import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { getSeed } from "../../../lib/data";
import { getDraft, getSession } from "../../../lib/session";
import { matchJob } from "../../../lib/matcher";
import { addApplication, addSaved } from "../../../lib/store";

export default async function MatcherPage({ params }: { params: { id: string } }) {
  const seed = getSeed();
  const job = seed.jobs.find((j) => j.id === params.id);
  if (!job) return notFound();
  const jobId = job.id;
  const draft = await getDraft();
  const session = await getSession();
  const profile = draft ?? session?.profile ?? seed.demoTalent;
  const prof = {
    id: (profile as { id?: string }).id ?? "draft",
    role: "talent" as const,
    name: profile.name ?? "Talent",
    email: (profile as { email?: string }).email ?? "",
    city: profile.city ?? "",
    skills: profile.skills ?? [],
    experienceYears: profile.experienceYears ?? 0,
    disabilities: profile.disabilities ?? [],
    needs: (profile.needs ?? []) as ("kursi-roda" | "isyarat" | "screen-reader" | "tertulis" | "remote" | "fleksibel" | "mentor" | "tenang")[],
    category: profile.category ?? "",
  };
  const result = matchJob(prof, job);

  async function apply() {
    "use server";
    await addApplication(jobId);
    redirect("/my-jobs");
  }
  async function save() {
    "use server";
    await addSaved(jobId);
    redirect("/my-jobs");
  }

  const r = 54;
  const circ = 2 * Math.PI * r;
  const off = circ - (result.score / 100) * circ;

  return (
    <>
      <Nav />
      <div style={{ padding: "48px 64px", maxWidth: 760, margin: "0 auto" }}>
        <div className="card" style={{ textAlign: "center" }}>
          <p className="chip">AI Job Matcher — transparan</p>
          <h1>{job.title}</h1>
          <svg width="140" height="140" viewBox="0 0 140 140" role="img" aria-label={`Skor ${result.score}`}>
            <circle cx="70" cy="70" r={r} fill="none" stroke="var(--line)" strokeWidth="14" />
            <circle
              cx="70" cy="70" r={r} fill="none"
              stroke="var(--primary)" strokeWidth="14" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={off}
              transform="rotate(-90 70 70)"
            />
            <text x="70" y="78" textAnchor="middle" fontSize="30" fontWeight="800" fill="var(--ink)">{result.score}</text>
          </svg>
          <p style={{ color: "var(--muted)" }}>Skor kecocokan profilmu dengan loker ini</p>
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <h3 style={{ marginTop: 0 }}>Kenapa cocok</h3>
          {result.reasons.map((x, i) => (
            <p key={i}>✓ {x.text} <span style={{ color: "var(--muted)", fontSize: 13 }}>(sumber: {x.source})</span></p>
          ))}
          {result.reasons.length === 0 && <p style={{ color: "var(--muted)" }}>Belum ada faktor yang cocok — lengkapi profilmu.</p>}
        </div>

        {result.gaps.length > 0 && (
          <div className="card" style={{ marginTop: 16 }}>
            <h3 style={{ marginTop: 0 }}>Gap yang bisa ditutup</h3>
            {result.gaps.map((g, i) => (
              <p key={i}>• <b>{g.skill}</b> — {g.hint} <Link href="/wizard/step-1">Tutup Gap →</Link></p>
            ))}
          </div>
        )}

        <p style={{ marginTop: 24 }}>
          <form action={apply} style={{ display: "inline" }}>
            <button className="btn" type="submit">Lamar posisi ini</button>
          </form>{" "}
          <form action={save} style={{ display: "inline" }}>
            <button className="btn btn-ghost" type="submit">Simpan</button>
          </form>{" "}
          <Link className="btn btn-ghost" href={`/jobs/${jobId}`}>Kembali ke detail</Link>
        </p>
      </div>
      <Footer />
    </>
  );
}
