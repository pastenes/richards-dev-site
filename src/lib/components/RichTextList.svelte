<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ListComponentProps } from '@portabletext/svelte';

	// Bullet and numbered lists in Sanity rich text. Tailwind's reset removes list markers and
	// indentation, so they're set here. Nested lists (level > 1) sit tight under their parent item.
	let { portableText, children }: { portableText: ListComponentProps; children?: Snippet } =
		$props();

	const numbered = $derived(portableText.value.listItem === 'number');
	const nested = $derived((portableText.value.level ?? 1) > 1);
	const classes = $derived(
		[
			numbered ? 'list-decimal' : 'list-disc',
			nested ? 'mt-1 mb-0' : 'mb-4',
			'space-y-1 pl-6 marker:text-accent'
		].join(' ')
	);
</script>

{#if numbered}
	<ol class={classes}>{@render children?.()}</ol>
{:else}
	<ul class={classes}>{@render children?.()}</ul>
{/if}
