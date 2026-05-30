import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar, Tag } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { blogPosts, getBlogPostBySlug } from "@/data/tools";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.publishedAt,
    readTime: `${post.readTime} min`,
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <article className="space-y-6">
        <header>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500">
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

        {/* Cover image placeholder */}
        <div className="aspect-[2/1] rounded-xl border border-border bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center">
          <span className="text-6xl font-bold text-indigo-500/20">{post.title.charAt(0)}</span>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">{post.excerpt}</p>
          <p className="text-muted-foreground">
            This is a placeholder for the full article content. In a production environment, this would contain the complete blog post with rich formatting, images, code examples, and embedded media.
          </p>
          <p className="text-muted-foreground">
            The article would typically cover detailed analysis, comparisons, tutorials, or news about the AI tool landscape, helping readers make informed decisions about which tools to use.
          </p>
        </div>

        <div className="pt-6 border-t border-border">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
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
