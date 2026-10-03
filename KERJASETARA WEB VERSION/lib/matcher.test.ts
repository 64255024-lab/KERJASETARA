import { describe, it, expect } from "vitest";
import { matchJob } from "./matcher";
describe("matchJob", () => {
  it("scores Sinta x Operator Sewing >= 80 with sources", () => {
    const r = matchJob(
      { id: "t1", role: "talent", name: "Sinta", email: "s@t.id", city: "Semarang", skills: ["menjahit"], experienceYears: 2, disabilities: ["rungu wicara"], needs: ["tertulis"], category: "Produksi" } as any,
      { id: "j1", title: "Operator Sewing", companyId: "c1", category: "Produksi", location: "Semarang", remote: false, deadline: "2026-11-01", description: "x", criteria: [], accommodations: ["tertulis", "kursi-roda"], skills: ["menjahit"], experienceMin: 1, cover: "" } as any
    );
    expect(r.score).toBeGreaterThanOrEqual(80);
    expect(r.reasons.length).toBeGreaterThanOrEqual(3);
    expect(r.reasons.every((x) => x.source === "profil" || x.source === "loker")).toBe(true);
  });
});
