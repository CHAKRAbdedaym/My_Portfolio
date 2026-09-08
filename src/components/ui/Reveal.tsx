"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type RevealTag =
  | "div"
  | "section"
  | "article"
  | "li"
  | "ul"
  | "ol"
  | "span"
  | "p"
  | "header"
  | "figure";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before this element animates. */
  delay?: number;
  /** Direction the element travels in from. */
  from?: "bottom" | "left" | "right" | "none";
  as?: RevealTag;
};

/**
 * Scroll-triggered entrance animation.
 *
 * Implemented with an IntersectionObserver plus a CSS transition rather than a
 * JS animation library, for three reasons:
 *
 *  • The hidden state lives in a `.js`-scoped CSS rule, so the server-rendered
 *    HTML is fully visible. Previously every revealed element shipped with an
 *    inline `opacity: 0`, which meant the entire page was blank without
 *    JavaScript and Chrome refused to record it as a paint.
 *  • The transition runs on the compositor — no per-frame React work.
 *  • It keeps the animation library out of the bundle for sections that only
 *    need a fade-up.
 *
 * `prefers-reduced-motion` is handled globally in `globals.css`, which zeroes
 * both the duration and the delay.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "bottom",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as ElementType;

  return (
    <Tag
      ref={ref}
      className={cn("reveal", `reveal-${from}`, visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
