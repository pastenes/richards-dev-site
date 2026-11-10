<script lang="ts">
	import Jumplinks from '#lib/components/Jumplinks.svelte';
	import BlockContent from '#lib/components/BlockContent.svelte';
	import TechTags from '#lib/components/TechTags.svelte';

	let { content = [], tags = [] }: { content: unknown[]; tags: string[] } = $props();
</script>

<Jumplinks />
<section id="about" class="relative px-14 py-32 lg:px-32">
	<div class="mx-auto h-full max-w-4xl">
		<h2 class="text-right text-3xl text-foreground">About Me</h2>
		<p class="text-right text-foreground">And the tech I use</p>
		<div class="flex h-full flex-col items-center justify-between lg:flex-row">
			<div class="basis-1/2 py-14 text-muted">
				<BlockContent blocks={content} />
			</div>
			<TechTags {tags} />
		</div>
	</div>
</section>
