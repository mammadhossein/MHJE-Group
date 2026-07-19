# mh-jo-api — Backend for MH × JO Website

یک بک‌اند کوچک، سریع و آماده‌ی دیپلوی برای دریافت فرم‌های سایت.
وقتی کاربری فرم «Send Request» یا «Submit Project» را پر می‌کند، اطلاعات:

1. در فایل `data/submissions.json` ذخیره می‌شود (به‌عنوان پشتیبان).
2. بلافاصله از طریق **ربات تلگرام** به شما ارسال می‌شود.
3. (اختیاری) یک ایمیل هم به شما ارسال می‌شود.

---

## 🧩 امکانات

- ✅ REST API با اعتبارسنجی Zod
- ✅ ارسال نوتیفیکیشن به تلگرام (اصلی) + ایمیل (اختیاری)
- ✅ ذخیره‌سازی محلی فایل JSON (بدون نیاز به دیتابیس)
- ✅ Rate limiting (جلوگیری از اسپم)
- ✅ Helmet + CORS امنیتی
- ✅ Admin endpoints برای لیست/حذف submissions
- ✅ بدون وابستگی خارجی (نیاز فقط به Node ≥ 18)

---

## 🚀 راه‌اندازی سریع (محلی)

### ۱) ساخت ربات تلگرام

1. در تلگرام باز کنید `@BotFather` → دستور `/newbot` → یک نام انتخاب کنید → **توکن** را کپی کنید.
2. باز کنید `@userinfobot` → یک پیام بفرستید → **chat id** خودتان را کپی کنید (عدد).

### ۲) تنظیم متغیرهای محیطی

```bash
cd server
cp .env.example .env
```

فایل `.env` را باز کنید و مقادیر را پر کنید:

```env
PORT=4000
CORS_ORIGIN=http://localhost:5173

TELEGRAM_BOT_TOKEN=1234567890:AAxxxxxxxxxxxxxxxxxxxxxxxxxxx
TELEGRAM_CHAT_ID=123456789

# (اختیاری) ایمیل
EMAIL_TO=you@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@gmail.com
SMTP_PASS=your-app-password   # نه پسورد اصلی!

ADMIN_KEY=یک-رشته-بلند-تصادفی-برای-امنیت
```

### ۳) نصب و اجرا

```bash
cd server
npm install
npm run dev          # توسعه (auto-reload)
# یا
npm start            # پروداکشن
```

بک‌اند روی `http://localhost:4000` اجرا می‌شود.

---

## 🧪 تست سریع

### ثبت یک submission

```bash
curl -X POST http://localhost:4000/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "source": "MH",
    "name": "John Doe",
    "email": "john@example.com",
    "projectType": "Network Setup",
    "description": "Need to set up a new office network for 30 people."
  }'
```

پاسخ موفق:

```json
{
  "ok": true,
  "message": "Your request has been received. We'll contact you soon.",
  "id": "xxxx-xxxx",
  "delivered": { "telegram": true, "email": false }
}
```

### بررسی وضعیت سرویس

```bash
curl http://localhost:4000/api/health
```

### لیست submissions (نیاز به ADMIN_KEY)

```bash
curl http://localhost:4000/api/submissions \
  -H "X-Admin-Key: یک-رشته-بلند-تصادفی-برای-امنیت"
```

### حذف یک submission

```bash
curl -X DELETE http://localhost:4000/api/submissions/xxxx-xxxx \
  -H "X-Admin-Key: یک-رشته-بلند-تصادفی-برای-امنیت"
```

---

## 🌐 دیپلوی روی Render (رایگان)

1. یک repo جدید روی GitHub بسازید که فقط شامل پوشه‌ی `server/` باشد، یا کل پروژه را push کنید.
2. در [Render](https://render.com) → **New Web Service** → repo را انتخاب کنید.
3. تنظیمات:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. در بخش **Environment Variables** همه‌ی متغیرهای `.env` را اضافه کنید (حداقل: `TELEGRAM_BOT_TOKEN`، `TELEGRAM_CHAT_ID`، `ADMIN_KEY`، `CORS_ORIGIN`).
5. `CORS_ORIGIN` را برابر دامنه‌ی فرانت بگذارید: `https://your-site.vercel.app`
6. **Create Web Service** → صبر کنید تا دیپلوی شود.
7. آدرس سرویس چیزی مثل `https://mh-jo-api.onrender.com` خواهد بود.

> Render رایگان بعد از ۱۵ دقیقه عدم فعالیت، سرویس را به خواب می‌برد. برای استفاده‌ی واقعی پلن پولی (۷$/ماه) یا جایگزین مثل Railway/Fly.io پیشنهاد می‌شود.

---

## 🎯 اتصال به سایت فرانت‌اند

در ریشه‌ی پروژه‌ی فرانت، فایل `.env` بسازید:

```env
VITE_API_URL=https://mh-jo-api.onrender.com
```

سایت به‌صورت خودکار از این متغیر استفاده می‌کند. اگر تنظیم نشده باشد، در حالت **دمو** کار می‌کند (پیام موفقیت نمایشی، بدون ارسال واقعی).

---

## 🔐 امنیت

- Rate limiting: هر IP حداکثر ۲۰ درخواست در ۱۵ دقیقه.
- CORS فقط برای originهای مشخص‌شده در `CORS_ORIGIN` فعال است.
- Endpointهای admin نیاز به هدر `X-Admin-Key` دارند.
- Helmet security headers فعال است.
- اعتبارسنجی کامل ورودی با Zod.

---

## 🗂 ساختار پروژه

```
server/
├── .env.example
├── package.json
├── README.md
└── src/
    ├── index.js                 # Entry point
    ├── config/
    │   └── env.js               # Environment config
    ├── controllers/
    │   └── submissions.js       # Business logic
    ├── routes/
    │   └── submissions.js       # Route definitions
    ├── middleware/
    │   ├── validate.js          # Zod schemas
    │   ├── rateLimit.js         # Rate limiters
    │   └── errorHandler.js     # Error + auth middleware
    ├── services/
    │   ├── store.js             # JSON file storage
    │   ├── telegram.js          # Telegram notifier
    │   └── email.js             # Email notifier
    └── utils/
        └── logger.js
```

---

## 🔄 تعویض JSON store با دیتابیس واقعی

`services/store.js` را با یک درایور Postgres/MySQL/Mongo جایگزین کنید — فقط تابع‌های `append`، `list`، `remove`، `count` را پیاده‌سازی کنید.

---

## 📬 نمونه پیام تلگرام

```
🔔 New Submission — MH Network Services

👤 Name: John Doe
✉️ Email: john@example.com
🏷 Service: Network Setup

💬 Message:
Need to set up a new office network for 30 people.

⏱ At: 2026-01-15T10:30:00.000Z
🌐 IP: 1.2.3.4
```
