import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  /** Removes the default vertical padding when a section needs custom spacing. */
  flush?: boolean;
};

/**
 * A page section with a stable anchor id and consistent horizontal rhythm.
 * `scroll-mt` keeps the heading clear of the sticky navigation bar.
 */
export function Section({ id, children, className, flush }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "relative mx-auto w-full max-w-[80rem] px-5 sm:px-8 lg:px-12",
        !flush && "py-20 sm:py-28 lg:py-36",
        className,
      )}
      style={{ scrollMarginTop: "calc(var(--nav-h) + 1.5rem)" }}
    >
      {children}
    </section>
  );
}

type SectionHeadingProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
};

/** The shared heading treatment: numbered eyebrow, title, optional standfirst. */
export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal from="none">
        <div className="flex items-center gap-3">
          <span className="eyebrow tabular-nums">{index}</span>
          <span
            aria-hidden="true"
            className="h-px w-8 bg-[var(--line-hi)]"
          />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <h2
          id={`${id}-heading`}
          className="max-w-3xl text-[length:var(--text-title)] leading-[var(--text-title--line-height)] tracking-[var(--text-title--letter-spacing)] font-semibold text-fg"
        >
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "max-w-2xl text-[0.9375rem] leading-relaxed text-fg-muted sm:text-base",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
