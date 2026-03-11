import {defineType, defineField} from 'sanity'

export default defineType({
  type: 'object',
  name: 'achievment',
  fields: [
    defineField({
      name: 'achievment',
      title: 'Achievment',
      type: 'string',
    }),
  ],
})
