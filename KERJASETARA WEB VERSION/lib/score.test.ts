import { describe, it, expect } from "vitest";
import { scoreCompany } from "./score";
describe("scoreCompany", () => {
  it("returns 4 dimensions and 3 actions", () => {
    const r = scoreCompany(["deskripsi-jelas", "akomodasi-tercantum"], ["kursi-roda", "tertulis"]);
    expect(r.dimensions).toHaveLength(4);
    expect(r.actions).toHaveLength(3);
    expect(r.overall).toBeGreaterThanOrEqual(0);
    expect(r.overall).toBeLessThanOrEqual(100);
  });
});
