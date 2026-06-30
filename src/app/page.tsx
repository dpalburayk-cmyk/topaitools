"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, Clock, BookOpen } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Newsletter } from "@/components/home/Newsletter";
import { ToolCard } from "@/components/tools/ToolCard";
import { CategoryCard } from "@/components/tools/CategoryCard";
import { AdBanner } from "@/components/ui/AdBanner";
import { getFeaturedTools, getTrendingTools, categories, tools, blogPosts } from "@/data/tools";
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
      <WhyChooseUs />

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

      {/* Latest from the Blog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-500 text-xs font-medium uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              Blog
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Latest from the Blog</h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            All posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-indigo-500/30 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="aspect-[2/1] bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center">
                <span className="text-4xl font-bold text-indigo-500/20">{post.title.charAt(0)}</span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime} min read
                  </span>
                </div>
                <h3 className="font-semibold text-base mb-2 group-hover:text-indigo-500 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-end mt-4 pt-4 border-t border-border">
                  <span className="text-xs font-medium text-indigo-500 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    Read
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </main>
  );
}
