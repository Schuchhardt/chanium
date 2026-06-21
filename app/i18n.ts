export const dict = {
  en: {
    "nav.cta": "Book a call →",
    "hero.l1": "Build once.",
    "hero.l2.pre": "Scale ",
    "hero.l2.accent": "forever.",
    "hero.sub":
      "Chanium builds software, AI systems and digital products that compound business growth — owned and operated, not outsourced.",
    "hero.cta": "See what we build ↓",
    "st.l1": "We don't ship features. ",
    "st.l2.pre": "We ship ",
    "st.l2.accent": "systems.",
    "services.label": "What we build",
    "s1.name": "AI Agents & Automation",
    "s1.desc":
      "Autonomous agents and workflows that take real work off your team, around the clock.",
    "s2.name": "Fullstack Engineering",
    "s2.desc":
      "Production-grade platforms and APIs, architected to scale from day one without rewrites.",
    "s3.name": "AI Content Systems",
    "s3.desc":
      "On-brand content engines that produce, edit and publish at a volume humans can't match.",
    "s4.name": "Security & Infrastructure",
    "s4.desc":
      "Audits, hardening and monitoring that keep your systems and your users' data safe.",
    "products.label": "Built by us",
    "products.title": "Built by us.",
    "products.sub":
      "Products we designed, shipped and operate — same DNA, same standard.",
    "p1.desc":
      "A platform that turns scattered operations into one clear, automated workflow.",
    "p2.desc":
      "Support that resolves itself — AI triages, answers and escalates only what matters.",
    "p3.desc":
      "A smarter layer between your data and the decisions you make every day.",
    "how.label": "How we work",
    "ph1.t": "Scope",
    "ph1.d": "We define the outcome before writing a single line of code.",
    "ph2.t": "Build",
    "ph2.d": "Small team. Weekly demos. No surprises, ever.",
    "ph3.t": "Ship",
    "ph3.d": "You own everything. We stay close after launch.",
    stat1: "Products shipped",
    stat2: "Always-on automation",
    stat3: "You own the IP",
    "cta.t1": "Ready to build something",
    "cta.t2": "that lasts?",
    "cta.sub":
      "Tell us what you're building. We'll get back within 24 hours — no sales calls, no fluff.",
    "f.serviceph": "What do you need?",
    "f.svc1": "AI Agents & Automation",
    "f.svc2": "Fullstack Engineering",
    "f.svc3": "AI Content Systems",
    "f.svc4": "Security & Infrastructure",
    "f.svc5": "A product idea",
    "f.submit": "Send →",
    "f.note": "We reply within 24 hours.",
    "f.success": "Message received. Talk soon.",
    "f.name": "Name",
    "f.email": "Email",
    "f.project": "What are you building?",
  },
  es: {
    "nav.cta": "Agenda una llamada →",
    "hero.l1": "Construye una vez.",
    "hero.l2.pre": "Escala ",
    "hero.l2.accent": "para siempre.",
    "hero.sub":
      "Chanium construye software, sistemas de IA y productos digitales que componen el crecimiento del negocio — propios y operados, no tercerizados.",
    "hero.cta": "Mira lo que construimos ↓",
    "st.l1": "No lanzamos funciones. ",
    "st.l2.pre": "Lanzamos ",
    "st.l2.accent": "sistemas.",
    "services.label": "Qué construimos",
    "s1.name": "Agentes de IA y Automatización",
    "s1.desc":
      "Agentes y flujos autónomos que sacan trabajo real de tu equipo, las 24 horas.",
    "s2.name": "Ingeniería Fullstack",
    "s2.desc":
      "Plataformas y APIs de nivel producción, diseñadas para escalar desde el día uno.",
    "s3.name": "Sistemas de Contenido IA",
    "s3.desc":
      "Motores de contenido en tu marca que producen, editan y publican a un volumen imposible para humanos.",
    "s4.name": "Seguridad e Infraestructura",
    "s4.desc":
      "Auditorías, hardening y monitoreo que mantienen tus sistemas y los datos de tus usuarios a salvo.",
    "products.label": "Hecho por nosotros",
    "products.title": "Hecho por nosotros.",
    "products.sub":
      "Productos que diseñamos, lanzamos y operamos — mismo ADN, mismo estándar.",
    "p1.desc":
      "Una plataforma que convierte operaciones dispersas en un flujo claro y automatizado.",
    "p2.desc":
      "Soporte que se resuelve solo — la IA clasifica, responde y escala solo lo importante.",
    "p3.desc":
      "Una capa más inteligente entre tus datos y las decisiones que tomas cada día.",
    "how.label": "Cómo trabajamos",
    "ph1.t": "Definir",
    "ph1.d":
      "Definimos el resultado antes de escribir una sola línea de código.",
    "ph2.t": "Construir",
    "ph2.d": "Equipo pequeño. Demos semanales. Cero sorpresas.",
    "ph3.t": "Lanzar",
    "ph3.d": "Todo es tuyo. Seguimos cerca después del lanzamiento.",
    stat1: "Productos lanzados",
    stat2: "Automatización siempre activa",
    stat3: "La propiedad es tuya",
    "cta.t1": "¿Listo para construir algo",
    "cta.t2": "que perdure?",
    "cta.sub":
      "Cuéntanos qué estás construyendo. Respondemos en 24 horas — sin llamadas de ventas, sin relleno.",
    "f.serviceph": "¿Qué necesitas?",
    "f.svc1": "Agentes de IA y Automatización",
    "f.svc2": "Ingeniería Fullstack",
    "f.svc3": "Sistemas de Contenido IA",
    "f.svc4": "Seguridad e Infraestructura",
    "f.svc5": "Una idea de producto",
    "f.submit": "Enviar →",
    "f.note": "Respondemos en 24 horas.",
    "f.success": "Mensaje recibido. Hablamos pronto.",
    "f.name": "Nombre",
    "f.email": "Correo",
    "f.project": "¿Qué estás construyendo?",
  },
} as const;

export type Lang = keyof typeof dict;
export type DictKey = keyof (typeof dict)["en"];
