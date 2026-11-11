<script lang="ts">
	import BlockContent from '#lib/components/BlockContent.svelte';
	import SectionHeading from '#lib/components/SectionHeading.svelte';

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

<section id="work" class="px-6 py-32 md:px-14 lg:px-32">
	<div class="mx-auto sm:max-w-narrow lg:max-w-wide">
		<SectionHeading eyebrow="Work" title="Some things I've" script="built" />

		<!-- Bento grid: the first project is featured and spans two columns. -->
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project, index (project._id)}
				<article
					class="group flex flex-col overflow-hidden rounded-card border border-border bg-surface-raised transition duration-300 ease-out-expo hover:border-accent hover:shadow-glow {index ===
					0
						? 'md:col-span-2'
						: ''}"
				>
					{#if project.screenshot?.url}
						<a href={project.projectUrl} target="_blank" rel="noreferrer" tabindex="-1">
							<img
								src={project.screenshot.url}
								alt={project.screenshot.alt}
								width="1000"
								loading="lazy"
								class="aspect-video w-full object-cover object-top brightness-90 transition duration-300 group-hover:brightness-100"
							/>
						</a>
					{/if}
					<div class="flex flex-auto flex-col p-6">
						<h3 class="mb-3 text-heading-sm text-foreground">
							<a href={project.projectUrl} target="_blank" rel="noreferrer" class="hover:text-accent">
								{project.title}
							</a>
						</h3>
						<div class="text-muted">
							<BlockContent blocks={project.description} />
						</div>
						<ul class="mt-auto flex flex-wrap gap-2 pt-2">
							{#each project.tags as tag (tag.label)}
								<li class="rounded-full bg-accent-wash px-2.5 py-1 font-mono text-tiny text-accent">
									{tag.label}
								</li>
							{/each}
						</ul>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
