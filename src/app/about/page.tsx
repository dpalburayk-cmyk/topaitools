import { AboutContent } from "./AboutContent";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name} and our mission to help you find the best AI tools.`,
};

export default function AboutPage() {
  return <AboutContent />;
}
