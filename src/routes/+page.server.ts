import { client, responsiveImage } from '#lib/sanity.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [hero, about, projects, skills, certifications] = await Promise.all([
		client.fetch(`*[_type == "hero"][0]{
			title,
			intro[]{children[]{text}},
			links{github, linkedin, twitter},
			headshot{alt, asset->{_id, url}}
		}`),
		client.fetch(`*[_type == "about"][0]{
			_id,
			content[]{..., _type == "image" => {asset->{_id, url}}}
		}`),
		client.fetch(`*[_type == "project"] | order(orderRank asc){
			_id,
			title,
			orderRank,
			projectUrl,
			tags[]{label},
			description[]{...},
			screenshot{alt, asset->{_id, url}}
		}`),
		client.fetch(`*[_id == "skills"][0]{
			groups[]{_key, title, skills[]{_key, name, core}}
		}`),
		client.fetch(`*[_type == "certification"] | order(orderRank asc){
			_id,
			title,
			issuer,
			issued,
			credentialId,
			credentialUrl
		}`)
	]);

	return {
		hero: {
			...hero,
			headshot: hero?.headshot
				? {
						alt: hero.headshot.alt,
						...(hero.headshot.asset
							? responsiveImage(hero.headshot.asset, [350, 525, 700])
							: { url: null, srcset: '' })
					}
				: null
		},
		about: {
			content: about?.content ?? []
		},
		projects:
			projects?.map((project: Record<string, unknown>) => ({
				...project,
				screenshot: project.screenshot
					? {
							alt: (project.screenshot as Record<string, unknown>).alt,
							...((project.screenshot as Record<string, unknown>).asset
								? responsiveImage((project.screenshot as Record<string, unknown>).asset, [
										400, 700, 1000, 1400
									])
								: { url: null, srcset: '' })
						}
					: null
			})) ?? [],
		skillGroups: skills?.groups ?? [],
		certifications:
			certifications?.map(({ issued, ...cert }: Record<string, unknown>) => ({
				...cert,
				// `issued` is a YYYY-MM-DD date; the card only shows the year.
				year: typeof issued === 'string' ? issued.slice(0, 4) : null
			})) ?? []
	};
};
