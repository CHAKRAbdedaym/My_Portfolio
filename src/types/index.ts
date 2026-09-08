/**
 * Shared type definitions for every piece of portfolio content.
 *
 * These types are what make `src/data/*` safe to edit: if you mistype a field
 * name or forget a required one, TypeScript tells you immediately instead of
 * the site breaking silently in production.
 */

import type { LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                  Personal                                  */
/* -------------------------------------------------------------------------- */

export type SocialLink = {
  /** Label announced to screen readers and shown in tooltips. */
  label: string;
  /** Full URL, or a `mailto:` link. */
  href: string;
  /** Which icon to render — mapped in `src/lib/icons.ts`. */
  icon: "github" | "linkedin" | "mail" | "phone" | "map";
  /** Short text shown next to the icon in the contact section. */
  display: string;
};

export type Personal = {
  name: string;
  /** Primary professional positioning, e.g. "Aspiring Data & AI Engineer". */
  title: string;
  /** The supporting disciplines rendered under the title. */
  disciplines: string[];
  /** One-sentence brand statement. */
  tagline: string;
  /** Hero headline, split so the accent-coloured part can be styled. */
  headline: { lead: string; accent: string; trail: string };
  /** Two short paragraphs used in the hero and the about section. */
  heroSummary: string;
  about: string[];
  location: string;
  email: string;
  phone: string;
  /** Set to false to hide the phone number anywhere it would be rendered. */
  showPhone: boolean;
  availability: {
    label: string;
    detail: string;
  };
  socials: SocialLink[];
  /** Path (inside /public) to the CV PDF served by the "Download CV" button. */
  cvPath: string;
  /** Filename the browser suggests when the CV is downloaded. */
  cvFileName: string;
  /** Path (inside /public) to the profile photo. Missing file → graceful fallback. */
  profileImage: string;
  /** Things currently being explored, shown in the About panel. */
  currentFocus: { label: string; detail: string }[];
};

/* -------------------------------------------------------------------------- */
/*                                 Experience                                 */
/* -------------------------------------------------------------------------- */

export type ExperienceHighlight = {
  /** Sub-project or workstream name. */
  name: string;
  description: string;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  /** Sorting/label helper, e.g. "2 months". */
  duration: string;
  /** `enterprise` renders the elevated, highlighted treatment. */
  kind: "enterprise" | "startup";
  summary: string;
  /** Distinct workstreams delivered during the role. */
  highlights: ExperienceHighlight[];
  /** Short capability keywords surfaced as accent chips. */
  keywords: string[];
  stack: string[];
};

/* -------------------------------------------------------------------------- */
/*                                  Education                                 */
/* -------------------------------------------------------------------------- */

export type Education = {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  /** Optional one-line note (honours, focus area, …). */
  note?: string;
};

/* -------------------------------------------------------------------------- */
/*                                  Projects                                  */
/* -------------------------------------------------------------------------- */

export type ProjectStatus =
  | "Production"
  | "Award Winner"
  | "Personal Project"
  | "In Development";

/** Selects the generated abstract visual rendered on the project card. */
export type ProjectVisualKind =
  | "commerce"
  | "satellite"
  | "orchestration"
  | "agent"
  | "architecture"
  | "vision";

export type Project = {
  id: string;
  name: string;
  /** One-line positioning shown under the title. */
  subtitle: string;
  /** Domain tag, e.g. "AI & Geospatial". */
  domain: string;
  status: ProjectStatus;
  year: string;
  /** Award or distinction — rendered as a badge when present. */
  award?: string;
  /** 1–2 sentence card description. */
  summary: string;
  /** Case-study content shown in the project detail panel. */
  challenge: string;
  solution: string;
  /** Architecture / engineering notes, one bullet per line. */
  architecture: string[];
  /** Product-facing capabilities, one bullet per line. */
  features: string[];
  /** Measurable or qualitative outcome. */
  impact: string;
  stack: string[];
  /** Which generated visual to render. */
  visual: ProjectVisualKind;
  /**
   * Optional screenshot inside /public/images/projects/.
   * If the file is absent the generated visual is shown instead — the site
   * never renders a broken image.
   */
  image?: string;
  links: {
    github?: string;
    demo?: string;
  };
  /** Exactly one project should have this set to true. */
  featured: boolean;
};

/* -------------------------------------------------------------------------- */
/*                                   Skills                                   */
/* -------------------------------------------------------------------------- */

export type SkillDomain = {
  id: string;
  /** Domain name, e.g. "AI & Machine Learning". */
  name: string;
  /** One line describing how this domain is used in practice. */
  description: string;
  /** Icon key mapped in `src/lib/icons.ts`. */
  icon:
    | "brain"
    | "server"
    | "layout"
    | "cloud"
    | "database"
    | "wrench"
    | "code";
  /** Accent used for this domain's chips and glow. */
  accent: "blue" | "indigo" | "cyan" | "violet";
  items: string[];
};

export type Language = {
  name: string;
  level: string;
  /** 1–3, used only for a discreet three-dot indicator. */
  strength: 1 | 2 | 3;
};

/* -------------------------------------------------------------------------- */
/*                        Achievements & certifications                       */
/* -------------------------------------------------------------------------- */

export type Achievement = {
  id: string;
  title: string;
  /** Organisation, event or club. */
  organisation: string;
  period: string;
  description: string;
  /** Rendered as the hero achievement when true. */
  featured: boolean;
  /** Short award label, e.g. "3rd Place". */
  badge?: string;
  icon: "trophy" | "users" | "sparkles" | "flag";
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  year: string;
  /** Individual tracks or exams covered by the credential. */
  tracks: string[];
  category: string;
};

/* -------------------------------------------------------------------------- */
/*                                 Navigation                                 */
/* -------------------------------------------------------------------------- */

export type NavItem = {
  /** DOM id of the target section (without `#`). */
  id: string;
  label: string;
  /** Two-digit index shown in the monospace nav rail. */
  index: string;
};

export type IconName =
  | SocialLink["icon"]
  | SkillDomain["icon"]
  | Achievement["icon"];

export type IconMap = Record<string, LucideIcon>;
