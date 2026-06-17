// -------------------------------------------------------------------------
// Central content source for the portfolio. Edit values here to update the
// site — all sections read from this single file.
// -------------------------------------------------------------------------

export const profile = {
  name: "Aryan Tomar",
  role: "Software Engineer & LLM Engineer",
  tagline:
    "Scalable backend systems, full-stack apps & LLM-powered automation.",
  summary:
    "Results-driven Software Engineer and LLM Engineer with hands-on experience building scalable backend systems using Java and Spring Boot, and architecting LLM-powered automation pipelines. With a B.Tech specialization in Big Data Analytics, I combine large-scale data engineering with LLM tooling to automate complex, multi-step workflows — getting more done in less time. Proven track record of migrating legacy systems, optimizing database performance, and shipping secure REST APIs that handle high transaction volumes.",
  location: "Delhi, India",
  email: "tomar.aryan16j@gmail.com",
  phone: "+91-8077951299",
  resumeUrl: "/Aryan_Tomar_Resume.doc",
  socials: {
    github: "https://github.com/at2205",
    linkedin: "https://www.linkedin.com/in/aryan-tomar-02727128b/",
  },
};

export const stats = [
  { label: "Daily transactions served", value: "10K+" },
  { label: "Jobs auto-scraped & ATS-scored", value: "152" },
  { label: "Faster data retrieval", value: "35%" },
  { label: "B.Tech CGPA", value: "8.79" },
];

export const experiences = [
  {
    company: "FINDI Bankit Pvt. Ltd.",
    role: "Software Engineer",
    location: "Delhi",
    period: "Aug 2024 — Present",
    highlights: [
      "Developed and maintained scalable REST APIs using Spring Boot handling 10K+ daily transactions.",
      "Migrated legacy Struts-based modules to Spring Boot, improving performance by 25%.",
      "Optimized complex SQL queries, reducing data retrieval time by 35%.",
      "Built secure authentication systems using Spring Security (role-based access).",
      "Engineered the AEPS agent onboarding integration — an end-to-end Aadhaar KYC pipeline integrating iServeU & NSDL APIs with biometric capture.",
      "Developed React-based frontend modules including OTP verification & voucher flows.",
      "Collaborated in agile teams, ensuring high-quality releases with QA & Postman testing.",
    ],
  },
];

export type Project = {
  title: string;
  blurb: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  apiDocsUrl?: string;
  repoUrl?: string;
  category: "backend" | "frontend";
};

// -------------------------------------------------------------------------
// Backend Projects — API-driven, server-side systems with documentation.
// -------------------------------------------------------------------------
export const backendProjects: Project[] = [
  {
    title: "Job Assistant Bot (LLM Automation)",
    category: "backend",
    blurb:
      "A full-stack automation platform that streamlines the job hunt on Naukri — combining LLM-driven profile automation, large-scale job scraping, and ATS (Applicant Tracking System) scoring.",
    highlights: [
      "Built an LLM-powered automation pipeline that auto-updates profile headline, skills & summary using Playwright with persistent sessions.",
      "Scraped & analyzed 152 jobs with ATS scoring (avg 73.7%) and a 68.6% average interview-probability signal to surface best-fit roles.",
      "Designed a Spring Boot 3.3.5 (Java 17) backend with 51 API operations over a PostgreSQL store of 30 tables, 11 migrations & 97 indexes.",
      "Automated multi-step workflows end-to-end with a Node.js + Playwright service, plus observability logs for scraping metrics & selector failures.",
    ],
    stack: [
      "Spring Boot 3.3.5",
      "Java 17",
      "Next.js",
      "Playwright",
      "PostgreSQL",
      "Node.js",
      "LLM Engineering",
    ],
  },
  {
    title: "CAPS Portal",
    category: "backend",
    blurb:
      "Enterprise financial portal modernization — refactored a legacy Struts application into clean, service-layered Spring Boot REST APIs.",
    highlights: [
      "Enhanced a legacy Struts-based application by developing Spring Boot REST APIs.",
      "Redesigned the backend using clean architecture & service-layer patterns.",
      "Implemented exception handling, validation, and standardized API contracts.",
      "Built for production-grade financial/transaction reliability and performance.",
    ],
    stack: ["Java", "Spring Boot", "React.js", "Next.js", "MySQL"],
    liveUrl: "https://caps.bankit.in/",
    apiDocsUrl: "https://caps.bankit.in/",
  },
  {
    title: "B2C IRCTC Ticket Booking System",
    category: "backend",
    blurb:
      "End-to-end train ticket booking platform with fare calculation, payment processing, and full booking lifecycle management.",
    highlights: [
      "Integrated backend APIs for ticket booking, fare calculation, and transaction handling.",
      "Implemented the complete booking lifecycle: passenger details → payment → confirmation.",
      "Handled API integration, error handling, and validation for a smooth booking experience.",
      "Exposed secure REST endpoints consumed by a responsive React frontend.",
    ],
    stack: ["Java", "Spring Boot", "React.js", "MySQL", "REST APIs"],
    liveUrl: "https://quickrail.bankit.in/",
    apiDocsUrl: "https://quickrail.bankit.in/",
  },
  {
    title: "AEPS Onboarding Pipeline",
    category: "backend",
    blurb:
      "Aadhaar Enabled Payment System agent onboarding — an end-to-end KYC pipeline integrating iServeU APIs with NSDL for biometric verification.",
    highlights: [
      "Built a multi-step onboarding flow: Status Check → OTP Generation → OTP Validation with biometric fingerprint capture.",
      "Integrated biometric devices (Mantra, Morpho, Startek) via the RD Service SDK.",
      "Handled journey status codes to support retry flows, OTP resend, and resumption of incomplete onboarding.",
      "Secured sensitive data exchange using AES-256 encryption.",
    ],
    stack: [
      "Java",
      "Spring MVC",
      "JSP/JSTL",
      "REST APIs",
      "AES-256",
      "Biometric SDK",
      "NSDL / iServeU",
    ],
  },
  {
    title: "m-Swasth Wellness Platform",
    category: "backend",
    blurb:
      "Healthcare & wellness platform with secure, scalable Spring Boot APIs powering digital wellness services and user engagement.",
    highlights: [
      "Developed backend API services using Spring Boot for secure and scalable data handling.",
      "Implemented authentication, form validation, and REST API integrations.",
      "Optimized application performance through modular architecture and clean coding.",
      "Maintained a production wellness service with strong reliability practices.",
    ],
    stack: ["Java", "Spring Boot", "Next.js", "MySQL", "REST APIs"],
    liveUrl: "https://wellness.bankit.in/m-swasth",
    apiDocsUrl: "https://wellness.bankit.in/m-swasth",
  },
];

// -------------------------------------------------------------------------
// Frontend Demos — interactive, client-side experiences.
// -------------------------------------------------------------------------
export const frontendDemos: Project[] = [
  {
    title: "Real-Time Video Streaming App",
    category: "frontend",
    blurb:
      "A Twitch-like live streaming prototype built with WebRTC & SFU concepts, featuring peer-to-peer video and real-time chat.",
    highlights: [
      "Built peer-to-peer video streaming and real-time chat using Socket.io.",
      "Developed Node.js signaling services for session and connection management.",
      "Managed room creation and event-driven communication between clients.",
      "Explored scalable streaming architecture for real-world use cases.",
    ],
    stack: ["React.js", "Next.js", "WebRTC", "Socket.io", "Node.js"],
  },
  {
    title: "IRCTC Booking Experience",
    category: "frontend",
    blurb:
      "Responsive ticket booking UI with OTP verification, live booking summaries, and a seamless multi-step reservation flow.",
    highlights: [
      "Built a responsive React.js frontend for searching, booking, and managing tickets.",
      "Implemented OTP verification and real-time user interaction patterns.",
      "Designed the booking summary and confirmation experience.",
      "Connected to backend booking APIs with robust validation and error handling.",
    ],
    stack: ["React.js", "React Router DOM", "React Bootstrap", "SweetAlert2"],
    liveUrl: "https://quickrail.bankit.in/",
  },
  {
    title: "m-Swasth Wellness UI",
    category: "frontend",
    blurb:
      "Accessible, performant wellness frontend built with Next.js — focused on user engagement and smooth digital wellness journeys.",
    highlights: [
      "Built responsive frontend components using Next.js for better UX and accessibility.",
      "Implemented authentication flows and form validations on the client.",
      "Integrated REST APIs for seamless, data-driven user interactions.",
      "Improved maintainability through a modular component architecture.",
    ],
    stack: ["Next.js", "React.js", "REST APIs"],
    liveUrl: "https://wellness.bankit.in/m-swasth",
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["Java", "SQL", "JavaScript", "HTML", "CSS"],
  },
  {
    group: "Frameworks & Libraries",
    items: [
      "Spring Boot",
      "Spring MVC",
      "Spring Security",
      "Hibernate",
      "JDBC",
      "React.js",
      "Next.js",
      "React Router DOM",
    ],
  },
  {
    group: "Backend & System Design",
    items: [
      "REST APIs",
      "Service Layer Design",
      "Database Optimization",
      "Secure Authentication",
      "Scalable Architecture",
    ],
  },
  {
    group: "LLM & Automation",
    items: [
      "LLM Engineering",
      "LLM APIs",
      "Workflow Automation",
      "Playwright",
      "Big Data Analytics",
      "ATS / Data Pipelines",
    ],
  },
  {
    group: "Emerging Tech",
    items: ["WebRTC", "Socket.io", "Real-Time Systems", "Node.js"],
  },
  {
    group: "Databases & Tools",
    items: ["MySQL", "Git", "Postman", "MySQL Workbench", "VS Code"],
  },
];

export const education = {
  school: "SRM Institute of Science and Technology",
  degree: "B.Tech — Computer Science (Specialization in Big Data Analytics)",
  detail: "CGPA: 8.79",
  period: "Jun 2020 — Jun 2024",
};

export const certifications = [
  "LLM Engineer — builds automated, multi-step pipelines that process big data and cut manual effort.",
  "Problem Solving — HackerRank (Java, SQL)",
  "Strong foundation in Data Structures & Algorithms",
  "Contributed to production migration of legacy Struts modules to Spring Boot",
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Backend", href: "#backend" },
  { label: "Frontend", href: "#frontend" },
  { label: "Process", href: "#process" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const process = [
  {
    step: "01",
    title: "Understand & Architect",
    detail:
      "Deep-dive into goals, data, and constraints. I map the domain, model the data, and design clean service-layer architecture before a line of code is written.",
  },
  {
    step: "02",
    title: "Build & Automate",
    detail:
      "Ship secure REST APIs and resilient pipelines. Where work is repetitive, I layer in LLM engineering and automation so multi-step flows run themselves.",
  },
  {
    step: "03",
    title: "Optimize & Ship",
    detail:
      "Tune queries, index hot paths, and harden auth. Iterative, tested releases with observability baked in — measurable performance, every time.",
  },
];
