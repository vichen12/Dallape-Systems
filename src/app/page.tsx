import Hero from "@/components/sections/hero/Hero";
import Services from "@/components/sections/services/Services";
import Navbar from "@/components/sections/Navbar/Navbar";
import AiSection from "@/components/sections/AISection/AISection";
import About from "@/components/sections/about/About";
import Testimonials from "@/components/testimonials/Testimonials";
import InteractiveContact from "@/components/sections/formulario/InteractiveContact";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import Footer from "@/components/sections/footer/Footer";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dallape-solutions.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Vincenzo Dallape",
      url: siteUrl,
      jobTitle: "Desarrollador Fullstack Freelance",
      description:
        "Desarrollador fullstack freelance con más de 3 años de experiencia en desarrollo web, apps móviles, ERPs, e-commerce y automatizaciones con IA. Mendoza, Argentina.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mendoza",
        addressRegion: "Mendoza",
        addressCountry: "AR",
      },
      sameAs: ["https://portfolio-vincenzo-dallape.netlify.app"],
      telephone: "+5492612071048",
      email: "contacto@dallape.dev",
      knowsAbout: [
        "Desarrollo Web",
        "Next.js",
        "React",
        "Node.js",
        "TypeScript",
        "Automatización con IA",
        "ERP",
        "E-Commerce",
        "IoT",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#business`,
      name: "Dallape Solutions",
      url: siteUrl,
      description:
        "Estudio de desarrollo de software freelance en Mendoza. Desarrollo web, apps móviles, ERPs, e-commerce y automatizaciones con IA.",
      founder: { "@id": `${siteUrl}/#person` },
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
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Desarrollo Web Fullstack" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Aplicaciones Móviles" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sistemas ERP a Medida" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-Commerce" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automatización con IA" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Dallape Solutions",
      description:
        "Desarrollador fullstack freelance en Mendoza, Argentina. Web, apps, ERPs y automatizaciones con IA.",
      inLanguage: "es-AR",
      publisher: { "@id": `${siteUrl}/#person` },
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
        <section id="servicios">
          <Services />
        </section>
        <section id="About">
          <About />
        </section>
        <section id="AiSection">
          <AiSection />
        </section>
        <section id="Testimonials">
          <Testimonials />
        </section>

        {/* Agregamos el formulario interactivo acá al final */}
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
