"use client";

import { ArrowUpRight, Github, Trophy } from "lucide-react";
import { useCallback, useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { featuredProject, secondaryProjects } from "@/data";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { ProjectDetail } from "./ProjectDetail";
import { ProjectMedia } from "./ProjectMedia";

const MAX_CHIPS = 5;

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const close = useCallback(() => setActive(null), []);

  // Bound to a local so TypeScript keeps the narrowing inside the callback.
  const featured = featuredProject ?? null;

  return (
    <Section id="projects">
      <SectionHeading
        id="projects"
        index="03"
        eyebrow="Selected Work"
        title={
          <>
            Systems built end to end —{" "}
            <span className="text-gradient">from problem to production</span>.
          </>
        }
        description="Each project below is a short engineering case study. Open one to read the challenge, the architecture behind the solution, and what it actually shipped."
      />

      {/* ------------------------- featured project ------------------------- */}
      {featured ? (
        <Reveal delay={0.05}>
          <FeaturedCard project={featured} onOpen={() => setActive(featured)} />
        </Reveal>
      ) : null}

      {/* -------------------------- project grid --------------------------- */}
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {secondaryProjects.map((project, index) => (
          <Reveal
            key={project.id}
            as="li"
            /* Stagger within a row only, so later rows do not wait on earlier ones. */
            delay={0.06 * (index % 3)}
            className="flex"
          >
            <ProjectCard project={project} onOpen={() => setActive(project)} />
          </Reveal>
        ))}
      </ul>

      <ProjectDetail project={active} onClose={close} />
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               featured card                                */
/* -------------------------------------------------------------------------- */

function FeaturedCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <article
      className={cn(
        "group ring-glow relative mt-14 overflow-hidden rounded-[var(--radius-card)]",
        "border border-[var(--accent-line)] bg-surface shadow-[var(--shadow-card)]",
        "transition-shadow duration-500 hover:shadow-[var(--shadow-lift)]",
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)]"
      />

      <div className="grid lg:grid-cols-12">
        {/* visual */}
        <div className="relative min-h-[15rem] border-b border-line lg:col-span-7 lg:min-h-[26rem] lg:border-b-0 lg:border-r">
          <ProjectMedia
            project={project}
            sizes="(max-width: 1024px) 100vw, 46rem"
            priority
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-bg/70 via-transparent to-transparent"
          />

          {project.award ? (
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-[var(--accent-line)] bg-bg/85 px-3 py-1.5 text-[0.6875rem] font-medium text-[var(--accent-hi)] backdrop-blur">
              <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
              {project.award}
            </span>
          ) : null}
        </div>

        {/* content */}
        <div className="flex flex-col justify-between gap-7 p-6 sm:p-9 lg:col-span-5">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow">Featured</span>
              <span aria-hidden="true" className="h-px w-6 bg-[var(--line-hi)]" />
              <span className="eyebrow">{project.domain}</span>
            </div>

            <h3 className="mt-4 text-[1.75rem] font-semibold tracking-[-0.03em] text-fg sm:text-[2rem]">
              {project.name}
            </h3>
            <p className="mt-1.5 text-[0.9375rem] text-[var(--accent-hi)]">
              {project.subtitle}
            </p>

            <p className="mt-5 text-[0.9375rem] leading-relaxed text-fg-muted">
              {project.summary}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.slice(0, 7).map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
              {project.stack.length > 7 ? (
                <li className="chip">+{project.stack.length - 7}</li>
              ) : null}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpen}
              className="group/cta inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-[0.8125rem] font-medium text-bg transition-colors duration-200 hover:bg-[var(--accent)] hover:text-white"
            >
              Read case study
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>

            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} source code — opens in a new tab`}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-[var(--accent-line)] hover:text-fg"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 grid card                                  */
/* -------------------------------------------------------------------------- */

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <article
      className={cn(
        "group ring-glow relative flex w-full flex-col overflow-hidden rounded-[var(--radius-card)]",
        "border border-line bg-surface transition-[border-color,transform,box-shadow] duration-300",
        "hover:-translate-y-1 hover:border-[var(--accent-line)] hover:shadow-[var(--shadow-lift)]",
      )}
    >
      {/* visual */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]">
          <ProjectMedia
            project={project}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 26rem"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/85 via-transparent to-transparent"
        />
        <span className="absolute left-3 top-3 chip bg-bg/80 backdrop-blur">
          {project.status}
        </span>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="eyebrow truncate">{project.domain}</span>
          <span className="font-mono text-[0.6875rem] tabular-nums text-fg-dim">
            {project.year}
          </span>
        </div>

        <h3 className="mt-2.5 text-[1.0625rem] font-semibold tracking-tight text-fg">
          {project.name}
        </h3>
        <p className="mt-1 text-[0.8125rem] text-[var(--accent-hi)]">
          {project.subtitle}
        </p>

        <p className="mt-3 text-[0.8125rem] leading-relaxed text-fg-muted">
          {project.summary}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, MAX_CHIPS).map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
          {project.stack.length > MAX_CHIPS ? (
            <li className="chip">+{project.stack.length - MAX_CHIPS}</li>
          ) : null}
        </ul>

        {/* footer */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <button
            type="button"
            onClick={onOpen}
            className="group/cta inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-fg transition-colors hover:text-[var(--accent-hi)]"
          >
            {/* Stretched hit area: the whole card opens the case study, while
                the explicit links below stay independently clickable. */}
            <span className="absolute inset-0 z-0" aria-hidden="true" />
            <span className="relative z-10">Case study</span>
            <ArrowUpRight
              className="relative z-10 h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>

          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} source code — opens in a new tab`}
              className="relative z-10 grid h-8 w-8 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-[var(--accent-line)] hover:text-fg"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
