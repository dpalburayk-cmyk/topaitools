import Link from "next/link";
import { Star, ExternalLink, Check, X, ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ToolIcon } from "@/components/tools/ToolIcon";
import { AdBanner } from "@/components/ui/AdBanner";
import { getToolLink } from "@/lib/tracking";
import { cn } from "@/lib/utils";
import { categories } from "@/data/tools";
import type { Tool } from "@/types";

const pricingColors = {
  free: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  freemium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  paid: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

export function CompareContent({
  tool1,
  tool2,
}: {
  tool1: Tool;
  tool2: Tool;
}) {
  const tools = [tool1, tool2];
  const winner = tool1.rating >= tool2.rating ? tool1 : tool2;
  const loser = tool1.rating >= tool2.rating ? tool2 : tool1;

  const cat = categories.find((c) => c.slug === tool1.category);
  const catName = cat ? cat.name : tool1.category.replace(/-/g, " ");

  const renderCell = (tool: Tool, key: string) => {
    switch (key) {
      case "pricing":
        return (
          <span
            className={cn(
              "text-xs font-medium px-2.5 py-1 rounded-full capitalize inline-block",
              pricingColors[tool.pricingModel]
            )}
          >
            {tool.pricingModel.charAt(0).toUpperCase() + tool.pricingModel.slice(1)}
          </span>
        );
      case "rating":
        return (
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500 fill-current" />
            <span className="font-semibold">{tool.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({tool.popularityScore.toLocaleString()})
            </span>
          </div>
        );
      case "category":
        return (
          <Link
            href={`/categories/${tool.category}`}
            className="text-sm text-indigo-500 hover:underline inline-flex items-center gap-1"
          >
            {cat ? cat.icon : "📁"}{" "}
            {cat ? cat.name : tool.category.replace(/-/g, " ")}
          </Link>
        );
      case "features":
        return (
          <ul className="space-y-1.5">
            {tool.features.map((f) => (
              <li key={f} className="flex items-center gap-1.5 text-sm">
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
      default:
        return null;
    }
  };

  const compareRows = [
    { key: "pricing", label: "Pricing" },
    { key: "rating", label: "Rating" },
    { key: "category", label: "Category" },
    { key: "features", label: "Key Features" },
    { key: "pros", label: "Pros" },
    { key: "cons", label: "Cons" },
  ];

  const hasDiff = (key: string) => {
    if (key === "pricing") return tool1.pricingModel !== tool2.pricingModel;
    if (key === "rating") return tool1.rating !== tool2.rating;
    if (key === "category") return tool1.category !== tool2.category;
    return false;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs
        items={[
          { label: "Tools", href: "/tools" },
          { label: "Compare", href: "/compare" },
          { label: `${tool1.name} vs ${tool2.name}` },
        ]}
      />

      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <ToolIcon
              name={tool1.name}
              imageUrl={tool1.imageUrl}
              websiteUrl={tool1.websiteUrl}
              size="md"
            />\n            <span className="text-xl font-bold text-muted-foreground">vs</span>

            <ToolIcon
              name={tool2.name}
              imageUrl={tool2.imageUrl}
              websiteUrl={tool2.websiteUrl}
              size="md"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            {tool1.name} vs {tool2.name}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A detailed side-by-side comparison of two leading {catName.toLowerCase()} tools. We compare features, pricing, ratings, and real-world pros and cons to help you decide which tool is right for you in 2026.
          </p>
        </div>

        {/* Quick Verdict */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold mb-2">Our Verdict</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {winner.name} earns our recommendation with a rating of {winner.rating}/5 compared to {loser.name}&apos;s {loser.rating}/5. {winner.name} stands out for {winner.features.slice(0, 2).join(" and ")}, while {loser.name} offers strengths in {loser.features.slice(0, 2).join(" and ")}. If budget is a concern, {tool1.pricingModel === "free" && tool2.pricingModel !== "free" ? tool1.name : tool2.pricingModel === "free" && tool1.pricingModel !== "free" ? tool2.name : "both tools"} {tool1.pricingModel === "free" && tool2.pricingModel !== "free" ? "has the advantage of being completely free" : tool2.pricingModel === "free" && tool1.pricingModel !== "free" ? "has the advantage of being completely free" : "offer competitive pricing"}. Ultimately, the best choice depends on your specific workflow and priorities.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <a
              href={getToolLink(winner)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/25"
            >
              Visit {winner.name} (Recommended)
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={getToolLink(loser)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-accent transition-colors"
            >
              Visit {loser.name}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* SEO Content */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold">
            Comparing {tool1.name} and {tool2.name}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Choosing between {tool1.name} and {tool2.name} comes down to what matters most for your use case. {tool1.name} is {tool1.pricingModel === "free" ? "a completely free" : tool1.pricingModel === "freemium" ? "a freemium" : "a premium"} {catName.toLowerCase()} tool with a {tool1.rating}/5 editorial rating, known for {tool1.features[0]?.toLowerCase() || "its core features"}. {tool2.name}, rated {tool2.rating}/5, is {tool2.pricingModel === "free" ? "a free" : tool2.pricingModel === "freemium" ? "a freemium" : "a paid"} alternative that excels at {tool2.features[0]?.toLowerCase() || "its strengths"}.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-40 bg-background p-4 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider text-start">
                  Attribute
                </th>
                {tools.map((tool) => (
                  <th
                    key={tool.id}
                    className="p-4 border-b border-border text-center min-w-[200px]"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Link href={`/tools/${tool.slug}`}>
                        <span className="font-semibold hover:text-indigo-500 transition-colors">
                          {tool.name}
                        </span>
                      </Link>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500 fill-current" />
                        <span className="text-xs font-medium">{tool.rating}</span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row) => (
                <tr key={row.key}>
                  <td className="p-4 border-b border-border">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {row.label}
                    </span>
                  </td>
                  {tools.map((tool) => (
                    <td
                      key={`${row.key}-${tool.id}`}
                      className={cn(
                        "p-4 border-b border-border align-top",
                        hasDiff(row.key) && "bg-indigo-500/[0.03]"
                      )}
                    >
                      {renderCell(tool, row.key)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="my-4">
          <AdBanner slot="inline" />
        </div>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="rounded-xl border border-border bg-card p-5 hover:border-indigo-500/50 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <ToolIcon
                  name={tool.name}
                  imageUrl={tool.imageUrl}
                  websiteUrl={tool.websiteUrl}
                  size="lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold group-hover:text-indigo-500 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {tool.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full capitalize",
                        pricingColors[tool.pricingModel]
                      )}
                    >
                      {tool.pricingModel}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {tool.features.length} features
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Compare Tool
          </Link>
        </div>
      </div>
    </div>
  );
}
