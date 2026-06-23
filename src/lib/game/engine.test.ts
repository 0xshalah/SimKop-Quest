import { describe, it, expect } from "vitest";
import { clamp, applyEffect, checkOutcome, computeScore, replay, initialState } from "./engine";
import type { Decision, Metrics } from "./types";

describe("clamp", () => {
  it("membatasi atas & bawah", () => {
    expect(clamp(150)).toBe(100);
    expect(clamp(-5)).toBe(0);
    expect(clamp(50)).toBe(50);
  });
  it("menangani NaN menjadi batas bawah", () => {
    expect(clamp(Number.NaN)).toBe(0);
  });
  it("menghormati rentang kustom", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(20, 0, 10)).toBe(10);
  });
});

describe("applyEffect", () => {
  it("immutable & ter-clamp", () => {
    const base: Metrics = { kas: 50, trust: 50, shu: 0 };
    const next = applyEffect(base, { kas: -60, trust: 10, shu: 5 });
    expect(next).toEqual({ kas: 0, trust: 60, shu: 5 });
    expect(base).toEqual({ kas: 50, trust: 50, shu: 0 }); // tak berubah
  });
});

describe("checkOutcome", () => {
  it("bangkrut bila kas habis", () => {
    expect(checkOutcome({ kas: 0, trust: 50, shu: 10 }, 5)).toBe("lose_bankrupt");
  });
  it("walkout bila trust habis", () => {
    expect(checkOutcome({ kas: 50, trust: 0, shu: 10 }, 5)).toBe("lose_trust");
  });
  it("menang bila bertahan 20 giliran + SHU positif", () => {
    expect(checkOutcome({ kas: 40, trust: 40, shu: 10 }, 20)).toBe("win");
  });
  it("kalah SHU bila bertahan tapi SHU nol", () => {
    expect(checkOutcome({ kas: 40, trust: 40, shu: 0 }, 20)).toBe("lose_shu");
  });
  it("ongoing di tengah permainan", () => {
    expect(checkOutcome({ kas: 40, trust: 40, shu: 10 }, 5)).toBe("ongoing");
  });
});

describe("computeScore", () => {
  it("formula deterministik tanpa bonus", () => {
    expect(computeScore({ kas: 10, trust: 20, shu: 30 }, 5, "lose_shu")).toBe(2625);
  });
  it("menambahkan bonus kemenangan", () => {
    expect(computeScore({ kas: 10, trust: 20, shu: 30 }, 5, "win")).toBe(4125);
  });
  it("tidak pernah negatif", () => {
    expect(computeScore({ kas: 0, trust: 0, shu: 0 }, 0, "lose_bankrupt")).toBe(0);
  });
});

describe("replay (anti-cheat core)", () => {
  it("menolak log kosong", () => {
    expect(() => replay([])).toThrow("INVALID_DECISION_COUNT");
  });
  it("menolak log melebihi MAX_TURNS", () => {
    const many: Decision[] = Array.from({ length: 21 }, () => ({ scenarioId: "gratifikasi", choice: "no" }));
    expect(() => replay(many)).toThrow("INVALID_DECISION_COUNT");
  });
  it("menolak skenario tak dikenal", () => {
    expect(() => replay([{ scenarioId: "hack", choice: "yes" }])).toThrow("UNKNOWN_SCENARIO");
  });
  it("menolak pilihan tidak valid", () => {
    expect(() => replay([{ scenarioId: "gratifikasi", choice: "maybe" as never }])).toThrow("INVALID_CHOICE");
  });
  it("menolak game yang belum selesai", () => {
    expect(() => replay([{ scenarioId: "audit-terbuka", choice: "no" }])).toThrow("GAME_NOT_FINISHED");
  });
  it("mendeteksi kebangkrutan", () => {
    const d: Decision[] = Array.from({ length: 3 }, () => ({ scenarioId: "digitalisasi", choice: "yes" }));
    const r = replay(d);
    expect(r.outcome).toBe("lose_bankrupt");
    expect(r.metrics.kas).toBe(0);
    expect(r.turnsSurvived).toBe(3);
  });
  it("mendeteksi walkout anggota", () => {
    const d: Decision[] = Array.from({ length: 2 }, () => ({ scenarioId: "gratifikasi", choice: "yes" }));
    const r = replay(d);
    expect(r.outcome).toBe("lose_trust");
    expect(r.metrics.trust).toBe(0);
  });
  it("mengakui kemenangan 20 giliran dengan SHU positif", () => {
    const pair: Decision[] = [
      { scenarioId: "tunggakan", choice: "no" },
      { scenarioId: "gratifikasi", choice: "no" },
    ];
    const d: Decision[] = Array.from({ length: 10 }, () => pair).flat();
    const r = replay(d);
    expect(r.outcome).toBe("win");
    expect(r.turnsSurvived).toBe(20);
    expect(r.metrics.shu).toBeGreaterThan(0);
    expect(r.score).toBeGreaterThan(1500); // termasuk win bonus
  });
});

describe("initialState", () => {
  it("memberi salinan baru tiap panggilan", () => {
    const a = initialState();
    const b = initialState();
    expect(a).toEqual({ kas: 50, trust: 50, shu: 0 });
    expect(a).not.toBe(b);
  });
});
