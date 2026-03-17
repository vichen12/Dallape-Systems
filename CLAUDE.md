# Dallape Solutions — CLAUDE.md

Portfolio/landing page de servicios freelance de Ingeniería en Sistemas.

## Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Estilos**: Tailwind CSS v4
- **Animaciones**: Framer Motion, GSAP
- **3D**: Three.js + React Three Fiber
- **Email**: Resend
- **IA**: OpenAI SDK, Groq SDK (ruta `/api/ai-chat`)
- **Analytics**: PostHog, Google Analytics (con consentimiento de cookies)

## Comandos

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # ESLint
```

## Estructura

```
src/
  app/
    page.tsx                  # Página principal (home)
    layout.tsx                # Layout raíz con metadatos SEO
    robots.ts / sitemap.ts    # SEO técnico
    api/ai-chat/route.ts      # Endpoint del chat IA
    actions/sendEmail.ts      # Server action para formulario de contacto
  components/
    sections/                 # Secciones de la landing (hero, services, about, etc.)
    layout/                   # Navbar, footer
    ui/                       # Componentes reutilizables (Button, BentoCard, etc.)
    testimonials/             # Sección de testimonios
  data/
    siteContent.ts            # TODO el contenido de texto del sitio (fuente única de verdad)
  hooks/                      # Custom hooks
  lib/                        # Utilidades
```

## Reglas importantes

- **Todo el contenido de texto** va en `src/data/siteContent.ts`, no hardcodeado en componentes.
- El sitio está en **español**.
- El diseño usa una paleta oscura con acentos `electric-indigo` y `emerald-neon`.
- Los componentes de sección viven cada uno en su propia carpeta dentro de `sections/`.
