<script lang="ts">
	import BlockContent from '$lib/components/BlockContent.svelte';

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

<section id="work">
	<div class="container">
		<h2 class="text-right text-3xl text-light">Work</h2>
		<p class="text-right text-light">Some things I've built</p>

		{#each projects as project, index (project._id)}
			{@const side = index % 2 === 0}
			<div
				class="relative my-24 flex h-600 flex-col items-center first-of-type:mt-8 lg:my-48 lg:h-auto {side
					? 'lg:flex-row'
					: 'lg:flex-row-reverse'}"
			>
				<div class="h-full w-full lg:w-1/2">
					<a href={project.projectUrl} target="_blank" rel="noreferrer">
						{#if project.screenshot?.url}
							<img
								src={project.screenshot.url}
								alt={project.screenshot.alt}
								width="1000"
								loading="lazy"
								class="duration-250 h-full w-full object-cover brightness-75 grayscale transition ease-in-out hover:brightness-100 hover:grayscale-0"
							/>
						{/if}
					</a>
				</div>
				<div
					class="absolute z-10 flex h-full w-full flex-col justify-center border-2 border-light border-opacity-50 bg-dark bg-opacity-75 px-6 lg:relative lg:block lg:h-auto lg:w-1/2 lg:border-0 lg:bg-dark/0 lg:p-0"
				>
					<h3
						class="text-left text-light {side ? 'lg:text-right' : 'lg:text-left'} mb-0 lg:mb-4"
					>
						{project.title}
					</h3>
					<div
						class="bg-transparent lg:bg-dark {side
							? 'mr-0 lg:-ml-20'
							: 'ml-0 lg:-mr-20'} lg:drop-shadow-lg"
					>
						<div
							class="px-0 py-6 text-left text-muted lg:px-8 {side
								? 'lg:text-right'
								: 'lg:text-left'}"
						>
							<BlockContent blocks={project.description} />
						</div>
					</div>
					<ul
						class="flex flex-wrap justify-start font-fira-code text-light {side
							? 'lg:justify-end'
							: 'lg:justify-start'}"
					>
						{#each project.tags as tag (tag.label)}
							<li
								class="mt-2 pr-4 text-tiny text-green {side
									? 'lg:justify-end lg:pl-4 lg:pr-0'
									: 'lg:justify-start lg:pr-4 lg:pl-0'}"
							>
								{tag.label}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/each}
	</div>
</section>
