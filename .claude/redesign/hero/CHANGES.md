# Hero landscape v2 (apply in phase 6 follow-up)

`HeroLandscape.svelte` in this folder is the updated scene. It is meant to **replace** `src/lib/components/HeroLandscape.svelte` as is (it already includes `print:hidden`). Review the diff before committing; it is mostly regenerated SVG.

Feedback addressed:
1. **Denser, more detailed trees.** Six hand-built spruce silhouettes (7 to 10 tiers, drooping branch tips, lean, trunk) are defined once in `<defs>` (`#t0` to `#t5`) and placed with `<use>`, in two shoreline rows (about 4 to 9 units apart) plus two near-forest bands. Also: lake ripple lines and four more rock gullies on Hood.
2. **Moon moved up and its reflection removed.** Moon is now at (560, -125) in viewBox units (about 20% from the top on a full-viewport hero); the `moonrefl` shape is gone.
3. **Trees take over on scroll.** `progress` now reaches 1 after scrolling 55% of the viewport (`scrollY / (innerHeight * 0.55)`, was `scrollY / innerHeight`). Two new near-forest layers rise by k = 230 and 290 (the old near layer was 150), so by then the visible bottom of the hero is solid forest.

Layer k values: sky 6, Hood 14, foothills 30, back trees 50, front trees 72, lake 100, near forest 230, front forest 290.

Check after applying:
- At rest the hero should look like the screenshot, with the moon higher and no moon reflection.
- Scroll slowly: trees climb over the lake and the mountain's base; by about half a viewport the remaining hero is forest.
- The cut-out photo sits above the SVG (z-order in `Header.svelte` unchanged).

## v2.1: front-most background-coloured tree row
Added a ninth layer, last in the SVG: a dense row of spruces filled with `fill-background` (the page background token) and a solid `fill-background` base below it, pinned to the bottom edge of the hero (`k` 0, so it doesn't rise with scroll). Its tips cut into the forest above, and its base is the same colour as the section below, so there is no seam between the hero and About. It follows the theme (paper colour in the light theme). Replace `src/lib/components/HeroLandscape.svelte` again with this file.
