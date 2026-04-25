"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, Star } from "lucide-react";

const PLANS = [
  {
    name: "Analytics",
    badge: null,
    price: 70,
    tagline: "Sumale datos reales a tu web actual.",
    desc:
      "Instalamos Google Analytics 4 y Tag Manager en tu sitio ya existente, configuramos el seguimiento de los eventos más importantes (clics, formularios, WhatsApp, etc.) y te entregamos un reporte inicial para que entiendas qué están haciendo tus visitas y dónde se van.",
    note: "No hace falta rehacer nada. Trabajamos sobre lo que ya tenés.",
    items: [
      "Instalación Google Analytics 4",
      "Google Tag Manager configurado",
      "Seguimiento de eventos clave (clics, formularios, WhatsApp)",
      "Metas y conversiones definidas",
      "Reporte inicial de performance",
    ],
    featured: false,
  },
  {
    name: "Landing Page",
    badge: "Más elegido",
    price: 150,
    tagline: "Tu negocio en línea, listo para funcionar.",
    desc:
      "Una landing page profesional y moderna hecha con los textos e imágenes que vos nos pasás. Nosotros nos encargamos del diseño, la maquetación, la adaptación a mobile y el SEO básico. Ideal para negocios que quieren presencia digital rápido y sin complicaciones.",
    note: "Vos ponés los textos y las fotos. Nosotros hacemos el resto.",
    items: [
      "Diseño responsive (mobile + desktop)",
      "Secciones: hero, servicios, sobre mí/nosotros, contacto",
      "Textos e imágenes provistos por el cliente",
      "Formulario de contacto funcional",
      "SEO básico y velocidad optimizada",
      "Dominio y hosting no incluidos",
    ],
    featured: true,
  },
  {
    name: "Web Completa",
    badge: null,
    price: 350,
    tagline: "Presencia digital real, construida desde cero.",
    desc:
      "Sitio web completo, pensado y desarrollado a medida para tu negocio. Más páginas, más secciones, animaciones, integraciones y todo lo que tu proyecto necesita para destacar. La opción para quienes quieren algo que realmente represente su marca.",
    note: "Precio orientativo. Cada proyecto se cotiza según sus requerimientos.",
    items: [
      "Múltiples páginas y secciones a medida",
      "Diseño 100% personalizado",
      "Animaciones e interacciones",
      "SEO avanzado + optimización de velocidad",
      "Formulario de contacto + integraciones básicas",
      "Entrega con código fuente incluido",
    ],
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
              Precios claros. Resultado concreto.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-white/45">
            Todos los precios son <span className="font-bold text-white/70">desde USD</span>. Proyectos más complejos se cotizan a medida. En Argentina facturamos en pesos al cambio del día.
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
              className={`relative flex flex-col rounded-[28px] p-7 transition-all duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? "border border-[#22d3ee]/25 bg-gradient-to-b from-[#22d3ee]/8 to-[#3b82f6]/5 shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_24px_72px_rgba(34,211,238,0.12)] hover:shadow-[0_0_0_1px_rgba(34,211,238,0.22),0_32px_90px_rgba(34,211,238,0.20)]"
                  : "border border-white/7 bg-white/2 backdrop-blur-sm hover:border-[#22d3ee]/15 hover:shadow-[0_24px_64px_rgba(0,0,0,0.35)]"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#22d3ee] to-[#3b82f6] px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-[0_4px_20px_rgba(34,211,238,0.45)]">
                    <Star size={9} className="fill-white" />
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="mb-5">
                <h3 className="mb-1 text-2xl font-extrabold text-white">{plan.name}</h3>
                <p className="text-sm font-semibold text-[#22d3ee]/80">{plan.tagline}</p>
              </div>

              <div className="mb-5 flex items-end gap-1.5">
                <span className="mb-2 text-sm font-bold uppercase tracking-widest text-white/40">desde</span>
                <span className="text-5xl font-extrabold leading-none gradient-text">${plan.price}</span>
                <span className="mb-2 text-xs font-bold text-white/30">USD</span>
              </div>

              <p className="mb-5 text-sm leading-6 text-white/50">{plan.desc}</p>

              <ul className="mb-5 space-y-3">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-semibold text-white/70">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#22d3ee]/12 text-[#22d3ee]">
                      <Check size={11} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {plan.note && (
                <p className="mb-6 rounded-xl border border-white/6 bg-white/3 px-4 py-3 text-xs leading-5 text-white/40 italic">
                  {plan.note}
                </p>
              )}

              <a
                href="#contacto"
                className={`mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-extrabold transition-all duration-200 ${
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
