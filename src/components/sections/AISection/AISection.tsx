"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
}

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
    desc: "Sistema ERP a medida para empresa de logística. Módulos de rutas, choferes, facturación y seguimiento. Privado.",
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
  "¿Qué proyectos hiciste?",
  "¿Con qué tecnologías trabajás?",
  "¿Cuánto cuesta un sitio web?",
  "¿Hacés automatizaciones con IA?",
];

// ─── Typewriter ───────────────────────────────────────────────────────────────
function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const clean = useMemo(
    () => text.replace(/PROJECTS_JSON:\[.*?\]/gs, "").trim(),
    [text],
  );

  useEffect(() => {
    setDisplayed("");
    setIdx(0);
  }, [clean]);
  useEffect(() => {
    if (idx >= clean.length) return;
    const delay = clean[idx] === "." || clean[idx] === "," ? 55 : 14;
    const t = setTimeout(() => {
      setDisplayed((p) => p + clean[idx]);
      setIdx((i) => i + 1);
    }, delay);
    return () => clearTimeout(t);
  }, [idx, clean]);

  return (
    <span>
      {displayed}
      {idx < clean.length && (
        <motion.span
          className="inline-block w-[2px] h-[13px] ml-[2px] align-middle rounded-sm"
          style={{ background: "#6366F1" }}
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.4, repeat: Infinity }}
        />
      )}
    </span>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <motion.a
      href={p.url || undefined}
      target={p.url ? "_blank" : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex items-start gap-3 rounded-xl p-3 overflow-hidden block"
      style={{
        background: "rgba(6,10,22,0.6)",
        border: `1px solid ${p.color}18`,
        backdropFilter: "blur(12px)",
        cursor: p.url ? "pointer" : "default",
        textDecoration: "none",
      }}
      whileHover={
        p.url
          ? {
              borderColor: `${p.color}45`,
              y: -1,
              transition: { duration: 0.15 },
            }
          : {}
      }
    >
      <div
        className="absolute top-0 left-5 right-5 h-px"
        style={{
          background: `linear-gradient(90deg,transparent,${p.color}55,transparent)`,
        }}
      />

      <div
        className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
        style={{ background: `${p.color}12`, border: `1px solid ${p.color}22` }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: p.color, boxShadow: `0 0 5px ${p.color}` }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <p
            className="text-xs font-semibold truncate"
            style={{ color: "#F8FAFC" }}
          >
            {p.title}
          </p>
          {p.url && (
            <svg
              className="w-2.5 h-2.5 flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity"
              style={{ color: p.color }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          )}
        </div>
        <p
          className="text-[11px] leading-relaxed mb-1.5"
          style={{ color: "rgba(248,250,252,0.38)" }}
        >
          {p.desc}
        </p>
        <div className="flex flex-wrap gap-1">
          {p.tags.map((t) => (
            <span
              key={t}
              className="text-[9px] px-1.5 py-0.5 rounded-full font-mono"
              style={{
                background: `${p.color}10`,
                color: `${p.color}99`,
                border: `1px solid ${p.color}18`,
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

// ─── AI Avatar ────────────────────────────────────────────────────────────────
function AIAvatar({ pulse }: { pulse: boolean }) {
  return (
    <div className="relative w-7 h-7 flex-shrink-0 mt-0.5">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
          boxShadow: pulse
            ? "0 0 18px rgba(99,102,241,0.8)"
            : "0 0 8px rgba(99,102,241,0.3)",
          transition: "box-shadow 0.3s",
        }}
      >
        <svg
          className="w-3.5 h-3.5 text-white"
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
      {pulse && (
        <span
          className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
          style={{ background: "#10B981" }}
        >
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-75"
            style={{ background: "#10B981" }}
          />
        </span>
      )}
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-1 py-0.5">
      {[0, 1, 2].map((d) => (
        <motion.span
          key={d}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#6366F1" }}
          animate={{ y: [0, -4, 0], opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 0.7, delay: d * 0.14, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AISection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hola, soy el asistente de Dallape Systems. Preguntame sobre proyectos, tecnologías, precios o disponibilidad.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".ai-fade"),
      { y: 48, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      },
    );
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
      const userMsg: Message = { role: "user", content };
      const history = [...messages, userMsg];
      setMessages(history);
      setLoading(true);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "", projects: [] },
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
            } catch {}
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
            content: "Hubo un error al conectar. Intentá de nuevo.",
          };
          return c;
        });
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages, extractProjects],
  );

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-8"
    >
      {/* Glow orbs que complementan el mesh-gradient global */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-0 w-[min(480px,60vw)] h-[min(480px,60vw)] rounded-full -translate-x-1/3"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-[min(400px,55vw)] h-[min(400px,55vw)] rounded-full translate-x-1/3"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* ── Header ── */}
        <div className="text-center mb-14 ai-fade">
          <motion.div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-7"
            style={{
              background: "rgba(99,102,241,0.06)",
              border: "1px solid rgba(99,102,241,0.14)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-60"
                style={{ background: "#6366F1" }}
              />
              <span
                className="relative rounded-full h-1.5 w-1.5"
                style={{ background: "#6366F1" }}
              />
            </span>
            <span
              className="text-[10px] font-mono tracking-[0.3em] uppercase"
              style={{ color: "#6366F1" }}
            >
              Asistente IA · en vivo
            </span>
          </motion.div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.04] tracking-tight mb-5"
            style={{ color: "#F8FAFC" }}
          >
            Preguntá lo que <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #6366F1 0%, #8B5CF6 45%, #10B981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              quieras saber.
            </span>
          </h2>

          <p
            className="text-[13px] max-w-[280px] mx-auto leading-relaxed"
            style={{ color: "rgba(248,250,252,0.35)" }}
          >
            Proyectos, tecnologías, precios y disponibilidad — respuesta
            inmediata.
          </p>
        </div>

        {/* ── Chat Window ── */}
        <div className="ai-fade">
          {/* Glow exterior del chat */}
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(99,102,241,0.3),transparent)",
            }}
          />

          <div
            className="rounded-2xl overflow-hidden relative"
            style={{
              background:
                "linear-gradient(160deg, rgba(10,16,35,0.75) 0%, rgba(5,9,20,0.85) 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(48px)",
              boxShadow:
                "0 0 0 1px rgba(99,102,241,0.07), " +
                "0 4px 6px rgba(0,0,0,0.3), " +
                "0 24px 80px rgba(0,0,0,0.55), " +
                "inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* ── Chrome bar ── */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{
                borderColor: "rgba(255,255,255,0.05)",
                background: "rgba(3,6,16,0.6)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {["#FF5F57", "#FFBD2E", "#28C840"].map((c) => (
                    <div
                      key={c}
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: c, opacity: 0.65 }}
                    />
                  ))}
                </div>
                <div
                  className="h-3.5 w-px"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <svg
                    className="w-2.5 h-2.5"
                    style={{ color: "#10B981" }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span
                    className="text-[10px] font-mono"
                    style={{ color: "rgba(248,250,252,0.2)" }}
                  >
                    dallape.systems/ia
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#10B981" }}
                  animate={{
                    opacity: loading ? [1, 0.2, 1] : 1,
                    scale: loading ? [1, 1.3, 1] : 1,
                  }}
                  transition={{ duration: 0.9, repeat: loading ? Infinity : 0 }}
                />
                <span
                  className="text-[9px] font-mono tracking-wider"
                  style={{ color: "rgba(248,250,252,0.18)" }}
                >
                  {loading ? "ESCRIBIENDO" : "EN LÍNEA"}
                </span>
              </div>
            </div>

            {/* ── Messages ── */}
            <div
              ref={chatRef}
              className="px-5 py-5 space-y-5 overflow-y-auto"
              style={{
                maxHeight: 420,
                minHeight: 160,
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(99,102,241,0.12) transparent",
              }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {msg.role === "assistant" ? (
                      <AIAvatar pulse={loading && i === messages.length - 1} />
                    ) : (
                      <div
                        className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))",
                          color: "rgba(99,102,241,0.9)",
                          border: "1px solid rgba(99,102,241,0.18)",
                        }}
                      >
                        V
                      </div>
                    )}

                    <div
                      className={`max-w-[78%] flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className="rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed"
                        style={
                          msg.role === "user"
                            ? {
                                background:
                                  "linear-gradient(135deg, #5355E8, #6D28D9)",
                                color: "#F8FAFC",
                                borderBottomRightRadius: 5,
                                boxShadow:
                                  "0 2px 20px rgba(83,85,232,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
                              }
                            : {
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                color: "rgba(248,250,252,0.82)",
                                borderBottomLeftRadius: 5,
                              }
                        }
                      >
                        {msg.role === "assistant" ? (
                          msg.content === "" && loading ? (
                            <TypingDots />
                          ) : i === messages.length - 1 && loading ? (
                            <TypewriterText text={msg.content} />
                          ) : (
                            msg.content
                              .replace(/PROJECTS_JSON:\[.*?\]/gs, "")
                              .trim()
                          )
                        ) : (
                          msg.content
                        )}
                      </div>

                      {msg.role === "assistant" &&
                        msg.projects &&
                        msg.projects.length > 0 && (
                          <div className="w-full space-y-1.5">
                            {msg.projects.map((p, pi) => (
                              <ProjectCard key={p.id} p={p} i={pi} />
                            ))}
                          </div>
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
                  transition={{ duration: 0.25 }}
                  className="px-5 pb-3 flex flex-wrap gap-1.5"
                >
                  {SUGGESTIONS.map((s, i) => (
                    <motion.button
                      key={s}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.06 }}
                      onClick={() => sendMessage(s)}
                      className="text-[11px] px-3 py-1.5 rounded-lg transition-all duration-150 font-medium"
                      style={{
                        background: "rgba(99,102,241,0.07)",
                        border: "1px solid rgba(99,102,241,0.13)",
                        color: "rgba(248,250,252,0.42)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.background = "rgba(99,102,241,0.14)";
                        el.style.color = "rgba(248,250,252,0.9)";
                        el.style.borderColor = "rgba(99,102,241,0.32)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.background = "rgba(99,102,241,0.07)";
                        el.style.color = "rgba(248,250,252,0.42)";
                        el.style.borderColor = "rgba(99,102,241,0.13)";
                      }}
                    >
                      {s}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Divider ── */}
            <div
              className="mx-5"
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)",
              }}
            />

            {/* ── Input ── */}
            <div className="p-4">
              <motion.div
                className="flex items-end gap-2.5 rounded-xl px-3.5 py-2.5"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                whileFocusWithin={{
                  borderColor: "rgba(99,102,241,0.3)",
                  boxShadow:
                    "0 0 0 3px rgba(99,102,241,0.06), 0 0 20px rgba(99,102,241,0.05)",
                }}
                transition={{ duration: 0.15 }}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  placeholder="Escribí tu consulta..."
                  rows={1}
                  disabled={loading}
                  className="flex-1 bg-transparent resize-none outline-none text-[13px] leading-relaxed"
                  style={{
                    color: "#F8FAFC",
                    maxHeight: 100,
                    caretColor: "#6366F1",
                  }}
                />
                <motion.button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  whileHover={input.trim() && !loading ? { scale: 1.07 } : {}}
                  whileTap={input.trim() && !loading ? { scale: 0.93 } : {}}
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background:
                      input.trim() && !loading
                        ? "linear-gradient(135deg,#5355E8,#6D28D9)"
                        : "rgba(255,255,255,0.04)",
                    boxShadow:
                      input.trim() && !loading
                        ? "0 0 20px rgba(83,85,232,0.5)"
                        : "none",
                    transition: "all 0.2s",
                  }}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={
                      input.trim() && !loading
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
                </motion.button>
              </motion.div>

              <p
                className="text-center text-[9px] font-mono mt-2.5 tracking-wider"
                style={{ color: "rgba(248,250,252,0.12)" }}
              >
                GROQ · LLAMA 3.3 70B · TIEMPO REAL
              </p>
            </div>
          </div>
        </div>

        {/* ── Trust strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 flex flex-wrap justify-center items-center gap-8"
        >
          {[
            "Respuesta inmediata",
            "Sin formularios",
            "Directo con Vincenzo",
          ].map((t) => (
            <span
              key={t}
              className="flex items-center gap-1.5 text-[11px]"
              style={{ color: "rgba(248,250,252,0.22)" }}
            >
              <span style={{ color: "#10B981" }}>✓</span>
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
