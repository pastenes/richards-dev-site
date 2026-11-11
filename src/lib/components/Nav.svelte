<script lang="ts">
	// Section links, in page order.
	const links = [
		{ label: 'About', href: '#about' },
		{ label: 'Work', href: '#work' },
		{ label: 'Skills', href: '#skills' },
		{ label: 'Certs', href: '#certifications' }
	];
</script>

<!-- Floating pill, fixed top-center. Small screens show only the brand and the Resume button. -->
<nav
	class="fixed top-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-6 rounded-full border border-border bg-surface/80 py-1.5 pr-1.5 pl-5 whitespace-nowrap backdrop-blur print:hidden"
>
	<a href="/" class="font-script text-2xl text-foreground hover:text-accent">Richard</a>
	<ul class="hidden items-center gap-6 font-mono text-sm text-muted md:flex">
		{#each links as link (link.href)}
			<li><a href={link.href} class="hover:text-accent">{link.label}</a></li>
		{/each}
	</ul>
	<a
		href="/resume"
		class="rounded-full bg-accent px-4 py-2 font-mono text-sm text-on-accent hover:bg-accent-hover"
	>
		Resume
	</a>
</nav>
