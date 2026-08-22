import { notFound } from "next/navigation";
import { tools, getToolBySlug, getToolsByCategory } from "@/data/tools";
import { ToolDetailContent } from "./ToolDetailContent";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export const revalidate = 86400; // Revalidate every 24 hours

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  const url = `${siteConfig.url}/tools/${tool.slug}`;
  return {
    title: `${tool.name} — AI Tool Review`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} | Top AI Tools`,
      description: tool.description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [`/tools/${tool.slug}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} — AI Tool Review | Top AI Tools`,
      description: tool.description,
    },
    alternates: { canonical: url },
  };
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const alternatives = tool.alternatives
    .map((a) => tools.find((t) => t.slug === a))
    .filter(Boolean);

  const relatedTools = getToolsByCategory(tool.category)
    .filter((t) => t.slug !== tool.slug)
    .slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    url: `${siteConfig.url}/tools/${tool.slug}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    image: tool.imageUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating,
      reviewCount: Math.min(Math.floor(tool.popularityScore / 100), 999),
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      price: tool.pricingModel === "free" ? "0" : undefined,
      priceCurrency: "USD",
      availability: tool.pricingModel === "free" ? "https://schema.org/InStock" : undefined,
      category: tool.pricingModel === "free" ? "Free" : tool.pricingModel === "freemium" ? "Freemium" : "Paid",
    },
  };

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: tool.name,
      operatingSystem: "Web",
      applicationCategory: "BusinessApplication",
    },
    author: {
      "@type": "Organization",
      name: "Top AI Tools",
      url: siteConfig.url,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: tool.rating,
      bestRating: 5,
      worstRating: 1,
    },
    description: tool.longDescription,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Tools",
        item: `${siteConfig.url}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: `${siteConfig.url}/tools/${tool.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `What is ${tool.name}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: tool.longDescription.slice(0, 200) + (tool.longDescription.length > 200 ? "..." : ""),
                },
              },
              {
                "@type": "Question",
                name: `Is ${tool.name} free?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    tool.pricingModel === "free"
                      ? `Yes, ${tool.name} is completely free to use.`
                      : tool.pricingModel === "freemium"
                        ? `${tool.name} offers a free tier with basic features, as well as paid plans for advanced functionality.`
                        : `No, ${tool.name} is a paid tool. It requires a subscription to access its features.`,
                },
              },
              {
                "@type": "Question",
                name: `What are the best alternatives to ${tool.name}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: alternatives.length > 0
                    ? `The best alternatives to ${tool.name} include ${alternatives.map((a) => a!.name).join(", ")}. Each offers different strengths in terms of features, pricing, and user experience.`
                    : `There are currently no listed alternatives to ${tool.name} in our directory.`,
                },
              },
            ],
          }),
        }}
      />
      <ToolDetailContent
        tool={tool}
        alternatives={alternatives}
        relatedTools={relatedTools}
      />
    </>
  );
}
