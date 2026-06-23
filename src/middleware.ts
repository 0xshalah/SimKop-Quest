import { NextRequest, NextResponse } from "next/server";

/**
 * CSP berbasis nonce per-request. Next.js App Router otomatis menyuntikkan
 * nonce ke script bootstrap-nya saat mendeteksi nonce di header CSP request,
 * sehingga hydration jalan TANPA 'unsafe-inline' (tetap aman dari XSS inline).
 */
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseOrigin = supabaseUrl ? new URL(supabaseUrl).origin : "";
  const wsOrigin = supabaseOrigin.replace("https://", "wss://");

  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    `script-src 'self' 'nonce-${nonce}'`,
    `connect-src 'self' ${supabaseOrigin} ${wsOrigin}`.trim(),
    "upgrade-insecure-requests",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    // Terapkan ke semua route kecuali aset statis & gambar OG (yang tak butuh CSP nonce).
    {
      source: "/((?!_next/static|_next/image|favicon.ico|opengraph-image).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
