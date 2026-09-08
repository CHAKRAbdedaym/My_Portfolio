"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Command, Github, Linkedin, Menu, X } from "lucide-react";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

import { navItems, personal } from "@/data";
import {
  useBodyScrollLock,
  useReducedMotion,
  useScrolled,
  useScrollSpy,
  useStableIds,
} from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { CommandPalette } from "./CommandPalette";
import { ThemeToggle } from "./ThemeToggle";

const SECTION_IDS = navItems.map((item) => item.id);

/**
 * Whether to label the palette shortcut ⌘K or Ctrl+K.
 *
 * Read through `useSyncExternalStore` rather than an effect: the server has no
 * user agent, so it renders the Ctrl label and the client corrects it during
 * hydration without a cascading render.
 */
const subscribeToNothing = (): (() => void) => () => {};
const detectMac = () => /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent);
const notMacOnServer = () => false;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const isMac = useSyncExternalStore(
    subscribeToNothing,
    detectMac,
    notMacOnServer,
  );

  const scrolled = useScrolled(16);
  const reduced = useReducedMotion();
  const ids = useStableIds(SECTION_IDS);
  const activeId = useScrollSpy(ids);

  useBodyScrollLock(menuOpen);

  /* ⌘K / Ctrl+K opens the palette from anywhere on the page. */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setMenuOpen(false);
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  /* Close the mobile menu when the viewport grows past the breakpoint. */
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      if (query.matches) setMenuOpen(false);
    };
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const jumpTo = useCallback(
    (id: string) => {
      setMenuOpen(false);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
      });
    },
    [reduced],
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "border-b border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
        )}
        style={{ height: "var(--nav-h)" }}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-full max-w-[80rem] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12"
        >
          {/* monogram / home */}
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
            }}
            className="group flex shrink-0 items-center gap-2.5 rounded-full"
            aria-label={`${personal.name} — back to top`}
          >
            <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-line bg-surface font-mono text-[0.8125rem] font-semibold text-fg transition-colors duration-300 group-hover:border-[var(--accent-line)] group-hover:text-[var(--accent-hi)]">
              AC
              <span className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_50%_120%,var(--glow),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-fg sm:block">
              {personal.name}
            </span>
          </a>

          {/* desktop section links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const active = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      jumpTo(item.id);
                    }}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "relative flex items-center rounded-full px-3.5 py-2 text-[0.8125rem] transition-colors duration-200",
                      active ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full border border-line bg-surface"
                        transition={
                          reduced
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 420, damping: 34 }
                        }
                      />
                    ) : null}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* actions */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
              className="hidden items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-3 pr-2 text-[0.8125rem] text-fg-muted transition-colors duration-200 hover:border-[var(--accent-line)] hover:text-fg md:flex"
            >
              <span>Search</span>
              <kbd className="flex items-center gap-1 rounded border border-line px-1.5 py-0.5 font-mono text-[0.625rem] text-fg-dim">
                {isMac ? (
                  <Command className="h-2.5 w-2.5" aria-hidden="true" />
                ) : (
                  <span>Ctrl</span>
                )}
                <span>K</span>
              </kbd>
            </button>

            <div className="hidden items-center gap-1 sm:flex">
              {personal.socials
                .filter((social) => social.icon !== "mail")
                .map((social) => (
                  <a
                    key={social.icon}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} — opens in a new tab`}
                    title={social.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-transparent text-fg-muted transition-colors duration-200 hover:border-line hover:bg-surface hover:text-fg"
                  >
                    {social.icon === "github" ? (
                      <Github className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
                    ) : (
                      <Linkedin className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
                    )}
                  </a>
                ))}
            </div>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-fg transition-colors duration-200 hover:border-[var(--accent-line)] lg:hidden"
            >
              {menuOpen ? (
                <X className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
              ) : (
                <Menu className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl lg:hidden"
            style={{ paddingTop: "var(--nav-h)" }}
          >
            <nav
              aria-label="Mobile"
              className="flex h-full flex-col justify-between overflow-y-auto px-6 pb-10 pt-6"
            >
              <ul className="flex flex-col">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={reduced ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: reduced ? 0 : 0.3,
                      delay: reduced ? 0 : 0.04 * index,
                    }}
                    className="border-b border-line"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        jumpTo(item.id);
                      }}
                      className={cn(
                        "flex items-baseline gap-4 py-4 text-2xl font-medium tracking-tight transition-colors",
                        activeId === item.id
                          ? "text-[var(--accent-hi)]"
                          : "text-fg hover:text-[var(--accent-hi)]",
                      )}
                    >
                      <span className="eyebrow tabular-nums">{item.index}</span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {personal.socials.map((social) => (
                  <a
                    key={social.icon}
                    href={social.href}
                    {...(social.href.startsWith("mailto:")
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="chip hover:border-[var(--accent-line)] hover:text-[var(--accent-hi)]"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}
