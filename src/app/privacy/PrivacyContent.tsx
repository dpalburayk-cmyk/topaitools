"use client";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/data/site-config";

export function PrivacyContent() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <h1 className="text-3xl font-bold tracking-tight mb-8">Privacy Policy</h1>
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p><strong className="text-foreground">Last updated:</strong> June 5, 2026</p>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
          <p>
            Welcome to {siteConfig.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting
            your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you visit {siteConfig.url} (the &quot;Site&quot;). Please read this policy carefully. By using the Site,
            you consent to the data practices described in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
          <p>We collect minimal information to operate and improve our service:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-foreground">Usage data:</strong> We use privacy-respecting analytics (Vercel Analytics) to understand how visitors use our site. This includes page views, referral sources, device types, and geographic regions. No personally identifiable information (PII) is collected through analytics.</li>
            <li><strong className="text-foreground">Email addresses:</strong> If you subscribe to our newsletter, we store your email address to send updates. You can unsubscribe at any time via the link in any email.</li>
            <li><strong className="text-foreground">Tool submissions:</strong> If you submit an AI tool for listing, we collect the tool name, URL, description, and your contact email for verification purposes.</li>
            <li><strong className="text-foreground">Favorites and preferences:</strong> We store your favorite tools and display preferences locally in your browser using localStorage. This data never leaves your device.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">3. Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar technologies for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-foreground">Essential cookies:</strong> Required for site functionality, including theme preference (light/dark mode). These cannot be disabled.</li>
            <li><strong className="text-foreground">Analytics cookies:</strong> Vercel Analytics uses cookies to collect aggregated usage data. These are privacy-respecting and do not collect PII.</li>
            <li><strong className="text-foreground">Advertising cookies:</strong> Google AdSense may use cookies to serve personalized advertisements based on your browsing history. These are third-party cookies managed by Google. You can opt out of personalized advertising through <a href="https://www.google.com/settings/ads" className="text-indigo-500 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
          </ul>
          <p>
            You can control cookies through your browser settings. Disabling certain cookies may affect site functionality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Google AdSense and Third-Party Advertising</h2>
          <p>
            We use Google AdSense to display advertisements on our Site. Google AdSense uses cookies and web beacons
            to serve ads based on your prior visits to our Site and other websites. Google&apos;s use of advertising
            cookies enables it and its partners to serve ads based on your visit to our Site and/or other sites on
            the Internet.
          </p>
          <p>
            You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-indigo-500 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
            Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for interest-based advertising
            by visiting <a href="https://www.aboutads.info/choices/" className="text-indigo-500 hover:underline" target="_blank" rel="noopener noreferrer">aboutads.info</a>.
          </p>
          <p>For more information about how Google collects and processes data, please review the <a href="https://policies.google.com/privacy" className="text-indigo-500 hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a> and <a href="https://policies.google.com/technologies/ads" className="text-indigo-500 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Policy</a>.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Affiliate Links &amp; Advertising</h2>
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
          <h2 className="text-xl font-semibold text-foreground mb-3">6. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To provide, maintain, and improve our service</li>
            <li>To send newsletter updates (only if opted in)</li>
            <li>To understand site usage through aggregated analytics</li>
            <li>To process tool submissions and verify submissions</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Data Sharing and Disclosure</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-foreground">Service providers:</strong> We share data with trusted third-party services that help us operate the Site, including Vercel (hosting), Google AdSense (advertising), and Resend (email delivery). These providers are contractually obligated to protect your data.</li>
            <li><strong className="text-foreground">Aggregated data:</strong> We may share aggregated, non-personal analytics data to understand trends and improve our service.</li>
            <li><strong className="text-foreground">Legal requirements:</strong> We may disclose information if required by law, regulation, or legal process.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">8. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your information. However, no method of
            transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal
            information, we cannot guarantee its absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">9. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access any personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Unsubscribe from newsletters at any time</li>
            <li>Opt out of analytics tracking</li>
            <li>Opt out of personalized advertising via Google Ads Settings</li>
            <li>Lodge a complaint with a supervisory authority (for EU/EEA users)</li>
          </ul>
          <p>
            If you are a resident of the European Economic Area (EEA), the United Kingdom, or Switzerland, you have additional
            rights under the General Data Protection Regulation (GDPR), including the right to data portability and the
            right to object to processing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">10. Children&apos;s Privacy</h2>
          <p>
            Our Site is not directed to children under the age of 13. We do not knowingly collect personal information
            from children under 13. If you are a parent or guardian and believe your child has provided us with personal
            information, please contact us and we will delete such information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">11. Data Retention</h2>
          <p>
            We retain your personal information only for as long as necessary to fulfill the purposes for which it was
            collected. Newsletter subscriptions are retained until you unsubscribe. Analytics data is retained for up
            to 26 months. Tool submission data is retained for as long as the tool is listed on our Site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">12. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this
            Privacy Policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">13. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Email: <a href="mailto:privacy@topaitools.xyz" className="text-indigo-500 hover:underline">privacy@topaitools.xyz</a></li>
            <li>Website: <a href={siteConfig.url} className="text-indigo-500 hover:underline">{siteConfig.url}</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
