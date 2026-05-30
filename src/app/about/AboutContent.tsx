"use client";

import { Heart, Users, Search, Shield, Zap, Globe } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/data/site-config";

export function AboutContent() {
  const values = [
    {
      icon: Search,
      title: "Discover",
      description: "Discover",
    },
    {
      icon: Shield,
      title: "Honest Reviews",
      description: "Honest Reviews",
    },
    {
      icon: Zap,
      title: "Stay Current",
      description: "Stay Current",
    },
    {
      icon: Heart,
      title: "Community",
      description: "Community",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs items={[{ label: "About" }]} />

      <div className="space-y-16">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            About {siteConfig.name}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We believe finding the right AI tool shouldn't be overwhelming...
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {values.map((value) => (
            <div key={value.title} className="rounded-xl border border-border bg-card p-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
                <value.icon className="w-5 h-5 text-indigo-500" />
              </div>
              <h3 className="font-semibold text-base mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-8">
          <h2 className="text-xl font-semibold mb-4">Our Story</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4">
            <p className="text-muted-foreground">
              {siteConfig.name} was born from frustration...
            </p>
            <p className="text-muted-foreground">
              We created this to solve this problem...
            </p>
            <p className="text-muted-foreground">
              Today, this platform helps thousands...
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Have feedback, suggestions, or want to collaborate? We'd love to hear from you.
          </p>
          <a
            href={`mailto:hello@topaitools.xyz`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-600 transition-colors"
          >
            <Globe className="w-4 h-4" />
            hello@topaitools.xyz
          </a>
        </div>
      </div>
    </div>
  );
}
