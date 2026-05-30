import { PrivacyContent } from "./PrivacyContent";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}. Learn how we collect, use, and protect your data.`,
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
