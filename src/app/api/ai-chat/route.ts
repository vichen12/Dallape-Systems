// src/app/api/ai-chat/route.ts
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// CÃ“MO ENTRENAR LA IA â€” GUÃA COMPLETA
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//
// La IA aprende todo desde el SYSTEM_PROMPT de abajo. No hay base de datos,
// no hay fine-tuning, no hay magia. Solo texto bien estructurado.
//
// PARA AGREGAR UN PROYECTO NUEVO:
//   1. AgregÃ¡ un objeto al array PROJECTS_DATA con id, title, desc, tags, color, url
//   2. Describilo bien en 1-2 oraciones (quÃ© problema resuelve, quÃ© resultado tuvo)
//   3. AgregÃ¡ la misma info al bloque "PROYECTOS" del SYSTEM_PROMPT
//   Listo. La IA ya lo conoce en el prÃ³ximo deploy.
//
// PARA CAMBIAR LA PERSONALIDAD:
//   EditÃ¡ la secciÃ³n "PERSONALIDAD Y TONO" del SYSTEM_PROMPT.
//
// PARA AGREGAR INFO SOBRE EL EQUIPO:
//   EditÃ¡ la secciÃ³n del equipo dentro del SYSTEM_PROMPT.
//
// PARA CAMBIAR CÃ“MO MANEJA PRECIOS:
//   EditÃ¡ la secciÃ³n "MANEJO DE PRECIOS".
//
// PARA AGREGAR PREGUNTAS FRECUENTES:
//   Al final del SYSTEM_PROMPT agregÃ¡ una secciÃ³n "FAQ" con pares pregunta/respuesta.
//
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

import { NextRequest } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// â”€â”€â”€ Proyectos reales â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const PROJECTS_DATA = [
  {
    id: "1",
    title: "Optexa â€” AutomatizaciÃ³n Industrial",
    desc: "Plataforma web para empresa de robÃ³tica e ingenierÃ­a de automatizaciÃ³n. Sistemas ASRS (Automated Storage and Retrieval), gestiÃ³n de stock y robots industriales. DiseÃ±o tÃ©cnico que transmite confianza y escala.",
    tags: ["Next.js", "TypeScript", "Vercel", "SEO"],
    color: "#E8B84B",
    url: "https://optexa1.vercel.app",
  },
  {
    id: "2",
    title: "Rutas del Sur â€” LogÃ­stica Internacional",
    desc: "Sitio web para empresa de transporte de carga de alto porte entre Argentina y Chile. Presencia digital completa, fuerte optimizaciÃ³n SEO local y regional para captar clientes.",
    tags: ["Next.js", "Tailwind", "SEO", "Analytics"],
    color: "#C4853A",
    url: "https://rutasdelsur.com.ar",
  },
  {
    id: "3",
    title: "Fletx â€” LogÃ­stica & Transporte",
    desc: "Landing profesional para empresa de fletes y transporte. DiseÃ±o orientado a captar leads, con secciones de servicios, cobertura geogrÃ¡fica y formulario de contacto.",
    tags: ["React", "Tailwind", "Netlify"],
    color: "#E8B84B",
    url: "https://fletx.netlify.app",
  },
  {
    id: "4",
    title: "Brune Dance â€” Estudio de Danza",
    desc: "Sitio web para estudio de danza. GalerÃ­a de imÃ¡genes, clases disponibles, sistema de turnos y contacto. DiseÃ±o moderno con animaciones fluidas que refleja la identidad artÃ­stica del estudio.",
    tags: ["Next.js", "Framer Motion", "Vercel"],
    color: "#C4853A",
    url: "https://brune-dance.vercel.app",
  },
  {
    id: "5",
    title: "Anuk Industrial Vision â€” VisiÃ³n Industrial",
    desc: "Plataforma web para empresa de visiÃ³n industrial y automatizaciÃ³n. PresentaciÃ³n de soluciones de inspecciÃ³n automatizada, catÃ¡logo de productos y casos de uso tÃ©cnicos.",
    tags: ["Next.js", "TypeScript", "Vercel"],
    color: "#E8B84B",
    url: "https://anuk-industrial-vision.vercel.app",
  },
  {
    id: "6",
    title: "Stokamza â€” GestiÃ³n de Stock & E-Commerce",
    desc: "Tienda online con sistema de gestiÃ³n de inventario en tiempo real. Panel de administraciÃ³n completo, control de stock y experiencia de compra fluida.",
    tags: ["Next.js", "Node.js", "Vercel"],
    color: "#C4853A",
    url: "https://stokamza.vercel.app",
  },
  {
    id: "7",
    title: "Ruedas â€” E-Commerce",
    desc: "Tienda online de productos. CatÃ¡logo completo con filtros, carrito de compras y proceso de checkout optimizado para conversiÃ³n.",
    tags: ["Next.js", "Stripe", "Tailwind"],
    color: "#E8B84B",
    url: "https://ruedas-ochre.vercel.app",
  },
  {
    id: "8",
    title: "Importacion12 â€” Empresa de Importaciones",
    desc: "Sitio web para empresa de importaciÃ³n y comercio exterior. CatÃ¡logo de productos, formulario de cotizaciÃ³n y presencia digital profesional.",
    tags: ["React", "Tailwind", "Netlify"],
    color: "#C4853A",
    url: "https://importacion12.netlify.app",
  },
  {
    id: "9",
    title: "ERP de Transporte de Carga",
    desc: "Sistema ERP a medida para empresa de logÃ­stica. MÃ³dulos de gestiÃ³n de rutas, choferes, facturaciÃ³n electrÃ³nica y seguimiento en tiempo real. ReemplazÃ³ procesos manuales en planillas de Excel por una plataforma web completa con roles de usuario y dashboard con mÃ©tricas.",
    tags: ["React", "Node.js", "PostgreSQL", "Docker"],
    color: "#E8B84B",
    url: null,
  },
  {
    id: "10",
    title: "AutomatizaciÃ³n de Procesos",
    desc: "Pipeline de automatizaciÃ³n empresarial para empresa de logÃ­stica. Procesamiento automÃ¡tico de Ã³rdenes de trabajo, notificaciones por email/WhatsApp y generaciÃ³n automÃ¡tica de reportes â€” todo sin intervenciÃ³n humana.",
    tags: ["n8n", "Python", "APIs"],
    color: "#C4853A",
    url: null,
  },
  {
    id: "11",
    title: "Proyecto Internacional (NDA)",
    desc: "Desarrollo fullstack para empresa internacional. Detalles bajo acuerdo de confidencialidad. Stack moderno, entrega completamente remota con estÃ¡ndares de calidad globales.",
    tags: ["Next.js", "TypeScript", "Cloud"],
    color: "#E8B84B",
    url: null,
  },
];

const SYSTEM_PROMPT = `Sos el asistente de IA de GPD Systems, un estudio boutique de perfiles de sistemas de Mendoza, Argentina.

Equipo:
- Dallape Vincenzo
- Garcia Fausto
- Podesta Isidro

Somos ingenieros en sistemas y estudiantes avanzados de ingenieria en sistemas; algunos integrantes estan cursando 5to ano. El mensaje principal: somos un equipo chico, tecnico y directo. No hay agencia ni intermediarios: el cliente habla con quienes van a pensar y escribir el codigo.

Servicios principales:
- Desarrollo web y e-commerce: landings, sitios institucionales, tiendas online, SEO tecnico y performance.
- Software a medida: sistemas internos, ERPs, dashboards, apps y herramientas para procesos que no encajan en un SaaS generico.
- Automatizacion e IA: workflows con n8n, chatbots con informacion de la empresa, integraciones entre sistemas, scripts y procesamiento de datos.

Casos que se pueden mencionar:
- Optexa: plataforma web para robotica industrial y automatizacion.
- Rutas del Sur: sitio profesional para transporte internacional Argentina-Chile.
- ERP de Transporte: sistema interno privado con roles, paneles y reportes.

Tono:
- Responde siempre en espanol rioplatense, profesional y directo.
- No uses humo ni promesas falsas. Evita frases como "soluciones disruptivas" o "transformacion digital".
- Si preguntan por experiencia, habla de proyectos reales y del enfoque tecnico del equipo, sin inventar numeros.
- Si preguntan precios o tiempos, explica que depende del alcance y sugiere una charla breve para definirlo.
- Si preguntan por contacto, invita a dejar el formulario o escribir por WhatsApp: +54 9 261 207-1048.
- No digas que es un proyecto de una sola persona. GPD Systems es el equipo formado por Garcia, Podesta y Dallape.`;
export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return new Response(
      JSON.stringify({ error: "GROQ_API_KEY no estÃ¡ configurada en .env.local" }),
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
      JSON.stringify({ error: "Request body invÃ¡lido" }),
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
      max_tokens: 1200,
      temperature: 0.7,
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


