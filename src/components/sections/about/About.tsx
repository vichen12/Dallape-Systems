"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STACK = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "PostgreSQL",
  "n8n",
  "OpenAI",
  "AWS",
  "React Native",
  "Stripe",
  "Shopify",
];

const STACK_COLORS: Record<string, string> = {
  "Next.js": "#F8FAFC",
  TypeScript: "#3178C6",
  React: "#61DAFB",
  "Node.js": "#68A063",
  Python: "#F7C948",
  PostgreSQL: "#336791",
  n8n: "#EA4B71",
  OpenAI: "#10B981",
  AWS: "#FF9900",
  "React Native": "#61DAFB",
  Stripe: "#635BFF",
  Shopify: "#95BF47",
};

const STATS = [
  { value: "3+", label: "años exp." },
  { value: "20+", label: "proyectos" },
  { value: "2", label: "países" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  // Animaciones GSAP blindadas (Solo se ejecutan una vez)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true, // MAGIA: Evita que la animación se repita al scrollear de nuevo
        },
      });

      tl.fromTo(
        ".about-wipe",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.8, ease: "power4.inOut" },
      )
        .fromTo(
          ".about-label",
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          ".about-char",
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.02,
            ease: "power4.out",
          },
          "-=0.2",
        )
        .fromTo(
          ".about-body",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .fromTo(
          ".about-stat",
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.5)",
          },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const lines = [
    { text: "El ingeniero", gradient: false },
    { text: "detrás del", gradient: false },
    { text: "código.", gradient: true },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-16 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-28 items-center">
          {/* ────── LADO IZQUIERDO ────── */}
          <div className="flex flex-col">
            {/* Label */}
            <div className="flex items-center gap-4 mb-8">
              <div className="about-wipe h-px w-12 origin-left bg-electric-indigo" />
              <span className="about-label opacity-0 text-xs font-mono tracking-[0.4em] uppercase text-electric-indigo">
                Sobre mí
              </span>
            </div>

            {/* Título Principal */}
            <h2 className="mb-10 space-y-2">
              {lines.map((line, li) => (
                <div key={li} className="overflow-hidden block py-1">
                  {line.text.split("").map((ch, ci) => (
                    <span
                      key={ci}
                      className={`about-char inline-block opacity-0 text-5xl sm:text-6xl md:text-[4.5rem] font-black leading-[1.05] tracking-tight ${line.gradient ? "gradient-text" : "text-ghost-white"}`}
                      style={{ whiteSpace: ch === " " ? "pre" : undefined }}
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              ))}
            </h2>

            {/* Párrafos */}
            <p className="about-body opacity-0 text-base leading-relaxed mb-6 text-slate-300 max-w-lg">
              Cuando trabajás con Dallape Systems, hablás directamente con el
              arquitecto del sistema. Sin vendedores, sin PMs, sin juniors.
            </p>
            <p className="about-body opacity-0 text-sm leading-relaxed text-slate-500 max-w-md">
              Vincenzo Dallapé, Ingeniero en Sistemas, 22 años, Mendoza. Diseño
              arquitecturas robustas, bases de datos escalables e integro IA
              para que tu negocio funcione solo.
            </p>

            {/* Estadísticas */}
            <div className="flex items-center gap-8 mt-10 mb-12 flex-wrap">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="about-stat opacity-0 flex flex-col gap-1"
                >
                  <span className="text-4xl font-black leading-none tabular-nums gradient-text">
                    {s.value}
                  </span>
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                    {s.label}
                  </span>
                </div>
              ))}

              <div className="about-stat opacity-0 h-12 w-px hidden sm:block bg-white/10" />

              <motion.div className="about-stat opacity-0 flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-neon/20 bg-emerald-neon/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inset-0 rounded-full animate-ping opacity-75 bg-emerald-neon" />
                  <span className="relative rounded-full h-2.5 w-2.5 bg-emerald-neon" />
                </span>
                <span className="text-xs font-mono font-medium text-emerald-neon">
                  Disponible
                </span>
              </motion.div>
            </div>

            {/* Stack Tecnológico */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-slate-500">
                  Stack Core
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <div className="flex flex-wrap gap-2.5">
                {STACK.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono cursor-default border border-white/5 bg-white/5 text-slate-400 transition-all duration-300"
                    onMouseEnter={(e) => {
                      const c = STACK_COLORS[tech] || "#6366F1";
                      e.currentTarget.style.background = `${c}15`;
                      e.currentTarget.style.borderColor = `${c}40`;
                      e.currentTarget.style.color = c;
                      e.currentTarget.style.boxShadow = `0 4px 12px ${c}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "";
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.color = "";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: STACK_COLORS[tech] || "#6366F1" }}
                    />
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ────── LADO DERECHO ────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end pt-12 lg:pt-0"
          >
            {/* Esquinas Cyberpunk */}
            <div className="absolute -top-3 -right-3 w-16 h-16 pointer-events-none">
              <div className="absolute top-0 right-0 w-full h-px bg-electric-indigo/50" />
              <div className="absolute top-0 right-0 h-full w-px bg-electric-indigo/50" />
            </div>
            <div className="absolute -bottom-3 -left-3 w-16 h-16 pointer-events-none z-20">
              <div className="absolute bottom-0 left-0 w-full h-px bg-emerald-neon/50" />
              <div className="absolute bottom-0 left-0 h-full w-px bg-emerald-neon/50" />
            </div>

            {/* Glow de fondo */}
            <div className="absolute inset-0 pointer-events-none bg-electric-indigo/15 blur-[60px] rounded-full transform scale-105" />

            {/* Contenedor de la Foto */}
            <div className="relative overflow-hidden rounded-[32px] w-full max-w-[420px] aspect-[4/5] border border-white/10 bg-obsidian-slate shadow-2xl">
              {/* Scanline fluido (Baja y sube sin cortes) */}
              <motion.div
                className="absolute inset-x-0 h-[2px] z-10 bg-gradient-to-r from-transparent via-electric-indigo/60 to-transparent blur-[1px]"
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <Image
                src="/vichen1.png"
                alt="Vincenzo Dallape"
                fill
                priority
                className="object-cover object-top opacity-90 grayscale-[15%] contrast-125"
              />

              {/* Degradado oscuro para integrar la foto al fondo */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-deep-carbon/90 via-transparent to-deep-carbon/20" />
            </div>

            {/* Tarjeta flotante: Proyectos (Animación fluida) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{ y: [0, -12, 0] }}
              transition={{
                opacity: { delay: 0.8, duration: 0.5 },
                scale: { delay: 0.8, duration: 0.5 },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute -bottom-8 left-2 sm:-left-8 px-5 py-3 rounded-2xl glass-effect shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10 z-30"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-electric-indigo/10 border border-electric-indigo/20">
                  <svg
                    className="w-6 h-6 text-electric-indigo"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-xl font-black leading-none mb-1 gradient-text">
                    20+ proyectos
                  </p>
                  <p className="text-xs font-mono text-slate-400">
                    entregados en producción
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tarjeta flotante: Stack (Animación fluida desfasada) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{ y: [0, 8, 0] }}
              transition={{
                opacity: { delay: 1, duration: 0.5 },
                scale: { delay: 1, duration: 0.5 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, // Diferente duración para que no floten igual
              }}
              className="absolute top-12 -left-4 lg:-left-14 px-5 py-4 rounded-2xl hidden md:block glass-effect shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-white/10 z-30"
            >
              <p className="text-[10px] font-mono mb-3 text-slate-400 tracking-wider">
                STACK CORE
              </p>
              <div className="flex flex-col gap-2">
                {["Next.js", "TypeScript", "Node.js"].map((t) => (
                  <div key={t} className="flex items-center gap-2.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: STACK_COLORS[t],
                        boxShadow: `0 0 8px ${STACK_COLORS[t]}80`,
                      }}
                    />
                    <span className="text-xs font-mono font-medium text-slate-300">
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
