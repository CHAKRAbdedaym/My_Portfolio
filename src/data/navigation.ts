import type { NavItem } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  NAVIGATION
 * ─────────────────────────────────────────────────────────────────────────────
 *  `id` must match the `id` attribute of the corresponding <section> in
 *  `src/app/page.tsx`. Reorder or rename freely — the nav, the scroll-spy
 *  and the ⌘K command palette all read from this single list.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const navItems: NavItem[] = [
  { id: "about", label: "About", index: "01" },
  { id: "experience", label: "Experience", index: "02" },
  { id: "projects", label: "Projects", index: "03" },
  { id: "skills", label: "Skills", index: "04" },
  { id: "achievements", label: "Achievements", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
];
