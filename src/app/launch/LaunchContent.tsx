"use client";

import { Rocket, Star, Search, Globe, Users, Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { tools, categories } from "@/data/tools";
import { ToolCard } from "@/components/tools/ToolCard";

const features = [
  { icon: Search, title: "Smart Search", desc: "Find the perfect AI tool instantly" },
  { icon: Star, title: "Honest Reviews", desc: "Real ratings from real users" },
  { icon: Globe, title: "40+ Tools", desc: "Curated across 9 categories" },
  { icon: Users, title: "Community", desc: "Join thousands of AI enthusiasts" },
];

export function LaunchContent() {
  const featuredTools = tools.filter((tool) => tool.isFeatured).slice(0, 6);

  return (
    <div className="min-h-screen hero-gradient noise-overlay">
      <div className="relative z-10">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-medium mb-6">
            <Rocket className="w-3.5 h-3.5" />
            Launching Today on Product Hunt
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            The Ultimate{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
              AI Tools Directory
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Curated directory of 1,000+ AI tools with honest reviews, comparisons, and insights to help you find the perfect tool.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-500 text-white font-semibold text-base hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/25"
            >
              Explore Tools
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://www.producthunt.com/posts/aivault"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border bg-card font-semibold text-base hover:bg-muted transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Upvote on Product Hunt
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">{tools.length}+</div>
              <div className="text-sm text-muted-foreground">AI Tools Listed</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">5</div>
              <div className="text-sm text-muted-foreground">Blog</div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="text-center p-6 rounded-xl bg-card/50 backdrop-blur border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-3">
                  <f.icon className="w-6 h-6 text-indigo-500" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Tools Preview */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-violet-500 text-xs font-medium uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Featured Tools
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">What&apos;s Inside</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTools.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Ready to find your next AI tool?</h2>
          <p className="text-muted-foreground mb-8">
            Browse our complete directory of 40+ AI tools, read honest reviews, and discover the perfect tool for your needs.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-foreground text-background font-semibold text-base hover:opacity-90 transition-opacity shadow-lg"
          >
            View all
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </div>
    </div>
  );
}
