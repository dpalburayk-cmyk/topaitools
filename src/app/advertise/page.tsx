import { AdvertiseContent } from "./AdvertiseContent";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Advertise With Us | ${siteConfig.name}`,
  description: `Promote your AI tool to thousands of developers, designers, and creators on ${siteConfig.name}. Sponsored listings, banner ads, and dedicated reviews.`,
};

export default function AdvertisePage() {
  return <AdvertiseContent />;
}
