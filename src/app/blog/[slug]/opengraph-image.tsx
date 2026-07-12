import { ImageResponse } from "next/og";
import { blogPosts } from "@/data/tools";

export const alt = "Top AI Tools Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  const title = post?.title || "Top AI Tools Blog";
  const category = post?.category || "AI";
  const readTime = post?.readTime || "";
  
  return new ImageResponse(
    (
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px", background: "radial-gradient(ellipse at top right, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(139,92,246,0.1) 0%, transparent 60%), #0a0a0a" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", maxWidth: 1000, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 60, height: 60, borderRadius: 16, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", marginBottom: 24 }}>
            <span style={{ fontSize: 28, color: "white", fontWeight: 700 }}>AI</span>
          </div>
          <div style={{ fontSize: 20, color: "#a5b4fc", fontWeight: 600, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em", display: "flex" }}>{category}</div>
          <div style={{ fontSize: 48, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em", marginBottom: 16, textAlign: "center", lineHeight: 1.2, display: "flex" }}>{title.length > 80 ? title.slice(0, 77) + "..." : title}</div>
          {readTime ? <div style={{ fontSize: 20, color: "#a1a1aa", display: "flex" }}>{readTime} min read</div> : null}
          <div style={{ fontSize: 20, color: "#71717a", marginTop: 24, display: "flex" }}>topaitools.xyz/blog</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
