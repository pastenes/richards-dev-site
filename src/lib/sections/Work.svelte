<script lang="ts">
	import { tick } from 'svelte';
	import BlockContent from '#lib/components/BlockContent.svelte';
	import { hoverVideo } from '#lib/actions/hoverVideo.ts';
	import NewTabNote from '#lib/components/NewTabNote.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import SectionHeading from '#lib/components/SectionHeading.svelte';

	type Project = {
		_id: string;
		title: string;
		projectUrl: string;
		tags: string[];
		description: unknown[];
		screenshot: { alt: string; url: string | null; srcset: string } | null;
		// Optional MP4 (Sanity file URL) that plays over the screenshot on hover.
		previewVideo: string | null;
	};

	let { projects = [] }: { projects: Project[] } = $props();

	// Rendered image widths per breakpoint, for `sizes` (the featured card spans two columns).
	const featuredSizes = '(min-width: 1024px) min(658px, 66vw), (min-width: 768px) 640px, calc(100vw - 48px)';
	const wideSizes = '(min-width: 1024px) min(488px, 50vw), (min-width: 768px) 308px, calc(100vw - 48px)';
	const cardSizes = '(min-width: 1024px) min(317px, 33vw), (min-width: 768px) 308px, calc(100vw - 48px)';

	// From lg the grid has six columns: the featured card takes four and the next one two (row 1),
	// the next two take three each (row 2, wider cards), and the rest two each (rows of three).
	const spans = ['md:col-span-2 lg:col-span-4', 'lg:col-span-2', 'lg:col-span-3', 'lg:col-span-3'];
	const sizes = [featuredSizes, cardSizes, wideSizes, wideSizes];

	// From lg, the grid starts with the first two rows (four projects), and "Load more" adds two rows
	// of three at a time. The rest are hidden with CSS, not left out, so smaller
	// screens (and the server-rendered page) still list every project.
	let shown = $state(4);
	let grid: HTMLElement;

	async function loadMore() {
		const first = shown;
		shown += 6;
		await tick();
		// Move focus to the first new card, so keyboard and screen reader users land on it.
		grid.querySelectorAll('article')[first]?.focus({ preventScroll: true });
	}
</script>

<section id="work" aria-labelledby="work-title" class="px-6 py-32 md:px-14 lg:px-32">
	<div class="mx-auto sm:max-w-narrow lg:max-w-wide">
		<SectionHeading id="work-title" eyebrow="Work" title="Some things I've" script="built" />

		<!-- Bento grid: the first project is featured and spans two columns. -->
		<div bind:this={grid} class="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
			{#each projects as project, index (project._id)}
				<Reveal
					step={index % 3}
					class="{spans[index] ?? 'lg:col-span-2'} {index >= shown ? 'lg:hidden' : ''}"
				>
					<article
						use:hoverVideo={project.previewVideo}
						tabindex="-1"
						aria-labelledby="project-{project._id}"
						class="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface-raised transition duration-300 ease-out-expo hover:border-accent hover:shadow-glow"
					>
						{#if project.screenshot?.url}
							{#snippet screenshot(url: string, srcset: string, alt: string)}
								<div class="relative">
									<img
										src={url}
										{srcset}
										sizes={sizes[index] ?? cardSizes}
										{alt}
										width="1000"
										height="563"
										loading="lazy"
										decoding="async"
										class="aspect-video w-full object-cover object-top brightness-90 transition duration-300 group-hover:brightness-100"
									/>
									{#if project.previewVideo}
										<!-- Hover preview: no src until the first hover (see actions/hoverVideo.ts). -->
										<video
											muted
											loop
											playsinline
											preload="none"
											aria-hidden="true"
											tabindex="-1"
											class="absolute inset-0 size-full object-cover object-top opacity-0 transition-opacity duration-300 data-playing:opacity-100"
										></video>
									{/if}
								</div>
							{/snippet}
							{#if project.projectUrl}
								<!--
									Same target as the title link, so it's left out of the tab order. Screen readers get the
									screenshot's alt text as its name; without alt text it would have no name, so it's hidden.
								-->
								<a
									href={project.projectUrl}
									target="_blank"
									rel="noreferrer"
									tabindex="-1"
									aria-hidden={project.screenshot.alt ? undefined : 'true'}
								>
									{@render screenshot(project.screenshot.url, project.screenshot.srcset, project.screenshot.alt ?? '')}
									{#if project.screenshot.alt}<NewTabNote />{/if}
								</a>
							{:else}
								{@render screenshot(project.screenshot.url, project.screenshot.srcset, project.screenshot.alt ?? '')}
							{/if}
						{/if}
						<div class="flex flex-auto flex-col p-6">
							<h3 id="project-{project._id}" class="mb-3 text-heading-sm text-foreground">
								{#if project.projectUrl}
									<a href={project.projectUrl} target="_blank" rel="noreferrer" class="hover:text-accent">
										{project.title}<NewTabNote />
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
		{#if projects.length > shown}
			<div class="mt-12 hidden justify-center lg:flex">
				<button
					type="button"
					onclick={loadMore}
					class="rounded-full border border-border-strong px-6 py-3 font-mono text-sm text-foreground transition duration-300 ease-out-expo hover:border-accent hover:text-accent"
				>
					Load more
				</button>
			</div>
		{/if}
	</div>
</section>
