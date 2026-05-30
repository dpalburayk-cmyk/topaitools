import Link from "next/link";
import { Star, ExternalLink, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Tool } from "@/types";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { CompareButton } from "@/components/ui/CompareButton";

interface ToolCardProps {
  tool: Tool;
  index?: number;
}

const pricingColors = {
  free: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  freemium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  paid: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

export function ToolCard({ tool, index = 0 }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        "group relative flex flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300",
        "hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5",
        "animate-fade-in-up",
        `stagger-${Math.min(index + 1, 6)}`
      )}
    >
      <div className="card-shine absolute inset-0 rounded-xl" />

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20">
              {tool.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-sm group-hover:text-indigo-500 transition-colors">{tool.name}</h3>
              <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full capitalize", pricingColors[tool.pricingModel])}>
                {tool.pricingModel}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <FavoriteButton slug={tool.slug} />
            <CompareButton slug={tool.slug} />
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-medium">{tool.rating}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {tool.features.slice(0, 3).map((feature) => (
            <span key={feature} className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium">
              {feature}
            </span>
          ))}
          {tool.features.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium">
              +{tool.features.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground capitalize">{tool.category.replace(/-/g, " ")}</span>
          <span className="text-xs font-medium text-indigo-500 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
            View Details
            <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
