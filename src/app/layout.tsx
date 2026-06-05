import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { CompareProvider } from "@/components/layout/CompareProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CompareBar } from "@/components/layout/CompareBar";
import { siteConfig } from "@/data/site-config";
import { tools, categories } from "@/data/tools";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Discover the Best AI Tools`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI tools", "best AI tools", "AI tool directory", "AI tools 2026",
    "ChatGPT", "Claude", "Gemini", "Midjourney", "Cursor", "Runway", "Sora",
    "AI image generator", "AI video generator", "AI coding tools", "AI writing tools",
    "free AI tools", "AI tools comparison", "AI chatbot", "AI productivity tools",
    "top AI tools", "AI tools directory", "best AI software", "AI applications",
    "artificial intelligence tools", "AI for business", "AI for students",
  ],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: siteConfig.url },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/tools?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      "https://x.com/topaitoolsxyz",
      "https://github.com/topaitools",
    ],
  };

  // Generate ItemList JSON-LD for tools (SEO-rich structured data)
  const jsonLdTools = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} - Complete Directory`,
    description: `Browse ${tools.length}+ curated AI tools across ${categories.length} categories with honest reviews and comparisons.`,
    numberOfItems: tools.length,
    itemListElement: tools.slice(0, 50).map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}/tools/${tool.slug}`,
      name: tool.name,
    })),
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="google-site-verification" content="5KGtELHXq1OBU3W9auOe9Sd3MqFGJr3AsijeDxf7zTo" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1624976458211100" crossOrigin="anonymous"></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdTools) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <CompareProvider>
            <Header />
            <div className="flex-1 pb-16">{children}</div>
            <Footer />
            <CompareBar />
          </CompareProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
