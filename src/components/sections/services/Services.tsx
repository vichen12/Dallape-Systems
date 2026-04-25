"use client";

import { motion } from "framer-motion";
import { Bot, Code2, Globe } from "lucide-react";

function BrowserArt({ accent }: { accent: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/8 bg-white/2">
      <div className="flex items-center gap-1.5 border-b border-white/6 px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-red-400/40" />
        <div className="h-2 w-2 rounded-full bg-yellow-400/40" />
        <div className="h-2 w-2 rounded-full bg-green-400/40" />
        <div className="ml-2 h-3 flex-1 rounded-full bg-white/6" />
      </div>
      <div className="flex flex-col gap-1.5 p-3">
        <div className="h-2 w-4/5 rounded-full bg-white/8" />
        <div className="h-2 w-3/5 rounded-full bg-white/5" />
        <div className="mt-1 h-10 rounded-lg" style={{ background: `linear-gradient(135deg, ${accent}18 0%, transparent 100%)` }} />
        <div className="flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-5 flex-1 rounded bg-white/4 border border-white/6" />
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardArt({ accent }: { accent: string }) {
  const bars = [40, 65, 45, 80, 55, 90, 70];
  return (
    <div className="overflow-hidden rounded-xl border border-white/8 bg-white/2 p-3">
      <div className="mb-2 grid grid-cols-3 gap-1.5">
        {[{ label: "Total", val: "124", hi: true }, { label: "Activos", val: "98", hi: false }, { label: "Pendiente", val: "26", hi: false }].map((k, i) => (
          <div key={i} className="rounded-lg border border-white/6 bg-white/3 p-2">
            <p className="text-[8px] text-white/25">{k.label}</p>
            <p className="mt-0.5 text-[11px] font-extrabold" style={{ color: k.hi ? accent : "rgba(255,255,255,0.45)" }}>{k.val}</p>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-0.5 rounded-lg border border-white/6 bg-white/2 px-2 pb-1.5 pt-2" style={{ height: 44 }}>
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{ height: `${h}%`, background: h === 90 ? accent : "rgba(255,255,255,0.09)" }}
          />
        ))}
      </div>
    </div>
  );
}

function ChatArt({ accent }: { accent: string }) {
  return (
    <div className="space-y-2 rounded-xl border border-white/8 bg-white/2 p-3">
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-white/7 px-3 py-1.5 text-[10px] text-white/55">
          ¿Podés automatizar este proceso?
        </div>
      </div>
      <div className="flex items-end gap-1.5">
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: `${accent}22` }}>
          <Bot size={10} style={{ color: accent }} />
        </div>
        <div className="max-w-[80%] rounded-2xl rounded-bl-sm px-3 py-1.5 text-[10px]" style={{ background: `${accent}18`, color: accent }}>
          Analizando tu flujo de trabajo…
        </div>
      </div>
      <div className="ml-6 flex items-center gap-0.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-1 w-1 animate-bounce rounded-full"
            style={{ background: `${accent}55`, animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

const SERVICES = [
  {
    num: "01",
    icon: Globe,
    title: "Web & e-commerce",
    text: "Sitios, landings y tiendas que se ven bien y cargan rápido. Desde una landing page hasta una tienda completa con pagos y stock.",
    tags: ["Next.js", "Shopify", "SEO", "Tailwind"],
    accent: "#22d3ee",
    art: "browser",
  },
  {
    num: "02",
    icon: Code2,
    title: "Software a medida",
    text: "Dashboards, paneles, ERPs y herramientas internas. Soluciones construidas para el problema específico de tu negocio.",
    tags: ["React", "Node.js", "PostgreSQL", "TypeScript"],
    accent: "#60a5fa",
    art: "dashboard",
  },
  {
    num: "03",
    icon: Bot,
    title: "Automatización & IA",
    text: "Integraciones, workflows, chatbots y procesos automatizados. Menos trabajo manual, más resultados con la misma gente.",
    tags: ["OpenAI", "Python", "FastAPI", "n8n"],
    accent: "#4ade80",
    art: "chat",
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
                className="group relative overflow-hidden rounded-[28px] border border-white/7 bg-white/2 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_80px_rgba(0,0,0,0.50)]"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `color-mix(in srgb, ${service.accent} 28%, transparent)`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
              >
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: service.accent }}
                />

                <div className="relative mb-6 flex items-start justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${service.accent}15`, color: service.accent }}
                  >
                    <Icon size={24} />
                  </div>
                  <span className="select-none text-6xl font-extrabold leading-none" style={{ color: `${service.accent}12` }}>
                    {service.num}
                  </span>
                </div>

                <h3 className="mb-3 text-2xl font-extrabold text-white">{service.title}</h3>
                <p className="mb-6 text-sm leading-7 text-white/45 transition-colors group-hover:text-white/60">
                  {service.text}
                </p>

                <div className="mb-6">
                  {service.art === "browser" && <BrowserArt accent={service.accent} />}
                  {service.art === "dashboard" && <DashboardArt accent={service.accent} />}
                  {service.art === "chat" && <ChatArt accent={service.accent} />}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        borderColor: `${service.accent}22`,
                        background: `${service.accent}08`,
                        color: `${service.accent}90`,
                      }}
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
