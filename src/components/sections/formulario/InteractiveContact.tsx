"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronLeft, Loader2, Mail, MapPin } from "lucide-react";
import { sendProjectBrief } from "@/app/actions/sendEmail";

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type FormData = {
  service: string;
  budget: string;
  name: string;
  contact: string;
  details: string;
};

const SERVICE_OPTIONS = [
  { value: "landing", label: "Landing page / Web", desc: "Presencia online, portfolio o negocio", emoji: "🌐" },
  { value: "software", label: "Software a medida", desc: "Dashboard, ERP, sistema interno", emoji: "⚙️" },
  { value: "automatizacion", label: "Automatización / IA", desc: "Workflows, chatbots, integraciones", emoji: "🤖" },
  { value: "consulta", label: "Consulta técnica", desc: "Tengo dudas o quiero una opinión", emoji: "💬" },
];

const BUDGET_OPTIONS = [
  { value: "hasta_200", label: "Hasta USD 200", desc: "Analytics o landing sencilla" },
  { value: "200_500", label: "USD 200 – 500", desc: "Landing completa o mejoras" },
  { value: "500_plus", label: "Más de USD 500", desc: "Sistema, app o web robusta" },
  { value: "indefinido", label: "Sin definir aún", desc: "Primero hablamos" },
];

const inputClass =
  "w-full rounded-xl border border-white/8 bg-white/3 px-4 py-4 text-white placeholder:text-white/28 transition-all duration-200 focus:border-[#22d3ee]/50 focus:bg-white/5 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.08)] outline-none text-sm font-medium";

export default function InteractiveContact() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [data, setData] = useState<FormData>({ service: "", budget: "", name: "", contact: "", details: "" });

  const pick = (field: keyof FormData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!data.name.trim() || !data.contact.trim()) return;
    setStatus("sending");
    const result = await sendProjectBrief({
      name: data.name,
      email: data.contact,
      phone: data.contact,
      details: data.details || "Sin detalles adicionales",
      service: data.service,
      budget: data.budget,
      scope: [data.service, data.budget].filter(Boolean),
    });
    setStatus(result.success ? "sent" : "error");
  };

  return (
    <section className="px-5 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.75fr]">
        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-[32px] border border-white/7 bg-white/2 p-6 backdrop-blur-sm sm:p-8"
        >
          <p className="section-label mb-4">Contacto</p>

          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/15">
                <CheckCircle2 className="h-7 w-7 text-green-400" />
              </div>
              <h3 className="mb-2 text-2xl font-extrabold text-white">Mensaje enviado.</h3>
              <p className="text-sm text-white/40">Te respondemos en menos de 24 horas. Sin bots.</p>
            </motion.div>
          ) : (
            <>
              {/* Progress bar */}
              <div className="mb-8 flex items-center gap-2">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-1 flex-1 rounded-full transition-all duration-400"
                    style={{
                      background:
                        step > n
                          ? "linear-gradient(90deg, #22d3ee, #3b82f6)"
                          : step === n
                          ? "linear-gradient(90deg, #22d3ee80, #3b82f640)"
                          : "rgba(255,255,255,0.08)",
                    }}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* Step 1: Service */}
                {step === 1 && (
                  <motion.div
                    key="s1"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.22 }}
                  >
                    <h2 className="mb-1.5 text-3xl font-extrabold text-white sm:text-4xl">¿Qué necesitás?</h2>
                    <p className="mb-7 text-sm text-white/40">Elegí el tipo de proyecto.</p>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {SERVICE_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => { pick("service", opt.value); setStep(2); }}
                          className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/3 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#22d3ee]/30 hover:bg-white/5"
                        >
                          <span className="text-2xl leading-none">{opt.emoji}</span>
                          <div>
                            <p className="text-sm font-extrabold text-white">{opt.label}</p>
                            <p className="mt-0.5 text-xs text-white/35">{opt.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Budget */}
                {step === 2 && (
                  <motion.div
                    key="s2"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.22 }}
                  >
                    <h2 className="mb-1.5 text-3xl font-extrabold text-white sm:text-4xl">¿Tenés presupuesto en mente?</h2>
                    <p className="mb-7 text-sm text-white/40">Orientativo. Ayuda a entender el alcance.</p>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {BUDGET_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => { pick("budget", opt.value); setStep(3); }}
                          className="flex flex-col gap-0.5 rounded-xl border border-white/8 bg-white/3 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#22d3ee]/30 hover:bg-white/5"
                        >
                          <p className="text-sm font-extrabold text-white">{opt.label}</p>
                          <p className="text-xs text-white/35">{opt.desc}</p>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="mt-5 flex items-center gap-1 text-xs font-semibold text-white/25 transition-colors hover:text-white/55"
                    >
                      <ChevronLeft size={13} /> Volver
                    </button>
                  </motion.div>
                )}

                {/* Step 3: Contact info */}
                {step === 3 && (
                  <motion.div
                    key="s3"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.22 }}
                  >
                    <h2 className="mb-1.5 text-3xl font-extrabold text-white sm:text-4xl">¿Cómo te contactamos?</h2>
                    <p className="mb-7 text-sm text-white/40">Te respondemos en menos de 24h.</p>
                    <div className="space-y-3">
                      <input
                        className={inputClass}
                        placeholder="Tu nombre"
                        value={data.name}
                        onChange={(e) => pick("name", e.target.value)}
                      />
                      <input
                        className={inputClass}
                        placeholder="Email o WhatsApp"
                        value={data.contact}
                        onChange={(e) => pick("contact", e.target.value)}
                      />
                      <textarea
                        className={`${inputClass} resize-none`}
                        placeholder="Algo más que quieras agregar (opcional)"
                        rows={3}
                        value={data.details}
                        onChange={(e) => pick("details", e.target.value)}
                      />
                      <button
                        onClick={handleSubmit}
                        disabled={!data.name.trim() || !data.contact.trim() || status === "sending"}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#3b82f6] px-6 py-4 text-sm font-extrabold text-white shadow-[0_12px_32px_rgba(34,211,238,0.30)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(34,211,238,0.45)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50"
                      >
                        {status === "sending" ? (
                          <><span>Enviando</span><Loader2 className="h-4 w-4 animate-spin" /></>
                        ) : (
                          <><span>Enviar consulta</span><ArrowRight size={16} /></>
                        )}
                      </button>
                      {status === "error" && (
                        <p className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-sm font-semibold text-red-400">
                          No pudimos enviar. Escribinos por WhatsApp.
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      className="mt-4 flex items-center gap-1 text-xs font-semibold text-white/25 transition-colors hover:text-white/55"
                    >
                      <ChevronLeft size={13} /> Volver
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>

        {/* Info sidebar */}
        <motion.aside
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.07 }}
          className="relative flex flex-col overflow-hidden rounded-[32px] border border-[#22d3ee]/15 bg-gradient-to-b from-[#22d3ee]/6 to-[#3b82f6]/4 p-6 sm:p-8"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#22d3ee]/8 blur-3xl" />
          <div className="relative z-10 mb-6 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ade80]" />
            </span>
            <span className="text-xs font-bold text-white/40">Disponibles ahora</span>
          </div>
          <h3 className="relative z-10 mb-2 text-2xl font-extrabold text-white">Respuesta en menos de 24h.</h3>
          <p className="relative z-10 mb-8 text-sm leading-6 text-white/40">
            Sin bots, sin intermediarios. Respondemos nosotros mismos.
          </p>
          <div className="relative z-10 mt-auto space-y-3">
            <a
              href="https://wa.me/5492612071048"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-white/7 bg-white/4 p-4 text-sm font-extrabold text-white transition-all duration-200 hover:border-[#25D366]/30 hover:bg-white/6"
            >
              <span className="text-[#25D366]"><WhatsAppIcon size={18} /></span>
              +54 9 261 207-1048
            </a>
            <a
              href="mailto:hola@gpdsystems.dev"
              className="flex items-center gap-3 rounded-xl border border-white/7 bg-white/4 p-4 text-sm font-extrabold text-white transition-all duration-200 hover:border-[#22d3ee]/30 hover:bg-white/6"
            >
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
