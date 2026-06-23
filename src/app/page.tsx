import GameDemo from "@/components/GameDemo";
import Leaderboard from "@/components/Leaderboard";

export default function Home() {
  return (
    <main>
      <div className="aurora" aria-hidden="true">
        <span className="blob b1" /><span className="blob b2" />
      </div>

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>
              <span className="grad">74 juta Gen-Z.</span>
              <br />Literasi koperasi
              <br />masih <span className="red-hl">51,7%</span>.
            </h1>
            <p className="lead">
              <strong className="tagline">
                &ldquo;Geser kartu, pimpin koperasi desamu — bangkrut atau berjaya, kamu yang putuskan.&rdquo;
              </strong>
              Simkop-Quest mengubah literasi koperasi dari modul membosankan menjadi
              simulasi swipe-card berbasis keputusan nyata. Skor divalidasi penuh di server.
            </p>
            <div className="hero-cta">
              <a href="#demo" className="btn btn-primary">🎮 Main Sekarang</a>
              <a href="#board" className="btn btn-ghost">Lihat Leaderboard →</a>
            </div>
          </div>
          <GameDemo />
        </div>
      </section>

      <Leaderboard />

      <footer style={{ borderTop: "1px solid var(--line)", padding: "32px 0", textAlign: "center", color: "var(--muted)", fontSize: ".85rem" }}>
        <div className="wrap">
          Tim Simkop-Quest · Pilar 4 · Hackathon Digital Cooperatives Expo 2026 · Kemenkop RI × PEBS FEB UI
        </div>
      </footer>
    </main>
  );
}
