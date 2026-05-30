"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

  const pages: number[] = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav className="flex items-center justify-center gap-1 mt-8" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {start > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              1 === currentPage
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            1
          </button>
          {start > 2 && (
            <span className="px-2 text-muted-foreground text-sm">...</span>
          )}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={cn(
            "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
            p === currentPage
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="px-2 text-muted-foreground text-sm">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              totalPages === currentPage
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
