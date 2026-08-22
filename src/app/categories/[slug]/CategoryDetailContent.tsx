"use client";

import { Fragment } from "react";
import { ToolCard } from "@/components/tools/ToolCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AdBanner } from "@/components/ui/AdBanner";
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
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{category.icon}</span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {category.name}
          </h1>
        </div>
        <p className="text-lg text-muted-foreground mb-1">
          {categoryTools.length} tools in this category
        </p>
        {category.longDescription && (
          <p className="text-muted-foreground leading-relaxed max-w-3xl mt-3">
            {category.longDescription}
          </p>
        )}
      </div>

      {[0, 6, 12, 18].map((chunkStart) => {
        const chunk = categoryTools.slice(chunkStart, chunkStart + 6);
        if (chunk.length === 0) return null;
        return (
          <Fragment key={chunkStart}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {chunk.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} index={chunkStart + i} />
              ))}
            </div>
                      </Fragment>
        );
      })}

      {categoryTools.length > 0 && (
        <div className="mt-8">
          <AdBanner slot="inline" />
        </div>
      )}

      {categoryTools.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg font-medium mb-2">No tools in this category yet. Check back soon or submit a tool.</p>
        </div>
      )}
    </div>
  );
}
