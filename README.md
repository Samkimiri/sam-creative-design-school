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

This app uses the Daraja STK Push flow for M-Pesa payments. To run the integration, add a local environment file with the required M-Pesa credentials.

Create a `.env.local` file at the project root with values like:

```env
MPESA_ENV=sandbox
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_SHORTCODE=your_mpesa_shortcode
MPESA_PASSKEY=your_mpesa_passkey
MPESA_CALLBACK_URL=https://your-public-domain/api/mpesa/callback
MPESA_TRANSACTION_TYPE=CustomerPayBillOnline
```

Important notes:

- `MPESA_ENV` should be `sandbox` for testing, and `production` for live.
- `MPESA_CALLBACK_URL` must be publicly accessible to receive Safaricom callback notifications.
- If you are developing locally, use a tunneling service like `ngrok` or `localtunnel`.
- `MPESA_TRANSACTION_TYPE` defaults to `CustomerPayBillOnline` in code.

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
