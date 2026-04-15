"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, Palette, ShoppingCart, Bot, Gauge, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    id: "01",
    icon: Globe,
    category: "Desarrollo Web",
    headline: "Aplicaciones que escalan.",
    sub: "Desde una landing que convierte hasta una plataforma SaaS compleja. Next.js, React, Node y lo que el proyecto pida.",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
    color: "#6366F1",
    span: 2,
  },
  {
    id: "02",
    icon: Smartphone,
    category: "Apps Móviles",
    headline: "Nativo.\nFluido.\nSin excusas.",
    sub: "iOS y Android con React Native. Apps que se sienten reales.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    color: "#8B5CF6",
    span: 1,
  },
  {
    id: "03",
    icon: Palette,
    category: "Diseño UI/UX",
    headline: "Bonito\ny que\nfuncione.",
    sub: "Sistemas de diseño en Figma, prototipado, testing con usuarios.",
    tags: ["Figma", "Design Systems", "Prototipado"],
    color: "#06B6D4",
    span: 1,
  },
  {
    id: "04",
    icon: ShoppingCart,
    category: "E-Commerce",
    headline: "Tu tienda,\nsin\nlímites.",
    sub: "Shopify custom, tiendas headless, pasarelas de pago.",
    tags: ["Shopify", "WooCommerce", "Stripe"],
    color: "#EC4899",
    span: 1,
  },
  {
    id: "05",
    icon: Bot,
    category: "Automatización & IA",
    headline: "Procesos\nque se\nmanejan solos.",
    sub: "Workflows con n8n, LLMs, scraping, bots. Si tiene lógica, lo automatizo.",
    tags: ["n8n", "OpenAI API", "Python", "Zapier"],
    color: "#10B981",
    span: 1,
  },
  {
    id: "06",
    icon: Gauge,
    category: "Performance & SEO",
    headline: "Google te encuentra.\nUsuarios se quedan.",
    sub: "Core Web Vitals, SEO técnico, velocidad real. Un sitio lento es dinero perdido. Auditorías completas, optimización y reportes mensuales.",
    tags: ["Core Web Vitals", "SEO Técnico", "Lighthouse", "Analytics", "Schema.org"],
    color: "#F59E0B",
    span: 3,
  },
];

const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) => {
  const Icon = service.icon;
  const isWide = service.span === 2;
  const isFull = service.span === 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col overflow-hidden cursor-default rounded-2xl
        ${isFull ? "lg:col-span-3" : isWide ? "lg:col-span-2" : "lg:col-span-1"}
      `}
      style={{
        background: `linear-gradient(145deg, rgba(13,20,36,0.95) 0%, rgba(8,12,24,0.98) 100%)`,
        border: `1px solid rgba(255,255,255,0.07)`,
      }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      {/* Gradient glow BG — always visible at low opacity, brightens on hover */}
      <div
        className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 0% 0%, ${service.color}22 0%, transparent 55%)`,
        }}
      />

      {/* Bottom-right secondary glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 100% 100%, ${service.color}10 0%, transparent 50%)`,
        }}
      />

      {/* Animated top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${service.color}80 50%, transparent 100%)`,
          opacity: 0.4,
          transition: "opacity 0.4s",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px group-hover:opacity-100 transition-opacity duration-400"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${service.color} 50%, transparent 100%)`,
          opacity: 0,
        }}
      />

      {/* ── Full-width card (06) ── */}
      {isFull ? (
        <div className="relative z-10 p-8 sm:p-10 flex flex-col sm:flex-row gap-10 sm:items-center">
          {/* Left */}
          <div className="flex items-center gap-5 flex-shrink-0">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `${service.color}12`,
                border: `1px solid ${service.color}30`,
                boxShadow: `0 0 24px ${service.color}20`,
              }}
            >
              <Icon size={28} style={{ color: service.color }} />
            </div>
            <span
              className="font-mono font-black select-none leading-none text-[5rem]"
              style={{ color: `${service.color}0F` }}
            >
              {service.id}
            </span>
          </div>

          {/* Divider */}
          <div
            className="hidden sm:block w-px self-stretch flex-shrink-0"
            style={{ background: `${service.color}18` }}
          />

          {/* Center */}
          <div className="flex-1 min-w-0">
            <span
              className="text-[10px] font-mono tracking-[0.35em] uppercase mb-2 block"
              style={{ color: service.color }}
            >
              {service.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-ghost-white mb-2 leading-tight whitespace-pre-line">
              {service.headline}
            </h3>
            <p className="text-[13px] text-slate-400 leading-relaxed max-w-xl">
              {service.sub}
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4 flex-shrink-0">
            <div className="flex flex-wrap gap-1.5">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-mono"
                  style={{
                    background: `${service.color}0C`,
                    border: `1px solid ${service.color}20`,
                    color: `${service.color}CC`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="#contacto"
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold w-fit group-hover:gap-2.5 transition-all duration-200"
              style={{ color: service.color }}
            >
              <ArrowRight size={13} />
              Consultar
            </a>
          </div>
        </div>
      ) : (
        /* ── Normal / Wide card ── */
        <div className={`relative z-10 flex h-full p-7 ${isWide ? "sm:flex-row sm:gap-10 sm:items-start" : "flex-col"}`}>
          {/* Icon + big number */}
          <div className={`flex items-center gap-4 ${isWide ? "sm:flex-col sm:items-start sm:flex-shrink-0 sm:w-28 mb-5 sm:mb-0 sm:pt-1" : "mb-6"}`}>
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `${service.color}12`,
                border: `1px solid ${service.color}28`,
                boxShadow: `0 0 20px ${service.color}18`,
              }}
            >
              <Icon size={21} style={{ color: service.color }} />
            </div>
            <span
              className={`font-mono font-black select-none leading-none ${isWide ? "text-[5.5rem] hidden sm:block mt-2" : "text-[3.5rem]"}`}
              style={{ color: `${service.color}10` }}
            >
              {service.id}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 min-w-0">
            <span
              className="text-[9px] font-mono tracking-[0.38em] uppercase mb-2 block"
              style={{ color: service.color }}
            >
              {service.category}
            </span>
            <h3
              className={`font-black text-ghost-white leading-tight mb-3 ${
                isWide ? "text-2xl sm:text-[1.75rem]" : "text-xl whitespace-pre-line"
              }`}
            >
              {isWide ? service.headline.replace(/\n/g, " ") : service.headline}
            </h3>
            <p className={`text-[12.5px] text-slate-400 leading-relaxed mb-5 flex-1 ${isWide ? "max-w-sm" : ""}`}>
              {service.sub}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-md text-[10px] font-mono"
                  style={{
                    background: `${service.color}0C`,
                    border: `1px solid ${service.color}1E`,
                    color: `${service.color}BB`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="#contacto"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold w-fit group-hover:gap-2.5 transition-all duration-200"
              style={{ color: `${service.color}AA` }}
            >
              <ArrowRight size={12} />
              Consultar
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const Ticker = () => {
  const words = ["Desarrollo Web", "Apps Móviles", "UI/UX", "E-Commerce", "Automatización", "IA & Bots", "SEO", "Performance", "React Native", "Next.js", "Shopify", "n8n"];
  const colors = ["#6366F1", "#10B981", "#8B5CF6", "#EC4899", "#06B6D4", "#F59E0B"];
  const items = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y py-3.5 border-white/5 mb-14">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-2.5 text-[10px] font-mono tracking-[0.2em] uppercase text-slate-600">
            <span className="w-1 h-1 rounded-full inline-block flex-shrink-0" style={{ background: colors[i % colors.length] }} />
            {w}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Services = () => (
  <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12">
    <div className="relative z-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono tracking-[0.4em] uppercase mb-5 flex items-center gap-3 text-electric-indigo"
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

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-ghost-white mb-4"
          >
            Todo lo que necesita{" "}
            <span className="gradient-text">tu negocio digital.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-[14px] leading-relaxed"
          >
            Sin agencias, sin intermediarios, sin vueltas.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3 flex-shrink-0"
        >
          <span className="text-5xl font-black text-electric-indigo/10">06</span>
          <span className="text-[10px] text-slate-600 font-mono uppercase tracking-widest leading-snug">
            servicios<br />disponibles
          </span>
        </motion.div>
      </div>

      <Ticker />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.id} service={s} index={i} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-16 flex flex-col items-center text-center gap-5"
      >
        <p className="text-sm text-slate-500">
          ¿Tenés algo que no entra en ninguna de estas cajas?{" "}
          <span className="text-slate-300">Igual hablemos.</span>
        </p>

        <motion.a
          href="#contacto"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="px-9 py-3.5 rounded-xl font-bold text-[14px] text-white flex items-center gap-2"
          style={{ background: "linear-gradient(135deg, #4F46E5, #6D28D9)" }}
        >
          Hablemos de tu proyecto
          <ArrowRight size={15} />
        </motion.a>

        <div className="flex flex-wrap justify-center gap-6">
          {["Respuesta en 24h", "Sin contratos largos", "Resultados medibles"].map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-xs flex items-center gap-2 text-slate-500"
            >
              <span className="w-1 h-1 rounded-full" style={{ background: "#10B981" }} />
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Services;
