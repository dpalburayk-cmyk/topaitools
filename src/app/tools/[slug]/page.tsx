import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, ExternalLink, Check, X, ArrowLeft, ThumbsUp, ThumbsDown, Tag, Globe, Calendar } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ToolCard } from "@/components/tools/ToolCard";
import { tools, getToolBySlug, getToolsByCategory } from "@/data/tools";
import { getToolLink } from "@/lib/tracking";
import { AdBanner } from "@/components/ui/AdBanner";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { CompareButton } from "@/components/ui/CompareButton";
import type { Metadata } from "next";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} — AI Tool Review`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} | Top AI Tools`,
      description: tool.description,
    },
  };
}

const pricingColors = {
  free: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  freemium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  paid: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const alternatives = tool.alternatives
    .map((a) => tools.find((t) => t.slug === a))
    .filter(Boolean);

  const relatedTools = getToolsByCategory(tool.category)
    .filter((t) => t.slug !== tool.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: "BusinessApplication",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating,
      reviewCount: tool.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      price: tool.pricingModel === "free" ? "0" : undefined,
      priceCurrency: "USD",
      availability: tool.pricingModel === "free" ? "https://schema.org/InStock" : undefined,
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Tools", href: "/tools" },
          { label: tool.name },
        ]}
      />

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20 shrink-0">
                {tool.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{tool.name}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold">{tool.rating}</span>
                    <span className="text-xs text-muted-foreground">({tool.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${pricingColors[tool.pricingModel]}`}>
                    {tool.pricingModel}
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

          {/* Ad Slot */}
          <AdBanner slot="inline" className="my-4" />

          {/* Screenshot placeholder */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Preview</h2>
            <div className="aspect-video rounded-xl border border-border bg-muted/30 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-indigo-500">{tool.name.charAt(0)}</span>
                </div>
                <p className="text-sm">{tool.name} Screenshot</p>
              </div>
            </div>
          </div>

          {/* Alternatives */}
          {alternatives.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Alternatives</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {alternatives.map((alt, i) => alt && <ToolCard key={alt.id} tool={alt} index={i} />)}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ad Slot */}
          <AdBanner slot="sidebar" format="vertical" />

          {/* CTA Card */}
          <div className="sticky top-20 rounded-xl border border-border bg-card p-6 shadow-sm">
            <a
              href={getToolLink(tool)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/25"
            >
              Visit {tool.name}
              <ExternalLink className="w-4 h-4" />
            </a>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                <a href={getToolLink(tool)} target="_blank" rel="noopener noreferrer sponsored" className="text-indigo-500 hover:underline truncate">
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
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {rt.name.charAt(0)}
                    </div>
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
