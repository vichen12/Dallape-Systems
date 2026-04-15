"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  Globe,
  Zap,
  ArrowRight,
  MessageCircle,
  Terminal,
  MapPin,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════════
   ANIMATED COUNTER — Eased curve, not linear
   ═══════════════════════════════════════════════════════════════════════════ */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo curve
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════════
   MAGNETIC SOCIAL BUTTON
   ═══════════════════════════════════════════════════════════════════════════ */
function MagneticSocial({
  icon,
  href,
  label,
  color,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
  color: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.88 }}
      className="group relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
    >
      {/* Background */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-300 group-hover:scale-110"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      />
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          background: `radial-gradient(circle at center, ${color}15, transparent 70%)`,
          border: `1px solid ${color}30`,
        }}
      />
      {/* Icon */}
      <span
        className="relative z-10 transition-colors duration-300"
        style={{ color: "rgba(248,250,252,0.4)" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLSpanElement).style.color = color;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLSpanElement).style.color = "rgba(248,250,252,0.4)";
        }}
      >
        {icon}
      </span>
      {/* Tooltip */}
      <span
        className="absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-wider uppercase px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:-top-10 pointer-events-none whitespace-nowrap"
        style={{
          background: "rgba(15,23,42,0.95)",
          border: `1px solid ${color}25`,
          color: color,
          backdropFilter: "blur(8px)",
        }}
      >
        {label}
      </span>
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   TERMINAL EASTER EGG
   ═══════════════════════════════════════════════════════════════════════════ */
function TerminalEasterEgg() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);

  const terminalLines = [
    "$ whoami",
    "vincenzo_dallape",
    "$ cat skills.txt",
    "fullstack · mobile · erp · ecommerce · ai · iot",
    "$ uptime",
    "3 years, 0 days without downtime",
    "$ echo $STATUS",
    "[OK] disponible para nuevos proyectos",
    "$ location",
    "Mendoza, Argentina — working globally",
    "$ exit",
    "Listo para arrancar?  wa.me/5492612071048",
  ];

  useEffect(() => {
    if (!open) {
      setLines([]);
      setCurrentLine(0);
      return;
    }
    if (currentLine >= terminalLines.length) return;
    const delay = terminalLines[currentLine].startsWith("$") ? 400 : 120;
    const t = setTimeout(() => {
      setLines((prev) => [...prev, terminalLines[currentLine]]);
      setCurrentLine((prev) => prev + 1);
    }, delay);
    return () => clearTimeout(t);
  }, [open, currentLine]);

  return (
    <>
      {/* Trigger */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05, borderColor: "rgba(99,102,241,0.4)" }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-mono transition-all duration-200"
        style={{
          background: "rgba(99,102,241,0.06)",
          border: "1px solid rgba(99,102,241,0.12)",
          color: "rgba(99,102,241,0.5)",
        }}
      >
        <Terminal size={12} />
        <span className="tracking-wider uppercase">{open ? "cerrar" : "./about.sh"}</span>
      </motion.button>

      {/* Terminal window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: 8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(3,7,18,0.9)",
              border: "1px solid rgba(99,102,241,0.12)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Chrome bar */}
            <div
              className="flex items-center gap-2 px-4 py-2.5 border-b"
              style={{ borderColor: "rgba(255,255,255,0.04)" }}
            >
              <div className="flex gap-1.5">
                {["#FF5F57", "#FFBD2E", "#28C840"].map((c) => (
                  <div
                    key={c}
                    className="w-2 h-2 rounded-full"
                    style={{ background: c, opacity: 0.5 }}
                  />
                ))}
              </div>
              <span
                className="text-[9px] font-mono tracking-wider ml-2"
                style={{ color: "rgba(248,250,252,0.15)" }}
              >
                dallape@mendoza ~ %
              </span>
            </div>
            {/* Content */}
            <div className="px-4 py-3 space-y-0.5 max-h-52 overflow-y-auto">
              {lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-[11px] font-mono leading-relaxed"
                  style={{
                    color: line.startsWith("$")
                      ? "rgba(99,102,241,0.8)"
                      : line.includes("[OK]") || line.includes("globally")
                        ? "rgba(16,185,129,0.8)"
                        : line.includes("wa.me")
                          ? "rgba(139,92,246,0.7)"
                          : "rgba(248,250,252,0.45)",
                  }}
                >
                  {line}
                </motion.p>
              ))}
              {currentLine < terminalLines.length && (
                <motion.span
                  className="inline-block w-[6px] h-[14px] rounded-sm"
                  style={{ background: "#6366F1" }}
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN FOOTER
   ═══════════════════════════════════════════════════════════════════════════ */
export default function Footer() {
  const [mendozaTime, setMendozaTime] = useState("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const tick = () =>
      setMendozaTime(
        new Intl.DateTimeFormat("es-AR", {
          timeZone: "America/Argentina/Mendoza",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const stats = [
    { value: 20, suffix: "+", label: "Proyectos entregados", color: "#6366F1" },
    { value: 15, suffix: "+", label: "Clientes satisfechos", color: "#10B981" },
    { value: 3, suffix: "+", label: "Años de experiencia", color: "#8B5CF6" },
    { value: 100, suffix: "%", label: "Satisfacción", color: "#F59E0B" },
  ];

  const socials = [
    { icon: <Github size={18} />, href: "https://github.com/", label: "GitHub", color: "#F8FAFC" },
    { icon: <Linkedin size={18} />, href: "https://linkedin.com/", label: "LinkedIn", color: "#0A66C2" },
    { icon: <Mail size={18} />, href: "mailto:dallapevichen12@gmail.com", label: "Email", color: "#6366F1" },
  ];

  const links = [
    { label: "Servicios", href: "#servicios" },
    { label: "Sobre mí", href: "#About" },
    { label: "IA Demo", href: "#AiSection" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <footer ref={footerRef} className="relative w-full overflow-x-hidden">
      {/* ── Background: starts transparent, fades to solid #030712 at 180px ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0px, #030712 180px)",
          zIndex: 0,
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════════
         SECTION 1 — MEGA CTA
         ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative py-24 sm:py-36 px-5 sm:px-8 overflow-hidden">

        {/* Ambient gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(800px,95vw)] h-96 rounded-full bg-electric-indigo/8 blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-emerald-neon/5 blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* CTA badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-10"
          >
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
              style={{
                background: "rgba(99,102,241,0.05)",
                border: "1px solid rgba(99,102,241,0.15)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full animate-ping opacity-50 bg-emerald-neon" />
                <span
                  className="relative rounded-full h-2 w-2 bg-emerald-neon"
                  style={{ boxShadow: "0 0 8px rgba(16,185,129,0.5)" }}
                />
              </span>
              <span className="text-[10px] font-mono text-electric-indigo uppercase tracking-[0.35em]">
                Disponible para proyectos
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center mb-6"
          >
            <h2 className="text-[clamp(40px,9vw,96px)] font-black leading-[0.95] tracking-[-0.04em] text-ghost-white">
              ¿Tenés una idea
              <br />
              <span className="relative inline-block">
                <span
                  style={{
                    background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 45%, #10B981 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  que construir?
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #6366F1, #8B5CF6, #10B981)",
                    opacity: 0.45,
                  }}
                  initial={{ scaleX: 0, transformOrigin: "left" }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-[15px] sm:text-[17px] max-w-xl mx-auto leading-[1.7] mb-12"
            style={{ color: "rgba(248,250,252,0.35)" }}
          >
            Desde una landing que convierte hasta un ERP a medida.
            <br className="hidden sm:block" />
            Respuesta directa, sin intermediarios, sin agencias.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            {/* Primary CTA */}
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center gap-3 px-9 py-4.5 rounded-2xl font-bold text-white overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #4F46E5, #6D28D9)",
                boxShadow:
                  "0 0 0 1px rgba(99,102,241,0.3), 0 4px 24px rgba(79,70,229,0.35), 0 12px 48px rgba(79,70,229,0.15)",
              }}
            >
              {/* Shimmer */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 60%, transparent 80%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s ease-in-out infinite",
                }}
              />
              <Zap size={18} className="relative z-10" />
              <span className="relative z-10 text-[15px]">Iniciar Proyecto</span>
              <ArrowRight
                size={16}
                className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300"
              />
            </motion.a>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/5492612071048"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => sendGAEvent({ event: "generate_lead", value: "whatsapp_footer" })}
              className="group flex items-center gap-3 px-9 py-4.5 rounded-2xl font-bold transition-all duration-300"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                color: "#F8FAFC",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(16,185,129,0.3)";
                e.currentTarget.style.background = "rgba(16,185,129,0.06)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(16,185,129,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <MessageCircle size={18} className="text-emerald-neon/70 group-hover:text-emerald-neon transition-colors" />
              <span className="text-[15px]">Escribir por WhatsApp</span>
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-px"
          >
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center">
                <div className="flex flex-col items-center px-8 sm:px-12 py-3">
                  <span
                    className="text-3xl sm:text-4xl font-black tracking-tight tabular-nums"
                    style={{ color: s.color }}
                  >
                    <Counter to={s.value} suffix={s.suffix} />
                  </span>
                  <span
                    className="text-[10px] font-mono uppercase tracking-[0.18em] mt-1"
                    style={{ color: "rgba(248,250,252,0.22)" }}
                  >
                    {s.label}
                  </span>
                </div>
                {i < stats.length - 1 && (
                  <div
                    className="w-px h-8 self-center flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Separator ── */}
      <div className="relative px-5 sm:px-8">
        <div
          className="h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.25) 30%, rgba(16,185,129,0.15) 70%, transparent)",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
         SECTION 3 — CONTENT GRID
         ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

            {/* ── Col 1: Brand + Terminal ── */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Brand name */}
                <h3
                  className="text-[clamp(56px,12vw,110px)] font-black leading-[0.85] tracking-[-0.06em] mb-1"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(248,250,252,0.95) 0%, rgba(248,250,252,0.08) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  DALLAPÉ
                </h3>
                <p className="text-[11px] font-mono tracking-[0.5em] text-electric-indigo/60 uppercase mb-8">
                  Systems · Development Studio
                </p>

                {/* Socials */}
                <div className="flex items-center gap-3 mb-8">
                  {socials.map((s) => (
                    <MagneticSocial key={s.label} {...s} />
                  ))}
                </div>

                {/* Terminal Easter Egg */}
                <TerminalEasterEgg />
              </motion.div>
            </div>

            {/* ── Col 2: Navigation ── */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p
                  className="text-[10px] font-mono uppercase tracking-[0.35em] mb-6"
                  style={{ color: "rgba(248,250,252,0.2)" }}
                >
                  Navegación
                </p>
                <ul className="space-y-1">
                  {links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        onMouseEnter={() => setHoveredLink(l.label)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="group flex items-center gap-2.5 py-2 px-3 -mx-3 rounded-xl transition-all duration-200"
                        style={{
                          background:
                            hoveredLink === l.label
                              ? "rgba(99,102,241,0.06)"
                              : "transparent",
                        }}
                      >
                        <motion.span
                          className="w-1 h-1 rounded-full"
                          style={{ background: "#6366F1" }}
                          animate={{
                            scale: hoveredLink === l.label ? 1.8 : 1,
                            opacity: hoveredLink === l.label ? 1 : 0.3,
                          }}
                          transition={{ duration: 0.15 }}
                        />
                        <span
                          className="text-[14px] transition-colors duration-200"
                          style={{
                            color:
                              hoveredLink === l.label
                                ? "#F8FAFC"
                                : "rgba(248,250,252,0.35)",
                          }}
                        >
                          {l.label}
                        </span>
                        <ChevronRight
                          size={12}
                          className="ml-auto transition-all duration-200"
                          style={{
                            opacity: hoveredLink === l.label ? 0.5 : 0,
                            transform:
                              hoveredLink === l.label
                                ? "translateX(0)"
                                : "translateX(-4px)",
                            color: "#6366F1",
                          }}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* ── Col 3: Contact card ── */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p
                  className="text-[10px] font-mono uppercase tracking-[0.35em] mb-6"
                  style={{ color: "rgba(248,250,252,0.2)" }}
                >
                  Contacto
                </p>

                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    backdropFilter: "blur(24px)",
                    boxShadow:
                      "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
                  }}
                >
                  {/* Card header with gradient */}
                  <div
                    className="px-5 py-4 border-b"
                    style={{
                      borderColor: "rgba(255,255,255,0.04)",
                      background: "linear-gradient(135deg, rgba(99,102,241,0.04), rgba(16,185,129,0.02))",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                          boxShadow: "0 0 16px rgba(79,70,229,0.25)",
                        }}
                      >
                        <span className="text-white font-bold text-[13px]">VD</span>
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-ghost-white">
                          Vincenzo Dallape
                        </p>
                        <p className="text-[10px] font-mono" style={{ color: "rgba(248,250,252,0.3)" }}>
                          Fullstack Developer
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="px-5 py-4 space-y-3.5">
                    {/* Email */}
                    <a
                      href="mailto:dallapevichen12@gmail.com"
                      className="group flex items-center gap-3 py-2 px-3 -mx-3 rounded-xl transition-all duration-200 hover:bg-white/[0.02]"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "rgba(99,102,241,0.08)",
                          border: "1px solid rgba(99,102,241,0.12)",
                        }}
                      >
                        <Mail size={13} className="text-electric-indigo/70" />
                      </div>
                      <span
                        className="text-[12px] truncate transition-colors duration-200"
                        style={{ color: "rgba(248,250,252,0.4)" }}
                      >
                        dallapevichen12@gmail.com
                      </span>
                      <ExternalLink
                        size={10}
                        className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-40 transition-opacity"
                        style={{ color: "#6366F1" }}
                      />
                    </a>

                    {/* Location */}
                    <div className="flex items-center gap-3 py-2 px-3 -mx-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "rgba(139,92,246,0.08)",
                          border: "1px solid rgba(139,92,246,0.12)",
                        }}
                      >
                        <MapPin size={13} style={{ color: "rgba(139,92,246,0.7)" }} />
                      </div>
                      <span
                        className="text-[12px]"
                        style={{ color: "rgba(248,250,252,0.4)" }}
                      >
                        Mendoza, Argentina
                      </span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-3 py-2 px-3 -mx-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "rgba(16,185,129,0.08)",
                          border: "1px solid rgba(16,185,129,0.12)",
                        }}
                      >
                        <Globe size={13} className="text-emerald-neon/70" />
                      </div>
                      <span
                        className="text-[12px] font-mono tabular-nums"
                        style={{ color: "rgba(248,250,252,0.4)" }}
                      >
                        {mendozaTime}
                      </span>
                      <span
                        className="text-[9px] font-mono tracking-wider uppercase"
                        style={{ color: "rgba(248,250,252,0.15)" }}
                      >
                        ART (UTC-3)
                      </span>
                    </div>

                    {/* Divider */}
                    <div
                      className="h-px mx-1"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
                      }}
                    />

                    {/* Status */}
                    <div className="flex items-center justify-between px-3 -mx-3 py-1">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inset-0 rounded-full animate-ping opacity-60 bg-emerald-neon" />
                          <span
                            className="relative rounded-full h-2 w-2 bg-emerald-neon"
                            style={{ boxShadow: "0 0 8px rgba(16,185,129,0.5)" }}
                          />
                        </span>
                        <span className="text-[11px] font-mono text-emerald-neon/80">
                          Disponible ahora
                        </span>
                      </div>
                      <a
                        href="https://wa.me/5492612071048"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-lg transition-all duration-200"
                        style={{
                          background: "rgba(16,185,129,0.08)",
                          border: "1px solid rgba(16,185,129,0.15)",
                          color: "rgba(16,185,129,0.7)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(16,185,129,0.15)";
                          e.currentTarget.style.borderColor = "rgba(16,185,129,0.3)";
                          e.currentTarget.style.color = "#10B981";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(16,185,129,0.08)";
                          e.currentTarget.style.borderColor = "rgba(16,185,129,0.15)";
                          e.currentTarget.style.color = "rgba(16,185,129,0.7)";
                        }}
                      >
                        Contactar
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
         SECTION 4 — BOTTOM BAR
         ══════════════════════════════════════════════════════════════════════ */}
      <div
        className="border-t px-5 sm:px-8 py-5"
        style={{ borderColor: "rgba(255,255,255,0.04)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-3">
            <div
              className="w-1 h-1 rounded-full"
              style={{ background: "rgba(99,102,241,0.3)" }}
            />
            <p
              className="text-[10px] font-mono uppercase tracking-[0.15em] text-center sm:text-left"
              style={{ color: "rgba(248,250,252,0.15)" }}
            >
              © {new Date().getFullYear()} Dallape Systems — Diseñado y construido
              en Mendoza, Argentina
            </p>
          </div>

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="group flex items-center gap-2.5 text-[10px] font-mono uppercase tracking-[0.2em] transition-colors duration-200"
            style={{ color: "rgba(248,250,252,0.2)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(99,102,241,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(248,250,252,0.2)";
            }}
          >
            Volver al inicio
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <ArrowUp size={12} />
            </div>
          </motion.button>
        </div>
      </div>

      {/* ── Ambient bottom glows ── */}
      <div className="absolute bottom-0 left-[-5%] w-[min(400px,55vw)] h-64 bg-electric-indigo/6 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-[-5%] w-[min(350px,50vw)] h-56 bg-emerald-neon/4 blur-[120px] rounded-full pointer-events-none" />

      {/* Shimmer keyframe (injected once) */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </footer>
  );
}