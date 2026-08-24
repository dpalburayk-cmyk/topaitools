import { notFound } from "next/navigation";
import { tools, getToolBySlug, categories } from "@/data/tools";
import { CompareContent } from "./CompareContent";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export const revalidate = 86400;

interface ComparePageProps {
  params: Promise<{ slugs: string[] }>;
}

function parseCompareSlugs(slugs: string[]): { slug1: string; slug2: string } | null {
  // Match pattern: "slug1-vs-slug2"
  const joined = slugs.join("/");
  const match = joined.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;
  return { slug1: match[1], slug2: match[2] };
}

// Generate static pages for every tool's listed alternatives
export async function generateStaticParams() {
  const params: { slugs: string[] }[] = [];
  const seen = new Set<string>();

  for (const tool of tools) {
    for (const altSlug of tool.alternatives) {
      const alt = getToolBySlug(altSlug);
      if (!alt) continue;
      // Normalize: alphabetically first slug first
      const [a, b] =
        tool.slug < altSlug
          ? [tool.slug, altSlug]
          : [altSlug, tool.slug];
      const key = `${a}-vs-${b}`;
      if (!seen.has(key)) {
        seen.add(key);
        params.push({ slugs: [key] });
      }
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: ComparePageProps): Promise<Metadata> {
  const { slugs } = await params;
  const parsed = parseCompareSlugs(slugs);
  if (!parsed) return {};

  const tool1 = getToolBySlug(parsed.slug1);
  const tool2 = getToolBySlug(parsed.slug2);
  if (!tool1 || !tool2) return {};

  const url = `${siteConfig.url}/compare/${parsed.slug1}-vs-${parsed.slug2}`;
  const title = `${tool1.name} vs ${tool2.name} — Comparison in 2026`;
  const description = `Compare ${tool1.name} and ${tool2.name} side by side. Features, pricing, ratings, pros, cons, and our editorial verdict to help you choose the right AI tool.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: { canonical: url },
  };
}

export default async function CompareDynamicPage({
  params,
}: ComparePageProps) {
  const { slugs } = await params;
  const parsed = parseCompareSlugs(slugs);
  if (!parsed) notFound();

  const tool1 = getToolBySlug(parsed.slug1);
  const tool2 = getToolBySlug(parsed.slug2);
  if (!tool1 || !tool2) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Which is better: ${tool1.name} or ${tool2.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Based on our editorial ratings, ${tool1.name} scores ${tool1.rating}/5 and ${tool2.name} scores ${tool2.rating}/5. The better choice depends on your specific needs — ${tool1.name} excels at ${tool1.features[0] || "its core features"} while ${tool2.name} stands out with ${tool2.features[0] || "its strengths"}. Compare their features, pricing, and pros/cons above to make the right decision.`,
        },
      },
      {
        "@type": "Question",
        name: `Is ${tool1.name} or ${tool2.name} free?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${tool1.name} is ${tool1.pricingModel === "free" ? "completely free" : tool1.pricingModel === "freemium" ? "freemium (free tier available)" : "a paid tool"}. ${tool2.name} is ${tool2.pricingModel === "free" ? "completely free" : tool2.pricingModel === "freemium" ? "freemium (free tier available)" : "a paid tool"}.`,
        },
      },
      {
        "@type": "Question",
        name: `Should I switch from ${tool1.name} to ${tool2.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Consider switching if ${tool2.name} offers features you need that ${tool1.name} lacks, or if ${tool2.pricingModel === "free" && tool1.pricingModel !== "free" ? "you prefer a free option" : "its pricing better fits your budget"}. Both tools serve the ${tool1.category} category well.`,
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Compare", item: `${siteConfig.url}/compare` },
      {
        "@type": "ListItem",
        position: 3,
        name: `${tool1.name} vs ${tool2.name}`,
        item: `${siteConfig.url}/compare/${parsed.slug1}-vs-${parsed.slug2}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CompareContent tool1={tool1} tool2={tool2} />
    </>
  );
}
