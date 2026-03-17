# BlogAI Setup Guide

A complete guide to get this project running on your machine — starting from scratch.

**Most of this setup is guided by Claude Code.** Once you have VS Code open and the project cloned, just type `help me set up this project` in Claude Code and it will check what you need, install what it can, and walk you through the rest step by step.

---

## Table of Contents

- [Before You Start (Manual Steps)](#before-you-start-manual-steps)
- [Getting Started with Claude Code](#getting-started-with-claude-code)
- [What Claude Code Does For You](#what-claude-code-does-for-you)
- [Manual Reference: Create Your Accounts](#manual-reference-create-your-accounts)
  - [Firebase](#firebase)
  - [Stripe](#stripe)
- [Manual Reference: Full Setup Details](#manual-reference-full-setup-details)
- [Verification Checklist](#verification-checklist)
- [Troubleshooting](#troubleshooting)

---

## Before You Start (Manual Steps)

You need three things installed before Claude Code can take over. These require downloading and running installers — Claude Code can't do that part for you.

### 1. Install VS Code

1. Go to [https://code.visualstudio.com](https://code.visualstudio.com)
2. Click **"Download for Windows"**
3. Run the installer — accept all defaults
4. Open VS Code

### 2. Install Git

1. Go to [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Download and run the installer — accept all defaults (just keep clicking **Next**)
3. **Close and reopen VS Code** so the terminal picks up Git

### 3. Install Node.js

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version (the button on the left)
3. Run the installer — accept all defaults
4. **Close and reopen VS Code** so the terminal picks up Node

### 4. Clone the Project

1. Open VS Code
2. Open a terminal (Terminal > New Terminal)
3. Navigate to where you want the project:

```bash
cd ~/Documents
```

4. Clone the repo:

```bash
git clone https://github.com/ben941/saas-boilerplate.git
cd saas-boilerplate
code .
```

VS Code will reopen in the project folder.

---

## Getting Started with Claude Code

If you don't have Claude Code installed yet:

1. Create an account at [https://console.anthropic.com](https://console.anthropic.com) and get an API key
2. In the VS Code terminal, run:

```bash
npm install -g @anthropic-ai/claude-code
```

3. Launch it:

```bash
claude
```

4. Follow the prompts to enter your API key

Now type:

```
help me set up this project
```

Claude Code will take it from here. It reads the project's `CLAUDE.md` file which contains the full onboarding procedure. Here's what happens next.

---

## What Claude Code Does For You

### Automatic (no input needed)

Claude Code handles these steps without you needing to do anything:

- **Checks prerequisites** — verifies Git, Node.js, pnpm, and Stripe CLI are installed
- **Installs pnpm** — runs `npm install -g pnpm` if missing
- **Installs Stripe CLI** — runs `winget install Stripe.StripeCLI` if missing
- **Installs project dependencies** — runs `pnpm install`
- **Creates `.env.local`** — copies from `.env.example` if it doesn't exist
- **Generates cookie secrets** — creates two secure random strings and writes them to `.env.local`
- **Sets the app URL** — writes `NEXT_PUBLIC_APP_URL=http://localhost:3000`
- **Starts the dev server** — runs `pnpm dev`

### Guided (you do it in the browser, paste values to Claude Code)

For these steps, Claude Code tells you exactly what to do in your browser, then you paste the values back and it writes them into `.env.local` for you:

1. **Firebase Client SDK** — you create a Firebase project and register a web app, then paste the `firebaseConfig` object. Claude Code extracts and saves all 6 values.

2. **Firebase Admin SDK** — you generate a service account key (downloads a JSON file), then paste the JSON contents. Claude Code extracts the 3 values it needs.

3. **Firebase Auth & Firestore** — Claude Code reminds you to enable Email/Password and Google sign-in, and to create a Firestore database. (These are a few clicks in the Firebase Console.)

4. **OpenRouter** — you create an account at [openrouter.ai](https://openrouter.ai), generate an API key, and paste it. This powers the AI blog generation (uses Anthropic Claude under the hood).

5. **Stripe API keys** — you copy your test Publishable key and Secret key from the Stripe Dashboard and paste them. Claude Code saves them.

6. **Stripe product** — you create a "Pro Plan" product in Stripe, copy the Price ID, and paste it.

7. **Stripe webhook secret** — Claude Code tells you to run `stripe login` and `stripe listen` in a separate terminal, then paste the webhook secret.

### All config ends up in `.env.local`

Every value is written into a single file: **`.env.local`**. Nothing is hidden in other config files. If you ever need to check or change a value, that's the only place to look.

**This file is safe and private.** The `.gitignore` ignores all `.env*` files except `.env.example` (which only has empty placeholders). Your keys and secrets in `.env.local` will never be committed to GitHub — the template stays clean for other users who clone it.

---

## Manual Reference: Create Your Accounts

You'll need accounts on these services. Create them before or during setup — Claude Code will prompt you when it needs values from each one.

### GitHub

1. Go to [https://github.com](https://github.com) and sign up
2. You only need this to clone the repo (already done if you're reading this)

### Firebase

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Sign in with a Google account
3. Click **"Create a project"** — name it whatever you like (e.g., `blogai-app`)
4. You can disable Google Analytics (not needed)
5. Click **"Create project"** and wait for it to finish

You'll come back to this console during setup when Claude Code asks for your Firebase config values.

### OpenRouter

1. Go to [https://openrouter.ai](https://openrouter.ai) and create an account
2. This is the AI gateway that powers blog generation (it calls Anthropic Claude for you)

### Stripe

1. Go to [https://stripe.com](https://stripe.com) and create an account
2. Make sure **Test mode** is ON (toggle in the top-right corner)
3. You'll use this dashboard during setup when Claude Code asks for your Stripe keys

---

## Manual Reference: Full Setup Details

This section is a detailed reference for each step. You don't need to read all of this upfront — Claude Code will guide you through it. But if you want to understand what's happening or get unstuck, here's the full picture.

### Firebase Client Config

Where to find it: Firebase Console > Project Settings (gear icon) > Your apps > Web app

If you haven't registered a web app yet:
1. Click the web icon (`</>`)
2. Enter a nickname (e.g., `blogai-web`)
3. Skip Firebase Hosting setup
4. Click **Register app**

You'll see a `firebaseConfig` object like this:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

Paste the whole thing to Claude Code. It maps to these `.env.local` values:

| Config key | Env variable |
|-----------|-------------|
| `apiKey` | `NEXT_PUBLIC_FIREBASE_API_KEY` |
| `authDomain` | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` |
| `projectId` | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` |
| `storageBucket` | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` |
| `messagingSenderId` | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` |
| `appId` | `NEXT_PUBLIC_FIREBASE_APP_ID` |

### Firebase Admin (Service Account)

Where to find it: Firebase Console > Project Settings > Service accounts > Generate new private key

This downloads a JSON file. Open it and paste the contents to Claude Code. It extracts:

| JSON key | Env variable |
|---------|-------------|
| `project_id` | `FIREBASE_ADMIN_PROJECT_ID` |
| `client_email` | `FIREBASE_ADMIN_CLIENT_EMAIL` |
| `private_key` | `FIREBASE_ADMIN_PRIVATE_KEY` |

**Important:** The private key in `.env.local` must be wrapped in double quotes with `\n` for newlines.

### Firebase Auth & Firestore

These are quick toggles in the Firebase Console:

**Authentication:**
1. Click **Authentication** in the sidebar > **Get started**
2. Enable **Email/Password** (toggle on, save)
3. Enable **Google** (toggle on, set support email, save)

**Firestore:**
1. Click **Firestore Database** in the sidebar > **Create database**
2. Select **Start in test mode**
3. Pick the closest server location > **Enable**

### OpenRouter (AI Blog Generation)

The blog generator uses [OpenRouter](https://openrouter.ai) to call Anthropic's Claude model. OpenRouter is an API gateway — you get one API key and can access many AI models through it.

1. Go to [https://openrouter.ai](https://openrouter.ai) and create an account
2. Go to [https://openrouter.ai/keys](https://openrouter.ai/keys) and click **"Create Key"**
3. Copy the key (starts with `sk-or-...`)

| Value | Env variable |
|-------|-------------|
| API key | `OPENROUTER_API_KEY` |

**Note:** OpenRouter offers free credits for new accounts. The blog generator uses `anthropic/claude-sonnet-4-20250514` — check [OpenRouter pricing](https://openrouter.ai/models) for current costs.

### Stripe API Keys

Where to find them: Stripe Dashboard > Developers > API keys (make sure Test mode is ON)

| Key | Env variable |
|-----|-------------|
| Publishable key (`pk_test_...`) | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` |
| Secret key (`sk_test_...`) | `STRIPE_SECRET_KEY` |

### Stripe Product & Price

1. Stripe Dashboard > Product catalog > **+ Add product**
2. Name: `Pro Plan` (or whatever you like)
3. Pricing: **Recurring**, $19/month (to match the pricing on the landing page)
4. Save, then copy the **Price ID** (`price_...`)

| Value | Env variable |
|-------|-------------|
| Price ID | `STRIPE_PRO_PRICE_ID` |

### Stripe Webhook Secret (for local testing)

1. Open a **separate terminal** (keep your main terminal free)
2. Run `stripe login` — a browser window opens, click **Allow access**
3. Run `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
4. Copy the webhook signing secret (`whsec_...`)

| Value | Env variable |
|-------|-------------|
| Signing secret | `STRIPE_WEBHOOK_SECRET` |

**Keep that terminal running** while testing payments locally.

### Cookie Secrets

Claude Code generates these automatically. If you need to regenerate manually:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Run it twice — one for `COOKIE_SECRET_CURRENT`, one for `COOKIE_SECRET_PREVIOUS`.

---

## Verification Checklist

After setup is complete, verify everything works:

1. **Landing page** — open http://localhost:3000 — you should see the BlogAI landing page
2. **Theme toggle** — click the sun/moon icon in the navbar
3. **Legal pages** — click "Terms of Service" and "Privacy Policy" in the footer
4. **Sign up** — go to `/signup` and create an account (email/password or Google)
5. **Log in** — go to `/login` and sign in
6. **Dashboard** — after login, you should see the dashboard with the blog generator
7. **Blog generation** — enter a topic, pick a tone, click Generate. The blog post should stream in. Click "Save as Draft" to save it.
8. **Stripe checkout** — on the pricing page, click Subscribe. Use test card: `4242 4242 4242 4242` (any future date, any CVC)

---

## Troubleshooting

### Prerequisites

| Problem | Solution |
|---------|----------|
| `pnpm: command not found` | Run `npm install -g pnpm`, then restart your terminal |
| `git: command not found` | Install Git from https://git-scm.com/download/win, restart VS Code |
| `node: command not found` | Install Node.js LTS from https://nodejs.org, restart VS Code |
| `stripe: command not found` | Run `winget install Stripe.StripeCLI`, restart terminal |

### Running the App

| Problem | Solution |
|---------|----------|
| `ERR_PNPM_NO_IMPORTER_MANIFEST_FOUND` | You're in the wrong folder. `cd` to the folder with `package.json` |
| `Module not found: Can't resolve ...` | Run `pnpm install` again |
| Blank page or console errors | Check `.env.local` — make sure every value is filled in |
| Port 3000 already in use | Run `pnpm dev -- -p 3001` |

### Firebase

| Problem | Solution |
|---------|----------|
| Auth not working | Check that Email/Password and Google are enabled in Firebase Console |
| `FIREBASE_ADMIN_PRIVATE_KEY` errors | Make sure the value is wrapped in double quotes in `.env.local` |
| Firestore permission denied | Make sure you created the database in "test mode" |

### OpenRouter / Blog Generation

| Problem | Solution |
|---------|----------|
| "OpenRouter API key is not configured" | Add `OPENROUTER_API_KEY` to `.env.local` and restart the dev server |
| "Failed to generate blog post" | Check your OpenRouter API key is correct and your account has credits |
| Blog generation is slow | This is normal — the AI model streams the response as it writes |

### Stripe

| Problem | Solution |
|---------|----------|
| Checkout not redirecting | Verify all 4 Stripe env vars are filled in and correct |
| Webhooks not received locally | Make sure `stripe listen` is running in a separate terminal |
| `openssl` not recognized | Use `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` instead |

---

## What's Next?

Your app is fully running! You can generate AI blog posts, save them as drafts, and manage subscriptions through Stripe. Here are some things you could build next with Claude Code:

- Add subscription gating (limit free users to 5 posts/month)
- Build out the `/dashboard/posts` page to list and manage saved posts
- Build out the `/dashboard/settings` page for user profile management
- Add markdown rendering for generated blog posts
- Add export options (copy to clipboard, download as markdown)

Open Claude Code in your terminal to get started:

```bash
claude
```

## Deploy to Vercel (Optional)

When you're ready to go live:

1. Create an account at [https://vercel.com](https://vercel.com) (sign up with GitHub)
2. Click **Add New... > Project** and import your repository
3. Add all your `.env.local` variables to the Vercel Environment Variables section
4. Change `NEXT_PUBLIC_APP_URL` to your Vercel domain (e.g., `https://my-app.vercel.app`)
5. Click **Deploy**

For production Stripe webhooks:
1. Stripe Dashboard > Developers > Webhooks > **Add endpoint**
2. URL: `https://your-app.vercel.app/api/webhooks/stripe`
3. Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copy the new signing secret and update `STRIPE_WEBHOOK_SECRET` in Vercel
