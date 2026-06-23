# 🪙 Simkop-Quest — Full-Stack

Simulasi koperasi desa swipe-card untuk literasi Gen-Z. **Next.js 15 + Supabase + Framer Motion**, dengan skor tervalidasi server (anti-cheat) dan leaderboard realtime.

> Pilar 4 · Hackathon Digital Cooperatives Expo 2026 · Kemenkop RI × PEBS FEB UI
> Tim: Shalahuddin Al-Ayyubi (Full Stack) · Hamdani (Frontend & UI/UX)

---

## Arsitektur

```
Browser (React + Framer Motion)
  │  main game pakai engine MURNI yang sama dengan server
  ▼  startSession() → token HMAC
Server Action submitScore()  ── pertahanan berlapis:
  1. Rate limit per-IP
  2. Validasi skema Zod + sanitasi
  3. Verifikasi token sesi (HMAC + TTL)
  4. REPLAY deterministik → skor dihitung ULANG (klaim klien diabaikan)
  5. Dedup session_id + insert via service-role
  ▼
Supabase (PostgreSQL + RLS + Realtime)
  • leaderboard       → kolom aman, baca publik, broadcast realtime
  • game_submissions  → session_id (dedup), TERKUNCI total
```

Logika inti (`src/lib/game`, `src/lib/security`) **murni & bebas framework**, sehingga 100% testable.

---

## Menjalankan

```bash
npm install
cp .env.example .env.local   # isi kredensial Supabase
npm run dev                  # http://localhost:3000
```

Terapkan skema database: jalankan `supabase/migrations/0001_init.sql` di SQL Editor Supabase.

## Skrip

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm test` | Unit test (Vitest) |
| `npm run test:coverage` | Test + laporan coverage |
| `npm run typecheck` | Pengecekan tipe TypeScript |

## Kualitas

- ✅ **52 unit test** lulus — engine, skor, validasi, sesi HMAC, rate limit
- ✅ Coverage **98%+** (logika game 100%)
- ✅ `npm audit --omit=dev` → **0 kerentanan**
- ✅ Build & typecheck hijau

Detail keamanan: lihat [SECURITY.md](./SECURITY.md).
