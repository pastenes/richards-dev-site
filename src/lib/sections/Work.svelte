<script lang="ts">
	import BlockContent from '#lib/components/BlockContent.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import SectionHeading from '#lib/components/SectionHeading.svelte';

	type Project = {
		_id: string;
		title: string;
		projectUrl: string;
		tags: string[];
		description: unknown[];
		screenshot: { alt: string; url: string | null; srcset: string } | null;
	};

	let { projects = [] }: { projects: Project[] } = $props();

	// Rendered image widths per breakpoint, for `sizes` (the featured card spans two columns).
	const featuredSizes = '(min-width: 1024px) min(658px, 66vw), (min-width: 768px) 640px, calc(100vw - 48px)';
	const cardSizes = '(min-width: 1024px) min(317px, 33vw), (min-width: 768px) 308px, calc(100vw - 48px)';
</script>

<section id="work" class="px-6 py-32 md:px-14 lg:px-32">
	<div class="mx-auto sm:max-w-narrow lg:max-w-wide">
		<SectionHeading eyebrow="Work" title="Some things I've" script="built" />

		<!-- Bento grid: the first project is featured and spans two columns. -->
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project, index (project._id)}
				<Reveal step={index % 3} class={index === 0 ? 'md:col-span-2' : ''}>
					<article
						class="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface-raised transition duration-300 ease-out-expo hover:border-accent hover:shadow-glow"
					>
						{#if project.screenshot?.url}
							{#snippet screenshot(url: string, srcset: string)}
								<img
									src={url}
									{srcset}
									sizes={index === 0 ? featuredSizes : cardSizes}
									alt=""
									width="1000"
									height="563"
									loading="lazy"
									decoding="async"
									class="aspect-video w-full object-cover object-top brightness-90 transition duration-300 group-hover:brightness-100"
								/>
							{/snippet}
							{#if project.projectUrl}
								<!-- Duplicate of the title link, so it's hidden from keyboard and screen readers. -->
								<a href={project.projectUrl} target="_blank" rel="noreferrer" tabindex="-1" aria-hidden="true">
									{@render screenshot(project.screenshot.url, project.screenshot.srcset)}
								</a>
							{:else}
								{@render screenshot(project.screenshot.url, project.screenshot.srcset)}
							{/if}
						{/if}
						<div class="flex flex-auto flex-col p-6">
							<h3 class="mb-3 text-heading-sm text-foreground">
								{#if project.projectUrl}
									<a href={project.projectUrl} target="_blank" rel="noreferrer" class="hover:text-accent">
										{project.title}
									</a>
								{:else}
									{project.title}
								{/if}
							</h3>
							<div class="text-muted">
								<BlockContent blocks={project.description} />
							</div>
							<ul class="mt-auto flex flex-wrap gap-2 pt-2">
								{#each project.tags as tag (tag)}
									<li class="rounded-full bg-accent-wash px-2.5 py-1 font-mono text-tiny text-accent">
										{tag}
									</li>
								{/each}
							</ul>
						</div>
					</article>
				</Reveal>
			{/each}
		</div>
	</div>
</section>
