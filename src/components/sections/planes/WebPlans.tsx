"use client";

import { motion } from "framer-motion";
import { Check, ArrowUpRight, Wrench, Bot, BarChart3, Zap, HeadphonesIcon } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const PLANS = [
  {
    id: "starter",
    name: "Starter",
    badge: null,
    tagline: "Para negocios que ya tienen web y quieren más visibilidad.",
    color: "#6366F1",
    featured: false,
    price: 35,
    items: [
      "Auditoría SEO completa",
      "Configuración de Google Analytics 4",
      "Alta en Google Search Console",
      "Optimización de velocidad y rendimiento",
      "Corrección de errores técnicos de SEO",
      "Informe mensual de resultados",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    badge: "Más elegido",
    tagline: "Para negocios que necesitan presencia online profesional desde cero.",
    color: "#6366F1",
    featured: true,
    price: 70,
    items: [
      "Todo lo del plan Starter",
      "Landing page profesional desde cero",
      "SEO on-page desde el primer día",
      "Formulario de contacto integrado",
      "Base de datos con consultas guardadas",
      "Integración con WhatsApp",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    badge: null,
    tagline: "Para negocios que quieren una solución digital completa y a medida.",
    color: "#10B981",
    featured: false,
    price: 200,
    items: [
      "Todo lo del plan Growth",
      "Diseño a medida desde cero",
      "Múltiples secciones y páginas",
      "Panel de administración propio",
      "Integración de pagos o reservas",
      "Optimización avanzada de conversión",
      "Soporte prioritario post-entrega",
    ],
  },
];

const EXTRAS = [
  {
    icon: Wrench,
    name: "Mantenimiento Mensual",
    desc: "Tu web siempre al 100%. Actualizaciones de seguridad, backups automáticos, monitoreo y soporte técnico.",
    color: "#8B5CF6",
  },
  {
    icon: BarChart3,
    name: "Sistema de Gestión (ERP)",
    desc: "Stock, facturación, clientes, reportes. Un sistema a medida para tu operación, adaptado 100% a tu rubro.",
    color: "#06B6D4",
  },
  {
    icon: Zap,
    name: "Automatizaciones",
    desc: "Eliminamos las tareas repetitivas. Reportes que se generan solos, datos sincronizados y alertas automáticas.",
    color: "#F59E0B",
  },
  {
    icon: Bot,
    name: "IA para tu Negocio",
    desc: "Chatbot entrenado con la info de tu empresa, asistentes automáticos y análisis de datos con lenguaje natural.",
    color: "#10B981",
  },
  {
    icon: HeadphonesIcon,
    name: "Consultoría Tecnológica",
    desc: "Analizamos tu situación, identificamos cuellos de botella y te damos un plan concreto con pasos y costos reales.",
    color: "#EC4899",
  },
];

// ─── Plan Card ─────────────────────────────────────────────────────────────────
const PlanCard = ({
  plan,
  index,
}: {
  plan: (typeof PLANS)[0];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 ${
      plan.featured ? "scale-[1.02] lg:scale-105" : ""
    }`}
    style={{
      background: plan.featured
        ? "linear-gradient(145deg, #141e38, #0f172a)"
        : "#0d1424",
      border: plan.featured
        ? "1px solid rgba(99,102,241,0.35)"
        : "1px solid rgba(255,255,255,0.07)",
      boxShadow: plan.featured
        ? "0 0 40px rgba(99,102,241,0.15), 0 0 0 1px rgba(99,102,241,0.2)"
        : "none",
    }}
  >
    {/* Glow top for featured */}
    {plan.featured && (
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.8), transparent)",
        }}
      />
    )}

    {/* Badge */}
    {plan.badge && (
      <span
        className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold tracking-wide text-white whitespace-nowrap"
        style={{
          background: "linear-gradient(90deg, #4F46E5, #7C3AED)",
          boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
        }}
      >
        {plan.badge}
      </span>
    )}

    {/* Plan name */}
    <div className="mb-5">
      <span
        className="text-[10px] font-mono tracking-[0.35em] uppercase mb-2 block"
        style={{ color: plan.color }}
      >
        Plan
      </span>
      <h3 className="text-3xl font-black text-ghost-white">
        {plan.name}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mt-1.5">
        {plan.tagline}
      </p>
    </div>

    {/* Price */}
    <div className="mb-5 flex items-end gap-1.5">
      <span className="text-[11px] font-mono text-slate-500 mb-1">desde</span>
      <span
        className="text-4xl font-black leading-none"
        style={{ color: plan.featured ? "#F8FAFC" : plan.color }}
      >
        ${plan.price}
      </span>
      <span className="text-[11px] font-mono text-slate-500 mb-1">USD</span>
    </div>

    {/* Divider */}
    <div
      className="h-px w-full mb-6"
      style={{
        background: plan.featured
          ? `linear-gradient(90deg, ${plan.color}50, transparent)`
          : "rgba(255,255,255,0.04)",
      }}
    />

    {/* Features list */}
    <ul className="flex flex-col gap-3.5 mb-8 flex-1">
      {plan.items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: `${plan.color}18`, border: `1px solid ${plan.color}30` }}
          >
            <Check size={9} style={{ color: plan.color }} strokeWidth={3} />
          </span>
          <span
            className={`text-[13px] leading-snug ${
              item.startsWith("Todo lo") ? "text-slate-500 italic" : "text-slate-300"
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>

    {/* CTA */}
    <motion.a
      href="#contacto"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="w-full py-3.5 rounded-xl font-bold text-[14px] text-center flex items-center justify-center gap-2 transition-all duration-200"
      style={
        plan.featured
          ? {
              background: "linear-gradient(135deg, #4F46E5, #6D28D9)",
              color: "#fff",
              boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
            }
          : {
              background: `${plan.color}0F`,
              border: `1px solid ${plan.color}25`,
              color: plan.color,
            }
      }
    >
      Consultar
      <ArrowUpRight size={14} />
    </motion.a>
  </motion.div>
);

// ─── Extra Service Card (numbered row style) ──────────────────────────────────
const ExtraCard = ({
  service,
  index,
}: {
  service: (typeof EXTRAS)[0];
  index: number;
}) => {
  const Icon = service.icon;
  const num = String(index + 1).padStart(2, "0");
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex items-center gap-6 py-6 cursor-default"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Number */}
      <span
        className="flex-shrink-0 font-mono text-[11px] font-bold w-8 text-right transition-colors duration-300"
        style={{ color: "rgba(248,250,252,0.1)" }}
      >
        {num}
      </span>

      {/* Icon block */}
      <motion.div
        className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
        style={{
          background: `${service.color}12`,
          border: `1px solid ${service.color}20`,
        }}
        whileHover={{ scale: 1.08 }}
      >
        <Icon size={20} style={{ color: service.color }} />
      </motion.div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h4
          className="font-bold text-[15px] text-ghost-white mb-1 transition-colors duration-200 group-hover:text-white"
        >
          {service.name}
        </h4>
        <p className="text-[12px] leading-relaxed text-slate-500 max-w-lg">{service.desc}</p>
      </div>

      {/* CTA */}
      <a
        href="#contacto"
        className="flex-shrink-0 hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-3 py-2 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
        style={{
          background: `${service.color}10`,
          border: `1px solid ${service.color}25`,
          color: service.color,
        }}
      >
        Consultar
        <ArrowUpRight size={10} />
      </a>

      {/* Active underline */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${service.color}50, transparent)` }}
      />
    </motion.div>
  );
};

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function WebPlans() {
  return (
    <section
      id="planes"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono tracking-[0.4em] uppercase mb-6 flex items-center gap-3 text-electric-indigo"
          >
            <motion.span
              className="h-px w-8 bg-electric-indigo inline-block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            Planes Web
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
          >
            <div className="max-w-2xl">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-ghost-white mb-4">
                Presencia web profesional,{" "}
                <span className="gradient-text">sin vueltas.</span>
              </h2>
              <p className="text-slate-400 text-[15px] leading-relaxed">
                Estos planes son{" "}
                <span className="text-slate-200 font-medium">uno de mis servicios</span>
                , enfocados en negocios que necesitan una landing o sitio web. Si
                necesitás algo más complejo —{" "}
                <span className="text-slate-200 font-medium">
                  un ERP, una app, automatizaciones o IA
                </span>{" "}
                — usá el formulario de contacto y lo cotizamos a medida.
              </p>
            </div>

            {/* Clarification pill */}
            <motion.a
              href="#contacto"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -2 }}
              className="flex-shrink-0 flex items-center gap-3 px-5 py-4 rounded-2xl text-left"
              style={{
                background: "rgba(99,102,241,0.07)",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-lg"
                style={{ background: "rgba(99,102,241,0.12)" }}
              >
                💬
              </div>
              <div>
                <p className="text-[12px] font-bold text-ghost-white leading-snug">
                  ¿Necesitás algo distinto?
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Contactame y lo armamos a medida
                </p>
              </div>
            </motion.a>
          </motion.div>
        </div>

        {/* ── Plan Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        {/* ── Additional Services ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
          >
            <div>
              <p className="text-xs font-mono tracking-[0.35em] uppercase text-slate-600 mb-2">
                ¿Necesitás algo más?
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-ghost-white">
                Servicios adicionales
              </h3>
            </div>
            <p className="text-slate-500 text-[13px] max-w-xs leading-relaxed">
              Cada negocio es diferente. Si no encontrás lo que buscás, hablemos.
            </p>
          </motion.div>

          <div className="flex flex-col">
            {EXTRAS.map((s, i) => (
              <ExtraCard key={s.name} service={s} index={i} />
            ))}
            {/* Bottom border */}
            <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>
        </div>

      </div>
    </section>
  );
}
