"use client";

import { useState } from "react";
import {
  Mail,
  Users,
  BarChart3,
  Shield,
  ArrowRight,
  Check,
  Sparkles,
  Tag,
  Loader2,
  Megaphone,
  Package,
  Handshake,
} from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/data/site-config";

const stats = [
  { label: "Growing monthly visitors", icon: Users },
  { label: "134 AI tools listed", icon: Tag },
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

const customOptions = [
  {
    icon: Megaphone,
    title: "Custom Advertising",
    description:
      "Site-wide banner ads, sponsored content, and custom placements tailored to your goals and budget.",
  },
  {
    icon: Package,
    title: "Bulk Listings",
    description:
      "Special rates for agencies and companies listing 5 or more AI tools on our directory.",
  },
  {
    icon: Handshake,
    title: "Partnership Opportunities",
    description:
      "Long-term collaborations, content sponsorships, and co-marketing arrangements.",
  },
];

const faqs = [
  {
    question: "How much traffic does Top AI Tools receive?",
    answer:
      "We receive growing monthly visitors with 90% organic traffic from Google searches and social media.",
  },
  {
    question: "What types of ads do you accept?",
    answer:
      "We accept AI tool-related advertising only. All listings are clearly marked as sponsored to maintain trust with our audience.",
  },
  {
    question: "Can I choose where my ad appears?",
    answer:
      "Yes! Featured listings appear in specific categories. Banner ads appear across all pages. Custom placements are available upon request.",
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

      {/* Pricing page cross-link — prominent */}
      <section className="mb-16">
        <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-indigo-500" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-1">
                Looking to list your AI tool?
              </h2>
              <p className="text-sm text-muted-foreground">
                Check out our pricing page for listing packages — from free
                submissions to premium featured placements with reviews and
                dedicated promotion.
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/25 shrink-0"
            >
              View Pricing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

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

      {/* Custom Advertising Options */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Custom Advertising Solutions
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          Beyond standard listings, we offer tailored advertising options
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {customOptions.map((option) => (
            <div
              key={option.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
                <option.icon className="w-5 h-5 text-indigo-500" />
              </div>
              <h3 className="font-semibold text-base mb-2">{option.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="mb-16">
        <div className="rounded-xl border border-border bg-card p-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              Get in Touch
            </h2>
            <p className="text-muted-foreground">
              Contact us at{" "}
              <a
                href="mailto:advertising@topaitools.xyz"
                className="text-indigo-500 hover:underline"
              >
                advertising@topaitools.xyz
              </a>{" "}
              or fill out the form below for custom advertising inquiries.
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
                  <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                    Name
                  </label>
                  <input
                    id="name" name="name" type="text" required
                    value={formData.name} onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                    Email
                  </label>
                  <input
                    id="email" name="email" type="email" required
                    value={formData.email} onChange={handleChange}
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
                    id="company" name="company" type="text" required
                    value={formData.company} onChange={handleChange}
                    placeholder="Your company"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="toolUrl" className="block text-sm font-medium mb-1.5">
                    Tool URL
                  </label>
                  <input
                    id="toolUrl" name="toolUrl" type="url" required
                    value={formData.toolUrl} onChange={handleChange}
                    placeholder="https://your-ai-tool.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium mb-1.5">
                  Inquiry Type
                </label>
                <select
                  id="budget" name="budget" required
                  value={formData.budget} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-colors"
                >
                  <option value="" disabled>
                    Select your inquiry type
                  </option>
                  <option value="custom-advertising">Custom advertising partnership</option>
                  <option value="bulk-listings">Bulk listings (5+ tools)</option>
                  <option value="sponsorship">Content sponsorship</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                  Message
                </label>
                <textarea
                  id="message" name="message" rows={4} required
                  value={formData.message} onChange={handleChange}
                  placeholder="Tell us about your AI tool and what advertising solution you're looking for..."
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
                    Send Inquiry
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
