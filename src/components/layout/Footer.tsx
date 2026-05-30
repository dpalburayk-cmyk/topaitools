import Link from "next/link";
import { Rss, ExternalLink, X } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { categories } from "@/data/tools";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-lg font-bold tracking-tight">
                AI<span className="text-indigo-500">Vault</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs">
              Discover, compare, and choose the best AI tools for every task. Curated reviews and honest ratings.
            </p>
            <div className="flex items-center gap-3">
              <a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                <X className="w-4 h-4" />
              </a>
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="/blog" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                <Rss className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/tools", label: "All Tools" },
                { href: "/tools?pricing=free", label: "Free Tools" },
                { href: "/tools?pricing=paid", label: "Paid Tools" },
                { href: "/submit", label: "Submit a Tool" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2.5">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categories/${cat.slug}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/blog", label: "Blog" },
                { href: "/about", label: "About" },
                { href: "/about", label: "Contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
