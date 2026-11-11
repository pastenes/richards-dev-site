# Hero landscape: assets and instructions (phase 6)

`HeroLandscape.svelte` here is a draft component generated from the design system's HeroLandscape preview (Mt. Hood from Trillium Lake, black and mint). It is **not** wired in. When you do phase 6, move it to `src/lib/components/HeroLandscape.svelte` and review it first.

## What it is
- One inline SVG, decorative (`aria-hidden`), six layer groups back to front: sky/stars/moon, Hood, foothills, mid tree line, lake with reflection, near trees + bank.
- Colors are Tailwind classes from the theme tokens only (`fill-land-sky`, `fill-land-far`, `fill-land-mid`, `fill-land-near`, `fill-land-front`, `fill-mint`, with `/85`, `/42` and `opacity-*` for the snow, halo and reflections). Needs `--color-mint` and the `--color-land-*` tokens in `src/app.css` (phase 1). If a utility doesn't resolve in this Tailwind build, check the token names first.
- Scroll: `bind:scrollY` and `bind:innerHeight` give `progress` (0 to 1 across one viewport). Each layer is `translate(0 -progress*k)` with k = 6, 14, 30, 62, 88, 150 (viewBox units), so near layers rise faster and the viewpoint seems to lower. `MediaQuery('(prefers-reduced-motion: reduce)')` from `svelte/reactivity` freezes it.
- The viewBox is `0 -240 960 600` with `preserveAspectRatio="xMaxYMax slice"`: bottom/right anchored, so on a 16:10 desktop you see the whole scene, and on a portrait phone the crop keeps the summit and the right-hand trees. The scene occupies the bottom 360 units; the 240 above are open sky. To make the mountain larger on screen, raise the y-start (for example `0 -160 960 520`).
- No pointer drift in this draft. Add it later as a second transform if wanted (`-pointerX * 40 * depth`).

## Wiring it into `Header.svelte`
1. Section: replace `bg-subtle` with `bg-land-sky`, keep `relative`, add `overflow-hidden`, keep the full-viewport height.
2. Render `<HeroLandscape />` as the first child, then the copy and photo with `relative z-10` so they sit above it.
3. Copy: `text-foreground` (not `text-muted`; about 3.5:1 on `land-far`). Keep it in the left, sky-only area. The headline can overlap the mountain's left foot only where it is `land-far`, never over the mint snow.
4. Cut-out photo: transparent WebP/PNG about 700px wide at 2x, anchored bottom-right, in front of layers 1 to 5. Layer 6 (near trees, bank) can go in front of the photo if you split it into a second component. Otherwise keep the photo above the whole SVG.
5. The Hood summit sits at about x=722 of 960, so the photo should be right of about 760 (or on mobile, below it) to leave the summit and left ridge visible.
6. Light theme and print: the `land-*` tokens switch to paper values automatically. For print, add `print:hidden` on the landscape (the resume page is the printed surface; the home hero normally isn't printed).
7. Keep an eye on performance: about 25 KB of inline paths; static, GPU-friendly transforms only. Don't animate on `scroll` events with layout reads; `bind:scrollY` is fine.

## Source of truth
The design system artifact's HeroLandscape preview (the silhouette was traced from a reference photo). If the art changes there, regenerate this file rather than hand-editing paths.
