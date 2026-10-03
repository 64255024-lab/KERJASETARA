import type { SeedJob, SeedProfile } from "./types";
export interface MatchReason { text: string; source: "profil" | "loker"; }
export interface MatchGap { skill: string; hint: string; }
export interface MatchResult { score: number; reasons: MatchReason[]; gaps: MatchGap[]; }
export function matchJob(p: SeedProfile, j: SeedJob): MatchResult {
  const reasons: MatchReason[] = []; const gaps: MatchGap[] = []; let s = 0;
  if (p.category === j.category) { s += 30; reasons.push({ text: `Kategori ${j.category} sesuai`, source: "profil" }); }
  const have = new Set(p.skills.map((x) => x.toLowerCase()));
  const need = j.skills.map((x) => x.toLowerCase());
  const hit = need.filter((x) => have.has(x));
  s += Math.round((need.length ? hit.length / need.length : 1) * 20);
  if (hit.length) reasons.push({ text: `${hit.length} skill cocok (${hit.join(", ")})`, source: "profil" });
  need.filter((x) => !have.has(x)).forEach((x) => gaps.push({ skill: x, hint: "Lengkapi via wizard profil" }));
  if (p.city.toLowerCase() === j.location.toLowerCase() || j.remote) { s += 20; reasons.push({ text: j.remote ? "Bisa remote" : `Lokasi ${j.location} sesuai`, source: "loker" }); }
  const met = j.accommodations.filter((a) => p.needs.includes(a));
  s += Math.round((j.accommodations.length ? met.length / j.accommodations.length : 1) * 15);
  if (met.length) reasons.push({ text: `Akomodasi tersedia: ${met.join(", ")}`, source: "loker" });
  if (p.experienceYears >= j.experienceMin) { s += 10; reasons.push({ text: `Pengalaman ${p.experienceYears} thn memenuhi syarat ${j.experienceMin} thn`, source: "profil" }); }
  s += 5; // keahlian dasar
  return { score: Math.min(100, s), reasons, gaps };
}
