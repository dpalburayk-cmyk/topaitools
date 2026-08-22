"use client";

import Link from "next/link";
import { categories } from "@/data/tools";
import { ArrowRight } from "lucide-react";

export default function BestIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
        Best AI Tools by Category — Ranked &amp; Compared
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-10">
        Explore our curated rankings of the best AI tools across every category. Each page ranks
        tools by rating and provides detailed comparisons to help you make the right choice.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/best/${cat.slug}`}
            className="group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{cat.icon}</span>
              <h2 className="font-semibold text-lg group-hover:text-indigo-500 transition-colors">
                Best {cat.name}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {cat.description}
            </p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <span className="text-xs text-muted-foreground">
                {cat.toolCount} tools ranked
              </span>
              <span className="text-xs font-medium text-indigo-500 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                View Rankings
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
