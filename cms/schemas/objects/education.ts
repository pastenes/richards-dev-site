import {defineType, defineField} from 'sanity'

export default defineType({
  type: 'object',
  name: 'education',
  fields: [
    defineField({
      name: 'degree',
      title: 'Degree',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
    defineField({
      name: 'school',
      title: 'School',
      type: 'string',
    }),
  ],
})
