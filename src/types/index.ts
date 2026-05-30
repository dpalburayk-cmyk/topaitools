export type PricingModel = "free" | "freemium" | "paid";

export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  pricingModel: PricingModel;
  rating: number;
  reviewCount: number;
  features: string[];
  pros: string[];
  cons: string[];
  websiteUrl: string;
  affiliateUrl?: string;
  tags: string[];
  isFeatured: boolean;
  isTrending: boolean;
  isSponsored?: boolean;
  imageUrl?: string;
  alternatives: string[];
  submittedAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  toolCount: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  coverImage?: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
}
