<script lang="ts">
	import { PortableText, type InputValue } from '@portabletext/svelte';
	import RichTextLink from '#lib/components/RichTextLink.svelte';
	import RichTextList from '#lib/components/RichTextList.svelte';
	import RichTextListItem from '#lib/components/RichTextListItem.svelte';

	let { blocks = [] }: { blocks: unknown[] } = $props();
</script>

{#if blocks && blocks.length > 0}
	<PortableText
		value={blocks as InputValue}
		components={{ marks: { link: RichTextLink }, list: RichTextList, listItem: RichTextListItem }}
	/>
{/if}
