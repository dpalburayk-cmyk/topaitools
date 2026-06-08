"use client";

import Link from "next/link";
import Markdown from "react-markdown";
import { ArrowLeft, Clock, User, Calendar, Tag } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AdBanner } from "@/components/ui/AdBanner";
import type { BlogPost } from "@/types";

interface BlogPostContentProps {
  post: BlogPost;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <article className="space-y-6">
        <header>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 capitalize">
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.publishedAt}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime} min read
            </div>
          </div>
        </header>

        {/* Cover image */}
        <div className="aspect-[2/1] rounded-xl border border-border bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center overflow-hidden">
          {post.coverImage ? (
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-6xl font-bold text-indigo-500/20">{post.title.charAt(0)}</span>
          )}
        </div>

        <AdBanner slot="inline" />

        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:leading-relaxed prose-a:text-indigo-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-li:text-muted-foreground prose-table:border prose-table:border-border prose-th:p-2 prose-th:border-b prose-th:border-border prose-td:p-2 prose-td:border-b prose-td:border-border">
          <Markdown>{post.content}</Markdown>
        </div>

        <AdBanner slot="inline" />

        <div className="pt-6 border-t border-border">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground capitalize">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </article>
    </div>
  );
}
