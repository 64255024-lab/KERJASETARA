import { cookies } from "next/headers";
import type { SeedJob } from "./types";

export const POSTED_COOKIE = "ks_posted";

export async function getPostedJobs(): Promise<SeedJob[]> {
  const raw = (await cookies()).get(POSTED_COOKIE)?.value;
  if (!raw) return [];
  try {
    return JSON.parse(decodeURIComponent(raw)) as SeedJob[];
  } catch {
    return [];
  }
}

export async function addPostedJob(job: SeedJob): Promise<void> {
  const cur = await getPostedJobs();
  (await cookies()).set(POSTED_COOKIE, encodeURIComponent(JSON.stringify([...cur, job])), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
}
