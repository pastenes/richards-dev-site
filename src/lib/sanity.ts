import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_TOKEN } from '$env/static/private';

export const client = createClient({
	projectId: SANITY_PROJECT_ID,
	dataset: SANITY_DATASET,
	token: SANITY_TOKEN,
	useCdn: true,
	apiVersion: '2024-01-01'
});

const builder = imageUrlBuilder(client);

export function urlFor(source: unknown) {
	return builder.image(source);
}
