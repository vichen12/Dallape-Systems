import Hero from "@/components/sections/hero/Hero";
import Audience from "@/components/sections/audience/Audience";
import Services from "@/components/sections/services/Services";
import Navbar from "@/components/sections/Navbar/Navbar";
import About from "@/components/sections/about/About";
import ProjectsShowcase from "@/components/sections/projects/ProjectsShowcase";
import Process from "@/components/sections/process/Process";
import WebPlans from "@/components/sections/planes/WebPlans";
import InteractiveContact from "@/components/sections/formulario/InteractiveContact";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import Footer from "@/components/sections/footer/Footer";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://gpd-systems.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "GPD Systems",
      url: siteUrl,
      description:
        "Estudio boutique de perfiles de sistemas en Mendoza. Desarrollo web, software a medida, automatizaciones e IA para negocios.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mendoza",
        addressRegion: "Mendoza",
        addressCountry: "AR",
      },
      telephone: "+5492612071048",
      email: "hola@gpdsystems.dev",
      knowsAbout: [
        "Desarrollo Web",
        "Next.js",
        "React",
        "Node.js",
        "TypeScript",
        "Automatizacion con IA",
        "ERP",
        "E-Commerce",
        "Software a medida",
      ],
      member: [
        { "@type": "Person", name: "Dallape Vincenzo" },
        { "@type": "Person", name: "Garcia Fausto" },
        { "@type": "Person", name: "Podesta Isidro" },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#business`,
      name: "GPD Systems",
      url: siteUrl,
      description:
        "Estudio de ingenieria en sistemas en Mendoza. Desarrollo web, software a medida y automatizaciones.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mendoza",
        addressRegion: "Mendoza",
        addressCountry: "AR",
      },
      areaServed: [
        { "@type": "Country", name: "Argentina" },
        { "@type": "Country", name: "International" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de Desarrollo",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Desarrollo Web & E-commerce",
            },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Software a medida" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Automatizacion & IA" },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "GPD Systems",
      description:
        "Estudio boutique de ingenieria en sistemas. Webs, software a medida y automatizaciones.",
      inLanguage: "es-AR",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen">
        <section id="hero">
          <Hero />
        </section>
        <section id="clientes">
          <Audience />
        </section>
        <section id="servicios">
          <Services />
        </section>
        <section id="proyectos">
          <ProjectsShowcase />
        </section>
        <section id="proceso">
          <Process />
        </section>
        <section id="equipo">
          <About />
        </section>
        <section id="planes">
          <WebPlans />
        </section>
        <section id="contacto">
          <InteractiveContact />
        </section>
        <section id="footer">
          <Footer />
        </section>
      </main>
      <FloatingWhatsApp />
    </>
  );
}


