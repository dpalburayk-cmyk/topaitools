"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Star,
  Megaphone,
  Tag,
  ArrowRight,
  Check,
  X,
  Mail,
  Loader2,
  Users,
  BarChart3,
  Shield,
  Globe,
  TrendingUp,
  Zap,
  Eye,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ToolIcon } from "@/components/tools/ToolIcon";
import { tools, categories, blogPosts } from "@/data/tools";
import { siteConfig } from "@/data/site-config";
import { track } from "@/lib/tracking";

const popularTools = [
  tools.find((t) => t.slug === "chatgpt")!,
  tools.find((t) => t.slug === "claude")!,
  tools.find((t) => t.slug === "midjourney")!,
  tools.find((t) => t.slug === "cursor")!,
  tools.find((t) => t.slug === "runway")!,
  tools.find((t) => t.slug === "gemini")!,
  tools.find((t) => t.slug === "perplexity")!,
  tools.find((t) => t.slug === "github-copilot")!,
].filter(Boolean);

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    icon: Tag,
    badge: null,
    description: "Basic listing in our AI tools directory.",
    features: [
      "Standard listing in directory",
      "Appears in search results",
      "Category page placement",
      "Standard tool card display",
    ],
    cta: "Submit Free",
    ctaLink: "/submit",
    highlighted: false,
  },
  {
    name: "Featured",
    price: "$99",
    period: "one-time",
    icon: Star,
    badge: "Popular",
    description: "Stand out with priority placement and a Sponsored badge.",
    features: [
      "Everything in Free",
      '"Sponsored" badge on listing',
      "Priority placement in category",
      "Featured in weekly newsletter",
      "Analytics dashboard access",
    ],
    cta: "Get Featured",
    ctaMailto: "Interest in Featured Listing",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$299",
    period: "one-time",
    icon: Sparkles,
    badge: "Best Value",
    description: "Maximum visibility with a dedicated review and promotion.",
    features: [
      "Everything in Featured",
      "Pinned to top of category page",
      "Dedicated review article",
      "Social media promotion (2 posts)",
      "Priority email support",
    ],
    cta: "Go Premium",
    ctaMailto: "Interest in Premium Listing",
    highlighted: true,
  },
  {
    name: "Banner Ad",
    price: "$199",
    period: "/month",
    icon: Megaphone,
    badge: null,
    description: "A site-wide banner for maximum brand visibility.",
    features: [
      "Site-wide banner placement",
      "Custom banner design included",
      "Click tracking & analytics",
      "Monthly performance report",
      "10,000+ monthly impressions",
    ],
    cta: "Book a Banner",
    ctaMailto: "Interest in Banner Advertising",
    highlighted: false,
  },
];

const comparisonFeatures = [
  { name: "Directory listing", free: true, featured: true, premium: true, banner: null },
  { name: "Search results visibility", free: true, featured: true, premium: true, banner: null },
  { name: "Category placement", free: true, featured: true, premium: true, banner: null },
  { name: '"Sponsored" badge', free: false, featured: true, premium: true, banner: null },
  { name: "Priority category ranking", free: false, featured: true, premium: true, banner: null },
  { name: "Newsletter inclusion", free: false, featured: true, premium: true, banner: null },
  { name: "Analytics dashboard", free: false, featured: true, premium: true, banner: true },
  { name: "Pinned to category top", free: false, featured: false, premium: true, banner: null },
  { name: "Dedicated review article", free: false, featured: false, premium: true, banner: null },
  { name: "Social media promotion", free: false, featured: false, premium: true, banner: null },
  { name: "Site-wide banner", free: false, featured: false, premium: false, banner: true },
  { name: "Custom banner design", free: false, featured: false, premium: false, banner: true },
  { name: "Monthly reports", free: false, featured: false, premium: false, banner: true },
];

const faqs = [
  {
    question: "How long does my listing stay active?",
    answer: "One-time payment listings (Featured and Premium) are permanent — they never expire. Banner ads are monthly subscriptions that can be cancelled anytime.",
  },
  {
    question: "How quickly will my listing appear?",
    answer: "Within 24–48 hours of payment confirmation. We review all submissions to ensure quality and relevance.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Yes! You can upgrade anytime. You'll only pay the difference between your current plan and the new one.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day satisfaction guarantee on all one-time plans. If you're not happy, we'll refund you in full — no questions asked.",
  },
  {
    question: "What kind of traffic does Top AI Tools get?",
    answer: `We have ${tools.length}+ AI tools across ${categories.length} categories, with ${blogPosts.length}+ blog articles driving organic search traffic from Google. Our audience consists of developers, designers, content creators, and business professionals actively looking for AI solutions.`,
  },
  {
    question: "How is this different from the free listing?",
    answer: "Free listings appear alongside all other tools with standard placement. Paid plans get a Sponsored badge, priority ranking within categories, newsletter inclusion, analytics, and Premium plans include a dedicated review article and social media promotion.",
  },
];

const benefits = [
  {
    icon: Eye,
    title: "High-Intent Audience",
    description: "Our users visit specifically to discover and compare AI tools — they're ready to try new solutions.",
  },
  {
    icon: TrendingUp,
    title: "Growing Organic Traffic",
    description: "Our SEO-optimized directory ranks for hundreds of AI tool keywords, driving consistent organic traffic.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Reach users worldwide who are actively searching for the exact AI tool you've built.",
  },
  {
    icon: Zap,
    title: "Quick Setup",
    description: "Get listed within 24–48 hours. No complex onboarding — just submit and we handle the rest.",
  },
];

export function PricingContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    toolUrl: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    track.pricingView();
  }, []);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFormError("");

    try {
      const res = await fetch("/api/advertise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (!res.ok) {
        setFormError(result.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setFormError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative hero-gradient noise-overlay overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-fade-in-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Marketplace</span>
            </div>

            <h1 className="animate-fade-in-up stagger-1 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              List Your{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                AI Tool
              </span>
            </h1>

            <p className="animate-fade-in-up stagger-2 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Join {tools.length}+ AI tool companies already reaching thousands of
              tech-savvy users every month on the fastest-growing AI tools directory.
            </p>

            <div className="animate-fade-in-up stagger-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#plans"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity shadow-lg"
              >
                Choose a Plan
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border font-medium text-sm hover:bg-accent transition-colors"
              >
                Submit Free Listing
              </Link>
            </div>

            <div className="animate-fade-in-up stagger-4 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
              {[
                { value: `${tools.length}+`, label: "Tools Listed" },
                { value: `${categories.length}`, label: "Categories" },
                { value: `${blogPosts.length}+`, label: "Blog Articles" },
                { value: "100%", label: "Organic Traffic" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 text-center"
                >
                  <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>

      {/* Social Proof / Logo Wall */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Trusted by Leading AI Tool Companies
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            These and hundreds more are already getting discovered on {siteConfig.name}.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {popularTools.map((tool) => (
            <div
              key={tool.id}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-md hover:-translate-y-0.5"
            >
              <ToolIcon
                name={tool.name}
                imageUrl={tool.imageUrl}
                websiteUrl={tool.websiteUrl}
                size="md"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate group-hover:text-indigo-500 transition-colors">
                  {tool.name}
                </p>
                <p className="text-xs text-muted-foreground capitalize truncate">
                  {tool.category.replace(/-/g, " ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Why List on {siteConfig.name}?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We help AI tool companies reach the right audience at the right time.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-indigo-500/30 hover:-translate-y-0.5 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="card-shine absolute inset-0 rounded-xl" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                  <benefit.icon className="w-5 h-5 text-indigo-500" />
                </div>
                <h3 className="font-semibold text-base mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="plans" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Choose Your Plan
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            One-time payments for lifetime visibility. Cancel banner ads anytime.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border p-6 flex flex-col transition-all duration-300 hover:-translate-y-0.5 ${
                plan.highlighted
                  ? "border-indigo-500 bg-card shadow-lg shadow-indigo-500/10"
                  : "border-border bg-card hover:shadow-md"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-500 text-white text-xs font-medium">
                  {plan.badge}
                </span>
              )}
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
                <plan.icon className="w-5 h-5 text-indigo-500" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{plan.name}</h3>
              <div className="mb-3">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground text-sm">
                  {plan.period === "forever" ? "" : `/${plan.period}`}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {plan.description}
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {plan.ctaLink ? (
                <Link
                  href={plan.ctaLink}
                  onClick={() => track.pricingClick(plan.name)}
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl font-medium text-sm transition-colors border border-border text-foreground hover:bg-muted"
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <a
                  href={`mailto:advertising@topaitools.xyz?subject=${encodeURIComponent(plan.ctaMailto + " — " + siteConfig.name)}`}
                  onClick={() => track.pricingClick(plan.name)}
                  className={`inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl font-medium text-sm transition-colors cursor-pointer ${
                    plan.highlighted
                      ? "bg-indigo-500 text-white hover:bg-indigo-600"
                      : "border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Compare Plans
          </h2>
          <p className="text-muted-foreground">See exactly what each plan includes.</p>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-6 py-4 font-semibold">Feature</th>
                <th className="text-center px-4 py-4 font-semibold">Free</th>
                <th className="text-center px-4 py-4 font-semibold text-indigo-500">Featured</th>
                <th className="text-center px-4 py-4 font-semibold text-indigo-500">Premium</th>
                <th className="text-center px-4 py-4 font-semibold">Banner</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, i) => (
                <tr
                  key={feature.name}
                  className={`border-t border-border ${i % 2 === 0 ? "bg-card" : "bg-muted/20"}`}
                >
                  <td className="px-6 py-3 text-muted-foreground">{feature.name}</td>
                  {["free", "featured", "premium", "banner"].map((plan) => (
                    <td key={plan} className="px-4 py-3 text-center">
                      {feature[plan as keyof typeof feature] === null ? (
                        <span className="text-muted-foreground">—</span>
                      ) : feature[plan as keyof typeof feature] ? (
                        <Check className="w-4 h-4 text-emerald-500 inline" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground/40 inline" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
              >
                <span className="font-medium text-sm pr-4">{faq.question}</span>
                <ArrowRight
                  className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                    openFaq === index ? "rotate-90" : ""
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA + Form */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="rounded-xl border border-border bg-card p-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              Ready to grow your AI tool&apos;s audience?
            </h2>
            <p className="text-muted-foreground">
              Contact us at{" "}
              <a
                href="mailto:advertising@topaitools.xyz"
                className="text-indigo-500 hover:underline"
              >
                advertising@topaitools.xyz
              </a>{" "}
              or fill out the form below.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 rounded-xl border border-border bg-muted/50">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Message Sent Successfully!</h3>
              <p className="text-sm text-muted-foreground">
                We will get back to you within 24 hours. Thank you for your interest
                in {siteConfig.name}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {formError && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center text-sm text-red-600 dark:text-red-400">
                  {formError}
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-1.5">
                    Company Name
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="toolUrl" className="block text-sm font-medium mb-1.5">
                    Tool URL
                  </label>
                  <input
                    id="toolUrl"
                    name="toolUrl"
                    type="url"
                    required
                    value={formData.toolUrl}
                    onChange={handleChange}
                    placeholder="https://your-ai-tool.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium mb-1.5">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  required
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors appearance-none"
                >
                  <option value="" disabled>Select your budget range</option>
                  <option value="free">Free listing</option>
                  <option value="99-featured">$99 — Featured Listing</option>
                  <option value="299-premium">$299 — Premium Listing</option>
                  <option value="199-banner">$199/month — Banner Ad</option>
                  <option value="custom">Custom / Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your AI tool and what you're looking for..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border text-center">
        <h2 className="text-2xl font-semibold mb-2">Not ready yet?</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Submit your tool for free and upgrade anytime.
        </p>
        <Link
          href="/submit"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border font-medium text-sm hover:bg-accent transition-colors"
        >
          Submit Free Listing
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  );
}
