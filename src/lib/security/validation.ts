import { z } from "zod";
import { MAX_TURNS } from "@/lib/game/types";
import { isValidScenarioId } from "@/lib/game/scenarios";
import { QUIZ } from "@/lib/game/quiz";

/**
 * Bersihkan username: buang karakter kontrol/HTML, batasi panjang,
 * normalisasi spasi. Mencegah XSS & payload aneh sebelum disimpan.
 */
export function sanitizeUsername(raw: string): string {
  return raw
    .normalize("NFC")
    .replace(/[<>"'`\\]/g, "") // karakter berbahaya untuk HTML/SQL
    .replace(/[\u0000-\u001F\u007F]/g, "") // karakter kontrol
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 24);
}

export const usernameSchema = z
  .string()
  .min(2, "Username minimal 2 karakter")
  .max(24, "Username maksimal 24 karakter")
  .transform(sanitizeUsername)
  .refine((v) => /^[\p{L}\p{N} ._-]{2,24}$/u.test(v), "Username mengandung karakter tidak diizinkan");

export const decisionSchema = z.object({
  scenarioId: z
    .string()
    .max(40)
    .refine(isValidScenarioId, "Skenario tidak dikenal"),
  choice: z.enum(["yes", "no"]),
});

const quizIds = QUIZ.map((q) => q.id) as [string, ...string[]];

export const quizAnswersSchema = z
  .record(z.enum(quizIds), z.number().int().min(0).max(9))
  .refine((obj) => Object.keys(obj).length === QUIZ.length, "Jawaban kuis tidak lengkap");

/** Payload yang dikirim klien saat submit skor. */
export const submitScoreSchema = z.object({
  username: usernameSchema,
  decisions: z.array(decisionSchema).min(1).max(MAX_TURNS),
  preQuiz: quizAnswersSchema,
  postQuiz: quizAnswersSchema,
  sessionToken: z.string().min(10).max(512),
});

export type SubmitScoreInput = z.infer<typeof submitScoreSchema>;
