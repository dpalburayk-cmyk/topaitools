import { NextRequest, NextResponse } from "next/server";
import { tools } from "@/data/tools";

interface IndexNowPayload {
  host: string;
  key: string;
  urlList: string[];
}

// Submit all tool URLs to Google and Bing via IndexNow API
// This runs as a POST endpoint that can be triggered manually or via webhook
export async function POST(_request: NextRequest) {
  const siteUrl = "https://topaitools.xyz";

  const urls = [
    siteUrl,
    `${siteUrl}/tools`,
    `${siteUrl}/blog`,
    `${siteUrl}/categories`,
    ...tools.map((tool) => `${siteUrl}/tools/${tool.slug}`),
    ...tools.map((tool) => `${siteUrl}/tools/${tool.slug}`).slice(0, 100), // extra push
  ];

  // Remove duplicates
  const uniqueUrls = [...new Set(urls)];

  const results: { engine: string; status: string; message: string }[] = [];

  // 1. Submit to Google IndexNow API
  try {
    const googleRes = await fetch("https://indexnow.google.com/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: "topaitools.xyz",
        key: process.env.GOOGLE_INDEXNOW_KEY || "topaitools-indexnow-key",
        urlList: uniqueUrls.slice(0, 200), // max 200 per request
      }),
    });
    results.push({
      engine: "Google",
      status: googleRes.ok ? "success" : "failed",
      message: googleRes.ok ? `Submitted ${uniqueUrls.slice(0, 200).length} URLs` : `Error: ${googleRes.status}`,
    });
  } catch (e) {
    results.push({ engine: "Google", status: "failed", message: "Network error" });
  }

  // 2. Submit to Bing IndexNow API
  try {
    const bingRes = await fetch("https://www.bing.com/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: "topaitools.xyz",
        key: process.env.BING_INDEXNOW_KEY || "topaitools-indexnow-key",
        urlList: uniqueUrls.slice(0, 200),
      }),
    });
    results.push({
      engine: "Bing",
      status: bingRes.ok ? "success" : "failed",
      message: bingRes.ok ? `Submitted ${uniqueUrls.slice(0, 200).length} URLs` : `Error: ${bingRes.status}`,
    });
  } catch (e) {
    results.push({ engine: "Bing", status: "failed", message: "Network error" });
  }

  // 3. Submit remaining URLs in batches
  const remaining = uniqueUrls.slice(200);
  for (let i = 0; i < remaining.length; i += 200) {
    const batch = remaining.slice(i, i + 200);
    try {
      await fetch("https://www.bing.com/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: "topaitools.xyz",
          key: process.env.BING_INDEXNOW_KEY || "topaitools-indexnow-key",
          urlList: batch,
        }),
      });
    } catch {}
  }

  return NextResponse.json({
    success: true,
    submitted: uniqueUrls.length,
    engines: results,
  });
}

// Also allow GET for easy triggering
export async function GET() {
  return NextResponse.json({
    message: "Send a POST request to /api/ping-search-engines to submit all URLs to Google and Bing IndexNow",
    toolCount: tools.length,
  });
}
