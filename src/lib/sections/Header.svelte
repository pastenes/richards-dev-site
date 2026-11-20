<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import HeroLandscape from '#lib/components/HeroLandscape.svelte';
	import SocialLinks from '#lib/components/SocialLinks.svelte';

	type HeroData = {
		title?: string;
		intro?: Array<{ children?: Array<{ text?: string }> }>;
	};

	// `pointer` is bindable so the page can pass it to the headshot, which lives outside the hero.
	let {
		hero = {} as HeroData,
		pointer = $bindable({ x: 0, y: 0 })
	}: { hero: HeroData; pointer?: { x: number; y: number } } = $props();

	// Hover parallax: the pointer's position across the viewport (-1..1 on each axis), eased so the
	// landscape layers and the photo (`Headshot.svelte`) glide after it. Off for touch and reduced motion.
	const reduceMotion = new MediaQuery('(prefers-reduced-motion: reduce)');
	const finePointer = new MediaQuery('(hover: hover) and (pointer: fine)');
	let target = { x: 0, y: 0 };
	let frame = 0;

	function ease() {
		const x = pointer.x + (target.x - pointer.x) * 0.08;
		const y = pointer.y + (target.y - pointer.y) * 0.08;
		const settled = Math.abs(target.x - x) < 0.001 && Math.abs(target.y - y) < 0.001;
		pointer = settled ? { ...target } : { x, y };
		frame = settled ? 0 : requestAnimationFrame(ease);
	}

	function aim(x: number, y: number) {
		target = { x, y };
		if (!frame) frame = requestAnimationFrame(ease);
	}

	// The pause button stops the birds and the pointer drift (WCAG 2.2.2: motion that runs on its own
	// needs a way to stop it). The choice lasts for the browser session.
	let paused = $state(false);
	$effect(() => {
		paused = sessionStorage.getItem('hero-paused') === '1';
	});

	function togglePause() {
		paused = !paused;
		sessionStorage.setItem('hero-paused', paused ? '1' : '0');
		if (paused) aim(0, 0);
	}

	function onpointermove(event: PointerEvent) {
		if (paused || reduceMotion.current || !finePointer.current || event.pointerType === 'touch') return;
		aim((event.clientX / window.innerWidth) * 2 - 1, (event.clientY / window.innerHeight) * 2 - 1);
	}

	// Drift back to center when the pointer leaves the window. (`pointerout` with no relatedTarget
	// isn't reliable here: it also fires when moving between the landscape's SVG `<use>` elements.)
	$effect(() => {
		const recenter = () => aim(0, 0);
		document.documentElement.addEventListener('mouseleave', recenter);
		return () => {
			document.documentElement.removeEventListener('mouseleave', recenter);
			cancelAnimationFrame(frame);
		};
	});
</script>

<svelte:window {onpointermove} />

<!--
	Hero: layered Mt. Hood landscape behind, copy in the open sky on the left. The cut-out photo
	is `Headshot.svelte`, rendered by the page so it can stick beside About on desktop.
-->
<!--
	`min-h-screen`, not `h-screen`: at high zoom (or on a short window) the hero grows to fit its copy
	instead of clipping it. The copy is z-20, above the photo layer (z-10), so it stays readable where
	they meet.
-->
<section class="relative min-h-screen overflow-hidden bg-land-sky px-6 pb-24 md:px-14 lg:px-32">
	<HeroLandscape {pointer} {paused} />

	<div class="relative z-20 max-w-xl pt-28 md:pt-36">
		<p class="mb-2 font-mono text-accent">Hi, I'm</p>
		<h1 class="mb-4 text-heading-md text-foreground md:text-display-lg lg:text-display-xl">
			{hero.title ?? ''}
		</h1>
		<p class="text-lg text-foreground">{hero.intro?.[0]?.children?.[0]?.text ?? ''}</p>

		<!-- Only the networks with a handle in Site settings. -->
		<div class="mt-8 flex gap-3">
			<SocialLinks linkClass="text-foreground hover:text-accent" />
		</div>
	</div>

	<!-- Pause/play for the birds. Not shown under reduced motion, where the birds aren't rendered. -->
	<button
		type="button"
		onclick={togglePause}
		aria-label="Pause animation"
		aria-pressed={paused}
		class="absolute bottom-6 left-6 z-20 rounded-full border border-border bg-surface/80 p-2 text-muted backdrop-blur hover:text-accent motion-reduce:hidden print:hidden md:left-14 lg:left-32"
	>
		{#if paused}
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" /></svg>
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
		{/if}
	</button>
</section>
