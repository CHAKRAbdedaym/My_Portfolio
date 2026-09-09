import { Award, BadgeCheck } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { achievements, certifications } from "@/data";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function Achievements() {
  const featured = achievements.filter((item) => item.featured);
  const rest = achievements.filter((item) => !item.featured);

  return (
    <Section id="achievements">
      <SectionHeading
        id="achievements"
        index="05"
        eyebrow="Recognition"
        title={
          <>
            Competitions, community and{" "}
            <span className="text-gradient">credentials</span>.
          </>
        }
        description="Where the engineering met a deadline, a team, or an examiner."
      />

      {/* ------------------------ featured achievement ------------------------ */}
      <div className="mt-14 flex flex-col gap-5">
        {featured.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <Reveal key={item.id}>
              <article className="ring-glow group relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--accent-line)] bg-surface shadow-[var(--shadow-card)]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -top-px h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_70%)] blur-2xl"
                />

                <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-9 sm:p-9">
                  {/* medal */}
                  <div className="relative shrink-0">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-20 blur-2xl"
                    />
                    <span className="relative grid h-20 w-20 place-items-center rounded-full border border-[var(--accent-line)] bg-bg-elevated sm:h-24 sm:w-24">
                      <Icon
                        className="h-8 w-8 text-[var(--accent-hi)] sm:h-9 sm:w-9"
                        aria-hidden="true"
                      />
                    </span>
                    {item.badge ? (
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[var(--accent-line)] bg-bg px-2.5 py-1 font-mono text-[0.625rem] font-medium tracking-wide text-[var(--accent-hi)]">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>

                  {/* copy */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                        {item.title}
                      </h3>
                      <span className="font-mono text-[0.6875rem] tabular-nums text-fg-dim">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-1 text-[0.8125rem] text-[var(--accent-hi)]">
                      {item.organisation}
                    </p>
                    <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-fg-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}

        {/* ------------------------ other achievements ------------------------ */}
        <ul className="grid gap-5 sm:grid-cols-2">
          {rest.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <Reveal key={item.id} as="li" delay={0.05 * index} className="flex">
                <article
                  className={cn(
                    "group flex w-full flex-col rounded-[var(--radius-card)] border border-line",
                    "bg-surface p-6 transition-[border-color,transform] duration-300",
                    "hover:-translate-y-0.5 hover:border-[var(--accent-line)]",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-bg-elevated text-[var(--accent)]">
                      <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[0.6875rem] tabular-nums text-fg-dim">
                      {item.period}
                    </span>
                  </div>

                  <h3 className="mt-5 text-[0.9375rem] font-semibold tracking-tight text-fg">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[0.8125rem] text-fg-dim">
                    {item.organisation}
                  </p>
                  <p className="mt-3.5 text-[0.8125rem] leading-relaxed text-fg-muted">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>

      {/* --------------------------- certifications --------------------------- */}
      <div className="mt-16">
        <Reveal>
          <div className="flex items-center gap-2.5">
            <BadgeCheck className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
            <h3 className="eyebrow">Certifications</h3>
          </div>
        </Reveal>

        <ul className="mt-6 grid gap-5 sm:grid-cols-2">
          {certifications.map((certification, index) => (
            <Reveal
              key={certification.id}
              as="li"
              delay={0.05 * index}
              className="flex"
            >
              <article className="group relative flex w-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface p-6 transition-colors duration-300 hover:border-[var(--accent-line)]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_70%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-bg-elevated text-[var(--accent)]">
                    <Award className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[0.6875rem] tabular-nums text-fg-dim">
                    {certification.year}
                  </span>
                </div>

                <h4 className="relative mt-5 text-[0.9375rem] font-semibold tracking-tight text-fg">
                  {certification.name}
                </h4>
                <p className="relative mt-1 text-[0.8125rem] text-fg-muted">
                  {certification.issuer}
                  <span className="text-fg-dim"> · </span>
                  {certification.category}
                </p>

                {/* A credential may legitimately have no sub-tracks; don't
                    render an empty list and its top margin in that case. */}
                {certification.tracks.length > 0 ? (
                  <ul className="relative mt-5 flex flex-wrap gap-1.5">
                    {certification.tracks.map((track) => (
                      <li key={track} className="chip">
                        {track}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
