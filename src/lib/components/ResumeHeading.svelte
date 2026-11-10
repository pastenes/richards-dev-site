<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<h3
	class="relative my-4 inline-block font-mono text-lg font-bold text-resume-accent lowercase before:absolute before:bottom-0 before:left-0 before:h-px before:w-7.5 before:bg-black"
>
	{@render children()}
</h3>
