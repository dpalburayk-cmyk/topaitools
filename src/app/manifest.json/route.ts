import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site-config";

export async function GET() {
  const manifest = {
    name: siteConfig.name,
    short_name: "TopAI",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#3b82f6",
    orientation: "portrait-primary",
    categories: ["productivity", "utilities", "education"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: `${siteConfig.url}/og.png`,
        sizes: "1200x630",
        type: "image/png",
        purpose: "og image",
      },
    ],
  };

  return NextResponse.json(manifest, {
    headers: {
      "Cache-Control": "s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
