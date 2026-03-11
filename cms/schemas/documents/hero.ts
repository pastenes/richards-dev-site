import {defineType, defineField} from 'sanity'
import {GiHummingbird} from 'react-icons/gi'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  icon: GiHummingbird,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'links',
    }),
    defineField({
      title: 'Headshot',
      name: 'headshot',
      type: 'imageFile',
    }),
  ],
})
