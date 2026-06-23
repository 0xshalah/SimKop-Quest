import type { Scenario } from "./types";

/**
 * Bank skenario statis. Setiap kartu dirancang dari dilema operasional
 * koperasi desa nyata. id WAJIB unik & stabil (dipakai validasi server).
 */
export const SCENARIOS: readonly Scenario[] = [
  { id: "tengkulak-beras", tag: "Tata Kelola", emoji: "🌾", title: "Tengkulak beras murah",
    text: "Tengkulak menawarkan beras murah tanpa sertifikasi asal-usul, 30% di bawah pasaran.",
    tip: "Integritas: sumber tidak jelas = risiko hukum & reputasi jangka panjang.",
    yes: { kas: 14, trust: -20, shu: 8 }, no: { kas: -4, trust: 10, shu: 0 } },
  { id: "pinjaman-cabai", tag: "Pembiayaan", emoji: "🌶️", title: "Pinjaman petani cabai",
    text: "Pak Slamet, anggota 5 tahun, butuh pinjaman Rp 3 jt untuk pupuk. Tanpa jaminan.",
    tip: "Simpan Pinjam: koperasi wajib menjaga rasio NPL agar tetap sehat.",
    yes: { kas: -14, trust: 18, shu: 6 }, no: { kas: 2, trust: -14, shu: -2 } },
  { id: "gratifikasi", tag: "Anti-Korupsi", emoji: "🎁", title: "Gratifikasi pemasok",
    text: "Vendor pupuk mengirim hampers Rp 500rb agar kontraknya diperbarui.",
    tip: "Tata Kelola: gratifikasi melanggar prinsip koperasi.",
    yes: { kas: 8, trust: -26, shu: 4 }, no: { kas: -2, trust: 14, shu: 1 } },
  { id: "audit-terbuka", tag: "Transparansi", emoji: "📊", title: "Audit terbuka bulanan",
    text: "Anggota minta laporan keuangan dipublikasikan tiap bulan di papan desa.",
    tip: "Akuntabilitas: transparansi naikkan kepercayaan, ada biaya administrasi.",
    yes: { kas: -7, trust: 22, shu: 2 }, no: { kas: 1, trust: -18, shu: 0 } },
  { id: "digitalisasi", tag: "Investasi Digital", emoji: "📱", title: "Digitalisasi simpan pinjam",
    text: "Vendor menawarkan aplikasi simpan pinjam Rp 8 jt. Adopsi SIMKOPDES lebih mudah.",
    tip: "Investasi: biaya awal besar membebani kas tapi menaikkan SHU jangka panjang.",
    yes: { kas: -18, trust: 12, shu: 16 }, no: { kas: 2, trust: -7, shu: -4 } },
  { id: "gagal-panen", tag: "Manajemen Risiko", emoji: "🌧️", title: "Gagal panen bencana",
    text: "Banjir melanda desa. 40 anggota peminjam minta keringanan cicilan 3 bulan.",
    tip: "Risiko: kelonggaran menjaga loyalitas tapi menekan likuiditas.",
    yes: { kas: -16, trust: 20, shu: -6 }, no: { kas: 5, trust: -18, shu: 3 } },
  { id: "distribusi-kota", tag: "Pengembangan Usaha", emoji: "🚚", title: "Kemitraan distribusi kota",
    text: "Supermarket kota menawarkan kontrak beli hasil panen. Butuh sewa truk Rp 2 jt/bulan.",
    tip: "Volume Usaha: diversifikasi pasar naikkan SHU, tambah biaya tetap.",
    yes: { kas: -12, trust: 8, shu: 18 }, no: { kas: 0, trust: -5, shu: -6 } },
  { id: "pelatihan-sdm", tag: "SDM", emoji: "🎓", title: "Pelatihan SIMKOPDES",
    text: "Kemenkop menyelenggarakan pelatihan 2 hari gratis, tapi pengurus perlu izin kerja.",
    tip: "SDM: investasi kompetensi bernilai jangka panjang untuk tata kelola.",
    yes: { kas: -6, trust: 14, shu: 6 }, no: { kas: 0, trust: -9, shu: -2 } },
  { id: "tunggakan", tag: "Tata Kelola", emoji: "⚖️", title: "Anggota menunggak besar",
    text: "5 anggota menunggak total Rp 15 jt. Tegakkan aturan atau beri relaksasi?",
    tip: "NPL tinggi merusak kepercayaan anggota lain yang taat bayar.",
    yes: { kas: -12, trust: 16, shu: -5 }, no: { kas: 7, trust: -16, shu: 5 } },
  { id: "bagi-shu", tag: "SHU", emoji: "💰", title: "Bagi SHU lebih awal",
    text: "Anggota ramai minta SHU dibagi sebelum tutup buku akhir tahun.",
    tip: "SHU dibagi setelah tutup buku demi likuiditas & akurasi akuntansi.",
    yes: { kas: -18, trust: 18, shu: -10 }, no: { kas: 3, trust: -14, shu: 7 } },
];

const byId = new Map(SCENARIOS.map((s) => [s.id, s]));

export function getScenario(id: string): Scenario | undefined {
  return byId.get(id);
}

export function isValidScenarioId(id: string): boolean {
  return byId.has(id);
}
