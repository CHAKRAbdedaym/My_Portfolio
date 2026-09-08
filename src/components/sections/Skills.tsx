import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { languagesUsed, skillDomains } from "@/data";
import { accentStyles, getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        id="skills"
        index="04"
        eyebrow="Capabilities"
        title={
          <>
            The technologies and domains{" "}
            <span className="text-gradient">I work with</span>.
          </>
        }
        description="Grouped by engineering domain rather than rated out of ten — because a percentage next to a logo tells you nothing about what someone can actually build."
      />

      {/* -------------------------- languages rail -------------------------- */}
      <Reveal delay={0.05}>
        <div className="marquee-host mask-fade-x mt-12 overflow-hidden border-y border-line py-4">
          <div className="flex w-max animate-marquee items-center gap-3">
            {/* duplicated so the loop is seamless at -50% */}
            {[...languagesUsed, ...languagesUsed].map((language, index) => (
              <span
                key={`${language}-${index}`}
                aria-hidden={index >= languagesUsed.length}
                className="flex items-center gap-3"
              >
                <span className="font-mono text-[0.8125rem] tracking-[0.04em] text-fg-muted">
                  {language}
                </span>
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-[var(--accent)] opacity-50"
                />
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* --------------------------- domain cards --------------------------- */}
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {skillDomains.map((domain, index) => {
          const Icon = getIcon(domain.icon);
          const accent = accentStyles[domain.accent];

          return (
            <Reveal
              key={domain.id}
              as="li"
              delay={0.05 * (index % 3)}
              className="flex"
            >
              <article
                className={cn(
                  "group relative flex w-full flex-col overflow-hidden rounded-[var(--radius-card)]",
                  "border border-line bg-surface p-6 transition-[border-color,transform] duration-300",
                  "hover:-translate-y-0.5",
                  accent.border,
                )}
              >
                {/* corner bloom on hover */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-[0.18]",
                    accent.glow,
                  )}
                />

                <div className="relative flex items-center gap-3">
                  <span
                    className={cn(
                      "grid h-10 w-10 place-items-center rounded-xl border border-line bg-bg-elevated transition-colors duration-300",
                      accent.text,
                    )}
                  >
                    <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
                  </span>
                  <h3 className="text-[0.9375rem] font-semibold tracking-tight text-fg">
                    {domain.name}
                  </h3>
                </div>

                <p className="relative mt-4 text-[0.8125rem] leading-relaxed text-fg-muted">
                  {domain.description}
                </p>

                <ul className="relative mt-5 flex flex-wrap gap-1.5">
                  {domain.items.map((item) => (
                    <li
                      key={item}
                      className="chip group-hover:border-[var(--line-hi)] group-hover:text-fg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
