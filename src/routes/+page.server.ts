import { client, urlFor } from '$lib/sanity';
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
						url: hero.headshot.asset ? urlFor(hero.headshot.asset).width(380).format('webp').url() : null
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
							url: (project.screenshot as Record<string, unknown>).asset
								? urlFor((project.screenshot as Record<string, unknown>).asset)
										.width(1000)
										.format('webp')
										.url()
								: null
						}
					: null
			})) ?? []
	};
};
