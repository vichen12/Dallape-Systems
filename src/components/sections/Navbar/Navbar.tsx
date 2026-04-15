"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    { name: "Proyectos", href: "#proyectos", icon: MessageSquare },
    { name: "Planes", href: "#planes", icon: Zap },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-deep-carbon/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo Dallape Systems */}
            <Link href="#hero" className="group flex items-center gap-3 flex-shrink-0 overflow-visible">
              <div className="w-10 h-10 rounded-xl border border-white/10 bg-obsidian-slate flex-shrink-0 overflow-hidden">
                <img
                  src="/fotofull-gpt.png"
                  alt="Dallape Logo"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-shrink-0 flex flex-col overflow-visible" style={{ rowGap: "1px" }}>
                <p className="text-[16px] font-black text-white leading-[1.5] tracking-tight whitespace-nowrap overflow-visible">DALLAPÉ</p>
                <p className="text-[9px] font-mono uppercase whitespace-nowrap overflow-visible pb-[2px]" style={{ color: "#6366F1", letterSpacing: "0.28em", lineHeight: "1.6" }}>Systems</p>
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
