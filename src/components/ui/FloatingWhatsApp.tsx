"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";
import { X } from "lucide-react";

function WhatsAppSVG({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const PHONE = "5492612071048";

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const buildUrl = () => {
    const text = name
      ? `Hola GPD Systems, soy ${name}. ${message || "Quiero hablar sobre un proyecto."}`
      : message || "Hola GPD Systems. Estuve viendo la web y quiero hablar sobre un proyecto.";
    return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
  };

  const handleOpen = () => {
    setOpen((v) => !v);
    sendGAEvent({ event: "generate_lead", value: "whatsapp_floating" });
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-sm text-white placeholder:text-white/28 outline-none transition-all duration-200 focus:border-[#25D366]/40 focus:bg-white/7 focus:shadow-[0_0_0_3px_rgba(37,211,102,0.07)]";

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[min(320px,calc(100vw-40px))] overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.60)]"
            style={{ background: "rgba(10,14,20,0.95)", backdropFilter: "blur(20px)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/7 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]">
                <WhatsAppSVG size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-extrabold text-white">GPD Systems</p>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                  </span>
                  <p className="text-[10px] text-white/40">Disponibles ahora</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-colors hover:bg-white/8 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>

            {/* Chat bubble preview */}
            <div className="px-4 pt-4">
              <div className="rounded-2xl rounded-tl-sm bg-white/6 px-3.5 py-2.5">
                <p className="text-[11px] leading-5 text-white/55">
                  ¡Hola! Contanos brevemente qué necesitás y te respondemos en minutos. 👋
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-2.5 p-4">
              <input
                type="text"
                placeholder="Tu nombre (opcional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
              <textarea
                placeholder="¿Sobre qué querés hablar?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className={`${inputClass} resize-none`}
              />
              <a
                href={buildUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-extrabold text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#20ba5a] hover:shadow-[0_12px_32px_rgba(37,211,102,0.50)]"
              >
                <WhatsAppSVG size={16} />
                Continuar en WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleOpen}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_16px_40px_rgba(37,211,102,0.45)]"
        style={{ background: "#25D366" }}
        aria-label="Escribir por WhatsApp"
      >
        <span className="absolute inset-1 animate-ping rounded-full bg-[#25D366] opacity-20" />
        <span className="relative z-10">
          <WhatsAppSVG size={26} />
        </span>
      </motion.button>
    </div>
  );
}
