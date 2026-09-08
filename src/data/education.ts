import type { Education } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EDUCATION
 * ─────────────────────────────────────────────────────────────────────────────
 *  Listed most-recent first. See guide.txt → section 10.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const education: Education[] = [
  {
    id: "engineering",
    degree: "State Engineering Degree",
    field: "Computer Networks & Information Systems (IRISI)",
    institution: "Faculty of Sciences and Techniques (FST)",
    location: "Marrakech",
    period: "2024 — 2027",
    note: "Final year — seeking a PFE internship from February 2027",
  },
  {
    id: "deust",
    degree: "DEUST",
    field: "Mathematics, Computer Science and Physics (MIP)",
    institution: "Faculty of Sciences and Techniques (FST)",
    location: "Errachidia",
    period: "2022 — 2024",
  },
  {
    id: "bac",
    degree: "Baccalaureate",
    field: "Physical Sciences",
    institution: "Lycée Qualifiant Assalam",
    location: "Tiznit",
    period: "2021 — 2022",
  },
];
