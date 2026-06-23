import {
  type Decision,
  type GameOutcome,
  type GameResult,
  type Metrics,
  type ScenarioEffect,
  MAX_TURNS,
  START_METRICS,
} from "./types";
import { getScenario } from "./scenarios";

/** Batasi nilai metrik ke rentang 0..100. */
export function clamp(value: number, lo = 0, hi = 100): number {
  if (Number.isNaN(value)) return lo;
  return Math.max(lo, Math.min(hi, value));
}

/** Terapkan efek keputusan ke metrik (immutable). */
export function applyEffect(metrics: Metrics, effect: ScenarioEffect): Metrics {
  return {
    kas: clamp(metrics.kas + effect.kas),
    trust: clamp(metrics.trust + effect.trust),
    shu: clamp(metrics.shu + effect.shu),
  };
}

/** Tentukan kondisi akhir berdasarkan metrik & giliran berjalan. */
export function checkOutcome(metrics: Metrics, turnsPlayed: number): GameOutcome {
  if (metrics.kas <= 0) return "lose_bankrupt";
  if (metrics.trust <= 0) return "lose_trust";
  if (turnsPlayed >= MAX_TURNS) return metrics.shu > 0 ? "win" : "lose_shu";
  return "ongoing";
}

/**
 * Skor akhir deterministik. Formula tunggal — klien & server menghitung sama,
 * sehingga skor tidak bisa dimanipulasi dari payload.
 */
export function computeScore(metrics: Metrics, turnsSurvived: number, outcome: GameOutcome): number {
  const base = metrics.shu * 60 + metrics.trust * 30 + metrics.kas * 10;
  const survival = turnsSurvived * 25;
  const winBonus = outcome === "win" ? 1500 : 0;
  return Math.max(0, Math.round(base + survival + winBonus));
}

export const initialState = (): Metrics => ({ ...START_METRICS });

/**
 * Putar ulang seluruh keputusan secara deterministik dan hasilkan GameResult final.
 * Inilah sumber kebenaran skor (server-side). Melempar error bila keputusan tidak valid.
 */
export function replay(decisions: readonly Decision[]): GameResult {
  if (decisions.length === 0 || decisions.length > MAX_TURNS) {
    throw new Error("INVALID_DECISION_COUNT");
  }

  let metrics = initialState();
  let turnsPlayed = 0;
  let outcome: GameOutcome = "ongoing";

  for (const decision of decisions) {
    const scenario = getScenario(decision.scenarioId);
    if (!scenario) throw new Error("UNKNOWN_SCENARIO");
    if (decision.choice !== "yes" && decision.choice !== "no") {
      throw new Error("INVALID_CHOICE");
    }

    metrics = applyEffect(metrics, scenario[decision.choice]);
    turnsPlayed += 1;
    outcome = checkOutcome(metrics, turnsPlayed);
    if (outcome !== "ongoing") break;
  }

  // Game wajib selesai: menang/kalah. Tidak boleh "ongoing" saat submit.
  if (outcome === "ongoing") throw new Error("GAME_NOT_FINISHED");

  return {
    outcome,
    metrics,
    turnsSurvived: turnsPlayed,
    score: computeScore(metrics, turnsPlayed, outcome),
  };
}
