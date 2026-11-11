import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	SANITY_PROJECT_ID: {
		static: true,
		description: 'Sanity project ID'
	},
	SANITY_DATASET: {
		static: true,
		description: 'Sanity dataset name'
	},
	SANITY_TOKEN: {
		static: true,
		description: 'Sanity API read token'
	}
});
