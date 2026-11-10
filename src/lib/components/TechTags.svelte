<script lang="ts">
	let { tags = [] }: { tags: string[] } = $props();
</script>

<div class="basis-1/2 lg:basis-1/4">
	<h3 class="mb-6 text-foreground">A few technologies I'm familiar with:</h3>
	<ul class="grid grid-cols-2 font-mono text-tiny text-accent">
		{#each tags as tag (tag)}
			<li>{tag}</li>
		{/each}
	</ul>
</div>
