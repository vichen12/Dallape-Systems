"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, Star } from "lucide-react";

const PLANS = [
  {
    name: "Boost",
    price: 35,
    desc: "Mejoras rápidas sobre lo que ya tenés.",
    items: ["SEO técnico", "Analytics", "Mejoras de velocidad"],
    featured: false,
  },
  {
    name: "Upgrade",
    price: 70,
    desc: "Todo lo que necesita un negocio para arrancar bien.",
    items: ["Landing profesional", "Formulario de contacto", "Integración WhatsApp"],
    featured: true,
  },
  {
    name: "Launch",
    price: 200,
    desc: "Solución completa con soporte incluido.",
    items: ["Sitio completo", "Panel de administración", "Soporte inicial 30 días"],
    featured: false,
  },
];

export default function WebPlans() {
  return (
    <section className="px-5 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label mb-4">Planes</p>
            <h2 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              Entrada clara. A medida se cotiza.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-white/45">
            Precios desde USD. En Argentina facturamos en pesos al cambio del día.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {PLANS.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className={`relative rounded-[28px] p-7 transition-all duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? "border border-[#22d3ee]/25 bg-gradient-to-b from-[#22d3ee]/8 to-[#3b82f6]/5 shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_24px_72px_rgba(34,211,238,0.12)] hover:shadow-[0_0_0_1px_rgba(34,211,238,0.22),0_32px_90px_rgba(34,211,238,0.20)]"
                  : "border border-white/7 bg-white/2 backdrop-blur-sm hover:border-[#22d3ee]/15 hover:shadow-[0_24px_64px_rgba(0,0,0,0.35)]"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#22d3ee] to-[#3b82f6] px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-[0_4px_20px_rgba(34,211,238,0.45)]">
                    <Star size={9} className="fill-white" />
                    Más elegido
                  </div>
                </div>
              )}

              <h3 className="mb-2 text-2xl font-extrabold text-white">{plan.name}</h3>
              <p className="mb-6 text-sm leading-6 text-white/45">{plan.desc}</p>

              <div className="mb-7 flex items-end gap-1">
                <span className="mb-1.5 text-xs font-bold text-white/30">desde</span>
                <span className="text-5xl font-extrabold leading-none gradient-text">${plan.price}</span>
                <span className="mb-1.5 text-xs font-bold text-white/30">USD</span>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-semibold text-white/70">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#22d3ee]/12 text-[#22d3ee]">
                      <Check size={11} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-extrabold transition-all duration-200 ${
                  plan.featured
                    ? "bg-gradient-to-r from-[#22d3ee] to-[#3b82f6] text-white shadow-[0_8px_28px_rgba(34,211,238,0.35)] hover:shadow-[0_12px_36px_rgba(34,211,238,0.50)] hover:-translate-y-0.5"
                    : "border border-white/10 bg-white/5 text-white hover:bg-white/8 hover:border-[#22d3ee]/20"
                }`}
              >
                Consultar <ArrowUpRight size={15} />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
