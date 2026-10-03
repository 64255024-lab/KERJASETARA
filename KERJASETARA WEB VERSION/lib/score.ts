import type { AccommodationKey } from "./types";
export interface Dimension { name: string; value: number; }
export interface ScoreResult { overall: number; dimensions: Dimension[]; actions: { text: string; href: string }[]; }
const DIMS = ["Akses Fisik", "Komunikasi", "Proses Rekrutmen", "Budaya"];
export function scoreCompany(checklist: string[], acc: AccommodationKey[]): ScoreResult {
  const base = Math.min(40, checklist.length * 8) + Math.min(60, acc.length * 10);
  const overall = Math.min(100, 20 + base);
  const dimensions: Dimension[] = DIMS.map((name, i) => ({ name, value: Math.max(0, Math.min(100, overall + [7, -8, 2, -13][i])) }));
  const actions = [
    { text: "Tambahkan transkrip di video rekrutmen", href: "/company/post-job" },
    { text: "Sediakan opsi interview tertulis", href: "/company/post-job" },
    { text: "Audit jalur evakuasi tiap 6 bulan", href: "/company/post-job" },
  ];
  return { overall, dimensions, actions };
}
