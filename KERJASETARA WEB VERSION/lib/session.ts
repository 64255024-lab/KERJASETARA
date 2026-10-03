import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import { getSeed } from "./data";
import type { SeedProfile } from "./types";

export const SESSION_COOKIE = "ks_session";
export const DRAFT_COOKIE = "ks_draft";

const secret = process.env.SESSION_SECRET ?? "dev-secret";

function sign(v: string): string {
  return createHmac("sha256", secret).update(v).digest("hex");
}

function valid(role: string, sig: string): boolean {
  const expected = sign(role);
  if (sig.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function setSession(role: "talent" | "company"): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, `${role}.${sign(role)}`, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export interface Session {
  role: "talent" | "company";
  profile: SeedProfile;
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  const [role, sig] = raw.split(".");
  if ((role !== "talent" && role !== "company") || !sig || !valid(role, sig)) return null;
  const seed = getSeed();
  return { role, profile: role === "talent" ? seed.demoTalent : seed.demoCompany };
}

export interface DraftProfile {
  name?: string;
  city?: string;
  category?: string;
  skills?: string[];
  experienceYears?: number;
  disabilities?: string[];
  needs?: string[];
  role?: "talent" | "company";
}

export async function getDraft(): Promise<DraftProfile | null> {
  const store = await cookies();
  const raw = store.get(DRAFT_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw)) as DraftProfile;
  } catch {
    return null;
  }
}

export async function setDraft(draft: DraftProfile): Promise<void> {
  const store = await cookies();
  store.set(DRAFT_COOKIE, encodeURIComponent(JSON.stringify(draft)), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearDraft(): Promise<void> {
  const store = await cookies();
  store.delete(DRAFT_COOKIE);
}
