import { notFound } from "next/navigation";
import { tools, getToolBySlug, getToolsByCategory } from "@/data/tools";
import { ToolDetailContent } from "./ToolDetailContent";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export const revalidate = 0; // Temporarily disabled for content updates - restore to 86400 after

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
      {/* Only BreadcrumbList here; SoftwareApplication, Review, FAQPage are in ToolDetailContent */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ToolDetailContent
        tool={tool}
        alternatives={alternatives}
        relatedTools={relatedTools}
      />
    </>
  );
}
