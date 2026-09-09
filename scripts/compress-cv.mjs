/**
 * Compress the CV for the web.
 *
 *     npm run cv
 *
 * Run this after every new CV export. It is designed around how the CV is
 * actually produced: recompiled in a LaTeX editor and exported wherever is
 * convenient — often straight into `public/documents/`, which silently
 * replaces the compressed copy with a 2 MB one.
 *
 * So rather than insisting on a particular export location, this script looks
 * at `public/documents/Abdedaym-Chakra-CV.pdf`: if it is large, it is a fresh
 * export, and it gets promoted to `source/` before being compressed back into
 * place. Exporting to `source/` directly works too.
 *
 * A LaTeX CV carrying one photo compresses from around 2 MB to around 53 KB
 * with no visible change — only the embedded photo is re-encoded. The text,
 * layout and hyperlinks are unaffected, and this script verifies that by
 * comparing the extracted text before and after.
 *
 * Requires ghostscript (`gs`), and poppler (`pdftotext`) for the verification
 * step. Both are normal Linux packages:
 *
 *     sudo dnf install ghostscript poppler-utils      # Fedora
 *     sudo apt install ghostscript poppler-utils      # Debian / Ubuntu
 */

import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  renameSync,
  statSync,
} from "node:fs";

const SERVED = "public/documents/Abdedaym-Chakra-CV.pdf";
const SOURCE = "source/Abdedaym-Chakra-CV-source.pdf";
const TEMP = "public/documents/.cv-compressed.tmp.pdf";

/** Above this, the file in public/ is an uncompressed export, not our output. */
const FRESH_EXPORT_THRESHOLD = 500 * 1024;

const KB = 1024;
const fmt = (bytes) =>
  bytes > KB * KB
    ? `${(bytes / KB / KB).toFixed(2)} MB`
    : `${Math.round(bytes / KB)} KB`;

const sizeOf = (file) => {
  try {
    return statSync(file).size;
  } catch {
    return 0;
  }
};

const has = (command) => {
  try {
    execFileSync("which", [command], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};

function fail(message) {
  console.error(`\nCV compression failed: ${message}\n`);
  process.exit(1);
}

/* -------------------------------------------------------------------------- */

if (!has("gs")) {
  fail(
    "ghostscript is not installed.\n" +
      "  Fedora:        sudo dnf install ghostscript\n" +
      "  Debian/Ubuntu: sudo apt install ghostscript",
  );
}

mkdirSync("source", { recursive: true });

/* 1. Adopt a fresh export sitting in public/ as the new source. */
const servedSize = sizeOf(SERVED);

if (servedSize > FRESH_EXPORT_THRESHOLD) {
  console.log(
    `Found a fresh ${fmt(servedSize)} export in public/documents/ — promoting it to source/.`,
  );
  copyFileSync(SERVED, SOURCE);
} else if (!existsSync(SOURCE)) {
  fail(
    `no CV to compress.\n` +
      `  Put your exported CV at ${SOURCE} (or at ${SERVED}) and run this again.`,
  );
}

const sourceSize = sizeOf(SOURCE);

/* 2. Compress. */
console.log(`Compressing ${SOURCE} (${fmt(sourceSize)}) ...`);

execFileSync(
  "gs",
  [
    "-sDEVICE=pdfwrite",
    "-dCompatibilityLevel=1.5",
    "-dPDFSETTINGS=/ebook",
    "-dNOPAUSE",
    "-dQUIET",
    "-dBATCH",
    "-dDetectDuplicateImages=true",
    `-sOutputFile=${TEMP}`,
    SOURCE,
  ],
  { stdio: "inherit" },
);

/* 3. Verify the text survived, so a broken compression can never be shipped. */
if (has("pdftotext")) {
  /*
   * Whitespace is normalised before comparing. `pdftotext -layout` pads
   * columns using measured glyph positions, and re-encoding shifts those by a
   * fraction of a point — enough to change the number of spaces between two
   * columns without a single character of content differing. Comparing the
   * words still catches what actually matters: dropped, garbled or reordered
   * text.
   */
  const words = (file) =>
    execFileSync("pdftotext", ["-layout", file, "-"], {
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
    })
      .replace(/\s+/g, " ")
      .trim();

  if (words(SOURCE) !== words(TEMP)) {
    fail(
      "the compressed PDF's text does not match the source. Nothing was replaced.\n" +
        `  Inspect it yourself:  diff <(pdftotext -layout ${SOURCE} -) <(pdftotext -layout ${TEMP} -)`,
    );
  }
  console.log("Text verified identical to the source.");
} else {
  console.log(
    "pdftotext not found — skipping the text verification step (install poppler-utils to enable it).",
  );
}

/* 4. Swap it in. */
renameSync(TEMP, SERVED);

const finalSize = sizeOf(SERVED);
const saved = Math.round((1 - finalSize / sourceSize) * 100);

console.log(
  `\n  source : ${SOURCE}  ${fmt(sourceSize)}\n` +
    `  served : ${SERVED}  ${fmt(finalSize)}   (${saved}% smaller)\n\n` +
    `Done. Commit both files.\n`,
);
