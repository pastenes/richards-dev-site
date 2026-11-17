import { client, siteResumeQuery } from '#lib/sanity.ts';
import type { RequestHandler } from './$types';

/**
 * The site's PDF button: the site resume's PDF (made with "Generate Resume PDF" in the studio),
 * streamed from the Sanity CDN so the public URL stays the same whichever resume is picked.
 * Until one has been generated, it prints the site resume live with the `resume-pdf` Netlify
 * function (a few seconds), and if that fails it sends visitors to the resume page.
 */
export const GET: RequestHandler = async ({ url }) => {
	const resume = await client.fetch<{
		_id: string;
		url: string | null;
		fileName: string | null;
	} | null>(
		`${siteResumeQuery}{ _id, "url": pdf.asset->url, "fileName": pdfFileName }`,
		{},
		{ perspective: 'published' }
	);

	// The global fetch, not SvelteKit's: the function isn't a SvelteKit route, so the request has to
	// go out over the network (on Netlify, `/.netlify/functions/*` bypasses the SvelteKit function).
	const source = resume?.url
		? resume.url
		: resume && `${url.origin}/.netlify/functions/resume-pdf?id=${encodeURIComponent(resume._id)}`;
	// A cold live print can take 10+ s; give up after 9 s rather than risk this function timing out.
	const pdf = source
		? await globalThis
				.fetch(source, resume?.url ? {} : { signal: AbortSignal.timeout(9000) })
				.catch(() => null)
		: null;

	if (!pdf?.ok || !pdf.body) {
		// Don't let a CDN or browser hold on to the fallback once a PDF exists.
		return new Response(null, {
			status: 307,
			headers: { location: '/resume', 'cache-control': 'no-store' }
		});
	}

	const fileName = resume?.fileName?.replace(/[^\w-]/g, '') || 'Resume-Richard-Pastenes';
	return new Response(pdf.body, {
		headers: {
			'content-type': 'application/pdf',
			'content-disposition': `inline; filename="${fileName}.pdf"`,
			// A stored PDF can be cached briefly; a live print shouldn't stick once one is generated.
			'cache-control': resume?.url ? 'public, max-age=300' : 'no-store'
		}
	});
};
