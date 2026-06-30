# Top AI Tools — AI Tools Directory

> 🌐 **Live:** [topaitools.xyz](https://topaitools.xyz)

A curated directory of 134+ AI tools across 9 categories with honest reviews, comparisons, and insights. Built with Next.js, Tailwind CSS, and TypeScript.

## Features

- **134+ AI Tools** curated across 9 categories (Chatbots, Image Generation, Video, Audio, Code, Writing, Productivity, Design, Research)
- **Search & Filter** — search by name, description, or tags; filter by pricing, category, and rating
- **Side-by-Side Comparison** — compare up to 4 tools on features, pricing, and reviews
- **Favorites** — save tools to your personal list (localStorage)
- **Blog** — 15+ articles with AI tool reviews, comparisons, and guides
- **Newsletter** — weekly email updates on new tools and insights
- **Dark/Light Mode** — system-aware theme with manual toggle
- **SEO Optimized** — JSON-LD structured data, dynamic sitemap, OG images, RSS feed
- **Analytics** — Google Analytics 4 + Vercel Analytics integration
- **Ads** — Google AdSense with lazy-loaded banners
- **PWA Ready** — web app manifest for mobile installation
- **Responsive** — mobile-first design with hamburger menu

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) | React framework (App Router) |
| [React 19](https://react.dev) | UI library |
| [TypeScript 5](https://typescriptlang.org) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling |
| [Lucide React](https://lucide.dev) | Icons |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark mode |
| [Resend](https://resend.com) | Email (newsletter + notifications) |
| [Vercel Analytics](https://vercel.com/analytics) | Performance monitoring |

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/topaitools/ai-tools-directory.git
cd ai-tools-directory
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Root layout (header, footer, providers)
│   ├── globals.css         # Global styles & design tokens
│   ├── tools/              # Tools listing & detail pages
│   ├── categories/         # Categories listing & detail pages
│   ├── blog/               # Blog listing & post pages
│   ├── compare/            # Side-by-side tool comparison
│   ├── favorites/          # Saved favorites
│   ├── about/              # About page
│   ├── submit/             # Tool submission form
│   └── api/                # API routes (submit, newsletter, advertise)
├── components/
│   ├── home/               # Homepage sections (Hero, Stats, WhyChooseUs, Newsletter)
│   ├── layout/             # Header, Footer, ThemeProvider, CompareBar
│   ├── tools/              # ToolCard, CategoryCard, ToolIcon
│   └── ui/                 # AdBanner, Breadcrumbs, Pagination, BackToTop, etc.
├── data/
│   ├── tools.ts            # 134 tools, 9 categories, 15 blog posts
│   └── site-config.ts      # Site metadata & social links
├── hooks/                  # Custom hooks (useFavorites, useCompare)
├── lib/                    # Utilities (cn, tracking)
└── types/                  # TypeScript interfaces
```

## Deployment

Deployed on [Vercel](https://vercel.com) with automatic deployments from GitHub.

## License

MIT
