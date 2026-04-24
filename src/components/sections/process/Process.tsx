"use client";

import { motion } from "framer-motion";

const STEPS = [
  { name: "Charla", desc: "Entendemos qué problema real querés resolver antes de hablar de tecnología." },
  { name: "Propuesta", desc: "Alcance claro, precio fijo y tiempo estimado. Sin sorpresas." },
  { name: "Desarrollo", desc: "Iteraciones cortas con feedback real. Ves el avance desde el día uno." },
  { name: "Entrega", desc: "Deploy, documentación y soporte inicial incluidos. Listo para escalar." },
];

export default function Process() {
  return (
    <section className="px-5 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/7 bg-white/2 backdrop-blur-sm">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#22d3ee]/35 to-transparent" />
        <div className="p-6 sm:p-10">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-label mb-4">Proceso</p>
              <h2 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                Simple, directo, sin humo.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-white/45">
              Hablamos, definimos alcance, construimos y dejamos todo listo para usar.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group relative rounded-xl border border-white/7 bg-white/3 p-5 transition-all duration-250 hover:bg-white/5 hover:border-[#22d3ee]/25"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-[#22d3ee]">0{index + 1}</span>
                  <div className="h-5 w-5 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#22d3ee]/40 transition-colors">
                    <div className="h-1.5 w-1.5 rounded-full bg-white/15 group-hover:bg-[#22d3ee]/60 transition-colors" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-extrabold text-white">{step.name}</h3>
                <p className="text-sm leading-6 text-white/40 group-hover:text-white/55 transition-colors">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3 border-t border-white/6 pt-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ade80]" />
            </span>
            <p className="text-xs font-semibold text-white/35">
              Respuesta inicial en menos de <span className="text-[#4ade80]">24 horas</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
