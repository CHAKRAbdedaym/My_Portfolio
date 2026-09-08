import { personal } from "@/data/personal";

/**
 * Resolves the canonical public URL of the site.
 *
 * Order of preference:
 *   1. NEXT_PUBLIC_SITE_URL           — set it yourself for a custom domain
 *   2. VERCEL_PROJECT_PRODUCTION_URL  — injected automatically by Vercel
 *   3. http://localhost:3000          — local development fallback
 *
 * No environment variable is required for the site to work.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const siteConfig = {
  url: siteUrl,
  title: `${personal.name} | Data & AI Engineer`,
  shortTitle: personal.name,
  description:
    "Engineering student specialising in Artificial Intelligence, Software Engineering, Cloud and DevOps — building intelligent, scalable and production-ready systems. Open to a PFE internship from February 2027.",
  locale: "en_US",
  keywords: [
    "Abdedaym Chakra",
    "Data Engineer",
    "AI Engineer",
    "Machine Learning",
    "DevOps Engineer",
    "Cloud Engineer",
    "Full-Stack Developer",
    "Software Engineer",
    "PFE Internship",
    "FST Marrakech",
    "Morocco",
    "Next.js",
    "Spring Boot",
    "Kubernetes",
    "Python",
  ],
} as const;
