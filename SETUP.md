# AI Vault - Setup & Deployment Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local` and fill in your keys:
```bash
cp .env.example .env.local
```

Required services (all free):
| Service | Purpose | Sign Up |
|---------|---------|---------|
| [Resend](https://resend.com) | Newsletter emails | Free: 3,000/month |
| [Vercel Analytics](https://vercel.com/analytics) | Site analytics | Free with Vercel |
| [Carbon Ads](https://www.carbonads.net) | Ad revenue | Apply for approval |

### 3. Run Locally
```bash
npm run dev
```
Open http://localhost:3000

### 4. Deploy to Vercel (Free)
```bash
npm i -g vercel
vercel
```

## Monetization Setup

### Step 1: Affiliate Programs (Free to Join)
Sign up for these networks and get your affiliate links:

| Network | URL | Top Programs |
|---------|-----|-------------|
| Impact.com | https://impact.com | Canva, Grammarly, Jasper |
| PartnerStack | https://partnerstack.com | Notion, ElevenLabs, HeyGen |
| Direct | cursor.com/referral | Cursor |

Once you have your links, add them to `src/data/tools.ts` in the `affiliateUrl` field:
```typescript
{
  id: "8",
  slug: "github-copilot",
  ...
  affiliateUrl: "https://github.com/features/copilot?ref=YOUR_CODE",
}
```

### Step 2: Carbon Ads / EthicalAds
1. Apply at https://www.carbonads.net or https://www.ethicalads.io
2. Get your serve ID
3. Replace `PLACEHOLDER` in `src/components/ui/AdBanner.tsx`

### Step 3: Newsletter (Resend)
1. Sign up at https://resend.com
2. Create an API key → add to `RESEND_API_KEY` in `.env.local`
3. Create an Audience → copy Audience ID → add to `RESEND_AUDIENCE_ID`
4. Verify your sending domain

## Launch Checklist

- [ ] Deploy to Vercel
- [ ] Sign up for Resend and configure newsletter
- [ ] Join 3+ affiliate programs and add links
- [ ] Apply for Carbon Ads / EthicalAds
- [ ] Submit to Product Hunt (/launch page ready)
- [ ] Post on Reddit (r/artificial, r/SideProject)
- [ ] Share on Twitter/X with #AITools tag
- [ ] Write first weekly comparison article
- [ ] Submit sitemap to Google Search Console
