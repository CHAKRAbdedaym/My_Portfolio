import type { ProjectVisualKind } from "@/types";
import { cn, seededRandom } from "@/lib/utils";

/**
 * Generated, original artwork for every project card.
 *
 * These are deterministic inline SVGs — no stock imagery, no licensing
 * questions, no network requests, and no layout shift. Each one abstracts the
 * actual subject of its project (an NDVI raster, a Kubernetes cluster, a
 * message-classification flow) rather than being decorative noise.
 *
 * They are also the fallback whenever a real screenshot has not been added
 * yet, which is why they have to be good enough to ship as-is.
 */

const VIEW_W = 400;
const VIEW_H = 260;

type VisualProps = {
  kind: ProjectVisualKind;
  seed: string;
  className?: string;
};

export function ProjectVisual({ kind, seed, className }: VisualProps) {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`grad-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="55%" stopColor="var(--accent-2)" />
          <stop offset="100%" stopColor="var(--accent-3)" />
        </linearGradient>
        <linearGradient id={`ramp-${seed}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-3)" />
        </linearGradient>
        <radialGradient id={`glow-${seed}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <pattern
          id={`grid-${seed}`}
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M20 0H0V20"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.14"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width={VIEW_W} height={VIEW_H} fill={`url(#grid-${seed})`} />
      <Artwork kind={kind} seed={seed} />
    </svg>
  );
}

function Artwork({ kind, seed }: { kind: ProjectVisualKind; seed: string }) {
  switch (kind) {
    case "satellite":
      return <SatelliteArt seed={seed} />;
    case "commerce":
      return <CommerceArt seed={seed} />;
    case "orchestration":
      return <OrchestrationArt seed={seed} />;
    case "agent":
      return <AgentArt seed={seed} />;
    case "architecture":
      return <ArchitectureArt seed={seed} />;
    case "vision":
      return <VisionArt seed={seed} />;
    default:
      return null;
  }
}

/* -------------------------------------------------------------------------- */
/*     satellite — an NDVI raster with a delineated parcel and a scan band     */
/* -------------------------------------------------------------------------- */

function SatelliteArt({ seed }: { seed: string }) {
  const rand = seededRandom(`${seed}-ndvi`);
  const cols = 20;
  const rows = 13;
  const cell = VIEW_W / cols;

  const cells: { x: number; y: number; v: number }[] = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      // Smooth field with a couple of stressed patches — the thing an NDVI
      // analysis is actually looking for.
      const nx = c / cols;
      const ny = r / rows;
      const base =
        0.5 +
        0.32 * Math.sin(nx * 5.2 + ny * 2.1) +
        0.22 * Math.cos(ny * 4.4 - nx * 1.7);
      const v = Math.max(0.04, Math.min(1, base * 0.8 + rand() * 0.28));
      cells.push({ x: c * cell, y: r * (VIEW_H / rows), v });
    }
  }

  return (
    <g>
      {cells.map((c, i) => (
        <rect
          key={i}
          x={c.x + 0.6}
          y={c.y + 0.6}
          width={cell - 1.2}
          height={VIEW_H / rows - 1.2}
          rx="1.5"
          fill={c.v > 0.62 ? "var(--accent-3)" : "var(--accent)"}
          opacity={c.v * 0.42}
        />
      ))}

      {/* delineated insured parcel */}
      <path
        d="M78 62 L214 44 L268 118 L232 196 L104 186 Z"
        fill="var(--accent-3)"
        fillOpacity="0.07"
        stroke="var(--accent-3)"
        strokeOpacity="0.75"
        strokeWidth="1.6"
        strokeDasharray="5 3"
      />
      {[
        [78, 62],
        [214, 44],
        [268, 118],
        [232, 196],
        [104, 186],
      ].map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="2.8"
          fill="var(--accent-3)"
        />
      ))}

      {/* acquisition swath */}
      <rect
        x="286"
        y="0"
        width="52"
        height={VIEW_H}
        fill={`url(#ramp-${seed})`}
        opacity="0.12"
      />
      <line
        x1="286"
        y1="0"
        x2="286"
        y2={VIEW_H}
        stroke="var(--accent-3)"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
      <line
        x1="338"
        y1="0"
        x2="338"
        y2={VIEW_H}
        stroke="var(--accent-3)"
        strokeOpacity="0.5"
        strokeWidth="1"
      />

      {/* NDVI trend sparkline */}
      <path
        d="M300 214 L312 200 L324 206 L336 178 L348 188 L360 158 L372 166 L384 140"
        fill="none"
        stroke="var(--accent-3)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/*      commerce — a catalogue stack, an order flow and a revenue series       */
/* -------------------------------------------------------------------------- */

function CommerceArt({ seed }: { seed: string }) {
  const bars = [26, 44, 36, 62, 54, 82, 70, 104];

  return (
    <g>
      <circle cx="110" cy="96" r="90" fill={`url(#glow-${seed})`} />

      {/* stacked catalogue cards */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${34 + i * 16} ${44 + i * 14})`}>
          <rect
            width="128"
            height="92"
            rx="10"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeOpacity={0.2 + i * 0.18}
            strokeWidth="1.2"
          />
          <rect
            x="12"
            y="12"
            width="46"
            height="46"
            rx="7"
            fill={`url(#grad-${seed})`}
            opacity={0.22 + i * 0.16}
          />
          <rect x="68" y="16" width="46" height="6" rx="3" fill="currentColor" opacity="0.28" />
          <rect x="68" y="28" width="32" height="6" rx="3" fill="currentColor" opacity="0.18" />
          <rect x="68" y="46" width="24" height="10" rx="5" fill="var(--accent)" opacity={0.35 + i * 0.2} />
          <rect x="12" y="70" width="104" height="8" rx="4" fill="currentColor" opacity="0.1" />
        </g>
      ))}

      {/* revenue series */}
      <g transform="translate(250 40)">
        {bars.map((h, i) => (
          <rect
            key={i}
            x={i * 17}
            y={130 - h}
            width="10"
            height={h}
            rx="3"
            fill={`url(#ramp-${seed})`}
            opacity={0.35 + (i / bars.length) * 0.5}
          />
        ))}
        <line
          x1="0"
          y1="136"
          x2="134"
          y2="136"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="1"
        />
      </g>

      {/* checkout status pill */}
      <g transform="translate(250 196)">
        <rect
          width="118"
          height="30"
          rx="15"
          fill="var(--surface)"
          stroke="var(--accent-line)"
          strokeWidth="1"
        />
        <circle cx="19" cy="15" r="5" fill="var(--accent-3)" />
        <rect x="32" y="11" width="66" height="7" rx="3.5" fill="currentColor" opacity="0.24" />
      </g>
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/*   orchestration — a scheduler placing replicas across a node grid (K8s)     */
/* -------------------------------------------------------------------------- */

function OrchestrationArt({ seed }: { seed: string }) {
  const rand = seededRandom(`${seed}-cluster`);
  const nodes = 4;
  const podsPerNode = 6;

  return (
    <g>
      {/* control plane */}
      <g transform="translate(150 16)">
        <rect
          width="100"
          height="34"
          rx="9"
          fill="var(--surface)"
          stroke="var(--accent-line)"
          strokeWidth="1.2"
        />
        <circle cx="20" cy="17" r="6" fill="var(--accent)" />
        <rect x="34" y="13" width="50" height="8" rx="4" fill="currentColor" opacity="0.26" />
      </g>

      {/* scheduling links */}
      {Array.from({ length: nodes }).map((_, i) => {
        const x = 44 + i * 104;
        return (
          <path
            key={i}
            d={`M200 50 C200 78, ${x + 38} 66, ${x + 38} 92`}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.28"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
        );
      })}

      {/* worker nodes */}
      {Array.from({ length: nodes }).map((_, n) => {
        const x = 44 + n * 104 - 26;
        return (
          <g key={n} transform={`translate(${x} 92)`}>
            <rect
              width="88"
              height="118"
              rx="10"
              fill="var(--surface)"
              stroke="currentColor"
              strokeOpacity="0.14"
              strokeWidth="1"
            />
            <rect x="10" y="10" width="34" height="6" rx="3" fill="currentColor" opacity="0.2" />
            {Array.from({ length: podsPerNode }).map((__, p) => {
              const active = rand() > 0.42;
              return (
                <rect
                  key={p}
                  x={10 + (p % 3) * 24}
                  y={28 + Math.floor(p / 3) * 26}
                  width="18"
                  height="18"
                  rx="5"
                  fill={active ? "var(--accent)" : "currentColor"}
                  opacity={active ? 0.55 + rand() * 0.35 : 0.1}
                />
              );
            })}
            <rect
              x="10"
              y="96"
              width={40 + rand() * 34}
              height="5"
              rx="2.5"
              fill="var(--accent-3)"
              opacity="0.45"
            />
          </g>
        );
      })}
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/*    agent — natural language in, classified and embedded records out        */
/* -------------------------------------------------------------------------- */

function AgentArt({ seed }: { seed: string }) {
  const rand = seededRandom(`${seed}-agent`);
  const buckets = ["NOTE", "IDEA", "TASK"];

  return (
    <g>
      <circle cx="80" cy="130" r="86" fill={`url(#glow-${seed})`} />

      {/* incoming messages */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(20 ${64 + i * 46})`}>
          <rect
            width="92"
            height="34"
            rx="10"
            fill="var(--surface)"
            stroke="currentColor"
            strokeOpacity="0.16"
            strokeWidth="1"
          />
          <rect x="12" y="11" width={40 + rand() * 32} height="5" rx="2.5" fill="currentColor" opacity="0.28" />
          <rect x="12" y="21" width={26 + rand() * 24} height="5" rx="2.5" fill="currentColor" opacity="0.16" />
        </g>
      ))}

      {/* classifier core */}
      <g transform="translate(168 100)">
        <circle r="34" cx="34" cy="34" fill="var(--surface)" stroke="var(--accent-line)" strokeWidth="1.4" />
        <circle r="22" cx="34" cy="34" fill="none" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="3 4" />
        <circle r="9" cx="34" cy="34" fill={`url(#grad-${seed})`} />
      </g>

      {/* links in */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M112 ${81 + i * 46} C142 ${81 + i * 46}, 150 134, 168 134`}
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="0.3"
          strokeWidth="1.2"
        />
      ))}

      {/* links out to buckets */}
      {buckets.map((_, i) => (
        <path
          key={i}
          d={`M236 134 C262 134, 268 ${72 + i * 60}, 292 ${72 + i * 60}`}
          fill="none"
          stroke="var(--accent-3)"
          strokeOpacity="0.34"
          strokeWidth="1.2"
        />
      ))}

      {/* classified buckets */}
      {buckets.map((label, i) => (
        <g key={label} transform={`translate(292 ${56 + i * 60})`}>
          <rect
            width="86"
            height="32"
            rx="9"
            fill="var(--surface)"
            stroke="var(--accent-line)"
            strokeWidth="1"
          />
          <circle cx="16" cy="16" r="4.5" fill="var(--accent-3)" opacity={0.9 - i * 0.2} />
          <text
            x="30"
            y="20"
            fill="currentColor"
            fillOpacity="0.55"
            fontSize="9"
            fontFamily="ui-monospace, monospace"
            letterSpacing="1.4"
          >
            {label}
          </text>
        </g>
      ))}
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/*  architecture — API, broker, worker pool and polyglot persistence           */
/* -------------------------------------------------------------------------- */

function ArchitectureArt({ seed }: { seed: string }) {
  const box = (
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    strong = false,
  ) => (
    <g transform={`translate(${x} ${y})`} key={label}>
      <rect
        width={w}
        height={h}
        rx="9"
        fill="var(--surface)"
        stroke={strong ? "var(--accent-line)" : "currentColor"}
        strokeOpacity={strong ? 1 : 0.16}
        strokeWidth="1.2"
      />
      <text
        x={w / 2}
        y={h / 2 + 3.5}
        textAnchor="middle"
        fill="currentColor"
        fillOpacity="0.6"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        letterSpacing="1"
      >
        {label}
      </text>
    </g>
  );

  return (
    <g>
      <circle cx="200" cy="120" r="120" fill={`url(#glow-${seed})`} opacity="0.5" />

      {box(20, 100, 76, 40, "API", true)}
      {box(134, 100, 76, 40, "BROKER", true)}

      {/* worker pool */}
      {[0, 1, 2].map((i) => box(248, 56 + i * 44, 76, 34, `WORKER ${i + 1}`))}

      {/* datastores */}
      {box(134, 186, 76, 34, "POSTGRES")}
      {box(20, 186, 76, 34, "MONGO")}

      {/* wiring */}
      <path d="M96 120 H134" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.4" fill="none" />
      <path d="M128 116 l8 4 -8 4 z" fill="var(--accent)" opacity="0.7" />

      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M210 120 C230 120, 232 ${73 + i * 44}, 248 ${73 + i * 44}`}
          fill="none"
          stroke="var(--accent-3)"
          strokeOpacity="0.38"
          strokeWidth="1.2"
          strokeDasharray="4 3"
        />
      ))}

      <path d="M172 140 V186" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.2" fill="none" />
      <path d="M58 140 V186" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.2" fill="none" />
      <path d="M58 140 H172" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.2" fill="none" />

      {/* queue depth indicator */}
      <g transform="translate(248 190)">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={i}
            x={i * 13}
            y={0}
            width="8"
            height="24"
            rx="3"
            fill="var(--accent)"
            opacity={0.6 - i * 0.08}
          />
        ))}
      </g>
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/*        vision — detection brackets over an abstract landmark mesh          */
/* -------------------------------------------------------------------------- */

function VisionArt({ seed }: { seed: string }) {
  const rand = seededRandom(`${seed}-vision`);
  const points = Array.from({ length: 46 }, () => ({
    x: 150 + (rand() - 0.5) * 130,
    y: 128 + (rand() - 0.5) * 150,
  }));

  const bracket = (x: number, y: number, sx: number, sy: number) => (
    <path
      key={`${x}-${y}`}
      d={`M${x} ${y + sy * 22} V${y} H${x + sx * 22}`}
      fill="none"
      stroke="var(--accent-3)"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  );

  return (
    <g>
      <circle cx="150" cy="128" r="100" fill={`url(#glow-${seed})`} />

      {/* landmark mesh */}
      {points.map((p, i) => {
        const next = points[(i + 7) % points.length];
        return (
          <line
            key={`l-${i}`}
            x1={p.x}
            y1={p.y}
            x2={next.x}
            y2={next.y}
            stroke="var(--accent)"
            strokeOpacity="0.14"
            strokeWidth="0.8"
          />
        );
      })}
      {points.map((p, i) => (
        <circle
          key={`p-${i}`}
          cx={p.x}
          cy={p.y}
          r={1.4 + rand() * 1.6}
          fill="var(--accent-3)"
          opacity={0.35 + rand() * 0.5}
        />
      ))}

      {/* detection box */}
      {bracket(78, 48, 1, 1)}
      {bracket(222, 48, -1, 1)}
      {bracket(78, 208, 1, -1)}
      {bracket(222, 208, -1, -1)}

      {/* confidence readout */}
      <g transform="translate(276 48)">
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(0 ${i * 34})`}>
            <rect width="104" height="24" rx="6" fill="var(--surface)" stroke="currentColor" strokeOpacity="0.14" />
            <rect x="8" y="9" width="10" height="6" rx="3" fill="var(--accent-3)" opacity={0.9 - i * 0.16} />
            <rect
              x="24"
              y="9"
              width={40 + rand() * 34}
              height="6"
              rx="3"
              fill="currentColor"
              opacity="0.22"
            />
          </g>
        ))}
      </g>
    </g>
  );
}
