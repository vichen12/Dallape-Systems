export const siteContent = {
  hero: {
    eyebrow: "Estudio de ingenieria en sistemas",
    title: "GPD",
    titleAccent: "Solutions",
    subtitle: "Tres perfiles de sistemas construyendo webs, software a medida y automatizaciones para negocios reales.",
    cta: {
      primary: "Iniciar Proyecto",
      secondary: "Ver Servicios"
    },
    stats: [
      { value: "3", label: "Perfiles tecnicos" },
      { value: "24h", label: "Respuesta inicial" },
      { value: "AR", label: "Mendoza" }
    ]
  },
  services: {
    title: "Servicios",
    subtitle: "De la idea al deploy. Soluciones completas end-to-end.",
    items: [
      {
        id: 1,
        title: "Desarrollo Full Stack",
        description: "Aplicaciones web modernas, desde portfolios profesionales hasta plataformas complejas. React, Next.js, Node.js, bases de datos SQL/NoSQL. DiseÃ±o responsive, optimizaciÃ³n de performance, arquitectura escalable.",
        icon: "Code2",
        color: "electric-indigo",
        technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "MongoDB"],
        size: "large"
      },
      {
        id: 2,
        title: "AutomatizaciÃ³n con IA",
        description: "IntegraciÃ³n de LLMs (GPT-4, Claude), chatbots inteligentes, agentes de IA, automatizaciÃ³n de workflows, anÃ¡lisis de datos con ML, sistemas RAG personalizados.",
        icon: "Sparkles",
        color: "emerald-neon",
        technologies: ["OpenAI", "LangChain", "Python", "FastAPI", "Vector DBs"],
        size: "large"
      },
      {
        id: 3,
        title: "Soluciones Personalizadas",
        description: "Â¿Necesitas algo especÃ­fico? APIs custom, integraciones entre sistemas, migraciÃ³n de datos, optimizaciÃ³n de procesos, DevOps, consultorÃ­as tÃ©cnicas. Si es tecnologÃ­a, lo resuelvo.",
        icon: "Zap",
        color: "electric-indigo",
        technologies: ["AWS", "Docker", "CI/CD", "REST APIs", "Microservicios"],
        size: "medium"
      }
    ]
  },
  about: {
    title: "Sobre MÃ­",
    description: "Ingeniero en Sistemas con +5 aÃ±os de experiencia construyendo soluciones de software robustas y escalables. Apasionado por la arquitectura limpia, la seguridad y las tecnologÃ­as emergentes.",
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
    subtitle: "Â¿Tienes un proyecto en mente? Conversemos sobre cÃ³mo podemos ayudarte.",
    phone: "+54 9 261 123-4567",
    email: "hola@gpdsystems.dev",
    location: "Mendoza, Argentina"
  },
  footer: {
    tagline: "Construyendo el futuro, un sistema a la vez.",
    copyright: "2024 GPD Systems. Todos los derechos reservados.",
    social: {
      github: "https://github.com/gpdsystems",
      linkedin: "https://linkedin.com/company/gpdsystems",
      twitter: "https://twitter.com/gpdsystems"
    }
  }
};

export type SiteContent = typeof siteContent;


