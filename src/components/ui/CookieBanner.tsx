"use client";

/* eslint-disable react-hooks/set-state-in-effect */

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
            className="rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{
              background: "rgba(15,12,9,0.92)",
              border: "1px solid rgba(239,125,67,0.18)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.60), 0 0 0 1px rgba(239,125,67,0.08)",
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center"
              style={{ background: "rgba(239,125,67,0.10)", border: "1px solid rgba(239,125,67,0.20)" }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#ef7d43" strokeWidth="2" strokeLinecap="round">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </div>

            <p className="flex-1 text-[12px] leading-relaxed text-white/45">
              Usamos{" "}
              <span className="text-white/80 font-medium">Google Analytics</span>{" "}
              para entender cómo los visitantes usan el sitio. No se comparte información personal con terceros.
            </p>

            <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={decline}
                className="flex-1 sm:flex-none text-[12px] px-4 py-2 rounded-xl font-medium transition-all duration-150 border border-white/8 bg-white/4 text-white/40 hover:text-white/70 hover:border-white/15"
              >
                Rechazar
              </button>
              <button
                onClick={accept}
                className="flex-1 sm:flex-none text-[12px] px-4 py-2 rounded-xl font-semibold text-white transition-all duration-150"
                style={{
                  background: "#ef7d43",
                  boxShadow: "0 4px 16px rgba(239,125,67,0.40)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 6px 24px rgba(239,125,67,0.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(239,125,67,0.40)";
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
