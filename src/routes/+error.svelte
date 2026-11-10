<script>
	import Footer from '#lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Not Found | Richard's Dev Landing</title>
</svelte:head>

<main>
	<section class="relative px-14 py-32 lg:px-32">
		<div class="mx-auto h-full max-w-4xl">
			<h2 class="text-right text-3xl text-foreground">Nope</h2>
			<p class="text-right text-foreground">You made this up, this page doesn't exist</p>
			<div class="flex h-full items-center">
				<div
					class="py-20 text-center font-mono text-6xl text-accent hover:underline active:underline"
				>
					<a href="/">
						&#62; go back home <span class="animate-blink">&#9612;</span>
					</a>
				</div>
			</div>
		</div>
	</section>
</main>
<Footer />
