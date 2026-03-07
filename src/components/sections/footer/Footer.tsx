"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimationFrame } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  Globe,
  Zap,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

// ─── Animated Counter ────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  useEffect(() => {
    if (!inView) return;
    const steps = 45;
    const inc = to / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= to) {
        setCount(to);
        clearInterval(t);
      } else setCount(Math.floor(cur));
    }, 30);
    return () => clearInterval(t);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Infinite Ticker ─────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "PostgreSQL",
  "n8n",
  "GSAP",
  "Tailwind",
  "Python",
  "AI Integration",
  "Cloud Architecture",
  "Automatización",
  "UX Design",
];

function Ticker() {
  const textRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);

  useAnimationFrame(() => {
    if (!textRef.current) return;
    offsetRef.current -= 0.6;
    const width = textRef.current.scrollWidth / 2;
    if (Math.abs(offsetRef.current) >= width) offsetRef.current = 0;
    textRef.current.style.transform = `translateX(${offsetRef.current}px)`;
  });

  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="overflow-hidden border-y border-white/5 py-3.5 select-none">
      <div ref={textRef} className="flex gap-0 whitespace-nowrap w-max">
        {items.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="text-[12px] font-mono text-slate-500 uppercase tracking-[0.25em] px-5">
              {item}
            </span>
            <span className="text-electric-indigo/30 text-xs">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function Footer() {
  const [mendozaTime, setMendozaTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setMendozaTime(
        new Intl.DateTimeFormat("es-AR", {
          timeZone: "America/Argentina/Mendoza",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const stats = [
    { value: 20, suffix: "+", label: "Proyectos entregados", color: "#6366F1" },
    { value: 100, suffix: "%", label: "Uptime garantizado", color: "#10B981" },
    { value: 3, suffix: "+", label: "Años de experiencia", color: "#6366F1" },
  ];

  const socials = [
    {
      icon: <Github size={18} />,
      href: "https://github.com/",
      label: "GitHub",
    },
    {
      icon: <Linkedin size={18} />,
      href: "https://linkedin.com/",
      label: "LinkedIn",
    },
    {
      icon: <Mail size={18} />,
      href: "mailto:dallapevichen12@gmail.com",
      label: "Email",
    },
  ];

  const links = [
    { label: "Servicios", href: "#servicios" },
    { label: "Sobre mí", href: "#About" },
    { label: "IA Demo", href: "#AiSection" },
    { label: "Testimonios", href: "#Testimonials" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <footer className="relative w-full overflow-x-hidden bg-deep-carbon">
      {/* ── Separator line ── */}
      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-electric-indigo/50 to-transparent" />
        <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-40 h-8 bg-electric-indigo/20 blur-2xl" />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1 — MEGA CTA                                                  */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative py-20 sm:py-32 px-5 sm:px-8 text-center overflow-hidden">
        {/* Radial ambient center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[min(700px,90vw)] h-80 rounded-full bg-electric-indigo/10 blur-[100px]" />
        </div>

        {/* CTA overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-electric-indigo/20 bg-electric-indigo/5 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-neon animate-pulse" />
          <span className="text-[11px] font-mono text-electric-indigo uppercase tracking-[0.3em]">
            Disponible para proyectos
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[clamp(36px,8vw,90px)] font-black leading-[1.0] tracking-[-0.04em] text-ghost-white mb-6"
        >
          ¿Tenés un proyecto{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg,#6366F1 0%,#8B5CF6 50%,#10B981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            en mente?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-10"
        >
          Desde una landing hasta un sistema ERP completo. Hablemos y lo hacemos
          realidad.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white overflow-hidden"
            style={{
              background: "linear-gradient(135deg,#5355E8,#6D28D9)",
              boxShadow: "0 0 40px rgba(83,85,232,0.4)",
            }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(135deg,#6366F1,#8B5CF6,#10B981)",
              }}
            />
            <Zap size={18} className="relative z-10" />
            <span className="relative z-10">Iniciar Proyecto</span>
            <ArrowRight
              size={16}
              className="relative z-10 group-hover:translate-x-1 transition-transform"
            />
          </motion.a>

          <motion.a
            href="https://wa.me/5492612071048"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold border border-white/10 bg-white/5 text-ghost-white hover:border-emerald-neon/30 hover:bg-emerald-neon/5 transition-all"
          >
            <MessageCircle size={18} />
            Escribir por WhatsApp
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <div className="flex flex-wrap items-end justify-center gap-8 sm:gap-16">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col items-center gap-1"
            >
              <span
                className="text-4xl sm:text-5xl font-black"
                style={{ color: s.color }}
              >
                <Counter to={s.value} suffix={s.suffix} />
              </span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.18em] text-center">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2 — TICKER                                                    */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <Ticker />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3 — BRAND + LINKS                                             */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative py-14 sm:py-20 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
          {/* Brand */}
          <div className="text-center lg:text-left">
            <h3
              className="text-[clamp(48px,10vw,100px)] font-black leading-none tracking-[-0.05em] mb-2"
              style={{
                background:
                  "linear-gradient(180deg,rgba(248,250,252,0.9) 0%,rgba(248,250,252,0.12) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DALLAPÉ
            </h3>
            <p className="text-[11px] font-mono tracking-[0.6em] text-electric-indigo uppercase mb-6">
              Systems · Mendoza, AR
            </p>

            {/* Socials */}
            <div className="flex items-center justify-center lg:justify-start gap-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -4, borderColor: "rgba(99,102,241,0.5)" }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl border border-white/8 bg-white/4 flex items-center justify-center text-slate-400 hover:text-ghost-white transition-colors"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav links grid */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-x-12 gap-y-8">
            <div>
              <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.3em] mb-4">
                Navegación
              </p>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group flex items-center gap-1.5 text-sm text-slate-400 hover:text-ghost-white transition-colors"
                    >
                      <span className="w-1 h-1 rounded-full bg-electric-indigo/40 group-hover:bg-electric-indigo transition-colors" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact card */}
            <div className="w-64">
              <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.3em] mb-4">
                Contacto
              </p>
              <div className="p-4 rounded-2xl border border-white/6 bg-white/3 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-electric-indigo/10 border border-electric-indigo/20 flex items-center justify-center shrink-0">
                    <Mail size={13} className="text-electric-indigo" />
                  </div>
                  <a
                    href="mailto:dallapevichen12@gmail.com"
                    className="text-xs text-slate-400 hover:text-ghost-white transition-colors truncate"
                  >
                    dallapevichen12@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-neon/10 border border-emerald-neon/20 flex items-center justify-center shrink-0">
                    <Globe size={13} className="text-emerald-neon" />
                  </div>
                  <span className="text-xs text-slate-400 tabular-nums">
                    {mendozaTime} · ART
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inset-0 rounded-full animate-ping opacity-75 bg-emerald-neon" />
                    <span className="relative rounded-full h-1.5 w-1.5 bg-emerald-neon" />
                  </span>
                  <span className="text-[11px] font-mono text-emerald-neon">
                    Disponible ahora
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 4 — BOTTOM BAR                                               */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="border-t border-white/5 px-5 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] font-mono text-slate-600 uppercase tracking-wider text-center sm:text-left">
            © {new Date().getFullYear()} Dallape Systems — Diseñado y construido
            en Mendoza, Argentina
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Volver al inicio"
            className="flex items-center gap-2 text-[10px] font-mono text-slate-600 hover:text-electric-indigo transition-colors uppercase tracking-widest"
          >
            Volver al inicio
            <div className="w-6 h-6 rounded-lg border border-white/8 bg-white/4 flex items-center justify-center">
              <ArrowUp size={12} />
            </div>
          </motion.button>
        </div>
      </div>

      {/* ── Ambient bottom glows ── */}
      <div className="absolute bottom-0 left-[-5%] w-[min(350px,50vw)] h-56 bg-electric-indigo/8 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-[-5%] w-[min(300px,45vw)] h-48 bg-emerald-neon/5 blur-[100px] rounded-full pointer-events-none" />
    </footer>
  );
}
