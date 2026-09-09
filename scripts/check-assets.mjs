/**
 * Pre-build asset sanity check.
 *
 * Runs automatically before `npm run build` (npm's `prebuild` hook), both
 * locally and on Vercel.
 *
 * Why this exists: the CV and the profile photo get replaced by hand, and it
 * is easy to drop an uncompressed export straight into `public/`. A 2 MB CV
 * still "works" — the button downloads, the build passes, nothing errors — so
 * the only symptom is a slow download for the one visitor who mattered. This
 * makes that visible at build time instead.
 *
 * It only ever WARNS. A missing or oversized asset must never break a
 * deployment.
 */

import { statSync } from "node:fs";
import path from "node:path";

const KB = 1024;

/** Each asset, with the size above which it is worth complaining about. */
const CHECKS = [
  {
    file: "public/documents/Abdedaym-Chakra-CV.pdf",
    label: "CV",
    warnOverBytes: 1000 * KB,
    advice:
      "Compress it — see source/README.md. A LaTeX CV with a photo should land around 50 KB.",
  },
  {
    file: "public/images/profile/profile.jpg",
    label: "Profile photo",
    warnOverBytes: 500 * KB,
    advice:
      "Resize to about 1100px wide and re-save at quality 90 — see source/README.md.",
    optional: true,
  },
];

const YELLOW = "\u001b[33m";
const DIM = "\u001b[2m";
const RESET = "\u001b[0m";

let warnings = 0;

for (const check of CHECKS) {
  const absolute = path.join(process.cwd(), check.file);
  let size;

  try {
    size = statSync(absolute).size;
  } catch {
    if (!check.optional) {
      warnings += 1;
      console.warn(
        `${YELLOW}! ${check.label} is missing:${RESET} ${check.file}\n` +
          `${DIM}  The download button will 404. See guide.txt section 7.${RESET}`,
      );
    }
    continue;
  }

  if (size > check.warnOverBytes) {
    warnings += 1;
    console.warn(
      `${YELLOW}! ${check.label} is ${(size / KB / KB).toFixed(2)} MB${RESET} ` +
        `${DIM}(${check.file})${RESET}\n` +
        `${DIM}  ${check.advice}${RESET}`,
    );
  }
}

if (warnings > 0) {
  console.warn(
    `${DIM}  ${warnings} asset warning(s). The build continues — these are not errors.${RESET}\n`,
  );
}
