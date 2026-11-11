import {at, defineMigration, set, unset} from 'sanity/migrate'

// Converts the old tags-plugin fields (`{label, value}[]`) to native tag arrays (`string[]`),
// keeping each tag's label. Drops `about.tags`, which the Skills document replaced.
// Run it after the site that reads `string[]` tags is deployed:
//   npx sanity migration run tags-to-strings            (dry run)
//   npx sanity migration run tags-to-strings --no-dry-run

type Tag = string | {label?: string} | null

const toStrings = (list: Tag[]) => [
  ...new Set(list.map((tag) => (typeof tag === 'string' ? tag : tag?.label)).filter(Boolean)),
]

const isOldShape = (list: unknown): list is Tag[] =>
  Array.isArray(list) && list.some((tag) => typeof tag !== 'string')

export default defineMigration({
  title: 'Tags plugin fields to native string arrays',
  documentTypes: ['project', 'resume', 'about'],
  migrate: {
    document(doc) {
      if (doc._type === 'about' && doc.tags !== undefined) return at('tags', unset())
      const field = doc._type === 'resume' ? 'skills' : 'tags'
      const list = doc[field]
      if (isOldShape(list)) return at(field, set(toStrings(list)))
      return undefined
    },
  },
})
