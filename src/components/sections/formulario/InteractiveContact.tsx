"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { sendProjectBrief } from "@/app/actions/sendEmail";

export default function InteractiveContact() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    const result = await sendProjectBrief({
      name: String(data.get("name") || ""),
      email: String(data.get("contact") || ""),
      phone: String(data.get("contact") || ""),
      details: String(data.get("details") || ""),
      service: "Contacto web",
      budget: "A definir",
      scope: ["Brief corto"],
    });
    if (result.success) { form.reset(); setState("sent"); }
    else setState("error");
  };

  const inputClass =
    "w-full rounded-xl border border-white/8 bg-white/3 px-4 py-4 text-white placeholder:text-white/28 transition-all duration-200 focus:border-[#22d3ee]/50 focus:bg-white/5 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.08)] outline-none text-sm font-medium";

  return (
    <section className="px-5 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.75fr]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-[32px] border border-white/7 bg-white/2 p-6 backdrop-blur-sm sm:p-8"
        >
          <p className="section-label mb-4">Contacto</p>
          <h2 className="mb-2 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Mostranos qué necesitás.
          </h2>
          <p className="mb-8 text-sm leading-7 text-white/40">
            Sin formularios kilométricos. Contanos el problema y hablamos.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input name="name" required minLength={2} className={inputClass} placeholder="Tu nombre" />
            <input name="contact" required className={inputClass} placeholder="Email o WhatsApp" />
            <textarea name="details" required minLength={10} rows={5} className={`${inputClass} resize-none`} placeholder="Web, sistema, automatización, idea..." />
            <button
              type="submit"
              disabled={state === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#3b82f6] px-6 py-4 text-sm font-extrabold text-white shadow-[0_12px_32px_rgba(34,211,238,0.30)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(34,211,238,0.45)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {state === "sending" ? <><span>Enviando</span><Loader2 className="h-4 w-4 animate-spin" /></> : <><span>Enviar mensaje</span><Send size={16} /></>}
            </button>
            {state === "sent" && (
              <p className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/8 px-4 py-3 text-sm font-semibold text-green-400">
                <CheckCircle2 size={16} /> Mensaje enviado. Te respondemos pronto.
              </p>
            )}
            {state === "error" && (
              <p className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-sm font-semibold text-red-400">
                No pudimos enviar. Escribinos por WhatsApp.
              </p>
            )}
          </form>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.07 }}
          className="relative flex flex-col overflow-hidden rounded-[32px] border border-[#22d3ee]/15 bg-gradient-to-b from-[#22d3ee]/6 to-[#3b82f6]/4 p-6 sm:p-8"
        >
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#22d3ee]/8 blur-3xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-6 relative z-10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ade80]" />
            </span>
            <span className="text-xs font-bold text-white/40">Disponibles ahora</span>
          </div>
          <h3 className="mb-2 text-2xl font-extrabold text-white relative z-10">Respuesta en menos de 24h.</h3>
          <p className="mb-8 text-sm leading-6 text-white/40 relative z-10">Sin bots, sin intermediarios. Respondemos nosotros mismos.</p>
          <div className="space-y-3 mt-auto relative z-10">
            <a href="https://wa.me/5492612071048" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-xl border border-white/7 bg-white/4 p-4 text-sm font-extrabold text-white transition-all duration-200 hover:border-[#22d3ee]/30 hover:bg-white/6">
              <MessageCircle className="h-5 w-5 text-[#22d3ee] shrink-0" />
              +54 9 261 207-1048
            </a>
            <a href="mailto:hola@gpdsystems.dev" className="group flex items-center gap-3 rounded-xl border border-white/7 bg-white/4 p-4 text-sm font-extrabold text-white transition-all duration-200 hover:border-[#22d3ee]/30 hover:bg-white/6">
              <Mail className="h-5 w-5 text-[#22d3ee] shrink-0" />
              hola@gpdsystems.dev
            </a>
            <div className="flex items-center gap-3 rounded-xl border border-white/7 bg-white/4 p-4 text-sm font-extrabold text-white">
              <MapPin className="h-5 w-5 text-[#22d3ee] shrink-0" />
              Mendoza, Argentina
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
