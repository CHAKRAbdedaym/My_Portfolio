import {
  Brain,
  Cloud,
  Code2,
  Database,
  Flag,
  Github,
  LayoutTemplate,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Server,
  Sparkles,
  Trophy,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Single mapping from the string keys used in `src/data/*` to real icon
 * components. Data files stay serialisable and free of React imports.
 */
export const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  phone: Phone,
  map: MapPin,
  brain: Brain,
  server: Server,
  layout: LayoutTemplate,
  cloud: Cloud,
  database: Database,
  wrench: Wrench,
  code: Code2,
  trophy: Trophy,
  users: Users,
  sparkles: Sparkles,
  flag: Flag,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof iconMap;

/** Safe lookup — returns a sensible default rather than crashing. */
export function getIcon(key: string): LucideIcon {
  return iconMap[key as IconKey] ?? Code2;
}

/**
 * Accent colour classes per skill domain, kept as complete class strings so
 * Tailwind's scanner can always see them.
 */
export const accentStyles = {
  blue: {
    text: "text-[var(--accent)]",
    glow: "bg-[var(--accent)]",
    border: "group-hover:border-[var(--accent-line)]",
  },
  indigo: {
    text: "text-[var(--accent-2)]",
    glow: "bg-[var(--accent-2)]",
    border: "group-hover:border-[var(--accent-line)]",
  },
  cyan: {
    text: "text-[var(--accent-3)]",
    glow: "bg-[var(--accent-3)]",
    border: "group-hover:border-[var(--accent-line)]",
  },
  violet: {
    text: "text-[var(--accent-2)]",
    glow: "bg-[var(--accent-2)]",
    border: "group-hover:border-[var(--accent-line)]",
  },
} as const;
