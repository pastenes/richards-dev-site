<script lang="ts">
	import Header from '#lib/sections/Header.svelte';
	import About from '#lib/sections/About.svelte';
	import Work from '#lib/sections/Work.svelte';
	import Skills from '#lib/sections/Skills.svelte';
	import Certifications from '#lib/sections/Certifications.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Headshot from '#lib/components/Headshot.svelte';

	let { data } = $props();
	let pointer = $state({ x: 0, y: 0 });
</script>

<!-- Title, description and share tags come from Site settings (+layout.svelte). -->
<svelte:head>
	<!-- Images (including the hero headshot, the largest paint) come from Sanity's CDN. -->
	<link rel="preconnect" href="https://cdn.sanity.io" />
</svelte:head>

<main id="main">
	<!-- The headshot spans the hero and About, so it can stick beside the About text (see Headshot). -->
	<div class="relative">
		<Header hero={data.hero} bind:pointer />
		<About content={data.about.content} />
		<Headshot headshot={data.hero?.headshot} {pointer} />
	</div>
	<Work projects={data.projects} />
	<Skills groups={data.skillGroups} />
	<Certifications certifications={data.certifications} />
</main>
<Footer />
