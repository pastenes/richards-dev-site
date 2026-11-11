import type { Action } from 'svelte/action';

/**
 * Reveal on scroll. Elements that start below the fold get `data-hidden` until they scroll into
 * view, then lose it once. Style the hidden state with `data-hidden:` variants (see Reveal.svelte).
 *
 * Content is visible by default: the server-rendered HTML has no `data-hidden`, so nothing is
 * hidden without JavaScript, elements already on screen never hide, and reduced motion skips it.
 */
export const reveal: Action<HTMLElement> = (node) => {
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	if (node.getBoundingClientRect().top < innerHeight) return;

	node.dataset.hidden = '';
	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			delete node.dataset.hidden;
			observer.disconnect();
		},
		{ threshold: 0.15 }
	);
	observer.observe(node);

	return { destroy: () => observer.disconnect() };
};
