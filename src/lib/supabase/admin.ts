import "server-only";
import { createClient } from "@supabase/supabase-js";
import { requireServiceEnv } from "./env";

/**
 * Klien service-role — MELEWATI RLS. WAJIB:
 *  - hanya dipanggil di server (Server Action / Route Handler),
 *  - hanya setelah seluruh validasi + replay skor lulus.
 * Modul "server-only" memastikan ini gagal di-bundle ke klien.
 */
export function createAdminClient() {
  const { url, serviceKey } = requireServiceEnv();
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
