import { GraduationCap, MapPin } from "lucide-react";

import { ProfileImage } from "@/components/ui/ProfileImage";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { education, personal, spokenLanguages } from "@/data";
import { publicFileExists } from "@/lib/assets";
import { cn } from "@/lib/utils";

export function About() {
  // Resolved at build time — see `publicFileExists`.
  const hasPhoto = publicFileExists(personal.profileImage);

  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* ------------------------ portrait column ------------------------ */}
        <div className="lg:col-span-5">
          <Reveal from="left">
            <figure className="panel group relative overflow-hidden">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-elevated">
                <ProfileImage
                  src={personal.profileImage}
                  name={personal.name}
                  available={hasPhoto}
                  /*
                   * Slightly cooled and dimmed so a bright studio backdrop
                   * doesn't fight the dark page, then restored on hover — the
                   * face is always clear, the block never glares.
                   */
                  className="scale-[1.01] brightness-[0.92] contrast-[1.03] saturate-[0.9] transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-100 group-hover:saturate-100"
                  sizes="(max-width: 1024px) 90vw, 28rem"
                />

                {/* grounds the portrait into the panel */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-bg/5 to-transparent"
                />
                {/* faint accent wash, ties the photo to the palette */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_35%,var(--glow)_140%)] opacity-70 transition-opacity duration-700 group-hover:opacity-30"
                />
                {/* inner hairline keeps the edge crisp against the panel */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[var(--line)]"
                />
              </div>

              <figcaption className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
                <span className="flex items-center gap-2 text-[0.8125rem] text-fg-muted">
                  <MapPin className="h-3.5 w-3.5 text-fg-dim" aria-hidden="true" />
                  {personal.location}
                </span>
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fg-dim">
                  {personal.title}
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {/* currently exploring */}
          <Reveal from="left" delay={0.1}>
            <div className="panel mt-5 p-5">
              <p className="eyebrow">Currently exploring</p>
              <ul className="mt-4 flex flex-col gap-4">
                {personal.currentFocus.map((focus) => (
                  <li key={focus.label} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                    />
                    <span>
                      <span className="block text-sm font-medium text-fg">
                        {focus.label}
                      </span>
                      <span className="block text-[0.8125rem] leading-relaxed text-fg-muted">
                        {focus.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* -------------------------- copy column -------------------------- */}
        <div className="lg:col-span-7">
          <SectionHeading
            id="about"
            index="01"
            eyebrow="About"
            title={
              <>
                Engineering is where curiosity becomes something{" "}
                <span className="text-gradient">people can actually use</span>.
              </>
            }
          />

          <div className="mt-8 flex flex-col gap-5">
            {personal.about.map((paragraph, index) => (
              <Reveal key={index} delay={0.05 * index}>
                <p className="text-[0.9375rem] leading-[1.75] text-fg-muted">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          {/* education */}
          <Reveal delay={0.1}>
            <div className="mt-11">
              <div className="flex items-center gap-2.5">
                <GraduationCap
                  className="h-4 w-4 text-[var(--accent)]"
                  aria-hidden="true"
                />
                <h3 className="eyebrow">Education</h3>
              </div>

              <ul className="mt-5 flex flex-col">
                {education.map((entry, index) => (
                  <li
                    key={entry.id}
                    className={cn(
                      "group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6",
                      index !== education.length - 1 && "border-b border-line",
                    )}
                  >
                    <div className="min-w-0">
                      <p className="text-[0.9375rem] font-medium text-fg">
                        {entry.degree}
                        <span className="text-fg-dim"> — </span>
                        <span className="font-normal text-fg-muted">
                          {entry.field}
                        </span>
                      </p>
                      <p className="mt-1 text-[0.8125rem] text-fg-muted">
                        {entry.institution}, {entry.location}
                      </p>
                      {entry.note ? (
                        <p className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-[var(--accent-hi)]">
                          <span
                            aria-hidden="true"
                            className="h-1 w-1 rounded-full bg-[var(--accent-3)]"
                          />
                          {entry.note}
                        </p>
                      ) : null}
                    </div>
                    <span className="shrink-0 font-mono text-[0.75rem] tabular-nums text-fg-dim">
                      {entry.period}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* languages */}
          <Reveal delay={0.15}>
            <div className="mt-10">
              <h3 className="eyebrow">Languages</h3>
              <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-4">
                {spokenLanguages.map((language) => (
                  <li key={language.name} className="flex flex-col gap-1.5">
                    <span className="flex items-center gap-2.5">
                      <span className="text-sm font-medium text-fg">
                        {language.name}
                      </span>
                      <span
                        className="flex items-center gap-1"
                        role="img"
                        aria-label={`${language.level} proficiency`}
                      >
                        {[1, 2, 3].map((dot) => (
                          <span
                            key={dot}
                            aria-hidden="true"
                            className={cn(
                              "h-1.5 w-1.5 rounded-full transition-colors",
                              dot <= language.strength
                                ? "bg-[var(--accent)]"
                                : "bg-[var(--line-hi)]",
                            )}
                          />
                        ))}
                      </span>
                    </span>
                    <span className="text-[0.75rem] text-fg-muted">
                      {language.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
