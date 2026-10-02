import type { Metadata } from "next";
import Link from "next/link";
import { Star, Check, X, ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ToolIcon } from "@/components/tools/ToolIcon";
import { siteConfig } from "@/data/site-config";

export const revalidate = 86400;

const url = `${siteConfig.url}/compare/runway-vs-sora-vs-luma-dream-machine`;
const title = "Runway vs Sora vs Luma Dream Machine (2026): AI Video Generators Compared Hands-On";
const description =
  "We ran the same cinematic prompts through Runway Gen-4, Sora, and Luma Dream Machine — camera moves, physics, character consistency, and editing control. Queue times, cost per clip, and our honest 2026 verdict.";

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
      name: "Which produces the most realistic AI video: Runway, Sora, or Luma?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sora leads on raw cinematic realism — lighting, textures, and complex camera motion hold up best in our tests, especially on shots with multiple interacting elements. Runway Gen-4 is a close second and is more reliable at following specific directions (camera moves, subject actions) rather than just making something beautiful. Luma Dream Machine produces excellent image quality for its speed and price but clips with fast motion or intricate physics show artifacts more often. For photoreal showpieces choose Sora; for directed, on-brief shots choose Runway.",
      },
    },
    {
      "@type": "Question",
      name: "Which AI video tool is fastest to get results from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Luma Dream Machine is the fastest in practice: generations typically return in a couple of minutes even on paid tiers, with a usable free option for testing. Runway's wait times vary with demand and priority credits, usually minutes on paid plans. Sora's queue times are the longest and most variable, particularly for longer or higher-resolution generations and during peak demand. If you are iterating rapidly on many ideas, Luma's turnaround keeps the creative loop tight.",
      },
    },
    {
      "@type": "Question",
      name: "Which is best for consistent characters across shots?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Runway currently handles character and scene consistency best: its reference features let you anchor a subject's appearance across multiple generations, which matters for anything story-shaped. Sora produces impressively consistent subjects within a single clip, but repeating the same character across separate generations still involves luck. Luma offers image-to-video and keyframe features that help, though matching a specific face across clips requires workarounds. For narrative projects with recurring characters, Runway is the practical choice.",
      },
    },
    {
      "@type": "Question",
      name: "Which is cheapest: Runway, Sora, or Luma?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Luma is the cheapest entry point — a functional free tier plus paid plans starting around $10/month make it the budget pick. Runway's plans start around $12-15/month with a credit system where generation quality settings consume credits at different rates. Sora is bundled with ChatGPT Plus/Pro subscriptions, so it is effectively free if you already subscribe — but heavy generation pushes you toward the Pro tier. Price your monthly clip volume against each platform's credit or tier table before committing; the winner changes with volume.",
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
      name: "Runway vs Sora vs Luma Dream Machine",
      item: url,
    },
  ],
};

const TOOLS = [
  {
    name: "Runway",
    slug: "runway",
    icon: "https://icon.horse/icon/runwayml.com",
    maker: "Runway AI, Inc.",
    rating: 4.6,
    href: "/tools/runway",
    website: "https://runwayml.com",
    tagline: "The professional's video workshop",
  },
  {
    name: "Sora",
    slug: "sora",
    icon: "https://icon.horse/icon/openai.com",
    maker: "OpenAI",
    rating: 4.7,
    href: "/tools/sora",
    website: "https://openai.com/sora",
    tagline: "The cinematic realism leader",
  },
  {
    name: "Luma Dream Machine",
    slug: "luma-dream-machine",
    icon: "https://icon.horse/icon/luma.ai",
    maker: "Luma AI",
    rating: 4.3,
    href: "/tools/luma-dream-machine",
    website: "https://lumalabs.ai/dream-machine",
    tagline: "The fast, accessible generator",
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

export default function RunwayVsSoraVsLumaPage() {
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
          { label: "Runway vs Sora vs Luma Dream Machine" },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold leading-tight">
        Runway vs Sora vs Luma Dream Machine: Which AI Video Generator Should You Use in 2026?
      </h1>
      <p className="text-muted-foreground mt-3">
        We gave all three the same shot list — a slow push-in on a moody
        interior, a physics-heavy action beat, a character walking through
        changing light, and an abstract art-directed sequence — then judged
        the results on realism, prompt obedience, consistency, speed, and
        cost. Here is what actually came out of the queue.
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
          <strong>Sora</strong> produces the most jaw-dropping single clips —
          its lighting, texture, and complex motion are the closest to real
          cinematography — but it is the slowest and least obedient to precise
          direction. <strong>Runway</strong> is the working professional's
          tool: the best at following specific camera and action directions,
          the strongest character-consistency features across shots, and an
          editing suite (inpainting, motion brush, upscaling) that turns
          generations into usable production footage. <strong>Luma Dream
          Machine</strong> is the fast, affordable all-rounder — near-instant
          results and a real free tier, at the cost of more artifacts on hard
          motion. If you can only remember one line:{" "}
          <em>showpiece realism, use Sora; controlled, repeatable shots, use
          Runway; fast iteration on a budget, use Luma.</em>
        </p>
      </div>

      {/* Spec table */}
      <h2 className="text-2xl font-bold mt-12">Side-by-side comparison</h2>
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm border rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-muted/50 text-left">
              <th className="p-3 font-semibold">&nbsp;</th>
              <th className="p-3 font-semibold">Runway</th>
              <th className="p-3 font-semibold">Sora</th>
              <th className="p-3 font-semibold">Luma Dream Machine</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[
              ["Best for", "Directed production work, consistent characters", "Cinematic realism, showpiece clips", "Fast iteration, budget-friendly experimentation"],
              ["Realism", "Excellent", "Best of the three", "Very good, artifacts on fast motion"],
              ["Prompt obedience", "Best — follows camera/action directions", "Loose — suggests its own interpretation", "Good on simple shots"],
              ["Character consistency", "Best — reference anchoring across shots", "Strong within a clip, luckier across clips", "Image-to-video and keyframes help"],
              ["Editing tools", "Deepest: inpainting, motion brush, upscale, green screen", "Remix and recut basics", "Extend, loop, keyframes"],
              ["Speed", "Minutes on paid tiers, varies with load", "Longest, most variable queues", "Fastest — usually ~1-3 minutes"],
              ["Free tier", "Limited one-time credits", "Via ChatGPT subscription tiers", "Yes — daily generations"],
              ["Paid from", "~$12-15/mo (credits)", "ChatGPT Plus ~$20/mo; heavy use wants Pro", "~$10/mo"],
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

      <h3 className="text-xl font-semibold mt-8">Runway — the professional's workshop</h3>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          Runway understood our shot list as directions, not vibes. On the
          push-in and the character-through-changing-light shots, Gen-4
          delivered the camera move we asked for on the first or second
          generation, while its rivals produced beautiful footage of
          something else. The reference features — anchoring a character's
          appearance across generations — are the most practical consistency
          workflow of the three and the reason narrative projects keep coming
          back to it. And the surrounding toolkit matters more than it sounds:
          when a generation was 90% right, motion brush and inpainting fixed
          the remaining 10% instead of burning credits on another roll of the
          dice.
        </p>
        <p>
          The costs are attention and credits. Generation quality settings
          consume credits at different rates, and a serious iteration session
          drains a mid-tier plan faster than newcomers expect. Realism, while
          excellent, sits a visible half-step behind Sora on the most
          demanding shots — complex multi-subject physics especially. And the
          interface, built for professionals, presents more knobs than a
          casual creator needs on day one. As a directed, repeatable video
          production pipeline, though, Runway is the most complete product
          here.
        </p>
        <ul className="space-y-1.5 mt-3">
          <CheckItem>Best direction-following — camera moves and actions as specified</CheckItem>
          <CheckItem>Character/scene references for consistency across shots</CheckItem>
          <CheckItem>Deepest editing toolkit: inpaint, motion brush, upscale</CheckItem>
          <XItem>Credits burn fast at high-quality settings</XItem>
          <XItem>Half-step behind Sora on maximum realism</XItem>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mt-8">Sora — the cinematic realist</h3>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          Sora won the moments that make people gasp. Its interior push-in had
          the most convincing light behavior of any generation we tested, the
          action beat held physics together longer before breaking, and its
          abstract sequence looked like art direction rather than an effect.
          Within a single clip, subjects stay coherent in a way the others
          only manage sometimes — hands, faces, and background crowds survive
          full shots. If your deliverable is a handful of hero clips where
          realism is the point, Sora's output needs the least forgiveness.
        </p>
        <p>
          The friction is control and time. Sora interpreted our precise
          directions loosely — it delivers its interpretation of the scene
          rather than your camera call, and steering it means re-prompting
          rather than adjusting parameters. Queues are the longest and least
          predictable of the three, which turns rapid iteration into a test
          of patience, and heavy generation is really a ChatGPT Pro-tier
          activity. Consistency across separate clips still involves luck.
          For breathtaking single shots on a schedule that can absorb a wait,
          though, Sora is the standard others are measured against.
        </p>
        <ul className="space-y-1.5 mt-3">
          <CheckItem>Best-in-class realism — light, texture, physics</CheckItem>
          <CheckItem>Most coherent subjects within a single clip</CheckItem>
          <CheckItem>Included with ChatGPT subscriptions you may already pay</CheckItem>
          <XItem>Loose obedience to precise camera/action directions</XItem>
          <XItem>Slowest, most variable generation queues</XItem>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mt-8">Luma Dream Machine — the fast all-rounder</h3>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          Luma's defining quality is velocity. Clips returned in a couple of
          minutes where Sora kept us waiting, which changes how you work — we
          explored six variations of the abstract sequence in the time one
          Sora generation took, and the best Luma result came from that
          volume of iteration, not from any single perfect prompt. The free
          tier is real enough to evaluate properly, image-to-video is the
          smoothest of the three for animating stills, and the
          extend/loop/keyframe features cover the social-content workflow
          end-to-end at the lowest price in this comparison.
        </p>
        <p>
          The gap appears under stress. On the physics-heavy action beat,
          Luma's clip broke earliest — morphing limbs and objects that swap
          identity mid-shot — and fast camera moves produced more artifacts
          than Runway or Sora. Fine-grained direction is limited compared to
          Runway's parameter-level control. Character consistency across
          clips requires keyframe workarounds rather than a first-class
          reference system. For social teams, concept exploration, and anyone
          learning AI video, it is the right first tool; for demanding hero
          shots, it is the starting draft.
        </p>
        <ul className="space-y-1.5 mt-3">
          <CheckItem>Fastest generation — tight creative iteration loop</CheckItem>
          <CheckItem>Best free tier and lowest entry price</CheckItem>
          <CheckItem>Smoothest image-to-video for animating stills</CheckItem>
          <XItem>Artifacts on fast motion and complex physics</XItem>
          <XItem>Limited fine-grained direction control</XItem>
        </ul>
      </div>

      {/* Decision guide */}
      <h2 className="text-2xl font-bold mt-12">Which one should you choose?</h2>
      <div className="grid gap-3 mt-4">
        {[
          ["You need maximum realism for hero shots", "Sora", "Closest to real cinematography in lighting, texture, and motion.", "/tools/sora"],
          ["You already pay for ChatGPT", "Sora", "Included in your subscription — the cheapest way to try serious AI video.", "/tools/sora"],
          ["Your shots need precise camera/action direction", "Runway", "Follows directions as specifications, not suggestions.", "/tools/runway"],
          ["Your project has recurring characters", "Runway", "Reference anchoring keeps faces consistent across shots.", "/tools/runway"],
          ["You're iterating fast on many ideas", "Luma", "Minutes-per-generation keeps the creative loop tight.", "/tools/luma-dream-machine"],
          ["You're on a tight budget or just learning", "Luma", "Real free tier and the lowest entry price of the three.", "/tools/luma-dream-machine"],
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
          <h3 className="font-semibold">Which looks most realistic?</h3>
          <p className="text-muted-foreground mt-1">
            Sora on showpiece shots — its light, texture, and multi-element
            physics hold up longest. Runway is a close second and more
            reliable when you need the shot to match a specification. Luma is
            very good for its speed and price but breaks down first on fast
            motion and complex physics.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Which is fastest?</h3>
          <p className="text-muted-foreground mt-1">
            Luma, clearly — typically a couple of minutes per clip even on
            modest plans. Runway takes minutes that vary with load and
            priority credits. Sora has the longest and least predictable
            queues, especially for longer or high-resolution generations.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Which is best for consistent characters?</h3>
          <p className="text-muted-foreground mt-1">
            Runway — its reference features anchor a character's look across
            generations, the only first-class workflow of the three. Sora is
            impressively consistent within a clip but luckier-than-guaranteed
            across clips. Luma manages it with image-to-video and keyframe
            workarounds.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Which is cheapest?</h3>
          <p className="text-muted-foreground mt-1">
            Luma has the lowest entry (~$10/mo) plus a usable free tier. If
            you already pay for ChatGPT Plus, Sora is effectively free to
            start — though heavy use wants the Pro tier. Runway starts around
            $12-15/month, with high-quality settings consuming credits
            quickly. Price your monthly clip volume before choosing.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Do professionals use these together?</h3>
          <p className="text-muted-foreground mt-1">
            Yes — a common 2026 production pattern: explore concepts cheaply
            and quickly in Luma, generate directed hero footage with
            character consistency in Runway, and push for maximum realism on
            the final few shots in Sora. The tools are stages of a pipeline
            more than rivals.
          </p>
        </div>
      </div>

      {/* Verdict */}
      <h2 className="text-2xl font-bold mt-12">Final verdict</h2>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          These three tools split the filmmaker's job between them. Sora is
          the cinematographer — extraordinary footage on its own terms. Runway
          is the director — it shoots what is on the call sheet and gives you
          the tools to fix the takes that are almost right. Luma is the
          assistant with the fastest turnaround — not the final cut, but the
          reason you find the idea at all.
        </p>
        <p>
          Our ratings put Sora marginally ahead (4.7 vs 4.6 and 4.3), but
          ratings flatter spectacle: a working production with recurring
          characters will ship better with Runway, and a social team burning
          out twenty concepts a week will get more done with Luma than with
          either. All three can be tried free or through subscriptions you
          may already hold — give each your hardest real shot and judge by
          your own footage.
        </p>
      </div>

      {/* Deep links */}
      <div className="grid sm:grid-cols-3 gap-3 mt-10">
        {[
          ["Runway vs Sora", "runway-vs-sora"],
          ["Runway vs Luma", "runway-vs-luma-dream-machine"],
          ["Sora vs Luma", "sora-vs-luma-dream-machine"],
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
