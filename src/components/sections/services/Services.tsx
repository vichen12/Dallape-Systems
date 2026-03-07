"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "01",
    category: "Desarrollo Web",
    headline: "Aplicaciones que escalan.",
    sub: "Desde una landing que convierte hasta una plataforma SaaS compleja. Next.js, React, Node y lo que el proyecto pida. Si existe, lo construyo.",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
    color: "#6366F1", // Tu Electric Indigo
    svgPath: "M16 18l6-6-6-6M8 6L2 12l6 6",
  },
  {
    id: "02",
    category: "Apps Móviles",
    headline: "Nativo. Fluido. Sin excusas.",
    sub: "iOS y Android con React Native o Flutter. Apps que se sienten reales, no ports de web. UX pensada para dedos.",
    tags: ["React Native", "Flutter", "iOS", "Android", "Expo"],
    color: "#10B981", // Tu Emerald Neon
    svgPath:
      "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 18h.01",
  },
  {
    id: "03",
    category: "Diseño UI/UX",
    headline: "Bonito y que funcione.",
    sub: "Sistemas de diseño en Figma, prototipado, testing. No solo se ve bien — convierte. El usuario lo entiende sin tutorial.",
    tags: ["Figma", "Design Systems", "Prototipado", "User Testing"],
    color: "#F59E0B",
    svgPath: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 8v4l3 3",
  },
  {
    id: "04",
    category: "E-Commerce",
    headline: "Tu tienda, sin límites.",
    sub: "Shopify custom, tiendas headless, pasarelas de pago, stock en tiempo real. Construido para vender, no solo para mostrar.",
    tags: ["Shopify", "WooCommerce", "Stripe", "Headless CMS"],
    color: "#EC4899",
    svgPath:
      "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
  },
  {
    id: "05",
    category: "Automatización & IA",
    headline: "Procesos que se manejan solos.",
    sub: "Workflows con n8n, integraciones de LLMs, scraping, bots, pipelines de datos. Si es repetitivo, lo automatizo.",
    tags: ["n8n", "OpenAI API", "Python", "Zapier", "Web Scraping"],
    color: "#8B5CF6",
    svgPath:
      "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83",
  },
  {
    id: "06",
    category: "Performance & SEO",
    headline: "Google te encuentra. Usuarios se quedan.",
    sub: "Core Web Vitals, SEO técnico, velocidad real. Un sitio lento es dinero perdido. Lo optimizo hasta que Lighthouse llore de felicidad.",
    tags: ["Core Web Vitals", "SEO Técnico", "Lighthouse", "Analytics"],
    color: "#06B6D4",
    svgPath: "M22 7L13.5 15.5 8.5 10.5 2 17M16 7h6v6",
  },
];

// ─── Magnetic CTA ──────────────────────────────────────────────────────────────
const MagneticCTA = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 20 });
  const sy = useSpring(y, { stiffness: 280, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.32);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className="relative px-10 py-5 rounded-2xl font-semibold text-sm overflow-hidden text-white"
    >
      <span
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg,#6366F1,#8B5CF6,#10B981)",
        }}
      />
      <span
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(135deg,#4F52E0,#7C3AED,#059669)",
        }}
      />
      <span className="relative z-10 flex items-center gap-2">
        Hablemos de tu proyecto
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          →
        </motion.span>
      </span>
    </motion.button>
  );
};

// ─── Service Card ──────────────────────────────────────────────────────────────
const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const enter = () => {
    setHovered(true);
    if (ref.current)
      gsap.to(ref.current, {
        scale: 1.025,
        duration: 0.38,
        ease: "power2.out",
      });
  };
  const leave = () => {
    setHovered(false);
    if (ref.current)
      gsap.to(ref.current, { scale: 1, duration: 0.38, ease: "power2.out" });
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={enter}
      onMouseLeave={leave}
      initial={{ opacity: 0, y: 56, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{
        duration: 0.85,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      // 👇 AQUÍ APLICAMOS TU DISEÑO: bg-obsidian-slate y bordes finos
      className="relative overflow-hidden rounded-[28px] flex flex-col bg-obsidian-slate/70 backdrop-blur-md border border-bento-border/50"
      style={{
        minHeight: 300,
      }}
    >
      {/* Glow border */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 rounded-[28px] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              boxShadow: `inset 0 0 0 1px ${service.color}45, 0 0 50px ${service.color}12`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        animate={{ opacity: hovered ? 0.85 : 0.18 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `linear-gradient(90deg,transparent,${service.color},transparent)`,
        }}
      />

      {/* Radial glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          top: -70,
          right: -70,
          filter: "blur(35px)",
          background: `radial-gradient(circle,${service.color}20 0%,transparent 70%)`,
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <div className="relative z-10 p-8 flex flex-col flex-1">
        {/* Top row */}
        <div className="flex items-start justify-between mb-6">
          {/* Icon */}
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm"
            style={{
              background: `${service.color}15`,
              border: `1px solid ${service.color}30`,
            }}
            animate={{
              boxShadow: hovered ? `0 0 22px ${service.color}35` : "none",
            }}
            transition={{ duration: 0.3 }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke={service.color}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d={service.svgPath} />
            </svg>
          </motion.div>
          {/* Watermark number */}
          <span
            className="font-mono text-6xl font-black select-none leading-none"
            style={{ color: `${service.color}10` }}
          >
            {service.id}
          </span>
        </div>

        {/* Category */}
        <motion.span
          className="text-xs font-mono tracking-[0.28em] uppercase mb-3 block"
          style={{ color: service.color }}
          animate={{ opacity: hovered ? 1 : 0.65 }}
          transition={{ duration: 0.3 }}
        >
          {service.category}
        </motion.span>

        {/* Headline */}
        <h3 className="text-[1.35rem] font-bold mb-3 leading-snug text-ghost-white">
          {service.headline}
        </h3>

        {/* Description */}
        <motion.p
          className="text-sm leading-relaxed flex-1 mb-6 text-slate-400"
          animate={{
            color: hovered ? "rgba(248,250,252,0.9)" : "rgba(148,163,184,0.8)",
          }}
          transition={{ duration: 0.3 }}
        >
          {service.sub}
        </motion.p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag, i) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-300"
              style={{
                background: hovered
                  ? `${service.color}16`
                  : "rgba(255,255,255,0.04)",
                border: `1px solid ${hovered ? service.color + "32" : "rgba(255,255,255,0.07)"}`,
                color: hovered ? service.color : "rgba(248,250,252,0.35)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Scrolling Ticker ──────────────────────────────────────────────────────────
const Ticker = () => {
  const words = [
    "Desarrollo Web",
    "Apps Móviles",
    "UI/UX",
    "E-Commerce",
    "Automatización",
    "IA & Bots",
    "SEO",
    "Performance",
    "React Native",
    "Next.js",
    "Shopify",
    "n8n",
  ];
  const colors = [
    "#6366F1",
    "#10B981",
    "#F59E0B",
    "#EC4899",
    "#8B5CF6",
    "#06B6D4",
  ];
  const items = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y py-4 my-20 border-white/5">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {items.map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-3 text-xs font-mono tracking-[0.22em] uppercase text-slate-500"
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
              style={{ background: colors[i % colors.length] }}
            />
            {w}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ─── Main ──────────────────────────────────────────────────────────────────────
const Services = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll<HTMLElement>(".gsap-char");
    if (!chars.length) return;
    gsap.fromTo(
      chars,
      { y: 90, opacity: 0, rotateX: -50 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.75,
        stagger: 0.03,
        ease: "power4.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 82%" },
      },
    );
  }, []);

  const lines = ["Todo lo que", "tu negocio digital", "necesita."];

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12">
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute top-0 left-[10%] w-[min(600px,80vw)] h-[min(600px,80vw)] rounded-full blur-[120px] bg-electric-indigo/20" />
        <div className="absolute bottom-0 right-[5%] w-[min(500px,70vw)] h-[min(500px,70vw)] rounded-full blur-[100px] bg-emerald-neon/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-2">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono tracking-[0.4em] uppercase mb-8 flex items-center gap-3 text-electric-indigo"
          >
            <motion.span
              className="h-px w-8 bg-electric-indigo inline-block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            Servicios
          </motion.p>

          <h2
            ref={titleRef}
            className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black leading-[1.05] tracking-tight mb-6"
            style={{ perspective: "600px" }}
          >
            {lines.map((line, li) => (
              <div key={li} className="overflow-hidden block">
                {line.split("").map((ch, ci) => (
                  <span
                    key={ci}
                    className="gsap-char inline-block"
                    style={{
                      whiteSpace: ch === " " ? "pre" : undefined,
                      ...(li === 1
                        ? {
                            background:
                              "linear-gradient(135deg,#6366F1,#10B981)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }
                        : { color: "#F8FAFC" }),
                    }}
                  >
                    {ch}
                  </span>
                ))}
              </div>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-base max-w-lg leading-[1.75] text-slate-400"
          >
            Cualquier problema que tenga tu negocio en el mundo digital, lo
            resuelvo. Sin agencias, sin intermediarios, sin vueltas.
          </motion.p>
        </div>

        <Ticker />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.25 }}
          className="mt-24 flex flex-col items-center text-center gap-6"
        >
          <div className="flex items-center gap-4 mb-1 opacity-50">
            <div className="h-px w-20 bg-white/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-electric-indigo" />
            <div className="h-px w-20 bg-white/10" />
          </div>
          <p className="text-sm text-slate-500">
            ¿Tenés algo que no entra en ninguna de estas cajas?{" "}
            <span className="text-slate-300">Igual hablemos.</span>
          </p>

          <MagneticCTA />

          <div className="flex flex-wrap justify-center items-center gap-6 mt-2">
            {[
              "Respuesta en 24h",
              "Sin contratos largos",
              "Resultados medibles",
            ].map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-xs flex items-center gap-2 text-slate-400"
              >
                <span className="text-emerald-neon">✓</span> {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
