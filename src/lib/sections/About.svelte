<script lang="ts">
	import BlockContent from '#lib/components/BlockContent.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import SectionHeading from '#lib/components/SectionHeading.svelte';

	let { content = [] }: { content: unknown[] } = $props();
</script>

<section id="about" class="px-6 py-32 md:px-14 lg:px-32">
	<div class="mx-auto sm:max-w-narrow lg:max-w-wide">
		<SectionHeading eyebrow="About" title="A little about" script="me" />
		<Reveal class="max-w-2xl text-lg text-muted">
			<BlockContent blocks={content} />
		</Reveal>
	</div>
</section>
