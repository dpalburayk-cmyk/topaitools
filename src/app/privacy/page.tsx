import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}. Learn how we collect, use, and protect your data.`,
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <h1 className="text-3xl font-bold tracking-tight mb-8">Privacy Policy</h1>
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p><strong className="text-foreground">Last updated:</strong> May 28, 2026</p>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
          <p>We collect minimal information to operate and improve our service:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-foreground">Usage data:</strong> We use privacy-respecting analytics (Vercel Analytics) to understand how visitors use our site. No personal data is collected.</li>
            <li><strong className="text-foreground">Email addresses:</strong> If you subscribe to our newsletter, we store your email address to send updates. You can unsubscribe at any time.</li>
            <li><strong className="text-foreground">Cookies:</strong> We use essential cookies for site functionality and theme preference. No third-party tracking cookies.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Affiliate Links & Advertising</h2>
          <p>
            {siteConfig.name} contains affiliate links to AI tools and services. When you click on these links and make a purchase,
            we may earn a commission at no additional cost to you. These affiliate partnerships help us maintain and improve the site.
          </p>
          <p>
            We clearly mark affiliate and sponsored content. Our editorial recommendations are independent and not influenced by
            affiliate relationships. We only recommend tools we believe provide genuine value.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To provide and improve our service</li>
            <li>To send newsletter updates (only if opted in)</li>
            <li>To understand site usage through aggregated analytics</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Sharing</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties. We may share aggregated, non-personal analytics data with service providers.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access any personal data we hold about you</li>
            <li>Request deletion of your data</li>
            <li>Unsubscribe from newsletters at any time</li>
            <li>Opt out of analytics tracking</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Contact</h2>
          <p>If you have questions about this Privacy Policy, contact us at <a href="mailto:privacy@topaitools.xyz" className="text-indigo-500 hover:underline">privacy@topaitools.xyz</a>.</p>
        </section>
      </div>
    </div>
  );
}
