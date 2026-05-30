import { CategoriesContent } from "./CategoriesContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse AI tools by category — from text generation to healthcare.",
};

export default function CategoriesPage() {
  return <CategoriesContent />;
}
