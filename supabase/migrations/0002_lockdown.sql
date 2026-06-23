-- ============================================================
-- Pengetatan defense-in-depth.
-- Jalankan SETELAH 0001_init.sql di SQL Editor Supabase.
-- ============================================================

-- Cabut akses tabel dedup dari role publik. RLS sudah memblokir baris,
-- ini menjadikannya ditolak keras (bukan sekadar 0 baris).
revoke all on public.game_submissions from anon, authenticated;

-- Batasi leaderboard hanya SELECT untuk role publik (cegah grant tulis bawaan).
revoke insert, update, delete on public.leaderboard from anon, authenticated;
grant select on public.leaderboard to anon, authenticated;

-- Service-role tetap punya akses penuh (melewati semua ini) untuk Server Action.
