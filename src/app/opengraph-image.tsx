import { ImageResponse } from "next/og";
import { tools, categories } from "@/data/tools";

export const runtime = "edge";
export const alt = "Top AI Tools - Discover the Best AI Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const statsLabels = [`${tools.length}+ Tools`, `${categories.length} Categories`, "Honest Reviews"];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          padding: "60px",
        }}
      >
        {/* Background gradient accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background:
              "radial-gradient(ellipse at top right, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(139,92,246,0.1) 0%, transparent 60%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          {/* Logo icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 20,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              marginBottom: 30,
            }}
          >
            <span style={{ fontSize: 40, color: "white", fontWeight: 700 }}>AI</span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              marginBottom: 16,
              display: "flex",
            }}
          >
            Top AI Tools
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 28,
              color: "#a1a1aa",
              marginBottom: 40,
              display: "flex",
            }}
          >
            Discover, Compare & Choose the Best AI Tools
          </div>

          {/* Stats badges */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 40,
            }}
          >
            {statsLabels.map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 24px",
                  borderRadius: 9999,
                  backgroundColor: "rgba(99,102,241,0.15)",
                  border: "1px solid rgba(99,102,241,0.3)",
                }}
              >
                <span
                  style={{
                    fontSize: 20,
                    color: "#a5b4fc",
                    fontWeight: 600,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: 22,
              color: "#71717a",
              display: "flex",
            }}
          >
            topaitools.xyz
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
