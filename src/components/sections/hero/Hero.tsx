"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Cpu, Zap, ChevronDown } from "lucide-react";
import { siteContent } from "@/data/siteContent";

const Hero = () => {
  const { hero } = siteContent;
  const [particles, setParticles] = useState<
    Array<{
      x: number;
      y: number;
      duration: number;
      delay: number;
      yAnim: number;
    }>
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        x: Math.random() * 1200,
        y: Math.random() * 800,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
        yAnim: Math.random() * -200,
      })),
    );
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* PARTÍCULAS FLOTANTES (EFECTO AMBIENTE) */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            initial={{ x: p.x, y: p.y, opacity: 0 }}
            animate={{ y: [null, p.yAnim], opacity: [0, 0.6, 0] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
            className="absolute w-1 h-1 bg-electric-indigo rounded-full"
          />
        ))}
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="text-center space-y-12">
          {/* BADGE SUPERIOR */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-electric-indigo/30 bg-obsidian-slate/40 backdrop-blur-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-electric-indigo/0 via-electric-indigo/10 to-electric-indigo/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <Terminal className="w-4 h-4 text-electric-indigo" />
              <span className="relative text-sm font-mono font-medium text-ghost-white/90 italic">
                {hero.eyebrow}
              </span>
              <div className="w-2 h-2 bg-emerald-neon rounded-full animate-pulse shadow-[0_0_8px_#10B981]" />
            </div>
          </motion.div>

          {/* TÍTULO PRINCIPAL CON EFECTO GLITCH */}
          <motion.div variants={itemVariants} className="relative">
            <h1 className="text-[clamp(3.5rem,14vw,9rem)] font-black leading-[0.8] tracking-tighter">
              <span className="block relative">
                <span className="relative inline-block text-ghost-white">
                  Dallapé
                  {/* Capas de glitch cromático */}
                  <span className="absolute top-0 left-0 text-electric-indigo opacity-70 mix-blend-screen animate-glitch-1 select-none">
                    Dallapé
                  </span>
                  <span className="absolute top-0 left-0 text-emerald-neon opacity-70 mix-blend-screen animate-glitch-2 select-none">
                    Dallapé
                  </span>
                </span>
              </span>

              <span className="block mt-4 bg-gradient-to-r from-electric-indigo via-purple-400 to-emerald-neon bg-clip-text text-transparent animate-gradient-shift">
                Systems
              </span>
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
              className="h-px w-full max-w-xl mx-auto mt-10 bg-gradient-to-r from-transparent via-electric-indigo/50 to-transparent origin-center"
            />
          </motion.div>

          {/* SUBTÍTULO DESCRIPTIVO */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light tracking-wide"
          >
            Transformando{" "}
            <span className="text-electric-indigo font-semibold">
              ideas complejas
            </span>{" "}
            en{" "}
            <span className="text-emerald-neon font-semibold">
              sistemas resilientes
            </span>
            . Ingeniería de software, IA y automatización de próxima generación.
          </motion.p>

          {/* STATS DINÁMICOS */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-10 sm:gap-16 pt-4"
          >
            {hero.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="group relative"
              >
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-black bg-gradient-to-br from-ghost-white to-slate-500 bg-clip-text text-transparent group-hover:from-electric-indigo group-hover:to-emerald-neon transition-all duration-500">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-2 font-mono uppercase tracking-[0.3em]">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* BOTONES CTA - DIRECCIONES CORREGIDAS */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            {/* Botón Principal → ID Contacto (Formulario) */}
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 rounded-2xl bg-electric-indigo text-white font-black text-lg overflow-hidden shadow-glow-indigo hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Cpu
                  size={20}
                  className="group-hover:rotate-12 transition-transform"
                />
                {hero.cta.primary}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.a>

            {/* Botón Secundario → ID Servicios */}
            <motion.a
              href="#servicios"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group px-10 py-5 rounded-2xl border-2 border-white/10 text-ghost-white font-bold text-lg backdrop-blur-sm transition-all hover:border-electric-indigo/50"
            >
              <span className="flex items-center gap-3">
                <Zap
                  size={20}
                  className="text-emerald-neon group-hover:animate-pulse"
                />
                {hero.cta.secondary}
              </span>
            </motion.a>
          </motion.div>

          {/* INDICADOR DE SCROLL ANIMADO */}
      
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
