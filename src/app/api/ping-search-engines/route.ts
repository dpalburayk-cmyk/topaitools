import { NextRequest, NextResponse } from "next/server";
import { tools, categories } from "@/data/tools";
import { blogPosts } from "@/data/tools";

// IndexNow key — must match the key file at /public/topaitools2026.txt
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "topaitools2026";

// Recommended IndexNow endpoints (official)
const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://indexnow.google.com/indexnow",
  "https://search.yahoo.com/indexnow",
  "https://search.yahoo.co.jp/indexnow",
];

interface IndexNowPayload {
  host: string;
  key: string;
  urlList: string[];
}

// Submit all URLs to IndexNow via multiple endpoints
export async function POST(_request: NextRequest) {
  const siteUrl = "https://topaitools.xyz";

  const urls = [
    siteUrl,
    `${siteUrl}/tools`,
    `${siteUrl}/blog`,
    `${siteUrl}/categories`,
    `${siteUrl}/compare`,
    `${siteUrl}/about`,
    ...tools.map((tool) => `${siteUrl}/tools/${tool.slug}`),
    ...categories.map((cat) => `${siteUrl}/categories/${cat.slug}`),
    ...blogPosts.map((post) => `${siteUrl}/blog/${post.slug}`),
  ];

  // Remove duplicates
  const uniqueUrls = [...new Set(urls)];

  const results: { engine: string; status: string; message: string }[] = [];

  // Submit to all IndexNow endpoints (they all share the same API)
  const batches: string[][] = [];
  for (let i = 0; i < uniqueUrls.length; i += 200) {
    batches.push(uniqueUrls.slice(i, i + 200));
  }

  for (const endpoint of INDEXNOW_ENDPOINTS) {
    const engineName = new URL(endpoint).hostname;
    try {
      for (const batch of batches) {
        const payload: IndexNowPayload = {
          host: "topaitools.xyz",
          key: INDEXNOW_KEY,
          urlList: batch,
        };

        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(payload),
        });

        if (res.ok || res.status === 202) {
          results.push({
            engine: engineName,
            status: "success",
            message: `Submitted ${batch.length} URLs (${res.status})`,
          });
        } else {
          results.push({
            engine: engineName,
            status: "failed",
            message: `Error: ${res.status} ${res.statusText}`,
          });
        }
      }
    } catch (e) {
      results.push({
        engine: engineName,
        status: "failed",
        message: "Network error",
      });
    }
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
