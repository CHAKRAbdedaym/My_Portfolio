"use client";

import { motion, useScroll, useSpring } from "framer-motion";

import { useReducedMotion } from "@/lib/hooks";

/**
 * Reading-progress hairline pinned to the top of the viewport.
 *
 * Driven by a spring on the scroll progress motion value, so it never triggers
 * a React re-render — the transform is written straight to the compositor.
 */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[linear-gradient(90deg,var(--accent),var(--accent-2),var(--accent-3))]"
    />
  );
}
