"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Row {
  username: string;
  score: number;
  outcome: string;
  literacy_delta: number;
  turns_survived: number;
  created_at: string;
}

const MEDAL = ["🥇", "🥈", "🥉"];

export default function Leaderboard() {
  const [rows, setRows] = useState<Row[]>([]);
  const [live, setLive] = useState(false);
  const newest = useRef<string | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((j) => { if (active && Array.isArray(j.data)) setRows(j.data); })
      .catch(() => {});

    // Realtime: subscribe INSERT pada tabel aman.
    let supabase: ReturnType<typeof createClient> | null = null;
    try {
      supabase = createClient();
    } catch {
      return () => { active = false; };
    }

    const channel = supabase
      .channel("leaderboard-live")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "leaderboard" }, (payload) => {
        const row = payload.new as Row;
        newest.current = row.username + row.created_at;
        setRows((prev) =>
          [row, ...prev].sort((a, b) => b.score - a.score).slice(0, 20),
        );
      })
      .subscribe((status) => setLive(status === "SUBSCRIBED"));

    return () => {
      active = false;
      supabase?.removeChannel(channel);
    };
  }, []);

  return (
    <section className="section" id="board">
      <div className="wrap">
        <div className="head">
          <span className="kicker">Papan Peringkat</span>
          <h2>Ketua koperasi paling kompeten</h2>
          <p style={{ color: "var(--muted)", marginTop: 10 }}>
            {live ? <span><span className="live-dot" /> Live realtime aktif</span> : "Memuat data…"}
          </p>
        </div>
        <table className="board">
          <thead>
            <tr><th>#</th><th>Username</th><th>Hasil</th><th>Δ Literasi</th><th>Skor</th></tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: "center", color: "var(--muted)" }}>Belum ada skor. Jadilah yang pertama!</td></tr>
            )}
            {rows.map((r, i) => (
              <tr key={r.username + r.created_at} className={newest.current === r.username + r.created_at ? "board-row-new" : ""}>
                <td>{MEDAL[i] ?? i + 1}</td>
                <td>{r.username}</td>
                <td>{r.outcome === "win" ? "🏆 Menang" : "Selesai"}</td>
                <td><span className={`badge ${r.literacy_delta > 0 ? "up" : "flat"}`}>{r.literacy_delta >= 0 ? "+" : ""}{r.literacy_delta}</span></td>
                <td>{r.score.toLocaleString("id-ID")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
