import Hero from "@/components/sections/hero/Hero";
import Services from "@/components/sections/services/Services";
import Navbar from "@/components/sections/Navbar/Navbar";
import AiSection from "@/components/sections/AISection/AISection";
import About from "@/components/sections/about/About";
import Testimonials from "@/components/testimonials/Testimonials";
import InteractiveContact from "@/components/sections/formulario/InteractiveContact"; // <-- El nuevo Form
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import Footer from "@/components/sections/footer/Footer";

export default function Home() {
  return (
    <>
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
