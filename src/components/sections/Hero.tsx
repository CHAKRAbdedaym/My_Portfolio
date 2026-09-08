import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { SystemGraph } from "@/components/visuals/SystemGraph";
import { personal } from "@/data";

const PIPELINE = ["DATA", "AI", "SOFTWARE", "CLOUD"] as const;

const SOCIAL_ICON = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
} as const;

/**
 * The hero is a server component.
 *
 * Its entrance is a pure CSS animation (`.hero-in`, defined in globals.css)
 * rather than a JS-driven one. That matters for the two things a recruiter
 * actually notices: the headline is present in the HTML and paints on the
 * first frame instead of after hydration, and no animation library is needed
 * above the fold.
 */
export function Hero() {
  /** Staggered entrance, applied purely as a CSS animation-delay. */
  const delay = (index: number) => ({ animationDelay: `${0.05 * index}s` });

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative mx-auto flex w-full max-w-[80rem] flex-col justify-center px-5 sm:px-8 lg:px-12"
      style={{
        minHeight: "100svh",
        paddingTop: "calc(var(--nav-h) + 2rem)",
        paddingBottom: "5.5rem",
      }}
    >
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* ---------------------------- copy ---------------------------- */}
        <div className="lg:col-span-7 lg:pr-6">
          {/* availability */}
          <div className="hero-in" style={delay(0)}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pl-2.5 pr-4 backdrop-blur">
              <span className="relative grid h-2 w-2 place-items-center">
                <span className="absolute h-2 w-2 animate-pulse-ring rounded-full bg-[var(--accent-3)]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-3)]" />
              </span>
              <span className="font-mono text-[0.6875rem] tracking-[0.06em] text-fg-muted">
                {personal.availability.label}
                <span className="mx-1.5 text-fg-dim">·</span>
                <span className="text-fg">{personal.availability.detail}</span>
              </span>
            </span>
          </div>

          {/* name */}
          <h1 className="hero-in mt-8 flex flex-col gap-1.5" style={delay(1)}>
            <span className="eyebrow">Hello, I&rsquo;m</span>
            <span className="text-[1.75rem] font-semibold tracking-[-0.03em] text-fg sm:text-[2.125rem]">
              {personal.name}
            </span>
          </h1>

          {/* headline — the largest contentful element on the page */}
          <p
            style={delay(2)}
            className="hero-in mt-5 max-w-[19ch] text-[length:var(--text-display)] font-semibold leading-[var(--text-display--line-height)] tracking-[var(--text-display--letter-spacing)] text-fg sm:max-w-[22ch]"
          >
            {personal.headline.lead}{" "}
            <span className="text-gradient">{personal.headline.accent}</span>
            {personal.headline.trail}
          </p>

          {/* positioning */}
          <p
            style={delay(3)}
            className="hero-in mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[0.75rem] tracking-[0.04em] text-fg-muted sm:text-[0.8125rem]"
          >
            <span className="text-[var(--accent-hi)]">{personal.title}</span>
            {personal.disciplines.map((discipline) => (
              <span key={discipline} className="flex items-center gap-2.5">
                <span aria-hidden="true" className="text-fg-dim">
                  /
                </span>
                {discipline}
              </span>
            ))}
          </p>

          {/* summary */}
          <p
            style={delay(4)}
            className="hero-in mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-fg-muted sm:text-base"
          >
            {personal.heroSummary}
          </p>

          {/* calls to action */}
          <div className="hero-in mt-9 flex flex-wrap items-center gap-3" style={delay(5)}>
            <ButtonLink href="#projects" size="lg">
              View My Work
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                aria-hidden="true"
              />
            </ButtonLink>

            <ButtonLink
              href={personal.cvPath}
              variant="secondary"
              size="lg"
              download={personal.cvFileName}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CV
            </ButtonLink>
          </div>

          {/* direct links */}
          <ul
            className="hero-in mt-9 flex flex-wrap items-center gap-x-5 gap-y-3"
            style={delay(6)}
          >
            {personal.socials.map((social) => {
              const Icon = SOCIAL_ICON[social.icon as keyof typeof SOCIAL_ICON] ?? Mail;
              const isMail = social.href.startsWith("mailto:");
              return (
                <li key={social.icon}>
                  <a
                    href={social.href}
                    {...(isMail
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="group/link flex items-center gap-2 text-[0.8125rem] text-fg-muted transition-colors duration-200 hover:text-fg"
                  >
                    <Icon
                      className="h-4 w-4 text-fg-dim transition-colors duration-200 group-hover/link:text-[var(--accent-hi)]"
                      aria-hidden="true"
                    />
                    <span className="font-mono">{social.display}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* --------------------------- visual --------------------------- */}
        <div className="hero-scale-in lg:col-span-5" style={{ animationDelay: "0.18s" }}>
          <figure className="panel relative overflow-hidden bg-bg-elevated/60 backdrop-blur-sm">
            {/* blueprint corner ticks */}
            {[
              "left-3 top-3 border-l border-t",
              "right-3 top-3 border-r border-t",
              "left-3 bottom-3 border-b border-l",
              "right-3 bottom-3 border-b border-r",
            ].map((position) => (
              <span
                key={position}
                aria-hidden="true"
                className={`pointer-events-none absolute h-3 w-3 border-[var(--accent-line)] ${position}`}
              />
            ))}

            <figcaption className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-fg-dim">
                system.pipeline
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[0.625rem] text-fg-dim">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-3)]" />
                live
              </span>
            </figcaption>

            <SystemGraph className="aspect-[4/3] w-full sm:aspect-[16/11] lg:aspect-square" />

            <div className="flex items-center justify-between gap-1 border-t border-line px-4 py-3">
              {PIPELINE.map((stage, index) => (
                <span key={stage} className="flex items-center gap-1 sm:gap-2">
                  <span className="font-mono text-[0.625rem] tracking-[0.12em] text-fg-dim sm:text-[0.6875rem]">
                    {stage}
                  </span>
                  {index < PIPELINE.length - 1 ? (
                    <span aria-hidden="true" className="text-[0.625rem] text-[var(--accent)]">
                      →
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          </figure>
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to the about section"
        className="hero-in absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-fg-dim transition-colors hover:text-fg lg:flex"
        style={{ animationDelay: "0.8s" }}
      >
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em]">
          Scroll
        </span>
        <ArrowDown className="h-3.5 w-3.5 motion-safe:animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
