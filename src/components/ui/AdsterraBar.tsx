"use client";

import { useEffect, useRef } from "react";

interface AdsterraBarProps {
  className?: string;
  disabled?: boolean;
}

const ADSTERRA_SRC =
  "https://pl30831517.effectivecpmnetwork.com/12/3d/b1/123db12a494e4e9153e5245f26439ce0.js";

export function AdsterraBar({ className = "", disabled = false }: AdsterraBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (disabled || loadedRef.current || !containerRef.current) return;

    loadedRef.current = true;

    const script = document.createElement("script");
    script.src = ADSTERRA_SRC;
    script.async = true;
    containerRef.current.appendChild(script);
  }, [disabled]);

  if (disabled) return null;

  return (
    <div ref={containerRef} className={className} />
  );
}
