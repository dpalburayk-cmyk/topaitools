export default function PricingLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <div className="space-y-12">
        <div className="text-center space-y-3">
          <div className="h-8 w-48 mx-auto animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-96 mx-auto animate-pulse rounded bg-muted" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-8 space-y-4">
              <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
              <div className="h-8 w-1/2 animate-pulse rounded bg-muted" />
              <div className="space-y-2">
                <div className="h-3 w-full animate-pulse rounded bg-muted" />
                <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
              </div>
              <div className="h-10 w-full rounded-lg animate-pulse bg-muted mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
