import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KerjaSetara — Cari lowongan sesuai keunikanmu",
  description: "Jaringan karir inklusif untuk pekerja dengan disabilitas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
