"use client";

import Image from "next/image";
import { useState } from "react";

import { cn, initialsOf } from "@/lib/utils";

type ProfileImageProps = {
  src: string;
  name: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /**
   * Resolved on the server with `publicFileExists`. When false the fallback is
   * rendered immediately — no image request is made at all, so a missing photo
   * never produces a console error.
   */
  available?: boolean;
};

/**
 * Profile photo with a designed fallback.
 *
 * Two layers of safety: the server tells us up front whether the file exists,
 * and `onError` still catches anything that breaks at runtime. Either way the
 * layout is identical and a broken-image icon is never shown.
 */
export function ProfileImage({
  src,
  name,
  className,
  sizes = "(max-width: 1024px) 90vw, 28rem",
  priority = false,
  available = true,
}: ProfileImageProps) {
  const [failed, setFailed] = useState(false);

  if (!available || failed) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden bg-bg-elevated"
        role="img"
        aria-label={`${name} — profile photo placeholder`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(120%_120%_at_30%_0%,var(--glow),transparent_60%),radial-gradient(100%_100%_at_80%_100%,var(--glow-2),transparent_65%)]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-grid-sm opacity-70" />
        <span className="relative font-mono text-[clamp(2.5rem,8vw,4.5rem)] font-medium tracking-tight text-fg">
          {initialsOf(name)}
        </span>
        <span className="absolute inset-x-0 bottom-4 text-center font-mono text-[0.625rem] uppercase tracking-[0.16em] text-fg-dim">
          Add profile.jpg
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`${name} — portrait`}
      fill
      sizes={sizes}
      priority={priority}
      quality={90}
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}
