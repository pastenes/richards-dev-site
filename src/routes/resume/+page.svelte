<script lang="ts">
	import ResumeHeading from '#lib/components/ResumeHeading.svelte';

	let { data } = $props();
	let resume = $derived(data.resume);
</script>

<svelte:head>
	<title>Resume | Richard Pastenes</title>
</svelte:head>

<!--
	On screen the resume follows the site theme. In print the light ("paper") colors always apply
	(app.css) on a white page, and the layout is sized to fit one A4 page: check print preview.
-->
<main id="main">
	<article class="mx-auto px-6 pt-32 pb-24 text-sm text-muted sm:max-w-narrow md:px-0 lg:max-w-wide print:max-w-none print:p-12">
		<header class="mb-2 border-b border-border pb-8 print:mb-0 print:pb-6">
			<h1 class="mb-2 text-display-lg text-foreground">{resume.name}</h1>
			<p class="mb-4 font-mono text-base text-accent">{resume.jobTitle}</p>
			<ul class="flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs">
				<li><a href="tel:{resume.phone}" class="hover:text-accent">{resume.phone}</a></li>
				<li><a href="mailto:{resume.email}" class="hover:text-accent">{resume.email}</a></li>
				<li>
					<a href={resume.portfolioUrl} class="hover:text-accent">
						{resume.portfolioUrl?.replace(/^https?:\/\//, '')}
					</a>
				</li>
			</ul>
		</header>

		<div class="md:grid md:grid-cols-3 md:gap-10 print:grid print:grid-cols-3 print:gap-8">
			<div>
				<section>
					<ResumeHeading>Summary</ResumeHeading>
					<p class="mb-0">{resume.summary}</p>
				</section>

				<section>
					<ResumeHeading>Interests</ResumeHeading>
					<ul>
						{#each resume.interests ?? [] as interest}
							<li>{interest}</li>
						{/each}
					</ul>
				</section>

				<section>
					<ResumeHeading>Education</ResumeHeading>
					<ul class="space-y-3">
						{#each resume.education ?? [] as item (item._key)}
							<li>
								<h3 class="mb-0 text-lg text-foreground">{item.degree}</h3>
								<p class="mb-0">{item.school}</p>
								<p class="mb-0 font-mono text-tiny text-caption">{item.year}</p>
							</li>
						{/each}
					</ul>
				</section>
			</div>

			<section class="col-span-2">
				<ResumeHeading>Experience</ResumeHeading>
				<!-- Timeline: a vertical rule on the list, a dot per role, and a small dot per achievement. -->
				<ul
					class="relative before:absolute before:inset-y-1.25 before:left-0.75 before:w-px before:bg-border"
				>
					{#each resume.experience ?? [] as item (item._key)}
						<li
							class="relative mb-5 pl-5 before:absolute before:top-1.75 before:left-0 before:size-2 before:rounded-full before:bg-accent last:mb-0"
						>
							<div class="sm:flex sm:items-baseline sm:justify-between sm:gap-4 print:flex print:items-baseline print:justify-between print:gap-4">
								<h3 class="mb-0 text-lg text-foreground">{item.role}</h3>
								<span class="block font-mono text-tiny whitespace-nowrap text-caption">
									{item.start} - {item.end}
								</span>
							</div>
							<p class="mb-1.5 text-caption">{item.employer}</p>
							<ul class="space-y-0.5">
								{#each item.achievment ?? [] as piece (piece._key)}
									<li
										class="relative pl-3 before:absolute before:top-2 before:left-0 before:size-1 before:rounded-full before:bg-border-strong"
									>
										{piece.achievment}
									</li>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			</section>
		</div>

		<section>
			<ResumeHeading>Skills</ResumeHeading>
			<ul class="grid grid-cols-2 gap-x-6 md:grid-cols-4 print:grid-cols-4">
				{#each resume.skills as skill}
					<li>{skill}</li>
				{/each}
			</ul>
		</section>
	</article>
</main>
