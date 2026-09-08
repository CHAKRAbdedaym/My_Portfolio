import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] " +
  "duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-bg shadow-[0_1px_2px_rgb(0_0_0/0.2)] hover:shadow-[0_8px_24px_-6px_var(--glow)] " +
    "hover:bg-[var(--accent)] hover:text-white",
  secondary:
    "border border-line-hi bg-surface text-fg hover:border-[var(--accent-line)] " +
    "hover:bg-surface-hi hover:text-[var(--accent-hi)]",
  ghost:
    "text-fg-muted hover:text-fg hover:bg-surface-hi border border-transparent hover:border-line",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.9375rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

/* --------------------------------- link ---------------------------------- */

type ButtonLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
    /** Set for downloads; forwarded to the underlying anchor. */
    download?: string | boolean;
  };

/**
 * Anchor-styled button.
 *
 * Internal hash/relative targets use next/link; external and `mailto:` /
 * download targets fall back to a plain anchor with the correct rel attributes.
 */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  download,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isInternal = href.startsWith("/") && !download;
  const isHash = href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const external = !isHash && !href.startsWith("mailto:") && !href.startsWith("/");

  return (
    <a
      href={href}
      className={classes}
      download={download}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

/* -------------------------------- button --------------------------------- */

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
