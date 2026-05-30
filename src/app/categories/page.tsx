import { CategoryCard } from "@/components/tools/CategoryCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { categories } from "@/data/tools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse AI tools by category — from text generation to healthcare.",
};

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs items={[{ label: "Categories" }]} />

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Browse by Category
        </h1>
        <p className="text-muted-foreground">
          Find the perfect AI tool for your specific use case across {categories.length} categories
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
