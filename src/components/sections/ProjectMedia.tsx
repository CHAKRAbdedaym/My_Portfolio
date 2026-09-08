"use client";

import Image from "next/image";
import { useState } from "react";

import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Renders a project screenshot when one has been added, and the generated
 * artwork otherwise.
 *
 * The fallback is not an error state — it is the designed default. Adding a
 * screenshot is an upgrade, never a requirement, and a missing or broken file
 * silently falls back rather than showing a broken image.
 */
export function ProjectMedia({
  project,
  className,
  sizes = "(max-width: 1024px) 100vw, 48rem",
  priority = false,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(project.image) && !failed;

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-bg-elevated", className)}>
      {showImage ? (
        <Image
          src={project.image as string}
          alt={`${project.name} — interface screenshot`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 text-fg">
          <ProjectVisual kind={project.visual} seed={project.id} />
        </div>
      )}
    </div>
  );
}
