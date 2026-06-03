"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { tools, categories } from "@/data/tools";

export function HeroSection() {
  return (
    <section className="relative hero-gradient noise-overlay overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Updated daily with the latest AI tools</span>
          </div>

          <h1 className="animate-fade-in-up stagger-1 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Discover the{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
              best AI tools
            </span>
          </h1>

          <p className="animate-fade-in-up stagger-2 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Curated directory of {tools.length}+ AI tools with honest reviews, comparisons, and insights to help you find the perfect tool.
          </p>

          <div className="animate-fade-in-up stagger-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity shadow-lg"
            >
              Explore Tools
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border font-medium text-sm hover:bg-accent transition-colors"
            >
              Submit Your Tool
            </Link>
          </div>

          <div className="animate-fade-in-up stagger-4 flex items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{tools.length}+ Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>{categories.length} Categories</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-500" />
              <span>Daily Updates</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
