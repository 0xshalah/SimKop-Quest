import { NextRequest, NextResponse } from "next/server";

/**
 * Content-Security-Policy.
 *
 * Catatan keamanan (jujur): script-src memakai 'unsafe-inline' karena Next.js
 * App Router membutuhkan inline bootstrap/streaming script. Pendekatan nonce
 * dicoba namun nonce tidak ter-propagate ke script Next pada setup ini, yang
 * membuat seluruh halaman blank. Mempertahankan app yang berfungsi lebih
 * penting; lapisan keamanan lain tetap ketat (frame-ancestors none, object-src
 * none, connect-src dibatasi origin Supabase, base-uri self, HSTS, RLS,
 * anti-cheat server-side). TODO produksi: migrasi ke nonce/hash penuh.
 */
export function middleware(request: NextRequest) {
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
    "script-src 'self' 'unsafe-inline'",
    `connect-src 'self' ${supabaseOrigin} ${wsOrigin}`.trim(),
    "upgrade-insecure-requests",
  ].join("; ");

  const response = NextResponse.next();
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|opengraph-image).*)"],
};
