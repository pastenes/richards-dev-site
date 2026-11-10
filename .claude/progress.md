# Richard's Dev Landing - Migration Roadmap & Progress

## Phase 1: Migrate from Gatsby to SvelteKit `STATUS: COMPLETE`

Replace Gatsby 5 + React 18 with SvelteKit 2 + Svelte 5. This is the primary architectural migration.

### Goals
- Replace Gatsby static site generator with SvelteKit
- Replace React components with Svelte components
- Replace GraphQL data fetching with GROQ queries via @sanity/client
- Deploy on Netlify using @sveltejs/adapter-netlify
- Maintain all existing functionality and visual parity

### Tasks
- [x] Initialize SvelteKit 2 project with TypeScript
- [x] Set up Netlify adapter and deployment config
- [x] Create Sanity client module (`src/lib/sanity.ts`) with GROQ queries
- [x] Migrate Layout component → `+layout.svelte`
- [x] Migrate Hero/Header section (including Vanta.js animation)
- [x] Migrate About section (portable text + tech tags)
- [x] Migrate Work/Projects section
- [x] Migrate Footer component
- [x] Migrate Jumplinks navigation
- [x] Migrate SEO (react-helmet → svelte:head)
- [x] Migrate Resume page with print styles
- [x] Migrate 404/Error page
- [x] Migrate global CSS and Tailwind config (update content paths for .svelte)
- [x] Set up image handling (@sanity/image-url)
- [x] Configure environment variables ($env/static/private)
- [x] Remove all Gatsby files, React deps, and Storybook
- [x] Update .nvmrc to Node 20 LTS
- [x] Test full build (vite build succeeds)
- [x] Test with live Sanity data (npm run dev)
- [ ] Deploy to Netlify and verify live site

### Key Decisions
- Keep Tailwind CSS v3 (upgrade deferred to Phase 3)
- Keep Sanity CMS v2 for now (upgrade deferred to Phase 2)
- Drop Storybook (reassess after migration)
- Use @portabletext/svelte for block content rendering

---

## Phase 2: Upgrade Sanity CMS v2 → v5 `STATUS: COMPLETE`

Sanity v2 was end-of-life. Migrated directly to v5 (React 19, modern plugin API).

### Goals
- Migrate Sanity Studio from v2 (sanity.json) to v5 (sanity.config.ts)
- Update all Sanity packages to v5
- Migrate schemas to TypeScript with defineType/defineField
- Update plugins for v5 compatibility

### Tasks
- [x] Create `sanity.config.ts` with defineConfig, structureTool, visionTool, custom desk structure
- [x] Create `sanity.cli.ts` with deployment appId
- [x] Replace `cms/package.json` — all v2 deps replaced with sanity@^5, react@^19.2, styled-components@^6
- [x] Update `cms/tsconfig.json` for v5 (bundler moduleResolution, react-jsx)
- [x] Migrate all 10 schema files from .js to .ts with defineType/defineField/defineArrayMember
- [x] Remove old v2 files (sanity.json, schema.js, tags.js, desk/index.js, .eslintrc, config/)
- [x] Replace sanity-plugin-autocomplete-tags (v2) with sanity-plugin-tags-v4 (React 19 compatible fork)
- [x] Update @sanity/orderable-document-list to v1.4+ with context parameter
- [x] Add .sanity to cms/.gitignore (auto-generated runtime files)
- [x] Deploy studio with `npx sanity deploy`
- [x] Fix missing _key warnings on existing tag data (one-time Content Lake fix via studio UI)
- [x] Verify all document types, tags, ordering, and vision tool work correctly

### Key Decisions
- Went directly from v2 to v5 (skipping v3/v4) since all are compatible
- Used sanity-plugin-tags-v4 fork (original sanity-plugin-tags bundles React 18 internals, crashes with React 19)
- Desk structure callback updated to pass `context` for orderable-document-list v3+ API
- Content Lake data unchanged — only studio configuration migrated
- Used --legacy-peer-deps during install (no longer needed after switching to tags-v4 fork)

---

## Phase 3: Migrate Tailwind CSS v3 → v4 `STATUS: COMPLETE`

Tailwind v4 is a full rewrite with a new configuration approach and significant performance improvements.

### Goals
- Upgrade from Tailwind CSS v3 to v4.x
- Migrate configuration from JS config to CSS-based config
- Update all utility classes that changed between v3 and v4

### Tasks
- [x] Review Tailwind v4 migration guide (ran `@tailwindcss/upgrade`, then reviewed by hand)
- [x] Replace `tailwind.config.js` with CSS-based configuration (`@theme` in `app.css`)
- [x] Replace PostCSS with the `@tailwindcss/vite` plugin (removed `postcss.config.js`, autoprefixer, `tailwindcss/nesting`)
- [x] Audit and update deprecated utility classes (`bg-opacity-*` and `border-opacity-*` → `/opacity` modifiers)
- [x] Update custom theme values (colors, fonts, spacing, container)
- [x] Test responsive breakpoints (computed-style diff at 390/800/1280px vs v3: identical)
- [x] Verify print styles still work for resume page (print-media diff vs v3: identical)

### Key Decisions
- Global element styles moved into `@layer base` so utilities still override them (v4 cascade layers)
- `drop-shadow-lg` uses v4's default single shadow (a multi-layer token generates invalid CSS in 4.3)
- Removed the border-color compatibility block the upgrade tool added (v3 already resolved to `currentColor` here)
- `duration-250` now takes effect (v3 had no 250 step and silently used 150ms)

### Also done alongside Phase 3
- Upgraded to SvelteKit 3, Vite 8, TypeScript 6, Sanity 6, and Node 26
- Removed Vanta.js and the vendored `static/three.min.js` (r135). The hero is a static grey background until the Phase 4 redesign.
- Design-system cleanup:
  - All styling is plain Tailwind classes built from `@theme` tokens. Removed every custom class and `@utility` (`container`, `drop-shadow-lg`, `.blink`, `.pdf-button`, `.rh1`–`.rh5`, `.rdate`, `.rexperience`), and there are no arbitrary values.
  - Fonts are named by role (`font-heading`, `font-body`, `font-mono`, `font-resume-heading`, `font-resume-body`). `font-mono` is Fira Code everywhere; the footer, 404 link and resume used to fall back to the system mono font.
  - Colors are named by role: `background`, `surface`, `foreground`, `muted`, `accent`, `subtle`, `resume-band`, `resume-accent` (replacing `darker`, `dark`, `light`, `green`, `neutral`, `gray`, `blue`).
  - Removed the global `body`/`section` rules. Their classes now sit on `<body>` and on each section.
  - Fixed the resume's white background stopping at the viewport height (`body` was `h-screen` and the wrapper was `h-full`).

---

## Phase 4: Update Design `STATUS: TODO`

Refresh the visual design of the portfolio site.

### Goals
- Modernize the overall look and feel
- Improve typography and spacing
- Enhance animations and interactions
- Improve mobile experience
- Update color palette if desired

### Tasks
- [ ] Design review and mood board
- [ ] Update color scheme and typography
- [ ] Redesign hero section (including a replacement for the removed Vanta birds animation)
- [ ] Redesign project cards
- [ ] Improve responsive layout
- [ ] Add page transitions
- [ ] Accessibility audit and improvements
- [ ] Performance optimization (Core Web Vitals)

---

## Completed Work

_(Items will be moved here as phases are completed)_
