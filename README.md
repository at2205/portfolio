# Aryan Tomar — Portfolio

A modern, animated developer portfolio built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Framer Motion**. It showcases backend projects (with live service / API documentation links) and interactive frontend demos.

Design inspired by [Creative-Folio](https://github.com/mdhossain-2437/Creative-Folio) — typography-first, immersive, dark-themed.

## ✨ Features

- **Next.js 14** App Router with React Server Components
- **Tailwind CSS** design tokens, custom gradients & glassmorphism
- **Framer Motion** scroll reveals, staggered entrances & ambient animation
- Dedicated **Backend Projects** section with API documentation links
- Dedicated **Frontend Demos** section
- Fully responsive, accessible, and `prefers-reduced-motion` aware
- Single source of content in [`src/lib/data.ts`](src/lib/data.ts)

## 🗂️ Project structure

```
src/
├── app/
│   ├── globals.css      # Tailwind layers + custom utilities
│   ├── layout.tsx       # Fonts + metadata
│   └── page.tsx         # Section composition
├── components/          # Navbar, Hero, About, Experience, project cards, etc.
└── lib/
    └── data.ts          # ← Edit all content (projects, skills, links) here
```

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## 📄 Add your resume PDF

The navbar / hero "Resume" button links to `/Aryan_Tomar_Resume.pdf`.
Export your resume as a PDF and drop it into the `public/` folder with that exact name (or update `profile.resumeUrl` in [`src/lib/data.ts`](src/lib/data.ts)).

```
public/Aryan_Tomar_Resume.pdf
```

## ✏️ Editing content

All text, projects, skills, and links live in [`src/lib/data.ts`](src/lib/data.ts):

- `backendProjects` — add `apiDocsUrl` to link API documentation
- `frontendDemos` — interactive demos
- `skills`, `experiences`, `education`, `profile.socials`

## ▲ Deploy to Vercel

Vercel is the recommended host for Next.js.

### Option A — Git (recommended)

1. Push this project to a GitHub/GitLab/Bitbucket repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/at2205/portfolio.git
   git push -u origin main
   ```
2. Go to <https://vercel.com/new> and **Import** the repository.
3. Vercel auto-detects Next.js — keep the defaults:
   - **Framework Preset:** Next.js
   - **Build Command:** `next build`
   - **Output:** `.next` (handled automatically)
4. Click **Deploy**. Every push to `main` redeploys automatically.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

### Custom domain

In the Vercel dashboard → **Settings → Domains**, add your domain and follow the DNS instructions.

## 📜 License

Personal portfolio — content © Aryan Tomar.
