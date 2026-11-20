import { purgeCache } from '@netlify/cache';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

/**
 * POST /.netlify/functions/purge-cache: clears the cached pages (everything tagged `content`, see
 * src/lib/cache.ts) so a publish in Sanity shows up right away.
 *
 * Called by a Sanity webhook (sanity.io/manage → API → Webhooks) on create, update and delete of
 * published content, including "Generate Resume PDF", which patches the published resume. The
 * webhook signs each request with a secret; set the same string as SANITY_WEBHOOK_SECRET in Netlify.
 * On Netlify, `purgeCache` authenticates on its own (no token needed).
 */
export default async (request: Request) => {
	if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

	const secret = process.env.SANITY_WEBHOOK_SECRET;
	const signature = request.headers.get(SIGNATURE_HEADER_NAME);
	// Verify against the raw body: re-encoded JSON may not match the signature.
	const body = await request.text();
	const valid =
		!!secret && !!signature && (await isValidSignature(body, signature, secret).catch(() => false));
	if (!valid) return new Response('Invalid signature', { status: 401 });

	try {
		await purgeCache({ tags: ['content'] });
	} catch (error) {
		// Rate limited or failed: a 5xx makes Sanity retry the webhook later.
		console.error('purge-cache failed', error);
		return new Response('Purge failed', { status: 500 });
	}
	return new Response('Purged', { status: 202 });
};
