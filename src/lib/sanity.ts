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
