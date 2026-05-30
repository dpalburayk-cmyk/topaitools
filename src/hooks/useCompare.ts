"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "aivault-compare";
const MAX_COMPARE = 4;

export function useCompare() {
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCompareSlugs(JSON.parse(stored));
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(compareSlugs));
      } catch {}
    }
  }, [compareSlugs, mounted]);

  const addToCompare = useCallback((slug: string) => {
    setCompareSlugs((prev) => {
      if (prev.length >= MAX_COMPARE || prev.includes(slug)) return prev;
      return [...prev, slug];
    });
  }, []);

  const removeFromCompare = useCallback((slug: string) => {
    setCompareSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  const toggleCompare = useCallback((slug: string) => {
    setCompareSlugs((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length < MAX_COMPARE
          ? [...prev, slug]
          : prev
    );
  }, []);

  const isInCompare = useCallback(
    (slug: string) => compareSlugs.includes(slug),
    [compareSlugs]
  );

  const clearCompare = useCallback(() => setCompareSlugs([]), []);

  return {
    compareSlugs,
    addToCompare,
    removeFromCompare,
    toggleCompare,
    isInCompare,
    clearCompare,
    mounted,
    maxReached: compareSlugs.length >= MAX_COMPARE,
  };
}
