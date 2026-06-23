"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const links = [
  { href: "#krisis", label: "Krisis" },
  { href: "#cara", label: "Cara Main" },
  { href: "#impact", label: "Impact" },
  { href: "#tim", label: "Tim" },
  { href: "/#board", label: "Leaderboard" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`lp-nav${scrolled ? " scrolled" : ""}`} ref={navRef}>
      <div className="wrap nav-inner">
        <Link href="/" className="brand">
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="26" height="26" rx="8" fill="url(#nlg)" />
            <path d="M11 20.5c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16" cy="11.5" r="3.2" stroke="#fff" strokeWidth="2" />
            <defs><linearGradient id="nlg" x1="3" y1="3" x2="29" y2="29"><stop stopColor="#4f7eff" /><stop offset="1" stopColor="#7b47ff" /></linearGradient></defs>
          </svg>
          <span className="brand-name">Simkop<em>Quest</em></span>
        </Link>

        <nav className={`nav-links${open ? " open" : ""}`} id="navLinks" aria-label="Menu utama">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </nav>

        <Link href="/#demo" className="btn btn-sm btn-primary nav-cta">🎮 Demo</Link>
        <button className="nav-toggle" id="navToggle"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open} aria-controls="navLinks"
          onClick={() => setOpen(v => !v)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
