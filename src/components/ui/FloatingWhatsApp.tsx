"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";
import { Bot, MessageCircle, X } from "lucide-react";

export default function FloatingWhatsApp() {
  const [aiOpen, setAiOpen] = useState(false);
  const phoneNumber = "5492612071048";
  const defaultMessage =
    "Hola GPD Systems. Estuve viendo la web y quiero hablar sobre un proyecto.";
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-3">
      {aiOpen && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          className="w-[min(340px,calc(100vw-40px))] rounded-2xl border border-white/10 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.50)]"
          style={{
            background: "rgba(15,12,9,0.92)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ef7d43]/15 text-[#ef7d43]">
                <Bot size={15} />
              </div>
              <p className="text-sm font-bold text-white">Asistente técnico</p>
            </div>
            <button
              onClick={() => setAiOpen(false)}
              className="rounded-lg p-1.5 text-white/35 hover:bg-white/8 hover:text-white transition-all duration-150"
              aria-label="Cerrar asistente"
            >
              <X size={15} />
            </button>
          </div>
          <p className="text-sm leading-6 text-white/45">
            Contanos qué querés resolver y te responde alguien del equipo.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ef7d43] px-4 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(239,125,67,0.35)] transition-all duration-200 hover:shadow-[0_12px_32px_rgba(239,125,67,0.50)]"
          >
            <MessageCircle size={16} />
            Escribir por WhatsApp
          </a>
        </motion.div>
      )}

      <div className="flex items-center gap-3">
        <motion.button
          onClick={() => setAiOpen((v) => !v)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white shadow-[0_8px_24px_rgba(0,0,0,0.40)] transition-all duration-200 hover:border-white/20"
          style={{ background: "rgba(15,12,9,0.85)", backdropFilter: "blur(12px)" }}
          aria-label="Abrir asistente"
        >
          <Bot size={20} />
        </motion.button>
        <motion.a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            sendGAEvent({ event: "generate_lead", value: "whatsapp_floating" })
          }
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.6,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#ef7d43] text-white shadow-[0_16px_40px_rgba(239,125,67,0.45)]"
          aria-label="Escribir por WhatsApp"
        >
          <span className="absolute inset-1 rounded-full bg-[#ef7d43] opacity-20 animate-ping" />
          <MessageCircle className="relative z-10 h-7 w-7" />
        </motion.a>
      </div>
    </div>
  );
}
