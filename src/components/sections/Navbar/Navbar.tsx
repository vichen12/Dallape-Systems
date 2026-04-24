"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const menuItems = [
  { name: "Servicios", href: "#servicios" },
  { name: "Casos", href: "#proyectos" },
  { name: "Equipo", href: "#equipo" },
  { name: "Planes", href: "#planes" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-4 right-4 top-4 z-50 rounded-2xl transition-all duration-300 ${
        isScrolled
          ? "border border-white/8 bg-[#040911]/90 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.60)] backdrop-blur-xl"
          : "border border-white/5 bg-[#040911]/50 py-3 backdrop-blur-md"
      }`}
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link href="#hero" className="flex items-center gap-2.5">
          <div className="overflow-hidden rounded-lg bg-white p-1 shadow-[0_0_14px_rgba(34,211,238,0.18)]" style={{ width: 36, height: 36 }}>
            <Image
              src="/logo.png"
              alt="GPD Systems"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-extrabold leading-none text-white tracking-wide">
              GPD Systems
            </p>
            <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.28em] text-[#22d3ee]/60">
              Soluciones Tecnologicas
            </p>
          </div>
        </Link>

        {/* Desktop menu */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white/50 transition-all duration-200 hover:bg-white/5 hover:text-white"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="#contacto"
            className="ml-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#3b82f6] px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_4px_20px_rgba(34,211,238,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(34,211,238,0.50)]"
          >
            Hablemos
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/5 text-white transition-all duration-200 hover:bg-white/10 lg:hidden"
          aria-label="Abrir menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-white/8 bg-[#040911]/95 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.70)] backdrop-blur-xl lg:hidden"
          >
            <div className="grid gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-extrabold text-white/70 transition-all duration-200 hover:bg-white/5 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="#contacto"
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#3b82f6] px-5 py-3.5 text-center text-base font-extrabold text-white shadow-[0_8px_24px_rgba(34,211,238,0.35)]"
              >
                Hablemos
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
