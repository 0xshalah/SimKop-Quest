/** Akses variabel lingkungan dengan validasi tegas (fail-fast). */

export function requirePublicEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Supabase public env belum diset (NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY).");
  }
  return { url, anonKey };
}

/** Hanya boleh dipanggil di server. Service role melewati RLS. */
export function requireServiceEnv() {
  if (typeof window !== "undefined") {
    throw new Error("Service-role key tidak boleh diakses di browser.");
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Supabase service env belum diset (SUPABASE_SERVICE_ROLE_KEY).");
  }
  return { url, serviceKey };
}

export function requireSessionSecret(): string {
  const secret = process.env.GAME_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("GAME_SESSION_SECRET belum diset / terlalu pendek.");
  }
  return secret;
}
