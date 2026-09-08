import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-[80rem] flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-fg-dim">
        Error 404
      </p>
      <h1 className="mt-5 text-[length:var(--text-title)] font-semibold tracking-[var(--text-title--letter-spacing)] text-fg">
        This route doesn&rsquo;t resolve.
      </h1>
      <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-fg-muted">
        The page you were looking for isn&rsquo;t here — it may have moved, or
        the link may be incomplete.
      </p>
      <Link
        href="/"
        className="mt-9 inline-flex h-11 items-center rounded-full bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-[var(--accent)] hover:text-white"
      >
        Back to the portfolio
      </Link>
    </div>
  );
}
