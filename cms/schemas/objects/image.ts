import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Image',
  name: 'imageFile',
  type: 'image',
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
    }),
  ],
})
