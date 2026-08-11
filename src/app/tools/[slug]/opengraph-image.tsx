import { ImageResponse } from "next/og";
import { tools, categories } from "@/data/tools";

export const alt = "Top AI Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  const categoryName = tool ? categories.find((c) => c.slug === tool.category)?.name || tool.category : "AI";
  const name = tool?.name || "Top AI Tools";
  const rating = tool?.rating || "";
  const pricingModel = tool?.pricingModel || "";
  const description = tool?.description || "";

  return new ImageResponse(
    (
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px", background: "radial-gradient(ellipse at top right, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(139,92,246,0.1) 0%, transparent 60%), #0a0a0a" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", maxWidth: 1000, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 60, height: 60, borderRadius: 16, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", marginBottom: 24 }}>
            <span style={{ fontSize: 28, color: "white", fontWeight: 700 }}>AI</span>
          </div>
          <div style={{ fontSize: 20, color: "#a5b4fc", fontWeight: 600, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em", display: "flex" }}>{categoryName}</div>
          <div style={{ fontSize: 48, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em", marginBottom: 12, lineHeight: 1.2, display: "flex" }}>{name.length > 40 ? name.slice(0, 37) + "..." : name}</div>
          <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
            {rating ? <div style={{ fontSize: 20, color: "#fbbf24", fontWeight: 600, display: "flex" }}>{`★ ${rating}/5`}</div> : null}
            {pricingModel ? <div style={{ fontSize: 20, color: "#a1a1aa", textTransform: "capitalize", display: "flex" }}>{pricingModel}</div> : null}
          </div>
          <div style={{ fontSize: 18, color: "#71717a", maxWidth: 800, lineHeight: 1.4, display: "flex" }}>{description.length > 120 ? description.slice(0, 117) + "..." : description}</div>
          <div style={{ fontSize: 20, color: "#71717a", marginTop: 24, display: "flex" }}>topaitools.xyz</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
