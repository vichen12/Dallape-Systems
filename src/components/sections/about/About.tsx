"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TEAM = [
  {
    name: "Garcia Fausto",
    role: "Sistemas",
    initials: "G",
    photo: null,
    avatarGradient: "from-[#22d3ee] to-[#3b82f6]",
    accent: "#22d3ee",
    bio: "Arquitectura backend, bases de datos y seguridad.",
  },
  {
    name: "Podesta Isidro",
    role: "Producto",
    initials: "P",
    photo: null,
    avatarGradient: "from-[#60a5fa] to-[#22d3ee]",
    accent: "#60a5fa",
    bio: "UX, producto y estrategia técnica.",
  },
  {
    name: "Dallape Vincenzo",
    role: "Fullstack",
    initials: "D",
    photo: "/vichen1.png",
    avatarGradient: "from-[#4ade80] to-[#22d3ee]",
    accent: "#4ade80",
    bio: "Frontend, fullstack e integraciones con IA.",
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
              GPD: Garcia, Podesta, Dallape.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-white/45">
            Ingenieros en sistemas y estudiantes avanzados. Equipo chico,
            trato directo y decisiones técnicas sin vueltas.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {TEAM.map((person, index) => (
            <motion.article
              key={person.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="group overflow-hidden rounded-[28px] border border-white/7 bg-white/2 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#22d3ee]/20 hover:shadow-[0_28px_72px_rgba(0,0,0,0.50)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {person.photo ? (
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className={`flex h-full items-center justify-center bg-gradient-to-br ${person.avatarGradient} opacity-20`}>
                    <span className="text-7xl font-extrabold text-white/40 select-none">{person.initials}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040911] via-transparent to-transparent opacity-70" />
                <div
                  className="absolute right-4 top-4 rounded-full border px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.2em] backdrop-blur-sm"
                  style={{ borderColor: `${person.accent}40`, background: `${person.accent}15`, color: person.accent }}
                >
                  {person.role}
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-1.5 text-2xl font-extrabold text-white">{person.name}</h3>
                <p className="text-sm leading-6 text-white/45">{person.bio}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
