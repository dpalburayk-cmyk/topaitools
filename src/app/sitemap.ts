import type { MetadataRoute } from "next";
import { tools, categories, blogPosts } from "@/data/tools";
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

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/tools`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...toolPages,
    ...categoryPages,
    ...blogPages,
  ];
}
