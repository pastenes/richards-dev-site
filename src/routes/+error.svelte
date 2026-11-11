<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Footer from '#lib/components/Footer.svelte';
	import SectionHeading from '#lib/components/SectionHeading.svelte';

	const notFound = $derived(page.status === 404);

	// Like a terminal prompt: pressing return anywhere on the page runs "go back home".
	// Skipped when focus is on a control, so return still activates whatever is focused.
	function onkeydown(event: KeyboardEvent) {
		if (event.key !== 'Enter' || event.defaultPrevented) return;
		if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
		const target = event.target as Element | null;
		if (target?.closest('a, button, input, textarea, select, [contenteditable]')) return;
		event.preventDefault();
		goto('/');
	}
</script>

<svelte:window {onkeydown} />

<svelte:head>
	<title>{notFound ? 'Not Found' : 'Error'} | Richard's Dev Landing</title>
</svelte:head>

<main id="main" class="px-6 pt-40 pb-32 md:px-14 lg:px-32">
	<div class="mx-auto sm:max-w-narrow lg:max-w-wide">
		{#if notFound}
			<SectionHeading level="h1" eyebrow="404" title="You made this" script="up" />
			<p class="text-lg text-muted">This page doesn't exist.</p>
		{:else}
			<SectionHeading level="h1" eyebrow={String(page.status)} title="Something" script="broke" />
			<p class="text-lg text-muted">{page.error?.message ?? 'Please try again in a moment.'}</p>
		{/if}

		<a href="/" class="mt-16 inline-block font-mono text-heading-sm text-accent hover:underline md:text-heading-md">
			&gt; go back home<span class="animate-blink motion-reduce:animate-none" aria-hidden="true">&#9612;</span>
		</a>
		<p class="mt-4 font-mono text-sm text-caption pointer-coarse:hidden">press return ↵</p>
	</div>
</main>
<Footer />
