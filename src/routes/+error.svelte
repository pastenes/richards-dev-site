<script>
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Not Found | Richard's Dev Landing</title>
</svelte:head>

<main>
	<section class="relative">
		<div class="container h-full max-w-4xl">
			<h2 class="text-right text-3xl text-light">Nope</h2>
			<p class="text-right text-light">You made this up, this page doesn't exist</p>
			<div class="flex h-full items-center">
				<div
					class="py-20 text-center font-mono text-6xl text-green hover:underline active:underline"
				>
					<a href="/">
						&#62; go back home <span class="blink">&#9612;</span>
					</a>
				</div>
			</div>
		</div>
	</section>
</main>
<Footer />
