import {defineType, defineField} from 'sanity'

export default defineType({
  type: 'object',
  name: 'experience',
  fields: [
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'employer',
      title: 'Employer',
      type: 'string',
    }),
    defineField({
      name: 'start',
      title: 'Start',
      type: 'date',
      options: {
        dateFormat: 'MMMM, YYYY',
      },
    }),
    defineField({
      name: 'end',
      title: 'End',
      type: 'date',
      options: {
        dateFormat: 'MMMM, YYYY',
      },
    }),
    defineField({
      name: 'achievment',
      title: 'Achievment',
      type: 'array',
      of: [{type: 'achievment'}],
    }),
  ],
  preview: {
    select: {
      title: 'role',
      employer: 'employer',
    },
    prepare({title, employer}) {
      return {title, subtitle: employer}
    },
  },
})
