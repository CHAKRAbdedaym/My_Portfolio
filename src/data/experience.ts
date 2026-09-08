import type { Experience } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PROFESSIONAL EXPERIENCE
 * ─────────────────────────────────────────────────────────────────────────────
 *  Listed most-recent first. To add a new role, copy an existing object,
 *  change the values, and place it at the top of the array.
 *
 *  `kind: "enterprise"` gives the entry the elevated, highlighted treatment.
 *  See guide.txt → section 10.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const experiences: Experience[] = [
  {
    id: "onee",
    role: "Full-Stack Developer Intern",
    company: "ONEE — Electricity Branch",
    location: "Casablanca, Morocco",
    period: "July 2026 — September 2026",
    duration: "3 months",
    kind: "enterprise",
    summary:
      "Built two web platforms in parallel to digitalise internal processes at Morocco's national electricity operator, replacing legacy Microsoft Access workflows with modern, auditable systems.",
    highlights: [
      {
        name: "Public Procurement Management Platform",
        description:
          "A centralised platform covering the full procurement lifecycle — from launching calls for tenders through workflow management to reporting — designed to replace the legacy Microsoft Access process.",
      },
      {
        name: "GED — Electronic Document Management",
        description:
          "A document platform that centralises and secures corporate documents with bilingual FR/AR OCR, OpenSearch full-text search, granular permissions, versioning and document locking.",
      },
    ],
    keywords: [
      "Digital Transformation",
      "Bilingual OCR",
      "Full-Text Search",
      "Document Management",
      "Async Job Queues",
    ],
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "BullMQ",
      "Tesseract OCR",
      "OpenSearch",
      "Docker",
      "Git",
    ],
  },
  {
    id: "iaweb",
    role: "Full-Stack Developer & Data Team Lead Intern",
    company: "IAWEB.DEV",
    location: "Marrakech, Morocco",
    period: "June 2025 — July 2025",
    duration: "2 months",
    kind: "startup",
    summary:
      "Led a data team and automated the collection, cleaning and normalisation of marketing data, then shipped a full-stack service that made that data measurably more reliable.",
    highlights: [
      {
        name: "Marketing data automation",
        description:
          "Designed and led the automation of collection, cleaning and normalisation of marketing data using web scraping, replacing manual work with a repeatable pipeline.",
      },
      {
        name: "Multi-level email validation service",
        description:
          "Built a full-stack application validating email addresses across several levels — syntax, DNS/MX resolution and SMTP probing — raising data reliability for the marketing team.",
      },
    ],
    keywords: [
      "Team Leadership",
      "Data Automation",
      "Web Scraping",
      "Data Quality",
      "API Design",
    ],
    stack: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Web Scraping",
      "SMTP",
      "Docker",
      "Git",
    ],
  },
];
