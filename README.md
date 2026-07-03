This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## M-Pesa Sandbox / Production Setup

This app uses M-Pesa STK Push for enrollment payments. Students submit their phone number, receive a Safaricom prompt, and an admin approves LMS access from the dashboard after payment is verified.

Create a `.env.local` file at the project root with values like:

```env
MPESA_ENV=sandbox
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_SHORTCODE=
MPESA_TILL_NUMBER=9322260
MPESA_PASSKEY=your_mpesa_passkey
MPESA_CALLBACK_URL=https://your-public-domain/api/mpesa/callback
MPESA_PAYMENT_MODE=buygoods
MPESA_TRANSACTION_TYPE=CustomerBuyGoodsOnline
MPESA_PARTY_B=9322260
MPESA_ACCOUNT_NAME=Sam Creative Design School
```

Important notes:

- `MPESA_ENV` should be `sandbox` for testing, and `production` for live.
- `MPESA_CALLBACK_URL` must be publicly accessible to receive Safaricom callback notifications.
- For extra callback protection, set `MPESA_CALLBACK_SECRET` and include it in the callback URL, for example `https://your-public-domain/api/mpesa/callback?secret=your_secret`.
- If you are developing locally, use a tunneling service like `ngrok` or `localtunnel`.
- For the school Buy Goods Till, use `MPESA_PAYMENT_MODE=buygoods`, `MPESA_TRANSACTION_TYPE=CustomerBuyGoodsOnline`, and set `MPESA_PARTY_B=9322260`.
- If `MPESA_TILL_NUMBER` is set and `MPESA_SHORTCODE` is empty, the app automatically uses Buy Goods mode.

## Backend Database Setup

The app should use a durable backend database in production so enrollments, students, messages, and admin changes survive server restarts.

Supabase is the preferred production database:

1. Create a Supabase project.
2. Open the Supabase SQL editor and run [supabase/schema.sql](supabase/schema.sql).
3. Add these server-side environment variables locally and in Vercel:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

The service role key must stay server-only. Do not expose it with a `NEXT_PUBLIC_` prefix.

Vercel KV is also supported as a durable fallback when Supabase and MongoDB are not configured:

```env
KV_REST_API_URL=your_vercel_kv_rest_url
KV_REST_API_TOKEN=your_vercel_kv_token
```

MongoDB is supported with `MONGODB_URI` or `SCDS_DB_MONGODB_URI`.

When Supabase variables are present, `src/lib/db.ts` reads and writes app collections through Supabase. If Supabase is not configured or a read fails, the app falls back to MongoDB, then Vercel KV, then local JSON files. Local JSON is only suitable for development because hosted filesystems can be read-only or temporary.

## Password Reset Email Setup

Forgot password is handled from the site. A student enters their email, the app creates a one-time reset link plus a 6-digit reset code, and both are emailed automatically when Resend is configured.

Add these server-side variables locally and in Vercel:

```env
RESEND_API_KEY=your_resend_api_key
SCDS_EMAIL_FROM="Sam Creative Design School <support@your-domain.com>"
```

Use a verified Resend sender/domain in production. Reset links and reset codes expire after 30 minutes and can only be used once.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/ deploying) for more details.
