# 🔒 Model Keamanan Simkop-Quest

Dokumen ini merinci kontrol keamanan yang diterapkan. Prinsip: **jangan pernah percaya klien**.

## 1. Anti-Cheat Skor (inti)

- Klien **tidak pernah** mengirim skor. Yang dikirim hanya *decision log* (`scenarioId` + `choice`).
- Server **memutar ulang** (`replay()`) seluruh keputusan dengan engine deterministik yang sama, lalu menghitung skor & metrik dari nol. Payload skor apa pun diabaikan.
- `replay()` menolak: log kosong, > 20 giliran, skenario tak dikenal, pilihan tidak valid, dan game yang belum selesai.

## 2. Integritas Sesi (anti-forgery & anti-replay)

- Saat mulai, server menerbitkan **token sesi ber-tanda tangan HMAC-SHA256** (`GAME_SESSION_SECRET`).
- Verifikasi memakai **`timingSafeEqual`** (mencegah timing attack), cek **TTL 30 menit**, dan menolak token "dari masa depan".
- `session_id` disimpan di tabel terkunci `game_submissions` dengan **unique constraint** → satu sesi hanya bisa submit sekali (anti-replay).

## 3. Validasi & Sanitasi Input

- Semua payload divalidasi **Zod** (`submitScoreSchema`) sebelum diproses.
- `scenarioId` divalidasi terhadap whitelist; `choice` enum ketat; jumlah keputusan dibatasi 1–20.
- Username **disanitasi**: buang karakter HTML/kontrol, normalisasi, batasi 24 char, whitelist regex Unicode.

## 4. Row Level Security (Supabase)

- `leaderboard`: RLS aktif, **hanya SELECT publik**; tanpa policy tulis → INSERT/UPDATE/DELETE mustahil dari anon/auth.
- `game_submissions`: RLS aktif **tanpa policy apa pun** → terkunci total dari klien.
- Penulisan **hanya** lewat **service-role** di Server Action, setelah seluruh validasi lulus.
- Tabel `leaderboard` sengaja **tidak memuat data sensitif**, sehingga aman dibroadcast Realtime.

## 5. Pemisahan Kunci

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — aman di browser (dilindungi RLS).
- `SUPABASE_SERVICE_ROLE_KEY` — hanya server; modul `admin.ts` memakai `import "server-only"` agar gagal kompilasi bila terbawa ke klien.
- `.env*` di-`.gitignore`. Tidak ada rahasia ter-commit.

## 6. Rate Limiting

- `RateLimiter` fixed-window per-IP pada `submitScore` (10 req/menit). Siap di-swap ke Redis/Upstash untuk multi-instance.

## 7. HTTP Security Headers (`next.config.mjs`)

- **Content-Security-Policy** ketat (`default-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`; `connect-src` dibatasi ke origin Supabase saja).
- `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, `poweredByHeader: false`.

## 8. Dependency Hygiene

- `npm audit --omit=dev` → **0 kerentanan** (Next dipin ke versi terpatch CVE-2025-66478; PostCSS dipaksa terpatch via `overrides`).

## Verifikasi

```bash
npm test                 # 52 test (termasuk uji anti-cheat & forgery)
npm run test:coverage    # 98%+ coverage
npm audit --omit=dev     # 0 kerentanan produksi
```

## Catatan Hardening Lanjutan (produksi)

- Pindahkan rate limit ke store terdistribusi (Upstash Redis).
- Tambahkan CAPTCHA/Turnstile bila terjadi penyalahgunaan masif.
- Audit log untuk submit yang ditolak (monitoring anomali).
