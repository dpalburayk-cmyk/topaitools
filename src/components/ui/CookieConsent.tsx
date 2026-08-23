"use client";

import { useState, useEffect } from "react";
import { Shield, X, ChevronDown } from "lucide-react";

const CONSENT_KEY = "cookie-consent";

interface ConsentState {
  accepted: boolean;
  analytics: boolean;
  ads: boolean;
}

function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return null;
}

function applyConsent(consent: ConsentState) {
  // Google Consent Mode v2
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof window !== "undefined" && (window as any).gtag) {
    const gtag = (window as any).gtag;
    gtag("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.ads ? "granted" : "denied",
      ad_user_data: consent.ads ? "granted" : "denied",
      ad_personalization: consent.ads ? "granted" : "denied",
    });
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [ads, setAds] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      setVisible(true);
    } else {
      applyConsent(stored);
    }
  }, []);

  function acceptAll() {
    const consent: ConsentState = { accepted: true, analytics: true, ads: true };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    applyConsent(consent);
    setVisible(false);
  }

  function acceptSelected() {
    const consent: ConsentState = { accepted: true, analytics, ads };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    applyConsent(consent);
    setVisible(false);
  }

  function rejectAll() {
    const consent: ConsentState = { accepted: true, analytics: false, ads: false };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    applyConsent(consent);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="relative max-w-3xl mx-auto rounded-2xl border border-border bg-card/95 backdrop-blur-md shadow-2xl p-5 sm:p-6">
        <button
          onClick={rejectAll}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3 mb-3">
          <Shield className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-semibold text-sm">We value your privacy</h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              We use cookies to enhance your experience, analyze site traffic, and serve relevant ads.
              You can choose which cookies to allow. <a href="/privacy" className="text-indigo-500 hover:underline">Learn more</a>
            </p>
          </div>
        </div>

        {showDetails && (
          <div className="space-y-3 mb-4 pl-8 border-l-2 border-border ml-2">
            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <span className="text-sm font-medium">Analytics Cookies</span>
                <p className="text-xs text-muted-foreground">Help us understand how visitors interact with the site (Google Analytics, Vercel Analytics)</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={analytics}
                onClick={() => setAnalytics(!analytics)}
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                  analytics ? "bg-indigo-500" : "bg-muted"
                }`}
              >
                <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                  analytics ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
            </label>

            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <span className="text-sm font-medium">Advertising Cookies</span>
                <p className="text-xs text-muted-foreground">Used by Google AdSense to show personalized ads based on your browsing history</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={ads}
                onClick={() => setAds(!ads)}
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                  ads ? "bg-indigo-500" : "bg-muted"
                }`}
              >
                <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                  ads ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
            </label>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDetails ? "rotate-180" : ""}`} />
            Customize
          </button>
          <div className="flex-1 flex flex-col sm:flex-row gap-2">
            <button
              onClick={rejectAll}
              className="flex-1 px-4 py-2.5 rounded-xl border border-border text-xs font-medium hover:bg-muted transition-colors"
            >
              Reject All
            </button>
            <button
              onClick={showDetails ? acceptSelected : acceptAll}
              className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-500 text-white text-xs font-medium hover:bg-indigo-600 transition-colors"
            >
              {showDetails ? "Accept Selected" : "Accept All"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
