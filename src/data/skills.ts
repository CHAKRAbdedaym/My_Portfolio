import type { Language, SkillDomain } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SKILLS
 * ─────────────────────────────────────────────────────────────────────────────
 *  Skills are grouped into engineering domains — deliberately with no
 *  percentage bars, no star ratings and no invented proficiency levels.
 *  The section is framed as "technologies and domains I work with".
 *
 *  To add a technology: find the right domain below and add a string to its
 *  `items` array. To add a whole new domain, copy an existing object.
 *
 *  `icon` accepts: "brain" | "server" | "layout" | "cloud" | "database" | "wrench"
 *  `accent` accepts: "blue" | "indigo" | "cyan" | "violet"
 *
 *  See guide.txt → section 11.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const skillDomains: SkillDomain[] = [
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    description:
      "Model-backed features, retrieval pipelines and agent tooling built to run inside real systems.",
    icon: "brain",
    accent: "violet",
    items: [
      "Deep Learning",
      "Reinforcement Learning",
      "NLP",
      "RAG",
      "AI Agents",
      "MCP",
      "PyTorch",
      "TensorFlow",
    ],
  },
  {
    id: "backend",
    name: "Backend Engineering",
    description:
      "API design, asynchronous processing and the service boundaries that keep systems maintainable.",
    icon: "server",
    accent: "blue",
    items: [
      "Java",
      "Spring Boot",
      "Python",
      "Django",
      "FastAPI",
      "Node.js",
      "C#",
      "REST APIs",
      "Celery",
    ],
  },
  {
    id: "frontend",
    name: "Frontend Development",
    description:
      "Typed, accessible interfaces — from enterprise dashboards to production storefronts.",
    icon: "layout",
    accent: "cyan",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Angular",
      "Tailwind CSS",
      "HTML & CSS",
    ],
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    description:
      "Containers, pipelines and infrastructure that take a build from commit to production.",
    icon: "cloud",
    accent: "indigo",
    items: [
      "Docker",
      "Kubernetes",
      "Jenkins",
      "GitHub Actions",
      "AWS",
      "Terraform",
      "Nginx",
      "Vercel",
      "CI/CD",
    ],
  },
  {
    id: "data",
    name: "Data & Databases",
    description:
      "Relational, document and search stores — chosen for the shape of the data, not habit.",
    icon: "database",
    accent: "blue",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Supabase",
      "OpenSearch",
      "SQL",
      "Web Scraping",
    ],
  },
  {
    id: "tools",
    name: "Tools & Platforms",
    description:
      "The day-to-day toolchain for building, documenting, automating and observing systems.",
    icon: "wrench",
    accent: "cyan",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "Swagger / OpenAPI",
      "n8n",
      "Grafana",
      "Jira",
      "Linux",
    ],
  },
];

/** Programming languages, surfaced separately as a compact marquee row. */
export const languagesUsed: string[] = [
  "Java",
  "Python",
  "TypeScript",
  "C#",
  "C",
  "SQL",
  "PHP",
];

/** Spoken languages. */
export const spokenLanguages: Language[] = [
  { name: "Arabic", level: "Native", strength: 3 },
  { name: "French", level: "Fluent — Professional", strength: 3 },
  { name: "English", level: "Technical — Professional working", strength: 2 },
];
