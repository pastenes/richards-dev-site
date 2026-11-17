<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<!--
	Resume section title: lowercase mono in the accent color over a short accent rule. It's a block (so
	print can keep it with the content below it), and the rule is an in-flow block, not absolutely positioned, so the heading isn't painted (and stored in the PDF) after
	the text it introduces.
-->
<h2
	class="mt-8 mb-4 font-mono text-sm tracking-normal text-accent lowercase after:mt-1.25 after:block after:h-px after:w-7.5 after:bg-accent print:mt-5 print:mb-2.5 print:break-after-avoid"
>
	{@render children()}
</h2>
