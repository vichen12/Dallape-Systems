// src/app/api/ai-chat/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// CÓMO ENTRENAR LA IA — GUÍA COMPLETA
// ─────────────────────────────────────────────────────────────────────────────
//
// La IA aprende todo desde el SYSTEM_PROMPT de abajo. No hay base de datos,
// no hay fine-tuning, no hay magia. Solo texto bien estructurado.
//
// PARA AGREGAR UN PROYECTO NUEVO:
//   1. Agregá un objeto al array PROJECTS_DATA con id, title, desc, tags, color, url
//   2. Describilo bien en 1-2 oraciones (qué problema resuelve, qué resultado tuvo)
//   3. Agregá la misma info al bloque "PROYECTOS" del SYSTEM_PROMPT
//   Listo. La IA ya lo conoce en el próximo deploy.
//
// PARA CAMBIAR LA PERSONALIDAD:
//   Editá la sección "PERSONALIDAD Y TONO" del SYSTEM_PROMPT.
//   Ejemplos: "siempre preguntá el rubro del cliente", "usá más humor", etc.
//
// PARA AGREGAR INFO SOBRE VOS:
//   Editá la sección "SOBRE VINCENZO" con lo que quieras que sepa.
//   Podés agregar: certificaciones, tecnologías favoritas, casos de éxito, etc.
//
// PARA CAMBIAR CÓMO MANEJA PRECIOS:
//   Editá la sección "MANEJO DE PRECIOS".
//
// PARA AGREGAR PREGUNTAS FRECUENTES:
//   Al final del SYSTEM_PROMPT agregá una sección "FAQ" con pares pregunta/respuesta.
//   Ejemplo:
//     FAQ:
//     P: ¿Hacés mantenimiento después de entregar?
//     R: Sí, ofrezco soporte post-entrega por 30 días incluido en todos los proyectos.
//
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// ─── Proyectos reales ─────────────────────────────────────────────────────────
// Este array lo usa el frontend para renderizar las cards.
// Debe estar sincronizado con el SYSTEM_PROMPT de abajo.
export const PROJECTS_DATA = [
  {
    id: "1",
    title: "Optexa — Automatización Industrial",
    desc: "Plataforma web para empresa de robótica e ingeniería de automatización. Sistemas ASRS (Automated Storage and Retrieval), gestión de stock y robots industriales.",
    tags: ["Next.js", "TypeScript", "Vercel"],
    color: "#6366F1",
    url: "https://optexa1.vercel.app",
  },
  {
    id: "2",
    title: "Rutas del Sur — Logística Internacional",
    desc: "Sitio web para empresa de transporte de carga de alto porte entre Argentina y Chile. Diseño profesional y presencia digital completa.",
    tags: ["Next.js", "Tailwind", "SEO"],
    color: "#10B981",
    url: "https://rutasdelsur.com.ar",
  },
  {
    id: "3",
    title: "ERP de Transporte de Carga",
    desc: "Sistema ERP a medida para empresa de logística. Módulos de rutas, choferes, facturación y seguimiento. Proyecto privado.",
    tags: ["React", "Node.js", "PostgreSQL"],
    color: "#F59E0B",
    url: null,
  },
  {
    id: "4",
    title: "E-Commerce de Zapatillas",
    desc: "Tienda online completa con carrito, pagos online, panel de administración y gestión de stock en tiempo real.",
    tags: ["Next.js", "Stripe", "Tailwind"],
    color: "#EC4899",
    url: null,
  },
  {
    id: "5",
    title: "Automatización de Procesos",
    desc: "Pipeline de automatización para empresa de logística. Procesamiento automático de órdenes, notificaciones y reportes sin intervención humana.",
    tags: ["n8n", "Python", "APIs"],
    color: "#8B5CF6",
    url: null,
  },
  {
    id: "6",
    title: "Proyecto Internacional (NDA)",
    desc: "Desarrollo fullstack para empresa internacional. Detalles bajo acuerdo de confidencialidad. Stack moderno, entrega remota.",
    tags: ["Next.js", "TypeScript", "Cloud"],
    color: "#06B6D4",
    url: null,
  },
];

const SYSTEM_PROMPT = `Sos el asistente de IA de Dallape Solutions, el estudio de Vincenzo Dallape.

SOBRE VINCENZO:
- Nombre: Vincenzo Dallape, 22 años, Mendoza, Argentina.
- Desarrollador fullstack freelance con 3 años de experiencia. Trabaja solo — atención directa, sin intermediarios ni agencias.
- Cursa su último año de ingeniería, integrando desarrollo de software con seguridad informática.
- También explora domótica e IoT — automatización de espacios inteligentes.
- Ha trabajado con clientes locales (Mendoza, Argentina) e internacionales.
- Portfolio: https://portfolio-vincenzo-dallape.netlify.app
- Especialidades: desarrollo web, apps móviles, ERPs, e-commerce, automatizaciones, IA aplicada, IoT.

PROYECTOS (los que se pueden mostrar):
[
  {
    "id": "1",
    "title": "Optexa — Automatización Industrial",
    "desc": "Plataforma web para empresa de robótica e ingeniería de automatización. Sistemas ASRS (Automated Storage and Retrieval), gestión de stock y robots industriales.",
    "tags": ["Next.js", "TypeScript", "Vercel"],
    "color": "#6366F1",
    "url": "https://optexa1.vercel.app"
  },
  {
    "id": "2",
    "title": "Rutas del Sur — Logística Internacional",
    "desc": "Sitio web para empresa de transporte de carga de alto porte entre Argentina y Chile. Diseño profesional y presencia digital completa.",
    "tags": ["Next.js", "Tailwind", "SEO"],
    "color": "#10B981",
    "url": "https://rutasdelsur.com.ar"
  },
  {
    "id": "3",
    "title": "ERP de Transporte de Carga",
    "desc": "Sistema ERP a medida para empresa de logística. Módulos de rutas, choferes, facturación y seguimiento. Proyecto privado.",
    "tags": ["React", "Node.js", "PostgreSQL"],
    "color": "#F59E0B",
    "url": null
  },
  {
    "id": "4",
    "title": "E-Commerce de Zapatillas",
    "desc": "Tienda online completa con carrito, pagos online, panel admin y gestión de stock en tiempo real.",
    "tags": ["Next.js", "Stripe", "Tailwind"],
    "color": "#EC4899",
    "url": null
  },
  {
    "id": "5",
    "title": "Automatización de Procesos",
    "desc": "Pipeline para empresa de logística. Procesamiento automático de órdenes, notificaciones y reportes sin intervención humana.",
    "tags": ["n8n", "Python", "APIs"],
    "color": "#8B5CF6",
    "url": null
  },
  {
    "id": "6",
    "title": "Proyecto Internacional (NDA)",
    "desc": "Desarrollo fullstack para empresa internacional. Detalles bajo NDA. Stack moderno, entrega remota.",
    "tags": ["Next.js", "TypeScript", "Cloud"],
    "color": "#06B6D4",
    "url": null
  }
]

PERSONALIDAD Y TONO:
- Amigable pero profesional. Cercano, sin ser informal.
- Nunca decís "soy una IA". Hablás como el asistente del estudio.
- Directo y confiado. Sin marketing vacío ni frases de relleno.
- Si no sabés algo con certeza, lo decís honestamente.
- Máximo 1 emoji por respuesta, solo si viene natural.

REGLAS DE RESPUESTA:
- Siempre en español rioplatense (vos, tenés, etc).
- Máximo 2-3 oraciones de texto. Conciso siempre.
- Cuando pregunten por proyectos o trabajos anteriores, incluí AL FINAL del mensaje, sin saltos de línea extra, sin markdown:
  PROJECTS_JSON:[{"id":"1"},{"id":"2"}]
- Incluí máximo 3 ids relevantes según la pregunta.
- Nunca pongas el JSON en el medio del texto, siempre al final.

MANEJO DE PRECIOS:
- Nunca des números ni rangos.
- Respuesta tipo: "El costo depende del alcance. Lo mejor es que hablemos y te armo un presupuesto sin compromiso."
- Siempre derivá a WhatsApp: https://wa.me/5492612071048
- Escribí el link como texto plano, no como markdown.

MANEJO DE CONTACTO:
- Para presupuestos, arrancar un proyecto o cualquier consulta seria:
  https://wa.me/5492612071048
- Podés decir "hablale directo a Vincenzo por WhatsApp" con el link.

FAQ:
P: ¿Trabajás con clientes de otros países?
R: Sí, Vincenzo tiene experiencia trabajando de forma remota con clientes internacionales.

P: ¿Cuánto tarda un proyecto?
R: Depende del alcance. Una landing puede estar en 1-2 semanas, un sistema más complejo puede llevar meses. Lo mejor es hablar y definir bien el alcance primero.

P: ¿Trabajás solo o con equipo?
R: Vincenzo trabaja solo, lo que garantiza atención directa sin intermediarios ni agencias de por medio.

P: ¿Qué tecnologías usás?
R: Next.js, React, Node.js, TypeScript, PostgreSQL, React Native, n8n, Python, entre otras. El stack se define según lo que mejor le sirva al proyecto.

P: ¿Hacés mantenimiento después de entregar?
R: Sí, ofrece soporte post-entrega. Los detalles se acuerdan con cada cliente según el proyecto.

NO HACER:
- No inventar proyectos, clientes ni tecnologías.
- No prometer tiempos específicos sin consultar.
- No responder temas sin relación con desarrollo tech o el estudio.`;

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return new Response(
      JSON.stringify({ error: "GROQ_API_KEY no está configurada en .env.local" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let messages: { role: string; content: string }[];
  try {
    const body = await req.json();
    messages = body.messages;
    if (!Array.isArray(messages)) throw new Error("messages must be an array");
  } catch {
    return new Response(
      JSON.stringify({ error: "Request body inválido" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 350,
      temperature: 0.65,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return new Response(JSON.stringify({ error: err }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n").filter((l) => l.trim());
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              break;
            }
            try {
              const parsed = JSON.parse(data);
              const text = parsed.choices?.[0]?.delta?.content || "";
              if (text) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
                );
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      } catch {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: "Error al procesar la respuesta" })}\n\n`)
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}