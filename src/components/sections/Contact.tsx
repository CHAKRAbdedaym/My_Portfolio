"use client";

import { ArrowUpRight, Check, Copy, Download, Github, Linkedin, Mail, Phone } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { personal } from "@/data";
import { useCopyToClipboard } from "@/lib/hooks";

const SOCIAL_ICON = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  phone: Phone,
} as const;

export function Contact() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Section id="contact">
      <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface/60 px-6 py-16 sm:px-12 sm:py-20 lg:py-24">
        {/* atmosphere */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-sm opacity-60"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_68%)] blur-3xl"
        />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal from="none">
            <div className="flex items-center gap-3">
              <span className="eyebrow tabular-nums">06</span>
              <span aria-hidden="true" className="h-px w-8 bg-[var(--line-hi)]" />
              <span className="eyebrow">Contact</span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h2
              id="contact-heading"
              className="mt-6 text-[length:var(--text-display)] font-semibold leading-[var(--text-display--line-height)] tracking-[var(--text-display--letter-spacing)] text-fg"
            >
              Let&rsquo;s build something{" "}
              <span className="text-gradient">meaningful</span>.
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-fg-muted sm:text-base">
              I&rsquo;m looking for a Final Year Internship (PFE) starting{" "}
              <span className="text-fg">February 2027</span> in AI, Data
              Engineering, DevOps, Cloud or Software Engineering. If you are
              building something in that space, I&rsquo;d like to hear about it.
            </p>
          </Reveal>

          {/* primary actions */}
          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href={`mailto:${personal.email}`} size="lg">
                <Mail className="h-4 w-4" aria-hidden="true" />
                {personal.email}
              </ButtonLink>

              <button
                type="button"
                onClick={() => void copy(personal.email)}
                aria-label="Copy email address to clipboard"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line-hi bg-surface px-5 text-[0.9375rem] text-fg transition-colors duration-200 hover:border-[var(--accent-line)] hover:text-[var(--accent-hi)]"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-[var(--accent-3)]" aria-hidden="true" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </Reveal>

          {/* secondary actions */}
          <Reveal delay={0.24}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink
                href={personal.cvPath}
                variant="ghost"
                size="sm"
                download={personal.cvFileName}
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                Download CV
              </ButtonLink>

              {personal.socials
                .filter((social) => social.icon !== "mail")
                .map((social) => {
                  const Icon = SOCIAL_ICON[social.icon as keyof typeof SOCIAL_ICON] ?? Mail;
                  return (
                    <ButtonLink
                      key={social.icon}
                      href={social.href}
                      variant="ghost"
                      size="sm"
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {social.label}
                      <ArrowUpRight className="h-3 w-3 opacity-60" aria-hidden="true" />
                    </ButtonLink>
                  );
                })}

              {personal.showPhone ? (
                <ButtonLink
                  href={`tel:${personal.phone.replace(/[^+\d]/g, "")}`}
                  variant="ghost"
                  size="sm"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  {personal.phone}
                </ButtonLink>
              ) : null}
            </div>
          </Reveal>

          {/* availability strip */}
          <Reveal delay={0.3}>
            <p className="mt-12 inline-flex items-center gap-2.5 rounded-full border border-line bg-bg-elevated py-1.5 pl-2.5 pr-4">
              <span className="relative grid h-2 w-2 place-items-center">
                <span className="absolute h-2 w-2 animate-pulse-ring rounded-full bg-[var(--accent-3)]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-3)]" />
              </span>
              <span className="font-mono text-[0.6875rem] tracking-[0.05em] text-fg-muted">
                Currently in {personal.location}
                <span className="mx-1.5 text-fg-dim">·</span>
                <span className="text-fg">Open to relocation &amp; remote</span>
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
