import type { Certification } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CERTIFICATIONS
 * ─────────────────────────────────────────────────────────────────────────────
 *  Only real, earned credentials belong here. Credential IDs and verification
 *  links are intentionally omitted rather than invented — add them yourself if
 *  you want them displayed.
 *
 *  See guide.txt → section 12.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const certifications: Certification[] = [
  {
    id: "oracle-oca",
    name: "Oracle Certified Associate",
    issuer: "Oracle",
    year: "2025",
    category: "Java & Applied AI",
    tracks: [
      "Java 17",
      "Java 21",
      "AI Foundations",
      "Digital Assistant Developer",
    ],
  },
];
