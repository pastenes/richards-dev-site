<script lang="ts">
	import Reveal from '#lib/components/Reveal.svelte';
	import SectionHeading from '#lib/components/SectionHeading.svelte';

	// From the Sanity `skills` singleton: one card per group; core skills are highlighted.
	type SkillGroup = {
		_key: string;
		title: string;
		skills: Array<{ _key: string; name: string; core?: boolean }> | null;
	};

	let { groups = [] }: { groups: SkillGroup[] } = $props();
</script>

<section id="skills" class="px-6 py-32 md:px-14 lg:px-32">
	<div class="mx-auto sm:max-w-narrow lg:max-w-wide">
		<SectionHeading eyebrow="Skills" title="The tech I" script="use" />

		<div class="grid gap-6 md:grid-cols-2">
			{#each groups as group, index (group._key)}
				<Reveal step={index % 2} class="rounded-card border border-border bg-surface-raised p-6">
					<h3 class="mb-4 font-mono text-sm text-caption">{group.title}</h3>
					<ul class="flex flex-wrap gap-2">
						{#each group.skills ?? [] as skill (skill._key)}
							<li
								class="rounded-full border px-3 py-1 font-mono text-tiny {skill.core
									? 'border-accent bg-accent-wash text-accent'
									: 'border-border text-muted'}"
							>
								{skill.name}
							</li>
						{/each}
					</ul>
				</Reveal>
			{/each}
		</div>
	</div>
</section>
