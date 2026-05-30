export type Locale = "en" | "ar";

export const locales: Locale[] = ["en", "ar"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

export const localeDirections: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

type TranslationKeys = {
  // Navigation
  "nav.tools": string;
  "nav.categories": string;
  "nav.blog": string;
  "nav.submit": string;
  "nav.about": string;
  "nav.search": string;
  "nav.searchPlaceholder": string;
  // Hero
  "hero.badge": string;
  "hero.title": string;
  "hero.titleHighlight": string;
  "hero.subtitle": string;
  "hero.cta": string;
  "hero.ctaSecondary": string;
  "hero.stat1": string;
  "hero.stat2": string;
  "hero.stat3": string;
  // Sections
  "section.trending": string;
  "section.popular": string;
  "section.browseCategories": string;
  "section.featured": string;
  "section.editorsChoice": string;
  "section.viewAll": string;
  "section.allCategories": string;
  // Tools
  "tools.title": string;
  "tools.subtitle": string;
  "tools.sortBy": string;
  "tools.highestRated": string;
  "tools.nameAZ": string;
  "tools.newest": string;
  "tools.allPricing": string;
  "tools.filterCategory": string;
  "tools.filterPricing": string;
  "tools.found": string;
  "tools.noResults": string;
  "tools.viewDetails": string;
  // Tool Detail
  "tool.features": string;
  "tool.pros": string;
  "tool.cons": string;
  "tool.preview": string;
  "tool.alternatives": string;
  "tool.relatedTools": string;
  "tool.visit": string;
  "tool.updated": string;
  "tool.tags": string;
  // Categories
  "categories.title": string;
  "categories.subtitle": string;
  "categories.tools": string;
  "categories.noTools": string;
  // Blog
  "blog.title": string;
  "blog.subtitle": string;
  "blog.readTime": string;
  "blog.read": string;
  "blog.backToBlog": string;
  "blog.minRead": string;
  // Submit
  "submit.title": string;
  "submit.subtitle": string;
  "submit.toolName": string;
  "submit.websiteUrl": string;
  "submit.description": string;
  "submit.category": string;
  "submit.pricing": string;
  "submit.email": string;
  "submit.notes": string;
  "submit.button": string;
  "submit.selectCategory": string;
  "submit.selectPricing": string;
  "submit.success": string;
  "submit.successMessage": string;
  // About
  "about.title": string;
  "about.subtitle": string;
  "about.contact": string;
  "about.contactMessage": string;
  // Footer
  "footer.explore": string;
  "footer.allTools": string;
  "footer.freeTools": string;
  "footer.paidTools": string;
  "footer.submitTool": string;
  "footer.categories": string;
  "footer.resources": string;
  "footer.blog": string;
  "footer.about": string;
  "footer.contact": string;
  "footer.privacy": string;
  "footer.terms": string;
  "footer.rights": string;
  // Common
  "common.home": string;
  "common.loading": string;
  "common.error": string;
  "common.back": string;
  // Pricing
  "pricing.free": string;
  "pricing.freemium": string;
  "pricing.paid": string;
  // Newsletter
  "newsletter.title": string;
  "newsletter.subtitle": string;
  "newsletter.placeholder": string;
  "newsletter.subscribe": string;
  "newsletter.subscribed": string;
  // 404
  "notfound.title": string;
  "notfound.subtitle": string;
  "notfound.backHome": string;
  "notfound.browseTools": string;
  // Favorites
  "nav.favorites": string;
  "favorites.title": string;
  "favorites.subtitle": string;
  "favorites.empty": string;
  "favorites.emptyCta": string;
  "favorites.added": string;
  "favorites.removed": string;
  "favorites.count": string;
  "favorites.browseTools": string;
  // Enhanced Search
  "tools.rating": string;
  "tools.trending": string;
  "tools.featured": string;
  "tools.allRatings": string;
  "tools.show": string;
  "tools.activeFilters": string;
  "tools.clearAll": string;
  "tools.fourPlus": string;
  "tools.threePlus": string;
  "tools.searchPlaceholder": string;
  "tools.noToolsDescription": string;
  // Comparison
  "compare.title": string;
  "compare.subtitle": string;
  "compare.empty": string;
  "compare.emptyCta": string;
  "compare.maxReached": string;
  "compare.addTool": string;
  "compare.clearAll": string;
  "compare.compare": string;
  "compare.toolCount": string;
  "compare.description": string;
  "compare.category": string;
  "compare.pricing": string;
  "compare.website": string;
  "compare.features": string;
  "compare.pros": string;
  "compare.cons": string;
};

export const translations: Record<Locale, TranslationKeys> = {
  en: {
    "nav.tools": "Tools",
    "nav.categories": "Categories",
    "nav.blog": "Blog",
    "nav.submit": "Submit",
    "nav.about": "About",
    "nav.search": "Search tools...",
    "nav.searchPlaceholder": "Search AI tools...",
    "hero.badge": "Updated daily with the latest AI tools",
    "hero.title": "Discover the",
    "hero.titleHighlight": "best AI tools",
    "hero.subtitle": "Curated directory of 1,000+ AI tools with honest reviews, comparisons, and insights to help you find the perfect tool.",
    "hero.cta": "Explore Tools",
    "hero.ctaSecondary": "Submit Your Tool",
    "hero.stat1": "1,000+ Tools",
    "hero.stat2": "50+ Categories",
    "hero.stat3": "Daily Updates",
    "section.trending": "Trending Now",
    "section.popular": "Most Popular AI Tools",
    "section.browseCategories": "Browse by Category",
    "section.featured": "Featured AI Tools",
    "section.editorsChoice": "Editor's Choice",
    "section.viewAll": "View all",
    "section.allCategories": "All categories",
    "tools.title": "AI Tools Directory",
    "tools.subtitle": "Browse {count} AI tools across {categories} categories",
    "tools.sortBy": "Sort by",
    "tools.highestRated": "Highest Rated",
    "tools.nameAZ": "Name A-Z",
    "tools.newest": "Newest",
    "tools.allPricing": "All Pricing",
    "tools.filterCategory": "Category",
    "tools.filterPricing": "Pricing",
    "tools.found": "{count} tools found",
    "tools.noResults": "No tools found. Try adjusting your search or filters.",
    "tools.viewDetails": "View Details",
    "tool.features": "Key Features",
    "tool.pros": "Pros",
    "tool.cons": "Cons",
    "tool.preview": "Preview",
    "tool.alternatives": "Alternatives",
    "tool.relatedTools": "Related Tools",
    "tool.visit": "Visit {name}",
    "tool.updated": "Updated {date}",
    "tool.tags": "Tags",
    "categories.title": "Browse by Category",
    "categories.subtitle": "Find the perfect AI tool for your specific use case across {count} categories",
    "categories.tools": "{count} tools",
    "categories.noTools": "No tools in this category yet. Check back soon or submit a tool.",
    "blog.title": "Blog",
    "blog.subtitle": "AI news, reviews, and insights",
    "blog.readTime": "read",
    "blog.read": "Read",
    "blog.backToBlog": "Back to Blog",
    "blog.minRead": "min read",
    "submit.title": "Submit an AI Tool",
    "submit.subtitle": "Know a great AI tool that should be listed? Submit it here and we'll review it within 48 hours.",
    "submit.toolName": "Tool Name",
    "submit.websiteUrl": "Website URL",
    "submit.description": "Description",
    "submit.category": "Category",
    "submit.pricing": "Pricing Model",
    "submit.email": "Your Email",
    "submit.notes": "Additional Notes",
    "submit.button": "Submit Tool",
    "submit.selectCategory": "Select a category",
    "submit.selectPricing": "Select pricing",
    "submit.success": "Submission Received!",
    "submit.successMessage": "Thank you for your submission. We'll review your tool and get back to you within 48 hours.",
    "about.title": "About",
    "about.subtitle": "Learn about {name} and our mission to help you find the best AI tools.",
    "about.contact": "Get in Touch",
    "about.contactMessage": "Have feedback, suggestions, or want to collaborate? We'd love to hear from you.",
    "footer.explore": "Explore",
    "footer.allTools": "All Tools",
    "footer.freeTools": "Free Tools",
    "footer.paidTools": "Paid Tools",
    "footer.submitTool": "Submit a Tool",
    "footer.categories": "Categories",
    "footer.resources": "Resources",
    "footer.blog": "Blog",
    "footer.about": "About",
    "footer.contact": "Contact",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.rights": "All rights reserved.",
    "common.home": "Home",
    "common.loading": "Loading...",
    "common.error": "Something went wrong",
    "common.back": "Back",
    "pricing.free": "Free",
    "pricing.freemium": "Freemium",
    "pricing.paid": "Paid",
    "newsletter.title": "Stay ahead of the AI curve",
    "newsletter.subtitle": "Get weekly updates on the best new AI tools, reviews, and industry insights. No spam, unsubscribe anytime.",
    "newsletter.placeholder": "your@email.com",
    "newsletter.subscribe": "Subscribe",
    "newsletter.subscribed": "You're subscribed! Check your inbox.",
    "notfound.title": "Page not found",
    "notfound.subtitle": "The page you're looking for doesn't exist or has been moved.",
    "notfound.backHome": "Back to Home",
    "notfound.browseTools": "Browse Tools",
    // Favorites
    "nav.favorites": "Favorites",
    "favorites.title": "My Favorites",
    "favorites.subtitle": "Your saved AI tools",
    "favorites.empty": "No favorites yet",
    "favorites.emptyCta": "Browse tools and click the heart icon to save your favorites.",
    "favorites.added": "Added to favorites",
    "favorites.removed": "Removed from favorites",
    "favorites.count": "{count} favorites",
    "favorites.browseTools": "Browse Tools",
    // Enhanced Search
    "tools.rating": "Rating",
    "tools.trending": "Trending",
    "tools.featured": "Featured",
    "tools.allRatings": "All Ratings",
    "tools.show": "Show",
    "tools.activeFilters": "{count} filters active",
    "tools.clearAll": "Clear all filters",
    "tools.fourPlus": "4+ Stars",
    "tools.threePlus": "3+ Stars",
    "tools.searchPlaceholder": "Search tools by name, description, or tag...",
    "tools.noToolsDescription": "Try adjusting your search or filters to find what you're looking for.",
    // Comparison
    "compare.title": "Compare Tools",
    "compare.subtitle": "Compare up to 4 AI tools side by side",
    "compare.empty": "No tools to compare",
    "compare.emptyCta": "Browse tools and click the compare button to add them here.",
    "compare.maxReached": "Maximum 4 tools for comparison",
    "compare.addTool": "Add to Compare",
    "compare.clearAll": "Clear Comparison",
    "compare.compare": "Compare",
    "compare.toolCount": "{count} tools selected",
    "compare.description": "Description",
    "compare.category": "Category",
    "compare.pricing": "Pricing",
    "compare.website": "Website",
    "compare.features": "Key Features",
    "compare.pros": "Pros",
    "compare.cons": "Cons",
  },
  ar: {
    "nav.tools": "الأدوات",
    "nav.categories": "التصنيفات",
    "nav.blog": "المدونة",
    "nav.submit": "أضف أداة",
    "nav.about": "عن الموقع",
    "nav.search": "ابحث عن الأدوات...",
    "nav.searchPlaceholder": "ابحث عن أدوات الذكاء الاصطناعي...",
    "hero.badge": "يُحدّث يومياً بأحدث أدوات الذكاء الاصطناعي",
    "hero.title": "اكتشف",
    "hero.titleHighlight": "أفضل أدوات الذكاء الاصطناعي",
    "hero.subtitle": "دليل منسّق لأكثر من 1000 أداة ذكاء اصطناعي مع مراجعات صادقة ومقارنات لتساعدك في العثور على الأداة المثالية.",
    "hero.cta": "استكشف الأدوات",
    "hero.ctaSecondary": "أضف أداتك",
    "hero.stat1": "+1000 أداة",
    "hero.stat2": "+50 تصنيف",
    "hero.stat3": "تحديثات يومية",
    "section.trending": "الأكثر رواجاً",
    "section.popular": "الأدوات الأكثر شعبية",
    "section.browseCategories": "تصفح حسب التصنيف",
    "section.featured": "أدوات مميزة",
    "section.editorsChoice": "اختيار المحررين",
    "section.viewAll": "عرض الكل",
    "section.allCategories": "جميع التصنيفات",
    "tools.title": "دليل أدوات الذكاء الاصطناعي",
    "tools.subtitle": "تصفح {count} أداة عبر {categories} تصنيف",
    "tools.sortBy": "ترتيب حسب",
    "tools.highestRated": "الأعلى تقييماً",
    "tools.nameAZ": "الاسم أ-ي",
    "tools.newest": "الأحدث",
    "tools.allPricing": "جميع الأسعار",
    "tools.filterCategory": "التصنيف",
    "tools.filterPricing": "السعر",
    "tools.found": "{count} أداة موجودة",
    "tools.noResults": "لم يتم العثور على أدوات. جرّب تعديل البحث أو الفلاتر.",
    "tools.viewDetails": "عرض التفاصيل",
    "tool.features": "الميزات الرئيسية",
    "tool.pros": "الإيجابيات",
    "tool.cons": "السلبيات",
    "tool.preview": "معاينة",
    "tool.alternatives": "بدائل",
    "tool.relatedTools": "أدوات ذات صلة",
    "tool.visit": "زيارة {name}",
    "tool.updated": "آخر تحديث {date}",
    "tool.tags": "الوسوم",
    "categories.title": "تصفح حسب التصنيف",
    "categories.subtitle": "اعثر على أداة الذكاء الاصطناعي المثالية لاستخدامك المحدد عبر {count} تصنيف",
    "categories.tools": "{count} أداة",
    "categories.noTools": "لا توجد أدوات في هذا التصنيف بعد. عد قريباً أو أضف أداة.",
    "blog.title": "المدونة",
    "blog.subtitle": "أخبار ومراجعات ورؤى حول الذكاء الاصطناعي",
    "blog.readTime": "قراءة",
    "blog.read": "اقرأ",
    "blog.backToBlog": "العودة للمدونة",
    "blog.minRead": "دقيقة قراءة",
    "submit.title": "أضف أداة ذكاء اصطناعي",
    "submit.subtitle": "تعرف على أداة رائعة يجب إضافتها؟ أرسلها هنا وسنراجعها خلال 48 ساعة.",
    "submit.toolName": "اسم الأداة",
    "submit.websiteUrl": "رابط الموقع",
    "submit.description": "الوصف",
    "submit.category": "التصنيف",
    "submit.pricing": "نموذج التسعير",
    "submit.email": "بريدك الإلكتروني",
    "submit.notes": "ملاحظات إضافية",
    "submit.button": "إرسال الأداة",
    "submit.selectCategory": "اختر تصنيفاً",
    "submit.selectPricing": "اختر التسعير",
    "submit.success": "تم استلام الطلب!",
    "submit.successMessage": "شكراً لك على الإرسال. سنراجع أداتك ونعود إليك خلال 48 ساعة.",
    "about.title": "عن الموقع",
    "about.subtitle": "تعرّف على {name} ورسالتنا في مساعدتك في العثور على أفضل أدوات الذكاء الاصطناعي.",
    "about.contact": "تواصل معنا",
    "about.contactMessage": "لديك ملاحظات أو اقتراحات أو تريد التعاون؟ يسعدنا سماعك.",
    "footer.explore": "استكشف",
    "footer.allTools": "جميع الأدوات",
    "footer.freeTools": "أدوات مجانية",
    "footer.paidTools": "أدوات مدفوعة",
    "footer.submitTool": "أضف أداة",
    "footer.categories": "التصنيفات",
    "footer.resources": "المصادر",
    "footer.blog": "المدونة",
    "footer.about": "عن الموقع",
    "footer.contact": "تواصل",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الخدمة",
    "footer.rights": "جميع الحقوق محفوظة.",
    "common.home": "الرئيسية",
    "common.loading": "جارٍ التحميل...",
    "common.error": "حدث خطأ ما",
    "common.back": "رجوع",
    "pricing.free": "مجاني",
    "pricing.freemium": "مجاني جزئياً",
    "pricing.paid": "مدفوع",
    "newsletter.title": "ابقَ أمام منحنى الذكاء الاصطناعي",
    "newsletter.subtitle": "احصل على تحديثات أسبوعية حول أفضل الأدوات الجديدة والمراجعات والرؤى. بدون بريد مزعج، إلغاء الاشتراك في أي وقت.",
    "newsletter.placeholder": "بريدك@email.com",
    "newsletter.subscribe": "اشترك",
    "newsletter.subscribed": "تم الاشتراك! تحقق من بريدك الوارد.",
    "notfound.title": "الصفحة غير موجودة",
    "notfound.subtitle": "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
    "notfound.backHome": "العودة للرئيسية",
    "notfound.browseTools": "تصفح الأدوات",
    // Favorites
    "nav.favorites": "المفضلة",
    "favorites.title": "مفضلاتي",
    "favorites.subtitle": "أدوات الذكاء الاصطناعي المحفوظة",
    "favorites.empty": "لا توجد مفضلات بعد",
    "favorites.emptyCta": "تصفح الأدوات واضغط على أيقونة القلب لحفظ مفضلاتك.",
    "favorites.added": "تمت الإضافة إلى المفضلة",
    "favorites.removed": "تمت الإزالة من المفضلة",
    "favorites.count": "{count} مفضلة",
    "favorites.browseTools": "تصفح الأدوات",
    // Enhanced Search
    "tools.rating": "التقييم",
    "tools.trending": "الأكثر رواجاً",
    "tools.featured": "المميزة",
    "tools.allRatings": "جميع التقييمات",
    "tools.show": "عرض",
    "tools.activeFilters": "{count} فلاتر نشطة",
    "tools.clearAll": "مسح جميع الفلاتر",
    "tools.fourPlus": "4+ نجوم",
    "tools.threePlus": "3+ نجوم",
    "tools.searchPlaceholder": "ابحث عن أدوات بالاسم أو الوصف أو الوسم...",
    "tools.noToolsDescription": "جرّب تعديل البحث أو الفلاتر للعثور على ما تبحث عنه.",
    // Comparison
    "compare.title": "مقارنة الأدوات",
    "compare.subtitle": "قارن حتى 4 أدوات جنبًا إلى جنب",
    "compare.empty": "لا توجد أدوات للمقارنة",
    "compare.emptyCta": "تصفح الأدوات واضغط زر المقارنة لإضافتها هنا.",
    "compare.maxReached": "الحد الأقصى 4 أدوات للمقارنة",
    "compare.addTool": "أضف للمقارنة",
    "compare.clearAll": "مسح المقارنة",
    "compare.compare": "مقارنة",
    "compare.toolCount": "{count} أدوات محددة",
    "compare.description": "الوصف",
    "compare.category": "التصنيف",
    "compare.pricing": "السعر",
    "compare.website": "الموقع",
    "compare.features": "الميزات الرئيسية",
    "compare.pros": "الإيجابيات",
    "compare.cons": "السلبيات",
  },
};

export function t(key: keyof TranslationKeys, locale: Locale = "en", vars?: Record<string, string | number>): string {
  let text = translations[locale][key] || translations.en[key] || key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, String(v));
    });
  }
  return text;
}
