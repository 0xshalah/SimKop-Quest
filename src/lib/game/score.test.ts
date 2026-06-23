import { describe, it, expect } from "vitest";
import { buildCanonicalRecord } from "./score";
import { scoreQuiz, isValidQuizAnswers } from "./quiz";
import type { Decision } from "./types";

const FULL_CORRECT = { shu: 1, prinsip: 1, simkopdes: 1 };
const ALL_WRONG = { shu: 0, prinsip: 0, simkopdes: 0 };

describe("scoreQuiz", () => {
  it("menghitung jawaban benar", () => {
    expect(scoreQuiz(FULL_CORRECT)).toBe(3);
    expect(scoreQuiz(ALL_WRONG)).toBe(0);
    expect(scoreQuiz({ shu: 1, prinsip: 0, simkopdes: 1 })).toBe(2);
  });
});

describe("isValidQuizAnswers", () => {
  it("menerima jawaban lengkap & valid", () => {
    expect(isValidQuizAnswers(FULL_CORRECT)).toBe(true);
  });
  it("menolak jika tak lengkap", () => {
    expect(isValidQuizAnswers({ shu: 1 })).toBe(false);
  });
  it("menolak index di luar rentang", () => {
    expect(isValidQuizAnswers({ shu: 9, prinsip: 1, simkopdes: 1 })).toBe(false);
  });
});

describe("buildCanonicalRecord", () => {
  const bankrupt: Decision[] = Array.from({ length: 3 }, () => ({ scenarioId: "digitalisasi", choice: "yes" as const }));

  it("menghitung ulang skor & delta literasi dari sumber kebenaran", () => {
    const rec = buildCanonicalRecord({
      username: "Rara",
      decisions: bankrupt,
      preQuiz: ALL_WRONG,
      postQuiz: FULL_CORRECT,
    });
    expect(rec.outcome).toBe("lose_bankrupt");
    expect(rec.preScore).toBe(0);
    expect(rec.postScore).toBe(3);
    expect(rec.literacyDelta).toBe(3);
    expect(rec.username).toBe("Rara");
    expect(rec.kas).toBe(0);
    expect(rec.score).toBeGreaterThanOrEqual(0);
  });

  it("mengabaikan klaim skor klien (tidak ada field skor di input)", () => {
    const rec = buildCanonicalRecord({
      username: "X",
      decisions: bankrupt,
      preQuiz: FULL_CORRECT,
      postQuiz: ALL_WRONG,
    });
    // delta bisa negatif → jujur, bukan dipaksa positif
    expect(rec.literacyDelta).toBe(-3);
  });
});
