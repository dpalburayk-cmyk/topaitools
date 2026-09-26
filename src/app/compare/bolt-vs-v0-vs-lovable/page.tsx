import type { Metadata } from "next";
import Link from "next/link";
import { Star, Check, X, ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ToolIcon } from "@/components/tools/ToolIcon";
import { siteConfig } from "@/data/site-config";

export const revalidate = 86400;

const url = `${siteConfig.url}/compare/bolt-vs-v0-vs-lovable`;
const title = "Bolt.new vs v0 vs Lovable (2026): Full Comparison — Which AI App Builder Wins?";
const description =
  "We tested Bolt.new, v0 by Vercel, and Lovable side by side on the same app ideas. Pricing, code quality, backend support, deployment, and who each builder is really for — our honest 2026 verdict.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: siteConfig.name,
    type: "article",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title, description },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Bolt.new, v0, or Lovable best for beginners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lovable is the most beginner-friendly of the three: it hides the code by default, wires up a Supabase backend for you, and guides you toward a working full-stack app with minimal technical vocabulary. Bolt.new is close behind but shows you more code, which can overwhelm absolute beginners. v0 assumes you can read React and Tailwind, so it suits developers rather than non-technical founders.",
      },
    },
    {
      "@type": "Question",
      name: "Which is cheaper: Bolt.new, v0, or Lovable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All three have free tiers and paid plans that start around $20 per month, but their credit/token systems behave differently. v0 stretches furthest for UI-only work because generating screens consumes little of your allowance. Lovable's full-stack generations cost more credits per request. Bolt.new's tokens drain fastest on large multi-file apps, so heavy users often need the higher tier. For occasional UI prototyping v0 is usually the cheapest in practice; for shipping complete apps, compare the tiers against your expected volume.",
      },
    },
    {
      "@type": "Question",
      name: "Can Bolt.new, v0, and Lovable build a full backend, or only frontends?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "v0 is primarily a UI and frontend generator — backend logic is expected to live in your own codebase. Bolt.new can scaffold full-stack apps including server code and APIs in the browser, and it integrates services like Supabase. Lovable is the most opinionated full-stack option: it provisions a Supabase database, authentication, and edge functions as part of the build. If you need a working backend with zero setup, Lovable is the fastest path; if you already have a backend, v0 is the better fit.",
      },
    },
    {
      "@type": "Question",
      name: "Do Bolt.new, v0, or Lovable let you own and export the code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — all three generate real code you own, not locked proprietary formats. v0 produces clean React and Tailwind you can paste into any project. Bolt.new lets you download or push the project to GitHub. Lovable offers two-way GitHub sync, so the code lives in your repository as you iterate. The practical difference is code quality: v0's output is the most production-ready, while Bolt.new and Lovable sometimes need refactoring once an app grows beyond a prototype.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Compare", item: `${siteConfig.url}/compare` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Bolt.new vs v0 vs Lovable",
      item: url,
    },
  ],
};

const TOOLS = [
  {
    name: "Bolt.new",
    slug: "bolt",
    icon: "https://icon.horse/icon/bolt.new",
    maker: "StackBlitz",
    rating: 4.5,
    href: "/tools/bolt",
    website: "https://bolt.new",
    tagline: "The browser-native full-stack builder",
  },
  {
    name: "v0 by Vercel",
    slug: "v0",
    icon: "https://icon.horse/icon/vercel.com",
    maker: "Vercel",
    rating: 4.6,
    href: "/tools/v0",
    website: "https://v0.dev",
    tagline: "The frontend craftsman's generator",
  },
  {
    name: "Lovable",
    slug: "lovable",
    icon: "https://icon.horse/icon/lovable.dev",
    maker: "Lovable AI",
    rating: 4.6,
    href: "/tools/lovable",
    website: "https://lovable.dev",
    tagline: "The fastest path from idea to full-stack app",
  },
] as const;

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm">
      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
      <span>{children}</span>
    </li>
  );
}

function XItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm">
      <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
      <span>{children}</span>
    </li>
  );
}

export default function BoltVsV0VsLovablePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Compare", href: "/compare" },
          { label: "Bolt.new vs v0 vs Lovable" },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold leading-tight">
        Bolt.new vs v0 vs Lovable: Which AI App Builder Should You Use in 2026?
      </h1>
      <p className="text-muted-foreground mt-3">
        We gave all three builders the same briefs — a dashboard, a landing page,
        and a small full-stack app with authentication — and compared how they
        handled prompting, code quality, backends, and shipping. Here is what
        actually happened, without the marketing gloss.
      </p>
      <p className="text-xs text-muted-foreground mt-2">
        Updated September 2026 · Hands-on editorial comparison · ~8 min read
      </p>

      {/* Tool cards */}
      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        {TOOLS.map((t) => (
          <div
            key={t.slug}
            className="rounded-xl border bg-card p-4 flex flex-col items-center text-center gap-2"
          >
            <ToolIcon name={t.name} imageUrl={t.icon} size="xl" />
            <div className="font-semibold">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.maker}</div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 text-amber-500 fill-current" />
              <span className="font-semibold">{t.rating}</span>
              <span className="text-muted-foreground">/5</span>
            </div>
            <p className="text-xs text-muted-foreground italic">{t.tagline}</p>
            <Link
              href={t.href}
              className="text-sm text-indigo-500 hover:underline mt-auto"
            >
              Read our review →
            </Link>
          </div>
        ))}
      </div>

      {/* TL;DR */}
      <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-5 mt-10">
        <h2 className="text-lg font-bold">TL;DR — the one-paragraph verdict</h2>
        <p className="mt-2 text-sm leading-relaxed">
          <strong>Lovable</strong> wins for non-technical founders who want a
          complete full-stack app — database, auth, and hosting included — with
          the least friction. <strong>v0</strong> wins for developers who
          already have a codebase and want beautiful, production-grade React UI
          generated at speed. <strong>Bolt.new</strong> is the best middle
          ground: it builds full-stack apps in the browser and gives you more
          direct control of the code than Lovable, but its tokens burn fastest
          on ambitious projects. If you can only remember one line:{" "}
          <em>idea → app, use Lovable; UI in an existing app, use v0; build
          and tinker in the browser, use Bolt.new.</em>
        </p>
      </div>

      {/* Spec table */}
      <h2 className="text-2xl font-bold mt-12">Side-by-side comparison</h2>
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm border rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-muted/50 text-left">
              <th className="p-3 font-semibold">&nbsp;</th>
              <th className="p-3 font-semibold">Bolt.new</th>
              <th className="p-3 font-semibold">v0</th>
              <th className="p-3 font-semibold">Lovable</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[
              ["Best for", "Full-stack prototyping in the browser", "Production React UI for existing apps", "Complete apps without writing code"],
              ["Free tier", "Yes (daily token allowance)", "Yes (generous starter credits)", "Yes (daily credit allowance)"],
              ["Paid plans", "From ~$20/mo (token tiers)", "From ~$20/mo (credit tiers)", "From ~$25/mo (credit tiers)"],
              ["Full-stack support", "Yes — code + APIs + Supabase integration", "Frontend-focused; bring your own backend", "Yes — Supabase DB, auth, edge functions built in"],
              ["Framework", "React / Next.js / Expo (mobile)", "Next.js + Tailwind + shadcn/ui", "React + Supabase stack"],
              ["Code ownership", "Download or push to GitHub", "Copy code or export to your repo", "Two-way GitHub sync"],
              ["Deployment", "One-click (Netlify & similar)", "One-click to Vercel", "One-click hosting built in"],
              ["Learning curve", "Moderate — you see the code", "Needs React/Tailwind literacy", "Lowest — code hidden by default"],
              ["Consumption model", "Tokens (burn fast on big apps)", "Credits (cheap for UI work)", "Credits (costlier per full-stack build)"],
            ].map(([label, a, b, c]) => (
              <tr key={label}>
                <td className="p-3 font-medium text-muted-foreground whitespace-nowrap align-top">{label}</td>
                <td className="p-3 align-top">{a}</td>
                <td className="p-3 align-top">{b}</td>
                <td className="p-3 align-top">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Editorial sections */}
      <h2 className="text-2xl font-bold mt-12">What it's like to actually use each one</h2>

      <h3 className="text-xl font-semibold mt-8">Bolt.new — the tinkerer's workbench</h3>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          Bolt.new's defining trick is that everything happens inside your
          browser via WebContainers — there is no remote sandbox to wait for.
          On our dashboard brief it produced a working multi-file React app in
          one shot, and the instant preview meant we could click through and
          file follow-up prompts within seconds. That tight loop is where Bolt
          feels best: you are always one prompt away from a visible change.
        </p>
        <p>
          The honest caveat is consumption. Bolt charges by tokens, and large
          apps with many files consume them quickly — especially when the model
          needs to re-read context to fix a bug. On our third iteration (adding
          auth), we watched a meaningful chunk of the daily allowance vanish on
          a single repair cycle. Developers who enjoy guiding an AI through
          their codebase will love Bolt; people who expect one prompt to equal
          one finished feature may find the token math frustrating. The Supabase
          integration for database-backed features worked well in our testing.
        </p>
        <ul className="space-y-1.5 mt-3">
          <CheckItem>Full-stack apps built and previewed entirely in the browser</CheckItem>
          <CheckItem>Direct code control — edit any file yourself at any time</CheckItem>
          <CheckItem>Mobile app path via Expo integration</CheckItem>
          <XItem>Tokens drain quickly on large, multi-file projects</XItem>
          <XItem>Occasional loop of prompt → break → repair on complex changes</XItem>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mt-8">v0 by Vercel — the frontend perfectionist</h3>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          v0 is the specialist in this trio, and it shows. Its output is the
          cleanest code of the three — idiomatic Next.js with Tailwind and
          shadcn/ui components that genuinely look like something a senior
          frontend developer wrote. On the landing-page brief, v0's first
          result was the only one we would ship to a client without edits. The
          chat-based iteration is precise: ask for a tighter hero section and
          it changes exactly that, without disturbing the rest of the page.
        </p>
        <p>
          The trade-off is scope. v0 builds interfaces, not applications — if
          your project needs a database, auth, or payment flows, you are
          expected to wire those in yourself. For a developer with an existing
          Next.js codebase that is a feature, not a bug: v0 slots into your
          workflow instead of replacing it. The Vercel one-click deploy is
          seamless, and because UI generations consume relatively few credits,
          v0 is usually the most economical of the three for design-heavy work.
          Just don't ask it to build your backend — that is not the tool it is
          trying to be.
        </p>
        <ul className="space-y-1.5 mt-3">
          <CheckItem>Highest code quality — production-ready React/Tailwind output</CheckItem>
          <CheckItem>Precise, surgical iteration through chat</CheckItem>
          <CheckItem>Best credits-per-result ratio for UI work</CheckItem>
          <XItem>Frontend only — no real backend story</XItem>
          <XItem>Assumes you can read and integrate code</XItem>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mt-8">Lovable — the fastest idea-to-app pipeline</h3>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          Lovable delivered the most complete result from a single prompt. Our
          full-stack brief — a small app with sign-up, a data table, and basic
          CRUD — came back not just as UI but as a working application: Supabase
          database provisioned, authentication configured, and hosting ready.
          For a non-technical founder, that difference is everything. You
          describe the product; Lovable hands you a URL you can send to users.
          The code is hidden by default, which keeps beginners out of trouble,
          and the two-way GitHub sync means a developer can take over the
          moment the project gets serious.
        </p>
        <p>
          The limits appear when your vision diverges from the well-trodden
          path. Because Lovable is opinionated about its React + Supabase
          stack, unusual requirements can take several prompt rounds to
          express, and each full-stack generation costs meaningful credits.
          Like Bolt, complex bug-fixing can feel like paying for repair
          cycles. Our advice after testing: use Lovable to prove the product
          works, then graduate to Bolt or a traditional codebase when you need
          fine-grained control. As a first ninety days of product development,
          though, it is hard to beat.
        </p>
        <ul className="space-y-1.5 mt-3">
          <CheckItem>Most complete single-prompt result — app, DB, auth, hosting</CheckItem>
          <CheckItem>Zero-setup Supabase backend with auth included</CheckItem>
          <CheckItem>Two-way GitHub sync keeps you un-locked-in</CheckItem>
          <XItem>Opinionated stack — custom architecture is hard to express</XItem>
          <XItem>Credits add up on iterative full-stack changes</XItem>
        </ul>
      </div>

      {/* Decision guide */}
      <h2 className="text-2xl font-bold mt-12">Which one should you choose?</h2>
      <div className="grid gap-3 mt-4">
        {[
          ["You can't code and want to ship a real product", "Lovable", "Full-stack output with auth and database included — nothing else comes close for non-developers.", "/tools/lovable"],
          ["You're a developer adding UI to an existing app", "v0", "Production-grade React/Tailwind that drops straight into your Next.js codebase.", "/tools/v0"],
          ["You want to build, inspect and tinker in the browser", "Bolt.new", "Browser-native full-stack environment with direct control over every file.", "/tools/bolt"],
          ["You're validating a startup idea this weekend", "Lovable", "From prompt to shareable URL faster than the alternatives.", "/tools/lovable"],
          ["You're budget-sensitive and mostly need screens", "v0", "UI generations consume the fewest credits of any workload here.", "/tools/v0"],
          ["You're building a mobile app", "Bolt.new", "The Expo integration is the only serious mobile path among the three.", "/tools/bolt"],
        ].map(([need, pick, why, href]) => (
          <div key={need as string} className="rounded-xl border bg-card p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex-1">
              <div className="text-sm font-medium">{need}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{why}</div>
            </div>
            <Link href={href as string} className="text-sm font-semibold text-indigo-500 hover:underline whitespace-nowrap">
              → {pick}
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <h2 className="text-2xl font-bold mt-12">Frequently asked questions</h2>
      <div className="mt-4 space-y-6 text-sm leading-relaxed">
        <div>
          <h3 className="font-semibold">Is Bolt.new, v0, or Lovable best for beginners?</h3>
          <p className="text-muted-foreground mt-1">
            Lovable, comfortably. It hides the code, wires up the backend for
            you, and guides you to a working product with minimal technical
            vocabulary. Bolt.new shows you more code, which is great for
            learners but can overwhelm absolute beginners. v0 assumes React and
            Tailwind literacy, so it is a developer tool first.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Which is cheaper: Bolt.new, v0, or Lovable?</h3>
          <p className="text-muted-foreground mt-1">
            All three have free tiers and paid plans starting around $20/month,
            but their consumption models behave differently in practice. v0
            stretches furthest for UI-only work; Lovable's full-stack
            generations cost more credits per request; Bolt.new's tokens burn
            fastest on large apps. Match the tier to your expected volume — for
            occasional prototyping v0 usually wins on cost.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Can they build a real backend, or only frontends?</h3>
          <p className="text-muted-foreground mt-1">
            v0 is frontend-focused — bring your own backend. Bolt.new can
            scaffold full-stack apps including APIs and integrates Supabase.
            Lovable is the most complete: it provisions a Supabase database,
            authentication, and edge functions as part of the build. Need a
            working backend with zero setup? Lovable. Already have one? v0.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Do you own and can you export the code?</h3>
          <p className="text-muted-foreground mt-1">
            Yes, all three generate real code you own. v0's output pastes into
            any project, Bolt.new lets you download or push to GitHub, and
            Lovable keeps a two-way GitHub sync. The real difference is polish:
            v0's code is the most production-ready out of the box, while Bolt
            and Lovable sometimes need refactoring once an app outgrows its
            prototype stage.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Can I use more than one of them together?</h3>
          <p className="text-muted-foreground mt-1">
            Absolutely, and many teams do. A common 2026 workflow: prototype
            and validate the product in Lovable, generate polished marketing
            pages and dashboard screens with v0, then hand the project to a
            developer who uses Bolt.new (or a local codebase) for the heavy
            engineering. They are complementary stages of a pipeline more than
            direct competitors.
          </p>
        </div>
      </div>

      {/* Verdict */}
      <h2 className="text-2xl font-bold mt-12">Final verdict</h2>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          These three tools are converging on the same future — prompt to
          product — but they reach it from different directions. Lovable
          optimizes for the person with an idea and no engineering team. v0
          optimizes for the engineering team that wants its interfaces faster.
          Bolt.new optimizes for the builder who wants to stay close to the
          code while still getting AI leverage.
        </p>
        <p>
          Our ratings put v0 and Lovable marginally ahead of Bolt (4.6 vs 4.5),
          but the honest answer is that the best choice depends on which of
          those three people you are. All three offer free tiers generous
          enough to run your real project through a first session — do that
          before paying for anything, and you will know within an hour which
          one fits how you think.
        </p>
      </div>

      {/* Deep links */}
      <div className="grid sm:grid-cols-3 gap-3 mt-10">
        {TOOLS.map((t) => (
          <Link
            key={t.slug}
            href={`/compare/${t.slug === "bolt" ? "bolt-vs-v0" : t.slug === "v0" ? "lovable-vs-v0" : "bolt-vs-lovable"}`}
            className="rounded-xl border bg-card p-3 text-sm hover:border-indigo-500/50 transition-colors"
          >
            <span className="text-muted-foreground">Pairwise:</span>{" "}
            <span className="font-medium">{t.name} deep-dive →</span>
          </Link>
        ))}
      </div>

      <Link
        href="/compare"
        className="inline-flex items-center gap-1.5 text-sm text-indigo-500 hover:underline mt-8"
      >
        <ArrowLeft className="w-4 h-4" /> Browse all comparisons
      </Link>
    </div>
  );
}
