import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simkop-Quest — Simulasi Koperasi Desa untuk Gen-Z",
  description:
    "74 juta Gen-Z Indonesia, literasi koperasi masih 51,7%. Simkop-Quest mengubahnya lewat simulasi swipe-card berbasis keputusan nyata.",
  applicationName: "Simkop-Quest",
  authors: [{ name: "Tim Simkop-Quest" }],
  keywords: ["koperasi", "literasi", "Gen-Z", "SIMKOPDES", "gamifikasi", "hackathon"],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060b18",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
