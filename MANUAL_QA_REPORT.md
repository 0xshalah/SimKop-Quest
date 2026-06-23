# Manual QA Report — Simkop-Quest

> **Metode**: BrowserAct (Manual Browser Testing)
> **Tanggal**: 24 Juni 2026
> **Target**: Simkop-Quest v1.0 — Next.js 15 App Router + Supabase
> **Halaman uji**: `/` (Home) dan `/about` (Landing Page)
> **Browser**: Chrome 120+, Firefox 120+

---

## 1. TEST EXECUTION SUMMARY

| # | Area | ID | Skenario | Status |
|---|---|---|---|---|
| 1.1 | Landing Page | **LP-001** | Halaman `/` termuat tanpa error (200 OK) | ⬜ PENDING |
| 1.2 | Landing Page | **LP-002** | Halaman `/about` termuat tanpa error | ⬜ PENDING |
| 1.3 | Landing Page | **LP-003** | Animasi hero section (Framer Motion) muncul tanpa jank | ⬜ PENDING |
| 1.4 | Landing Page | **LP-004** | Data statistik (4 kartu) tampil di HeroSection `/about` | ⬜ PENDING |
| 1.5 | Landing Page | **LP-005** | Section "Cara Main" (4 flow-step) tampil di `/about` | ⬜ PENDING |
| 1.6 | Landing Page | **LP-006** | Section "Impact" dengan 3 impact-card tampil di `/about` | ⬜ PENDING |
| 1.7 | Landing Page | **LP-007** | Section "Leaderboard" tampil dengan data tabel | ⬜ PENDING |
| 1.8 | Landing Page | **LP-008** | Section "Team" tampil di `/about` | ⬜ PENDING |
| 1.9 | Landing Page | **LP-009** | Footer tampil dengan teks tim & hackathon | ⬜ PENDING |
| 1.10 | Landing Page | **LP-010** | Aurora background (blob animation) render | ⬜ PENDING |

| # | Area | ID | Skenario | Status |
|---|---|---|---|---|
| 2.1 | Navigation | **NAV-001** | Navbar sticky berubah style saat scroll > 8px | ⬜ PENDING |
| 2.2 | Navigation | **NAV-002** | Klik brand "SimkopQuest" mengarah ke `/` | ⬜ PENDING |
| 2.3 | Navigation | **NAV-003** | Link navigasi (#krisis, #cara, #impact, #tim) scroll ke section | ⬜ PENDING |
| 2.4 | Navigation | **NAV-004** | Link "Leaderboard" di nav mengarah ke `/#board` | ⬜ PENDING |
| 2.5 | Navigation | **NAV-005** | Tombol CTA "Demo" di nav scroll ke `#demo` | ⬜ PENDING |
| 2.6 | Navigation | **NAV-006** | Hamburger menu (mobile) toggle buka/tutup | ⬜ PENDING |
| 2.7 | Navigation | **NAV-007** | Escape key menutup mobile menu | ⬜ PENDING |
| 2.8 | Navigation | **NAV-008** | Klik link di mobile menu otomatis menutup menu | ⬜ PENDING |
| 2.9 | Navigation | **NAV-009** | Skip-link "Lewati ke demo game" (di `/about`) fokus & scroll | ⬜ PENDING |

| # | Area | ID | Skenario | Status |
|---|---|---|---|---|
| 3.1 | Game Flow | **GAME-001** | Input username < 2 karakter → tombol "Mulai" disabled | ⬜ PENDING |
| 3.2 | Game Flow | **GAME-002** | Input username valid + Enter → pindah ke quiz pra-game | ⬜ PENDING |
| 3.3 | Game Flow | **GAME-003** | Quiz pra-game menampilkan 3 soal berurutan (1/3, 2/3, 3/3) | ⬜ PENDING |
| 3.4 | Game Flow | **GAME-004** | Klik opsi melanjutkan ke soal berikutnya (pre-quiz) | ⬜ PENDING |
| 3.5 | Game Flow | **GAME-005** | Setelah 3 soal pre-quiz → masuk fase game (kartu skenario) | ⬜ PENDING |
| 3.6 | Game Flow | **GAME-006** | Kartu skenario menampilkan: tag, emoji, title, text, tip | ⬜ PENDING |
| 3.7 | Game Flow | **GAME-007** | Swipe kanan → label "SETUJU" muncul dengan opacity meningkat | ⬜ PENDING |
| 3.8 | Game Flow | **GAME-008** | Swipe kiri → label "TOLAK" muncul dengan opacity meningkat | ⬜ PENDING |
| 3.9 | Game Flow | **GAME-009** | Swipe > 90px + release → trigger `decide("yes"/"no")` | ⬜ PENDING |
| 3.10 | Game Flow | **GAME-010** | Swipe < 90px + release → kartu spring back ke tengah | ⬜ PENDING |
| 3.11 | Game Flow | **GAME-011** | Tombol "Setuju" / "Tolak" hanya aktif saat phase === "game" | ⬜ PENDING |
| 3.12 | Game Flow | **GAME-012** | Metrik (Kas, Kepercayaan, SHU) berubah setelah keputusan | ⬜ PENDING |
| 3.13 | Game Flow | **GAME-013** | Giliran counter update (1/20 → 2/20 → ...) | ⬜ PENDING |
| 3.14 | Game Flow | **GAME-014** | Urutan skenario diacak (shuffle) setiap sesi baru | ⬜ PENDING |
| 3.15 | Game Flow | **GAME-015** | Literasi awal ditampilkan selama fase game | ⬜ PENDING |
| 3.16 | Game Flow | **GAME-016** | Kas ≤ 0 → game over "Bangkrut!" | ⬜ PENDING |
| 3.17 | Game Flow | **GAME-017** | Kepercayaan ≤ 0 → game over "Anggota Walkout" | ⬜ PENDING |
| 3.18 | Game Flow | **GAME-018** | 20 giliran selesai, SHU > 0 → "Tahun Fiskal Sukses!" | ⬜ PENDING |
| 3.19 | Game Flow | **GAME-019** | 20 giliran selesai, SHU ≤ 0 → "Bertahan Tapi Merugi" | ⬜ PENDING |
| 3.20 | Game Flow | **GAME-020** | Game over → otomatis masuk quiz pasca-game | ⬜ PENDING |
| 3.21 | Game Flow | **GAME-021** | Quiz post-game menampilkan 3 soal yang sama | ⬜ PENDING |
| 3.22 | Game Flow | **GAME-022** | Setelah post-quiz → fase "submitting" → "result" | ⬜ PENDING |
| 3.23 | Game Flow | **GAME-023** | Hasil menampilkan: Skor, Delta Literasi (positif/negatif) | ⬜ PENDING |
| 3.24 | Game Flow | **GAME-024** | Tombol "Main Lagi" reset semua state ke awal | ⬜ PENDING |
| 3.25 | Game Flow | **GAME-025** | Mode demo lokal (backend unavailable) → skor = 0, delta quiz tetap | ⬜ PENDING |
| 3.26 | Game Flow | **GAME-026** | Input username maks 24 karakter, tidak bisa lebih | ⬜ PENDING |
| 3.27 | Game Flow | **GAME-027** | Username dengan karakter khusus HTML (<>"'\`) dibersihkan | ⬜ PENDING |
| 3.28 | Game Flow | **GAME-028** | Semua 10 skenario unik muncul dalam 1 sesi (shuffle) | ⬜ PENDING |

| # | Area | ID | Skenario | Status |
|---|---|---|---|---|
| 4.1 | Leaderboard | **LB-001** | Tabel leaderboard menampilkan kolom: #, Username, Hasil, Δ Literasi, Skor | ⬜ PENDING |
| 4.2 | Leaderboard | **LB-002** | Baris kosong menampilkan "Belum ada skor..." | ⬜ PENDING |
| 4.3 | Leaderboard | **LB-003** | Top 3 mendapat medal emoji (🥇🥈🥉) | ⬜ PENDING |
| 4.4 | Leaderboard | **LB-004** | Outcome "win" menampilkan "🏆 Menang" | ⬜ PENDING |
| 4.5 | Leaderboard | **LB-005** | Outcome non-win menampilkan "Selesai" | ⬜ PENDING |
| 4.6 | Leaderboard | **LB-006** | Delta literasi positif → badge hijau dengan "+" prefix | ⬜ PENDING |
| 4.7 | Leaderboard | **LB-007** | Delta literasi negatif/nol → badge "flat" | ⬜ PENDING |
| 4.8 | Leaderboard | **LB-008** | Skor diformat locale "id-ID" (titik pemisah ribuan) | ⬜ PENDING |
| 4.9 | Leaderboard | **LB-009** | Indikator "Live realtime aktif" tampil jika Supabase connected | ⬜ PENDING |
| 4.10 | Leaderboard | **LB-010** | Entry baru langsung muncul via realtime subscription | ⬜ PENDING |
| 4.11 | Leaderboard | **LB-011** | Baris baru di-highlight dengan efek animasi (board-row-new) | ⬜ PENDING |
| 4.12 | Leaderboard | **LB-012** | Leaderboard ter-sort descending by score, max 20 entries | ⬜ PENDING |

| # | Area | ID | Skenario | Status |
|---|---|---|---|---|
| 5.1 | UI/Visual | **UI-001** | Warna metrik bar sesuai: Kas=merah, Kepercayaan=hijau, SHU=biru | ⬜ PENDING |
| 5.2 | UI/Visual | **UI-002** | Device mockup frame konsisten di semua layar | ⬜ PENDING |
| 5.3 | UI/Visual | **UI-003** | Font & typography konsisten (Tailwind + global CSS) | ⬜ PENDING |
| 5.4 | UI/Visual | **UI-004** | Gradient text "74 juta Gen-Z" di hero section | ⬜ PENDING |
| 5.5 | UI/Visual | **UI-005** | Red highlight "51,7%" di hero | ⬜ PENDING |
| 5.6 | UI/Visual | **UI-006** | Pill badges (Live Demo, Pilar 4, Hackathon) di `/about` hero | ⬜ PENDING |
| 5.7 | UI/Visual | **UI-007** | Tombol CTA "Main Sekarang — Gratis" dengan class magnetic | ⬜ PENDING |
| 5.8 | UI/Visual | **UI-008** | Social proof bar (3 stat + divider) di `/about` hero | ⬜ PENDING |
| 5.9 | UI/Visual | **UI-009** | Icon SVG brand di navbar dengan gradient | ⬜ PENDING |
| 5.10 | UI/Visual | **UI-010** | Tidak ada layout shift (CLS) saat halaman load | ⬜ PENDING |
| 5.11 | UI/Visual | **UI-011** | Tidak ada teks overflow/terpotong di mobile | ⬜ PENDING |
| 5.12 | UI/Visual | **UI-012** | Emoji render dengan benar di semua browser | ⬜ PENDING |
| 5.13 | UI/Visual | **UI-013** | Tag skenario kartu tampil (misal "Tata Kelola", "Anti-Korupsi") | ⬜ PENDING |

| # | Area | ID | Skenario | Status |
|---|---|---|---|---|
| 6.1 | Responsive | **RESP-001** | Layout 1 kolom di mobile (< 768px) | ⬜ PENDING |
| 6.2 | Responsive | **RESP-002** | Hero grid 2 kolom di desktop (>= 768px) | ⬜ PENDING |
| 6.3 | Responsive | **RESP-003** | Hamburger menu muncul di mobile, nav links di desktop | ⬜ PENDING |
| 6.4 | Responsive | **RESP-004** | Device mockup (game) proporsional di mobile | ⬜ PENDING |
| 6.5 | Responsive | **RESP-005** | Leaderboard tabel tidak overflow horizontal di mobile | ⬜ PENDING |
| 6.6 | Responsive | **RESP-006** | Data grid (4 cards) stack vertikal di mobile | ⬜ PENDING |
| 6.7 | Responsive | **RESP-007** | Flow-4 section stack vertikal di mobile | ⬜ PENDING |
| 6.8 | Responsive | **RESP-008** | Impact 2-col layout jadi stacked di mobile | ⬜ PENDING |
| 6.9 | Responsive | **RESP-009** | Touch gesture swipe bekerja di mobile (tidak ada drag conflict) | ⬜ PENDING |
| 6.10 | Responsive | **RESP-010** | Viewport 320px (iPhone SE) — tidak ada elemen terpotong | ⬜ PENDING |
| 6.11 | Responsive | **RESP-011** | Viewport 1440px+ — konten tidak melebar tak terbatas | ⬜ PENDING |
| 6.12 | Responsive | **RESP-012** | Keyboard virtual (mobile) tidak menutupi input username | ⬜ PENDING |

| # | Area | ID | Skenario | Status |
|---|---|---|---|---|
| 7.1 | API/Security | **API-001** | `GET /api/leaderboard` mengembalikan JSON 200 dengan `data` array | ⬜ PENDING |
| 7.2 | API/Security | **API-002** | Leaderboard response memiliki header `Cache-Control: s-maxage=5` | ⬜ PENDING |
| 7.3 | API/Security | **API-003** | Submit skor gagal jika payload tidak valid → error message | ⬜ PENDING |
| 7.4 | API/Security | **API-004** | Submit skor gagal jika session token invalid/expired | ⬜ PENDING |
| 7.5 | API/Security | **API-005** | Rate limit 10 req/menit: request ke-11 ditolak | ⬜ PENDING |
| 7.6 | API/Security | **API-006** | Submit ganda dengan session_id sama → ditolak (23505) | ⬜ PENDING |
| 7.7 | API/Security | **API-007** | Decision log dengan unknown scenarioId → "Riwayat tidak konsisten" | ⬜ PENDING |
| 7.8 | API/Security | **API-008** | Decision log kosong → error validasi Zod | ⬜ PENDING |
| 7.9 | API/Security | **API-009** | Decision log belum finish (ongoing) → error server | ⬜ PENDING |
| 7.10 | API/Security | **API-010** | Username dengan XSS payload (<script>) → disanitasi | ⬜ PENDING |
| 7.11 | API/Security | **API-011** | CSP header ketat (frame-ancestors none, script-src) | ⬜ PENDING |
| 7.12 | API/Security | **API-012** | HSTS header `max-age=31536000; includeSubDomains` | ⬜ PENDING |
| 7.13 | API/Security | **API-013** | X-Content-Type-Options: nosniff | ⬜ PENDING |
| 7.14 | API/Security | **API-014** | Supabase RLS: public tidak bisa INSERT ke leaderboard langsung | ⬜ PENDING |

| # | Area | ID | Skenario | Status |
|---|---|---|---|---|
| 8.1 | Accessibility | **A11Y-001** | Skip-link fokusable dengan keyboard (Tab pertama) | ⬜ PENDING |
| 8.2 | Accessibility | **A11Y-002** | Input username memiliki `aria-label="Username"` | ⬜ PENDING |
| 8.3 | Accessibility | **A11Y-003** | Hamburger button memiliki `aria-label`, `aria-expanded`, `aria-controls` | ⬜ PENDING |
| 8.4 | Accessibility | **A11Y-004** | Nav element memiliki `aria-label="Menu utama"` | ⬜ PENDING |
| 8.5 | Accessibility | **A11Y-005** | Area game memiliki `aria-live="polite"` untuk info literasi | ⬜ PENDING |
| 8.6 | Accessibility | **A11Y-006** | Aurora background div memiliki `aria-hidden="true"` | ⬜ PENDING |
| 8.7 | Accessibility | **A11Y-007** | Semua tombol operabel via keyboard (Enter/Space) | ⬜ PENDING |
| 8.8 | Accessibility | **A11Y-008** | Keyboard navigation: bisa swipe pakai tombol Setuju/Tolak | ⬜ PENDING |
| 8.9 | Accessibility | **A11Y-009** | Color contrast ratio teks ≥ 4.5:1 (WCAG AA) | ⬜ PENDING |
| 8.10 | Accessibility | **A11Y-010** | Leaderboard tabel terbaca oleh screen reader | ⬜ PENDING |
| 8.11 | Accessibility | **A11Y-011** | Fokus visible (outline) pada semua elemen interaktif | ⬜ PENDING |
| 8.12 | Accessibility | **A11Y-012** | Browser zoom 200% — tidak ada konten hilang/terpotong | ⬜ PENDING |

| # | Area | ID | Skenario | Status |
|---|---|---|---|---|
| 9.1 | Performance | **PERF-001** | First Contentful Paint < 1.5 detik | ⬜ PENDING |
| 9.2 | Performance | **PERF-002** | Largest Contentful Paint < 2.5 detik | ⬜ PENDING |
| 9.3 | Performance | **PERF-003** | Total Blocking Time < 200ms | ⬜ PENDING |
| 9.4 | Performance | **PERF-004** | Cumulative Layout Shift < 0.1 | ⬜ PENDING |
| 9.5 | Performance | **PERF-005** | Framer Motion animasi berjalan 60fps (tidak janky) | ⬜ PENDING |
| 9.6 | Performance | **PERF-006** | Tidak ada memory leak setelah Main Lagi (restart) | ⬜ PENDING |
| 9.7 | Performance | **PERF-007** | Bundle JS client-side < 200KB (gzipped) | ⬜ PENDING |

| # | Area | ID | Skenario | Status |
|---|---|---|---|---|
| 10.1 | Edge Cases | **EDGE-001** | Klik "Mulai" tanpa username → tidak bereaksi (disabled) | ⬜ PENDING |
| 10.2 | Edge Cases | **EDGE-002** | Spam setuju/tolak berturut-turut → tidak double-trigger | ⬜ PENDING |
| 10.3 | Edge Cases | **EDGE-003** | Buka 2 tab, main game → session token berbeda per tab | ⬜ PENDING |
| 10.4 | Edge Cases | **EDGE-004** | Refresh browser saat fase game → state hilang (expected) | ⬜ PENDING |
| 10.5 | Edge Cases | **EDGE-005** | Backend down → mode demo lokal, tidak crash | ⬜ PENDING |
| 10.6 | Edge Cases | **EDGE-006** | Metrik mencapai 100% → bar penuh, tidak overflow | ⬜ PENDING |
| 10.7 | Edge Cases | **EDGE-007** | Metrik di bawah 0% → bar kosong, tidak negatif | ⬜ PENDING |
| 10.8 | Edge Cases | **EDGE-008** | Giliran 20/20 → bar progress maksimal, game otomatis berakhir | ⬜ PENDING |
| 10.9 | Edge Cases | **EDGE-009** | Jaringan lambat → tidak ada UI freeze, loading state tampil | ⬜ PENDING |
| 10.10 | Edge Cases | **EDGE-010** | Klik opsi quiz terlalu cepat → tidak crash, state konsisten | ⬜ PENDING |
| 10.11 | Edge Cases | **EDGE-011** | Semua skenario sudah lewat, tapi belum game over → siklus shuffle ulang | ⬜ PENDING |
| 10.12 | Edge Cases | **EDGE-012** | JavaScript disabled → halaman tidak interaktif (graceful degradation) | ⬜ PENDING |
| 10.13 | Edge Cases | **EDGE-013** | Back button browser di tengah game → perilaku expected | ⬜ PENDING |
| 10.14 | Edge Cases | **EDGE-014** | Copy-paste username dengan whitespace berlebih → ditrim | ⬜ PENDING |

---

## 2. BUG REPORT TEMPLATE

Gunakan format ini untuk setiap bug yang ditemukan:

```
### BUG-XXX: [Judul Singkat]

| Field | Value |
|---|---|
| **ID Test** | GAME-007 |
| **Severity** | Critical / Major / Minor / Trivial |
| **Browser** | Chrome 12x / Firefox 12x |
| **Viewport** | Desktop 1920x1080 / Mobile 375x812 |

**Langkah Reproduksi:**
1. ...
2. ...
3. ...

**Hasil yang Diharapkan:**
- ...

**Hasil Aktual:**
- ...

**Screenshot/Evidence:**
[attach]

**Root Cause (jika diketahui):**
- File: `src/components/X.tsx:XX`
- Masalah: ...
```

---

## 3. SEVERITY CLASSIFICATION

| Severity | Definisis |
|---|---|
| **Critical** | Aplikasi crash, data corrupt, security breach |
| **Major** | Fitur utama tidak berfungsi, tidak ada workaround |
| **Minor** | Fitur bekerja tapi tidak sesuai spesifikasi, ada workaround |
| **Trivial** | Isu kosmetik (typo, alignment, warna sedikit off) |

---

## 4. TEST ENVIRONMENT

| Item | Detail |
|---|---|
| **URL** | `http://localhost:3000` (dev) / Vercel deployment |
| **Browser** | Chrome 120+, Firefox 120+, Safari 17+ |
| **Device** | Desktop 1920x1080, iPad 1024x768, iPhone SE 375x667 |
| **Network** | 4G throttling (DevTools) untuk test performa |
| **Screen Reader** | NVDA (Windows) / VoiceOver (macOS) |

---

## 5. EXECUTION CHECKLIST

### 5.1 Persiapan Sebelum Uji
- [ ] `npm run build` sukses (Next.js production build)
- [ ] `npm run typecheck` sukses (TypeScript strict mode)
- [ ] `npm test` sukses (52/52 unit tests pass, coverage 98%+)
- [ ] Supabase project online & environment variables tersetel
- [ ] DevTools terbuka (Console + Network tab) untuk monitor error
- [ ] Lighthouse audit baseline dicatat sebelum uji

### 5.2 Setelah Semua Uji
- [ ] Semua 114 skenario di atas dieksekusi
- [ ] Bug ditemukan dicatat dengan format BUG-XXX
- [ ] Screenshot/video anomali disimpan
- [ ] Console log diperiksa — 0 error / 0 warning
- [ ] Network tab diperiksa — 0 failed request (selain expected 401/429)
- [ ] Lighthouse score final dibandingkan dengan baseline
- [ ] Laporan ditandatangani

---

## 6. KNOWN ARCHITECTURE NOTES (untuk konteks QA)

1. **Game flow phases**: `name → prequiz → game → postquiz → submitting → result`
2. **10 skenario**: tengkulak-beras, pinjaman-cabai, gratifikasi, audit-terbuka, digitalisasi, gagal-panen, distribusi-kota, pelatihan-sdm, tunggakan, bagi-shu
3. **3 soal quiz**: SHU, prinsip koperasi, SIMKOPDES (masing-masing 4 opsi, jawaban benar selalu index 1)
4. **Anti-cheat**: Server replay ulang decision log deterministik — skor klien diabaikan total
5. **Rate limit**: 10 request/menit per IP pada endpoint submit
6. **Session token**: HMAC-SHA256, 30 menit TTL, timing-safe comparison
7. **Dedup**: `game_submissions.session_id` UNIQUE constraint — submit ganda ditolak
8. **Realtime**: Supabase Postgres changes → INSERT trigger di leaderboard
9. **Mode demo**: Jika `startSession()` gagal (backend unavailable), game tetap bisa dimainkan lokal tanpa submit ke leaderboard
10. **Shuffle**: Urutan 10 skenario diacak setiap sesi baru, jika habis sebelum game over, index modulus akan mengulang (potensi bug: skenario bisa berulang)

---

## 7. POTENTIAL RISK AREAS (perhatian khusus QA)

| # | Area | Risiko | Prioritas |
|---|---|---|---|
| 1 | Swipe gesture | Framer Motion `drag="x"` bisa konflik dengan scroll vertikal di mobile | HIGH |
| 2 | Scenario repeat | `order[idx % order.length]` bisa menyebabkan skenario berulang jika > 10 giliran dimainkan | MEDIUM |
| 3 | Double-submit | Race condition: tombol bisa diklik 2x sebelum state berubah | MEDIUM |
| 4 | Real-time disconnect | Supabase channel gagal konek → leaderboard tidak update tanpa error jelas | LOW |
| 5 | Quiz state mismatch | Jika user refresh saat post-quiz, state hilang, tidak bisa submit | MEDIUM |
| 6 | `animate(x, ±480)` | Framer Motion `animate` tidak di-cancel jika user swipe lagi cepat | LOW |
| 7 | Token fetch race | `beginGame` async — user bisa klik quiz option sebelum token selesai fetch | MEDIUM |

---

*Report generated manually. Semua skenario wajib dieksekusi langsung di browser.*
