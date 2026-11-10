# CLAUDE.md

Richard Pastenes' personal portfolio and resume site (https://richard.pastenes.dev). It is a SvelteKit app that renders on the server, pulls its content from a Sanity CMS, and is hosted on Netlify. The repo holds two separate npm projects: the site at the root and the Sanity Studio in `studio/`.

## Rules

- **Never commit anything.** The human always makes commits manually. Don't run `git commit`, `git push`, or anything else that writes git history, even when a task seems finished. Leave changes in the working tree and say what changed.

## Commands

Site (repo root):

```bash
npm run dev       # vite dev → http://localhost:5173
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
| **studio:** sanity | ^6.23 | 6.23 (needs Node ≥22.12; React strict mode is on in dev) |
| **studio:** react / react-dom | ^19.3 | 19.3 |
| **studio:** @sanity/vision | ^6.23 | 6.23 (keep it in step with `sanity`) |
| **studio:** @sanity/orderable-document-list | ^2 | 2.0 |
| **studio:** sanity-plugin-tags-v4 | ^1.0.25 | 1.0.25 (requires sanity ^6.18) |
| **studio:** styled-components | ^6.6 | 6.6 |
| **studio:** typescript | ^6 | 6.0 |

Fonts come from `@fontsource/*`. Import only the weights you use. A font that's used but not imported silently falls back to a system font.

| Font | Tailwind class | Role | Imported in |
|---|---|---|---|
| Poppins 700 | `font-poppins` | All headings (global `h1`–`h6` in app.css) | `+layout.svelte` |
| PT Serif 400 | `font-pt-serif` | Body text (global `body`) | `+layout.svelte` |
| Fira Code 400 | `font-fira-code` | Code-style UI text: hero "Hi, I'm", jump links, tech tags, resume PDF button | `+layout.svelte` |
| Montserrat 100 | `font-montserrat` | Resume headings (`.rh1`, `.rh2`, `font-thin`) | `resume/+page.svelte` |
| Open Sans 300 | `font-opensans` | Resume body (`font-light`) | `resume/+page.svelte` |

`font-mono` is Tailwind's default system mono stack, not Fira Code.

## Architecture

```
src/
  app.html                 # HTML shell
  app.css                  # Tailwind import + @theme config, base-layer element styles, print + resume styles
  env.ts                   # defineEnvVars: declares the Sanity env vars
  lib/
    sanity.ts              # Sanity client + urlFor() image builder (SERVER ONLY)
    sections/              # Header (hero), About, Work
    components/            # BlockContent (PortableText), Footer, Jumplinks, TechTags
  routes/
    +layout.svelte         # imports app.css + base fonts
    +page.server.ts        # GROQ: hero, about, projects (Promise.all)
    +page.svelte           # landing page + SEO/OG meta in <svelte:head>
    resume/+page.server.ts # GROQ: resume singleton; formats experience dates
    resume/+page.svelte    # printable resume (print styles in app.css)
    +error.svelte          # 404 page
vite.config.ts             # tailwindcss() plugin + sveltekit({...}) with adapter and preprocess (no svelte.config.js)
static/                    # icon.png, meta.png (OG), Resume-Richard-Pastenes.pdf
studio/
  sanity.config.ts         # studio config: custom structure, vision, tags plugin
  sanity.cli.ts            # projectId lpvkp4xx, dataset production, deployment appId
  schemas/documents/       # hero, about, project, resume
  schemas/objects/         # blockContent, imageFile, links, education, experience, achievment
```

### Data flow
- All content is fetched **on the server** in `+page.server.ts` load functions, using GROQ through `client.fetch`. Nothing is fetched on the client.
- Env vars are declared in `src/env.ts` with `defineEnvVars` (SvelteKit 3). All three are `static: true`, so they're inlined at build time. To add a variable, declare it there first. `src/lib/sanity.ts` imports `SANITY_PROJECT_ID`, `SANITY_DATASET`, and `SANITY_TOKEN` from `$app/env/private` (`$env/*` is deprecated in Kit 3). That means:
  - It can only be imported from server modules (`*.server.ts`). Importing it from a component will fail the build.
  - The vars have to exist **at build time**: locally in `.env.development` / `.env.production` (both gitignored), and in the Netlify dashboard for deploys.
- The client uses `useCdn: true` and `apiVersion: '2024-01-01'`.
- Image URLs are resolved on the server with `urlFor(...).width(n).format('webp').url()`: 380px for the headshot, 1000px for project screenshots. Components only ever get `{ alt, url }`.
- Projects are sorted by `orderRank`, which comes from `@sanity/orderable-document-list` (editors drag to reorder them in the studio).
- Tag fields (`about.tags`, `resume.skills`) are flattened to sorted `string[]` on the server. `project.tags` stays as `{label}[]`.

### Sanity content model
- `hero`: title, intro (block array; **only the first span is rendered** in Header), links (`links` object: twitter/linkedin/github handles), headshot (`imageFile`).
- `about`: content (block array with link annotations), tags (`tags` type).
- `project`: orderRank, title, screenshot, projectUrl, description (blocks), tags.
- `resume`: a singleton with document ID `resume`. Fields: name, jobTitle, contact fieldset, summary, interests, education[], experience[] (each with `achievment[]`), skills.
- The spelling **`achievment` is a typo, but it's part of the stored data.** Don't rename it in schemas or queries unless you also migrate the Content Lake.
- When you change a schema, update the matching GROQ projection in `src/routes/**/+page.server.ts` as well. The site has no generated types, so a mismatch fails silently and the field just renders empty.

## Conventions

- **Svelte 5 runes only**: `$props()`, `$derived()`, `$state()`, `{@render children()}`. Don't use `export let` or slots.
- **SvelteKit 3 specifics:** import from `#lib/...`, not `$lib` (it was removed; the mapping is in `package.json` `imports`). Use the `.ts` extension when importing a TS module through `#lib` (e.g. `#lib/sanity.ts`), or TypeScript can't resolve it. There's no `svelte.config.js`; Kit options go into `sveltekit({...})` in `vite.config.ts`.
- Use TypeScript in `<script lang="ts">`. Prop types are written inline (there's no shared types module). `tsconfig` is strict and extends `$app/tsconfig` (a package Kit installs).
- Formatting: tabs, single quotes, no trailing commas in `src/`. The `studio/` code uses 2 spaces, no semicolons, and `{a}` brace style. Match whichever file you're in.
- Styling is Tailwind utility classes in markup. Shared or global styles go in `src/app.css`, using `@apply` and native CSS nesting. Theme tokens (colors, fonts, spacing) live in the `@theme` block in `app.css`. Custom utilities use `@utility`.
- External links use `target="_blank" rel="noreferrer"`, and icon-only links get an `aria-label`. Icons are inline SVGs, with no icon library on the site.

## Gotchas

- **`--color-*: initial` in `@theme` replaces the default palette instead of extending it.** The only colors are `black, neutral, dark, darker, light, muted, green, white, gray, blue, transparent`. Classes like `text-red-500` or `bg-slate-800` won't exist. Fonts, `text-tiny`, and spacing (`480`, `600`, `nav`) extend the defaults. `container` is a custom `@utility`: centered, 640px from 640px wide, 1000px from 1000px wide.
- **Cascade layers:** Tailwind 4 puts utilities in `@layer utilities`, and CSS outside a layer beats every layer. Global element rules (`body`, `section`, `h1`–`h6`, `p`) must stay inside `@layer base`, or they'll override utility classes like `mb-0` or `text-5xl` on those elements. The resume `.rh*` classes are deliberately outside a layer, so they win over utilities, as they did in v3.
- `drop-shadow-lg` is a custom `@utility` that keeps v3's two-layer shadow. v4's default was removed with `--drop-shadow-lg: initial`.
- There's no hero animation right now. Vanta and Three.js were removed, and a replacement is part of Phase 4 (redesign).
- **The resume PDF is a static file** (`static/Resume-Richard-Pastenes.pdf`). It isn't generated from CMS data, so it has to be updated by hand when the resume content changes.
- The resume print styles live in `app.css` under `@media print` (A4 page, `.pdf-button` hidden) plus the `.rh1`–`.rh5`, `.rdate`, and `.rexperience` classes. Check print preview when you edit the resume page.
- The Footer social links are **hardcoded**. The Header social links come from the CMS (`hero.links`).
- `.claude/progress.md` tracks the roadmap and is current. Phases 1 (Gatsby → SvelteKit), 2 (Sanity v2 → v5), and 3 (Tailwind v3 → v4) are done. Phase 4 (redesign) is TODO.
- The README logo path (`src/images/icon.png`) points to a file that doesn't exist. The icon is at `static/icon.png`.
- **Vite 8 minifies CSS with Lightning CSS**, which is stricter than esbuild was. Invalid CSS (such as nesting `&` where it isn't allowed) now fails the build instead of passing through.
- Generated or ignored directories: `.svelte-kit/`, `build/`, `.netlify/`, `studio/.sanity/`, `studio/dist/`. Don't edit them.

## Deployment

- **Site:** Netlify builds on every push to `main` with `npm ci && npm run build` and publishes `build/`. It renders on the server through Netlify functions (adapter-netlify). The Sanity env vars are set in the Netlify dashboard.
- **Studio:** deployed separately to Sanity hosting with `cd studio && npm run deploy`.
