<script lang="ts">
	import Reveal from '#lib/components/Reveal.svelte';

	// Section heading: a mono eyebrow, then the title with its last word set in the script accent.
	// `level` is the heading element: h2 for page sections, h1 when it's the page's only heading.
	let {
		eyebrow,
		title,
		script,
		level = 'h2'
	}: { eyebrow: string; title: string; script: string; level?: 'h1' | 'h2' } = $props();
</script>

<Reveal as="header" class="mb-12">
	<p class="mb-3 font-mono text-sm text-caption">{eyebrow}</p>
	<svelte:element this={level} class="mb-0 text-heading-md text-foreground">
		{title}
		<span class="font-script text-script-lg text-accent">{script}</span>
	</svelte:element>
</Reveal>
