import { tools, categories } from "@/data/tools";
import { FreeAiToolsContent } from "./FreeAiToolsContent";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Free AI Tools in 2026 — " + tools.filter((t) => t.pricingModel === "free").length + "+ No-Cost AI Tools",
  description:
    "Browse " +
    tools.filter((t) => t.pricingModel === "free").length +
    "+ completely free AI tools and " +
    tools.filter((t) => t.pricingModel === "freemium").length +
    "+ freemium options. Tested and reviewed by our editorial team — no credit card required.",
  openGraph: {
    title: "Free AI Tools in 2026 — " + tools.filter((t) => t.pricingModel === "free").length + "+ No-Cost Options",
    description:
      "Discover the best free AI tools in 2026. Honest reviews, hands-on testing, and no hidden costs.",
    url: siteConfig.url + "/free-ai-tools",
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Tools in 2026 — No Credit Card Required",
    description:
      "" +
      tools.filter((t) => t.pricingModel === "free").length +
      "+ free AI tools tested and reviewed. Find the perfect no-cost AI tool for your needs.",
  },
  alternates: { canonical: siteConfig.url + "/free-ai-tools" },
};

const freeTools = tools
  .filter((t) => t.pricingModel === "free")
  .sort((a, b) => b.rating - a.rating);

const freemiumTools = tools
  .filter((t) => t.pricingModel === "freemium")
  .sort((a, b) => b.rating - a.rating);

// Get top 50 for JSON-LD ItemList
const allFree = tools.filter(
  (t) => t.pricingModel === "free" || t.pricingModel === "freemium"
);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the best free AI tools in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Some of the best free AI tools in 2026 include " +
          freeTools
            .slice(0, 5)
            .map((t) => t.name)
            .join(", ") +
          ". These tools offer full-featured free access with no credit card required, covering categories like chatbots, image generation, coding, and more.",
      },
    },
    {
      "@type": "Question",
      name: "Are free AI tools as good as paid ones?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Many free AI tools deliver impressive quality that rivals paid alternatives. Tools like " +
          freeTools.slice(0, 2).map((t) => t.name).join(" and ") +
          " are developed by leading AI companies and offer production-grade output. The main differences are typically usage limits, advanced features, and priority support rather than output quality.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between free and freemium AI tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Completely free AI tools have no paid tiers — all features are available at no cost. Freemium tools offer a free tier with basic features and paid plans for advanced capabilities. On our directory, " +
          freeTools.length +
          " tools are completely free and " +
          freemiumTools.length +
          " offer freemium plans.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use free AI tools for commercial projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Commercial usage depends on each tool's terms of service. Many free AI tools allow commercial use, but some restrict it on free tiers. Always check the tool's licensing page for specific details. Our directory links to each tool's website where you can verify their commercial use policy.",
      },
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free AI Tools Directory",
  description:
    "A curated list of " +
    allFree.length +
    " free and freemium AI tools available in 2026.",
  numberOfItems: allFree.length,
  itemListElement: allFree.slice(0, 50).map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: siteConfig.url + "/tools/" + tool.slug,
    name: tool.name,
  })),
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
      name: "Free AI Tools",
      item: siteConfig.url + "/free-ai-tools",
    },
  ],
};

export default function FreeAiToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <FreeAiToolsContent
        freeTools={freeTools}
        freemiumTools={freemiumTools}
        categories={categories}
        allTools={tools}
      />
    </>
  );
}
