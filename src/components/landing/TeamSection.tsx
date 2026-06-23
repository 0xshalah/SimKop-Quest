"use client";
import { motion } from "framer-motion";

const team = [
  {
    initials: "SA", name: "Shalahuddin Al-Ayyubi", role: "Full Stack Developer",
    desc: "Game engine, Supabase RLS, anti-cheat server-side, deployment Vercel.",
    skills: ["Next.js 15", "Supabase", "PostgreSQL", "TypeScript"],
    grad: "linear-gradient(135deg,#4f7eff,#7b47ff)",
  },
  {
    initials: "HM", name: "Hamdani", role: "Frontend & UI/UX Designer",
    desc: "Swipe experience Framer Motion, design system mobile-first, visual Gen-Z.",
    skills: ["UI/UX", "Framer Motion", "Design System", "Prototyping"],
    grad: "linear-gradient(135deg,#1de9a0,#00a3d4)",
  },
];

export default function TeamSection() {
  return (
    <section className="section alt" id="tim">
      <div className="wrap">
        <div className="head">
          <span className="kicker">Tim</span>
          <h2>Dua orang, satu misi</h2>
        </div>
        <div className="team-grid">
          {team.map((t, i) => (
            <motion.div key={t.name} className="team-card"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55, ease: [0.2,0.8,0.2,1] }}>
              <div className="team-avatar" style={{ background: t.grad }}>{t.initials}</div>
              <h3>{t.name}</h3>
              <span className="team-role">{t.role}</span>
              <p>{t.desc}</p>
              <div className="team-skills">{t.skills.map(s => <span key={s}>{s}</span>)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
