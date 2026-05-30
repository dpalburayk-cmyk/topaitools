"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { categories } from "@/data/tools";

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs items={[{ label: "Submit a Tool" }]} />

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Submit an AI Tool</h1>
        <p className="text-muted-foreground">
          Know a great AI tool that should be listed? Submit it here and we&apos;ll review it within 48 hours.
        </p>
      </div>

      {submitted ? (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6 text-emerald-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Submission Received!</h2>
          <p className="text-sm text-muted-foreground">
            Thank you for your submission. We&apos;ll review your tool and get back to you within 48 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Tool Name *</label>
              <input
                required
                type="text"
                placeholder="e.g. ChatGPT"
                className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Website URL *</label>
              <input
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
              required
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-muted-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Additional Notes</label>
            <textarea
              rows={3}
              placeholder="Any additional information..."
              className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-muted-foreground resize-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/25"
          >
            Submit Tool
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}
