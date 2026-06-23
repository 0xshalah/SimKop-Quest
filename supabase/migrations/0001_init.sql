-- ============================================================
-- Simkop-Quest · Skema & Row Level Security
--
-- Desain keamanan:
--  • leaderboard      → HANYA kolom aman; boleh DIBACA publik (Realtime jalan).
--  • game_submissions → menyimpan session_id (dedup); TERKUNCI total.
--  • Tulis ke kedua tabel HANYA via service-role (server, pasca-validasi).
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- Tabel publik-aman (tidak ada data sensitif) ----------
create table if not exists public.leaderboard (
  id              uuid primary key default gen_random_uuid(),
  username        text not null check (char_length(username) between 2 and 24),
  score           integer not null check (score >= 0 and score <= 100000),
  outcome         text not null check (outcome in ('win','lose_bankrupt','lose_trust','lose_shu')),
  turns_survived  smallint not null check (turns_survived between 1 and 20),
  kas             smallint not null check (kas between 0 and 100),
  trust           smallint not null check (trust between 0 and 100),
  shu             smallint not null check (shu between 0 and 100),
  pre_score       smallint not null check (pre_score between 0 and 3),
  post_score      smallint not null check (post_score between 0 and 3),
  literacy_delta  smallint not null check (literacy_delta between -3 and 3),
  created_at      timestamptz not null default now()
);
create index if not exists leaderboard_score_idx on public.leaderboard (score desc, created_at desc);

alter table public.leaderboard enable row level security;

-- Baca publik diizinkan (kolom semuanya aman). Tidak ada policy tulis
-- => INSERT/UPDATE/DELETE hanya bisa via service-role yang melewati RLS.
create policy "leaderboard_public_read"
  on public.leaderboard for select
  to anon, authenticated
  using (true);

-- ---------- Tabel dedup sesi (TERKUNCI) ----------
create table if not exists public.game_submissions (
  session_id   uuid primary key,            -- unik → 1 sesi = 1 submit
  created_at   timestamptz not null default now()
);
alter table public.game_submissions enable row level security;
-- Sengaja TANPA policy apa pun: anon & authenticated tak bisa baca/tulis.

-- ---------- Realtime: broadcast perubahan leaderboard ----------
-- Aman karena tabel ini hanya berisi kolom non-sensitif.
do $$
begin
  if not exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    create publication supabase_realtime;
  end if;
end $$;
alter publication supabase_realtime add table public.leaderboard;
