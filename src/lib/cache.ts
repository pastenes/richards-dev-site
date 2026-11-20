/**
 * Response headers that cache a page on Netlify's CDN. Pass to `setHeaders` in a load function.
 *
 * - Browsers always revalidate (`max-age=0`), and Netlify's edge answers from its cache.
 * - `durable` shares the cached response across Netlify's edge, so the SvelteKit function (and its
 *   Sanity queries) runs about once an hour per page instead of on every visit.
 * - Publishing in Sanity purges everything tagged `content` right away (a Sanity webhook calls
 *   netlify/functions/purge-cache.mts), and every deploy invalidates the cache too. The hour is
 *   only a safety net in case the webhook fails; stale pages are served while they refresh.
 *
 * Only for public, shared content: never for `/resume?id=…` (the studio prints the latest published
 * version through it) or anything per-visitor.
 */
export const cdnCache = {
	'cache-control': 'public, max-age=0, must-revalidate',
	'netlify-cdn-cache-control': 'public, durable, s-maxage=3600, stale-while-revalidate=604800',
	'netlify-cache-tag': 'content'
};
