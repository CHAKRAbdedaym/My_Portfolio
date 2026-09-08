"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  FolderGit2,
  Github,
  Linkedin,
  Mail,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { navItems, personal, projects } from "@/data";
import {
  useBodyScrollLock,
  useCopyToClipboard,
  useFocusTrap,
  useReducedMotion,
} from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";

type Command = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Projects" | "Links" | "Actions";
  icon: ReactNode;
  keywords: string;
  run: () => void;
};

const ICON = "h-4 w-4 shrink-0";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const reduced = useReducedMotion();
  const { theme, toggleTheme } = useTheme();
  const { copied, copy } = useCopyToClipboard();

  useBodyScrollLock(open);
  useFocusTrap(open, panelRef);

  const close = useCallback(() => {
    // Reset here rather than in an effect: the palette stays mounted between
    // openings, so clearing on close is what makes each opening feel fresh.
    setQuery("");
    setActiveIndex(0);
    onOpenChange(false);
  }, [onOpenChange]);

  const goTo = useCallback(
    (id: string) => {
      close();
      // Wait for the overlay to unmount before scrolling, otherwise the
      // scroll lock is still in place and the jump is swallowed.
      requestAnimationFrame(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      });
    },
    [close, reduced],
  );

  const openExternal = useCallback(
    (href: string) => {
      close();
      window.open(href, "_blank", "noopener,noreferrer");
    },
    [close],
  );

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = navItems.map((item) => ({
      id: `nav-${item.id}`,
      label: item.label,
      hint: `Section ${item.index}`,
      group: "Navigate",
      icon: <ArrowRight className={ICON} />,
      keywords: `${item.label} ${item.id} section`,
      run: () => goTo(item.id),
    }));

    const projectCommands: Command[] = projects.map((project) => ({
      id: `project-${project.id}`,
      label: project.name,
      hint: project.domain,
      group: "Projects",
      icon: <FolderGit2 className={ICON} />,
      keywords: `${project.name} ${project.domain} ${project.stack.join(" ")}`,
      run: () => goTo("projects"),
    }));

    const links: Command[] = personal.socials.map((social) => ({
      id: `social-${social.icon}`,
      label: social.label,
      hint: social.display,
      group: "Links",
      icon:
        social.icon === "github" ? (
          <Github className={ICON} />
        ) : social.icon === "linkedin" ? (
          <Linkedin className={ICON} />
        ) : (
          <Mail className={ICON} />
        ),
      keywords: `${social.label} ${social.display}`,
      run: () => {
        if (social.href.startsWith("mailto:")) {
          close();
          window.location.href = social.href;
        } else {
          openExternal(social.href);
        }
      },
    }));

    const actions: Command[] = [
      {
        id: "action-cv",
        label: "Download CV",
        hint: "PDF",
        group: "Actions",
        icon: <Download className={ICON} />,
        keywords: "cv resume download pdf curriculum",
        run: () => {
          close();
          window.open(personal.cvPath, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "action-copy-email",
        label: copied ? "Email copied" : "Copy email address",
        hint: personal.email,
        group: "Actions",
        icon: copied ? <Check className={ICON} /> : <Copy className={ICON} />,
        keywords: "copy email address contact",
        run: () => {
          void copy(personal.email);
        },
      },
      {
        id: "action-theme",
        label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
        group: "Actions",
        icon:
          theme === "dark" ? <Sun className={ICON} /> : <Moon className={ICON} />,
        keywords: "theme dark light mode appearance toggle",
        run: () => toggleTheme(),
      },
    ];

    return [...nav, ...projectCommands, ...links, ...actions];
  }, [close, copied, copy, goTo, openExternal, theme, toggleTheme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.keywords}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  /** Results grouped for display, preserving the original ordering. */
  const grouped = useMemo(() => {
    const order: Command["group"][] = ["Navigate", "Projects", "Links", "Actions"];
    return order
      .map((group) => ({
        group,
        items: results.filter((command) => command.group === group),
      }))
      .filter((section) => section.items.length > 0);
  }, [results]);

  /** Flat list matching visual order, so arrow keys move the way eyes do. */
  const flat = useMemo(
    () => grouped.flatMap((section) => section.items),
    [grouped],
  );

  // Keep the highlighted row inside the scroll viewport.
  useEffect(() => {
    if (!open) return;
    const active = listRef.current?.querySelector<HTMLElement>(
      '[data-active="true"]',
    );
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (flat.length ? (i + 1) % flat.length : 0));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) =>
        flat.length ? (i - 1 + flat.length) % flat.length : 0,
      );
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      flat[activeIndex]?.run();
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.16 }}
          onKeyDown={onKeyDown}
        >
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={reduced ? false : { opacity: 0, y: -8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: reduced ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line-hi bg-bg-elevated shadow-[var(--shadow-lift)]"
          >
            {/* search field */}
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 shrink-0 text-fg-dim" aria-hidden="true" />
              {/*
                Autofocus is correct here: the palette is an explicitly
                invoked search dialog, and typing immediately is the point.
              */}
              <input
                autoFocus
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                placeholder="Jump to a section, project or link…"
                aria-label="Search commands"
                className="h-14 w-full bg-transparent text-[0.9375rem] text-fg outline-none placeholder:text-fg-dim"
              />
              <kbd className="hidden shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[0.625rem] text-fg-dim sm:block">
                ESC
              </kbd>
            </div>

            {/* results */}
            <div
              ref={listRef}
              className="max-h-[min(24rem,52vh)] overflow-y-auto overscroll-contain p-2"
            >
              {flat.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-fg-dim">
                  No matches for &ldquo;{query}&rdquo;
                </p>
              ) : (
                grouped.map((section) => (
                  <div key={section.group} className="mb-1 last:mb-0">
                    <p className="eyebrow px-3 py-2">{section.group}</p>
                    {section.items.map((command) => {
                      const index = flat.indexOf(command);
                      const active = index === activeIndex;
                      return (
                        <button
                          key={command.id}
                          type="button"
                          data-active={active}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={command.run}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                            active
                              ? "bg-[var(--accent-soft)] text-fg"
                              : "text-fg-muted hover:bg-surface-hi",
                          )}
                        >
                          <span
                            className={cn(
                              active ? "text-[var(--accent-hi)]" : "text-fg-dim",
                            )}
                          >
                            {command.icon}
                          </span>
                          <span className="flex-1 truncate">{command.label}</span>
                          {command.hint ? (
                            <span className="hidden truncate font-mono text-[0.6875rem] text-fg-dim sm:block">
                              {command.hint}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* footer legend */}
            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[0.625rem] text-fg-dim">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-line px-1 py-0.5">↑</kbd>
                <kbd className="rounded border border-line px-1 py-0.5">↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-line px-1 py-0.5">↵</kbd>
                select
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
