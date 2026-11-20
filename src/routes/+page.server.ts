import { cdnCache } from '#lib/cache.ts';
import { client, responsiveImage, tagNames } from '#lib/sanity.ts';
import type { PageServerLoad } from './$types';

// Images come with their pixel size, so `responsiveImage` can size them (and skip widths the source
// doesn't have).
const image = '{alt, asset->{_id, url, metadata{dimensions{width, height}}}}';

// Everything for the landing page in one GROQ query (one Sanity API request).
const query = `{
	"hero": *[_type == "hero"][0]{
		title,
		intro[]{children[]{text}},
		headshot${image}
	},
	"about": *[_type == "about"][0]{
		_id,
		content[]{..., _type == "image" => {asset->{_id, url}}}
	},
	"projects": *[_type == "project"] | order(orderRank asc){
		_id,
		title,
		orderRank,
		projectUrl,
		tags,
		description[]{...},
		screenshot${image},
		"previewVideo": previewVideo.asset->url
	},
	"skills": *[_id == "skills"][0]{
		groups[]{_key, title, skills[]{_key, name, core}}
	},
	"certifications": *[_type == "certification"] | order(orderRank asc){
		_id,
		title,
		issuer,
		inProgress,
		issued,
		credentialId,
		credentialUrl
	}
}`;

export const load: PageServerLoad = async ({ setHeaders }) => {
	const { hero, about, projects, skills, certifications } = await client.fetch(query);
	// Cached on the CDN, purged on publish (see #lib/cache.ts).
	setHeaders(cdnCache);

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
				tags: tagNames(project.tags),
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
			certifications?.map(({ issued, inProgress, ...cert }: Record<string, unknown>) => ({
				...cert,
				inProgress: inProgress === true,
				// `issued` is a YYYY-MM-DD date; the card only shows the year (none while in progress).
				year: !inProgress && typeof issued === 'string' ? issued.slice(0, 4) : null
			})) ?? []
	};
};
