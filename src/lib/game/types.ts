// Domain types — dipakai bersama oleh klien & server.

export interface Metrics {
  /** Likuiditas koperasi (0-100). Habis = bangkrut. */
  kas: number;
  /** Reputasi & transparansi (0-100). Habis = anggota walkout. */
  trust: number;
  /** Proyeksi Sisa Hasil Usaha (0-100). */
  shu: number;
}

export type Choice = "yes" | "no";

export interface ScenarioEffect {
  kas: number;
  trust: number;
  shu: number;
}

export interface Scenario {
  id: string;
  tag: string;
  emoji: string;
  title: string;
  text: string;
  tip: string;
  yes: ScenarioEffect;
  no: ScenarioEffect;
}

/** Satu langkah keputusan pemain — direkam untuk validasi server-side. */
export interface Decision {
  /** id skenario yang dihadapi pada giliran ini. */
  scenarioId: string;
  /** pilihan pemain. */
  choice: Choice;
}

export type GameOutcome = "win" | "lose_bankrupt" | "lose_trust" | "lose_shu" | "ongoing";

export interface GameResult {
  outcome: GameOutcome;
  metrics: Metrics;
  turnsSurvived: number;
  /** Skor akhir terkalkulasi (deterministik). */
  score: number;
}

export const MAX_TURNS = 20;
export const START_METRICS: Readonly<Metrics> = Object.freeze({ kas: 50, trust: 50, shu: 0 });
