import type { MetadataRoute } from "next";
import { tools, categories, blogPosts, getToolBySlug } from "@/data/tools";
import { siteConfig } from "@/data/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = tools.map((tool) => ({
    url: `${siteConfig.url}/tools/${tool.slug}`,
    lastModified: new Date(tool.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryPages = categories.map((cat) => ({
    url: `${siteConfig.url}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const alternativesPages = tools
    .filter((tool) => tool.alternatives.length > 0)
    .map((tool) => ({
      url: `${siteConfig.url}/alternatives/${tool.slug}`,
      lastModified: new Date(tool.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  // Generate compare pages from alternative pairs (deduplicated)
  const compareSeen = new Set<string>();
  const comparePages: MetadataRoute.Sitemap = [];
  for (const tool of tools) {
    for (const altSlug of tool.alternatives) {
      const alt = getToolBySlug(altSlug);
      if (!alt) continue;
      const [a, b] = tool.slug < altSlug ? [tool.slug, altSlug] : [altSlug, tool.slug];
      const key = `${a}-${b}`;
      if (!compareSeen.has(key)) {
        compareSeen.add(key);
        comparePages.push({
          url: `${siteConfig.url}/compare/${a}-vs-${b}`,
          lastModified: new Date("2026-08-24"),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        });
      }
    }
  }

  const bestCategoryPages = categories.map((cat) => ({
    url: `${siteConfig.url}/best/${cat.slug}`,
    lastModified: new Date("2026-08-12"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticFixedDate = new Date("2026-08-12");

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: staticFixedDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/tools`,
      lastModified: staticFixedDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/categories`,
      lastModified: staticFixedDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: staticFixedDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/compare`,
      lastModified: staticFixedDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: staticFixedDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: staticFixedDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: staticFixedDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/submit`,
      lastModified: staticFixedDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/pricing`,
      lastModified: staticFixedDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/advertise`,
      lastModified: staticFixedDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}/favorites`,
      lastModified: staticFixedDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}/best`,
      lastModified: staticFixedDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/free-ai-tools`,
      lastModified: staticFixedDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  return [
    ...staticPages,
    ...toolPages,
    ...categoryPages,
    ...blogPages,
    ...alternativesPages,
    ...bestCategoryPages,
    ...comparePages,
  ];
}
