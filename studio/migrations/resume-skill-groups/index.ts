import {at, defineMigration, patch, set, unset} from 'sanity/migrate'

// One-time: replaces each resume's flat, alphabetical `skills` list with `skillGroups`, ordered by
// relevance. Every resume (and draft) still on the old shape gets the same groups below; SEO, Git and
// GitHub are dropped. Run it after the site that reads `skillGroups` is deployed, then deploy the studio:
//   cd studio && npx sanity migration run resume-skill-groups               (dry run)
//   cd studio && npx sanity migration run resume-skill-groups --no-dry-run
// Delete this folder once it has run (and the `skills` fallback in src/routes/resume/+page.server.ts).
const groups: [string, string[]][] = [
  ['Core', ['TypeScript', 'React', 'Next.js', 'JavaScript', 'Node.js', 'Vue/Nuxt']],
  [
    'UI & styling',
    ['Tailwind CSS', 'CSS Grid/Flexbox', 'Storybook', 'Design systems', 'Framer Motion', 'GSAP', 'Figma'],
  ],
  ['Quality', ['Accessibility (WCAG)', 'i18n', 'Performance/Core Web Vitals', 'CI/CD']],
  ['Data & AI', ['GraphQL', 'REST', 'LLM integration', 'Vercel AI SDK']],
  [
    'Platforms',
    ['Vercel', 'Netlify', 'Sanity', 'Contentful', 'Headless CMS', 'WordPress', 'PHP'],
  ],
]

const key = () => Math.random().toString(36).slice(2, 14)

export default defineMigration({
  title: 'Group resume skills by relevance',
  documentTypes: ['resume'],
  filter: 'defined(skills) && !defined(skillGroups)',
  migrate: {
    document(doc) {
      return patch(doc._id, [
        at(
          'skillGroups',
          set(
            groups.map(([title, skills]) => ({_type: 'skillGroup', _key: key(), title, skills})),
          ),
        ),
        at('skills', unset()),
      ])
    },
  },
})
