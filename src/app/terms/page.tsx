import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />
      <h1 className="text-3xl font-bold tracking-tight mb-8">Terms of Service</h1>
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p><strong className="text-foreground">Last updated:</strong> May 28, 2026</p>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
          <p>By accessing and using {siteConfig.name}, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our service.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Description of Service</h2>
          <p>
            {siteConfig.name} is a curated directory of AI tools. We provide reviews, comparisons, and information about
            various AI products and services. We are not the provider of these AI tools and are not responsible for their
            functionality, pricing, or policies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">3. Affiliate Disclosure</h2>
          <p>
            Some links on our site are affiliate links. When you purchase through these links, we may receive a commission
            at no extra cost to you. This helps support our site and allows us to continue providing free content.
            Our reviews and recommendations are always our own honest opinions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Content Accuracy</h2>
          <p>
            While we strive to provide accurate and up-to-date information, AI tool features, pricing, and availability
            change frequently. We recommend verifying information directly with the tool provider before making a purchase
            decision. We are not liable for any decisions made based on information found on our site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Intellectual Property</h2>
          <p>
            All content on {siteConfig.name}, including text, design, and code, is our property or used with permission.
            Tool names, logos, and trademarks belong to their respective owners. You may not reproduce our content without
            permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Limitation of Liability</h2>
          <p>
            {siteConfig.name} is provided &quot;as is&quot; without warranties of any kind. We are not liable for any damages
            arising from the use of our site or any linked third-party services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Changes to Terms</h2>
          <p>We may update these Terms from time to time. Continued use of the site constitutes acceptance of updated terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">8. Contact</h2>
          <p>For questions about these Terms, contact us at <a href="mailto:legal@topaitools.xyz" className="text-indigo-500 hover:underline">legal@topaitools.xyz</a>.</p>
        </section>
      </div>
    </div>
  );
}
