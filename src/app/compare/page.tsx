"use client";

import { useCompareContext } from "@/components/layout/CompareProvider";
import { tools, categories } from "@/data/tools";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  Star,
  ExternalLink,
  Check,
  X,
  GitCompare,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { getToolLink } from "@/lib/tracking";
import { cn } from "@/lib/utils";

const pricingColors = {
  free: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  freemium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  paid: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

export default function ComparePage() {
  const { compareSlugs, removeFromCompare, clearCompare, mounted } =
    useCompareContext();

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-muted animate-pulse mx-auto mb-4" />
          <div className="h-6 w-48 bg-muted rounded animate-pulse mx-auto mb-2" />
          <div className="h-4 w-64 bg-muted rounded animate-pulse mx-auto" />
        </div>
      </div>
    );
  }

  const compareTools = compareSlugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean);

  const renderCell = (
    tool: (typeof tools)[0],
    key: string
  ) => {
    switch (key) {
      case "description":
        return (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {tool.description}
          </p>
        );

      case "pricing":
        return (
          <span
            className={cn(
              "text-xs font-medium px-2.5 py-1 rounded-full capitalize inline-block",
              pricingColors[tool.pricingModel]
            )}
          >
            {tool.pricingModel}
          </span>
        );

      case "rating":
        return (
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500 fill-current" />
            <span className="font-semibold">{tool.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({tool.reviewCount.toLocaleString()} reviews)
            </span>
          </div>
        );

      case "category": {
        const cat = categories.find((c) => c.slug === tool.category);
        return (
          <Link
            href={`/categories/${tool.category}`}
            className="text-sm text-indigo-500 hover:underline inline-flex items-center gap-1"
          >
            {cat ? cat.icon : "📁"}{" "}
            {cat ? cat.name : tool.category.replace(/-/g, " ")}
          </Link>
        );
      }

      case "features":
        return (
          <ul className="space-y-1.5">
            {tool.features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-1.5 text-sm"
              >
                <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        );

      case "pros":
        return (
          <ul className="space-y-1.5">
            {tool.pros.map((p) => (
              <li
                key={p}
                className="flex items-start gap-1.5 text-sm text-emerald-600 dark:text-emerald-400"
              >
                <Check className="w-3 h-3 mt-0.5 shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        );

      case "cons":
        return (
          <ul className="space-y-1.5">
            {tool.cons.map((c) => (
              <li
                key={c}
                className="flex items-start gap-1.5 text-sm text-red-600 dark:text-red-400"
              >
                <X className="w-3 h-3 mt-0.5 shrink-0" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        );

      case "website":
        return (
          <a
            href={getToolLink(tool)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-500 hover:underline inline-flex items-center gap-1 truncate"
          >
            {tool.websiteUrl}
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        );

      default:
        return null;
    }
  };

  const validTools = compareTools.filter(Boolean) as (typeof tools)[0][];

  // Check if values differ for highlighting
  const hasDifference = (key: string) => {
    if (validTools.length <= 1) return false;
    const values = validTools.map((t) => {
      if (key === "pricing") return t.pricingModel;
      if (key === "category") return t.category;
      if (key === "rating") return t.rating;
      return "";
    });
    return !values.every((v) => v === values[0]);
  };

  const compareRows = [
    { key: "description", label: "Description" },
    { key: "pricing", label: "Pricing" },
    { key: "rating", label: "Rating" },
    { key: "category", label: "Category" },
    { key: "features", label: "Key Features" },
    { key: "pros", label: "Pros" },
    { key: "cons", label: "Cons" },
    { key: "website", label: "Website" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs
        items={[
          { label: "Tools", href: "/tools" },
          { label: "Compare" },
        ]}
      />

      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <GitCompare className="w-6 h-6 text-indigo-500" />
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Compare Tools
              </h1>
            </div>
            <p className="text-muted-foreground">
              {compareTools.length > 0
                ? `Comparing ${compareTools.length} AI tool${compareTools.length !== 1 ? "s" : ""} side by side`
                : "Compare up to 4 AI tools side by side"}
            </p>
          </div>
          {compareTools.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={clearCompare}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-accent transition-colors"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <ArrowLeft className="w-4 h-4" />
                Add More
              </Link>
            </div>
          )}
        </div>

        {/* Empty State */}
        {compareTools.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-6">
              <GitCompare className="w-9 h-9 text-muted-foreground" />
            </div>
            <p className="text-xl font-semibold mb-2">No tools to compare</p>
            <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
              Browse tools and click the compare button to add them here.
              You can compare up to 4 tools side by side.
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/25"
            >
              Browse Tools
            </Link>
          </div>
        )}

        {/* Comparison Table - Desktop */}
        {compareTools.length > 0 && (
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              {/* Tool Headers */}
              <thead>
                <tr>
                  <th className="sticky start-0 z-10 w-40 bg-background p-0">
                    <div className="p-4 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider text-start">
                      Attribute
                    </div>
                  </th>
                  {compareTools.map(
                    (tool) =>
                      tool && (
                        <th key={tool.id} className="p-0 min-w-[200px]">
                          <div className="p-4 border-b border-border text-center">
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-500/20">
                                {tool.name.charAt(0)}
                              </div>
                              <div>
                                <Link
                                  href={`/tools/${tool.slug}`}
                                  className="font-semibold text-sm hover:text-indigo-500 transition-colors"
                                >
                                  {tool.name}
                                </Link>
                                <div className="flex items-center gap-1 justify-center mt-1">
                                  <Star className="w-3 h-3 text-amber-500 fill-current" />
                                  <span className="text-xs font-medium">
                                    {tool.rating}
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => removeFromCompare(tool.slug)}
                                className="text-xs text-muted-foreground hover:text-red-500 transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </th>
                      )
                  )}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.key}>
                    <td className="sticky start-0 z-10 bg-background p-4 border-b border-border">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {row.label}
                      </span>
                    </td>
                    {compareTools.map(
                      (tool) =>
                        tool && (
                          <td
                            key={`${row.key}-${tool.id}`}
                            className={cn(
                              "p-4 border-b border-border align-top",
                              hasDifference(row.key) &&
                                "bg-indigo-500/[0.03]"
                            )}
                          >
                            {renderCell(tool, row.key)}
                          </td>
                        )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Comparison Cards - Mobile */}
        {compareTools.length > 0 && (
          <div className="md:hidden space-y-6">
            {compareTools.map(
              (tool) =>
                tool && (
                  <div
                    key={tool.id}
                    className="rounded-xl border border-border bg-card overflow-hidden"
                  >
                    {/* Tool Header */}
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                          {tool.name.charAt(0)}
                        </div>
                        <div>
                          <Link
                            href={`/tools/${tool.slug}`}
                            className="font-semibold text-sm hover:text-indigo-500 transition-colors"
                          >
                            {tool.name}
                          </Link>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Star className="w-3 h-3 text-amber-500 fill-current" />
                            <span className="text-xs font-medium">
                              {tool.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCompare(tool.slug)}
                        className="text-xs text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Tool Details */}
                    <div className="divide-y divide-border">
                      {compareRows.map((row) => (
                        <div
                          key={row.key}
                          className="px-4 py-3"
                        >
                          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block mb-1">
                            {row.label}
                          </span>
                          {renderCell(tool, row.key)}
                        </div>
                      ))}
                    </div>
                  </div>
                )
            )}
          </div>
        )}

        {/* Visit Buttons */}
        {compareTools.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center">
            {compareTools.map(
              (tool) =>
                tool && (
                  <a
                    key={tool.id}
                    href={getToolLink(tool)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/25"
                  >
                    Visit {tool.name}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
