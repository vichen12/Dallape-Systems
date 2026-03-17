"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  Menu,
  X,
  Terminal,
  Zap,
  Code2,
  Mail,
  Cpu,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sincronizados con los IDs de tu page.tsx
  const menuItems = [
    { name: "Inicio", href: "#hero", icon: Terminal },
    { name: "Servicios", href: "#servicios", icon: Code2 },
    { name: "Sobre Mí", href: "#About", icon: Zap }, // Coincide con id="About"
    { name: "IA", href: "#AiSection", icon: Cpu }, // Coincide con id="AiSection"
    { name: "Testimonios", href: "#Testimonials", icon: MessageSquare }, // Coincide con id="Testimonials"
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Barra de Progreso Superior */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 w-full h-[3px] bg-gradient-to-r from-electric-indigo via-purple-500 to-emerald-neon origin-left z-[100]"
      />

      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 overflow-x-clip ${
          isScrolled
            ? "py-3 bg-deep-carbon/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo Dallape Systems */}
            <Link href="#hero" className="group relative z-50">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 overflow-hidden rounded-2xl border border-white/10 bg-obsidian-slate shadow-glow-indigo">
                  <img
                    src="/fotofull-gpt.png"
                    alt="Dallape Logo"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-ghost-white tracking-tighter leading-none">
                    DALLAPÉ
                  </span>
                  <span className="text-[11px] font-mono tracking-[0.3em] text-electric-indigo uppercase leading-none mt-1">
                    Systems
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-ghost-white transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-electric-indigo group-hover:w-full transition-all duration-300" />
                </Link>
              ))}

              <div className="ml-6 pl-6 border-l border-white/10">
                <Link
                  href="#contacto"
                  className="px-6 py-2.5 rounded-xl bg-electric-indigo text-white font-bold text-sm shadow-glow-indigo hover:shadow-glow-indigo-hover hover:-translate-y-0.5 transition-all"
                >
                  Contratar
                </Link>
              </div>
            </div>

            {/** Hamburger Button **/}
            <button
              onClick={toggleMenu}
              className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-ghost-white hover:bg-electric-indigo/20 transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-6 right-6 mt-4 p-8 bg-obsidian-slate/95 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-3xl lg:hidden flex flex-col gap-6"
            >
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 text-xl font-bold text-slate-300 hover:text-electric-indigo transition-all"
                  >
                    <Icon className="text-electric-indigo" size={24} />
                    {item.name}
                  </Link>
                );
              })}
              <Link
                href="#contacto"
                onClick={() => setIsOpen(false)}
                className="mt-4 w-full py-4 rounded-xl bg-electric-indigo text-white text-center font-black text-lg"
              >
                Contratar Ahora
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
