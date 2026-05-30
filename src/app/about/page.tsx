import { Heart, Users, Search, Shield, Zap, Globe } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name} and our mission to help you find the best AI tools.`,
};

const values = [
  {
    icon: Search,
    title: "Discover",
    description: "We curate and organize the best AI tools so you don't have to search the entire internet.",
  },
  {
    icon: Shield,
    title: "Honest Reviews",
    description: "Our reviews are unbiased and based on real testing. No paid placements or fake ratings.",
  },
  {
    icon: Zap,
    title: "Stay Current",
    description: "We update daily to ensure you always have access to the latest and greatest AI tools.",
  },
  {
    icon: Heart,
    title: "Community",
    description: "Built by AI enthusiasts, for AI enthusiasts. Your submissions and feedback shape this directory.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs items={[{ label: "About" }]} />

      <div className="space-y-16">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            About {siteConfig.name}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We believe finding the right AI tool shouldn&apos;t be overwhelming. Our mission is to create the most comprehensive, honest, and up-to-date directory of AI tools on the internet.
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
              {siteConfig.name} was born from frustration. As AI tools exploded onto the scene, we found ourselves drowning in options. Every day brought new tools, new categories, and new claims. Finding honest, useful information was nearly impossible.
            </p>
            <p className="text-muted-foreground">
              We created {siteConfig.name} to solve this problem. Every tool in our directory has been researched, tested where possible, and evaluated honestly. We don&apos;t accept payment for reviews or ratings — our integrity is our currency.
            </p>
            <p className="text-muted-foreground">
              Today, {siteConfig.name} helps thousands of people discover, compare, and choose AI tools that genuinely improve their work and lives. Whether you&apos;re a developer, designer, marketer, educator, or entrepreneur, we&apos;re here to help you navigate the AI landscape.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Have feedback, suggestions, or want to collaborate? We&apos;d love to hear from you.
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
