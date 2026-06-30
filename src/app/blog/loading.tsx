import { BlogCardSkeleton } from "@/components/ui/Skeleton";

export default function BlogLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <div className="text-center mb-12 space-y-3">
        <div className="h-8 w-48 bg-muted rounded animate-pulse mx-auto" />
        <div className="h-4 w-64 bg-muted rounded animate-pulse mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
