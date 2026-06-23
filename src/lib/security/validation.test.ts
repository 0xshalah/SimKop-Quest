import { describe, it, expect } from "vitest";
import { sanitizeUsername, usernameSchema, submitScoreSchema } from "./validation";
import { createSessionToken } from "./session";
import type { Decision } from "@/lib/game/types";

describe("sanitizeUsername", () => {
  it("membuang karakter HTML/berbahaya", () => {
    expect(sanitizeUsername('<script>alert(1)</script>')).not.toContain("<");
    expect(sanitizeUsername('a"b\'c`d\\e')).toBe("abcde");
  });
  it("membuang karakter kontrol & merapikan spasi", () => {
    expect(sanitizeUsername("ra\u0000ra   x")).toBe("rara x");
  });
  it("membatasi panjang 24 karakter", () => {
    expect(sanitizeUsername("a".repeat(50)).length).toBe(24);
  });
});

describe("usernameSchema", () => {
  it("menerima username valid", () => {
    expect(usernameSchema.parse("Rara_01")).toBe("Rara_01");
  });
  it("menolak terlalu pendek setelah sanitasi", () => {
    expect(() => usernameSchema.parse("<<")).toThrow();
  });
  it("menolak karakter tak diizinkan", () => {
    expect(() => usernameSchema.parse("ra*ra!!")).toThrow();
  });
});

describe("submitScoreSchema", () => {
  const validDecisions: Decision[] = Array.from({ length: 3 }, () => ({ scenarioId: "digitalisasi", choice: "yes" as const }));
  const quiz = { shu: 1, prinsip: 1, simkopdes: 1 };
  const base = {
    username: "Pemain",
    decisions: validDecisions,
    preQuiz: quiz,
    postQuiz: quiz,
    sessionToken: createSessionToken("test-secret-1234567890"),
  };

  it("menerima payload valid", () => {
    expect(submitScoreSchema.safeParse(base).success).toBe(true);
  });
  it("menolak scenarioId palsu", () => {
    const bad = { ...base, decisions: [{ scenarioId: "evil", choice: "yes" }] };
    expect(submitScoreSchema.safeParse(bad).success).toBe(false);
  });
  it("menolak decisions kosong", () => {
    expect(submitScoreSchema.safeParse({ ...base, decisions: [] }).success).toBe(false);
  });
  it("menolak decisions melebihi 20", () => {
    const many = Array.from({ length: 21 }, () => ({ scenarioId: "gratifikasi", choice: "no" }));
    expect(submitScoreSchema.safeParse({ ...base, decisions: many }).success).toBe(false);
  });
  it("menolak kuis tidak lengkap", () => {
    expect(submitScoreSchema.safeParse({ ...base, preQuiz: { shu: 1 } }).success).toBe(false);
  });
  it("menolak sessionToken terlalu pendek", () => {
    expect(submitScoreSchema.safeParse({ ...base, sessionToken: "x" }).success).toBe(false);
  });
});
