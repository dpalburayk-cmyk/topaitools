"use client";

import { useState } from "react";
import { Send, Check, Loader2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { categories } from "@/data/tools";

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      url: formData.get("url") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      pricingModel: formData.get("pricingModel") as string,
      email: formData.get("email") as string,
      notes: formData.get("notes") as string || "",
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs items={[{ label: "Submit" }]} />

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Submit an AI Tool</h1>
        <p className="text-muted-foreground">
          Know a great AI tool that should be listed? Submit it here and we'll review it within 48 hours.
        </p>
      </div>

      {/* Pricing upsell banner */}
      <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-indigo-500" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">Want more visibility?</h3>
          <p className="text-sm text-muted-foreground">
            Get featured placement, a dedicated review, and reach thousands more users with our{" "}
            <Link href="/pricing" className="text-indigo-500 hover:underline font-medium">
              pricing plans starting at $99
            </Link>
            .
          </p>
        </div>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-600 transition-colors shrink-0"
        >
          See Plans
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {submitted ? (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6 text-emerald-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Submission Received!</h2>
          <p className="text-sm text-muted-foreground">
            Thank you for your submission. We'll review your tool and get back to you within 48 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Tool Name *</label>
              <input
                name="name"
                required
                type="text"
                placeholder="e.g. ChatGPT"
                className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Website URL *</label>
              <input
                name="url"
                required
                type="url"
                placeholder="https://example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Description *</label>
            <textarea
              name="description"
              required
              rows={3}
              placeholder="Briefly describe what the tool does..."
              className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-muted-foreground resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Category *</label>
              <select
                name="category"
                required
                defaultValue=""
                className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-sm outline-none focus:border-indigo-500 cursor-pointer appearance-none"
              >
                <option value="" disabled>Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Pricing Model *</label>
              <select
                name="pricingModel"
                required
                defaultValue=""
                className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-sm outline-none focus:border-indigo-500 cursor-pointer appearance-none"
              >
                <option value="" disabled>Select pricing</option>
                <option value="free">Free</option>
                <option value="freemium">Freemium</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Your Email *</label>
            <input
              name="email"
              required
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-muted-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Additional Notes</label>
            <textarea
              name="notes"
              rows={3}
              placeholder="Any additional information..."
              className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-muted-foreground resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Tool
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
