import { createClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_TOKEN } from '$app/env/private';

export const client = createClient({
	projectId: SANITY_PROJECT_ID,
	dataset: SANITY_DATASET,
	token: SANITY_TOKEN,
	useCdn: true,
	apiVersion: '2024-01-01'
});

/**
 * GROQ for the resume the site shows: the one picked in the studio's Site settings (`siteSettings`),
 * falling back to the original singleton document `resume` until one is picked. Fetch it with
 * `{ perspective: 'published' }`, since the token can also read drafts.
 * TODO: drop the `resumeSettings` fallback once the site-settings migration has run on production.
 */
export const siteResumeQuery = `coalesce(*[_id == "siteSettings"][0].siteResume->, *[_id == "resumeSettings"][0].siteResume->, *[_id == "resume"][0])`;

const builder = createImageUrlBuilder(client);

export function urlFor(source: unknown) {
	return builder.image(source as SanityImageSource);
}

/**
 * A WebP image at several widths, for `<img src srcset sizes>`. `src` is the largest width
 * (the fallback); the component supplies `sizes` so the browser picks the smallest that fits.
 *
 * When the asset comes with `metadata.dimensions` (project it in the query), widths wider than the
 * source are replaced by the source width (no upscaled copies), and `width`/`height` give the
 * `<img>` its real aspect ratio.
 */
export function responsiveImage(source: unknown, widths: number[]) {
	const dimensions = (source as { metadata?: { dimensions?: { width?: number; height?: number } } })
		?.metadata?.dimensions;
	const max = dimensions?.width;
	const capped = max
		? [...new Set(widths.map((width) => Math.min(width, max)))].sort((a, b) => a - b)
		: widths;
	const at = (width: number) => urlFor(source).width(width).format('webp').url();
	return {
		url: at(Math.max(...capped)),
		srcset: capped.map((width) => `${at(width)} ${width}w`).join(', '),
		width: dimensions?.width ?? null,
		height: dimensions?.height ?? null
	};
}

/** Tag names from a native tags field (`string[]`), dropping empty entries. */
export function tagNames(list: unknown): string[] {
	return Array.isArray(list) ? list.filter((tag): tag is string => typeof tag === 'string' && tag !== '') : [];
}
