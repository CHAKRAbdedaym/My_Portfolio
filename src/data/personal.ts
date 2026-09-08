import type { Personal } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  YOUR PERSONAL INFORMATION
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything about *you* lives in this one file: name, title, headline, bio,
 *  email, social links, CV path and profile photo.
 *
 *  Edit the values below, save the file, and the whole site updates.
 *  See guide.txt → section 8 for a walkthrough.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const personal: Personal = {
  name: "Abdedaym Chakra",

  /** Primary positioning. This is the single most important line on the site. */
  title: "Aspiring Data & AI Engineer",

  /** Supporting disciplines, rendered as a separated list under the title. */
  disciplines: ["Software Engineering", "Cloud", "DevOps"],

  tagline:
    "I build intelligent, scalable and production-ready systems at the intersection of Artificial Intelligence, Software Engineering, Cloud and DevOps.",

  /**
   * The hero headline is split into three parts so the middle one can carry
   * the gradient accent. Keep each part short.
   */
  headline: {
    lead: "Engineering intelligent systems",
    accent: "from data to deployment",
    trail: ".",
  },

  heroSummary:
    "Final-year engineering student in Computer Networks & Information Systems at FST Marrakech. I design AI-driven products, architect backend systems, and ship them with containers, CI/CD and observability.",

  about: [
    "I am a final-year State Engineering student in Computer Networks & Information Systems at the Faculty of Sciences and Techniques, Marrakech. My work sits deliberately at the boundary between artificial intelligence and the engineering discipline required to make it survive production.",
    "Over two internships I have digitalised enterprise processes for Morocco's national electricity operator — building a public procurement platform and a bilingual OCR document management system — and led a data team that automated marketing data collection and built a multi-level email validation service.",
    "Outside of internships I build systems end to end: a production e-commerce platform, a multi-tenant SaaS deployed on Kubernetes, an LLM-powered personal assistant, and a satellite-imagery analysis platform that placed 3rd at the RAMADANIA hackathon.",
  ],

  location: "Marrakech, Morocco",
  email: "chakraabdedaym@gmail.com",
  phone: "+212 619-242938",

  /**
   * Public portfolios usually omit a phone number — email and LinkedIn are
   * enough, and a public number attracts spam. Flip this to `true` if you
   * want the number displayed in the contact section.
   */
  showPhone: false,

  availability: {
    label: "Open to a Final Year Internship (PFE)",
    detail: "Available from February 2027",
  },

  socials: [
    {
      label: "GitHub",
      href: "https://github.com/CHAKRAbdedaym",
      icon: "github",
      display: "CHAKRAbdedaym",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/chakra-abdedaym",
      icon: "linkedin",
      display: "chakra-abdedaym",
    },
    {
      label: "Email",
      href: "mailto:chakraabdedaym@gmail.com",
      icon: "mail",
      display: "chakraabdedaym@gmail.com",
    },
  ],

  /**
   * The CV file. Put your PDF at `public/documents/` using exactly this name,
   * or change the name here to match your file.
   */
  cvPath: "/documents/Abdedaym-Chakra-CV.pdf",
  cvFileName: "Abdedaym-Chakra-CV.pdf",

  /**
   * Profile photo. Put a square image at `public/images/profile/profile.jpg`.
   * If the file does not exist, an elegant monogram fallback is shown instead
   * — the site never displays a broken image.
   */
  profileImage: "/images/profile/profile.jpg",

  currentFocus: [
    {
      label: "Applied AI",
      detail: "RAG pipelines, AI agents and MCP-based tooling",
    },
    {
      label: "Platform engineering",
      detail: "Kubernetes, Terraform and GitOps delivery",
    },
    {
      label: "Data systems",
      detail: "Ingestion, quality and vector search at scale",
    },
  ],
};

/** Convenience export used across the site. */
export const siteName = `${personal.name} — ${personal.title}`;
