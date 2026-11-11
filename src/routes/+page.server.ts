import { client, responsiveImage } from '#lib/sanity.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [hero, about, projects] = await Promise.all([
		client.fetch(`*[_type == "hero"][0]{
			title,
			intro[]{children[]{text}},
			links{github, linkedin, twitter},
			headshot{alt, asset->{_id, url}}
		}`),
		client.fetch(`*[_type == "about"][0]{
			_id,
			content[]{..., _type == "image" => {asset->{_id, url}}},
			tags[]{value}
		}`),
		client.fetch(`*[_type == "project"] | order(orderRank asc){
			_id,
			title,
			orderRank,
			projectUrl,
			tags[]{label},
			description[]{...},
			screenshot{alt, asset->{_id, url}}
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
			content: about?.content ?? [],
			tags: about?.tags?.map((tag: { value: string }) => tag.value).sort() ?? []
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
			})) ?? []
	};
};
