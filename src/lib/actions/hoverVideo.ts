import type { Action } from 'svelte/action';

/**
 * Hover preview for a project card. Put it on the card with the clip's URL. The card holds a
 * `<video>` that sits over the screenshot with no `src`. Nothing downloads until the first hover
 * or keyboard focus. The video then plays, and gets `data-playing` once frames are showing (style
 * the fade with `data-playing:` variants). Leaving pauses it, and the screenshot shows again.
 *
 * Mouse/pen only: touch devices and reduced motion keep the static screenshot and never fetch the clip.
 */
export const hoverVideo: Action<HTMLElement, string | null | undefined> = (node, url) => {
	const video = node.querySelector('video');
	if (!video || !url) return;
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

	let active = false;

	const onPlaying = () => {
		if (active) video.dataset.playing = '';
	};

	const start = () => {
		if (active) return;
		active = true;
		if (!video.getAttribute('src')) video.src = url;
		video.currentTime = 0;
		// An interrupted play() (quick leave) rejects; the screenshot simply stays.
		video.play().catch(() => {});
	};

	const stop = () => {
		active = false;
		video.pause();
		delete video.dataset.playing;
	};

	const onPointerEnter = (event: PointerEvent) => {
		if (event.pointerType !== 'touch') start();
	};
	const onFocusOut = (event: FocusEvent) => {
		if (!node.contains(event.relatedTarget as Node | null)) stop();
	};

	video.addEventListener('playing', onPlaying);
	node.addEventListener('pointerenter', onPointerEnter);
	node.addEventListener('pointerleave', stop);
	node.addEventListener('focusin', start);
	node.addEventListener('focusout', onFocusOut);

	return {
		destroy() {
			video.removeEventListener('playing', onPlaying);
			node.removeEventListener('pointerenter', onPointerEnter);
			node.removeEventListener('pointerleave', stop);
			node.removeEventListener('focusin', start);
			node.removeEventListener('focusout', onFocusOut);
		}
	};
};
