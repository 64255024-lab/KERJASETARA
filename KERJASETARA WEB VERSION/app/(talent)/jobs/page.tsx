"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import JobCard from "../../../components/JobCard";
import { getSeed, ACC_LABEL } from "../../../lib/data";

const ALL_ACC = Object.keys(ACC_LABEL);

export default function JobsPage({ searchParams }: { searchParams: { q?: string } }) {
  const seed = getSeed();
  const companies = new Map(seed.companies.map((c) => [c.id, c]));
  const [q, setQ] = useState(searchParams.q ?? "");
  const [acc, setAcc] = useState<string[]>([]);
  const [cats, setCats] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const categories = useMemo(() => [...new Set(seed.jobs.map((j) => j.category))], [seed.jobs]);
  const locations = useMemo(() => [...new Set(seed.jobs.map((j) => j.location))], [seed.jobs]);

  const toggle = (list: string[], v: string, set: (x: string[]) => void) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const filtered = seed.jobs.filter((j) => {
    const hay = `${j.title} ${companies.get(j.companyId)?.name ?? ""} ${j.location}`.toLowerCase();
    if (q && !hay.includes(q.toLowerCase())) return false;
    if (acc.length && !acc.some((a) => j.accommodations.includes(a as never))) return false;
    if (cats.length && !cats.includes(j.category)) return false;
    if (cities.length && !cities.includes(j.location)) return false;
    return true;
  });

  return (
    <>
      <Nav />
      <div className="hero" style={{ padding: "48px 64px" }}>
        <p className="chip">Lowongan terbuka</p>
        <h1 style={{ fontSize: 40, margin: "16px 0 8px" }}>Cari lowongan yang pas untukmu</h1>
        <p className="sub">Filter berdasarkan akomodasi — bukan label disabilitas. Publik hanya lihat kategori + fasilitas.</p>
        <div className="searchbar" style={{ margin: "24px 0", maxWidth: 720 }}>
          <input placeholder="Cari posisi, perusahaan, atau kota…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 32, padding: "32px 64px" }}>
        <div className="card" style={{ width: 300, alignSelf: "start", position: "sticky", top: 96 }}>
          <h3 style={{ marginTop: 0 }}>Filter</h3>
          <p><b>Aksesibilitas</b></p>
          {ALL_ACC.map((a) => (
            <p key={a} style={{ margin: "6px 0" }}>
              <label><input type="checkbox" checked={acc.includes(a)} onChange={() => toggle(acc, a, setAcc)} /> {ACC_LABEL[a]}</label>
            </p>
          ))}
          <p><b>Kota</b></p>
          {locations.map((c) => (
            <p key={c} style={{ margin: "6px 0" }}>
              <label><input type="checkbox" checked={cities.includes(c)} onChange={() => toggle(cities, c, setCities)} /> {c}</label>
            </p>
          ))}
          <p><b>Kategori</b></p>
          {categories.map((c) => (
            <p key={c} style={{ margin: "6px 0" }}>
              <label><input type="checkbox" checked={cats.includes(c)} onChange={() => toggle(cats, c, setCats)} /> {c}</label>
            </p>
          ))}
          <div className="card" style={{ background: "var(--primary-soft)", border: "none" }}>
            <b>Cocok untukku?</b>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>Daftar &amp; isi profil sekali — filter ini jadi otomatis + skor AI.</p>
            <p><Link className="btn" href="/register">Daftar gratis</Link></p>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0 }}>Lowongan terbuka</h2>
            <p style={{ color: "var(--muted)" }}>{filtered.length} hasil</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 16 }}>
            {filtered.map((j) => (
              <JobCard key={j.id} job={j} companyName={companies.get(j.companyId)?.name ?? ""} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="card" style={{ marginTop: 24 }}>
              <b>Tidak ketemu yang pas?</b>
              <p style={{ color: "var(--muted)" }}>Longgarkan filter — atau daftar agar AI mencocokkan otomatis + notifikasi harian.</p>
              <p><Link className="btn" href="/register">Daftar &amp; auto-match</Link></p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
