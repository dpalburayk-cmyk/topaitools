import { LaunchContent } from "./LaunchContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top AI Tools — The Ultimate AI Tools Directory",
  description: "Discover, compare, and choose the best AI tools. 100+ curated tools across 9 categories with honest reviews and ratings.",
  openGraph: {
    title: "Top AI Tools — The Ultimate AI Tools Directory",
    description: "100+ AI tools across 9 categories with honest reviews.",
  },
};

export default function LaunchPage() {
  return <LaunchContent />;
}
