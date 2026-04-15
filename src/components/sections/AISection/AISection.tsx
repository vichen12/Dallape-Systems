"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════════ */
interface Project {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  color: string;
  url?: string | null;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  projects?: Project[];
  timestamp?: number;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════ */
const ALL_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Optexa — Automatización Industrial",
    desc: "Plataforma web para empresa de robótica e ingeniería de automatización. Sistemas ASRS, gestión de stock y robots industriales.",
    tags: ["Next.js", "TypeScript", "Vercel"],
    color: "#6366F1",
    url: "https://optexa1.vercel.app",
  },
  {
    id: "2",
    title: "Rutas del Sur — Logística Internacional",
    desc: "Sitio para empresa de transporte de carga de alto porte Argentina–Chile. Diseño profesional y presencia digital completa.",
    tags: ["Next.js", "Tailwind", "SEO"],
    color: "#10B981",
    url: "https://rutasdelsur.com.ar",
  },
  {
    id: "3",
    title: "ERP de Transporte de Carga",
    desc: "Sistema ERP a medida para empresa de logística. Módulos de rutas, choferes, facturación y seguimiento.",
    tags: ["React", "Node.js", "PostgreSQL"],
    color: "#F59E0B",
    url: null,
  },
  {
    id: "4",
    title: "E-Commerce de Zapatillas",
    desc: "Tienda online con carrito, pagos, panel de admin y gestión de stock en tiempo real.",
    tags: ["Next.js", "Stripe", "Tailwind"],
    color: "#EC4899",
    url: null,
  },
  {
    id: "5",
    title: "Automatización de Procesos",
    desc: "Pipeline para empresa de logística. Procesamiento automático de órdenes y reportes sin intervención humana.",
    tags: ["n8n", "Python", "APIs"],
    color: "#8B5CF6",
    url: null,
  },
  {
    id: "6",
    title: "Proyecto Internacional (NDA)",
    desc: "Desarrollo fullstack para empresa internacional. Detalles bajo confidencialidad. Stack moderno, entrega remota.",
    tags: ["Next.js", "TypeScript", "Cloud"],
    color: "#06B6D4",
    url: null,
  },
];

const SUGGESTIONS = [
  { text: "¿Qué proyectos hiciste?", icon: "01" },
  { text: "¿Con qué tecnologías trabajás?", icon: "02" },
  { text: "¿Cuánto cuesta un sitio web?", icon: "03" },
  { text: "¿Hacés automatizaciones con IA?", icon: "04" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   UTILS
   ═══════════════════════════════════════════════════════════════════════ */
function stripProjectsJson(text: string): string {
  return text
    .replace(/PROJECTS_JSON:\[[\s\S]*?\]/g, "")
    .replace(/PROJECTS_JSON:[\s\S]*/g, "")
    .trim();
}

function formatTime(ts?: number): string {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
}

/* ═══════════════════════════════════════════════════════════════════════════
   MARKDOWN RENDERER — Enhanced
   ═══════════════════════════════════════════════════════════════════════ */
function renderBotText(text: string): React.ReactNode {
  const processInline = (str: string): React.ReactNode[] => {
    // Handle **bold**, links, and inline code
    const parts = str.split(/(\*\*[^*]+\*\*|`[^`]+`|https?:\/\/[^\s]+)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold" style={{ color: "#F8FAFC" }}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded text-[12px] font-mono"
            style={{
              background: "rgba(99,102,241,0.12)",
              color: "#A5B4FC",
              border: "1px solid rgba(99,102,241,0.15)",
            }}
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.match(/^https?:\/\/[^\s]+$/)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 decoration-1 transition-colors duration-150"
            style={{ color: "#818CF8", textDecorationColor: "rgba(129,140,248,0.4)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#A5B4FC";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#818CF8";
            }}
          >
            {part.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => {
        const bullet = line.match(/^[-•]\s(.+)/);
        if (bullet) {
          return (
            <span
              key={i}
              className="flex gap-2.5 mt-1.5 items-start"
            >
              <span
                className="w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                  boxShadow: "0 0 6px rgba(99,102,241,0.5)",
                }}
              />
              <span className="flex-1">{processInline(bullet[1])}</span>
            </span>
          );
        }
        return (
          <span key={i}>
            {processInline(line)}
            {i < lines.length - 1 && line.trim() && <br />}
          </span>
        );
      })}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TYPEWRITER — Smoother, faster
   ═══════════════════════════════════════════════════════════════════════ */
function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const clean = useMemo(() => stripProjectsJson(text), [text]);

  useEffect(() => {
    setDisplayed("");
    setIdx(0);
  }, [clean]);

  useEffect(() => {
    if (idx >= clean.length) return;
    const char = clean[idx];
    const delay = char === "." || char === "," || char === ":" ? 40 : char === " " ? 8 : 12;
    const t = setTimeout(() => {
      setDisplayed((p) => p + clean[idx]);
      setIdx((i) => i + 1);
    }, delay);
    return () => clearTimeout(t);
  }, [idx, clean]);

  return (
    <span>
      {renderBotText(displayed)}
      {idx < clean.length && (
        <motion.span
          className="inline-block w-[2px] h-[15px] ml-[2px] align-middle rounded-full"
          style={{
            background: "linear-gradient(180deg, #6366F1, #8B5CF6)",
            boxShadow: "0 0 8px rgba(99,102,241,0.6)",
          }}
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECT CARD — Premium Design
   ═══════════════════════════════════════════════════════════════════════ */
function ProjectCard({ p, i }: { p: Project; i: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const gradientX = useTransform(mouseX, (v) => `${v}px`);
  const gradientY = useTransform(mouseY, (v) => `${v}px`);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.a
      ref={cardRef}
      href={p.url || undefined}
      target={p.url ? "_blank" : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      className="group relative flex items-start gap-3.5 rounded-2xl p-4 overflow-hidden block"
      style={{
        background: "rgba(6,10,22,0.7)",
        border: `1px solid ${p.color}20`,
        backdropFilter: "blur(16px)",
        cursor: p.url ? "pointer" : "default",
        textDecoration: "none",
      }}
      whileHover={
        p.url
          ? {
              borderColor: `${p.color}50`,
              y: -2,
              transition: { duration: 0.2 },
            }
          : {}
      }
    >
      {/* Hover spotlight */}
      {p.url && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(300px circle at ${gradientX.get()}px ${gradientY.get()}px, ${p.color}12, transparent 60%)`,
          }}
        />
      )}

      {/* Top glow line */}
      <div
        className="absolute top-0 left-6 right-6 h-px"
        style={{
          background: `linear-gradient(90deg,transparent,${p.color}40,transparent)`,
        }}
      />

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5 relative"
        style={{
          background: `${p.color}10`,
          border: `1px solid ${p.color}25`,
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: p.color,
            boxShadow: `0 0 10px ${p.color}80, 0 0 20px ${p.color}40`,
          }}
        />
        {/* Animated ring */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            border: `1px solid ${p.color}40`,
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p
            className="text-[13px] font-bold truncate tracking-tight"
            style={{ color: "#F8FAFC" }}
          >
            {p.title}
          </p>
          {p.url && (
            <motion.svg
              className="w-3 h-3 flex-shrink-0"
              style={{ color: p.color }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              initial={{ opacity: 0.3, x: -2 }}
              whileHover={{ opacity: 1, x: 0 }}
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </motion.svg>
          )}
        </div>
        <p
          className="text-[11px] leading-[1.6] mb-2"
          style={{ color: "rgba(248,250,252,0.45)" }}
        >
          {p.desc}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span
              key={t}
              className="text-[9px] px-2 py-0.5 rounded-full font-mono tracking-wide uppercase"
              style={{
                background: `${p.color}12`,
                color: `${p.color}`,
                border: `1px solid ${p.color}20`,
                opacity: 0.8,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   AI AVATAR — Animated with pulse rings
   ═══════════════════════════════════════════════════════════════════════ */
function AIAvatar({ pulse }: { pulse: boolean }) {
  return (
    <div className="relative w-8 h-8 flex-shrink-0 mt-0.5">
      {/* Pulse rings */}
      {pulse && (
        <>
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{ border: "1px solid rgba(99,102,241,0.3)" }}
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{ border: "1px solid rgba(99,102,241,0.2)" }}
            animate={{ scale: [1, 2], opacity: [0.3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
          />
        </>
      )}
      <div
        className="relative w-8 h-8 rounded-xl flex items-center justify-center z-10"
        style={{
          background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
          boxShadow: pulse
            ? "0 0 24px rgba(99,102,241,0.6), inset 0 1px 0 rgba(255,255,255,0.15)"
            : "0 0 12px rgba(99,102,241,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        <svg
          className="w-4 h-4 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.72V7h1a7 7 0 0 1 7 7H3a7 7 0 0 1 7-7h1V5.72c-.6-.34-1-.98-1-1.72a2 2 0 0 1 2-2z" />
          <path d="M7 14v1a5 5 0 0 0 10 0v-1" />
          <line x1="9" y1="19" x2="9" y2="21" />
          <line x1="15" y1="19" x2="15" y2="21" />
        </svg>
      </div>
      {/* Status dot */}
      <span
        className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full z-20 border-2"
        style={{
          background: pulse ? "#10B981" : "#6366F1",
          borderColor: "rgba(3,7,18,0.9)",
          boxShadow: `0 0 6px ${pulse ? "rgba(16,185,129,0.6)" : "rgba(99,102,241,0.4)"}`,
          transition: "all 0.3s ease",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TYPING INDICATOR — Waveform style
   ═══════════════════════════════════════════════════════════════════════ */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-[3px] items-end h-4">
        {[0, 1, 2, 3, 4].map((d) => (
          <motion.span
            key={d}
            className="w-[3px] rounded-full"
            style={{ background: "linear-gradient(180deg, #6366F1, #8B5CF6)" }}
            animate={{
              height: ["6px", "16px", "6px"],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.8,
              delay: d * 0.08,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <span
        className="text-[11px] font-mono tracking-wider"
        style={{ color: "rgba(99,102,241,0.6)" }}
      >
        pensando...
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FLOATING PARTICLES — Ambient background
   ═══════════════════════════════════════════════════════════════════════ */
// Seed-based pseudo-random to ensure SSR/client consistency
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function FloatingParticles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: seededRandom(i * 7) * 100,
        y: seededRandom(i * 13) * 100,
        size: seededRandom(i * 3) * 2 + 1,
        duration: seededRandom(i * 11) * 15 + 20,
        delay: seededRandom(i * 17) * 5,
        drift: (seededRandom(i * 19) * 40 - 20),
      })),
    []
  );

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.id % 3 === 0 ? "#6366F1" : p.id % 3 === 1 ? "#8B5CF6" : "#10B981",
            opacity: 0.15,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, p.drift, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
export default function AISection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hola, soy el asistente de Dallape Solutions — el estudio de desarrollo de Vincenzo. Podés preguntarme sobre proyectos anteriores, las tecnologías que usamos, costos, tiempos de entrega, automatizaciones, o lo que necesites. Estoy acá para ayudarte.",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // GSAP entrance
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ai-fade",
        { y: 60, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const extractProjects = useCallback((text: string): Project[] => {
    const match = text.match(/PROJECTS_JSON:(\[.*?\])/s);
    if (!match) return [];
    try {
      const ids: { id: string }[] = JSON.parse(match[1]);
      return ids
        .map((item) => ALL_PROJECTS.find((p) => p.id === item.id))
        .filter(Boolean) as Project[];
    } catch {
      return [];
    }
  }, []);

  const sendMessage = useCallback(
    async (text?: string) => {
      const content = (text || input).trim();
      if (!content || loading) return;
      setInput("");
      setStarted(true);

      const userMsg: Message = { role: "user", content, timestamp: Date.now() };
      const history = [...messages, userMsg];
      setMessages(history);
      setLoading(true);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "", projects: [], timestamp: Date.now() },
      ]);

      try {
        const res = await fetch("/api/ai-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });
        const reader = res.body!.getReader();
        const dec = new TextDecoder();
        let full = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const lines = dec
            .decode(value)
            .split("\n")
            .filter((l) => l.startsWith("data: "));
          for (const line of lines) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.error) throw new Error(parsed.error);
              full += parsed.text || "";
              setMessages((m) => {
                const c = [...m];
                c[c.length - 1] = { ...c[c.length - 1], content: full };
                return c;
              });
            } catch {
              /* skip */
            }
          }
        }
        const projects = extractProjects(full);
        setMessages((m) => {
          const c = [...m];
          c[c.length - 1] = { ...c[c.length - 1], content: full, projects };
          return c;
        });
      } catch {
        setMessages((m) => {
          const c = [...m];
          c[c.length - 1] = {
            ...c[c.length - 1],
            content: "Hubo un error al conectar con el servidor. Intentá de nuevo en unos segundos.",
          };
          return c;
        });
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages, extractProjects]
  );

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const charCount = input.length;

  return (
    <section
      ref={sectionRef}
      className="relative py-28 sm:py-40 px-4 sm:px-6 lg:px-8"
    >
      {/* ── Ambient layers ── */}
      <FloatingParticles />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-0 w-[min(550px,70vw)] h-[min(550px,70vw)] rounded-full -translate-x-1/3"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-[min(450px,60vw)] h-[min(450px,60vw)] rounded-full translate-x-1/3"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[min(300px,40vw)] h-[min(300px,40vw)] rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* ══════════ Header ══════════ */}
        <div className="mb-16 ai-fade">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            {/* Left */}
            <div>
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6"
                style={{
                  background: "rgba(16,185,129,0.06)",
                  border: "1px solid rgba(16,185,129,0.15)",
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full animate-ping opacity-60" style={{ background: "#10B981" }} />
                  <span className="relative rounded-full h-1.5 w-1.5" style={{ background: "#10B981", boxShadow: "0 0 6px rgba(16,185,129,0.6)" }} />
                </span>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: "rgba(16,185,129,0.7)" }}>
                  Asistente IA · en vivo
                </span>
              </div>

              {/* Title */}
              <h2
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.06] tracking-[-0.02em] mb-4"
                style={{ color: "#F8FAFC" }}
              >
                Preguntá lo que{" "}
                <br className="hidden sm:block" />
                <span
                  className="relative"
                  style={{
                    background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 40%, #10B981 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  quieras saber.
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: "linear-gradient(90deg, #6366F1, #8B5CF6, #10B981)", opacity: 0.35 }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </span>
          </h2>

          <p
            className="text-[14px] sm:text-[15px] max-w-sm leading-[1.75] mt-4"
            style={{ color: "rgba(248,250,252,0.35)" }}
          >
            Proyectos, tecnologías, costos, automatizaciones — respuesta inmediata, sin formularios.
          </p>
        </div>

        {/* Right: info cards */}
        <div className="hidden lg:flex flex-col gap-3 flex-shrink-0 max-w-[220px]">
          {[
            { icon: "01", label: "Proyectos reales" },
            { icon: "02", label: "Stack técnico" },
            { icon: "03", label: "Costos y tiempos" },
            { icon: "04", label: "IA & Automatización" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
              style={{
                background: "rgba(99,102,241,0.05)",
                border: "1px solid rgba(99,102,241,0.1)",
              }}
            >
              <span className="text-sm">{item.icon}</span>
              <span className="text-xs text-slate-400 font-medium">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
        </div>

        {/* ══════════ Chat Window ══════════ */}
        <div className="ai-fade">
          <div
            className="rounded-[20px] overflow-hidden relative"
            style={{
              background:
                "linear-gradient(165deg, rgba(10,16,35,0.8) 0%, rgba(5,9,20,0.9) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(48px)",
              boxShadow:
                "0 0 0 1px rgba(99,102,241,0.06), " +
                "0 4px 8px rgba(0,0,0,0.2), " +
                "0 12px 40px rgba(0,0,0,0.4), " +
                "0 40px 100px rgba(0,0,0,0.5), " +
                "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* ── Product header bar ── */}
            <div
              className="flex items-center justify-between px-5 py-3.5 border-b"
              style={{
                borderColor: "rgba(255,255,255,0.05)",
                background: "rgba(3,7,18,0.8)",
              }}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                    boxShadow: "0 0 12px rgba(99,102,241,0.3)",
                  }}
                >
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.72V7h1a7 7 0 0 1 7 7H3a7 7 0 0 1 7-7h1V5.72c-.6-.34-1-.98-1-1.72a2 2 0 0 1 2-2z" />
                    <path d="M7 14v1a5 5 0 0 0 10 0v-1" />
                    <line x1="9" y1="19" x2="9" y2="21" />
                    <line x1="15" y1="19" x2="15" y2="21" />
                  </svg>
                </div>
                <div>
                  <p className="text-[12px] font-bold text-ghost-white leading-none mb-0.5">Dallape AI</p>
                  <p className="text-[9px] font-mono text-slate-600 leading-none">Asistente del Estudio · llama-3.3-70b</p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: loading ? "#F59E0B" : "#10B981" }}
                  animate={loading ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
                  transition={{ duration: 0.8, repeat: loading ? Infinity : 0 }}
                />
                <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: "rgba(248,250,252,0.2)" }}>
                  {loading ? "procesando" : "en línea"}
                </span>
              </div>
            </div>

            {/* ── Messages ── */}
            <div
              ref={chatRef}
              className="px-5 sm:px-6 py-6 space-y-6 overflow-y-auto"
              style={{
                maxHeight: 580,
                minHeight: 240,
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(99,102,241,0.15) transparent",
              }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {msg.role === "assistant" ? (
                      <AIAvatar pulse={loading && i === messages.length - 1} />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-[11px] font-bold mt-0.5"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(139,92,246,0.18))",
                          color: "rgba(129,140,248,0.9)",
                          border: "1px solid rgba(99,102,241,0.2)",
                        }}
                      >
                        V
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] flex flex-col gap-2.5 ${msg.role === "user" ? "items-end" : "items-start"}`}
                    >
                      {/* Timestamp */}
                      {msg.timestamp && (
                        <span
                          className="text-[9px] font-mono px-1"
                          style={{ color: "rgba(248,250,252,0.15)" }}
                        >
                          {formatTime(msg.timestamp)}
                        </span>
                      )}

                      {/* Bubble */}
                      <div
                        className="rounded-2xl px-4 py-3.5 text-[14px] leading-[1.75] relative"
                        style={
                          msg.role === "user"
                            ? {
                                background:
                                  "linear-gradient(135deg, #4F46E5 0%, #6D28D9 100%)",
                                color: "#F8FAFC",
                                borderBottomRightRadius: 6,
                                boxShadow:
                                  "0 2px 24px rgba(79,70,229,0.3), inset 0 1px 0 rgba(255,255,255,0.12)",
                              }
                            : {
                                background: "rgba(255,255,255,0.035)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                color: "rgba(248,250,252,0.8)",
                                borderBottomLeftRadius: 6,
                              }
                        }
                      >
                        {msg.role === "assistant" ? (
                          msg.content === "" && loading ? (
                            <TypingIndicator />
                          ) : i === messages.length - 1 && loading ? (
                            <TypewriterText text={msg.content} />
                          ) : (
                            renderBotText(stripProjectsJson(msg.content))
                          )
                        ) : (
                          msg.content
                        )}
                      </div>

                      {/* Project cards */}
                      {msg.role === "assistant" &&
                        msg.projects &&
                        msg.projects.length > 0 && (
                          <motion.div
                            className="w-full space-y-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {msg.projects.map((p, pi) => (
                              <ProjectCard key={p.id} p={p} i={pi} />
                            ))}
                          </motion.div>
                        )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* ── Suggestions ── */}
            <AnimatePresence>
              {!started && (
                <motion.div
                  exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                  transition={{ duration: 0.3 }}
                  className="px-5 sm:px-6 pb-5"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {SUGGESTIONS.map((s, i) => (
                      <motion.button
                        key={s.text}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        onClick={() => sendMessage(s.text)}
                        className="text-left text-[12px] px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center gap-2.5 group"
                        style={{
                          background: "rgba(99,102,241,0.06)",
                          border: "1px solid rgba(99,102,241,0.12)",
                          color: "rgba(248,250,252,0.55)",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.background = "rgba(99,102,241,0.14)";
                          el.style.color = "rgba(248,250,252,0.95)";
                          el.style.borderColor = "rgba(99,102,241,0.35)";
                          el.style.boxShadow = "0 0 20px rgba(99,102,241,0.08)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.background = "rgba(99,102,241,0.06)";
                          el.style.color = "rgba(248,250,252,0.55)";
                          el.style.borderColor = "rgba(99,102,241,0.12)";
                          el.style.boxShadow = "none";
                        }}
                      >
                        <span className="text-[14px]">{s.icon}</span>
                        <span>{s.text}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Divider ── */}
            <div
              className="mx-5 sm:mx-6"
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)",
              }}
            />

            {/* ── Input area ── */}
            <div className="p-4 sm:p-5">
              <div
                className="flex items-end gap-3 rounded-2xl px-4 py-3 transition-all duration-250"
                style={{
                  background: isFocused
                    ? "rgba(99,102,241,0.04)"
                    : "rgba(255,255,255,0.02)",
                  border: isFocused
                    ? "1px solid rgba(99,102,241,0.25)"
                    : "1px solid rgba(255,255,255,0.05)",
                  boxShadow: isFocused
                    ? "0 0 0 3px rgba(99,102,241,0.06), 0 0 30px rgba(99,102,241,0.04)"
                    : "none",
                }}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Escribí tu consulta..."
                  rows={1}
                  disabled={loading}
                  className="flex-1 bg-transparent resize-none outline-none text-[14px] leading-relaxed placeholder:text-[rgba(248,250,252,0.2)]"
                  style={{
                    color: "#F8FAFC",
                    maxHeight: 120,
                    caretColor: "#6366F1",
                  }}
                />

                {/* Char counter */}
                {charCount > 0 && (
                  <span
                    className="text-[9px] font-mono self-center mr-1"
                    style={{
                      color:
                        charCount > 400
                          ? "rgba(239,68,68,0.6)"
                          : "rgba(248,250,252,0.15)",
                    }}
                  >
                    {charCount}
                  </span>
                )}

                {/* Send button */}
                <motion.button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  whileHover={
                    input.trim() && !loading ? { scale: 1.08 } : {}
                  }
                  whileTap={
                    input.trim() && !loading ? { scale: 0.92 } : {}
                  }
                  className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden"
                  style={{
                    background:
                      input.trim() && !loading
                        ? "linear-gradient(135deg, #4F46E5, #7C3AED)"
                        : "rgba(255,255,255,0.04)",
                    boxShadow:
                      input.trim() && !loading
                        ? "0 0 24px rgba(79,70,229,0.4)"
                        : "none",
                    transition: "all 0.25s ease",
                  }}
                >
                  {loading ? (
                    <motion.div
                      className="w-4 h-4 rounded-full border-2"
                      style={{
                        borderColor: "rgba(255,255,255,0.15)",
                        borderTopColor: "#6366F1",
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={
                        input.trim()
                          ? "#fff"
                          : "rgba(255,255,255,0.18)"
                      }
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  )}
                </motion.button>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-3 px-1">
                <p
                  className="text-[9px] font-mono tracking-[0.2em] uppercase"
                  style={{ color: "rgba(248,250,252,0.1)" }}
                >
                  Groq · Llama 3.3 70B · Tiempo real
                </p>
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{ background: "rgba(99,102,241,0.3)" }}
                  />
                  <span
                    className="text-[9px] font-mono"
                    style={{ color: "rgba(248,250,252,0.1)" }}
                  >
                    {messages.length - 1} msg
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Trust strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-10 flex flex-wrap justify-center items-center gap-8 sm:gap-10"
        >
          {[
            { text: "Respuesta inmediata", icon: "—" },
            { text: "Sin formularios", icon: "—" },
            { text: "Directo con Vincenzo", icon: "—" },
          ].map((t) => (
            <span
              key={t.text}
              className="flex items-center gap-2 text-[11px] tracking-wide"
              style={{ color: "rgba(248,250,252,0.2)" }}
            >
              <span style={{ color: "#10B981", fontSize: "10px" }}>{t.icon}</span>
              {t.text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}