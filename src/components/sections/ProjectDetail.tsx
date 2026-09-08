"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Blocks,
  CheckCircle2,
  Github,
  Layers,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useRef } from "react";

import { ProjectMedia } from "./ProjectMedia";
import { useBodyScrollLock, useFocusTrap, useReducedMotion } from "@/lib/hooks";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Case-study drawer.
 *
 * A drawer rather than a centred modal because these are long-form: it gives
 * full viewport height for scrolling, keeps the page visible behind as
 * context, and degrades naturally to a full-screen sheet on mobile.
 */
export function ProjectDetail({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const open = Boolean(project);

  useBodyScrollLock(open);
  useFocusTrap(open, panelRef);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
            initial={reduced ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduced ? undefined : { x: "100%" }}
            transition={{
              duration: reduced ? 0 : 0.42,
              ease: [0.32, 0.72, 0, 1],
            }}
            className={cn(
              "absolute inset-y-0 right-0 flex w-full flex-col border-l border-line",
              "bg-bg shadow-[var(--shadow-lift)] sm:max-w-2xl",
            )}
          >
            {/* sticky header */}
            <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line bg-bg/90 px-5 py-4 backdrop-blur sm:px-8">
              <div className="min-w-0">
                <p className="eyebrow">{project.domain}</p>
                <h2
                  id="project-detail-title"
                  className="mt-1.5 truncate text-xl font-semibold tracking-tight text-fg sm:text-2xl"
                >
                  {project.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-fg-muted transition-colors hover:border-[var(--accent-line)] hover:text-fg"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </header>

            {/* scrollable body */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* banner */}
              <div className="relative aspect-[16/9] w-full border-b border-line">
                <ProjectMedia project={project} sizes="(max-width: 640px) 100vw, 42rem" />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent"
                />
                <div className="absolute bottom-3 left-4 flex flex-wrap items-center gap-2 sm:left-8">
                  <span className="chip chip-accent backdrop-blur">{project.status}</span>
                  <span className="chip backdrop-blur">{project.year}</span>
                </div>
              </div>

              <div className="flex flex-col gap-9 px-5 py-8 sm:px-8">
                {project.award ? (
                  <p className="flex items-center gap-2.5 rounded-xl border border-[var(--accent-line)] bg-[var(--accent-soft)] px-4 py-3 text-[0.8125rem] font-medium text-[var(--accent-hi)]">
                    <span aria-hidden="true">🏆</span>
                    {project.award}
                  </p>
                ) : null}

                <p className="text-[0.9375rem] leading-relaxed text-fg-muted">
                  {project.summary}
                </p>

                <DetailBlock icon={<Target className="h-4 w-4" />} title="The Challenge">
                  <p className="text-[0.9375rem] leading-[1.75] text-fg-muted">
                    {project.challenge}
                  </p>
                </DetailBlock>

                <DetailBlock icon={<Blocks className="h-4 w-4" />} title="The Solution">
                  <p className="text-[0.9375rem] leading-[1.75] text-fg-muted">
                    {project.solution}
                  </p>
                </DetailBlock>

                <DetailBlock icon={<Layers className="h-4 w-4" />} title="Architecture">
                  <ul className="flex flex-col gap-3">
                    {project.architecture.map((line) => (
                      <li key={line} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                        />
                        <span className="text-[0.875rem] leading-relaxed text-fg-muted">
                          {line}
                        </span>
                      </li>
                    ))}
                  </ul>
                </DetailBlock>

                <DetailBlock
                  icon={<CheckCircle2 className="h-4 w-4" />}
                  title="Key Features"
                >
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="rounded-lg border border-line bg-surface px-3.5 py-3 text-[0.8125rem] leading-relaxed text-fg-muted"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </DetailBlock>

                <DetailBlock icon={<TrendingUp className="h-4 w-4" />} title="Impact">
                  <p className="text-[0.9375rem] leading-[1.75] text-fg-muted">
                    {project.impact}
                  </p>
                </DetailBlock>

                <div>
                  <p className="eyebrow">Technology Stack</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.links.github || project.links.demo ? (
                  <div className="flex flex-wrap gap-3 border-t border-line pt-7">
                    {project.links.github ? (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-[0.8125rem] text-fg transition-colors hover:border-[var(--accent-line)] hover:text-[var(--accent-hi)]"
                      >
                        <Github className="h-4 w-4" aria-hidden="true" />
                        Source code
                      </a>
                    ) : null}
                    {project.links.demo ? (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2.5 text-[0.8125rem] text-bg transition-colors hover:bg-[var(--accent)] hover:text-white"
                      >
                        Live demo
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function DetailBlock({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="flex items-center gap-2.5 text-[0.9375rem] font-semibold text-fg">
        <span className="text-[var(--accent)]" aria-hidden="true">
          {icon}
        </span>
        {title}
      </h3>
      <div className="mt-3.5">{children}</div>
    </section>
  );
}
