"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/*                              prefers-reduced-motion                        */
/* -------------------------------------------------------------------------- */

/**
 * Live reduced-motion preference.
 *
 * Starts as `false` on the server and on first paint, then corrects after
 * mount. Every animated component reads this and renders a static version
 * when it is true.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return reduced;
}

/* -------------------------------------------------------------------------- */
/*                                media queries                               */
/* -------------------------------------------------------------------------- */

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    const sync = () => setMatches(list.matches);
    sync();
    list.addEventListener("change", sync);
    return () => list.removeEventListener("change", sync);
  }, [query]);

  return matches;
}

/* -------------------------------------------------------------------------- */
/*                                 scroll spy                                 */
/* -------------------------------------------------------------------------- */

/**
 * Returns the id of the section currently considered "active".
 *
 * Deliberately not IntersectionObserver-ratio based: `intersectionRatio` is a
 * fraction of the *target's own* height, so a short section always beats a tall
 * one when both cross the observation band — which made the nav highlight jump
 * to whichever section happened to be smallest.
 *
 * Instead a single reference line is projected a third of the way down the
 * viewport, and the active section is the last one whose top has passed it.
 * That matches what a reader perceives as "the section I am in", and it is
 * exact regardless of how tall the sections are.
 */
export function useScrollSpy(ids: string[]): string {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    if (ids.length === 0) return;

    let frame = 0;

    const compute = () => {
      const scrollY = window.scrollY;
      const line = scrollY + window.innerHeight * 0.33;

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (top <= line) current = id;
      }

      // The final section is often too short to ever reach the line, so pin it
      // explicitly once the page is scrolled to the bottom.
      const atBottom =
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 96;
      if (atBottom) current = ids[ids.length - 1];

      setActiveId((previous) => (previous === current ? previous : current));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        compute();
        frame = 0;
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);

  return activeId;
}

/* -------------------------------------------------------------------------- */
/*                             body scroll locking                            */
/* -------------------------------------------------------------------------- */

/**
 * Locks page scroll while an overlay is open, compensating for the scrollbar
 * width so the layout does not jump sideways.
 */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [locked]);
}

/* -------------------------------------------------------------------------- */
/*                              focus management                              */
/* -------------------------------------------------------------------------- */

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Traps Tab focus inside a container and restores focus to the previously
 * focused element on close. Required for accessible dialogs.
 */
export function useFocusTrap(
  active: boolean,
  containerRef: React.RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusFirst = () => {
      const nodes = container?.querySelectorAll<HTMLElement>(FOCUSABLE);
      nodes?.[0]?.focus();
    };

    // Wait a frame so the element exists and any entry animation has started.
    const raf = requestAnimationFrame(focusFirst);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !container) return;

      const nodes = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);

      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [active, containerRef]);
}

/* -------------------------------------------------------------------------- */
/*                                  copy text                                 */
/* -------------------------------------------------------------------------- */

/** Copy-to-clipboard with a transient "copied" acknowledgement. */
export function useCopyToClipboard(resetAfter = 2000) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => setCopied(false), resetAfter);
        return true;
      } catch {
        // Clipboard API unavailable (insecure context, denied permission).
        // The surrounding UI always offers a plain mailto: link as a fallback.
        return false;
      }
    },
    [resetAfter],
  );

  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );

  return { copied, copy };
}

/* -------------------------------------------------------------------------- */
/*                             element visibility                             */
/* -------------------------------------------------------------------------- */

/**
 * True while the referenced element is anywhere near the viewport.
 * Used to pause the hero canvas animation when it is scrolled out of view.
 */
export function useInViewport<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  rootMargin = "200px",
): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return visible;
}

/* -------------------------------------------------------------------------- */
/*                                  scrolled                                  */
/* -------------------------------------------------------------------------- */

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return scrolled;
}

/* -------------------------------------------------------------------------- */
/*                              stable id arrays                              */
/* -------------------------------------------------------------------------- */

/** Memoises an array of ids so effect dependencies stay referentially stable. */
export function useStableIds(ids: string[]): string[] {
  const key = ids.join("|");
  return useMemo(() => key.split("|"), [key]);
}
