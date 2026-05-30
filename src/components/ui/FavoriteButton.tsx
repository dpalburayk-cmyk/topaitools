"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  slug: string;
  className?: string;
}

export function FavoriteButton({ slug, className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, mounted } = useFavorites();

  if (!mounted) {
    return (
      <div className={cn("p-1.5", className)}>
        <Heart className="w-4 h-4 text-muted-foreground/30" />
      </div>
    );
  }

  const active = isFavorite(slug);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(slug);
      }}
      className={cn(
        "p-1.5 rounded-lg transition-colors",
        className,
        active
          ? "text-red-500 hover:bg-red-500/10"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={cn("w-4 h-4 transition-all", active && "fill-current scale-110")}
      />
    </button>
  );
}
