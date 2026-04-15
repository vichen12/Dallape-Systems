"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu, Zap, MapPin } from "lucide-react";
import { siteContent } from "@/data/siteContent";

const Hero = () => {
  const { hero } = siteContent;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 w-full text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-electric-indigo/25 bg-electric-indigo/5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full animate-ping opacity-60 bg-emerald-neon" />
              <span className="relative rounded-full h-2 w-2 bg-emerald-neon" />
            </span>
            <span className="text-xs font-mono text-ghost-white/80 tracking-wide">
              {hero.eyebrow}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
              <MapPin size={10} />
              Mendoza, AR
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-[clamp(3.5rem,12vw,8.5rem)] font-black tracking-tighter leading-[0.92]">
            <span className="block text-ghost-white">Dallapé</span>
            <span className="block mt-2 gradient-text pb-3">Systems</span>
          </h1>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 mb-14 overflow-visible"
        >
          <div className="h-[1.5px] w-16 bg-gradient-to-r from-transparent to-electric-indigo/50 flex-shrink-0" />
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-slate-500 pr-[0.4em] py-1">
            Fullstack · IA · Automatización
          </span>
          <div className="h-[1.5px] w-16 bg-gradient-to-l from-transparent to-electric-indigo/50 flex-shrink-0" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Transformando{" "}
          <span className="text-ghost-white font-medium">ideas complejas</span>{" "}
          en{" "}
          <span className="text-electric-indigo font-medium">sistemas que funcionan</span>
          . Desarrollo web, apps y automatizaciones con IA.
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-8 sm:gap-14 mb-14"
        >
          {hero.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-black gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.28em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-9 py-4 rounded-2xl bg-electric-indigo text-white font-bold text-[15px] overflow-hidden shadow-glow-indigo hover:shadow-glow-indigo-hover transition-all"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              <Cpu size={17} className="group-hover:rotate-12 transition-transform duration-300" />
              {hero.cta.primary}
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </motion.a>

          <motion.a
            href="#servicios"
            whileHover={{ scale: 1.03, borderColor: "rgba(99,102,241,0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="group px-9 py-4 rounded-2xl border border-white/10 text-ghost-white font-medium text-[15px] transition-all hover:bg-white/5"
          >
            <span className="flex items-center gap-2.5">
              <Zap size={17} className="text-emerald-neon" />
              {hero.cta.secondary}
            </span>
          </motion.a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-electric-indigo/60" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
