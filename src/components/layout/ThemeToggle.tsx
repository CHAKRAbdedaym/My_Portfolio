"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

/**
 * Dark/light switch.
 *
 * Both icons are rendered and cross-faded rather than swapped, so the control
 * never changes size and there is no icon pop on first paint.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, ready } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={cn(
        "relative grid h-9 w-9 place-items-center rounded-full border border-line",
        "bg-surface text-fg-muted transition-colors duration-200",
        "hover:border-[var(--accent-line)] hover:text-[var(--accent-hi)]",
        className,
      )}
    >
      <Sun
        aria-hidden="true"
        className={cn(
          "absolute h-[1.05rem] w-[1.05rem] transition-all duration-300",
          ready && !isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-50 -rotate-90 opacity-0",
        )}
      />
      <Moon
        aria-hidden="true"
        className={cn(
          "absolute h-[1.05rem] w-[1.05rem] transition-all duration-300",
          ready && isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-50 rotate-90 opacity-0",
        )}
      />
    </button>
  );
}
