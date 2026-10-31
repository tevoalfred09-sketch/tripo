# موقع TRIPO + تسجيل دخول حقيقي بجوجل

الفولدر ده جاهز للنشر على Vercel كما هو (index.html + فولدر api).
تسجيل الدخول حقيقي: جوجل بيرجّع توكن، والسيرفر (api/google.js) بيتحقق منه مع جوجل
وبعدين بيعمل جلسة آمنة (كوكي HttpOnly موقّع).

## الخطوات
1. Google Cloud Console > APIs & Services > OAuth consent screen: جهّز الشاشة ثم اضغط Publish
   (وهي في وضع Testing بيدخل بس المستخدمين التجريبيين).
2. Credentials > Create credentials > OAuth client ID > Web application.
   في Authorized JavaScript origins حط:
   - https://tripo-swart.vercel.app (أو دومينك الحقيقي)
   - http://localhost:3000 (للتجربة)
   مش محتاج Redirect URI.
3. انسخ الـ Client ID.
4. في Vercel > Project > Settings > Environment Variables أضف:
   - GOOGLE_CLIENT_ID = الـ Client ID
   - SESSION_SECRET = نص عشوائي طويل (شغّل: openssl rand -base64 32)
5. انشر: ارفع الفولدر على Vercel (أو شغّل vercel --prod). Vercel هيثبّت google-auth-library تلقائيًا.

بعد كده: زر الأيقونة في الشريط العلوي بيفتح نافذة "Welcome to TRIPO" فيها زر جوجل الرسمي.
بعد الدخول بتظهر صورة العميل، وبيتملي اسمه وإيميله تلقائيًا في صفحة الـ Checkout.

لو موقعك الحالي على Vercel مبني بـ Next.js، انشر الفولدر ده كمشروع جديد، أو استخدم نسخة Next.js (ملف tripo-google-login.zip).
