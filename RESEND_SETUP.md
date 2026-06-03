# Resend Email Setup Guide

## Step 1: Create Resend Account
1. Go to https://resend.com/signup
2. Sign up with `dpalburayk@gmail.com`
3. Verify your email

## Step 2: Get API Key
1. Go to https://resend.com/api-keys
2. Click "Create API Key"
3. Name it "topaitools-production"
4. Copy the key (starts with `re_`)
5. Paste it in `.env.local` → `RESEND_API_KEY=re_your_key_here`

## Step 3: Create Audience (Mailing List)
1. Go to https://resend.com/audiences
2. Click "Create Audience"
3. Name it "Top AI Tools Newsletter"
4. Copy the Audience ID (starts with `aud_`)
5. Paste it in `.env.local` → `RESEND_AUDIENCE_ID=aud_your_id_here`

## Step 4: Verify Domain (for professional emails)
1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter `topaitools.xyz`
4. Add the DNS records shown to your Vercel domain settings:
   - Go to https://vercel.com/dashboard → your project → Settings → Domains
   - Add each DNS record (TXT, MX, CNAME) as instructed by Resend
5. Click "Verify" in Resend (may take up to 24 hours for DNS propagation)

## Step 5: Test
After completing all steps, run:
```bash
cd C:\projects\AI\ai-tools-directory
npx next dev --webpack
```
Then visit the site and submit a test email via the newsletter form.

## Free Tier Limits
- 3,000 emails/month
- 100 emails/day
- 1 verified domain
- Resend branding on emails (can be removed on paid plan)
