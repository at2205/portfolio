// Site-level content (navigation, section copy). Personal facts live in data.ts.
import type { MenuGroup } from "@/resources/HeaderMegaMenu";

export const brand = "Aryan_Tomar_";

export const menuGroups: MenuGroup[] = [
  {
    label: "The work",
    items: [
      { label: "Projects", href: "/projects", note: "Everything shipped" },
      { label: "About", href: "/about", note: "Experience, skills, education" },
      { label: "Resume", href: "/Aryan_Tomar_Resume.doc", note: "Download the CV" },
    ],
  },
  {
    label: "Read and take",
    items: [
      { label: "Resources", href: "/resources", badge: "Free", note: "My components, free" },
      { label: "Components", href: "/components", badge: "Free", note: "A shelf of small, copyable pieces" },
      { label: "Contact", href: "/contact", note: "Start a conversation" },
    ],
  },
];

export const capabilities = [
  {
    title: "Backend systems",
    note: "Secure, versioned REST APIs on Spring Boot — handling 10K+ daily transactions with service-layer architecture, validation and standard contracts.",
    tags: ["Java", "Spring Boot", "Spring Security", "REST"],
    tone: "linear-gradient(100deg,#ea4f16,#f6af60)",
  },
  {
    title: "LLM automation",
    note: "Multi-step pipelines that run themselves — Playwright sessions, scraping, ATS scoring and LLM calls wired into observable workflows.",
    tags: ["LLM APIs", "Playwright", "Node.js", "Pipelines"],
    tone: "linear-gradient(100deg,#b4460a,#ff630f)",
  },
  {
    title: "Data & SQL",
    note: "Query tuning, indexing and migrations. Retrieval times cut by 35% on production workloads, with a Big Data Analytics background.",
    tags: ["MySQL", "PostgreSQL", "Indexing", "Migrations"],
    tone: "linear-gradient(100deg,#ff630f,#ffa24a)",
  },
  {
    title: "Frontend",
    note: "React and Next.js interfaces — OTP flows, booking journeys, real-time video — wired to the APIs I build, so nothing is lost at the seam.",
    tags: ["React", "Next.js", "WebRTC", "Socket.io"],
    tone: "linear-gradient(100deg,#c9531b,#f6af60)",
  },
];

export const steps = [
  {
    step: "01",
    title: "Call",
    detail: "We map the goal, the data and the constraints. I ask the unglamorous questions early.",
  },
  {
    step: "02",
    title: "Architect",
    detail: "Domain model, service layers and contracts are designed before a line of code is written.",
  },
  {
    step: "03",
    title: "Build",
    detail: "Secure APIs and resilient pipelines. Where work is repetitive, LLM automation takes it over.",
  },
  {
    step: "04",
    title: "Ship",
    detail: "Tuned queries, hardened auth, iterative tested releases and observability built in.",
  },
];

export const marqueeWords = ["Backend", "LLM automation", "Spring Boot", "Next.js", "Pipelines", "APIs"];
