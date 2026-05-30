"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ToolCard } from "@/components/tools/ToolCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Pagination } from "@/components/ui/Pagination";
import { tools, categories } from "@/data/tools";
import type { PricingModel } from "@/types";

const TOOLS_PER_PAGE = 12;

const pricingOptions: { value: PricingModel | "all"; label: string }[] = [
  { value: "all", label: "All Pricing" },
  { value: "free", label: "Free" },
  { value: "freemium", label: "Freemium" },
  { value: "paid", label: "Paid" },
];

const ratingOptions = [
  { value: 0, label: "All Ratings" },
  { value: 4, label: "4+ Stars" },
  { value: 3, label: "3+ Stars" },
];

const sortOptions = [
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Name A-Z" },
  { value: "newest", label: "Newest" },
];

export default function ToolsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [pricing, setPricing] = useState<PricingModel | "all">(
    (searchParams.get("pricing") as PricingModel | "all") || "all"
  );
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [sort, setSort] = useState(searchParams.get("sort") || "rating");
  const [minRating, setMinRating] = useState(Number(searchParams.get("rating")) || 0);
  const [trendingOnly, setTrendingOnly] = useState(searchParams.get("trending") === "true");
  const [featuredOnly, setFeaturedOnly] = useState(searchParams.get("featured") === "true");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [showFilters, setShowFilters] = useState(false);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, pricing, category, sort, minRating, trendingOnly, featuredOnly]);

  const updateURL = useCallback(
    (params: Record<string, string>) => {
      const sp = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([k, v]) => {
        if (v && v !== "all" && v !== "0" && v !== "rating") {
          sp.set(k, v);
        } else {
          sp.delete(k);
        }
      });
      router.replace(`/tools?${sp.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const filteredTools = useMemo(() => {
    let result = [...tools];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.includes(q))
      );
    }

    if (pricing !== "all") {
      result = result.filter((t) => t.pricingModel === pricing);
    }

    if (category !== "all") {
      result = result.filter((t) => t.category === category);
    }

    if (minRating > 0) {
      result = result.filter((t) => t.rating >= minRating);
    }

    if (trendingOnly) {
      result = result.filter((t) => t.isTrending);
    }

    if (featuredOnly) {
      result = result.filter((t) => t.isFeatured);
    }

    switch (sort) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        break;
    }

    return result;
  }, [search, pricing, category, sort, minRating, trendingOnly, featuredOnly]);

  const totalPages = Math.ceil(filteredTools.length / TOOLS_PER_PAGE);
  const paginatedTools = filteredTools.slice(
    (page - 1) * TOOLS_PER_PAGE,
    page * TOOLS_PER_PAGE
  );

  const activeFilterCount = [
    search.length > 0,
    pricing !== "all",
    category !== "all",
    minRating > 0,
    trendingOnly,
    featuredOnly,
  ].filter(Boolean).length;

  const hasActiveFilters = activeFilterCount > 0;

  const clearFilters = () => {
    setSearch("");
    setPricing("all");
    setCategory("all");
    setSort("rating");
    setMinRating(0);
    setTrendingOnly(false);
    setFeaturedOnly(false);
    setPage(1);
    router.replace("/tools", { scroll: false });
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    updateURL({ page: String(p) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs items={[{ label: "Tools" }]} />

      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            AI Tools Directory
          </h1>
          <p className="text-muted-foreground">
            Browse {tools.length} AI tools across {categories.length} categories
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tools by name, description, or tag..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                updateURL({ q: e.target.value });
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-muted-foreground"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  updateURL({ q: "" });
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              updateURL({ sort: e.target.value });
            }}
            className="px-4 py-2.5 rounded-xl bg-card border border-border text-sm outline-none focus:border-indigo-500 cursor-pointer appearance-none min-w-[160px]"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "sm:hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors",
              hasActiveFilters
                ? "border-indigo-500/50 bg-indigo-500/5 text-indigo-500"
                : "border-border hover:bg-accent"
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-indigo-500 text-white text-[10px] font-bold px-1">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filters */}
        <div
          className={cn(
            "flex-col gap-4",
            showFilters ? "flex" : "hidden sm:flex"
          )}
        >
          {/* Pricing Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider shrink-0">
              Pricing:
            </span>
            {pricingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setPricing(option.value);
                  updateURL({ pricing: option.value });
                }}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-medium transition-colors",
                  pricing === option.value
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {option.label}
                <span className="ms-1 text-[10px] opacity-60">
                  {option.value === "all"
                    ? tools.length
                    : tools.filter((t) => t.pricingModel === option.value).length}
                </span>
              </button>
            ))}
          </div>

          {/* Category Filter - all 9 categories */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider shrink-0">
              Category:
            </span>
            <button
              onClick={() => {
                setCategory("all");
                updateURL({ category: "" });
              }}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-medium transition-colors shrink-0",
                category === "all"
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => {
                  setCategory(cat.slug);
                  updateURL({ category: cat.slug });
                }}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-medium transition-colors",
                  category === cat.slug
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {/* Rating Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider shrink-0">
              Rating:
            </span>
            {ratingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setMinRating(option.value);
                  updateURL({ rating: String(option.value) });
                }}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-medium transition-colors",
                  minRating === option.value
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Toggle Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider shrink-0">
              Show:
            </span>
            <button
              onClick={() => {
                setTrendingOnly(!trendingOnly);
                updateURL({ trending: String(!trendingOnly) });
              }}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-medium transition-colors",
                trendingOnly
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              🔥 Trending
            </button>
            <button
              onClick={() => {
                setFeaturedOnly(!featuredOnly);
                updateURL({ featured: String(!featuredOnly) });
              }}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-medium transition-colors",
                featuredOnly
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              ⭐ Featured
            </button>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors self-start"
            >
              <X className="w-3 h-3" />
              Clear all filters
              <span className="px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 text-[10px] font-bold ms-1">
                {activeFilterCount}
              </span>
            </button>
          )}
        </div>

        {/* Results */}
        <div className="text-sm text-muted-foreground">
          {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""} found
          {page > 1 && (
            <span className="ms-2">
              · Page {page} of {totalPages}
            </span>
          )}
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedTools.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} index={i} />
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium mb-2">No tools found</p>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Try adjusting your search or filters to find what you&apos;re looking
              for.
            </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-accent transition-colors"
            >
              <X className="w-4 h-4" />
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
