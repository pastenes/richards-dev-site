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

const builder = createImageUrlBuilder(client);

export function urlFor(source: unknown) {
	return builder.image(source as SanityImageSource);
}

/**
 * A WebP image at several widths, for `<img src srcset sizes>`. `src` is the largest width
 * (the fallback); the component supplies `sizes` so the browser picks the smallest that fits.
 */
export function responsiveImage(source: unknown, widths: number[]) {
	const at = (width: number) => urlFor(source).width(width).format('webp').url();
	return {
		url: at(Math.max(...widths)),
		srcset: widths.map((width) => `${at(width)} ${width}w`).join(', ')
	};
}
