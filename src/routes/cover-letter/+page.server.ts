import { error } from '@sveltejs/kit';
import { client, siteResumeQuery } from '#lib/sanity.ts';
import type { PageServerLoad } from './$types';

/**
 * `/cover-letter?id=<document id>` shows a published cover letter; the studio's "Generate Cover
 * Letter PDF" prints it (netlify/functions/resume-pdf.mts). There's no index page, so a letter is only
 * reachable by its random ID, and the page is noindexed and never cached on the CDN.
 */
export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (!id) error(404, 'Cover letter not found');

	const letter = await client.withConfig({ useCdn: false }).fetch(
		`*[_type == "coverLetter" && _id == $id][0]{
			jobTitle,
			employer,
			content,
			"letterhead": coalesce(resume->, ${siteResumeQuery}){
				name,
				jobTitle,
				phone,
				email,
				portfolioUrl
			},
			"pdf": pdf.asset->{url, originalFilename}
		}`,
		{ id },
		{ perspective: 'published' }
	);
	if (!letter) error(404, 'Cover letter not found');

	const name = letter.letterhead?.name ?? 'Richard Pastenes';
	return {
		meta: { title: `Cover Letter | ${name}`, noindex: true },
		// The nav's accent button downloads the stored PDF under its file name (Sanity's `?dl=`).
		navAction: letter.pdf?.url
			? { label: 'PDF', href: `${letter.pdf.url}?dl=${encodeURIComponent(letter.pdf.originalFilename ?? '')}` }
			: undefined,
		letter: {
			jobTitle: letter.jobTitle as string | undefined,
			employer: letter.employer as string | undefined,
			content: (letter.content ?? []) as unknown[],
			letterhead: { ...letter.letterhead, name },
			// Dated the day it's viewed or printed, in Eastern time (the server runs in UTC).
			date: new Date().toLocaleDateString('en-US', {
				month: 'long',
				day: 'numeric',
				year: 'numeric',
				timeZone: 'America/New_York'
			})
		}
	};
};
