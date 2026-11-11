<script lang="ts">
	import '../app.css';
	import '@fontsource/instrument-serif/400.css';
	import '@fontsource/instrument-sans/400.css';
	import '@fontsource/instrument-sans/700.css';
	import '@fontsource/caveat/400.css';
	import '@fontsource/fira-code/400.css';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import Nav from '#lib/components/Nav.svelte';

	let { children } = $props();

	// The nav's accent button: the PDF on the resume page, the resume link everywhere else.
	const action = $derived(
		page.url.pathname.startsWith('/resume')
			? { label: 'PDF', href: '/Resume-Richard-Pastenes.pdf' }
			: undefined
	);

	// Page transitions: cross-fade between pages with the View Transitions API. Skipped for
	// in-page anchor jumps, reduced motion, and browsers without support (they navigate normally).
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-40 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-on-accent"
>
	Skip to content
</a>
<Nav {action} />
{@render children()}
