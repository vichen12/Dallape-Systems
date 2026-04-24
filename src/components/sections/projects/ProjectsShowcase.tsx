"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";

const PROJECTS = [
  {
    name: "Optexa",
    tag: "Robotica industrial",
    url: "https://optexa1.vercel.app",
    description: "Plataforma de monitoreo industrial con dashboards en tiempo real.",
    bars: [55, 70, 45, 85, 60, 95, 75],
    accent: "#22d3ee",
  },
  {
    name: "Rutas del Sur",
    tag: "Logistica",
    url: "https://rutasdelsur.com.ar",
    description: "Sistema de gestión de rutas y seguimiento de flota.",
    bars: [40, 60, 80, 50, 70, 55, 90],
    accent: "#60a5fa",
  },
  {
    name: "ERP Transporte",
    tag: "Sistema privado",
    url: null,
    description: "ERP a medida para operación logística con panel de control completo.",
    bars: [65, 45, 75, 55, 85, 70, 60],
    accent: "#4ade80",
  },
];

function ProjectPreview({ bars, accent }: { bars: number[]; accent: string }) {
  const max = Math.max(...bars);
  return (
    <div className="relative overflow-hidden bg-[#040911] aspect-[4/3] flex flex-col p-4 border-b border-white/5">
      <div
        className="absolute -top-10 -right-10 h-36 w-36 rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ background: accent }}
      />
      <div className="flex items-center gap-1.5 mb-4 relative z-10">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: `${accent}80` }} />
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/8" />
        </div>
        <div className="flex-1 mx-2 h-4 rounded bg-white/5 flex items-center px-2 border border-white/5">
          <div className="w-1 h-1 rounded-full bg-[#4ade80] mr-1" />
          <div className="h-1 rounded-full bg-white/12 flex-1" />
        </div>
      </div>
      <div className="flex-1 grid grid-cols-[56px_1fr] gap-2 relative z-10">
        <div className="space-y-1.5">
          <div className="h-5 rounded bg-white/5 border" style={{ borderColor: `${accent}30` }} />
          {[1, 2, 3].map(i => <div key={i} className="h-5 rounded bg-white/3" />)}
        </div>
        <div className="space-y-2 min-w-0">
          <div className="grid grid-cols-2 gap-1.5">
            <div className="rounded bg-white/5 p-1.5 border border-white/5">
              <div className="text-[7px] text-white/25 mb-0.5">Total</div>
              <div className="text-[10px] font-bold" style={{ color: accent }}>124</div>
            </div>
            <div className="rounded bg-white/5 p-1.5 border border-white/5">
              <div className="text-[7px] text-white/25 mb-0.5">Activos</div>
              <div className="text-[10px] font-bold text-white/50">98</div>
            </div>
          </div>
          <div className="rounded bg-white/3 px-2 pt-2 pb-1 flex items-end gap-0.5 h-16 border border-white/4">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${h}%`,
                  background: bars[i] === max ? `linear-gradient(180deg, ${accent}, ${accent}80)` : "rgba(255,255,255,0.07)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
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

        <div className="grid gap-6 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="group overflow-hidden rounded-[28px] border border-white/7 bg-white/2 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#22d3ee]/20 hover:shadow-[0_28px_72px_rgba(0,0,0,0.50)]"
            >
              <ProjectPreview bars={project.bars} accent={project.accent} />
              <div className="p-6">
                <p className="mb-1.5 text-xs font-extrabold uppercase tracking-[0.18em]" style={{ color: project.accent }}>
                  {project.tag}
                </p>
                <h3 className="mb-2 text-2xl font-extrabold text-white">{project.name}</h3>
                <p className="mb-5 text-sm leading-6 text-white/45">{project.description}</p>
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#22d3ee] transition-colors hover:text-[#67e8f9]"
                  >
                    Ver proyecto <ArrowUpRight size={15} />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-white/30">
                    <Lock size={14} /> Privado / NDA
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
