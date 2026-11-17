import { error } from '@sveltejs/kit';
import { client, siteResumeQuery, tagNames } from '#lib/sanity.ts';
import type { PageServerLoad } from './$types';

/**
 * `/resume` shows the site resume. `/resume?id=<document id>` shows any published resume; the studio's
 * "Generate Resume PDF" prints it that way (netlify/functions/resume-pdf.mts). Tailored resumes are
 * only reachable by their random ID, and that view is noindexed.
 */
export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');
	const resume = await (id ? client.withConfig({ useCdn: false }) : client).fetch(
		`${id ? '*[_type == "resume" && _id == $id][0]' : siteResumeQuery}{
		name,
		jobTitle,
		phone,
		email,
		portfolioUrl,
		summary,
		interests,
		education[]{
			_key,
			degree,
			school,
			year
		},
		certifications[]->{
			_id,
			title,
			issuer,
			inProgress,
			issued,
			credentialUrl
		},
		experience[]{
			_key,
			role,
			employer,
			start,
			end,
			achievment[]{
				_key,
				achievment
			}
		},
		skills
	}`,
		id ? { id } : {},
		{ perspective: 'published' }
	);
	if (!resume) error(404, 'Resume not found');

	const skills = tagNames(resume?.skills).sort();

	// Format dates for experience
	const experience =
		resume?.experience?.map((item: Record<string, unknown>) => ({
			...item,
			start: item.start ? formatDate(item.start as string) : '',
			end: item.end ? formatDate(item.end as string) : ''
		})) ?? [];

	// Certifications show the year only; drop references to deleted documents.
	const certifications =
		resume?.certifications
			?.filter(Boolean)
			.map(({ issued, inProgress, ...cert }: Record<string, unknown>) => ({
				...cert,
				inProgress: inProgress === true,
				year: !inProgress && issued ? String(issued).slice(0, 4) : ''
			})) ?? [];

	return {
		// Head tags (+layout.svelte): the summary is the description, cut to search-result length.
		meta: {
			title: `Resume | ${resume.name ?? 'Richard Pastenes'}`,
			description: clip(resume.summary),
			noindex: Boolean(id)
		},
		resume: {
			...resume,
			certifications,
			experience,
			skills
		}
	};
};

function formatDate(dateStr: string): string {
	const date = new Date(dateStr);
	return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

/** Up to `max` characters, cut at a word and ended with an ellipsis; `undefined` when empty. */
function clip(text: unknown, max = 160): string | undefined {
	if (typeof text !== 'string' || !text.trim()) return undefined;
	const clean = text.replace(/\s+/g, ' ').trim();
	if (clean.length <= max) return clean;
	return `${clean.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
}
