"use client";

import { useEffect, useRef, useState } from "react";

interface AdBannerProps {
  slot: "sidebar" | "inline" | "banner";
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  adSlot?: string;
  className?: string;
}

// AdSense ad units — create these in your AdSense dashboard at https://www.google.com/adsense/
// Replace these placeholder values with real data-ad-slot IDs from your AdSense account
const AD_UNITS: Record<string, { style: React.CSSProperties; format: string; minHeight: string; adSlot: string }> = {
  sidebar: {
    style: { display: "block", width: "300px", height: "250px" },
    format: "rectangle",
    minHeight: "250px",
    // TODO: Replace with your real ad unit slot ID from AdSense → By ad unit → Get code
    adSlot: process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || "",
  },
  inline: {
    style: { display: "block", width: "100%" },
    format: "horizontal",
    minHeight: "90px",
    // TODO: Replace with your real ad unit slot ID from AdSense → By ad unit → Get code
    adSlot: process.env.NEXT_PUBLIC_ADSENSE_INLINE_SLOT || "",
  },
  banner: {
    style: { display: "block", width: "100%" },
    format: "auto",
    minHeight: "60px",
    adSlot: process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT || "",
  },
};

const PUBLISHER_ID = "ca-pub-9813677683114838";

export function AdBanner({ slot, format, adSlot: adSlotProp, className = "" }: AdBannerProps) {
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

    const config = AD_UNITS[slot];
    const slotId = adSlotProp || config.adSlot;

    // Create a wrapper for the ad inside the observed div
    const wrapper = document.createElement("div");
    wrapper.id = `ad-${slot}-${Math.random().toString(36).slice(2, 8)}`;

    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.cssText = "display:block";
    if (config.style.width) ins.style.width = String(config.style.width);
    if (config.style.height) ins.style.height = String(config.style.height);
    if (config.style.minHeight) ins.style.minHeight = String(config.style.minHeight);
    ins.setAttribute("data-ad-client", PUBLISHER_ID);
    if (slotId) {
      ins.setAttribute("data-ad-slot", slotId);
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
  }, [slot, format, adSlotProp, visible]);

  const config = AD_UNITS[slot];

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-lg border border-border bg-muted/20 my-6 ${className}`}
      style={{ minHeight: config.minHeight }}
      aria-label="Advertisement"
    >
      {/* Fallback placeholder shown when no ad is loaded */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground text-xs opacity-0 pointer-events-none">
        <span>Advertisement</span>
      </div>
    </div>
  );
}
