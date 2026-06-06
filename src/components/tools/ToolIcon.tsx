"use client";

import { useState } from "react";

interface ToolIconProps {
  name: string;
  imageUrl?: string;
  websiteUrl?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 rounded-lg text-xs",
  md: "w-10 h-10 rounded-xl text-sm",
  lg: "w-14 h-14 rounded-2xl text-xl",
  xl: "w-16 h-16 rounded-2xl text-2xl",
};

/**
 * Tool icon with reliable image loading and graceful fallback.
 * Uses Google's favicon service (more reliable) with icon.horse as fallback,
 * then shows the first letter of the tool name if both fail.
 */
export function ToolIcon({ name, imageUrl, websiteUrl, size = "md", className }: ToolIconProps) {
  const [failed, setFailed] = useState(false);

  // Derive domain from websiteUrl for Google favicon service
  const domain = websiteUrl
    ? websiteUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/^www\./, "")
    : null;

  // Build the Google favicon URL as a more reliable primary source
  const googleFaviconUrl = domain
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
    : null;

  // Use icon.horse as primary, Google as fallback
  const primarySrc = imageUrl || googleFaviconUrl;
  const fallbackSrc = primarySrc === imageUrl && googleFaviconUrl ? googleFaviconUrl : null;

  // If both sources failed or no image URL, show letter
  if (failed || !primarySrc) {
    return (
      <div
        className={`${sizeClasses[size]} bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold shrink-0 ${className || ""}`}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold shrink-0 overflow-hidden ${className || ""}`}
    >
      <img
        src={primarySrc}
        alt={name}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          const img = e.currentTarget;
          if (fallbackSrc && img.src !== fallbackSrc) {
            // Try fallback source
            img.src = fallbackSrc;
          } else {
            // Both failed — show letter
            setFailed(true);
          }
        }}
      />
    </div>
  );
}
