import { notFound } from "next/navigation";
import { tools, getToolBySlug } from "@/data/tools";
import { AlternativesContent } from "./AlternativesContent";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export const revalidate = 86400; // Revalidate every 24 hours

interface AlternativesPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tools
    .filter((tool) => tool.alternatives.length > 0)
    .map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: AlternativesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  const url = `${siteConfig.url}/alternatives/${tool.slug}`;
  return {
    title: `Best ${tool.name} Alternatives (2026) — Ranked & Compared`,
    description: `Discover the best alternatives to ${tool.name} in 2026. Compare features, pricing, ratings, and pros to find the perfect ${tool.category.replace(/-/g, " ")} tool for your needs.`,
    openGraph: {
      title: `Best ${tool.name} Alternatives (2026) — Ranked & Compared`,
      description: `Discover the best alternatives to ${tool.name} in 2026. Compare features, pricing, ratings, and pros.`,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Best ${tool.name} Alternatives (2026)`,
      description: `Compare the top alternatives to ${tool.name}. Find the right ${tool.category.replace(/-/g, " ")} tool for you.`,
    },
    alternates: { canonical: url },
  };
}

export default async function AlternativesPage({ params }: AlternativesPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const alternatives = tool.alternatives
    .map((a) => tools.find((t) => t.slug === a))
    .filter(Boolean) as NonNullable<ReturnType<typeof getToolBySlug>>[];

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best Alternatives to ${tool.name}`,
    description: `A ranked list of the best alternatives to ${tool.name} in 2026.`,
    numberOfItems: alternatives.length,
    itemListElement: alternatives.map((alt, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}/tools/${alt.slug}`,
      name: alt.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <AlternativesContent tool={tool} alternatives={alternatives} />
    </>
  );
}
