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

	let { data, children } = $props();

	// SEO and share tags for every page: Site settings (`data.site`), refined by the page's own
	// `meta` ({ title, description, noindex }). Error pages are titled by status and never indexed.
	type PageMeta = { title?: string; description?: string; noindex?: boolean };
	const meta = $derived.by(() => {
		const own = (page.error ? {} : (page.data.meta ?? {})) as PageMeta;
		const title = page.error
			? `${page.status === 404 ? 'Not Found' : 'Error'} | ${data.site.name}`
			: (own.title ?? data.site.title);
		return {
			title,
			description: own.description ?? data.site.description,
			noindex: Boolean(page.error) || Boolean(own.noindex),
			url: `${data.site.url}${page.url.pathname}`
		};
	});

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

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	{#if meta.noindex}
		<meta name="robots" content="noindex" />
	{:else}
		<link rel="canonical" href={meta.url} />
	{/if}
	<meta property="og:site_name" content={data.site.name} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={meta.url} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:image" content={data.site.image.url} />
	<meta property="og:image:width" content={String(data.site.image.width)} />
	<meta property="og:image:height" content={String(data.site.image.height)} />
	<meta property="og:image:alt" content={data.site.image.alt} />
	<meta name="twitter:card" content="summary_large_image" />
	{#if data.site.twitter}<meta name="twitter:site" content={data.site.twitter} />{/if}
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={data.site.image.url} />
	<meta name="twitter:image:alt" content={data.site.image.alt} />
</svelte:head>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-40 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-on-accent"
>
	Skip to content
</a>
<Nav {action} />
{@render children()}
