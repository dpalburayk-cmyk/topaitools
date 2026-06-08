"use client";

import { useEffect, useRef, useState } from "react";

interface AdBannerProps {
  slot: "sidebar" | "inline" | "banner";
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  adSlot?: string;
  className?: string;
}

const AD_CONFIG = {
  sidebar: {
    style: { width: "300px", height: "250px" } as React.CSSProperties,
    format: "rectangle" as const,
    minHeight: "250px",
  },
  inline: {
    style: { width: "100%", minHeight: "90px" } as React.CSSProperties,
    format: "horizontal" as const,
    minHeight: "90px",
  },
  banner: {
    style: { width: "100%", minHeight: "60px" } as React.CSSProperties,
    format: "auto" as const,
    minHeight: "60px",
  },
};

export function AdBanner({ slot, format, adSlot, className = "" }: AdBannerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const adLoaded = useRef(false);
  const [visible, setVisible] = useState(false);

  // Lazy-load: only render ad when the container is in the viewport
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Create the ad unit once visible
  useEffect(() => {
    if (!visible || !ref.current || adLoaded.current) return;
    adLoaded.current = true;

    const config = AD_CONFIG[slot];

    // Create a wrapper for the ad inside the observed div
    const wrapper = document.createElement("div");
    wrapper.id = `ad-${slot}-${Math.random().toString(36).slice(2, 8)}`;

    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.cssText = "display:block";
    if (config.style.width && slot === "sidebar") ins.style.width = String(config.style.width);
    if (config.style.height && slot === "sidebar") ins.style.height = String(config.style.height);
    if (config.style.minHeight) ins.style.minHeight = String(config.style.minHeight);
    ins.setAttribute("data-ad-client", "ca-pub-1624976458211100");
    if (adSlot) {
      ins.setAttribute("data-ad-slot", adSlot);
    }
    ins.setAttribute("data-ad-format", format || config.format);
    ins.setAttribute("data-full-width-responsive", "true");

    wrapper.appendChild(ins);
    ref.current.appendChild(wrapper);

    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script in layout.tsx
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not yet loaded or blocked
    }
  }, [slot, format, adSlot, visible]);

  const config = AD_CONFIG[slot];

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-lg border border-border bg-muted/20 my-6 ${className}`}
      style={{ minHeight: config.minHeight, ...config.style }}
      aria-label="Advertisement"
    >
      {/* Fallback placeholder shown when no ad is loaded */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground text-xs opacity-0 pointer-events-none">
        <span>Advertisement</span>
      </div>
    </div>
  );
}
