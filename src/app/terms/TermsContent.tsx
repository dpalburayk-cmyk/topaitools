"use client";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/data/site-config";

export function TermsContent() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />
      <h1 className="text-3xl font-bold tracking-tight mb-8">Terms of Service</h1>
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p><strong className="text-foreground">Last updated:</strong> June 5, 2026</p>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and using {siteConfig.name} (&quot;the Site&quot;), you accept and agree to be bound by these
            Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Site.
            These Terms apply to all visitors, users, and others who access or use the Site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Description of Service</h2>
          <p>
            {siteConfig.name} is a curated directory of AI tools and services. We provide:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Curated listings of AI tools across multiple categories</li>
            <li>Editorial reviews, ratings, and comparisons</li>
            <li>A tool comparison feature</li>
            <li>Blog content about AI tools and trends</li>
            <li>A newsletter subscription service</li>
          </ul>
          <p>
            We are not the provider of any AI tools listed on the Site and are not responsible for their
            functionality, pricing, availability, or policies. All tool names, logos, and trademarks belong
            to their respective owners.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">3. Affiliate Disclosure</h2>
          <p>
            Some links on our Site are affiliate links. When you click on these links and make a purchase
            or sign up for a service, we may receive a commission at no extra cost to you. This helps
            support the Site and allows us to continue providing free content.
          </p>
          <p>
            Our reviews and recommendations are always our own honest opinions and are not influenced
            by affiliate partnerships. Affiliate relationships do not affect tool ratings or rankings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Advertising</h2>
          <p>
            The Site displays advertisements provided by Google AdSense. These advertisements are clearly
            distinguishable from our editorial content. We do not endorse the products or services advertised
            on our Site unless explicitly stated in our editorial content.
          </p>
          <p>
            By using the Site, you acknowledge that Google and its partners may use cookies and similar
            technologies to serve ads based on your browsing activity. Please review our <a href="/privacy" className="text-indigo-500 hover:underline">Privacy Policy</a> for more information about advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">5. User Conduct</h2>
          <p>When using the Site, you agree not to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use the Site for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to any portion of the Site</li>
            <li>Submit false, misleading, or spam tool listings</li>
            <li>Scrape, crawl, or otherwise extract data from the Site without permission</li>
            <li>Interfere with or disrupt the Site&apos;s functionality</li>
            <li>Reproduce, distribute, or commercially exploit our content without written permission</li>
            <li>Impersonate any person or entity</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Tool Submissions</h2>
          <p>
            If you submit an AI tool for listing on the Site, you represent and warrant that:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>You have the right to submit the tool and the information provided is accurate</li>
            <li>The tool does not violate any applicable law or regulation</li>
            <li>The tool is safe and does not contain malware or harmful content</li>
          </ul>
          <p>
            We reserve the right to accept, reject, modify, or remove any tool submission at our sole discretion
            and without notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Content Accuracy</h2>
          <p>
            While we strive to provide accurate and up-to-date information, AI tool features, pricing,
            and availability change frequently. We recommend verifying information directly with the
            tool provider before making a purchase decision. We are not liable for any decisions made
            based on information found on our Site.
          </p>
          <p>
            Tool ratings and reviews represent the opinions of our editorial team and are subjective.
            Individual experiences may vary.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">8. Intellectual Property</h2>
          <p>
            All content on {siteConfig.name}, including but not limited to text, design, graphics, code,
            logos, and the overall look and feel, is our property or used with permission. This content
            is protected by applicable intellectual property laws.
          </p>
          <p>
            Tool names, logos, product images, and trademarks displayed on the Site belong to their
            respective owners and are used for identification and review purposes only. Their use does
            not imply endorsement by or affiliation with {siteConfig.name}.
          </p>
          <p>You may not reproduce, distribute, modify, or commercially exploit any content from the Site without our prior written permission.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">9. Disclaimer of Warranties</h2>
          <p>
            The Site is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties
            of any kind, either express or implied. We make no warranty that:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>The Site will be uninterrupted, timely, secure, or error-free</li>
            <li>The results obtained from the use of the Site will be accurate or reliable</li>
            <li>The quality of any content obtained through the Site will meet your expectations</li>
            <li>Any errors in the Site will be corrected</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">10. Limitation of Liability</h2>
          <p>
            In no event shall {siteConfig.name}, its owners, operators, or contributors be liable for any
            direct, indirect, incidental, special, consequential, or punitive damages arising from your
            use of the Site, including but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Loss of profits, data, or business opportunities</li>
            <li>Personal injury or property damage</li>
            <li>Unauthorized access to your data or systems</li>
            <li>Any actions or omissions of third-party AI tools listed on the Site</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">11. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless {siteConfig.name} and its owners, operators, and
            contributors from any claims, damages, losses, or expenses (including reasonable attorney
            fees) arising from your use of the Site or violation of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">12. Third-Party Links</h2>
          <p>
            The Site contains links to third-party websites and services, including AI tool providers.
            These links are provided for convenience only. We do not control, endorse, or assume
            responsibility for the content, privacy policies, or practices of any third-party website.
            You access third-party links at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">13. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. We will notify you of material changes by posting
            the updated Terms on this page and updating the &quot;Last updated&quot; date. Your continued
            use of the Site after changes constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">14. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the Kingdom of
            Saudi Arabia, without regard to its conflict of law provisions. Any disputes arising from
            these Terms shall be resolved through amicable negotiation, and if unresolved, through
            the competent courts in the Kingdom of Saudi Arabia.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">15. Severability</h2>
          <p>
            If any provision of these Terms is held to be unenforceable or invalid, such provision will
            be changed and interpreted to accomplish its objectives to the greatest extent possible
            under applicable law, and the remaining provisions will continue in full force and effect.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">16. Contact</h2>
          <p>For questions about these Terms, contact us at:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Email: <a href="mailto:legal@topaitools.xyz" className="text-indigo-500 hover:underline">legal@topaitools.xyz</a></li>
            <li>Website: <a href={siteConfig.url} className="text-indigo-500 hover:underline">{siteConfig.url}</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
