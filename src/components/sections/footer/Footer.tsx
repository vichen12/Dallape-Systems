"use client";

import Image from "next/image";
import { ArrowUp, Mail, MapPin } from "lucide-react";

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Equipo", href: "#equipo" },
  { label: "Planes", href: "#planes" },
  { label: "Contacto", href: "#contacto" },
];

const SERVICES = [
  "Web & e-commerce",
  "Software a medida",
  "Automatización & IA",
  "Analytics",
  "Landing pages",
];

export default function Footer() {
  return (
    <footer className="px-5 pb-10 pt-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/7 bg-white/2 backdrop-blur-sm">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#22d3ee]/30 to-transparent" />

        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="overflow-hidden rounded-xl bg-white p-1.5 shadow-[0_0_20px_rgba(34,211,238,0.20)]" style={{ width: 44, height: 44 }}>
                <Image src="/logo.png" alt="GPD Systems" width={36} height={36} className="object-contain" />
              </div>
              <p className="text-xl font-extrabold text-white">GPD Systems</p>
            </div>
            <p className="mb-6 max-w-xs text-sm leading-6 text-white/35">
              Webs, sistemas y automatizaciones desde Mendoza, Argentina. Equipo chico, trabajo real.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/gpdsystems"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/3 text-white/40 transition-all duration-200 hover:border-white/20 hover:bg-white/6 hover:text-white"
              >
                <GitHubIcon size={15} />
              </a>
              <a
                href="https://linkedin.com/company/gpdsystems"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/3 text-white/40 transition-all duration-200 hover:border-[#0077b5]/40 hover:bg-[#0077b5]/10 hover:text-[#0077b5]"
              >
                <LinkedInIcon size={15} />
              </a>
              <a
                href="https://wa.me/5492612071048"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/3 text-white/40 transition-all duration-200 hover:border-[#25D366]/40 hover:bg-[#25D366]/10 hover:text-[#25D366]"
              >
                <WhatsAppIcon size={15} />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/30">Servicios</p>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s}>
                  <a href="#servicios" className="text-sm font-medium text-white/45 transition-colors hover:text-white">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navegación */}
          <div>
            <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/30">Navegación</p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm font-medium text-white/45 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/30">Contacto</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/5492612071048"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm font-medium text-white/45 transition-colors hover:text-[#25D366]"
                >
                  <WhatsAppIcon size={14} />
                  +54 9 261 207-1048
                </a>
              </li>
              <li>
                <a
                  href="mailto:hola@gpdsystems.dev"
                  className="flex items-center gap-2.5 text-sm font-medium text-white/45 transition-colors hover:text-[#22d3ee]"
                >
                  <Mail size={14} />
                  hola@gpdsystems.dev
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm font-medium text-white/30">
                <MapPin size={14} />
                Mendoza, Argentina
              </li>
            </ul>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#3b82f6] px-4 py-2.5 text-xs font-extrabold text-white shadow-[0_8px_24px_rgba(34,211,238,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(34,211,238,0.40)]"
            >
              Volver arriba <ArrowUp size={13} />
            </button>
          </div>
        </div>

        <div className="border-t border-white/5 px-6 py-4 sm:px-10">
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
