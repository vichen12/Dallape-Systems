"use client";
import { sendProjectBrief } from "@/app/actions/sendEmail";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  LucideIcon,
  Send,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Globe,
  Smartphone,
  Zap,
  ShieldCheck,
  Coins,
  Rocket,
  Building2,
  Compass,
  User,
  Mail,
  Phone,
  MessageSquareText,
  Loader2,
} from "lucide-react";

// ─── TYPES & INTERFACES ───────────────────────────────────────────────────────

type Step =
  | "intro"
  | "service"
  | "scope"
  | "budget"
  | "contact"
  | "review"
  | "success";

interface FormData {
  service: string;
  scope: string[];
  budget: string;
  name: string;
  email: string;
  phone: string;
  details: string;
}

// ─── CONSTANTS & DATA ────────────────────────────────────────────────────────

const SERVICES: {
  id: string;
  label: string;
  icon: LucideIcon;
  desc: string;
}[] = [
  {
    id: "web",
    label: "Web / SaaS",
    icon: Globe,
    desc: "Plataformas escalables de alto rendimiento.",
  },
  {
    id: "mobile",
    label: "App Móvil",
    icon: Smartphone,
    desc: "Experiencias nativas en iOS y Android.",
  },
  {
    id: "ai",
    label: "IA & Automación",
    icon: Zap,
    desc: "Workflows inteligentes y modelos LLM.",
  },
  {
    id: "security",
    label: "Ciberseguridad",
    icon: ShieldCheck,
    desc: "Auditorías y blindaje de infraestructura.",
  },
];

const SCOPES = [
  { id: "mvp", label: "MVP Inicial", desc: "Salir al mercado rápido." },
  {
    id: "scale",
    label: "Escalabilidad",
    desc: "Optimizar para miles de usuarios.",
  },
  {
    id: "redesign",
    label: "Rediseño Total",
    desc: "Modernizar tecnología legacy.",
  },
  {
    id: "consulting",
    label: "Consultoría",
    desc: "Arquitectura y estrategia técnica.",
  },
];

const BUDGETS: {
  id: string;
  label: string;
  icon: LucideIcon;
  iconClass: string;
  desc: string;
}[] = [
  {
    id: "t1",
    label: "< $2.5k USD",
    icon: Coins,
    iconClass: "text-slate-400",
    desc: "Soluciones ágiles.",
  },
  {
    id: "t2",
    label: "$2.5k - $8k USD",
    icon: Rocket,
    iconClass: "text-electric-indigo",
    desc: "Crecimiento y potencia.",
  },
  {
    id: "t3",
    label: "$8k - $20k+ USD",
    icon: Building2,
    iconClass: "text-emerald-neon",
    desc: "Nivel Enterprise.",
  },
  {
    id: "t4",
    label: "A definir",
    icon: Compass,
    iconClass: "text-slate-500",
    desc: "Basado en requerimientos.",
  },
];

// ─── HELPER COMPONENTS ───────────────────────────────────────────────────────

const ProgressIndicator = ({
  current,
  total,
}: {
  current: number;
  total: number;
}) => (
  <div className="flex gap-2 mb-10">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`h-1.5 rounded-full transition-all duration-500 ${
          i < current
            ? "bg-emerald-neon w-8"
            : i === current
              ? "bg-electric-indigo w-12"
              : "bg-white/10 w-4"
        }`}
      />
    ))}
  </div>
);

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function InteractiveContact() {
  const [step, setStep] = useState<Step>("intro");
  const [direction, setDirection] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    service: "",
    scope: [],
    budget: "",
    name: "",
    email: "",
    phone: "",
    details: "",
  });
  const [contactErrors, setContactErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});
  const [contactTouched, setContactTouched] = useState<{
    name?: boolean;
    email?: boolean;
    phone?: boolean;
  }>({});

  const validateContact = (field: string, value: string) => {
    if (field === "name") {
      return value.trim().length < 2
        ? "Ingresá tu nombre completo."
        : undefined;
    }
    if (field === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? undefined
        : "Email inválido.";
    }
    if (field === "phone") {
      const digits = value.replace(/\D/g, "");
      return digits.length < 7
        ? "El teléfono debe tener al menos 7 dígitos."
        : undefined;
    }
  };

  const handleContactChange = (
    field: "name" | "email" | "phone",
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setContactTouched((prev) => ({ ...prev, [field]: true }));
    setContactErrors((prev) => ({
      ...prev,
      [field]: validateContact(field, value),
    }));
  };

  const isContactValid =
    !validateContact("name", formData.name) &&
    !validateContact("email", formData.email) &&
    !validateContact("phone", formData.phone);

  // Animaciones de transición de pasos
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      filter: "blur(10px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      filter: "blur(10px)",
    }),
  };

  const nextStep = (next: Step) => {
    setDirection(1);
    setStep(next);
  };

  const prevStep = (prev: Step) => {
    setDirection(-1);
    setStep(prev);
  };

  const toggleScope = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      scope: prev.scope.includes(id)
        ? prev.scope.filter((item) => item !== id)
        : [...prev.scope, id],
    }));
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    // 1. Iniciamos el envío real al servidor
    // 2. Al mismo tiempo, nos aseguramos de que la animación dure al menos 2.5s
    // para que no sea un flashazo y parezca que hubo un "análisis" real.

    try {
      const [result] = await Promise.all([
        sendProjectBrief(formData),
        new Promise((r) => setTimeout(r, 2500)), // El delay "estético"
      ]);

      setIsAnalyzing(false);

      if (result.success) {
        setStep("success");
      } else {
        // Si falla Resend, avisamos pero NO pasamos al step success
        alert(
          "Hubo un error al enviar el mail. Por favor, intentá por WhatsApp.",
        );
        console.error(result.error);
      }
    } catch (error) {
      setIsAnalyzing(false);
      alert("Error crítico en el sistema. Reintentá en unos minutos.");
      console.error(error);
    }
  };

  // Cálculo de progreso para el indicador
  const stepMap: Record<Step, number> = {
    intro: 0,
    service: 1,
    scope: 2,
    budget: 3,
    contact: 4,
    review: 5,
    success: 6,
  };

  return (
    <section
      id="contacto"
      className="relative py-32 px-4 sm:px-6 overflow-hidden min-h-[900px] flex items-center justify-center"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-indigo/20 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <AnimatePresence mode="wait" custom={direction}>
          {/* STEP 0: INTRO */}
          {step === "intro" && (
            <motion.div
              key="intro"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="text-center flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-indigo/10 border border-electric-indigo/20 mb-8">
                <Sparkles size={14} className="text-electric-indigo" />
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-electric-indigo">
                  Engineering Consultation
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-ghost-white mb-8 tracking-tighter leading-[0.9]">
                ¿Tenés un <span className="gradient-text">problema?</span>{" "}
                <br /> Yo tengo el código.
              </h2>
              <p className="text-lg text-slate-400 max-w-xl mb-12">
                Hablemos de arquitectura, escalabilidad e impacto real. <br />
                Completá este breve asistente para iniciar la consultoría
                técnica.
              </p>
              <button
                onClick={() => nextStep("service")}
                className="group flex items-center gap-4 px-10 py-5 rounded-full bg-electric-indigo text-white font-bold text-lg shadow-glow-indigo hover:shadow-glow-indigo-hover transition-all"
              >
                Empezar Formulario!{" "}
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {/* STEP 1: SERVICE SELECTION */}
          {step === "service" && (
            <motion.div
              key="service"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <ProgressIndicator current={1} total={6} />
              <h3 className="text-3xl md:text-4xl font-black mb-10 text-ghost-white tracking-tight">
                ¿Qué área vamos a atacar?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setFormData({ ...formData, service: s.label });
                      nextStep("scope");
                    }}
                    className={`p-6 rounded-3xl border text-left transition-all duration-300 group flex items-start gap-6 ${
                      formData.service === s.label
                        ? "bg-electric-indigo/10 border-electric-indigo/50"
                        : "bg-obsidian-slate/40 border-white/5 hover:border-white/20"
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                        formData.service === s.label
                          ? "bg-electric-indigo text-white"
                          : "bg-white/5 text-slate-400 group-hover:text-ghost-white"
                      }`}
                    >
                      <s.icon size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-ghost-white mb-1">
                        {s.label}
                      </h4>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => prevStep("intro")}
                className="mt-10 text-slate-500 flex items-center gap-2 hover:text-white transition-colors"
              >
                <ChevronLeft size={16} /> Volver
              </button>
            </motion.div>
          )}

          {/* STEP 2: SCOPE / FEATURES */}
          {step === "scope" && (
            <motion.div
              key="scope"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <ProgressIndicator current={2} total={6} />
              <h3 className="text-3xl md:text-4xl font-black mb-4 text-ghost-white tracking-tight">
                Definamos el alcance.
              </h3>
              <p className="text-slate-500 mb-10">
                Podés seleccionar múltiples opciones.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SCOPES.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => toggleScope(sc.id)}
                    className={`p-6 rounded-3xl border text-left transition-all relative overflow-hidden ${
                      formData.scope.includes(sc.id)
                        ? "bg-emerald-neon/10 border-emerald-neon/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                        : "bg-obsidian-slate/40 border-white/5"
                    }`}
                  >
                    <div className="relative z-10">
                      <h4
                        className={`font-bold text-lg mb-1 ${formData.scope.includes(sc.id) ? "text-emerald-neon" : "text-ghost-white"}`}
                      >
                        {sc.label}
                      </h4>
                      <p className="text-xs text-slate-500">{sc.desc}</p>
                    </div>
                    {formData.scope.includes(sc.id) && (
                      <motion.div
                        layoutId="check"
                        className="absolute top-4 right-4 text-emerald-neon"
                      >
                        <CheckCircle2 size={20} />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-12 flex justify-between items-center">
                <button
                  onClick={() => prevStep("service")}
                  className="text-slate-500 flex items-center gap-2 hover:text-white transition-colors"
                >
                  <ChevronLeft size={16} /> Volver
                </button>
                <button
                  disabled={formData.scope.length === 0}
                  onClick={() => nextStep("budget")}
                  className={`px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all ${
                    formData.scope.length > 0
                      ? "bg-electric-indigo text-white shadow-glow-indigo"
                      : "bg-white/5 text-white/20 cursor-not-allowed"
                  }`}
                >
                  Continuar <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: BUDGET */}
          {step === "budget" && (
            <motion.div
              key="budget"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <ProgressIndicator current={3} total={6} />
              <h3 className="text-3xl md:text-4xl font-black mb-10 text-ghost-white tracking-tight">
                Presupuesto estimado.
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BUDGETS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setFormData({ ...formData, budget: b.label });
                      nextStep("contact");
                    }}
                    className={`p-8 rounded-[32px] border text-center transition-all group ${
                      formData.budget === b.label
                        ? "bg-electric-indigo/10 border-electric-indigo/50"
                        : "bg-obsidian-slate/40 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="mb-4 flex justify-center transform group-hover:scale-110 transition-transform">
                      <b.icon size={32} className={b.iconClass} />
                    </div>
                    <h4 className="font-black text-2xl text-ghost-white mb-1">
                      {b.label}
                    </h4>
                    <p className="text-sm text-slate-500">{b.desc}</p>
                  </button>
                ))}
              </div>
              <button
                onClick={() => prevStep("scope")}
                className="mt-10 text-slate-500 flex items-center gap-2 hover:text-white transition-colors"
              >
                <ChevronLeft size={16} /> Volver
              </button>
            </motion.div>
          )}

          {/* STEP 4: CONTACT DATA */}
          {step === "contact" && (
            <motion.div
              key="contact"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <ProgressIndicator current={4} total={6} />
              <h3 className="text-3xl md:text-4xl font-black mb-10 text-ghost-white tracking-tight">
                Datos del solicitante.
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 uppercase ml-2">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        handleContactChange("name", e.target.value)
                      }
                      className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-6 outline-none transition-all text-ghost-white ${
                        contactTouched.name && contactErrors.name
                          ? "border-red-500/60 focus:border-red-500"
                          : "border-white/10 focus:border-electric-indigo/50"
                      }`}
                    />
                  </div>
                  {contactTouched.name && contactErrors.name && (
                    <p className="text-xs text-red-400 ml-2 mt-1">
                      {contactErrors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 uppercase ml-2">
                    Email Corporativo
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                      size={18}
                    />
                    <input
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleContactChange("email", e.target.value)
                      }
                      className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-6 outline-none transition-all text-ghost-white ${
                        contactTouched.email && contactErrors.email
                          ? "border-red-500/60 focus:border-red-500"
                          : "border-white/10 focus:border-electric-indigo/50"
                      }`}
                    />
                  </div>
                  {contactTouched.email && contactErrors.email && (
                    <p className="text-xs text-red-400 ml-2 mt-1">
                      {contactErrors.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2 mb-10">
                <label className="text-xs font-mono text-slate-500 uppercase ml-2">
                  Teléfono / WhatsApp
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                    size={18}
                  />
                  <input
                    type="tel"
                    placeholder="+54 261 207 1048"
                    value={formData.phone}
                    onChange={(e) =>
                      handleContactChange("phone", e.target.value)
                    }
                    className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-6 outline-none transition-all text-ghost-white ${
                      contactTouched.phone && contactErrors.phone
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-white/10 focus:border-electric-indigo/50"
                    }`}
                  />
                </div>
                {contactTouched.phone && contactErrors.phone && (
                  <p className="text-xs text-red-400 ml-2 mt-1">
                    {contactErrors.phone}
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => prevStep("budget")}
                  className="text-slate-500 flex items-center gap-2 hover:text-white transition-colors"
                >
                  <ChevronLeft size={16} /> Volver
                </button>
                <button
                  disabled={!isContactValid}
                  onClick={() => nextStep("review")}
                  className={`px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all ${
                    isContactValid
                      ? "bg-electric-indigo text-white shadow-glow-indigo"
                      : "bg-white/5 text-white/20 cursor-not-allowed"
                  }`}
                >
                  Revisar Brief <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: REVIEW & FINAL SEND */}
          {step === "review" && (
            <motion.div
              key="review"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <ProgressIndicator current={5} total={6} />
              <h3 className="text-3xl md:text-4xl font-black mb-8 text-ghost-white tracking-tight">
                Confirmación del Brief técnico.
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                  <p className="text-[10px] font-mono text-slate-600 uppercase mb-4 tracking-widest">
                    Requerimientos
                  </p>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400 text-sm italic">
                        Servicio
                      </span>
                      <span className="text-ghost-white font-bold">
                        {formData.service}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400 text-sm italic">
                        Presupuesto
                      </span>
                      <span className="text-emerald-neon font-bold">
                        {formData.budget}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-sm italic mb-2">
                        Alcance
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {formData.scope.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-1 rounded-lg bg-electric-indigo/20 text-electric-indigo text-[10px] font-bold uppercase"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                  <p className="text-[10px] font-mono text-slate-600 uppercase mb-4 tracking-widest">
                    Contacto
                  </p>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-sm italic">
                        Nombre
                      </span>
                      <span className="text-ghost-white font-medium">
                        {formData.name}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-sm italic">
                        Email
                      </span>
                      <span className="text-ghost-white font-medium">
                        {formData.email}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-sm italic">
                        Teléfono
                      </span>
                      <span className="text-ghost-white font-medium">
                        {formData.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-12">
                <label className="text-xs font-mono text-slate-500 uppercase ml-2 flex items-center gap-2">
                  <MessageSquareText size={14} /> Detalles adicionales
                  (Opcional)
                </label>
                <textarea
                  placeholder="Contame brevemente el problema central..."
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-electric-indigo/50 transition-all text-ghost-white min-h-[120px]"
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => prevStep("contact")}
                  className="text-slate-500 flex items-center gap-2 hover:text-white transition-colors underline underline-offset-4"
                >
                  Editar datos
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="px-10 py-5 rounded-full bg-emerald-neon text-deep-carbon font-black text-lg flex items-center gap-3 shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:scale-105 transition-all"
                >
                  {isAnalyzing ? (
                    <>
                      Analizando <Loader2 className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Enviar Briefing Técnico <Send size={20} />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 6: SUCCESS */}
          {step === "success" && (
            <motion.div
              key="success"
              variants={variants}
              initial="enter"
              animate="center"
              className="text-center flex flex-col items-center py-20"
            >
              <div className="relative mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10, delay: 0.2 }}
                  className="w-32 h-32 rounded-full bg-emerald-neon flex items-center justify-center text-deep-carbon shadow-[0_0_50px_rgba(16,185,129,0.5)]"
                >
                  <CheckCircle2 size={64} strokeWidth={3} />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-4 border-emerald-neon"
                />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-ghost-white mb-4">
                ¡Brief Recibido!
              </h2>
              <p className="text-lg text-slate-400 max-w-md mb-12">
                Mi sistema de análisis está procesando tu solicitud. Te
                contactaré a{" "}
                <span className="text-emerald-neon font-bold">
                  {formData.email}
                </span>{" "}
                en menos de 24 horas hábiles.
              </p>
              <button
                onClick={() => {
                  setStep("intro");
                  setFormData({
                    service: "",
                    scope: [],
                    budget: "",
                    name: "",
                    email: "",
                    phone: "",
                    details: "",
                  });
                }}
                className="text-xs font-mono text-slate-600 hover:text-electric-indigo transition-colors uppercase tracking-[0.3em] border-b border-white/5 pb-2"
              >
                Cerrar Protocolo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background Glitch / Noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
}
