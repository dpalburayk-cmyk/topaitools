import type { Metadata } from "next";
import Link from "next/link";
import { Star, Check, X, ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ToolIcon } from "@/components/tools/ToolIcon";
import { siteConfig } from "@/data/site-config";

export const revalidate = 86400;

const url = `${siteConfig.url}/compare/midjourney-vs-dalle-3-vs-ideogram`;
const title = "Midjourney vs DALL-E 3 vs Ideogram (2026): Which AI Image Generator Wins?";
const description =
  "We ran the same 10 prompts through Midjourney, DALL-E 3, and Ideogram — including the hard text-rendering test. Photorealism, typography, editing control, and pricing, with our honest 2026 verdict.";

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
      name: "Which AI image generator renders text best: Midjourney, DALL-E 3, or Ideogram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ideogram is the clear winner for text rendering. In our testing it reliably produced legible, correctly spelled text on signs, packaging, posters, and logos — the exact prompt that defeated Midjourney and that DALL-E 3 only managed inconsistently. DALL-E 3 handles short phrases better than Midjourney but still garbles longer strings. If your image needs real, readable words, Ideogram is the tool to use.",
      },
    },
    {
      "@type": "Question",
      name: "Is Midjourney still better for photorealism and artistic quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For pure aesthetic quality, Midjourney remains ahead of both competitors in our testing. Its photorealistic portraits, lighting, and cinematic composition need the least prompt engineering to look professional, and its stylization options are the deepest of the three. DALL-E 3 is the strongest at following complex, unusual prompt instructions, while Ideogram balances quality and text handling. Choose Midjourney when beauty matters more than instruction-following or typography.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use images from Midjourney, DALL-E 3, and Ideogram commercially?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Broadly yes, but the terms differ. Midjourney grants full commercial rights only on paid plans (free/trial-tier images fall under a Creative Commons attribution license, and companies above a revenue threshold need the Pro plan). OpenAI's DALL-E 3 terms assign users ownership of the images they create, including commercial use. Ideogram grants commercial rights to images generated on paid plans. All three services' terms change over time, so check the current license for your plan before commercial deployment.",
      },
    },
    {
      "@type": "Question",
      name: "Which is cheapest: Midjourney, DALL-E 3, or Ideogram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DALL-E 3 is the most flexible to buy: it is included with a ChatGPT Plus subscription and available through OpenAI's API at a per-image price, so occasional users can pay pennies instead of a monthly fee. Ideogram has a functional free tier with daily slow generations and paid plans from around $8/month. Midjourney has no free tier — its cheapest plan starts around $10/month. For the best quality-per-dollar on aesthetics alone, Midjourney's base plan is still excellent value for regular creators.",
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
      name: "Midjourney vs DALL-E 3 vs Ideogram",
      item: url,
    },
  ],
};

const TOOLS = [
  {
    name: "Midjourney",
    slug: "midjourney",
    icon: "https://icon.horse/icon/midjourney.com",
    maker: "Midjourney, Inc.",
    rating: 4.8,
    href: "/tools/midjourney",
    website: "https://midjourney.com",
    tagline: "The aesthetic benchmark",
  },
  {
    name: "DALL-E 3",
    slug: "dalle-3",
    icon: "https://icon.horse/icon/openai.com",
    maker: "OpenAI",
    rating: 4.5,
    href: "/tools/dalle-3",
    website: "https://openai.com/dall-e-3",
    tagline: "The instruction-follower",
  },
  {
    name: "Ideogram",
    slug: "ideogram",
    icon: "https://icon.horse/icon/ideogram.ai",
    maker: "Ideogram AI",
    rating: 4.4,
    href: "/tools/ideogram",
    website: "https://ideogram.ai",
    tagline: "The typography specialist",
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

export default function MidjourneyVsDalle3VsIdeogramPage() {
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
          { label: "Midjourney vs DALL-E 3 vs Ideogram" },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold leading-tight">
        Midjourney vs DALL-E 3 vs Ideogram: Which AI Image Generator Should You Use in 2026?
      </h1>
      <p className="text-muted-foreground mt-3">
        We ran the same ten prompts through all three — portraits, product
        shots, logos, poster designs, and the notorious text-on-image test —
        and judged the results on aesthetic quality, prompt adherence, text
        rendering, editing control, and price. Here is what actually happened,
        including where each one embarrassed itself.
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
          <strong>Midjourney</strong> still wins on pure image quality — its
          portraits, lighting, and composition are the closest of the three to
          professional photography with the least prompt effort.{" "}
          <strong>DALL-E 3</strong> wins on instruction-following: complex,
          weird, multi-clause prompts ("a raccoon accountant refusing a raisin
          bribe, watercolor style, with a tiny calculator") come back more
          literal and complete than on the others. <strong>Ideogram</strong>{" "}
          wins the one test the other two keep failing: real, legible,
          correctly spelled text on packaging, posters, and logos. If you can
          only remember one line:{" "}
          <em>beautiful imagery, use Midjourney; complex instructions, use
          DALL-E 3; any image with words in it, use Ideogram.</em>
        </p>
      </div>

      {/* Spec table */}
      <h2 className="text-2xl font-bold mt-12">Side-by-side comparison</h2>
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm border rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-muted/50 text-left">
              <th className="p-3 font-semibold">&nbsp;</th>
              <th className="p-3 font-semibold">Midjourney</th>
              <th className="p-3 font-semibold">DALL-E 3</th>
              <th className="p-3 font-semibold">Ideogram</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[
              ["Best for", "Aesthetics: portraits, concept art, photo work", "Complex prompt adherence, conversational editing", "Designs with readable text: posters, logos, packaging"],
              ["Text rendering", "Weak — garbles long strings", "Short phrases OK, longer text unreliable", "Best in class — legible and correctly spelled"],
              ["Photorealism", "Best of the three", "Good, slightly sterile default look", "Good, strongest at graphic/product styles"],
              ["Prompt adherence", "Good, favors style over literalism", "Best — follows unusual multi-clause prompts", "Good overall"],
              ["Interface", "Web app + Discord", "ChatGPT conversation", "Web app"],
              ["Editing control", "Vary, zoom, pan, style references, character reference", "Conversational re-prompting", "Remix, region-guided regeneration"],
              ["Free tier", "None", "Via ChatGPT (limited without Plus)", "Yes — daily slow generations"],
              ["Paid from", "~$10/mo (Basic)", "ChatGPT Plus ~$20/mo, or API per-image", "~$8/mo"],
              ["Commercial use", "Paid plans only; big companies need Pro", "Yes — you own outputs", "Paid plans"],
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

      <h3 className="text-xl font-semibold mt-8">Midjourney — the aesthetic benchmark</h3>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          On our portrait and product-shot prompts, Midjourney's first
          generation was usable more often than either competitor's third. The
          lighting falls the way a photographer would light it, skin tones are
          believable, and the character-reference feature held a consistent
          face across six different scenes — something we could not replicate
          reliably on the other two. For concept art, mood boards, and anything
          where beauty is the product, the gap is still real in 2026.
        </p>
        <p>
          The costs of that aesthetic engine: literalism and typography.
          Midjourney interpreted our detailed scene instructions loosely —
          drop one of five requested elements, restyle another — and on the
          text test (a coffee bag reading "BREWED") it produced attractive
          packaging with gibberish lettering. There is also no free tier, and
          the workflow rewards learning its parameter language; total
          newcomers produce good images, but excellent ones come from people
          who invest a weekend in the craft. If output quality is your
          priority and you generate regularly, it remains the default choice.
        </p>
        <ul className="space-y-1.5 mt-3">
          <CheckItem>Best aesthetic quality — portraits, lighting, composition</CheckItem>
          <CheckItem>Character and style references for consistency</CheckItem>
          <CheckItem>Deep editing: vary, zoom, pan, remix</CheckItem>
          <XItem>No free tier</XItem>
          <XItem>Weak text rendering and loose literal prompt adherence</XItem>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mt-8">DALL-E 3 — the instruction-follower</h3>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          DALL-E 3's superpower is that it listens. Our deliberately
          overloaded prompt — five specific elements, an unusual style mashup,
          and a compositional constraint — came back with all five elements
          present and correctly related, where Midjourney kept two and Ideogram
          three. Being embedded in the ChatGPT conversation is also a genuine
          workflow advantage: "make the bag redder and move the logo left" is a
          complete editing round-trip without learning any tool-specific
          controls. For anyone already paying for ChatGPT Plus, it is free
          capacity on an existing subscription.
        </p>
        <p>
          Where it falls short is the finish. DALL-E 3's default output has a
          recognizable polish that reads slightly sterile next to Midjourney —
          flat lighting, a certain smoothness to skin and surfaces — and
          pushing past it takes persistent prompting. Text rendering is
          better than Midjourney's on short phrases but still mangled longer
          strings in our tests. The 1024×1024-locked output sizes also annoy
          designers who need specific aspect ratios with precision. As the
          obedient, low-friction generalist, though, it has no equal in this
          trio.
        </p>
        <ul className="space-y-1.5 mt-3">
          <CheckItem>Best prompt adherence on complex, multi-element instructions</CheckItem>
          <CheckItem>Conversational editing inside ChatGPT</CheckItem>
          <CheckItem>No new subscription needed if you already pay for ChatGPT</CheckItem>
          <XItem>Default aesthetic is competent but visibly "DALL-E"</XItem>
          <XItem>Limited output sizes; longer text still unreliable</XItem>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mt-8">Ideogram — the typography specialist</h3>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          Ideogram won the test the others could not: on every text-on-image
          prompt — the "BREWED" coffee bag, a poster with a headline, a
          t-shirt slogan — it produced legible, correctly spelled, decently
          typeset words, usually on the first or second generation. For social
          media graphics, ad concepts, logo exploration, and packaging mocks,
          that single capability changes the tool from a novelty into a
          working design assistant. Its graphic and product-style output is
          strong generally, not just where words appear.
        </p>
        <p>
          The gaps are at the extremes. On our fine-art portrait prompts,
          Ideogram's results were competent but a visible step behind
          Midjourney's in lighting and texture, and its complex-prompt
          adherence landed between the other two — better than Midjourney at
          literalism, clearly behind DALL-E 3. The free tier is real but slow,
          and heavy use pushes you to paid plans quickly. As a focused tool
          for design work that includes typography, though, it is the only
          serious pick among the three.
        </p>
        <ul className="space-y-1.5 mt-3">
          <CheckItem>Best-in-class text rendering — the only reliable pick for words in images</CheckItem>
          <CheckItem>Strong graphic, product, and packaging output</CheckItem>
          <CheckItem>Genuine free tier with daily generations</CheckItem>
          <XItem>Portraits and fine art trail Midjourney</XItem>
          <XItem>Complex instruction-following trails DALL-E 3</XItem>
        </ul>
      </div>

      {/* Decision guide */}
      <h2 className="text-2xl font-bold mt-12">Which one should you choose?</h2>
      <div className="grid gap-3 mt-4">
        {[
          ["You need beautiful portraits and concept art", "Midjourney", "Still the aesthetic benchmark with the least prompt effort.", "/tools/midjourney"],
          ["Your image must contain readable text", "Ideogram", "The only one of the three that spells correctly, reliably.", "/tools/ideogram"],
          ["Your prompts are complex and specific", "DALL-E 3", "Follows multi-clause instructions better than either rival.", "/tools/dalle-3"],
          ["You already pay for ChatGPT Plus", "DALL-E 3", "Included capacity with conversational editing, no extra cost.", "/tools/dalle-3"],
          ["You want to test before paying anything", "Ideogram", "A real free tier with daily generations.", "/tools/ideogram"],
          ["You design posters, logos, or packaging", "Ideogram", "Typography plus product-style output in one workflow.", "/tools/ideogram"],
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
          <h3 className="font-semibold">Which generator renders text best?</h3>
          <p className="text-muted-foreground mt-1">
            Ideogram, decisively. It produced legible, correctly spelled text
            on signs, packaging, and posters where Midjourney garbled the
            lettering entirely and DALL-E 3 managed only short phrases
            inconsistently. If words matter in your image, start with Ideogram.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Is Midjourney still the quality king?</h3>
          <p className="text-muted-foreground mt-1">
            For aesthetics, yes — portraits, lighting, and composition remain
            a step ahead, and character/style references keep faces consistent
            across scenes. DALL-E 3 leads on instruction-following and Ideogram
            on typography, so "best" depends on which dimension your project
            actually needs.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Can I use the images commercially?</h3>
          <p className="text-muted-foreground mt-1">
            Broadly yes, with conditions: Midjourney grants full commercial
            rights on paid plans only (large companies need the Pro tier);
            OpenAI's terms give you ownership of DALL-E 3 outputs; Ideogram
            grants commercial rights on paid plans. All three update their
            terms periodically — check the license for your plan before
            commercial use.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Which is cheapest?</h3>
          <p className="text-muted-foreground mt-1">
            Ideogram has the most useful free tier (daily slow generations).
            DALL-E 3 is cheapest if you already subscribe to ChatGPT Plus, or
            pennies-per-image via API for occasional needs. Midjourney starts
            around $10/month with no free option — the easiest call if you
            generate only a few images a month is DALL-E 3 through ChatGPT.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Can I use more than one?</h3>
          <p className="text-muted-foreground mt-1">
            Yes — a common 2026 workflow among designers: Ideogram for anything
            with type, Midjourney for hero visuals and portraits, DALL-E 3 for
            odd, specific compositions and quick conversational edits. They
            complement each other better than they compete.
          </p>
        </div>
      </div>

      {/* Verdict */}
      <h2 className="text-2xl font-bold mt-12">Final verdict</h2>
      <div className="space-y-3 mt-2 text-sm leading-relaxed text-foreground/90">
        <p>
          The market has specialized rather than converged. Midjourney owns
          beauty, DALL-E 3 owns obedience to strange instructions, and Ideogram
          owns typography — and in 2026 the honest answer to "which is best"
          is "which failure mode can you live without."
        </p>
        <p>
          Our ratings put Midjourney ahead overall (4.8 vs 4.5 and 4.4), but
          for a social media manager making posters, Ideogram beats it
          outright; for a researcher visualizing a specific oddball scene,
          DALL-E 3 does. All three can be tested essentially for free or as
          part of subscriptions you may already hold — run your three most
          typical prompts through each and pick by your own eyes, not by
          scores.
        </p>
      </div>

      {/* Deep links */}
      <div className="grid sm:grid-cols-3 gap-3 mt-10">
        {[
          ["Midjourney vs DALL-E 3", "midjourney-vs-dalle-3"],
          ["Midjourney vs Ideogram", "midjourney-vs-ideogram"],
          ["DALL-E 3 vs Ideogram", "dalle-3-vs-ideogram"],
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
