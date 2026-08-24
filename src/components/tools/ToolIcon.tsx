"use client";

import { useState } from "react";
import Image from "next/image";

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

const sizePixels = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 64,
};

/**
 * Tool icon with reliable image loading and graceful fallback.
 * Tries primary source (icon.horse), falls back to Google favicon,
 * then shows the first letter of the tool name if both fail.
 */
export function ToolIcon({ name, imageUrl, websiteUrl, size = "md", className }: ToolIconProps) {
  const [srcIndex, setSrcIndex] = useState(0);

  // Derive domain from websiteUrl for Google favicon service
  const domain = websiteUrl
    ? websiteUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/^www\./, "")
    : null;

  // Build the Google favicon URL as fallback
  const googleFaviconUrl = domain
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
    : null;

  // Build ordered list of sources to try
  const sources: string[] = [];
  if (imageUrl) sources.push(imageUrl);
  if (googleFaviconUrl) sources.push(googleFaviconUrl);

  // No sources available — show letter immediately
  if (sources.length === 0) {
    return (
      <div
        className={`${sizeClasses[size]} bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold shrink-0 ${className || ""}`}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }

  // All sources failed — show letter
  if (srcIndex >= sources.length) {
    return (
      <div
        className={`${sizeClasses[size]} bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold shrink-0 ${className || ""}`}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }

  const currentSrc = sources[srcIndex];
  const px = sizePixels[size];

  return (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold shrink-0 overflow-hidden ${className || ""}`}
    >
      <Image
        src={currentSrc}
        alt={name}
        width={px}
        height={px}
        className="w-full h-full object-cover"
        loading="lazy"
        unoptimized={currentSrc.startsWith("https://www.google.com/s2/favicons")}
        onError={() => setSrcIndex((i) => i + 1)}
      />
    </div>
  );
}
