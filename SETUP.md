# BlogAI Setup Guide (Windows)

A complete step-by-step guide to get this project running on your machine — starting from scratch.

---

## Table of Contents

- [Prerequisites](#prerequisites)
  - [1. Install VS Code](#1-install-vs-code)
  - [2. Install Git](#2-install-git)
  - [3. Install Node.js](#3-install-nodejs)
  - [4. Install pnpm](#4-install-pnpm)
  - [5. Create a GitHub Account](#5-create-a-github-account)
  - [6. Install Claude Code](#6-install-claude-code)
- [Step 1: Clone the Repository](#step-1-clone-the-repository)
- [Step 2: Firebase Setup](#step-2-firebase-setup)
- [Step 3: Stripe Setup](#step-3-stripe-setup)
- [Step 4: Environment Variables](#step-4-environment-variables)
- [Step 5: Run the App](#step-5-run-the-app)
- [Step 6: Deploy to Vercel (Optional)](#step-6-deploy-to-vercel-optional)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

These are the tools you need installed before starting. If you already have any of these, skip to the next one.

### 1. Install VS Code

VS Code is the code editor we'll use throughout the course.

1. Go to [https://code.visualstudio.com](https://code.visualstudio.com)
2. Click **"Download for Windows"**
3. Run the installer — accept all defaults
4. Open VS Code once installed

**Recommended Extensions** — open VS Code, click the Extensions icon (square icon on the left sidebar), and search for + install each:

- **ES7+ React/Redux/React-Native snippets** — quick code shortcuts
- **Tailwind CSS IntelliSense** — autocomplete for Tailwind classes
- **Prettier - Code formatter** — auto-formats your code on save
- **GitLens** — enhanced Git integration

> **Checkpoint:** You should be able to open VS Code and see the Welcome tab.

---

### 2. Install Git

Git is the version control system that tracks your code changes.

1. Go to [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Download and run the installer
3. Use all the default options — just keep clicking **Next** then **Install**
4. Once installed, open a **new terminal** in VS Code (Terminal > New Terminal) and run:

```bash
git --version
```

You should see something like `git version 2.x.x`.

5. Configure your identity (replace with your name and email):

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

> **Checkpoint:** `git --version` shows a version number in the VS Code terminal.

---

### 3. Install Node.js

Node.js lets you run JavaScript outside of a browser — it powers the dev server and build tools.

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version (the one on the left, recommended for most users)
3. Run the installer — accept all defaults
4. **Close and reopen VS Code** (so the terminal picks up the new installation)
5. In the terminal, verify it worked:

```bash
node --version
```

You should see something like `v20.x.x` or higher.

> **Checkpoint:** `node --version` returns a version number.

---

### 4. Install pnpm

pnpm is a fast package manager (like npm, but better). This project uses pnpm.

1. In your VS Code terminal, run:

```bash
npm install -g pnpm
```

2. Verify it installed:

```bash
pnpm --version
```

You should see a version number like `10.x.x`.

> **Checkpoint:** `pnpm --version` returns a version number.

---

### 5. Create a GitHub Account

GitHub hosts your code and lets you collaborate with others.

1. Go to [https://github.com](https://github.com)
2. Click **"Sign up"** and follow the steps
3. Verify your email address

> **Checkpoint:** You can log in to github.com and see your dashboard.

---

### 6. Install Claude Code

Claude Code is the AI coding assistant you'll use throughout this course.

1. You need an Anthropic API key. Go to [https://console.anthropic.com](https://console.anthropic.com), create an account, and generate an API key.
2. In your VS Code terminal, run:

```bash
npm install -g @anthropic-ai/claude-code
```

3. Verify it installed:

```bash
claude --version
```

4. Launch Claude Code and follow the prompts to enter your API key:

```bash
claude
```

> **Checkpoint:** Running `claude` opens the Claude Code interface in your terminal.

---

## Step 1: Clone the Repository

Now we'll get the project code onto your computer.

### Option A: Use the GitHub Template (Recommended)

1. Go to the course template repository (your instructor will provide the link)
2. Click the green **"Use this template"** button
3. Click **"Create a new repository"**
4. Give it a name (e.g., `my-blogai-app`)
5. Make sure **Public** is selected
6. Click **"Create repository"**

Now clone YOUR new repo:

1. On your new repo page, click the green **"Code"** button
2. Copy the HTTPS URL
3. Open VS Code
4. Open a terminal (Terminal > New Terminal)
5. Navigate to where you want the project (e.g., your Documents folder):

```bash
cd ~/Documents
```

6. Clone the repo (replace the URL with yours):

```bash
git clone https://github.com/YOUR-USERNAME/my-blogai-app.git
```

7. Open the project in VS Code:

```bash
cd my-blogai-app
code .
```

### Option B: Clone Directly

If your instructor gave you a direct repo URL:

```bash
cd ~/Documents
git clone https://github.com/ben941/saas-boilerplate.git
cd saas-boilerplate
code .
```

### Install Dependencies

Once the project is open in VS Code, open a terminal and run:

```bash
pnpm install
```

This downloads all the packages the project needs. It may take a minute or two.

> **Checkpoint:** You should see a `node_modules` folder appear in the file explorer on the left. No errors in the terminal.

---

## Step 2: Firebase Setup

Firebase handles user authentication (login/signup) and the database.

### Create a Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Sign in with your Google account (create one at [https://accounts.google.com](https://accounts.google.com) if needed)
3. Click **"Create a project"** (or "Add project")
4. Enter a project name (e.g., `blogai-app`)
5. You can disable Google Analytics (it's not needed for this project)
6. Click **"Create project"** and wait for it to finish
7. Click **"Continue"**

### Enable Authentication

1. In the Firebase Console sidebar, click **"Authentication"**
2. Click **"Get started"**
3. Under **Sign-in method**, click **"Email/Password"**
   - Toggle **"Enable"** to ON
   - Click **"Save"**
4. Go back to Sign-in method, click **"Google"**
   - Toggle **"Enable"** to ON
   - Enter your email as the **Project support email**
   - Click **"Save"**

> **Checkpoint:** You should see both Email/Password and Google listed as "Enabled" in the Sign-in providers list.

### Create the Firestore Database

1. In the Firebase Console sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in test mode"** (we'll add security rules later)
4. Choose the closest server location to you
5. Click **"Enable"**

> **Checkpoint:** You should see an empty Firestore database with the "Start collection" button.

### Get Your Firebase Client Config

These values go in your `.env.local` file.

1. In the Firebase Console, click the **gear icon** (⚙️) next to "Project Overview" in the sidebar
2. Click **"Project settings"**
3. Scroll down to **"Your apps"**
4. If you don't see a web app, click the **web icon** (`</>`) to register one:
   - Enter an app nickname (e.g., `blogai-web`)
   - You do NOT need to set up Firebase Hosting
   - Click **"Register app"**
5. You'll see a `firebaseConfig` object. Copy these values — you'll need them soon:

```
apiKey: "AIza..."
authDomain: "your-project.firebaseapp.com"
projectId: "your-project-id"
storageBucket: "your-project.firebasestorage.app"
messagingSenderId: "123456789"
appId: "1:123456789:web:abc123"
```

Keep this page open — you'll paste these into your `.env.local` file in Step 4.

### Get Your Firebase Admin (Service Account) Credentials

These are used by the server to securely access Firebase.

1. In **Project settings**, click the **"Service accounts"** tab
2. Click **"Generate new private key"**
3. Click **"Generate key"** — this downloads a JSON file
4. Open the downloaded JSON file in VS Code or Notepad
5. You'll need these three values from the file:
   - `project_id` → for `FIREBASE_ADMIN_PROJECT_ID`
   - `client_email` → for `FIREBASE_ADMIN_CLIENT_EMAIL`
   - `private_key` → for `FIREBASE_ADMIN_PRIVATE_KEY` (the entire string including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)

**Important:** Keep this JSON file safe and NEVER commit it to GitHub. It contains secret credentials.

> **Checkpoint:** You have 6 client config values and 3 service account values ready to go.

---

## Step 3: Stripe Setup

Stripe handles payments and subscriptions.

### Create a Stripe Account

1. Go to [https://stripe.com](https://stripe.com)
2. Click **"Start now"** and create an account
3. You can stay in **Test Mode** for development (no real money involved)

### Get Your API Keys

1. In the Stripe Dashboard, make sure **"Test mode"** is toggled ON (top right)
2. Click **"Developers"** in the top navigation
3. Click **"API keys"**
4. You'll see two keys:
   - **Publishable key** (`pk_test_...`) → for `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** (click "Reveal" to see it, `sk_test_...`) → for `STRIPE_SECRET_KEY`

### Create a Product and Price

1. In the Stripe Dashboard, go to **"Product catalog"** (in the sidebar)
2. Click **"+ Add product"**
3. Fill in:
   - **Name:** `Pro Plan` (or whatever you want)
   - **Pricing:** Select **"Recurring"**
   - **Amount:** e.g., `$9.99`
   - **Billing period:** Monthly
4. Click **"Save product"**
5. On the product page, find the **Price** section
6. Copy the **Price ID** (starts with `price_...`) → for `STRIPE_PRO_PRICE_ID`

### Install the Stripe CLI (for Webhook Testing)

The Stripe CLI lets you test payment webhooks locally.

1. Open a terminal and run:

```bash
winget install Stripe.StripeCLI
```

If `winget` doesn't work, download it manually from [https://docs.stripe.com/stripe-cli](https://docs.stripe.com/stripe-cli).

2. **Close and reopen your terminal**, then log in:

```bash
stripe login
```

This opens a browser window — click **"Allow access"** to connect.

3. Start forwarding webhooks to your local app:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

4. You'll see a line like:

```
Your webhook signing secret is whsec_1234abcd...
```

Copy that value → for `STRIPE_WEBHOOK_SECRET`

**Note:** Keep this terminal running whenever you're testing payments locally. Open a new terminal for other commands.

> **Checkpoint:** You have a publishable key, secret key, price ID, and webhook secret.

---

## Step 4: Environment Variables

Now we connect everything together.

### Copy the Example File

In your VS Code terminal:

```bash
cp .env.example .env.local
```

Or manually: right-click `.env.example` in the file explorer, copy it, and rename the copy to `.env.local`.

### Generate Cookie Secrets

These are used to securely sign auth cookies. Open a terminal and run this command **twice** (you need two different secrets):

```bash
openssl rand -base64 32
```

If `openssl` isn't available on your system, you can use Node.js instead:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Run it twice and save both outputs.

### Fill in Your Values

Open `.env.local` in VS Code and fill in every value:

```env
# ======================
# Firebase Client SDK
# ======================
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# ======================
# Firebase Admin SDK
# ======================
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...your-key...\n-----END PRIVATE KEY-----\n"

# ======================
# Stripe
# ======================
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...

# ======================
# App
# ======================
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ======================
# Cookie Secrets
# ======================
COOKIE_SECRET_CURRENT=your-first-generated-secret
COOKIE_SECRET_PREVIOUS=your-second-generated-secret
```

**Important notes:**
- The `FIREBASE_ADMIN_PRIVATE_KEY` must be wrapped in **double quotes** and have `\n` for newlines
- Don't add spaces around the `=` signs
- Don't commit `.env.local` to Git — it's already in `.gitignore`

> **Checkpoint:** Every line in `.env.local` has a value filled in. No empty values remain.

---

## Step 5: Run the App

You're ready to start the development server!

### Start the Dev Server

In your VS Code terminal:

```bash
pnpm dev
```

You should see output like:

```
  ▲ Next.js 15.x.x (Turbopack)
  - Local:   http://localhost:3000
```

### Open in Your Browser

Go to [http://localhost:3000](http://localhost:3000)

### Verify Everything Works

1. **Landing page** — You should see the BlogAI landing page with a hero section, pricing cards, and footer
2. **Theme toggle** — Click the sun/moon icon in the navbar to switch between light and dark mode
3. **Terms & Privacy** — Scroll down, click "Terms of Service" or "Privacy Policy" in the footer — these pages should load
4. **Sign up** — Click "Get Started" or navigate to `/signup`. Create an account using email/password or Google
5. **Log in** — After signing up, log in at `/login`
6. **Dashboard** — After logging in, you should be redirected to the dashboard with the blog generator stub
7. **Stripe checkout** — On the pricing page, click a "Subscribe" button. You should be redirected to a Stripe checkout page. Use Stripe's test card: `4242 4242 4242 4242` (any future date, any CVC)

> **Checkpoint:** You can see the landing page, sign up, log in, access the dashboard, and see the Stripe checkout page.

---

## Step 6: Deploy to Vercel (Optional)

Vercel makes it easy to deploy your app to a live URL.

### Create a Vercel Account

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** — this connects your repos

### Deploy the Project

1. Click **"Add New..."** > **"Project"**
2. Find your repository in the list and click **"Import"**
3. Under **"Environment Variables"**, add every variable from your `.env.local` file
   - Click **"Add"** for each key/value pair
   - Make sure to include all Firebase, Stripe, cookie secrets, and app URL values
4. **Update `NEXT_PUBLIC_APP_URL`** to your Vercel domain (e.g., `https://my-blogai-app.vercel.app`)
5. Click **"Deploy"**

### Update Stripe Webhook for Production

Your local `stripe listen` command only works for `localhost`. For production:

1. Go to Stripe Dashboard > **Developers** > **Webhooks**
2. Click **"Add endpoint"**
3. Enter your Vercel URL: `https://your-app.vercel.app/api/webhooks/stripe`
4. Under **Events to send**, select:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Click **"Add endpoint"**
6. Copy the new **Signing secret** and update `STRIPE_WEBHOOK_SECRET` in your Vercel environment variables

> **Checkpoint:** Your app is live at a `.vercel.app` URL and you can sign up and subscribe.

---

## Troubleshooting

### `pnpm: command not found`
You need to install pnpm first. Run `npm install -g pnpm`, then close and reopen your terminal.

### `ERR_PNPM_NO_IMPORTER_MANIFEST_FOUND`
You're in the wrong folder. Make sure you're in the project root (the folder with `package.json`). Use `cd` to navigate there.

### The app starts but the page is blank or shows errors
Check your `.env.local` file. Make sure every value is filled in and there are no typos. The app needs Firebase and Stripe configured to work fully.

### `Module not found: Can't resolve ...`
Run `pnpm install` again to make sure all dependencies are installed.

### Firebase Auth not working
- Make sure Email/Password and Google sign-in are **enabled** in Firebase Console > Authentication > Sign-in method
- Double-check your `NEXT_PUBLIC_FIREBASE_*` values match the Firebase Console
- Make sure `FIREBASE_ADMIN_PRIVATE_KEY` is wrapped in double quotes in `.env.local`

### Stripe checkout not redirecting
- Make sure `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` are correct
- Make sure `STRIPE_PRO_PRICE_ID` matches an actual price in your Stripe Dashboard
- Check that you're in **Test Mode** in Stripe

### Port 3000 already in use
Another process is using port 3000. Either close it or run on a different port:
```bash
pnpm dev -- -p 3001
```

### `openssl` not recognized
Use the Node.js alternative instead:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Stripe CLI: `stripe: command not found`
Close and reopen your terminal after installing. If it still doesn't work, try reinstalling with:
```bash
winget install Stripe.StripeCLI
```

---

## What's Next?

Your boilerplate is running! The **blog generator** on the dashboard is a stub — this is what you'll build out during the course using Claude Code and the Anthropic API.

Open Claude Code in your terminal to get started:

```bash
claude
```
