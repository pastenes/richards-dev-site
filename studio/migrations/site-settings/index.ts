import {at, createIfNotExists, defineMigration, delete_, patch, setIfMissing} from 'sanity/migrate'

// One-time: moves the site resume from the old `resumeSettings` singleton into `siteSettings`, then
// deletes `resumeSettings`. Run it after the site and studio that read `siteSettings` are deployed:
//   cd studio && npx sanity migration run site-settings               (dry run)
//   cd studio && npx sanity migration run site-settings --no-dry-run
// A site resume already picked in Site settings is kept. Delete this folder once it has run.
export default defineMigration({
  title: 'Move the site resume into Site settings',
  documentTypes: ['resumeSettings'],
  filter: '_id == "resumeSettings"',
  migrate: {
    document(doc) {
      const siteResume = doc.siteResume as {_type: 'reference'; _ref: string} | undefined
      return [
        createIfNotExists({_id: 'siteSettings', _type: 'siteSettings'}),
        ...(siteResume?._ref
          ? [
              patch(
                'siteSettings',
                at('siteResume', setIfMissing({_type: 'reference', _ref: siteResume._ref})),
              ),
            ]
          : []),
        delete_(doc._id),
      ]
    },
  },
})
