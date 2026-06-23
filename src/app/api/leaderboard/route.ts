import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requirePublicEnv } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/** Baca papan peringkat dari VIEW aman (kolom sensitif tidak ikut). */
export async function GET() {
  const { url, anonKey } = requirePublicEnv();
  const supabase = createClient(url, anonKey, { auth: { persistSession: false } });

  const { data, error } = await supabase
    .from("leaderboard")
    .select("username, score, outcome, literacy_delta, turns_survived, created_at")
    .order("score", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: "Gagal memuat leaderboard." }, { status: 500 });
  }
  return NextResponse.json(
    { data },
    { headers: { "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30" } },
  );
}
