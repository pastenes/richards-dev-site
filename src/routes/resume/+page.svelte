<script lang="ts">
	let { data } = $props();
	let resume = $derived(data.resume);
</script>

<svelte:head>
	<title>Resume | Richard Pastenes</title>
</svelte:head>

<nav
	class="pdf-button fixed -mt-20 top-20 z-20 ml-14 inline-flex flex-col bg-dark p-3 text-center font-fira-code text-green lg:ml-nav"
>
	<a class="py-2" href="/Resume-Richard-Pastenes.pdf">PDF</a>
</nav>

<div class="flex h-full w-full flex-col bg-white font-opensans text-sm font-light">
	<header class="flex flex-col items-center bg-gray pt-12 pb-8">
		<h1 class="rh1 mb-0">{resume.name}</h1>
		<h2 class="rh2">{resume.jobTitle}</h2>
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
	<main class="container py-8">
		<div
			class="mx-6 print:mx-0 print:grid print:grid-cols-3 print:gap-8 md:mx-0 md:grid md:grid-cols-3 md:gap-8"
		>
			<div class="summary">
				<h3 class="rh3">Summary</h3>
				<p class="mb-0">{resume.summary}</p>

				<h3 class="rh3">Interests</h3>
				<ul>
					{#each resume.interests ?? [] as interest}
						<li>{interest}</li>
					{/each}
				</ul>

				<h3 class="rh3">Education</h3>
				<ul>
					{#each resume.education ?? [] as item (item._key)}
						<li>
							<h4 class="rh4">{item.degree}</h4>
							<p class="mb-0">{item.year}</p>
							<p>{item.school}</p>
						</li>
					{/each}
				</ul>
			</div>
			<div class="experience col-span-2">
				<h3 class="rh3">Experience</h3>
				<ul class="rexperience">
					{#each resume.experience ?? [] as item (item._key)}
						<li>
							<div class="flex justify-between">
								<h4 class="rh4">{item.role}</h4>
								<span class="rdate">{item.start} - {item.end}</span>
							</div>
							<h5 class="rh5">{item.employer}</h5>
							<ul>
								{#each item.achievment ?? [] as piece (piece._key)}
									<li>{piece.achievment}</li>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			</div>
		</div>
		<div class="mx-6 md:mx-0">
			<h3 class="rh3">Skills</h3>
			<ul class="grid grid-cols-2 print:grid-cols-4 md:grid-cols-4">
				{#each resume.skills as skill}
					<li>{skill}</li>
				{/each}
			</ul>
		</div>
	</main>
	<footer class="bg-gray py-8"></footer>
</div>
