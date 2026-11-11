<script lang="ts">
	import SectionHeading from '#lib/components/SectionHeading.svelte';

	// TODO: Hard-coded for the redesign. Year and credential ID are placeholders until Richard has them.
	const certifications = [
		{
			title: 'Next.js Certified Developer',
			issuer: 'Vercel',
			year: '20XX',
			credentialId: 'XXXX-XXXX'
		}
	];
	// Dashed cards that hold space for future certifications.
	const placeholders = ['Next one in progress', 'More to come'];
</script>

<section id="certifications" class="px-6 py-32 md:px-14 lg:px-32">
	<div class="mx-auto sm:max-w-narrow lg:max-w-wide">
		<SectionHeading eyebrow="Certifications" title="Always" script="learning" />

		<ul class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each certifications as cert (cert.title)}
				<li class="flex flex-col gap-4 rounded-card border border-border bg-surface-raised p-6">
					<!-- Seal -->
					<div
						class="flex size-12 items-center justify-center rounded-full border-2 border-accent text-accent"
						aria-hidden="true"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
					</div>
					<div>
						<h3 class="mb-1 text-heading-sm text-foreground">{cert.title}</h3>
						<p class="mb-0 text-muted">{cert.issuer}</p>
					</div>
					<p class="mt-auto mb-0 font-mono text-tiny text-caption">
						Credential · {cert.year} · {cert.credentialId}
					</p>
				</li>
			{/each}
			{#each placeholders as placeholder (placeholder)}
				<li
					class="flex min-h-48 items-center justify-center rounded-card border border-dashed border-border p-6 font-mono text-sm text-caption"
				>
					{placeholder}
				</li>
			{/each}
		</ul>
	</div>
</section>
