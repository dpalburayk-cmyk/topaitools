"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot: "sidebar" | "inline" | "banner";
  format?: "horizontal" | "vertical";
  className?: string;
}

const AD_SIZES = {
  sidebar: { width: "300px", height: "250px" },
  inline: { width: "100%", height: "90px" },
  banner: { width: "100%", height: "60px" },
};

export function AdBanner({ slot, format = "horizontal", className = "" }: AdBannerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const placement = slot === "sidebar" ? "aivault-sidebar" : slot === "banner" ? "aivault-banner" : "aivault-inline";

    // Carbon Ads / EthicalAds integration
    // Replace SERVICE_ID and PLACEMENT with your actual ad network values
    try {
      const s = document.createElement("script");
      s.async = true;
      s.id = "_carbonads_js";
      s.src = `//cdn.carbonads.com/carbon.js?serve=PLACEHOLDER&placement=${placement}`;
      ref.current.appendChild(s);
    } catch {
      // Ad network not loaded — show fallback
    }

    return () => {
      const existing = document.getElementById("_carbonads_js");
      if (existing) existing.remove();
    };
  }, [slot]);

  const size = AD_SIZES[slot];

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-lg border border-border bg-muted/20 ${className}`}
      style={{ minHeight: format === "vertical" ? "250px" : "90px", ...size }}
    >
      {/* Fallback placeholder shown when no ad network is configured */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground text-xs opacity-50">
        <span>Ad</span>
      </div>
    </div>
  );
}
