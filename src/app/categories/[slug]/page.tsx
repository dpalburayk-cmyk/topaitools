import { notFound } from "next/navigation";
import { categories, getToolsByCategory, getCategoryBySlug } from "@/data/tools";
import { CategoryDetailContent } from "./CategoryDetailContent";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  const url = `${siteConfig.url}/categories/${category.slug}`;
  return {
    title: `${category.name} AI Tools — ${siteConfig.name}`,
    description: category.description,
    openGraph: {
      title: `${category.name} AI Tools | ${siteConfig.name}`,
      description: category.description,
      url,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} AI Tools | ${siteConfig.name}`,
      description: category.description,
    },
    alternates: { canonical: url },
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} AI Tools - ${siteConfig.name}`,
    description: category.description,
    url: `${siteConfig.url}/categories/${category.slug}`,
    isPartOf: {
      "@type": "WebSite",
      url: siteConfig.url,
      name: siteConfig.name,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categoryTools.length,
      itemListElement: categoryTools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: tool.name,
          url: `${siteConfig.url}/tools/${tool.slug}`,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: tool.rating,
            bestRating: 5,
          },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryDetailContent
        category={category}
        categoryTools={categoryTools}
      />
    </>
  );
}
