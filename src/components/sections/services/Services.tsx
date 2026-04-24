"use client";

import { motion } from "framer-motion";
import { Bot, Code2, ShoppingCart } from "lucide-react";

const SERVICES = [
  {
    icon: ShoppingCart,
    title: "Web & e-commerce",
    text: "Sitios, landings y tiendas que se ven bien y cargan rapido.",
    tags: ["Next.js", "Shopify", "SEO"],
    accent: "#22d3ee",
    glow: "rgba(34,211,238,0.12)",
  },
  {
    icon: Code2,
    title: "Software a medida",
    text: "Dashboards, paneles, ERPs chicos y herramientas internas.",
    tags: ["React", "Node.js", "PostgreSQL"],
    accent: "#60a5fa",
    glow: "rgba(96,165,250,0.12)",
  },
  {
    icon: Bot,
    title: "Automatización & IA",
    text: "Integraciones, workflows, chatbots y procesos repetitivos.",
    tags: ["OpenAI", "Python", "FastAPI"],
    accent: "#4ade80",
    glow: "rgba(74,222,128,0.12)",
  },
];

export default function Services() {
  return (
    <section className="px-5 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label mb-4">Servicios</p>
            <h2 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              Tres cosas. Bien hechas.
            </h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-white/45">
            Sin intermediarios. Quien te habla escribe el código.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="group rounded-[24px] border border-white/7 bg-white/2 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(0,0,0,0.40)]"
                style={{ "--hover-border": `rgba(${service.accent},0.3)` } as React.CSSProperties}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `color-mix(in srgb, ${service.accent} 30%, transparent)`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
              >
                <div
                  className="mb-10 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition-all duration-300 group-hover:scale-110"
                  style={{ color: service.accent }}
                >
                  <Icon size={22} />
                </div>
                <h3 className="mb-3 text-2xl font-extrabold text-white">{service.title}</h3>
                <p className="mb-6 text-sm leading-7 text-white/45">{service.text}</p>
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/8 bg-white/4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
