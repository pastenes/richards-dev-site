<script lang="ts">
	import '@fontsource/montserrat/100.css';
	import '@fontsource/open-sans/300.css';
	import '@fontsource/poppins/700.css';
	import '@fontsource/fira-code/600.css';
	import '@fontsource/fira-code/700.css';
	import ResumeHeading from '#lib/components/ResumeHeading.svelte';

	let { data } = $props();
	let resume = $derived(data.resume);
</script>

<svelte:head>
	<title>Resume | Richard Pastenes</title>
</svelte:head>

<nav
	class="fixed top-0 z-20 ml-14 inline-flex flex-col bg-surface p-3 text-center font-mono text-accent lg:ml-nav print:hidden"
>
	<a class="py-2" href="/Resume-Richard-Pastenes.pdf">PDF</a>
</nav>

<div class="flex flex-col bg-white font-resume-body text-sm font-light">
	<header class="flex flex-col items-center bg-resume-band pt-12 pb-8">
		<h1
			class="mb-0 font-resume-heading text-lg font-thin tracking-widest uppercase md:text-5xl print:text-5xl"
		>
			{resume.name}
		</h1>
		<h2 class="font-resume-heading text-xs font-thin tracking-normal uppercase">{resume.jobTitle}</h2>
		<ul class="flex gap-4 text-xs">
			<li><span class="font-mono font-semibold">p.</span>{resume.phone}</li>
			<li><span class="font-mono font-semibold">e.</span>{resume.email}</li>
			<li>
				<span class="font-mono font-semibold">w.</span>{resume.portfolioUrl?.replace(
					/^https?:\/\//,
					''
				)}
			</li>
		</ul>
	</header>
	<main class="mx-auto py-8 sm:max-w-narrow lg:max-w-wide">
		<div
			class="mx-6 md:mx-0 md:grid md:grid-cols-3 md:gap-8 print:mx-0 print:grid print:grid-cols-3 print:gap-8"
		>
			<div>
				<ResumeHeading>Summary</ResumeHeading>
				<p class="mb-0">{resume.summary}</p>

				<ResumeHeading>Interests</ResumeHeading>
				<ul>
					{#each resume.interests ?? [] as interest}
						<li>{interest}</li>
					{/each}
				</ul>

				<ResumeHeading>Education</ResumeHeading>
				<ul>
					{#each resume.education ?? [] as item (item._key)}
						<li>
							<h4 class="font-resume-subheading font-bold tracking-wider">{item.degree}</h4>
							<p class="mb-0">{item.year}</p>
							<p>{item.school}</p>
						</li>
					{/each}
				</ul>
			</div>
			<div class="col-span-2">
				<ResumeHeading>Experience</ResumeHeading>
				<!-- Timeline: a vertical rule on the list, a dot per role, and a small dot per achievement. -->
				<ul
					class="relative before:absolute before:inset-y-1.25 before:left-0.75 before:w-px before:bg-resume-rule"
				>
					{#each resume.experience ?? [] as item (item._key)}
						<li
							class="relative mb-3.75 pl-3.75 before:absolute before:top-1.25 before:left-0 before:size-2 before:rounded-full before:bg-resume-ink"
						>
							<div class="flex justify-between">
								<h4 class="font-resume-subheading font-bold tracking-wider">{item.role}</h4>
								<span class="text-xs text-resume-date">{item.start} - {item.end}</span>
							</div>
							<h5 class="font-resume-body text-xs font-light">{item.employer}</h5>
							<ul class="my-2">
								{#each item.achievment ?? [] as piece (piece._key)}
									<li
										class="relative pl-2.5 before:absolute before:top-1.75 before:left-0 before:size-1 before:rounded-full before:bg-resume-rule"
									>
										{piece.achievment}
									</li>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			</div>
		</div>
		<div class="mx-6 md:mx-0">
			<ResumeHeading>Skills</ResumeHeading>
			<ul class="grid grid-cols-2 md:grid-cols-4 print:grid-cols-4">
				{#each resume.skills as skill}
					<li>{skill}</li>
				{/each}
			</ul>
		</div>
	</main>
	<footer class="bg-resume-band py-8"></footer>
</div>
