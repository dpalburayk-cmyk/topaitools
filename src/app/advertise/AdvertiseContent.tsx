"use client";

import { useState } from "react";
import {
  Mail,
  Users,
  BarChart3,
  Shield,
  Star,
  ArrowRight,
  Check,
  Sparkles,
  Megaphone,
  Tag,
  Loader2,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/data/site-config";

const stats = [
  { label: "Growing monthly visitors", icon: Users },
  { label: "130+ AI tools listed", icon: Tag },
  { label: "9 categories", icon: Sparkles },
  { label: "90% organic traffic", icon: BarChart3 },
];

const benefits = [
  {
    icon: Users,
    title: "Targeted Audience",
    description:
      "Reach developers, designers, content creators, and business professionals actively looking for AI tools.",
  },
  {
    icon: BarChart3,
    title: "High Engagement",
    description:
      "Our audience comes specifically to discover and compare AI tools, making them ready to convert.",
  },
  {
    icon: Shield,
    title: "Trust & Authority",
    description:
      "Honest reviews and comparisons build trust, giving your tool credibility with potential users.",
  },
];

const plans = [
  {
    name: "Featured Listing",
    price: "$49",
    period: "month",
    icon: Star,
    description:
      "Your tool appears at the top of relevant category pages with a 'Sponsored' badge.",
    features: [
      "Featured badge on your listing",
      "Priority placement in categories",
      "Analytics dashboard access",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Premium Banner",
    price: "$99",
    period: "month",
    icon: Megaphone,
    description:
      "A prominent banner ad displayed across all pages on our platform for maximum visibility.",
    features: [
      "All pages placement",
      "Custom banner design",
      "Click tracking analytics",
      "Monthly performance report",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Dedicated Review",
    price: "$199",
    period: "one-time",
    icon: Sparkles,
    description:
      "A comprehensive, honest review of your AI tool with detailed feature breakdown, pros & cons, and comparison with competitors.",
    features: [
      "Full review article",
      "Comparison table with competitors",
      "Permanent placement",
      "Social media promotion",
    ],
    cta: "Request a Review",
    highlighted: false,
  },
];

const faqs = [
  {
    question: "How much traffic does TopAI Tools receive?",
    answer:
      "We receive over 1,000 monthly visitors with 90% organic traffic from Google searches and social media.",
  },
  {
    question: "What types of ads do you accept?",
    answer:
      "We accept AI tool-related advertising only. All listings are clearly marked as sponsored to maintain trust with our audience.",
  },
  {
    question: "Can I choose where my ad appears?",
    answer:
      "Yes! Featured listings appear in specific categories. Banner ads appear across all pages.",
  },
  {
    question: "How do I track results?",
    answer:
      "We provide monthly analytics reports including impressions, clicks, and conversion data.",
  },
];

export function AdvertiseContent() {
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs items={[{ label: "Advertise With Us" }]} />

      {/* Hero */}
      <section className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Advertise With Us
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Get your AI tool in front of thousands of tech-savvy users actively
          searching for the best AI solutions.
        </p>
      </section>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-4 text-center"
          >
            <stat.icon className="w-5 h-5 text-indigo-500 mx-auto mb-2" />
            <p className="text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Why Advertise */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Why Advertise With Us
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
                <benefit.icon className="w-5 h-5 text-indigo-500" />
              </div>
              <h3 className="font-semibold text-base mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Choose Your Plan
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          Flexible options to fit your budget and goals
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border p-6 flex flex-col ${
                plan.highlighted
                  ? "border-indigo-500 bg-card shadow-lg shadow-indigo-500/10"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-500 text-white text-xs font-medium">
                  Most Popular
                </span>
              )}
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
                <plan.icon className="w-5 h-5 text-indigo-500" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{plan.name}</h3>
              <div className="mb-3">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground text-sm">
                  /{plan.period}
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
              <a
                href={`mailto:advertising@topaitools.xyz?subject=${encodeURIComponent(`Interest in ${plan.name} — ${plan.name}`)}`}
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl font-medium text-sm transition-colors cursor-pointer"
              >
                {plan.highlighted ? (
                  <span className="bg-indigo-500 text-white hover:bg-indigo-600 rounded-xl px-5 py-2.5 w-full text-center flex items-center justify-center gap-2">
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="border border-border text-foreground hover:bg-muted rounded-xl px-5 py-2.5 w-full text-center flex items-center justify-center gap-2">
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA + Form */}
      <section className="mb-16">
        <div className="rounded-xl border border-border bg-card p-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">Ready to grow?</h2>
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
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-sm text-muted-foreground">
                We will get back to you within 24 hours. Thank you for your
                interest in advertising with {siteConfig.name}.
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
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1.5"
                  >
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
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1.5"
                  >
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
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium mb-1.5"
                  >
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
                  <label
                    htmlFor="toolUrl"
                    className="block text-sm font-medium mb-1.5"
                  >
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
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium mb-1.5"
                >
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  required
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors"
                >
                  <option value="" disabled>
                    Select your budget range
                  </option>
                  <option value="under-100">Under $100/month</option>
                  <option value="100-300">$100 - $300/month</option>
                  <option value="300-500">$300 - $500/month</option>
                  <option value="500-plus">$500+/month</option>
                  <option value="one-time">One-time payment</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1.5"
                >
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

      {/* FAQ */}
      <section className="mb-16">
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

      {/* Bottom CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Interested? Let&apos;s talk</h2>
        <p className="text-muted-foreground text-sm mb-6">
          We typically respond within 24 hours on business days.
        </p>
        <a
          href="mailto:advertising@topaitools.xyz"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-600 transition-colors"
        >
          <Mail className="w-4 h-4" />
          advertising@topaitools.xyz
        </a>
      </section>
    </div>
  );
}
