"use client";

import { useFavorites } from "@/hooks/useFavorites";
import { tools } from "@/data/tools";
import { ToolCard } from "@/components/tools/ToolCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Heart, Search } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export default function FavoritesPage() {
  const { favorites, mounted } = useFavorites();

  const favoriteTools = tools.filter((t) => favorites.includes(t.slug));

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <Breadcrumbs items={[{ label: "Favorites" }]} />
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-muted animate-pulse mx-auto mb-4" />
          <div className="h-6 w-48 bg-muted rounded animate-pulse mx-auto mb-2" />
          <div className="h-4 w-64 bg-muted rounded animate-pulse mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs items={[{ label: "Favorites" }]} />

      <div className="flex flex-col gap-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-6 h-6 text-red-500 fill-current" />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              My Favorites
            </h1>
          </div>
          <p className="text-muted-foreground">
            {favorites.length > 0
              ? `${favorites.length} saved AI tool${favorites.length !== 1 ? "s" : ""}`
              : "Your saved AI tools will appear here"}
          </p>
        </div>

        {favoriteTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteTools.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-9 h-9 text-muted-foreground" />
            </div>
            <p className="text-xl font-semibold mb-2">No favorites yet</p>
            <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
              Browse tools and click the heart icon to save your favorites.
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/25"
            >
              <Search className="w-4 h-4" />
              Browse Tools
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
