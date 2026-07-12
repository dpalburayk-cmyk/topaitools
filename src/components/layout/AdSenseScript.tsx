import Script from 'next/script';

export function AdSenseScript() {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1624976458211100"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
