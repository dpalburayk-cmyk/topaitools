"use client";

import { Heart, Users, Search, Shield, Zap, Globe, Star, BookOpen, GitCompare } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/data/site-config";

export function AboutContent() {
  const values = [
    {
      icon: Search,
      title: "Discover",
      description: "We carefully curate and review every AI tool listed on our platform, evaluating features, pricing, and real-world usability to help you find the perfect solution for your needs.",
    },
    {
      icon: Shield,
      title: "Honest Reviews",
      description: "Every review is based on real testing and honest assessments. We highlight both strengths and weaknesses so you can make informed decisions without biased marketing influence.",
    },
    {
      icon: GitCompare,
      title: "Side-by-Side Comparison",
      description: "Our unique comparison feature lets you select any AI tools and instantly see their features, pricing, ratings, and pros/cons side by side — no more switching between tabs.",
    },
    {
      icon: BookOpen,
      title: "In-Depth Guides",
      description: "We publish detailed comparison articles and guides covering topics like Claude vs ChatGPT, best AI tools for students, and AI coding assistants — all based on hands-on testing.",
    },
    {
      icon: Star,
      title: "Editorial Ratings",
      description: "Each tool receives an editorial rating based on quality, usability, value for money, and reliability. Sponsored listings are clearly distinguished with a Sponsored badge.",
    },
    {
      icon: Zap,
      title: "Stay Current",
      description: "The AI landscape evolves rapidly. We update our directory regularly with new tools, updated reviews, pricing changes, and the latest industry insights.",
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
            Finding the right AI tool shouldn&apos;t be overwhelming. We built {siteConfig.name} as an independent, honest directory that cuts through the noise of affiliate-driven review sites.
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
              {siteConfig.name} was born from a simple frustration: every time we searched for an AI tool, the results were dominated by review sites that were essentially collections of affiliate links. Honest comparisons were nearly impossible to find, and most &quot;best AI tools&quot; lists were clearly sponsored.
            </p>
            <p className="text-muted-foreground">
              {siteConfig.name} is founded and operated by the <strong className="text-foreground">Top AI Tools Team</strong> — an independent group of AI enthusiasts, developers, and content creators dedicated to helping users discover the right AI tools. We are not affiliated with any AI company, and our editorial content is fully independent.
            </p>
            <p className="text-muted-foreground">
              For inquiries, reach us at <a href="mailto:hello@topaitools.xyz" className="text-indigo-500 hover:underline">hello@topaitools.xyz</a> or <a href="mailto:advertising@topaitools.xyz" className="text-indigo-500 hover:underline">advertising@topaitools.xyz</a>.
            </p>
            <p className="text-muted-foreground">
              We decided to build what we wished existed — a curated directory where every tool is evaluated on its actual merits. Our team tests tools hands-on, compares features and pricing transparently, and provides pros and cons that reflect real usage — not marketing copy.
            </p>
            <p className="text-muted-foreground">
              Today, {siteConfig.name} covers 134+ AI tools across 9 categories including chatbots, image generation, video production, audio and music, code assistance, writing, productivity, design, and research. Each tool listing includes detailed features, pricing information, honest ratings, and alternative suggestions to help you find the right fit.
            </p>
            <p className="text-muted-foreground">
              We also publish in-depth blog articles comparing popular tools like Claude vs ChatGPT vs Gemini, guides for students and small businesses, and roundups of the best tools in each category. All content is free to access — no paywall, no login required.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-8">
          <h2 className="text-xl font-semibold mb-4">What Makes Us Different</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold mt-0.5">✓</span>
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Editorial rankings are independent.</strong> Free tool positions are determined by editorial ratings. Sponsored listings are clearly labeled and appear in designated placement areas.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold mt-0.5">✓</span>
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Real pros and cons.</strong> Every review includes genuine strengths and weaknesses based on actual usage.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold mt-0.5">✓</span>
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Free forever.</strong> No paywall, no premium tier, no required sign-up to browse or compare tools.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold mt-0.5">✓</span>
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Community driven.</strong> User feedback shapes our reviews. We update listings based on real user experiences.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Have feedback, suggestions, or want to collaborate? We&apos;d love to hear from you. You can also submit a tool for review through our submission page.
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
