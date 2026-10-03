import Image from "next/image";
import Link from "next/link";
import { ACC_LABEL } from "../lib/data";
import type { SeedJob } from "../lib/types";

export default function JobCard({ job, companyName, score }: { job: SeedJob; companyName: string; score?: number }) {
  return (
    <div className="job-card">
      <Image className="cover" src={job.cover} alt={job.title} width={400} height={130} />
      <div className="pad">
        <span className="chip">{job.category}</span>
        <h3>{job.title}</h3>
        <p>{companyName} • {job.location}</p>
        <p>
          <span className="badge">{ACC_LABEL[job.accommodations[0]] ?? job.accommodations[0]}</span>
          {typeof score === "number" && <span className="badge" style={{ marginLeft: 8 }}>{score}%</span>}
        </p>
        <p><Link href={`/jobs/${job.id}`}>Selengkapnya →</Link></p>
      </div>
    </div>
  );
}
