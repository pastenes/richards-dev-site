import { client, tagNames } from '#lib/sanity.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const resume = await client.fetch(`*[_type == "resume"][0]{
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
	}`);

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
			.map(({ issued, ...cert }: Record<string, unknown>) => ({
				...cert,
				year: issued ? String(issued).slice(0, 4) : ''
			})) ?? [];

	return {
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
