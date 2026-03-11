import {defineType, defineField} from 'sanity'

export default defineType({
  type: 'object',
  name: 'links',
  fieldsets: [{name: 'social', title: 'Social media handles'}],
  fields: [
    defineField({
      title: 'Twitter',
      name: 'twitter',
      type: 'string',
      fieldset: 'social',
    }),
    defineField({
      title: 'LinkedIn',
      name: 'linkedin',
      type: 'string',
      fieldset: 'social',
    }),
    defineField({
      title: 'GitHub',
      name: 'github',
      type: 'string',
      fieldset: 'social',
    }),
  ],
})
