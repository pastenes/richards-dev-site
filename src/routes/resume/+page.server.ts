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

	return {
		resume: {
			...resume,
			experience,
			skills
		}
	};
};

function formatDate(dateStr: string): string {
	const date = new Date(dateStr);
	return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}
