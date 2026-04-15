"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "01",
    name: "Optexa",
    category: "Automatización Industrial",
    desc: "Plataforma para empresa de robótica. Sistemas ASRS y catálogo de robots industriales.",
    tags: ["Next.js", "TypeScript", "SEO"],
    url: "https://optexa1.vercel.app",
    color: "#6366F1",
  },
  {
    id: "02",
    name: "Rutas del Sur",
    category: "Logística Internacional",
    desc: "Transporte de carga Argentina–Chile con SEO local y regional.",
    tags: ["Next.js", "Tailwind", "Analytics"],
    url: "https://rutasdelsur.com.ar",
    color: "#10B981",
  },
  {
    id: "03",
    name: "Fletx",
    category: "Transporte & Fletes",
    desc: "Landing de fletes orientada a conversión con cobertura geográfica.",
    tags: ["React", "Tailwind", "Netlify"],
    url: "https://fletx.netlify.app",
    color: "#8B5CF6",
  },
  {
    id: "04",
    name: "Brune Dance",
    category: "Arte & Entretenimiento",
    desc: "Estudio de danza con galería, horarios y sistema de turnos.",
    tags: ["Next.js", "Framer Motion"],
    url: "https://brune-dance.vercel.app",
    color: "#EC4899",
  },
  {
    id: "05",
    name: "Anuk Industrial Vision",
    category: "Industria & Tecnología",
    desc: "Inspección automatizada y catálogo técnico para manufactura.",
    tags: ["Next.js", "TypeScript"],
    url: "https://anuk-industrial-vision.vercel.app",
    color: "#06B6D4",
  },
  {
    id: "06",
    name: "Stokamza",
    category: "E-Commerce & Stock",
    desc: "Tienda online con gestión de inventario en tiempo real.",
    tags: ["Next.js", "Node.js"],
    url: "https://stokamza.vercel.app",
    color: "#F59E0B",
  },
  {
    id: "07",
    name: "Ruedas",
    category: "E-Commerce",
    desc: "Tienda con catálogo, filtros, carrito y checkout optimizado.",
    tags: ["Next.js", "Stripe"],
    url: "https://ruedas-ochre.vercel.app",
    color: "#6366F1",
  },
  {
    id: "08",
    name: "Importacion12",
    category: "Comercio Exterior",
    desc: "Catálogo de importaciones y formulario de cotización.",
    tags: ["React", "Tailwind"],
    url: "https://importacion12.netlify.app",
    color: "#10B981",
  },
  {
    id: "09",
    name: "ERP de Transporte",
    category: "Sistemas Internos",
    desc: "Rutas, choferes, facturación electrónica y seguimiento real.",
    tags: ["React", "Node.js", "PostgreSQL"],
    url: null,
    color: "#8B5CF6",
  },
  {
    id: "10",
    name: "Automatización",
    category: "IA & Workflows",
    desc: "Pipeline n8n + LLMs para empresa de logística.",
    tags: ["n8n", "OpenAI", "Python"],
    url: null,
    color: "#10B981",
  },
  {
    id: "11",
    name: "Proyecto Internacional",
    category: "SaaS — NDA",
    desc: "Plataforma multi-tenant con roles, Stripe y analytics.",
    tags: ["Next.js", "PostgreSQL", "Docker"],
    url: null,
    color: "#06B6D4",
  },
];

// Duplicate for seamless loop
const LOOP = [...PROJECTS, ...PROJECTS];

// ─── Card ──────────────────────────────────────────────────────────────────────
const ProjectCard = ({ project }: { project: (typeof PROJECTS)[0] }) => (
  <div
    className="group relative flex-shrink-0 w-72 rounded-2xl overflow-hidden flex flex-col"
    style={{
      background: "#0d1424",
      border: "1px solid rgba(255,255,255,0.07)",
    }}
  >
    {/* Color header */}
    <div
      className="relative h-24 flex-shrink-0 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${project.color}20, ${project.color}06)`,
      }}
    >
      {/* Arc decoration */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 288 96" fill="none" preserveAspectRatio="none">
        <circle cx="288" cy="0" r="120" stroke={project.color} strokeWidth="1" opacity="0.2" />
        <circle cx="288" cy="0" r="70" stroke={project.color} strokeWidth="1" opacity="0.12" />
      </svg>

      {/* Fade bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8"
        style={{ background: "linear-gradient(transparent, #0d1424)" }}
      />

      {/* Big number */}
      <span
        className="absolute bottom-1 left-4 font-mono font-black select-none leading-none"
        style={{ fontSize: 56, color: `${project.color}18`, lineHeight: 1 }}
      >
        {project.id}
      </span>

      {/* Category */}
      <span
        className="absolute top-3 right-3 text-[9px] font-mono tracking-[0.25em] uppercase px-2 py-0.5 rounded-full"
        style={{
          background: `${project.color}18`,
          border: `1px solid ${project.color}30`,
          color: project.color,
        }}
      >
        {project.category}
      </span>
    </div>

    {/* Content */}
    <div className="p-4 flex flex-col flex-1">
      <h3 className="font-bold text-[14px] text-white mb-1.5 leading-snug">{project.name}</h3>

      <div
        className="h-px w-5 mb-2 transition-all duration-300 group-hover:w-10"
        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
      />

      <p className="text-[11px] leading-relaxed text-slate-500 mb-3 flex-1">{project.desc}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {project.tags.map((t) => (
          <span
            key={t}
            className="px-1.5 py-0.5 rounded text-[9px] font-mono"
            style={{
              background: `${project.color}0C`,
              border: `1px solid ${project.color}20`,
              color: `${project.color}99`,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[10px] font-mono font-medium w-fit"
          style={{ color: project.color }}
        >
          <ArrowUpRight size={11} /> Ver proyecto
        </a>
      ) : (
        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-700">
          <Lock size={9} /> Privado / NDA
        </span>
      )}
    </div>
  </div>
);

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function ProjectsShowcase() {
  // Speed: adjust duration for faster/slower scroll
  const duration = PROJECTS.length * 8; // 8s per card ≈ 88s total

  return (
    <section id="proyectos" className="py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-12">
        {/* Header */}
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
          Proyectos Realizados
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ghost-white leading-[1.05] mb-3">
              Mi trabajo,{" "}
              <span className="gradient-text">sin filtros.</span>
            </h2>
            <p className="text-slate-400 text-[15px] leading-relaxed max-w-md">
              Proyectos reales. Cada uno resuelve un problema concreto.
            </p>
          </div>
          <div className="flex items-baseline gap-1.5 flex-shrink-0">
            <span className="text-3xl font-black text-electric-indigo">{PROJECTS.length}</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600 leading-snug">
              proyectos<br />completados
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── Infinite marquee ── */}
      {/* Left/right fade masks */}
      <div
        className="relative"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div
          className="flex gap-4 animate-marquee"
          style={{
            animationDuration: `${duration}s`,
            width: "max-content",
          }}
        >
          {LOOP.map((project, i) => (
            <ProjectCard key={`${project.id}-${i}`} project={project} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 text-center px-4"
      >
        <p className="text-slate-500 text-sm mb-4">¿Querés ser el próximo caso de éxito?</p>
        <motion.a
          href="#contacto"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-white"
          style={{ background: "linear-gradient(135deg, #4F46E5, #6D28D9)" }}
        >
          Hablemos de tu proyecto
          <ArrowUpRight size={14} />
        </motion.a>
      </motion.div>
    </section>
  );
}
