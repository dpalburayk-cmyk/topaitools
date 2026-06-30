import {
  Brain,
  Image,
  Video,
  Music,
  Code,
  PenTool,
  Zap,
  Palette,
  Search,
  TrendingUp,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const CATEGORY_STYLES: Record<string, { gradient: string; icon: LucideIcon }> = {
  roundup: {
    gradient: "from-blue-500/20 via-indigo-500/15 to-cyan-500/20",
    icon: TrendingUp,
  },
  comparison: {
    gradient: "from-purple-500/20 via-violet-500/15 to-pink-500/20",
    icon: BarChart3,
  },
  guide: {
    gradient: "from-green-500/20 via-emerald-500/15 to-teal-500/20",
    icon: Lightbulb,
  },
  review: {
    gradient: "from-amber-500/20 via-orange-500/15 to-red-500/20",
    icon: BarChart3,
  },
  "ai news": {
    gradient: "from-blue-500/20 via-indigo-500/15 to-cyan-500/20",
    icon: TrendingUp,
  },
  reviews: {
    gradient: "from-amber-500/20 via-orange-500/15 to-red-500/20",
    icon: BarChart3,
  },
  guides: {
    gradient: "from-green-500/20 via-emerald-500/15 to-teal-500/20",
    icon: Lightbulb,
  },
  comparisons: {
    gradient: "from-purple-500/20 via-violet-500/15 to-pink-500/20",
    icon: BarChart3,
  },
  tutorials: {
    gradient: "from-cyan-500/20 via-blue-500/15 to-indigo-500/20",
    icon: Code,
  },
  chatbot: {
    gradient: "from-indigo-500/20 via-blue-500/15 to-violet-500/20",
    icon: Brain,
  },
  image: {
    gradient: "from-pink-500/20 via-rose-500/15 to-red-500/20",
    icon: Image,
  },
  video: {
    gradient: "from-red-500/20 via-orange-500/15 to-amber-500/20",
    icon: Video,
  },
  audio: {
    gradient: "from-green-500/20 via-lime-500/15 to-emerald-500/20",
    icon: Music,
  },
  code: {
    gradient: "from-cyan-500/20 via-sky-500/15 to-blue-500/20",
    icon: Code,
  },
  writing: {
    gradient: "from-violet-500/20 via-purple-500/15 to-fuchsia-500/20",
    icon: PenTool,
  },
  productivity: {
    gradient: "from-emerald-500/20 via-teal-500/15 to-green-500/20",
    icon: Zap,
  },
  design: {
    gradient: "from-fuchsia-500/20 via-pink-500/15 to-rose-500/20",
    icon: Palette,
  },
  research: {
    gradient: "from-amber-500/20 via-yellow-500/15 to-orange-500/20",
    icon: Search,
  },
};

const DEFAULT_STYLE: { gradient: string; icon: LucideIcon } = {
  gradient: "from-indigo-500/20 via-violet-500/15 to-purple-500/20",
  icon: Brain,
};

interface BlogCoverImageProps {
  title: string;
  category: string;
  className?: string;
  size?: "sm" | "lg";
}

export function BlogCoverImage({ title, category, className = "", size = "sm" }: BlogCoverImageProps) {
  const style = CATEGORY_STYLES[category.toLowerCase()] || DEFAULT_STYLE;
  const Icon = style.icon;

  const iconSize = size === "lg" ? "w-16 h-16" : "w-10 h-10";
  const textSize = size === "lg" ? "text-4xl" : "text-2xl";
  const subtextSize = size === "lg" ? "text-sm" : "text-xs";

  return (
    <div
      className={`relative aspect-[2/1] bg-gradient-to-br ${style.gradient} flex flex-col items-center justify-center gap-3 overflow-hidden ${className}`}
    >
      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5 blur-xl" />

      <div className="relative z-10 flex flex-col items-center gap-2">
        <Icon className={`${iconSize} text-foreground/15`} strokeWidth={1.5} />
        <div className="flex flex-col items-center gap-1">
          <span className={`${textSize} font-bold text-foreground/10 tracking-tight`}>
            {title.length > 20 ? title.substring(0, 18) + "…" : title}
          </span>
          <span className={`${subtextSize} font-medium text-foreground/8 uppercase tracking-widest`}>
            {category}
          </span>
        </div>
      </div>
    </div>
  );
}
