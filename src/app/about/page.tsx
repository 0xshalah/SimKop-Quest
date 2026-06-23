import Nav from "@/components/landing/Nav";
import HeroSection from "@/components/landing/HeroSection";
import TeamSection from "@/components/landing/TeamSection";
import GameDemo from "@/components/GameDemo";
import Leaderboard from "@/components/Leaderboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Simkop-Quest | Hackathon DCE 2026",
  description: "Landing page portofolio Simkop-Quest — tim, misi, demo game, dan leaderboard live.",
};

export default function AboutPage() {
  return (
    <>
      <div className="aurora" aria-hidden="true">
        <span className="blob b1" /><span className="blob b2" />
      </div>
      <a href="#demo" className="skip-link">Lewati ke demo game</a>
      <Nav />

      <HeroSection />

      {/* CARA MAIN */}
      <section className="section alt" id="cara">
        <div className="wrap">
          <div className="head">
            <span className="kicker">Cara Main</span>
            <h2>Belajar dengan cara yang kamu suka</h2>
            <p className="head-sub">Bukan ceramah. Bukan modul. Keputusan nyata dengan konsekuensi nyata.</p>
          </div>
          <div className="flow-4">
            {[
              { n:"01", icon:"🧪", title:"Quiz Pra-Game", desc:"3 soal baseline literasi sebelum mulai. Data ini yang kita bandingkan setelah bermain." },
              { n:"02", icon:"🃏", title:"Ambil Kartu Skenario", desc:"Dilema operasional nyata: tengkulak gelap, pinjaman petani, gratifikasi pemasok." },
              { n:"03", icon:"👆", title:"Geser & Putuskan", desc:"Kiri = Tolak, Kanan = Setuju. Kas, Kepercayaan, dan SHU langsung bereaksi." },
              { n:"04", icon:"📊", title:"Lihat Dampakmu", desc:"Post-quiz sama menghitung delta literasi nyata. Skor dikirim ke leaderboard nasional." },
            ].map(s => (
              <div key={s.n} className="flow-step">
                <span className="fs-n">{s.n}</span>
                <span className="fs-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="section" id="impact">
        <div className="wrap">
          <div className="head">
            <span className="kicker">Bukan Sekadar Game</span>
            <h2>Dampak yang terukur, bukan asumsi</h2>
          </div>
          <div className="impact-2col">
            <div className="impact-main">
              <span style={{fontSize:"2rem"}}>📐</span>
              <h3>Pre/Post Literacy Quiz</h3>
              <p>Soal yang sama persis dimainkan sebelum dan sesudah game. Delta dihitung dari jawaban nyata pemain — bukan formula. Data dikirim ke Supabase sebagai bukti learning outcome.</p>
              <div className="impact-badge">⚡ Fitur Unik — Tidak Ada di Kompetitor</div>
            </div>
            <div className="impact-col">
              {[
                { ico:"🔬", title:"Didukung Riset", desc:"+47,74% knowledge gain vs video (arxiv.org 2024). +90% retensi vs modul (zipdo.co 2026)." },
                { ico:"📡", title:"Data Feed Kemenkop", desc:"Agregat delta literasi seluruh pemain jadi dashboard nasional bagi Kemenkop RI." },
                { ico:"🔒", title:"Anti-Cheat Server-Side", desc:"Skor dihitung ulang dari decision log. Klaim klien diabaikan total. Token HMAC + Supabase RLS." },
              ].map(c => (
                <div key={c.title} className="impact-card-sm">
                  <span>{c.ico}</span>
                  <div><h4>{c.title}</h4><p>{c.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GAME DEMO */}
      <section className="section alt" id="demo">
        <div className="wrap" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
          <div className="head" style={{marginBottom:24}}>
            <span className="kicker">Demo Langsung</span>
            <h2>Coba sekarang — gratis</h2>
          </div>
          <GameDemo />
        </div>
      </section>

      <Leaderboard />
      <TeamSection />

      <footer style={{borderTop:"1px solid var(--line)",padding:"32px 0",textAlign:"center",color:"var(--muted)",fontSize:".85rem"}}>
        <div className="wrap">
          Tim Simkop-Quest · Pilar 4 · Hackathon Digital Cooperatives Expo 2026 · Kemenkop RI × PEBS FEB UI
        </div>
      </footer>
    </>
  );
}
