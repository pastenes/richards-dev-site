<script lang="ts">
	import Header from '$lib/sections/Header.svelte';
	import About from '$lib/sections/About.svelte';
	import Work from '$lib/sections/Work.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Richard's Dev Landing | Richard Pastenes' personal web development website</title>
	<meta name="description" content="Richard Pastenes' personal web development website" />
	<link rel="canonical" href="https://richard.pastenes.dev" />
	<meta property="og:title" content="Richard's Dev Landing" />
	<meta property="og:description" content="Richard Pastenes' personal web development website" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://richard.pastenes.dev/meta.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="675" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@richardpastenes" />
	<meta name="twitter:title" content="Richard's Dev Landing" />
	<meta name="twitter:description" content="Richard Pastenes' personal web development website" />
	<meta name="twitter:image" content="https://richard.pastenes.dev/meta.png" />
	<meta name="twitter:image:alt" content="Richard Pastenes' personal web development website" />
</svelte:head>

<main>
	<Header hero={data.hero} />
	<About content={data.about.content} tags={data.about.tags} />
	<Work projects={data.projects} />
</main>
<Footer />
