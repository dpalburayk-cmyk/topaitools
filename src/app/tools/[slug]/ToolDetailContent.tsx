"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star, ExternalLink, Check, X, ThumbsUp, ThumbsDown,
  Tag, Globe, Calendar, ChevronDown, ArrowRight,
  Sparkles, DollarSign, Users, Lightbulb, HelpCircle,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ToolCard } from "@/components/tools/ToolCard";
import { ToolIcon } from "@/components/tools/ToolIcon";
import { tools, getToolsByCategory } from "@/data/tools";
import { getToolLink, track } from "@/lib/tracking";
import { AdBanner } from "@/components/ui/AdBanner";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { CompareButton } from "@/components/ui/CompareButton";
import type { Tool } from "@/types";

interface ToolDetailContentProps {
  tool: Tool;
  alternatives: (Tool | undefined)[];
  relatedTools: Tool[];
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

export function ToolDetailContent({ tool, alternatives, relatedTools }: ToolDetailContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs
        items={[
          { label: "Tools", href: "/tools" },
          { label: tool.name },
        ]}
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildSoftwareAppSchema(tool)),
        }}
      />
      {tool.faqs && tool.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildFaqSchema(tool)),
          }}
        />
      )}

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-start gap-4 mb-4">
              <ToolIcon name={tool.name} imageUrl={tool.imageUrl} websiteUrl={tool.websiteUrl} size="lg" className="shadow-lg shadow-indigo-500/20" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{tool.name}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold">{tool.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      / 5
                    </span>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${pricingColors[tool.pricingModel]}`}>
                    {pricingLabels[tool.pricingModel]}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">{tool.longDescription}</p>
            <div className="flex items-center gap-3 mt-3">
              <ShareButtons url={`https://topaitools.xyz/tools/${tool.slug}`} title={`${tool.name} — AI Tool Review | Top AI Tools`} />
              <FavoriteButton slug={tool.slug} className="p-2 rounded-lg border border-border hover:bg-accent transition-colors" />
              <CompareButton slug={tool.slug} className="p-2 rounded-lg border border-border hover:bg-accent transition-colors" />
            </div>
          </div>

          {/* Best For Badges */}
          {tool.bestFor && tool.bestFor.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Best For</h2>
              <div className="flex flex-wrap gap-2">
                {tool.bestFor.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Use Cases */}
          {tool.useCases && tool.useCases.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">
                <Lightbulb className="w-5 h-5 inline-block mr-2 text-amber-500" />
                Common Use Cases
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {tool.useCases.map((uc) => (
                  <div key={uc} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-sm leading-relaxed">{uc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Key Features</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {tool.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* In-Depth Review Section */}
          {tool.review && (
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <h2 className="text-lg font-semibold mb-4">Our Review</h2>
              <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4">
                {tool.review.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}

          {/* Pros & Cons */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <h3 className="flex items-center gap-2 font-semibold text-sm mb-3 text-emerald-600 dark:text-emerald-400">
                <ThumbsUp className="w-4 h-4" />
                Pros
              </h3>
              <ul className="space-y-2">
                {tool.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
              <h3 className="flex items-center gap-2 font-semibold text-sm mb-3 text-red-600 dark:text-red-400">
                <ThumbsDown className="w-4 h-4" />
                Cons
              </h3>
              <ul className="space-y-2">
                {tool.cons.map((con) => (
                  <li key={con} className="flex items-start gap-2 text-sm">
                    <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pricing Details */}
          {tool.pricingDetails && (
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <h2 className="text-lg font-semibold mb-4">
                <DollarSign className="w-5 h-5 inline-block mr-2 text-emerald-500" />
                Pricing
              </h2>
              <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                {tool.pricingDetails.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}

          {/* Ad Slot */}
          <AdBanner slot="inline" className="my-4" />

          {/* FAQ Section */}
          {tool.faqs && tool.faqs.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">
                <HelpCircle className="w-5 h-5 inline-block mr-2 text-indigo-500" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {tool.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border bg-card overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
                    >
                      <span className="font-medium text-sm pr-4">{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                          openFaq === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Visit Website Card */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Visit {tool.name}</h2>
            <div className="rounded-xl border border-border bg-gradient-to-br from-indigo-500/5 via-card to-violet-500/5 p-6">
              <div className="flex items-center gap-4 mb-4">
                <ToolIcon name={tool.name} imageUrl={tool.imageUrl} websiteUrl={tool.websiteUrl} size="xl" className="shadow-lg shadow-indigo-500/20" />
                <div>
                  <h3 className="font-semibold text-lg">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{tool.category.replace(/-/g, " ")}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{tool.longDescription}</p>
              <a
                href={getToolLink(tool)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                onClick={() => track.toolVisit(tool.name, tool.slug)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/25"
              >
                Visit {tool.name}
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-[11px] text-muted-foreground mt-2">We may earn a commission from tool links.</p>
            </div>
          </div>

          {/* Alternatives */}
          {alternatives.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Alternatives to {tool.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Looking for something different? Here are the top alternatives to {tool.name} that users also compare.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {alternatives.map((alt, i) => alt && <ToolCard key={alt.id} tool={alt} index={i} />)}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <AdBanner slot="sidebar" format="vertical" />

          {/* CTA Card */}
          <div className="sticky top-20 rounded-xl border border-border bg-card p-6 shadow-sm">
            <a
              href={getToolLink(tool)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => track.toolVisit(tool.name, tool.slug)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/25"
            >
              Try {tool.name} Free
              <ExternalLink className="w-4 h-4" />
            </a>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                <a href={getToolLink(tool)} target="_blank" rel="noopener noreferrer sponsored" onClick={() => track.toolVisit(tool.name, tool.slug)} className="text-indigo-500 hover:underline truncate">
                  {tool.websiteUrl}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>Updated {tool.updatedAt}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Tag className="w-4 h-4 text-muted-foreground shrink-0" />
                <Link href={`/categories/${tool.category}`} className="text-indigo-500 hover:underline capitalize">
                  {tool.category.replace(/-/g, " ")}
                </Link>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {tool.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-sm mb-4">Related Tools</h3>
              <div className="space-y-3">
                {relatedTools.map((rt) => (
                  <Link
                    key={rt.id}
                    href={`/tools/${rt.slug}`}
                    className="flex items-center gap-3 group"
                  >
                    <ToolIcon name={rt.name} imageUrl={rt.imageUrl} websiteUrl={rt.websiteUrl} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-indigo-500 transition-colors">{rt.name}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500 fill-current" />
                        <span className="text-xs text-muted-foreground">{rt.rating}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

function buildSoftwareAppSchema(tool: Tool): object {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.longDescription,
    url: tool.websiteUrl,
    applicationCategory: getCategoryType(tool.category),
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: tool.pricingModel === "free" ? "0" : undefined,
      priceCurrency: "USD",
      availability: "https://schema.org/OnlineOnly",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating.toString(),
      bestRating: "5",
      worstRating: "1",
      ratingCount: Math.max(10, Math.round(tool.popularityScore / 50)).toString(),
    },
  };
}

function buildFaqSchema(tool: Tool): object {
  if (!tool.faqs || tool.faqs.length === 0) return {};
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function getCategoryType(category: string): string {
  const map: Record<string, string> = {
    chatbot: "ChatApplication",
    image: "DesignApplication",
    video: "MultimediaApplication",
    audio: "MultimediaApplication",
    code: "DeveloperApplication",
    text: "BusinessApplication",
    productivity: "BusinessApplication",
    design: "DesignApplication",
    research: "SearchApplication",
  };
  return map[category] || "Application";
}