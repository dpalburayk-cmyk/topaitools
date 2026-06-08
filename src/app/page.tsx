"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { Newsletter } from "@/components/home/Newsletter";
import { ToolCard } from "@/components/tools/ToolCard";
import { CategoryCard } from "@/components/tools/CategoryCard";
import { AdBanner } from "@/components/ui/AdBanner";
import { getFeaturedTools, getTrendingTools, categories, tools } from "@/data/tools";
import { siteConfig } from "@/data/site-config";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Top AI Tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Top AI Tools is a curated directory of ${tools.length}+ AI tools across ${categories.length} categories including chatbots, image generation, video, audio, coding, writing, productivity, design, and research. Each tool includes honest reviews, pros and cons, ratings, and pricing information.`,
      },
    },
    {
      "@type": "Question",
      name: "How does Top AI Tools rank AI tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tools are ranked by genuine editorial ratings based on quality, usability, features, and value for money. We do not accept payment for higher rankings — all reviews are independent and honest.",
      },
    },
    {
      "@type": "Question",
      name: "Is Top AI Tools free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Top AI Tools is completely free to browse. You can search, compare, and read reviews of all AI tools without any cost. You can also save your favorite tools for easy access later.",
      },
    },
    {
      "@type": "Question",
      name: "How can I compare AI tools on Top AI Tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply click the compare button on any tool card, or visit the compare page to select up to 4 tools and see their features, pricing, ratings, and pros/cons side by side.",
      },
    },
  ],
};

export default function HomePage() {
  const featuredTools = getFeaturedTools();
  const trendingTools = getTrendingTools();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection />
      <StatsSection />

      {/* Trending Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-500 text-xs font-medium uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              Trending Now
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Most Popular AI Tools</h2>
          </div>
          <Link
            href="/tools"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingTools.slice(0, 6).map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner slot="inline" />
      </div>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Browse by Category</h2>
          </div>
          <Link
            href="/categories"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            All categories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner slot="inline" />
      </div>

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Featured AI Tools</h2>
          </div>
          <Link
            href="/tools?featured=true"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTools.slice(0, 6).map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </main>
  );
}
