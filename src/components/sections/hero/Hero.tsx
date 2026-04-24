"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

const CODE_LINES = [
  { n: "01", tokens: [{ t: "import", c: "kw" }, { t: " { useState, useEffect } ", c: "plain" }, { t: "from", c: "kw" }, { t: " 'react'", c: "str" }, { t: ";", c: "dim" }] },
  { n: "02", tokens: [{ t: "import", c: "kw" }, { t: " { motion } ", c: "plain" }, { t: "from", c: "kw" }, { t: " 'framer-motion'", c: "str" }, { t: ";", c: "dim" }] },
  { n: "03", tokens: [{ t: "import", c: "kw" }, { t: " { Code, Server, ShieldCheck, Zap } ", c: "plain" }, { t: "from", c: "kw" }, { t: " 'lucide-react'", c: "str" }, { t: ";", c: "dim" }] },
  { n: "04", tokens: [] },
  { n: "05", tokens: [{ t: "const", c: "kw" }, { t: " GPD ", c: "fn" }, { t: "= () => {", c: "dim" }] },
  { n: "06", tokens: [{ t: "  const", c: "kw" }, { t: " [data, setData] ", c: "plain" }, { t: "= useState(", c: "dim" }, { t: "null", c: "kw" }, { t: ");", c: "dim" }] },
  { n: "07", tokens: [{ t: "  const", c: "kw" }, { t: " [loading, setLoading] ", c: "plain" }, { t: "= useState(", c: "dim" }, { t: "true", c: "kw" }, { t: ");", c: "dim" }] },
  { n: "08", tokens: [] },
  { n: "09", tokens: [{ t: "  useEffect", c: "fn" }, { t: "(() => {", c: "dim" }] },
  { n: "10", tokens: [{ t: "    async function ", c: "kw" }, { t: "fetchData", c: "fn" }, { t: "() {", c: "dim" }] },
  { n: "11", tokens: [{ t: "      const", c: "kw" }, { t: " res ", c: "plain" }, { t: "= await ", c: "dim" }, { t: "fetch", c: "fn" }, { t: "(", c: "dim" }, { t: "'/api/solutions'", c: "str" }, { t: ");", c: "dim" }] },
  { n: "12", tokens: [{ t: "      const", c: "kw" }, { t: " result ", c: "plain" }, { t: "= await res.", c: "dim" }, { t: "json", c: "fn" }, { t: "();", c: "dim" }] },
  { n: "13", tokens: [{ t: "      setData", c: "fn" }, { t: "(result);", c: "dim" }] },
  { n: "14", tokens: [{ t: "      setLoading", c: "fn" }, { t: "(", c: "dim" }, { t: "false", c: "kw" }, { t: ");", c: "dim" }] },
  { n: "15", tokens: [{ t: "    }", c: "dim" }] },
  { n: "16", tokens: [{ t: "    fetchData", c: "fn" }, { t: "();", c: "dim" }] },
  { n: "17", tokens: [{ t: "  }, []);", c: "dim" }] },
];

const TOKEN_COLOR: Record<string, string> = {
  kw: "#c792ea",
  fn: "#82aaff",
  str: "#c3e88d",
  plain: "#cdd3de",
  dim: "#637777",
};

function CodeEditor() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative w-full"
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute -inset-8 -z-10 rounded-full blur-[60px]"
        style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.18) 0%, rgba(59,130,246,0.12) 50%, transparent 80%)" }}
      />

      {/* Editor window */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-[0_32px_80px_rgba(0,0,0,0.70),0_0_0_1px_rgba(34,211,238,0.06)]">
        {/* Title bar */}
        <div className="flex items-center gap-3 border-b border-white/6 bg-[#161b22] px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <div className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex items-center gap-2 rounded-md border border-white/8 bg-white/5 px-3 py-1">
            <span className="text-[10px] font-mono text-white/35">GPD.tsx</span>
            <span className="text-[10px] text-[#4ade80]">●</span>
          </div>
          <div className="ml-auto flex gap-1">
            <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-white/20 font-mono">TypeScript JSX</span>
          </div>
        </div>

        {/* Code area */}
        <div className="p-4 font-mono text-[11px] leading-[1.9] sm:text-xs">
          {CODE_LINES.map((line) => (
            <div key={line.n} className="flex gap-4">
              <span className="w-5 shrink-0 select-none text-right text-[#4ade80]/40">{line.n}</span>
              <span>
                {line.tokens.map((tok, ti) => (
                  <span key={ti} style={{ color: TOKEN_COLOR[tok.c] }}>
                    {tok.t}
                  </span>
                ))}
              </span>
            </div>
          ))}
          {/* Cursor blink */}
          <div className="flex gap-4 mt-1">
            <span className="w-5 shrink-0 select-none text-right text-[#4ade80]/40">18</span>
            <span className="text-white/60">
              {"  return ("}
            </span>
          </div>
          <div className="flex gap-4">
            <span className="w-5 shrink-0 select-none text-right text-[#4ade80]/40">19</span>
            <span>
              <span style={{ color: "#82aaff" }}>{"    <motion.div "}</span>
              <span style={{ color: "#c792ea" }}>className</span>
              <span style={{ color: "#637777" }}>{"="}</span>
              <span style={{ color: "#c3e88d" }}>{'"hero"'}</span>
              <span style={{ color: "#82aaff" }}>{">"}</span>
            </span>
          </div>
          <div className="flex gap-4">
            <span className="w-5 shrink-0 select-none text-right text-[#4ade80]/40">20</span>
            <span style={{ color: "#cdd3de" }}>{"      Impulsamos tu negocio con tecnologia."}</span>
          </div>
          <div className="flex gap-4">
            <span className="w-5 shrink-0 select-none text-right text-[#4ade80]/40">21</span>
            <span style={{ color: "#82aaff" }}>{"    </motion.div>"}</span>
            <span className="inline-block w-2 animate-pulse bg-[#22d3ee] ml-0.5" style={{ height: "0.85em" }} />
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between border-t border-white/5 bg-[#0d1117] px-4 py-1.5">
          <div className="flex items-center gap-3">
            <div className="flex h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
            <span className="text-[9px] font-mono text-white/25">GPD Systems — Listo</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono text-white/20">TypeScript</span>
            <span className="text-[9px] font-mono text-white/20">UTF-8</span>
            <span className="text-[9px] font-mono text-[#22d3ee]/50">Ln 21, Col 1</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-5 sm:px-6 lg:px-10"
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-0 top-1/2 h-[600px] w-[600px] -translate-x-1/3 -translate-y-1/2 rounded-full blur-[120px]"
          style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.20) 0%, transparent 70%)" }}
        />
        <div
          className="absolute right-0 top-1/3 h-[400px] w-[500px] translate-x-1/4 rounded-full blur-[100px]"
          style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.15) 0%, transparent 70%)" }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-10 py-24 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14 lg:py-0">
        {/* Left: text */}
        <div>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-7 flex items-center gap-3"
          >
            <div className="overflow-hidden rounded-xl bg-white p-1.5 shadow-[0_0_20px_rgba(34,211,238,0.20)]" style={{ width: 44, height: 44 }}>
              <Image src="/logo.png" alt="GPD Systems" width={36} height={36} className="object-contain" />
            </div>
            <div>
              <p className="text-sm font-extrabold leading-tight text-white">GPD Systems</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#22d3ee]/60">Soluciones Tecnologicas</p>
            </div>
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.04 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#22d3ee]/20 bg-[#22d3ee]/6 px-4 py-2"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#22d3ee]/70">
              Disponibles ahora &mdash; Mendoza, AR
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-[2.4rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]"
          >
            Webs y sistemas{" "}
            <br className="hidden sm:block" />
            <span className="gradient-text">con cabeza tecnica.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-5 max-w-md text-base font-medium leading-7 text-white/45"
          >
            Menos bugs. Mas resultados. Armamos sitios, software e integraciones
            para negocios que quieren ordenar lo digital.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.20 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#contacto"
              className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#3b82f6] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_12px_40px_rgba(34,211,238,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(34,211,238,0.50)]"
            >
              Iniciar proyecto
              <ArrowRight size={16} />
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-extrabold text-white backdrop-blur-sm transition-all duration-200 hover:border-[#22d3ee]/25 hover:bg-white/8"
            >
              Ver servicios
              <ChevronRight size={16} className="text-[#22d3ee]" />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-10 flex items-center gap-7 border-t border-white/6 pt-7"
          >
            {[
              { value: "3", label: "Ingenieros" },
              { value: "12+", label: "Proyectos" },
              { value: "24h", label: "Respuesta" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-7">
                <div>
                  <p className="text-2xl font-extrabold gradient-text leading-none">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold text-white/28">{stat.label}</p>
                </div>
                {i < 2 && <div className="h-8 w-px bg-white/8" />}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: code editor */}
        <CodeEditor />
      </div>
    </section>
  );
}
