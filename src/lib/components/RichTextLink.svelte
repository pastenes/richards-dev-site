<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MarkComponentProps } from '@portabletext/svelte';

	// Link annotation in Sanity rich text (About, project descriptions). External links open in a new tab.
	let {
		portableText,
		children
	}: { portableText: MarkComponentProps<{ href?: string; blank?: boolean }>; children?: Snippet } =
		$props();

	const href = $derived(portableText.value?.href);
	const external = $derived(
		portableText.value?.blank === true ||
			(!!href && /^https?:\/\//.test(href) && !/^https?:\/\/([^/]*\.)?pastenes\.dev(\/|$)/.test(href))
	);
</script>

{#if href}
	<a
		{href}
		target={external ? '_blank' : undefined}
		rel={external ? 'noreferrer' : undefined}
		class="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-current"
		>{@render children?.()}</a
	>
{:else}
	{@render children?.()}
{/if}
