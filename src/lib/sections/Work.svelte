<script lang="ts">
	import BlockContent from '#lib/components/BlockContent.svelte';

	type Project = {
		_id: string;
		title: string;
		projectUrl: string;
		tags: Array<{ label: string }>;
		description: unknown[];
		screenshot: { alt: string; url: string | null } | null;
	};

	let { projects = [] }: { projects: Project[] } = $props();
</script>

<section id="work" class="px-14 py-32 lg:px-32">
	<div class="mx-auto sm:max-w-narrow lg:max-w-wide">
		<h2 class="text-right text-3xl text-foreground">Work</h2>
		<p class="text-right text-foreground">Some things I've built</p>

		{#each projects as project, index (project._id)}
			{@const side = index % 2 === 0}
			<div
				class="relative my-24 flex h-150 flex-col items-center first-of-type:mt-8 lg:my-48 lg:h-auto {side
					? 'lg:flex-row'
					: 'lg:flex-row-reverse'}"
			>
				<div class="size-full lg:w-1/2">
					<a href={project.projectUrl} target="_blank" rel="noreferrer">
						{#if project.screenshot?.url}
							<img
								src={project.screenshot.url}
								alt={project.screenshot.alt}
								width="1000"
								loading="lazy"
								class="size-full object-cover brightness-75 grayscale transition duration-250 ease-in-out hover:brightness-100 hover:grayscale-0"
							/>
						{/if}
					</a>
				</div>
				<div
					class="absolute z-10 flex size-full flex-col justify-center border-2 border-foreground/50 bg-surface/75 px-6 lg:relative lg:block lg:h-auto lg:w-1/2 lg:border-0 lg:bg-transparent lg:p-0"
				>
					<h3 class="text-foreground lg:mb-4 {side ? 'lg:text-right' : ''}">
						{project.title}
					</h3>
					<div class="lg:bg-surface lg:drop-shadow-lg {side ? 'lg:-ml-20' : 'lg:-mr-20'}">
						<div class="py-6 text-muted lg:px-8 {side ? 'lg:text-right' : ''}">
							<BlockContent blocks={project.description} />
						</div>
					</div>
					<ul class="flex flex-wrap font-mono {side ? 'lg:justify-end' : ''}">
						{#each project.tags as tag (tag.label)}
							<li class="mt-2 pr-4 text-tiny text-accent {side ? 'lg:pr-0 lg:pl-4' : ''}">
								{tag.label}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/each}
	</div>
</section>
