import { ContactContent } from "./ContactContent";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Top AI Tools",
  description: `Get in touch with ${siteConfig.name}. Send us your feedback, suggestions, or advertising inquiries. We typically respond within 24-48 hours.`,
};

export default function ContactPage() {
  return <ContactContent />;
}
