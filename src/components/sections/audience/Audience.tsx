"use client";

import { motion } from "framer-motion";
import { Building2, Rocket, ServerCog, ShoppingCart } from "lucide-react";

const CLIENTS = [
  { icon: Building2, title: "PyMEs", desc: "Negocios que necesitan presencia digital o sistemas que funcionen.", accent: "#22d3ee" },
  { icon: ShoppingCart, title: "E-commerce", desc: "Tiendas que quieren vender más y cargar más rápido.", accent: "#60a5fa" },
  { icon: Rocket, title: "Startups", desc: "MVPs rápidos, arquitectura limpia desde el día uno.", accent: "#22d3ee" },
  { icon: ServerCog, title: "Sistemas internos", desc: "Dashboards, ERPs, automatizaciones y herramientas de equipo.", accent: "#4ade80" },
];

export default function Audience() {
  return (
    <section className="px-5 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label mb-4">Para quien</p>
            <h2 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              Si hay un problema técnico,<br className="hidden sm:block" /> lo resolvemos.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-white/45">
            Negocios de cualquier tamaño que quieren tecnología que funcione sin vueltas.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CLIENTS.map((client, index) => {
            const Icon = client.icon;
            return (
              <motion.div
                key={client.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group rounded-2xl border border-white/7 bg-white/2 p-6 backdrop-blur-sm transition-all duration-250 hover:-translate-y-1 hover:border-[#22d3ee]/20 hover:bg-white/4 hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)]"
              >
                <div
                  className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 transition-transform duration-250 group-hover:scale-110"
                  style={{ color: client.accent }}
                >
                  <Icon size={20} />
                </div>
                <h3 className="mb-2 text-xl font-extrabold text-white">{client.title}</h3>
                <p className="text-sm leading-6 text-white/45">{client.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
