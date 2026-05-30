"use client";

import { GitCompare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCompareContext } from "@/components/layout/CompareProvider";

interface CompareButtonProps {
  slug: string;
  className?: string;
}

export function CompareButton({ slug, className }: CompareButtonProps) {
  const { isInCompare, toggleCompare, maxReached, mounted } =
    useCompareContext();

  if (!mounted) {
    return (
      <div className={cn("p-1.5", className)}>
        <GitCompare className="w-4 h-4 text-muted-foreground/30" />
      </div>
    );
  }

  const active = isInCompare(slug);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!active && maxReached) return;
        toggleCompare(slug);
      }}
      className={cn(
        "p-1.5 rounded-lg transition-colors",
        className,
        active
          ? "text-indigo-500 bg-indigo-500/10 hover:bg-indigo-500/20"
          : maxReached
            ? "text-muted-foreground/30 cursor-not-allowed"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
      aria-label={
        active ? "Remove from comparison" : "Add to comparison"
      }
      title={
        maxReached && !active ? "Maximum 4 tools" : undefined
      }
    >
      <GitCompare
        className={cn("w-4 h-4 transition-all", active && "fill-current scale-110")}
      />
    </button>
  );
}
