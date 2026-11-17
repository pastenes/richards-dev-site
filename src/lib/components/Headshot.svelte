<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';

	type Headshot = { alt?: string; url?: string | null; srcset?: string } | null;

	let {
		headshot,
		pointer = { x: 0, y: 0 }
	}: { headshot?: Headshot; pointer?: { x: number; y: number } } = $props();

	// From lg, the photo glides left as it rises (over the first 25% of the viewport scrolled, until it
	// sticks), from the window's right edge to the content column's (max-w-wide, 1000px; the photo
	// overhangs the window by 12px), so it ends up beside the About text and stays right of the summit
	// in the hero.
	const desktop = new MediaQuery('(min-width: 1024px)');
	let scrollY = $state(0);
	// The layer's width, not `innerWidth`: it leaves out a classic (Windows) scrollbar, as the centered
	// content column does.
	let width = $state(0);
	let innerHeight = $state(1);
	const glide = $derived(
		desktop.current
			? Math.min(1, scrollY / (innerHeight * 0.25)) * Math.max(0, (width - 1000) / 2 + 12)
			: 0
	);
</script>

<svelte:window bind:scrollY bind:innerHeight />

<!--
	The cut-out photo. The page puts it in a layer over the hero and About (ending where About's text
	ends). On load it sits bottom-right in the hero, inside a viewport-tall box. From lg the box is
	sticky at -25vh: the photo scrolls up with the hero (gliding left, see `glide`), then stays put
	beside the About text (bottom at 75% of the viewport) until the text scrolls away and takes it
	along. Its cropped bottom edge fades out, since it no longer meets the bottom of the hero. Below lg
	the text spans the width, so the photo just scrolls away with the hero.
-->
{#if headshot?.url}
	<div
		bind:clientWidth={width}
		class="pointer-events-none absolute inset-x-0 top-0 bottom-32 z-10 overflow-x-clip"
	>
		<div class="flex h-screen items-end justify-end lg:sticky lg:-top-1/4">
			<img
				src={headshot.url}
				srcset={headshot.srcset}
				sizes="(min-width: 1024px) min(20vw, 448px), (min-width: 768px) min(33vw, 448px), min(50vw, 448px)"
				alt={headshot.alt ?? ''}
				width="700"
				height="758"
				fetchpriority="high"
				style:translate="{-pointer.x * 10 - glide}px 0"
				class="-mr-3 w-1/2 max-w-md md:w-1/3 lg:w-1/5 lg:mask-b-from-75%"
			/>
		</div>
	</div>
{/if}
