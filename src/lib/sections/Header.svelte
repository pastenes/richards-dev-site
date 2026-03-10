<script lang="ts">
	import { onMount } from 'svelte';

	type HeroData = {
		title?: string;
		intro?: Array<{ children?: Array<{ text?: string }> }>;
		links?: { github?: string; linkedin?: string; twitter?: string };
		headshot?: { alt?: string; url?: string | null } | null;
	};

	let { hero = {} as HeroData }: { hero: HeroData } = $props();

	let vantaRef: HTMLElement;
	let vantaEffect: unknown = null;

	onMount(() => {
		let destroyed = false;

		import('vanta/dist/vanta.birds.min').then((BIRDS) => {
			if (destroyed) return;
			const THREE = (window as unknown as Record<string, unknown>).THREE;
			if (!THREE) return;

			const VantaBirds = (BIRDS as Record<string, unknown>).default || BIRDS;
			vantaEffect = (VantaBirds as Function)({
				el: vantaRef,
				THREE,
				mouseControls: true,
				touchControls: true,
				gyroControls: false,
				minHeight: 200.0,
				minWidth: 200.0,
				scale: 1.0,
				scaleMobile: 1.0,
				backgroundColor: '#c4c4c4',
				color1: 0x0,
				color2: '#ffffff',
				colorMode: 'lerpGradient',
				birdSize: 0.6,
				wingSpan: 34.0,
				speedLimit: 4.0
			});
		}).catch(() => {
			// Silently fail if Vanta.js cannot be loaded
		});

		return () => {
			destroyed = true;
			if (vantaEffect && typeof (vantaEffect as Record<string, unknown>).destroy === 'function') {
				(vantaEffect as Record<string, Function>).destroy();
			}
		};
	});
</script>

<section bind:this={vantaRef} class="flex h-screen w-screen flex-col bg-neutral py-0 lg:flex-row">
	<div class="w-3/4 flex-auto px-0 pt-14 pb-14 lg:w-1/2 lg:self-center lg:p-14">
		<div class="max-w-md">
			<p class="mb-1 ml-1 font-fira-code">Hi, I'm</p>
			<h1 class="mb-1 text-5xl">{hero.title ?? ''}</h1>
			<p>{hero.intro?.[0]?.children?.[0]?.text ?? ''}</p>

			<div class="my-8 flex justify-start">
				<a
					class="pr-2 text-2xl text-black"
					href="https://www.linkedin.com/in/{hero.links?.linkedin ?? ''}"
					target="_blank"
					rel="noreferrer"
					aria-label="LinkedIn"
				>
					<svg class="hover:drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
				</a>
				<a
					class="pr-2 text-2xl text-black"
					href="https://github.com/{hero.links?.github ?? ''}"
					target="_blank"
					rel="noreferrer"
					aria-label="GitHub"
				>
					<svg class="hover:drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
				</a>
				<a
					class="pr-2 text-2xl text-black"
					href="https://twitter.com/{hero.links?.twitter ?? ''}"
					target="_blank"
					rel="noreferrer"
					aria-label="Twitter"
				>
					<svg class="hover:drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
				</a>
			</div>
		</div>
	</div>
	<div class="absolute bottom-0 w-1/2 max-w-xs self-end lg:relative lg:justify-self-end">
		{#if hero.headshot?.url}
			<img
				src={hero.headshot.url}
				alt={hero.headshot.alt ?? ''}
				width="380"
				loading="eager"
			/>
		{/if}
	</div>
</section>
