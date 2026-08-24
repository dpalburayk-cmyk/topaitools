"use client";

import { useMemo, useState } from "react";
import { ToolCard } from "@/components/tools/ToolCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AdBanner } from "@/components/ui/AdBanner";
import type { Tool, Category } from "@/types";

const TOOLS_PER_PAGE = 12;

export function FreeAiToolsContent({
  freeTools,
  freemiumTools,
  categories,
  allTools,
}: {
  freeTools: Tool[];
  freemiumTools: Tool[];
  categories: Category[];
  allTools: Tool[];
}) {
  const [showFreemium, setShowFreemium] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [page, setPage] = useState(1);

  const activeTools = showFreemium ? freemiumTools : freeTools;

  const filteredTools = useMemo(() => {
    let result = selectedCategory === "all"
      ? [...activeTools]
      : activeTools.filter((t) => t.category === selectedCategory);
    return result.sort((a, b) => b.rating - a.rating);
  }, [activeTools, selectedCategory]);

  const totalPages = Math.ceil(filteredTools.length / TOOLS_PER_PAGE);
  const paginatedTools = filteredTools.slice(
    (page - 1) * TOOLS_PER_PAGE,
    page * TOOLS_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setPage(1);
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: activeTools.length };
    for (const cat of categories) {
      const count = activeTools.filter((t) => t.category === cat.slug).length;
      if (count > 0) counts[cat.slug] = count;
    }
    return counts;
  }, [activeTools, categories]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Free AI Tools" },
        ]}
      />

      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Free AI Tools in 2026 — {freeTools.length}+ Completely Free Options
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
          Discover the best free AI tools available in 2026. Every tool listed here is either completely free or offers a generous free tier — no hidden costs, no credit card required to get started. Our editorial team has tested each tool hands-on to verify that the free access is genuinely useful, not just a trial that runs out in minutes.
        </p>
      </div>

      {/* Toggle between Free and Freemium */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <button
          onClick={() => { setShowFreemium(false); setPage(1); }}
          className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${
            !showFreemium
              ? "bg-foreground text-background"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          Completely Free ({freeTools.length})
        </button>
        <button
          onClick={() => { setShowFreemium(true); setPage(1); }}
          className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${
            showFreemium
              ? "bg-foreground text-background"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          Free Tier / Freemium ({freemiumTools.length})
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider shrink-0">
          Category:
        </span>
        {Object.entries(categoryCounts).map(([slug, count]) => (
          <button
            key={slug}
            onClick={() => handleCategoryChange(slug)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === slug
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {slug === "all" ? "All" : categories.find((c) => c.slug === slug)?.icon + " " + categories.find((c) => c.slug === slug)?.name || slug}
            <span className="ms-1 text-[10px] opacity-60">{count}</span>
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground mb-4">
        {filteredTools.length} {showFreemium ? "freemium" : "free"} tools found
        {page > 1 && (
          <span className="ms-2">· Page {page} of {totalPages}</span>
        )}
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {paginatedTools.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </div>
          <div className="my-8">
            <AdBanner slot="inline" />
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPage(p);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    page === p
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-lg font-medium mb-2">No tools found in this category.</p>
          <p className="text-sm text-muted-foreground">Try selecting a different category above.</p>
        </div>
      )}

      {/* SEO Content Section */}
      <div className="mt-16 max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
        <h2 className="text-2xl font-bold text-foreground">
          Why Choose Free AI Tools?
        </h2>
        <p>
          The AI tools landscape in 2026 offers an impressive selection of free options that rival their paid counterparts. Whether you are a student on a budget, a startup founder testing ideas, or simply exploring what AI can do, free tools provide a risk-free way to experiment and build. Many of the tools listed on this page are developed by major companies like Google, Meta, and OpenAI, which means you get enterprise-grade technology at zero cost.
        </p>
        <p>
          Our editorial team evaluates each free AI tool based on three criteria: the actual usefulness of the free tier (not just a token trial), output quality compared to paid alternatives, and any limitations that might frustrate real-world usage. We also note when a free tool requires creating an account, has usage caps, or watermarks output — so you know exactly what to expect before signing up.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          Free vs. Freemium: What is the Difference?
        </h2>
        <p>
          <strong>Completely free tools</strong> have no paid tiers at all — all features are available to every user. These are ideal for long-term projects where you need consistent access without worrying about hitting a paywall. Examples include open-source models and tools backed by large companies as public services.
        </p>
        <p>
          <strong>Freemium tools</strong> offer a free tier with basic features and paid plans that unlock advanced capabilities, higher usage limits, or priority support. The free tier is often sufficient for casual use, light projects, or evaluation purposes. If you find yourself regularly bumping into usage limits, upgrading to a paid plan typically costs between $10 and $30 per month for individual users.
        </p>

        <h2 className="text-2xl font-bold text-foreground">
          How Often Is This Page Updated?
        </h2>
        <p>
          We update this page regularly as tools change their pricing models, new free tools launch, and existing ones adjust their free tier offerings. Our last review was in August 2026. If you notice a tool that has changed from free to paid (or vice versa), let us know at hello@topaitools.xyz and we will update the listing promptly.
        </p>
      </div>
    </div>
  );
}
