"use client";

import Link from "next/link";
import { Star, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ToolCard } from "@/components/tools/ToolCard";
import { ToolIcon } from "@/components/tools/ToolIcon";
import { AdBanner } from "@/components/ui/AdBanner";
import { categories } from "@/data/tools";
import type { Tool, Category } from "@/types";

interface BestCategoryContentProps {
  category: Category;
  tools: Tool[];
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

interface FAQItem {
  question: string;
  answer: string;
}

export function BestCategoryContent({ category, tools }: BestCategoryContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const itemName = category.name.toLowerCase();
  const freeTools = tools.filter((t) => t.pricingModel === "free");
  const relatedCategories = categories
    .filter((c) => c.slug !== category.slug)
    .slice(0, 3);

  const faqs: FAQItem[] = [
    {
      question: `What is the best ${itemName} tool?`,
      answer: `Based on our expert rankings, ${tools[0]?.name || "the top-rated tool"} is currently rated as the best ${itemName} AI tool with a score of ${tools[0]?.rating || "N/A"}/5. Our rankings consider factors like features, pricing, user feedback, and overall value. Check the full comparison table above to see how all tools stack up.`,
    },
    {
      question: `Are there free ${itemName} tools?`,
      answer: `Yes! There are ${freeTools.length} free ${itemName} tools available. ${freeTools.map((t) => t.name).slice(0, 3).join(", ") || "Several options"} offer free access. Additionally, many tools have freemium plans that let you try core features before upgrading to a paid plan.`,
    },
    {
      question: `Which ${itemName} tool is best for beginners?`,
      answer: `For beginners, we recommend ${tools[0]?.name || "the top-rated tool"}. It offers ${tools[0]?.pricingModel === "free" || tools[0]?.pricingModel === "freemium" ? "a free tier making it easy to start without commitment" : "a straightforward approach"}, an intuitive interface, and comprehensive documentation. Most beginners find they can get productive within the first session.`,
    },
  ];

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs
        items={[
          { label: "Best AI Tools", href: "/best" },
          { label: category.name },
        ]}
      />

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{category.icon}</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Best {category.name} AI Tools in 2026
          </h1>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {category.longDescription ||
            `Explore our expert ranking of the best ${itemName} AI tools in 2026. Each tool has been evaluated on quality, features, pricing, and user experience.`}
        </p>
      </div>

      {/* Comparison Table */}
      <div className="mb-10 overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="text-left p-3 font-semibold w-12">#</th>
              <th className="text-left p-3 font-semibold">Tool Name</th>
              <th className="text-left p-3 font-semibold">Rating</th>
              <th className="text-left p-3 font-semibold">Pricing</th>
              <th className="text-left p-3 font-semibold">Key Features</th>
              <th className="text-left p-3 font-semibold">Pros</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool, i) => (
              <tr
                key={tool.id}
                className={`border-b border-border hover:bg-muted/20 transition-colors ${
                  i === 0 ? "bg-indigo-500/5" : ""
                }`}
              >
                <td className="p-3">
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                      i === 0
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : i === 1
                          ? "bg-gray-400/10 text-gray-500 dark:text-gray-400"
                          : i === 2
                            ? "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                            : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                </td>
                <td className="p-3">
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="flex items-center gap-2 group"
                  >
                    <ToolIcon
                      name={tool.name}
                      imageUrl={tool.imageUrl}
                      websiteUrl={tool.websiteUrl}
                      size="sm"
                    />
                    <span className="font-medium group-hover:text-indigo-500 transition-colors">
                      {tool.name}
                    </span>
                  </Link>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-medium">{tool.rating}</span>
                  </div>
                </td>
                <td className="p-3">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${pricingColors[tool.pricingModel]}`}
                  >
                    {pricingLabels[tool.pricingModel]}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {tool.features.slice(0, 2).map((f) => (
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
                    {tool.pros[0] || "—"}
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
        <h2 className="text-xl font-semibold mb-6">All {category.name} Tools</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex items-center justify-between w-full p-4 text-left font-medium text-sm hover:bg-muted/20 transition-colors"
                aria-expanded={openFaq === i}
              >
                {faq.question}
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Related Categories */}
      <div className="pt-6 border-t border-border">
        <h2 className="text-lg font-semibold mb-4">Explore Other Categories</h2>
        <div className="flex flex-wrap gap-3">
          {relatedCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/best/${cat.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium hover:border-indigo-500/30 hover:text-indigo-500 transition-colors"
            >
              <span>{cat.icon}</span>
              {cat.name}
            </Link>
          ))}
          <Link
            href="/best"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium hover:border-indigo-500/30 hover:text-indigo-500 transition-colors"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </article>
  );
}
