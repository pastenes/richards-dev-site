<script lang="ts">
	import BlockContent from '#lib/components/BlockContent.svelte';
	import Letterhead from '#lib/components/Letterhead.svelte';

	let { data } = $props();
	let letter = $derived(data.letter);
</script>

<!--
	Same frame as the resume: the dark theme on screen, paper colors on a white A4 page in print, and
	the resume's header. The job posting link stays in the Studio; it isn't part of the letter.
-->
<main id="main">
	<article class="mx-auto px-6 pt-32 pb-24 text-base text-muted sm:max-w-narrow md:px-0 print:max-w-none print:px-12 print:py-0">
		<Letterhead {...letter.letterhead} />

		<div class="mt-8 mb-8 sm:flex sm:items-baseline sm:justify-between sm:gap-4 print:mt-6 print:mb-6 print:flex print:items-baseline print:justify-between print:gap-4">
			<div>
				<h2 class="mb-0 text-lg text-foreground">{letter.jobTitle}</h2>
				<p class="mb-0 text-caption">{letter.employer}</p>
			</div>
			<p class="mb-0 font-mono text-tiny whitespace-nowrap text-caption">{letter.date}</p>
		</div>

		<BlockContent blocks={letter.content} />
	</article>
</main>
