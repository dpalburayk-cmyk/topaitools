import { notFound } from "next/navigation";
import { ToolCard } from "@/components/tools/ToolCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { categories, getToolsByCategory, getCategoryBySlug } from "@/data/tools";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} AI Tools`,
    description: category.description,
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(slug);

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
          {category.name} AI Tools
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
          <p className="text-lg font-medium mb-2">No tools in this category yet</p>
          <p className="text-sm text-muted-foreground">Check back soon or <a href="/submit" className="text-indigo-500 hover:underline">submit a tool</a></p>
        </div>
      )}
    </div>
  );
}
