"use client";

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

import { navItems, personal } from "@/data";
import { useReducedMotion } from "@/lib/hooks";

const SOCIAL_ICON = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
} as const;

export function Footer() {
  const reduced = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex max-w-[80rem] flex-col gap-10 px-5 py-12 sm:px-8 lg:flex-row lg:items-start lg:justify-between lg:px-12">
        {/* identity */}
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-surface font-mono text-[0.8125rem] font-semibold text-fg">
              AC
            </span>
            <div>
              <p className="text-sm font-medium text-fg">{personal.name}</p>
              <p className="font-mono text-[0.6875rem] text-fg-dim">
                {personal.title}
              </p>
            </div>
          </div>
          <p className="mt-5 text-[0.8125rem] leading-relaxed text-fg-muted">
            {personal.tagline}
          </p>
        </div>

        {/* sitemap */}
        <nav aria-label="Footer" className="lg:pt-1">
          <p className="eyebrow">Sections</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-[0.8125rem] text-fg-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* elsewhere */}
        <div className="lg:pt-1">
          <p className="eyebrow">Elsewhere</p>
          <ul className="mt-4 flex flex-col gap-2.5">
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
                    className="group flex items-center gap-2 text-[0.8125rem] text-fg-muted transition-colors hover:text-fg"
                  >
                    <Icon
                      className="h-3.5 w-3.5 text-fg-dim transition-colors group-hover:text-[var(--accent-hi)]"
                      aria-hidden="true"
                    />
                    {social.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* baseline */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[80rem] flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row sm:px-8 lg:px-12">
          <p className="font-mono text-[0.6875rem] text-fg-dim">
            © {year} {personal.name}. Built with Next.js, TypeScript &amp;
            Tailwind CSS.
          </p>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
            }
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-[0.6875rem] text-fg-muted transition-colors hover:border-[var(--accent-line)] hover:text-fg"
          >
            Back to top
            <ArrowUp
              className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
