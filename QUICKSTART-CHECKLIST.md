# 🚀 Quick Start Checklist — Top AI Tools
# خطوات سريعة للتنفيذ

**آخر تحديث:** 17 يونيو 2026

---

## ✅ تم إنجازه تقنياً (جاهز للنشر بعد git push)
- [x] إصلاح AdSense: مكون AdBanner يدعم ad slots من env vars
- [x] إصلاح IndexNow: 5 نقاط نهاية (Google, Bing, Yahoo, api.indexnow.org)
- [x] إصلاح SEO: canonical URLs + OG metadata لكل صفحات المدونة والأدوات والتصنيفات
- [x] محتوى تسويقي جاهز: MARKETING-CONTENT.md

---

## 🔴 الخطوة 1: Git Push (أول شيء!)
> **⚠️ جرب gh auth login أولاً — إذا لم يعمل، جرب الطريقة الثانية**

### الطريقة A: عبر GitHub CLI (gh)
```powershell
gh auth login -h github.com
# اختر: GitHub.com → HTTPS → Login with web browser
# سجّل دخول بحساب asbreik-ctrl
# ثم:
cd C:\projects\AI\ai-tools-directory
gh auth setup-git
git push origin main
```

### الطريقة B: عبر المتصفح مباشرة
1. افتح https://github.com/asbreik-ctrl/topaitools/settings/access_tokens
2. أنشئ **Personal Access Token** (Classic) مع صلاحية `repo`
3. انسخ التوكن ثم:
```powershell
cd C:\projects\AI\ai-tools-directory
git remote set-url origin https://asbreik-ctrl:<PASTE_TOKEN_HERE>@github.com/asbreik-ctrl/topaitools.git
git push origin main
git remote set-url origin https://github.com/asbreik-ctrl/topaitools.git
```

> **✅ عند النجاح:** سيُنشر تلقائياً على Vercel عبر post-push hook

---

## 🟡 الخطوة 2: تفعيل AdSense (5 دقائق)

### إنشاء Ad Units:
1. افتح **Chrome** → https://www.google.com/adsense/ → سجّل دخولك
2. اذهب **Ads → By ad unit → New ad unit**
3. أنشئ **3 وحدات:**

| # | الاسم | النوع | الحجم |
|---|-------|-------|-------|
| 1 | `Sidebar Ad` | Display ads | Rectangle (300×250) |
| 2 | `Inline Ad` | Display ads | Responsive / Horizontal |
| 3 | `Banner Ad` | Display ads | Responsive / Auto |

4. **انسخ قيمة `data-ad-slot`** من كل وحدة
5. افتح **PowerShell** واكتب (استبدل القيم):
```powershell
cd C:\projects\AI\ai-tools-directory
# أضف القيم في ملف .env.local:
# NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT=xxx
# NEXT_PUBLIC_ADSENSE_INLINE_SLOT=xxx
# NEXT_PUBLIC_ADSENSE_BANNER_SLOT=xxx
git add . && git commit -m "feat: add AdSense ad unit slots" && git push origin main
```

---

## 🟢 الخطوة 3: Twitter/X (3 تغريدات)

1. افتح https://x.com → سجّل دخول @topaitoolsxyz
2. انشر التغريدات من MARKETING-CONTENT.md (Tweet 4, 5, 6)

**أفضل وقت:** 9-11 مساءً بتوقيت السعودية (Tue/Wed/Thu)

### Tweet 4:
```
Example: Want to compare Claude vs ChatGPT vs Gemini?

Just add them to the compare bar and see features, pricing, ratings, and pros/cons side by side. No bias, no affiliate pressure.

→ https://topaitools.xyz/compare
```

### Tweet 5:
```
The blog has 15 detailed guides including:

- Best AI Tools for Students 2026
- Claude vs ChatGPT vs Gemini comparison
- Best AI Coding Tools
- AI Tools for Small Business
- Best AI Music Generators

All free, no paywall → https://topaitools.xyz/blog
```

### Tweet 6:
```
Built with Next.js 16, TypeScript, and Tailwind CSS. 159 static pages, loads in under 1 second.

This is a solo project — no VC, no team. Just me building something I wished existed.

Would love your feedback! What AI tools am I missing?
```

---

## 🔵 الخطوة 4: Reddit (بناء كارما)

**الحساب:** u/Hour-Ring-3756

### اليوم 1-3: بناء كارما
علق على 10 مشاركات بتعليقات مفيدة في:
- r/learnprogramming (أسئلة مبتدئين)
- r/ChatGPT_Gemini (مقارنات AI)
- r/artificial (أخبار AI)

**⚠️ 15+ دقيقة بين كل تعليق!** Rate limit شديد للحسابات الجديدة.

### عندما الكارما 10+:
انشر في r/SideProject و r/artificial (المحتوى جاهز في MARKETING-CONTENT.md)

---

## 🟣 الخطوة 5: أدلة التقديم

### بعد git push (لأن DevHunt يحتاج GitHub login):

| الدليل | الرابط | ملاحظة |
|--------|--------|--------|
| **DevHunt** | https://devhunt.org/submit | سجّل دخول بـ GitHub |
| **SaaSHub** | https://www.saashub.com/submit | سجّل حساب جديد |
| **BetaList** | https://betalist.com/submit | سجّل حساب جديد |
| **There's An AI For That** | https://theresanaiforthat.com/submit | استخدم نفس المحتوى |

**بيانات التقديم (انسخ والصق):**
- **الاسم:** Top AI Tools
- **الوصف:** Curated directory of 114+ AI tools with honest reviews, side-by-side comparisons, and in-depth blog posts. Filter by price, category, or trending status. Free to use, no login required.
- **الرابط:** https://topaitools.xyz
- **الفئة:** AI, Productivity, Directory
- **GitHub:** https://github.com/asbreik-ctrl/topaitools
