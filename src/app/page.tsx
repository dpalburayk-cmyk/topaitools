import Link from "next/link";
import { ArrowRight, TrendingUp, Star, Zap } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { Newsletter } from "@/components/home/Newsletter";
import { ToolCard } from "@/components/tools/ToolCard";
import { CategoryCard } from "@/components/tools/CategoryCard";
import { getFeaturedTools, getTrendingTools, categories } from "@/data/tools";

export default function HomePage() {
  const featuredTools = getFeaturedTools();
  const trendingTools = getTrendingTools();

  return (
    <main>
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

      {/* Categories */}
      <section className="border-t border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-violet-500 text-xs font-medium uppercase tracking-wider mb-2">
                <Zap className="w-3.5 h-3.5" />
                Browse by Category
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Find Tools by Use Case</h2>
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
            {categories.slice(0, 8).map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-amber-500 text-xs font-medium uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5" />
              Editor&apos;s Choice
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Featured AI Tools</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTools.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      </section>

      <Newsletter />

      {/* Trust Bar */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-xs text-muted-foreground uppercase tracking-wider mb-8">
            Trusted by teams at
          </p>
          <div className="flex items-center justify-center flex-wrap gap-x-12 gap-y-4 opacity-40">
            {["Google", "Meta", "Amazon", "Microsoft", "Apple", "Netflix"].map((brand) => (
              <span key={brand} className="text-lg font-bold tracking-tight">{brand}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
