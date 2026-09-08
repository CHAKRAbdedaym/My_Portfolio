export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "portfolio-theme";

/**
 * Inline script injected into <head> and executed before first paint.
 *
 * It does two things, both of which must happen before anything is painted:
 *
 *  1. Applies the saved (or system) theme to <html>, so there is never a flash
 *     of the wrong theme.
 *  2. Adds a `js` class to <html>. Entrance animations are scoped to `.js`,
 *     which means the page's content is fully visible in the raw HTML and only
 *     becomes animatable once we know scripting is available. Without this the
 *     whole page would ship at `opacity: 0` and be invisible to anyone (or
 *     anything) that does not run JavaScript.
 *
 * Wrapped in try/catch because localStorage throws outright in some privacy
 * modes — the site then simply stays on the dark default.
 */
export const themeInitScript = `
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme;
  } catch (e) {
    root.classList.remove("light");
  }
})();
`.trim();
