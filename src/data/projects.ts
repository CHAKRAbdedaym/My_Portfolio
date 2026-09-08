import type { Project } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PROJECTS
 * ─────────────────────────────────────────────────────────────────────────────
 *  Each project is presented as a short engineering case study.
 *
 *  • Exactly ONE project should have `featured: true` — it gets the large
 *    hero-style card at the top of the projects section.
 *  • `visual` picks the generated abstract artwork for the card. Available
 *    values: "satellite" | "commerce" | "orchestration" | "agent" |
 *    "architecture" | "vision".
 *  • `image` is OPTIONAL. Drop a screenshot in `public/images/projects/` and
 *    reference it here (e.g. "/images/projects/agrisure.png"). If the file is
 *    missing the generated visual is shown instead — nothing ever breaks.
 *  • `links` are OPTIONAL. Buttons only appear for links you actually provide,
 *    so there are never dead links on the site.
 *
 *  See guide.txt → sections 6 and 9.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const projects: Project[] = [
  {
    id: "agrisure-ai",
    name: "AgriSure AI",
    subtitle: "Satellite-driven agricultural monitoring for insurers",
    domain: "AI & Geospatial",
    status: "Award Winner",
    year: "2025",
    award: "3rd Place — RAMADANIA Hackathon",
    summary:
      "A web platform that lets insurance companies monitor agricultural operations from space, using Sentinel-2 imagery and NDVI analysis to assess crop health and automate claim recommendations.",
    challenge:
      "Agricultural insurers assess crop damage through manual field visits — slow, expensive, hard to scale across a region, and difficult to defend objectively when a claim is contested. Verifying a single claim can take days, and the evidence trail is largely subjective.",
    solution:
      "AgriSure AI replaces the field visit with satellite evidence. Parcels are drawn on an interactive map, Sentinel-2 imagery is pulled through the Copernicus API for the relevant time window, and NDVI is computed per parcel to quantify vegetation health. Trends over time reveal stress and degradation, and the platform turns that signal into an automated claim recommendation an adjuster can review.",
    architecture: [
      "Spring Boot REST API with Spring Security handling authentication and role-based access for insurer accounts",
      "Copernicus / Sentinel-2 imagery ingestion pipeline scoped to the parcel geometry and observation window",
      "NDVI computation over the retrieved spectral bands to produce a per-parcel vegetation health index",
      "Angular front end with Leaflet for parcel mapping and Chart.js for NDVI time-series visualisation",
      "PostgreSQL for parcels, policies and analysis history; Docker for reproducible environments",
    ],
    features: [
      "Interactive map for drawing and managing insured agricultural parcels",
      "Sentinel-2 satellite imagery retrieval through the Copernicus API",
      "NDVI-based crop health evaluation with time-series trend charts",
      "Automated claim recommendations derived from vegetation health signals",
      "Secured multi-role access for insurer staff via Spring Security",
    ],
    impact:
      "Awarded 3rd place at the RAMADANIA hackathon. Demonstrates an end-to-end path from raw satellite data to a decision an insurance analyst can act on.",
    stack: [
      "Spring Boot",
      "Spring Security",
      "Angular",
      "PostgreSQL",
      "Leaflet",
      "Chart.js",
      "Sentinel-2 API",
      "NDVI",
      "Docker",
    ],
    visual: "satellite",
    // image: "/images/projects/agrisure.png",
    links: {
      // github: "https://github.com/CHAKRAbdedaym/...",
      // demo: "https://...",
    },
    featured: true,
  },
  {
    id: "ecommerce-platform",
    name: "E-Commerce Platform",
    subtitle: "A complete commerce system running in production",
    domain: "Full-Stack & Cloud",
    status: "Production",
    year: "2025",
    summary:
      "A full-stack e-commerce application covering the entire commercial loop — catalogue, orders, users, payments and a secured administration dashboard — deployed through an automated CI/CD workflow.",
    challenge:
      "A working shop front is the easy part. The hard part is everything around it: real payments that must not fail, an admin surface that cannot be reachable by customers, media that stays fast under load, and a release process safe enough to deploy without fear.",
    solution:
      "Built on Next.js 14 with the App Router and a Prisma-modelled PostgreSQL database on Supabase. Authentication and session handling go through NextAuth with a role boundary separating customers from administrators, Stripe handles the payment flow, and Cloudinary serves optimised product media. Every push runs through GitHub Actions before Vercel promotes the build.",
    architecture: [
      "Next.js 14 App Router with React Server Components and server actions for data mutations",
      "Prisma ORM over a Supabase-hosted PostgreSQL database with typed, migration-driven schema changes",
      "NextAuth session management with a role boundary protecting every administration route",
      "Stripe payment integration for the checkout and order confirmation flow",
      "Cloudinary for product media storage and on-the-fly image optimisation",
      "GitHub Actions CI pipeline feeding Vercel deployments; Docker for local parity",
    ],
    features: [
      "Product catalogue with full administrative CRUD",
      "Order lifecycle management and order history",
      "User accounts, authentication and role-based authorisation",
      "Secured administration dashboard separated from the storefront",
      "Stripe checkout with a complete payment flow",
      "Automated CI/CD from commit to production deployment",
    ],
    impact:
      "A live production application — the project where architecture, payments, security and deployment discipline all had to hold up simultaneously.",
    stack: [
      "Next.js 14",
      "TypeScript",
      "React",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "Tailwind CSS",
      "Stripe",
      "Cloudinary",
      "NextAuth",
      "Docker",
      "GitHub Actions",
      "Vercel",
    ],
    visual: "commerce",
    links: {},
    featured: false,
  },
  {
    id: "mindkeeper",
    name: "Mindkeeper",
    subtitle: "An LLM assistant that organises thought in natural language",
    domain: "AI & Automation",
    status: "Personal Project",
    year: "2025",
    summary:
      "A Telegram-based AI assistant that captures notes, ideas and tasks written in plain language, classifies them with an LLM, and makes them retrievable through vector search.",
    challenge:
      "Ideas arrive at inconvenient moments and note-taking apps demand structure at exactly the wrong time — choose a notebook, pick a tag, write a title. That friction is why most captured thoughts are never retrieved again.",
    solution:
      "Mindkeeper removes the structure step entirely. Anything sent to a Telegram bot is classified by LLaMA 3.3 running on Groq into notes, ideas or tasks, then stored with vector embeddings in PostgreSQL so it can be found later by meaning rather than by exact keyword. n8n orchestrates the workflow between the bot, the model and the database, with webhooks exposed through a Cloudflare Tunnel.",
    architecture: [
      "Telegram Bot API as the capture surface — no app to install, no UI to learn",
      "n8n workflow orchestration wiring the bot, the LLM and the datastore together",
      "NLP classification through LLaMA 3.3 served by Groq for low-latency inference",
      "PostgreSQL with vector search enabling semantic retrieval of stored entries",
      "Webhooks exposed securely via Cloudflare Tunnel; the whole stack containerised with Docker",
    ],
    features: [
      "Zero-friction capture — write a thought, the system decides what it is",
      "Automatic classification into notes, ideas and tasks",
      "Semantic retrieval through vector search rather than keyword matching",
      "Event-driven automation flows built and versioned in n8n",
      "Self-hostable, fully containerised deployment",
    ],
    impact:
      "The project that most directly expresses how I think about AI: a model is a component inside a system, not the product itself.",
    stack: [
      "Python",
      "n8n",
      "LLaMA 3.3",
      "Groq",
      "PostgreSQL",
      "Vector Search",
      "Docker",
      "Telegram Bot API",
      "Cloudflare Tunnel",
    ],
    visual: "agent",
    links: {},
    featured: false,
  },
  {
    id: "taskmaster-saas",
    name: "TaskMaster SaaS",
    subtitle: "Multi-tenant task management with a production delivery chain",
    domain: "SaaS & DevOps",
    status: "Personal Project",
    year: "2025",
    summary:
      "A secure multi-tenant SaaS platform for task management, built to practise the parts of software that only matter at scale: tenant data isolation, containerised delivery and monitoring.",
    challenge:
      "Multi-tenancy is where a straightforward CRUD application becomes genuinely difficult. One missed filter and one tenant reads another tenant's data — a failure that is silent, catastrophic, and impossible to walk back.",
    solution:
      "Tenant isolation is enforced at the persistence layer rather than trusted to individual queries, with JWT authentication carrying tenant identity through every request. The whole platform is containerised and deployed to Kubernetes through a Jenkins pipeline, with Grafana dashboards making runtime behaviour observable instead of assumed.",
    architecture: [
      "Java 21 + Spring Boot backend exposing a REST API with JWT-based authentication",
      "Tenant isolation enforced at the data-access layer via JPA/Hibernate over PostgreSQL",
      "Angular 19 front end consuming the API with tenant-scoped session handling",
      "Docker images built and promoted by a Jenkins CI/CD pipeline",
      "Kubernetes deployment with Grafana dashboards for runtime monitoring",
    ],
    features: [
      "Multi-tenant workspaces with strict data isolation between tenants",
      "JWT authentication and authorisation across the API surface",
      "Task lifecycle management within each tenant workspace",
      "Automated build and deployment pipeline through Jenkins",
      "Containerised Kubernetes deployment with monitoring dashboards",
    ],
    impact:
      "An end-to-end exercise in enterprise architecture — from tenant-isolated data modelling to orchestrated deployment and observability.",
    stack: [
      "Java 21",
      "Spring Boot",
      "Angular 19",
      "PostgreSQL",
      "JPA / Hibernate",
      "JWT",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Grafana",
    ],
    visual: "orchestration",
    links: {},
    featured: false,
  },
  {
    id: "ai-system-designer",
    name: "AI System Designer",
    subtitle: "Turning written requirements into architecture analysis",
    domain: "AI & Backend Architecture",
    status: "Personal Project",
    year: "2025",
    summary:
      "A SaaS application that reads a plain-text description of a system and automatically generates an architecture analysis, processed asynchronously through a Celery and Redis pipeline.",
    challenge:
      "Architecture analysis is slow, expensive and inconsistent early in a project — exactly when the decisions being made are hardest to reverse. It is also a workload that cannot run inside a web request: generation takes far longer than any reasonable HTTP timeout.",
    solution:
      "A Django REST Framework API accepts a textual system description and immediately hands the work to a Celery worker via Redis, returning a job handle instead of blocking. Structured relational data lives in PostgreSQL while the generated analysis documents live in MongoDB, each store used for the shape of data it actually suits.",
    architecture: [
      "Django + Django REST Framework REST API as the synchronous entry point",
      "Celery workers with a Redis broker handling long-running generation asynchronously",
      "PostgreSQL for relational entities — users, projects, job state",
      "MongoDB for the generated architecture documents and their revisions",
      "Fully containerised with Docker for reproducible multi-service local development",
    ],
    features: [
      "Architecture analysis generated from a natural-language system description",
      "Non-blocking job submission with asynchronous background processing",
      "Polyglot persistence — relational and document stores, each where it fits",
      "REST API designed for integration into other tooling",
      "Multi-service containerised environment",
    ],
    impact:
      "A study in distributed backend design: queues, workers, brokers and polyglot persistence working together behind a deliberately simple API.",
    stack: [
      "Python",
      "Django",
      "Django REST Framework",
      "Celery",
      "Redis",
      "PostgreSQL",
      "MongoDB",
      "Docker",
    ],
    visual: "architecture",
    links: {},
    featured: false,
  },
  {
    id: "fstracker",
    name: "FSTracker",
    subtitle: "Facial-recognition attendance for university lecture halls",
    domain: "Computer Vision & Microservices",
    status: "In Development",
    year: "2026",
    summary:
      "A university attendance system that replaces roll call with facial recognition, splitting the AI workload into a dedicated Python microservice behind a Spring Boot API.",
    challenge:
      "Manual attendance in a large lecture hall consumes teaching time and produces records that are easy to falsify. Automating it means running computer vision reliably without coupling a heavy AI runtime to the core application.",
    solution:
      "The system is split along its natural seam: a Spring Boot service owns identity, authorisation and attendance records, while a separate Python FastAPI microservice owns face detection and recognition. The two communicate over HTTP, so the AI component can be scaled, replaced or retrained without touching the business layer.",
    architecture: [
      "React + TypeScript front end for session management and attendance review",
      "Spring Boot API owning users, sessions and attendance records with JWT authentication",
      "Dedicated Python FastAPI microservice performing face detection and recognition",
      "PostgreSQL as the system of record for enrolment and attendance history",
    ],
    features: [
      "Automated attendance capture through facial recognition",
      "Clean service boundary between business logic and the AI runtime",
      "JWT-secured API with role separation between staff and administrators",
      "Attendance history and session review interface",
    ],
    impact:
      "Currently in development. It is the project where computer vision, microservice boundaries and full-stack engineering meet.",
    stack: [
      "React",
      "TypeScript",
      "Spring Boot",
      "Java",
      "JWT",
      "PostgreSQL",
      "Python",
      "FastAPI",
      "Computer Vision",
    ],
    visual: "vision",
    links: {},
    featured: false,
  },
];

/** The single large case-study card at the top of the projects section. */
export const featuredProject = projects.find((project) => project.featured);

/** Everything else, rendered in the premium card grid. */
export const secondaryProjects = projects.filter((project) => !project.featured);
