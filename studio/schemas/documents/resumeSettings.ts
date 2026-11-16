import {defineType, defineField} from 'sanity'
import {FaGlobeAmericas} from 'react-icons/fa'

// Singleton (document ID `resumeSettings`): which resume the site shows at /resume and serves as
// /Resume-Richard-Pastenes.pdf. Set it here or with "Show on site" on a resume. The reference is
// strong, so the site resume can't be deleted while it's picked.
export default defineType({
  name: 'resumeSettings',
  title: 'Site resume',
  type: 'document',
  icon: FaGlobeAmericas,
  fields: [
    defineField({
      name: 'siteResume',
      title: 'Site resume',
      description: 'The resume shown on the site and behind its PDF button.',
      type: 'reference',
      to: [{type: 'resume'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {label: 'siteResume.label'},
    prepare: ({label}) => ({title: 'Site resume', subtitle: label}),
  },
})
