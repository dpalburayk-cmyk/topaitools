"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ToolCard } from "@/components/tools/ToolCard";
import { ToolIcon } from "@/components/tools/ToolIcon";
import { AdBanner } from "@/components/ui/AdBanner";
import type { Tool } from "@/types";

interface AlternativesContentProps {
  tool: Tool;
  alternatives: Tool[];
}

const pricingColors = {
  free: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  freemium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  paid: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

const pricingLabels = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export function AlternativesContent({ tool, alternatives }: AlternativesContentProps) {
  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs
        items={[
          { label: "Tools", href: "/tools" },
          { label: tool.name, href: `/tools/${tool.slug}` },
          { label: "Alternatives" },
        ]}
      />

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Best {tool.name} Alternatives in 2026
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mt-4">
          Looking for alternatives to {tool.name}? {tool.longDescription}{" "}
          Whether you need different features, a more affordable price, or just want to explore
          your options, here is a carefully ranked comparison of the best{" "}
          {tool.category.replace(/-/g, " ")} tools that compete with {tool.name}.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="mb-10 overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="text-left p-3 font-semibold">Tool Name</th>
              <th className="text-left p-3 font-semibold">Rating</th>
              <th className="text-left p-3 font-semibold">Pricing</th>
              <th className="text-left p-3 font-semibold">Key Features</th>
              <th className="text-left p-3 font-semibold">Pros</th>
            </tr>
          </thead>
          <tbody>
            {alternatives.map((alt, i) => (
              <tr
                key={alt.id}
                className={`border-b border-border hover:bg-muted/20 transition-colors ${i === 0 ? "bg-indigo-500/5" : ""}`}
              >
                <td className="p-3">
                  <Link
                    href={`/tools/${alt.slug}`}
                    className="flex items-center gap-2 group"
                  >
                    <ToolIcon
                      name={alt.name}
                      imageUrl={alt.imageUrl}
                      websiteUrl={alt.websiteUrl}
                      size="sm"
                    />
                    <span className="font-medium group-hover:text-indigo-500 transition-colors">
                      {alt.name}
                    </span>
                  </Link>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-medium">{alt.rating}</span>
                  </div>
                </td>
                <td className="p-3">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${pricingColors[alt.pricingModel]}`}
                  >
                    {pricingLabels[alt.pricingModel]}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {alt.features.slice(0, 2).map((f) => (
                      <span
                        key={f}
                        className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3">
                  <span className="text-xs text-muted-foreground">
                    {alt.pros[0] || "—"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ad Banner */}
      <AdBanner slot="inline" className="my-6" />

      {/* Tool Cards Grid */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-6">
          Explore Each Alternative
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {alternatives.map((alt, i) => (
            <ToolCard key={alt.id} tool={alt} index={i} />
          ))}
        </div>
      </div>

      {/* Internal Link */}
      <div className="text-center pt-6 border-t border-border">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/25"
        >
          Explore more tools
        </Link>
      </div>
    </article>
  );
}
