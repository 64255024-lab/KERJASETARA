import seed from "../data/seed.json";
import type { SeedData } from "./types";

let cached: SeedData | null = null;

export function getSeed(): SeedData {
  if (cached) return cached;
  cached = seed as unknown as SeedData;
  return cached;
}

export const ACC_LABEL: Record<string, string> = {
  "kursi-roda": "Ramah kursi roda",
  "isyarat": "Pelatihan isyarat tim",
  "screen-reader": "Kompatibel screen reader",
  "tertulis": "Komunikasi tertulis",
  "remote": "Remote friendly",
  "fleksibel": "Jam fleksibel",
  "mentor": "Mentor pendamping",
  "tenang": "Ruang tenang",
};
