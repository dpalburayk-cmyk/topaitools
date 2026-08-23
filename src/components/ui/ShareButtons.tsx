"use client";

import { Share2, X, Link2, Check, MessageCircle, ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/tracking";

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

export function ShareButtons({ url, title, className = "" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitter = () => {
    track.share("twitter", url.replace("https://topaitools.xyz/tools/", ""));
    window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, "_blank", "noopener,noreferrer");
  };

  const handleLinkedIn = () => {
    track.share("linkedin", url.replace("https://topaitools.xyz/tools/", ""));
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, "_blank", "noopener,noreferrer");
  };

  const handleReddit = () => {
    track.share("reddit", url.replace("https://topaitools.xyz/tools/", ""));
    window.open(`https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`, "_blank", "noopener,noreferrer");
  };

  const handleWhatsApp = () => {
    track.share("whatsapp", url.replace("https://topaitools.xyz/tools/", ""));
    window.open(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, "_blank", "noopener,noreferrer");
  };

  const handleNative = async () => {
    if (navigator.share) {
      track.share("native", url.replace("https://topaitools.xyz/tools/", ""));
      await navigator.share({ title, url });
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-xs text-muted-foreground">Share:</span>
      <button onClick={handleNative} className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title="Share">
        <Share2 className="w-3.5 h-3.5" />
      </button>
      <button onClick={handleTwitter} className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title="Share on X">
        <X className="w-3.5 h-3.5" />
      </button>
      <button onClick={handleReddit} className="p-1.5 rounded-md text-muted-foreground hover:text-orange-500 hover:bg-orange-500/10 transition-colors" title="Share on Reddit">
        <ExternalLink className="w-3.5 h-3.5" />
      </button>
      <button onClick={handleWhatsApp} className="p-1.5 rounded-md text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors" title="Share on WhatsApp">
        <MessageCircle className="w-3.5 h-3.5" />
      </button>
      <button onClick={handleCopy} className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title="Copy link">
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Link2 className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
