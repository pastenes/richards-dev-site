<script lang="ts">
	import type { Snippet } from 'svelte';
	import { reveal } from '#lib/actions/reveal.ts';

	// Fades and lifts its content in when it scrolls into view. `step` staggers siblings.
	// `as` sets the element (e.g. `li` inside a list); `class` adds the element's own classes.
	const delays = ['delay-0', 'delay-100', 'delay-200', 'delay-300'];

	let {
		children,
		as = 'div',
		step = 0,
		class: className = ''
	}: { children: Snippet; as?: string; step?: number; class?: string } = $props();
</script>

<svelte:element
	this={as}
	use:reveal
	class="transition duration-700 ease-out-expo data-hidden:translate-y-6 data-hidden:opacity-0 {delays[
		step % delays.length
	]} {className}"
>
	{@render children()}
</svelte:element>
