<script lang="ts">
	import Reveal from '#lib/components/Reveal.svelte';
	import SectionHeading from '#lib/components/SectionHeading.svelte';

	// From Sanity `certification` documents, in their studio order.
	type Certification = {
		_id: string;
		title: string;
		issuer: string | null;
		inProgress: boolean;
		year: string | null;
		credentialId: string | null;
		credentialUrl: string | null;
	};

	let { certifications = [] }: { certifications: Certification[] } = $props();

	// Dashed cards that fill the last row of three, holding space for future certifications. (Skip the
	// "in progress" teaser when a real card already says so.)
	const anyInProgress = $derived(certifications.some((cert) => cert.inProgress));
	const placeholders = $derived(
		Array.from({ length: (3 - (certifications.length % 3)) % 3 }, (_, index) =>
			index === 0 && !anyInProgress ? 'Next one in progress' : 'More to come'
		)
	);
</script>

<section id="certifications" class="px-6 py-32 md:px-14 lg:px-32">
	<div class="mx-auto sm:max-w-narrow lg:max-w-wide">
		<SectionHeading eyebrow="Certifications" title="Always" script="learning" />

		<ul class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each certifications as cert, index (cert._id)}
				{@const meta = cert.inProgress
					? ['In progress']
					: ['Credential', cert.year, cert.credentialId].filter(Boolean)}
				<Reveal
					as="li"
					step={index % 3}
					class="flex flex-col gap-4 rounded-card border border-border bg-surface-raised p-6"
				>
					<!-- Seal: a check once earned, a clock on a dashed ring while in progress. -->
					<div
						class={[
							'flex size-12 items-center justify-center rounded-full border-2 border-accent text-accent',
							cert.inProgress && 'border-dashed'
						]}
						aria-hidden="true"
					>
						{#if cert.inProgress}
							<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
						{/if}
					</div>
					<div>
						<h3 class="mb-1 text-heading-sm text-foreground">
							{#if cert.credentialUrl}
								<a href={cert.credentialUrl} target="_blank" rel="noreferrer" class="hover:text-accent">
									{cert.title}
								</a>
							{:else}
								{cert.title}
							{/if}
						</h3>
						{#if cert.issuer}
							<p class="mb-0 text-muted">{cert.issuer}</p>
						{/if}
					</div>
					{#if cert.inProgress || meta.length > 1}
						<p class={['mt-auto mb-0 font-mono text-tiny', cert.inProgress ? 'text-accent' : 'text-caption']}>
							{meta.join(' · ')}
						</p>
					{/if}
				</Reveal>
			{/each}
			{#each placeholders as placeholder, index (index)}
				<Reveal
					as="li"
					step={(certifications.length + index) % 3}
					class="flex min-h-48 items-center justify-center rounded-card border border-dashed border-border p-6 font-mono text-sm text-caption"
				>
					{placeholder}
				</Reveal>
			{/each}
		</ul>
	</div>
</section>
