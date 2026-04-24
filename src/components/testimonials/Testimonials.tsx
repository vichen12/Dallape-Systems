"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

// 5 Testimonios de alto impacto para que el carrusel sea largo y fluido
const TESTIMONIALS = [
  {
    content: "HabÃ­amos pasado por dos agencias que nos cobraron una fortuna y nos dejaron un sistema inmanejable. Vincenzo reescribiÃ³ la arquitectura en semanas. El cÃ³digo es limpio y la comunicaciÃ³n fue directa.",
    client: "MartÃ­n R.",
    role: "CEO",
    company: "Fintech Startup",
    gradient: "from-[#6366F1] to-[#8B5CF6]", // Indigo
    glow: "rgba(99,102,241,0.2)"
  },
  {
    content: "TenÃ­amos a 3 personas haciendo carga manual de datos. Le pedimos a Vincenzo que nos automatice el flujo. Nos armÃ³ un bot con IA que ahora hace ese trabajo en 5 minutos. Se pagÃ³ solo el primer mes.",
    client: "Laura G.",
    role: "Dir. de Operaciones",
    company: "Agencia E-Commerce",
    gradient: "from-[#10B981] to-[#059669]", // Emerald
    glow: "rgba(16,185,129,0.2)"
  },
  {
    content: "Nuestra tienda de Shopify tardaba 6 segundos en cargar y perdÃ­amos ventas. OptimizÃ³ todo el cÃ³digo, configurÃ³ el SEO tÃ©cnico y ahora la web vuela. Pasamos de 90 a 100 en Google Lighthouse.",
    client: "Diego S.",
    role: "Founder",
    company: "Retail Brand",
    gradient: "from-[#06B6D4] to-[#3B82F6]", // Cyan
    glow: "rgba(6,182,212,0.2)"
  },
  {
    content: "NecesitÃ¡bamos una app mÃ³vil robusta y no querÃ­amos lidiar con dos bases de cÃ³digo. Nos armÃ³ todo en React Native. La app se siente 100% nativa, rÃ¡pida y no se cuelga nunca. Impecable nivel de detalle.",
    client: "SofÃ­a M.",
    role: "Product Manager",
    company: "HealthTech",
    gradient: "from-[#F59E0B] to-[#D97706]", // Amber
    glow: "rgba(245,158,11,0.2)"
  },
  {
    content: "Lo contratÃ© para auditar la seguridad de nuestro backend. EncontrÃ³ vulnerabilidades que nadie mÃ¡s vio y reestructurÃ³ la base de datos para que escale sin romper nada. Duermo mÃ¡s tranquilo ahora.",
    client: "Lucas P.",
    role: "CTO",
    company: "SaaS Platform",
    gradient: "from-[#EC4899] to-[#BE185D]", // Pink
    glow: "rgba(236,72,153,0.2)"
  }
];

export default function Testimonials() {
  // Duplicamos el array para crear el truco del loop infinito sin cortes visuales
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonios" className="relative py-32 w-full overflow-hidden">

      {/* MAGIA CSS: Inyectamos los keyframes acÃ¡ para no tener que tocar globals.css */}
      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 45s linear infinite;
        }
        /* Cuando pasÃ¡s el mouse, el carrusel se frena suavemente */
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Glow ambiental de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none opacity-20 z-0">
        <div className="absolute inset-0 bg-electric-indigo blur-[150px] rounded-[100%]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-20 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-px w-8 bg-emerald-neon" />
          <span className="text-xs font-mono tracking-[0.4em] uppercase text-emerald-neon">
            Resultados Reales
          </span>
          <div className="h-px w-8 bg-emerald-neon" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ghost-white mb-6"
        >
          No me creas a mÃ­.<br />
          <span className="gradient-text">CreÃ©le a mi cÃ³digo.</span>
        </motion.h2>
      </div>

      {/* CONTENEDOR DEL CAROUSEL MAGNÃ‰TICO */}
      <div
        className="relative z-10 w-full overflow-hidden"
        style={{
          // Este mask-image hace que los bordes izquierdo y derecho se difuminen a transparente
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex w-max gap-6 sm:gap-8 animate-infinite-scroll px-4">
          {duplicatedTestimonials.map((testimonial, i) => (
            <div
              key={i}
              className="relative w-[320px] sm:w-[420px] flex-shrink-0 flex flex-col p-8 rounded-[32px] bg-obsidian-slate/40 backdrop-blur-xl border border-white/5 transition-all duration-500 hover:-translate-y-2 group overflow-hidden"
              style={{
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
              }}
              // JavaScript dinÃ¡mico para que cada tarjeta brille con su propio color de acento
              onMouseEnter={(e) => {
                const hexColor = testimonial.gradient.split(' ')[0].replace('from-[', '').replace(']', '');
                e.currentTarget.style.borderColor = `${hexColor}60`;
                e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.85)';
                e.currentTarget.style.boxShadow = `0 10px 40px ${testimonial.glow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.4)';
                e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Marca de agua GIGANTE de fondo que rota sutilmente */}
              <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">
                <Quote size={220} />
              </div>

              {/* Icono de cita y Estrellas */}
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
                  <Quote size={18} className="text-slate-400 group-hover:text-white" />
                </div>
                <div className="flex gap-1.5 bg-obsidian-slate/80 px-3 py-1.5 rounded-full border border-white/5">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} size={12} className="fill-emerald-neon text-emerald-neon opacity-90" />
                  ))}
                </div>
              </div>

              {/* Texto principal */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-10 flex-1 relative z-10 group-hover:text-slate-100 transition-colors">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Footer con el perfil del cliente */}
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5 relative z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white bg-gradient-to-br ${testimonial.gradient} shadow-lg ring-2 ring-white/5 group-hover:ring-white/20 transition-all`}>
                  {testimonial.client.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ghost-white group-hover:text-white transition-colors">{testimonial.client}</h4>
                  <p className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-widest">{testimonial.role}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{testimonial.company}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

