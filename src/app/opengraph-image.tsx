import { ImageResponse } from "next/og";

import { personal } from "@/data";
import { siteConfig } from "@/lib/site";

export const alt = `${personal.name} — ${personal.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card, generated at build time.
 *
 * Deliberately uses only system-safe fonts and plain divs — no external font
 * fetch, so the build never depends on the network being available.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07080b",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* accent bloom */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 380,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(91,140,255,0.30), rgba(7,8,11,0) 68%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -320,
            left: -160,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(139,124,255,0.22), rgba(7,8,11,0) 70%)",
            display: "flex",
          }}
        />

        {/* header */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              border: "1px solid rgba(91,140,255,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#e9ecf3",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            AC
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "#7b8296",
              letterSpacing: 4,
            }}
          >
            PORTFOLIO
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#7ba4ff",
              letterSpacing: 1,
              marginBottom: 18,
            }}
          >
            {personal.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              color: "#e9ecf3",
              letterSpacing: -3,
              lineHeight: 1.05,
              maxWidth: 960,
            }}
          >
            {personal.headline.lead} {personal.headline.accent}.
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.10)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", fontSize: 24, color: "#9ba2b5" }}>
            {personal.title} · {personal.disciplines.join(" · ")}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#7b8296" }}>
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
