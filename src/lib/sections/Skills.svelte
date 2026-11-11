<script lang="ts">
	import SectionHeading from '#lib/components/SectionHeading.svelte';

	// TODO: Hard-coded for the redesign (the Sanity `about.tags` field is no longer rendered).
	// Core skills are highlighted.
	const core = new Set(['TypeScript', 'Next.js', 'TailwindCSS', 'CSS', 'Git']);
	const groups = [
		{
			label: 'Front-end',
			items: ['TypeScript', 'JavaScript', 'ES6', 'React', 'Next.js', 'Gatsby', 'Alpine.js', 'Web Components']
		},
		{
			label: 'Styling and motion',
			items: ['CSS', 'TailwindCSS', 'SASS', 'Framer Motion']
		},
		{
			label: 'Content and back-end',
			items: ['Sanity.io', 'WordPress', 'ACF', 'Timber', 'PHP', 'Node.js', 'GraphQL', 'WPGraphQL', 'REST API', 'MySQL']
		},
		{
			label: 'Workflow and hosting',
			items: ['Git', 'Gitflow', 'Netlify']
		}
	];
</script>

<section id="skills" class="px-6 py-32 md:px-14 lg:px-32">
	<div class="mx-auto sm:max-w-narrow lg:max-w-wide">
		<SectionHeading eyebrow="Skills" title="The tech I" script="use" />

		<div class="grid gap-6 md:grid-cols-2">
			{#each groups as group (group.label)}
				<div class="rounded-card border border-border bg-surface-raised p-6">
					<h3 class="mb-4 font-mono text-sm text-caption">{group.label}</h3>
					<ul class="flex flex-wrap gap-2">
						{#each group.items as item (item)}
							<li
								class="rounded-full border px-3 py-1 font-mono text-tiny {core.has(item)
									? 'border-accent bg-accent-wash text-accent'
									: 'border-border text-muted'}"
							>
								{item}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>
