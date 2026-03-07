export const siteContent = {
  hero: {
    eyebrow: "Ingeniero en Sistemas • Freelance",
    title: "Arquitectura que",
    titleAccent: "Escala",
    subtitle: "Transformo ideas complejas en sistemas resilientes. Especializado en arquitectura de software, ciberseguridad y automatización con IA.",
    cta: {
      primary: "Iniciar Proyecto",
      secondary: "Ver Servicios"
    },
    stats: [
      { value: "20+", label: "Proyectos Completados" },
      { value: "98%", label: "Satisfacción del Cliente" },
      { value: "24/7", label: "Soporte Técnico" }
    ]
  },
  services: {
    title: "Servicios",
    subtitle: "De la idea al deploy. Soluciones completas end-to-end.",
    items: [
      {
        id: 1,
        title: "Desarrollo Full Stack",
        description: "Aplicaciones web modernas, desde portfolios profesionales hasta plataformas complejas. React, Next.js, Node.js, bases de datos SQL/NoSQL. Diseño responsive, optimización de performance, arquitectura escalable.",
        icon: "Code2",
        color: "electric-indigo",
        technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "MongoDB"],
        size: "large"
      },
      {
        id: 2,
        title: "Automatización con IA",
        description: "Integración de LLMs (GPT-4, Claude), chatbots inteligentes, agentes de IA, automatización de workflows, análisis de datos con ML, sistemas RAG personalizados.",
        icon: "Sparkles",
        color: "emerald-neon",
        technologies: ["OpenAI", "LangChain", "Python", "FastAPI", "Vector DBs"],
        size: "large"
      },
      {
        id: 3,
        title: "Soluciones Personalizadas",
        description: "¿Necesitas algo específico? APIs custom, integraciones entre sistemas, migración de datos, optimización de procesos, DevOps, consultorías técnicas. Si es tecnología, lo resuelvo.",
        icon: "Zap",
        color: "electric-indigo",
        technologies: ["AWS", "Docker", "CI/CD", "REST APIs", "Microservicios"],
        size: "medium"
      }
    ]
  },
  about: {
    title: "Sobre Mí",
    description: "Ingeniero en Sistemas con +5 años de experiencia construyendo soluciones de software robustas y escalables. Apasionado por la arquitectura limpia, la seguridad y las tecnologías emergentes.",
    skills: [
      "TypeScript/Node.js",
      "Python/FastAPI",
      "AWS/Azure/GCP",
      "Docker/Kubernetes",
      "PostgreSQL/MongoDB",
      "Next.js/React",
      "Terraform/IaC",
      "LangChain/OpenAI"
    ]
  },
  contact: {
    title: "Hablemos",
    subtitle: "¿Tienes un proyecto en mente? Conversemos sobre cómo puedo ayudarte.",
    phone: "+54 9 261 123-4567",
    email: "contacto@dallape.dev",
    location: "Mendoza, Argentina"
  },
  footer: {
    tagline: "Construyendo el futuro, un sistema a la vez.",
    copyright: "2024 Dallape Solutions. Todos los derechos reservados.",
    social: {
      github: "https://github.com/dallape",
      linkedin: "https://linkedin.com/in/dallape",
      twitter: "https://twitter.com/dallape"
    }
  }
};

export type SiteContent = typeof siteContent;