import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Nav from "../../../../components/Nav";
import Footer from "../../../../components/Footer";
import { getSeed } from "../../../../lib/data";
import { getDraft, getSession } from "../../../../lib/session";
import { addApplication } from "../../../../lib/store";

export default async function ApplyPage({ params }: { params: { id: string } }) {
  const seed = getSeed();
  const job = seed.jobs.find((j) => j.id === params.id);
  if (!job) return notFound();
  const jobTitle = job.title;
  const jobId = job.id;
  const draft = await getDraft();
  const session = await getSession();
  const profile = draft ?? session?.profile;

  async function submit() {
    "use server";
    await addApplication(jobId);
    redirect("/my-jobs");
  }

  return (
    <>
      <Nav />
      <div style={{ padding: "48px 64px", maxWidth: 640, margin: "0 auto" }}>
        <div className="card">
          <p className="chip">Lamaran</p>
          <h1>Lamar: {jobTitle}</h1>
          <form action={submit}>
            <label className="field">
              <span className="lbl">Nama</span>
              <input name="name" defaultValue={profile?.name ?? ""} required />
            </label>
            <label className="field">
              <span className="lbl">Email</span>
              <input name="email" type="email" defaultValue={(profile as { email?: string } | undefined)?.email ?? ""} required />
            </label>
            <label className="field">
              <span className="lbl">Kota</span>
              <input name="city" defaultValue={profile?.city ?? ""} required />
            </label>
            <label className="field">
              <span className="lbl">Pesan untuk perusahaan (opsional)</span>
              <textarea name="message" rows={4} placeholder="Ceritakan singkat kenapa kamu cocok…" />
            </label>
            <button className="btn" type="submit">Kirim lamaran</button>{" "}
            <Link className="btn btn-ghost" href={`/jobs/${jobId}`}>Batal</Link>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
