<script lang="ts">
	import { PortableText } from '@portabletext/svelte';

	let { blocks = [] }: { blocks: unknown[] } = $props();
</script>

{#if blocks && blocks.length > 0}
	<PortableText value={blocks} />
{/if}
