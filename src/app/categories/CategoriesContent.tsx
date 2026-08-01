"use client";

import { CategoryCard } from "@/components/tools/CategoryCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { categories } from "@/data/tools";

export function CategoriesContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs items={[{ label: "Categories" }]} />

      <div className="mb-10 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Browse by Category
        </h1>
        <p className="text-muted-foreground mb-3">
          Find the perfect AI tool for your specific use case across {categories.length} categories
        </p>
        <p className="text-muted-foreground leading-relaxed text-sm">
          Our AI tools directory is organized into {categories.length} carefully curated categories covering everything from conversational AI and image generation to coding assistants and research tools. Each category features detailed reviews, pricing information, and side-by-side comparisons to help you make informed decisions. Whether you&apos;re a developer looking for the best coding assistant, a marketer exploring AI design tools, or a content creator seeking video generation platforms, you&apos;ll find comprehensive, unbiased evaluations of every tool listed.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <CategoryCard key={cat.id} category={cat} index={i} />
        ))}
      </div>
    </div>
  );
}
