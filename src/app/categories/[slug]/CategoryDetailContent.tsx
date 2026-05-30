"use client";

import { ToolCard } from "@/components/tools/ToolCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { Category, Tool } from "@/types";

interface CategoryDetailContentProps {
  category: Category;
  categoryTools: Tool[];
}

export function CategoryDetailContent({ category, categoryTools }: CategoryDetailContentProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs
        items={[
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
      />

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          {category.name} Tools
        </h1>
        <p className="text-muted-foreground">
          {categoryTools.length} tools in this category
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryTools.map((tool, i) => (
          <ToolCard key={tool.id} tool={tool} index={i} />
        ))}
      </div>

      {categoryTools.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg font-medium mb-2">No tools in this category yet. Check back soon or submit a tool.</p>
        </div>
      )}
    </div>
  );
}
