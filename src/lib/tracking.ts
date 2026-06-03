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
