-- Seed data leaderboard — jalankan di SQL Editor Supabase SETELAH migrasi.
-- Data ilustrasi agar leaderboard tidak kosong saat demo.

insert into public.leaderboard
  (username, score, outcome, turns_survived, kas, trust, shu, pre_score, post_score, literacy_delta)
values
  ('Raka_Andika',   9840, 'win',           20, 62, 71, 58, 1, 3,  2),
  ('nayla.coop',    9215, 'win',           20, 55, 68, 44, 2, 3,  1),
  ('bagas_dev',     8770, 'win',           20, 48, 74, 37, 1, 3,  2),
  ('putri.k',       8110, 'win',           20, 40, 60, 32, 0, 2,  2),
  ('kopdes_id',     7640, 'win',           20, 35, 55, 28, 1, 2,  1),
  ('Hamdani_UI',    6980, 'win',           20, 30, 50, 20, 0, 2,  2),
  ('shalah0x',      5420, 'lose_bankrupt', 12, 0,  48, 15, 1, 2,  1),
  ('GenZ_Koperasi', 3100, 'lose_trust',     8, 40,  0,  8, 0, 1,  1);
