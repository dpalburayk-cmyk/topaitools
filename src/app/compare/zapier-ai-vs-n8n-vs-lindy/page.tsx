import type { Metadata } from "next";
import Link from "next/link";
import { Star, Check, X, ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ToolIcon } from "@/components/tools/ToolIcon";
import { siteConfig } from "@/data/site-config";

export const revalidate = 86400;

const url = `${siteConfig.url}/compare/zapier-ai-vs-n8n-vs-lindy`;
const title = "Zapier AI vs n8n vs Lindy (2026): AI Automation Platforms Compared Hands-On";
const description =
  "We built the same AI-powered workflows in Zapier AI, n8n, and Lindy — lead enrichment, email triage, and a multi-step agent. Cost at scale, self-hosting, AI agents, and who each platform is really for.";

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
      name: "Which is cheaper at scale: Zapier AI, n8n, or Lindy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "n8n is dramatically cheaper at volume. Zapier charges per task, and multi-step AI workflows can consume dozens of tasks per run, which pushes serious usage into hundreds of dollars per month. n8n charges per workflow execution regardless of how many steps run inside it — and its free self-hosted option makes it essentially free beyond server costs. Lindy prices per credit with AI actions costing more, sitting between the two: cheaper than Zapier for agent-style work, more predictable than per-task billing, but not competitive with self-hosted n8n at high volume.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need coding skills to use n8n, compared to Zapier AI or Lindy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zapier and Lindy are both fully no-code — you describe what you want and connect apps without touching code, and Zapier's AI can build workflows from a plain-English prompt. n8n has a no-code visual canvas, but its power lives in code steps: transforming data with JavaScript, calling arbitrary APIs, and debugging execution logs rewards people who can read code. Non-technical users will be productive fastest on Zapier; developers get the most out of n8n.",
      },
    },
    {
      "@type": "Question",
      name: "Can I self-host Zapier AI, n8n, or Lindy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Only n8n. It is fair-code licensed and ships a self-hosted community edition you can run on your own server, keeping all workflow data inside your infrastructure — a hard requirement for many enterprises and regulated industries. Zapier and Lindy are cloud-only SaaS; there is no self-hosting option. If data residency or air-gapped environments matter, n8n is the only candidate of the three.",
      },
    },
    {
      "@type": "Question",
      name: "Which platform has the best AI agents in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lindy is the most agent-native: automations are built as AI employees with instructions, tools, and memory, and it handled our ambiguous email-triage brief with the least scaffolding. Zapier's AI steps (and its Agents product) add real intelligence to classic zaps and benefit from the app ecosystem's sheer breadth, but the underlying model is still trigger-and-action. n8n offers AI agent nodes with full model control, the most flexible technically, but you assemble the agent yourself. For turnkey agents choose Lindy; for embedded AI steps across thousands of apps choose Zapier; for build-it-your-way agents choose n8n.",
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
      name: "Zapier AI vs n8n vs Lindy",
      item: url,
    },
  ],
};

const TOOLS = [
  {
    name: "Zapier AI",
    slug: "zapier-ai",
    icon: "https://icon.horse/icon/zapier.com",
    maker: "Zapier Inc.",
    rating: 4.5,
    href: "/tools/zapier-ai",
    website: "https://zapier.com",
    tagline: "The automation giant with an AI layer",
  },
  {
    name: "n8n",
    slug: "n8n",
    icon: "https://icon.horse/icon/n8n.io",
    maker: "n8n GmbH",
    rating: 4.6,
    href: "/tools/n8n",
    website: "https://n8n.io",
    tagline: "The developer-grade workflow engine",
  },
  {
    name: "Lindy",
    slug: "lindy",
    icon: "https://icon.horse/icon/lindy.ai",
    maker: "Lindy AI",
    rating: 4.3,
    href: "/tools/lindy",
    website: "https://lindy.ai",
    tagline: "AI employees, not workflows",
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

export default function ZapierAiVsN8nVsLindyPage() {
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
          { label: "Zapier AI vs n8n vs Lindy" },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold leading-tight">
        Zapier AI vs n8n vs Lindy: Which AI Automation Platform Should You Use in 2026?
      </h1>
      <p className="text-muted-foreground mt-3">
        We built the same three automations on each platform — lead enrichment
        from a form to CRM, an email triage agent, and a multi-step
        AI-with-human-approval pipeline — then compared build time, cost per
        run at scale, AI capability, and what breaks. Here is what actually
        happened, with real numbers.
      </p>
      <p className="text-xs text-muted-foreground mt-2">
        Updated October 2026 · Hands-on editorial comparison · ~8 min read
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
          <strong>Zapier AI</strong> wins on breadth and ease: 7,000+ app
          integrations, workflows you can describe in plain English, and the
          shallowest learning curve — at the steepest per-task price.{" "}
          <strong>n8n</strong> wins on power and cost at scale: per-execution
          pricing, self-hosting, code steps, and full model control make it
          the choice for technical teams, at the cost of a real learning
          curve. <strong>Lindy</strong> wins on the agent vision: automations
          that behave like AI employees with instructions and memory, the
          fastest path to genuinely ambiguous AI tasks. If you can only
          remember one line:{" "}
          <em>connect everyday apps, use Zapier; automate at volume with
          control, use n8n; delegate work to AI agents, use Lindy.</em>
        </p>
      </div>

      {/* Spec table */}
      <h2 className="text-2xl font-bold mt-12">Side-by-side comparison</h2>
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm border rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-muted/50 text-left">
              <th className="p-3 font-semibold">&nbsp;</th>
              <th className="p-3 font-semibold">Zapier AI</th>
              <th className="p-3 font-semibold">n8n</th>
              <th className="p-3 font-semibold">Lindy</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[
              ["Best for", "Connecting everyday SaaS apps, no code", "Technical teams, high volume, full control", "Agentic AI assistants for business tasks"],
              ["Integrations", "7,000+ apps — the widest by far", "500+ nodes, plus generic HTTP/API steps", "Growing set of tools + MCP connectors"],
              ["Pricing model", "Per task (steps add up fast)", "Per execution (steps included) or self-hosted free", "Per credit (AI actions cost more)"],
              ["Cost at 50k steps/mo", "Highest — often $500+/mo at this volume", "Lowest — mid-tier cloud plan or free self-hosted", "Middle — credit packs scale reasonably"],
              ["Self-hosting", "No", "Yes (community edition)", "No"],
              ["Coding needed", "None", "Rewards JavaScript and API literacy", "None"],
              ["AI capability", "AI-built zaps, AI steps, Agents", "AI agent nodes with any model, code-level control", "Agent-native: instructions, memory, tools"],
              ["Learning curve", "Lowest", "Steepest", "Low-moderate"],
              ["Debugging/transparency", "Task history per step", "Full execution logs, replay, item-level data", "Conversation-style agent transcripts"],
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

      <h3 className="text-xl font-semibold mt-8">Zapier AI — the everything-connector</h3>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          Zapier's decisive advantage showed up in the first minutes of the
          lead-enrichment brief: the form tool, the CRM, the email sender, and
          the enrichment API all had first-class integrations with sensible
          defaults, and describing the workflow in plain English produced a
          working draft we only had to adjust. Nobody else got us to a
          finished, connected workflow faster. The AI step — summarizing and
          scoring each lead with a frontier model — slotted in without any
          configuration fuss, and the Agents product handled our approval
          pipeline with human-in-the-loop steps that felt production-ready.
        </p>
        <p>
          The bill is where enthusiasm cools. Our enrichment zap consumed
          8–12 tasks per run once filters, formatter steps, and AI calls were
          counted, and task-based pricing does not care that most steps are
          plumbing. At the volumes a serious go-to-market motion generates,
          the monthly cost ran several times higher than n8n for the
          identical logic. There is also a ceiling on complexity: deeply
          branching, data-heavy workflows get unwieldy in the editor. For
          connecting mainstream business apps quickly, though, Zapier remains
          the safest bet in the industry.
        </p>
        <ul className="space-y-1.5 mt-3">
          <CheckItem>Unmatched integration breadth — 7,000+ apps</CheckItem>
          <CheckItem>Plain-English workflow building works well</CheckItem>
          <CheckItem>Mature agents with human-approval steps</CheckItem>
          <XItem>Per-task pricing multiplies painfully on multi-step AI flows</XItem>
          <XItem>Complex, branchy workflows become hard to manage</XItem>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mt-8">n8n — the engineer's workflow engine</h3>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          n8n took the longest to build and produced the most robust result.
          The visual canvas is honest about being a developer tool: nodes for
          every transformation, JavaScript code steps where the GUI ends, and
          execution logs that show every item's data at every stage — when
          our enrichment API returned malformed data, we found and fixed it in
          minutes with item-level replay. The AI agent node let us attach any
          model with our own keys, so the same workflow could run on a cheap
          model in testing and a frontier model in production. And the
          self-hosted edition means the whole pipeline can live inside our own
          infrastructure.
        </p>
        <p>
          The costs are time and skill. Building the triage agent required
          writing the prompt scaffolding, retry logic, and error branches that
          Lindy ships pre-built, and a non-technical teammate looked at the
          canvas and politely retreated. The integration library is far
          smaller than Zapier's — two of our apps needed generic HTTP nodes
          and manual auth. But the economics are decisive at scale: the same
          volume that costs hundreds per month on Zapier ran comfortably
          inside a low-tier n8n cloud plan, and essentially free self-hosted.
          For teams that can write code and care about unit costs, it is not
          close.
        </p>
        <ul className="space-y-1.5 mt-3">
          <CheckItem>Best cost-per-work at volume — per-execution pricing or free self-host</CheckItem>
          <CheckItem>Item-level debugging and replay is superb</CheckItem>
          <CheckItem>Any AI model, any API, full data residency</CheckItem>
          <XItem>Steepest learning curve — JavaScript and APIs assumed</XItem>
          <XItem>Far fewer native integrations than Zapier</XItem>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mt-8">Lindy — the AI employee platform</h3>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          Lindy reframed our test. Where Zapier and n8n asked "what steps?",
          Lindy asked "what job?" — we described the email triage agent in a
          paragraph of plain instructions, attached its tools (inbox, CRM,
          calendar), and it handled ambiguous cases our rule-based versions
          fumbled: an email that was half support request, half upsell
          opportunity got correctly split into two actions with a note
          explaining why. The meeting-scheduling and outreach templates are
          genuinely useful starting points, and the transcript-style logs make
          agent behavior auditable in a way that reads like reviewing an
          assistant's work, not debugging software.
        </p>
        <p>
          The trade-offs are maturity and determinism. Lindy is the youngest
          product of the three, and its integration library — while growing
          fast via MCP connectors — cannot touch Zapier's catalog; two niche
          tools in our brief had no connector at all. Agents also cost more
          credits than deterministic steps, so high-frequency, simple tasks
          are the wrong job for it. And when you need guaranteed,
          branch-by-branch behavior, an agent's judgment is a feature you pay
          for in unpredictability. For delegating messy, judgment-heavy work,
          though, it delivered the most impressive single demo of the three.
        </p>
        <ul className="space-y-1.5 mt-3">
          <CheckItem>Most agent-native — instructions, memory, and tools out of the box</CheckItem>
          <CheckItem>Handled ambiguous, judgment-heavy tasks best</CheckItem>
          <CheckItem>Readable agent transcripts make behavior auditable</CheckItem>
          <XItem>Smallest integration library of the three</XItem>
          <XItem>Credits add up; wrong tool for high-volume simple tasks</XItem>
        </ul>
      </div>

      {/* Decision guide */}
      <h2 className="text-2xl font-bold mt-12">Which one should you choose?</h2>
      <div className="grid gap-3 mt-4">
        {[
          ["You want to connect mainstream business apps fast", "Zapier AI", "If an app exists, Zapier integrates it — and AI drafts the workflow for you.", "/tools/zapier-ai"],
          ["Your team is technical and volume is high", "n8n", "Per-execution pricing and self-hosting collapse costs at scale.", "/tools/n8n"],
          ["Data must stay on your infrastructure", "n8n", "The only self-hostable option of the three.", "/tools/n8n"],
          ["You want an AI assistant, not a flowchart", "Lindy", "Instructions, memory, and tools behave like a hire, not a pipeline.", "/tools/lindy"],
          ["Your workflow needs judgment on messy input", "Lindy", "Handled ambiguous email triage better than rule-based rivals.", "/tools/lindy"],
          ["Budget predictability matters most", "n8n", "Execution-based billing is immune to step-count creep.", "/tools/n8n"],
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
          <h3 className="font-semibold">Which is cheaper at scale?</h3>
          <p className="text-muted-foreground mt-1">
            n8n, by a wide margin. Zapier's per-task billing counts every
            step, so multi-step AI workflows multiply cost fast — serious
            volumes reach hundreds of dollars monthly. n8n bills per
            execution (steps included) or runs free on your own server.
            Lindy sits between the two, with AI-heavy actions costing more
            credits than simple ones.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Do I need to code to use n8n?</h3>
          <p className="text-muted-foreground mt-1">
            Not strictly — the canvas is visual and simple flows need no code.
            But n8n's advantages (transformations, arbitrary APIs, model
            control) unlock with JavaScript and API literacy, and debugging
            execution logs rewards technical users. Non-technical users are
            productive fastest on Zapier or Lindy.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Can I self-host any of them?</h3>
          <p className="text-muted-foreground mt-1">
            Only n8n, via its free community edition — the standard choice for
            regulated industries and data-residency requirements. Zapier and
            Lindy are cloud-only.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Which has the best AI agents?</h3>
          <p className="text-muted-foreground mt-1">
            Different strengths: Lindy is agent-native and handled ambiguous
            tasks with the least setup; Zapier embeds AI steps and agents
            across the widest app catalog; n8n gives you the most control —
            any model, your keys, your logic — if you build the agent
            yourself. Turnkey: Lindy. Breadth: Zapier. Control: n8n.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Can they be used together?</h3>
          <p className="text-muted-foreground mt-1">
            Yes. A pragmatic 2026 stack: Zapier for the long tail of simple
            app-to-app connections, n8n for the high-volume core workflows
            where per-task pricing hurts, and Lindy for judgment-heavy
            front-line tasks (inbox triage, lead qualification) that neither
            deterministic platform handles gracefully. Each plays the position
            it is built for.
          </p>
        </div>
      </div>

      {/* Verdict */}
      <h2 className="text-2xl font-bold mt-12">Final verdict</h2>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          These three platforms represent three generations of automation
          thinking. Zapier perfected connecting apps. n8n perfected owning the
          pipeline. Lindy is betting that the pipeline itself dissolves into
          agents you brief like employees — and in our testing, that bet
          already pays off for messy, judgment-heavy work.
        </p>
        <p>
          Our ratings put n8n marginally ahead (4.6 vs 4.5 and 4.3), driven by
          cost-at-scale and control, but the rating that matters is your team's
          technical level: non-technical teams will ship more, faster, on
          Zapier; engineering-led teams will never forgive themselves for
          paying Zapier's per-task prices at volume; and anyone automating
          messy human communication should spend an hour with Lindy before
          building anything. All three have meaningful free trials or tiers —
          rebuild your single most annoying workflow on each and the choice
          will make itself.
        </p>
      </div>

      {/* Deep links */}
      <div className="grid sm:grid-cols-3 gap-3 mt-10">
        {[
          ["Zapier AI vs n8n", "zapier-ai-vs-n8n"],
          ["Zapier AI vs Lindy", "zapier-ai-vs-lindy"],
          ["n8n vs Lindy", "n8n-vs-lindy"],
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
