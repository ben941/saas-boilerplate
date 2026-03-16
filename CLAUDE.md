# BlogAI - AI Blog Generator SaaS Boilerplate

## Project Overview
SaaS boilerplate for an AI-powered blog generator. Built as a teaching tool
for a Claude Code course. Students clone this template and build out the
AI blog generation feature during the course.

## Tech Stack
- **Framework:** Next.js 15 (App Router) with TypeScript
- **Auth:** Firebase Authentication (Google + email/password)
- **Database:** Cloud Firestore
- **Payments:** Stripe Checkout + Subscriptions + Webhooks
- **Email:** Firebase "Trigger Email from Firestore" extension (via SendGrid)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Deployment:** Vercel
- **Theme:** Dark/light/system mode via next-themes

## Project Structure
```
src/
  app/              Next.js App Router pages and API routes
    (auth)/         Login and signup pages
    (dashboard)/    Protected dashboard pages
    (legal)/        Terms of Service and Privacy Policy
    api/            API routes (Stripe webhooks)
  components/
    ui/             shadcn/ui components (auto-generated)
    auth/           Authentication form components
    landing/        Landing page sections (navbar, hero, pricing, footer)
    dashboard/      Dashboard components (sidebar, header, blog-generator)
    providers.tsx   App-wide providers (Theme + Auth)
    theme-toggle.tsx  Dark/light mode toggle
  lib/
    firebase/       Firebase client + admin SDK setup
    stripe/         Stripe client + server + checkout + webhooks
    firestore/      Firestore CRUD helpers (users, posts, mail)
    utils.ts        Shared utilities (cn function)
  hooks/            Custom React hooks (useAuth)
  context/          React context providers (AuthContext)
  types/            TypeScript type definitions
  middleware.ts     Auth middleware (next-firebase-auth-edge)
```

## Key Architecture
- Firebase Client SDK (`lib/firebase/client.ts`) = browser only
- Firebase Admin SDK (`lib/firebase/admin.ts`) = server only (uses `server-only` guard)
- Stripe webhooks at `app/api/webhooks/stripe/route.ts` (raw body for signature verification)
- Stripe checkout via server action in `lib/stripe/checkout.ts`
- Auth middleware protects `/dashboard/*` routes, redirects to `/login`
- Welcome emails via Firestore `mail` collection (Firebase extension handles sending)

## Commands
- `pnpm dev` -- Start dev server (Turbopack)
- `pnpm build` -- Production build
- `pnpm start` -- Start production server
- `pnpm lint` -- Run ESLint
- `pnpm format` -- Run Prettier

## Environment Variables
Copy `.env.example` to `.env.local` and fill in values.
See `.env.example` for documentation of each variable.

## Conventions
- Client components use `"use client"` directive
- Server-only modules use `import "server-only"` guard
- shadcn/ui components in `src/components/ui/`
- Feature components grouped by domain (auth/, landing/, dashboard/)
- All imports use `@/` path alias
- Use `cn()` from `lib/utils` for conditional class merging
- Add new shadcn components: `pnpm dlx shadcn@latest add [component-name]`

## Common Tasks
- **Add a page:** Create folder in `src/app/` following App Router conventions
- **Add a Firestore collection:** Add types in `types/firebase.ts`, helpers in `lib/firestore/`
- **Protect a route:** Add path pattern to `middleware.ts`
- **Add a shadcn component:** `pnpm dlx shadcn@latest add [name]`
- **Add a Stripe product:** Create in Stripe Dashboard, update STRIPE_PRO_PRICE_ID env var

## Current Sprint
Students will build out the AI blog generation feature using the Anthropic API.
The blog-generator.tsx component is a stub ready to be wired up.
