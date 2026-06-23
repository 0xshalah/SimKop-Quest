"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  { n: "51,7%", label: "Literasi Gen-Z 15–17 thn", src: "OJK–BPS 2024" },
  { n: "2,14%", label: "Gen-Z minat ekonomi desa", src: "BPS 2024" },
  { n: "80rb+", label: "Kopdes butuh pengurus muda", src: "Inpres 9/2025" },
  { n: "74,93jt", label: "Gen-Z Indonesia", src: "BPS 2020" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2,0.8,0.2,1] } } };

export default function HeroSection() {
  return (
    <section className="lp-hero">
      <div className="wrap hero-grid">
        {/* copy */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="pill-row">
            <span className="pill live"><span className="dot" />Live Demo</span>
            <span className="pill blue">Pilar 4 · Literasi Gen-Z</span>
            <span className="pill blue">Hackathon DCE 2026</span>
          </motion.div>

          <motion.h1 variants={item}>
            <span className="grad">74 juta Gen-Z.</span><br />
            Literasi koperasi<br />masih <span className="red-hl">51,7%</span>.
          </motion.h1>

          <motion.p variants={item} className="lead">
            <strong className="tagline">"Geser kartu, pimpin koperasi desamu — bangkrut atau berjaya, kamu yang putuskan."</strong>
            Simkop-Quest mengubah literasi koperasi dari modul membosankan menjadi
            <strong> simulasi swipe-card</strong> berbasis keputusan nyata. Skor divalidasi penuh di server.
          </motion.p>

          <motion.div variants={item} className="hero-cta">
            <Link href="/#demo" className="btn btn-primary magnetic">🎮 Main Sekarang — Gratis</Link>
            <Link href="#krisis" className="btn btn-ghost magnetic">Kenapa ini penting? →</Link>
          </motion.div>

          {/* social proof */}
          <motion.div variants={item} className="social-proof">
            <div className="proof-stat"><b>+47,74%</b><span>knowledge gain vs video*</span></div>
            <div className="proof-divider" />
            <div className="proof-stat"><b>90%</b><span>retensi vs modul*</span></div>
            <div className="proof-divider" />
            <div className="proof-stat"><b>80rb+</b><span>Kopdes butuh pemimpin</span></div>
          </motion.div>
          <motion.p variants={item} className="proof-source">*Sumber: arxiv.org 2024 & zipdo.co 2026</motion.p>
        </motion.div>

        {/* data cards */}
        <motion.div className="data-grid" variants={container} initial="hidden" animate="show">
          {stats.map((s) => (
            <motion.div key={s.n} variants={item} className="data-card">
              <span className="data-num">{s.n}</span>
              <p>{s.label}</p>
              <cite>{s.src}</cite>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
