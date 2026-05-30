import { BlogContent } from "./BlogContent";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "AI news, reviews, and insights from the Top AI Tools team.",
};

export default function BlogPage() {
  return <BlogContent />;
}
