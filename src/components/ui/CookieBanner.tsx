"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_KEY = "ds_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9998] w-[calc(100%-2rem)] max-w-xl"
        >
          <div
            style={{
              background: "linear-gradient(160deg, rgba(10,16,35,0.92) 0%, rgba(5,9,20,0.96) 100%)",
              border: "1px solid rgba(99,102,241,0.2)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.08)",
            }}
            className="rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            {/* Icono */}
            <div
              className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center"
              style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </div>

            {/* Texto */}
            <p className="flex-1 text-[12px] leading-relaxed" style={{ color: "rgba(248,250,252,0.55)" }}>
              Usamos{" "}
              <span style={{ color: "rgba(248,250,252,0.85)" }} className="font-medium">
                Google Analytics
              </span>{" "}
              para entender cómo los visitantes usan el sitio. No se comparte información personal con terceros.
            </p>

            {/* Botones */}
            <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={decline}
                className="flex-1 sm:flex-none text-[12px] px-4 py-2 rounded-xl font-medium transition-all duration-150"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(248,250,252,0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "rgba(248,250,252,0.7)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(248,250,252,0.4)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                Rechazar
              </button>
              <button
                onClick={accept}
                className="flex-1 sm:flex-none text-[12px] px-4 py-2 rounded-xl font-semibold transition-all duration-150"
                style={{
                  background: "linear-gradient(135deg, #5355E8, #6D28D9)",
                  color: "#fff",
                  boxShadow: "0 0 16px rgba(83,85,232,0.35)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 24px rgba(83,85,232,0.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 16px rgba(83,85,232,0.35)";
                }}
              >
                Aceptar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
