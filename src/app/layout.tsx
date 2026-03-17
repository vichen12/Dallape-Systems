import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import ParticleCanvas from "../components/ui/ParticleCanvas";
import TabNotifier from "../components/ui/TabNotifier";
import { GoogleAnalytics } from "@next/third-parties/google";

// ─── Dominio base ─────────────────────────────────────────────────────────────
// Cambiá NEXT_PUBLIC_SITE_URL en Vercel cuando tengas dominio propio.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dallape-solutions.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Dallape Systems | Desarrollo Web & Automatización con IA — Mendoza",
    template: "%s | Dallape Systems",
  },

  description:
    "Vincenzo Dallape — Desarrollador fullstack freelance en Mendoza, Argentina. Desarrollo web, apps móviles, ERPs, e-commerce y automatizaciones con IA. Atención directa, sin intermediarios.",

  keywords: [
    "desarrollador fullstack mendoza",
    "desarrollo web argentina",
    "programador freelance mendoza",
    "automatización con IA",
    "desarrollo de software mendoza",
    "Next.js argentina",
    "aplicaciones web a medida",
    "e-commerce argentina",
    "ERP a medida",
    "automatización de procesos",
    "chatbot empresarial",
    "IoT mendoza",
    "Vincenzo Dallape",
    "Dallape Systems",
  ],

  authors: [{ name: "Vincenzo Dallape", url: siteUrl }],
  creator: "Vincenzo Dallape",
  publisher: "Dallape Systems",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "Dallape Systems",
    title: "Dallape Systems | Desarrollo Web & Automatización con IA",
    description:
      "Desarrollador fullstack freelance en Mendoza. Web, apps, ERPs y automatizaciones con IA. Atención directa, resultados reales.",
    images: [
      {
        url: "/chatsf.png",
        width: 512,
        height: 512,
        alt: "Dallape Systems — Desarrollo de Software",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "Dallape Systems | Desarrollo Web & IA",
    description:
      "Desarrollador fullstack freelance en Mendoza. Web, apps, ERPs y automatizaciones con IA.",
    images: ["/chatsf.png"],
  },

  alternates: {
    canonical: siteUrl,
  },

  verification: {
    google: "E2Eh2uhvIFdfEZRbCfXbf3MiByX-YY0taSI1g2vMYmM",
  },

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

      <GoogleAnalytics gaId="G-8VQWX6N126" />
    </html>
  );
}
