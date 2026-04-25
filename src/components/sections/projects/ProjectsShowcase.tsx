"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";

const PROJECTS = [
  {
    name: "Optexa",
    tag: "Robótica industrial",
    url: "https://optexa1.vercel.app",
    description: "Plataforma de monitoreo industrial con dashboards en tiempo real, alertas automáticas y visualización de datos de producción.",
    accent: "#22d3ee",
    featured: true,
    tech: ["Next.js", "WebSockets", "Charts"],
  },
  {
    name: "Rutas del Sur",
    tag: "Logística",
    url: "https://rutasdelsur.com.ar",
    description: "Sistema de gestión de rutas y seguimiento de flota para operadoras de transporte de carga.",
    accent: "#60a5fa",
    featured: false,
    tech: ["React", "Maps API", "Node.js"],
  },
  {
    name: "ERP Transporte",
    tag: "Sistema privado",
    url: null,
    description: "ERP a medida para operación logística con panel de control completo, facturación y reportes.",
    accent: "#4ade80",
    featured: false,
    tech: ["TypeScript", "PostgreSQL", "REST API"],
  },
];

function FeaturedPreview({ accent, name }: { accent: string; name: string }) {
  const metrics = [
    { label: "Unidades activas", value: "148", up: true },
    { label: "Tiempo respuesta", value: "12ms", up: true },
    { label: "Alertas hoy", value: "3", up: false },
    { label: "Uptime", value: "99.9%", up: true },
  ];
  return (
    <div className="relative overflow-hidden" style={{ background: `radial-gradient(ellipse at 70% -20%, ${accent}22 0%, transparent 60%), #040911` }}>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: accent }} />
      <div className="relative z-10 p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: `${accent}70` }} />
            <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/8" />
          </div>
          <div className="ml-2 flex h-5 flex-1 items-center rounded-full bg-white/5 px-3 border border-white/6">
            <div className="h-1.5 w-1.5 rounded-full bg-[#4ade80] mr-1.5" />
            <div className="h-1 w-24 rounded-full bg-white/15" />
          </div>
        </div>
        <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {metrics.map((m, i) => (
            <div key={i} className="rounded-xl border border-white/6 bg-white/4 p-3 backdrop-blur-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-white/30">{m.label}</p>
              <p className="mt-1.5 text-xl font-extrabold" style={{ color: m.up ? accent : "rgba(255,255,255,0.7)" }}>{m.value}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-white/6 bg-white/2 p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: `${accent}80` }}>Actividad en tiempo real</p>
            <div className="flex items-center gap-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: accent }} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
              </span>
              <span className="text-[9px] font-bold text-white/30">LIVE</span>
            </div>
          </div>
          <div className="flex items-end gap-1 pb-1" style={{ height: 48 }}>
            {[35, 55, 40, 70, 50, 85, 60, 92, 68, 78, 45, 88].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{ height: `${h}%`, background: h === 92 ? `${accent}` : `rgba(255,255,255,0.07)` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SmallPreview({ accent, tag }: { accent: string; tag: string }) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: 140, background: `radial-gradient(ellipse at 50% 0%, ${accent}18 0%, transparent 70%), #040911` }}>
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute right-4 top-4 h-20 w-20 rounded-full blur-2xl opacity-25 pointer-events-none" style={{ background: accent }} />
      <p className="relative z-10 text-center text-4xl font-extrabold leading-none tracking-tight" style={{ color: `${accent}25` }}>
        {tag.split(" ").map(w => w[0]).join("")}
      </p>
    </div>
  );
}

export default function ProjectsShowcase() {
  return (
    <section className="px-5 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label mb-4">Casos</p>
            <h2 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              Proyectos reales,<br className="hidden sm:block" /> resultados concretos.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-white/45">
            Cada proyecto tiene nombre, contexto y un problema resuelto.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`group overflow-hidden rounded-[28px] border border-white/7 bg-white/2 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_72px_rgba(0,0,0,0.50)] ${
                project.featured ? "lg:col-span-2" : ""
              }`}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `color-mix(in srgb, ${project.accent} 25%, transparent)`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
            >
              {project.featured ? (
                <FeaturedPreview accent={project.accent} name={project.name} />
              ) : (
                <SmallPreview accent={project.accent} tag={project.tag} />
              )}

              <div className="p-6">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.2em]"
                      style={{ color: project.accent }}
                    >
                      {project.tag}
                    </p>
                    <h3 className="text-2xl font-extrabold text-white">{project.name}</h3>
                  </div>
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex shrink-0 items-center gap-1 rounded-xl border border-white/8 bg-white/4 px-3 py-2 text-xs font-extrabold text-white transition-all duration-200 hover:border-[#22d3ee]/30 hover:bg-white/6"
                    >
                      Ver <ArrowUpRight size={13} />
                    </a>
                  ) : (
                    <span className="flex shrink-0 items-center gap-1.5 rounded-xl border border-white/6 bg-white/2 px-3 py-2 text-xs font-extrabold text-white/30">
                      <Lock size={12} /> NDA
                    </span>
                  )}
                </div>
                <p className="mb-4 text-sm leading-6 text-white/45">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{ borderColor: `${project.accent}20`, background: `${project.accent}08`, color: `${project.accent}80` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
