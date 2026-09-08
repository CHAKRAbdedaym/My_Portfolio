import type { Achievement } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ACHIEVEMENTS & ACTIVITIES
 * ─────────────────────────────────────────────────────────────────────────────
 *  `featured: true` renders the entry as the large highlighted achievement.
 *  `icon` accepts: "trophy" | "users" | "sparkles" | "flag"
 *
 *  Only add a ranking here if you actually placed — participation is stated
 *  as participation. See guide.txt → section 12.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const achievements: Achievement[] = [
  {
    id: "ramadania",
    title: "RAMADANIA Hackathon",
    organisation: "RAMADANIA",
    period: "2025",
    badge: "3rd Place",
    description:
      "Placed third with AgriSure AI — a satellite-imagery platform using Sentinel-2 and NDVI analysis to let insurers assess crop health and automate claim recommendations.",
    featured: true,
    icon: "trophy",
  },
  {
    id: "club-irisi",
    title: "Club IRISI — Design & Management Cell Lead",
    organisation: "Club IRISI, FST Marrakech",
    period: "2024 — 2026",
    description:
      "Responsible for the Design & Management cell: organising events, coordinating the team and driving community involvement across the student engineering body.",
    featured: false,
    icon: "users",
  },
  {
    id: "competitions",
    title: "SkillUp IT 2026 & DEV4DAYS",
    organisation: "Inter-school competitions",
    period: "2026",
    description:
      "Competed in SkillUp IT 2026 and DEV4DAYS — time-boxed engineering competitions built around shipping a working system under pressure.",
    featured: false,
    icon: "flag",
  },
];
