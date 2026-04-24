"use client";

import { motion } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";

export default function ContactCTA() {
  // ConfiguraciÃ³n de WhatsApp
  const phoneNumber = "5492612071048";
  const defaultMessage =
    "Â¡Hola Vincenzo! Estuve viendo tu portfolio y me gustarÃ­a hablar con vos sobre un proyecto para mi negocio.";

  // URL de WhatsApp lista con el texto codificado
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <section
      id="contacto"
      className="relative py-32 px-4 sm:px-6 lg:px-12 w-full max-w-5xl mx-auto overflow-hidden"
    >
      {/* Glow ambiental Esmeralda gigante de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,90vw)] h-[min(300px,50vw)] pointer-events-none opacity-20 z-0">
        <div className="absolute inset-0 bg-emerald-neon blur-[120px] rounded-[100%]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 p-10 md:p-16 rounded-[32px] overflow-hidden flex flex-col items-center text-center border border-emerald-neon/30 bg-obsidian-slate/60 backdrop-blur-xl shadow-[0_0_50px_-10px_rgba(16,185,129,0.25)]"
      >
        {/* DecoraciÃ³n superior sutil */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-emerald-neon" />
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-emerald-neon drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]">
            Contacto Directo
          </span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-emerald-neon" />
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-ghost-white mb-6 tracking-tight">
          Â¿Listo para escalar <br className="hidden sm:block" />
          tu negocio?
        </h2>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Hablemos directo. Sin intermediarios, sin bots de ventas y sin
          agencias de por medio. Contame quÃ© problema tecnolÃ³gico tenÃ©s y le
          buscamos la vuelta.
        </p>

        {/* BotÃ³n MagnÃ©tico de WhatsApp */}
        <div className="relative group">
          {/* Anillo de pulso animado por detrÃ¡s del botÃ³n */}
          <motion.div
            className="absolute inset-0 rounded-full bg-emerald-neon/40 blur-md"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => sendGAEvent({ event: "generate_lead", value: "whatsapp_cta" })}
            className="relative flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-emerald-neon text-[#030712] font-extrabold text-lg sm:text-xl overflow-hidden transition-all shadow-[0_0_20px_rgba(16,185,129,0.5)] group-hover:shadow-[0_0_40px_rgba(16,185,129,0.8)]"
          >
            {/* SVG Oficial de WhatsApp */}
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7 fill-current z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            <span className="z-10">Chatear por WhatsApp</span>

            {/* Destello blanco estilo "Shine" que cruza el botÃ³n al hacer hover */}
            <motion.div
              className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40"
              initial={{ left: "-100%" }}
              whileHover={{ left: "200%" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
          </motion.a>
        </div>

        {/* Info extra de confianza */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm text-slate-500 font-mono">
          <p className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full animate-ping opacity-75 bg-emerald-neon" />
              <span className="relative rounded-full h-2 w-2 bg-emerald-neon" />
            </span>
            Respuesta promedio:{" "}
            <span className="text-emerald-neon">~5 minutos</span>
          </p>
          <p className="hidden sm:block text-white/20">â€¢</p>
          <p>Mendoza, Argentina</p>
        </div>
      </motion.div>
    </section>
  );
}

