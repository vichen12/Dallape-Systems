"use client";

import { useEffect } from "react";

export default function TabNotifier() {
  useEffect(() => {
    const originalTitle = document.title;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // El mensaje que aparece cuando el usuario cambia de pestaña
        document.title = "¡No te vayas! 🚀 Dallapé Systems";
      } else {
        // Restauramos el título original cuando vuelve
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null; // Este componente no renderiza nada visual
}