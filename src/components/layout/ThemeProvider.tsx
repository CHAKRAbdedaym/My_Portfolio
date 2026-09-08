"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

/* -------------------------------------------------------------------------- */
/*                         external store: the DOM itself                     */
/* -------------------------------------------------------------------------- */

/**
 * The `light` class on <html> is the single source of truth for the theme.
 *
 * It is written before React ever mounts (see `themeInitScript`), so rather
 * than duplicating it into React state and syncing with an effect — which
 * causes a cascading render on every load — we subscribe to the DOM directly.
 */
function subscribeToThemeClass(onStoreChange: () => void): () => void {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getThemeSnapshot = (): Theme =>
  document.documentElement.classList.contains("light") ? "light" : "dark";

/** The server cannot know the visitor's preference; dark is the default. */
const getServerThemeSnapshot = (): Theme => "dark";

/* `ready` flips to true only once the client has hydrated. */
const noopSubscribe = (): (() => void) => () => {};
const alwaysTrue = () => true;
const alwaysFalse = () => false;

/* -------------------------------------------------------------------------- */
/*                                  context                                   */
/* -------------------------------------------------------------------------- */

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  /** False during SSR and the first hydration pass. */
  ready: boolean;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
  ready: false,
});

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToThemeClass,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const ready = useSyncExternalStore(noopSubscribe, alwaysTrue, alwaysFalse);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next: Theme = root.classList.contains("light") ? "dark" : "light";

    // Mutating the class is what actually re-renders subscribers, via the
    // MutationObserver above. There is no React state to keep in sync.
    root.classList.toggle("light", next === "light");
    root.style.colorScheme = next;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode): the theme still applies for this
      // session, it simply will not persist across reloads.
    }
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme, ready }),
    [theme, toggleTheme, ready],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
