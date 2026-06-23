"use server";

import { headers } from "next/headers";
import { createSessionToken, verifySessionToken } from "@/lib/security/session";
import { submitScoreSchema } from "@/lib/security/validation";
import { submitScoreLimiter } from "@/lib/security/ratelimit";
import { buildCanonicalRecord } from "@/lib/game/score";
import { requireSessionSecret } from "@/lib/supabase/env";
import { createAdminClient } from "@/lib/supabase/admin";

export interface SubmitResult {
  ok: boolean;
  error?: string;
  record?: { score: number; outcome: string; literacyDelta: number };
}

/** Terbitkan token sesi bertanda tangan saat pemain memulai game. */
export async function startSession(): Promise<{ token: string }> {
  const secret = requireSessionSecret();
  return { token: createSessionToken(secret) };
}

async function clientIp(): Promise<string> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? h.get("x-real-ip") ?? "unknown").trim();
}

/**
 * Submit skor dengan pertahanan berlapis:
 *  1) Rate limit per-IP.
 *  2) Validasi skema (Zod) + sanitasi.
 *  3) Verifikasi token sesi (HMAC + TTL).
 *  4) Replay deterministik → skor & metrik dihitung ULANG di server.
 *  5) Insert via service-role; session_id unik mencegah submit ganda.
 * Klaim skor dari klien diabaikan total.
 */
export async function submitScore(payload: unknown): Promise<SubmitResult> {
  const ip = await clientIp();
  if (!submitScoreLimiter.check(`submit:${ip}`).allowed) {
    return { ok: false, error: "Terlalu banyak percobaan. Coba lagi sebentar." };
  }

  const parsed = submitScoreSchema.safeParse(payload);
  if (!parsed.success) return { ok: false, error: "Data tidak valid." };

  const secret = requireSessionSecret();
  const session = verifySessionToken(parsed.data.sessionToken, secret);
  if (!session) return { ok: false, error: "Sesi tidak valid atau kedaluwarsa." };

  let record;
  try {
    record = buildCanonicalRecord({
      username: parsed.data.username,
      decisions: parsed.data.decisions,
      preQuiz: parsed.data.preQuiz,
      postQuiz: parsed.data.postQuiz,
    });
  } catch {
    return { ok: false, error: "Riwayat permainan tidak konsisten." };
  }

  const supabase = createAdminClient();

  // Langkah 1: klaim session_id (dedup). Unik → satu sesi hanya sekali submit.
  const claim = await supabase.from("game_submissions").insert({ session_id: session.sid });
  if (claim.error) {
    if (claim.error.code === "23505") return { ok: false, error: "Sesi ini sudah mengirim skor." };
    return { ok: false, error: "Gagal memvalidasi sesi." };
  }

  // Langkah 2: simpan baris leaderboard (hanya kolom aman).
  const { error } = await supabase.from("leaderboard").insert({
    username: record.username,
    score: record.score,
    outcome: record.outcome,
    turns_survived: record.turnsSurvived,
    kas: record.kas,
    trust: record.trust,
    shu: record.shu,
    pre_score: record.preScore,
    post_score: record.postScore,
    literacy_delta: record.literacyDelta,
  });

  if (error) return { ok: false, error: "Gagal menyimpan skor." };

  return {
    ok: true,
    record: { score: record.score, outcome: record.outcome, literacyDelta: record.literacyDelta },
  };
}
