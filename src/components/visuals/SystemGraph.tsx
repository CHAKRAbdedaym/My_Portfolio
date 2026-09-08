"use client";

import { useEffect, useRef } from "react";

import { useInViewport, useReducedMotion } from "@/lib/hooks";
import { useTheme } from "@/components/layout/ThemeProvider";

/* -------------------------------------------------------------------------- */
/*                                    model                                   */
/* -------------------------------------------------------------------------- */

/**
 * The hero visual is a literal diagram of how I work: data is collected,
 * turned into intelligence, wrapped in software, and shipped to infrastructure.
 * The four stages are real, the pulses travelling between them are the flow.
 */
type Stage = {
  id: string;
  label: string;
  /** Normalised position inside the canvas (0–1). */
  x: number;
  y: number;
  /** Satellite count — the small orbiting nodes around each stage. */
  satellites: number;
  /** Orbit radius as a fraction of the canvas's short side. */
  orbit: number;
  /** Radians per second. Alternating signs keep it from looking mechanical. */
  speed: number;
};

const STAGES: Stage[] = [
  { id: "data", label: "DATA", x: 0.14, y: 0.74, satellites: 4, orbit: 0.1, speed: 0.16 },
  { id: "ai", label: "AI", x: 0.39, y: 0.24, satellites: 5, orbit: 0.115, speed: -0.13 },
  { id: "software", label: "SOFTWARE", x: 0.64, y: 0.72, satellites: 4, orbit: 0.1, speed: 0.11 },
  { id: "cloud", label: "CLOUD", x: 0.87, y: 0.26, satellites: 5, orbit: 0.105, speed: -0.15 },
];

/** Pulses travelling the main path, offset so they never bunch up. */
const PULSE_COUNT = 7;
const PULSE_SPEED = 0.085; // path fraction per second

type Palette = {
  accent: string;
  accent2: string;
  accent3: string;
  line: string;
  dim: string;
  fg: string;
  /** Panel background, used to knock out a plate behind each label. */
  bg: string;
};

/** Reads the live theme tokens so the canvas always matches the CSS. */
function readPalette(): Palette {
  if (typeof window === "undefined") {
    return {
      accent: "#5b8cff",
      accent2: "#8b7cff",
      accent3: "#35d6ee",
      line: "rgba(255,255,255,0.14)",
      dim: "rgba(255,255,255,0.35)",
      fg: "#e9ecf3",
      bg: "#0b0d13",
    };
  }

  const styles = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) =>
    styles.getPropertyValue(name).trim() || fallback;

  const isLight = document.documentElement.classList.contains("light");

  return {
    accent: read("--accent", "#5b8cff"),
    accent2: read("--accent-2", "#8b7cff"),
    accent3: read("--accent-3", "#35d6ee"),
    line: isLight ? "rgba(9,11,20,0.16)" : "rgba(255,255,255,0.14)",
    dim: isLight ? "rgba(9,11,20,0.48)" : "rgba(255,255,255,0.42)",
    fg: read("--fg", "#e9ecf3"),
    bg: read("--bg-elevated", isLight ? "#f5f6f9" : "#0b0d13"),
  };
}

/** Quadratic bezier point, used for both the edge curve and the pulse path. */
function quadPoint(
  t: number,
  x0: number, y0: number,
  cx: number, cy: number,
  x1: number, y1: number,
) {
  const mt = 1 - t;
  return {
    x: mt * mt * x0 + 2 * mt * t * cx + t * t * x1,
    y: mt * mt * y0 + 2 * mt * t * cy + t * t * y1,
  };
}

/* -------------------------------------------------------------------------- */
/*                                  component                                 */
/* -------------------------------------------------------------------------- */

/**
 * Animated system-architecture graph rendered on a 2D canvas.
 *
 * Performance notes:
 *  • One canvas, one rAF loop, no per-frame allocation in the hot path.
 *  • The loop is suspended entirely while the hero is scrolled out of view.
 *  • Device pixel ratio is capped at 2 — beyond that the cost is real and the
 *    visual gain is not.
 *  • Under `prefers-reduced-motion` exactly one static frame is drawn and no
 *    animation loop ever starts.
 */
export function SystemGraph({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -1, y: -1, active: false });

  const reduced = useReducedMotion();
  const inView = useInViewport(wrapRef, "160px");
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let palette = readPalette();
    let width = 0;
    let height = 0;
    let raf = 0;
    let startTime = 0;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /* ------------------------------ drawing ------------------------------ */

    const draw = (elapsed: number) => {
      if (width === 0 || height === 0) return;

      const short = Math.min(width, height);
      const nodeR = Math.max(5, short * 0.019);
      const satR = Math.max(1.8, short * 0.0058);
      const pointer = pointerRef.current;
      const proximities: number[] = [];

      ctx.clearRect(0, 0, width, height);

      const px = (s: Stage) => s.x * width;
      const py = (s: Stage) => s.y * height;
      const bgColor = palette.bg;

      /* --- edges between consecutive stages, drawn behind everything --- */
      for (let i = 0; i < STAGES.length - 1; i += 1) {
        const a = STAGES[i];
        const b = STAGES[i + 1];
        const x0 = px(a);
        const y0 = py(a);
        const x1 = px(b);
        const y1 = py(b);
        // Bow the curve away from the straight line for a routed-cable look.
        const cx = (x0 + x1) / 2;
        const cy = (y0 + y1) / 2 + (i % 2 === 0 ? -1 : 1) * height * 0.1;

        const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
        gradient.addColorStop(0, palette.accent);
        gradient.addColorStop(0.5, palette.accent2);
        gradient.addColorStop(1, palette.accent3);

        ctx.save();
        ctx.globalAlpha = 0.24;
        ctx.strokeStyle = gradient;
        ctx.lineWidth = Math.max(1, short * 0.0032);
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.quadraticCurveTo(cx, cy, x1, y1);
        ctx.stroke();
        ctx.restore();

        /* --- pulses travelling this edge --- */
        for (let p = 0; p < PULSE_COUNT; p += 1) {
          const offset = (p / PULSE_COUNT + i * 0.31) % 1;
          const t = (elapsed * PULSE_SPEED + offset) % 1;
          const point = quadPoint(t, x0, y0, cx, cy, x1, y1);

          // Fade in and out at the ends so pulses emerge from the nodes.
          const edgeFade = Math.sin(Math.PI * t);
          if (edgeFade <= 0.02) continue;

          const r = satR * (1.15 + 0.5 * edgeFade);

          ctx.save();
          ctx.globalAlpha = 0.9 * edgeFade;
          ctx.fillStyle = p % 3 === 0 ? palette.accent3 : palette.accent;
          ctx.shadowColor = ctx.fillStyle as string;
          ctx.shadowBlur = r * 4;
          ctx.beginPath();
          ctx.arc(point.x, point.y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      /* --- stages, their satellites and labels --- */
      STAGES.forEach((stage, index) => {
        const cx = px(stage);
        const cy = py(stage);

        // Pointer proximity gently energises the nearest cluster.
        let proximity = 0;
        if (pointer.active) {
          const dx = pointer.x - cx;
          const dy = pointer.y - cy;
          const dist = Math.hypot(dx, dy);
          const reach = short * 0.34;
          proximity = Math.max(0, 1 - dist / reach);
        }

        const orbitR = stage.orbit * short * (1 + proximity * 0.14);
        const accent =
          index === 1 ? palette.accent2 : index === 3 ? palette.accent3 : palette.accent;

        /* satellites + their spokes */
        for (let s = 0; s < stage.satellites; s += 1) {
          const angle =
            (s / stage.satellites) * Math.PI * 2 +
            elapsed * stage.speed +
            index * 0.7;
          const sx = cx + Math.cos(angle) * orbitR;
          const sy = cy + Math.sin(angle) * orbitR * 0.82;

          ctx.save();
          ctx.globalAlpha = 0.2 + proximity * 0.3;
          ctx.strokeStyle = palette.line;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(sx, sy);
          ctx.stroke();
          ctx.restore();

          ctx.save();
          ctx.globalAlpha = 0.55 + proximity * 0.4;
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.arc(sx, sy, satR, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        /* halo */
        const haloR = nodeR * (3.4 + proximity * 1.6);
        const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloR);
        halo.addColorStop(0, accent);
        halo.addColorStop(1, "transparent");
        ctx.save();
        ctx.globalAlpha = 0.17 + proximity * 0.16;
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(cx, cy, haloR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        /* ring */
        ctx.save();
        ctx.globalAlpha = 0.5 + proximity * 0.35;
        ctx.strokeStyle = accent;
        ctx.lineWidth = Math.max(1, short * 0.0026);
        ctx.beginPath();
        ctx.arc(cx, cy, nodeR * 1.9, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        /* core */
        ctx.save();
        ctx.fillStyle = accent;
        ctx.shadowColor = accent;
        ctx.shadowBlur = nodeR * 2.4;
        ctx.beginPath();
        ctx.arc(cx, cy, nodeR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        proximities[index] = proximity;
      });

      /*
       * Labels are drawn in a second pass, after every cluster.
       * Drawn inline they were being overlapped by the orbiting satellites of
       * whichever stage happened to render later.
       */
      const fontSize = Math.max(9, short * 0.0245);
      ctx.save();
      ctx.font = `500 ${fontSize}px ui-monospace, "SF Mono", Menlo, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = `${fontSize * 0.14}px`;

      STAGES.forEach((stage, index) => {
        const cx = px(stage);
        const cy = py(stage);
        const proximity = proximities[index] ?? 0;
        const labelY = cy + nodeR * 5.2;
        const textWidth = ctx.measureText(stage.label).width;

        // Knock a small plate out of the background so the label always reads
        // cleanly, whatever passes behind it.
        ctx.globalAlpha = 0.82;
        ctx.fillStyle = bgColor;
        const plateX = cx - textWidth / 2 - fontSize * 0.45;
        const plateY = labelY - fontSize * 0.78;
        const plateW = textWidth + fontSize * 0.9;
        const plateH = fontSize * 1.56;
        ctx.beginPath();
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(plateX, plateY, plateW, plateH, fontSize * 0.5);
          ctx.fill();
        } else {
          // roundRect is unavailable on older engines; a plain rect reads fine.
          ctx.fillRect(plateX, plateY, plateW, plateH);
        }

        ctx.globalAlpha = 0.78 + proximity * 0.22;
        ctx.fillStyle = palette.dim;
        ctx.fillText(stage.label, cx, labelY);
      });
      ctx.restore();
    };

    /* ------------------------------- loop -------------------------------- */

    const frame = (now: number) => {
      if (startTime === 0) startTime = now;
      draw((now - startTime) / 1000);
      raf = requestAnimationFrame(frame);
    };

    /* ------------------------------ wiring ------------------------------- */

    resize();

    const observer = new ResizeObserver(() => {
      resize();
      // Repaint immediately so a resize never leaves a blank canvas,
      // including in the reduced-motion / paused cases.
      draw(reduced ? 0 : (performance.now() - (startTime || performance.now())) / 1000);
    });
    observer.observe(wrap);

    const onPointerMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
    };
    const onPointerLeave = () => {
      pointerRef.current = { x: -1, y: -1, active: false };
    };

    // Pointer interaction is a nicety, not a requirement — skip it entirely
    // for reduced-motion visitors and on coarse (touch) pointers.
    const wantsPointer =
      !reduced && window.matchMedia("(pointer: fine)").matches;

    if (wantsPointer) {
      wrap.addEventListener("pointermove", onPointerMove);
      wrap.addEventListener("pointerleave", onPointerLeave);
    }

    if (reduced) {
      // A single, composed static frame. No loop is ever scheduled.
      draw(0);
    } else if (inView) {
      raf = requestAnimationFrame(frame);
    } else {
      draw(0);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      if (wantsPointer) {
        wrap.removeEventListener("pointermove", onPointerMove);
        wrap.removeEventListener("pointerleave", onPointerLeave);
      }
      palette = readPalette();
    };
    // `theme` is a dependency because the palette is read from CSS variables.
  }, [reduced, inView, theme]);

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
