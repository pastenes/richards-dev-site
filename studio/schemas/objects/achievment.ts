import {defineType, defineField} from 'sanity'

export default defineType({
  type: 'object',
  name: 'achievment',
  fields: [
    defineField({
      name: 'achievment',
      title: 'Achievement',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {title: 'achievment'},
  },
})
