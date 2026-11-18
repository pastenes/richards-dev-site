import {defineType, defineField} from 'sanity'
import {FaCog} from 'react-icons/fa'

// Singleton (document ID `siteSettings`): the site's SEO and social sharing defaults, the social
// handles the hero and footer link to, and which
// resume the site shows at /resume and serves as /Resume-Richard-Pastenes.pdf. The resume can also
// be picked with "Show on site" on a resume. The reference is strong, so the site resume can't be
// deleted while it's picked.
export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: FaCog,
  groups: [
    {name: 'seo', title: 'SEO & sharing', default: true},
    {name: 'social', title: 'Social'},
    {name: 'resume', title: 'Resume'},
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name',
      description:
        'Shown when the site is shared (og:site_name) and after the title of pages without their own, like "Not Found | Site name".',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Home page title',
      description: 'The title in search results and browser tabs. Empty uses the site name.',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(60).warning('Search engines cut titles at about 60 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description:
        'The summary under the title in search results and share cards. The resume page uses its own summary.',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (Rule) =>
        Rule.max(160).warning('Search engines cut descriptions at about 160 characters.'),
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      description:
        'The canonical address, without a trailing slash (e.g. https://pastenes.dev). Empty uses whichever address the page was opened at.',
      type: 'url',
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Share image',
      description:
        'The image on link previews (Open Graph, X, LinkedIn, Slack...). It is cropped to 1200 × 630, so set the hotspot. Empty uses the built-in image.',
      type: 'image',
      options: {hotspot: true},
      group: 'seo',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social links',
      description:
        'Handles only, without the URL or "@" (e.g. "richardpastenes"). The hero and footer link to each network that has one.',
      type: 'links',
      group: 'social',
    }),
    defineField({
      name: 'siteResume',
      title: 'Site resume',
      description:
        'The resume shown on the site and behind its PDF button. Also set by "Show on site" on a resume.',
      type: 'reference',
      to: [{type: 'resume'}],
      group: 'resume',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site settings'}),
  },
})
