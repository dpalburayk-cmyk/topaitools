const stats = [
  { value: "1,247+", label: "AI Tools Listed" },
  { value: "50+", label: "Categories" },
  { value: "28K+", label: "Monthly Visitors" },
  { value: "4.6", label: "Avg. Rating" },
];

export function StatsSection() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
