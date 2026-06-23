import { replay } from "./engine";
import { scoreQuiz } from "./quiz";
import type { Decision, GameOutcome } from "./types";

export interface CanonicalRecord {
  username: string;
  score: number;
  outcome: GameOutcome;
  turnsSurvived: number;
  kas: number;
  trust: number;
  shu: number;
  preScore: number;
  postScore: number;
  literacyDelta: number;
}

export interface ScoreInput {
  username: string;
  decisions: readonly Decision[];
  preQuiz: Record<string, number>;
  postQuiz: Record<string, number>;
}

/**
 * Hitung record kanonik dari input yang SUDAH divalidasi skema.
 * Skor & delta literasi dihitung ulang dari sumber kebenaran (replay + quiz),
 * sehingga nilai apa pun yang dikirim klien diabaikan total.
 */
export function buildCanonicalRecord(input: ScoreInput): CanonicalRecord {
  const result = replay(input.decisions); // melempar bila tidak valid
  const preScore = scoreQuiz(input.preQuiz);
  const postScore = scoreQuiz(input.postQuiz);

  return {
    username: input.username,
    score: result.score,
    outcome: result.outcome,
    turnsSurvived: result.turnsSurvived,
    kas: result.metrics.kas,
    trust: result.metrics.trust,
    shu: result.metrics.shu,
    preScore,
    postScore,
    literacyDelta: postScore - preScore,
  };
}
