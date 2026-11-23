<p align="center">
  <a href="https://pastenes.dev">
    <img alt="Richard's Dev Site" src="static/icon.png" width="60" />
  </a>
</p>
<h1 align="center">
  🚀 Richard's Dev Site
</h1>

<p align="center">
  My personal portfolio and resume site: server-rendered with SvelteKit, powered by a headless CMS, and deployed on Netlify.
</p>

<p align="center">
  <a href="https://pastenes.dev">🌐 Live Site</a> ·
  <a href="https://pastenes.dev/resume">📄 Resume</a> ·
  <a href="https://pastenes.dev/Resume-Richard-Pastenes.pdf">⬇️ Resume PDF</a>
</p>

---

## ✨ Features

- 🏔️ **Illustrated hero:** a layered Mt. Hood / Trillium Lake scene with scroll and pointer parallax, and a small canvas flock of birds that scatters from the mouse (no animation library), with a button to pause it.
- 🧑‍💻 **Cut-out headshot** that rises with the hero and then stays beside the About text on desktop.
- 🧱 **Bento project grid:** a featured project, a "Load more" button on desktop, and optional video previews that play on hover.
- 🧰 **Skills and certifications** sections managed in the CMS (core skills highlighted; certifications can be marked "In progress").
- 📄 **Multiple resumes:** duplicate a resume in the Studio to tailor it to a job posting, then pick which one the site shows.
- 🖨️ **Generated resume PDFs:** a Studio button prints a resume in headless Chrome. The output is a tagged PDF with selectable text and ATS-friendly read order, and the site's PDF link always serves the current site resume.
- ✉️ **Cover letters:** one per job application, headed like the resume and printed to a one-page PDF named after the job and employer, ready to download from the Studio.
- 🔎 **SEO and sharing:** titles, descriptions, canonical URL and the Open Graph / Twitter share image come from a Site settings document in the CMS.
- 🌙 **Always-dark design** on screen, with light "paper" colors in print.
- ✨ **Scroll reveals and page transitions** (View Transitions). All motion is skipped under reduced motion.
- ♿ **Accessible:** skip link, visible focus ring, named landmarks and sections, alt text, a pause button for the hero animation, and screen reader notes for links that open a new tab; axe reports 0 violations.
- ⚡ **Fast:** pages are cached on Netlify's CDN and refreshed the moment content is published in the CMS. Inlined CSS, responsive WebP images and a CDN preconnect (Lighthouse mobile performance 95; accessibility, best practices and SEO 100).

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| ⚙️ Framework | [SvelteKit 3](https://svelte.dev/docs/kit) + [Svelte 5](https://svelte.dev/) (runes) on [Vite 8](https://vite.dev/) |
| 🎨 Styling | [Tailwind CSS 4](https://tailwindcss.com/) (CSS-first config, design tokens in `app.css`) |
| 📦 CMS | [Sanity v6](https://www.sanity.io/) (Studio + Content Lake) |
| 🔍 Queries | [GROQ](https://www.sanity.io/docs/groq) via [@sanity/client](https://www.npmjs.com/package/@sanity/client) |
| 📝 Rich Text | [@portabletext/svelte](https://github.com/portabletext/svelte-portabletext) |
| 🖼️ Images | [@sanity/image-url](https://www.npmjs.com/package/@sanity/image-url) (responsive WebP `srcset`) |
| 📄 Resume PDF | [puppeteer-core](https://pptr.dev/) + [@sparticuz/chromium](https://github.com/Sparticuz/chromium) in a Netlify function |
| 🔤 Fonts | [Fontsource](https://fontsource.org/) (Instrument Serif, Instrument Sans, Caveat, Fira Code) |
| 🚀 Hosting | [Netlify](https://www.netlify.com/) (SSR via adapter-netlify, CDN cache purged on publish) |
| 📊 Analytics | [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) (cookie-free, added by Cloudflare's proxy) |

---

## 🏗️ Project Structure

```
├── src/
│   ├── routes/
│   │   ├── +layout.*                    # SEO/share tags from Site settings, nav, page transitions
│   │   ├── +page.*                      # Landing page (hero, about, work, skills, certifications)
│   │   ├── resume/                      # Printable resume (site resume, or any resume by ?id=)
│   │   ├── cover-letter/                # A cover letter by ?id= (noindexed)
│   │   └── Resume-Richard-Pastenes.pdf/ # Streams the site resume's generated PDF
│   ├── lib/
│   │   ├── sections/                    # Header, About, Work, Skills, Certifications
│   │   ├── components/                  # Nav, HeroLandscape, HeroBirds, Headshot, Reveal, BlockContent...
│   │   ├── actions/                     # Scroll reveal, project hover video
│   │   ├── cache.ts                     # CDN cache headers for pages and the resume PDF
│   │   └── sanity.ts                    # Sanity client and image helpers (server only)
│   ├── app.html                         # HTML shell
│   └── app.css                          # Tailwind import, design tokens, print styles
├── netlify/functions/
│   ├── resume-pdf.mts                   # Headless Chrome: prints /resume?id=… to PDF
│   └── purge-cache.mts                  # Sanity webhook: clears the CDN cache on publish
├── studio/
│   ├── sanity.config.ts                 # Studio structure (singletons, orderable lists)
│   ├── schemas/                         # Document and object types
│   ├── actions/                         # Show on site; Generate Resume / Cover Letter PDF, Download and Open PDF
│   └── migrations/                      # One-time content migrations (deleted once they've run)
├── static/                              # icon.png, meta.png (fallback share image)
├── _redirects                           # /studio → hosted Studio
├── vite.config.ts
└── netlify.toml
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 26 (`.nvmrc`; run `nvm use`)
- npm

### 1. Clone and install

```bash
git clone https://github.com/pastenes/richards-dev-site.git
cd richards-dev-site
npm install
```

### 2. Set up environment variables

The Sanity variables are inlined at build time, so they're read from `.env.development` (for `npm run dev`) and `.env.production` (for `npm run build`):

```env
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_TOKEN=your_read_token
```

### 3. Start developing

```bash
npm run dev
```

The site runs at [http://localhost:5173](http://localhost:5173), and the terminal also prints a Network URL for testing on phones and tablets on the same Wi-Fi.

---

## 📦 Sanity Studio

The CMS lives in `studio/` (its own npm project) and is deployed separately to Sanity hosting. [pastenes.dev/studio](https://pastenes.dev/studio) redirects to it.

```bash
cd studio
npm install
npm run dev
```

The Studio runs at [http://localhost:3333](http://localhost:3333).

### Content

| Document | What it holds |
|----------|---------------|
| Hero, About | Hero copy and headshot; About text |
| Projects | Orderable list: screenshot, optional hover video, description, tags |
| Skills | Skill groups for the landing page, with core skills highlighted |
| Certifications | Orderable list, shared by the landing page and the resumes |
| Resumes | One document per resume version, with skills grouped by relevance |
| Cover Letters | One per job application: job title, employer, job link and the letter |
| Site settings | SEO and sharing defaults, social links (hero and footer), and which resume the site shows |

### Resume workflow

1. Duplicate a resume and give it a label (e.g. "Acme, Staff Front-End").
2. Edit and publish it.
3. Click **Generate Resume PDF** (in the document's "⋯" menu, or as the main button when everything is published). The PDF is saved on the resume.
4. Click **Show on site** to make it the resume at `/resume` and behind the PDF link.

### Cover letter workflow

1. Create a cover letter with the job title, employer, job link and the letter itself (greeting to sign-off). Optionally pick which resume heads it; empty uses the site resume.
2. Publish it.
3. Click **Generate Cover Letter PDF**. The file is named `Richard Pastenes Cover Letter - <job title> - <employer>.pdf`.
4. Use **Download PDF** or **Open PDF** (in the "⋯" menus). Regenerate after publishing changes.

### Studio scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the local Studio |
| `npm run build` | Build the Studio for production |
| `npm run deploy` | Deploy the Studio to Sanity hosting |

The Generate Resume PDF button calls the live site by default. Set `SANITY_STUDIO_SITE_URL` in `studio/.env.development` to test against another deploy.

---

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the SvelteKit dev server (with a Network URL) |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |

Type checking: `npx svelte-kit sync && npx svelte-check --tsconfig ./tsconfig.json`.

---

## 🌐 Deployment

The site deploys automatically to **Netlify** on every push to `main`.

- **Build command:** `npm ci && npm run build`
- **Publish directory:** `build`
- **Runtime:** Node.js 26
- **Functions:** SvelteKit's server-rendering function, plus `resume-pdf` (ships its own headless Chromium) and `purge-cache`

The environment variables (`SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_TOKEN`, `SANITY_WEBHOOK_SECRET`) must be set in the Netlify dashboard.

### Caching

Pages and the resume PDF are cached on Netlify's CDN for up to an hour, so most visits never run the server function. Publishing in Sanity clears the cache right away: a webhook (sanity.io/manage → API → Webhooks) calls `/.netlify/functions/purge-cache`, signed with a secret that must match `SANITY_WEBHOOK_SECRET`. Each deploy clears it too. The webhook's delivery log should show `202 Purged`; a `401` means the two secrets don't match.

### Analytics

Cloudflare proxies the domain and adds its Web Analytics script at the edge, so there's no analytics code in the repo. The stats are in the Cloudflare dashboard under Analytics & Logs → Web Analytics.

The Studio deploys separately with `cd studio && npm run deploy`.

---

## 📄 License

Private. All rights reserved.
