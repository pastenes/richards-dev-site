<script lang="ts">
	import Reveal from '#lib/components/Reveal.svelte';

	// Section heading: a mono eyebrow, then the title with its last word set in the script accent.
	let { eyebrow, title, script }: { eyebrow: string; title: string; script: string } = $props();
</script>

<Reveal as="header" class="mb-12">
	<p class="mb-3 font-mono text-sm text-caption">{eyebrow}</p>
	<h2 class="mb-0 text-heading-md text-foreground">
		{title}
		<span class="font-script text-script-lg text-accent">{script}</span>
	</h2>
</Reveal>
