"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Building2, MapPin, Sparkles } from "lucide-react";
import { useRef } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { experiences } from "@/data";
import { useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function Experience() {
  const timelineRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();

  /**
   * The spine fills as the timeline scrolls through the viewport.
   * Driven entirely by motion values — zero React re-renders while scrolling.
   */
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 65%", "end 60%"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleY = useSpring(rawScale, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <Section id="experience">
      <SectionHeading
        id="experience"
        index="02"
        eyebrow="Experience"
        title={
          <>
            Two internships,{" "}
            <span className="text-gradient">four systems shipped</span>.
          </>
        }
        description="Enterprise digital transformation at Morocco's national electricity operator, and data engineering leadership at a growing studio."
      />

      <ol ref={timelineRef} className="relative mt-14 flex flex-col gap-14 sm:gap-16">
        {/* spine track */}
        <span
          aria-hidden="true"
          className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-[var(--line)] sm:left-[9px]"
        />
        {/* spine fill */}
        <motion.span
          aria-hidden="true"
          style={reduced ? undefined : { scaleY }}
          className={cn(
            "absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px origin-top sm:left-[9px]",
            "bg-[linear-gradient(180deg,var(--accent),var(--accent-2),var(--accent-3))]",
          )}
        />

        {experiences.map((experience, index) => {
          const isEnterprise = experience.kind === "enterprise";

          return (
            <li key={experience.id} className="relative pl-9 sm:pl-14">
              {/* node */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border sm:h-[19px] sm:w-[19px]",
                  isEnterprise
                    ? "border-[var(--accent-line)] bg-bg"
                    : "border-line-hi bg-bg",
                )}
              >
                <span
                  className={cn(
                    "h-[5px] w-[5px] rounded-full sm:h-[7px] sm:w-[7px]",
                    isEnterprise ? "bg-[var(--accent)]" : "bg-[var(--fg-dim)]",
                  )}
                />
              </span>

              <Reveal delay={0.05 * index}>
                <article
                  className={cn(
                    "group relative rounded-[var(--radius-card)] border p-5 transition-colors duration-300 sm:p-7",
                    isEnterprise
                      ? "border-[var(--accent-line)] bg-surface shadow-[var(--shadow-card)]"
                      : "border-line bg-surface/60 hover:border-line-hi",
                  )}
                >
                  {isEnterprise ? (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 -top-px h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)]"
                    />
                  ) : null}

                  {/* header */}
                  <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-[1.0625rem] font-semibold tracking-tight text-fg sm:text-[1.1875rem]">
                          {experience.role}
                        </h3>
                        {isEnterprise ? (
                          <span className="chip chip-accent">
                            <Sparkles className="h-3 w-3" aria-hidden="true" />
                            Enterprise
                          </span>
                        ) : null}
                      </div>

                      <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8125rem] text-fg-muted">
                        <span className="flex items-center gap-1.5 font-medium text-[var(--accent-hi)]">
                          <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                          {experience.company}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-fg-dim" aria-hidden="true" />
                          {experience.location}
                        </span>
                      </p>
                    </div>

                    <p className="flex shrink-0 flex-col font-mono text-[0.6875rem] text-fg-dim sm:items-end">
                      <span className="tabular-nums text-fg-muted">
                        {experience.period}
                      </span>
                      <span className="mt-0.5">{experience.duration}</span>
                    </p>
                  </header>

                  <p className="mt-5 max-w-3xl text-[0.9375rem] leading-relaxed text-fg-muted">
                    {experience.summary}
                  </p>

                  {/* workstreams */}
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {experience.highlights.map((highlight) => (
                      <li
                        key={highlight.name}
                        className="rounded-xl border border-line bg-bg-elevated/70 p-4 transition-colors duration-300 hover:border-[var(--accent-line)]"
                      >
                        <p className="text-[0.8125rem] font-semibold text-fg">
                          {highlight.name}
                        </p>
                        <p className="mt-2 text-[0.8125rem] leading-relaxed text-fg-muted">
                          {highlight.description}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {/* capability keywords */}
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {experience.keywords.map((keyword) => (
                      <li key={keyword} className="chip chip-accent">
                        {keyword}
                      </li>
                    ))}
                  </ul>

                  {/* stack */}
                  <div className="mt-6 border-t border-line pt-5">
                    <p className="eyebrow">Stack</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {experience.stack.map((tech) => (
                        <li key={tech} className="chip">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
