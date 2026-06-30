import { ToolCardSkeleton } from "@/components/ui/Skeleton";

export default function CategoryDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <div className="space-y-3 mb-8">
        <div className="h-4 w-32 bg-muted rounded animate-pulse" />
        <div className="h-8 w-1/2 bg-muted rounded animate-pulse" />
        <div className="h-4 w-96 bg-muted rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <ToolCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
