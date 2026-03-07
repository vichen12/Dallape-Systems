"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const COOKIE_KEY = "ds_cookie_consent";

export default function GoogleAnalyticsConsent({ gaId }: { gaId: string }) {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const check = () => {
      setConsented(localStorage.getItem(COOKIE_KEY) === "accepted");
    };
    check();
    // Re-check cuando el usuario interactúa con el banner
    window.addEventListener("storage", check);
    // Polling liviano para capturar el click en el banner (mismo tab)
    const interval = setInterval(check, 500);
    return () => {
      window.removeEventListener("storage", check);
      clearInterval(interval);
    };
  }, []);

  if (!consented) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
