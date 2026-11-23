<script lang="ts">
	// The resume's header (name, job title, contact line), shared by the resume and cover letters so
	// both PDFs open the same way.
	let {
		name,
		jobTitle,
		phone,
		email,
		portfolioUrl
	}: { name?: string; jobTitle?: string; phone?: string; email?: string; portfolioUrl?: string } =
		$props();
</script>

<header class="mb-2 border-b border-border pb-8 print:mb-0 print:pb-6">
	<h1 class="mb-2 text-display-lg text-foreground">{name}</h1>
	<p class="mb-4 font-mono text-base text-accent">{jobTitle}</p>
	<ul class="flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs">
		<li><a href="tel:{phone}" class="hover:text-accent">{phone}</a></li>
		<li><a href="mailto:{email}" class="hover:text-accent">{email}</a></li>
		<li>
			<a href={portfolioUrl} class="hover:text-accent">
				{portfolioUrl?.replace(/^https?:\/\//, '')}
			</a>
		</li>
	</ul>
</header>
