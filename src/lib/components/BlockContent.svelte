<script lang="ts">
	import { PortableText, type InputValue } from '@portabletext/svelte';

	let { blocks = [] }: { blocks: unknown[] } = $props();
</script>

{#if blocks && blocks.length > 0}
	<PortableText value={blocks as InputValue} />
{/if}
