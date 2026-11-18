import {at, createIfNotExists, defineMigration, patch, setIfMissing, unset} from 'sanity/migrate'

// One-time: moves the social handles from the hero (`hero.links`) into Site settings
// (`siteSettings.social`), then removes them from the hero. Run it after the site that reads
// `siteSettings.social` is deployed, then deploy the studio:
//   cd studio && npx sanity migration run social-to-site-settings               (dry run)
//   cd studio && npx sanity migration run social-to-site-settings --no-dry-run
// Handles already entered in Site settings are kept. Delete this folder once it has run, and the
// hero fallback in src/routes/+layout.server.ts.
export default defineMigration({
  title: 'Move the social links into Site settings',
  documentTypes: ['hero'],
  filter: 'defined(links)',
  migrate: {
    document(doc) {
      const links = doc.links as Record<string, unknown>
      const handles = Object.fromEntries(
        ['twitter', 'linkedin', 'github'].flatMap((key) =>
          typeof links[key] === 'string' && links[key] ? [[key, links[key]]] : [],
        ),
      )
      return [
        // Only the published hero feeds Site settings; a draft just drops its copy.
        ...(doc._id.startsWith('drafts.')
          ? []
          : [
              createIfNotExists({_id: 'siteSettings', _type: 'siteSettings'}),
              patch('siteSettings', at('social', setIfMissing({_type: 'links', ...handles}))),
            ]),
        patch(doc._id, at('links', unset())),
      ]
    },
  },
})
