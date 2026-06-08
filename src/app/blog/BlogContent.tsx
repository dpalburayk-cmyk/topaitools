"use client";

import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AdBanner } from "@/components/ui/AdBanner";
import { BlogCoverImage } from "@/components/ui/BlogCoverImage";
import { blogPosts } from "@/data/tools";

export function BlogContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs items={[{ label: "Blog" }]} />

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Blog</h1>
        <p className="text-muted-foreground">AI news, reviews, and insights</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.slice(0, 6).map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-indigo-500/30 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <BlogCoverImage title={post.title} category={post.category} size="sm" />
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500">
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime} min read
                </span>
              </div>
              <h2 className="font-semibold text-base mb-2 group-hover:text-indigo-500 transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="w-3 h-3" />
                  {post.author}
                </div>
                <span className="text-xs font-medium text-indigo-500 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                  Read
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="my-8">
        <AdBanner slot="inline" />
      </div>

      {blogPosts.length > 6 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(6).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-indigo-500/30 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="aspect-[2/1] bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center">
                <span className="text-4xl font-bold text-indigo-500/20">{post.title.charAt(0)}</span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime} min read
                  </span>
                </div>
                <h2 className="font-semibold text-base mb-2 group-hover:text-indigo-500 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                  <span className="text-xs font-medium text-indigo-500 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    Read
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
