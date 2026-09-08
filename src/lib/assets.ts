import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Whether a file exists inside `public/`.
 *
 * SERVER ONLY — import this from server components only (it touches `fs`).
 *
 * The point is that optional assets (the profile photo, project screenshots,
 * the CV) can simply be absent. Checking at build time means a missing file
 * renders the designed fallback instead of firing a request that 404s and
 * logs an error in the visitor's console.
 *
 * @param publicPath a path as written in the data files, e.g. "/images/profile/profile.jpg"
 */
export function publicFileExists(publicPath: string): boolean {
  if (!publicPath) return false;

  // Normalise and refuse to escape the public directory.
  const relative = publicPath.replace(/^\/+/, "");
  const publicDir = path.join(process.cwd(), "public");
  const resolved = path.resolve(publicDir, relative);

  if (!resolved.startsWith(publicDir + path.sep)) return false;

  try {
    return existsSync(resolved);
  } catch {
    return false;
  }
}
