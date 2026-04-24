"use client";

import Image from "next/image";
import { ArrowUp, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-5 pb-10 pt-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/7 bg-white/2 backdrop-blur-sm">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#22d3ee]/30 to-transparent" />
        <div className="p-6 sm:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="overflow-hidden rounded-xl bg-white p-1.5 shadow-[0_0_20px_rgba(34,211,238,0.25)]" style={{ width: 44, height: 44 }}>
                  <Image src="/logo.png" alt="GPD Systems" width={36} height={36} className="object-contain" />
                </div>
                <div>
                  <p className="text-lg font-extrabold text-white">GPD Systems</p>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#22d3ee]/50">
                    Soluciones Tecnologicas
                  </p>
                </div>
              </div>
              <p className="max-w-sm text-sm leading-6 text-white/35">
                Webs, sistemas y automatizaciones desde Mendoza, Argentina.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/5492612071048"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-sm font-extrabold text-white transition-all duration-200 hover:border-[#22d3ee]/30 hover:bg-white/6"
              >
                <MessageCircle size={16} className="text-[#22d3ee]" />
                WhatsApp
              </a>
              <a
                href="mailto:hola@gpdsystems.dev"
                className="inline-flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-sm font-extrabold text-white transition-all duration-200 hover:border-[#22d3ee]/30 hover:bg-white/6"
              >
                <Mail size={16} className="text-[#22d3ee]" />
                Email
              </a>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#3b82f6] px-4 py-3 text-sm font-extrabold text-white shadow-[0_8px_24px_rgba(34,211,238,0.30)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(34,211,238,0.45)]"
              >
                Arriba <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 px-6 py-4 sm:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/20">© 2025 GPD Systems. Todos los derechos reservados.</p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
              </span>
              <p className="text-xs text-white/20">Mendoza, Argentina</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
