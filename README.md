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

This app uses the Daraja STK Push flow for M-Pesa payments and Flutterwave Standard Checkout for hosted checkout payments. To run the integrations, add a local environment file with the required payment credentials.

Create a `.env.local` file at the project root with values like:

```env
MPESA_ENV=sandbox
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_SHORTCODE=
MPESA_TILL_NUMBER=your_till_number
MPESA_PASSKEY=your_mpesa_passkey
MPESA_CALLBACK_URL=https://your-public-domain/api/mpesa/callback
MPESA_PAYMENT_MODE=buygoods
MPESA_TRANSACTION_TYPE=CustomerBuyGoodsOnline
MPESA_PARTY_B=your_till_number
MPESA_ACCOUNT_NAME=Sam Creative Design School
```

Important notes:

- `MPESA_ENV` should be `sandbox` for testing, and `production` for live.
- `MPESA_CALLBACK_URL` must be publicly accessible to receive Safaricom callback notifications.
- For extra callback protection, set `MPESA_CALLBACK_SECRET` and include it in the callback URL, for example `https://your-public-domain/api/mpesa/callback?secret=your_secret`.
- If you are developing locally, use a tunneling service like `ngrok` or `localtunnel`.
- For a Buy Goods Till, use `MPESA_PAYMENT_MODE=buygoods`, `MPESA_TRANSACTION_TYPE=CustomerBuyGoodsOnline`, and set `MPESA_PARTY_B` to the Till number.
- If `MPESA_TILL_NUMBER` is set and `MPESA_SHORTCODE` is empty, the app automatically uses Buy Goods mode.

## Flutterwave Setup

Add these values locally and in Vercel when you want Flutterwave checkout enabled:

```env
FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key
FLUTTERWAVE_CURRENCY=KES
FLUTTERWAVE_REDIRECT_URL=https://your-public-domain/api/flutterwave/callback
FLUTTERWAVE_WEBHOOK_SECRET_HASH=your_flutterwave_webhook_secret_hash
FLUTTERWAVE_PAYMENT_OPTIONS=card
FLUTTERWAVE_TITLE=Sam Creative Design School
FLUTTERWAVE_LOGO_URL=https://your-public-logo-url/logo.png
```

Flutterwave payments redirect students to a hosted checkout link. `FLUTTERWAVE_PAYMENT_OPTIONS=card` focuses checkout on card payments. After payment, `/api/flutterwave/callback` verifies the transaction before confirming the enrollment.

## Supabase Database Setup

The app can use Supabase as the primary production database while keeping the current MongoDB/local JSON fallback for development.

1. Create a Supabase project.
2. Open the Supabase SQL editor and run [supabase/schema.sql](supabase/schema.sql).
3. Add these server-side environment variables locally and in Vercel:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

The service role key must stay server-only. Do not expose it with a `NEXT_PUBLIC_` prefix.

When these variables are present, `src/lib/db.ts` reads and writes app collections through Supabase. If Supabase is not configured or a read fails, the app falls back to MongoDB and then local JSON files.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/ deploying) for more details.
