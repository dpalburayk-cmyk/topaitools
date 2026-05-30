"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "aivault-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch {}
    }
  }, [favorites, mounted]);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite, mounted };
}
