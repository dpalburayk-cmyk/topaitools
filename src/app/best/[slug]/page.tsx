import { notFound } from "next/navigation";
import { categories, getToolsByCategory, getCategoryBySlug } from "@/data/tools";
import { BestCategoryContent } from "./BestCategoryContent";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export const revalidate = 86400; // Revalidate every 24 hours

interface BestCategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: BestCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  const url = `${siteConfig.url}/best/${category.slug}`;
  return {
    title: `Best ${category.name} AI Tools in 2026 — Ranked & Compared`,
    description: `Discover the best ${category.name.toLowerCase()} AI tools in 2026. Expert rankings, comparisons, and reviews to help you find the perfect ${category.slug.replace(/-/g, " ")} tool.`,
    openGraph: {
      title: `Best ${category.name} AI Tools in 2026 — Ranked & Compared`,
      description: `Compare and rank the top ${category.name.toLowerCase()} AI tools. Features, pricing, ratings, and expert reviews.`,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Best ${category.name} AI Tools in 2026`,
      description: `Expert rankings and comparisons of the top ${category.name.toLowerCase()} AI tools.`,
    },
    alternates: { canonical: url },
  };
}

export default async function BestCategoryPage({ params }: BestCategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(slug)
    .filter((t) => t.slug !== undefined)
    .sort((a, b) => b.rating - a.rating);

  const itemName = category.name.toLowerCase();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best ${category.name} AI Tools`,
    description: `A ranked list of the best ${itemName} AI tools in 2026.`,
    numberOfItems: categoryTools.length,
    itemListElement: categoryTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}/tools/${tool.slug}`,
      name: tool.name,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the best ${itemName} tool?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Based on our rankings, ${categoryTools[0]?.name || "the top-rated tool"} is currently the best ${itemName} tool with a rating of ${categoryTools[0]?.rating || "N/A"}/5. Visit our full comparison to see how it stacks up against other leading tools.`,
        },
      },
      {
        "@type": "Question",
        name: `Are there free ${itemName} tools?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, there are several free ${itemName} tools available. Tools like ${categoryTools.filter((t) => t.pricingModel === "free").map((t) => t.name).slice(0, 3).join(", ") || "various options"} offer free tiers or completely free access.`,
        },
      },
      {
        "@type": "Question",
        name: `Which ${itemName} tool is best for beginners?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `For beginners, we recommend ${categoryTools[0]?.name || "a top-rated tool with a user-friendly interface"}. It offers ${categoryTools[0]?.pricingModel === "free" || categoryTools[0]?.pricingModel === "freemium" ? "a free tier and" : ""} an intuitive interface that makes it easy to get started with ${itemName}.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <BestCategoryContent category={category} tools={categoryTools} />
    </>
  );
}
