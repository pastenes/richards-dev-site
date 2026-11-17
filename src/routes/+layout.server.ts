import { client, urlFor } from '#lib/sanity.ts';
import type { LayoutServerLoad } from './$types';

// Used until the matching Site settings field is filled in (and for the share image, `static/meta.png`).
const DEFAULTS = {
	siteName: "Richard's Dev Landing",
	title: "Richard's Dev Landing | Richard Pastenes' personal web development website",
	description: "Richard Pastenes' personal web development website"
};

/**
 * Social handles (`hero.links`) for the footer, and SEO and sharing defaults from the studio's Site settings (`siteSettings`), for the meta tags in
 * `+layout.svelte`. Pages refine them by returning `meta` ({ title, description, noindex }).
 */
export const load: LayoutServerLoad = async ({ url }) => {
	const { settings, links } = await client.fetch<{
		settings: {
			siteName?: string;
			title?: string;
			description?: string;
			siteUrl?: string;
			ogImage?: { alt?: string; asset?: unknown };
		} | null;
		links: { github?: string; linkedin?: string; twitter?: string } | null;
	}>(
		`{
			"settings": *[_id == "siteSettings"][0]{
				siteName,
				title,
				description,
				siteUrl,
				ogImage{alt, asset, crop, hotspot}
			},
			"links": *[_type == "hero"][0].links{github, linkedin, twitter}
		}`,
		{},
		{ perspective: 'published' }
	)
		// Every page runs this load, so a failed fetch falls back to the defaults rather than erroring.
		.catch(() => ({ settings: null, links: null }));

	const siteName = settings?.siteName || DEFAULTS.siteName;
	// Social handles from the hero (the footer shows them too); empty ones become null and are hidden.
	const handle = (value?: string) => value?.trim().replace(/^@/, '') || null;
	const social = {
		github: handle(links?.github),
		linkedin: handle(links?.linkedin),
		twitter: handle(links?.twitter)
	};
	const siteUrl = (settings?.siteUrl || url.origin).replace(/\/+$/, '');

	return {
		site: {
			name: siteName,
			title: settings?.title || (settings?.siteName ?? DEFAULTS.title),
			description: settings?.description || DEFAULTS.description,
			url: siteUrl,
			// Cropped to the 1.91:1 size share cards use, around the image's hotspot.
			image: settings?.ogImage?.asset
				? {
						url: urlFor(settings.ogImage).width(1200).height(630).fit('crop').format('jpg').url(),
						width: 1200,
						height: 630,
						alt: settings.ogImage.alt || siteName
					}
				: { url: `${siteUrl}/meta.png`, width: 1200, height: 675, alt: siteName },
			social,
			twitter: social.twitter ? `@${social.twitter}` : null
		}
	};
};
