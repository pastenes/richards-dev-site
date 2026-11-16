import { redirect } from '@sveltejs/kit';
import { client, siteResumeQuery } from '#lib/sanity.ts';
import type { RequestHandler } from './$types';

/**
 * The site's PDF button: the site resume's PDF (made with "Generate Resume PDF" in the studio),
 * streamed from the Sanity CDN so the public URL stays the same whichever resume is picked.
 * Until one has been generated, it sends visitors to the resume page instead.
 */
export const GET: RequestHandler = async ({ fetch }) => {
	const resume = await client.fetch<{ url: string | null; fileName: string | null } | null>(
		`${siteResumeQuery}{ "url": pdf.asset->url, "fileName": pdfFileName }`,
		{},
		{ perspective: 'published' }
	);
	if (!resume?.url) redirect(307, '/resume');

	const pdf = await fetch(resume.url);
	if (!pdf.ok || !pdf.body) redirect(307, '/resume');

	return new Response(pdf.body, {
		headers: {
			'content-type': 'application/pdf',
			'content-disposition': `inline; filename="${resume.fileName?.replace(/[^\w-]/g, '') || 'Resume-Richard-Pastenes'}.pdf"`,
			'cache-control': 'public, max-age=300'
		}
	});
};
