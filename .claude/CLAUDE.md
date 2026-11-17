# CLAUDE.md

Richard Pastenes' personal portfolio and resume site (https://richard.pastenes.dev). It is a SvelteKit app that renders on the server, pulls its content from a Sanity CMS, and is hosted on Netlify. The repo holds two separate npm projects: the site at the root and the Sanity Studio in `studio/`.

## Rules

- **Never commit anything.** The human always makes commits manually. Don't run `git commit`, `git push`, or anything else that writes git history, even when a task seems finished. Leave changes in the working tree and say what changed.

## Commands

Site (repo root):

```bash
npm run dev       # vite dev --host → http://localhost:5173, plus a Network URL for phones/tablets on the same Wi-Fi
npm run build     # vite build (adapter-netlify output in build/)
npm run preview   # preview the production build
```

Studio (`studio/`, has its own `package.json` and `node_modules`):

```bash
cd studio && npm run dev      # sanity dev → http://localhost:3333
cd studio && npm run build    # sanity build
cd studio && npm run deploy   # sanity deploy (hosted studio, appId in sanity.cli.ts)
```

There are **no lint, format, typecheck, or test scripts**. To check your work, run `npm run build`. For type checking, run `npx svelte-kit sync && npx svelte-check --tsconfig ./tsconfig.json` (svelte-check isn't installed as a dependency). It currently reports 0 errors.

## Runtime & versions

- **Node 26** (Active LTS), set in `.nvmrc` (`v26`) and in `netlify.toml` (`NODE_VERSION = "26"`). nvm switches to it automatically when you `cd` into the repo. In a non-interactive shell (scripts, agent tools), run `nvm use` first, since the default there may be v22.
- npm, ESM only (`"type": "module"` in both projects). The lockfiles are `package-lock.json`.

| Package | Range | Installed |
|---|---|---|
| svelte | ^5.57 | 5.57 |
| @sveltejs/kit | ^3.2 | 3.2 |
| @sveltejs/adapter-netlify | ^7 | 7.0 |
| @sveltejs/vite-plugin-svelte | ^7.3 | 7.3 |
| vite | ^8.3 | 8.3 (Rolldown bundler, Lightning CSS minifier) |
| tailwindcss / @tailwindcss/vite | ^4.3 | 4.3 (CSS-first config, no `tailwind.config.js` or PostCSS) |
| typescript | ^6 | 6.0 (Kit 3 peer range is ^6; don't move to 7 yet) |
| @sanity/client | ^8 | 8.15 |
| @sanity/image-url | ^2 | 2.1 |
| @portabletext/svelte | ^4 | 4.0 |
| puppeteer-core / @sparticuz/chromium | ^25.17 / ^153 | 25.17 / 153 (only in the `resume-pdf` Netlify function) |
| **studio:** sanity | ^6.23 | 6.23 (needs Node ≥22.12; React strict mode is on in dev) |
| **studio:** react / react-dom | ^19.3 | 19.3 |
| **studio:** @sanity/vision | ^6.23 | 6.23 (keep it in step with `sanity`) |
| **studio:** @sanity/orderable-document-list | ^2 | 2.0 |
| **studio:** styled-components | ^6.6 | 6.6 |
| **studio:** typescript | ^6 | 6.0 |

Fonts come from `@fontsource/*`. Import only the weights you use. A font that's used but not imported silently falls back to a system font.

| Font | Tailwind class | Role | Imported in |
|---|---|---|---|
| Instrument Serif 400 | `font-heading` | All headings (base-layer `h1`–`h6` rule in app.css). It has no bold, so headings are `font-normal` | `+layout.svelte` |
| Instrument Sans 400, 700 | `font-body` | Body text (`<body>` class in `app.html`) | `+layout.svelte` |
| Caveat 400 | `font-script` | Nav brand; one accent word per section heading (redesign) | `+layout.svelte` |
| Fira Code 400 | `font-mono` | All monospace text: hero "Hi, I'm", nav links and action button, section eyebrows, project tags, skill chips, cert meta line, footer, 404 link, resume job title, contacts, dates and section titles | `+layout.svelte` |

Font tokens are named by role, not typeface. Monospace text always uses Fira Code: `--font-mono` overrides Tailwind's system mono stack, so `font-mono` (and `code`/`pre`) render in Fira Code. Don't add a separate code-font token.

## Architecture

```
src/
  app.html                 # HTML shell (body classes: page background, body font, print background)
  app.css                  # Tailwind import, @theme design tokens, base-layer element + print styles
  env.ts                   # defineEnvVars: declares the Sanity env vars
  lib/
    sanity.ts              # Sanity client + urlFor() image builder (SERVER ONLY)
    sections/              # Header (hero), About, Work, Skills, Certifications (page order)
    components/            # BlockContent (PortableText) + RichTextLink/List/ListItem, Footer, Nav (floating pill), SectionHeading, Reveal, HeroLandscape + HeroBirds, Headshot, ResumeHeading
    actions/reveal.ts      # scroll-reveal action used by Reveal.svelte
    actions/hoverVideo.ts  # project card hover preview (lazy video over the screenshot)
  routes/
    +layout.server.ts      # GROQ: Site settings (SEO/sharing defaults) + hero Twitter handle, for every page
    +layout.svelte         # app.css, fonts, all SEO/OG/Twitter head tags, skip link, the shared Nav (PDF button on /resume), page transitions
    +page.server.ts        # GROQ: hero, about, projects, skills, certifications (Promise.all)
    +page.svelte           # landing page (head: only the Sanity CDN preconnect)
    resume/+page.server.ts # GROQ: the site resume, or any resume by `?id=` (noindexed); formats experience dates
    resume/+page.svelte    # printable resume (print: variants in markup, page scaling in app.css)
    Resume-Richard-Pastenes.pdf/+server.ts # the PDF button: streams the site resume's generated PDF
    +error.svelte          # 404/error page ("> go back home": pressing return anywhere goes home)
netlify/functions/resume-pdf.mts # headless Chrome prints /resume?id=… to PDF (Studio's Generate Resume PDF)
netlify/tsconfig.json      # Node types for the functions (the root tsconfig only covers src/); check with `npx tsc -p netlify`
vite.config.ts             # tailwindcss() plugin + sveltekit({...}) with adapter and preprocess (no svelte.config.js)
static/                    # icon.png, meta.png (fallback share image)
studio/
  sanity.config.ts         # studio config: custom structure, vision, arrays never collapse ("Show all X items" is off)
  sanity.cli.ts            # projectId lpvkp4xx, dataset production, deployment appId
  schemas/documents/       # hero, about, project, resume, siteSettings, skills, certification
  actions/                 # resume document actions: Show on site (+ On site badge), Generate Resume PDF
  schemas/objects/         # blockContent, imageFile, links, education, experience, achievment
```

### Data flow
- All content is fetched **on the server** in `+page.server.ts` load functions, using GROQ through `client.fetch`. Nothing is fetched on the client.
- Env vars are declared in `src/env.ts` with `defineEnvVars` (SvelteKit 3). All three are `static: true`, so they're inlined at build time. To add a variable, declare it there first. `src/lib/sanity.ts` imports `SANITY_PROJECT_ID`, `SANITY_DATASET`, and `SANITY_TOKEN` from `$app/env/private` (`$env/*` is deprecated in Kit 3). That means:
  - It can only be imported from server modules (`*.server.ts`). Importing it from a component will fail the build.
  - The vars have to exist **at build time**: locally in `.env.development` / `.env.production` (both gitignored), and in the Netlify dashboard for deploys.
- The client uses `useCdn: true` and `apiVersion: '2024-01-01'`.
- Image URLs are resolved on the server with `responsiveImage(asset, widths)` from `#lib/sanity.ts` (WebP `url` + `srcset`); components add `sizes`. Headshot 350/525/700, project screenshots 400/700/1000/1400. Components only ever get `{ alt, url, srcset }`. `+page.svelte` preconnects to `cdn.sanity.io` because the headshot is the largest paint.
- Projects and certifications are sorted by `orderRank`, which comes from `@sanity/orderable-document-list` (editors drag to reorder them in the studio).
- Tag fields (`project.tags`, `resume.skills`) are native tag arrays (`string[]`, `options.layout: 'tags'`; there's no tags plugin). The loaders pass them through `tagNames()` from `#lib/sanity.ts`; `resume.skills` is sorted on the server. The old plugin data was converted once with a migration (Nov 2026); there is no migration code in the repo.
- Skills come from the `skills` singleton as `skillGroups` (`{_key, title, skills[]{_key, name, core}}`). Certifications come back with `issued` reduced to a `year` string; the card hides any empty meta (year, credential ID) and links the title when `credentialUrl` is set. `Certifications.svelte` pads the last row of three with dashed placeholder cards.

### Sanity content model
- `hero`: title, intro (block array; **only the first span is rendered** in Header), links (`links` object: twitter/linkedin/github handles), headshot (`imageFile`).
- `about`: content (block array with link annotations). Its old `tags` field was removed (the `skills` document replaced it).
- `project`: orderRank, title, screenshot, previewVideo (optional MP4 `file`; the loader passes its CDN URL as `previewVideo`), projectUrl, description (blocks), tags (`string[]`).
- `skills`: a singleton with document ID `skills`. `groups[]` (`skillGroup`: title, `skills[]` of `skill`: name, core). Plain objects rather than a tag field, since tags can't carry a group or a core flag.
- `certification`: orderRank, title, issuer, inProgress (boolean; shows "In progress" instead of the year and credential ID, with a clock seal on the home card, and hides Issued in the Studio), issued (date; the site shows the year), credentialId, credentialUrl.
- `resume`: one document per resume version (the Studio's **Resumes** list; duplicate one to tailor it to a job posting). The original has document ID `resume`; duplicates get random IDs. Fields: label (internal name for the list), name, jobTitle, contact fieldset, summary, interests, education[], certifications[] (references to `certification` documents, so the resume picks and orders its own subset; the loader reduces `issued` to `year` and drops broken references), experience[] (each with `achievment[]`), skills (`string[]`), pdfFileName (without `.pdf`), pdf (read-only file, set by Generate Resume PDF).
- `siteSettings`: a singleton (document ID `siteSettings`, the Studio's **Site settings**). SEO & sharing group: siteName (og:site_name and the error-page title suffix), title (home page title), description, siteUrl (canonical origin; empty uses the request's origin), ogImage (image with hotspot and alt, served as a 1200×630 JPG crop; empty uses `static/meta.png`). Resume group: `siteResume`, the reference that picks the resume shown at `/resume` and behind the PDF button, also set by a resume's **Show on site** action. It replaced the `resumeSettings` singleton; `siteResumeQuery` in `#lib/sanity.ts` and the Studio's `useSiteResumeId` still fall back to `resumeSettings` (TODO: remove once the `site-settings` migration has run), then to the document `resume`. Always fetch resumes with `{ perspective: 'published' }`: the token can read drafts.
- The spelling **`achievment` is a typo, but it's part of the stored data.** Don't rename it in schemas or queries unless you also migrate the Content Lake.
- When you change a schema, update the matching GROQ projection in `src/routes/**/+page.server.ts` as well. The site has no generated types, so a mismatch fails silently and the field just renders empty.

## Conventions

- **Svelte 5 runes only**: `$props()`, `$derived()`, `$state()`, `{@render children()}`. Don't use `export let` or slots.
- **SvelteKit 3 specifics:** import from `#lib/...`, not `$lib` (it was removed; the mapping is in `package.json` `imports`). Use the `.ts` extension when importing a TS module through `#lib` (e.g. `#lib/sanity.ts`), or TypeScript can't resolve it. There's no `svelte.config.js`; Kit options go into `sveltekit({...})` in `vite.config.ts`.
- Use TypeScript in `<script lang="ts">`. Prop types are written inline (there's no shared types module). `tsconfig` is strict and extends `$app/tsconfig` (a package Kit installs).
- Formatting: tabs, single quotes, no trailing commas in `src/`. The `studio/` code uses 2 spaces, no semicolons, and `{a}` brace style. Match whichever file you're in.
- Styling is Tailwind utility classes in markup, built only from theme tokens. The `@theme` block in `app.css` is the Tailwind config (there's no `tailwind.config.js`), and it's the only place to add colors, fonts, sizes, widths, or animations.
  - No custom classes or `@utility` rules, and no arbitrary values (`w-[30px]`, `top-[5px]`). v4's spacing scale accepts any multiple of 0.25 (`w-7.5` is 30px, `top-1.25` is 5px, `h-150` is 600px), so most one-off sizes need neither. If a value repeats or carries meaning, add a token.
  - To reuse a group of classes, make a component (like `ResumeHeading.svelte`) rather than an `@apply` class.
  - `app.css` only holds tokens, base-layer element defaults (`h1`–`h6`, `p`, which also style Sanity rich text that can't take classes), and print rules that have no utility (page scaling, `print-color-adjust`, `@page`).
- Sanity rich text renders through `BlockContent.svelte`, which passes custom components to `PortableText`: `RichTextLink` (accent color and underline; external URLs open in a new tab), `RichTextList` (bullet and numbered lists; Tailwind's reset removes markers and indentation, so they're set there) and `RichTextListItem`.
- External links use `target="_blank" rel="noreferrer"`, and icon-only links get an `aria-label`. Icons are inline SVGs, with no icon library on the site.

## Gotchas

- **`--color-*: initial` in `@theme` replaces the default palette instead of extending it.** Colors are named by role: `background`, `surface`, `surface-raised`, `foreground`, `muted`, `caption`, `border`, `border-strong`, `accent`, `accent-hover`, `on-accent`, `accent-wash`, `mint`, `land-sky`/`far`/`mid`/`near`/`front` (hero landscape), `bird` (hero birds; the canvas draws in its `text-bird` color), and `white` (print page background) (`transparent` and `current` are built in). Pick a token by role, not by how it looks. Classes like `text-red-500` or `bg-slate-800` won't exist. Everything else extends the defaults: fonts, the `text-display-*`/`heading-*`/`script-*` sizes, `text-tiny`, `tracking-heading`, `rounded-card`/`rounded-feature`, `shadow-card`/`shadow-glow`, `ease-out-expo`, `animate-blink`, and the content widths `max-w-narrow` (640px) and `max-w-wide` (1000px).
- **Theme:** the `@theme` colors are the dark theme. A `@media (prefers-color-scheme: light), print` block in `app.css` overrides the same `--color-*` variables with the light ("paper") values, so there are no `dark:` classes; one class works in both themes. Print is always light, on a white page (`print:bg-white` on body); `mint` is the same in both themes. The resume uses the themed roles like every other page, so it follows the system theme on screen and prints in the paper colors.
- There's no `container` class. Content columns use `mx-auto sm:max-w-narrow lg:max-w-wide` (Work, resume) or `mx-auto max-w-4xl` (About, 404). Section padding (`px-14 py-32 lg:px-32`, or `px-6 md:px-14` on redesigned sections) is written on each `<section>`; there's no global `section` rule. Redesigned sections open with `SectionHeading` (`eyebrow`, `title`, and a `script` word in Caveat).
- **Accessibility:** every page has `<main id="main">` (the skip link targets it), and the base layer draws an accent `:focus-visible` ring on everything. Decorative images and duplicate links get `alt=""` / `aria-hidden`; motion (reveal, parallax, page transitions, smooth scroll, the 404 cursor blink) is skipped under reduced motion. axe reported 0 violations on all pages in both themes; re-run it after big changes.
- **Page transitions:** `onNavigate` in `+layout.svelte` wraps cross-page navigations in `document.startViewTransition` (the browser's default cross-fade). It skips same-page anchor jumps and reduced motion; browsers without the API navigate normally.
- **SEO and share tags** all render in `+layout.svelte`, from `data.site` (`+layout.server.ts`, Site settings with built-in defaults; a failed fetch also uses the defaults) refined by the page's own `meta` (`{ title, description, noindex }`, returned from its load). `/resume` returns `Resume | <name>`, its summary cut to 160 characters, and `noindex` for `?id=` views. Error pages get `Not Found | <site name>` and `noindex`. Don't add `<title>` or meta tags in pages: they'd duplicate the layout's. The Twitter handle (`twitter:site`) comes from `hero.links.twitter`.
- **Performance:** `inlineStyleThreshold` in `vite.config.ts` inlines the CSS into the HTML (no render-blocking stylesheet). If the CSS grows past the threshold it silently goes back to a `<link>`. Lighthouse mobile: performance 95, accessibility/best practices/SEO 100, CLS ~0.
- **Scroll reveal:** wrap an element in `<Reveal>` (`as` for the tag, `step` to stagger siblings, `class` for its own classes) instead of repeating the animation classes. The action adds `data-hidden` only to elements that start below the fold and removes it on first view, so server-rendered and no-JS pages show everything, and reduced motion skips it. Don't put `Reveal`'s classes on an element that has its own `transition`/`duration` (wrap it instead, as the Work cards do).
- **Project preview videos:** a card whose project has `previewVideo` overlays a `<video muted loop playsinline preload="none">` on its screenshot, with no `src`. `use:hoverVideo` on the `<article>` sets the `src` on the first hover or keyboard focus, plays from the start, and adds `data-playing` once frames show (the video fades in with `data-playing:opacity-100`); leaving pauses it. Touch devices (no `(hover: hover) and (pointer: fine)`) and reduced motion keep the screenshot and never download the clip. Clips are recorded by hand and uploaded in the Studio: 16:9, about 1000px wide (1400px for the first project), 6–10 s, no audio, under 1 MB. Encode with `ffmpeg -i raw.mov -vf "scale=1000:-2,fps=30" -an -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart preview.mp4` (`+faststart` lets playback start before the file finishes downloading).
- **Cascade layers:** Tailwind 4 puts utilities in `@layer utilities`, and CSS outside a layer beats every layer. Element rules (`h1`–`h6`, `p`) must stay inside `@layer base`, or they'll override utility classes like `mb-0` or `text-5xl` on those elements.
- Don't define a multi-layer `--drop-shadow-*` token (`a, b`). Tailwind 4.3 wraps it in a single `drop-shadow()`, which is invalid, so the filter silently becomes `none`. `drop-shadow-lg` uses v4's default.
- **Hero:** `HeroLandscape.svelte` renders the decorative Mt. Hood / Trillium Lake scene as two inline SVGs that share one viewBox: the back one (sky, stars, Hood, foothills, far trees, the lake, and the shared `<defs>`) and the front one (the nearest trees and the foreground). `HeroBirds.svelte`, a canvas with a small boids flock that replaces the old Vanta birds, sits between them in the lake's layer, so the birds fly over the lake and behind the nearest trees, slowly and calmly; they scatter from the mouse. Layers rise at different rates as you scroll (`bind:scrollY`) and drift against the pointer (hover parallax: `Header.svelte` eases the pointer position and passes it down; `drift(k, depth)` sets each layer's transform). Pointer drift and scatter are off for touch; under reduced motion the scene is frozen and the birds aren't rendered. Everything is `print:hidden`. The paths come from the design system, so regenerate them there (see `.claude/redesign/hero/`) rather than hand-editing them; only move whole `<g>` layers between the two SVGs. Hero copy stays `text-foreground` in the open sky on the left; the cut-out headshot (`Headshot.svelte`; Sanity `hero.headshot`, a transparent PNG served as 700px WebP) starts bottom-right, right of the summit, and drifts slightly with the pointer (`Header` exposes the eased pointer with `bind:pointer`). It isn't inside the hero (which is `overflow-hidden`): `+page.svelte` wraps Header and About in a `relative` div, and the headshot is an absolute layer over both, ending at About's bottom padding. From lg its viewport-tall box is `sticky` at `-top-1/4`, so the photo rises with the hero while gliding left to the content column's right edge (`glide`, over the first 25vh scrolled; measured from the layer's own width, so a classic scrollbar doesn't throw it off), then sticks beside the About text until the text scrolls away; its cropped bottom fades (`mask-b-from-75%`). Below lg it scrolls away with the hero.
- **Resume PDFs are generated, not hand-exported.**
  - **Button:** a resume's **Generate Resume PDF** action (`studio/actions/generateResumePdf.tsx`) calls `https://pastenes.dev/.netlify/functions/resume-pdf?id=<id>`. Override the site with `SANITY_STUDIO_SITE_URL` in `studio/.env.development`.
  - **Function:** `netlify/functions/resume-pdf.mts` opens this deploy's `/resume?id=…` in headless Chrome with print media, so the light theme always applies. It prints at the page's own size (no shrink-to-fit; the resume runs to two A4 pages) and returns a tagged PDF with selectable text (~70 KB) and an `X-Pdf-Pages` count.
  - **Saving:** the action uploads the PDF with the Studio user's auth (no write token on the server) and sets the resume's `pdf` field. Sanity 6 puts every action but the main one behind the footer's small "⋯" button, so `alsoInHeaderMenu()` also lists Generate, Duplicate and Show on site in the header's "⋯" menu. Generate is the first resume action, so it's the editor's main button whenever there's nothing to publish; it hides itself while there are unpublished changes, so Publish takes that spot. `pdfFileName` is optional (empty means `Resume-Richard-Pastenes`).
  - **Serving:** `/Resume-Richard-Pastenes.pdf` is a route, not a static file, so don't add one to `static/`. It streams the site resume's `pdf`. Until one exists, it prints the site resume live through the function (up to 9 s), and redirects to `/resume` (`no-store`) if that fails. The function takes about 4–5 s warm and about 14 s cold on Netlify.
  - **Routing:** the function has no custom `config.path`, because SvelteKit's function claims `/*` (minus `/.netlify/*`).
  - **Testing locally:** import the handler in a Node script with `CHROME_PATH` (local Chrome) and `RESUME_RENDER_ORIGIN` (the dev server URL) set.
- **Resume read order:**
  - **On screen:** the markup puts Experience, then Skills, then the sidebar (Summary, Education, Certifications, Interests). Grid placement (`md:col-start-*`/`row-start-*`, `order-first` on phones) puts the sidebar on the left.
  - **In print (the PDF):** a single column. Two columns over two pages put the page-1 sidebar between the halves of Experience, so parsers could file the older jobs under Certifications. The container is `print:flex`, the sidebar is `print:contents`, and Summary is `print:order-first`, giving Summary, Experience, Skills, Education, Certifications, Interests. Chrome paints flex items in `order` order, so the PDF text follows. In print, education and certification entries are one line each and interests wrap on one line.
  - **Paint order:** Chrome writes PDF text in paint order, and positioned elements paint after unpositioned ones. So every grid child and sidebar section is `relative`, and `ResumeHeading` is a block whose rule is an in-flow `after:` block, not absolutely positioned.

  Keep it that way, or text extraction and ATS parsers read the PDF out of order. After layout changes, generate a PDF and check its extracted text order.
- Resume print: `app.css` sets the root font to 95% in print (bullets and summary ~10pt, dates and contacts ~8.5pt) and an A4 `@page` with 10mm top and bottom margins on every page. The resume is two pages on purpose: don't shrink it back to one, since one page needed ~6.7pt text. Everything else is `print:` variants in the markup (`print:hidden` on the nav, `print:grid` layout, `print:px-12` side padding, `print:break-inside-avoid` on bullets, education and certifications, `print:break-after-avoid` on `ResumeHeading` and on each job's title and employer (a job can break between bullets), and `print:bg-white` on body). Since sizes are rem-based, the timeline dots and rules scale down with the text. Check print preview when you edit the resume page.
- Social links come from the CMS (`hero.links`), and a network with an empty handle is hidden. The hero reads them from its own data; the Footer reads `page.data.site.social` (normalized in `+layout.server.ts`, so it works on the error page too). The Footer's GitHub icon is the exception: it's hard-coded to this site's repo, not the profile.
- `.claude/progress.md` tracks the roadmap and is current. Phases 1 (Gatsby → SvelteKit), 2 (Sanity v2 → v5), and 3 (Tailwind v3 → v4) are done. Phase 4 (redesign) is in progress; the handoff from Claude Design is in `.claude/redesign/` (`plan.md` lists the sub-phases).
- The README logo path (`src/images/icon.png`) points to a file that doesn't exist. The icon is at `static/icon.png`.
- **Vite 8 minifies CSS with Lightning CSS**, which is stricter than esbuild was. Invalid CSS (such as nesting `&` where it isn't allowed) now fails the build instead of passing through.
- **`studio/package.json` has npm `overrides`** that force patched versions of transitive Sanity CLI dependencies flagged by Dependabot: `js-yaml` and `smol-toml` under `@vercel/frameworks`, and `minimatch` under `@oclif/core`. Remove each one once `sanity`/`@sanity/cli` ships the patched version itself (`npm ls <pkg>` shows what it resolves to; `npm audit` should stay at 0).
- The site's only `npm audit` finding is `deepmerge` (low, via `@sveltejs/vite-plugin-svelte`), with no patched release. It only merges build-time config, so there's nothing to fix.
- Generated or ignored directories: `.svelte-kit/`, `build/`, `.netlify/`, `studio/.sanity/`, `studio/dist/`. Don't edit them.

## Deployment

- **Site:** Netlify builds on every push to `main` with `npm ci && npm run build` and publishes `build/`. It renders on the server through Netlify functions (adapter-netlify). The Sanity env vars are set in the Netlify dashboard.
- **Studio:** deployed separately to Sanity hosting (https://richard-dev.sanity.studio/) with `cd studio && npm run deploy`. `pastenes.dev/studio` is a 302 to it, set in the root `_redirects` file; adapter-netlify requires that file at the project root, not in `static/`, and copies it into `build/`.
