import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import AuroraBackground from "../components/ui/AuroraBackground";
import TabNotifier from "../components/ui/TabNotifier";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://gpd-systems.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GPD Systems | Estudio de ingenieria en sistemas",
    template: "%s | GPD Systems",
  },
  description:
    "Estudio boutique de perfiles de sistemas en Mendoza. Desarrollo web, software a medida, e-commerce, automatizaciones e IA. Trato directo con quienes escriben el codigo.",
  keywords: [
    "GPD Systems",
    "estudio de software mendoza",
    "ingenieria en sistemas mendoza",
    "desarrollo web argentina",
    "software a medida argentina",
    "automatizacion con IA",
    "desarrollo de software mendoza",
    "Next.js argentina",
    "aplicaciones web a medida",
    "e-commerce argentina",
    "ERP a medida",
    "automatizacion de procesos",
    "chatbot empresarial",
  ],
  authors: [{ name: "GPD Systems", url: siteUrl }],
  creator: "GPD Systems",
  publisher: "GPD Systems",
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
    siteName: "GPD Systems",
    title: "GPD Systems | Estudio de ingenieria en sistemas",
    description:
      "Garcia, Podesta y Dallape. Desarrollo web, software a medida y automatizaciones desde Mendoza.",
    images: [
      {
        url: "/chatsf.png",
        width: 512,
        height: 512,
        alt: "GPD Systems - Desarrollo de Software",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "GPD Systems | Ingenieria en sistemas",
    description:
      "Estudio boutique de perfiles de sistemas. Webs, software a medida y automatizaciones.",
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
        className={`${jakarta.variable} ${inter.variable} font-sans`}
        suppressHydrationWarning
      >
        <AuroraBackground />
        <TabNotifier />
        <div className="relative z-10" style={{ overflowX: "clip" }}>
          {children}
        </div>
        <GoogleAnalytics gaId="G-8VQWX6N126" />
      </body>
    </html>
  );
}


