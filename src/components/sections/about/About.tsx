"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TEAM = [
  {
    name: "Garcia Fausto",
    role: "Backend & Sistemas",
    initials: "GF",
    photo: "/fotofull-gpt.png",
    accent: "#22d3ee",
    avatarGradient: "from-[#22d3ee]/20 to-[#3b82f6]/10",
    bio: "Arquitectura backend, bases de datos y seguridad. Diseña los cimientos que hacen que todo escale.",
    skills: ["Node.js", "PostgreSQL", "Docker"],
  },
  {
    name: "Podesta Isidro",
    role: "Producto & UX",
    initials: "PI",
    photo: "/fotofull-gpt2.png",
    accent: "#60a5fa",
    avatarGradient: "from-[#60a5fa]/20 to-[#22d3ee]/10",
    bio: "UX, producto y estrategia técnica. Convierte ideas difusas en productos que la gente entiende y usa.",
    skills: ["Figma", "React", "Strategy"],
  },
  {
    name: "Dallape Vincenzo",
    role: "Fullstack & IA",
    initials: "DV",
    photo: "/vichen1.png",
    accent: "#4ade80",
    avatarGradient: "from-[#4ade80]/20 to-[#22d3ee]/10",
    bio: "Frontend, fullstack e integraciones con IA. De la UI al modelo, conecta todas las piezas.",
    skills: ["Next.js", "OpenAI", "TypeScript"],
  },
];

export default function About() {
  return (
    <section className="px-5 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label mb-4">Equipo</p>
            <h2 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              GPD: Garcia,<br className="hidden sm:block" /> Podesta, Dallape.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-white/45">
            Ingenieros en sistemas y estudiantes avanzados. Equipo chico, trato
            directo y decisiones técnicas sin vueltas.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {TEAM.map((person, index) => (
            <motion.article
              key={person.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group overflow-hidden rounded-[28px] border border-white/7 bg-white/2 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_80px_rgba(0,0,0,0.55)]"
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `color-mix(in srgb, ${person.accent} 28%, transparent)`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                {/* Placeholder background shown when no photo */}
                <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${person.avatarGradient}`}>
                  <span className="select-none text-8xl font-extrabold" style={{ color: `${person.accent}20` }}>
                    {person.initials}
                  </span>
                </div>
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040911] via-[#040911]/20 to-transparent" />
                <div
                  className="absolute right-4 top-4 rounded-full border px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.2em] backdrop-blur-sm"
                  style={{
                    borderColor: `${person.accent}35`,
                    background: `${person.accent}12`,
                    color: person.accent,
                  }}
                >
                  {person.role}
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-2xl font-extrabold text-white">{person.name}</h3>
                <p className="mb-5 text-sm leading-6 text-white/45">{person.bio}</p>
                <div className="flex flex-wrap gap-1.5">
                  {person.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        borderColor: `${person.accent}22`,
                        background: `${person.accent}08`,
                        color: `${person.accent}90`,
                      }}
                    >
                      {skill}
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
