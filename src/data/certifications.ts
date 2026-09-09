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
    id: "aws-cloud-practitioner-essentials",
    name: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    year: "2025",
    category: "Cloud Fundamentals",
    /*
     * Left empty on purpose. The CV lists "Java 17, Java 21, AI Foundations"
     * in this block, but those are Oracle tracks left over from the previous
     * credential — they are not part of an AWS course, and listing them here
     * would misattribute them. Add real module names if you want them shown.
     */
    tracks: [],
  },
];
