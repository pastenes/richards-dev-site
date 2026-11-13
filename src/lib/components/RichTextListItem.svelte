<script lang="ts">
	import type { Snippet } from 'svelte';

	// One item in a rich-text list (any style). Registered so PortableText doesn't warn about the
	// "normal" item style Sanity stores; markers and spacing come from RichTextList.
	let { children }: { children?: Snippet } = $props();
</script>

<li>{@render children?.()}</li>
