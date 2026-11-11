import adapter from '@sveltejs/adapter-netlify';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter(),
			// Inline the stylesheet into the HTML (it's ~36 KB, ~11 KB gzipped) so first paint
			// doesn't wait for a separate CSS request. Larger CSS falls back to a <link>.
			inlineStyleThreshold: 50_000
		})
	]
});
