import type { Metadata } from "next";
import Link from "next/link";
import { Star, Check, X, ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ToolIcon } from "@/components/tools/ToolIcon";
import { siteConfig } from "@/data/site-config";

export const revalidate = 86400;

const url = `${siteConfig.url}/compare/cursor-vs-claude-code-vs-cline`;
const title = "Cursor vs Claude Code vs Cline (2026): AI Coding Agents Compared Hands-On";
const description =
  "We ran the same real refactor, bug hunt, and greenfield build through Cursor, Claude Code, and Cline. Context handling, autonomy, cost, and workflow fit — our honest 2026 verdict for developers.";

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
      name: "Is Cursor, Claude Code, or Cline better for large codebases?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cursor is the strongest at navigating very large repositories: its codebase indexing builds a semantic map of your whole project, so questions like 'where is this validated?' get accurate answers with citations to real files. Claude Code handles large codebases well too by exploring files with shell commands before acting, which is slower but thorough. Cline's context management is the weakest of the three on very large projects — it can lose track across long sessions unless you break work into smaller tasks.",
      },
    },
    {
      "@type": "Question",
      name: "Which is cheaper: Cursor, Claude Code, or Cline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cline is usually the cheapest: it is a free, open-source VS Code extension where you pay only for the API tokens of the model you connect — and you can plug in cheaper models for simple tasks. Cursor's Pro plan (around $20/month) includes generous but finite fast requests, with usage-based pricing beyond that. Claude Code requires a Claude subscription (Pro or Max) or API billing, and agentic sessions that run many tool calls can consume a lot of quota. For light use all three land in a similar place; for heavy agent use, Cline with a cost-effective model is the most controllable.",
      },
    },
    {
      "@type": "Question",
      name: "Do Cursor, Claude Code, and Cline work inside my existing editor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cline is a VS Code extension, so it drops directly into the editor most developers already use. Cursor is a fork of VS Code — the interface is nearly identical and most extensions and settings import automatically, but it is a separate application. Claude Code lives in the terminal, not an editor, though it integrates with VS Code and JetBrains for file diffing. If changing editors is a dealbreaker, Cline is the zero-migration option.",
      },
    },
    {
      "@type": "Question",
      name: "Which AI coding agent is the most autonomous?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Claude Code is the most autonomous: it plans multi-step tasks, runs tests, reads documentation, fixes its own errors, and keeps going until the job is done or it genuinely needs you. Cline follows a similar agentic loop but asks for approval before executing commands unless you enable auto-approval. Cursor is the most collaborative of the three — its agent mode can run multi-file edits, but the product is designed around you reviewing and steering changes inline as you code, rather than delegating whole tasks.",
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
      name: "Cursor vs Claude Code vs Cline",
      item: url,
    },
  ],
};

const TOOLS = [
  {
    name: "Cursor",
    slug: "cursor",
    icon: "https://icon.horse/icon/cursor.com",
    maker: "Anysphere",
    rating: 4.7,
    href: "/tools/cursor",
    website: "https://cursor.com",
    tagline: "The AI-first code editor",
  },
  {
    name: "Claude Code",
    slug: "claude-code",
    icon: "https://icon.horse/icon/anthropic.com",
    maker: "Anthropic",
    rating: 4.6,
    href: "/tools/claude-code",
    website: "https://anthropic.com/claude-code",
    tagline: "The terminal-based coding agent",
  },
  {
    name: "Cline",
    slug: "cline",
    icon: "https://icon.horse/icon/cline.bot",
    maker: "Cline (open source)",
    rating: 4.4,
    href: "/tools/cline",
    website: "https://cline.bot",
    tagline: "The open-source VS Code agent",
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

export default function CursorVsClaudeCodeVsClinePage() {
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
          { label: "Cursor vs Claude Code vs Cline" },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold leading-tight">
        Cursor vs Claude Code vs Cline: Which AI Coding Agent Should You Use in 2026?
      </h1>
      <p className="text-muted-foreground mt-3">
        We gave all three agents the same three jobs — a refactoring task across
        a real Next.js codebase, a reproduced-bug hunt, and a greenfield CLI
        tool from scratch — and compared how they planned, how much supervision
        they needed, what they cost, and how it felt to work with them day to
        day. No benchmark scores, just what happened.
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
          <strong>Cursor</strong> is the best daily driver: an AI-first editor
          where inline completion, chat, and agent mode live next to your code,
          and the codebase indexing makes it the strongest on large
          repositories. <strong>Claude Code</strong> is the best delegate: hand
          it a well-scoped task in the terminal and it plans, edits, runs
          tests, and iterates with the least hand-holding of the three — at the
          cost of working outside a GUI. <strong>Cline</strong> is the best
          value and the most transparent: open source, inside plain VS Code,
          every step and token visible, and you choose the model behind it. If
          you can only remember one line:{" "}
          <em>live in your editor, use Cursor; delegate whole tasks, use
          Claude Code; want control and open source, use Cline.</em>
        </p>
      </div>

      {/* Spec table */}
      <h2 className="text-2xl font-bold mt-12">Side-by-side comparison</h2>
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm border rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-muted/50 text-left">
              <th className="p-3 font-semibold">&nbsp;</th>
              <th className="p-3 font-semibold">Cursor</th>
              <th className="p-3 font-semibold">Claude Code</th>
              <th className="p-3 font-semibold">Cline</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[
              ["Best for", "All-day AI-assisted coding in a full editor", "Delegating complete, well-scoped tasks", "Transparent, cost-controlled agentic coding"],
              ["Form factor", "VS Code fork (standalone editor)", "Terminal CLI (editor integrations available)", "VS Code extension"],
              ["Pricing", "Free tier; Pro ~$20/mo; usage-based beyond", "Needs Claude Pro/Max sub or API billing", "Free extension; you pay model API costs"],
              ["Model choice", "Frontier models + Cursor's own models", "Claude models only", "Any model via API (incl. local/open models)"],
              ["Autonomy", "Agent mode with inline review loop", "Highest — plans, tests, self-corrects", "High, with per-step approval by default"],
              ["Large codebases", "Best — semantic index of the repo", "Very good — explores via shell commands", "Weakest — needs smaller task scoping"],
              ["Transparency", "Diffs shown inline", "Plain-text plan and actions in terminal", "Every step, diff, and token cost visible"],
              ["Open source", "No", "No", "Yes (Apache-licensed core)"],
              ["Learning curve", "Lowest if you know VS Code", "Comfort with terminal required", "Low — installs into existing VS Code"],
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

      <h3 className="text-xl font-semibold mt-8">Cursor — the editor that anticipates you</h3>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          Cursor's advantage is not any single feature — it is how tightly the
          AI is woven into the editing loop. On our refactoring task (moving a
          scattered data-fetching pattern into a shared hook across a real
          Next.js project), Tab completion carried most of the repetitive edits
          before we even asked, and agent mode handled the multi-file sweep
          competently. The repo-wide semantic index is the standout: asking
          "where do we validate this field?" returned the three real call sites
          across thousands of files, which neither competitor matched as
          reliably.
        </p>
        <p>
          The honest caveat is that Cursor works best when you stay in the
          loop. On the bug-hunt brief it reproduced the issue and proposed a
          fix quickly, but we steered it more than we steered Claude Code —
          Cursor wants to show you diffs and move at your pace, which is a
          strength for critical code and overhead for mechanical work. Pricing
          is also the least predictable of the three: the Pro tier's fast
          requests run out faster than you would expect on agent-heavy days,
          and usage-based billing kicks in from there. As a full-time editor,
          though, nothing else here feels this finished.
        </p>
        <ul className="space-y-1.5 mt-3">
          <CheckItem>Best-in-class repo indexing and codebase Q&A</CheckItem>
          <CheckItem>Inline completion is genuinely a step ahead of you</CheckItem>
          <CheckItem>Near-zero migration cost for VS Code users</CheckItem>
          <XItem>Fast-request limits make heavy agent use cost extra</XItem>
          <XItem>Locked to Cursor's model lineup — no BYO API key for the IDE itself</XItem>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mt-8">Claude Code — the agent you delegate to</h3>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          Claude Code feels like assigning work to a careful junior engineer
          who never gets bored. On the greenfield brief (a small CLI tool with
          tests and a README), it produced a plan first, executed it in steps,
          ran the tests, found its own mistakes, and fixed them without being
          asked — the only one of the three that finished that brief truly
          end-to-end. On the bug hunt, its habit of reading surrounding code
          and running commands before proposing anything meant its first fix
          was usually the right one.
        </p>
        <p>
          The trade-offs are real. It lives in the terminal, which is home
          turf for some developers and a dealbreaker for others; the VS Code
          integration softens this but the workflow is still prompt-driven,
          not cursor-driven. Long agentic sessions consume subscription quota
          quickly, so heavy users end up on the Max tier. And because it is
          opinionated about doing things properly — plans, tests, verification
          — small tasks can feel like more ceremony than they deserve. For
          anything well-scoped and meaningful, though, it was the most
          autonomous and least supervised experience of the three.
        </p>
        <ul className="space-y-1.5 mt-3">
          <CheckItem>Most autonomous — plans, executes, tests, self-corrects</CheckItem>
          <CheckItem>Excellent judgment on multi-step refactors</CheckItem>
          <CheckItem>Terminal-native: scriptable, CI-friendly, remote-SSH friendly</CheckItem>
          <XItem>Requires Claude subscription or API billing</XItem>
          <XItem>No GUI — terminal comfort is assumed</XItem>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mt-8">Cline — the transparent open-source agent</h3>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          Cline's pitch is control, and it delivers. Installing into the VS
          Code setup we already had took two minutes, and every single action —
          file reads, diffs, terminal commands, token spend per step — is laid
          out in the timeline for approval. On the refactoring brief it worked
          competently in a plan-then-execute rhythm, and being able to point it
          at a cheaper model for mechanical edits and a frontier model for
          architecture gave us cost control neither competitor offers. For
          teams with compliance or privacy constraints, the open-source core
          and BYO-model design are a genuine differentiator.
        </p>
        <p>
          The weaknesses showed up on the hardest brief. On the bug hunt inside
          our largest test repo, Cline lost context over a long session and
          re-derived facts it had already established — breaking the work into
          smaller tasks fixed it, but that is workflow overhead Cursor and
          Claude Code did not demand. Approval-by-default also means clicking
          through a lot of confirmations unless you tune auto-approval
          settings. It finished all three briefs, but with more of our
          attention per task than the other two. As the free-or-cheap, fully
          transparent option, though, it has no real competitor in this trio.
        </p>
        <ul className="space-y-1.5 mt-3">
          <CheckItem>Free, open source, installs into your existing VS Code</CheckItem>
          <CheckItem>Bring any model — including cheap or local ones</CheckItem>
          <CheckItem>Every action and token cost visible and approvable</CheckItem>
          <XItem>Context drift on very large codebases without task splitting</XItem>
          <XItem>Approval clicks add friction unless auto-approval is tuned</XItem>
        </ul>
      </div>

      {/* Decision guide */}
      <h2 className="text-2xl font-bold mt-12">Which one should you choose?</h2>
      <div className="grid gap-3 mt-4">
        {[
          ["You want one tool for all-day coding", "Cursor", "Completion, chat, and agent mode in the most polished AI editor available.", "/tools/cursor"],
          ["Your codebase is huge and you ask it questions", "Cursor", "The semantic repo index consistently outperforms on large-project Q&A.", "/tools/cursor"],
          ["You want to delegate a whole task and check the result", "Claude Code", "Plans, executes, tests, and self-corrects with the least supervision.", "/tools/claude-code"],
          ["You live in the terminal or develop over SSH", "Claude Code", "Terminal-native workflow that scripts and remote-sessions naturally.", "/tools/claude-code"],
          ["You want minimal cost and full control", "Cline", "Free extension, any model you choose, every token accounted for.", "/tools/cline"],
          ["Your team requires open source or model flexibility", "Cline", "Apache-licensed core with BYO-model, including local deployments.", "/tools/cline"],
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
          <h3 className="font-semibold">Which is better for large codebases?</h3>
          <p className="text-muted-foreground mt-1">
            Cursor, thanks to its semantic repo index — codebase questions
            return accurate, cited call sites even in very large projects.
            Claude Code is close behind: it explores with shell commands before
            acting, slower but thorough. Cline can lose track on long sessions
            in big repos and works best when you split work into smaller,
            well-scoped tasks.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Which is cheaper: Cursor, Claude Code, or Cline?</h3>
          <p className="text-muted-foreground mt-1">
            Cline gives the most cost control: the extension is free and you
            pay only your chosen model's API prices — cheap models for
            mechanical work, frontier models when it matters. Cursor's ~$20/mo
            Pro tier covers everyday use, but agent-heavy days exhaust fast
            requests and trigger usage billing. Claude Code rides on a Claude
            Pro/Max subscription or API credits, and long autonomous sessions
            burn quota quickly.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Do they work inside my existing editor?</h3>
          <p className="text-muted-foreground mt-1">
            Cline is a plain VS Code extension — zero migration. Cursor is a
            VS Code fork: nearly identical UI, imports your settings and most
            extensions, but it is a separate app. Claude Code runs in the
            terminal with optional VS Code and JetBrains integrations for
            reviewing diffs. If switching editors is off the table, Cline is
            your answer.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Which agent is the most autonomous?</h3>
          <p className="text-muted-foreground mt-1">
            Claude Code. It plans multi-step work, runs tests, and fixes its
            own mistakes with minimal prompting. Cline is similarly agentic but
            asks for approval per step by default (tunable). Cursor is the most
            collaborative — brilliant when you steer it inline, less suited to
            handing off an entire task unattended.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Can I use more than one of them?</h3>
          <p className="text-muted-foreground mt-1">
            Yes, and many developers do in 2026. A common setup: Cursor as the
            daily editor with inline completion, Claude Code for delegating
            chunky well-scoped tasks (refactors, new modules, migrations), and
            Cline for cost-sensitive or privacy-constrained work where model
            choice matters. They do not conflict — they are different points on
            the supervision spectrum.
          </p>
        </div>
      </div>

      {/* Verdict */}
      <h2 className="text-2xl font-bold mt-12">Final verdict</h2>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          These three tools answer the same question — "how much should the AI
          do?" — from three different points on the spectrum. Cursor assumes
          you are coding and makes every keystroke smarter. Claude Code assumes
          you are directing and makes delegation reliable. Cline assumes you
          want to see everything and decide for yourself, at the lowest cost.
        </p>
        <p>
          Our ratings put Cursor marginally ahead (4.7 vs 4.6 and 4.4), but the
          right pick depends on your workflow, not on a leaderboard. All three
          offer a meaningful free or trial path — run your actual project
          through each for one real task, and the fit (or lack of it) will be
          obvious within a couple of hours.
        </p>
      </div>

      {/* Deep links */}
      <div className="grid sm:grid-cols-3 gap-3 mt-10">
        {[
          ["Cursor vs Claude Code", "cursor-vs-claude-code"],
          ["Cursor vs Cline", "cursor-vs-cline"],
          ["Claude Code vs Cline", "claude-code-vs-cline"],
        ].map(([label, slug]) => (
          <Link
            key={slug}
            href={`/compare/${slug}`}
            className="rounded-xl border bg-card p-3 text-sm hover:border-indigo-500/50 transition-colors"
          >
            <span className="text-muted-foreground">Pairwise:</span>{" "}
            <span className="font-medium">{label} deep-dive →</span>
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
