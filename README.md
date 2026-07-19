# MH × JO — Dual-Landing Website + Backend API

یک سایت دو-صفحه‌ای حرفه‌ای با بک‌اند کامل API.
وقتی کاربری فرم «Send Request» یا «Submit Project» را پر می‌کند، اطلاعات بلافاصله از طریق **ربات تلگرام** (و به‌صورت اختیاری ایمیل) به شما ارسال می‌شود.

---

## 📦 ساختار پروژه

```
.
├── src/                    # فرانت‌اند React + Vite + Tailwind
│   ├── components/         # کامپوننت‌های مشترک (Logo, Header, Footer, Toast, Icons, …)
│   ├── pages/              # سه صفحه: Landing, MHPage, JOPage
│   ├── lib/api.ts          # کلاینت API (با fallback به حالت دمو)
│   └── App.tsx             # مسیریابی ساده (hash-based)
├── server/                 # بک‌اند Express (API کامل)
│   ├── src/
│   │   ├── index.js        # Entry point
│   │   ├── config/env.js
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/      # validate (Zod), rateLimit, errorHandler, admin auth
│   │   ├── services/        # store (JSON), telegram, email (nodemailer)
│   │   └── utils/logger.js
│   ├── .env.example
│   └── README.md           # راهنمای کامل بک‌اند
├── .env.example            # متغیرهای محیطی فرانت
└── package.json
```

---

## ⚡ راه‌اندازی سریع (۵ دقیقه)

### مرحله ۱ — ساخت ربات تلگرام

1. در تلگرام `@BotFather` را باز کنید → `/newbot` → یک نام انتخاب کنید → **توکن** را کپی کنید.
2. `@userinfobot` را باز کنید → یک پیام بفرستید → **chat id** خود را کپی کنید (یک عدد).

### مرحله ۲ — راه‌اندازی بک‌اند

```bash
cd server
cp .env.example .env
```

مقادیر ضروری در `.env`:

```env
PORT=4000
CORS_ORIGIN=http://localhost:5173
TELEGRAM_BOT_TOKEN=1234567890:AAxxxx...
TELEGRAM_CHAT_ID=123456789
ADMIN_KEY=یک-رشته-بلند-تصادفی
```

نصب و اجرا:

```bash
npm install
npm run dev     # http://localhost:4000
```

تست سریع:

```bash
curl -X POST http://localhost:4000/api/submissions \
  -H "Content-Type: application/json" \
  -d '{"source":"MH","name":"Test","email":"t@t.com","projectType":"Network Setup","description":"Testing the API."}'
```

اگر درست تنظیم شده باشد، بلافاصله یک پیام تلگرام دریافت می‌کنید ✅

### مرحله ۳ — اتصال فرانت به بک‌اند

در ریشه‌ی پروژه:

```bash
cp .env.example .env
```

مقدار `VITE_API_URL` را تنظیم کنید:

```env
VITE_API_URL=http://localhost:4000
```

اجرای فرانت:

```bash
npm install
npm run dev     # http://localhost:5173
```

حالا هر فرمی که در سایت پر شود، مستقیماً به تلگرام شما ارسال می‌شود.

> 💡 اگر `VITE_API_URL` خالی بماند، سایت در **حالت دمو** کار می‌کند — فرم‌ها به‌صورت نمایشی ارسال می‌شوند و پیامی به شما نمی‌رسد. در این حالت یک toast نمایش می‌دهد: «Demo mode — backend not connected».

---

## 🌐 دیپلوی پروداکشن

### بک‌اند (روی Render یا Railway)

1. کد را به GitHub push کنید.
2. در [Render](https://render.com) → **New Web Service** → repo را انتخاب کنید.
3. تنظیمات:
   - **Root Directory:** `server`
   - **Build:** `npm install`
   - **Start:** `npm start`
4. متغیرهای محیطی را اضافه کنید (حداقل: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `ADMIN_KEY`, `CORS_ORIGIN`).
5. `CORS_ORIGIN` را برابر دامنه‌ی فرانت بگذارید: `https://your-site.vercel.app`

### فرانت (روی Vercel یا Netlify)

1. repo را در Vercel/Netlify import کنید.
2. متغیر محیطی `VITE_API_URL` را برابر آدرس بک‌اند دیپلوی‌شده بگذارید.
3. دیپلوی!

---

## 🔌 API Reference

### `POST /api/submissions`

دریافت یک فرم.

**Body (MH):**
```json
{
  "source": "MH",
  "name": "John Doe",
  "email": "john@example.com",
  "projectType": "Network Setup",
  "description": "Need office network for 30 people."
}
```

**Body (JO):**
```json
{
  "source": "JO",
  "name": "Jane",
  "email": "jane@brand.com",
  "videoType": "Cinematic Editing",
  "fileLink": "https://drive.google.com/...",
  "description": "90-second brand film, deadline Friday."
}
```

**Response 201:**
```json
{
  "ok": true,
  "message": "Your request has been received. We'll contact you soon.",
  "id": "uuid",
  "delivered": { "telegram": true, "email": false }
}
```

**Response 400 (validation error):**
```json
{
  "ok": false,
  "error": "Validation failed",
  "issues": [{ "path": "email", "message": "Please enter a valid email" }]
}
```

**Response 429 (rate limit):**
```json
{ "ok": false, "error": "Too many requests. Please try again later." }
```

### `GET /api/health`

```json
{ "ok": true, "service": "mh-jo-api", "timestamp": "...", "uptime": 1234.5 }
```

### `GET /api/submissions` (admin)

نیاز به هدر `X-Admin-Key: <ADMIN_KEY>`.

```bash
curl -H "X-Admin-Key: your-admin-key" http://localhost:4000/api/submissions?limit=50
```

### `DELETE /api/submissions/:id` (admin)

```bash
curl -X DELETE -H "X-Admin-Key: your-admin-key" http://localhost:4000/api/submissions/uuid
```

---

## 📱 نمونه پیام تلگرام

وقتی فرمی پر می‌شود، پیامی شبیه این در تلگرام شما ظاهر می‌شود:

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

---

## 🔐 امنیت

- ✅ **Rate limiting:** هر IP حداکثر ۲۰ درخواست در ۱۵ دقیقه (قابل تنظیم در `.env`).
- ✅ **CORS:** فقط originهای مجاز در `CORS_ORIGIN`.
- ✅ **Admin auth:** Endpointهای لیست/حذف نیاز به `X-Admin-Key` دارند.
- ✅ **Helmet:** security headers روی همه‌ی پاسخ‌ها.
- ✅ **Zod validation:** اعتبارسنجی کامل ورودی (نام، ایمیل، طول متن، فرمت URL).
- ✅ **Input sanitization:** HTML escape در پیام‌های تلگرام و ایمیل.

---

## 🧩 تغییرات/سفارشی‌سازی

### تغییر متن پیام تلگرام
`server/src/services/telegram.js` → تابع `buildTelegramMessage`.

### اضافه کردن کانال نوتیفیکیشن جدید (مثلاً Discord/Slack webhook)
یک فایل جدید در `server/src/services/` بسازید و در `controllers/submissions.js` به `Promise.allSettled` اضافه کنید.

### استفاده از دیتابیس واقعی به‌جای JSON file
`server/src/services/store.js` را با درایور Postgres/MySQL/Mongo جایگزین کنید.

### تغییر محدودیت rate limit
در `server/.env`:
```env
RATE_LIMIT_WINDOW_MS=3600000   # 1 hour
RATE_LIMIT_MAX=10              # 10 per hour
```

---

## 🛠 پشته‌ی فنی

**فرانت:**
- React 19, Vite 7, Tailwind CSS 4
- TypeScript

**بک‌اند:**
- Node.js ≥ 18
- Express 4
- Zod (validation)
- express-rate-limit, helmet, cors
- nodemailer (optional email)

---

## 📄 لایسنس

MIT — استفاده‌ی آزاد.
