# Redesign handoff plan

Source of truth for visuals: the "Pastenes Portfolio Design System" artifact (Claude). This folder translates it into this repo's conventions (SvelteKit 3, Svelte 5 runes, Tailwind 4 `@theme`, role-named tokens, no custom classes, no arbitrary values).

**Nothing here is committed.** Per `.claude/CLAUDE.md`, commits are manual. Suggested commit boundaries are listed per phase.

## Decisions made
- Look: black and mint, modernized. Dark and light follow the system setting; print is always white.
- Fonts: Instrument Serif (headings, weight 400 only), Instrument Sans (body), Caveat (script accent, one word per section heading), Fira Code (tags, nav, meta).
- Projects: bento grid (3 columns, featured card spans 2).
- Skills: grouped (Front-end / Styling and motion / Content and back-end / Workflow and hosting), core items highlighted.
- Certifications: new section; first entry Next.js Certified Developer (Vercel). Year and credential ID are placeholders.
- Hero: new cut-out photo + layered parallax vector landscape (details to come from Richard).
- Animate on scroll: a Svelte action using IntersectionObserver, respecting `prefers-reduced-motion`.

## Decisions (round 2)
- **Skills and certifications:** hard-coded in Svelte for now (no Sanity schema or GROQ changes in this redesign). Cert year and credential ID stay as hard-coded placeholders.
- **Theme:** follows the visitor's system setting (`prefers-color-scheme`): dark = black and mint, light = "paper". Both ship, so the paper values in the design system (see `tokens.json`, light column) get added as a `@media (prefers-color-scheme: light)` override of the same role-named tokens, with no separate class names.
- **Print / PDF:** always the white version, regardless of system theme. Print rules force the paper values (and the existing `print:bg-white` on body). The goal is to produce the PDF from the resume page itself.
  - Today `static/Resume-Richard-Pastenes.pdf` is a hand-maintained static file. Decide in the resume phase: keep it as an export of the print view (simple, manual) or generate it at build time. Start with the manual export of the print view.
- **Hero landscape:** a view of Mt. Hood from Trillium Lake, in black and mint.
  - Layers, back to front: night sky (stars, moon), snow-capped Mt. Hood with a mint-tinted summit, a distant ridge, a mid evergreen tree line, the lake with Hood's reflection, and near evergreen silhouettes framing both sides (nearest layer).
  - Scroll behavior: the layers shift at different rates to suggest the viewpoint **lowering** (like crouching at the water's edge). Near layers and the lake rise fastest, the mid tree line rises slower, and the mountain and sky barely move, so the tree lines gradually climb in front of Hood and the horizon sinks. A layer's rate equals its depth factor, so the existing depths (0.1 / 0.2 / 0.4 / 0.7 / 1) can be reused or extended to six layers.
  - Mint use: summit highlight, moon glow and its lake reflection. Everything else stays in the dark `land-*` greens, with the light theme using the paper `land-*` values.
  - The cut-out photo sits above the front layer. `prefers-reduced-motion` disables the shift (static composition).
  - The design system's `HeroLandscape` currently draws generic ridges. It needs redrawing as the Trillium/Hood scene before this phase.

## Open questions
1. Hero cut-out photo (the file) and the final landscape artwork: drawn as SVG layers in the design system first, then exported to the repo.
2. Real cert year and credential ID, whenever you have them.

## Phases (each = one review + one commit by you)
1. **Tokens and fonts. DONE (by Richard, in `src/app.css`).** Merge the design system's tokens into `src/app.css` `@theme`. Install `@fontsource/instrument-serif`, `instrument-sans`, `caveat`; update imports in `+layout.svelte`. Change the base-layer heading rule: Instrument Serif has no bold, so drop `font-bold`. Keep `subtle` and `resume-*` tokens for now. Run `npm run build` and svelte-check. (`/design-sync` doesn't support Svelte components, so the artifact and the code are kept in step by hand; tokens live in `src/app.css`.)
2. **Nav.** Replace `Jumplinks.svelte` (sticky vertical) with a floating pill nav (now `src/lib/components/Nav.svelte`).
3. **Work.** Replace the alternating rows in `Work.svelte` with the bento grid. No data changes needed.
4. **Skills + Certifications.** Replace `TechTags` with grouped skills; add `Certifications.svelte`. Hard-coded data in the components (no Sanity changes).
5. **Reveal action.** `src/lib/actions/reveal.ts` and apply to sections/cards.
6. **Hero.** New `Header.svelte` with cut-out and layered landscape (parallax on scroll, pointer tilt optional). Needs Richard's assets.
7. **Resume restyle and PDF.** Print view always white; export the PDF from it. Check print preview.

## Workflow
- Code changes happen in the Zed Claude Code session; this chat is for design review and mockups.
- Visual iteration loop: change the design system artifact here, then update the matching component in `src/`.
- Update `.claude/progress.md` when a phase is done (Phase 4 "redesign" is the current TODO there).
- Constraints to remember: no arbitrary values (spacing scale accepts multiples of 0.25), no `@apply`, repeated class groups become components, external links `target="_blank" rel="noreferrer"`, icon-only links get `aria-label`.
