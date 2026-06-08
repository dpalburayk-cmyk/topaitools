/**
 * UTM and analytics tracking utilities
 */

export function withUTM(url: string, source: string = "topaitools"): string {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", source);
    u.searchParams.set("utm_medium", "referral");
    return u.toString();
  } catch {
    return url;
  }
}

export function getToolLink(tool: { websiteUrl: string; affiliateUrl?: string }): string {
  if (tool.affiliateUrl) return tool.affiliateUrl;
  return withUTM(tool.websiteUrl);
}

/**
 * Fire a GA4 event if gtag is available.
 * Safe to call even when Google Analytics is not loaded.
 */
export function trackEvent(action: string, params?: Record<string, string | number | boolean>) {
  try {
    // @ts-expect-error gtag injected by Google Analytics script
    if (typeof window !== "undefined" && window.gtag) {
      // @ts-expect-error gtag injected by Google Analytics script
      window.gtag("event", action, params);
    }
  } catch {
    // GA not loaded — silently ignore
  }
}

/** Predefined event helpers */
export const track = {
  toolVisit(toolName: string, toolSlug: string) {
    trackEvent("tool_visit", { tool_name: toolName, tool_slug: toolSlug });
  },
  newsletterSubscribe(email: string) {
    trackEvent("newsletter_subscribe", { method: "footer" });
  },
  toolSubmit() {
    trackEvent("tool_submit", { method: "form" });
  },
  adInquiry(budget: string) {
    trackEvent("ad_inquiry", { budget_range: budget });
  },
  toolCompare(slugs: string[]) {
    trackEvent("tool_compare", { tool_count: slugs.length });
  },
  search(query: string, resultCount: number) {
    trackEvent("search", { search_term: query, result_count: resultCount });
  },
  share(platform: string, toolSlug: string) {
    trackEvent("share", { method: platform, item_id: toolSlug });
  },
  favoriteToggle(toolSlug: string, added: boolean) {
    trackEvent(added ? "favorite_add" : "favorite_remove", { item_id: toolSlug });
  },
};
