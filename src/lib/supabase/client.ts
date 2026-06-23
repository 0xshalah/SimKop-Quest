"use client";

import { createBrowserClient } from "@supabase/ssr";
import { requirePublicEnv } from "./env";

/**
 * Klien browser memakai ANON key — aman diekspos karena seluruh tabel
 * dilindungi RLS dan hanya VIEW kurasi yang bisa dibaca.
 */
export function createClient() {
  const { url, anonKey } = requirePublicEnv();
  return createBrowserClient(url, anonKey);
}
