"use client";

import { useMemo, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { SCENARIOS } from "@/lib/game/scenarios";
import { QUIZ, scoreQuiz } from "@/lib/game/quiz";
import { applyEffect, checkOutcome, initialState } from "@/lib/game/engine";
import type { Decision, Metrics } from "@/lib/game/types";
import { startSession, submitScore } from "@/app/actions/game";

type Phase = "name" | "prequiz" | "game" | "postquiz" | "submitting" | "result";

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

const OUTCOME_META: Record<string, { emoji: string; title: string; msg: string }> = {
  win: { emoji: "🏆", title: "Tahun Fiskal Sukses!", msg: "SHU positif. Kamu pemimpin koperasi andal." },
  lose_bankrupt: { emoji: "💸", title: "Bangkrut!", msg: "Kas koperasi habis. Anggota kehilangan modal." },
  lose_trust: { emoji: "🚪", title: "Anggota Walkout", msg: "Kepercayaan habis — anggota keluar." },
  lose_shu: { emoji: "📉", title: "Bertahan Tapi Merugi", msg: "Selamat 20 giliran, tapi SHU negatif." },
};

export default function GameDemo() {
  const [phase, setPhase] = useState<Phase>("name");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [metrics, setMetrics] = useState<Metrics>(initialState());
  const [turn, setTurn] = useState(1);
  const [order, setOrder] = useState<number[]>(() => shuffle(SCENARIOS.map((_, i) => i)));
  const [idx, setIdx] = useState(0);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [preAns, setPreAns] = useState<Record<string, number>>({});
  const [postAns, setPostAns] = useState<Record<string, number>>({});
  const [outcome, setOutcome] = useState<string>("");
  const [serverMsg, setServerMsg] = useState<string>("");
  const [result, setResult] = useState<{ score: number; literacyDelta: number } | null>(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-14, 14]);
  const yesOpacity = useTransform(x, [20, 120], [0, 1]);
  const noOpacity = useTransform(x, [-120, -20], [1, 0]);

  const scenario = useMemo(() => SCENARIOS[order[idx % order.length]!]!, [order, idx]);
  const preScore = useMemo(() => scoreQuiz(preAns), [preAns]);

  async function beginGame() {
    const clean = username.trim();
    if (clean.length < 2) return;
    try {
      const { token } = await startSession();
      setToken(token);
    } catch {
      setServerMsg("Backend belum dikonfigurasi — mode demo lokal.");
    }
    setPhase("prequiz");
  }

  function answerQuiz(optionIndex: number) {
    const q = QUIZ[quizIdx]!;
    if (phase === "prequiz") {
      const next = { ...preAns, [q.id]: optionIndex };
      setPreAns(next);
      if (quizIdx < QUIZ.length - 1) setQuizIdx(quizIdx + 1);
      else { setQuizIdx(0); setPhase("game"); }
    } else {
      const next = { ...postAns, [q.id]: optionIndex };
      setPostAns(next);
      if (quizIdx < QUIZ.length - 1) setQuizIdx(quizIdx + 1);
      else finalize(next);
    }
  }

  function decide(choice: "yes" | "no") {
    if (phase !== "game") return;
    const newDecisions = [...decisions, { scenarioId: scenario.id, choice }];
    const m = applyEffect(metrics, scenario[choice]);
    const turnsPlayed = turn;
    const out = checkOutcome(m, turnsPlayed);
    setMetrics(m);
    setDecisions(newDecisions);
    x.set(0);

    if (out !== "ongoing") {
      setOutcome(out);
      setQuizIdx(0);
      setPhase("postquiz");
      return;
    }
    setTurn(turnsPlayed + 1);
    setIdx(idx + 1);
  }

  async function finalize(finalPost: Record<string, number>) {
    setPhase("submitting");
    if (!token) { // mode demo lokal tanpa backend
      setResult({ score: 0, literacyDelta: scoreQuiz(finalPost) - preScore });
      setPhase("result");
      return;
    }
    const res = await submitScore({
      username, decisions, preQuiz: preAns, postQuiz: finalPost, sessionToken: token,
    });
    if (res.ok && res.record) {
      setResult({ score: res.record.score, literacyDelta: res.record.literacyDelta });
    } else {
      setServerMsg(res.error ?? "Gagal mengirim skor.");
      setResult({ score: 0, literacyDelta: scoreQuiz(finalPost) - preScore });
    }
    setPhase("result");
  }

  function restart() {
    setPhase("name"); setMetrics(initialState()); setTurn(1); setIdx(0);
    setOrder(shuffle(SCENARIOS.map((_, i) => i))); setDecisions([]);
    setQuizIdx(0); setPreAns({}); setPostAns({}); setOutcome(""); setResult(null); setServerMsg("");
  }

  function onDragEnd() {
    if (Math.abs(x.get()) > 90) {
      const choice = x.get() > 0 ? "yes" : "no";
      animate(x, x.get() > 0 ? 480 : -480, { duration: 0.3 });
      setTimeout(() => decide(choice), 120);
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  }

  const pct = (n: number) => `${Math.max(0, Math.min(100, n))}%`;
  const q = QUIZ[quizIdx];

  return (
    <div className="hero-demo" id="demo">
      <div className="device">
        <div className="device-header">
          <span>🪙 Koperasi Desa Fiktif</span>
          <span className="d-turn">Giliran <b>{Math.min(turn, 20)}</b>/20</span>
        </div>
        <div className="meters">
          <div className="meter"><span>💰 Kas</span><div className="bar kas"><i style={{ width: pct(metrics.kas) }} /></div><span className="pct">{metrics.kas}%</span></div>
          <div className="meter"><span>🤝 Kepercayaan</span><div className="bar trust"><i style={{ width: pct(metrics.trust) }} /></div><span className="pct">{metrics.trust}%</span></div>
          <div className="meter"><span>📈 SHU</span><div className="bar shu"><i style={{ width: pct(metrics.shu) }} /></div><span className="pct">{metrics.shu}%</span></div>
        </div>

        <div className="deck">
          {phase === "name" && (
            <div className="scard endcard">
              <div className="s-emoji">🪙</div>
              <h4>Mulai jadi Ketua Koperasi</h4>
              <p style={{ flex: "none" }}>Masukkan username untuk memulai sesi.</p>
              <input className="field" maxLength={24} placeholder="Username kamu"
                value={username} onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && beginGame()} aria-label="Username" />
              <button className="btn btn-primary" style={{ marginTop: 10 }} disabled={username.trim().length < 2} onClick={beginGame}>Mulai 🎮</button>
            </div>
          )}

          {(phase === "prequiz" || phase === "postquiz") && q && (
            <div className="scard">
              <span className="s-tag">{phase === "prequiz" ? "📝 Quiz Pra-Game" : "🎓 Quiz Pasca-Game"} ({quizIdx + 1}/{QUIZ.length})</span>
              <p className="quiz-q">{q.q}</p>
              <div className="quiz-opts">
                {q.opts.map((o, i) => (
                  <button key={i} className="quiz-opt" onClick={() => answerQuiz(i)}>{o}</button>
                ))}
              </div>
            </div>
          )}

          {phase === "game" && (
            <motion.div className="scard" style={{ x, rotate }} drag="x"
              dragConstraints={{ left: 0, right: 0 }} onDragEnd={onDragEnd}>
              <motion.span className="s-tag" style={{ position: "absolute", right: 16, top: 16, color: "var(--green)", opacity: yesOpacity }}>SETUJU</motion.span>
              <motion.span className="s-tag" style={{ position: "absolute", left: 16, top: 16, color: "var(--red)", opacity: noOpacity }}>TOLAK</motion.span>
              <span className="s-tag">{scenario.tag}</span>
              <div className="s-emoji">{scenario.emoji}</div>
              <h4>{scenario.title}</h4>
              <p>{scenario.text}</p>
              <div className="s-tip">💡 {scenario.tip}</div>
            </motion.div>
          )}

          {(phase === "submitting" || phase === "result") && (
            <div className="scard endcard">
              <div className="s-emoji">{OUTCOME_META[outcome]?.emoji ?? "⏳"}</div>
              <h4>{phase === "submitting" ? "Menyimpan skor…" : OUTCOME_META[outcome]?.title}</h4>
              <p style={{ flex: "none" }}>{OUTCOME_META[outcome]?.msg}</p>
              {result && (
                <div className="litbar">
                  Skor: <b>{result.score.toLocaleString("id-ID")}</b> · Delta literasi:{" "}
                  <b style={{ color: result.literacyDelta >= 0 ? "var(--green)" : "var(--red)" }}>
                    {result.literacyDelta >= 0 ? "+" : ""}{result.literacyDelta} poin
                  </b>
                </div>
              )}
              {phase === "result" && <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={restart}>🔄 Main Lagi</button>}
            </div>
          )}
        </div>

        <div className="controls">
          <button className="ctrl no" disabled={phase !== "game"} onClick={() => decide("no")}>✕ Tolak</button>
          <button className="ctrl yes" disabled={phase !== "game"} onClick={() => decide("yes")}>✓ Setuju</button>
        </div>

        {(phase === "game" || phase === "result") && (
          <div className="litbar" aria-live="polite">
            {phase === "game" ? `📊 Literasi awal: ${preScore}/3 — buktikan kamu bisa naik!` : serverMsg || "🎓 Sesi selesai!"}
          </div>
        )}
      </div>
      <p style={{ color: "var(--muted)", fontSize: ".78rem", marginTop: 12 }}>Demo full-stack · skor divalidasi server</p>
    </div>
  );
}
