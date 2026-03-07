import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

import ParticleCanvas from "../components/ui/ParticleCanvas";
import TabNotifier from "../components/ui/TabNotifier"; // <-- Importamos el notifier

export const metadata: Metadata = {
  title: "Dallape Solutions | Arquitectura de Software & Ciberseguridad",
  description:
    "Ingeniero en Sistemas especializado en arquitectura de software, ciberseguridad y automatización con IA. Soluciones técnicas de alto impacto.",
  keywords: [
    "arquitectura de software",
    "ciberseguridad",
    "automatización IA",
    "freelance",
    "sistemas",
  ],
  // Forzamos a que no busque iconos
  icons: {
    icon: [
      { url: "/chatsf.png", sizes: "32x32", type: "image/png" },
      { url: "/chatsf.png", sizes: "192x192", type: "image/png" },
      { url: "/chatsf.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/chatsf.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${GeistSans.className} overflow-x-hidden`}
        suppressHydrationWarning
      >
        {/* Lógica de notificación de pestaña */}
        <TabNotifier />

        {/* Grid global fijo */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.06) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <ParticleCanvas />
        <div className="mesh-gradient" aria-hidden="true" />

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
