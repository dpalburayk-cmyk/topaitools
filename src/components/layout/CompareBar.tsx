"use client";

import { X, GitCompare, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCompareContext } from "@/components/layout/CompareProvider";
import { tools } from "@/data/tools";

export function CompareBar() {
  const { compareSlugs, removeFromCompare, clearCompare, mounted } =
    useCompareContext();

  if (!mounted || compareSlugs.length === 0) return null;

  const selectedTools = compareSlugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean);

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur-xl border-t border-border shadow-lg shadow-black/10 animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide flex-1">
            <GitCompare className="w-4 h-4 text-indigo-500 shrink-0" />
            <div className="flex items-center gap-2">
              {selectedTools.map(
                (tool) =>
                  tool && (
                    <div
                      key={tool.id}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted text-sm shrink-0"
                    >
                      <span className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-[10px] font-bold overflow-hidden">
                        {tool.imageUrl ? (
                          <img src={tool.imageUrl} alt={tool.name} className="w-full h-full object-cover" />
                        ) : (
                          tool.name.charAt(0)
                        )}
                      </span>
                      <span className="font-medium text-xs whitespace-nowrap">
                        {tool.name}
                      </span>
                      <button
                        onClick={() => removeFromCompare(tool.slug)}
                        className="p-0.5 hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={clearCompare}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Clear Comparison"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <Link
              href="/compare"
              className="px-4 py-2 rounded-xl bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/25 inline-flex items-center gap-2"
            >
              Compare ({selectedTools.length})
              <GitCompare className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
