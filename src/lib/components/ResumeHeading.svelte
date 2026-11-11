<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<!-- Resume section title: lowercase mono in the accent color over a short accent rule. -->
<h2
	class="relative mt-8 mb-4 inline-block pb-1.5 font-mono text-sm tracking-normal text-accent lowercase before:absolute before:bottom-0 before:left-0 before:h-px before:w-7.5 before:bg-accent"
>
	{@render children()}
</h2>
