"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot: "sidebar" | "inline" | "banner";
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  className?: string;
}

const AD_CONFIG = {
  sidebar: {
    style: { width: "300px", height: "250px" } as React.CSSProperties,
    format: "rectangle" as const,
  },
  inline: {
    style: { width: "100%", minHeight: "90px" } as React.CSSProperties,
    format: "horizontal" as const,
  },
  banner: {
    style: { width: "100%", minHeight: "60px" } as React.CSSProperties,
    format: "auto" as const,
  },
};

export function AdBanner({ slot, format, className = "" }: AdBannerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const adLoaded = useRef(false);

  useEffect(() => {
    if (!ref.current || adLoaded.current) return;
    adLoaded.current = true;

    const config = AD_CONFIG[slot];
    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.cssText = "display:block";
    if (config.style.width) ins.style.width = String(config.style.width);
    if (config.style.height) ins.style.height = String(config.style.height);
    if (config.style.minHeight) ins.style.minHeight = String(config.style.minHeight);
    ins.setAttribute("data-ad-client", "ca-pub-1624976458211100");
    ins.setAttribute("data-ad-slot", "");
    ins.setAttribute("data-ad-format", format || config.format);
    ins.setAttribute("data-full-width-responsive", "true");

    ref.current.appendChild(ins);

    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script in layout.tsx
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not yet loaded or blocked
    }
  }, [slot, format]);

  const config = AD_CONFIG[slot];

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-lg border border-border bg-muted/20 ${className}`}
      style={{ minHeight: slot === "sidebar" ? "250px" : slot === "inline" ? "90px" : "60px", ...config.style }}
    >
      {/* Fallback placeholder shown when no ad is loaded */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground text-xs opacity-50">
        <span>Ad</span>
      </div>
    </div>
  );
}
