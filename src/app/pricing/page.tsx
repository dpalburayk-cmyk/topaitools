import { PricingContent } from "./PricingContent";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Your AI Tool — Pricing | Top AI Tools",
  description: `Get your AI tool in front of thousands of users on ${siteConfig.name}. Affordable listing packages with featured placement, dedicated reviews, and banner ads.`,
  keywords: [
    "list AI tool", "AI tool directory listing", "promote AI tool",
    "AI tool advertising", "AI tool marketing", "submit AI tool",
    "featured AI tool listing", "AI tool directory pricing",
  ],
};

export default function PricingPage() {
  return <PricingContent />;
}
