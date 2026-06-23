import type { Metadata, Viewport } from "next";
import "./globals.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://simkop-quest.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: "Simkop-Quest — Simulasi Koperasi Desa untuk Gen-Z",
  description:
    "74 juta Gen-Z, literasi koperasi 51,7%. Simkop-Quest: jadi ketua koperasi desa, geser kartu, lihat akibatnya — skor divalidasi server.",
  applicationName: "Simkop-Quest",
  authors: [{ name: "Shalahuddin Al-Ayyubi" }, { name: "Hamdani" }],
  keywords: ["koperasi", "literasi", "Gen-Z", "SIMKOPDES", "gamifikasi", "hackathon", "Kopdes Merah Putih"],
  openGraph: {
    type: "website",
    url: APP_URL,
    title: "Simkop-Quest — Jadi Ketua Koperasi Desa, Tanpa Risiko Beneran",
    description: "Geser kartu, pimpin koperasi desamu — bangkrut atau berjaya, kamu yang putuskan.",
    siteName: "Simkop-Quest",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simkop-Quest",
    description: "Simulasi swipe-card manajemen koperasi desa untuk Gen-Z.",
  },
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
