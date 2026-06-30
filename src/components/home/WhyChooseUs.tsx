"use client";

import { Shield, RefreshCw, Clock, Heart } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Honest Reviews",
    description:
      "Every tool is personally tested and reviewed. No paid placements influence our ratings.",
  },
  {
    icon: RefreshCw,
    title: "Updated Weekly",
    description:
      "Our team adds new tools and updates existing reviews every week to keep you current.",
  },
  {
    icon: Clock,
    title: "Save Time",
    description:
      "Compare features, pricing, and reviews side-by-side. Find the right tool in minutes, not hours.",
  },
  {
    icon: Heart,
    title: "Completely Free",
    description:
      "Browse, compare, and save favorites at no cost. No sign-up required.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          Why Choose Us
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          We make it easy to discover, compare, and choose the perfect AI tool for your needs.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-indigo-500/30 hover:-translate-y-0.5 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="card-shine absolute inset-0 rounded-xl" />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                <feature.icon className="w-5 h-5 text-indigo-500" />
              </div>
              <h3 className="font-semibold text-base mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
