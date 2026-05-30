"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Search, Menu, X, Sun, Moon, ChevronDown, Command, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { searchTools, tools } from "@/data/tools";
import { useFavorites } from "@/hooks/useFavorites";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof tools>([]);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { favorites, mounted: favMounted } = useFavorites();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      setSearchResults(searchTools(searchQuery).slice(0, 6));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const navLinks = [
    { href: "/tools", label: "Tools" },
    { href: "/categories", label: "Categories" },
    { href: "/blog", label: "Blog" },
    { href: "/submit", label: "Submit" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-lg font-bold tracking-tight">
                Top<span className="text-indigo-500">AI</span> Tools
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/favorites"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent flex items-center gap-1.5"
              >
                <Heart className="w-4 h-4" />
                <span>Favorites</span>
                {favMounted && favorites.length > 0 && (
                  <span className="min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-indigo-500/10 text-indigo-500 text-[10px] font-bold px-1">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <div ref={searchRef} className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Search tools...</span>
                  <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground bg-muted rounded border border-border">
                    <Command className="w-2.5 h-2.5" />K
                  </kbd>
                </button>

                {searchOpen && (
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[90vw] max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 border-b border-border">
                      <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search AI tools..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 py-3 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                      />
                      <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground bg-muted rounded border border-border">ESC</kbd>
                    </div>
                    {searchQuery.length > 1 && (
                      <div className="max-h-80 overflow-y-auto">
                        {searchResults.length > 0 ? (
                          searchResults.map((tool) => (
                            <Link
                              key={tool.id}
                              href={`/tools/${tool.slug}`}
                              onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 text-xs font-bold overflow-hidden">
                                {tool.imageUrl ? (
                                  <img src={tool.imageUrl} alt={tool.name} className="w-full h-full object-cover" />
                                ) : (
                                  tool.name.charAt(0)
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{tool.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
                              </div>
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 capitalize shrink-0">
                                {tool.pricingModel}
                              </span>
                            </Link>
                          ))
                        ) : (
                          <p className="px-4 py-8 text-sm text-muted-foreground text-center">No tools found</p>
                        )}
                      </div>
                    )}
                    {searchQuery.length <= 1 && (
                      <div className="px-4 py-6">
                        <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Quick Links</p>
                        <div className="flex flex-wrap gap-2">
                          {["ChatGPT", "Midjourney", "Cursor", "Claude"].map((name) => (
                            <Link
                              key={name}
                              href={`/tools/${name.toLowerCase().replace(" ", "-")}`}
                              onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                              className="px-3 py-1.5 text-xs font-medium bg-muted rounded-lg hover:bg-accent transition-colors"
                            >
                              {name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {mounted && (
                <>
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                </>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-xl">
            <nav className="flex flex-col pt-20 px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-lg font-medium border-b border-border flex items-center gap-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/favorites"
                onClick={() => setMobileOpen(false)}
                className="py-3 text-lg font-medium border-b border-border flex items-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Favorites
                {favMounted && favorites.length > 0 && (
                  <span className="min-w-[20px] h-[20px] flex items-center justify-center rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold px-1">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
