import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

const categoryGradients = [
  "from-indigo-500 to-violet-500",
  "from-rose-500 to-pink-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-sky-500 to-cyan-500",
  "from-fuchsia-500 to-purple-500",
  "from-lime-500 to-green-500",
  "from-red-500 to-rose-500",
  "from-blue-500 to-indigo-500",
  "from-teal-500 to-emerald-500",
  "from-violet-500 to-purple-500",
  "from-orange-500 to-amber-500",
  "from-pink-500 to-rose-500",
  "from-cyan-500 to-sky-500",
];

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const gradient = categoryGradients[index % categoryGradients.length];

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300",
        "hover:shadow-lg hover:border-indigo-500/30 hover:-translate-y-0.5",
        "animate-fade-in-up",
        `stagger-${Math.min(index + 1, 6)}`
      )}
    >
      <div className={cn("absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity -translate-y-1/2 translate-x-1/2", gradient)} />

      <div className="relative z-10">
        <h3 className="font-semibold text-base mb-1 group-hover:text-indigo-500 transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{category.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full">
            {category.toolCount} tools
          </span>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </Link>
  );
}
