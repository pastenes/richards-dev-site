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

There are **no lint, format, typecheck, or test scripts**. To check your work, run `npm run build`. For type checking, `npx svelte-check` also works, but it isn't installed as a dependency.

## Runtime & versions

- **Node 24**, set in `.nvmrc` (`v24`) and in `netlify.toml` (`NODE_VERSION = "24"`). nvm switches to it automatically when you `cd` into the repo. In a non-interactive shell (scripts, agent tools), run `nvm use` first, since the default there may be v22.
- npm, ESM only (`"type": "module"` in both projects). The lockfiles are `package-lock.json`.

| Package | Range | Installed |
|---|---|---|
| svelte | ^5 | 5.53 |
| @sveltejs/kit | ^2 | 2.53 |
| @sveltejs/adapter-netlify | ^4 | 4.4 |
| @sveltejs/vite-plugin-svelte | ^5 \|\| ^6 | 6.2 |
| vite | ^6 | 6.4 |
| tailwindcss | ^3.4 | 3.4.19 |
| typescript | ^5.5 | 5.9 |
| @sanity/client | ^6 | 6.29 |
| @sanity/image-url | ^1 | — |
| @portabletext/svelte | ^3 | 3.0 |
| vanta | ^0.5.24 | 0.5.24 |
| **studio:** sanity | ^5 | 5.14 |
| **studio:** react / react-dom | ^19.2 | 19.2 |
| **studio:** @sanity/vision | ^3 | 3.99 (behind the v5 studio, may be worth bumping) |
| **studio:** @sanity/orderable-document-list | ^1.4 | 1.5 |
| **studio:** sanity-plugin-tags-v4 | ^1.0.10 | 1.0.10 |
| **studio:** styled-components | ^6.1 | — |

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
  app.html                 # HTML shell; loads /three.min.js globally (needed by Vanta)
  app.css                  # Tailwind directives, global element styles, print + resume styles
  lib/
    sanity.ts              # Sanity client + urlFor() image builder (SERVER ONLY)
    sections/              # Header (hero + Vanta birds), About, Work
    components/            # BlockContent (PortableText), Footer, Jumplinks, TechTags
  routes/
    +layout.svelte         # imports app.css + base fonts
    +page.server.ts        # GROQ: hero, about, projects (Promise.all)
    +page.svelte           # landing page + SEO/OG meta in <svelte:head>
    resume/+page.server.ts # GROQ: resume singleton; formats experience dates
    resume/+page.svelte    # printable resume (print styles in app.css)
    +error.svelte          # 404 page
static/                    # three.min.js, icon.png, meta.png (OG), Resume-Richard-Pastenes.pdf
studio/
  sanity.config.ts         # studio config: custom structure, vision, tags plugin
  sanity.cli.ts            # projectId lpvkp4xx, dataset production, deployment appId
  schemas/documents/       # hero, about, project, resume
  schemas/objects/         # blockContent, imageFile, links, education, experience, achievment
```

### Data flow
- All content is fetched **on the server** in `+page.server.ts` load functions, using GROQ through `client.fetch`. Nothing is fetched on the client.
- `src/lib/sanity.ts` reads `SANITY_PROJECT_ID`, `SANITY_DATASET`, and `SANITY_TOKEN` from `$env/static/private`. That means:
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
- Use TypeScript in `<script lang="ts">`. Prop types are written inline (there's no shared types module). `tsconfig` is strict and extends `.svelte-kit/tsconfig.json`.
- Formatting: tabs, single quotes, no trailing commas in `src/`. The `studio/` code uses 2 spaces, no semicolons, and `{a}` brace style. Match whichever file you're in.
- Styling is Tailwind utility classes in markup. Shared or global styles go in `src/app.css`, using `@apply` and PostCSS nesting (`tailwindcss/nesting`).
- External links use `target="_blank" rel="noreferrer"`, and icon-only links get an `aria-label`. Icons are inline SVGs, with no icon library on the site.

## Gotchas

- **The Tailwind `theme.colors` setting replaces the default palette instead of extending it.** The only colors are `black, neutral, dark, darker, light, muted, green, white, gray, blue, transparent`. Classes like `text-red-500` or `bg-slate-800` won't exist. Fonts, `fontSize.tiny`, and spacing (`480`, `600`, `nav`) are extended, so those defaults are kept. The container is centered, with screens sm/md 640px and lg/xl 1000px.
- **Vanta/Three.js:** Three.js isn't an npm dependency. It's served from `static/three.min.js` through a `<script>` in `app.html` and read from `window.THREE`. Vanta birds is dynamically imported inside `onMount` so it never runs during SSR, and it's destroyed on unmount.
- **The resume PDF is a static file** (`static/Resume-Richard-Pastenes.pdf`). It isn't generated from CMS data, so it has to be updated by hand when the resume content changes.
- The resume print styles live in `app.css` under `@media print` (A4 page, `.pdf-button` hidden) plus the `.rh1`–`.rh5`, `.rdate`, and `.rexperience` classes. Check print preview when you edit the resume page.
- The Footer social links are **hardcoded**. The Header social links come from the CMS (`hero.links`).
- `.claude/progress.md` tracks the roadmap and is current. Phases 1 (Gatsby → SvelteKit) and 2 (Sanity v2 → v5) are done. Phase 3 (Tailwind v3 → v4) and Phase 4 (redesign) are still TODO.
- The README logo path (`src/images/icon.png`) points to a file that doesn't exist. The icon is at `static/icon.png`.
- Generated or ignored directories: `.svelte-kit/`, `build/`, `.netlify/`, `studio/.sanity/`, `studio/dist/`. Don't edit them.

## Deployment

- **Site:** Netlify builds on every push to `main` with `npm ci && npm run build` and publishes `build/`. It renders on the server through Netlify functions (adapter-netlify). The Sanity env vars are set in the Netlify dashboard.
- **Studio:** deployed separately to Sanity hosting with `cd studio && npm run deploy`.
